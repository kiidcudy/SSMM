import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { servicesByCategory } from "@/lib/data/catalog";
import { listServices } from "@/lib/store/db";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { detectPlatform } from "@/lib/platforms";
import { PlatformIcon } from "@/components/PlatformIcon";

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
  const grouped = servicesByCategory(services);

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

      <section className="container-page space-y-10 pb-20">
        {services.length === 0 ? (
          <p className="text-[var(--color-muted)]">Services are syncing from the provider. Check back shortly.</p>
        ) : (
          Object.entries(grouped).map(([category, rows]) => (
            <div key={category}>
              <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                <PlatformIcon platform={detectPlatform(category)} size="md" />
                {category}
              </h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-[#0a1220] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                    <tr>
                      <th className="px-4 py-3">{c.servicesColId}</th>
                      <th className="px-4 py-3">{c.servicesColService}</th>
                      <th className="px-4 py-3">{c.servicesColRate}</th>
                      <th className="px-4 py-3">{c.servicesColMin}</th>
                      <th className="px-4 py-3">{c.servicesColMax}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s) => (
                      <tr key={s.id} className="border-t border-[var(--color-border)]">
                        <td className="px-4 py-3 text-cyan-300">{s.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-2">
                            <PlatformIcon platform={detectPlatform(s.category, s.name)} size="sm" className="mt-0.5" />
                            <div>
                              <p className="font-medium">{s.name}</p>
                              {s.description ? (
                                <p className="mt-1 text-xs text-[var(--color-muted)]">{s.description}</p>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">${s.rate.toFixed(4)}</td>
                        <td className="px-4 py-3">{s.min}</td>
                        <td className="px-4 py-3">{s.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
