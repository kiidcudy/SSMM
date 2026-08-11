import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "ssmm_session";

export type SessionUser = {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  balance: number;
  apiKey: string;
};

function secret(): Uint8Array {
  const raw = process.env.AUTH_SECRET || "ssmm-dev-secret-change-me-in-production-32b";
  return new TextEncoder().encode(raw);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    balance: user.balance,
    apiKey: user.apiKey,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
}

export async function readSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      id: String(payload.id),
      username: String(payload.username),
      email: String(payload.email),
      role: payload.role === "admin" ? "admin" : "user",
      balance: Number(payload.balance ?? 0),
      apiKey: String(payload.apiKey ?? ""),
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export { COOKIE as SESSION_COOKIE };
