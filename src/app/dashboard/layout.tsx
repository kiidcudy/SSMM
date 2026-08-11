import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { findUserById } from "@/lib/store/db";

const NAV = [
  { href: "/dashboard/new-order", key: "newOrder" as const },
  { href: "/dashboard/services", key: "services" as const },
  { href: "/dashboard/orders", key: "orders" as const },
  { href: "/dashboard/add-funds", key: "addFunds" as const },
  { href: "/dashboard/refunds", key: "refunds" as const },
  { href: "/dashboard/api", key: "api" as const },
  { href: "/dashboard/affiliates", key: "affiliates" as const },
  { href: "/dashboard/child-panel", key: "childPanel" as const },
  { href: "/dashboard/tickets", key: "tickets" as const },
  { href: "/dashboard/mass-order", key: "massOrder" as const },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession();
  if (!session) redirect("/login");

  const t = getDictionary("en");
  const fresh = await findUserById(session.id);
  const balance = fresh?.balance ?? session.balance;

  return (
    <div className="min-h-screen bg-[#0b1220] text-[#e8eefc]">
      <header className="border-b border-[#1e2a44] bg-[#111827]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/dashboard/new-order" className="font-[family-name:var(--font-display)] text-lg font-bold">
            SSMM Panel
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded bg-emerald-500/15 px-3 py-1 font-semibold text-emerald-300">
              {t.dash.yourBalance}: ${balance.toFixed(4)}
            </span>
            <span className="text-[#93a0b8]">{t.dash.account}: {session.username}</span>
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="rounded border border-[#243049] px-3 py-1 hover:border-cyan-400/40">
                {t.nav.logout}
              </button>
            </form>
          </div>
        </div>
        <nav className="overflow-x-auto border-t border-[#1e2a44] bg-[#0f172a]">
          <div className="mx-auto flex max-w-7xl gap-1 px-2 py-2 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded px-3 py-1.5 text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white"
              >
                {t.dash[item.key]}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
