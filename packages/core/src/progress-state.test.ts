// @vitest-environment node
import { allRows, brand, CHAPTER_COUNT } from "./guide";
import { carryUnknown, defaultState, validateState } from "./progress-state";

const base = { version: 3, guide: brand.id };
const [a, b] = allRows.map((row) => row.id);
const none = new Set<string>();

/** A save from a newer build: a higher version, a field this build doesn't read, a tick on a row it doesn't have, a key in the extra. */
const newer = () => ({
  ...defaultState(),
  version: 4,
  checks: { [a]: true as const, "row-from-a-newer-build": true as const },
  ceiling: CHAPTER_COUNT,
  later: { [b]: a },
  extra: { ...(defaultState().extra ?? {}), addedByANewerBuild: 7 },
});

describe("validateState", () => {
  it("round-trips a default state", () => {
    expect(validateState(JSON.parse(JSON.stringify(defaultState())))).toEqual(defaultState());
  });

  it("round-trips an export through import", () => {
    const state = { ...defaultState(), checks: { [a]: true as const }, ceiling: CHAPTER_COUNT, chapter: 2, spoilers: false };
    expect(validateState(JSON.parse(JSON.stringify(state)))).toEqual(state);
  });

  it("rejects things that are not backups of this guide", () => {
    const bad = [null, [], "x", {}, base, { ...base, checks: [] }, { ...base, version: "4", checks: {} }, { ...base, version: 4, guide: "another-guide", checks: {} }];
    for (const value of bad) expect(() => validateState(value), JSON.stringify(value)).toThrow();
  });

  it("reads a save from a newer build, and keeps what it doesn't know to write back as it came", () => {
    const save = newer();
    const state = validateState(JSON.parse(JSON.stringify(save)));
    expect(state.checks).toEqual(save.checks);
    expect(state).toMatchObject({ version: 4, later: save.later, extra: save.extra, ceiling: CHAPTER_COUNT });
    expect(JSON.parse(JSON.stringify(state))).toEqual(save);
    expect(validateState(JSON.parse(JSON.stringify(state)))).toEqual(state);
  });

  it("keeps a tick on a row this build doesn't have, and drops non-true checks and ids sync couldn't carry", () => {
    const state = validateState({ ...base, checks: { [a]: true, nope: true, [b]: false, "Not An Id": true, ["x".repeat(81)]: true } });
    expect(state.checks).toEqual({ [a]: true, nope: true });
  });

  it("never copies a name that reaches a prototype, at the top or in the extra", () => {
    const state = validateState(JSON.parse(`{"version":3,"guide":"${brand.id}","checks":{},"__proto__":{"polluted":1},"extra":{"__proto__":{"polluted":1}}}`));
    expect(Object.getPrototypeOf(state)).toBe(Object.prototype);
    expect(Object.hasOwn(state, "__proto__")).toBe(false);
    expect((state as unknown as Record<string, unknown>).polluted).toBeUndefined();
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    if (state.extra) expect(Object.getPrototypeOf(state.extra)).toBe(Object.prototype);
    if (state.extra) expect(Object.hasOwn(state.extra, "__proto__")).toBe(false);
  });

  it("keeps an extra only as an object, whether the guide reads one or not", () => {
    for (const extra of ["text", 3, [1, 2], null]) expect(validateState({ ...base, checks: {}, extra }).extra, JSON.stringify(extra)).toEqual(defaultState().extra);
  });

  it("reads a chapter past the guide's last as its last, so a newer build's extra chapter hides nothing here", () => {
    const state = validateState({ ...base, checks: {}, ceiling: CHAPTER_COUNT + 1, chapter: CHAPTER_COUNT + 5 });
    expect(state).toMatchObject({ ceiling: CHAPTER_COUNT, chapter: CHAPTER_COUNT });
  });

  it("sanitises other chapter numbers and the spoiler flag", () => {
    const state = validateState({ ...base, checks: {}, ceiling: 0, chapter: 1.5, spoilers: "no" });
    expect(state).toMatchObject({ ceiling: 1, chapter: 1, spoilers: true });
    expect(validateState({ ...base, checks: {}, chapter: 2 }).chapter).toBe(2);
    expect(validateState({ ...base, checks: {}, spoilers: false }).spoilers).toBe(false);
  });

  it("always saves in the shared format, version 3, which never goes up", () => {
    expect(defaultState()).toMatchObject({ version: 3, guide: brand.id });
  });
});

describe("carryUnknown", () => {
  it("puts back what the reader left out at every depth, lets the reader win where both have a key, and drops retired paths", () => {
    const saved = { mode: "master", runs: { normal: { deaths: -1, time: 9 }, master: { deaths: 2 } }, old: 1, log: { gone: 1, kept: 2 } };
    const known = { mode: "normal", runs: { normal: { deaths: 0 } }, log: { kept: 0 } };
    expect(carryUnknown(saved, known, new Set(["old", "log.gone"]))).toEqual({
      mode: "normal",
      runs: { normal: { deaths: 0, time: 9 }, master: { deaths: 2 } },
      log: { kept: 0 },
    });
  });

  it("keeps the reader's value where the two differ in kind", () => {
    expect(carryUnknown({ runs: [1, 2] }, { runs: { normal: 1 } }, none)).toEqual({ runs: { normal: 1 } });
    expect(carryUnknown({ runs: { normal: 1, master: 2 } }, { runs: 0 }, none)).toEqual({ runs: 0 });
    expect(carryUnknown("text", { mode: "normal" }, none)).toEqual({ mode: "normal" });
    expect(carryUnknown({ mode: "normal" }, undefined, none)).toBeUndefined();
  });

  it("looks only as deep as sync flattens", () => {
    const nest = (depth: number, leaf: object): object => (depth === 0 ? leaf : { a: nest(depth - 1, leaf) });
    expect(carryUnknown(nest(5, { added: 1 }), nest(5, {}), none)).toEqual(nest(5, { added: 1 }));
    expect(carryUnknown(nest(8, { added: 1 }), nest(8, {}), none)).toEqual(nest(8, {}));
  });
});
