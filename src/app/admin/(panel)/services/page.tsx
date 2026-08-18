import { getServiceOverrides, listCategories, listProviders, listServices } from "@/lib/store/db";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { ServicesAdmin } from "@/components/admin/ServicesAdmin";

export default async function AdminServicesPage() {
  const [services, overrides, categories, providers] = await Promise.all([
    listServices(),
    getServiceOverrides(),
    listCategories(),
    listProviders(),
  ]);
  const configured = isProviderConfigured() || providers.some((p) => Boolean(p.apiKey));

  return (
    <ServicesAdmin
      providerConfigured={configured}
      categories={categories}
      providers={providers.map((p) => ({
        id: p.id,
        name: p.name,
        hasKey: Boolean(p.apiKey),
      }))}
      services={services.map((s) => {
        const ov = overrides[String(s.id)] || {};
        return {
          id: s.id,
          category: ov.category || s.category,
          name: ov.name || s.name,
          type: String(s.type || "default"),
          rate: ov.rate ?? s.rate,
          min: s.min,
          max: s.max,
          description: ov.description ?? s.description,
          providerServiceId: s.providerServiceId,
          providerHost: s.providerHost,
          enabled: ov.enabled !== false,
          hidden: Boolean(ov.hidden),
          dripfeed: ov.dripfeed ?? s.dripfeed,
        };
      })}
    />
  );
}
