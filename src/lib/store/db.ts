import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { SEED_SERVICES, type PanelService } from "@/lib/data/catalog";

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

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

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

async function ensureDb(): Promise<DbShape> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(raw) as DbShape;
  } catch {
    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";
    const now = new Date().toISOString();
    const db: DbShape = {
      users: [
        {
          id: "admin-1",
          username: adminUser,
          email: "admin@ssmmpanel.com",
          passwordHash: hashPassword(adminPass),
          role: "admin",
          balance: 0,
          spent: 0,
          status: "active",
          apiKey: newApiKey(),
          createdAt: now,
          lastAuthAt: now,
          discountPercent: 0,
        },
      ],
      orders: [],
      funds: [],
      services: SEED_SERVICES,
    };
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
    return db;
  }
}

async function save(db: DbShape) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
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
  return (await ensureDb()).services;
}

export async function replaceServices(services: PanelService[]) {
  const db = await ensureDb();
  db.services = services;
  await save(db);
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
