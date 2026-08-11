import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

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
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    path: "/contact",
    keywords: ["smm panel support", "whatsapp smm panel", "telegram smm support"],
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  const channels = [
    {
      title: "WhatsApp",
      value: SITE.whatsappDisplay,
      href: `https://wa.me/${SITE.whatsapp}`,
      body: t.contact.waBody,
    },
    {
      title: "Telegram",
      value: `@${SITE.telegram}`,
      href: SITE.telegramUrl,
      body: t.contact.tgBody,
    },
    {
      title: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      body: t.contact.emailBody,
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.contact, path: "/contact" },
          ],
          locale,
        )}
      />

      <section className="container-page py-14">
        <h1 className="section-title">{t.meta.contactTitle}</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.meta.contactDescription}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="card block p-6 transition hover:border-cyan-400/40"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">{c.title}</h2>
              <p className="mt-2 font-semibold text-cyan-300">{c.value}</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{c.body}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
