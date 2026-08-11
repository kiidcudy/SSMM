import Link from "next/link";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/i18n/path";

export function LocaleLink({
  href,
  locale,
  className,
  children,
}: {
  href: string;
  locale: Locale;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={localePath(href, locale)} className={className}>
      {children}
    </Link>
  );
}
