export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  date: string;
  updatedAt: string;
  author: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string[];
  excerpt: string;
  takeaway: string;
  image: string;
  image2: string;
  imageAlt: string;
  imageAlt2: string;
  contentHtml: string;
  faq: BlogFaq[];
};

export function withToc(html: string): { body: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  let i = 0;
  const body = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const id = `s${i++}`;
    toc.push({ id, text: String(inner).replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { body, toc };
}

export function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}
