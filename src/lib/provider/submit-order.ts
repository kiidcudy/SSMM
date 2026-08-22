import type { PanelService } from "@/lib/data/catalog";
import type { StoredOrder, StoredProvider } from "@/lib/store/db";
import { getProvider, listProviders } from "@/lib/store/db";
import { splitOrderTarget } from "@/lib/split-order-target";
import { fieldsForService } from "@/lib/provider/service-fields";
import {
  providerAddWithConfig,
  resolveProviderApiUrl,
  resolveProviderCredentials,
  type ProviderCredentials,
  type ProviderOrderParams,
} from "@/lib/provider/perfectpanel";

export type OrderProviderFields = {
  link?: string;
  quantity: number;
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
};

export type SubmitProviderResult =
  | { ok: true; providerOrderId: string }
  | { ok: false; error: string };

function normalizeCreds(creds: ProviderCredentials): ProviderCredentials {
  return {
    apiUrl: resolveProviderApiUrl(creds.apiUrl),
    apiKey: creds.apiKey.trim(),
  };
}

function providerMatchesHost(provider: StoredProvider, host: string): boolean {
  const needle = host.toLowerCase().replace(/^www\./, "");
  const name = provider.name.toLowerCase().replace(/^www\./, "");
  const url = provider.url.toLowerCase();
  const apiUrl = provider.apiUrl.toLowerCase();
  return name === needle || url.includes(needle) || apiUrl.includes(needle);
}

export async function resolveProviderCredentialsForService(
  service: PanelService,
): Promise<ProviderCredentials | null> {
  const providers = await listProviders();
  const withKey = providers.filter((p) => p.apiKey);

  if (service.providerId) {
    const linked = withKey.find((p) => p.id === service.providerId) || (await getProvider(service.providerId));
    if (linked?.apiKey) return normalizeCreds({ apiUrl: linked.apiUrl, apiKey: linked.apiKey });
  }

  if (service.providerHost) {
    const hostMatch = withKey.find((p) => providerMatchesHost(p, service.providerHost!));
    if (hostMatch) return normalizeCreds({ apiUrl: hostMatch.apiUrl, apiKey: hostMatch.apiKey });
  }

  if (withKey.length === 1) {
    const only = withKey[0]!;
    return normalizeCreds({ apiUrl: only.apiUrl, apiKey: only.apiKey });
  }

  if (withKey.length > 1) {
    const smm = withKey.find((p) => providerMatchesHost(p, "smmflare.com"));
    if (smm) return normalizeCreds({ apiUrl: smm.apiUrl, apiKey: smm.apiKey });
    return normalizeCreds({ apiUrl: withKey[0]!.apiUrl, apiKey: withKey[0]!.apiKey });
  }

  const env = resolveProviderCredentials();
  if (env) return normalizeCreds(env);

  return null;
}

export async function resolveProviderCredentialsForOrder(
  order: Pick<StoredOrder, "serviceId">,
  services: PanelService[],
): Promise<ProviderCredentials | null> {
  const service = services.find((s) => s.id === order.serviceId);
  if (!service) {
    const env = resolveProviderCredentials();
    return env ? normalizeCreds(env) : null;
  }
  return resolveProviderCredentialsForService(service);
}

function cleanProviderLink(raw?: string): string | undefined {
  const text = splitOrderTarget(raw ?? "").link || raw || "";
  const trimmed = text.trim();
  return trimmed || undefined;
}

export async function submitOrderToProvider(
  service: PanelService,
  input: OrderProviderFields,
): Promise<SubmitProviderResult> {
  const creds = await resolveProviderCredentialsForService(service);
  if (!creds) {
    return {
      ok: false,
      error: "Provider not configured — add SMMFlare under Settings → Providers with API key",
    };
  }

  const fields = fieldsForService(service);
  const providerServiceId = service.providerServiceId ?? service.id;
  if (!providerServiceId) {
    return { ok: false, error: "Service is missing provider mapping (providerServiceId)" };
  }

  const link = cleanProviderLink(input.link);
  if (fields.needsLink && !link) {
    return { ok: false, error: "Link required" };
  }

  const params: ProviderOrderParams = {
    service: providerServiceId,
    link,
    quantity: fields.needsQuantity || fields.quantityFromComments ? input.quantity : undefined,
    comments: input.comments,
    keywords: input.keywords,
    usernames: input.usernames,
    hashtags: input.hashtags,
    hashtag: input.hashtag,
    username: input.username,
    media: input.media,
    groups: input.groups,
    answer_number: input.answer_number,
    country: input.country,
    device: input.device,
    type_of_traffic: input.type_of_traffic,
    google_keyword: input.google_keyword,
    referring_url: input.referring_url,
    posts: input.posts,
    old_posts: input.old_posts,
    delay: input.delay ?? (service.type === "subscriptions" ? 0 : undefined),
    expiry: input.expiry,
    runs: input.runs,
    interval: input.interval,
    min: service.type === "subscriptions" ? service.min : undefined,
    max: service.type === "subscriptions" ? service.max : undefined,
  };

  try {
    const result = await providerAddWithConfig(creds, params);
    if (!result?.order) {
      return { ok: false, error: "Provider returned no order id" };
    }
    return { ok: true, providerOrderId: String(result.order) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Provider order failed" };
  }
}
