import { cookies } from "next/headers";
import { LOCALE_COOKIE, SITE, isLocale, type Locale } from "@/lib/site";

export async function readPreferredLocale(): Promise<Locale> {
  const jar = await cookies();
  const raw = jar.get(LOCALE_COOKIE)?.value;
  if (raw && isLocale(raw)) return raw;
  return SITE.localeDefault;
}

export { LOCALE_COOKIE };
