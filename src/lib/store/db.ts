import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { type PanelService } from "@/lib/data/catalog";
import { isProviderConfigured } from "@/lib/provider/perfectpanel";
import { fetchMappedProviderServices } from "@/lib/provider/sync-services";

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

type DbShape = {
  users: StoredUser[];
  orders: StoredOrder[];
  funds: FundRequest[];
  services: PanelService[];
};

/** Vercel/Lambda: cwd is read-only — use /tmp. Local: project .data */
function resolvePaths() {
  const serverless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const dataDir = serverless
    ? path.join(os.tmpdir(), "ssmmpanel-data")
    : path.join(process.cwd(), ".data");
  return { dataDir, dbFile: path.join(dataDir, "db.json") };
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

/** Keep admin username/password aligned with env (needed on Vercel). */
async function syncAdminFromEnv(db: DbShape): Promise<DbShape> {
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

  memoryDb = db;
  if (changed) await save(db);
  return db;
}

function emptyDb(): DbShape {
  return {
    users: [makeAdminUser(new Date().toISOString())],
    orders: [],
    funds: [],
    services: [],
  };
}

async function ensureDb(): Promise<DbShape> {
  if (memoryDb) return syncAdminFromEnv(memoryDb);

  const { dataDir, dbFile } = resolvePaths();
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const raw = await fs.readFile(dbFile, "utf8");
    const db = JSON.parse(raw) as DbShape;
    memoryDb = db;
    return syncAdminFromEnv(db);
  } catch {
    const db = emptyDb();
    memoryDb = db;
    await save(db);
    return db;
  }
}

async function save(db: DbShape) {
  memoryDb = db;
  const { dataDir, dbFile } = resolvePaths();
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dbFile, JSON.stringify(db, null, 2), "utf8");
  } catch {
    // Serverless FS can fail; memory still serves the current instance.
  }
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
  const db = await ensureDb();
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
  await save(db);
  return user;
}

export async function touchAuth(userId: string) {
  const db = await ensureDb();
  const u = db.users.find((x) => x.id === userId);
  if (!u) return;
  u.lastAuthAt = new Date().toISOString();
  await save(db);
}

export async function adjustBalance(userId: string, delta: number, spentDelta = 0) {
  const db = await ensureDb();
  const u = db.users.find((x) => x.id === userId);
  if (!u) throw new Error("User not found");
  const next = Math.round((u.balance + delta) * 10000) / 10000;
  if (next < -0.00001) throw new Error("Insufficient balance");
  u.balance = Math.max(0, next);
  u.spent = Math.round((u.spent + spentDelta) * 10000) / 10000;
  await save(db);
  return u;
}

export async function setUserBalance(userId: string, balance: number) {
  const db = await ensureDb();
  const u = db.users.find((x) => x.id === userId);
  if (!u) throw new Error("User not found");
  u.balance = Math.round(balance * 10000) / 10000;
  await save(db);
  return u;
}

export async function listServices() {
  if (isProviderConfigured()) {
    if (servicesCache && Date.now() - servicesCache.at < SERVICES_TTL_MS) {
      return servicesCache.items;
    }
    try {
      const items = await fetchMappedProviderServices();
      servicesCache = { at: Date.now(), items };
      const db = await ensureDb();
      db.services = items;
      await save(db);
      return items;
    } catch {
      // fall back to last stored catalog
    }
  }
  return (await ensureDb()).services;
}

export async function replaceServices(services: PanelService[]) {
  const db = await ensureDb();
  db.services = services;
  servicesCache = { at: Date.now(), items: services };
  await save(db);
}

export function clearServicesCache() {
  servicesCache = null;
}

export async function createOrder(order: Omit<StoredOrder, "id" | "createdAt" | "updatedAt">) {
  const db = await ensureDb();
  const now = new Date().toISOString();
  const row: StoredOrder = {
    ...order,
    id: randomBytes(6).toString("hex"),
    createdAt: now,
    updatedAt: now,
  };
  db.orders.unshift(row);
  await save(db);
  return row;
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
  const db = await ensureDb();
  const o = db.orders.find((x) => x.id === id);
  if (!o) return null;
  Object.assign(o, patch, { updatedAt: new Date().toISOString() });
  await save(db);
  return o;
}

export async function createFundRequest(input: Omit<FundRequest, "id" | "createdAt" | "status">) {
  const db = await ensureDb();
  const row: FundRequest = {
    ...input,
    id: randomBytes(6).toString("hex"),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  db.funds.unshift(row);
  await save(db);
  return row;
}

export async function listFunds() {
  return (await ensureDb()).funds;
}

export async function approveFund(id: string) {
  const db = await ensureDb();
  const f = db.funds.find((x) => x.id === id);
  if (!f || f.status !== "pending") throw new Error("Invalid fund request");
  f.status = "approved";
  const u = db.users.find((x) => x.id === f.userId);
  if (!u) throw new Error("User missing");
  u.balance = Math.round((u.balance + f.amount) * 10000) / 10000;
  await save(db);
  return f;
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
