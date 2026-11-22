import { allRows, CHAPTER_COUNT } from "../guide";
import { STORAGE_KEY, defaultState } from "../progress-state";
import { reloadFromAnotherTab } from "../persistence";
import { useProgress } from "./progress";
import { SYNC_KEY, readRecord, writeRecord } from "../sync/local";

const [a, b, c] = allRows.map((row) => row.id);
const last = CHAPTER_COUNT;

beforeEach(() => {
  localStorage.clear();
  useProgress.setState({ data: defaultState(), storageError: false });
});

describe("progress store", () => {
  it("restores only the given ids to their earlier state", () => {
    useProgress.getState().setMany([a, b], true);
    const before = { ...useProgress.getState().data.checks };
    useProgress.getState().setMany([b, c], false);
    useProgress.getState().setCheck(c, true);
    useProgress.getState().restore([b, c], before);
    expect(useProgress.getState().data.checks).toEqual({ [a]: true, [b]: true });
  });

  it("reveals up to a chapter and never lowers the ceiling", () => {
    useProgress.getState().reveal(last);
    useProgress.getState().reveal(2);
    expect(useProgress.getState().data).toMatchObject({ ceiling: last, chapter: 2 });
  });

  it("moves back to the ceiling when spoiler protection hides the open chapter", () => {
    useProgress.getState().reveal(last);
    useProgress.getState().saveSettings({ spoilers: true, ceiling: 2 });
    expect(useProgress.getState().data).toMatchObject({ ceiling: 2, chapter: 2, spoilers: true });
    useProgress.getState().saveSettings({ spoilers: true, ceiling: 99 });
    expect(useProgress.getState().data.ceiling).toBe(1);
  });

  it("keeps working in memory and flags it when storage refuses to save", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    useProgress.getState().setCheck(a, true);
    expect(useProgress.getState()).toMatchObject({ storageError: true, data: { checks: { [a]: true } } });
    setItem.mockRestore();
  });

  it("falls back to a fresh state and flags it when the saved progress is unreadable", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    useProgress.getState().reloadFromStorage();
    expect(useProgress.getState()).toMatchObject({ storageError: true, data: defaultState() });
  });
});

describe("a save from a newer build", () => {
  /** What a tab on a newer build saved: a higher version, a field, a tick on a row this build doesn't have, a key in the extra. */
  const newer = () => ({
    ...defaultState(),
    version: 4,
    checks: { [a]: true, "row-from-a-newer-build": true },
    notes: { [b]: a },
    extra: { ...(defaultState().extra ?? {}), addedByANewerBuild: 7 },
  });
  const stored = () => JSON.parse(localStorage.getItem(STORAGE_KEY)!);

  it("loads it, and keeps all of it through this build's own changes", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newer()));
    useProgress.getState().reloadFromStorage();
    expect(useProgress.getState()).toMatchObject({ storageError: false, data: { checks: { [a]: true } } });
    useProgress.getState().setCheck(b, true);
    useProgress.getState().visitChapter(last);
    useProgress.getState().saveSettings({ spoilers: false, ceiling: last });
    expect(stored()).toEqual({ ...newer(), checks: { ...newer().checks, [b]: true }, chapter: last, ceiling: last, spoilers: false });
  });

  it("keeps it when another tab saves it while this one is open, and this one ticks after", () => {
    useProgress.getState().setCheck(c, true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newer()));
    reloadFromAnotherTab();
    useProgress.getState().setCheck(b, true);
    expect(stored()).toEqual({ ...newer(), checks: { ...newer().checks, [b]: true } });
  });

  it("goes back whole with an Undo, as an Undo restores only the rows it names", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newer()));
    useProgress.getState().reloadFromStorage();
    const before = { ...useProgress.getState().data.checks };
    useProgress.getState().setMany([a, b], false);
    useProgress.getState().restore([a, b], before);
    expect(stored()).toEqual(newer());
  });
});

describe("sync stamping", () => {
  const linked = () => writeRecord({ v: 1, group: "g", entries: {}, dirty: [], clock: { last: 0, offset: 0 }, touched: 0, rev: null, fullAt: 0, devices: 1 });

  it("writes nothing for sync while the device isn't linked", () => {
    useProgress.getState().setCheck(a, true);
    useProgress.getState().saveSettings({ spoilers: false, ceiling: last });
    expect(localStorage.getItem(SYNC_KEY)).toBeNull();
  });

  it("stamps what a change touches, and marks it to send, once the device is linked", () => {
    linked();
    useProgress.getState().setMany([a, b], true);
    useProgress.getState().setCheck(b, false);
    const record = readRecord();
    expect(record?.dirty.sort()).toEqual([`c:${a}`, `c:${b}`].sort());
    expect(record?.entries[`c:${a}`][1]).toBe(1);
    expect(record?.entries[`c:${b}`][1]).toBe(0);
    expect(record!.entries[`c:${b}`][0]).toBeGreaterThan(record!.entries[`c:${a}`][0]);
  });

  it("stamps a setting and a chapter, and an import", () => {
    linked();
    useProgress.getState().reveal(2);
    useProgress.getState().replaceAll({ ...defaultState(), checks: { [c]: true }, ceiling: 2, chapter: 2 });
    const record = readRecord();
    expect(record?.entries).toMatchObject({ ceiling: [expect.any(Number), 2], chapter: [expect.any(Number), 2], [`c:${c}`]: [expect.any(Number), 1] });
  });

  it("leaves the ledger alone when a change changes nothing", () => {
    linked();
    useProgress.getState().visitChapter(1);
    useProgress.getState().setCheck(a, false);
    expect(readRecord()?.dirty).toEqual([]);
  });

  it("doesn't stamp what sync applies, or what another tab saved", () => {
    linked();
    useProgress.getState().applySynced({ ...defaultState(), checks: { [a]: true }, ceiling: 2 });
    expect(useProgress.getState().data.checks).toEqual({ [a]: true });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).checks).toEqual({ [a]: true });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...defaultState(), checks: { [b]: true } }));
    useProgress.getState().reloadFromStorage();
    expect(useProgress.getState().data.checks).toEqual({ [b]: true });
    expect(readRecord()).toMatchObject({ entries: {}, dirty: [] });
  });

  it("saves the progress before it writes the ledger", () => {
    linked();
    const order: string[] = [];
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key: string) {
      order.push(key);
    });
    useProgress.getState().setCheck(a, true);
    setItem.mockRestore();
    expect(order).toEqual([STORAGE_KEY, SYNC_KEY]);
  });
});
