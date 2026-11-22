import { CHAPTER_COUNT, allRows } from "../guide";
import { STORAGE_KEY, defaultState } from "../progress-state";
import { useProgress } from "../store/progress";
import { Browser, makeWorld, pair } from "../test/sync-world";
import { askAfterFirstTick } from "../persistence";
import { flushOnExit, syncOnce } from "./cycle";
import { readRecord, SYNC_KEY, writeRecord } from "./local";

const [r1, r2, r3, r4] = allRows.map((row) => row.id);
const checks = () => Object.keys(useProgress.getState().data.checks).sort();
const sorted = (...ids: string[]) => ids.sort();

let world: ReturnType<typeof makeWorld>;
let a: Browser;
let b: Browser;

beforeEach(() => {
  vi.useFakeTimers({ now: Date.UTC(2026, 10, 15, 12, 0, 0), toFake: ["Date"] });
  localStorage.clear();
  useProgress.setState({ data: defaultState(), storageError: false });
  world = makeWorld();
  a = new Browser(world);
  b = new Browser(world);
});

afterEach(() => {
  vi.useRealTimers();
});

const tick = (browser: Browser, ids: string[], checked = true) => browser.run(() => useProgress.getState().setMany(ids, checked));
const sync = (browser: Browser) => browser.run(() => syncOnce());
const checked = (browser: Browser) => browser.run(checks);
const later = (ms = 5000) => vi.setSystemTime(Date.now() + ms);

describe("a device that was never linked", () => {
  it("makes no request and writes nothing for sync, however much it changes", async () => {
    await tick(a, [r1, r2]);
    expect(await a.run(() => syncOnce())).toEqual({ kind: "off" });
    expect(a.calls).toEqual([]);
    expect(await a.run(() => localStorage.getItem(SYNC_KEY))).toBeNull();
  });
});

describe("linking two devices", () => {
  it("merges what each has, and unticks nothing", async () => {
    await tick(a, [r1, r2]);
    await tick(b, [r3]);
    await pair(a, b);
    expect(await sync(a)).toMatchObject({ kind: "ok", dirty: false });
    later();
    expect(await sync(b)).toMatchObject({ kind: "ok", dirty: false });
    later();
    await sync(a);
    expect(await checked(a)).toEqual(sorted(r1, r2, r3));
    expect(await checked(b)).toEqual(sorted(r1, r2, r3));
  });

  it("keeps a row ticked here that the group had unticked before", async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    later();
    await tick(a, [r1], false);
    await sync(a);
    // b ticked r1 before it ever linked: its tick is the newest thing there is, and joining must not undo it
    later();
    await tick(b, [r1]);
    later();
    await sync(b);
    expect(await checked(b)).toEqual([r1]);
    later();
    await sync(a);
    expect(await checked(a)).toEqual([r1]);
  });

  it("takes the higher ceiling of the two, and never hides what one of them has revealed", async () => {
    const [low, high] = [1 + Math.max(1, Math.floor(CHAPTER_COUNT / 3)), 1 + Math.max(2, Math.floor(CHAPTER_COUNT / 2))];
    await a.run(() => useProgress.getState().saveSettings({ spoilers: true, ceiling: low }));
    await b.run(() => useProgress.getState().saveSettings({ spoilers: true, ceiling: high }));
    await pair(a, b);
    await sync(a);
    later();
    await sync(b);
    later();
    await sync(a);
    const ceilings = [await a.run(() => useProgress.getState().data.ceiling), await b.run(() => useProgress.getState().data.ceiling)];
    expect(ceilings).toEqual([high, high]);
  });

  it("leaves a fresh device's defaults out, so it can't pull the group back to chapter 1", async () => {
    await a.run(() => useProgress.getState().saveSettings({ spoilers: true, ceiling: Math.min(3, CHAPTER_COUNT) }));
    await pair(a, b);
    await sync(a);
    later();
    await sync(b);
    expect(await b.run(() => useProgress.getState().data.ceiling)).toBe(Math.min(3, CHAPTER_COUNT));
  });
});

describe("a linked pair", () => {
  beforeEach(async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    later();
    await sync(b);
    later();
  });

  it("carries a tick one way and an untick back", async () => {
    await tick(a, [r2]);
    await sync(a);
    later();
    await sync(b);
    expect(await checked(b)).toEqual(sorted(r1, r2));
    later();
    await tick(b, [r1], false);
    await sync(b);
    later();
    await sync(a);
    expect(await checked(a)).toEqual([r2]);
  });

  it("keeps ticks made on both while apart", async () => {
    await tick(a, [r2]);
    await tick(b, [r3]);
    await sync(a);
    later();
    await sync(b);
    later();
    await sync(a);
    expect(await checked(a)).toEqual(sorted(r1, r2, r3));
    expect(await checked(b)).toEqual(sorted(r1, r2, r3));
  });

  it("lets the later change win when both touch the same row", async () => {
    await tick(a, [r1], false);
    later();
    await tick(b, [r1], false);
    later();
    await tick(b, [r1], true);
    await sync(b);
    later();
    await sync(a);
    expect(await checked(a)).toEqual([r1]);
  });

  it("applies what it pulls without sending it back", async () => {
    await tick(a, [r4]);
    await sync(a);
    later();
    b.calls = [];
    await sync(b);
    expect(await checked(b)).toContain(r4);
    expect((await b.run(() => readRecord()))?.dirty).toEqual([]);
    later();
    await sync(b);
    expect(b.calls.every((call) => Object.keys(call.body.entries as object).length === 0)).toBe(true);
  });

  it("keeps a newer build's key waiting for that build's tab, sends what it can, and isn't left waiting on it", async () => {
    // Another tab of the guide, on a newer build, marked a kind of key this build doesn't know to send. The API here doesn't take it
    // either, and one key it doesn't take refuses the whole push: sending it from here would hold back every tick.
    await a.run(() => {
      const record = readRecord()!;
      record.entries[`n:${r2}`] = [Date.now(), r3];
      record.dirty.push(`n:${r2}`);
      writeRecord(record);
    });
    await tick(a, [r2]);
    a.calls = [];
    expect(await sync(a)).toMatchObject({ kind: "ok", dirty: false });
    const sent = a.calls.flatMap((call) => Object.keys((call.body.entries ?? {}) as object));
    expect(sent).toContain(`c:${r2}`);
    expect(sent).not.toContain(`n:${r2}`);
    const record = await a.run(() => readRecord());
    expect(record?.entries[`n:${r2}`]).toEqual([expect.any(Number), r3]);
    expect(record?.dirty).toEqual([`n:${r2}`]);
    later();
    await sync(b);
    expect(await checked(b)).toEqual(sorted(r1, r2));
  });

  it("sends a change made while a request is out in the same cycle, and loses nothing", async () => {
    await tick(a, [r2]);
    await a.run(async () => {
      const real = a.fetch;
      let first = true;
      vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
        // the page changes again while the first request is out
        if (first) useProgress.getState().setCheck(r3, true);
        first = false;
        return real(input, init);
      });
      expect(await syncOnce()).toMatchObject({ kind: "ok", dirty: false });
      expect(readRecord()?.dirty).toEqual([]);
    });
    later();
    await sync(b);
    expect(await checked(b)).toEqual(sorted(r1, r2, r3));
  });
});

describe("when the service is not there", () => {
  beforeEach(async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    later();
  });

  it("keeps the change and says what kind of trouble it is", async () => {
    await tick(a, [r2]);
    a.fail = () => new TypeError("fetch failed");
    expect(await sync(a)).toEqual({ kind: "retry", why: "offline" });
    a.fail = () => new Response(JSON.stringify({ error: "limit" }), { status: 429 });
    expect(await sync(a)).toEqual({ kind: "retry", why: "paused" });
    a.fail = () => new Response("oops", { status: 502 });
    expect(await sync(a)).toEqual({ kind: "retry", why: "error" });
    expect((await a.run(() => readRecord()))?.dirty).toEqual([`c:${r2}`]);
    expect(await checked(a)).toEqual(sorted(r1, r2));
    a.fail = null;
    expect(await sync(a)).toMatchObject({ kind: "ok", dirty: false });
    later();
    await sync(b);
    expect(await checked(b)).toEqual(sorted(r1, r2));
  });

  it("unlinks only on the server's own unlinked, and keeps progress when it does", async () => {
    a.fail = () => new Response(JSON.stringify({ error: "server" }), { status: 401 });
    expect(await sync(a)).toEqual({ kind: "retry", why: "error" });
    expect(await a.run(() => readRecord())).not.toBeNull();
    a.fail = () => new Response(JSON.stringify({ error: "unlinked" }), { status: 401 });
    expect(await sync(a)).toEqual({ kind: "unlinked" });
    expect(await a.run(() => readRecord())).toBeNull();
    expect(await checked(a)).toEqual([r1]);
  });

  it("drops its ledger when the link cookie is gone, and keeps progress", async () => {
    a.device.jar.delete("hundo_link");
    expect(await sync(a)).toEqual({ kind: "off" });
    expect(await a.run(() => readRecord())).toBeNull();
    expect(await checked(a)).toEqual([r1]);
  });

  it("is unlinked on the next sync of a device whose group was deleted", async () => {
    await b.run(async () => {
      const { forgetGroup } = await import("./pairing");
      expect(await forgetGroup()).toBe(true);
    });
    expect(await sync(a)).toEqual({ kind: "unlinked" });
    expect(await checked(a)).toEqual([r1]);
  });
});

describe("a device whose clock is far off", () => {
  it("still orders its changes after the ones it has seen", async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    later();
    await sync(b);
    // b's clock runs ten minutes slow: its untick is still after the tick it pulled
    vi.setSystemTime(Date.now() - 10 * 60_000);
    await tick(b, [r1], false);
    await sync(b);
    vi.setSystemTime(Date.now() + 10 * 60_000 + 5000);
    await sync(a);
    expect(await checked(a)).toEqual([]);
  });
});

describe("a device that moves to another group", () => {
  it("joins the new group afresh, so an untick from the old one can't untick what the new one has ticked", async () => {
    // the tablet ticked r1 in its group first; the phone ticked it and unticked it, later, in its own
    const tablet = new Browser(world);
    const tablet2 = new Browser(world);
    await tick(tablet, [r1]);
    await pair(tablet, tablet2);
    await sync(tablet);
    later(10_000);
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    later(10_000);
    await tick(a, [r1], false);
    await sync(a);
    later(10_000);
    // the phone types the tablet's code: the server moves it into the tablet's group
    const { startCode, claimCode } = await import("./pairing");
    const shown = await tablet.run(() => startCode());
    expect(shown.ok && shown.code).toBeTruthy();
    const claimed = await a.run(() => claimCode(shown.ok ? shown.code : ""));
    expect(claimed).toMatchObject({ ok: true, moved: true });
    later(5000);
    expect(await sync(a)).toMatchObject({ kind: "ok", dirty: false });
    later(5000);
    await sync(tablet);
    await sync(tablet2);
    expect(await checked(tablet)).toEqual([r1]);
    expect(await checked(tablet2)).toEqual([r1]);
    // the phone's own untick is gone from the new group's point of view, and it takes what the group has
    expect(await checked(a)).toEqual([r1]);
  });

  it("sends nothing as the page closes from a ledger of the old group", async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    await tick(a, [r2]);
    await a.run(() => {
      // the link cookie now names another group than the ledger does
      document.cookie = "hundo_link=another-group; path=/";
      a.calls = [];
      flushOnExit();
      expect(a.calls).toEqual([]);
    });
  });
});

describe("a first sync", () => {
  it("starts from what another tab has saved that this one hasn't heard of yet", async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await a.run(async () => {
      // another tab ticked r2 and saved it; this tab's memory hasn't caught up
      const data = useProgress.getState().data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, checks: { ...data.checks, [r2]: true } }));
      expect(await syncOnce()).toMatchObject({ kind: "ok" });
      expect(Object.keys(useProgress.getState().data.checks).sort()).toEqual(sorted(r1, r2));
    });
    later();
    await sync(b);
    expect(await checked(b)).toEqual(sorted(r1, r2));
  });

  it("applies nothing, and tries again afresh, when it can't save its ledger", async () => {
    await tick(b, [r3]);
    await pair(a, b);
    await sync(b);
    later();
    await a.run(async () => {
      const real = Storage.prototype.setItem;
      const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key: string, value: string) {
        if (key === SYNC_KEY) throw new Error("quota");
        return real.call(this, key, value);
      });
      expect(await syncOnce()).toEqual({ kind: "retry", why: "error" });
      expect(Object.keys(useProgress.getState().data.checks)).toEqual([]);
      setItem.mockRestore();
      expect(await syncOnce()).toMatchObject({ kind: "ok" });
      expect(Object.keys(useProgress.getState().data.checks)).toEqual([r3]);
    });
  });
});

describe("whether a round pulled anything", () => {
  it("says so when the group had something this device didn't, and not for a push or a quiet round", async () => {
    await tick(a, [r1]);
    await pair(a, b);
    // joining is a pull of everything the group has (here, for the first device, nothing)
    expect(await sync(a)).toMatchObject({ kind: "ok", pulled: true });
    later();
    expect(await sync(a)).toMatchObject({ kind: "ok", pulled: false });
    later();
    expect(await sync(b)).toMatchObject({ kind: "ok", pulled: true });
    later();
    expect(await sync(b)).toMatchObject({ kind: "ok", pulled: false });
    await tick(a, [r2]);
    later();
    expect(await sync(a)).toMatchObject({ kind: "ok", pulled: false });
    later();
    expect(await sync(b)).toMatchObject({ kind: "ok", pulled: true });
    later();
    expect(await sync(b)).toMatchObject({ kind: "ok", pulled: false });
  });
});

describe("what a pull must not do", () => {
  it("keeps progress this tab couldn't save, as storage that refused the save is behind it", async () => {
    await pair(a, b);
    await a.run(async () => {
      const data = useProgress.getState().data;
      // the last save failed: the tick is in memory only, and the warning shows
      useProgress.setState({ data: { ...data, checks: { [r2]: true } }, storageError: true });
      expect(await syncOnce()).toMatchObject({ kind: "ok" });
      expect(Object.keys(useProgress.getState().data.checks)).toEqual([r2]);
      expect(useProgress.getState().storageError).toBe(true);
    });
    later();
    await sync(b);
    expect(await checked(b)).toEqual([r2]);
  });

  it("is not a tick the reader made, so it doesn't start the request to keep storage", async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    later();
    const request = vi.fn();
    await b.run(async () => {
      const stop = askAfterFirstTick(request);
      expect(await syncOnce()).toMatchObject({ kind: "ok" });
      expect(Object.keys(useProgress.getState().data.checks)).toEqual([r1]);
      expect(request).not.toHaveBeenCalled();
      useProgress.getState().setCheck(r2, true);
      expect(request).toHaveBeenCalledTimes(1);
      stop();
    });
  });
});

describe("a poll with nothing to send", () => {
  /** What the page asked of /api/sync, from the call log. */
  const syncBodies = (browser: Browser) => browser.calls.filter((call) => call.path === "/api/sync").map((call) => call.body);

  beforeEach(async () => {
    await tick(a, [r1]);
    await pair(a, b);
    await sync(a);
    later();
    await sync(b);
    later();
    await sync(a);
    later();
  });

  it("asks only whether anything changed, with the revision it has, and costs the store two commands", async () => {
    a.calls = [];
    world.store.commands = 0;
    expect(await sync(a)).toMatchObject({ kind: "ok", dirty: false, pulled: false, devices: 2 });
    expect(syncBodies(a)).toEqual([{ p: 1, guide: expect.any(String), entries: {}, rev: expect.any(Number) }]);
    expect(world.store.commands).toBe(2);
  });

  it("writes nothing on this side when the answer is that nothing changed", async () => {
    await a.run(async () => {
      const setItem = vi.spyOn(Storage.prototype, "setItem");
      expect(await syncOnce()).toMatchObject({ kind: "ok", pulled: false });
      expect(setItem).not.toHaveBeenCalled();
      setItem.mockRestore();
    });
  });

  it("pulls in full, with a new revision, once the other device has changed something, and is quiet again after", async () => {
    await tick(b, [r2]);
    await sync(b);
    later();
    a.calls = [];
    expect(await sync(a)).toMatchObject({ kind: "ok", pulled: true });
    expect(await checked(a)).toEqual(sorted(r1, r2));
    later();
    expect(await sync(a)).toMatchObject({ kind: "ok", pulled: false });
    expect(syncBodies(a).map((body) => "rev" in body)).toEqual([true, true]);
    expect((await a.run(() => readRecord()))?.rev).toBe(2);
  });

  it("never takes a quiet answer for a push: what this device changed is sent in full", async () => {
    await tick(a, [r3]);
    a.calls = [];
    expect(await sync(a)).toMatchObject({ kind: "ok", dirty: false });
    expect(syncBodies(a)[0]).toMatchObject({ entries: { [`c:${r3}`]: [expect.any(Number), 1] } });
    expect(syncBodies(a)[0]).not.toHaveProperty("rev");
    later();
    await sync(b);
    expect(await checked(b)).toEqual(sorted(r1, r3));
  });

  it("is a full sync again every ten minutes, to refresh its last-seen and the device count, and when the daily touch is due", async () => {
    a.calls = [];
    vi.setSystemTime(Date.now() + 9 * 60_000);
    await sync(a);
    expect(syncBodies(a)[0]).toHaveProperty("rev");
    vi.setSystemTime(Date.now() + 2 * 60_000);
    await sync(a);
    expect(syncBodies(a)[1]).not.toHaveProperty("rev");
    expect(syncBodies(a)[1]).toMatchObject({ touch: false });
    vi.setSystemTime(Date.now() + 21 * 3_600_000);
    await sync(a);
    expect(syncBodies(a)[2]).toMatchObject({ touch: true });
    expect(syncBodies(a)[2]).not.toHaveProperty("rev");
  });

  it("goes on in full against a server that gives no revision", async () => {
    a.fail = () => new Response(JSON.stringify({ p: 1, entries: {}, devices: 2, now: Date.now() }), { status: 200 });
    await sync(a);
    expect((await a.run(() => readRecord()))?.rev).toBeNull();
    a.calls = [];
    await sync(a);
    expect(syncBodies(a)[0]).not.toHaveProperty("rev");
  });

  it("doesn't take an unchanged answer for another revision than the one asked about as an answer", async () => {
    a.fail = () => new Response(JSON.stringify({ p: 1, unchanged: true, rev: 999, now: Date.now() }), { status: 200 });
    // an answer that says unchanged for another revision than the one asked about isn't taken as one
    expect(await sync(a)).toEqual({ kind: "retry", why: "error" });
  });
});

describe("linking two devices that don't link in the same moment", () => {
  it("brings the device that typed the code what the other pushes a moment later, on its next round", async () => {
    await tick(a, [r1]);
    await tick(b, [r2]);
    // a shows the code and b types it: b joins at once, to a group that has nothing yet, and a only learns of the link a moment after
    await pair(a, b);
    expect(await sync(b)).toMatchObject({ kind: "ok", pulled: true });
    expect(await checked(b)).toEqual([r2]);
    later(3000);
    expect(await sync(a)).toMatchObject({ kind: "ok", pulled: true });
    expect(await checked(a)).toEqual(sorted(r1, r2));
    // b's next round, the follow-up, finds a's progress, with no reopening
    later(3000);
    expect(await sync(b)).toMatchObject({ kind: "ok", pulled: true });
    expect(await checked(b)).toEqual(sorted(r1, r2));
  });
});

describe("a device removed from the group by another", () => {
  it("is unlinked on its next call, keeps its progress, and the rest carry on", async () => {
    const { checkStatus, removeDevice } = await import("./pairing");
    await tick(a, [r1]);
    await tick(b, [r2]);
    await pair(a, b);
    await sync(a);
    later();
    await sync(b);
    later();
    // a looks for b in the list, by what the list says of it, and removes it
    const removal = await a.run(async () => {
      const list = await checkStatus();
      const other = list.ok ? list.devices.find((device) => !device.self) : undefined;
      return { other, result: other?.id ? await removeDevice(other.id) : "none" };
    });
    expect(removal.result).toBe("removed");
    later();
    expect(await sync(b)).toEqual({ kind: "unlinked" });
    expect(await b.run(() => readRecord())).toBeNull();
    expect(await checked(b)).toEqual(sorted(r1, r2));
    // a is unaffected, and so is everything it has
    expect(await sync(a)).toMatchObject({ kind: "ok" });
    expect(await checked(a)).toEqual(sorted(r1, r2));
    const list = await a.run(() => checkStatus());
    expect(list.ok && list.devices).toHaveLength(1);
  });
});

