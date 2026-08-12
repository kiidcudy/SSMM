import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SITE, PAYMENT_METHODS, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata, faqJsonLd, howToJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { getHomeFaqs, getPlatforms } from "@/lib/i18n/localized-content";
import { getBlogPosts } from "@/lib/data/blog";

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
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    path: "/",
    keywords: [
      "smm panel",
      "affordable smm panel",
      "instagram smm panel",
      "paypal smm panel",
      "tiktok followers panel",
      "smm panel api",
    ],
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const platforms = getPlatforms(locale);
  const homeFaqs = getHomeFaqs(locale);

  const whyItems = [
    [t.home.why1Title, t.home.why1Body],
    [t.home.why2Title, t.home.why2Body],
    [t.home.why3Title, t.home.why3Body],
    [t.home.why4Title, t.home.why4Body],
  ] as const;

  const howItems = [
    [t.home.how1Title, t.home.how1Body],
    [t.home.how2Title, t.home.how2Body],
    [t.home.how3Title, t.home.how3Body],
    [t.home.how4Title, t.home.how4Body],
  ] as const;

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <JsonLd
        data={howToJsonLd(t.home.howTitle, [
          { name: t.home.how1Title, text: t.home.how1Body },
          { name: t.home.how2Title, text: t.home.how2Body },
          { name: t.home.how3Title, text: t.home.how3Body },
          { name: t.home.how4Title, text: t.home.how4Body },
        ])}
      />
      <JsonLd
        data={breadcrumbJsonLd([{ name: t.common.breadcrumbHome, path: "/" }], locale)}
      />

      <section className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold">
            {[t.home.badgeSupport, t.home.badgeServices, t.home.badgeFree, t.home.badgeNoPassword].map((b) => (
              <span key={b} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">
                {b}
              </span>
            ))}
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[var(--color-muted)]">{t.home.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LocaleLink href="/signup" locale={locale} className="btn-primary">
              {t.home.ctaSignup}
            </LocaleLink>
            <LocaleLink href="/services" locale={locale} className="btn-ghost">
              {t.home.ctaServices}
            </LocaleLink>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {t.home.ctaWhatsapp}
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["3000+", t.home.statsServices],
              ["24/7", t.home.statsSupport],
              ["$0.01", t.home.statsFrom],
              [t.home.statsInstantValue, t.home.statsStart],
            ].map(([v, l]) => (
              <div key={l} className="card p-4">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-cyan-300">{v}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-5 text-slate-950">
            <p className="text-sm font-semibold uppercase tracking-wide">{t.home.loginCardEyebrow}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold">{t.home.loginCardTitle}</p>
            <p className="mt-1 text-sm opacity-80">{t.home.loginCardBody}</p>
          </div>
          <div className="space-y-3 p-6">
            <LocaleLink href="/login" locale={locale} className="btn-primary w-full">
              {t.nav.login}
            </LocaleLink>
            <LocaleLink href="/signup" locale={locale} className="btn-ghost w-full">
              {t.nav.signup}
            </LocaleLink>
            <p className="text-center text-xs text-[var(--color-muted)]">{t.common.secureSsl}</p>
          </div>
        </div>
      </section>

      {/* SEO blocks — early unique content where Add funds / Why / How used to sit */}
      <section className="border-y border-[var(--color-border)] bg-[#0a1220]/70 py-14">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">SSMM Panel</p>
          <h2 className="section-title mt-3">{t.home.seoGapTitle}</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">{t.home.seoGapLead}</p>
          <ul className="mt-8 space-y-5">
            {t.home.seoGapBody.map((p) => (
              <li key={p.slice(0, 40)} className="flex gap-4 text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="section-title">{t.home.whoTitle}</h2>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.home.whoLead}</p>
        <div className="mt-10 grid gap-0 overflow-hidden rounded-2xl border border-[var(--color-border)] md:grid-cols-2">
          <article className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]/60 p-7 md:border-b-0 md:border-r">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-cyan-200">
              {t.home.whoCreatorTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{t.home.whoCreatorBody}</p>
            <LocaleLink href="/free-services" locale={locale} className="mt-5 inline-block text-sm font-semibold text-cyan-300">
              {t.nav.freeServices} →
            </LocaleLink>
          </article>
          <article className="bg-[var(--color-bg-card)]/40 p-7">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-indigo-200">
              {t.home.whoResellerTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{t.home.whoResellerBody}</p>
            <LocaleLink href="/services" locale={locale} className="mt-5 inline-block text-sm font-semibold text-cyan-300">
              {t.nav.services} →
            </LocaleLink>
          </article>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="section-title">{t.home.platformsTitle}</h2>
        <p className="mt-3 text-[var(--color-muted)]">{t.home.platformsSubtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p) => (
            <article key={p.id} className="card p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{p.body}</p>
              <LocaleLink href={p.href} locale={locale} className="mt-4 inline-block text-sm font-semibold text-cyan-300">
                {t.common.viewAll} →
              </LocaleLink>
            </article>
          ))}
        </div>
      </section>

      {/* Why — stacked rows (not 4 equal cards) */}
      <section className="container-page py-16">
        <div className="max-w-xl">
          <h2 className="section-title">{t.home.whyTitle}</h2>
          <p className="mt-3 text-[var(--color-muted)]">{t.home.whySubtitle}</p>
        </div>
        <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {whyItems.map(([title, body], i) => (
            <article
              key={title}
              className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr] sm:items-start sm:gap-8"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold tabular-nums text-cyan-300/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How — vertical timeline */}
      <section className="container-page pb-16 pt-4">
        <h2 className="section-title">{t.home.howTitle}</h2>
        <p className="mt-3 text-[var(--color-muted)]">{t.home.howSubtitle}</p>
        <ol className="relative mt-10 max-w-2xl space-y-0 pl-2">
          <span
            className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-indigo-400/60 via-cyan-400/40 to-transparent"
            aria-hidden
          />
          {howItems.map(([title, body], i) => (
            <li key={title} className="relative flex gap-5 py-5 pl-2">
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-400/50 bg-[#0b111e] text-sm font-bold text-indigo-200">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Add funds */}
      <section className="border-y border-[var(--color-border)] bg-[#0a1220]/70 py-10">
        <div className="container-page">
          <h2 className="section-title text-2xl">{t.home.paymentsStripTitle}</h2>
          <p className="mt-3 max-w-3xl text-[var(--color-muted)]">{t.home.paymentsStripBody}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((m) => (
              <LocaleLink
                key={m.slug}
                href={`/payments/${m.slug}`}
                locale={locale}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-1.5 text-sm hover:border-cyan-400/40"
              >
                {m.name}
              </LocaleLink>
            ))}
          </div>
          <p className="mt-4 text-sm text-amber-200/90">{t.common.manualPaymentNote}</p>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="section-title">{t.home.faqTitle}</h2>
        <p className="mt-3 text-[var(--color-muted)]">{t.home.faqSubtitle}</p>
        <div className="mt-8 space-y-3">
          {homeFaqs.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:content-none">
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <h2 className="section-title">{t.home.aboutTitle}</h2>
        <div className="prose-panel mt-6 max-w-3xl space-y-4">
          {t.home.aboutBody.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <LocaleLink href="/about" locale={locale} className="mt-5 inline-block text-sm font-semibold text-cyan-300">
          {t.footer.about} →
        </LocaleLink>
      </section>

      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">{t.home.blogTitle}</h2>
            <p className="mt-2 text-[var(--color-muted)]">{t.home.blogSubtitle}</p>
          </div>
          <LocaleLink href="/blog" locale={locale} className="text-sm font-semibold text-cyan-300">
            {t.common.viewAll}
          </LocaleLink>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {getBlogPosts(locale).slice(0, 3).map((post) => (
            <article key={post.slug} className="card overflow-hidden">
              <LocaleLink href={`/blog/${post.slug}`} locale={locale}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={640}
                  height={360}
                  className="aspect-[16/9] w-full object-cover"
                />
              </LocaleLink>
              <div className="p-5">
                <h3 className="font-semibold leading-snug">
                  <LocaleLink href={`/blog/${post.slug}`} locale={locale}>
                    {post.title}
                  </LocaleLink>
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{post.excerpt}</p>
                <LocaleLink href={`/blog/${post.slug}`} locale={locale} className="mt-4 inline-block text-sm text-cyan-300">
                  {t.common.readMore}
                </LocaleLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="card overflow-hidden bg-gradient-to-br from-indigo-600/30 to-cyan-500/20 p-8 text-center md:p-12">
          <h2 className="section-title">{t.home.ctaBandTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--color-muted)]">{t.home.ctaBandBody}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LocaleLink href="/signup" locale={locale} className="btn-primary">
              {t.home.ctaSignup}
            </LocaleLink>
            <LocaleLink href="/api-docs" locale={locale} className="btn-ghost">
              {t.nav.api}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
