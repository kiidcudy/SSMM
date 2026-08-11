import { NextResponse } from "next/server";
import {
  adjustBalance,
  createOrder,
  createRefill,
  findUserByApiKey,
  getOrder,
  getRefill,
  listServices,
  updateOrder,
  updateRefill,
} from "@/lib/store/db";
import { chargeFor } from "@/lib/data/catalog";
import {
  isProviderConfigured,
  providerAdd,
  providerCancel,
  providerRefill,
  providerRefillStatus,
} from "@/lib/provider/perfectpanel";
import { fieldsForService } from "@/lib/provider/service-fields";

async function readParams(req: Request): Promise<Record<string, string>> {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = (await req.json()) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(json)) out[k] = String(v ?? "");
    return out;
  }
  const form = await req.formData();
  const out: Record<string, string> = {};
  form.forEach((v, k) => {
    out[k] = String(v);
  });
  return out;
}

export async function POST(req: Request) {
  try {
    const params = await readParams(req);
    const key = params.key || "";
    const action = params.action || "";
    if (!key) return NextResponse.json({ error: "Incorrect API key" });

    const user = await findUserByApiKey(key);
    if (!user) return NextResponse.json({ error: "Incorrect API key" });

    if (action === "services") {
      const services = await listServices();
      return NextResponse.json(
        services.map((s) => ({
          service: s.id,
          name: s.name,
          type: s.providerType || s.type,
          category: s.category,
          rate: String(s.rate),
          min: String(s.min),
          max: String(s.max),
          refill: Boolean(s.refill),
          cancel: Boolean(s.cancel),
          dripfeed: Boolean(s.dripfeed),
        })),
      );
    }

    if (action === "balance") {
      return NextResponse.json({ balance: user.balance.toFixed(5), currency: "USD" });
    }

    if (action === "status") {
      if (params.orders) {
        const ids = params.orders.split(",").map((s) => s.trim()).filter(Boolean);
        const out: Record<string, unknown> = {};
        for (const id of ids) {
          const order = await getOrder(id);
          if (!order || order.userId !== user.id) {
            out[id] = { error: "Incorrect order ID" };
          } else {
            out[id] = {
              charge: order.charge.toFixed(5),
              start_count: String(order.startCount ?? 0),
              status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
              remains: String(order.remains ?? order.quantity),
              currency: "USD",
            };
          }
        }
        return NextResponse.json(out);
      }
      const orderId = params.order;
      if (!orderId) return NextResponse.json({ error: "Incorrect order ID" });
      const order = await getOrder(orderId);
      if (!order || order.userId !== user.id) {
        return NextResponse.json({ error: "Incorrect order ID" });
      }
      return NextResponse.json({
        charge: order.charge.toFixed(5),
        start_count: String(order.startCount ?? 0),
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
        remains: String(order.remains ?? order.quantity),
        currency: "USD",
      });
    }

    if (action === "add") {
      const serviceId = Number(params.service);
      const services = await listServices();
      const service = services.find((s) => s.id === serviceId);
      if (!service) return NextResponse.json({ error: "Incorrect service ID" });
      const fields = fieldsForService(service);
      const quantity = Number(params.quantity || service.min || 1);
      if (fields.needsQuantity && (quantity < service.min || quantity > service.max)) {
        return NextResponse.json({ error: "Quantity out of range" });
      }
      if (fields.needsLink && !params.link) {
        return NextResponse.json({ error: "Link required" });
      }

      const charge = chargeFor(service, quantity);
      if (user.balance < charge) return NextResponse.json({ error: "Not enough funds" });

      await adjustBalance(user.id, -charge, charge, {
        type: "order",
        note: `API order · service ${service.id}`,
      });

      let providerOrderId: string | undefined;
      let status: "pending" | "processing" = "pending";
      if (isProviderConfigured()) {
        try {
          const result = await providerAdd({
            service: service.providerServiceId ?? service.id,
            link: params.link,
            quantity: fields.needsQuantity ? quantity : undefined,
            comments: params.comments,
            keywords: params.keywords,
            usernames: params.usernames,
            hashtags: params.hashtags,
            hashtag: params.hashtag,
            username: params.username,
            media: params.media,
            groups: params.groups,
            answer_number: params.answer_number,
            country: params.country,
            device: params.device,
            type_of_traffic: params.type_of_traffic,
            google_keyword: params.google_keyword,
            referring_url: params.referring_url,
            posts: params.posts,
            old_posts: params.old_posts,
            delay: params.delay,
            expiry: params.expiry,
            runs: params.runs,
            interval: params.interval,
            min: service.type === "subscriptions" ? service.min : undefined,
            max: service.type === "subscriptions" ? service.max : undefined,
          });
          providerOrderId = String(result.order);
          status = "processing";
        } catch {
          status = "pending";
        }
      }

      const order = await createOrder({
        userId: user.id,
        serviceId: service.id,
        serviceName: service.name,
        link: params.link || params.username || "",
        quantity,
        charge,
        status,
        providerOrderId,
      });

      return NextResponse.json({ order: order.id });
    }

    if (action === "refill") {
      const orderId = params.order;
      if (!orderId) return NextResponse.json({ error: "Incorrect order ID" });
      const order = await getOrder(orderId);
      if (!order || order.userId !== user.id) {
        return NextResponse.json({ error: "Incorrect order ID" });
      }
      const services = await listServices();
      const service = services.find((s) => s.id === order.serviceId);
      if (!service?.refill) return NextResponse.json({ error: "Refill not available" });
      if (!order.providerOrderId || !isProviderConfigured()) {
        return NextResponse.json({ error: "Refill unavailable" });
      }
      try {
        const result = await providerRefill(order.providerOrderId);
        const refill = await createRefill({
          orderId: order.id,
          userId: user.id,
          providerRefillId: String(result.refill),
          status: "pending",
        });
        return NextResponse.json({ refill: refill.id });
      } catch (e) {
        return NextResponse.json({
          error: e instanceof Error ? e.message : "Refill failed",
        });
      }
    }

    if (action === "refill_status") {
      const refillId = params.refill;
      if (!refillId) return NextResponse.json({ error: "Incorrect refill ID" });
      const refill = await getRefill(refillId);
      if (!refill || refill.userId !== user.id) {
        return NextResponse.json({ error: "Incorrect refill ID" });
      }
      if (refill.providerRefillId && isProviderConfigured()) {
        try {
          const st = await providerRefillStatus(refill.providerRefillId);
          const mapped = st.status?.toLowerCase().includes("reject")
            ? "rejected"
            : st.status?.toLowerCase().includes("complete")
              ? "completed"
              : "pending";
          await updateRefill(refill.id, { status: mapped });
          return NextResponse.json({ status: st.status });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({
        status: refill.status.charAt(0).toUpperCase() + refill.status.slice(1),
      });
    }

    if (action === "cancel") {
      const ids = (params.orders || params.order || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!ids.length) return NextResponse.json({ error: "Incorrect order ID" });
      const out: Array<{ order: string; cancel: number | { error: string } }> = [];
      const providerIds: string[] = [];
      for (const id of ids) {
        const order = await getOrder(id);
        if (!order || order.userId !== user.id) {
          out.push({ order: id, cancel: { error: "Incorrect order ID" } });
          continue;
        }
        const services = await listServices();
        const service = services.find((s) => s.id === order.serviceId);
        if (!service?.cancel || !order.providerOrderId) {
          out.push({ order: id, cancel: { error: "Cancel not available" } });
          continue;
        }
        providerIds.push(order.providerOrderId);
        out.push({ order: id, cancel: 1 });
        await updateOrder(order.id, { status: "canceled" });
      }
      if (providerIds.length && isProviderConfigured()) {
        try {
          await providerCancel(providerIds);
        } catch {
          /* local cancel already marked */
        }
      }
      return NextResponse.json(out);
    }

    return NextResponse.json({ error: "Incorrect request" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Incorrect request";
    return NextResponse.json({ error: message });
  }
}
