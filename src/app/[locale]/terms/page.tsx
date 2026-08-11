import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { getLegalBundle } from "@/lib/i18n/pages/legal";
import { tpl } from "@/lib/i18n/pages/tpl";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const c = getPageChrome(raw);
  return createMetadata({
    locale: raw,
    title: c.termsMetaTitle,
    description: c.termsMetaDesc,
    path: "/terms",
    keywords: ["ssmm panel terms of service", "smm panel terms"],
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const { terms } = getLegalBundle(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.footer.terms, path: "/terms" },
          ],
          locale,
        )}
      />
      <section className="container-page py-14">
        <h1 className="section-title">{t.footer.terms}</h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          {tpl(c.lastUpdated, { date: "11 August 2026" })} · {SITE.domain}
        </p>
        <p className="mt-4 max-w-3xl text-[var(--color-muted)]">{c.termsLead}</p>

        <nav className="rank-math-toc mt-8 max-w-3xl" aria-label={t.free.toc}>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">{t.free.toc}</p>
          <ol className="mt-2 space-y-1.5 text-sm">
            {terms.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-panel mt-8 max-w-3xl space-y-2">
          {terms.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-20">
              <h2>{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-[var(--color-muted)]">
          <LocaleLink href="/privacy" locale={locale} className="text-cyan-300">
            {t.footer.privacy}
          </LocaleLink>
          {" · "}
          <LocaleLink href="/faq" locale={locale} className="text-cyan-300">
            {t.nav.faq}
          </LocaleLink>
        </p>
      </section>
    </>
  );
}
