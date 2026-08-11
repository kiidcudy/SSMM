import { getDictionary } from "@/lib/i18n/get-dictionary";

export default function RefundsPage() {
  const t = getDictionary("en");
  return (
    <div className="card max-w-xl p-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.refunds}</h1>
      <p className="mt-3 text-sm text-[#93a0b8]">
        Refund requests UI coming soon. Eligible partial/canceled orders are credited back to balance by support.
      </p>
    </div>
  );
}
