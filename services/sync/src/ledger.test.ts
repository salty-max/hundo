import { describe, expect, it } from "vitest";
import {
  LIMITS,
  beats,
  compareValues,
  isKey,
  memberOf,
  merge,
  observe,
  offsetFrom,
  parseEntries,
  parseMember,
  settle,
  stamp,
  validValue,
  winners,
  type Clock,
  type Entries,
  type Entry,
} from "./ledger";
import { random } from "./harness";

const e = (at: number, value: Entry[1]): Entry => [at, value];

describe("keys and values", () => {
  it("accepts the keys of a guide's progress and nothing else", () => {
    for (const key of ["c:heart-piece-3", "c:a", "l:quest-shiva-shop", "ceiling", "chapter", "spoilers", "x:mode", "x:runs.normal.deaths", "x:reported"]) expect(isKey(key), key).toBe(true);
    for (const key of ["", "c:", "c:UPPER", "c:-lead", "c:has space", "l:", "l:UPPER", "l:a.b", "x:", "x:a b", "theme", "__proto__", "constructor", "c:" + "a".repeat(81), "l:" + "a".repeat(81)]) expect(isKey(key), key).toBe(false);
  });

  it("holds each key to its own kind of value", () => {
    expect(validValue("c:a", 1) && validValue("c:a", 0)).toBe(true);
    for (const bad of [2, -1, true, "1", null]) expect(validValue("c:a", bad), String(bad)).toBe(false);
    // A set-aside holds the row id the reader had reached, bounded like a row's, and 0 once back on the route.
    expect(validValue("l:a", "quest-shiva-shop") && validValue("l:a", 0)).toBe(true);
    for (const bad of [1, -1, true, "", "Upper", "has\ttab", "a".repeat(81), null, ["a"]]) expect(validValue("l:a", bad), String(bad)).toBe(false);
    expect(validValue("ceiling", 1) && validValue("chapter", 999)).toBe(true);
    for (const bad of [0, 1000, 1.5, "3", null, NaN]) expect(validValue("ceiling", bad), String(bad)).toBe(false);
    expect(validValue("spoilers", true) && validValue("spoilers", false)).toBe(true);
    for (const bad of [0, "yes", null]) expect(validValue("spoilers", bad), String(bad)).toBe(false);
  });

  it("takes any JSON in an extra leaf, up to a size", () => {
    for (const ok of [0, "hero", null, true, [1, 2], { a: 1 }]) expect(validValue("x:leaf", ok)).toBe(true);
    expect(validValue("x:leaf", "a".repeat(LIMITS.leaf))).toBe(false);
    expect(validValue("x:leaf", NaN)).toBe(false);
    expect(validValue("x:leaf", undefined)).toBe(false);
    expect(validValue("x:leaf", () => 1)).toBe(false);
  });
});

describe("parseEntries", () => {
  it("reads good entries", () => {
    expect(parseEntries({ "c:a": [5, 1], ceiling: [6, 3], "x:mode": [7, "hero"] })).toEqual({ "c:a": [5, 1], ceiling: [6, 3], "x:mode": [7, "hero"] });
    expect(parseEntries({})).toEqual({});
  });

  it("refuses anything off: shape, key, value, stamp or size", () => {
    const bad: unknown[] = [
      null,
      [],
      "x",
      { "c:a": 1 },
      { "c:a": [1] },
      { "c:a": [1, 1, 1] },
      { "c:a": [-1, 1] },
      { "c:a": [1.5, 1] },
      { "c:a": ["1", 1] },
      { "c:a": [Number.MAX_SAFE_INTEGER + 1, 1] },
      { "c:a": [1, 2] },
      { nope: [1, 1] },
      { ["__proto__"]: [1, 1] },
    ];
    for (const value of bad) expect(parseEntries(value), JSON.stringify(value)).toBeNull();
  });

  it("caps entries and extra leaves", () => {
    const rows = Object.fromEntries(Array.from({ length: LIMITS.entries }, (_, i) => [`c:r${i}`, [1, 1]]));
    expect(parseEntries(rows)).not.toBeNull();
    expect(parseEntries({ ...rows, "c:one-more": [1, 1] })).toBeNull();
    const leaves = (n: number) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`x:l${i}`, [1, i]]));
    expect(parseEntries(leaves(LIMITS.leaves))).not.toBeNull();
    expect(parseEntries(leaves(LIMITS.leaves + 1))).toBeNull();
  });
});

describe("who wins", () => {
  it("is the later stamp, whatever the values", () => {
    expect(beats(e(2, 0), e(1, 1))).toBe(true);
    expect(beats(e(1, 1), e(2, 0))).toBe(false);
  });

  it("is settled by a fixed order on a tie: tick over untick, more over less, spoiler protection on", () => {
    expect(beats(e(5, 1), e(5, 0))).toBe(true);
    expect(beats(e(5, 0), e(5, 1))).toBe(false);
    expect(beats(e(5, 4), e(5, 3))).toBe(true); // a higher ceiling, more deaths
    expect(beats(e(5, true), e(5, false))).toBe(true);
    expect(beats(e(5, "normal"), e(5, "hero"))).toBe(true); // strings by text: arbitrary, but the same on every device
    expect(beats(e(5, 0), e(5, null))).toBe(true);
    expect(beats(e(5, null), e(5, null))).toBe(false);
  });

  it("orders values of different kinds the same way every time, and arrays and objects by their text", () => {
    const values = [null, false, true, "a", "b", 0, 7, [1], [2], { a: 1 }];
    for (const a of values) for (const b of values) expect(Math.sign(compareValues(a, b)) + Math.sign(compareValues(b, a)), `${JSON.stringify(a)} ${JSON.stringify(b)}`).toBe(0);
    expect(compareValues([1], [2])).toBeLessThan(0);
  });

  it("keeps both devices' ticks when they ticked different rows", () => {
    const phone: Entries = { "c:a": [10, 1] };
    const mac: Entries = { "c:b": [11, 1] };
    expect(merge(phone, mac)).toEqual({ "c:a": [10, 1], "c:b": [11, 1] });
  });

  it("respects an untick made after the tick, in either order of arrival", () => {
    const tick: Entries = { "c:a": [10, 1] };
    const untick: Entries = { "c:a": [11, 0] };
    expect(merge(tick, untick)["c:a"]).toEqual([11, 0]);
    expect(merge(untick, tick)["c:a"]).toEqual([11, 0]);
  });

  it("lets a later tick bring a row back", () => {
    expect(merge({ "c:a": [10, 1] }, { "c:a": [11, 0] }, { "c:a": [12, 1] })["c:a"]).toEqual([12, 1]);
  });

  it("is commutative, associative and idempotent over random sets", () => {
    const next = random(7);
    const keys = ["c:a", "c:b", "c:c", "ceiling", "spoilers", "x:mode", "x:n"];
    const values: Record<string, unknown[]> = { "c:a": [0, 1], "c:b": [0, 1], "c:c": [0, 1], ceiling: [1, 2, 3], spoilers: [true, false], "x:mode": ["normal", "hero", null], "x:n": [0, 1, 2, [1]] };
    const make = (): Entries => {
      const out: Entries = {};
      for (const key of keys) {
        if (next() < 0.6) out[key] = [Math.floor(next() * 4), values[key][Math.floor(next() * values[key].length)] as Entry[1]];
      }
      return out;
    };
    for (let round = 0; round < 300; round++) {
      const [a, b, c] = [make(), make(), make()];
      expect(merge(a, b)).toEqual(merge(b, a));
      expect(merge(merge(a, b), c)).toEqual(merge(a, merge(b, c)));
      expect(merge(a, a)).toEqual(a);
      expect(merge(merge(a, b), b)).toEqual(merge(a, b));
    }
  });

  it("gives every replica the same state however the changes reach it", () => {
    const next = random(11);
    for (let round = 0; round < 100; round++) {
      const changes: Entries[] = Array.from({ length: 12 }, () => ({ [`c:r${Math.floor(next() * 4)}`]: [Math.floor(next() * 6), next() < 0.5 ? 1 : 0] as Entry }));
      const shuffled = [...changes].sort(() => next() - 0.5);
      const halves = [merge(...shuffled.slice(0, 6)), merge(...shuffled.slice(6))];
      expect(merge(...halves)).toEqual(merge(...changes));
      expect(merge(...[...halves].reverse())).toEqual(merge(...changes));
    }
  });
});

describe("members, as the server holds them", () => {
  it("round-trips a key, a stamp and a value through a member", () => {
    const cases: [string, Entry[1]][] = [["c:a", 1], ["spoilers", false], ["x:mode", "hero"], ["x:o", { a: [1, null] }]];
    for (const [key, value] of cases) expect(parseMember(memberOf(key, 9, value))).toEqual([key, [9, value]]);
  });

  it("skips malformed members", () => {
    for (const bad of ["nope", "c:a\t1", "\t1\t1", "c:a\tx\t1", "c:a\t-1\t1", "c:a\t1.5\t1", "c:a\t1\tnot json", "c:a\t1\t2", "bad key\t1\t1"]) expect(parseMember(bad), bad).toBeNull();
    // Only the text memberOf writes counts: these read as numbers or JSON, but no writer here made them.
    for (const odd of ["c:a\t1e3\t1", "c:a\t01\t1", "c:a\t\t1", "c:a\t+1\t1", "c:a\t1\t 1", 'x:o\t1\t{"a": 1}']) expect(parseMember(odd), odd).toBeNull();
  });

  it("reads each key's winner back from all its members, in any order", () => {
    const members = [memberOf("c:a", 10, 1), memberOf("c:a", 12, 0), memberOf("c:b", 11, 1), memberOf("ceiling", 5, 2), memberOf("ceiling", 5, 3), "junk"];
    const expected = { "c:a": [12, 0], "c:b": [11, 1], ceiling: [5, 3] };
    expect(winners(members)).toEqual(expected);
    expect(winners([...members].reverse())).toEqual(expected);
  });

  it("agrees with merge on the same entries", () => {
    const a: Entries = { "c:a": [10, 1], ceiling: [3, 2] };
    const b: Entries = { "c:a": [10, 0], ceiling: [4, 1], spoilers: [1, true] };
    const members = [a, b].flatMap((set) => Object.entries(set).map(([key, [at, value]]) => memberOf(key, at, value)));
    expect(winners(members)).toEqual(merge(a, b));
  });
});

describe("settling what a device sends", () => {
  const m = (key: string, at: number, value: Entry[1]) => memberOf(key, at, value);

  it("adds a change that wins, and not one that loses or is already there", () => {
    const stored = [m("c:a", 10, 1), m("c:b", 10, 1)];
    const { entries, add, drop } = settle(stored, { "c:a": [12, 0], "c:b": [5, 0], "c:c": [3, 1] });
    expect(entries).toEqual({ "c:a": [12, 0], "c:b": [10, 1], "c:c": [3, 1] });
    expect(add).toEqual([[12, m("c:a", 12, 0)], [3, m("c:c", 3, 1)]]);
    expect(drop).toEqual([m("c:a", 10, 1)]);
    expect(settle(stored, { "c:a": [10, 1] }).add).toEqual([]);
  });

  it("removes the members that lost, the loser of a tie included", () => {
    const { entries, add, drop } = settle([m("ceiling", 5, 2), m("ceiling", 5, 3), m("c:a", 1, 1)], {});
    expect(entries).toEqual({ ceiling: [5, 3], "c:a": [1, 1] });
    expect(add).toEqual([]);
    expect(drop).toEqual([m("ceiling", 5, 2)]);
  });

  it("leaves a member it can't read alone, so tightening a check can't delete what was stored under the old one", () => {
    const { entries, add, drop } = settle(["junk", "c:a\t1e3\t1", "c:a\t5\t0"], {});
    expect(entries).toEqual({ "c:a": [5, 0] });
    expect(add).toEqual([]);
    expect(drop).toEqual([]);
  });

  it("changes nothing when the same push is settled again", () => {
    const first = settle([], { "c:a": [5, 1], ceiling: [5, 3] });
    const held = first.add.map(([, member]) => member);
    expect(settle(held, { "c:a": [5, 1], ceiling: [5, 3] })).toMatchObject({ add: [], drop: [], entries: first.entries });
  });

  it("keeps the winners and the stored members in step over random pushes, one member a key", () => {
    const next = random(5);
    const pick = <T,>(items: T[]) => items[Math.floor(next() * items.length)];
    let held: string[] = [];
    let expected: Entries = {};
    for (let round = 0; round < 300; round++) {
      const pushed: Entries = {};
      for (let i = 0; i < 1 + Math.floor(next() * 5); i++) {
        const key = pick(["c:a", "c:b", "c:c", "ceiling", "spoilers", "x:n"]);
        const value = key.startsWith("c:") ? pick([0, 1]) : key === "spoilers" ? pick([true, false]) : pick([1, 2, 3]);
        pushed[key] = [Math.floor(next() * 40), value];
      }
      const settled = settle(held, pushed);
      expected = merge(expected, pushed);
      expect(settled.entries).toEqual(expected);
      held = [...held.filter((member) => !settled.drop.includes(member)), ...settled.add.map(([, member]) => member)];
      expect(winners(held)).toEqual(expected);
      expect(held).toHaveLength(Object.keys(expected).length);
    }
  });

  it("can't take a later change with it, however two devices' settling interleaves", () => {
    const stored = [m("c:a", 5, 1)];
    const one = settle(stored, { "c:a": [6, 0] });
    const two = settle(stored, { "c:a": [7, 1] });
    const apply = (...settled: typeof one[]) => {
      const held = new Set(stored);
      for (const { add, drop } of settled) {
        for (const [, member] of add) held.add(member);
        for (const member of drop) held.delete(member);
      }
      return winners(held);
    };
    expect(apply(one, two)).toEqual({ "c:a": [7, 1] });
    expect(apply(two, one)).toEqual({ "c:a": [7, 1] });
    // And an old copy of a dropped member pushed in the meantime still loses.
    const old = settle(stored, { "c:a": [5, 1] });
    expect(old.add).toEqual([]);
    expect(apply(one, old)).toEqual({ "c:a": [6, 0] });
  });
});

describe("the clock", () => {
  it("never goes backwards, even when the wall clock does", () => {
    const clock: Clock = { last: 0, offset: 0 };
    const first = stamp(clock, 1000);
    expect(stamp(clock, 900)).toBeGreaterThan(first);
    expect(stamp(clock, 900)).toBeGreaterThan(first + 1);
    expect(stamp({ last: 0, offset: 0 }, 1000.7)).toBe(1000);
  });

  it("puts a change made after seeing another above it, whatever the device's own clock says", () => {
    const slow: Clock = { last: 0, offset: 0 };
    const seen: Entries = { "c:a": [50_000, 1] };
    observe(slow, seen);
    const untick = stamp(slow, 1000);
    expect(untick).toBeGreaterThan(50_000);
    expect(merge(seen, { "c:a": [untick, 0] })["c:a"]).toEqual([untick, 0]);
  });

  it("applies the offset to the wall clock", () => {
    expect(stamp({ last: 0, offset: 5000 }, 1000)).toBe(6000);
    expect(stamp({ last: 0, offset: -500 }, 1000)).toBe(500);
  });

  it("only notes stamps above what it has", () => {
    const clock: Clock = { last: 100, offset: 0 };
    observe(clock, { "c:a": [50, 1] });
    expect(clock.last).toBe(100);
    observe(clock, { "c:a": [150, 1] });
    expect(clock.last).toBe(150);
  });

  it("reads the offset from a round trip and ignores a couple of seconds", () => {
    expect(offsetFrom(10_000, 1000, 1200)).toBe(8900);
    expect(offsetFrom(1_100, 1000, 1200)).toBe(0);
    expect(offsetFrom(1_000 + 2000, 1000, 1000)).toBe(0);
    expect(offsetFrom(1_000 + 2001, 1000, 1000)).toBe(2001);
    expect(offsetFrom(0, 5000, 5000)).toBe(-5000);
  });
});
