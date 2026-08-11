import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/dictionaries/en";
import { tr } from "@/lib/i18n/dictionaries/tr";
import { es } from "@/lib/i18n/dictionaries/es";
import { ptBr } from "@/lib/i18n/dictionaries/pt-br";
import { ar } from "@/lib/i18n/dictionaries/ar";
import { id } from "@/lib/i18n/dictionaries/id";
import { bn } from "@/lib/i18n/dictionaries/bn";
import { hi } from "@/lib/i18n/dictionaries/hi";

const map: Record<Locale, Dictionary> = {
  en,
  tr,
  es,
  "pt-br": ptBr,
  ar,
  id,
  bn,
  hi,
};

export function getDictionary(locale: Locale): Dictionary {
  return map[locale] ?? en;
}
