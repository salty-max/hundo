// The link preview's picture (og.ts) and its tags, as the build makes them from every guide in apps/.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { APPS, readGuides, type Guide } from "./guides";
import { OG_HEIGHT, OG_WIDTH, ogImage, ogTags, ringArcs, wallGuides, wallTiles, WORD, WORD_ADVANCE, WORD_HEIGHT } from "./og";
import { fillPage, HOME, make, type Made } from "./plugin";

const index = readFileSync(join(import.meta.dirname, "..", "index.html"), "utf8");
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

let guides: Guide[];
beforeAll(async () => {
  guides = await readGuides();
});

describe("the link preview", () => {
  let made: Made;
  beforeAll(async () => {
    made = await make();
  });

  const tag = (property: string) => made.og.match(new RegExp(`<meta property="${property}" content="([^"]*)">`))?.[1];

  it("names a picture the build writes, on hundo.quest, at the size its tags declare", async () => {
    const url = tag("og:image")!;
    expect(url).toMatch(new RegExp(`^${HOME}/assets/og-[0-9a-f]{10}\\.jpg$`));
    const picture = made.files.get(url.slice(HOME.length + 1)) as Buffer;
    expect(picture, url).toBeInstanceOf(Buffer);
    expect(await sharp(picture).metadata()).toMatchObject({ format: "jpeg", width: OG_WIDTH, height: OG_HEIGHT });
    expect([tag("og:image:width"), tag("og:image:height")]).toEqual([String(OG_WIDTH), String(OG_HEIGHT)]);
    // About a guide's own preview's weight (core's, each cut from one banner, are 85 to 147 kB).
    expect(picture.length).toBeLessThan(200 * 1024);
  });

  it("describes the picture by the games on it", () => {
    const alt = tag("og:image:alt")!;
    expect(alt).toMatch(/^The hundo logo over the chapter 1 banners? of /);
    for (const guide of wallGuides(guides)) expect(alt, guide.folder).toContain(guide.game.replace(/&/g, "&amp;"));
  });

  it("sits in index.html's head with the large card, and the page names itself on hundo.quest", () => {
    const head = index.split("</head>")[0];
    expect(head).toContain("<!--home:og-->");
    for (const meta of [
      '<meta property="og:type" content="website">',
      '<meta property="og:site_name" content="Hundo">',
      `<meta property="og:url" content="${HOME}/">`,
      '<meta name="twitter:card" content="summary_large_image">',
    ]) {
      expect(head).toContain(meta);
    }
    expect(head).toMatch(/<meta property="og:title" content="[^"]+">/);
    expect(head).toMatch(/<meta property="og:description" content="[^"]+">/);
  });

  it("fills index.html's head with the tags, and leaves them off the 404 page", () => {
    const page = fillPage(index, "/index.html", made);
    expect(page.split("</head>")[0]).toContain(made.og);
    expect(page).not.toContain("<!--home:");
    const lost = fillPage(readFileSync(join(import.meta.dirname, "..", "404.html"), "utf8"), "/404.html", made);
    expect(lost).not.toContain("og:image");
    expect(lost).not.toContain("<!--home:");
    expect(() => fillPage(index.replace("<!--home:og-->", ""), "/index.html", made)).toThrow("no <!--home:og-->");
  });

  it("escapes what it writes into the tags", () => {
    const tags = ogTags('https://hundo.quest/a"b', [{ game: 'Tom & "Jerry" <3' }]);
    expect(tags).toContain('content="https://hundo.quest/a&quot;b"');
    expect(tags).toContain("banner of Tom &amp; &quot;Jerry&quot; &lt;3");
  });
});

describe("the wall's guides", () => {
  it("are every guide up to six, in order", () => {
    for (const n of [1, 4, 6]) expect(wallGuides(range(n))).toEqual(range(n));
  });

  it("fill six tiles, starting again from the first under six", () => {
    expect(wallTiles(range(1))).toEqual([0, 0, 0, 0, 0, 0]);
    expect(wallTiles(range(4))).toEqual([0, 1, 2, 3, 0, 1]);
    expect(wallTiles(range(30))).toEqual(wallGuides(range(30)));
  });

  it("are six spread across A to Z past six, from the first stretch to the last, the same each build", () => {
    for (const n of [7, 13, 30, 100]) {
      const picked = wallGuides(range(n));
      expect(picked.length, `${n}`).toBe(6);
      expect(new Set(picked).size, `${n}`).toBe(6);
      expect(picked).toEqual([...picked].sort((a, b) => a - b));
      expect(picked[0], `${n}`).toBeLessThan(n / 6);
      expect(picked[5], `${n}`).toBeGreaterThanOrEqual((5 * n) / 6);
      expect(wallGuides(range(n))).toEqual(picked);
    }
  });

  it("follow the list as it grows: a 31st guide changes thirty's pick", () => {
    const names = range(30).map((i) => `game ${String(i).padStart(2, "0")}`);
    expect(wallGuides([...names, "game 99"])).not.toEqual(wallGuides(names));
  });
});

describe("the logo", () => {
  const palette = (primary: string) => ({ light: { "--primary": primary } });

  it("rings one arc per guide, in its light primary, and a whole circle for one guide", () => {
    for (const n of [2, 6, 30]) {
      const arcs = ringArcs(range(n).map((i) => palette(`#00${String(i).padStart(4, "0")}`)), 100, 100, 150);
      expect(arcs.match(/<path /g)?.length, `${n}`).toBe(n);
      expect(arcs, `${n}`).toContain(`stroke="#00${String(n - 1).padStart(4, "0")}"`);
    }
    expect(ringArcs([palette("#123456")], 100, 100, 150)).toMatch(/^<circle [^>]*stroke="#123456"/);
  });

  it("starts its ring on the left, as the page's conic gradient does, 0.2225em out (0.6em across, 0.155em thick)", () => {
    const [, x, y, r] = ringArcs([palette("#111"), palette("#222")], 0, 0, 1000).match(/^<path d="M(\S+) (\S+)A(\S+) /)!.map(Number);
    expect(r).toBe(222.5);
    expect(x).toBeLessThan(-0.99 * r);
    expect(Math.abs(y)).toBeLessThan(0.05 * r);
  });

  it("draws the word inside its advance and up to h's ascender, so a hand edit to the outlines shows", () => {
    const numbers = [...WORD.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map(([, x, y]) => [Number(x), Number(y)]);
    const xs = numbers.map(([x]) => x);
    const ys = numbers.map(([, y]) => y);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...xs)).toBeLessThan(WORD_ADVANCE * 1000);
    expect(Math.max(...xs)).toBeGreaterThan(WORD_ADVANCE * 1000 - 50);
    expect(Math.min(...ys) / -1000).toBeCloseTo(WORD_HEIGHT, 2);
    // Two outlines each for h, u and n, three for d (its bowl, its counter, its stem).
    expect(WORD.match(/M/g)?.length).toBe(9);
  });
});

describe("the picture, whatever the guides", () => {
  it("stays 1200×630 with one guide, with a banner narrower than 3:1 (Koholint's), and with thirty", async () => {
    const koholint = guides.find((guide) => guide.folder === "koholint")!;
    for (const set of [[koholint], range(30).map((i) => guides[i % guides.length])]) {
      expect(await sharp(await ogImage(set, APPS)).metadata(), `${set.length}`).toMatchObject({ width: OG_WIDTH, height: OG_HEIGHT });
    }
  });
});
