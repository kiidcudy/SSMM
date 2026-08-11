import Link from "next/link";
import type { ComponentProps } from "react";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/i18n/path";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  locale: Locale;
};

export function LocaleLink({ href, locale, ...rest }: Props) {
  return <Link href={localePath(href, locale)} {...rest} />;
}
