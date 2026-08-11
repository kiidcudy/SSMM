import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
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
  const t = getDictionary(raw);
  return createMetadata({
    locale: raw,
    title: t.meta.apiTitle,
    description: t.meta.apiDescription,
    path: "/api-docs",
    keywords: ["smm panel api", "perfectpanel api", "reseller api", "smm api"],
  });
}

export default async function ApiDocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const endpoint = `${SITE.url}/api/v2`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.api, path: "/api-docs" },
          ],
          locale,
        )}
      />

      <section className="container-page py-14">
        <h1 className="section-title">{t.meta.apiTitle}</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.meta.apiDescription}</p>

        <div className="card mt-8 p-6">
          <p className="text-sm text-[var(--color-muted)]">{c.apiEndpoint}</p>
          <p className="mt-1 font-mono text-cyan-300">POST {endpoint}</p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Content-Type: <code>application/x-www-form-urlencoded</code>
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{c.apiAuthNote}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {c.apiActions.map((item) => (
            <article key={item.action} className="card p-5">
              <h2 className="font-mono text-lg font-semibold text-indigo-200">action={item.action}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="card mt-10 overflow-hidden">
          <div className="border-b border-[var(--color-border)] px-5 py-3 text-sm font-semibold">
            {c.apiExample}
          </div>
          <pre className="overflow-x-auto p-5 text-sm text-[var(--color-muted)]">{`curl -X POST ${endpoint} \\
  -d "key=YOUR_API_KEY" \\
  -d "action=services"

curl -X POST ${endpoint} \\
  -d "key=YOUR_API_KEY" \\
  -d "action=add" \\
  -d "service=1001" \\
  -d "link=https://instagram.com/username" \\
  -d "quantity=100"

curl -X POST ${endpoint} \\
  -d "key=YOUR_API_KEY" \\
  -d "action=status" \\
  -d "order=ORDER_ID"

curl -X POST ${endpoint} \\
  -d "key=YOUR_API_KEY" \\
  -d "action=balance"

curl -X POST ${endpoint} \\
  -d "key=YOUR_API_KEY" \\
  -d "action=refill" \\
  -d "order=ORDER_ID"

curl -X POST ${endpoint} \\
  -d "key=YOUR_API_KEY" \\
  -d "action=cancel" \\
  -d "orders=ORDER_ID"`}</pre>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <LocaleLink href="/signup" locale={locale} className="btn-primary">
            {t.home.ctaSignup}
          </LocaleLink>
          <Link href="/dashboard/api" className="btn-ghost">
            {t.dash.api}
          </Link>
        </div>
      </section>
    </>
  );
}
