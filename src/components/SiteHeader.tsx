import Image from "next/image";
import { SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LocaleLink } from "@/components/LocaleLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
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
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)]/80 bg-[#070b14]/85 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <LocaleLink href="/" locale={locale} className="flex items-center" aria-label={SITE.name}>
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={200}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </LocaleLink>
        <nav className="hidden items-center gap-4 text-sm text-[var(--color-muted)] lg:flex">
          {links.map((l) => (
            <LocaleLink key={l.href} href={l.href} locale={locale} className="hover:text-[var(--color-accent)]">
              {l.label}
            </LocaleLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <LocaleLink href="/login" locale={locale} className="btn-ghost px-3 py-2 text-sm">
            {t.nav.login}
          </LocaleLink>
          <LocaleLink href="/signup" locale={locale} className="btn-primary px-3 py-2 text-sm">
            {t.nav.signup}
          </LocaleLink>
        </div>
      </div>
    </header>
  );
}
