import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { LIMITS, parseEntries, settle, winners, type Entries } from "./ledger";
import { StoreError, toPairs, type Command, type Store } from "./store";

/*
 * The sync API: pairing codes, devices, and one sync call. Every endpoint is a POST with a JSON body, reached through
 * a guide's own /api (a rewrite to this project), so calls are same-origin and the cookies are set by the page's host.
 * Handlers take a Web Request and give a Response, and everything outside them (store, clock, salt) is passed in.
 */

export interface Deps {
  store: Store;
  now: () => number;
  /** Secret salt for the IP hashes behind the rate limits. */
  salt: string;
  /** The counting budgets (a month's, in a namespace) this instance has seen spent, so it refuses later calls without the store. */
  spent?: Set<string>;
}

/** The brand.id of every guide. A test holds this list to the apps' own brands. */
export const GUIDES = ["binding-of-isaac", "dark-souls-remastered", "echoes-of-wisdom", "hollow-knight", "links-awakening", "red-dead-redemption", "silksong"];

const PROTOCOL = 1;
const DAY = 86_400;
const CODE_SECONDS = 600;
const PENDING_SECONDS = 900;
/** Nothing is kept past 400 days without a sync (Chrome's own cap on a cookie's life). */
const KEEP_SECONDS = 400 * DAY;
const KEEP_TEST_SECONDS = 7 * DAY;
const MAX_BODY = 256 * 1024;
/** Devices in one group. A device not seen for 60 days is taken out of it by itself, the next time its group is looked at. */
const MAX_DEVICES = 12;
const STALE_MS = 60 * 86_400_000;
/** Syncs a minute from one device: a runaway client or a stolen cookie gets a trickle. It does not guard the store's quota. */
const SYNCS_PER_MINUTE = 120;
const SEEN_EVERY = 60_000;

/*
 * The visit counts (/api/count): a guide's totals for the day, one hash per guide and day, and nothing about who sent them. They share the
 * store's monthly commands with sync, which must never run short for them, so counting has a budget of its own each month and stops at it.
 */
export const COUNT_BUDGET: Record<Ns, number> = { prod: 100_000, test: 10_000 };
/** 25 months, the longest the CNIL lets audience measurement keep what it collects. */
const KEEP_COUNTS_SECONDS = 761 * DAY;
const MAX_COUNT_FIELDS = 12;
const MAX_COUNT = 50;
/** What a guide may count: a visit by where it runs, a page shown (a chapter by its number), a chapter started or finished. */
const COUNT_FIELD = /^(?:v:(?:app|tab)|p:(?:guide\/[1-9]\d{0,2}|checklist|dashboard|questlines|sources)|[sf]:[1-9]\d{0,2})$/;

const DEVICE_COOKIE = "hundo_sync";
const LINK_COOKIE = "hundo_link";

type Ns = "prod" | "test";

interface Where {
  ns: Ns;
  /** Set on hundo.quest guides so one link covers every guide; previews and localhost keep host-only cookies. */
  domain?: string;
  secure: boolean;
  /** The landing page, https://hundo.quest itself, which may only read the group's summaries (HOME_ROUTES). */
  home?: boolean;
}

interface Me {
  id: string;
  secret: string;
  /** "" while the device waits as the one showing a code. */
  group: string;
  label: string;
}

interface Ctx {
  deps: Deps;
  where: Where;
  request: Request;
  body: Record<string, unknown>;
  cookies: Map<string, string>;
  now: number;
}

const ttl = (ns: Ns) => (ns === "test" ? KEEP_TEST_SECONDS : KEEP_SECONDS);
const key = (ns: Ns, ...parts: string[]) => ["hs", ns, ...parts].join(":");

/**
 * The team's preview hosts by their name: a deployment (`hundo-koholint-2b16reepd-jellycat.vercel.app`) or a branch
 * (`hundo-koholint-git-<branch>-jellycat.vercel.app`). It's a shape, not proof of ownership: another account could name a project to fit
 * (whether Vercel reserves it isn't known), and what that page could do is use its own cookies in the test namespace.
 */
const PREVIEW_HOST = /^hundo-[a-z0-9-]+-jellycat\.vercel\.app$/;

/**
 * Which page is calling, and so which part of the store it may touch, from the `Origin` alone: only a guide's own hosts, the landing page
 * (for what it reads, HOME_ROUTES), the team's previews and localhost are served. The page's host can't be checked against Origin: behind a guide's /api rewrite Vercel hands this
 * API its own host in Host, and no x-forwarded-host that names the guide's (seen on the first preview, against what Vercel's docs say).
 * Origin is set by the browser and no page script can change it. A script on another site is refused for its Origin, and couldn't
 * read an answer anyway: this API never sends Access-Control-Allow-Origin, nor answers a preflight. A form or text/plain post, which
 * needs no preflight, is refused for its content type wherever it comes from.
 */
function whereFrom(request: Request): Where | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return null;
  }
  const secure = url.protocol === "https:" && url.port === "";
  if (secure && /^(?!api\.)[a-z0-9-]+\.hundo\.quest$/.test(url.hostname)) return { ns: "prod", domain: "hundo.quest", secure: true };
  if (secure && url.hostname === "hundo.quest") return { ns: "prod", domain: "hundo.quest", secure: true, home: true };
  if (secure && PREVIEW_HOST.test(url.hostname)) return { ns: "test", secure: true };
  if (["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) return { ns: "test", secure: url.protocol === "https:" };
  return null;
}

function parseCookies(header: string | null): Map<string, string> {
  const out = new Map<string, string>();
  for (const part of (header ?? "").split(";")) {
    const at = part.indexOf("=");
    if (at > 0) out.set(part.slice(0, at).trim(), part.slice(at + 1).trim());
  }
  return out;
}

function cookie(where: Where, name: string, value: string, o: { maxAge: number; path: string; httpOnly?: boolean }) {
  return [`${name}=${value}`, `Max-Age=${o.maxAge}`, `Path=${o.path}`, where.domain && `Domain=${where.domain}`, where.secure && "Secure", o.httpOnly && "HttpOnly", "SameSite=Lax"]
    .filter(Boolean)
    .join("; ");
}

const fingerprint = (group: string) => createHash("sha256").update(group).digest("base64url").slice(0, 10);

/** The device cookie (secret, HttpOnly, only sent to /api) and the hint a guide reads without a request (no secret). */
const sessionCookies = (ctx: Ctx, token: string, group: string) => [
  cookie(ctx.where, DEVICE_COOKIE, token, { maxAge: ttl(ctx.where.ns), path: "/api", httpOnly: true }),
  cookie(ctx.where, LINK_COOKIE, fingerprint(group), { maxAge: ttl(ctx.where.ns), path: "/" }),
];

const clearCookies = (ctx: Ctx) => [
  cookie(ctx.where, DEVICE_COOKIE, "", { maxAge: 0, path: "/api", httpOnly: true }),
  cookie(ctx.where, LINK_COOKIE, "", { maxAge: 0, path: "/" }),
];

function reply(status: number, body: unknown, cookies: string[] = [], headers: Record<string, string> = {}) {
  const response = new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers },
  });
  for (const value of cookies) response.headers.append("Set-Cookie", value);
  return response;
}

const unlinked = (ctx: Ctx) => reply(401, { error: "unlinked" }, clearCookies(ctx));
const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");
/** A device's name as the user agent gave it: no control characters (the store keeps a tab between fields), at most 40. */
const cleanLabel = (value: unknown) => {
  const text = typeof value === "string" ? [...value].filter((char) => char.charCodeAt(0) > 31 && char.charCodeAt(0) !== 127).join("").trim().slice(0, 40) : "";
  return text || "Unknown device";
};
const exec = (ctx: Ctx, commands: Command[]) => ctx.deps.store.exec(commands);

const dvKey = (ctx: Ctx, id: string) => key(ctx.where.ns, "dv", id);
const gdKey = (ctx: Ctx, group: string) => key(ctx.where.ns, "gd", group);
const pKey = (ctx: Ctx, group: string, guide: string) => key(ctx.where.ns, "p", group, guide);
/** A guide's revision in a group: a counter that goes up whenever its data is written, so a poll can ask "has anything changed" in one read. */
const rvKey = (ctx: Ctx, group: string, guide: string) => key(ctx.where.ns, "rv", group, guide);
/** A guide's summary in a group, as its last call to /api/summary from a device of the group gave it, for hundo.quest to read (/api/summaries). */
const smKey = (ctx: Ctx, group: string, guide: string) => key(ctx.where.ns, "sm", group, guide);
/** Everything a group keeps about its guides, which goes with the group. */
const guideKeys = (ctx: Ctx, group: string) => GUIDES.flatMap((guide) => [pKey(ctx, group, guide), rvKey(ctx, group, guide), smKey(ctx, group, guide)]);

/** The device behind this request's cookie, or null when there is none or it was unlinked. */
async function identify(ctx: Ctx): Promise<Me | null> {
  const token = /^([A-Za-z0-9_-]{16})\.([A-Za-z0-9_-]{22})$/.exec(ctx.cookies.get(DEVICE_COOKIE) ?? "");
  if (!token) return null;
  const [id, secret] = [token[1], token[2]];
  const [row] = await exec(ctx, [["HMGET", dvKey(ctx, id), "g", "h", "label"]]);
  const [group, hash, label] = row as (string | null)[];
  if (hash === null) return null;
  const stored = Buffer.from(hash, "hex");
  const given = Buffer.from(sha256(secret), "hex");
  if (stored.length !== given.length || !timingSafeEqual(stored, given)) return null;
  return { id, secret, group: group ?? "", label: label ?? "" };
}

const tokenOf = (me: Me) => `${me.id}.${me.secret}`;

/** A fixed window counter: false once `subject` has made more than `max` calls in `seconds`. */
async function allow(ctx: Ctx, name: string, subject: string, max: number, seconds: number): Promise<boolean> {
  const counter = key(ctx.where.ns, "rl", name, subject, String(Math.floor(ctx.now / (seconds * 1000))));
  // One batch, so a counter can't be left without an expiry: it is gone when its window is.
  const [count] = await exec(ctx, [["INCR", counter], ["EXPIRE", counter, seconds, "NX"]]);
  return Number(count) <= max;
}

/** An address as the limits count it: IPv4 as is, an IPv6 visitor by its /64, since it can change the low half at will. */
export function visitorOf(raw: string): string {
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(raw);
  if (mapped) return mapped[1];
  if (!raw.includes(":")) return raw;
  const [head, tail] = raw.split("::");
  const front = head ? head.split(":") : [];
  const back = tail ? tail.split(":") : [];
  const groups = raw.includes("::") ? [...front, ...Array(Math.max(0, 8 - front.length - back.length)).fill("0"), ...back] : front;
  return groups.slice(0, 4).map((group) => group.toLowerCase().padStart(4, "0")).join(":");
}

function ipHash(ctx: Ctx): string {
  const headers = ctx.request.headers;
  const raw = (headers.get("x-real-ip") ?? headers.get("x-forwarded-for")?.split(",")[0] ?? "").trim();
  return createHash("sha256").update(`${ctx.deps.salt}|${visitorOf(raw)}`).digest("hex").slice(0, 16);
}

/** A new device, linked to `group` or, with "", waiting to be linked by a code (kept 15 minutes). */
async function createDevice(ctx: Ctx, group: string, label: string): Promise<Me> {
  const id = randomBytes(12).toString("base64url");
  const secret = randomBytes(16).toString("base64url");
  const keep = group ? ttl(ctx.where.ns) : PENDING_SECONDS;
  const commands: Command[] = [
    ["HSET", dvKey(ctx, id), "h", sha256(secret), "g", group, "label", label],
    ["EXPIRE", dvKey(ctx, id), keep],
  ];
  if (group) commands.push(["HSET", gdKey(ctx, group), id, `${label}\t${ctx.now}`], ["EXPIRE", gdKey(ctx, group), ttl(ctx.where.ns)]);
  await exec(ctx, commands);
  return { id, secret, group, label };
}

/** Put an existing device in `group`, taking it out of the one it was in, which is deleted when it ends up empty. */
async function attach(ctx: Ctx, id: string, group: string, label: string, from = "") {
  const keep = ttl(ctx.where.ns);
  const commands: Command[] = [
    ["HSET", dvKey(ctx, id), "g", group],
    ["EXPIRE", dvKey(ctx, id), keep],
    ["HSET", gdKey(ctx, group), id, `${label}\t${ctx.now}`],
    ["EXPIRE", gdKey(ctx, group), keep],
  ];
  if (from && from !== group) commands.push(["HDEL", gdKey(ctx, from), id]);
  await exec(ctx, commands);
  if (from && from !== group) await dropIfEmpty(ctx, from);
}

/** A group's devices as the store holds them, apart into those seen within 60 days and those not. */
function devicesOf(flat: unknown, now: number, caller = "") {
  const all = toPairs(flat).map(([id, value]) => {
    const [label, seen] = value.split("\t");
    return { id, label, seen: Number(seen) };
  });
  // The device making this call is here, whatever its record says: a long-quiet device that comes back is heard before it is judged.
  const quiet = (device: { id: string; seen: number }) => device.id !== caller && now - device.seen > STALE_MS;
  return { all, live: all.filter((device) => !quiet(device)), stale: all.filter(quiet) };
}

/** Take devices quiet for 60 days out of the group for good, their records too: a lost phone doesn't come back on its own, and has to be linked again. */
async function dropStale(ctx: Ctx, group: string, stale: { id: string }[]) {
  if (stale.length === 0) return;
  await exec(ctx, [["DEL", ...stale.map((device) => dvKey(ctx, device.id))], ["HDEL", gdKey(ctx, group), ...stale.map((device) => device.id)]]);
}

/** Whether a group has room for a device. A device that went quiet for 60 days, a browser cleared and never unlinked, is dropped first. */
async function hasRoom(ctx: Ctx, group: string): Promise<boolean> {
  const [flat] = await exec(ctx, [["HGETALL", gdKey(ctx, group)]]);
  const { live, stale } = devicesOf(flat, ctx.now);
  await dropStale(ctx, group, stale);
  return live.length < MAX_DEVICES;
}

async function dropIfEmpty(ctx: Ctx, group: string) {
  const [count] = await exec(ctx, [["HLEN", gdKey(ctx, group)]]);
  if (count === 0) await exec(ctx, [["DEL", gdKey(ctx, group), ...guideKeys(ctx, group)]]);
}

async function pairStart(ctx: Ctx) {
  if (!(await allow(ctx, "start", ipHash(ctx), 10, 3600))) return reply(429, { error: "limit" });
  let me = await identify(ctx);
  const cookies: string[] = [];
  if (!me) {
    me = await createDevice(ctx, "", cleanLabel(ctx.body.label));
    // Not the hint cookie yet: other tabs would try to sync before there is a group.
    cookies.push(cookie(ctx.where, DEVICE_COOKIE, tokenOf(me), { maxAge: PENDING_SECONDS, path: "/api", httpOnly: true }));
  } else if (!me.group) {
    await exec(ctx, [["EXPIRE", dvKey(ctx, me.id), PENDING_SECONDS]]);
    // The cookie's own clock runs on too: left alone it dies 15 minutes after the first code, with the device still waiting.
    cookies.push(cookie(ctx.where, DEVICE_COOKIE, tokenOf(me), { maxAge: PENDING_SECONDS, path: "/api", httpOnly: true }));
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const [set] = await exec(ctx, [["SET", key(ctx.where.ns, "pc", code), me.id, "NX", "EX", CODE_SECONDS]]);
    if (set === "OK") return reply(200, { code, expiresAt: ctx.now + CODE_SECONDS * 1000, linked: me.group !== "" }, cookies);
  }
  return reply(503, { error: "busy" });
}

async function pairClaim(ctx: Ctx) {
  const ns = ctx.where.ns;
  // Six digits is a small space, so wrong guesses are counted per visitor and across everyone.
  const failures = key(ns, "rl", "claimfail", String(Math.floor(ctx.now / 600_000)));
  const [failed] = await exec(ctx, [["GET", failures]]);
  if (Number(failed ?? 0) >= 300) return reply(429, { error: "limit" });
  if (!(await allow(ctx, "claim", ipHash(ctx), 10, 900))) return reply(429, { error: "limit" });
  const wrong = async () => {
    await exec(ctx, [["INCR", failures], ["EXPIRE", failures, 600, "NX"]]);
    // A wrong code, an expired one and a used one all look the same.
    return reply(400, { error: "code" });
  };

  const code = typeof ctx.body.code === "string" ? ctx.body.code.replace(/\D/g, "") : "";
  if (code.length !== 6) return wrong();
  const [showerId] = await exec(ctx, [["GETDEL", key(ns, "pc", code)]]);
  if (typeof showerId !== "string") return wrong();
  const [row] = await exec(ctx, [["HMGET", dvKey(ctx, showerId), "g", "label"]]);
  const [showerGroup, showerLabel] = row as (string | null)[];
  if (showerGroup === null && showerLabel === null) return wrong();

  const me = await identify(ctx);
  if (me?.id === showerId) return wrong();
  const label = cleanLabel(ctx.body.label);
  const shower = showerLabel || "Unknown device";
  const outcome: { already?: boolean; moved?: boolean } = {};
  const full = () => reply(409, { error: "devices" });
  let group: string;
  let token: string;
  if (showerGroup) {
    // The device showing the code is linked: the one typing joins its group.
    group = showerGroup;
    if (me?.group === group) {
      token = tokenOf(me);
      outcome.already = true;
    } else {
      if (!(await hasRoom(ctx, group))) return full();
      if (!me) token = tokenOf(await createDevice(ctx, group, label));
      else {
        await attach(ctx, me.id, group, label, me.group);
        token = tokenOf(me);
        outcome.moved = me.group !== "";
      }
    }
  } else if (me?.group) {
    // The device showing the code has no group yet and the one typing has: the first joins the second.
    group = me.group;
    if (!(await hasRoom(ctx, group))) return full();
    await attach(ctx, showerId, group, shower);
    token = tokenOf(me);
  } else {
    // Neither is linked: a new group for both.
    group = randomBytes(16).toString("base64url");
    await attach(ctx, showerId, group, shower);
    if (me) {
      await attach(ctx, me.id, group, label);
      token = tokenOf(me);
    } else token = tokenOf(await createDevice(ctx, group, label));
  }
  // A new link is counted for the guide it was made in (a client that sends no guide isn't), and a count that fails never fails the link.
  if (!outcome.already && typeof ctx.body.guide === "string" && GUIDES.includes(ctx.body.guide)) await tally(ctx, ctx.body.guide, [["pair", 1]]).catch(() => false);
  return reply(200, { linked: true, ...outcome }, sessionCookies(ctx, token, group));
}

async function status(ctx: Ctx) {
  const me = await identify(ctx);
  if (!me) return unlinked(ctx);
  if (!me.group) return reply(200, { linked: false, pending: true });
  const [flat] = await exec(ctx, [["HGETALL", gdKey(ctx, me.group)]]);
  // The id is what another device names to remove this one: half of what would open it (the secret is the other), so it opens nothing.
  const { live, stale } = devicesOf(flat, ctx.now, me.id);
  await dropStale(ctx, me.group, stale);
  const devices = live.map(({ id, label, seen }) => ({ id, label, seen, self: id === me.id }));
  // Also how a device that was showing a code learns its code was used: its next poll carries the new cookies.
  return reply(200, { linked: true, devices, now: ctx.now }, sessionCookies(ctx, tokenOf(me), me.group));
}

async function sync(ctx: Ctx) {
  const guide = ctx.body.guide;
  if (typeof guide !== "string" || !GUIDES.includes(guide)) return reply(400, { error: "guide" });
  const entries: Entries | null = ctx.body.entries === undefined ? {} : parseEntries(ctx.body.entries);
  if (!entries) return reply(400, { error: "entries" });
  if (Object.values(entries).some(([at]) => at > ctx.now + LIMITS.future)) return reply(400, { error: "clock", now: ctx.now });

  const me = await identify(ctx);
  if (!me?.group) return unlinked(ctx);
  const set = pKey(ctx, me.group, guide);
  const devicesKey = gdKey(ctx, me.group);
  const rv = rvKey(ctx, me.group, guide);
  const visits = key(ctx.where.ns, "rl", "sync", me.id, String(Math.floor(ctx.now / 60_000)));

  // A poll: a device with nothing to send that says which revision of this guide's data it has. If that is still the revision, nothing
  // else is read, written or refreshed, and the answer costs two store commands (the device's record, and the revision). It isn't counted
  // against the per-device limit: that counter is only checked after the data is read, so it never saved the store a command (a refused call
  // costs six), and the firewall's rate limit is what holds a flood. A device asking for a touch (its daily expiry refresh) always takes the
  // full path below.
  const known = typeof ctx.body.rev === "number" && Number.isSafeInteger(ctx.body.rev) && ctx.body.rev >= 0 ? ctx.body.rev : null;
  let before: number | null = null;
  if (known !== null && Object.keys(entries).length === 0 && ctx.body.touch !== true) {
    const [stamp] = await exec(ctx, [["GET", rv]]);
    before = Number(stamp ?? 0);
    if (before === known) return reply(200, { p: PROTOCOL, unchanged: true, rev: before, now: ctx.now });
  }

  // The revision is read before the data, never after: a write that lands in between leaves this answer's data newer than its revision,
  // and the device then asks once more for nothing, where the other way round it would never hear of what it missed.
  const first: Command[] = [["INCR", visits], ["EXPIRE", visits, 60, "NX"]];
  if (before === null) first.push(["GET", rv]);
  first.push(["ZRANGE", set, 0, -1], ["HGETALL", devicesKey]);
  const read = await exec(ctx, first);
  const [count] = read;
  const [stored, flat] = read.slice(before === null ? 3 : 2);
  if (before === null) before = Number(read[2] ?? 0);
  if (Number(count) > SYNCS_PER_MINUTE) return reply(429, { error: "limit" });

  // Settle what the device sent against what is stored: the winners go back, only winning changes are added, and the
  // members that lost are removed, so a guide's data stays about as big as its keys however often they change.
  const members = (stored as unknown[]).map(String);
  const { entries: state, add, drop } = settle(members, entries);
  const names = Object.keys(state);
  const over = names.length > LIMITS.keys || names.filter((name) => name.startsWith("x:")).length > LIMITS.leaves;
  if (over) {
    // Two devices that each stayed under a cap can together pass it. Only a push that adds keys is refused then, and what
    // lost is still cleared, so the data can't get stuck: pulls and changes to keys it already has go on working.
    const held = winners(members);
    if (Object.keys(entries).some((name) => !(name in held))) {
      const { drop: tidy } = settle(members, {});
      if (tidy.length > 0) await exec(ctx, [["ZREM", set, ...tidy]]);
      return reply(413, { error: "full" });
    }
  }

  const keep = ttl(ctx.where.ns);
  const touch = ctx.body.touch === true;
  const { all, live, stale } = devicesOf(flat, ctx.now, me.id);
  const mine = all.find((device) => device.id === me.id);
  const commands: Command[] = [];
  if (stale.length > 0) commands.push(["DEL", ...stale.map((device) => dvKey(ctx, device.id))], ["HDEL", devicesKey, ...stale.map((device) => device.id)]);
  // Always an expiry with the data, so a push that lands after a "forget" leaves nothing that lasts.
  if (add.length > 0) commands.push(["ZADD", set, ...add.flatMap(([at, member]) => [at, member])], ["EXPIRE", set, keep]);
  if (drop.length > 0) commands.push(["ZREM", set, ...drop]);
  if (!mine || ctx.now - mine.seen > SEEN_EVERY) commands.push(["HSET", devicesKey, me.id, `${me.label}\t${ctx.now}`], ["EXPIRE", devicesKey, keep]);
  if (touch) commands.push(["EXPIRE", dvKey(ctx, me.id), keep], ["EXPIRE", devicesKey, keep], ["EXPIRE", set, keep], ["EXPIRE", rv, keep]);
  // The revision goes up last: nobody who sees the new number can find the data not yet written.
  const bumpAt = add.length > 0 || drop.length > 0 ? commands.length : -1;
  if (bumpAt >= 0) commands.push(["INCR", rv], ["EXPIRE", rv, keep]);
  const written = commands.length > 0 ? await exec(ctx, commands) : [];

  // What this answer is a revision of: the one read before the data, or, when this call's own write is the only one that has landed
  // since (the counter is exactly one higher), the number it made. Anything else, and another device wrote in between: say the old
  // one, so the next poll finds the change.
  const after = bumpAt >= 0 ? Number(written[bumpAt]) : before;
  const rev = after === before + 1 ? after : before;

  const total = live.some((device) => device.id === me.id) ? live.length : live.length + 1;
  return reply(200, { p: PROTOCOL, entries: state, devices: total, now: ctx.now, rev }, touch ? sessionCookies(ctx, tokenOf(me), me.group) : []);
}

async function unlink(ctx: Ctx) {
  const me = await identify(ctx);
  if (me) {
    const commands: Command[] = [["DEL", dvKey(ctx, me.id)]];
    if (me.group) commands.push(["HDEL", gdKey(ctx, me.group), me.id]);
    await exec(ctx, commands);
    if (me.group) await dropIfEmpty(ctx, me.group);
  }
  // Also when the cookie is stale: the point is that this browser stops syncing.
  return reply(200, { ok: true }, clearCookies(ctx));
}

/** Take another device out of this device's group, as that device could itself: its next call finds it unlinked, and its own progress is its own. */
async function remove(ctx: Ctx) {
  const id = ctx.body.id;
  if (typeof id !== "string" || !/^[A-Za-z0-9_-]{16}$/.test(id)) return reply(400, { error: "device" });
  const me = await identify(ctx);
  if (!me?.group) return unlinked(ctx);
  // A device takes itself out by unlinking, which also clears its cookies.
  if (id === me.id) return reply(400, { error: "self" });
  // Only a device of this group, by its own record: one that was never in it, or has moved to another, isn't here to remove. A row in the
  // list whose record is gone (a device removed in the middle of its own sync writes itself back) is tidied away.
  const [group, listed] = await exec(ctx, [["HGET", dvKey(ctx, id), "g"], ["HGET", gdKey(ctx, me.group), id]]);
  if (group !== me.group && !(group === null && listed !== null)) return reply(400, { error: "device" });
  await exec(ctx, [["DEL", dvKey(ctx, id)], ["HDEL", gdKey(ctx, me.group), id]]);
  return reply(200, { ok: true });
}

async function forget(ctx: Ctx) {
  const me = await identify(ctx);
  if (!me?.group) return unlinked(ctx);
  const [flat] = await exec(ctx, [["HGETALL", gdKey(ctx, me.group)]]);
  const ids = new Set([me.id, ...toPairs(flat).map(([id]) => id)]);
  await exec(ctx, [["DEL", ...[...ids].map((id) => dvKey(ctx, id)), gdKey(ctx, me.group), ...guideKeys(ctx, me.group)]]);
  return reply(200, { ok: true }, clearCookies(ctx));
}

/**
 * Add counts to a guide's totals for the day (`st:<guide>:<yyyy-mm-dd>`, UTC), unless this month's budget is spent. The budget is charged
 * first, with what the write will cost, so a month's counting never takes more than its budget plus one command for each refused call.
 * Whether it counted.
 */
async function tally(ctx: Ctx, guide: string, fields: [string, number][]): Promise<boolean> {
  const ns = ctx.where.ns;
  const day = new Date(ctx.now).toISOString().slice(0, 10);
  const budget = key(ns, "st", "budget", day.slice(0, 7));
  // An instance that has seen this month's budget spent refuses without asking the store again: a refused call then costs nothing.
  if (ctx.deps.spent?.has(budget)) return false;
  const totals = key(ns, "st", guide, day);
  const cost = fields.length + 2;
  const [spent] = await exec(ctx, [["INCRBY", budget, cost]]);
  if (Number(spent) > COUNT_BUDGET[ns]) {
    ctx.deps.spent?.add(budget);
    return false;
  }
  const commands: Command[] = fields.map(([field, by]) => ["HINCRBY", totals, field, by]);
  commands.push(["EXPIRE", totals, ns === "test" ? KEEP_TEST_SECONDS : KEEP_COUNTS_SECONDS, "NX"]);
  // The month's first call starts its budget's clock; later ones don't pay for it.
  if (Number(spent) === cost) commands.push(["EXPIRE", budget, 40 * DAY, "NX"]);
  await exec(ctx, commands);
  return true;
}

/**
 * A visit's counts from a guide. Nothing here reads a cookie or the address: the guide sends this without its cookies, and what is
 * stored is the sum alone. Fields outside COUNT_FIELD, or too many of them, or a count that isn't a whole number from 1 to 50, are refused.
 */
async function count(ctx: Ctx) {
  const guide = ctx.body.guide;
  if (typeof guide !== "string" || !GUIDES.includes(guide)) return reply(400, { error: "guide" });
  const given = ctx.body.counts;
  if (given === null || typeof given !== "object" || Array.isArray(given)) return reply(400, { error: "counts" });
  const fields = Object.entries(given as Record<string, unknown>);
  const valid = ([field, by]: [string, unknown]) => COUNT_FIELD.test(field) && Number.isInteger(by) && (by as number) >= 1 && (by as number) <= MAX_COUNT;
  if (fields.length === 0 || fields.length > MAX_COUNT_FIELDS || !fields.every(valid)) return reply(400, { error: "counts" });
  return reply(200, { ok: true, counted: await tally(ctx, guide, fields as [string, number][]) });
}

/*
 * A guide's summary for hundo.quest (/api/summary): its overall figure and the reader's chapter, in a cookie for the landing page to read,
 * `hundo_p_<guide>` = `1.<percent>.<chapter>` (the 1 is the format). The server sets it so that no guide has to set it from script, which
 * Safari has kept for as little as a week, while one set by a response lasts longer (README.md, "A guide's summary", has what was checked).
 * For a reader who isn't linked nothing is stored: the call makes no store command, so it has no rate limit, which would cost the store's
 * commands itself, and a flood of such calls gets back nothing but cookies. A linked device's call also keeps the summary under its group
 * (`sm:<group>:<guide>`), for hundo.quest in any of the group's browsers (/api/summaries): an installed iPhone app keeps a cookie jar of its
 * own, so its cookie never reaches Safari's, but its summary reaches the group.
 */
const SUMMARY_FORMAT = 1;
/** The cookie's name for a guide. A name never changes once live (each guide's guide.test.ts pins its own): a new one would blank every reader's band until they open the guide. */
export const summaryCookie = (guide: string) => `hundo_p_${guide}`;
const whole = (value: unknown, min: number, max: number) => Number.isInteger(value) && (value as number) >= min && (value as number) <= max;
/** A summary as the cookie and the store hold it, read back: the format, a figure from 0 to 100 and a chapter from 1 to 999, nothing else. */
const SUMMARY_TEXT = /^1\.(0|[1-9]\d?|100)\.([1-9]\d{0,2})$/;
/** What the store keeps for a guide with nothing checked any more. */
const NOTHING_CHECKED = "none";

/**
 * Keep a linked device's summary for its group: its text, or NOTHING_CHECKED, so hundo.quest can tell a guide reset on another device
 * from one never reported. NOTHING_CHECKED only replaces a summary the group holds: a guide joins a group's progress only when a device
 * opens it after linking, so a device with nothing checked may only mean the others haven't brought theirs yet, and must not read as a
 * reset of what they hold. A device without a group, or no device, keeps nothing. Never fails the call: the cookie is the answer, and
 * a store that is down mustn't take it away.
 */
async function keepSummary(ctx: Ctx, guide: string, text: string) {
  try {
    const me = await identify(ctx);
    const only = text === NOTHING_CHECKED ? ["XX"] : [];
    if (me?.group) await exec(ctx, [["SET", smKey(ctx, me.group, guide), text, ...only, "EX", ttl(ctx.where.ns)]]);
  } catch (error) {
    if (!(error instanceof StoreError)) throw error;
  }
}

/**
 * Set a guide's summary, or clear it with `summary: null` (nothing checked). The figure is a whole percent from 0 to 100 and the chapter a
 * number from 1 to 999, the bound the visit counts take: the API knows no guide's chapters, and a guide gaining one mustn't wait on it.
 */
async function summary(ctx: Ctx) {
  const guide = ctx.body.guide;
  if (typeof guide !== "string" || !GUIDES.includes(guide)) return reply(400, { error: "guide" });
  const given = ctx.body.summary;
  const name = summaryCookie(guide);
  if (given === null) {
    await keepSummary(ctx, guide, NOTHING_CHECKED);
    return reply(200, { ok: true }, [cookie(ctx.where, name, "", { maxAge: 0, path: "/" })]);
  }
  if (given === undefined || typeof given !== "object" || Array.isArray(given)) return reply(400, { error: "summary" });
  const fields = given as Record<string, unknown>;
  const { percent, chapter } = fields;
  if (Object.keys(fields).length !== 2 || !whole(percent, 0, 100) || !whole(chapter, 1, 999)) return reply(400, { error: "summary" });
  const text = `${SUMMARY_FORMAT}.${percent as number}.${chapter as number}`;
  await keepSummary(ctx, guide, text);
  return reply(200, { ok: true }, [cookie(ctx.where, name, text, { maxAge: ttl(ctx.where.ns), path: "/" })]);
}

/**
 * Every guide's summary its group holds, for hundo.quest: `{ summaries: { <guide>: { percent, chapter } | null } }`, a guide the group never
 * reported left out and one with nothing checked any more null. Two store commands, the device's record and one read. A device still
 * waiting to be linked has nothing to read, and keeps its cookie: unlinking it here would end the pairing it is waiting on.
 */
async function summaries(ctx: Ctx) {
  const me = await identify(ctx);
  if (!me) return unlinked(ctx);
  if (!me.group) return reply(200, { summaries: {} });
  const [values] = await exec(ctx, [["MGET", ...GUIDES.map((guide) => smKey(ctx, me.group, guide))]]);
  const out: Record<string, { percent: number; chapter: number } | null> = {};
  GUIDES.forEach((guide, i) => {
    const text = (values as unknown[])[i];
    if (text === NOTHING_CHECKED) out[guide] = null;
    const found = typeof text === "string" ? SUMMARY_TEXT.exec(text) : null;
    if (found) out[guide] = { percent: Number(found[1]), chapter: Number(found[2]) };
  });
  return reply(200, { summaries: out });
}

/** All the landing page at https://hundo.quest may call: it reads, and pairs nothing. Its previews and localhost look like a guide's, and aren't held to it. */
const HOME_ROUTES = new Set(["/api/summaries"]);

const routes: Record<string, (ctx: Ctx) => Promise<Response>> = {
  "/api/pair/start": pairStart,
  "/api/pair/claim": pairClaim,
  "/api/status": status,
  "/api/sync": sync,
  "/api/unlink": unlink,
  "/api/remove": remove,
  "/api/forget": forget,
  "/api/count": count,
  "/api/summary": summary,
  "/api/summaries": summaries,
};

/** Answer one request. `deps` is null when the store isn't set up, which is a 503 for every real call. */
export async function handle(request: Request, deps: Deps | null): Promise<Response> {
  try {
    const path = new URL(request.url).pathname;
    const route = routes[path];
    if (!route) return reply(404, { error: "not_found" });
    if (request.method !== "POST") return reply(405, { error: "method" }, [], { Allow: "POST" });
    const where = whereFrom(request);
    if (!where || (where.home && !HOME_ROUTES.has(path))) return reply(403, { error: "origin" });
    if (!deps) return reply(503, { error: "unconfigured" });
    if (!/^application\/json\b/i.test(request.headers.get("content-type") ?? "")) return reply(400, { error: "body" });
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return reply(413, { error: "size" });
    const text = await request.text();
    if (text.length > MAX_BODY) return reply(413, { error: "size" });
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return reply(400, { error: "body" });
    }
    if (body === null || typeof body !== "object" || Array.isArray(body)) return reply(400, { error: "body" });
    if ((body as { p?: unknown }).p !== PROTOCOL) return reply(400, { error: "protocol" });
    return await route({ deps, where, request, body: body as Record<string, unknown>, cookies: parseCookies(request.headers.get("cookie")), now: deps.now() });
  } catch (error) {
    if (error instanceof StoreError) return reply(503, { error: "store" });
    console.error(error);
    return reply(500, { error: "server" });
  }
}
