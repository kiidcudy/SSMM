import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { listTickets } from "@/lib/store/db";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }

  const tickets = await listTickets();
  const openTickets = tickets.filter((t) => t.status !== "closed").length;

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2.5">
          <Link href="/admin/users" className="text-base font-bold tracking-tight">
            SSMM Admin
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium">0</span>
            <span>{session.username}</span>
            <Link href="/dashboard/new-order" className="text-blue-600 hover:underline">
              Panel
            </Link>
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="rounded border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50">
                Logout
              </button>
            </form>
          </div>
        </div>
        <AdminNav openTickets={openTickets} />
      </header>
      <main className="mx-auto max-w-[1400px] px-4 py-5">{children}</main>
    </div>
  );
}
