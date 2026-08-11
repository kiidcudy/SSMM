import Image from "next/image";
import { SITE, PAYMENT_METHODS, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LocaleLink } from "@/components/LocaleLink";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[#060910] sm:mt-20">
      <div className="container-page grid gap-8 py-8 sm:gap-10 sm:py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-1">
          <LocaleLink href="/" locale={locale} aria-label={SITE.name}>
            <Image
              src="/logo.png"
              alt={SITE.name}
              width={200}
              height={40}
              className="h-7 w-auto max-w-[130px] object-contain object-left sm:h-8 sm:max-w-[160px]"
            />
          </LocaleLink>
          <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">{t.footer.tagline}</p>
          <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">
            WhatsApp: {SITE.whatsappDisplay}
            <br />
            Telegram: @{SITE.telegram}
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)] sm:mb-3 sm:text-sm">
            {t.footer.quick}
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[var(--color-muted)] md:grid-cols-1">
            <li><LocaleLink href="/services" locale={locale}>{t.nav.services}</LocaleLink></li>
            <li><LocaleLink href="/free-services" locale={locale}>{t.nav.freeServices}</LocaleLink></li>
            <li><LocaleLink href="/payments" locale={locale}>{t.nav.payments}</LocaleLink></li>
            <li><LocaleLink href="/blog" locale={locale}>{t.nav.blog}</LocaleLink></li>
            <li><LocaleLink href="/api-docs" locale={locale}>{t.nav.api}</LocaleLink></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)] sm:mb-3 sm:text-sm">
            {t.footer.legal}
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[var(--color-muted)] md:grid-cols-1">
            <li><LocaleLink href="/about" locale={locale}>{t.footer.about}</LocaleLink></li>
            <li><LocaleLink href="/privacy" locale={locale}>{t.footer.privacy}</LocaleLink></li>
            <li><LocaleLink href="/terms" locale={locale}>{t.footer.terms}</LocaleLink></li>
            <li><LocaleLink href="/faq" locale={locale}>{t.nav.faq}</LocaleLink></li>
            <li><LocaleLink href="/contact" locale={locale}>{t.nav.contact}</LocaleLink></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)] sm:mb-3 sm:text-sm">
            {t.nav.payments}
          </p>
          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
            {PAYMENT_METHODS.map((m) => (
              <li key={m.slug}>
                <LocaleLink
                  href={`/payments/${m.slug}`}
                  locale={locale}
                  className="inline-block rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[11px] text-[var(--color-muted)] hover:border-cyan-400/40 hover:text-cyan-300 sm:px-2.5 sm:py-1 sm:text-xs"
                >
                  {m.name}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-4 py-3 text-center text-[11px] text-[var(--color-muted)] sm:py-4 sm:text-xs">
        © {SITE.foundedYear} {SITE.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
