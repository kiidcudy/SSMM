import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { FREE_PACKS, type FreePlatform } from "@/lib/data/free-services";
import { localizeFreePack } from "@/lib/data/free-pack-seo";
import { getHomeFaqs } from "@/lib/i18n/localized-content";
import { getPageChrome } from "@/lib/i18n/pages/chrome";

const PLATFORM_ORDER: FreePlatform[] = [
  "instagram",
  "tiktok",
  "youtube",
  "telegram",
  "facebook",
  "twitter",
  "spotify",
  "twitch",
];

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
    title: t.meta.freeTitle,
    description: t.meta.freeDescription,
    path: "/free-services",
    keywords: [
      "free smm services",
      "free instagram followers",
      "free tiktok views",
      "free youtube likes",
      "smm panel free trial",
    ],
  });
}

export default async function FreeServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const hubFaqs = getHomeFaqs(locale).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(hubFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.freeServices, path: "/free-services" },
          ],
          locale,
        )}
      />

      <section className="container-page py-14">
        <h1 className="section-title">{t.free.title}</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.free.subtitle}</p>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
          {t.free.hubIntro.replace("{count}", String(FREE_PACKS.length))}
        </p>

        {PLATFORM_ORDER.map((platform) => {
          const packs = FREE_PACKS.filter((p) => p.platform === platform);
          if (!packs.length) return null;
          return (
            <div key={platform} className="mt-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold capitalize">
                {platform === "twitter" ? "Twitter / X" : platform}
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {packs.map((base) => {
                  const pack = localizeFreePack(base, locale);
                  return (
                  <article key={pack.slug} className="card flex flex-col overflow-hidden">
                    <LocaleLink href={`/free-services/${pack.slug}`} locale={locale}>
                      <Image
                        src={pack.image}
                        alt={pack.imageAlt}
                        width={640}
                        height={360}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </LocaleLink>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug">
                        <LocaleLink href={`/free-services/${pack.slug}`} locale={locale}>
                          {pack.title}
                        </LocaleLink>
                      </h3>
                      <p className="mt-2 text-xl font-bold text-indigo-200">
                        {pack.quantity} {pack.unit}
                      </p>
                      <p className="mt-2 flex-1 text-sm text-[var(--color-muted)]">{pack.description}</p>
                      <p className="mt-2 text-xs text-[var(--color-muted)]">
                        {t.free.cooldownHours.replace("{hours}", String(pack.cooldownHours))}
                      </p>
                      <LocaleLink
                        href={`/free-services/${pack.slug}`}
                        locale={locale}
                        className="btn-primary mt-4 w-full"
                      >
                        {t.free.claim}
                      </LocaleLink>
                    </div>
                  </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <section className="container-page pb-12">
        <div className="card p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">{t.free.rulesTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-muted)]">
            {c.freeRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-20">
        <h2 className="section-title text-2xl">{t.free.faqHeading}</h2>
        <div className="mt-6 max-w-3xl space-y-3">
          {hubFaqs.map((f) => (
            <details key={f.q} className="card p-5">
              <summary className="cursor-pointer list-none font-semibold marker:content-none">{f.q}</summary>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
