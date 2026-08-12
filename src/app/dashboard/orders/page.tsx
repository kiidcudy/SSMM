import { getDictionary } from "@/lib/i18n/get-dictionary";
import { readPreferredLocale } from "@/lib/i18n/locale-preference";
import { OrdersTable } from "@/components/OrdersTable";

export default async function OrdersPage() {
  const locale = await readPreferredLocale();
  const t = getDictionary(locale);
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.orders}</h1>
      <p className="mt-2 text-sm text-[#93a0b8]">{t.dash.ordersIntro}</p>
      <div className="mt-6">
        <OrdersTable />
      </div>
    </div>
  );
}
