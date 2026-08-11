import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE, isLocale } from "@/lib/site";

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (maybeLocale && isLocale(maybeLocale)) {
    if (maybeLocale === SITE.localeDefault) {
      const url = request.nextUrl.clone();
      url.pathname = "/" + segments.slice(1).join("/");
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  // Unprefixed paths are English (default) — rewrite internally to /en/...
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
