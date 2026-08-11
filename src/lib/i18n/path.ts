import { LOCALES, SITE, type Locale, isLocale } from "@/lib/site";

/** Locale-prefixed path. EN stays unprefixed for SEO strength. */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === SITE.localeDefault) {
    return clean === "/" ? "/" : clean;
  }
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function stripLocalePrefix(pathname: string): { locale: Locale; path: string } {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (first && isLocale(first) && first !== SITE.localeDefault) {
    const rest = "/" + parts.slice(1).join("/");
    return { locale: first, path: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/" };
  }
  return { locale: SITE.localeDefault as Locale, path: pathname || "/" };
}

export function buildAlternates(path: string, baseUrl = SITE.url): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${baseUrl}${localePath(path, loc)}`;
  }
  languages["x-default"] = `${baseUrl}${localePath(path, SITE.localeDefault as Locale)}`;
  return languages;
}
