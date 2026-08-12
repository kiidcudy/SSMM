import { getDictionary } from "@/lib/i18n/get-dictionary";
import { readPreferredLocale } from "@/lib/i18n/locale-preference";

export default async function RefundsPage() {
  const locale = await readPreferredLocale();
  const t = getDictionary(locale);
  return (
    <div className="card max-w-xl p-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.refunds}</h1>
      <p className="mt-3 text-sm text-[#93a0b8]">{t.dash.refundsBody}</p>
    </div>
  );
}
