import { listFunds, listUsers } from "@/lib/store/db";
import { PaymentsAdmin } from "@/components/admin/PaymentsAdmin";

export default async function AdminPaymentsPage() {
  const [funds, users] = await Promise.all([listFunds(), listUsers()]);
  const bal = Object.fromEntries(users.map((u) => [u.id, u.balance]));

  return (
    <PaymentsAdmin
      payments={funds.map((f) => ({
        id: f.id,
        userId: f.userId,
        username: f.username,
        balance: bal[f.userId] ?? 0,
        amount: f.amount,
        method: f.method,
        note: f.note,
        status: f.status === "approved" ? "completed" : f.status,
        mode: f.mode || "manual",
        createdAt: f.createdAt,
        updatedAt: f.updatedAt || f.createdAt,
      }))}
    />
  );
}
