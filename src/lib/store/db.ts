import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { type PanelService } from "@/lib/data/catalog";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { fetchMappedProviderServices } from "@/lib/provider/sync-services";

const BLOB_DB_PATH = "ssmm/db.json";

export type StoredUser = {
  id: string;
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
};

export type StoredOrder = {
  id: string;
  userId: string;
  serviceId: number;
  serviceName: string;
  link: string;
  quantity: number;
  charge: number;
  status: "pending" | "processing" | "completed" | "partial" | "canceled" | "refunded";
  providerOrderId?: string;
  createdAt: string;
  updatedAt: string;
  remains?: number;
  startCount?: number;
};

export type FundRequest = {
  id: string;
  userId: string;
  username: string;
  method: string;
  amount: number;
  note: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
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
  userId: string;
  username: string;
  subject: string;
  status: "open" | "answered" | "closed";
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

type DbShape = {
  users: StoredUser[];
  orders: StoredOrder[];
  funds: FundRequest[];
  services: PanelService[];
  tickets: StoredTicket[];
  ledger: LedgerEntry[];
  refills: StoredRefill[];
};

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

export async function createUser(input: {
  username: string;
  email: string;
  password: string;
}): Promise<StoredUser> {
  return modifyDb(async (db) => {
    if (db.users.some((u) => u.username.toLowerCase() === input.username.toLowerCase())) {
      throw new Error("Username taken");
    }
    const now = new Date().toISOString();
    const user: StoredUser = {
      id: randomBytes(8).toString("hex"),
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
    };
    db.users.push(user);
    return user;
  });
}

export async function touchAuth(userId: string) {
  await modifyDb(async (db) => {
    const u = db.users.find((x) => x.id === userId);
    if (!u) return;
    u.lastAuthAt = new Date().toISOString();
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

export async function listServices() {
  if (isProviderConfigured()) {
    if (servicesCache && Date.now() - servicesCache.at < SERVICES_TTL_MS) {
      return servicesCache.items;
    }
    try {
      const items = await fetchMappedProviderServices();
      servicesCache = { at: Date.now(), items };
      await modifyDb(async (db) => {
        db.services = items;
      });
      return items;
    } catch {
      // fall back to last stored catalog
    }
  }
  return (await ensureDb()).services;
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
    const row: StoredOrder = {
      ...order,
      id: randomBytes(6).toString("hex"),
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

export async function createFundRequest(input: Omit<FundRequest, "id" | "createdAt" | "status">) {
  return modifyDb(async (db) => {
    const row: FundRequest = {
      ...input,
      id: randomBytes(6).toString("hex"),
      status: "pending",
      createdAt: new Date().toISOString(),
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
    f.status = "approved";
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
      userId: input.userId,
      username: input.username,
      subject: input.subject.trim(),
      status: "open",
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
    const now = new Date().toISOString();
    ticket.messages.push({
      id: randomBytes(4).toString("hex"),
      authorId: input.authorId,
      authorRole: input.authorRole,
      body: input.body.trim(),
      createdAt: now,
    });
    ticket.status = input.authorRole === "admin" ? "answered" : "open";
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
