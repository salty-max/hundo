import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { GUIDES, handle, visitorOf } from "./app";
import { GUIDE, HOME, KOHOLINT, LOCAL, PREVIEW, RDR, World, link, random, type Device } from "./harness";
import { memberOf, merge, type Entries } from "./ledger";
import { StoreError } from "./store";

const KEEP = 400 * 86_400;
const line = (cookies: string[], name: string) => cookies.find((cookie) => cookie.startsWith(`${name}=`)) ?? "";
const groups = (world: World, ns = "prod") => world.store.keys().filter((name) => name.startsWith(`hs:${ns}:gd:`)).map((name) => name.split(":")[3]);
const keysOf = (world: World, group: string) => world.store.keys().filter((name) => name.includes(`:${group}`));
const NO_STORE = (headers: Headers) => {
  expect(headers.get("cache-control")).toBe("no-store");
  expect(headers.get("x-content-type-options")).toBe("nosniff");
};

describe("every request", () => {
  it("answers 404 for an unknown path and 405 for anything but POST, never cached", async () => {
    const world = new World();
    const get = (path: string) => handle(new Request(`https://api.hundo.quest${path}`, { method: "GET" }), world.deps);
    const nothing = await get("/api/nope");
    expect(nothing.status).toBe(404);
    NO_STORE(nothing.headers);
    const wrong = await get("/api/sync");
    expect(wrong.status).toBe(405);
    expect(wrong.headers.get("allow")).toBe("POST");
    NO_STORE(wrong.headers);
    for (const path of ["/api", "/", "/api/sync/", "/api/pair"]) expect((await get(path)).status, path).toBe(404);
  });

  it("answers only a page of the guides, by its Origin alone: on hundo.quest, one of the team's previews, or localhost", async () => {
    const world = new World();
    const d = world.device();
    const refused: [string, Parameters<Device["post"]>[2]][] = [
      ["no origin", { headers: { origin: "" } }],
      ["a stranger", { origin: "https://evil.example" }],
      ["a stranger lookalike", { origin: "https://koholint.hundo.quest.evil.example" }],
      ["the API's own host", { origin: "https://api.hundo.quest" }],
      ["the landing page, for anything but the summaries", { origin: HOME }],
      ["plain http on hundo.quest", { origin: "http://koholint.hundo.quest" }],
      ["a port on hundo.quest", { origin: "https://koholint.hundo.quest:8443" }],
      ["any other vercel.app", { origin: "https://evil.vercel.app" }],
      ["a vercel.app that isn't the team's", { origin: "https://hundo-koholint.vercel.app" }],
      ["a lookalike of a preview", { origin: "https://hundo-koholint-jellycat.vercel.app.evil.example" }],
      ["a preview on plain http", { origin: "http://hundo-koholint-2b16reepd-jellycat.vercel.app" }],
      ["a preview on a port", { origin: "https://hundo-koholint-2b16reepd-jellycat.vercel.app:8443" }],
      ["not a url", { headers: { origin: "null" } }],
    ];
    for (const [name, options] of refused) {
      const reply = await d.status(options);
      expect(reply.status, name).toBe(403);
      NO_STORE(reply.headers);
    }
    // nothing refused for its Origin touched the store
    expect(world.store.commands).toBe(0);
    for (const origin of [KOHOLINT, RDR, "https://reddead.hundo.quest", PREVIEW, "https://hundo-koholint-2b16reepd-jellycat.vercel.app", "https://hundo-rdr-git-feat-sync-client-jellycat.vercel.app"]) {
      expect((await d.status({ origin })).status, origin).not.toBe(403);
    }
    expect((await d.status({ origin: LOCAL, direct: true })).status).not.toBe(403);
    expect((await d.status({ origin: "http://127.0.0.1:5173", direct: true })).status).not.toBe(403);
  });

  it("lets the landing page read the summaries and nothing else, refused before the store", async () => {
    const world = new World();
    const { a } = await link(world);
    const commands = world.store.commands;
    for (const path of ["/api/pair/start", "/api/pair/claim", "/api/status", "/api/sync", "/api/unlink", "/api/remove", "/api/forget", "/api/count", "/api/summary"]) {
      expect((await a.post(path, { guide: GUIDE, summary: null, counts: { "v:tab": 1 } }, { origin: HOME })).status, path).toBe(403);
    }
    expect(world.store.commands).toBe(commands);
    expect((await a.summaries()).status).toBe(200);
    for (const origin of ["http://hundo.quest", "https://hundo.quest:8443", "https://www.hundo.quest.evil.example", "https://hundo.quest.evil.example"]) {
      expect((await a.summaries({ origin })).status, origin).toBe(403);
    }
  });

  it("doesn't need the host to say who is calling: behind a guide's rewrite it never names the guide", async () => {
    const d = new World().device();
    const behind = { headers: { host: "api.hundo.quest", "x-forwarded-host": "api.hundo.quest" } };
    expect((await d.status({ origin: KOHOLINT, ...behind })).status).toBe(401);
    expect((await d.status({ origin: PREVIEW, ...behind })).status).toBe(401);
    expect((await d.status({ origin: KOHOLINT, headers: { host: "somewhere.else", "x-forwarded-host": "evil.example" } })).status).toBe(401);
  });

  it("refuses a post a page of another site could make without a preflight, before it touches the store", async () => {
    const world = new World();
    const d = world.device();
    const simple = ["application/x-www-form-urlencoded", "multipart/form-data; boundary=x", "text/plain", "text/plain;charset=UTF-8", ""];
    for (const type of simple) {
      for (const path of ["/api/pair/start", "/api/pair/claim", "/api/sync", "/api/status", "/api/unlink", "/api/forget", "/api/summary", "/api/summaries"]) {
        const reply = await d.post(path, {}, { origin: KOHOLINT, headers: { "content-type": type }, raw: '{"p":1}' });
        expect(reply.status, `${path} as "${type}"`).toBe(400);
      }
    }
    expect(world.store.commands).toBe(0);
    // and what a JSON body needs is a preflight, which nothing here answers
    const preflight = await handle(new Request("https://api.hundo.quest/api/sync", { method: "OPTIONS", headers: { origin: KOHOLINT, "access-control-request-method": "POST", "access-control-request-headers": "content-type" } }), world.deps);
    expect(preflight.status).toBe(405);
    expect(preflight.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("wants a JSON object with protocol 1, of a sane size", async () => {
    const world = new World();
    const d = world.device();
    expect((await d.post("/api/status", {}, { headers: { "content-type": "text/plain" } })).status).toBe(400);
    expect((await d.post("/api/status", {}, { raw: "{not json" })).status).toBe(400);
    expect((await d.post("/api/status", {}, { raw: "[1]" })).status).toBe(400);
    expect((await d.post("/api/status", {}, { raw: "null" })).status).toBe(400);
    expect((await d.post("/api/status", {}, { raw: "{}" })).body).toEqual({ error: "protocol" });
    expect((await d.post("/api/status", {}, { raw: '{"p":2}' })).body).toEqual({ error: "protocol" });
    const big = await d.post("/api/status", {}, { raw: JSON.stringify({ p: 1, pad: "x".repeat(300_000) }) });
    expect(big.status).toBe(413);
    expect((await d.post("/api/status", {}, { headers: { "content-length": "999999" } })).status).toBe(413);
  });

  it("says 503 when the store is not set up, down or out of quota, and 500 for the unexpected", async () => {
    const d = new World().device();
    expect(await d.status({ deps: null })).toMatchObject({ status: 503, body: { error: "unconfigured" } });
    const down = new World({ store: { exec: async () => Promise.reject(new StoreError("max requests limit exceeded")) } }).device();
    expect(await down.show()).toMatchObject({ reply: { status: 503, body: { error: "store" } } });
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const broken = new World({ store: { exec: async () => Promise.reject(new Error("boom")) } }).device();
    expect((await broken.show()).reply).toMatchObject({ status: 500, body: { error: "server" } });
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });

  it("checks the origin before it looks at the store", async () => {
    const d = new World().device();
    expect((await d.status({ origin: "https://evil.example", deps: null })).status).toBe(403);
  });
});

describe("pairing", () => {
  it("links two devices that have no progress anywhere yet", async () => {
    const world = new World();
    const a = world.device();
    const b = world.device();
    const shown = await a.show();
    expect(shown.code).toMatch(/^\d{6}$/);
    expect(shown.reply.body).toMatchObject({ linked: false, expiresAt: world.clock.now + 600_000 });
    NO_STORE(shown.reply.headers);
    // The one showing the code waits as a pending device: its cookie, but no hint yet, so its other tabs don't try to sync.
    expect(shown.reply.cookies).toHaveLength(1);
    expect(shown.reply.cookies[0]).toContain("hundo_sync=");
    expect(shown.reply.cookies[0]).toContain("Max-Age=900");
    expect((await a.status()).body).toEqual({ linked: false, pending: true });

    const claimed = await b.claim(shown.code, "Chrome · Windows");
    expect(claimed).toMatchObject({ status: 200, body: { linked: true } });
    // The next poll of the first device carries its new cookies.
    const poll = await a.status();
    expect(poll.body).toMatchObject({ linked: true });
    expect(line(poll.cookies, "hundo_link")).not.toBe("");
    expect(a.jar.get("hundo_link")).toBe(b.jar.get("hundo_link"));
    const devices = (poll.body.devices as { label: string; self: boolean }[]).map(({ label, self }) => [label, self]);
    expect(devices.sort()).toEqual([["Chrome · Windows", false], ["Test device", true]]);
    expect(groups(world)).toHaveLength(1);
  });

  it("sets a secret device cookie and a readable hint, on the whole domain for a guide on hundo.quest", async () => {
    const { claimed } = await link(new World());
    const device = line(claimed.cookies, "hundo_sync");
    for (const part of ["HttpOnly", "Secure", "SameSite=Lax", "Path=/api", "Domain=hundo.quest", `Max-Age=${KEEP}`]) expect(device, part).toContain(part);
    expect(device.split(";")[0]).toMatch(/^hundo_sync=[A-Za-z0-9_-]{16}\.[A-Za-z0-9_-]{22}$/);
    const hint = line(claimed.cookies, "hundo_link");
    expect(hint).not.toContain("HttpOnly");
    expect(hint).toMatch(/Path=\/(;|$)/);
    for (const part of ["Secure", "SameSite=Lax", "Domain=hundo.quest", `Max-Age=${KEEP}`]) expect(hint, part).toContain(part);
    expect(hint.split(";")[0]).toMatch(/^hundo_link=[A-Za-z0-9_-]{10}$/);
  });

  it("keeps cookies to the host on a preview or localhost, and drops Secure only for plain http", async () => {
    const preview = line((await link(new World(), { origin: PREVIEW })).claimed.cookies, "hundo_sync");
    expect(preview).toContain("Secure");
    expect(preview).not.toContain("Domain=");
    expect(preview).toContain(`Max-Age=${7 * 86_400}`);
    const local = (await link(new World(), { origin: LOCAL, direct: true })).claimed.cookies;
    for (const name of ["hundo_sync", "hundo_link"]) {
      expect(line(local, name), name).not.toContain("Secure");
      expect(line(local, name), name).not.toContain("Domain=");
    }
  });

  it("stores a hash of each device's secret and never the secret, and the hint is not the group's id", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const dump = world.store.snapshot();
    for (const d of [a, b]) {
      const secret = d.jar.get("hundo_sync")!.split(".")[1];
      expect(dump).not.toContain(secret);
      expect(dump).toContain(createHash("sha256").update(secret).digest("hex"));
    }
    // The hint is a fingerprint of the group, not the group itself, and the secret cookie carries no group id either.
    const [group] = groups(world);
    expect(a.jar.get("hundo_link")).toBe(createHash("sha256").update(group).digest("base64url").slice(0, 10));
    for (const d of [a, b]) {
      expect(d.jar.get("hundo_link")).not.toBe(group);
      expect(d.jar.get("hundo_sync")).not.toContain(group);
    }
  });

  it("joins an unlinked device to a linked one's group, whichever shows the code", async () => {
    const world = new World();
    const { a, b } = await link(world);
    // A linked device shows, an unlinked one types.
    const c = world.device();
    const first = await a.show();
    expect(first.reply.body.linked).toBe(true);
    expect(first.reply.cookies).toEqual([]);
    expect((await c.claim(first.code)).status).toBe(200);
    // An unlinked device shows, a linked one types.
    const d = world.device();
    const second = await d.show();
    expect((await b.claim(second.code)).status).toBe(200);
    expect((await d.status()).body.linked).toBe(true);
    expect(groups(world)).toHaveLength(1);
    expect((await a.status()).body.devices).toHaveLength(4);
  });

  it("says so, and changes nothing, when both devices are already in one group", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const { code } = await a.show();
    expect((await b.claim(code)).body).toEqual({ linked: true, already: true });
    expect((await a.status()).body.devices).toHaveLength(2);
  });

  it("moves the typing device to the other's group when both are linked apart, and leaves the rest of its old group", async () => {
    const world = new World();
    const one = await link(world);
    const two = await link(world);
    await two.a.sync({ "c:mine": [5, 1] });
    const { code } = await one.a.show();
    const moved = await two.a.claim(code, "Moved");
    expect(moved.body).toEqual({ linked: true, moved: true });
    expect(two.a.jar.get("hundo_link")).toBe(one.a.jar.get("hundo_link"));
    expect((await one.a.status()).body.devices).toHaveLength(3);
    expect((await two.b.status()).body.devices).toHaveLength(1);
    // The old group's data stays for the device still in it.
    expect((await two.b.sync()).body.entries).toEqual({ "c:mine": [5, 1] });
  });

  it("deletes a group that its last device leaves by moving", async () => {
    const world = new World();
    const one = await link(world);
    await one.b.post("/api/unlink");
    await one.a.sync({ "c:x": [5, 1] });
    await one.a.summary({ percent: 4, chapter: 1 });
    const [lonely] = groups(world);
    expect(keysOf(world, lonely).some((name) => name.includes(":sm:"))).toBe(true);
    const two = await link(world);
    const { code } = await two.a.show();
    expect((await one.a.claim(code)).body).toMatchObject({ moved: true });
    expect(keysOf(world, lonely)).toEqual([]);
    expect((await two.b.status()).body.devices).toHaveLength(3);
  });

  it("keeps the waiting device's cookie alive as long as the waiting, through a second code", async () => {
    const world = new World();
    const a = world.device();
    const b = world.device();
    await a.show();
    world.advance(700_000);
    const second = await a.show();
    expect(second.reply.cookies[0]).toContain("Max-Age=900");
    // Past the first cookie's life, within the second's.
    world.advance(250_000);
    expect(a.jar.has("hundo_sync")).toBe(true);
    expect((await b.claim(second.code)).status).toBe(200);
    expect((await a.status()).body.linked).toBe(true);
  });

  it("puts at most twelve devices in a group", async () => {
    const world = new World();
    const { a, b } = await link(world);
    for (let i = 0; i < 10; i++) expect((await world.device().claim((await (i % 2 ? a : b).show()).code)).status, String(i)).toBe(200);
    expect((await a.status()).body.devices).toHaveLength(12);
    const extra = world.device();
    expect((await extra.claim((await a.show()).code)).body).toEqual({ error: "devices" });
    expect(extra.jar.has("hundo_sync")).toBe(false);
    // Nor can a waiting device join by a full group's member typing its code, nor a linked device move in.
    const waiting = world.device();
    expect((await a.claim((await waiting.show()).code)).body).toEqual({ error: "devices" });
    const elsewhere = await link(world);
    expect((await elsewhere.a.claim((await a.show()).code)).body).toEqual({ error: "devices" });
    expect((await elsewhere.a.status()).body.devices).toHaveLength(2);
    // A device already in the full group is still told it is in it.
    expect((await b.claim((await a.show()).code)).body).toEqual({ linked: true, already: true });
  });

  it("lets a device that went quiet for two months drop off, so abandoned browsers can't fill a group", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const ghosts = [];
    for (let i = 0; i < 10; i++) {
      const ghost = world.device();
      await ghost.claim((await (i % 2 ? a : b).show()).code);
      ghosts.push(ghost);
    }
    const late = world.device();
    expect((await late.claim((await a.show()).code)).status).toBe(409);
    // two months less a day: still listed, and still holding its place
    world.advance(59 * 86_400_000);
    await a.sync();
    expect((await a.status()).body.devices).toHaveLength(12);
    world.advance(2 * 86_400_000);
    await a.sync();
    // (only the one that synced is left in the list: the other linked device and the ghosts were quiet as long)
    expect((await a.status()).body.devices).toHaveLength(1);
    expect((await late.claim((await a.show()).code)).status).toBe(200);
    expect((await a.status()).body.devices).toHaveLength(2);
    expect((await world.store.exec([["HLEN", world.store.keys().find((name) => name.startsWith("hs:prod:gd:"))!]]))[0]).toBe(2);
    // They are gone for good, records and all: a lost phone that wakes up has to be linked again, and is cleared like one that unlinked.
    expect(world.store.keys().filter((name) => name.includes(":dv:")).length).toBe(2);
    const back = await ghosts[0].sync();
    expect(back.status).toBe(401);
    expect(back.body).toEqual({ error: "unlinked" });
    expect(line(back.cookies, "hundo_sync")).toContain("Max-Age=0");
    expect((await a.status()).body.devices).toHaveLength(2);
  });

  it("hears a quiet device that comes back before anyone has looked, and keeps it", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync();
    world.advance(61 * 86_400_000);
    // b is the first to call: it is heard before it is judged, and so is not dropped
    expect((await b.sync()).status).toBe(200);
    expect(((await b.status()).body.devices as { self: boolean }[]).filter((device) => device.self)).toHaveLength(1);
    // a, quiet as long, was the one that was dropped
    expect((await a.sync()).status).toBe(401);
    expect((await b.status()).body.devices).toHaveLength(1);
  });

  it("refuses a device claiming its own code", async () => {
    const a = new World().device();
    const { code } = await a.show();
    expect((await a.claim(code)).body).toEqual({ error: "code" });
  });

  it("gives a code once, for ten minutes", async () => {
    const world = new World();
    const { code } = await world.device().show();
    expect((await world.device().claim(code)).status).toBe(200);
    expect((await world.device().claim(code)).status).toBe(400);
    const late = await world.device().show();
    world.advance(599_000);
    expect((await world.store.exec([["GET", `hs:prod:pc:${late.code}`]]))[0]).not.toBeNull();
    world.advance(2000);
    expect((await world.device().claim(late.code)).status).toBe(400);
  });

  it("answers a wrong, expired, used or malformed code the same way", async () => {
    const world = new World();
    const { code } = await world.device().show();
    await world.device().claim(code);
    const replies = [code, "000000", "12345", "1234567", "abcdef", ""].map(async (value) => (await world.device().claim(value)).body);
    for (const body of await Promise.all(replies)) expect(body).toEqual({ error: "code" });
    expect((await world.device().post("/api/pair/claim", { code: 123456 })).body).toEqual({ error: "code" });
  });

  it("reads a code typed with spaces or dashes", async () => {
    const world = new World();
    const { code } = await world.device().show();
    expect((await world.device().claim(`${code.slice(0, 3)} ${code.slice(3)}`)).status).toBe(200);
    const next = await world.device().show();
    expect((await world.device().claim(`${next.code.slice(0, 3)}-${next.code.slice(3)}`)).status).toBe(200);
  });

  it("keeps a device's label short and free of control characters", async () => {
    const world = new World();
    const a = world.device();
    const b = world.device();
    const { code } = await a.show();
    await b.post("/api/pair/claim", { code, label: `A\tB\n${"x".repeat(100)}` });
    const labels = ((await a.status()).body.devices as { label: string }[]).map((device) => device.label);
    expect(labels.find((label) => label.startsWith("AB"))).toHaveLength(40);
    const c = world.device();
    const next = await world.device().show();
    await c.post("/api/pair/claim", { code: next.code, label: 7 });
    expect(((await c.status()).body.devices as { label: string }[]).some((device) => device.label === "Unknown device")).toBe(true);
  });
});

describe("limits on guessing", () => {
  it("allows ten codes an hour from one visitor", async () => {
    const world = new World();
    const d = world.device();
    for (let i = 0; i < 10; i++) expect((await d.show()).reply.status, String(i)).toBe(200);
    expect((await d.show()).reply.status).toBe(429);
    expect((await world.device().show()).reply.status).toBe(200);
    world.advance(2 * 3600_000);
    expect((await d.show()).reply.status).toBe(200);
  });

  it("allows ten tries in fifteen minutes from one visitor", async () => {
    const world = new World();
    const d = world.device();
    for (let i = 0; i < 10; i++) expect((await d.claim("000000")).status, String(i)).toBe(400);
    expect((await d.claim("000000")).status).toBe(429);
    const { code } = await world.device().show();
    expect((await d.claim(code)).status).toBe(429);
    expect((await world.device().claim(code)).status).toBe(200);
    world.advance(30 * 60_000);
    expect((await d.claim("000000")).status).toBe(400);
  });

  it("stops everyone's claims once 300 guesses have failed in ten minutes, and starts again after", async () => {
    const world = new World();
    world.clock.now = Date.UTC(2026, 10, 15, 12, 5, 0);
    const { code } = await world.device().show();
    for (let visitor = 0; visitor < 30; visitor++) {
      const d = world.device();
      for (let i = 0; i < 10; i++) await d.claim("000000");
    }
    expect((await world.device().claim(code)).status).toBe(429);
    world.advance(301_000);
    expect((await world.device().claim(code)).status).toBe(200);
  });

  it("keeps no counter, so no trace of a visitor's address, for longer than its window, an hour at most", async () => {
    const world = new World();
    const d = world.device("198.51.100.77");
    await d.show();
    await d.claim("000000");
    const counters = () => world.store.keys().filter((name) => name.includes(":rl:"));
    expect(counters().length).toBeGreaterThan(0);
    for (const name of counters()) expect(world.store.ttl(name), name).toBeLessThanOrEqual(3600);
    expect(world.store.snapshot()).not.toContain("198.51.100.77");
    world.advance(3601_000);
    expect(counters()).toEqual([]);
  });

  it("names a visitor by its IPv4 address or its IPv6 /64, in whatever form the address comes", () => {
    expect(visitorOf("203.0.113.9")).toBe("203.0.113.9");
    expect(visitorOf("::ffff:203.0.113.9")).toBe("203.0.113.9");
    expect(visitorOf("")).toBe("");
    const subnet = "2001:0db8:0000:0000";
    for (const address of ["2001:db8::1", "2001:db8::2:3", "2001:db8:0:0:ffff:ffff:ffff:ffff", "2001:DB8:0:0::9", "2001:db8::"]) expect(visitorOf(address), address).toBe(subnet);
    expect(visitorOf("2001:db8:1:2:3:4:5:6")).toBe("2001:0db8:0001:0002");
    expect(visitorOf("2001:db8:0:1::1")).not.toBe(subnet);
    expect(visitorOf("::1")).toBe("0000:0000:0000:0000");
    expect(visitorOf("1:2:3:4:5:6:7:8:9::")).toBeTypeOf("string");
  });

  it("counts the /64 of an IPv6 visitor as one", async () => {
    const world = new World();
    const d = (low: string) => world.device(`2001:db8:1:2:${low}`);
    for (let i = 0; i < 10; i++) await d(`${i}:0:0:1`).show();
    expect((await d("ffff:0:0:9").show()).reply.status).toBe(429);
    expect((await world.device("2001:db8:1:3::1").show()).reply.status).toBe(200);
  });
});

describe("sync", () => {
  it("answers 401, and clears the cookies, for a device that is not linked", async () => {
    const world = new World();
    const stranger = world.device();
    const reply = await stranger.sync();
    expect(reply).toMatchObject({ status: 401, body: { error: "unlinked" } });
    expect(line(reply.cookies, "hundo_sync")).toContain("Max-Age=0");
    expect(line(reply.cookies, "hundo_link")).toContain("Max-Age=0");
    // Nor can a device that is still waiting to be linked.
    const waiting = world.device();
    await waiting.show();
    expect((await waiting.sync()).status).toBe(401);
  });

  it("refuses a cookie with the wrong secret or an id that is gone", async () => {
    const world = new World();
    const { a } = await link(world);
    const [id] = a.jar.get("hundo_sync")!.split(".");
    a.jar.set("hundo_sync", `${id}.${"A".repeat(22)}`);
    expect((await a.sync()).status).toBe(401);
    a.jar.set("hundo_sync", `${"B".repeat(16)}.${"A".repeat(22)}`);
    expect((await a.sync()).status).toBe(401);
    a.jar.set("hundo_sync", "garbage");
    expect((await a.sync()).status).toBe(401);
  });

  it("keeps both devices' ticks, and the later of a tick and an untick", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync({ "c:one": [10, 1], ceiling: [10, 3] });
    const seen = await b.sync({ "c:two": [11, 1] });
    expect(seen.body.entries).toEqual({ "c:one": [10, 1], "c:two": [11, 1], ceiling: [10, 3] });
    await b.sync({ "c:one": [12, 0] });
    expect((await a.sync()).body.entries).toMatchObject({ "c:one": [12, 0], "c:two": [11, 1] });
    await a.sync({ "c:one": [13, 1] });
    expect((await b.sync()).body.entries).toMatchObject({ "c:one": [13, 1] });
  });

  it("carries a row set aside for later beside its tick, the later stamp winning, and refuses one that isn't a row id", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync({ "l:shop": [10, "shop"] });
    expect((await b.sync()).body.entries).toEqual({ "l:shop": [10, "shop"] });
    await b.sync({ "l:shop": [12, 0], "c:shop": [12, 1] });
    expect((await a.sync()).body.entries).toEqual({ "l:shop": [12, 0], "c:shop": [12, 1] });
    expect((await a.sync({ "l:shop": [13, "has space"] })).body).toEqual({ error: "entries" });
    expect((await a.sync({ "l:shop": [13, 1] })).body).toEqual({ error: "entries" });
  });

  it("settles a tie between devices the same way whichever pushes first", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync({ "c:t": [20, 0], spoilers: [20, false], ceiling: [20, 2] });
    await b.sync({ "c:t": [20, 1], spoilers: [20, true], ceiling: [20, 5] });
    expect((await a.sync()).body.entries).toEqual({ "c:t": [20, 1], spoilers: [20, true], ceiling: [20, 5] });
    const other = await link(world);
    await other.b.sync({ "c:t": [20, 1], spoilers: [20, true], ceiling: [20, 5] });
    await other.a.sync({ "c:t": [20, 0], spoilers: [20, false], ceiling: [20, 2] });
    expect((await other.a.sync()).body.entries).toEqual({ "c:t": [20, 1], spoilers: [20, true], ceiling: [20, 5] });
  });

  it("gives back the winner of each key, one entry a key", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "x:mode": [1, "normal"] });
    await a.sync({ "x:mode": [3, "hero"] });
    await a.sync({ "x:mode": [2, "normal"] });
    expect((await a.sync()).body.entries).toEqual({ "x:mode": [3, "hero"] });
  });

  it("ignores an old copy of a change, however late it turns up", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync({ "c:x": [10, 1] });
    await b.sync({ "c:x": [5, 1] });
    expect((await a.sync()).body.entries).toEqual({ "c:x": [10, 1] });
    // So an untick stamped between the two stays beaten by the later tick, however late the old copy turns up.
    await b.sync({ "c:x": [7, 0] });
    await b.sync({ "c:x": [5, 1] });
    expect((await a.sync()).body.entries).toEqual({ "c:x": [10, 1] });
  });

  it("keeps each guide's progress apart", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:row": [5, 1] });
    expect((await a.post("/api/sync", { guide: "red-dead-redemption" })).body.entries).toEqual({});
    expect((await a.post("/api/sync", { guide: GUIDE })).body.entries).toEqual({ "c:row": [5, 1] });
  });

  it("links every guide in a browser at once: the cookie covers the domain", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:row": [5, 1] });
    const reply = await a.post("/api/sync", { guide: "red-dead-redemption", entries: { "c:other": [6, 1] } }, { origin: RDR });
    expect(reply.status).toBe(200);
    expect((await a.post("/api/sync", { guide: "red-dead-redemption" }, { origin: RDR })).body.entries).toEqual({ "c:other": [6, 1] });
  });

  it("refuses a guide it does not know, and bad entries", async () => {
    const { a } = await link(new World());
    expect((await a.post("/api/sync", { guide: "nope", entries: {} })).body).toEqual({ error: "guide" });
    expect((await a.post("/api/sync", { entries: {} })).body).toEqual({ error: "guide" });
    expect((await a.post("/api/sync", { guide: GUIDE, entries: { "c:x": [1, 7] } })).body).toEqual({ error: "entries" });
    expect((await a.post("/api/sync", { guide: GUIDE, entries: [] })).body).toEqual({ error: "entries" });
    expect((await a.post("/api/sync", { guide: GUIDE, entries: { theme: [1, "dark"] } })).body).toEqual({ error: "entries" });
  });

  it("refuses a stamp more than a day ahead, tells the device the time, and stores nothing from the request", async () => {
    const world = new World();
    const { a } = await link(world);
    const now = world.clock.now;
    const refused = await a.sync({ "c:ok": [1, 1], "c:future": [now + 86_400_001, 1] });
    expect(refused).toMatchObject({ status: 400, body: { error: "clock", now } });
    expect((await a.sync()).body.entries).toEqual({});
    expect((await a.sync({ "c:future": [now + 86_400_000, 1] })).status).toBe(200);
  });

  it("holds a guide to 2,000 keys, and still serves a pull, and takes a change to a key it has", async () => {
    const world = new World();
    const { a } = await link(world);
    const rows = (from: number, to: number) => Object.fromEntries(Array.from({ length: to - from }, (_, i) => [`c:r${from + i}`, [1, 1]]));
    expect((await a.sync(rows(0, 1500))).status).toBe(200);
    expect((await a.sync(rows(1500, 2000))).status).toBe(200);
    expect((await a.sync({ "c:one-more": [1, 1] })).body).toEqual({ error: "full" });
    expect((await a.sync({ "c:r7": [2, 0] })).status).toBe(200);
    expect(Object.keys((await a.sync()).body.entries!)).toHaveLength(2000);
  });

  it("holds a guide's extra state to 60 leaves", async () => {
    const { a } = await link(new World());
    const leaves = (n: number) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`x:leaf${i}`, [1, i]]));
    expect((await a.sync(leaves(60))).status).toBe(200);
    expect((await a.sync({ "x:leaf60": [1, 60] })).body).toEqual({ error: "full" });
    expect((await a.sync({ "x:leaf3": [2, 99] })).status).toBe(200);
  });

  it("takes a full state again and again, and counts only keys that are new", async () => {
    const { a } = await link(new World());
    const rows = Object.fromEntries(Array.from({ length: 1400 }, (_, i) => [`c:r${i}`, [1, 1]]));
    for (let i = 0; i < 3; i++) expect((await a.sync(rows)).status, String(i)).toBe(200);
  });

  it("stays as big as its keys, however often they change", async () => {
    const world = new World();
    const { a, b } = await link(world);
    for (let deaths = 1; deaths <= 150; deaths++) await (deaths % 2 ? a : b).sync({ "x:runs.normal.deaths": [deaths, deaths], "c:row": [deaths, deaths % 2] });
    const set = world.store.keys().find((name) => name.startsWith("hs:prod:p:"))!;
    expect((await world.store.exec([["ZCARD", set]]))[0]).toBe(2);
    expect((await a.sync()).body.entries).toEqual({ "x:runs.normal.deaths": [150, 150], "c:row": [150, 0] });
  });

  it("pays no heed to a stamp lower than the one it holds, which a later change must beat", async () => {
    const { a } = await link(new World());
    await a.sync({ "c:x": [10, 1] });
    await a.sync({ "c:x": [20, 0] });
    await a.sync({ "c:x": [15, 1] });
    expect((await a.sync()).body.entries).toEqual({ "c:x": [20, 0] });
  });

  it("allows 120 syncs a minute from a device", async () => {
    const world = new World();
    const { a } = await link(world);
    for (let i = 0; i < 120; i++) expect((await a.sync()).status, String(i)).toBe(200);
    expect((await a.sync()).status).toBe(429);
    world.advance(60_000);
    expect((await a.sync()).status).toBe(200);
  });

  it("counts the devices in the group", async () => {
    const world = new World();
    const { a } = await link(world);
    expect((await a.sync()).body.devices).toBe(2);
    const c = world.device();
    await c.claim((await a.show()).code);
    expect((await a.sync()).body.devices).toBe(3);
    expect((await c.sync()).body.devices).toBe(3);
  });

  it("keeps a group for 400 days from its last sync, and a daily touch pushes that out", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    const ttl = (prefix: string) => world.store.ttl(world.store.keys().find((name) => name.startsWith(prefix))!);
    expect(ttl("hs:prod:p:")).toBe(KEEP);
    expect(ttl("hs:prod:gd:")).toBe(KEEP);
    expect(ttl("hs:prod:dv:")).toBe(KEEP);
    world.advance(100 * 86_400_000);
    expect(ttl("hs:prod:p:")).toBe(KEEP - 100 * 86_400);
    const touched = await a.sync({}, { touch: true });
    expect(touched.cookies.map((cookie) => cookie.split("=")[0]).sort()).toEqual(["hundo_link", "hundo_sync"]);
    for (const prefix of ["hs:prod:p:", "hs:prod:gd:", "hs:prod:dv:"]) expect(ttl(prefix), prefix).toBe(KEEP);
    expect((await a.sync()).cookies).toEqual([]);
  });

  it("forgets a preview's or a local build's data after a week", async () => {
    const world = new World();
    const { a } = await link(world, { origin: PREVIEW });
    await a.sync({ "c:x": [5, 1] }, {}, { origin: PREVIEW });
    for (const name of world.store.keys().filter((key) => /^hs:test:(p|gd|dv):/.test(key))) expect(world.store.ttl(name), name).toBeLessThanOrEqual(7 * 86_400);
    expect(world.store.keys().some((name) => name.startsWith("hs:prod:"))).toBe(false);
  });

  it("keeps preview and production apart", async () => {
    const world = new World();
    const prod = await link(world);
    const test = await link(world, { origin: PREVIEW });
    await prod.a.sync({ "c:prod": [5, 1] });
    await test.a.sync({ "c:test": [5, 1] }, {}, { origin: PREVIEW });
    expect((await prod.b.sync()).body.entries).toEqual({ "c:prod": [5, 1] });
    expect((await test.b.sync({}, {}, { origin: PREVIEW })).body.entries).toEqual({ "c:test": [5, 1] });
    // A preview cookie is host-only and never reaches a hundo.quest guide, and a production code is no good on a preview.
    const { code } = await prod.a.show();
    expect((await world.device().claim(code, "x", { origin: PREVIEW })).status).toBe(400);
  });

  it("gives the same state as merging everything the devices pushed", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const next = random(21);
    const pick = <T>(items: T[]) => items[Math.floor(next() * items.length)];
    const make = (): Entries => {
      const out: Entries = {};
      for (let i = 0; i < 1 + Math.floor(next() * 8); i++) {
        const key = pick(["c:r0", "c:r1", "c:r2", "c:r3", "ceiling", "spoilers", "chapter", "x:mode", "x:n"]);
        const value = key.startsWith("c:") ? pick([0, 1]) : key === "spoilers" ? pick([true, false]) : key === "x:mode" ? pick(["normal", "hero", null]) : pick([1, 2, 3]);
        out[key] = [Math.floor(next() * 6), value];
      }
      return out;
    };
    const pushed: Entries[] = [];
    for (let round = 0; round < 40; round++) {
      const entries = make();
      pushed.push(entries);
      await (next() < 0.5 ? a : b).sync(entries);
    }
    expect((await a.sync()).body.entries).toEqual(merge(...pushed));
    expect((await b.sync()).body.entries).toEqual(merge(...pushed));
  });

  it("loses nothing when devices push at the same time", async () => {
    const next = random(33);
    const world = new World({ between: async () => void (await new Promise((resolve) => setImmediate(resolve))) });
    const { a, b, c } = await (async () => {
      const { a, b } = await link(world);
      const c = world.device();
      await c.claim((await a.show()).code);
      return { a, b, c };
    })();
    const pick = <T>(items: T[]) => items[Math.floor(next() * items.length)];
    const pushed: Entries[] = [];
    for (let round = 0; round < 25; round++) {
      const batch = [a, b, c].map(() => ({ [pick(["c:r0", "c:r1", "c:r2"])]: [Math.floor(next() * 4), pick([0, 1])] as [number, number], [pick(["ceiling", "chapter"])]: [Math.floor(next() * 4), 1 + Math.floor(next() * 3)] as [number, number] }));
      pushed.push(...batch);
      const replies = await Promise.all([a, b, c].map((device, i) => device.sync(batch[i])));
      for (const reply of replies) expect(reply.status).toBe(200);
    }
    const expected = merge(...pushed);
    for (const device of [a, b, c]) expect((await device.sync()).body.entries).toEqual(expected);
  });

  it("gives each device its own 120 syncs a minute, whatever address it comes from", async () => {
    const world = new World();
    const a = world.device("198.51.100.1");
    const b = world.device("198.51.100.1");
    await b.claim((await a.show()).code);
    await a.status();
    for (let i = 0; i < 120; i++) expect((await a.sync()).status, String(i)).toBe(200);
    expect((await a.sync()).status).toBe(429);
    expect((await b.sync()).status).toBe(200);
  });

  it("clears what lost and still serves a pull when two devices together passed a cap, and refuses only new keys", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:seed": [5, 1] });
    const set = world.store.keys().find((name) => name.startsWith("hs:prod:p:"))!;
    // 62 leaves, over the 60 allowed: what two concurrent pushes that each stayed under could leave.
    await world.store.exec([["ZADD", set, ...Array.from({ length: 62 }, (_, i) => [1, memberOf(`x:leaf${i}`, 1, i)]).flat(), 1, memberOf("c:seed", 1, 0)]]);
    expect(Object.keys((await a.sync()).body.entries!)).toHaveLength(63);
    expect((await world.store.exec([["ZRANGE", set, 0, -1]]))[0]).not.toContain(memberOf("c:seed", 1, 0));
    await world.store.exec([["ZADD", set, 1, memberOf("c:seed", 2, 0)]]);
    expect((await a.sync({ "x:fresh": [3, 1] })).body).toEqual({ error: "full" });
    expect((await world.store.exec([["ZRANGE", set, 0, -1]]))[0]).not.toContain(memberOf("c:seed", 2, 0));
    expect((await a.sync({ "x:leaf3": [4, 99], "c:seed": [6, 1] })).status).toBe(200);
    expect((await a.sync()).body.entries).toMatchObject({ "x:leaf3": [4, 99], "c:seed": [6, 1] });
  });

  it("gives the device list an expiry even when a forget raced the sync that wrote it", async () => {
    const world = new World();
    const { a } = await link(world);
    const devices = world.store.keys().find((name) => name.startsWith("hs:prod:gd:"))!;
    await world.store.exec([["DEL", devices]]);
    expect((await a.sync()).status).toBe(200);
    expect(world.store.ttl(devices)).toBe(KEEP);
  });

  it("costs six store commands to pull, ten to push a new key and eleven to change one, with no revision to go by", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    const cost = async (entries: Record<string, [number, unknown]>) => {
      world.store.commands = 0;
      await a.sync(entries);
      return world.store.commands;
    };
    expect(await cost({})).toBe(6);
    expect(await cost({ "c:y": [6, 1] })).toBe(10);
    expect(await cost({ "c:y": [7, 0] })).toBe(11);
    expect(await cost({ "c:y": [1, 1] })).toBe(6);
  });
});

describe("a poll with a revision", () => {
  const poll = (device: Device, rev: unknown, extra: Record<string, unknown> = {}) => device.sync({}, { rev, ...extra });
  const commandsFor = async (world: World, run: () => Promise<unknown>) => {
    world.store.commands = 0;
    await run();
    return world.store.commands;
  };

  it("is answered from two store commands when nothing has changed, and says so", async () => {
    const world = new World();
    const { a } = await link(world);
    const first = await a.sync({ "c:x": [5, 1] });
    expect(first.body).toMatchObject({ entries: { "c:x": [5, 1] }, devices: 2, rev: 1 });
    for (let at = 0; at < 3; at++) {
      world.advance(90_000);
      let reply!: Awaited<ReturnType<typeof poll>>;
      expect(await commandsFor(world, async () => (reply = await poll(a, 1)))).toBe(2);
      expect(reply.status).toBe(200);
      expect(reply.body).toEqual({ p: 1, unchanged: true, rev: 1, now: world.clock.now });
      NO_STORE(reply.headers);
    }
  });

  it("changes nothing on the quiet path: no counter, no last-seen refresh, no expiry, no cookies", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    const keys = () => world.store.keys().sort();
    const data = () => keys().filter((name) => !name.includes(":rl:"));
    const seen = await world.store.exec([["HGETALL", keys().find((name) => name.includes(":gd:"))!]]);
    const before = data();
    const expiries = before.map((name) => world.store.ttl(name));
    world.advance(300_000);
    const reply = await poll(a, 1);
    expect(reply.cookies).toEqual([]);
    expect(data()).toEqual(before);
    expect(keys().filter((name) => name.includes(":rl:sync:"))).toEqual([]);
    expect(await world.store.exec([["HGETALL", keys().find((name) => name.includes(":gd:"))!]])).toEqual(seen);
    // (no expiry was pushed out: each is the same as it was, less the five minutes that passed)
    expect(data().map((name) => world.store.ttl(name))).toEqual(expiries.map((left) => (left === null ? null : left - 300)));
  });

  it("answers in full, with the new revision, once another device has changed the data", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const mine = await a.sync({ "c:x": [5, 1] });
    expect(mine.body.rev).toBe(1);
    await b.sync({ "c:y": [6, 1] });
    world.advance(30_000);
    let reply!: Awaited<ReturnType<typeof poll>>;
    // two to find out it changed, and four more to read it: the identify, the revision, the counter, the data, the devices
    expect(await commandsFor(world, async () => (reply = await poll(a, 1)))).toBe(6);
    expect(reply.body).toMatchObject({ entries: { "c:x": [5, 1], "c:y": [6, 1] }, devices: 2, rev: 2 });
    expect(reply.body.unchanged).toBeUndefined();
    expect((await poll(a, 2)).body).toMatchObject({ unchanged: true, rev: 2 });
  });

  it("takes its own push as the revision when nothing else has landed, and asks again once if something has", async () => {
    const world = new World();
    const { a, b } = await link(world);
    expect((await a.sync({ "c:x": [5, 1] })).body.rev).toBe(1);
    expect((await a.sync({ "c:x": [6, 0] }, { rev: 1 })).body.rev).toBe(2);
    expect((await poll(a, 2)).body).toMatchObject({ unchanged: true });
    // a push that wins nothing writes nothing, and the revision stays
    expect((await a.sync({ "c:x": [1, 1] }, { rev: 2 })).body.rev).toBe(2);
    // b's write and a's own are both counted: a can't tell which is which from the number, so it takes the older and finds b's change next time
    expect((await b.sync({ "c:y": [7, 1] }, { rev: 2 })).body.rev).toBe(3);
    expect((await poll(a, 2)).body).toMatchObject({ entries: { "c:y": [7, 1] }, rev: 3 });
  });

  it("never misses a change another device makes in the middle of a push", async () => {
    let at = 0;
    let aim = Infinity;
    let during: () => Promise<unknown> = async () => {};
    const world = new World({
      between: async () => {
        if (++at === aim) {
          aim = Infinity;
          await during();
        }
      },
    });
    const { a, b } = await link(world);
    expect((await a.sync({ "c:x": [5, 1] })).body.rev).toBe(1);
    // a's next push: the identify, the counter, the revision, the data and the devices are read before its first write, so b writes then
    during = () => b.sync({ "c:b": [9, 1] });
    aim = at + 7;
    const pushed = await a.sync({ "c:a": [8, 1] }, { rev: 1 });
    expect(pushed.status).toBe(200);
    // b's write and a's both landed, so the counter is two up. a is told the revision it read, and the next poll brings b's change.
    expect(pushed.body.rev).toBe(1);
    const next = await poll(a, pushed.body.rev);
    expect(next.body).toMatchObject({ entries: { "c:x": [5, 1], "c:a": [8, 1], "c:b": [9, 1] }, rev: 3 });
  });

  it("reads the revision before the data: a change landing between the two is found by the next poll, not taken for seen", async () => {
    let at = 0;
    let aim = Infinity;
    let during: () => Promise<unknown> = async () => {};
    const world = new World({
      between: async () => {
        if (++at === aim) {
          aim = Infinity;
          await during();
        }
      },
    });
    const { a, b } = await link(world);
    expect((await a.sync({ "c:x": [5, 1] })).body.rev).toBe(1);
    // a's push reads the device (1), counts the sync (2, 3), reads the revision (4) and then the data (5): b writes between the last two,
    // so a reads b's data under the older revision, and its own write then makes the counter two higher, which it doesn't take for its own
    during = () => b.sync({ "c:b": [9, 1] });
    aim = at + 5;
    const pushed = await a.sync({ "c:a": [8, 1] }, { rev: 1 });
    expect(pushed.body).toMatchObject({ rev: 1, entries: { "c:x": [5, 1], "c:b": [9, 1], "c:a": [8, 1] } });
    // had the revision been read after the data, it would be b's, a would take its own write for the next, and this poll would say "unchanged"
    expect((await poll(a, pushed.body.rev)).body).toMatchObject({ rev: 3, entries: { "c:b": [9, 1], "c:a": [8, 1] } });
  });

  it("finds a change that lands between a poll's check and the full read that follows it, on the next poll", async () => {
    let at = 0;
    let aim = Infinity;
    let during: () => Promise<unknown> = async () => {};
    const world = new World({
      between: async () => {
        if (++at === aim) {
          aim = Infinity;
          await during();
        }
      },
    });
    const { a, b } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    await b.sync({ "c:y": [6, 1] });
    // a asks with a revision that is behind (2 commands), and the full read follows: b writes again between them
    during = () => b.sync({ "c:z": [7, 1] });
    aim = at + 5;
    const answer = await poll(a, 1);
    expect(answer.body).toMatchObject({ rev: 2, entries: { "c:x": [5, 1], "c:y": [6, 1], "c:z": [7, 1] } });
    // a holds the revision it read first, so the change it already has is sent once more, and nothing is missed
    expect((await poll(a, 2)).body).toMatchObject({ rev: 3 });
    expect((await poll(a, 3)).body).toMatchObject({ unchanged: true, rev: 3 });
  });

  it("takes the full path for a device with something to send, one asking for its daily touch, and one with no revision", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    world.advance(90_000);
    expect((await a.sync({ "c:z": [6, 1] }, { rev: 1 })).body.unchanged).toBeUndefined();
    const touched = await poll(a, 2, { touch: true });
    expect(touched.body.unchanged).toBeUndefined();
    expect(touched.body).toMatchObject({ entries: { "c:x": [5, 1], "c:z": [6, 1] } });
    expect(touched.cookies.length).toBe(2);
    expect((await a.sync()).body).toMatchObject({ entries: { "c:x": [5, 1], "c:z": [6, 1] }, rev: 2 });
  });

  it("treats a revision it can't read as none, and an old client's call as it always did", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    for (const rev of ["1", -1, 1.5, null, Number.MAX_SAFE_INTEGER + 2, [1], { rev: 1 }, true]) {
      const reply = await poll(a, rev);
      expect(reply.status, JSON.stringify(rev)).toBe(200);
      expect(reply.body, JSON.stringify(rev)).toMatchObject({ entries: { "c:x": [5, 1] }, devices: 2, rev: 1 });
    }
    // an old client sends no revision and ignores the one it gets
    expect((await a.sync()).body).toMatchObject({ p: 1, entries: { "c:x": [5, 1] }, devices: 2, now: world.clock.now });
  });

  it("answers a revision ahead of the server's as a change, and an empty guide's as the same as no data at all", async () => {
    const world = new World();
    const { a } = await link(world);
    expect((await poll(a, 5)).body).toMatchObject({ entries: {}, rev: 0 });
    expect((await poll(a, 0)).body).toEqual({ p: 1, unchanged: true, rev: 0, now: world.clock.now });
  });

  it("counts each guide's data apart, so a poll for one isn't answered by a change to another", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    await a.post("/api/sync", { guide: "red-dead-redemption", entries: { "c:y": [6, 1] } });
    expect((await poll(a, 1)).body).toMatchObject({ unchanged: true, rev: 1 });
    expect((await a.post("/api/sync", { guide: "red-dead-redemption", entries: {}, rev: 0 })).body).toMatchObject({ rev: 1, entries: { "c:y": [6, 1] } });
  });

  it("keeps the revision as long as the data, and deletes it with it", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    const rv = world.store.keys().find((name) => name.includes(":rv:"))!;
    expect(world.store.ttl(rv)).toBe(KEEP);
    world.advance(10 * 86_400_000);
    await poll(a, 1, { touch: true });
    expect(world.store.ttl(rv)).toBe(KEEP);
    await a.post("/api/forget");
    expect(world.store.keys().filter((name) => /:(p|rv|gd|dv):/.test(name))).toEqual([]);
    const other = new World();
    const pair = await link(other);
    await pair.a.sync({ "c:x": [5, 1] });
    await pair.a.post("/api/unlink");
    await pair.b.post("/api/unlink");
    expect(other.store.keys().filter((name) => /:(p|rv|gd|dv):/.test(name))).toEqual([]);
    void b;
  });

  it("keeps the revision for a preview or localhost a week, like the data", async () => {
    const world = new World();
    const { a } = await link(world, { origin: PREVIEW });
    await a.sync({ "c:x": [5, 1] }, {}, { origin: PREVIEW });
    expect(world.store.ttl(world.store.keys().find((name) => name.includes(":rv:"))!)).toBe(7 * 86_400);
  });
});

describe("removing another device", () => {
  const idOf = async (asker: Device, label: string) => ((await asker.status()).body.devices as { id: string; label: string; self: boolean }[]).find((device) => device.label === label)!.id;

  const three = async () => {
    const world = new World();
    const { a, b } = await link(world);
    const c = world.device();
    await c.claim((await a.show()).code, "Third");
    await b.post("/api/pair/start", { label: "Second" });
    return { world, a, b, c };
  };

  it("lists each device with the id that names it, and the one asking marked", async () => {
    const { a } = await three();
    const devices = (await a.status()).body.devices as { id: string; label: string; seen: number; self: boolean }[];
    expect(devices).toHaveLength(3);
    for (const device of devices) expect(device.id).toMatch(/^[A-Za-z0-9_-]{16}$/);
    expect(devices.filter((device) => device.self)).toHaveLength(1);
    expect(new Set(devices.map((device) => device.id)).size).toBe(3);
  });

  it("takes the device out: its next call is unlinked with its cookies cleared, and the group and its data carry on", async () => {
    const { a, b, c } = await three();
    await a.sync({ "c:x": [5, 1] });
    await c.sync({ "c:y": [6, 1] });
    const gone = await idOf(a, "Third");
    const reply = await a.post("/api/remove", { id: gone });
    expect(reply).toMatchObject({ status: 200, body: { ok: true } });
    NO_STORE(reply.headers);
    // the removed device finds out on its next call, and is cleared like one that unlinked
    const next = await c.sync();
    expect(next.status).toBe(401);
    expect(next.body).toEqual({ error: "unlinked" });
    expect(line(next.cookies, "hundo_sync")).toContain("Max-Age=0");
    expect(line(next.cookies, "hundo_link")).toContain("Max-Age=0");
    expect((await c.status()).status).toBe(401);
    // the others still see all of the data, including what the removed device pushed, and no longer see it
    expect((await a.sync()).body).toMatchObject({ entries: { "c:x": [5, 1], "c:y": [6, 1] } });
    expect(((await a.status()).body.devices as { label: string }[]).map((device) => device.label)).not.toContain("Third");
    expect((await b.sync()).status).toBe(200);
  });

  it("tidies a row whose record is gone, as when a device was removed in the middle of its own sync and wrote itself back", async () => {
    const { world, a } = await three();
    const id = await idOf(a, "Third");
    await world.store.exec([["DEL", world.store.keys().find((name) => name.includes(`:dv:${id}`))!]]);
    expect((await a.post("/api/remove", { id })).body).toEqual({ ok: true });
    expect(((await a.status()).body.devices as { id: string }[]).map((device) => device.id)).not.toContain(id);
  });

  it("removes a device by its own record, listed or not, and refuses one whose record says another group", async () => {
    const { world, a } = await three();
    const gd = world.store.keys().find((name) => name.includes(":gd:"))!;
    const id = await idOf(a, "Third");
    // not in the list, but its record still says it is in this group
    await world.store.exec([["HDEL", gd, id]]);
    expect((await a.post("/api/remove", { id })).body).toEqual({ ok: true });
    // still in the list, but its record says another group: it moved, and isn't this group's to remove
    const second = await idOf(a, "Second device");
    const dv = world.store.keys().find((name) => name.includes(`:dv:${second}`))!;
    await world.store.exec([["HSET", dv, "g", "some-other-group"]]);
    expect((await a.post("/api/remove", { id: second })).body).toEqual({ error: "device" });
    expect(world.store.keys()).toContain(dv);
  });

  it("frees the place the device held, and its record", async () => {
    const { world, a } = await three();
    const before = world.store.keys().filter((name) => name.includes(":dv:")).length;
    await a.post("/api/remove", { id: await idOf(a, "Third") });
    expect(world.store.keys().filter((name) => name.includes(":dv:")).length).toBe(before - 1);
    expect((await world.store.exec([["HLEN", world.store.keys().find((name) => name.includes(":gd:"))!]]))[0]).toBe(2);
  });

  it("refuses a device taking itself out (that is unlinking), an id that names nothing, one in another group, and one that isn't an id", async () => {
    const { world, a } = await three();
    const own = await idOf(a, "Test device");
    expect((await a.post("/api/remove", { id: own })).body).toEqual({ error: "self" });
    expect((await a.sync()).status).toBe(200);
    const other = await link(world);
    const foreign = await idOf(other.a, "Test device");
    for (const id of ["A".repeat(16), foreign, "short", "x".repeat(17), "has spaces here!!", 12, null, ["A".repeat(16)], undefined]) {
      const reply = await a.post("/api/remove", { id });
      expect(reply.status, JSON.stringify(id)).toBe(400);
      expect(reply.body, JSON.stringify(id)).toEqual({ error: "device" });
    }
    // the other group's device is still there
    expect((await other.a.status()).body.devices).toHaveLength(2);
  });

  it("is for a linked device only, and keeps every other check: origin, JSON and protocol", async () => {
    const { world, a } = await three();
    const id = await idOf(a, "Third");
    expect((await world.device().post("/api/remove", { id })).status).toBe(401);
    expect((await a.post("/api/remove", { id }, { origin: "https://evil.example" })).status).toBe(403);
    expect((await a.post("/api/remove", { id }, { headers: { "content-type": "text/plain" } })).status).toBe(400);
    expect((await a.post("/api/remove", { id }, { raw: JSON.stringify({ id }) })).status).toBe(400);
    expect((await handle(new Request("https://api.hundo.quest/api/remove", { method: "GET" }), world.deps)).status).toBe(405);
    // none of that removed it
    expect(((await a.status()).body.devices as unknown[]).length).toBe(3);
  });
});

describe("unlinking", () => {
  it("takes a device out, clears its cookies, and keeps the group's data for the others", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    const reply = await b.post("/api/unlink");
    expect(reply).toMatchObject({ status: 200, body: { ok: true } });
    expect(line(reply.cookies, "hundo_sync")).toContain("Max-Age=0");
    expect(line(reply.cookies, "hundo_link")).toContain("Max-Age=0");
    expect(b.jar.size).toBe(0);
    expect((await a.sync()).body).toMatchObject({ entries: { "c:x": [5, 1] }, devices: 1 });
    expect((await a.status()).body.devices).toHaveLength(1);
  });

  it("deletes the data when the last device unlinks", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.sync({ "c:x": [5, 1] });
    await a.summary({ percent: 1, chapter: 1 });
    await a.post("/api/unlink");
    expect(world.store.keys().filter((name) => name.includes(":sm:"))).toHaveLength(1);
    await b.post("/api/unlink");
    expect(world.store.keys().filter((name) => /:(p|rv|sm|gd|dv):/.test(name))).toEqual([]);
  });

  it("revokes the token: an unlinked device's old cookie does nothing", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const cookie = b.jar.get("hundo_sync")!;
    await b.post("/api/unlink");
    b.jar.set("hundo_sync", cookie);
    expect((await b.sync({ "c:sneaky": [9, 1] })).status).toBe(401);
    expect((await a.sync()).body.entries).toEqual({});
  });

  it("clears the cookies even for a stale one, and for none", async () => {
    const world = new World();
    const stale = world.device();
    stale.jar.set("hundo_sync", `${"A".repeat(16)}.${"B".repeat(22)}`);
    expect(await stale.post("/api/unlink")).toMatchObject({ status: 200 });
    expect(stale.jar.size).toBe(0);
    expect(await world.device().post("/api/unlink")).toMatchObject({ status: 200 });
  });

  it("drops a device still waiting to be linked", async () => {
    const world = new World();
    const a = world.device();
    await a.show();
    await a.post("/api/unlink");
    expect(world.store.keys().filter((name) => name.includes(":dv:"))).toEqual([]);
  });
});

describe("deleting the synced progress", () => {
  it("erases the group's data and every device, and the others learn on their next sync", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const c = world.device();
    await c.claim((await a.show()).code);
    await a.sync({ "c:x": [5, 1] });
    await a.post("/api/sync", { guide: "red-dead-redemption", entries: { "c:y": [5, 1] } });
    await a.summary({ percent: 3, chapter: 2 });
    await b.summary(null, { guide: "red-dead-redemption" });
    const reply = await a.post("/api/forget");
    expect(reply).toMatchObject({ status: 200, body: { ok: true } });
    expect(line(reply.cookies, "hundo_sync")).toContain("Max-Age=0");
    expect(world.store.keys().filter((name) => /:(p|rv|sm|gd|dv):/.test(name))).toEqual([]);
    for (const device of [b, c]) {
      const next = await device.sync();
      expect(next.status).toBe(401);
      expect(line(next.cookies, "hundo_link")).toContain("Max-Age=0");
    }
  });

  it("is a 401 for a device that is not linked", async () => {
    expect((await new World().device().post("/api/forget")).status).toBe(401);
  });
});

describe("visit counts", () => {
  const DAY_KEY = (ns: string, guide = GUIDE, day = "2026-11-15") => `hs:${ns}:st:${guide}:${day}`;
  const totals = (world: World, ns = "prod", guide = GUIDE, day = "2026-11-15") =>
    Object.fromEntries(world.store.keys().includes(DAY_KEY(ns, guide, day)) ? (JSON.parse(world.store.snapshot()) as [string, [string, string][]][]).find(([name]) => name === DAY_KEY(ns, guide, day))![1] : []);

  it("adds a visit's counts to the guide's totals for the day, and keeps them 25 months", async () => {
    const world = new World();
    const d = world.device();
    const reply = await d.count({ "v:app": 1, "p:guide/3": 2, "p:checklist": 1, "p:questlines": 1, "s:3": 1 });
    expect(reply.status).toBe(200);
    expect(reply.body).toEqual({ ok: true, counted: true });
    NO_STORE(reply.headers);
    expect(reply.cookies).toEqual([]);
    await world.device().count({ "v:tab": 1, "p:guide/3": 1, "f:2": 1 });
    expect(totals(world)).toEqual({ "v:app": "1", "v:tab": "1", "p:guide/3": "3", "p:checklist": "1", "p:questlines": "1", "s:3": "1", "f:2": "1" });
    expect(world.store.ttl(DAY_KEY("prod"))).toBe(761 * 86_400);
  });

  it("keeps a day per guide, by the server's UTC date, and keeps previews' and localhost's a week apart from production's", async () => {
    const world = new World();
    world.clock.now = Date.UTC(2026, 10, 15, 23, 59, 0);
    await world.device().count({ "v:app": 1 });
    world.advance(2 * 60_000);
    await world.device().count({ "v:tab": 1 }, { guide: "red-dead-redemption" });
    await world.device().count({ "v:tab": 1 }, {}, { origin: PREVIEW });
    await world.device().count({ "v:tab": 1 }, {}, { origin: LOCAL });
    expect(totals(world)).toEqual({ "v:app": "1" });
    expect(totals(world, "prod", "red-dead-redemption", "2026-11-16")).toEqual({ "v:tab": "1" });
    expect(totals(world, "test", GUIDE, "2026-11-16")).toEqual({ "v:tab": "2" });
    expect(world.store.ttl(DAY_KEY("test", GUIDE, "2026-11-16"))).toBe(7 * 86_400);
  });

  it("stores the sums alone: no address, no cookie, no device, whoever sends them", async () => {
    const world = new World();
    const { a } = await link(world);
    const before = new Set(world.store.keys());
    // Even a client that sends its cookies (the guides don't) leaves nothing of them.
    await a.post("/api/count", { guide: GUIDE, counts: { "v:app": 1 } });
    await world.device("198.51.100.77").count({ "v:tab": 1 });
    const added = world.store.keys().filter((name) => !before.has(name));
    expect(added.sort()).toEqual(["hs:prod:st:budget:2026-11", DAY_KEY("prod")]);
    const stored = JSON.stringify(added.map((name) => JSON.parse(world.store.snapshot()).find(([n]: [string]) => n === name)));
    for (const trace of ["198.51.100.77", a.ip, ...[...a.jar.values()].flatMap((value) => value.split("."))]) expect(stored).not.toContain(trace);
  });

  it("refuses anything but the known fields, a whole count from 1 to 50 each, at most 12 of them, for a known guide", async () => {
    const world = new World();
    const d = world.device();
    const refused: [string, unknown, Record<string, unknown>?][] = [
      ["no counts", undefined],
      ["a list", [["v:app", 1]]],
      ["nothing in it", {}],
      ["an unknown field", { "v:app": 1, x: 1 }],
      ["a chapter title", { "p:guide/the-castle": 1 }],
      ["a row's anchor", { "p:guide/3/heart-well": 1 }],
      ["a checklist filter", { "p:checklist/heart/1": 1 }],
      ["a questline's id", { "p:questlines/siegmeyer": 1 }],
      ["chapter 0", { "s:0": 1 }],
      ["the server's own field", { pair: 1 }],
      ["zero", { "v:app": 0 }],
      ["a fraction", { "v:app": 1.5 }],
      ["too many", { "v:app": 51 }],
      ["text", { "v:app": "1" }],
      ["thirteen fields", Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`p:guide/${i + 1}`, 1]))],
      ["an unknown guide", { "v:app": 1 }, { guide: "zelda-3" }],
    ];
    for (const [why, counts, extra] of refused) {
      const reply = await d.count(counts, extra);
      expect(reply.status, why).toBe(400);
    }
    expect(world.store.commands).toBe(0);
    expect((await d.count(Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`p:guide/${i + 1}`, 50])))).status).toBe(200);
  });

  it("costs the store two commands more than it has fields, and spends at most the month's budget", async () => {
    const world = new World();
    const d = world.device();
    world.store.commands = 0;
    await d.count({ "v:app": 1, "p:guide/1": 1 });
    // the month's first call also starts the budget's clock
    expect(world.store.commands).toBe(5);
    world.store.commands = 0;
    await d.count({ "v:app": 1, "p:guide/1": 1 });
    expect(world.store.commands).toBe(4);
    expect(world.store.ttl("hs:prod:st:budget:2026-11")).toBe(40 * 86_400);

    // 100,000 a month in production: a call that would pass it costs one command and counts nothing, until the next month.
    await world.store.exec([["SET", "hs:prod:st:budget:2026-11", "99996"]]);
    expect((await d.count({ "v:app": 1, "p:guide/1": 1 })).body).toEqual({ ok: true, counted: true });
    world.store.commands = 0;
    expect((await d.count({ "v:app": 1 })).body).toEqual({ ok: true, counted: false });
    expect(world.store.commands).toBe(1);
    // and once an instance has seen the budget spent, a call costs the store nothing
    expect((await d.count({ "v:app": 1 })).body).toEqual({ ok: true, counted: false });
    expect(world.store.commands).toBe(1);
    expect(totals(world)["v:app"]).toBe("3");
    world.clock.now = Date.UTC(2026, 11, 1, 0, 0, 1);
    expect((await d.count({ "v:app": 1 })).body).toEqual({ ok: true, counted: true });
  });

  it("gives previews and localhost a budget of their own, a tenth of production's", async () => {
    const world = new World();
    await world.store.exec([["SET", "hs:test:st:budget:2026-11", "9999"]]);
    expect((await world.device().count({ "v:app": 1 }, {}, { origin: LOCAL })).body.counted).toBe(false);
    expect((await world.device().count({ "v:app": 1 })).body.counted).toBe(true);
  });

  it("answers 503 when the store is down, as every call does", async () => {
    const world = new World({ store: { exec: async () => Promise.reject(new StoreError("down")) } });
    expect((await world.device().count({ "v:app": 1 })).status).toBe(503);
  });
});

describe("links counted", () => {
  it("counts a new link for the guide it was made in, and not a code typed again on a device already in the group", async () => {
    const world = new World();
    const a = world.device();
    const b = world.device();
    const { code } = await a.show();
    await b.claim(code, "Second device", undefined, { guide: "echoes-of-wisdom" });
    const pairs = () => world.store.snapshot().match(/"pair","(\d+)"/)?.[1];
    expect(world.store.keys()).toContain("hs:prod:st:echoes-of-wisdom:2026-11-15");
    expect(pairs()).toBe("1");
    const again = await a.show();
    expect((await b.claim(again.code, "Second device", undefined, { guide: "echoes-of-wisdom" })).body.already).toBe(true);
    expect(pairs()).toBe("1");
  });

  it("counts nothing for a client that names no guide, or one it doesn't know", async () => {
    const world = new World();
    await link(world);
    const c = world.device();
    const { code } = await world.device().show();
    await c.claim(code, "Third", undefined, { guide: "zelda-3" });
    expect(world.store.keys().filter((name) => name.includes(":st:"))).toEqual([]);
  });

  it("still links when counting fails", async () => {
    const world = new World();
    const a = world.device();
    const { code } = await a.show();
    const real = world.store;
    const flaky = { exec: (commands: readonly (readonly (string | number)[])[]) => (commands.some(([name]) => name === "INCRBY") ? Promise.reject(new StoreError("down")) : real.exec(commands)) };
    const b = world.device();
    const reply = await b.claim(code, "Second", { deps: { ...world.deps, store: flaky } }, { guide: GUIDE });
    expect(reply.status).toBe(200);
    expect(reply.body.linked).toBe(true);
  });
});

describe("a guide's summary for hundo.quest", () => {
  it("sets a cookie every hundo.quest host can read, for 400 days, holding the format, the figure and the chapter", async () => {
    const d = new World().device();
    const reply = await d.summary({ percent: 57, chapter: 6 });
    expect(reply.status).toBe(200);
    expect(reply.body).toEqual({ ok: true });
    NO_STORE(reply.headers);
    expect(reply.cookies).toEqual([`hundo_p_links-awakening=1.57.6; Max-Age=${KEEP}; Path=/; Domain=hundo.quest; Secure; SameSite=Lax`]);
    expect(d.jar.get("hundo_p_links-awakening")).toBe("1.57.6");
    await d.summary({ percent: 100, chapter: 9 }, { guide: "silksong" }, { origin: "https://pharloom.hundo.quest" });
    expect(d.jar.get("hundo_p_silksong")).toBe("1.100.9");
    expect(d.jar.get("hundo_p_links-awakening")).toBe("1.57.6");
  });

  it("keeps it to the page's own host, for a week, on a preview and on localhost", async () => {
    const preview = await new World().device().summary({ percent: 0, chapter: 1 }, {}, { origin: PREVIEW });
    expect(preview.cookies).toEqual([`hundo_p_links-awakening=1.0.1; Max-Age=${7 * 86_400}; Path=/; Secure; SameSite=Lax`]);
    const local = await new World().device().summary({ percent: 3, chapter: 2 }, {}, { origin: LOCAL, direct: true });
    expect(local.cookies).toEqual([`hundo_p_links-awakening=1.3.2; Max-Age=${7 * 86_400}; Path=/; SameSite=Lax`]);
  });

  it("clears it when nothing is checked", async () => {
    const d = new World().device();
    await d.summary({ percent: 12, chapter: 3 });
    const cleared = await d.summary(null);
    expect(cleared.status).toBe(200);
    expect(cleared.cookies).toEqual(["hundo_p_links-awakening=; Max-Age=0; Path=/; Domain=hundo.quest; Secure; SameSite=Lax"]);
    expect(d.jar.has("hundo_p_links-awakening")).toBe(false);
  });

  it("stores nothing for a reader who isn't linked, and doesn't call the store", async () => {
    const world = new World();
    const pending = world.device();
    await pending.show();
    const before = world.store.snapshot();
    const commands = world.store.commands;
    expect((await world.device().summary({ percent: 40, chapter: 5 })).status).toBe(200);
    expect((await world.device().summary(null)).status).toBe(200);
    expect(world.store.commands).toBe(commands);
    // a device still waiting on a code has no group to keep it for: one read of its record, and nothing written
    expect((await pending.summary({ percent: 40, chapter: 5 })).status).toBe(200);
    expect(world.store.commands).toBe(commands + 1);
    expect(world.store.snapshot()).toBe(before);
  });

  it("keeps a linked device's summary for its group, 400 days from the last, for two commands, with the same answer as anyone gets", async () => {
    const world = new World();
    const { a } = await link(world);
    const [group] = groups(world);
    const sync = a.jar.get("hundo_sync");
    const commands = world.store.commands;
    expect((await a.summary({ percent: 40, chapter: 5 })).status).toBe(200);
    expect(world.store.commands).toBe(commands + 2);
    expect(await world.store.exec([["GET", `hs:prod:sm:${group}:${GUIDE}`]])).toEqual(["1.40.5"]);
    expect(world.store.ttl(`hs:prod:sm:${group}:${GUIDE}`)).toBe(KEEP);
    // the cookies are the answer, the same with the sync cookies as without them, and the device's own are left alone
    expect(a.jar.get("hundo_sync")).toBe(sync);
    const fresh = await world.device().summary({ percent: 40, chapter: 5 });
    expect(a.set).toEqual(fresh.cookies);
  });

  it("keeps nothing checked as a summary of its own, so it isn't taken for a guide never reported", async () => {
    const world = new World();
    const { a, b } = await link(world);
    const [group] = groups(world);
    await a.summary({ percent: 40, chapter: 5 });
    const cleared = await b.summary(null);
    expect(line(cleared.cookies, "hundo_p_links-awakening")).toContain("Max-Age=0");
    expect(await world.store.exec([["GET", `hs:prod:sm:${group}:${GUIDE}`]])).toEqual(["none"]);
    expect(world.store.ttl(`hs:prod:sm:${group}:${GUIDE}`)).toBe(KEEP);
  });

  it("keeps nothing checked only over a summary the group holds: a device that never had any can't pass for a reset", async () => {
    const world = new World();
    const { a } = await link(world);
    const [group] = groups(world);
    const reply = await a.summary(null);
    expect(line(reply.cookies, "hundo_p_links-awakening")).toContain("Max-Age=0");
    expect(world.store.keys().filter((name) => name.includes(":sm:"))).toEqual([]);
    expect((await a.summaries()).body).toEqual({ summaries: {} });
    await a.summary({ percent: 2, chapter: 1 });
    await a.summary(null);
    expect(await world.store.exec([["GET", `hs:prod:sm:${group}:${GUIDE}`]])).toEqual(["none"]);
  });

  it("still sets the cookie when the store is down", async () => {
    const world = new World();
    const { a } = await link(world);
    const down = { ...world.deps, store: { exec: () => Promise.reject(new StoreError("max requests limit exceeded")) } };
    const reply = await a.summary({ percent: 40, chapter: 5 }, {}, { deps: down });
    expect(reply.status).toBe(200);
    expect(line(reply.cookies, "hundo_p_links-awakening")).toContain("=1.40.5;");
    expect((await a.summary(null, {}, { deps: down })).status).toBe(200);
    // and when the device is found but the write fails
    const failing = { ...world.deps, store: { exec: (commands: readonly (readonly (string | number)[])[]) => (commands.some(([name]) => name === "SET") ? Promise.reject(new StoreError("down")) : world.store.exec(commands)) } };
    const late = await a.summary({ percent: 41, chapter: 5 }, {}, { deps: failing });
    expect(late.status).toBe(200);
    expect(line(late.cookies, "hundo_p_links-awakening")).toContain("=1.41.5;");
  });

  it("refuses anything but a known guide, a whole figure from 0 to 100 and a chapter from 1 to 999, and sets nothing then", async () => {
    const world = new World();
    const d = world.device();
    const refused: [string, unknown, Record<string, unknown>?][] = [
      ["no summary", undefined],
      ["a list", [57, 6]],
      ["the cookie's text", "1.57.6"],
      ["no chapter", { percent: 57 }],
      ["no figure", { chapter: 6 }],
      ["something else besides", { percent: 57, chapter: 6, title: "The Castle" }],
      ["a negative figure", { percent: -1, chapter: 6 }],
      ["past 100", { percent: 101, chapter: 6 }],
      ["a fraction", { percent: 57.5, chapter: 6 }],
      ["text", { percent: "57", chapter: 6 }],
      ["chapter 0", { percent: 57, chapter: 0 }],
      ["chapter 1000", { percent: 57, chapter: 1000 }],
      ["a chapter's name", { percent: 57, chapter: "the-castle" }],
      ["an unknown guide", { percent: 57, chapter: 6 }, { guide: "zelda-3" }],
      ["a guide that would break the cookie", null, { guide: "x; Domain=evil.example" }],
    ];
    for (const [why, summary, extra] of refused) {
      const reply = await d.summary(summary, extra);
      expect(reply.status, why).toBe(400);
      expect(reply.cookies, why).toEqual([]);
    }
    expect(world.store.commands).toBe(0);
  });
});

describe("what hundo.quest reads for a linked browser", () => {
  const SUMMARY = (percent: number, chapter: number) => ({ percent, chapter });

  it("is every guide's latest summary from any device of the group, null for nothing checked, a guide never reported left out", async () => {
    const world = new World();
    const { a, b } = await link(world);
    await a.summary(SUMMARY(10, 2));
    // the last device to report a guide speaks for it: an installed app, say, with its own cookies
    await b.summary(SUMMARY(57, 6));
    await b.summary(SUMMARY(100, 9), { guide: "silksong" }, { origin: "https://pharloom.hundo.quest" });
    await a.summary(SUMMARY(3, 1), { guide: "hollow-knight" }, { origin: "https://hallownest.hundo.quest" });
    await b.summary(null, { guide: "hollow-knight" }, { origin: "https://hallownest.hundo.quest" });
    for (const device of [a, b]) {
      const reply = await device.summaries();
      expect(reply.status).toBe(200);
      NO_STORE(reply.headers);
      expect(reply.cookies).toEqual([]);
      expect(reply.body).toEqual({ summaries: { "links-awakening": SUMMARY(57, 6), silksong: SUMMARY(100, 9), "hollow-knight": null } });
    }
  });

  it("costs two store commands, the device's record and one read, and writes nothing", async () => {
    const world = new World();
    const { a } = await link(world);
    await a.summary(SUMMARY(57, 6));
    const before = world.store.snapshot();
    const commands = world.store.commands;
    await a.summaries();
    expect(world.store.commands).toBe(commands + 2);
    expect(world.store.snapshot()).toBe(before);
  });

  it("never shows another group's", async () => {
    const world = new World();
    const one = await link(world);
    const two = await link(world);
    await one.a.summary(SUMMARY(57, 6));
    expect((await two.a.summaries()).body).toEqual({ summaries: {} });
    // nor the progress of a group a device has left
    await one.b.post("/api/unlink");
    expect((await one.b.summaries()).status).toBe(401);
  });

  it("is unlinked, and clears the cookies, for no device or one no longer linked; with no cookie it costs nothing", async () => {
    const world = new World();
    const stranger = world.device();
    const reply = await stranger.summaries();
    expect(reply).toMatchObject({ status: 401, body: { error: "unlinked" } });
    expect(line(reply.cookies, "hundo_sync")).toBe("hundo_sync=; Max-Age=0; Path=/api; Domain=hundo.quest; Secure; HttpOnly; SameSite=Lax");
    expect(line(reply.cookies, "hundo_link")).toBe("hundo_link=; Max-Age=0; Path=/; Domain=hundo.quest; Secure; SameSite=Lax");
    expect(world.store.commands).toBe(0);
    const { a, b } = await link(world);
    const other = ((await b.status()).body.devices as { id: string; self: boolean }[]).find((device) => !device.self)!.id;
    await b.post("/api/remove", { id: other });
    const removed = await a.summaries();
    expect(removed.status).toBe(401);
    expect(a.jar.has("hundo_link")).toBe(false);
  });

  it("is empty for a device still waiting on a code, and leaves its cookie, so the pairing goes on", async () => {
    const world = new World();
    const a = world.device();
    const { code } = await a.show();
    const reply = await a.summaries();
    expect(reply).toMatchObject({ status: 200, body: { summaries: {} } });
    expect(reply.cookies).toEqual([]);
    expect(a.jar.has("hundo_sync")).toBe(true);
    expect((await world.device().claim(code)).body.linked).toBe(true);
  });

  it("reads only summaries out of the store, whatever else a key holds", async () => {
    const world = new World();
    const { a } = await link(world);
    const [group] = groups(world);
    const bad = ["2.57.6", "1.101.6", "1.57.0", "", "1.57.6; Domain=evil.example"];
    await world.store.exec(bad.map((text, i) => ["SET", `hs:prod:sm:${group}:${GUIDES[i]}`, text]));
    await world.store.exec([["HSET", `hs:prod:sm:${group}:${GUIDES[5]}`, "f", "1.57.6"]]);
    expect((await a.summaries()).body).toEqual({ summaries: {} });
  });

  it("keeps a preview's and localhost's apart from production's, for a week", async () => {
    const world = new World();
    const { a } = await link(world, { origin: PREVIEW });
    await a.summary(SUMMARY(20, 3), {}, { origin: PREVIEW });
    const [group] = groups(world, "test");
    expect(world.store.ttl(`hs:test:sm:${group}:${GUIDE}`)).toBe(7 * 86_400);
    expect((await a.summaries({ origin: PREVIEW })).body).toEqual({ summaries: { "links-awakening": SUMMARY(20, 3) } });
    expect(world.store.keys().filter((name) => name.startsWith("hs:prod:"))).toEqual([]);
  });
});

describe("the guides", () => {
  // (a brand.id never changes, and a guide's readers are turned away without it. A new guide's id is added to the list: project.test.ts holds it to the apps.)
  it("keeps the ids of the first three guides", () => {
    expect(GUIDES).toEqual(expect.arrayContaining(["echoes-of-wisdom", "links-awakening", "red-dead-redemption"]));
  });
});
