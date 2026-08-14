export const SITE = {
  name: "SSMM Panel",
  shortName: "SSMM",
  domain: "ssmmpanel.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ssmmpanel.com").replace(/\/$/, ""),
  email: "support@ssmmpanel.com",
  whatsapp: "447563686583",
  whatsappDisplay: "+44 7563 686583",
  telegram: "smmcheappanel",
  telegramUrl: "https://t.me/smmcheappanel",
  currency: "USD",
  localeDefault: "en",
  foundedYear: 2026,
  twitterHandle: "@ssmmpanel",
  /** Google Analytics 4 measurement ID */
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-KKPQ2JKJ8V",
} as const;

export const LOCALE_COOKIE = "ssmm_locale";

export const LOCALES = ["en", "tr", "pt-br", "ar", "es", "id", "bn", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  "pt-br": "Português (Brasil)",
  ar: "العربية",
  es: "Español",
  id: "Bahasa Indonesia",
  bn: "Bengali",
  hi: "Hindi",
};

/** Compact codes for mobile / tight UI */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
  "pt-br": "PT",
  ar: "AR",
  es: "ES",
  id: "ID",
  bn: "BN",
  hi: "HI",
};

export const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  "pt-br": "pt_BR",
  ar: "ar_SA",
  es: "es_ES",
  id: "id_ID",
  bn: "bn_BD",
  hi: "hi_IN",
};

export const RTL_LOCALES: readonly Locale[] = ["ar"];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** Display currency per UI language. Balances / charges are stored in USD. */
export const LOCALE_CURRENCY: Record<Locale, string> = {
  en: "USD",
  tr: "TRY",
  "pt-br": "BRL",
  ar: "USD",
  es: "EUR",
  id: "IDR",
  bn: "BDT",
  hi: "INR",
};

/** Units of target currency for 1 USD (display conversion). Override via FX_USD_* env. */
function usdRate(currency: string): number {
  const envKey = `FX_USD_${currency}`;
  const fromEnv = Number(process.env[envKey]);
  if (Number.isFinite(fromEnv) && fromEnv > 0) return fromEnv;
  const defaults: Record<string, number> = {
    USD: 1,
    TRY: 34.5,
    EUR: 0.92,
    BRL: 5.2,
    IDR: 15800,
    BDT: 110,
    INR: 83,
  };
  return defaults[currency] ?? 1;
}

export function currencyForLocale(locale: Locale): string {
  return LOCALE_CURRENCY[locale] || SITE.currency;
}

export function convertFromUsd(amountUsd: number, locale: Locale): number {
  return amountUsd * usdRate(currencyForLocale(locale));
}

export function convertToUsd(amountLocal: number, locale: Locale): number {
  const rate = usdRate(currencyForLocale(locale));
  return rate > 0 ? amountLocal / rate : amountLocal;
}

export function formatMoney(amountUsd: number, locale: Locale, digits = 4): string {
  const currency = currencyForLocale(locale);
  const value = convertFromUsd(amountUsd, locale);
  const tag = LOCALE_OG[locale].replace("_", "-");
  try {
    return new Intl.NumberFormat(tag, {
      style: "currency",
      currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(digits)}`;
  }
}

export const PAYMENT_METHODS = [
  { slug: "paypal", name: "PayPal", seoKeyword: "PayPal SMM Panel" },
  { slug: "credit-card", name: "Visa / Mastercard", seoKeyword: "Credit Card SMM Panel" },
  { slug: "skrill", name: "Skrill", seoKeyword: "Skrill SMM Panel" },
  { slug: "revolut", name: "Revolut", seoKeyword: "Revolut SMM Panel" },
  { slug: "payoneer", name: "Payoneer", seoKeyword: "Payoneer SMM Panel" },
  { slug: "paysafecard", name: "Paysafecard", seoKeyword: "Paysafecard SMM Panel" },
  { slug: "bank-transfer", name: "Bank Transfer", seoKeyword: "Bank Transfer SMM Panel" },
  { slug: "binance-pay", name: "Binance Pay", seoKeyword: "Binance Pay SMM Panel" },
  { slug: "cryptomus", name: "Cryptomus", seoKeyword: "Cryptomus SMM Panel" },
] as const;

/** Binance Pay deposit details (same rails as other panels). */
export const BINANCE_PAY = {
  id: process.env.NEXT_PUBLIC_BINANCE_PAY_ID || "67636255",
  nickname: process.env.NEXT_PUBLIC_BINANCE_PAY_NICKNAME || "Allegre",
  qr: "/binance-qr.png",
} as const;

export type PaymentSlug = (typeof PAYMENT_METHODS)[number]["slug"];
