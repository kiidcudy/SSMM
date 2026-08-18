/**
 * Upstream PerfectPanel-compatible client (SMMFlare and similar).
 * Default credentials: PROVIDER_API_URL, PROVIDER_API_KEY
 * Stored providers pass explicit apiUrl + apiKey.
 */

export type ProviderService = {
  service: number;
  name: string;
  type: string;
  category: string;
  rate: string;
  min: string;
  max: string;
  refill?: boolean;
  cancel?: boolean;
  dripfeed?: boolean;
};

export type ProviderCredentials = {
  apiUrl: string;
  apiKey: string;
};

/** Normalize panel site URL → API endpoint (…/api/v2). */
export function resolveProviderApiUrl(input: string): string {
  let raw = input.trim();
  if (!raw) throw new Error("Provider URL is required");
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  const url = new URL(raw);
  if (!url.pathname || url.pathname === "/") {
    url.pathname = "/api/v2";
  }
  return url.toString().replace(/\/$/, "");
}

export function providerDisplayName(apiUrlOrSite: string): string {
  try {
    const raw = /^https?:\/\//i.test(apiUrlOrSite) ? apiUrlOrSite : `https://${apiUrlOrSite}`;
    return new URL(raw).hostname.replace(/^www\./, "");
  } catch {
    return apiUrlOrSite;
  }
}

function envConfig(): ProviderCredentials | null {
  const apiUrl = process.env.PROVIDER_API_URL?.trim();
  const apiKey = process.env.PROVIDER_API_KEY?.trim();
  if (!apiUrl || !apiKey || apiKey === "pending") return null;
  return { apiUrl, apiKey };
}

export function isProviderConfigured(): boolean {
  return Boolean(envConfig());
}

async function callWithConfig<T>(
  cfg: ProviderCredentials,
  action: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const body = new URLSearchParams();
  body.set("key", cfg.apiKey);
  body.set("action", action);
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    body.set(k, String(v));
  }

  const res = await fetch(cfg.apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  const data = (await res.json()) as T & { error?: string };
  if (!res.ok || (data && typeof data === "object" && "error" in data && data.error)) {
    throw new Error(
      typeof data === "object" && data && "error" in data
        ? String(data.error)
        : `Provider HTTP ${res.status}`,
    );
  }
  return data;
}

async function call<T>(action: string, params: Record<string, string | number> = {}): Promise<T> {
  const cfg = envConfig();
  if (!cfg) throw new Error("Provider not configured");
  return callWithConfig<T>(cfg, action, params);
}

export async function providerBalance(creds?: ProviderCredentials): Promise<number> {
  const cfg = creds || envConfig();
  if (!cfg) throw new Error("Provider not configured");
  const data = await callWithConfig<{ balance: string }>(cfg, "balance");
  return Number(data.balance);
}

export async function providerServices(creds?: ProviderCredentials): Promise<ProviderService[]> {
  const cfg = creds || envConfig();
  if (!cfg) throw new Error("Provider not configured");
  return callWithConfig<ProviderService[]>(cfg, "services");
}

export type ProviderOrderParams = {
  service: number;
  link?: string;
  quantity?: number;
  comments?: string;
  keywords?: string;
  usernames?: string;
  hashtags?: string;
  hashtag?: string;
  username?: string;
  media?: string;
  groups?: string;
  answer_number?: string | number;
  country?: string;
  device?: string | number;
  type_of_traffic?: string | number;
  google_keyword?: string;
  referring_url?: string;
  posts?: string | number;
  old_posts?: string | number;
  delay?: string | number;
  expiry?: string;
  runs?: string | number;
  interval?: string | number;
  min?: string | number;
  max?: string | number;
};

export async function providerAdd(input: ProviderOrderParams): Promise<{ order: number }> {
  const params: Record<string, string | number> = { service: input.service };
  const keys: (keyof ProviderOrderParams)[] = [
    "link",
    "quantity",
    "comments",
    "keywords",
    "usernames",
    "hashtags",
    "hashtag",
    "username",
    "media",
    "groups",
    "answer_number",
    "country",
    "device",
    "type_of_traffic",
    "google_keyword",
    "referring_url",
    "posts",
    "old_posts",
    "delay",
    "expiry",
    "runs",
    "interval",
    "min",
    "max",
  ];
  for (const k of keys) {
    const v = input[k];
    if (v !== undefined && v !== null && v !== "") params[k] = v as string | number;
  }
  return call<{ order: number }>("add", params);
}

export async function providerStatus(orderId: number | string): Promise<{
  charge: string;
  start_count: string;
  status: string;
  remains: string;
  currency: string;
}> {
  return call("status", { order: orderId });
}

export async function providerRefill(orderId: number | string): Promise<{ refill: string | number }> {
  return call("refill", { order: orderId });
}

export async function providerMultiRefill(orderIds: Array<number | string>) {
  return call("refill", { orders: orderIds.join(",") });
}

export async function providerRefillStatus(refillId: number | string): Promise<{ status: string }> {
  return call("refill_status", { refill: refillId });
}

export async function providerCancel(orderIds: Array<number | string>) {
  return call("cancel", { orders: orderIds.join(",") });
}
