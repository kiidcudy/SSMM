import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAYMENT_METHODS, SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { tpl } from "@/lib/i18n/pages/tpl";
import { createMetadata, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";

export function generateStaticParams() {
  return PAYMENT_METHODS.map((m) => ({ slug: m.slug }));
}

function getMethod(slug: string) {
  return PAYMENT_METHODS.find((m) => m.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const method = getMethod(slug);
  if (!method) return {};
  const c = getPageChrome(raw);
  return createMetadata({
    locale: raw,
    title: tpl(c.paymentMetaTitle, { method: method.seoKeyword }),
    description: tpl(c.paymentMetaDesc, { method: method.name }),
    path: `/payments/${method.slug}`,
    keywords: [method.seoKeyword, `${method.name} smm panel`, "add funds smm panel"],
  });
}

export default async function PaymentMethodPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const method = getMethod(slug);
  if (!method) notFound();

  const steps = c.paymentSteps.map((s) => ({
    name: tpl(s.name, { method: method.name }),
    text: tpl(s.text, { method: method.name, whatsapp: SITE.whatsappDisplay }),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.payments, path: "/payments" },
            { name: method.name, path: `/payments/${method.slug}` },
          ],
          locale,
        )}
      />
      <JsonLd data={howToJsonLd(tpl(c.paymentHowToTitle, { method: method.name }), steps)} />

      <section className="container-page py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">{t.payments.howTitle}</p>
        <h1 className="section-title mt-2">{method.seoKeyword}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          {tpl(c.paymentIntro, { method: method.name })}
        </p>

        <ol className="mt-10 grid max-w-3xl gap-4 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.name} className="card p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-200">
                {i + 1}
              </span>
              <h2 className="mt-3 font-semibold">{s.name}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/dashboard/add-funds" className="btn-primary">
            {t.dash.addFunds}
          </Link>
          <LocaleLink href="/payments" locale={locale} className="btn-ghost">
            {t.common.viewAll}
          </LocaleLink>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
