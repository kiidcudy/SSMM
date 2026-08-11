import { listServices } from "@/lib/store/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { NewOrderForm } from "@/components/NewOrderForm";

export default async function NewOrderPage() {
  const services = await listServices();
  const t = getDictionary("en");

  return (
    <div className="max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.newOrder}</h1>
      <p className="mt-2 text-sm text-[#93a0b8]">{t.dash.newOrderSubtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-200">{t.dash.instantStart}</span>
        <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-indigo-200">{t.dash.servicesCount}</span>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-200">{t.dash.support247}</span>
      </div>
      <div className="mt-8">
        <NewOrderForm
          services={services}
          labels={{
            category: t.dash.category,
            service: t.dash.service,
            description: t.dash.description,
            link: t.dash.link,
            quantity: t.dash.quantity,
            charge: t.dash.charge,
            placeOrder: t.dash.placeOrder,
            orderWarning: t.dash.orderWarning,
          }}
        />
      </div>
    </div>
  );
}
