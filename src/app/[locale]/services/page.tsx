import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { listServices } from "@/lib/store/db";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { PublicServicesCatalog } from "@/components/PublicServicesCatalog";

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
    title: t.meta.servicesTitle,
    description: t.meta.servicesDescription,
    path: "/services",
    keywords: [
      "smm services",
      "instagram followers",
      "tiktok views",
      "youtube subscribers",
      "cheap smm panel services",
    ],
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const services = await listServices();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.services, path: "/services" },
          ],
          locale,
        )}
      />

      <section className="container-page py-14">
        <h1 className="section-title">{t.meta.servicesTitle}</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.meta.servicesDescription}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LocaleLink href="/signup" locale={locale} className="btn-primary">
            {t.home.ctaSignup}
          </LocaleLink>
          <Link href="/dashboard/new-order" className="btn-ghost">
            {t.dash.newOrder}
          </Link>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          {services.length}+ · {c.servicesNote}
        </p>
      </section>

      <section className="container-page pb-20">
        {services.length === 0 ? (
          <p className="text-[var(--color-muted)]">Services are syncing from the provider. Check back shortly.</p>
        ) : (
          <PublicServicesCatalog
            services={services.map((s) => ({
              id: s.id,
              name: s.name,
              category: s.category,
              rate: s.rate,
              min: s.min,
              max: s.max,
              description: s.description,
              refill: s.refill,
              cancel: s.cancel,
              dripfeed: s.dripfeed,
            }))}
            buyHref="/dashboard/new-order?service={id}"
            labels={{
              search: "Search in services",
              category: "Category",
              advanced: "Advanced Filters",
              allCategories: "All categories",
              min: c.servicesColMin,
              max: c.servicesColMax,
              description: t.dash.description,
              buyNow: "Buy Now",
              close: "Close",
              noResults: "No services match your search or filters.",
              refill: "Refill",
              cancel: "Cancel",
              dripfeed: "Drip-feed",
              instant: "Instant start",
              clearFilters: "Clear filters",
              results: "{count} services",
            }}
          />
        )}
      </section>
    </>
  );
}
