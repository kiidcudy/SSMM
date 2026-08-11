import type { Metadata } from "next";
import { SITE, LOCALE_OG, type Locale } from "@/lib/site";
import { buildAlternates, localePath } from "@/lib/i18n/path";

export type SeoInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createMetadata({
  locale,
  title,
  description,
  path,
  keywords,
  image,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoInput): Metadata {
  const branded = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const fullTitle = branded.length <= 65 ? branded : title;
  const url = `${SITE.url}${localePath(path, locale)}`;
  const ogImage = image ?? `${SITE.url}/og-default.png`;
  const languages = buildAlternates(path);

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type,
      locale: LOCALE_OG[locale],
      alternateLocale: Object.values(LOCALE_OG).filter((v) => v !== LOCALE_OG[locale]),
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      site: SITE.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/logo.png`,
    sameAs: [SITE.telegramUrl, `https://wa.me/${SITE.whatsapp}`],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        availableLanguage: ["English", "Turkish", "Spanish", "Arabic", "Portuguese", "Indonesian", "Bengali", "Hindi"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/services?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${localePath(item.path, locale)}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  date: string;
  updatedAt?: string;
  image?: string;
  keywords?: string[];
}) {
  const imageUrl = input.image?.startsWith("http")
    ? input.image
    : `${SITE.url}${input.image ?? "/og-default.png"}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.updatedAt ?? input.date,
    image: [imageUrl],
    keywords: input.keywords?.join(", "),
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: `${SITE.url}${localePath(input.path, input.locale)}`,
  };
}

export function howToJsonLd(name: string, steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
