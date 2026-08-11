"use client";

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, SITE, type Locale, isLocale } from "@/lib/site";
import { localePath } from "@/lib/i18n/path";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";

  const logical = (() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] && isLocale(parts[0]) && parts[0] !== SITE.localeDefault) {
      return "/" + parts.slice(1).join("/") || "/";
    }
    return pathname || "/";
  })();

  return (
    <label className="relative inline-flex items-center text-xs text-[var(--color-muted)]">
      <span className="sr-only">Language</span>
      <select
        className="appearance-none rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-1.5 pl-2 pr-6 text-xs font-semibold tracking-wide text-[var(--color-text)] sm:min-w-[4.5rem] sm:text-sm sm:font-normal sm:tracking-normal"
        value={locale}
        aria-label={LOCALE_LABELS[locale]}
        onChange={(e) => {
          const next = e.target.value as Locale;
          window.location.href = localePath(logical === "/" ? "/" : logical, next);
        }}
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {/* Mobile browsers show selected option text — keep short codes */}
            {LOCALE_SHORT[l]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1.5 text-[10px] opacity-70 sm:right-2 sm:text-xs">▾</span>
    </label>
  );
}
