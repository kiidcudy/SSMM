import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SITE, isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localePath } from "@/lib/i18n/path";
import { createMetadata, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { BLOG_POSTS, getBlogPosts, getPost, withToc, wordCount } from "@/lib/data/blog";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { tpl } from "@/lib/i18n/pages/tpl";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

function localizeInternalHrefs(html: string, locale: Locale): string {
  if (locale === "en") return html;
  return html.replace(/href="(\/[^"]*)"/g, (_m, path: string) => {
    if (path.startsWith("//")) return `href="${path}"`;
    return `href="${localePath(path, locale)}"`;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const post = getPost(slug, raw);
  if (!post) return {};
  return createMetadata({
    locale: raw,
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: [post.focusKeyword, ...post.keywords],
    image: post.image.startsWith("http") ? post.image : `${SITE.url}${post.image}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();

  const words = wordCount(post.contentHtml);
  const readMin = Math.max(4, Math.round(words / 200));
  const { body, toc } = withToc(localizeInternalHrefs(post.contentHtml, locale));
  const related = getBlogPosts(locale).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.metaDescription,
          path: `/blog/${post.slug}`,
          locale,
          date: post.date,
          updatedAt: post.updatedAt,
          image: post.image,
          keywords: [post.focusKeyword, ...post.keywords],
        })}
      />
      <JsonLd data={faqJsonLd(post.faq)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.blog, path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ],
          locale,
        )}
      />

      <article className="container-page py-14">
        <LocaleLink href="/blog" locale={locale} className="text-sm text-cyan-300">
          ← {t.nav.blog}
        </LocaleLink>

        <header className="mt-4 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300/80">
            {post.focusKeyword}
          </p>
          <h1 className="section-title mt-2">{post.title}</h1>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {tpl(c.blogReadMeta, {
              date: post.date,
              updated: post.updatedAt,
              author: post.author,
              min: readMin,
              words,
            })}
          </p>
          <p className="mt-4 text-lg text-[var(--color-muted)]">{post.excerpt}</p>
        </header>

        <Image
          src={post.image}
          alt={post.imageAlt}
          width={1200}
          height={675}
          className="mt-8 aspect-[16/9] w-full max-w-3xl rounded-2xl border border-[var(--color-border)] object-cover"
          priority
        />

        <aside className="card mt-6 max-w-3xl border-cyan-400/20 bg-cyan-400/5 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-cyan-300">{t.free.keyTakeaways}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{post.takeaway}</p>
        </aside>

        {toc.length > 1 && (
          <nav className="rank-math-toc max-w-3xl" aria-label={t.free.toc}>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
              {t.free.toc}
            </p>
            <ol className="mt-2 space-y-1.5 text-sm">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    {i + 1}. {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div
          className="prose-panel mt-8 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <Image
          src={post.image2}
          alt={post.imageAlt2}
          width={1200}
          height={675}
          className="mt-10 aspect-[16/9] w-full max-w-3xl rounded-2xl border border-[var(--color-border)] object-cover"
        />

        <section className="mt-12 max-w-3xl">
          <h2 className="section-title text-2xl">{t.free.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {post.faq.map((f) => (
              <details key={f.q} className="card p-5">
                <summary className="cursor-pointer list-none font-semibold marker:content-none">{f.q}</summary>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold">{t.home.blogTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <LocaleLink
                key={r.slug}
                href={`/blog/${r.slug}`}
                locale={locale}
                className="card overflow-hidden transition hover:border-cyan-400/40"
              >
                <Image src={r.image} alt={r.imageAlt} width={400} height={225} className="aspect-[16/9] w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm font-semibold leading-snug">{r.title}</p>
                </div>
              </LocaleLink>
            ))}
          </div>
        </div>

        <div className="card mt-10 max-w-3xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/10 p-6 text-center">
          <p className="font-semibold">{c.blogCtaTitle}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{c.blogCtaBody}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <LocaleLink href="/signup" locale={locale} className="btn-primary">
              {t.home.ctaSignup}
            </LocaleLink>
            <LocaleLink href="/free-services" locale={locale} className="btn-ghost">
              {t.nav.freeServices}
            </LocaleLink>
          </div>
        </div>
      </article>
    </>
  );
}
