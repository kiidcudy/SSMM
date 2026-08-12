"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/cancel", label: "Cancel" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/tickets", label: "Tickets", badge: true },
  { href: "/admin/affiliates", label: "Affiliates" },
  { href: "/admin/child-panels", label: "Child panels" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/appearance", label: "Appearance" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav({ openTickets }: { openTickets: number }) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-[1400px] gap-0.5 overflow-x-auto px-2 py-1.5 text-[13px]">
        {TABS.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative whitespace-nowrap rounded px-3 py-1.5 ${
                active ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {tab.badge && openTickets > 0 ? (
                <span className="ml-1.5 rounded bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {openTickets}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
