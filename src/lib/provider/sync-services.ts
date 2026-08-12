import { providerServices, type ProviderService } from "@/lib/provider/perfectpanel";
import type { PanelService } from "@/lib/data/catalog";
import { markupRate, normalizeServiceType } from "@/lib/provider/service-fields";
import { buildServiceDescription, cleanServiceName } from "@/lib/provider/service-description";

export function mapProviderService(s: ProviderService): PanelService {
  const providerType = s.type || "Default";
  const type = normalizeServiceType(providerType);
  const cost = Number(s.rate) || 0;
  const name = cleanServiceName(s.name);
  const min = Number(s.min) || 1;
  const max = Number(s.max) || 1;
  const refill = Boolean(s.refill);
  const cancel = Boolean(s.cancel);
  const dripfeed = Boolean(s.dripfeed);

  return {
    id: Number(s.service),
    providerServiceId: Number(s.service),
    category: cleanServiceName(s.category || "Other"),
    name,
    rate: markupRate(cost),
    min,
    max,
    type,
    providerType,
    description: buildServiceDescription({
      name,
      category: s.category || "Other",
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
  return raw.map(mapProviderService);
}
