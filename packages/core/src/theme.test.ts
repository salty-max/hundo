// @vitest-environment node
import appCss from "./app.css?raw";
import tokensCss from "./tokens.css?raw";
import themeCss from "virtual:guide/theme.css?raw";

// Every stylesheet in core, as text, for the "only defined tokens" check.
const coreCss = Object.values(import.meta.glob<string>("./**/*.css", { query: "?raw", import: "default", eager: true })).join("\n");

const PALETTE = ["--paper", "--surface", "--raised", "--ink", "--muted", "--line", "--primary", "--on-primary", "--accent", "--on-accent", "--focus"];
const LIGHT = ":root";
const DARK = ':root[data-theme="dark"]';

type Block = { selector: string; values: Record<string, string> };
const blocks = (css: string): Block[] =>
  [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
    selector: selector.trim(),
    values: Object.fromEntries(
      body
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((declaration) => [declaration.slice(0, declaration.indexOf(":")).trim(), declaration.slice(declaration.indexOf(":") + 1).trim()]),
    ),
  }));

const theme = blocks(themeCss);
const core = blocks(tokensCss);
const valuesFor = (list: Block[], selector: string) => list.find((block) => block.selector === selector)?.values ?? {};

/** Every token as the browser resolves it in one theme: the guide's palette plus core's derived and fixed colours. */
const tokens = (dark: boolean) => ({
  ...valuesFor(core, LIGHT),
  ...(dark ? valuesFor(core, DARK) : {}),
  ...valuesFor(theme, LIGHT),
  ...(dark ? valuesFor(theme, DARK) : {}),
});

type Rgb = [number, number, number];
const parseHex = (hex: string): Rgb => {
  const full = hex.length === 4 ? [...hex.slice(1)].map((digit) => digit + digit).join("") : hex.slice(1, 7);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb;
};
/** Resolves a token to a colour, following core's `color-mix(in srgb,var(--a) N%,var(--b))` derivations. */
const resolve = (all: Record<string, string>, name: string): Rgb => {
  const value = all[name];
  if (value?.startsWith("#")) return parseHex(value);
  const mix = /^color-mix\(in srgb,var\((--[a-z0-9-]+)\) ([\d.]+)%,var\((--[a-z0-9-]+)\)\)$/.exec(value ?? "");
  if (!mix) throw new Error(`${name} is not a colour this test can resolve: ${value}`);
  const [a, b, share] = [resolve(all, mix[1]), resolve(all, mix[3]), Number(mix[2]) / 100];
  return a.map((channel, i) => channel * share + b[i] * (1 - share)) as Rgb;
};
const luminance = (rgb: Rgb) => {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum]: 4.5 for text, 3 for checkbox edges, the ticked fill, a progress bar's fill on its track and the focus ring.
const PAIRS: [string, string, number][] = [
  ...["--paper", "--surface", "--raised", "--rail", "--hero-from", "--hero-to"].map((bg): [string, string, number] => ["--ink", bg, 4.5]),
  ...["--paper", "--surface", "--raised", "--rail"].map((bg): [string, string, number] => ["--muted", bg, 4.5]),
  ["--primary", "--paper", 4.5],
  ["--primary", "--surface", 4.5],
  ["--on-primary", "--primary", 4.5],
  ["--on-accent", "--accent", 4.5],
  ["--soft-ink", "--soft", 4.5],
  // The build's Main weapon track: titles and its quieter lines on the soft card (BuildPanel.tsx).
  ["--ink", "--soft", 4.5],
  ["--muted", "--soft", 4.5],
  ["--primary", "--soft", 3],
  ["--paper", "--ink", 4.5],
  ["--edge", "--surface", 3],
  ["--primary", "--surface", 3],
  ["--primary", "--bar-track", 3],
  ["--focus", "--paper", 3],
  ["--focus", "--surface", 3],
];

describe("guide theme", () => {
  it("sets exactly the palette, as plain colours, for light and dark", () => {
    expect(theme.map((block) => block.selector)).toEqual([LIGHT, DARK]);
    for (const { selector, values } of theme) {
      expect(Object.keys(values).sort(), selector).toEqual([...PALETTE].sort());
      for (const [name, value] of Object.entries(values)) expect(value, `${selector} ${name}`).toMatch(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    }
  });

  it("keeps core's tokens, and the media queries that resize them, in the lowest layer, with preflight in the base above it", () => {
    // An unlayered rule beats every layer, so a token (or --bar-h and --rail-w on a phone) left outside @layer theme would beat the
    // palette and everything a guide sets after it.
    const app = appCss.replace(/\/\*[\s\S]*?\*\//g, "");
    const order = (/@layer\s+([\w\s,-]+);/.exec(app)?.[1] ?? "").split(",").map((name) => name.trim());
    expect(order.indexOf("theme"), "the layer order in app.css").toBeGreaterThanOrEqual(0);
    expect(order).toEqual(["theme", "base", "components", "utilities"]);
    // tokens.css is imported as it is (its own @layer theme applies), and Tailwind's preflight into the base layer.
    expect(app).toContain('@import "./tokens.css";');
    expect(app).toContain('@import "tailwindcss/preflight.css" layer(base);');
    // Every :root in tokens.css sits inside the `@layer theme { … }` block.
    const css = tokensCss.replace(/\/\*[\s\S]*?\*\//g, "");
    const start = css.indexOf("@layer theme");
    let depth = 0;
    let end = -1;
    for (let i = css.indexOf("{", start); i < css.length && end < 0; i++) {
      depth += css[i] === "{" ? 1 : css[i] === "}" ? -1 : 0;
      if (depth === 0) end = i;
    }
    const roots = [...css.matchAll(/:root/g)].map((match) => match.index);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(roots.length).toBeGreaterThan(0);
    for (const index of roots) expect(index > start && index < end, `:root at ${index} is outside @layer theme (${start}–${end})`).toBe(true);
  });

  it("keeps text and controls legible in both themes", () => {
    for (const dark of [false, true]) {
      const all = tokens(dark);
      for (const [fg, bg, min] of PAIRS) {
        const ratio = contrast(resolve(all, fg), resolve(all, bg));
        expect(ratio, `${dark ? "dark" : "light"}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(min);
      }
    }
  });

  it("only uses tokens that the palette or core defines", () => {
    const defined = new Set([...PALETTE, ...core.flatMap((block) => Object.keys(block.values)), "--display", "--sans"]);
    const used = new Set([...coreCss.matchAll(/var\((--[a-z0-9-]+)/g)].map(([, name]) => name));
    // Raw CSS loads empty unless it's let through (vite.ts's test.css.include): a glob that matched nothing must not pass.
    expect(used.size, "core's stylesheets loaded as text").toBeGreaterThan(30);
    expect([...used].filter((name) => !defined.has(name))).toEqual([]);
  });
});
