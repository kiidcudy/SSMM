import { providerServices, type ProviderService } from "@/lib/provider/perfectpanel";
import type { PanelService } from "@/lib/data/catalog";

export function mapProviderService(s: ProviderService): PanelService {
  const typeRaw = (s.type || "").toLowerCase();
  const type: PanelService["type"] = typeRaw.includes("comment") ? "custom_comments" : "default";
  const bits: string[] = [];
  if (s.refill) bits.push("Refill");
  if (s.cancel) bits.push("Cancel");
  return {
    id: Number(s.service),
    providerServiceId: Number(s.service),
    category: s.category || "Other",
    name: s.name,
    rate: Number(s.rate) || 0,
    min: Number(s.min) || 1,
    max: Number(s.max) || 1,
    type,
    description: bits.length ? bits.join(" · ") : s.type || "",
    refill: Boolean(s.refill),
    cancel: Boolean(s.cancel),
  };
}

export async function fetchMappedProviderServices(): Promise<PanelService[]> {
  const raw = await providerServices();
  if (!Array.isArray(raw)) throw new Error("Provider services response is not an array");
  return raw.map(mapProviderService);
}
