// @vitest-environment node
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import page from "../index.html?raw";

// The Vercel settings each guide ships in its vercel.json, held to what past deployments taught.
const read = (app: string) => JSON.parse(readFileSync(`${app}/vercel.json`, "utf8"));
const vercel = read(process.env.GUIDE_ROOT!);
const apps = `${process.env.GUIDE_ROOT}/..`;

// The file is Vercel `routes` alone. Vercel runs them in phases: what comes before the first `handle` runs on every
// request, before the file lookup, whether or not the file exists. `filesystem` follows a miss and `hit` follows a
// found file ([docs/deploying.md](../../../docs/deploying.md#what-verceljson-sets)).
type Route = { src?: string; dest?: string; headers?: Record<string, string>; continue?: boolean; check?: boolean; handle?: string };
const routes: Route[] = vercel.routes;
const phase = (name: "start" | "filesystem" | "hit"): Route[] => {
  const at = name === "start" ? -1 : routes.findIndex((route) => route.handle === name);
  if (name !== "start") expect(at, `a ${name} phase`).toBeGreaterThanOrEqual(0);
  const rest = routes.slice(at + 1);
  const end = rest.findIndex((route) => route.handle);
  return end < 0 ? rest : rest.slice(0, end);
};
const matching = (rules: Route[], path: string) => rules.filter((rule) => new RegExp(`^${rule.src}$`).test(path));
const cacheControl = (rules: Route[], path: string) => matching(rules, path).flatMap((rule) => rule.headers?.["Cache-Control"] ?? []);

describe("deploy settings", () => {
  it("ships the same vercel.json as every other guide", () => {
    // (a folder with no vercel.json is no guide, such as one git left behind holding only node_modules)
    for (const app of readdirSync(apps).filter((name) => existsSync(`${apps}/${name}/vercel.json`))) {
      expect(read(`${apps}/${app}`), app).toEqual(vercel);
    }
  });

  it("installs from the lockfile and rebuilds when core or the root workspace files change", () => {
    expect(vercel.installCommand).toBe("pnpm install --frozen-lockfile");
    expect(vercel.ignoreCommand).toBe("sh ../../scripts/vercel-ignore.sh");
    const script = readFileSync(`${process.env.GUIDE_ROOT}/../../scripts/vercel-ignore.sh`, "utf8");
    const watched = /git diff --quiet [^\n]* -- ([^\n&]*)/.exec(script)?.[1].trim().split(/\s+/) ?? [];
    for (const path of [".", "../../packages/core", "../../scripts", "../../package.json", "../../pnpm-lock.yaml", "../../pnpm-workspace.yaml", "../../tsconfig.base.json"]) {
      expect(watched, path).toContain(path);
    }
  });

  it("answers only 0 (skip) or 1 (build) from the ignore step, since Vercel fails a deployment on any other code", () => {
    const path = `${process.env.GUIDE_ROOT}/../../scripts/vercel-ignore.sh`;
    const script = readFileSync(path, "utf8");
    // (a bare `exit`, `exit $?` or `exit "$code"` would pass git's own 128 on, so each exit must name 0 or 1)
    const code = script
      .split("\n")
      .filter((line) => !line.trim().startsWith("#"))
      .join("\n");
    const exits = [...code.matchAll(/\bexit\b([^\n;&|]*)/g)].map(([, rest]) => rest.trim());
    expect(exits.length).toBeGreaterThan(0);
    for (const code of exits) expect(["0", "1"], `exit ${code}`).toContain(code);
    // (a syntax error makes sh exit 2)
    expect(() => execFileSync("sh", ["-n", path])).not.toThrow();
    // (the last word is a build, so a failing git command can't leak its own exit code, as 128 once did)
    expect(script.trim().split("\n").at(-1)?.trim()).toBe("exit 1");
  });

  it("leaves cleanUrls off, since it breaks the catch-all rewrite and deep links 404", () => {
    expect(vercel.cleanUrls).toBeUndefined();
  });

  it("is routes alone, in the phases `filesystem` then `hit`, since mixing in headers or rewrites reorders them", () => {
    // (Vercel puts `routes` ahead of the rules it builds from these, so a `handle` in `routes` would swallow them)
    for (const key of ["headers", "rewrites", "redirects", "trailingSlash"]) expect(vercel[key], key).toBeUndefined();
    expect(routes.flatMap((route) => route.handle ?? [])).toEqual(["filesystem", "hit"]);
  });

  it("serves the app for every route but lets a missing asset, font, icon or workbox chunk 404", () => {
    const [catchAll, ...others] = phase("filesystem").filter((route) => route.dest === "/index.html");
    expect(others).toEqual([]);
    // (the source read as a regular expression, which this pattern is)
    const rewritten = (path: string) => new RegExp(`^${catchAll.src}$`).test(path);
    for (const route of ["/", "/guide/3", "/checklist/heart", "/dashboard/calibration", "/sources"]) expect(rewritten(route), route).toBe(true);
    // (a missing workbox chunk came back as the app's HTML, 200, with a year of cache)
    for (const file of ["/assets/index-abc123.js", "/fonts/body.woff2", "/icons/icon-192.png", "/workbox-2178cfdb.js", "/workbox-2178cfdb.js.map"]) {
      expect(rewritten(file), file).toBe(false);
    }
  });

  it("hands /api to the sync API ahead of the catch-all, so a call is same-origin and a miss there isn't the app's page", () => {
    const after = phase("filesystem");
    const api = after.findIndex((route) => route.dest?.startsWith("https://api.hundo.quest/api/"));
    const catchAll = after.findIndex((route) => route.dest === "/index.html");
    // (the first route that matches answers, so the sync API has to come first)
    expect(api, "the /api route").toBeGreaterThanOrEqual(0);
    expect(api).toBeLessThan(catchAll);
    expect(after[api]).toEqual({ src: "/api(?:/(.*))?", dest: "https://api.hundo.quest/api/$1", check: true });
    // (the page is never served for /api: a missing call is the API's own 404, not HTML that looks like an answer)
    for (const path of ["/api", "/api/sync", "/api/pair/start", "/api/nope"]) expect(matching([after[api]], path), path).toHaveLength(1);
    // (a bare /api is the one the catch-all would also take: the route ahead of it answers first)
    for (const path of ["/api/sync", "/api/pair/start", "/api/nope"]) expect(matching([after[catchAll]], path), path).toHaveLength(0);
    // (the CSP needs no new origin for it, and the camera stays off)
    const headers: Record<string, string> = Object.assign({}, ...phase("start").map((route) => route.headers));
    expect(headers["Content-Security-Policy"]).toMatch(/(^|;\s*)connect-src 'self'(;|$)/);
    expect(headers["Permissions-Policy"]).toMatch(/camera=\(\)/);
  });

  it("gives a long Cache-Control only after the file was found, so a missing file's 404 never carries one", () => {
    // (a rule before the file lookup matches by path alone and so hit a 404 too: /assets/nope.js came back with a year of cache)
    const before = phase("start");
    const hit = phase("hit");
    for (const rule of [...before, ...hit]) expect(rule.continue, rule.src).toBe(true);
    // (the phase after a miss only sends a path somewhere: a header set there would reach the 404 again)
    for (const rule of phase("filesystem")) expect(rule.headers, rule.src).toBeUndefined();
    for (const rule of before) {
      if (rule.headers?.["Cache-Control"]) expect(rule.headers["Cache-Control"], rule.src).toMatch(/\bmax-age=0\b/);
    }
    const year = "public, max-age=31536000, immutable";
    const week = "public, max-age=604800, stale-while-revalidate=86400";
    const found = { "/assets/index-abc123.js": year, "/workbox-2178cfdb.js": year, "/fonts/body.woff2": week, "/icons/icon-192.png": week };
    for (const [path, value] of Object.entries(found)) {
      expect(cacheControl(hit, path), path).toEqual([value]);
      expect(cacheControl(before, path), path).toEqual([]);
    }
    // (the root favicon is found by the filesystem phase, ahead of the catch-all, and keeps the default cache)
    expect(cacheControl([...before, ...hit], "/favicon.ico")).toEqual([]);
    // (the shell and the worker still revalidate, found or not)
    for (const path of ["/", "/index.html", "/sw.js", "/theme-init.js", "/manifest.webmanifest"]) {
      expect(cacheControl(before, path), path).toEqual(["public, max-age=0, must-revalidate"]);
    }
    // (and the worker may control the whole origin)
    expect(matching(before, "/sw.js").flatMap((rule) => rule.headers?.["Service-Worker-Allowed"] ?? [])).toEqual(["/"]);
  });

  it("forbids inline scripts, and the page has none", () => {
    const csps = phase("start").filter((rule) => rule.headers?.["Content-Security-Policy"]);
    expect(csps).toHaveLength(1);
    const csp = csps[0].headers!["Content-Security-Policy"];
    // (before the file lookup, so a 404 carries it too)
    for (const path of ["/", "/guide/3", "/assets/nope.js", "/workbox-nope.js"]) expect(matching(csps, path), path).toHaveLength(1);
    expect(csp).toMatch(/(^|;\s*)script-src 'self'(;|$)/);
    // inline styles stay allowed: the fonts' `<style>`, and the `<noscript>` rule that shows each route's text when scripts are off (routes.ts)
    expect(csp).toMatch(/(^|;\s*)style-src 'self' 'unsafe-inline'(;|$)/);
    // theme-init.js has to stay an external file for this reason
    const scripts = [...page.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
    expect(scripts.length).toBeGreaterThan(0);
    for (const [tag, attributes, body] of scripts) {
      // The one exception is the WebSite block (seo.ts): a JSON-LD data block, which a browser never runs and the CSP doesn't cover.
      if (attributes === ' type="application/ld+json"') {
        expect(body, tag).toBe("%GUIDE_JSONLD%");
        continue;
      }
      expect(attributes, tag).toMatch(/\bsrc="/);
      expect(body.trim(), tag).toBe("");
    }
  });
});
