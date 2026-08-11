"use client";

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, SITE, type Locale, isLocale } from "@/lib/site";
import { localePath, stripLocalePrefix } from "@/lib/i18n/path";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const { path } = stripLocalePrefix(pathname.startsWith("/en/") || pathname === "/en" ? pathname.replace(/^\/en/, "") || "/" : pathname);

  // When using rewrite, browser path for EN has no prefix; for others it does.
  const logical = (() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] && isLocale(parts[0]) && parts[0] !== SITE.localeDefault) {
      return "/" + parts.slice(1).join("/") || "/";
    }
    return pathname || "/";
  })();

  return (
    <label className="relative inline-flex items-center text-sm text-[var(--color-muted)]">
      <span className="sr-only">Language</span>
      <select
        className="appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1.5 pr-8 text-[var(--color-text)]"
        value={locale}
        onChange={(e) => {
          const next = e.target.value as Locale;
          window.location.href = localePath(logical === "/" ? "/" : logical, next);
        }}
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-xs opacity-70">▾</span>
      <span className="hidden">{path}</span>
    </label>
  );
}
