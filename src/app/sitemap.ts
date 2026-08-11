import type { MetadataRoute } from "next";
import { SITE, LOCALES, PAYMENT_METHODS, type Locale } from "@/lib/site";
import { localePath } from "@/lib/i18n/path";
import { BLOG_POSTS } from "@/lib/data/blog";
import { FREE_PACKS } from "@/lib/data/free-services";

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${SITE.url}${localePath(path, loc)}`;
  }
  languages["x-default"] = `${SITE.url}${localePath(path, SITE.localeDefault as Locale)}`;
  return {
    url: `${SITE.url}${localePath(path, SITE.localeDefault as Locale)}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/free-services", priority: 0.9 },
    { path: "/payments", priority: 0.85 },
    { path: "/blog", priority: 0.8 },
    { path: "/faq", priority: 0.75 },
    { path: "/about", priority: 0.7 },
    { path: "/api-docs", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy", priority: 0.4 },
    { path: "/terms", priority: 0.4 },
  ];

  const paymentPages = PAYMENT_METHODS.map((m) =>
    entry(`/payments/${m.slug}`, 0.7, "monthly"),
  );
  const blogPages = BLOG_POSTS.map((p) => entry(`/blog/${p.slug}`, 0.7, "monthly"));
  const freePages = FREE_PACKS.map((p) => entry(`/free-services/${p.slug}`, 0.75, "weekly"));

  return [
    ...staticPaths.map((p) => entry(p.path, p.priority)),
    ...paymentPages,
    ...blogPages,
    ...freePages,
  ];
}
