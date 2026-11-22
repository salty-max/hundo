import { CHAPTER_COUNT, allRows, config } from "../guide";
import { defaultState } from "../progress-state";
import type { ProgressState } from "../types";
import { changes, flatten, seed, viewFrom } from "./fields";
import { LIMITS, isKey, validValue, type Clock, type Entries } from "./ledger";

const [r1, r2, r3] = allRows.map((row) => row.id);

const stamped = (flat: Record<string, unknown>, at = 10): Entries => Object.fromEntries(Object.entries(flat).map(([key, value]) => [key, [at, value]])) as Entries;
const state = (patch: Partial<ProgressState>): ProgressState => ({ ...defaultState(), ...patch });

describe("flatten", () => {
  it("makes a key for each ticked row and each setting, all of which the ledger accepts", () => {
    const flat = flatten(state({ checks: { [r1]: true, [r2]: true }, ceiling: 2, chapter: 2, spoilers: false }));
    expect(flat).toMatchObject({ [`c:${r1}`]: 1, [`c:${r2}`]: 1, ceiling: 2, chapter: 2, spoilers: false });
    for (const [key, value] of Object.entries(flat)) {
      expect(isKey(key), key).toBe(true);
      expect(validValue(key, value), key).toBe(true);
    }
  });

  it("keeps a fresh guide's extra state within what a request may carry", () => {
    const leaves = Object.keys(flatten(defaultState())).filter((key) => key.startsWith("x:"));
    expect(leaves.length).toBeLessThanOrEqual(LIMITS.leaves);
    expect(leaves.length > 0).toBe(config.state.extra !== undefined && defaultState().extra !== undefined);
  });
});

describe("changes", () => {
  it("names a tick, an untick as a 0, and a setting, and nothing that stayed the same", () => {
    const before = state({ checks: { [r1]: true } });
    const after = state({ checks: { [r2]: true }, chapter: 2 });
    expect(changes(before, after)).toEqual({ [`c:${r1}`]: 0, [`c:${r2}`]: 1, chapter: 2 });
    expect(changes(before, before)).toEqual({});
  });
});

describe("viewFrom", () => {
  it("rebuilds the progress the keys describe, and returns it unchanged for a state that is already like it", () => {
    const current = state({ checks: { [r1]: true, [r3]: true }, ceiling: Math.min(2, CHAPTER_COUNT), chapter: Math.min(2, CHAPTER_COUNT), spoilers: false });
    expect(viewFrom(stamped(flatten(current)), defaultState())).toEqual(current);
    expect(viewFrom(stamped(flatten(current)), current)).toEqual(current);
  });

  it("unticks a row the ledger holds as 0, and leaves a row it has no key for", () => {
    const current = state({ checks: { [r1]: true, [r2]: true } });
    expect(viewFrom({ [`c:${r1}`]: [5, 0] }, current).checks).toEqual({ [r2]: true });
  });

  it("does not apply a row this build doesn't know, and never makes one up", () => {
    const next = viewFrom({ "c:a-row-from-a-newer-build": [5, 1], [`c:${r1}`]: [5, 1] }, defaultState());
    expect(next.checks).toEqual({ [r1]: true });
  });

  it("unticks a row this build doesn't know that the progress carries, and keeps the rest of what it carries", () => {
    const current = { ...state({ checks: { [r1]: true, "row-from-a-newer-build": true, "another-new-row": true } }), later: { [r1]: r2 } };
    const next = viewFrom({ "c:row-from-a-newer-build": [5, 0], "c:another-new-row": [5, 1] }, current);
    expect(next.checks).toEqual({ [r1]: true, "another-new-row": true });
    expect(next).toMatchObject({ later: { [r1]: r2 } });
  });

  it("keeps the keys a newer build added to the guide's extra when it lays the ledger's leaves over it", () => {
    if (!config.state.extra) return;
    const fresh = defaultState().extra ?? {};
    const current = state({ extra: { ...fresh, addedByANewerBuild: 7 } as unknown as ProgressState["extra"] });
    const next = viewFrom({ "x:anotherNewLeaf.deep": [5, 3] }, current);
    expect(next.extra).toEqual({ ...fresh, addedByANewerBuild: 7, anotherNewLeaf: { deep: 3 } });
  });

  it("holds a chapter to the guide's own and never resets it to 1", () => {
    const next = viewFrom({ ceiling: [5, 999], chapter: [5, 999], spoilers: [5, false] }, defaultState());
    expect(next).toMatchObject({ ceiling: CHAPTER_COUNT, chapter: CHAPTER_COUNT, spoilers: false });
    expect(viewFrom({ chapter: [5, 0] }, state({ chapter: 2 })).chapter).toBe(1);
  });

  it("moves the open chapter back to the ceiling under spoiler protection, as a view and not a change", () => {
    const next = viewFrom({ ceiling: [5, 1], chapter: [6, Math.min(3, CHAPTER_COUNT)] }, state({ spoilers: true }));
    expect(next.chapter).toBe(1);
    expect(viewFrom({ ceiling: [5, 1], chapter: [6, Math.min(3, CHAPTER_COUNT)], spoilers: [6, false] }, defaultState()).chapter).toBe(Math.min(3, CHAPTER_COUNT));
  });

  it("refuses names that could reach an object's prototype", () => {
    viewFrom({ "x:__proto__.polluted": [5, 1], "x:a.constructor.prototype.polluted": [5, 1] }, defaultState());
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});

describe("seed", () => {
  const clock = (): Clock => ({ last: 0, offset: 0 });
  const now = 1_000_000;

  it("stamps every row ticked here now, so linking never unticks anything", () => {
    const out = seed(state({ checks: { [r1]: true } }), { [`c:${r1}`]: [now + 500, 0] }, clock(), now);
    expect(out[`c:${r1}`][1]).toBe(1);
    expect(out[`c:${r1}`][0]).toBeGreaterThanOrEqual(now);
  });

  it("leaves what is still at its default out", () => {
    expect(Object.keys(seed(defaultState(), {}, clock(), now)).filter((key) => !key.startsWith("x:"))).toEqual([]);
  });

  it("stamps a setting that differs 0, so it fills a gap and loses to any real change in the group", () => {
    const out = seed(state({ chapter: Math.min(2, CHAPTER_COUNT), spoilers: false }), {}, clock(), now);
    expect(out.chapter).toEqual([0, Math.min(2, CHAPTER_COUNT)]);
    expect(out.spoilers).toEqual([0, false]);
  });

  it("stamps a ceiling higher than the group's now, and one that isn't higher 0", () => {
    const high = Math.min(3, CHAPTER_COUNT);
    expect(seed(state({ ceiling: high }), { ceiling: [now - 10, 1] }, clock(), now).ceiling[0]).toBeGreaterThanOrEqual(now);
    expect(seed(state({ ceiling: high }), { ceiling: [now - 10, high] }, clock(), now).ceiling).toEqual([0, high]);
    expect(seed(state({ ceiling: 2 }), { ceiling: [now - 10, high] }, clock(), now).ceiling).toEqual([0, 2]);
  });
});
