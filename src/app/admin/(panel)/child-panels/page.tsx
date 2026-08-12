import { ChildPanelsAdmin } from "@/components/admin/ChildPanelsAdmin";
import { listChildPanels } from "@/lib/store/db";

export default async function AdminChildPanelsPage() {
  const panels = await listChildPanels();
  return <ChildPanelsAdmin panels={panels} />;
}
