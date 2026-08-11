import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../src/lib/data/blog/locales");
mkdirSync(outDir, { recursive: true });

const IMG = {
  what: ["/blog/smm-panel-beginners-cover.png", "/blog/smm-panel-beginners-mid.png"],
  cheap: ["/blog/cheapest-smm-panel-cover.png", "/blog/cheapest-smm-panel-mid.png"],
  ig: ["/blog/instagram-smm-cover.png", "/blog/instagram-smm-mid.png"],
  pp: ["/blog/paypal-smm-cover.png", "/blog/paypal-smm-mid.png"],
  free: ["/blog/free-vs-paid-cover.png", "/blog/free-vs-paid-mid.png"],
};

function mkHtml({ intro, sections, table, img1, img2, alt1, alt2, outro }) {
  let h = intro.map((p) => `<p>${p}</p>`).join("\n");
  h += `\n<img src="${img1}" alt="${alt1}" />\n`;
  sections.forEach((s, i) => {
    h += `<h2>${s.h2}</h2>\n`;
    h += s.ps.map((p) => `<p>${p}</p>`).join("\n") + "\n";
    if (i === 1 && table) {
      h += `<table><thead><tr>${table.h.map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>`;
      h += table.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
      h += `</tbody></table>\n`;
    }
    if (i === 2) h += `<img src="${img2}" alt="${alt2}" />\n`;
  });
  if (outro) h += outro.map((p) => `<p>${p}</p>`).join("\n");
  return h;
}

function faq(items) {
  return items.map(([q, a]) => ({ q, a }));
}

/** Build one locale's 5 posts — data factories */
function buildLocale(L) {
  const posts = {};

  posts["what-is-an-smm-panel-beginners-guide-2026"] = {
    title: L.what.title,
    metaTitle: L.what.metaTitle,
    metaDescription: L.what.metaDescription,
    focusKeyword: L.what.fk,
    keywords: L.what.kw,
    excerpt: L.what.excerpt,
    takeaway: L.what.takeaway,
    imageAlt: L.what.alt1,
    imageAlt2: L.what.alt2,
    contentHtml: mkHtml({
      intro: L.what.intro,
      sections: L.what.sections,
      table: L.what.table,
      img1: IMG.what[0],
      img2: IMG.what[1],
      alt1: L.what.alt1,
      alt2: L.what.alt2,
      outro: L.what.outro,
    }),
    faq: faq(L.what.faq),
  };

  posts["how-to-choose-the-cheapest-smm-panel"] = {
    title: L.cheap.title,
    metaTitle: L.cheap.metaTitle,
    metaDescription: L.cheap.metaDescription,
    focusKeyword: L.cheap.fk,
    keywords: L.cheap.kw,
    excerpt: L.cheap.excerpt,
    takeaway: L.cheap.takeaway,
    imageAlt: L.cheap.alt1,
    imageAlt2: L.cheap.alt2,
    contentHtml: mkHtml({
      intro: L.cheap.intro,
      sections: L.cheap.sections,
      table: L.cheap.table,
      img1: IMG.cheap[0],
      img2: IMG.cheap[1],
      alt1: L.cheap.alt1,
      alt2: L.cheap.alt2,
      outro: L.cheap.outro,
    }),
    faq: faq(L.cheap.faq),
  };

  posts["instagram-smm-panel-followers-likes-reels"] = {
    title: L.ig.title,
    metaTitle: L.ig.metaTitle,
    metaDescription: L.ig.metaDescription,
    focusKeyword: L.ig.fk,
    keywords: L.ig.kw,
    excerpt: L.ig.excerpt,
    takeaway: L.ig.takeaway,
    imageAlt: L.ig.alt1,
    imageAlt2: L.ig.alt2,
    contentHtml: mkHtml({
      intro: L.ig.intro,
      sections: L.ig.sections,
      table: L.ig.table,
      img1: IMG.ig[0],
      img2: IMG.ig[1],
      alt1: L.ig.alt1,
      alt2: L.ig.alt2,
      outro: L.ig.outro,
    }),
    faq: faq(L.ig.faq),
  };

  posts["paypal-smm-panel-how-to-add-funds"] = {
    title: L.pp.title,
    metaTitle: L.pp.metaTitle,
    metaDescription: L.pp.metaDescription,
    focusKeyword: L.pp.fk,
    keywords: L.pp.kw,
    excerpt: L.pp.excerpt,
    takeaway: L.pp.takeaway,
    imageAlt: L.pp.alt1,
    imageAlt2: L.pp.alt2,
    contentHtml: mkHtml({
      intro: L.pp.intro,
      sections: L.pp.sections,
      table: L.pp.table,
      img1: IMG.pp[0],
      img2: IMG.pp[1],
      alt1: L.pp.alt1,
      alt2: L.pp.alt2,
      outro: L.pp.outro,
    }),
    faq: faq(L.pp.faq),
  };

  posts["free-smm-services-vs-paid-when-to-upgrade"] = {
    title: L.free.title,
    metaTitle: L.free.metaTitle,
    metaDescription: L.free.metaDescription,
    focusKeyword: L.free.fk,
    keywords: L.free.kw,
    excerpt: L.free.excerpt,
    takeaway: L.free.takeaway,
    imageAlt: L.free.alt1,
    imageAlt2: L.free.alt2,
    contentHtml: mkHtml({
      intro: L.free.intro,
      sections: L.free.sections,
      table: L.free.table,
      img1: IMG.free[0],
      img2: IMG.free[1],
      alt1: L.free.alt1,
      alt2: L.free.alt2,
      outro: L.free.outro,
    }),
    faq: faq(L.free.faq),
  };

  return posts;
}

function writeLocale(code, data) {
  const posts = buildLocale(data);
  const body = Object.entries(posts)
    .map(
      ([slug, p]) => `  ${JSON.stringify(slug)}: assemblePost(base(${JSON.stringify(slug)}), ${JSON.stringify(p, null, 2).replace(/\n/g, "\n  ")}),`,
    )
    .join("\n");

  const file = `import type { BlogPost } from "@/lib/data/blog/types";
import { BLOG_POSTS } from "@/lib/data/blog/posts";
import { assemblePost } from "@/lib/data/blog/locales/build";

function base(slug: string): BlogPost {
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) throw new Error("missing " + slug);
  return p;
}

export const posts: Record<string, BlogPost> = {
${body}
};
`;
  writeFileSync(join(outDir, `${code}.ts`), file, "utf8");
  console.log("ok", code, Object.keys(posts).length);
}

// Import locale data from data file
import { LOCALE_DATA } from "./blog-locale-data.mjs";
for (const [code, data] of Object.entries(LOCALE_DATA)) {
  writeLocale(code, data);
}

writeFileSync(
  join(outDir, "index.ts"),
  `import type { Locale } from "@/lib/site";
import type { BlogPost } from "@/lib/data/blog/types";
import { posts as tr } from "./tr";
import { posts as es } from "./es";
import { posts as ptBr } from "./pt-br";
import { posts as ar } from "./ar";
import { posts as id } from "./id";
import { posts as bn } from "./bn";
import { posts as hi } from "./hi";

export const BLOG_LOCALES: Partial<Record<Locale, Record<string, BlogPost>>> = {
  tr,
  es,
  "pt-br": ptBr,
  ar,
  id,
  bn,
  hi,
};
`,
  "utf8",
);
console.log("index written");
