import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeGoogleCode, googleConfigured } from "@/lib/auth/google";
import { findOrCreateGoogleUser, toSessionUser, touchAuth } from "@/lib/store/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;
  const errRedirect = (msg: string) =>
    NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(msg)}`, origin));

  if (!googleConfigured()) {
    return errRedirect("google_not_configured");
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");
  if (oauthError) return errRedirect(oauthError);
  if (!code || !state) return errRedirect("missing_code");

  const jar = await cookies();
  const expected = jar.get("ssmm_google_oauth")?.value;
  if (!expected || expected !== state) {
    return errRedirect("invalid_state");
  }

  try {
    const profile = await exchangeGoogleCode(code, origin);
    const user = await findOrCreateGoogleUser(profile);
    if (user.status !== "active") {
      return errRedirect("account_suspended");
    }
    await touchAuth(user.id);
    const sessionUser = toSessionUser(user);
    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);
    const res = NextResponse.redirect(new URL("/dashboard/new-order", origin));
    res.cookies.set("ssmm_google_oauth", "", { path: "/", maxAge: 0 });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "google_failed";
    return errRedirect(message);
  }
}
