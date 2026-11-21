// @vitest-environment jsdom
// The theme button and theme-init.js: the page follows the device until the reader picks the other scheme, keeps that choice under one key,
// forgets it when they pick the device's again, and puts it back before the next first paint.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { THEME_KEY, wireTheme } from "./theme";

const init = readFileSync(join(import.meta.dirname, "..", "public", "theme-init.js"), "utf8");
const runInit = () => new Function(init)();

/** A device whose scheme the test sets, and tells the page when it changes. */
function device(dark: boolean) {
  const listeners = new Set<() => void>();
  const media = {
    get matches() {
      return dark;
    },
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  };
  vi.stubGlobal("matchMedia", (query: string) => (query === "(prefers-color-scheme: dark)" ? media : { matches: false, addEventListener() {}, removeEventListener() {} }));
  return {
    turn(next: boolean) {
      dark = next;
      for (const listener of listeners) listener();
    },
  };
}

const LIGHT = "#f4f2ee";
const DARK = "#0f0f11";
const root = document.documentElement;
const button = () => document.querySelector<HTMLButtonElement>("[data-theme-toggle]")!;
const colours = () => [...document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')].map((tag) => tag.content);

beforeEach(() => {
  localStorage.clear();
  delete root.dataset.theme;
  document.head.innerHTML = `
    <meta name="theme-color" content="${LIGHT}" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="${DARK}" media="(prefers-color-scheme: dark)">`;
  document.body.innerHTML = `<button type="button" data-theme-toggle aria-label="Dark theme" aria-pressed="false"></button>`;
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("the theme button", () => {
  it("shows itself, and follows the device until a press, keeping nothing", () => {
    device(false);
    expect(button().dataset.ready).toBeUndefined();
    wireTheme();
    expect(button().dataset.ready).toBe("");
    expect(button().getAttribute("aria-pressed")).toBe("false");
    expect(root.dataset.theme).toBeUndefined();
    expect(localStorage.length).toBe(0);
  });

  it("keeps the scheme the device isn't using, and forgets it when the reader picks the device's again", () => {
    device(false);
    wireTheme();
    button().click();
    expect(root.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_KEY)).toBe("dark");
    expect(button().getAttribute("aria-pressed")).toBe("true");
    expect(colours()).toEqual([DARK, DARK]);
    button().click();
    expect(root.dataset.theme).toBeUndefined();
    expect(localStorage.length).toBe(0);
    expect(button().getAttribute("aria-pressed")).toBe("false");
    expect(colours()).toEqual([LIGHT, DARK]);
  });

  it("starts pressed on a dark device, and keeps light when it's picked there", () => {
    device(true);
    wireTheme();
    expect(button().getAttribute("aria-pressed")).toBe("true");
    button().click();
    expect(root.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
    expect(colours()).toEqual([LIGHT, LIGHT]);
  });

  it("follows the device turning dark while nothing is kept", () => {
    const phone = device(false);
    wireTheme();
    phone.turn(true);
    expect(button().getAttribute("aria-pressed")).toBe("true");
    expect(root.dataset.theme).toBeUndefined();
  });

  it("takes a choice made or forgotten in another tab", () => {
    device(false);
    wireTheme();
    dispatchEvent(new StorageEvent("storage", { key: THEME_KEY, newValue: "dark" }));
    expect(root.dataset.theme).toBe("dark");
    expect(button().getAttribute("aria-pressed")).toBe("true");
    dispatchEvent(new StorageEvent("storage", { key: "other", newValue: "light" }));
    expect(root.dataset.theme).toBe("dark");
    dispatchEvent(new StorageEvent("storage", { key: null }));
    expect(root.dataset.theme).toBeUndefined();
    expect(colours()).toEqual([LIGHT, DARK]);
  });

  it("still flips the page where storage is off, keeping nothing", () => {
    device(false);
    for (const method of ["getItem", "setItem", "removeItem"] as const) {
      vi.spyOn(Storage.prototype, method).mockImplementation(() => {
        throw new DOMException("denied", "SecurityError");
      });
    }
    wireTheme();
    expect(() => button().click()).not.toThrow();
    expect(root.dataset.theme).toBe("dark");
    expect(() => button().click()).not.toThrow();
    expect(root.dataset.theme).toBeUndefined();
  });
});

describe("the stylesheet", () => {
  // Dark is a reader's choice of it, or a dark device with no choice of light: a rule written for only one breaks the other.
  const CHOICE = ':root[data-theme="dark"]';
  const DEVICE = ':root:not([data-theme="light"])';
  const css = readFileSync(join(import.meta.dirname, "home.css"), "utf8").replace(/\/\*[^]*?\*\//g, "");
  const rules = (text: string) =>
    [...text.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selectors, body]) => ({
      selectors: selectors.split(",").map((one) => one.trim()),
      body: body.trim().split(/\s*;\s*/).filter(Boolean).map((declaration) => declaration.replace(/\s+/g, " ")),
    }));
  const blocks = [...css.matchAll(/@media([^{]*)\{((?:[^{}]*\{[^{}]*\})*)\s*\}/g)].map(([, query, inner]) => ({ query, inner }));
  const inDarkDevice = blocks.filter((block) => /prefers-color-scheme:\s*dark/.test(block.query)).flatMap((block) => rules(block.inner));
  const outside = rules(css.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*\s*\}/g, ""));
  const pairs = (from: ReturnType<typeof rules>, to: ReturnType<typeof rules>, mine: string, theirs: string) => {
    for (const rule of from) {
      for (const selector of rule.selectors.filter((one) => one.startsWith(mine))) {
        const twin = selector.replace(mine, theirs);
        const found = to.find((each) => each.selectors.includes(twin));
        expect(found, twin).toBeDefined();
        // color-scheme belongs to a choice alone: a device with none has the root's "light dark"
        for (const declaration of rule.body.filter((one) => !one.startsWith("color-scheme"))) expect(found!.body, `${twin} ${declaration}`).toContain(declaration);
      }
    }
  };

  it("writes every dark rule twice: for a choice of dark, and for a dark device with no choice of light", () => {
    expect(inDarkDevice.length).toBeGreaterThan(0);
    for (const rule of inDarkDevice) for (const selector of rule.selectors) expect(selector, "under a dark device").toMatch(/^:root:not\(\[data-theme="light"\]\)/);
    pairs(inDarkDevice, outside, DEVICE, CHOICE);
    pairs(outside, inDarkDevice, CHOICE, DEVICE);
  });
});

describe("theme-init.js", () => {
  it("puts a kept choice back, its colour in both theme-color tags", () => {
    device(false);
    localStorage.setItem(THEME_KEY, "dark");
    runInit();
    expect(root.dataset.theme).toBe("dark");
    expect(colours()).toEqual([DARK, DARK]);
    // and the button, wired after it, starts from there
    wireTheme();
    expect(button().getAttribute("aria-pressed")).toBe("true");
    button().click();
    expect(root.dataset.theme).toBeUndefined();
    expect(colours()).toEqual([LIGHT, DARK]);
  });

  it("does nothing with no choice kept, one it can't read, or storage it can't reach", () => {
    device(false);
    for (const kept of [null, "", "system", "Dark"]) {
      localStorage.clear();
      if (kept !== null) localStorage.setItem(THEME_KEY, kept);
      runInit();
      expect(root.dataset.theme, String(kept)).toBeUndefined();
      expect(colours(), String(kept)).toEqual([LIGHT, DARK]);
    }
    vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
      throw new DOMException("denied", "SecurityError");
    });
    expect(runInit).not.toThrow();
    expect(root.dataset.theme).toBeUndefined();
  });
});
