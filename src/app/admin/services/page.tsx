import { listServices } from "@/lib/store/db";

export default async function AdminServicesPage() {
  const services = await listServices();

  return (
    <div>
      <h1 className="text-2xl font-bold">Services</h1>
      <p className="mt-1 text-sm text-gray-500">
        {services.length} services in local catalog. Sync from upstream provider via API when PROVIDER_API_URL
        is configured.
      </p>
      <button
        type="button"
        className="mt-4 rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white opacity-70"
        disabled
        title="Wire provider sync when ready"
      >
        Sync via API (configure PROVIDER_API_*)
      </button>
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
            {services.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.category}</td>
                <td>{s.name}</td>
                <td>${s.rate.toFixed(4)}</td>
                <td>{s.min}</td>
                <td>{s.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
