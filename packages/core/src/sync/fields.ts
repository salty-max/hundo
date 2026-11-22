import { CHAPTER_COUNT, byId, config } from "../guide";
import { defaultState, readExtra } from "../progress-state";
import type { ProgressState } from "../types";
import { stamp, validValue, type Clock, type Entries, type Value } from "./ledger";

/*
 * How a guide's progress becomes the keys the ledger merges, and back:
 *   c:<rowId>  1 for a ticked row (an untick is a 0 that only exists once a row has been ticked and unticked)
 *   ceiling, chapter, spoilers
 *   x:<path>   one leaf of the guide's own `extra`, the path being its keys joined by dots (Koholint's x:runs.normal.deaths)
 * The theme is never synced.
 */

type Flat = Record<string, Value>;

/** The deepest an extra's keys may nest. */
const DEPTH = 6;
/** Keys a request may carry in an extra, and an extra's keys that can't be a path, are left out rather than sent and refused. */
const LEAVES = 60;
const UNSAFE = new Set(["__proto__", "constructor", "prototype"]);

function leavesOf(value: unknown, path: string[], out: Flat) {
  if (value === undefined) return;
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    if (path.length < DEPTH) for (const [name, child] of Object.entries(value)) leavesOf(child, [...path, name], out);
    return;
  }
  const key = `x:${path.join(".")}`;
  if (path.length > 0 && validValue(key, value) && Object.keys(out).filter((name) => name.startsWith("x:")).length < LEAVES) out[key] = value;
}

/** A progress state as keys and values. Only what the ledger accepts is in it. */
export function flatten(state: ProgressState): Flat {
  const out: Flat = {};
  for (const [id, checked] of Object.entries(state.checks)) if (checked === true && validValue(`c:${id}`, 1)) out[`c:${id}`] = 1;
  out.ceiling = state.ceiling;
  out.chapter = state.chapter;
  out.spoilers = state.spoilers;
  leavesOf(state.extra, [], out);
  return out;
}

const same = (a: Value | undefined, b: Value | undefined) => JSON.stringify(a) === JSON.stringify(b);

/** Whether `key` is a row, which has a value when ticked and a 0 once it was unticked. */
const isRow = (key: string) => key.startsWith("c:");

/** The keys whose value differs between two states, with their new value (a row that is no longer ticked is 0). */
export function changes(prev: ProgressState, next: ProgressState): Flat {
  const [before, after] = [flatten(prev), flatten(next)];
  const out: Flat = {};
  for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
    const [was, now] = [before[key] ?? (isRow(key) ? 0 : undefined), after[key] ?? (isRow(key) ? 0 : undefined)];
    if (now !== undefined && !same(was, now)) out[key] = now;
  }
  return out;
}

const chapterOf = (value: Value | undefined, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? Math.min(Math.max(Math.trunc(value), 1), CHAPTER_COUNT) : fallback;

/** Set `value` at `path` in a tree, making the objects on the way. Names that could reach the prototype are refused. */
function put(tree: Record<string, unknown>, path: string[], value: Value) {
  if (path.some((name) => UNSAFE.has(name))) return;
  let at = tree;
  for (const name of path.slice(0, -1)) {
    if (at[name] === null || typeof at[name] !== "object" || Array.isArray(at[name])) at[name] = {};
    at = at[name] as Record<string, unknown>;
  }
  at[path[path.length - 1]] = value;
}

/**
 * The progress `entries` describe, laid over `current`: what the ledger holds replaces what it has a key for, and everything else stays
 * as it is. A row this build doesn't know is never ticked from the ledger, which may hold rows no build has any more, but a tick on one
 * that this progress carries (a newer build's, kept by validateState) goes with an untick, so a newer tab doesn't read it back from
 * here. A chapter is held to the guide's own, never reset to 1.
 */
export function viewFrom(entries: Entries, current: ProgressState): ProgressState {
  const checks = { ...current.checks };
  for (const [key, [, value]] of Object.entries(entries)) {
    if (!isRow(key)) continue;
    const id = key.slice(2);
    if (value !== 1) delete checks[id];
    else if (byId.has(id)) checks[id] = true;
  }
  const ceiling = chapterOf(entries.ceiling?.[1], current.ceiling);
  const spoilers = typeof entries.spoilers?.[1] === "boolean" ? entries.spoilers[1] : current.spoilers;
  let chapter = chapterOf(entries.chapter?.[1], current.chapter);
  // With spoiler protection on, the open chapter is never past what is revealed. This isn't a change anyone made, so it isn't stamped.
  if (spoilers && chapter > ceiling) chapter = ceiling;
  const next: ProgressState = { ...current, checks, ceiling, spoilers, chapter };
  const leaves = Object.entries(entries).filter(([key]) => key.startsWith("x:"));
  if (config.state.extra && leaves.length > 0) {
    const tree = structuredClone(current.extra ?? {}) as unknown as Record<string, unknown>;
    for (const [key, [, value]] of leaves) put(tree, key.slice(2).split("."), value);
    next.extra = readExtra(tree);
  }
  return next;
}

/**
 * What a device sends the first time it joins a group, `group` being what the group already holds. Linking merges and never replaces:
 *   - every row ticked here is stamped now, so it stays ticked whatever the group says (an untick from before linking isn't carried over);
 *   - a setting or leaf that differs from a fresh guide's is stamped 0, so it fills a gap but loses to any real change in the group;
 *   - except a higher ceiling than the group's, which is stamped now, so nothing already revealed gets hidden;
 *   - what is still at its default is left out, so a fresh device can't pull the group back to chapter 1.
 */
export function seed(state: ProgressState, group: Entries, clock: Clock, now: number): Entries {
  const [here, fresh] = [flatten(state), flatten(defaultState())];
  const out: Entries = {};
  for (const [key, value] of Object.entries(here)) {
    if (isRow(key)) out[key] = [stamp(clock, now), value];
    else if (same(value, fresh[key])) continue;
    else if (key === "ceiling" && Number(value) > Number(group.ceiling?.[1] ?? fresh.ceiling)) out[key] = [stamp(clock, now), value];
    else out[key] = [0, value];
  }
  return out;
}
