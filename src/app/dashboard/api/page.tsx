import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { findUserById } from "@/lib/store/db";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { readPreferredLocale } from "@/lib/i18n/locale-preference";
import { SITE } from "@/lib/site";

export default async function DashboardApiPage() {
  const session = await readSession();
  if (!session) redirect("/login");
  const locale = await readPreferredLocale();
  const user = await findUserById(session.id);
  const t = getDictionary(locale);
  const apiKey = user?.apiKey || session.apiKey;

  return (
    <div className="max-w-3xl">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{t.dash.api}</h1>
      <p className="mt-2 text-sm text-[#93a0b8]">{t.dash.apiIntro}</p>

      <div className="card mt-6 p-5">
        <p className="text-sm text-[#93a0b8]">{t.dash.apiKeyLabel}</p>
        <p className="mt-2 break-all font-mono text-cyan-300">{apiKey}</p>
      </div>

      <div className="card mt-4 p-5 text-sm text-[#93a0b8]">
        <p>
          {t.dash.endpointLabel}: <code className="text-cyan-300">POST {SITE.url}/api/v2</code>
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>action=services</li>
          <li>action=add (service, link, quantity + type-specific fields)</li>
          <li>action=status (order or orders)</li>
          <li>action=balance</li>
          <li>action=refill (order)</li>
          <li>action=refill_status (refill)</li>
          <li>action=cancel (orders)</li>
        </ul>
        <p className="mt-3">
          Docs:{" "}
          <Link className="text-cyan-300 hover:underline" href="/api-docs">
            /api-docs
          </Link>{" "}
          · alias{" "}
          <Link className="text-cyan-300 hover:underline" href="/api">
            /api
          </Link>
        </p>
      </div>
    </div>
  );
}
