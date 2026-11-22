import { brand } from "../guide";
import { notATick, reloadFromAnotherTab } from "../persistence";
import { STORAGE_KEY, validateState } from "../progress-state";
import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";
import { call, type Reply } from "./api";
import { seed, viewFrom } from "./fields";
import { cleanEntries, dropRecord, readHint, readRecord, sendable, writeRecord, type SyncRecord } from "./local";
import { merge, observe, offsetFrom, stamp, type Clock, type Entries } from "./ledger";

/*
 * One round of sync: join the group if this device hasn't, send what changed here, take what the group has, and apply it.
 * It never throws and never decides when to run (engine.ts does), and it only ever unlinks a device on the server's own
 * "unlinked": a network failure, a full store or an error leaves progress and the ledger as they were.
 */

/** Entries in one request: the API takes 1,500. */
const BATCH = 1000;
/** Rounds in one cycle, so a device with a huge backlog doesn't hold the lock for long. */
const ROUNDS = 5;
const TOUCH_AFTER = 20 * 60 * 60 * 1000;
/** A poll that is only a check becomes a full sync this often: it refreshes the device's last-seen and the count of devices. */
const FULL_EVERY = 10 * 60_000;

export type Outcome =
  | { kind: "off" }
  /** `pulled`: the group had something this device didn't, and it was applied here. */
  | { kind: "ok"; devices: number; dirty: boolean; pulled: boolean }
  | { kind: "unlinked" }
  | { kind: "retry"; why: "offline" | "paused" | "error" };

interface SyncBody {
  entries?: unknown;
  devices?: unknown;
  now?: unknown;
  rev?: unknown;
  unchanged?: unknown;
  error?: unknown;
}

const retry = (why: "offline" | "paused" | "error"): Outcome => ({ kind: "retry", why });

/** What a failed reply means. Only the server's own word that this device is unlinked ends the link here. */
function failure(reply: Reply<SyncBody>): Outcome {
  if (reply.status === 401 && reply.body?.error === "unlinked") {
    dropRecord();
    return { kind: "unlinked" };
  }
  if (reply.status === 0) return retry("offline");
  if ([413, 429, 503].includes(reply.status)) return retry("paused");
  return retry("error");
}

const pick = (entries: Entries, keys: string[]): Entries => Object.fromEntries(keys.filter((key) => key in entries).map((key) => [key, entries[key]]));

const sameProgress = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** Lay the merged ledger over this device's progress, announcing it. Whether it changed anything. */
function apply(entries: Entries, first: boolean): boolean {
  const progress = useProgress.getState();
  const next = viewFrom(entries, progress.data);
  if (sameProgress(next, progress.data)) return false;
  const ticks = !sameProgress(next.checks, progress.data.checks);
  // What the group had isn't a tick the reader made here, so it doesn't start the request to keep storage (Firefox would ask them).
  notATick(() => progress.applySynced(next));
  const ui = useUi.getState();
  ui.announce(first ? "Progress merged with your other devices." : "Progress updated from your other device.");
  if (ticks && !first) ui.showToast("Progress updated from your other device.");
  return true;
}

/** The server's entries in a reply, or null when the reply isn't what the protocol says. */
function serverState(body: SyncBody | null): { entries: Entries; devices: number; now: number; rev: number | null } | null {
  if (!body || typeof body.now !== "number" || typeof body.devices !== "number") return null;
  const rev = typeof body.rev === "number" && Number.isSafeInteger(body.rev) && body.rev >= 0 ? body.rev : null;
  return { entries: cleanEntries(body.entries), devices: body.devices, now: body.now, rev };
}

/** Take what another tab of this guide has saved, if this tab hasn't heard of it yet, so a first sync starts from the progress that is stored. */
function catchUp() {
  // Storage that refused the last save is behind this tab, not ahead of it: what is stored would wipe what couldn't be saved.
  if (useProgress.getState().storageError) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw || raw === JSON.stringify(useProgress.getState().data)) return;
    validateState(JSON.parse(raw));
    reloadFromAnotherTab();
  } catch {
    // What is stored can't be read: the progress in memory stays the one that counts.
  }
}

/**
 * Join the group the link cookie names: pull first, then send only what this device adds, so linking merges and never replaces. Also how a
 * device that moved to another group starts there: its old ledger's stamps belong to the old group, so it begins again from its progress.
 */
async function join(hint: string): Promise<{ joined: true } | { outcome: Outcome }> {
  const clock: Clock = { last: 0, offset: 0 };
  const sentAt = Date.now();
  const reply = await call<SyncBody>("/sync", { guide: brand.id, entries: {}, touch: true });
  const receivedAt = Date.now();
  const server = reply.status === 200 ? serverState(reply.body) : null;
  if (!server) return { outcome: reply.status === 200 ? retry("error") : failure(reply) };
  clock.offset = offsetFrom(server.now, sentAt, receivedAt);
  observe(clock, server.entries);
  // Read after the wait, and used straight away: nothing can change the progress between reading it and saving the result.
  catchUp();
  const state = useProgress.getState().data;
  const mine = seed(state, server.entries, clock, Date.now());
  const entries = merge(server.entries, mine);
  const record: SyncRecord = {
    v: 1,
    group: hint,
    entries,
    dirty: Object.keys(mine).filter((key) => entries[key] === mine[key]),
    clock,
    touched: Date.now(),
    rev: server.rev,
    fullAt: Date.now(),
    devices: server.devices,
  };
  // The ledger first: if it can't be saved, nothing was applied and the next round joins afresh. The other way round, rows pulled from the
  // group would count as ticked here on that next round, and beat an untick another device made in between.
  if (!writeRecord(record)) return { outcome: retry("error") };
  apply(entries, true);
  return { joined: true };
}

/** Send what is waiting, take the group's state and apply it. Repeats while more than one batch is waiting. */
async function exchange(): Promise<Outcome> {
  let devices = 0;
  let pulled = false;
  for (let round = 0, rebased = false; round < ROUNDS; ) {
    const record = readRecord();
    if (!record || !readHint()) return { kind: "off" };
    const keys = sendable(record).slice(0, BATCH);
    const sent = pick(record.entries, keys);
    const touch = Date.now() - record.touched > TOUCH_AFTER;
    // Nothing to send, no touch due, a revision to go by and a full answer not long ago: only ask whether anything has changed.
    const quiet = record.rev !== null && keys.length === 0 && !touch && Date.now() - record.fullAt < FULL_EVERY;
    const sentAt = Date.now();
    const reply = await call<SyncBody>("/sync", quiet ? { guide: brand.id, entries: {}, rev: record.rev } : { guide: brand.id, entries: sent, touch });
    const receivedAt = Date.now();

    if (quiet && reply.status === 200 && reply.body?.unchanged === true && reply.body.rev === record.rev) {
      // Nothing changed in the group: nothing to merge, apply or save, so nothing is written. What this tab has waiting is its own business.
      return { kind: "ok", devices: record.devices, dirty: sendable(readRecord() ?? { dirty: [] }).length > 0, pulled };
    }

    if (reply.status === 400 && reply.body?.error === "clock" && typeof reply.body.now === "number" && !rebased) {
      // This device's clock is more than a day off the server's, and the offset it had was wrong: take the server's time, once.
      rebased = true;
      const serverNow = reply.body.now;
      const fresh = readRecord();
      if (!fresh) return { kind: "off" };
      fresh.clock.offset = serverNow - Date.now();
      fresh.clock.last = Math.min(fresh.clock.last, serverNow);
      for (const key of fresh.dirty) if (fresh.entries[key][0] > serverNow + 60_000) fresh.entries[key] = [stamp(fresh.clock, Date.now()), fresh.entries[key][1]];
      writeRecord(fresh);
      continue;
    }
    const server = reply.status === 200 ? serverState(reply.body) : null;
    if (!server) return reply.status === 200 ? retry("error") : failure(reply);

    // Another tab may have saved since the request left: merge into what is stored now, and keep a key waiting if it changed again.
    const latest = readRecord();
    if (!latest || !readHint()) return { kind: "off" };
    latest.clock.offset = offsetFrom(server.now, sentAt, receivedAt);
    observe(latest.clock, server.entries);
    const delivered = (key: string) => key in sent && latest.entries[key]?.[0] === sent[key][0] && sameProgress(latest.entries[key][1], sent[key][1]);
    latest.dirty = latest.dirty.filter((key) => !delivered(key));
    latest.entries = merge(latest.entries, server.entries);
    if (touch) latest.touched = Date.now();
    latest.rev = server.rev;
    latest.fullAt = Date.now();
    latest.devices = server.devices;
    pulled = apply(latest.entries, false) || pulled;
    if (!writeRecord(latest)) return retry("error");
    devices = server.devices;
    round++;
    if (sendable(latest).length === 0) return { kind: "ok", devices, dirty: false, pulled };
  }
  return { kind: "ok", devices, dirty: true, pulled };
}

async function once(): Promise<Outcome> {
  const hint = readHint();
  const record = readRecord();
  if (!hint) {
    // Not linked: no cookie, so nothing to do. A ledger left from before (unlinked in another guide, or the cookie expired) goes, and progress stays.
    if (record) dropRecord();
    return { kind: "off" };
  }
  // No ledger, or one from another group (this device moved): join afresh. The old stamps mean nothing in the new group, and sending them
  // as they are could untick what the group has ticked.
  let first = false;
  if (!record || record.group !== hint) {
    if (record) dropRecord();
    const joined = await join(hint);
    if ("outcome" in joined) return joined.outcome;
    first = true;
  }
  const outcome = await exchange();
  // Joining a group is a pull of everything it has.
  return outcome.kind === "ok" && first ? { ...outcome, pulled: true } : outcome;
}

/** One cycle, alone: a second tab of this guide waits its turn, and then finds the first one's work done. */
export async function syncOnce(): Promise<Outcome> {
  return navigator.locks ? await navigator.locks.request("hundo-sync", once) : await once();
}

/** A push on its way out as the page closes: no answer is read, so nothing is marked sent. The next cycle settles it. */
export function flushOnExit() {
  const record = readRecord();
  // Not for a ledger of another group than the cookie names: its stamps are the old group's, and the next round starts afresh.
  const keys = record ? sendable(record) : [];
  if (!record || record.group !== readHint() || keys.length === 0) return;
  const sent = pick(record.entries, keys.slice(0, 200));
  void call("/sync", { guide: brand.id, entries: sent }, true);
}
