import { listServices } from "@/lib/store/db";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { SyncServicesButton } from "@/components/admin/SyncServicesButton";

export default async function AdminServicesPage() {
  const services = await listServices();
  const configured = isProviderConfigured();

  return (
    <div>
      <h1 className="text-2xl font-bold">Services</h1>
      <p className="mt-1 text-sm text-gray-500">
        {services.length} services
        {configured
          ? " · live from SMMFlare (PROVIDER_API_*)"
          : " · set PROVIDER_API_URL + PROVIDER_API_KEY to pull from SMMFlare"}
      </p>
      <SyncServicesButton />
      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name</th>
              <th>Rate</th>
              <th>Min</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No services yet. Configure SMMFlare API key and sync.
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.category}</td>
                  <td>{s.name}</td>
                  <td>${s.rate.toFixed(4)}</td>
                  <td>{s.min}</td>
                  <td>{s.max}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
