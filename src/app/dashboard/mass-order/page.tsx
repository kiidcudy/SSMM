import { listServices } from "@/lib/store/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { MassOrderForm } from "@/components/MassOrderForm";

export default async function MassOrderPage() {
  const t = getDictionary("en");
  const services = await listServices();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.massOrder}</h1>
      <div className="mt-6">
        <MassOrderForm services={services} />
      </div>
    </div>
  );
}
