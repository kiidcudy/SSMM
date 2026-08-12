"use client";

import { useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, type Locale } from "@/lib/site";

export function DashboardLanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  async function onChange(next: Locale) {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    router.refresh();
  }

  return (
    <label className="relative inline-flex items-center text-xs text-[#93a0b8]">
      <span className="sr-only">Language</span>
      <select
        className="appearance-none rounded-md border border-[#243049] bg-[#0f172a] py-1.5 pl-2 pr-6 text-xs font-semibold tracking-wide text-[#e8eefc] sm:text-sm"
        value={locale}
        aria-label={LOCALE_LABELS[locale]}
        onChange={(e) => void onChange(e.target.value as Locale)}
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_SHORT[l]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1.5 text-[10px] opacity-70 sm:right-2 sm:text-xs">▾</span>
    </label>
  );
}
