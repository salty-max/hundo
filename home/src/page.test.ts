// @vitest-environment jsdom
// The page as the build makes it, from every guide's own files: a guide in apps/ that doesn't show here fails.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { wireFind } from "./find";
import { wireGroup, wireProgress } from "./progress";
import { APPS, readGuides, type Guide } from "./guides";
import { GITHUB, type GuideArt } from "./page";
import { BACKDROP_WIDTHS, MOBILE_BACKDROP_WIDTHS, fillPage, make, type Made } from "./plugin";
import { wireTheme } from "./theme";

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

  it("narrows the guides as a reader types in Find, and marks the field ready only when its script runs", () => {
    const field = document.querySelector<HTMLElement>("[data-find]")!;
    expect(field.dataset.ready).toBeUndefined();
    wireFind(document);
    expect(field.dataset.ready).toBe("");
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

  it("keeps the room of the controls its script shows, the Find field and the theme button, so showing them moves nothing", () => {
    // Showing the field grew the guides' bar from 26 to 82px on a phone and pushed the guides down; the button moved the tools' left edge.
    document.body.innerHTML = made.home;
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
    const sheet = document.createElement("style");
    sheet.textContent = readFileSync(join(import.meta.dirname, "home.css"), "utf8");
    document.head.append(sheet);
    try {
      const controls = [...document.querySelectorAll<HTMLElement>("[data-find], [data-theme-toggle]")];
      expect(controls.length).toBe(2);
      // laid out from the first paint, only invisible: `hidden`, or display: none, would give them no room until the script runs
      for (const control of controls) {
        expect(control.hasAttribute("hidden"), control.outerHTML).toBe(false);
        expect(getComputedStyle(control).display, control.outerHTML).not.toBe("none");
        expect(getComputedStyle(control).visibility, control.outerHTML).toBe("hidden");
      }
      wireFind(document);
      wireTheme(document);
      for (const control of controls) expect(getComputedStyle(control).visibility, control.outerHTML).toBe("visible");
      // Where scripts are off for good they go, room and all. Each rule names its class beside the attribute, to beat the display the control
      // gets further down.
      const off = [...sheet.sheet!.cssRules].find((rule) => (rule as CSSMediaRule).media?.mediaText === "(scripting: none)") as CSSMediaRule | undefined;
      expect(off, "a rule for where scripts are off").toBeDefined();
      const [rule, ...rest] = [...off!.cssRules] as CSSStyleRule[];
      expect(rest).toEqual([]);
      expect(rule.selectorText.split(",").map((part) => part.trim())).toEqual([".find[data-find]", ".icon-btn[data-theme-toggle]"]);
      expect(rule.style.display).toBe("none");
      for (const selector of [".find[data-find]", ".icon-btn[data-theme-toggle]"]) expect(document.querySelector(selector), selector).not.toBeNull();
    } finally {
      vi.unstubAllGlobals();
      sheet.remove();
      document.body.innerHTML = made.home;
    }
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

  it("serves responsive full-resolution hero art, including 4K copies, for every slide", async () => {
    const backdrop = document.querySelector<HTMLElement>("main > .sky > .backdrop")!;
    expect(backdrop.nextElementSibling!.matches("section.hero")).toBe(true);
    expect(backdrop.getAttribute("aria-hidden")).toBe("true");
    const pictures = JSON.parse(backdrop.dataset.backdrop!) as GuideArt["backdrop"][];
    expect(pictures.map((copies) => copies.wide[0].url.replace(/-backdrop-.*/, ""))).toEqual(guides.map((guide) => `/assets/${guide.folder}`));
    expect(guides.map((guide) => guide.folder)).toEqual(bands().map((band) => band.className.match(/\bg-(\w+)/)![1]));
    for (const picture of pictures) {
      expect(picture.wide.map((copy) => copy.width)).toEqual(BACKDROP_WIDTHS);
      expect(picture.narrow.map((copy) => copy.width)).toEqual(MOBILE_BACKDROP_WIDTHS);
      expect(picture.wide.at(-1)!.width).toBeGreaterThanOrEqual(3840);
      for (const [copies, ratio] of [[picture.wide, 3], [picture.narrow, 1.5]] as const) {
        for (const copy of copies) {
          const { width, height } = await sharp(made.files.get(copy.url.slice(1)) as Buffer).metadata();
          expect([width, height], copy.url).toEqual([copy.width, copy.width / ratio]);
          if ("avif" in copy) {
            const metadata = await sharp(made.files.get(copy.avif.slice(1)) as Buffer).metadata();
            expect([metadata.width, metadata.height], copy.avif).toEqual([copy.width, copy.width / ratio]);
          }
        }
      }
    }
    // only the first is in the markup: the script fetches each next one before it's due
    const images = [...backdrop.querySelectorAll("img")];
    expect(images.length).toBe(1);
    const [first] = images;
    expect(first.getAttribute("src")).toBe(pictures[0].wide.at(-1)!.url);
    expect(first.getAttribute("srcset")).toBe(pictures[0].wide.map((copy) => `${copy.url} ${copy.width}w`).join(", "));
    // A phone crops a tall slice of the 3:1 picture: 100vw alone would still select an undersized image.
    expect(first.getAttribute("sizes")).toContain("1120px");
    expect(first.classList.contains("on")).toBe(true);
    expect(first.getAttribute("width")).toBe("3840");
    expect(first.getAttribute("height")).toBe("1280");
    expect(first.getAttribute("alt")).toBe("");
    expect(first.getAttribute("fetchpriority")).toBe("high");
    // Discover the first slide in the head, before the stylesheet and below-fold art.
    const preloads = [...new DOMParser().parseFromString(made.homeHead, "text/html").querySelectorAll<HTMLLinkElement>('link[rel="preload"][as="image"]')].filter((link) => link.getAttribute("imagesrcset")?.includes("-backdrop-"));
    expect(preloads).toHaveLength(2);
    const template = readFileSync(join(import.meta.dirname, "..", "index.html"), "utf8");
    const built = fillPage(template, "/index.html", made).split("</head>")[0];
    expect(built.indexOf(made.homeHead)).toBeLessThan(built.indexOf('rel="stylesheet"'));
    const lost = fillPage(readFileSync(join(import.meta.dirname, "..", "404.html"), "utf8"), "/404.html", made);
    expect(lost).not.toContain(made.homeHead);
    const mobile = backdrop.querySelector("source")!;
    expect(mobile.getAttribute("srcset")).toBe(pictures[0].narrow.map((copy) => `${copy.avif} ${copy.width}w`).join(", "));
    expect(mobile.type).toBe("image/avif");
    expect(backdrop.querySelectorAll("source")).toHaveLength(2);
    for (const [media, image] of [["(max-width: 30rem)", mobile], ["(min-width: 30.001rem)", first]] as const) {
      const preload = preloads.find((link) => link.media === media)!;
      expect(preload.getAttribute("imagesrcset")).toBe(image.getAttribute("srcset"));
      expect(preload.getAttribute("imagesizes")).toBe(image.getAttribute("sizes"));
    }
  });

  it("has the repository and the theme button in its top bar, the button marked ready only by the script that runs it", () => {
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
      expect(toggle.hasAttribute("hidden")).toBe(false);
      expect(toggle.dataset.ready).toBeUndefined();
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
