import { listFunds, listOrders, listTickets, listUsers } from "@/lib/store/db";

export default async function AdminReportsPage() {
  const [users, orders, funds, tickets] = await Promise.all([
    listUsers(),
    listOrders(),
    listFunds(),
    listTickets(),
  ]);

  const revenue = orders.reduce((sum, o) => sum + (o.charge || 0), 0);
  const deposits = funds.filter((f) => f.status === "approved").reduce((s, f) => s + f.amount, 0);
  const pendingFunds = funds.filter((f) => f.status === "pending").length;
  const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const cards = [
    { label: "Users", value: String(users.length) },
    { label: "Orders", value: String(orders.length) },
    { label: "Order revenue (charged)", value: `$${revenue.toFixed(2)}` },
    { label: "Approved deposits", value: `$${deposits.toFixed(2)}` },
    { label: "Pending deposits", value: String(pendingFunds) },
    { label: "Open tickets", value: String(tickets.filter((t) => t.status !== "closed").length) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Reports</h1>
      <p className="mt-1 text-sm text-gray-500">
        Snapshot from live panel data. Provider cost is not stored — revenue is what users were charged.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{c.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Orders by status</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {Object.entries(byStatus).map(([status, count]) => (
            <li key={status} className="flex justify-between rounded bg-gray-50 px-3 py-2 capitalize">
              <span>{status}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
          {Object.keys(byStatus).length === 0 ? (
            <li className="text-gray-500">No orders yet.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
