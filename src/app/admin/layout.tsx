import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";

const TABS = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/tickets", label: "Tickets" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/dashboard/new-order");

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/admin/users" className="text-lg font-bold">
            SSMM Admin
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>{session.username}</span>
            <Link href="/dashboard/new-order" className="text-indigo-600 hover:underline">
              Panel
            </Link>
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50">
                Logout
              </button>
            </form>
          </div>
        </div>
        <nav className="border-t border-gray-100 bg-white">
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 py-2 text-sm">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="whitespace-nowrap rounded px-3 py-1.5 text-gray-700 hover:bg-gray-100"
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
