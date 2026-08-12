import Link from "next/link";
import { listFunds, listOrders, listTickets, listUsers } from "@/lib/store/db";

const SUB = [
  { href: "/admin/reports", label: "Payments", key: "payments" },
  { href: "/admin/reports?page=orders", label: "Orders", key: "orders" },
  { href: "/admin/reports?page=tickets", label: "Tickets", key: "tickets" },
  { href: "/admin/reports?page=profits", label: "Profits", key: "profits" },
  { href: "/admin/reports?page=users", label: "Users", key: "users" },
  { href: "/admin/reports?page=churn", label: "User churn", key: "churn" },
  { href: "/admin/reports?page=providers", label: "Providers", key: "providers" },
  { href: "/admin/reports?page=services", label: "Services", key: "services" },
  { href: "/admin/reports?page=delivery", label: "Service delivery", key: "delivery" },
];

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; year?: string }>;
}) {
  const sp = await searchParams;
  const page = sp.page || "payments";
  const year = Number(sp.year) || new Date().getFullYear();

  const [users, orders, funds, tickets] = await Promise.all([
    listUsers(),
    listOrders(),
    listFunds(),
    listTickets(),
  ]);

  const deposits = funds
    .filter((f) => f.status === "completed" || f.status === "approved")
    .reduce((s, f) => s + f.amount, 0);
  const revenue = orders.reduce((sum, o) => sum + (o.charge || 0), 0);
  const cost = orders.reduce((sum, o) => sum + (o.cost || 0), 0);

  const grid = buildMonthDayGrid(
    year,
    funds.filter((f) => f.status === "completed" || f.status === "approved"),
    (f) => f.createdAt,
    (f) => f.amount,
  );

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-2 text-sm">
        {SUB.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className={`rounded px-2.5 py-1 ${
              page === s.key || (page === "payments" && s.key === "payments" && !sp.page)
                ? "bg-gray-200 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded border border-gray-300 bg-white px-2 py-1 text-xs">Chart</span>
        <span className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-semibold">Table</span>
        <span className="rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-semibold">Total amount</span>
        <span className="rounded border border-gray-300 bg-white px-2 py-1 text-xs">Total count</span>
        <form className="flex items-center gap-2">
          <select name="year" defaultValue={year} className="rounded border px-2 py-1 text-xs">
            {[year, year - 1, year - 2].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <span className="rounded border px-2 py-1 text-xs text-gray-500">All users</span>
          <span className="rounded border px-2 py-1 text-xs text-gray-500">Methods</span>
          <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-xs text-white">
            Submit
          </button>
        </form>
      </div>

      {page === "payments" || !sp.page ? (
        <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="table-admin text-xs">
            <thead>
              <tr>
                <th>#</th>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                  <th key={m}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <tr key={day}>
                  <td className="text-gray-500">{day}</td>
                  {grid[day - 1].map((val, mi) => (
                    <td key={mi}>{val == null ? "" : val.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page === "orders" ? (
            <>
              <Card label="Orders" value={String(orders.length)} />
              <Card label="Charged" value={`$${revenue.toFixed(2)}`} />
              <Card
                label="Completed"
                value={String(orders.filter((o) => o.status === "completed").length)}
              />
            </>
          ) : null}
          {page === "tickets" ? (
            <>
              <Card label="Tickets" value={String(tickets.length)} />
              <Card label="Open" value={String(tickets.filter((t) => t.status !== "closed").length)} />
              <Card label="Closed" value={String(tickets.filter((t) => t.status === "closed").length)} />
            </>
          ) : null}
          {page === "profits" ? (
            <>
              <Card label="Revenue" value={`$${revenue.toFixed(2)}`} />
              <Card label="Cost" value={`$${cost.toFixed(2)}`} />
              <Card label="Profit" value={`$${(revenue - cost).toFixed(2)}`} />
            </>
          ) : null}
          {page === "users" || page === "churn" ? (
            <>
              <Card label="Users" value={String(users.length)} />
              <Card label="Active" value={String(users.filter((u) => u.status === "active").length)} />
              <Card label="Suspended" value={String(users.filter((u) => u.status === "suspended").length)} />
            </>
          ) : null}
          {page === "providers" || page === "services" || page === "delivery" ? (
            <>
              <Card label="Deposits" value={`$${deposits.toFixed(2)}`} />
              <Card label="Orders" value={String(orders.length)} />
              <Card label="With provider ID" value={String(orders.filter((o) => o.providerOrderId).length)} />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function buildMonthDayGrid<T>(
  year: number,
  rows: T[],
  getDate: (r: T) => string,
  getAmount: (r: T) => number,
): (number | null)[][] {
  const grid: (number | null)[][] = Array.from({ length: 31 }, () => Array(12).fill(null));
  for (const row of rows) {
    const d = new Date(getDate(row));
    if (d.getFullYear() !== year) continue;
    const day = d.getDate() - 1;
    const month = d.getMonth();
    const prev = grid[day][month] || 0;
    grid[day][month] = prev + getAmount(row);
  }
  return grid;
}
