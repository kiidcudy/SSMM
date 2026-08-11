import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getFaqPageItems } from "@/lib/i18n/localized-content";
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";

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
    title: t.meta.faqTitle,
    description: t.meta.faqDescription,
    path: "/faq",
    keywords: [
      "smm panel faq",
      "ssmm panel questions",
      "drip feed smm",
      "paypal smm panel deposit",
      "smm panel api",
    ],
  });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const faqs = getFaqPageItems(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.faq, path: "/faq" },
          ],
          locale,
        )}
      />

      <section className="container-page py-14">
        <h1 className="section-title">{t.home.faqTitle}</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.home.faqSubtitle}</p>

        <div className="prose-panel mt-6 max-w-3xl">
          <p>
            <LocaleLink href="/blog/what-is-an-smm-panel-beginners-guide-2026" locale={locale}>
              {t.nav.blog}
            </LocaleLink>
            {" · "}
            <LocaleLink href="/free-services" locale={locale}>
              {t.nav.freeServices}
            </LocaleLink>
            {" · "}
            <LocaleLink href="/payments" locale={locale}>
              {t.nav.payments}
            </LocaleLink>
          </p>
        </div>

        <div className="mt-10 max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:content-none">{f.q}</summary>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="card mt-10 max-w-3xl p-6">
          <div className="mt-0 flex flex-wrap gap-3">
            <LocaleLink href="/contact" locale={locale} className="btn-primary">
              {t.nav.contact}
            </LocaleLink>
            <LocaleLink href="/about" locale={locale} className="btn-ghost">
              {t.footer.about}
            </LocaleLink>
            <LocaleLink href="/blog" locale={locale} className="btn-ghost">
              {t.nav.blog}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
