import type { ServiceKind } from "@/lib/provider/service-fields";

/** Local panel service shape (mapped from upstream PerfectPanel/SMMFlare API). */
export type PanelService = {
  id: number;
  category: string;
  name: string;
  rate: number;
  min: number;
  max: number;
  /** Normalized kind for form fields */
  type: ServiceKind;
  /** Original provider type string */
  providerType: string;
  description: string;
  providerServiceId?: number;
  refill?: boolean;
  cancel?: boolean;
  dripfeed?: boolean;
};

/** No hard-coded catalog — services come from PROVIDER_API_* (SMMFlare). */
export const SEED_SERVICES: PanelService[] = [];

export function servicesByCategory(services: PanelService[]): Record<string, PanelService[]> {
  const map: Record<string, PanelService[]> = {};
  for (const s of services) {
    (map[s.category] ??= []).push(s);
  }
  return map;
}

export function getService(services: PanelService[], id: number): PanelService | undefined {
  return services.find((s) => s.id === id);
}

export function chargeFor(service: PanelService, quantity: number): number {
  const qty = Math.max(1, quantity);
  return Math.round(((service.rate * qty) / 1000) * 10000) / 10000;
}

/** Placeholder avg delivery (8–60 min) until real order history exists. Stable per service id. */
export function avgDeliveryMinutes(serviceId: number): number {
  let x = serviceId | 0;
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
  x = (x >>> 16) ^ x;
  return 8 + (Math.abs(x) % 53);
}
