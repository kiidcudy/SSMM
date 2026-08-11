"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LocaleLink } from "@/components/LocaleLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/services", label: t.nav.services },
    { href: "/free-services", label: t.nav.freeServices },
    { href: "/payments", label: t.nav.payments },
    { href: "/blog", label: t.nav.blog },
    { href: "/faq", label: t.nav.faq },
    { href: "/api-docs", label: t.nav.api },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)]/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-2 py-2.5 sm:gap-3 sm:py-3">
        <LocaleLink
          href="/"
          locale={locale}
          className="flex min-w-0 shrink items-center"
          aria-label={SITE.name}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={200}
            height={40}
            className="h-7 w-auto max-w-[118px] object-contain object-left sm:h-8 sm:max-w-[150px] md:h-9 md:max-w-none"
            priority
          />
        </LocaleLink>

        <nav className="hidden items-center gap-3 text-sm text-[var(--color-muted)] xl:flex">
          {links.map((l) => (
            <LocaleLink key={l.href} href={l.href} locale={locale} className="hover:text-[var(--color-accent)]">
              {l.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher locale={locale} />
          <LocaleLink
            href="/login"
            locale={locale}
            className="rounded-lg border border-[var(--color-border)] bg-white/[0.03] px-2 py-1.5 text-xs font-semibold sm:px-3 sm:py-2 sm:text-sm"
          >
            {t.nav.login}
          </LocaleLink>
          <LocaleLink
            href="/signup"
            locale={locale}
            className="rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 px-2.5 py-1.5 text-xs font-bold text-slate-950 sm:px-3 sm:py-2 sm:text-sm"
          >
            {t.nav.signup}
          </LocaleLink>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text)] sm:h-9 sm:w-9 xl:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--color-border)] bg-[#070b14] xl:hidden">
          <nav className="container-page flex flex-col gap-0.5 py-2">
            {links.map((l) => (
              <LocaleLink
                key={l.href}
                href={l.href}
                locale={locale}
                className="rounded-lg px-3 py-2.5 text-sm text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-text)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </LocaleLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
