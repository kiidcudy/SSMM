"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMenu } from "@/components/admin/ActionMenu";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";
import { splitOrderTarget } from "@/lib/split-order-target";

export type AdminOrderRow = {
  id: string;
  userId: string;
  username: string;
  serviceId: number;
  serviceName: string;
  providerHost?: string;
  link: string;
  quantity: number;
  charge: number;
  cost?: number;
  status: string;
  providerOrderId?: string;
  createdAt: string;
  remains?: number;
  startCount?: number;
  mode?: "auto" | "manual";
  source?: "api" | "panel";
  cancelReason?: string;
  comments?: string;
};

const STATUSES = [
  "all",
  "awaiting",
  "pending",
  "in_progress",
  "completed",
  "partial",
  "canceled",
  "processing",
  "fail",
  "error",
] as const;

const STATUS_LABELS: Record<string, string> = {
  awaiting: "Awaiting",
  pending: "Pending",
  in_progress: "In progress",
  completed: "Completed",
  partial: "Partial",
  canceled: "Canceled",
  processing: "Processing",
  fail: "Fail",
  error: "Error",
  refunded: "Refunded",
};

export function OrdersAdmin({
  orders,
  mode = "all",
}: {
  orders: AdminOrderRow[];
  mode?: "all" | "cancel";
}) {
  const router = useRouter();
  const [status, setStatus] = useState<string>(mode === "cancel" ? "canceled" : "all");
  const [q, setQ] = useState("");
  const [searchBy, setSearchBy] = useState("Order ID");
  const [detail, setDetail] = useState<AdminOrderRow | null>(null);
  const [startOrder, setStartOrder] = useState<AdminOrderRow | null>(null);
  const [startCount, setStartCount] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const list = useMemo(() => {
    let rows = orders;
    if (mode === "cancel") {
      rows = rows.filter((o) => o.status === "canceled" || o.cancelReason);
    } else if (status !== "all") {
      rows = rows.filter((o) => o.status === status);
    }
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((o) => {
      if (searchBy === "User") return o.username.toLowerCase().includes(s);
      if (searchBy === "Link") return o.link.toLowerCase().includes(s);
      return o.id.includes(s) || (o.providerOrderId || "").includes(s);
    });
  }, [orders, status, q, searchBy, mode]);

  async function run(fn: () => Promise<unknown>) {
    setBusy(true);
    setErr("");
    try {
      await fn();
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {mode === "all" ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <div className="flex flex-wrap gap-1 text-sm">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`rounded px-2.5 py-1 capitalize ${
                  status === s ? "bg-gray-200 font-semibold" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {s === "in_progress" ? "In progress" : s === "all" ? "All" : s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Export</span>
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs"
            >
              <option>Order ID</option>
              <option>User</option>
              <option>Link</option>
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="rounded border border-gray-300 px-2 py-1"
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Cancellation queue and cancel reasons.</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-gray-300 bg-white px-2.5 py-1">Created: Last 90 days</span>
        {["+ Provider", "+ Service", "+ Mode", "+ Profit", "+ Charge", "+ Source", "+ Quantity", "+ Fail reason"].map(
          (x) => (
            <span key={x} className="rounded-full border border-dashed border-gray-300 px-2.5 py-1 text-gray-500">
              {x}
            </span>
          ),
        )}
        <button type="button" className="text-blue-600 hover:underline" onClick={() => { setQ(""); setStatus(mode === "cancel" ? "canceled" : "all"); }}>
          Clear filters
        </button>
      </div>

      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}

      <div className="mt-3 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="table-admin table-admin-orders">
          <thead>
            <tr>
              <th>
                <input type="checkbox" aria-label="Select all" />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Charge</th>
              <th className="col-link">Link</th>
              <th>Start count</th>
              <th>Quantity</th>
              <th className="col-service">Service</th>
              <th>Status</th>
              <th>Remains</th>
              <th>Created</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={13} className="py-8 text-center text-gray-500">
                  No orders.
                </td>
              </tr>
            ) : (
              list.map((o) => (
                <tr key={o.id}>
                  <td>
                    <input type="checkbox" aria-label={`Select ${o.id}`} />
                  </td>
                  <td>
                    <div className="font-medium">{o.id}</div>
                    {o.providerOrderId ? (
                      <div className="text-[11px] text-gray-400">{o.providerOrderId}</div>
                    ) : null}
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <span>{o.username}</span>
                      {o.source === "api" ? (
                        <span className="rounded bg-gray-100 px-1 py-0.5 text-[10px] font-medium uppercase text-gray-500">
                          API
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div>{o.charge.toFixed(3)}</div>
                    {o.cost != null ? <div className="text-[11px] text-gray-400">{o.cost.toFixed(6)}</div> : null}
                  </td>
                  <td className="col-link">
                    <OrderLinkCell link={o.link} />
                  </td>
                  <td>{o.startCount ?? "—"}</td>
                  <td>{o.quantity}</td>
                  <td className="col-service text-xs">
                    <div className="font-medium text-gray-900">
                      {o.serviceId} {o.serviceName}
                    </div>
                    {o.providerHost ? <div className="mt-0.5 text-[11px] text-gray-400">{o.providerHost}</div> : null}
                  </td>
                  <td>
                    <span className="text-sm capitalize text-gray-800">
                      {STATUS_LABELS[o.status] || o.status}
                    </span>
                  </td>
                  <td>{o.remains ?? "—"}</td>
                  <td className="whitespace-nowrap text-xs">{fmt(o.createdAt)}</td>
                  <td className="capitalize">{o.mode || "manual"}</td>
                  <td>
                    <ActionMenu
                      items={[
                        { label: "Details", onClick: () => setDetail(o) },
                        {
                          label: "Change status",
                          onClick: () => {
                            const next = prompt(
                              "New status",
                              o.status,
                            );
                            if (next && next !== o.status) {
                              run(() => adminAction("update_order", { orderId: o.id, status: next }));
                            }
                          },
                        },
                        {
                          label: "Cancel reason",
                          onClick: () =>
                            alert(o.cancelReason || "No cancel reason set."),
                        },
                        {
                          label: "Set start count",
                          onClick: () => {
                            setStartOrder(o);
                            setStartCount(String(o.startCount ?? ""));
                          },
                        },
                        {
                          label: "Cancel + refund",
                          danger: true,
                          onClick: () =>
                            run(() =>
                              adminAction("cancel_order", {
                                orderId: o.id,
                                refund: true,
                                cancelReason: "Canceled by admin",
                              }),
                            ),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal title={`Order #${detail?.id || ""}`} open={!!detail} onClose={() => setDetail(null)}>
        {detail ? (
          <DetailBody detail={detail} />
        ) : null}
      </Modal>

      <Modal title="Set start count" open={!!startOrder} onClose={() => setStartOrder(null)}>
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-gray-600">Start count</span>
            <input
              value={startCount}
              onChange={(e) => setStartCount(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-1.5"
            />
          </label>
          <button
            type="button"
            disabled={busy}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              run(async () => {
                await adminAction("update_order", {
                  orderId: startOrder!.id,
                  startCount: Number(startCount) || 0,
                });
                setStartOrder(null);
              })
            }
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}

function OrderLinkCell({ link }: { link: string }) {
  const display = splitOrderTarget(link ?? "").link || link;
  const href = toExternalHref(display);

  if (!href) {
    return <span className="order-link-text">{display || "—"}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="order-link"
      title={display}
    >
      <ExternalLinkIcon />
      <span className="order-link-text">{display}</span>
    </a>
  );
}

function toExternalHref(raw: string): string | null {
  const text = raw.trim();
  if (!text) return null;
  if (/^https?:\/\//i.test(text)) return text;
  if (text.startsWith("www.")) return `https://${text}`;
  if (/^[a-z0-9.-]+\.[a-z]{2,}/i.test(text)) return `https://${text}`;
  return null;
}

function ExternalLinkIcon() {
  return (
    <svg
      className="order-link-icon"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M6.5 3.5H3.5A1 1 0 0 0 2.5 4.5v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" />
      <path d="M9 2.5h4.5V7" />
      <path d="M13 3.5 7.5 9" />
    </svg>
  );
}

function DetailBody({ detail }: { detail: AdminOrderRow }) {
  const linkDisplay = splitOrderTarget(detail.link ?? "").link || detail.link;
  const linkHref = toExternalHref(linkDisplay);
  const commentLines = (detail.comments ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <dl className="space-y-2 text-sm">
      <Row k="User" v={detail.username} />
      <Row k="Service" v={`${detail.serviceId} — ${detail.serviceName}`} />
      <div className="flex gap-2 border-b border-gray-50 pb-1">
        <dt className="w-28 shrink-0 text-gray-500">Link</dt>
        <dd className="break-all">
          {linkHref ? (
            <a href={linkHref} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {linkDisplay}
            </a>
          ) : (
            linkDisplay
          )}
        </dd>
      </div>
      {commentLines.length > 0 ? (
        <div className="border-b border-gray-50 pb-2">
          <dt className="mb-1 w-28 shrink-0 text-gray-500">Comments</dt>
          <dd>
            <ul className="space-y-1.5">
              {commentLines.map((comment, index) => (
                <li key={`${index}-${comment.slice(0, 24)}`} className="break-words">
                  {comment}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ) : null}
      <Row k="Qty" v={String(detail.quantity)} />
      <Row k="Charge" v={`$${detail.charge.toFixed(4)}`} />
      <Row k="Status" v={detail.status} />
      <Row k="Provider ID" v={detail.providerOrderId || "—"} />
      <Row k="Cancel reason" v={detail.cancelReason || "—"} />
    </dl>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2 border-b border-gray-50 pb-1">
      <dt className="w-28 shrink-0 text-gray-500">{k}</dt>
      <dd className="break-all">{v}</dd>
    </div>
  );
}

function fmt(iso: string) {
  try {
    const d = new Date(iso);
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  } catch {
    return iso;
  }
}
