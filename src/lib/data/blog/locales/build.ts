import type { BlogPost, BlogFaq } from "@/lib/data/blog/types";

export type BlogLocaleFields = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string[];
  excerpt: string;
  takeaway: string;
  imageAlt: string;
  imageAlt2: string;
  contentHtml: string;
  faq: BlogFaq[];
};

export function assemblePost(base: BlogPost, fields: BlogLocaleFields): BlogPost {
  return {
    ...base,
    ...fields,
  };
}
