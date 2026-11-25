// @vitest-environment node
import { rmSync } from "node:fs";
import sharp from "sharp";
import page from "../index.html?raw";
import { OG_HEIGHT, OG_WIDTH, ogFile, ogImage, robotsTxt, sitemapXml, websiteJsonLd } from "../seo";
import { pwaOptions, shellValues } from "../vite";
import { brand } from "./guide";

// What a build gives crawlers and link previews (seo.ts). The policy itself, what is indexed and what never is, is search.test.tsx's.
const root = process.env.GUIDE_ROOT!;

describe("the build's search files", () => {
  it("serves a robots.txt that lets every crawler in, keeps out the API and names the sitemap on the guide's address", () => {
    expect(robotsTxt(brand.home)).toBe(`User-agent: *\nDisallow: /api/\n\nSitemap: ${brand.home}/sitemap.xml\n`);
  });

  it("lists the paths it is given, each on the guide's address (routes.test.ts holds which)", () => {
    const locs = [...sitemapXml(brand.home, ["/guide/1", "/checklist"]).matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) => loc);
    expect(locs).toEqual([`${brand.home}/guide/1`, `${brand.home}/checklist`]);
  });

  it("gives the shell a WebSite block that no text can close early", () => {
    expect(JSON.parse(websiteJsonLd(brand))).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: brand.name,
      alternateName: brand.shortName,
      url: `${brand.home}/`,
    });
    expect(websiteJsonLd({ ...brand, name: "</script><b>" })).not.toContain("<");
  });

  it("cuts the link preview picture from chapter 1's banner at 1200×630, named by its content", async () => {
    const source = await ogImage(`${root}/src/guide/banners/chapter-1.webp`);
    expect(await sharp(source).metadata()).toMatchObject({ format: "jpeg", width: OG_WIDTH, height: OG_HEIGHT });
    expect(ogFile(source)).toMatch(/^assets\/og-[0-9a-f]{10}\.jpg$/);
    expect(ogFile(source)).toBe(ogFile(Buffer.from(source)));
  });

  it("refuses, by name, a banner too narrow to cut the picture from", async () => {
    const square = `${process.env.TMPDIR ?? "/tmp"}/og-square-${process.pid}.png`;
    await sharp({ create: { width: 600, height: 600, channels: 3, background: "#000" } }).png().toFile(square);
    try {
      await expect(ogImage(square)).rejects.toThrow(`${square} is 600×600`);
    } finally {
      rmSync(square, { force: true });
    }
  });

  it("keeps the files out of the worker's app shell, which would answer them with the guide", () => {
    const denied = pwaOptions(root, brand, {}).workbox!.navigateFallbackDenylist!;
    const answered = (path: string) => !denied.some((pattern) => pattern.test(path));
    for (const path of ["/robots.txt", "/sitemap.xml", "/assets/og-0123456789.jpg", "/api/sync"]) expect(answered(path), path).toBe(false);
    for (const path of ["/", "/guide/3", "/checklist/all/2"]) expect(answered(path), path).toBe(true);
  });
});

describe("the shell's tags for link previews", () => {
  it("carries the guide's card on every address, the picture and the WebSite block, and no canonical or robots rule", () => {
    for (const tag of [
      '<meta property="og:site_name" content="%GUIDE_NAME%">',
      '<meta property="og:url" content="%GUIDE_HOME%/">',
      '<meta property="og:title" content="%GUIDE_TITLE%">',
      '<meta property="og:description" content="%GUIDE_DESCRIPTION%">',
      '<meta property="og:image" content="%GUIDE_OG_IMAGE%">',
      '<meta name="twitter:card" content="summary_large_image">',
      '<script type="application/ld+json">%GUIDE_JSONLD%</script>',
    ]) {
      expect(page).toContain(tag);
    }
    // A canonical or robots rule in the shell would hold for every address, `/guide/1/<entry>` and the unknown ones included. The file made
    // for each route has its own (routes.ts), and the page sets them for every address once it loads (Head.tsx).
    expect(page).not.toMatch(/rel="canonical"|name="robots"/);
  });

  it("fills the marks with the brand's text escaped, and the picture's address on the guide's own", () => {
    const odd = { ...brand, name: 'A "B" & <C>', title: "T & T", description: 'Say "hi"' };
    const values = shellValues(odd, { "--surface": "#fff" }, { "--surface": "#000" }, "assets/og-0123456789.jpg");
    expect(values).toMatchObject({
      NAME: "A &quot;B&quot; &amp; &lt;C&gt;",
      TITLE: "T &amp; T",
      DESCRIPTION: "Say &quot;hi&quot;",
      OG_ALT: "A &quot;B&quot; &amp; &lt;C&gt;: the chapter 1 banner",
      OG_IMAGE: `${brand.home}/assets/og-0123456789.jpg`,
    });
    expect(JSON.parse(values.JSONLD).name).toBe(odd.name);
    // every mark the template uses has a value
    for (const [, key] of page.matchAll(/%GUIDE_([A-Z_]+)%/g)) expect(values, key).toHaveProperty(key);
  });
});
