import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../src/lib/data/blog/locales");
mkdirSync(outDir, { recursive: true });

/** @typedef {{ title: string, metaTitle: string, metaDescription: string, focusKeyword: string, keywords: string[], excerpt: string, takeaway: string, imageAlt: string, imageAlt2: string, sections: {h2:string, ps:string[]}[], table: {h:string[], rows:string[][]}, faq: {q:string,a:string}[], cta?: string }} LocPost */

function html(p, img1, img2) {
  const parts = [];
  parts.push(`<p>${p.sections[0].ps[0]}</p>`);
  if (p.sections[0].ps[1]) parts.push(`<p>${p.sections[0].ps[1]}</p>`);
  parts.push(`<img src="${img1}" alt="${p.imageAlt}" />`);
  for (let i = 1; i < p.sections.length; i++) {
    const s = p.sections[i];
    parts.push(`<h2>${s.h2}</h2>`);
    for (const para of s.ps) parts.push(`<p>${para}</p>`);
    if (i === 2) {
      parts.push(`<table><thead><tr>${p.table.h.map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${p.table.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
    }
    if (i === 3) parts.push(`<img src="${img2}" alt="${p.imageAlt2}" />`);
  }
  if (p.cta) parts.push(`<p>${p.cta}</p>`);
  return parts.join("\n");
}

function emitLocale(code, posts, images) {
  const entries = Object.entries(posts)
    .map(([slug, p]) => {
      const img = images[slug];
      const contentHtml = html(p, img[0], img[1]);
      return `  "${slug}": assemblePost(base("${slug}"), {
    title: ${JSON.stringify(p.title)},
    metaTitle: ${JSON.stringify(p.metaTitle)},
    metaDescription: ${JSON.stringify(p.metaDescription)},
    focusKeyword: ${JSON.stringify(p.focusKeyword)},
    keywords: ${JSON.stringify(p.keywords)},
    excerpt: ${JSON.stringify(p.excerpt)},
    takeaway: ${JSON.stringify(p.takeaway)},
    imageAlt: ${JSON.stringify(p.imageAlt)},
    imageAlt2: ${JSON.stringify(p.imageAlt2)},
    contentHtml: ${JSON.stringify(contentHtml)},
    faq: ${JSON.stringify(p.faq)},
  })`;
    })
    .join(",\n");

  const file = `import type { BlogPost } from "@/lib/data/blog/types";
import { BLOG_POSTS } from "@/lib/data/blog/posts";
import { assemblePost } from "@/lib/data/blog/locales/build";

function base(slug: string): BlogPost {
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) throw new Error(slug);
  return p;
}

export const posts: Record<string, BlogPost> = {
${entries}
};
`;
  writeFileSync(join(outDir, `${code}.ts`), file, "utf8");
  console.log("wrote", code);
}

const images = {
  "what-is-an-smm-panel-beginners-guide-2026": [
    "/blog/smm-panel-beginners-cover.png",
    "/blog/smm-panel-beginners-mid.png",
  ],
  "how-to-choose-the-cheapest-smm-panel": [
    "/blog/cheapest-smm-panel-cover.png",
    "/blog/cheapest-smm-panel-mid.png",
  ],
  "instagram-smm-panel-followers-likes-reels": [
    "/blog/instagram-smm-cover.png",
    "/blog/instagram-smm-mid.png",
  ],
  "paypal-smm-panel-how-to-add-funds": ["/blog/paypal-smm-cover.png", "/blog/paypal-smm-mid.png"],
  "free-smm-services-vs-paid-when-to-upgrade": [
    "/blog/free-vs-paid-cover.png",
    "/blog/free-vs-paid-mid.png",
  ],
};

/** @type {Record<string, Record<string, LocPost>>} */
const LOCALES = {};

// Content loaded from companion - will set below
export { LOCALES, emitLocale, images, html };
