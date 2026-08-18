import { getPanelSettings, listProviders, ORDER_ID_START } from "@/lib/store/db";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { SettingsAdmin } from "@/components/admin/SettingsAdmin";

export default async function AdminSettingsPage() {
  const [settings, providers] = await Promise.all([getPanelSettings(), listProviders()]);
  return (
    <SettingsAdmin
      settings={settings}
      providerConfigured={isProviderConfigured()}
      orderIdStart={ORDER_ID_START}
      providers={providers.map((p) => ({
        id: p.id,
        name: p.name,
        url: p.url,
        apiUrl: p.apiUrl,
        alias: p.alias,
        hasKey: Boolean(p.apiKey),
      }))}
    />
  );
}
