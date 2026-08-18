import { providerServices, type ProviderService } from "@/lib/provider/perfectpanel";
import type { PanelService } from "@/lib/data/catalog";
import { applyMarkup, normalizeServiceType } from "@/lib/provider/service-fields";
import { buildServiceDescription, cleanServiceName } from "@/lib/provider/service-description";

export type MapProviderOpts = {
  category?: string;
  providerId?: string;
  providerHost?: string;
  localId?: number;
  markupPercent?: number;
  markupFixed?: number;
  syncRate?: boolean;
};

export function mapProviderService(s: ProviderService, opts?: MapProviderOpts): PanelService {
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
  const markupPercent =
    opts?.markupPercent != null && Number.isFinite(opts.markupPercent)
      ? opts.markupPercent
      : Number(process.env.PROVIDER_MARKUP_PERCENT || "40");
  const markupFixed =
    opts?.markupFixed != null && Number.isFinite(opts.markupFixed) ? opts.markupFixed : 0;

  return {
    id: opts?.localId ?? providerServiceId,
    providerServiceId,
    providerId: opts?.providerId,
    providerHost: opts?.providerHost,
    providerCost: cost,
    markupPercent,
    markupFixed,
    syncRate: opts?.syncRate !== false,
    category,
    name,
    rate: applyMarkup(cost, markupPercent, markupFixed),
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
