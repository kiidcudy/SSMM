import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { googleAuthUrl, googleConfigured } from "@/lib/auth/google";

export async function GET(req: Request) {
  if (!googleConfigured()) {
    return NextResponse.redirect(new URL("/login?error=google_not_configured", req.url));
  }
  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;
  const state = randomBytes(16).toString("hex");
  const res = NextResponse.redirect(googleAuthUrl(state, origin));
  res.cookies.set("ssmm_google_oauth", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });
  return res;
}
