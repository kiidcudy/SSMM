import { SITE, PAYMENT_METHODS, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LocaleLink } from "@/components/LocaleLink";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[#060910]">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold">{SITE.name}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{t.footer.tagline}</p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            WhatsApp: {SITE.whatsappDisplay}
            <br />
            Telegram: @{SITE.telegram}
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">{t.footer.quick}</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><LocaleLink href="/services" locale={locale}>{t.nav.services}</LocaleLink></li>
            <li><LocaleLink href="/free-services" locale={locale}>{t.nav.freeServices}</LocaleLink></li>
            <li><LocaleLink href="/payments" locale={locale}>{t.nav.payments}</LocaleLink></li>
            <li><LocaleLink href="/blog" locale={locale}>{t.nav.blog}</LocaleLink></li>
            <li><LocaleLink href="/api-docs" locale={locale}>{t.nav.api}</LocaleLink></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">{t.footer.legal}</p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li><LocaleLink href="/about" locale={locale}>{t.footer.about}</LocaleLink></li>
            <li><LocaleLink href="/privacy" locale={locale}>{t.footer.privacy}</LocaleLink></li>
            <li><LocaleLink href="/terms" locale={locale}>{t.footer.terms}</LocaleLink></li>
            <li><LocaleLink href="/faq" locale={locale}>{t.nav.faq}</LocaleLink></li>
            <li><LocaleLink href="/contact" locale={locale}>{t.nav.contact}</LocaleLink></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">{t.nav.payments}</p>
          <ul className="flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((m) => (
              <li key={m.slug}>
                <LocaleLink
                  href={`/payments/${m.slug}`}
                  locale={locale}
                  className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-muted)] hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {m.name}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-muted)]">
        © {SITE.foundedYear} {SITE.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
