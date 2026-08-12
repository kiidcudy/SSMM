import { getAppearance } from "@/lib/store/db";
import { AppearanceAdmin } from "@/components/admin/AppearanceAdmin";

export default async function AdminAppearancePage() {
  const appearance = await getAppearance();
  return <AppearanceAdmin appearance={appearance} />;
}
