import { listUsers } from "@/lib/store/db";

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="mt-1 text-sm text-gray-500">{users.length} accounts</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Spent</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last auth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-mono text-xs">{u.id}</td>
                <td className="font-medium">
                  {u.username}
                  {u.role === "admin" ? (
                    <span className="ml-2 rounded bg-indigo-50 px-1.5 py-0.5 text-xs text-indigo-700">admin</span>
                  ) : null}
                </td>
                <td>{u.email}</td>
                <td>${u.balance.toFixed(4)}</td>
                <td>${u.spent.toFixed(4)}</td>
                <td className="capitalize">{u.status}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td>{new Date(u.lastAuthAt).toLocaleString()}</td>
                <td className="text-gray-400">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
