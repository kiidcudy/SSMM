import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPageChrome } from "@/lib/i18n/pages/chrome";
import { createMetadata } from "@/lib/seo";
import { LocaleLink } from "@/components/LocaleLink";
import { LoginForm } from "@/components/LoginForm";

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
    title: t.meta.loginTitle,
    description: t.meta.loginTitle,
    path: "/login",
    noIndex: true,
  });
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = getPageChrome(locale);

  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md">
        <h1 className="section-title text-center">{t.nav.login}</h1>
        <p className="mt-2 text-center text-sm text-[var(--color-muted)]">{t.common.secureSsl}</p>
        <div className="mt-8">
          <LoginForm
            labels={{
              username: c.formUsername,
              password: c.formPassword,
              submit: c.formLoginBtn,
              error: c.formError,
            }}
          />
        </div>
        <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
          {c.loginNoAccount}{" "}
          <LocaleLink href="/signup" locale={locale} className="text-cyan-300">
            {c.loginCreate}
          </LocaleLink>
        </p>
      </div>
    </section>
  );
}
