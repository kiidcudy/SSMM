import { listOrders, listUsers } from "@/lib/store/db";
import { OrdersAdmin } from "@/components/admin/OrdersAdmin";

export default async function AdminCancelPage() {
  const [orders, users] = await Promise.all([listOrders(), listUsers()]);
  const byId = Object.fromEntries(users.map((u) => [u.id, u.username]));

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Cancel</h1>
      <OrdersAdmin
        mode="cancel"
        orders={orders.map((o) => ({
          id: o.id,
          userId: o.userId,
          username: byId[o.userId] || o.userId.slice(0, 8),
          serviceId: o.serviceId,
          serviceName: o.serviceName,
          link: o.link,
          quantity: o.quantity,
          charge: o.charge,
          cost: o.cost,
          status: o.status,
          providerOrderId: o.providerOrderId,
          createdAt: o.createdAt,
          remains: o.remains,
          startCount: o.startCount,
          mode: o.mode,
          cancelReason: o.cancelReason,
          comments: o.comments,
        }))}
      />
    </div>
  );
}
