import { providerServices, type ProviderService } from "@/lib/provider/perfectpanel";
import type { PanelService } from "@/lib/data/catalog";
import { markupRate, normalizeServiceType } from "@/lib/provider/service-fields";

export function mapProviderService(s: ProviderService): PanelService {
  const providerType = s.type || "Default";
  const type = normalizeServiceType(providerType);
  const cost = Number(s.rate) || 0;
  const bits: string[] = [providerType];
  if (s.refill) bits.push("Refill");
  if (s.cancel) bits.push("Cancel");
  return {
    id: Number(s.service),
    providerServiceId: Number(s.service),
    category: s.category || "Other",
    name: s.name,
    rate: markupRate(cost),
    min: Number(s.min) || 1,
    max: Number(s.max) || 1,
    type,
    providerType,
    description: bits.join(" · "),
    refill: Boolean(s.refill),
    cancel: Boolean(s.cancel),
  };
}

export async function fetchMappedProviderServices(): Promise<PanelService[]> {
  const raw = await providerServices();
  if (!Array.isArray(raw)) throw new Error("Provider services response is not an array");
  return raw.map(mapProviderService);
}
