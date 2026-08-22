import { createHmac, timingSafeEqual } from "crypto";

// Partner API client (SSMM Panel → Instazzy hosted checkout).
// HMAC: X-Partner-Id / X-Timestamp (±5 min) / X-Signature = hex(HMAC-SHA256(secret, "{ts}.{rawBody}"))

export type InstazzyCreateOrderInput = {
  partnerOrderId: string;
  email: string;
  profileTarget?: string;
  currency: "USD" | "EUR";
  total: number;
  items: { productName: string; quantity: number }[];
  callbackUrl: string;
  redirectBackUrl?: string;
};

export type InstazzyCreateOrderResult = {
  orderId: string;
  partnerOrderId: string;
  checkoutUrl: string;
  expiresAt: number;
};

export type InstazzyOrderStatus = {
  orderId: string;
  partnerOrderId: string;
  status: string;
  paymentStatus: string;
  updatedAt: string;
};

export type InstazzyCallbackPayload = {
  orderId: string;
  partnerOrderId: string;
  status: "success" | "fail";
  amount: number;
  currency: string;
  paidAt: string | null;
  ts: number;
};

function config(): { baseUrl: string; partnerId: string; secret: string } {
  return {
    baseUrl: (process.env.INSTAZZY_API_URL ?? "").trim().replace(/\/+$/, ""),
    partnerId: (process.env.INSTAZZY_PARTNER_ID ?? "").trim(),
    secret: (process.env.INSTAZZY_PARTNER_SECRET ?? "").trim(),
  };
}

export function instazzyConfigured(): boolean {
  const c = config();
  return Boolean(c.baseUrl && c.partnerId && c.secret);
}

function sign(secret: string, timestamp: string, rawBody: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
}

async function signedRequest<T>(
  path: string,
  { method, body }: { method: "GET" | "POST"; body?: unknown },
): Promise<T> {
  const c = config();
  if (!instazzyConfigured()) {
    throw new Error("Instazzy partner integration is not configured.");
  }

  const rawBody = body === undefined ? "" : JSON.stringify(body);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = sign(c.secret, timestamp, rawBody);

  const res = await fetch(`${c.baseUrl}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      "x-partner-id": c.partnerId,
      "x-timestamp": timestamp,
      "x-signature": signature,
    },
    body: rawBody || undefined,
    cache: "no-store",
  });

  const text = await res.text();
  let json: T | null = null;
  try {
    json = text ? (JSON.parse(text) as T) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const message =
      (json as { error?: string } | null)?.error ?? `Instazzy partner API returned HTTP ${res.status}.`;
    throw new Error(message);
  }
  if (json === null) throw new Error("Instazzy partner API returned an empty response.");
  return json;
}

export function createInstazzyOrder(
  input: InstazzyCreateOrderInput,
): Promise<InstazzyCreateOrderResult> {
  return signedRequest<InstazzyCreateOrderResult>("/api/partner/orders", {
    method: "POST",
    body: input,
  });
}

export function getInstazzyOrderStatus(partnerOrderId: string): Promise<InstazzyOrderStatus> {
  return signedRequest<InstazzyOrderStatus>(
    `/api/partner/orders/${encodeURIComponent(partnerOrderId)}`,
    { method: "GET" },
  );
}

export function verifyInstazzyCallback(
  request: Request,
  rawBody: string,
):
  | { ok: true; payload: InstazzyCallbackPayload }
  | { ok: false; status: number; error: string } {
  const c = config();
  if (!instazzyConfigured()) {
    return { ok: false, status: 503, error: "Instazzy partner integration is not configured." };
  }

  const partnerId = request.headers.get("x-partner-id") ?? "";
  const timestampHeader = request.headers.get("x-timestamp");
  const signatureHeader = request.headers.get("x-signature");

  if (partnerId && partnerId !== c.partnerId) {
    return { ok: false, status: 403, error: "Unknown partner id." };
  }
  if (!timestampHeader || !signatureHeader) {
    return { ok: false, status: 401, error: "Missing X-Timestamp or X-Signature header." };
  }

  const ts = Number(timestampHeader);
  if (!Number.isFinite(ts)) {
    return { ok: false, status: 401, error: "Invalid X-Timestamp header." };
  }
  const WINDOW_MS = 5 * 60 * 1000;
  if (Math.abs(Date.now() - ts * 1000) > WINDOW_MS) {
    return { ok: false, status: 401, error: "Request timestamp is too old or in the future." };
  }

  const expected = sign(c.secret, timestampHeader, rawBody);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signatureHeader, "hex");
  if (a.length === 0 || a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, status: 401, error: "Invalid signature." };
  }

  let payload: InstazzyCallbackPayload;
  try {
    payload = JSON.parse(rawBody) as InstazzyCallbackPayload;
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON body." };
  }
  if (!payload?.partnerOrderId || !["success", "fail"].includes(payload.status)) {
    return { ok: false, status: 400, error: "Invalid payload." };
  }
  return { ok: true, payload };
}
