import { providerServices, type ProviderService } from "@/lib/provider/perfectpanel";
import type { PanelService } from "@/lib/data/catalog";
import { markupRate, normalizeServiceType } from "@/lib/provider/service-fields";
import { buildServiceDescription, cleanServiceName } from "@/lib/provider/service-description";

export function mapProviderService(
  s: ProviderService,
  opts?: { category?: string; providerId?: string; providerHost?: string; localId?: number },
): PanelService {
  const providerType = s.type || "Default";
  const type = normalizeServiceType(providerType);
  const cost = Number(s.rate) || 0;
  const name = cleanServiceName(s.name);
  const min = Number(s.min) || 1;
  const max = Number(s.max) || 1;
  const refill = Boolean(s.refill);
  const cancel = Boolean(s.cancel);
  const dripfeed = Boolean(s.dripfeed);
  const category = cleanServiceName(opts?.category || s.category || "Other");
  const providerServiceId = Number(s.service);

  return {
    id: opts?.localId ?? providerServiceId,
    providerServiceId,
    providerId: opts?.providerId,
    providerHost: opts?.providerHost,
    category,
    name,
    rate: markupRate(cost),
    min,
    max,
    type,
    providerType,
    description: buildServiceDescription({
      name,
      category: opts?.category || s.category || "Other",
      type: providerType,
      min,
      max,
      refill,
      cancel,
      dripfeed,
    }),
    refill,
    cancel,
    dripfeed,
  };
}

export async function fetchMappedProviderServices(): Promise<PanelService[]> {
  const raw = await providerServices();
  if (!Array.isArray(raw)) throw new Error("Provider services response is not an array");
  return raw.map((s) => mapProviderService(s));
}
