import type { PanelService } from "@/lib/data/catalog";
import type { StoredOrder } from "@/lib/store/db";
import { getProvider, listProviders } from "@/lib/store/db";
import { fieldsForService } from "@/lib/provider/service-fields";
import {
  providerAddWithConfig,
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

export async function resolveProviderCredentialsForService(
  service: PanelService,
): Promise<ProviderCredentials | null> {
  if (service.providerId) {
    const linked = await getProvider(service.providerId);
    if (linked?.apiKey) {
      return { apiUrl: linked.apiUrl, apiKey: linked.apiKey };
    }
  }

  const env = resolveProviderCredentials();
  if (env) return env;

  const providers = await listProviders();
  const fallback = providers.find((p) => p.apiKey);
  if (fallback) {
    return { apiUrl: fallback.apiUrl, apiKey: fallback.apiKey };
  }

  return null;
}

export async function resolveProviderCredentialsForOrder(
  order: Pick<StoredOrder, "serviceId">,
  services: PanelService[],
): Promise<ProviderCredentials | null> {
  const service = services.find((s) => s.id === order.serviceId);
  if (!service) return resolveProviderCredentials() ?? null;
  return resolveProviderCredentialsForService(service);
}

export async function submitOrderToProvider(
  service: PanelService,
  input: OrderProviderFields,
): Promise<SubmitProviderResult> {
  const creds = await resolveProviderCredentialsForService(service);
  if (!creds) {
    return { ok: false, error: "Provider not configured" };
  }

  const fields = fieldsForService(service);
  const providerServiceId = service.providerServiceId ?? service.id;
  const params: ProviderOrderParams = {
    service: providerServiceId,
    link: input.link,
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
