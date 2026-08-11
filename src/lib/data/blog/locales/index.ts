import type { Locale } from "@/lib/site";
import type { BlogPost } from "@/lib/data/blog/types";
import { posts as tr } from "./tr";
import { posts as es } from "./es";
import { posts as ptBr } from "./pt-br";
import { posts as ar } from "./ar";
import { posts as id } from "./id";
import { posts as bn } from "./bn";
import { posts as hi } from "./hi";

export const BLOG_LOCALES: Partial<Record<Locale, Record<string, BlogPost>>> = {
  tr,
  es,
  "pt-br": ptBr,
  ar,
  id,
  bn,
  hi,
};
