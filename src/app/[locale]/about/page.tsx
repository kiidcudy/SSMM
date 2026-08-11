import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { getLegalBundle } from "@/lib/i18n/pages/legal";
import { createMetadata, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
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
    title: c.aboutMetaTitle,
    description: c.aboutMetaDesc,
    path: "/about",
    keywords: ["about ssmm panel", "ssmmpanel.com", "smm panel company"],
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const { about } = getLegalBundle(locale);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.footer.about, path: "/about" },
          ],
          locale,
        )}
      />
      <section className="container-page py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">{SITE.name}</p>
        <h1 className="section-title mt-3">{c.aboutH1}</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--color-muted)]">{c.aboutLead}</p>

        <img
          src="/blog/smm-panel-beginners-cover.png"
          alt={c.aboutImgAlt}
          width={1200}
          height={675}
          className="mt-8 aspect-[16/9] w-full max-w-3xl rounded-2xl border border-[var(--color-border)] object-cover"
          loading="eager"
        />

        <nav className="rank-math-toc mt-8 max-w-3xl" aria-label={t.free.toc}>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">{t.free.toc}</p>
          <ol className="mt-2 space-y-1.5 text-sm">
            {about.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-panel mt-8 max-w-3xl">
          {about.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-20">
              <h2>{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </section>
          ))}

          <h2>{c.aboutUsefulLinks}</h2>
          <ul>
            <li>
              <LocaleLink href="/services" locale={locale}>
                {c.linkServices}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/free-services" locale={locale}>
                {c.linkFree}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/payments" locale={locale}>
                {c.linkPayments}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/blog" locale={locale}>
                {c.linkBlog}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/api-docs" locale={locale}>
                {c.linkApi}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/contact" locale={locale}>
                {c.linkContact}
              </LocaleLink>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <LocaleLink href="/signup" locale={locale} className="btn-primary">
            {t.home.ctaSignup}
          </LocaleLink>
          <LocaleLink href="/faq" locale={locale} className="btn-ghost">
            {t.nav.faq}
          </LocaleLink>
        </div>
      </section>
    </>
  );
}
