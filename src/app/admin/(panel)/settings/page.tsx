import { getPanelSettings } from "@/lib/store/db";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { SettingsAdmin } from "@/components/admin/SettingsAdmin";
import { ORDER_ID_START } from "@/lib/store/db";

export default async function AdminSettingsPage() {
  const settings = await getPanelSettings();
  return (
    <SettingsAdmin
      settings={settings}
      providerConfigured={isProviderConfigured()}
      orderIdStart={ORDER_ID_START}
    />
  );
}
