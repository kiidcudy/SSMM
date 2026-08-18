import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { type PanelService } from "@/lib/data/catalog";

const BLOB_DB_PATH = "ssmm/db.json";

/** First public order id (Perfect Panel style: 3.157.895). */
export const ORDER_ID_START = 3_157_895;

export type StoredUser = {
  id: string;
  /** Short numeric id shown in admin (e.g. 904). */
  uid: number;
  username: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  balance: number;
  spent: number;
  status: "active" | "suspended";
  apiKey: string;
  createdAt: string;
  lastAuthAt: string;
  discountPercent: number;
  customRates?: Record<number, number>;
  /** Google OAuth subject id when signed in with Google. */
  googleId?: string;
  /** ISO 3166-1 alpha-2 from edge geo headers (last seen on auth). */
  countryCode?: string;
  lastIp?: string;
};

export type OrderStatus =
  | "awaiting"
  | "pending"
  | "in_progress"
  | "processing"
  | "completed"
  | "partial"
  | "canceled"
  | "fail"
  | "error"
  | "refunded";

export type StoredOrder = {
  id: string;
  userId: string;
  serviceId: number;
  serviceName: string;
  link: string;
  quantity: number;
  charge: number;
  cost?: number;
  status: OrderStatus;
  providerOrderId?: string;
  createdAt: string;
  updatedAt: string;
  remains?: number;
  startCount?: number;
  mode?: "auto" | "manual";
  cancelReason?: string;
  comments?: string;
};

export type FundRequest = {
  id: string;
  userId: string;
  username: string;
  method: string;
  amount: number;
  note: string;
  status: "pending" | "approved" | "rejected" | "completed" | "expired";
  mode: "auto" | "manual";
  createdAt: string;
  updatedAt: string;
};

export type PanelSettings = {
  siteName: string;
  currency: string;
  supportEmail: string;
  maintenanceMode: boolean;
  minDeposit: number;
  signupBonus: number;
};

export type AppearanceSettings = {
  primaryColor: string;
  logoUrl: string;
  faviconUrl: string;
  customCss: string;
  homepageHtml: string;
};

export type AffiliateRow = {
  id: string;
  userId: string;
  username: string;
  code: string;
  ratePercent: number;
  earned: number;
  clicks: number;
  signups: number;
  status: "active" | "disabled";
  createdAt: string;
};

export type ChildPanel = {
  id: string;
  domain: string;
  ownerUsername: string;
  status: "active" | "pending" | "suspended";
  createdAt: string;
  note: string;
};

/** External SMM panel API connection (Settings → Providers). */
export type StoredProvider = {
  id: string;
  name: string;
  url: string;
  apiUrl: string;
  apiKey: string;
  alias: string;
  createdAt: string;
  updatedAt: string;
};

export type ServiceOverride = {
  enabled?: boolean;
  hidden?: boolean;
  /** Soft-delete: stays removed across provider sync */
  deleted?: boolean;
  rate?: number;
  name?: string;
  description?: string;
  category?: string;
  dripfeed?: boolean;
  denyDuplicates?: boolean;
};

export type LedgerEntry = {
  id: string;
  userId: string;
  type: "deposit" | "order" | "refund" | "adjust";
  amount: number;
  balanceAfter: number;
  note: string;
  refId?: string;
  createdAt: string;
};

export type TicketMessage = {
  id: string;
  authorId: string;
  authorRole: "user" | "admin";
  body: string;
  createdAt: string;
};

export type StoredTicket = {
  id: string;
  uid: number;
  userId: string;
  username: string;
  subject: string;
  status: "open" | "answered" | "closed" | "pending";
  assignee: string;
  unread: boolean;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
};

export type StoredRefill = {
  id: string;
  orderId: string;
  userId: string;
  providerRefillId?: string;
  status: "pending" | "completed" | "rejected" | "error";
  createdAt: string;
  updatedAt: string;
};

type DbMeta = {
  nextOrderId: number;
  nextUserUid: number;
  nextPaymentId: number;
  nextTicketUid: number;
  nextLocalServiceId: number;
};

type DbShape = {
  users: StoredUser[];
  orders: StoredOrder[];
  funds: FundRequest[];
  services: PanelService[];
  tickets: StoredTicket[];
  ledger: LedgerEntry[];
  refills: StoredRefill[];
  meta: DbMeta;
  settings: PanelSettings;
  appearance: AppearanceSettings;
  affiliates: AffiliateRow[];
  childPanels: ChildPanel[];
  providers: StoredProvider[];
  categories: string[];
  serviceOverrides: Record<string, ServiceOverride>;
};

function defaultSettings(): PanelSettings {
  return {
    siteName: "SSMM Panel",
    currency: "USD",
    supportEmail: "support@ssmmpanel.com",
    maintenanceMode: false,
    minDeposit: 1,
    signupBonus: 0,
  };
}

function defaultAppearance(): AppearanceSettings {
  return {
    primaryColor: "#2563eb",
    logoUrl: "",
    faviconUrl: "",
    customCss: "",
    homepageHtml: "",
  };
}

function defaultMeta(): DbMeta {
  return {
    nextOrderId: ORDER_ID_START,
    nextUserUid: 900,
    nextPaymentId: 100,
    nextTicketUid: 500,
    nextLocalServiceId: 900000,
  };
}

/** Local only: project .data. On Vercel use Vercel Blob (same pattern as other sites). */
function resolvePaths() {
  const dataDir = path.join(process.cwd(), ".data");
  return { dataDir, dbFile: path.join(dataDir, "db.json") };
}

function resolveBlobToken(): string {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find(
    (k) => k.toUpperCase().endsWith("READ_WRITE_TOKEN") && process.env[k],
  );
  return key ? (process.env[key] as string) : "";
}

function blobConfigured() {
  return Boolean(process.env.BLOB_STORE_ID?.trim() || resolveBlobToken());
}

function blobAuthOptions(): { token?: string; storeId?: string } {
  const token = resolveBlobToken();
  if (token) return { token };
  const storeId = process.env.BLOB_STORE_ID?.trim();
  if (storeId) return { storeId };
  return {};
}

function cloneDb(db: DbShape): DbShape {
  return JSON.parse(JSON.stringify(db)) as DbShape;
}

let memoryDb: DbShape | null = null;
let servicesCache: { at: number; items: PanelService[] } | null = null;
const SERVICES_TTL_MS = 10 * 60 * 1000;

function hashPassword(password: string, salt?: string): string {
  const s = salt || randomBytes(16).toString("hex");
  const hash = scryptSync(password, s, 32).toString("hex");
  return `${s}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (prev.length !== next.length) return false;
  return timingSafeEqual(prev, next);
}

function newApiKey(): string {
  return randomBytes(24).toString("hex");
}

function adminCredentials() {
  return {
    username: (process.env.ADMIN_USERNAME || "admin").trim(),
    password: process.env.ADMIN_PASSWORD || "admin123",
  };
}

function makeAdminUser(now: string): StoredUser {
  const { username, password } = adminCredentials();
  return {
    id: "admin-1",
    uid: 1,
    username,
    email: "admin@ssmmpanel.com",
    passwordHash: hashPassword(password),
    role: "admin",
    balance: 0,
    spent: 0,
    status: "active",
    apiKey: newApiKey(),
    createdAt: now,
    lastAuthAt: now,
    discountPercent: 0,
    customRates: {},
  };
}

/** Keep admin username/password aligned with env (needed on Vercel). Returns whether mutated. */
function applyAdminSync(db: DbShape): boolean {
  const { username, password } = adminCredentials();
  const now = new Date().toISOString();
  const admin = db.users.find((u) => u.id === "admin-1" || u.role === "admin");
  let changed = false;

  if (!admin) {
    db.users.unshift(makeAdminUser(now));
    changed = true;
  } else {
    if (admin.username !== username) {
      admin.username = username;
      changed = true;
    }
    if (!verifyPassword(password, admin.passwordHash)) {
      admin.passwordHash = hashPassword(password);
      changed = true;
    }
    if (admin.role !== "admin") {
      admin.role = "admin";
      changed = true;
    }
    if (admin.status !== "active") {
      admin.status = "active";
      changed = true;
    }
  }

  return changed;
}

function emptyDb(): DbShape {
  return {
    users: [makeAdminUser(new Date().toISOString())],
    orders: [],
    funds: [],
    services: [],
    tickets: [],
    ledger: [],
    refills: [],
    meta: defaultMeta(),
    settings: defaultSettings(),
    appearance: defaultAppearance(),
    affiliates: [],
    childPanels: [],
    providers: [],
    categories: [],
    serviceOverrides: {},
  };
}

function migrateDb(db: DbShape): DbShape {
  if (!Array.isArray(db.tickets)) db.tickets = [];
  if (!Array.isArray(db.ledger)) db.ledger = [];
  if (!Array.isArray(db.refills)) db.refills = [];
  if (!Array.isArray(db.funds)) db.funds = [];
  if (!Array.isArray(db.orders)) db.orders = [];
  if (!Array.isArray(db.services)) db.services = [];
  if (!Array.isArray(db.users)) db.users = [];
  if (!Array.isArray(db.affiliates)) db.affiliates = [];
  if (!Array.isArray(db.childPanels)) db.childPanels = [];
  if (!Array.isArray(db.providers)) db.providers = [];
  if (!Array.isArray(db.categories)) db.categories = [];
  if (!db.settings) db.settings = defaultSettings();
  if (!db.appearance) db.appearance = defaultAppearance();
  if (!db.serviceOverrides || typeof db.serviceOverrides !== "object") db.serviceOverrides = {};
  if (!db.meta) db.meta = defaultMeta();
  if (!db.meta.nextLocalServiceId) db.meta.nextLocalServiceId = 900000;

  // Keep category list in sync with services already stored.
  const catSet = new Set(db.categories.map((c) => c.trim()).filter(Boolean));
  for (const s of db.services) {
    if (s.category?.trim()) catSet.add(s.category.trim());
  }
  db.categories = [...catSet].sort((a, b) => a.localeCompare(b));

  let uidCursor = db.meta.nextUserUid || 900;
  for (const u of db.users) {
    if (typeof u.uid !== "number") {
      u.uid = u.id === "admin-1" || u.role === "admin" ? 1 : uidCursor++;
    }
    if (!u.customRates) u.customRates = {};
    if (u.discountPercent == null) u.discountPercent = 0;
  }
  db.meta.nextUserUid = Math.max(db.meta.nextUserUid || 900, uidCursor);

  let ticketUid = db.meta.nextTicketUid || 500;
  for (const t of db.tickets) {
    if (typeof t.uid !== "number") t.uid = ticketUid++;
    if (t.assignee == null) t.assignee = "";
    if (!Array.isArray(t.messages)) t.messages = [];
    if (!t.status) t.status = "pending";
    if (t.unread == null) t.unread = t.status === "open" || t.status === "pending";
  }
  db.meta.nextTicketUid = Math.max(db.meta.nextTicketUid || 500, ticketUid);

  for (const f of db.funds) {
    if (!f.mode) f.mode = "manual";
    if (!f.updatedAt) f.updatedAt = f.createdAt;
    if (f.status === "approved") f.status = "completed";
  }

  for (const o of db.orders) {
    if (!o.mode) o.mode = o.providerOrderId ? "auto" : "manual";
  }

  const numericOrderIds = db.orders
    .map((o) => Number(o.id))
    .filter((n) => Number.isFinite(n) && n >= ORDER_ID_START);
  const maxOrder = numericOrderIds.length ? Math.max(...numericOrderIds) : ORDER_ID_START - 1;
  db.meta.nextOrderId = Math.max(db.meta.nextOrderId || ORDER_ID_START, maxOrder + 1);

  const numericPayIds = db.funds.map((f) => Number(f.id)).filter((n) => Number.isFinite(n));
  if (numericPayIds.length) {
    db.meta.nextPaymentId = Math.max(db.meta.nextPaymentId || 100, Math.max(...numericPayIds) + 1);
  }

  return db;
}

async function loadFileDb(): Promise<DbShape> {
  if (memoryDb) return migrateDb(memoryDb);

  const { dataDir, dbFile } = resolvePaths();
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const raw = await fs.readFile(dbFile, "utf8");
    const db = migrateDb(JSON.parse(raw) as DbShape);
    memoryDb = db;
    return db;
  } catch {
    const db = emptyDb();
    memoryDb = db;
    await saveFile(db);
    return db;
  }
}

async function saveFile(db: DbShape) {
  memoryDb = db;
  const { dataDir, dbFile } = resolvePaths();
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dbFile, JSON.stringify(db, null, 2), "utf8");
  } catch {
    // Local FS can fail; memory still serves the current process.
  }
}

async function readBlobDb(): Promise<DbShape | null> {
  try {
    const result = await get(BLOB_DB_PATH, {
      access: "private",
      useCache: false,
      ...blobAuthOptions(),
    });
    if (!result?.stream) return null;
    const text = await new Response(result.stream).text();
    if (!text) return null;
    return migrateDb(JSON.parse(text) as DbShape);
  } catch {
    return null;
  }
}

async function writeBlobDb(db: DbShape): Promise<void> {
  await put(BLOB_DB_PATH, JSON.stringify(db), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...blobAuthOptions(),
  });
}

/** Shared read-modify-write for Blob (Vercel) or local .data file. */
async function modifyDb<T>(fn: (db: DbShape) => Promise<T> | T): Promise<T> {
  if (!blobConfigured()) {
    const db = await loadFileDb();
    applyAdminSync(db);
    const result = await fn(db);
    await saveFile(db);
    return result;
  }

  const raw = await readBlobDb();
  const db = migrateDb(raw ? cloneDb(raw) : emptyDb());
  applyAdminSync(db);
  const result = await fn(db);
  await writeBlobDb(db);
  return result;
}

async function ensureDb(): Promise<DbShape> {
  if (blobConfigured()) {
    const raw = await readBlobDb();
    if (!raw) {
      return modifyDb(async (db) => cloneDb(db));
    }
    const db = migrateDb(cloneDb(raw));
    if (applyAdminSync(db)) {
      await writeBlobDb(db);
    }
    return db;
  }

  const db = await loadFileDb();
  if (applyAdminSync(db)) await saveFile(db);
  return db;
}

export async function listUsers() {
  return (await ensureDb()).users;
}

export async function findUserByUsername(username: string) {
  const db = await ensureDb();
  return db.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function findUserByApiKey(apiKey: string) {
  const db = await ensureDb();
  return db.users.find((u) => u.apiKey === apiKey && u.status === "active") ?? null;
}

export async function findUserById(id: string) {
  const db = await ensureDb();
  return db.users.find((u) => u.id === id) ?? null;
}

export async function findUserByEmail(email: string) {
  const db = await ensureDb();
  const e = email.trim().toLowerCase();
  return db.users.find((u) => u.email.toLowerCase() === e) ?? null;
}

export async function findOrCreateGoogleUser(input: {
  googleId: string;
  email: string;
  name?: string;
}): Promise<StoredUser> {
  return modifyDb(async (db) => {
    const email = input.email.trim().toLowerCase();
    const now = new Date().toISOString();
    let user = db.users.find((u) => u.googleId === input.googleId);
    if (user) {
      user.lastAuthAt = now;
      if (email) user.email = email;
      return user;
    }
    user = db.users.find((u) => u.email.toLowerCase() === email);
    if (user) {
      user.googleId = input.googleId;
      user.lastAuthAt = now;
      return user;
    }
    const base =
      (input.name || email.split("@")[0] || "user")
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 20) || "user";
    let username = base;
    let n = 0;
    while (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      n += 1;
      username = `${base}${n}`.slice(0, 32);
    }
    const created: StoredUser = {
      id: randomBytes(8).toString("hex"),
      uid: db.meta.nextUserUid++,
      username,
      email,
      passwordHash: hashPassword(randomBytes(24).toString("hex")),
      role: "user",
      balance: 0,
      spent: 0,
      status: "active",
      apiKey: newApiKey(),
      createdAt: now,
      lastAuthAt: now,
      discountPercent: 0,
      customRates: {},
      googleId: input.googleId,
    };
    if (db.settings.signupBonus > 0) {
      created.balance = db.settings.signupBonus;
      await pushLedger(db, {
        userId: created.id,
        type: "deposit",
        amount: db.settings.signupBonus,
        balanceAfter: created.balance,
        note: "Signup bonus",
      });
    }
    db.users.push(created);
    return created;
  });
}

export async function createUser(input: {
  username: string;
  email: string;
  password: string;
  countryCode?: string;
  lastIp?: string;
}): Promise<StoredUser> {
  return modifyDb(async (db) => {
    if (db.users.some((u) => u.username.toLowerCase() === input.username.toLowerCase())) {
      throw new Error("Username taken");
    }
    const now = new Date().toISOString();
    const user: StoredUser = {
      id: randomBytes(8).toString("hex"),
      uid: db.meta.nextUserUid++,
      username: input.username.trim(),
      email: input.email.trim().toLowerCase(),
      passwordHash: hashPassword(input.password),
      role: "user",
      balance: 0,
      spent: 0,
      status: "active",
      apiKey: newApiKey(),
      createdAt: now,
      lastAuthAt: now,
      discountPercent: 0,
      customRates: {},
      ...(input.countryCode ? { countryCode: input.countryCode } : {}),
      ...(input.lastIp ? { lastIp: input.lastIp } : {}),
    };
    if (db.settings.signupBonus > 0) {
      user.balance = db.settings.signupBonus;
      await pushLedger(db, {
        userId: user.id,
        type: "deposit",
        amount: db.settings.signupBonus,
        balanceAfter: user.balance,
        note: "Signup bonus",
      });
    }
    db.users.push(user);
    return user;
  });
}

export async function touchAuth(
  userId: string,
  opts?: { countryCode?: string; lastIp?: string },
) {
  await modifyDb(async (db) => {
    const u = db.users.find((x) => x.id === userId);
    if (!u) return;
    u.lastAuthAt = new Date().toISOString();
    if (opts?.countryCode) u.countryCode = opts.countryCode;
    if (opts?.lastIp) u.lastIp = opts.lastIp;
  });
}

async function pushLedger(
  db: DbShape,
  input: Omit<LedgerEntry, "id" | "createdAt" | "balanceAfter"> & { balanceAfter: number },
) {
  db.ledger.unshift({
    ...input,
    id: randomBytes(6).toString("hex"),
    createdAt: new Date().toISOString(),
  });
}

export async function adjustBalance(
  userId: string,
  delta: number,
  spentDelta = 0,
  meta?: { type?: LedgerEntry["type"]; note?: string; refId?: string },
) {
  return modifyDb(async (db) => {
    const u = db.users.find((x) => x.id === userId);
    if (!u) throw new Error("User not found");
    const next = Math.round((u.balance + delta) * 10000) / 10000;
    if (next < -0.00001) throw new Error("Insufficient balance");
    u.balance = Math.max(0, next);
    u.spent = Math.round((u.spent + spentDelta) * 10000) / 10000;
    await pushLedger(db, {
      userId,
      type: meta?.type || (delta >= 0 ? "deposit" : "order"),
      amount: delta,
      balanceAfter: u.balance,
      note: meta?.note || (delta >= 0 ? "Balance credit" : "Order charge"),
      refId: meta?.refId,
    });
    return u;
  });
}

export async function setUserBalance(userId: string, balance: number) {
  return modifyDb(async (db) => {
    const u = db.users.find((x) => x.id === userId);
    if (!u) throw new Error("User not found");
    u.balance = Math.round(balance * 10000) / 10000;
    return u;
  });
}

function applyServiceOverrides(
  items: PanelService[],
  overrides: Record<string, ServiceOverride>,
): PanelService[] {
  return items
    .filter((s) => !overrides[String(s.id)]?.deleted)
    .map((s) => {
      const ov = overrides[String(s.id)];
      if (!ov) return s;
      return {
        ...s,
        name: ov.name ?? s.name,
        rate: ov.rate ?? s.rate,
        description: ov.description ?? s.description,
        category: ov.category ?? s.category,
        dripfeed: ov.dripfeed ?? s.dripfeed,
      };
    });
}

export async function listServices() {
  // Catalog is local DB (selective import / manual add). Env sync is opt-in via Sync button.
  const db = await ensureDb();
  return applyServiceOverrides(db.services, db.serviceOverrides || {});
}

export async function replaceServices(services: PanelService[]) {
  servicesCache = { at: Date.now(), items: services };
  await modifyDb(async (db) => {
    db.services = services;
  });
}

export function clearServicesCache() {
  servicesCache = null;
}

export async function createOrder(order: Omit<StoredOrder, "id" | "createdAt" | "updatedAt">) {
  return modifyDb(async (db) => {
    const now = new Date().toISOString();
    if (!db.meta.nextOrderId || db.meta.nextOrderId < ORDER_ID_START) {
      db.meta.nextOrderId = ORDER_ID_START;
    }
    const row: StoredOrder = {
      ...order,
      id: String(db.meta.nextOrderId++),
      mode: order.mode || (order.providerOrderId ? "auto" : "manual"),
      createdAt: now,
      updatedAt: now,
    };
    db.orders.unshift(row);
    return row;
  });
}

export async function listOrders(userId?: string) {
  const db = await ensureDb();
  return userId ? db.orders.filter((o) => o.userId === userId) : db.orders;
}

export async function getOrder(id: string) {
  const db = await ensureDb();
  return db.orders.find((o) => o.id === id) ?? null;
}

export async function updateOrder(id: string, patch: Partial<StoredOrder>) {
  return modifyDb(async (db) => {
    const o = db.orders.find((x) => x.id === id);
    if (!o) return null;
    Object.assign(o, patch, { updatedAt: new Date().toISOString() });
    return o;
  });
}

export async function createFundRequest(
  input: Omit<FundRequest, "id" | "createdAt" | "updatedAt" | "status" | "mode"> & {
    status?: FundRequest["status"];
    mode?: FundRequest["mode"];
  },
) {
  return modifyDb(async (db) => {
    const now = new Date().toISOString();
    const row: FundRequest = {
      ...input,
      id: String(db.meta.nextPaymentId++),
      status: input.status || "pending",
      mode: input.mode || "manual",
      createdAt: now,
      updatedAt: now,
    };
    db.funds.unshift(row);
    return row;
  });
}

export async function listFunds() {
  return (await ensureDb()).funds;
}

export async function approveFund(id: string) {
  return modifyDb(async (db) => {
    const f = db.funds.find((x) => x.id === id);
    if (!f || f.status !== "pending") throw new Error("Invalid fund request");
    f.status = "completed";
    f.updatedAt = new Date().toISOString();
    const u = db.users.find((x) => x.id === f.userId);
    if (!u) throw new Error("User missing");
    u.balance = Math.round((u.balance + f.amount) * 10000) / 10000;
    await pushLedger(db, {
      userId: u.id,
      type: "deposit",
      amount: f.amount,
      balanceAfter: u.balance,
      note: `Deposit approved (${f.method})`,
      refId: f.id,
    });
    return f;
  });
}

export async function rejectFund(id: string) {
  return modifyDb(async (db) => {
    const f = db.funds.find((x) => x.id === id);
    if (!f || f.status !== "pending") throw new Error("Invalid fund request");
    f.status = "rejected";
    f.updatedAt = new Date().toISOString();
    return f;
  });
}

export async function listFundsForUser(userId: string) {
  return (await ensureDb()).funds.filter((f) => f.userId === userId);
}

export async function listLedger(userId?: string) {
  const db = await ensureDb();
  return userId ? db.ledger.filter((e) => e.userId === userId) : db.ledger;
}

export async function createTicket(input: {
  userId: string;
  username: string;
  subject: string;
  body: string;
}) {
  return modifyDb(async (db) => {
    const now = new Date().toISOString();
    const ticket: StoredTicket = {
      id: randomBytes(6).toString("hex"),
      uid: db.meta.nextTicketUid++,
      userId: input.userId,
      username: input.username,
      subject: input.subject.trim(),
      status: "pending",
      assignee: "",
      unread: true,
      messages: [
        {
          id: randomBytes(4).toString("hex"),
          authorId: input.userId,
          authorRole: "user",
          body: input.body.trim(),
          createdAt: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    db.tickets.unshift(ticket);
    return ticket;
  });
}

export async function listTickets(userId?: string) {
  const db = await ensureDb();
  return userId ? db.tickets.filter((t) => t.userId === userId) : db.tickets;
}

export async function getTicket(id: string) {
  const db = await ensureDb();
  return db.tickets.find((t) => t.id === id) ?? null;
}

export async function replyTicket(input: {
  ticketId: string;
  authorId: string;
  authorRole: "user" | "admin";
  body: string;
}) {
  return modifyDb(async (db) => {
    const ticket = db.tickets.find((t) => t.id === input.ticketId);
    if (!ticket) throw new Error("Ticket not found");
    if (ticket.status === "closed") throw new Error("Ticket closed");
    if (!Array.isArray(ticket.messages)) ticket.messages = [];
    const now = new Date().toISOString();
    ticket.messages.push({
      id: randomBytes(4).toString("hex"),
      authorId: input.authorId,
      authorRole: input.authorRole,
      body: input.body.trim(),
      createdAt: now,
    });
    ticket.status = input.authorRole === "admin" ? "answered" : "open";
    // User messages need admin attention; admin replies clear the unread flag for staff.
    ticket.unread = input.authorRole === "user";
    ticket.updatedAt = now;
    return ticket;
  });
}

export async function setTicketStatus(id: string, status: StoredTicket["status"]) {
  return modifyDb(async (db) => {
    const ticket = db.tickets.find((t) => t.id === id);
    if (!ticket) throw new Error("Ticket not found");
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    return ticket;
  });
}

export async function createRefill(input: {
  orderId: string;
  userId: string;
  providerRefillId?: string;
  status?: StoredRefill["status"];
}) {
  return modifyDb(async (db) => {
    const now = new Date().toISOString();
    const row: StoredRefill = {
      id: randomBytes(6).toString("hex"),
      orderId: input.orderId,
      userId: input.userId,
      providerRefillId: input.providerRefillId,
      status: input.status || "pending",
      createdAt: now,
      updatedAt: now,
    };
    db.refills.unshift(row);
    return row;
  });
}

export async function getRefill(id: string) {
  const db = await ensureDb();
  return db.refills.find((r) => r.id === id) ?? null;
}

export async function updateRefill(id: string, patch: Partial<StoredRefill>) {
  return modifyDb(async (db) => {
    const r = db.refills.find((x) => x.id === id);
    if (!r) return null;
    Object.assign(r, patch, { updatedAt: new Date().toISOString() });
    return r;
  });
}

export async function listRefills(userId?: string) {
  const db = await ensureDb();
  return userId ? db.refills.filter((r) => r.userId === userId) : db.refills;
}

export function toSessionUser(u: StoredUser) {
  return {
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role,
    balance: u.balance,
    apiKey: u.apiKey,
  };
}

export async function getPanelSettings() {
  return (await ensureDb()).settings;
}

export async function updatePanelSettings(patch: Partial<PanelSettings>) {
  return modifyDb(async (db) => {
    db.settings = { ...db.settings, ...patch };
    return db.settings;
  });
}

export async function getAppearance() {
  return (await ensureDb()).appearance;
}

export async function updateAppearance(patch: Partial<AppearanceSettings>) {
  return modifyDb(async (db) => {
    db.appearance = { ...db.appearance, ...patch };
    return db.appearance;
  });
}

export async function listAffiliates() {
  return (await ensureDb()).affiliates;
}

export async function upsertAffiliate(input: {
  username: string;
  code?: string;
  ratePercent?: number;
  status?: AffiliateRow["status"];
}) {
  return modifyDb(async (db) => {
    const user = db.users.find((u) => u.username.toLowerCase() === input.username.toLowerCase());
    if (!user) throw new Error("User not found");
    const existing = db.affiliates.find((a) => a.userId === user.id);
    if (existing) {
      if (input.code) existing.code = input.code;
      if (input.ratePercent != null) existing.ratePercent = input.ratePercent;
      if (input.status) existing.status = input.status;
      return existing;
    }
    const row: AffiliateRow = {
      id: randomBytes(6).toString("hex"),
      userId: user.id,
      username: user.username,
      code: input.code || user.username.toLowerCase(),
      ratePercent: input.ratePercent ?? 5,
      earned: 0,
      clicks: 0,
      signups: 0,
      status: input.status || "active",
      createdAt: new Date().toISOString(),
    };
    db.affiliates.unshift(row);
    return row;
  });
}

export async function listChildPanels() {
  return (await ensureDb()).childPanels;
}

export async function upsertChildPanel(input: {
  id?: string;
  domain: string;
  ownerUsername: string;
  status?: ChildPanel["status"];
  note?: string;
}) {
  return modifyDb(async (db) => {
    if (input.id) {
      const row = db.childPanels.find((c) => c.id === input.id);
      if (!row) throw new Error("Child panel not found");
      row.domain = input.domain.trim();
      row.ownerUsername = input.ownerUsername.trim();
      if (input.status) row.status = input.status;
      if (input.note != null) row.note = input.note;
      return row;
    }
    const row: ChildPanel = {
      id: randomBytes(6).toString("hex"),
      domain: input.domain.trim(),
      ownerUsername: input.ownerUsername.trim(),
      status: input.status || "pending",
      createdAt: new Date().toISOString(),
      note: input.note || "",
    };
    db.childPanels.unshift(row);
    return row;
  });
}

export async function deleteChildPanel(id: string) {
  return modifyDb(async (db) => {
    db.childPanels = db.childPanels.filter((c) => c.id !== id);
  });
}

export async function adminUpdateUser(
  userId: string,
  patch: Partial<
    Pick<StoredUser, "email" | "status" | "discountPercent" | "balance" | "customRates" | "role">
  > & { password?: string },
) {
  return modifyDb(async (db) => {
    const u = db.users.find((x) => x.id === userId);
    if (!u) throw new Error("User not found");
    if (patch.email != null) u.email = patch.email.trim().toLowerCase();
    if (patch.status) u.status = patch.status;
    if (patch.discountPercent != null) u.discountPercent = Math.max(0, Math.min(100, patch.discountPercent));
    if (patch.balance != null) u.balance = Math.round(patch.balance * 10000) / 10000;
    if (patch.customRates) u.customRates = patch.customRates;
    if (patch.role && u.id !== "admin-1") u.role = patch.role;
    if (patch.password) u.passwordHash = hashPassword(patch.password);
    return u;
  });
}

export async function adminAddPayment(input: {
  username: string;
  amount: number;
  method: string;
  memo: string;
}) {
  return modifyDb(async (db) => {
    const u = db.users.find((x) => x.username.toLowerCase() === input.username.toLowerCase());
    if (!u) throw new Error("User not found");
    const amount = Math.round(input.amount * 10000) / 10000;
    if (!(amount > 0)) throw new Error("Invalid amount");
    const now = new Date().toISOString();
    u.balance = Math.round((u.balance + amount) * 10000) / 10000;
    const row: FundRequest = {
      id: String(db.meta.nextPaymentId++),
      userId: u.id,
      username: u.username,
      method: input.method || "Bonus",
      amount,
      note: input.memo || "",
      status: "completed",
      mode: "manual",
      createdAt: now,
      updatedAt: now,
    };
    db.funds.unshift(row);
    await pushLedger(db, {
      userId: u.id,
      type: "deposit",
      amount,
      balanceAfter: u.balance,
      note: `${row.method}: ${row.note || "Manual payment"}`,
      refId: row.id,
    });
    return row;
  });
}

export async function getServiceOverrides() {
  return (await ensureDb()).serviceOverrides;
}

export async function setServiceOverride(serviceId: number, patch: ServiceOverride) {
  return modifyDb(async (db) => {
    const key = String(serviceId);
    db.serviceOverrides[key] = { ...db.serviceOverrides[key], ...patch };
    const svc = db.services.find((s) => s.id === serviceId);
    if (svc) {
      if (patch.rate != null) {
        svc.rate = patch.rate;
        // Manual price edit stops auto sync for this service (won't get overwritten).
        svc.syncRate = false;
      }
      if (patch.name != null) svc.name = patch.name;
      if (patch.description != null) svc.description = patch.description;
      if (patch.category != null) svc.category = patch.category;
      if (patch.dripfeed != null) svc.dripfeed = patch.dripfeed;
    }
    return db.serviceOverrides[key];
  });
}

export type ServicesBulkOp =
  | { op: "enable" }
  | { op: "disable" }
  | { op: "hide" }
  | { op: "unhide" }
  | { op: "delete" }
  | { op: "set_rate"; rate: number }
  | { op: "multiply_rate"; factor: number }
  | { op: "set_category"; category: string }
  | { op: "set_dripfeed"; dripfeed: boolean }
  | { op: "set_deny_duplicates"; denyDuplicates: boolean }
  | { op: "clear_custom_rates" }
  | { op: "replace_name"; find: string; replace: string }
  | { op: "set_description"; description: string };

export async function servicesBulk(serviceIds: number[], operation: ServicesBulkOp) {
  const ids = [...new Set(serviceIds.map(Number).filter((n) => Number.isFinite(n) && n > 0))];
  if (!ids.length) throw new Error("No services selected");

  if (operation.op === "delete") {
    await modifyDb(async (db) => {
      const set = new Set(ids);
      // Drop local-only copies; mark provider lines deleted so sync cannot restore them
      db.services = db.services.filter((s) => !set.has(s.id));
      for (const id of ids) {
        const key = String(id);
        db.serviceOverrides[key] = { ...db.serviceOverrides[key], deleted: true };
      }
    });
    clearServicesCache();
    return { count: ids.length };
  }

  if (operation.op === "clear_custom_rates") {
    await modifyDb(async (db) => {
      for (const u of db.users) {
        if (!u.customRates) continue;
        for (const id of ids) delete u.customRates[id];
      }
    });
    return { count: ids.length };
  }

  await modifyDb(async (db) => {
    for (const id of ids) {
      const key = String(id);
      const svc = db.services.find((s) => s.id === id);
      const prev = db.serviceOverrides[key] || {};
      const patch: ServiceOverride = { ...prev };

      switch (operation.op) {
        case "enable":
          patch.enabled = true;
          break;
        case "disable":
          patch.enabled = false;
          break;
        case "hide":
          patch.hidden = true;
          break;
        case "unhide":
          patch.hidden = false;
          break;
        case "set_rate":
          patch.rate = operation.rate;
          if (svc) {
            svc.rate = operation.rate;
            svc.syncRate = false;
          }
          break;
        case "multiply_rate": {
          const base = patch.rate ?? svc?.rate ?? 0;
          const next = Math.round(base * operation.factor * 10000) / 10000;
          patch.rate = next;
          if (svc) {
            svc.rate = next;
            svc.syncRate = false;
          }
          break;
        }
        case "set_category":
          patch.category = operation.category;
          if (svc) svc.category = operation.category;
          break;
        case "set_dripfeed":
          patch.dripfeed = operation.dripfeed;
          if (svc) svc.dripfeed = operation.dripfeed;
          break;
        case "set_deny_duplicates":
          patch.denyDuplicates = operation.denyDuplicates;
          break;
        case "replace_name": {
          const current = patch.name ?? svc?.name ?? "";
          const next = current.split(operation.find).join(operation.replace);
          patch.name = next;
          if (svc) svc.name = next;
          break;
        }
        case "set_description":
          patch.description = operation.description;
          if (svc) svc.description = operation.description;
          break;
        default:
          break;
      }

      db.serviceOverrides[key] = patch;
    }
  });
  clearServicesCache();
  return { count: ids.length };
}

export async function deleteServiceLocal(serviceId: number) {
  await servicesBulk([serviceId], { op: "delete" });
}

export async function duplicateService(serviceId: number) {
  return modifyDb(async (db) => {
    const src = db.services.find((s) => s.id === serviceId);
    if (!src) throw new Error("Service not found");
    const maxId = db.services.reduce((m, s) => Math.max(m, s.id), 0);
    const copy: PanelService = {
      ...src,
      id: maxId + 1,
      name: `${src.name} (copy)`,
    };
    db.services.push(copy);
    return copy;
  });
}

export async function listCategories() {
  const db = await ensureDb();
  return [...db.categories];
}

export async function createCategory(name: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Category name is required");
  return modifyDb(async (db) => {
    if (!db.categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      db.categories.push(trimmed);
      db.categories.sort((a, b) => a.localeCompare(b));
    }
    return trimmed;
  });
}

export async function listProviders(): Promise<StoredProvider[]> {
  const db = await ensureDb();
  return db.providers.map((p) => ({ ...p }));
}

export async function getProvider(id: string) {
  const db = await ensureDb();
  return db.providers.find((p) => p.id === id) ?? null;
}

export async function addProvider(input: { url: string; apiKey?: string }) {
  const { resolveProviderApiUrl, providerDisplayName } = await import("@/lib/provider/perfectpanel");
  const apiUrl = resolveProviderApiUrl(input.url);
  const name = providerDisplayName(input.url);
  const now = new Date().toISOString();
  return modifyDb(async (db) => {
    const existing = db.providers.find((p) => p.apiUrl === apiUrl || p.name === name);
    if (existing) {
      if (input.apiKey != null && input.apiKey !== "") existing.apiKey = input.apiKey.trim();
      existing.url = input.url.trim();
      existing.apiUrl = apiUrl;
      existing.updatedAt = now;
      return existing;
    }
    const row: StoredProvider = {
      id: randomBytes(6).toString("hex"),
      name,
      url: input.url.trim(),
      apiUrl,
      apiKey: (input.apiKey || "").trim(),
      alias: "",
      createdAt: now,
      updatedAt: now,
    };
    db.providers.push(row);
    return row;
  });
}

export async function updateProvider(
  id: string,
  patch: Partial<Pick<StoredProvider, "apiKey" | "alias" | "url">>,
) {
  const { resolveProviderApiUrl, providerDisplayName } = await import("@/lib/provider/perfectpanel");
  return modifyDb(async (db) => {
    const row = db.providers.find((p) => p.id === id);
    if (!row) throw new Error("Provider not found");
    if (patch.url != null && patch.url.trim()) {
      row.url = patch.url.trim();
      row.apiUrl = resolveProviderApiUrl(patch.url);
      row.name = providerDisplayName(patch.url);
    }
    if (patch.apiKey != null) row.apiKey = patch.apiKey.trim();
    if (patch.alias != null) row.alias = patch.alias;
    row.updatedAt = new Date().toISOString();
    return row;
  });
}

export async function deleteProvider(id: string) {
  return modifyDb(async (db) => {
    db.providers = db.providers.filter((p) => p.id !== id);
  });
}

export async function createManualService(input: {
  name: string;
  category: string;
  rate: number;
  min: number;
  max: number;
  description?: string;
  type?: PanelService["type"];
  dripfeed?: boolean;
  cancel?: boolean;
}) {
  return modifyDb(async (db) => {
    if (!db.meta.nextLocalServiceId) db.meta.nextLocalServiceId = 900000;
    const id = db.meta.nextLocalServiceId++;
    const category = input.category.trim() || "Other";
    const row: PanelService = {
      id,
      name: input.name.trim(),
      category,
      rate: Number(input.rate) || 0,
      min: Math.max(1, Number(input.min) || 1),
      max: Math.max(1, Number(input.max) || 1),
      type: input.type || "default",
      providerType: input.type || "Default",
      description: (input.description || "").trim(),
      dripfeed: Boolean(input.dripfeed),
      cancel: Boolean(input.cancel),
    };
    db.services.push(row);
    if (!db.categories.some((c) => c.toLowerCase() === category.toLowerCase())) {
      db.categories.push(category);
      db.categories.sort((a, b) => a.localeCompare(b));
    }
    clearServicesCache();
    return row;
  });
}

export async function importSelectedServices(input: {
  providerId: string;
  items: Array<{ providerServiceId: number; category?: string }>;
  copyDescriptions?: boolean;
  markupPercent?: number;
  markupFixed?: number;
  syncRate?: boolean;
}) {
  const { providerServices } = await import("@/lib/provider/perfectpanel");
  const { mapProviderService } = await import("@/lib/provider/sync-services");
  const provider = await getProvider(input.providerId);
  if (!provider) throw new Error("Provider not found");
  if (!provider.apiKey) throw new Error("Provider API key is missing — edit the provider first");

  const raw = await providerServices({ apiUrl: provider.apiUrl, apiKey: provider.apiKey });
  if (!Array.isArray(raw)) throw new Error("Provider services response is not an array");
  const byId = new Map(raw.map((s) => [Number(s.service), s]));
  const markupPercent =
    input.markupPercent != null && Number.isFinite(input.markupPercent)
      ? input.markupPercent
      : Number(process.env.PROVIDER_MARKUP_PERCENT || "40");
  const markupFixed =
    input.markupFixed != null && Number.isFinite(input.markupFixed) ? input.markupFixed : 0;
  const syncRate = input.syncRate !== false;

  return modifyDb(async (db) => {
    let imported = 0;
    for (const item of input.items) {
      const src = byId.get(Number(item.providerServiceId));
      if (!src) continue;
      const mapped = mapProviderService(src, {
        category: item.category,
        providerId: provider.id,
        providerHost: provider.name,
        markupPercent,
        markupFixed,
        syncRate,
      });
      if (input.copyDescriptions === false) mapped.description = "";

      const existing = db.services.find(
        (s) =>
          s.providerServiceId === mapped.providerServiceId &&
          (s.providerId === provider.id || (!s.providerId && s.providerHost === provider.name)),
      );
      if (existing) {
        existing.name = mapped.name;
        existing.min = mapped.min;
        existing.max = mapped.max;
        existing.type = mapped.type;
        existing.providerType = mapped.providerType;
        existing.category = mapped.category;
        existing.refill = mapped.refill;
        existing.cancel = mapped.cancel;
        existing.dripfeed = mapped.dripfeed;
        existing.providerId = provider.id;
        existing.providerHost = provider.name;
        existing.providerCost = mapped.providerCost;
        existing.markupPercent = mapped.markupPercent;
        existing.markupFixed = mapped.markupFixed;
        if (existing.syncRate !== false || syncRate) {
          existing.rate = mapped.rate;
          existing.syncRate = syncRate;
          const ov = db.serviceOverrides[String(existing.id)];
          if (ov?.rate != null) delete ov.rate;
        }
        if (input.copyDescriptions !== false) existing.description = mapped.description;
        const ov = db.serviceOverrides[String(existing.id)];
        if (ov?.deleted) delete ov.deleted;
      } else {
        const maxId = db.services.reduce((m, s) => Math.max(m, s.id), 0);
        const collision = db.services.some((s) => s.id === mapped.id);
        mapped.id = collision ? maxId + 1 : mapped.id;
        db.services.push(mapped);
      }
      if (mapped.category && !db.categories.some((c) => c.toLowerCase() === mapped.category.toLowerCase())) {
        db.categories.push(mapped.category);
      }
      imported += 1;
    }
    db.categories.sort((a, b) => a.localeCompare(b));
    clearServicesCache();
    return { imported };
  });
}

/** Pull live provider prices and refresh sell rates for syncRate services only. */
export async function syncProviderRates() {
  const { providerServices } = await import("@/lib/provider/perfectpanel");
  const { applyMarkup } = await import("@/lib/provider/service-fields");
  const providers = await listProviders();
  const withKey = providers.filter((p) => p.apiKey);
  let updated = 0;
  let checked = 0;
  const errors: string[] = [];

  for (const provider of withKey) {
    let raw: Awaited<ReturnType<typeof providerServices>>;
    try {
      raw = await providerServices({ apiUrl: provider.apiUrl, apiKey: provider.apiKey });
    } catch (e) {
      errors.push(`${provider.name}: ${e instanceof Error ? e.message : "fetch failed"}`);
      continue;
    }
    if (!Array.isArray(raw)) {
      errors.push(`${provider.name}: invalid response`);
      continue;
    }
    const byId = new Map(raw.map((s) => [Number(s.service), s]));

    await modifyDb(async (db) => {
      for (const svc of db.services) {
        if (svc.syncRate === false) continue;
        if (!svc.providerServiceId) continue;
        if (svc.providerId && svc.providerId !== provider.id) continue;
        if (!svc.providerId && svc.providerHost && svc.providerHost !== provider.name) continue;
        if (!svc.providerId && !svc.providerHost) continue;

        const src = byId.get(Number(svc.providerServiceId));
        if (!src) continue;
        checked += 1;
        const cost = Number(src.rate) || 0;
        const pct = svc.markupPercent ?? Number(process.env.PROVIDER_MARKUP_PERCENT || "40");
        const fixed = svc.markupFixed ?? 0;
        const nextRate = applyMarkup(cost, pct, fixed);
        const nextMin = Number(src.min) || svc.min;
        const nextMax = Number(src.max) || svc.max;

        const changed =
          svc.providerCost !== cost ||
          svc.rate !== nextRate ||
          svc.min !== nextMin ||
          svc.max !== nextMax;
        if (!changed) continue;

        svc.providerCost = cost;
        svc.rate = nextRate;
        svc.min = nextMin;
        svc.max = nextMax;
        const ov = db.serviceOverrides[String(svc.id)];
        if (ov?.rate != null) delete ov.rate;
        updated += 1;
      }
    });
  }

  clearServicesCache();
  return { checked, updated, providers: withKey.length, errors };
}

export async function updateTicketAdmin(
  id: string,
  patch: Partial<Pick<StoredTicket, "status" | "assignee" | "unread" | "subject">>,
) {
  return modifyDb(async (db) => {
    const ticket = db.tickets.find((t) => t.id === id);
    if (!ticket) throw new Error("Ticket not found");
    if (patch.status !== undefined) ticket.status = patch.status;
    if (patch.assignee !== undefined) ticket.assignee = patch.assignee;
    if (patch.unread !== undefined) ticket.unread = patch.unread;
    if (patch.subject !== undefined) ticket.subject = patch.subject;
    ticket.updatedAt = new Date().toISOString();
    return ticket;
  });
}

export async function getDbSnapshot() {
  const db = await ensureDb();
  return {
    users: db.users,
    orders: db.orders,
    funds: db.funds,
    services: db.services,
    tickets: db.tickets,
    affiliates: db.affiliates,
    childPanels: db.childPanels,
    providers: db.providers,
    categories: db.categories,
    settings: db.settings,
    appearance: db.appearance,
    serviceOverrides: db.serviceOverrides,
    meta: db.meta,
  };
}
