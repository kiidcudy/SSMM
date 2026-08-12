import { getServiceOverrides, listServices } from "@/lib/store/db";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { ServicesAdmin } from "@/components/admin/ServicesAdmin";

export default async function AdminServicesPage() {
  const [services, overrides] = await Promise.all([listServices(), getServiceOverrides()]);
  const configured = isProviderConfigured();

  return (
    <ServicesAdmin
      providerConfigured={configured}
      services={services.map((s) => {
        const ov = overrides[String(s.id)] || {};
        return {
          id: s.id,
          category: s.category,
          name: ov.name || s.name,
          type: s.type || "Default",
          rate: ov.rate ?? s.rate,
          min: s.min,
          max: s.max,
          description: ov.description ?? s.description,
          providerServiceId: s.providerServiceId,
          enabled: ov.enabled !== false,
          hidden: Boolean(ov.hidden),
        };
      })}
    />
  );
}
