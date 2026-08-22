import { listOrders, listServices, listUsers } from "@/lib/store/db";
import { OrdersAdmin } from "@/components/admin/OrdersAdmin";

export default async function AdminOrdersPage() {
  const [orders, users, services] = await Promise.all([listOrders(), listUsers(), listServices()]);
  const byId = Object.fromEntries(users.map((u) => [u.id, u.username]));
  const providerByService = Object.fromEntries(
    services.map((s) => [s.id, s.providerHost || ""]),
  );

  return (
    <OrdersAdmin
      orders={orders.map((o) => ({
        id: o.id,
        userId: o.userId,
        username: byId[o.userId] || o.userId.slice(0, 8),
        serviceId: o.serviceId,
        serviceName: o.serviceName,
        providerHost: providerByService[o.serviceId] || undefined,
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
        source: o.source,
        cancelReason: o.cancelReason,
        comments: o.comments,
        providerError: o.providerError,
      }))}
    />
  );
}
