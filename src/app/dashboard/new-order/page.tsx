import { listServices } from "@/lib/store/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { NewOrderForm } from "@/components/NewOrderForm";

export default async function NewOrderPage() {
  const services = await listServices();
  const t = getDictionary("en");

  return (
    <div className="w-full max-w-5xl">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.newOrder}</h1>
      <div className="mt-6">
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
          }}
          aside={
            <>
              <p className="text-sm text-[#93a0b8]">{t.dash.newOrderSubtitle}</p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-200">{t.dash.instantStart}</span>
                <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-indigo-200">
                  {t.dash.servicesCount}
                </span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-200">
                  {t.dash.support247}
                </span>
              </div>
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                {t.dash.orderWarning}
              </div>
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                {t.dash.orderPublicHint}
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}
