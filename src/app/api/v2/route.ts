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
import { formatApiStatus, prepareAddOrder } from "@/lib/api/perfectpanel-compat";
import {
  isProviderConfigured,
  providerCancel,
  providerMultiRefillStatus,
  providerRefill,
  providerRefillStatus,
} from "@/lib/provider/perfectpanel";
import {
  resolveProviderCredentialsForOrder,
  submitOrderToProvider,
} from "@/lib/provider/submit-order";

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

function orderStatusPayload(order: {
  charge: number;
  startCount?: number;
  status: string;
  remains?: number;
  quantity: number;
}) {
  return {
    charge: order.charge.toFixed(5),
    start_count: String(order.startCount ?? 0),
    status: formatApiStatus(order.status),
    remains: String(order.remains ?? order.quantity),
    currency: "USD",
  };
}

type RefillResult = { refill: string } | { error: string };

async function requestRefill(orderId: string, userId: string): Promise<RefillResult> {
  const order = await getOrder(orderId);
  if (!order || order.userId !== userId) {
    return { error: "Incorrect order ID" };
  }
  const services = await listServices();
  const service = services.find((s) => s.id === order.serviceId);
  if (!service?.refill) return { error: "Refill not available" };
  if (!order.providerOrderId) return { error: "Refill unavailable" };

  const creds = await resolveProviderCredentialsForOrder(order, services);
  if (!creds) return { error: "Refill unavailable" };

  try {
    const result = await providerRefill(order.providerOrderId, creds);
    const refill = await createRefill({
      orderId: order.id,
      userId,
      providerRefillId: String(result.refill),
      status: "pending",
    });
    return { refill: refill.id };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Refill failed" };
  }
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
            out[id] = orderStatusPayload(order);
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
      return NextResponse.json(orderStatusPayload(order));
    }

    if (action === "add") {
      const serviceId = Number(params.service);
      const services = await listServices();
      const service = services.find((s) => s.id === serviceId);
      if (!service) return NextResponse.json({ error: "Incorrect service ID" });

      const prepared = prepareAddOrder(service, params);
      if (!prepared.ok) return NextResponse.json({ error: prepared.error });

      const { quantity } = prepared;
      const charge = chargeFor(service, quantity);
      if (user.balance < charge) return NextResponse.json({ error: "Not enough funds" });

      await adjustBalance(user.id, -charge, charge, {
        type: "order",
        note: `API order · service ${service.id}`,
      });

      const provider = await submitOrderToProvider(service, {
        link: params.link,
        quantity,
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
      });

      const providerOrderId = provider.ok ? provider.providerOrderId : undefined;
      const status = provider.ok ? "processing" : "pending";
      const providerError = provider.ok ? undefined : provider.error;

      const order = await createOrder({
        userId: user.id,
        serviceId: service.id,
        serviceName: service.name,
        link: params.link || params.username || "",
        quantity,
        charge,
        status,
        providerOrderId,
        providerError,
        mode: providerOrderId ? "auto" : "manual",
        comments: params.comments,
        source: "api",
      });

      return NextResponse.json({ order: order.id });
    }

    if (action === "refill") {
      if (params.orders) {
        const ids = params.orders.split(",").map((s) => s.trim()).filter(Boolean);
        const out: Array<{ order: string; refill: string | { error: string } }> = [];
        for (const id of ids) {
          const result = await requestRefill(id, user.id);
          if ("error" in result) {
            out.push({ order: id, refill: { error: result.error } });
          } else {
            out.push({ order: id, refill: result.refill });
          }
        }
        return NextResponse.json(out);
      }

      const orderId = params.order;
      if (!orderId) return NextResponse.json({ error: "Incorrect order ID" });
      const result = await requestRefill(orderId, user.id);
      if ("error" in result) return NextResponse.json({ error: result.error });
      return NextResponse.json({ refill: result.refill });
    }

    if (action === "refill_status") {
      if (params.refills) {
        const ids = params.refills.split(",").map((s) => s.trim()).filter(Boolean);
        const out: Array<{ refill: string; status: string | { error: string } }> = [];

        if (isProviderConfigured()) {
          const owned = await Promise.all(
            ids.map(async (id) => ({ id, row: await getRefill(id) })),
          );
          const providerIds = owned
            .filter(({ row }) => row && row.userId === user.id && row.providerRefillId)
            .map(({ row }) => row!.providerRefillId!);
          if (providerIds.length) {
            try {
              const remote = await providerMultiRefillStatus(providerIds);
              if (Array.isArray(remote)) {
                for (const item of remote) {
                  const local = owned.find(({ row }) => row?.providerRefillId === String(item.refill));
                  const refillId = local?.id || String(item.refill);
                  if (typeof item.status === "object" && item.status && "error" in item.status) {
                    out.push({ refill: refillId, status: item.status });
                  } else {
                    const mapped = String(item.status).toLowerCase().includes("reject")
                      ? "rejected"
                      : String(item.status).toLowerCase().includes("complete")
                        ? "completed"
                        : "pending";
                    if (local?.row) await updateRefill(local.row.id, { status: mapped });
                    out.push({ refill: refillId, status: formatApiStatus(String(item.status)) });
                  }
                }
                return NextResponse.json(out);
              }
            } catch {
              /* fall through to local */
            }
          }
        }

        for (const id of ids) {
          const refill = await getRefill(id);
          if (!refill || refill.userId !== user.id) {
            out.push({ refill: id, status: { error: "Refill not found" } });
          } else {
            out.push({ refill: id, status: formatApiStatus(refill.status) });
          }
        }
        return NextResponse.json(out);
      }

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
          return NextResponse.json({ status: formatApiStatus(st.status) });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({ status: formatApiStatus(refill.status) });
    }

    if (action === "cancel") {
      const ids = (params.orders || params.order || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!ids.length) return NextResponse.json({ error: "Incorrect order ID" });
      const out: Array<{ order: string; cancel: number | { error: string } }> = [];
      const services = await listServices();
      for (const id of ids) {
        const order = await getOrder(id);
        if (!order || order.userId !== user.id) {
          out.push({ order: id, cancel: { error: "Incorrect order ID" } });
          continue;
        }
        const service = services.find((s) => s.id === order.serviceId);
        if (!service?.cancel || !order.providerOrderId) {
          out.push({ order: id, cancel: { error: "Cancel not available" } });
          continue;
        }
        out.push({ order: id, cancel: 1 });
        await updateOrder(order.id, { status: "canceled" });
        try {
          const creds = await resolveProviderCredentialsForOrder(order, services);
          if (creds) await providerCancel([order.providerOrderId], creds);
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
