import { listUsers } from "@/lib/store/db";
import { UsersAdmin } from "@/components/admin/UsersAdmin";

export default async function AdminUsersPage() {
  const users = await listUsers();
  return (
    <UsersAdmin
      users={users.map((u) => ({
        id: u.id,
        uid: u.uid,
        username: u.username,
        email: u.email,
        balance: u.balance,
        spent: u.spent,
        status: u.status,
        role: u.role,
        createdAt: u.createdAt,
        lastAuthAt: u.lastAuthAt,
        discountPercent: u.discountPercent,
      }))}
    />
  );
}
