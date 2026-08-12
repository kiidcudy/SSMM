import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";
import { LOCALE_COOKIE, SITE, isLocale } from "@/lib/site";

const PUBLIC_FILE = /\.[^/]+$/;

function withLocaleCookie(res: NextResponse, locale: string) {
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Dashboard keeps its own language switcher; do not rewrite locale.
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (maybeLocale && isLocale(maybeLocale)) {
    if (maybeLocale === SITE.localeDefault) {
      const url = request.nextUrl.clone();
      url.pathname = "/" + segments.slice(1).join("/");
      return withLocaleCookie(NextResponse.redirect(url, 308), SITE.localeDefault);
    }
    return withLocaleCookie(NextResponse.next(), maybeLocale);
  }

  // Unprefixed paths are English (default) — rewrite internally to /en/...
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return withLocaleCookie(NextResponse.rewrite(url), SITE.localeDefault);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
