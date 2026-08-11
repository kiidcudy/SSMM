/**
 * Upstream PerfectPanel-compatible client (SMMFlare).
 * Env: PROVIDER_API_URL, PROVIDER_API_KEY
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

type ProviderConfig = {
  apiUrl: string;
  apiKey: string;
};

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

function config(): ProviderConfig | null {
  const apiUrl = process.env.PROVIDER_API_URL?.trim();
  const apiKey = process.env.PROVIDER_API_KEY?.trim();
  if (!apiUrl || !apiKey || apiKey === "pending") return null;
  return { apiUrl, apiKey };
}

export function isProviderConfigured(): boolean {
  return Boolean(config());
}

async function call<T>(action: string, params: Record<string, string | number> = {}): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("Provider not configured");

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

export async function providerBalance(): Promise<number> {
  const data = await call<{ balance: string }>("balance");
  return Number(data.balance);
}

export async function providerServices(): Promise<ProviderService[]> {
  return call<ProviderService[]>("services");
}

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
