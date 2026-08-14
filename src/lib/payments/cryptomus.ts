import { createHash } from "crypto";

type CryptomusConfig = {
  apiKey: string;
  merchantId: string;
};

function config(): CryptomusConfig | null {
  const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY?.trim();
  const merchantId = process.env.CRYPTOMUS_MERCHANT_ID?.trim();
  if (!apiKey || !merchantId) return null;
  return { apiKey, merchantId };
}

export function isCryptomusConfigured(): boolean {
  return Boolean(config());
}

/** Cryptomus sign: md5(base64(jsonBody) + apiKey) */
export function cryptomusSign(bodyJson: string, apiKey: string): string {
  const b64 = Buffer.from(bodyJson).toString("base64");
  return createHash("md5").update(b64 + apiKey).digest("hex");
}

/** Verify webhook: strip sign, re-sign with PHP-style escaped slashes in JSON. */
export function verifyCryptomusWebhook(
  payload: Record<string, unknown>,
  apiKey: string,
): boolean {
  const sign = String(payload.sign || "");
  if (!sign) return false;
  const data = { ...payload };
  delete data.sign;
  const json = JSON.stringify(data).replace(/\//g, "\\/");
  const expected = cryptomusSign(json, apiKey);
  return expected === sign;
}

export async function createCryptomusInvoice(input: {
  amountUsd: number;
  orderId: string;
  urlReturn: string;
  urlCallback: string;
  urlSuccess?: string;
}): Promise<{ url: string; uuid: string }> {
  const cfg = config();
  if (!cfg) throw new Error("Cryptomus is not configured");

  const payload = {
    amount: (Math.round(input.amountUsd * 100) / 100).toFixed(2),
    currency: "USD",
    order_id: input.orderId,
    url_return: input.urlReturn,
    url_callback: input.urlCallback,
    url_success: input.urlSuccess || input.urlReturn,
    is_payment_multiple: false,
    lifetime: 3600,
  };
  const bodyJson = JSON.stringify(payload);
  const sign = cryptomusSign(bodyJson, cfg.apiKey);

  const res = await fetch("https://api.cryptomus.com/v1/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      merchant: cfg.merchantId,
      sign,
    },
    body: bodyJson,
    cache: "no-store",
  });

  const data = (await res.json()) as {
    state?: number;
    result?: { url?: string; uuid?: string };
    message?: string | string[];
    errors?: unknown;
  };

  if (!res.ok || data.state !== 0 || !data.result?.url) {
    const msg =
      typeof data.message === "string"
        ? data.message
        : Array.isArray(data.message)
          ? data.message.join(", ")
          : `Cryptomus HTTP ${res.status}`;
    throw new Error(msg);
  }

  return { url: data.result.url, uuid: String(data.result.uuid || "") };
}

export function cryptomusApiKey(): string | null {
  return config()?.apiKey ?? null;
}
