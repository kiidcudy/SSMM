import { notFound } from "next/navigation";
import { LOCALES, isLocale, isRtl, type Locale } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingSupport } from "@/components/FloatingSupport";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const rtl = isRtl(locale);

  return (
    <div lang={locale} dir={rtl ? "rtl" : "ltr"} className="min-h-screen">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
      <FloatingSupport />
    </div>
  );
}
