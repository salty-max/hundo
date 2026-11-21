// @vitest-environment jsdom
// The page as the build makes it, from every guide's own files: a guide in apps/ that doesn't show here fails.
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { wireFind } from "./find";
import { wireGroup, wireProgress } from "./progress";
import { APPS, readGuides, type Guide } from "./guides";
import { GITHUB } from "./page";
import { BACKDROP_WIDTH, make, type Made } from "./plugin";

const deployed = readdirSync(APPS).filter((name) => existsSync(join(APPS, name, "vercel.json")));

describe("the landing page", () => {
  let made: Made;
  let guides: Guide[];
  beforeAll(async () => {
    [made, guides] = await Promise.all([make(), readGuides()]);
    document.body.innerHTML = made.home;
  });

  const bands = () => [...document.querySelectorAll<HTMLElement>("[data-guide]")];

  it("shows every guide, linking to its own address", async () => {
    const links = bands().map((band) => band.querySelector<HTMLAnchorElement>("h3 a")!.href.replace(/\/$/, ""));
    expect(links.length).toBe(deployed.length);
    for (const folder of deployed) {
      const guide = guides.find((each) => each.folder === folder)!;
      const link = document.querySelector(`.g-${folder} h3 a`);
      expect(link, `${folder} is on the page`).not.toBeNull();
      expect(link!.getAttribute("href"), folder).toBe(guide.home);
      expect(link!.textContent, folder).toBe(guide.game);
    }
    expect(new Set(links).size).toBe(links.length);
  });

  it("counts them", () => {
    expect(document.querySelector("#guides")!.textContent).toBe(`${deployed.length} guides`);
  });

  it("titles each band with its game, the guide's own name above it unless it is the game's, and no publisher", () => {
    for (const guide of guides.filter((each) => deployed.includes(each.folder))) {
      const band = document.querySelector(`.g-${guide.folder}`)!;
      expect(band.querySelector("h3")!.textContent, guide.folder).toBe(guide.game);
      expect(band.querySelector(".kick span")?.textContent ?? null, guide.folder).toBe(guide.mark === guide.game ? null : guide.mark);
      expect(band.textContent, guide.folder).not.toContain(guide.publisher);
      // each number held to its word, so a narrow band never wraps between the two
      expect(band.querySelector(".meta")!.textContent, guide.folder).toBe(`${guide.chapters}\u00a0chapters · ${guide.rows}\u00a0checks`);
    }
  });

  it("gives each band its banner and tile from the build, the first two loaded at once and the rest as they come near", () => {
    for (const [index, band] of bands().entries()) {
      const art = band.querySelector<HTMLImageElement>("img.art")!;
      expect(art.getAttribute("srcset")).toMatch(/^\/assets\/\S+\.webp \d+w(, \/assets\/\S+\.webp \d+w)*$/);
      for (const url of art.getAttribute("srcset")!.split(", ").map((entry) => entry.split(" ")[0].slice(1))) expect(made.files.has(url), url).toBe(true);
      expect(art.getAttribute("alt")).toBe("");
      expect(art.getAttribute("loading"), `band ${index + 1}`).toBe(index < 2 ? null : "lazy");
      expect(made.files.has(band.querySelector("img.tile")!.getAttribute("src")!.slice(1))).toBe(true);
    }
  });

  it("ships each display font with its licence, the palettes, and an icon with one arc per guide", () => {
    const css = [...made.files].find(([path]) => /^assets\/guides-\w+\.css$/.test(path))![1] as string;
    for (const folder of deployed) {
      expect(css, folder).toContain(`.g-${folder}{`);
      // dark for a reader's choice of it, and for a dark device with no choice of light
      expect(css, folder).toContain(`:root[data-theme="dark"] .g-${folder}{`);
      expect(css, folder).toContain(`@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .g-${folder}{`);
    }
    expect([...made.files.keys()].filter((path) => path.startsWith("fonts/") && path.endsWith("-OFL.txt")).length).toBeGreaterThan(0);
    for (const [, url] of css.matchAll(/url\(\/([^)]+)\)/g)) expect(made.files.has(url), url).toBe(true);
    expect((made.files.get("favicon.svg") as string).match(/<path /g)?.length).toBe(deployed.length);
    expect(made.head).toContain('rel="preload"');
  });

  it("says nothing it can't stand behind about where progress lives", () => {
    // Ticks leave the browser only through sync. Not "your progress": Count my visits, on by default, sends which chapters a tick started
    // or finished (core's counts.ts), with nothing that names the reader.
    expect(document.body.textContent).toContain("Your ticks stay in your browser unless you link a device to sync them.");
    expect(document.body.textContent).toContain("not affiliated with the games’ publishers");
  });

  it("narrows the guides as a reader types in Find, and shows the field only when its script runs", () => {
    const field = document.querySelector<HTMLElement>("[data-find]")!;
    expect(field.hidden).toBe(true);
    wireFind(document);
    expect(field.hidden).toBe(false);
    const input = field.querySelector("input")!;
    const type = (value: string) => {
      input.value = value;
      input.dispatchEvent(new Event("input"));
    };
    const first = bands()[0];
    type(first.dataset.guide!.split(" ")[0]);
    expect(first.hidden).toBe(false);
    type("no game is called this");
    expect(bands().every((band) => band.hidden)).toBe(true);
    expect(document.querySelector("[data-find-status]")!.textContent).toBe("No guide matches “no game is called this”.");
    type("");
    expect(bands().some((band) => band.hidden)).toBe(false);
    expect(document.querySelector("[data-find-status]")!.textContent).toBe("");
  });

  it("names each band by its guide's brand id, and shows a started guide's progress from its cookie, the others as they were", () => {
    expect(bands().map((band) => band.dataset.id).sort()).toEqual(guides.filter((guide) => deployed.includes(guide.folder)).map((guide) => guide.id).sort());
    const before = document.body.innerHTML;
    expect(wireProgress(document, "")).toBe(0);
    expect(document.body.innerHTML).toBe(before);
    const [first, second] = bands();
    expect(wireProgress(document, `hundo_link=abc; hundo_p_${first.dataset.id}=1.57.6`)).toBe(1);
    expect(first.querySelector(".meta")!.textContent).toBe("57% complete · Chapter\u00a06");
    expect(first.querySelector(".btn")!.textContent).toBe("Continue");
    expect(first.querySelector<HTMLElement>(".mine-bar i")!.style.width).toBe("57%");
    expect(second.querySelector(".mine-bar")).toBeNull();
    expect(second.querySelector(".btn")!.textContent).toMatch(/^Open /);
  });

  it("draws a linked browser's group over the cookies: another device's progress, and a guide reset there put back", async () => {
    document.body.innerHTML = made.home;
    const first = document.body.innerHTML;
    const [one, two] = bands();
    const cookie = `hundo_link=abc; hundo_p_${one.dataset.id}=1.57.6`;
    wireProgress(document, cookie);
    const read = async () =>
      new Map([
        [one.dataset.id!, null],
        [two.dataset.id!, { percent: 12, chapter: 3 }],
      ]);
    expect(await wireGroup(document, cookie, read)).toBe(2);
    const [reset, other] = bands();
    expect(reset.outerHTML).toBe(new DOMParser().parseFromString(first, "text/html").querySelector<HTMLElement>("[data-guide]")!.outerHTML);
    expect(other.querySelector(".meta")!.textContent).toBe("12% complete · Chapter\u00a03");
    expect(other.querySelector(".btn")!.textContent).toBe("Continue");
    document.body.innerHTML = made.home;
  });

  it("puts every guide's banner behind the hero, A to Z, the first in the markup at low priority, small copies, hidden from assistive technology", async () => {
    const backdrop = document.querySelector<HTMLElement>("main > .sky > .backdrop")!;
    expect(backdrop.nextElementSibling!.matches("section.hero")).toBe(true);
    expect(backdrop.getAttribute("aria-hidden")).toBe("true");
    const urls = backdrop.dataset.backdrop!.split(" ");
    expect(urls.map((url) => url.replace(/-backdrop-.*/, ""))).toEqual(guides.map((guide) => `/assets/${guide.folder}`));
    expect(guides.map((guide) => guide.folder)).toEqual(bands().map((band) => band.className.match(/\bg-(\w+)/)![1]));
    for (const url of urls) {
      expect(url).toMatch(new RegExp(`^/assets/\\w+-backdrop-${BACKDROP_WIDTH}-\\w+\\.webp$`));
      // every one cut to the same small size, whatever its banner's shape: the most it can count for the largest paint (plugin.ts)
      const { width, height } = await sharp(made.files.get(url.slice(1)) as Buffer).metadata();
      expect([width, height], url).toEqual([BACKDROP_WIDTH, BACKDROP_WIDTH / 3]);
    }
    // only the first is in the markup: the script fetches each next one before it's due
    const images = [...backdrop.querySelectorAll("img")];
    expect(images.length).toBe(1);
    const [first] = images;
    expect(first.getAttribute("src")).toBe(urls[0]);
    expect(first.classList.contains("on")).toBe(true);
    expect(first.getAttribute("width")).toBe(String(BACKDROP_WIDTH));
    expect(first.getAttribute("height")).toBe(String(Math.round(BACKDROP_WIDTH / 3)));
    expect(first.getAttribute("alt")).toBe("");
    expect(first.getAttribute("fetchpriority")).toBe("low");
    // and nothing asks the browser for any of them ahead of the page's own pictures
    expect(made.head + made.home).not.toMatch(/rel="preload"[^>]*-backdrop-/);
  });

  it("has the repository and the theme button in its top bar, the button shown only by the script that runs it", () => {
    for (const page of [made.home, made.notFound]) {
      document.body.innerHTML = page;
      const github = document.querySelector<HTMLAnchorElement>("header.top a.icon-btn")!;
      expect(github.getAttribute("href")).toBe(GITHUB);
      expect(GITHUB).toBe("https://github.com/salty-max/hundo");
      expect(github.target).toBe("_blank");
      expect(github.rel).toContain("noopener");
      expect(github.getAttribute("aria-label")).toBe("Hundo on GitHub (opens in a new tab)");
      const toggle = document.querySelector<HTMLButtonElement>("header.top button[data-theme-toggle]")!;
      expect(toggle.type).toBe("button");
      expect(toggle.hidden).toBe(true);
      expect(toggle.getAttribute("aria-label")).toBe("Dark theme");
      expect(toggle.getAttribute("aria-pressed")).toBe("false");
      expect(toggle.compareDocumentPosition(github) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    document.body.innerHTML = made.home;
  });

  it("has a page for an unknown address that leads back", () => {
    document.body.innerHTML = made.notFound;
    expect(document.querySelector("h1")!.textContent).toBe("Nothing here.");
    expect(document.querySelector("a.back")!.getAttribute("href")).toBe("/");
  });
});
