import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import {
  adminAddPayment,
  adminUpdateUser,
  createTicket,
  createUser,
  deleteChildPanel,
  deleteServiceLocal,
  duplicateService,
  replyTicket,
  setServiceOverride,
  servicesBulk,
  updateAppearance,
  updateOrder,
  updatePanelSettings,
  updateTicketAdmin,
  upsertAffiliate,
  upsertChildPanel,
  adjustBalance,
  findUserById,
  findUserByUsername,
  getOrder,
} from "@/lib/store/db";

type Body = {
  action: string;
  [key: string]: unknown;
};

export async function POST(req: Request) {
  const { session, error } = await requireAdmin();
  if (error || !session) return error!;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    switch (body.action) {
      case "add_user": {
        const user = await createUser({
          username: String(body.username || ""),
          email: String(body.email || ""),
          password: String(body.password || "changeme123"),
        });
        return NextResponse.json({ ok: true, user: { id: user.id, uid: user.uid, username: user.username } });
      }
      case "update_user": {
        const user = await adminUpdateUser(String(body.userId), {
          email: body.email != null ? String(body.email) : undefined,
          status: body.status as "active" | "suspended" | undefined,
          discountPercent: body.discountPercent != null ? Number(body.discountPercent) : undefined,
          balance: body.balance != null ? Number(body.balance) : undefined,
          password: body.password != null ? String(body.password) : undefined,
          customRates: body.customRates as Record<number, number> | undefined,
        });
        return NextResponse.json({ ok: true, user });
      }
      case "set_password": {
        await adminUpdateUser(String(body.userId), { password: String(body.password || "") });
        return NextResponse.json({ ok: true });
      }
      case "suspend_user": {
        await adminUpdateUser(String(body.userId), { status: "suspended" });
        return NextResponse.json({ ok: true });
      }
      case "activate_user": {
        await adminUpdateUser(String(body.userId), { status: "active" });
        return NextResponse.json({ ok: true });
      }
      case "set_discount": {
        await adminUpdateUser(String(body.userId), { discountPercent: Number(body.discountPercent || 0) });
        return NextResponse.json({ ok: true });
      }
      case "update_order": {
        const order = await updateOrder(String(body.orderId), {
          status: body.status as never,
          startCount: body.startCount != null ? Number(body.startCount) : undefined,
          remains: body.remains != null ? Number(body.remains) : undefined,
          cancelReason: body.cancelReason != null ? String(body.cancelReason) : undefined,
          mode: body.mode as "auto" | "manual" | undefined,
        });
        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
        return NextResponse.json({ ok: true, order });
      }
      case "cancel_order": {
        const order = await getOrder(String(body.orderId));
        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
        const updated = await updateOrder(order.id, {
          status: "canceled",
          cancelReason: String(body.cancelReason || "Canceled by admin"),
        });
        if (body.refund && order.charge > 0) {
          await adjustBalance(order.userId, order.charge, -order.charge, {
            type: "refund",
            note: `Refund order #${order.id}`,
            refId: order.id,
          });
        }
        return NextResponse.json({ ok: true, order: updated });
      }
      case "add_payment": {
        const row = await adminAddPayment({
          username: String(body.username || ""),
          amount: Number(body.amount || 0),
          method: String(body.method || "Bonus"),
          memo: String(body.memo || ""),
        });
        return NextResponse.json({ ok: true, payment: row });
      }
      case "service_override": {
        const ov = await setServiceOverride(Number(body.serviceId), {
          enabled: body.enabled as boolean | undefined,
          hidden: body.hidden as boolean | undefined,
          rate: body.rate != null ? Number(body.rate) : undefined,
          name: body.name != null ? String(body.name) : undefined,
          description: body.description != null ? String(body.description) : undefined,
          category: body.category != null ? String(body.category) : undefined,
          dripfeed: body.dripfeed as boolean | undefined,
          denyDuplicates: body.denyDuplicates as boolean | undefined,
        });
        return NextResponse.json({ ok: true, override: ov });
      }
      case "services_bulk": {
        const serviceIds = Array.isArray(body.serviceIds)
          ? body.serviceIds.map((x) => Number(x))
          : [];
        const op = String(body.op || "");
        let operation: Parameters<typeof servicesBulk>[1];
        switch (op) {
          case "enable":
          case "disable":
          case "hide":
          case "unhide":
          case "delete":
          case "clear_custom_rates":
            operation = { op };
            break;
          case "set_rate":
            operation = { op, rate: Number(body.rate) };
            break;
          case "multiply_rate":
            operation = { op, factor: Number(body.factor) };
            break;
          case "set_category":
            operation = { op, category: String(body.category || "") };
            break;
          case "set_dripfeed":
            operation = { op, dripfeed: Boolean(body.dripfeed) };
            break;
          case "set_deny_duplicates":
            operation = { op, denyDuplicates: Boolean(body.denyDuplicates) };
            break;
          case "replace_name":
            operation = {
              op,
              find: String(body.find || ""),
              replace: String(body.replace ?? ""),
            };
            break;
          case "set_description":
            operation = { op, description: String(body.description || "") };
            break;
          default:
            return NextResponse.json({ error: `Unknown bulk op: ${op}` }, { status: 400 });
        }
        const result = await servicesBulk(serviceIds, operation);
        return NextResponse.json({ ok: true, ...result });
      }
      case "duplicate_service": {
        const svc = await duplicateService(Number(body.serviceId));
        return NextResponse.json({ ok: true, service: svc });
      }
      case "delete_service": {
        await deleteServiceLocal(Number(body.serviceId));
        return NextResponse.json({ ok: true });
      }
      case "add_ticket": {
        const byId = body.userId ? await findUserById(String(body.userId)) : null;
        const byName = body.username ? await findUserByUsername(String(body.username)) : null;
        const user = byId || byName;
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        const ticket = await createTicket({
          userId: user.id,
          username: user.username,
          subject: String(body.subject || "Support"),
          body: String(body.body || ""),
        });
        return NextResponse.json({ ok: true, ticket });
      }
      case "update_ticket": {
        const ticket = await updateTicketAdmin(String(body.ticketId), {
          status: body.status as never,
          assignee: body.assignee != null ? String(body.assignee) : undefined,
          unread: body.unread as boolean | undefined,
        });
        return NextResponse.json({ ok: true, ticket });
      }
      case "reply_ticket": {
        const ticket = await replyTicket({
          ticketId: String(body.ticketId),
          authorId: session.id,
          authorRole: "admin",
          body: String(body.body || ""),
        });
        return NextResponse.json({ ok: true, ticket });
      }
      case "upsert_affiliate": {
        const row = await upsertAffiliate({
          username: String(body.username || ""),
          code: body.code != null ? String(body.code) : undefined,
          ratePercent: body.ratePercent != null ? Number(body.ratePercent) : undefined,
          status: body.status as "active" | "disabled" | undefined,
        });
        return NextResponse.json({ ok: true, affiliate: row });
      }
      case "upsert_child_panel": {
        const row = await upsertChildPanel({
          id: body.id != null ? String(body.id) : undefined,
          domain: String(body.domain || ""),
          ownerUsername: String(body.ownerUsername || ""),
          status: body.status as "active" | "pending" | "suspended" | undefined,
          note: body.note != null ? String(body.note) : undefined,
        });
        return NextResponse.json({ ok: true, panel: row });
      }
      case "delete_child_panel": {
        await deleteChildPanel(String(body.id));
        return NextResponse.json({ ok: true });
      }
      case "update_settings": {
        const settings = await updatePanelSettings({
          siteName: body.siteName != null ? String(body.siteName) : undefined,
          currency: body.currency != null ? String(body.currency) : undefined,
          supportEmail: body.supportEmail != null ? String(body.supportEmail) : undefined,
          maintenanceMode: body.maintenanceMode as boolean | undefined,
          minDeposit: body.minDeposit != null ? Number(body.minDeposit) : undefined,
          signupBonus: body.signupBonus != null ? Number(body.signupBonus) : undefined,
        });
        return NextResponse.json({ ok: true, settings });
      }
      case "update_appearance": {
        const appearance = await updateAppearance({
          primaryColor: body.primaryColor != null ? String(body.primaryColor) : undefined,
          logoUrl: body.logoUrl != null ? String(body.logoUrl) : undefined,
          faviconUrl: body.faviconUrl != null ? String(body.faviconUrl) : undefined,
          customCss: body.customCss != null ? String(body.customCss) : undefined,
          homepageHtml: body.homepageHtml != null ? String(body.homepageHtml) : undefined,
        });
        return NextResponse.json({ ok: true, appearance });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 400 });
  }
}
