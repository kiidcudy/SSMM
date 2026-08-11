import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAYMENT_METHODS, SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { tpl } from "@/lib/i18n/pages/tpl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return createMetadata({
    locale: raw,
    title: t.meta.paymentsTitle,
    description: t.meta.paymentsDescription,
    path: "/payments",
    keywords: [
      "paypal smm panel",
      "crypto smm panel",
      "smm panel payment methods",
      "add funds smm panel",
    ],
  });
}

export default async function PaymentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const howToSteps = c.paymentSteps.slice(0, 3).map((s) => ({
    name: s.name,
    text: tpl(s.text, { method: "PayPal / crypto / card", whatsapp: SITE.whatsapp }),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.payments, path: "/payments" },
          ],
          locale,
        )}
      />
      <JsonLd data={howToJsonLd(t.payments.manualTitle, howToSteps)} />

      <section className="container-page py-14">
        <h1 className="section-title">{t.payments.title}</h1>
        <p className="mt-3 max-w-3xl text-[var(--color-muted)]">{t.payments.subtitle}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAYMENT_METHODS.map((m) => (
            <LocaleLink
              key={m.slug}
              href={`/payments/${m.slug}`}
              locale={locale}
              className="card block p-5 transition hover:border-cyan-400/40"
            >
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">{m.name}</h2>
              <p className="mt-2 text-sm text-cyan-300">{m.seoKeyword}</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{t.common.learnMore} →</p>
            </LocaleLink>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="card p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
            {t.payments.manualTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-[var(--color-muted)]">{t.payments.manualBody}</p>
          <p className="mt-4 text-sm text-amber-200/90">{t.common.manualPaymentNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard/add-funds" className="btn-primary">
              {t.dash.addFunds}
            </Link>
            <LocaleLink href="/contact" locale={locale} className="btn-ghost">
              {t.nav.contact}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
