import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localePath } from "@/lib/i18n/path";
import { createMetadata, breadcrumbJsonLd, faqJsonLd, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { FREE_PACKS, getFreePack } from "@/lib/data/free-services";
import {
  buildFreePackContentHtml,
  buildFreePackFaqs,
  buildFreePackTakeaway,
  localizeFreePack,
  wordCountHtml,
} from "@/lib/data/free-pack-seo";
import { withToc } from "@/lib/data/blog";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { tpl } from "@/lib/i18n/pages/tpl";

export function generateStaticParams() {
  return FREE_PACKS.map((p) => ({ slug: p.slug }));
}

function localizeInternalHrefs(html: string, locale: Locale): string {
  if (locale === "en") return html;
  return html.replace(/href="(\/[^"]*)"/g, (_m, path: string) => {
    if (path.startsWith("//")) return `href="${path}"`;
    return `href="${localePath(path, locale)}"`;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const base = getFreePack(slug);
  if (!base) return {};
  const pack = localizeFreePack(base, raw);
  return createMetadata({
    locale: raw,
    title: pack.metaTitle,
    description: pack.metaDescription,
    path: `/free-services/${pack.slug}`,
    keywords: [pack.focusKeyword, ...pack.keywords],
    image: `${SITE.url}${pack.image}`,
  });
}

export default async function FreePackPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const base = getFreePack(slug);
  if (!base) notFound();
  const pack = localizeFreePack(base, locale);

  const faqs = buildFreePackFaqs(base, locale);
  const takeaway = buildFreePackTakeaway(base, locale);
  const rawHtml = buildFreePackContentHtml(base, locale);
  const words = wordCountHtml(rawHtml);
  const { body, toc } = withToc(localizeInternalHrefs(rawHtml, locale));
  const related = FREE_PACKS.filter((p) => p.slug !== pack.slug && p.platform === pack.platform)
    .slice(0, 3)
    .map((p) => localizeFreePack(p, locale));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: pack.title,
          description: pack.metaDescription,
          path: `/free-services/${pack.slug}`,
          locale,
          date: "2026-03-01",
          updatedAt: "2026-08-11",
          image: pack.image,
          keywords: [pack.focusKeyword, ...pack.keywords],
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.freeServices, path: "/free-services" },
            { name: pack.title, path: `/free-services/${pack.slug}` },
          ],
          locale,
        )}
      />

      <article className="container-page py-14">
        <LocaleLink href="/free-services" locale={locale} className="text-sm text-cyan-300">
          ← {t.nav.freeServices}
        </LocaleLink>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-cyan-300">{pack.platform}</p>
        <h1 className="section-title mt-2 max-w-3xl">{pack.title}</h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          {pack.focusKeyword} · {words} · {t.free.priceFree}
        </p>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">{pack.description}</p>

        <img
          src={pack.image}
          alt={pack.imageAlt}
          width={1200}
          height={675}
          className="mt-8 aspect-[16/9] w-full max-w-3xl rounded-2xl border border-[var(--color-border)] object-cover"
          loading="eager"
          fetchPriority="high"
        />

        <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          <div className="card p-4">
            <p className="text-xs text-[var(--color-muted)]">{t.free.quantityLabel}</p>
            <p className="mt-1 text-xl font-bold">
              {pack.quantity} {pack.unit}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[var(--color-muted)]">{t.free.cooldownLabel}</p>
            <p className="mt-1 text-xl font-bold">{pack.cooldownHours}h</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[var(--color-muted)]">{t.free.priceLabel}</p>
            <p className="mt-1 text-xl font-bold text-emerald-300">{t.free.priceFree}</p>
          </div>
        </div>

        <aside className="card mt-6 max-w-3xl border-cyan-400/20 bg-cyan-400/5 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-cyan-300">{t.free.keyTakeaways}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{takeaway}</p>
        </aside>

        {toc.length > 1 && (
          <nav className="rank-math-toc max-w-3xl" aria-label={t.free.toc}>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
              {t.free.toc}
            </p>
            <ol className="mt-2 space-y-1.5 text-sm">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    {i + 1}. {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <LocaleLink href="/signup" locale={locale} className="btn-primary">
            {t.free.claim}
          </LocaleLink>
          <LocaleLink href="/services" locale={locale} className="btn-ghost">
            {t.nav.services}
          </LocaleLink>
        </div>

        <div
          className="prose-panel mt-10 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="card mt-10 max-w-3xl p-6">
          <h2 className="font-semibold">{t.free.rulesTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
            {c.freePackRules.map((rule) => (
              <li key={rule}>{tpl(rule, { hours: pack.cooldownHours })}</li>
            ))}
          </ul>
        </div>

        <section className="mt-12 max-w-3xl">
          <h2 className="section-title text-2xl">{t.free.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer list-none font-semibold marker:content-none">{f.q}</summary>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <div className="mt-12 max-w-3xl">
            <h2 className="text-xl font-semibold">{t.free.morePacks.replace("{platform}", pack.platform)}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <LocaleLink
                  key={r.slug}
                  href={`/free-services/${r.slug}`}
                  locale={locale}
                  className="card overflow-hidden hover:border-cyan-400/40"
                >
                  <img src={r.image} alt={r.imageAlt} width={400} height={225} className="aspect-[16/9] w-full object-cover" loading="lazy" />
                  <div className="p-3">
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {r.quantity} {r.unit}
                    </p>
                  </div>
                </LocaleLink>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
