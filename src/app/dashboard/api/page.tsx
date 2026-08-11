import { readSession } from "@/lib/auth/session";
import { findUserById } from "@/lib/store/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SITE } from "@/lib/site";
import { redirect } from "next/navigation";

export default async function DashboardApiPage() {
  const session = await readSession();
  if (!session) redirect("/login");
  const user = await findUserById(session.id);
  const t = getDictionary("en");
  const apiKey = user?.apiKey || session.apiKey;

  return (
    <div className="max-w-3xl">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.api}</h1>
      <p className="mt-2 text-sm text-[#93a0b8]">PerfectPanel-compatible API key and endpoints.</p>

      <div className="card mt-6 p-5">
        <p className="text-sm text-[#93a0b8]">Your API key</p>
        <p className="mt-2 break-all font-mono text-cyan-300">{apiKey}</p>
      </div>

      <div className="card mt-4 p-5 text-sm text-[#93a0b8]">
        <p>
          Endpoint: <code className="text-cyan-300">POST {SITE.url}/api/v2</code>
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>action=services</li>
          <li>action=add (service, link, quantity)</li>
          <li>action=status (order)</li>
          <li>action=balance</li>
        </ul>
      </div>
    </div>
  );
}
