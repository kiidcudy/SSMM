import { listServices } from "@/lib/store/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { readPreferredLocale } from "@/lib/i18n/locale-preference";
import { formatMoney } from "@/lib/site";

export default async function DashboardServicesPage() {
  const locale = await readPreferredLocale();
  const services = await listServices();
  const t = getDictionary(locale);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.services}</h1>
      <p className="mt-2 text-sm text-[#93a0b8]">{t.dash.servicesIntro}</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-[#243049]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#111827] text-xs uppercase text-[#93a0b8]">
            <tr>
              <th className="px-3 py-3">{t.dash.id}</th>
              <th className="px-3 py-3">{t.dash.category}</th>
              <th className="px-3 py-3">{t.dash.service}</th>
              <th className="px-3 py-3">{t.dash.charge}</th>
              <th className="px-3 py-3">Min</th>
              <th className="px-3 py-3">Max</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t border-[#243049]">
                <td className="px-3 py-3 text-cyan-300">{s.id}</td>
                <td className="px-3 py-3">{s.category}</td>
                <td className="px-3 py-3">{s.name}</td>
                <td className="px-3 py-3">{formatMoney(s.rate, locale, 4)}</td>
                <td className="px-3 py-3">{s.min}</td>
                <td className="px-3 py-3">{s.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
