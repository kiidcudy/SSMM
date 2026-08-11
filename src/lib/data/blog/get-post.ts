import type { Locale } from "@/lib/site";
import type { BlogPost } from "@/lib/data/blog/types";
import { BLOG_POSTS as EN_POSTS } from "@/lib/data/blog/posts";
import { BLOG_LOCALES } from "@/lib/data/blog/locales";

export function getBlogPosts(locale: Locale = "en"): BlogPost[] {
  if (locale === "en") return EN_POSTS;
  return EN_POSTS.map((p) => getPost(p.slug, locale)!).filter(Boolean);
}

export function getPost(slug: string, locale: Locale = "en"): BlogPost | undefined {
  const base = EN_POSTS.find((p) => p.slug === slug);
  if (!base) return undefined;
  if (locale === "en") return base;
  const overlay = BLOG_LOCALES[locale]?.[slug];
  return overlay ?? base;
}
