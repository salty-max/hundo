import { dropRecord, readHint, readRecord, sendable, SYNC_KEY, writeRecord, type SyncRecord } from "./local";

const record: SyncRecord = { v: 1, group: "abc", entries: { ceiling: [5, 2], "c:heart-well": [6, 1] }, dirty: ["ceiling"], clock: { last: 6, offset: -3000 }, touched: 9, rev: 4, fullAt: 8, devices: 3 };

beforeEach(() => {
  localStorage.clear();
  document.cookie = "hundo_link=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
});

describe("the saved ledger", () => {
  it("reads back what was written, under the guide's own key", () => {
    expect(SYNC_KEY).toMatch(/\.sync$/);
    expect(writeRecord(record)).toBe(true);
    expect(readRecord()).toEqual(record);
    dropRecord();
    expect(readRecord()).toBeNull();
  });

  it("starts over rather than trust what it can't read, and keeps what it can", () => {
    for (const bad of ["{nope", "null", "[]", ...[0, 1.5, "1"].map((v) => JSON.stringify({ ...record, v })), JSON.stringify({ ...record, group: 3 })]) {
      localStorage.setItem(SYNC_KEY, bad);
      expect(readRecord(), bad).toBeNull();
    }
    localStorage.setItem(SYNC_KEY, JSON.stringify({ ...record, entries: { ...record.entries, "c:Bad Key": [1, 1], ceiling: [-1, 2], chapter: [1, "x"] }, dirty: ["ceiling", "gone"], clock: { last: "x" } }));
    expect(readRecord()).toMatchObject({ entries: { "c:heart-well": [6, 1] }, dirty: [], clock: { last: 0, offset: 0 } });
  });

  it("keeps what a newer build wrote: a kind of key it doesn't know and its mark to send, a higher v, and fields it doesn't read", () => {
    const newer = { ...record, v: 2, later: { kept: true }, entries: { ...record.entries, "l:heart-well": [7, "shield"], spare: [7, 1] }, dirty: ["ceiling", "l:heart-well"] };
    localStorage.setItem(SYNC_KEY, JSON.stringify(newer));
    const read = readRecord()!;
    expect(read).toEqual(newer);
    expect(sendable(read)).toEqual(["ceiling"]);
    writeRecord(read);
    expect(JSON.parse(localStorage.getItem(SYNC_KEY)!)).toEqual(newer);
  });

  it("drops a key of a kind it knows that breaks that kind's rules, and a newer one that isn't well formed", () => {
    const entries = { "c:UPPER": [1, 1], "x:leaf": [1, "x".repeat(300)], "l:has space": [1, 1], "L:shout": [1, 1], "l:big": [1, "x".repeat(300)], "l:tab\t": [1, 1], constructor: [1, 1], toString: [1, 1] };
    localStorage.setItem(SYNC_KEY, JSON.stringify({ ...record, entries: { ...record.entries, ...entries } }).replace(/^\{/, '{"__proto__":{"polluted":1},'));
    expect(readRecord()?.entries).toEqual(record.entries);
    expect(Object.hasOwn(readRecord()!, "__proto__")).toBe(false);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it("reads a ledger saved before revisions as one with no revision to go by, and refuses a revision that isn't a whole number", () => {
    const { rev, fullAt, devices, ...old } = record;
    void [rev, fullAt, devices];
    localStorage.setItem(SYNC_KEY, JSON.stringify(old));
    expect(readRecord()).toMatchObject({ rev: null, fullAt: 0, devices: 1 });
    for (const bad of ["3", -1, 1.5, null, Number.MAX_SAFE_INTEGER + 2]) {
      localStorage.setItem(SYNC_KEY, JSON.stringify({ ...record, rev: bad, devices: 0 }));
      expect(readRecord(), JSON.stringify(bad)).toMatchObject({ rev: null, devices: 1 });
    }
  });

  it("says no when storage refuses", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(writeRecord(record)).toBe(false);
    setItem.mockRestore();
  });
});

describe("the link cookie", () => {
  it("is the fingerprint when it is set, and empty when it isn't or isn't one", () => {
    expect(readHint()).toBe("");
    document.cookie = "hundo_link=aB3-_xyz09; path=/";
    expect(readHint()).toBe("aB3-_xyz09");
    document.cookie = "hundo_link=has spaces!; path=/";
    expect(readHint()).toBe("");
  });
});
