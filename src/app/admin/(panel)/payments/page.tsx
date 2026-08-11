import { listFunds } from "@/lib/store/db";
import { ApproveFundForm } from "@/components/ApproveFundForm";

export default async function AdminPaymentsPage() {
  const funds = await listFunds();

  return (
    <div>
      <h1 className="text-2xl font-bold">Payments</h1>
      <p className="mt-1 text-sm text-gray-500">Manual fund requests awaiting approval.</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {funds.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-gray-500">
                  No fund requests.
                </td>
              </tr>
            ) : (
              funds.map((f) => (
                <tr key={f.id}>
                  <td className="font-mono text-xs">{f.id}</td>
                  <td>{f.username}</td>
                  <td>{f.method}</td>
                  <td>${f.amount.toFixed(2)}</td>
                  <td className="max-w-[200px] truncate">{f.note || "—"}</td>
                  <td className="capitalize">{f.status}</td>
                  <td>{new Date(f.createdAt).toLocaleString()}</td>
                  <td>{f.status === "pending" ? <ApproveFundForm fundId={f.id} /> : "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
