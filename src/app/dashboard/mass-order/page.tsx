import { getDictionary } from "@/lib/i18n/get-dictionary";

export default function MassOrderPage() {
  const t = getDictionary("en");
  return (
    <div className="card max-w-xl p-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.massOrder}</h1>
      <p className="mt-3 text-sm text-[#93a0b8]">
        Mass order (bulk links) coming soon. Place single orders from New order for now.
      </p>
    </div>
  );
}
