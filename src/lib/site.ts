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
} as const;

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

export const PAYMENT_METHODS = [
  { slug: "paypal", name: "PayPal", seoKeyword: "PayPal SMM Panel" },
  { slug: "credit-card", name: "Visa / Mastercard", seoKeyword: "Credit Card SMM Panel" },
  { slug: "crypto", name: "Bitcoin & Crypto", seoKeyword: "Crypto SMM Panel" },
  { slug: "skrill", name: "Skrill", seoKeyword: "Skrill SMM Panel" },
  { slug: "revolut", name: "Revolut", seoKeyword: "Revolut SMM Panel" },
  { slug: "payoneer", name: "Payoneer", seoKeyword: "Payoneer SMM Panel" },
  { slug: "paysafecard", name: "Paysafecard", seoKeyword: "Paysafecard SMM Panel" },
  { slug: "bank-transfer", name: "Bank Transfer", seoKeyword: "Bank Transfer SMM Panel" },
  { slug: "binance-pay", name: "Binance Pay", seoKeyword: "Binance Pay SMM Panel" },
  { slug: "cryptomus", name: "Cryptomus", seoKeyword: "Cryptomus SMM Panel" },
] as const;

export type PaymentSlug = (typeof PAYMENT_METHODS)[number]["slug"];
