import { getDictionary } from "@/lib/i18n/get-dictionary";
import { OrdersTable } from "@/components/OrdersTable";

export default function OrdersPage() {
  const t = getDictionary("en");
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.orders}</h1>
      <p className="mt-2 text-sm text-[#93a0b8]">Track all of your panel orders.</p>
      <div className="mt-6">
        <OrdersTable />
      </div>
    </div>
  );
}
