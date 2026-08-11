/** Local panel service shape (mapped from upstream PerfectPanel/SMMFlare API). */
export type PanelService = {
  id: number;
  category: string;
  name: string;
  rate: number;
  min: number;
  max: number;
  type: "default" | "custom_comments";
  description: string;
  providerServiceId?: number;
  refill?: boolean;
  cancel?: boolean;
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
  return Math.round(((service.rate * quantity) / 1000) * 10000) / 10000;
}
