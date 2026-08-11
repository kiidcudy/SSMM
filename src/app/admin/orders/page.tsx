import { listOrders } from "@/lib/store/db";

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-sm text-gray-500">{orders.length} total</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Link</th>
              <th>Qty</th>
              <th>Charge</th>
              <th>Status</th>
              <th>Provider</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td className="font-mono text-xs">{o.id}</td>
                  <td className="font-mono text-xs">{o.userId}</td>
                  <td>
                    {o.serviceId} — {o.serviceName}
                  </td>
                  <td className="max-w-[180px] truncate">{o.link}</td>
                  <td>{o.quantity}</td>
                  <td>${o.charge.toFixed(4)}</td>
                  <td className="capitalize">{o.status}</td>
                  <td>{o.providerOrderId || "—"}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
