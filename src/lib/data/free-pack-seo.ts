import type { FreePack, FreePlatform } from "@/lib/data/free-services";
import type { Locale } from "@/lib/site";
import {
  buildFreePackContentHtml as buildFreePackContentHtmlLocalized,
  buildFreePackFaqs as buildFreePackFaqsLocalized,
  buildFreePackTakeaway as buildFreePackTakeawayLocalized,
  getPlatformBlurb as getPlatformBlurbLocalized,
  getPlatformLabel as getPlatformLabelLocalized,
  localizeFreePack as localizeFreePackLocalized,
  wordCountHtml as wordCountHtmlLocalized,
  type FreeFaq,
} from "@/lib/i18n/pages/free-seo";

export type { FreeFaq };

export function getPlatformLabel(platform: FreePlatform, locale: Locale = "en"): string {
  return getPlatformLabelLocalized(platform, locale);
}

export function getPlatformBlurb(platform: FreePlatform, locale: Locale = "en"): string {
  return getPlatformBlurbLocalized(platform, locale);
}

export function buildFreePackFaqs(pack: FreePack, locale: Locale = "en"): FreeFaq[] {
  return buildFreePackFaqsLocalized(pack, locale);
}

export function buildFreePackTakeaway(pack: FreePack, locale: Locale = "en"): string {
  return buildFreePackTakeawayLocalized(pack, locale);
}

export function buildFreePackContentHtml(pack: FreePack, locale: Locale = "en"): string {
  return buildFreePackContentHtmlLocalized(pack, locale);
}

export function localizeFreePack(pack: FreePack, locale: Locale = "en"): FreePack {
  return localizeFreePackLocalized(pack, locale);
}

export function wordCountHtml(html: string): number {
  return wordCountHtmlLocalized(html);
}
