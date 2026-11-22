/*
 * The merge model of progress sync: stamped entries, the order that settles a clash, and the checks on what a device may
 * send. Pure: no I/O, no clock, no imports. The API uses it as is, and the guides carry a byte-identical copy at
 * packages/core/src/sync/ledger.ts, held equal by a test, so both sides always agree on who wins. Change both together.
 */

export type Value = null | boolean | number | string | Value[] | { [key: string]: Value };
/** [stamp, value]. The stamp is a hybrid clock: milliseconds, but never behind a change already seen. */
export type Entry = readonly [stamp: number, value: Value];
/**
 * What a guide's progress is, flattened to keys:
 *   c:<rowId>  1 ticked, 0 unticked (the 0 stays, so an untick can win over a tick)
 *   l:<rowId>  set aside for later: the row id the reader had reached then (a row id), 0 once back on the route
 *   ceiling, chapter  whole numbers; spoilers  a boolean
 *   x:<path>   one leaf of the guide's own extra state (the theme is never synced)
 */
export type Entries = Record<string, Entry>;

export const LIMITS = {
  /** Entries in one request. The biggest guide has about 700 rows. */
  entries: 1500,
  /** Keys one guide's data may hold. */
  keys: 2000,
  /** The JSON of one extra leaf. */
  leaf: 256,
  /** Extra leaves in a request, and in one guide's data. */
  leaves: 60,
  /** How far ahead of the server's clock a stamp may be (a day). */
  future: 86_400_000,
};

const ROW = /^c:[a-z0-9][a-z0-9_-]{0,79}$/;
const LATER = /^l:[a-z0-9][a-z0-9_-]{0,79}$/;
/** A row id as a value: where an `l:` row was set aside from. */
const ROW_ID = /^[a-z0-9][a-z0-9_-]{0,79}$/;
const LEAF = /^x:[A-Za-z0-9_.-]{1,60}$/;
const WHOLE = new Set(["ceiling", "chapter"]);

export const isKey = (key: string) => ROW.test(key) || LATER.test(key) || LEAF.test(key) || WHOLE.has(key) || key === "spoilers";

const isJson = (value: unknown, depth = 0): value is Value => {
  if (value === null || typeof value === "boolean" || typeof value === "string") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (depth > 6) return false;
  if (Array.isArray(value)) return value.every((item) => isJson(item, depth + 1));
  if (typeof value === "object") return Object.values(value as object).every((item) => isJson(item, depth + 1));
  return false;
};

/** Whether `value` is something the key can hold. */
export function validValue(key: string, value: unknown): value is Value {
  if (ROW.test(key)) return value === 0 || value === 1;
  if (LATER.test(key)) return value === 0 || (typeof value === "string" && ROW_ID.test(value));
  if (WHOLE.has(key)) return Number.isInteger(value) && (value as number) >= 1 && (value as number) <= 999;
  if (key === "spoilers") return typeof value === "boolean";
  return LEAF.test(key) && isJson(value) && JSON.stringify(value).length <= LIMITS.leaf;
}

/** Read untrusted JSON into entries, or null if any of it is off: shape, key, value, stamp or size. */
export function parseEntries(raw: unknown): Entries | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const pairs = Object.entries(raw);
  if (pairs.length > LIMITS.entries) return null;
  const out: Entries = {};
  let leaves = 0;
  for (const [key, entry] of pairs) {
    if (!isKey(key) || !Array.isArray(entry) || entry.length !== 2) return null;
    const [stamp, value] = entry as [unknown, unknown];
    if (typeof stamp !== "number" || !Number.isSafeInteger(stamp) || stamp < 0) return null;
    if (!validValue(key, value)) return null;
    if (key.startsWith("x:") && ++leaves > LIMITS.leaves) return null;
    out[key] = [stamp, value];
  }
  return out;
}

const rank = (value: Value) =>
  value === null ? 0 : typeof value === "boolean" ? 1 : typeof value === "string" ? 2 : typeof value === "number" ? 3 : 4;

const compareText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/**
 * A fixed order over values, for two changes with the same stamp: a tick beats an untick, a higher number beats a lower
 * one (a higher ceiling, more deaths), spoiler protection on beats off, and anything beats null. A number beats a string, so
 * an `l:` back on the route (0) beats a set-aside (a row id): the opposite of `c:`, and harmless either way.
 */
export function compareValues(a: Value, b: Value): number {
  const ra = rank(a);
  const rb = rank(b);
  if (ra !== rb) return ra - rb;
  if (typeof a === "boolean" && typeof b === "boolean") return Number(a) - Number(b);
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (typeof a === "string" && typeof b === "string") return compareText(a, b);
  if (a === null) return 0;
  return compareText(JSON.stringify(a), JSON.stringify(b));
}

/** Whether `a` wins over `b`: the later stamp, and on a tie the greater value. */
export const beats = (a: Entry, b: Entry) => (a[0] !== b[0] ? a[0] > b[0] : compareValues(a[1], b[1]) > 0);

/** Merge any number of entry sets, keeping each key's winner. Commutative, associative and idempotent. */
export function merge(...sources: Entries[]): Entries {
  const out: Entries = {};
  for (const source of sources) {
    for (const [key, entry] of Object.entries(source)) {
      const current = out[key];
      if (!current || beats(entry, current)) out[key] = entry;
    }
  }
  return out;
}

/*
 * On the server a guide's data is a sorted set with one member per entry, `key<TAB>stamp<TAB>JSON(value)`, scored by the
 * stamp. A member never changes, so two devices pushing at once only ever add members and never overwrite each other, and
 * removing a member that has lost can never take a later change with it: a later change is a different member.
 */

export const memberOf = (key: string, at: number, value: Value) => `${key}\t${at}\t${JSON.stringify(value)}`;

export function parseMember(member: string): [key: string, entry: Entry] | null {
  const first = member.indexOf("\t");
  const second = member.indexOf("\t", first + 1);
  if (first < 1 || second < 0) return null;
  const key = member.slice(0, first);
  const at = Number(member.slice(first + 1, second));
  if (!Number.isSafeInteger(at) || at < 0) return null;
  try {
    const value: unknown = JSON.parse(member.slice(second + 1));
    // Only the text memberOf writes counts, so what is read back is what a writer meant: "1e3" or "01" is not a stamp.
    return validValue(key, value) && memberOf(key, at, value) === member ? [key, [at, value]] : null;
  } catch {
    return null;
  }
}

/** The winning entry of every key in a sorted set's members. Members that are not what memberOf writes are skipped. */
export function winners(members: Iterable<string>): Entries {
  const out: Entries = {};
  for (const member of members) {
    const parsed = parseMember(member);
    if (!parsed) continue;
    const [key, entry] = parsed;
    const current = out[key];
    if (!current || beats(entry, current)) out[key] = entry;
  }
  return out;
}

/**
 * What a guide's data is once `pushed` joins the members already `stored`: the winning entries, the members to add as
 * [stamp, member] (only pushed entries that win) and the stored members to remove: those that lost. A member this code
 * can't read is left alone, neither a winner nor a loser, so a check tightened later, or an older server, can't delete
 * what a newer one stored.
 */
export function settle(stored: Iterable<string>, pushed: Entries): { entries: Entries; add: [at: number, member: string][]; drop: string[] } {
  const held = new Set(stored);
  const incoming = Object.entries(pushed).map(([key, [at, value]]) => [at, memberOf(key, at, value)] as [number, string]);
  const entries = winners([...held, ...incoming.map(([, member]) => member)]);
  const keep = new Set(Object.entries(entries).map(([key, [at, value]]) => memberOf(key, at, value)));
  return {
    entries,
    add: incoming.filter(([, member]) => keep.has(member) && !held.has(member)),
    drop: [...held].filter((member) => parseMember(member) !== null && !keep.has(member)),
  };
}

/** A device's clock: the highest stamp it has issued or seen, and how far its own clock is off the server's. */
export interface Clock {
  last: number;
  offset: number;
}

/** The next stamp: the corrected wall clock, but always above every stamp seen, so a change made after seeing another wins. */
export function stamp(clock: Clock, now: number): number {
  const next = Math.max(Math.floor(now) + clock.offset, clock.last + 1);
  clock.last = next;
  return next;
}

/** Note the stamps of entries pulled from the server. */
export function observe(clock: Clock, entries: Entries): void {
  for (const [at] of Object.values(entries)) if (at > clock.last) clock.last = at;
}

/** How far this device's clock is behind the server's (negative: ahead), from the midpoint of a round trip. Under 2 s is ignored. */
export function offsetFrom(serverNow: number, sentAt: number, receivedAt: number): number {
  const diff = Math.round(serverNow - (sentAt + receivedAt) / 2);
  return Math.abs(diff) > 2000 ? diff : 0;
}
