export default function AdminSettingsPage() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-3 text-sm text-gray-600">
        Configure PROVIDER_API_URL, PROVIDER_API_KEY, AUTH_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD and CRON_SECRET
        via environment variables.
      </p>
    </div>
  );
}
