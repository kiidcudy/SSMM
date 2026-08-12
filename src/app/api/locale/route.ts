import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, isLocale } from "@/lib/site";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { locale?: string };
    if (!body.locale || !isLocale(body.locale)) {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }
    const jar = await cookies();
    jar.set(LOCALE_COOKIE, body.locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return NextResponse.json({ ok: true, locale: body.locale });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}
