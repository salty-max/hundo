import { CHAPTER_COUNT, brand, byId, config, readChapter } from "./guide";
import type { Checks, Extra, ProgressState } from "./types";

export const STORAGE_KEY = `${brand.storagePrefix}.v1`;

/**
 * The format's version. It never goes up: a change adds an optional field, which a page still on an older build reads past and
 * writes back untouched. A bump would only tell such a page the save isn't its own (docs/core.md, Saved progress).
 */
const VERSION = 3;

export const defaultState = (): ProgressState => ({
  version: VERSION,
  guide: brand.id,
  checks: {},
  ceiling: 1,
  spoilers: true,
  chapter: 1,
  extra: config.state.extra?.initial() as Extra,
});

/** The fields this build reads. A save's others were written by a newer build, and go back as they came. */
const KNOWN = new Set(["version", "guide", "checks", "ceiling", "spoilers", "chapter", "extra"]);
/**
 * Fields core no longer reads, named here when one goes: they're dropped rather than carried, so a later field can never read an
 * old value under the same name. None yet.
 */
const RETIRED = new Set<string>();
/** Names that would reach an object's prototype if copied onto it. */
const UNSAFE = new Set(["__proto__", "constructor", "prototype"]);
/** How deep the carry looks into a guide's extra, as deep as sync flattens it. */
const DEPTH = 6;
/** A row id sync can carry (the ledger's `c:`), the shape a tick on a row this build doesn't have must have to be kept. */
const ROW_ID = /^[a-z0-9][a-z0-9_-]{0,79}$/;

const isPlain = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);

/**
 * `known`, what this build read, with what else `saved` holds put back, through plain objects to `DEPTH`: a field a newer build added
 * survives this build's next write. Where both have a key this build's value wins, and so does its type. A `retired` path (dotted,
 * from the top of `saved`) is never put back.
 */
export function carryUnknown(saved: unknown, known: unknown, retired: ReadonlySet<string>, path = "", depth = 0): unknown {
  if (!isPlain(saved) || !isPlain(known) || depth >= DEPTH) return known;
  const out: Record<string, unknown> = { ...known };
  for (const [key, value] of Object.entries(saved)) {
    const at = path ? `${path}.${key}` : key;
    if (UNSAFE.has(key) || retired.has(at)) continue;
    out[key] = Object.hasOwn(known, key) ? carryUnknown(value, known[key], retired, at, depth + 1) : value;
  }
  return out;
}

/**
 * The guide's extra from a save: what its reader makes of it, and the keys a newer build added that it doesn't know. A guide with no
 * extra of its own keeps a newer build's, if it is an object.
 */
export function readExtra(value: unknown): Extra {
  const extra = config.state.extra;
  if (extra) return carryUnknown(value, extra.read(value), new Set(extra.retired)) as Extra;
  return (isPlain(value) ? carryUnknown(value, {}, new Set()) : undefined) as Extra;
}

/**
 * A chapter from a save of this format. One past the last, from a newer build with more chapters, is the last here: everything this
 * build has. Not kept as it is, since Guide settings can only offer this build's chapters.
 */
const savedChapter = (value: unknown) => readChapter(Number.isInteger(value) && (value as number) > CHAPTER_COUNT ? CHAPTER_COUNT : value);

/**
 * Parse untrusted JSON (storage or an imported file) into a safe state. Version 3 is the shared format, and a higher one reads the
 * same, since a newer build only ever adds fields: what this build knows is used, and the rest (fields, ticks on rows it doesn't have,
 * keys in the guide's extra) is kept on the state and written back as it was. Saves from before the shared format go through the
 * guide's `legacy` reader. Throws on anything that is not a backup of this guide.
 */
export function validateState(value: unknown): ProgressState {
  const v = isPlain(value) ? value : null;
  const current = v !== null && v.guide === brand.id && Number.isInteger(v.version) && (v.version as number) >= VERSION;
  const legacy = v && !current ? (config.state.legacy?.(v) ?? null) : null;
  const checks = v?.checks;
  if (!v || (!current && !legacy) || !isPlain(checks)) {
    throw new Error(`This file is not a ${brand.name} progress backup.`);
  }
  const fresh = defaultState();
  const newer = current ? (carryUnknown(Object.fromEntries(Object.entries(v).filter(([key]) => !KNOWN.has(key))), {}, RETIRED) as object) : {};
  const result: ProgressState = { ...fresh, ...newer, version: current ? (v.version as number) : VERSION };
  const kept = (id: string) => byId.has(id) || (current && ROW_ID.test(id));
  result.checks = Object.fromEntries(Object.entries(checks).filter(([id, checked]) => checked === true && kept(id))) as Checks;
  const chapter = current ? savedChapter : readChapter;
  result.ceiling = chapter(v.ceiling);
  result.chapter = chapter(v.chapter);
  result.spoilers = v.spoilers !== false;
  if (current) result.extra = readExtra(v.extra);
  else if (config.state.extra) result.extra = config.state.extra.read(legacy?.extra);
  return result;
}
