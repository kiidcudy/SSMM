import { AffiliatesAdmin } from "@/components/admin/AffiliatesAdmin";
import { listAffiliates } from "@/lib/store/db";

export default async function AdminAffiliatesPage() {
  const affiliates = await listAffiliates();
  return <AffiliatesAdmin affiliates={affiliates} />;
}
