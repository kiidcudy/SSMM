import { isProviderConfigured } from "@/lib/provider/perfectpanel";

export default function AdminSettingsPage() {
  const providerOk = isProviderConfigured();
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-3 text-sm text-gray-600">
        Upstream provider: SMMFlare (<code>https://smmflare.com/api/v2</code>). Set{" "}
        <code>PROVIDER_API_URL</code> + <code>PROVIDER_API_KEY</code> in Vercel env, then sync from Admin →
        Services.
      </p>
      <p className={`mt-4 text-sm font-semibold ${providerOk ? "text-emerald-600" : "text-amber-600"}`}>
        Provider status: {providerOk ? "configured" : "missing API key"}
      </p>
    </div>
  );
}
