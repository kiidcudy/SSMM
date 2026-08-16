/** Request geo helpers for admin country flags. */

const IGNORE = new Set(["XX", "T1", ""]);

export function getRequestCountryCode(headers: Headers): string | undefined {
  for (const key of ["x-vercel-ip-country", "cf-ipcountry", "x-country-code"]) {
    const raw = headers.get(key)?.trim().toUpperCase();
    if (!raw || IGNORE.has(raw)) continue;
    if (/^[A-Z]{2}$/.test(raw)) return raw;
  }
  return undefined;
}

export function countryFlagEmoji(code?: string | null): string {
  if (!code || !/^[A-Za-z]{2}$/.test(code)) return "";
  const cc = code.toUpperCase();
  return String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)));
}

export function countryDisplayName(code?: string | null, locale = "en"): string {
  if (!code || !/^[A-Za-z]{2}$/.test(code)) return code?.trim() || "";
  const cc = code.toUpperCase();
  try {
    const name = new Intl.DisplayNames([locale], { type: "region" }).of(cc);
    return name || cc;
  } catch {
    return cc;
  }
}

export function UserCountryFlag({
  code,
  className,
}: {
  code?: string | null;
  className?: string;
}) {
  if (!code) return null;
  const name = countryDisplayName(code);
  const flag = countryFlagEmoji(code);
  if (!flag) return null;
  return (
    <span
      title={name}
      aria-label={name}
      className={className ?? "mr-1 inline-block cursor-default text-base leading-none"}
    >
      {flag}
    </span>
  );
}
