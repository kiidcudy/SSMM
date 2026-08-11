import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LocaleLink } from "@/components/LocaleLink";
import { getBlogPosts } from "@/lib/data/blog";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { tpl } from "@/lib/i18n/pages/tpl";

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
    title: t.meta.blogTitle,
    description: t.meta.blogDescription,
    path: "/blog",
    keywords: ["smm panel blog", "smm guides", "instagram growth", "paypal smm panel"],
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);
  const posts = getBlogPosts(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: t.common.breadcrumbHome, path: "/" },
            { name: t.nav.blog, path: "/blog" },
          ],
          locale,
        )}
      />

      <section className="container-page py-14">
        <h1 className="section-title">{t.meta.blogTitle}</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{t.meta.blogDescription}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="card overflow-hidden">
              <LocaleLink href={`/blog/${post.slug}`} locale={locale}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={1200}
                  height={675}
                  className="aspect-[16/9] w-full object-cover"
                />
              </LocaleLink>
              <div className="p-6">
                <time className="text-xs text-[var(--color-muted)]" dateTime={post.date}>
                  {post.date} · {tpl(c.blogUpdated, { date: post.updatedAt })}
                </time>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug">
                  <LocaleLink href={`/blog/${post.slug}`} locale={locale}>
                    {post.title}
                  </LocaleLink>
                </h2>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{post.excerpt}</p>
                <LocaleLink
                  href={`/blog/${post.slug}`}
                  locale={locale}
                  className="mt-4 inline-block text-sm font-semibold text-cyan-300"
                >
                  {t.common.readMore} →
                </LocaleLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
