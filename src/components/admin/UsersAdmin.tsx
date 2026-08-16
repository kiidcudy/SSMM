"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMenu } from "@/components/admin/ActionMenu";
import { Modal } from "@/components/admin/Modal";
import { adminAction } from "@/components/admin/adminApi";
import { UserCountryFlag } from "@/lib/geo-country";

export type AdminUserRow = {
  id: string;
  uid: number;
  username: string;
  email: string;
  balance: number;
  spent: number;
  status: "active" | "suspended";
  role: "user" | "admin";
  createdAt: string;
  lastAuthAt: string;
  discountPercent: number;
  countryCode?: string;
};

export function UsersAdmin({ users }: { users: AdminUserRow[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [edit, setEdit] = useState<AdminUserRow | null>(null);
  const [pwdUser, setPwdUser] = useState<AdminUserRow | null>(null);
  const [discountUser, setDiscountUser] = useState<AdminUserRow | null>(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [pwd, setPwd] = useState("");
  const [discount, setDiscount] = useState("0");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        String(u.uid).includes(s),
    );
  }, [users, q]);

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
        >
          Add user
        </button>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">Export</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="rounded border border-gray-300 px-3 py-1.5 text-sm"
          />
        </div>
      </div>
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
      <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">Show totals</p>
      <div className="mt-2 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="table-admin">
          <thead>
            <tr>
              <th>
                <input type="checkbox" aria-label="Select all" />
              </th>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Spent</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last auth</th>
              <th>Discount</th>
              <th>Rates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <input type="checkbox" aria-label={`Select ${u.username}`} />
                </td>
                <td>{u.uid}</td>
                <td className="font-medium">
                  <UserCountryFlag code={u.countryCode} />
                  {u.username}
                  {u.role === "admin" ? (
                    <span className="ml-1 rounded bg-gray-100 px-1 text-[10px] text-gray-600">admin</span>
                  ) : null}
                </td>
                <td>{u.email}</td>
                <td>{u.balance.toFixed(2)}</td>
                <td>{u.spent.toFixed(2)}</td>
                <td>
                  <select
                    className="rounded border border-gray-200 bg-white px-1 py-0.5 text-xs capitalize"
                    value={u.status}
                    disabled={busy}
                    onChange={(e) =>
                      run(() =>
                        adminAction("update_user", {
                          userId: u.id,
                          status: e.target.value,
                        }),
                      )
                    }
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </td>
                <td className="whitespace-nowrap text-xs">{fmt(u.createdAt)}</td>
                <td className="whitespace-nowrap text-xs">{fmt(u.lastAuthAt)}</td>
                <td>
                  <button
                    type="button"
                    className="rounded border border-gray-300 px-2 py-0.5 text-xs hover:bg-gray-50"
                    onClick={() => {
                      setDiscountUser(u);
                      setDiscount(String(u.discountPercent));
                    }}
                  >
                    Set discount
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="rounded border border-gray-300 px-2 py-0.5 text-xs hover:bg-gray-50"
                    onClick={() => alert("Custom rates: set per-service rates via Edit user (JSON) soon. Use discount for now.")}
                  >
                    Set custom rates
                  </button>
                </td>
                <td>
                  <ActionMenu
                    items={[
                      {
                        label: "Edit user",
                        onClick: () => {
                          setEdit(u);
                          setForm({ username: u.username, email: u.email, password: "" });
                        },
                      },
                      { label: "Set password", onClick: () => setPwdUser(u) },
                      {
                        label: "Copy rates",
                        onClick: () => navigator.clipboard.writeText(JSON.stringify({ discount: u.discountPercent })),
                      },
                      {
                        label: "Sign-in history",
                        onClick: () => alert(`Last auth: ${fmt(u.lastAuthAt)}`),
                      },
                      {
                        label: "Show users with same IPs",
                        onClick: () => alert("IP matching requires request logging — enable in Settings."),
                      },
                      u.status === "active"
                        ? {
                            label: "Suspend user",
                            danger: true,
                            onClick: () => run(() => adminAction("suspend_user", { userId: u.id })),
                          }
                        : {
                            label: "Activate user",
                            onClick: () => run(() => adminAction("activate_user", { userId: u.id })),
                          },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="Add user" open={addOpen} onClose={() => setAddOpen(false)}>
        <div className="space-y-3">
          <Field label="Username" value={form.username} onChange={(v) => setForm((f) => ({ ...f, username: v }))} />
          <Field label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
          />
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              disabled={busy}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
              onClick={() =>
                run(async () => {
                  await adminAction("add_user", form);
                  setAddOpen(false);
                  setForm({ username: "", email: "", password: "" });
                })
              }
            >
              Add user
            </button>
            <button type="button" className="rounded border px-3 py-1.5 text-sm" onClick={() => setAddOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal title="Edit user" open={!!edit} onClose={() => setEdit(null)}>
        {edit ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">@{edit.username}</p>
            <Field label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
            <Field
              label="Balance"
              value={String(edit.balance)}
              onChange={(v) => setEdit({ ...edit, balance: Number(v) || 0 })}
            />
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                disabled={busy}
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
                onClick={() =>
                  run(async () => {
                    await adminAction("update_user", {
                      userId: edit.id,
                      email: form.email,
                      balance: edit.balance,
                    });
                    setEdit(null);
                  })
                }
              >
                Save
              </button>
              <button type="button" className="rounded border px-3 py-1.5 text-sm" onClick={() => setEdit(null)}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal title="Set password" open={!!pwdUser} onClose={() => setPwdUser(null)}>
        <div className="space-y-3">
          <Field label="New password" type="password" value={pwd} onChange={setPwd} />
          <button
            type="button"
            disabled={busy || !pwdUser}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              run(async () => {
                await adminAction("set_password", { userId: pwdUser!.id, password: pwd });
                setPwdUser(null);
                setPwd("");
              })
            }
          >
            Save password
          </button>
        </div>
      </Modal>

      <Modal title="Set discount" open={!!discountUser} onClose={() => setDiscountUser(null)}>
        <div className="space-y-3">
          <Field label="Discount %" value={discount} onChange={setDiscount} />
          <button
            type="button"
            disabled={busy || !discountUser}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            onClick={() =>
              run(async () => {
                await adminAction("set_discount", {
                  userId: discountUser!.id,
                  discountPercent: Number(discount) || 0,
                });
                setDiscountUser(null);
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

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-1.5"
      />
    </label>
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
