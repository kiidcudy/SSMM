import { getDictionary } from "@/lib/i18n/get-dictionary";

export default function ChildPanelPage() {
  const t = getDictionary("en");
  return (
    <div className="card max-w-xl p-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.childPanel}</h1>
      <p className="mt-3 text-sm text-[#93a0b8]">Child panel ordering coming soon. Contact support for reseller plans.</p>
    </div>
  );
}
