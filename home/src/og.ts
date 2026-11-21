// The picture a shared link to hundo.quest shows (og:image), made at build from the guides like the page itself: their chapter 1 banners
// as a wall, two across and three down, and hundo's logo on a card in the middle, its ring one arc per guide. The size, the crop's lean
// and the JPEG's settings are a guide's own preview's (core's seo.ts). Runs in Node at build.
import { join } from "node:path";
import sharp from "sharp";
import type { Guide } from "./guides";
import { ringGap } from "./render";

/** How many banners the picture's wall holds, two across and three down. */
export const WALL = 6;

/**
 * The guides on the wall: every one up to six, and past six, six spread evenly across the A-to-Z list, the middle of each sixth of it. The
 * same list always gives the same six; a new guide can move some of them.
 */
export const wallGuides = <T>(guides: T[]): T[] =>
  guides.length <= WALL ? guides : Array.from({ length: WALL }, (_, i) => guides[Math.floor(((i + 0.5) * guides.length) / WALL)]);

/** The wall's six tiles: the guides on it, starting again from the first when there are fewer than six. */
export const wallTiles = <T>(guides: T[]): T[] => {
  const shown = wallGuides(guides);
  return Array.from({ length: WALL }, (_, i) => shown[i % shown.length]);
};

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const COLUMNS = 2;
const ROWS = WALL / COLUMNS;
const GAP = 6;
const CELL_WIDTH = (OG_WIDTH - GAP * (COLUMNS - 1)) / COLUMNS;
const CELL_HEIGHT = (OG_HEIGHT - GAP * (ROWS - 1)) / ROWS;
/** Where a crop sits across its banner, from 0 (the left edge) to 1, as core's OG_LEAN: the banners keep their detail right of centre. */
const LEAN = 0.7;

/** home.css's colours: the light theme's --surface and --ink for the card and the word, the dark theme's --paper between the banners. */
const CARD = "#fffdf9";
const INK = "#1b1a18";
const PAPER = "#0f0f11";

/**
 * "hund" as the page's logo sets it (home.css's .logo: Manrope at weight 800, letter-spacing -0.05em), in outlines measured in thousandths
 * of an em, the baseline at 0, h's origin at 0. Sharp sets text through Pango, which can't read the woff2 the page ships and quietly uses
 * another face, so the word is drawn from these. To make them again: a page that sets "hund" at 200px in src/fonts/manrope.woff2 with the
 * logo's weight and letter-spacing, printed by `chrome --headless --print-to-pdf`, then `pdftocairo -svg` on the PDF; each glyph's path
 * moved to its <use>'s x (less the first's) and scaled by 1000/150, the PDF's em being 150pt.
 */
export const WORD ="M437.8 0L437.8 -254.9C437.8 -267.2 437.1 -282.9 435.8 -302.1C434.4 -321.2 430.3 -340.5 423.3 -359.8C416.3 -379.1 404.9 -395.3 389 -408.3C373.2 -421.3 350.8 -427.8 321.8 -427.8C310.2 -427.8 297.7 -425.9 284.3 -422.3C271 -418.6 258.5 -411.5 246.9 -401C235.2 -390.5 225.6 -375.1 218.1 -354.8C210.6 -334.5 206.9 -307.5 206.9 -273.9L128.9 -310.8C128.9 -353.5 137.6 -393.5 154.9 -430.8C172.2 -468.1 198.3 -498.2 233.1 -521.2C267.9 -544.2 311.8 -555.7 364.8 -555.7C407.1 -555.7 441.6 -548.5 468.3 -534.2C494.9 -519.9 515.7 -501.7 530.5 -479.7C545.3 -457.8 555.9 -434.8 562.2 -411C568.5 -387.2 572.4 -365.5 573.7 -345.8C575 -326.2 575.7 -311.8 575.7 -302.8L575.7 0ZM69 0L69 -719.6L189.9 -719.6L189.9 -349.8L206.9 -349.8L206.9 0ZM856.5 16C814.2 16 779.7 8.8 753.1 -5.5C726.4 -19.8 705.7 -38 690.9 -60C676.1 -82 665.5 -104.9 659.2 -128.7C652.8 -152.5 649 -174.2 647.7 -193.9C646.3 -213.5 645.7 -227.9 645.7 -236.9L645.7 -539.7L783.6 -539.7L783.6 -284.8C783.6 -272.5 784.3 -256.8 785.6 -237.6C786.9 -218.5 791.1 -199.2 798.1 -179.9C805.1 -160.6 816.5 -144.4 832.3 -131.4C848.1 -118.4 870.5 -112 899.5 -112C911.2 -112 923.7 -113.8 937 -117.4C950.3 -121.1 962.8 -128.2 974.5 -138.7C986.1 -149.2 995.7 -164.7 1003.2 -185.2C1010.7 -205.7 1014.5 -232.6 1014.5 -265.9L1092.4 -228.9C1092.4 -186.2 1083.8 -146.2 1066.4 -108.9C1049.1 -71.6 1023 -41.5 988.2 -18.5C953.4 4.5 909.5 16 856.5 16ZM1031.4 0L1031.4 -178.9L1014.5 -178.9L1014.5 -539.7L1151.4 -539.7L1151.4 0ZM1609.1 0L1609.1 -254.9C1609.1 -267.2 1608.5 -282.9 1607.1 -302.1C1605.8 -321.2 1601.6 -340.5 1594.7 -359.8C1587.7 -379.1 1576.2 -395.3 1560.4 -408.3C1544.6 -421.3 1522.2 -427.8 1493.2 -427.8C1481.5 -427.8 1469.1 -425.9 1455.7 -422.3C1442.4 -418.6 1429.9 -411.5 1418.2 -401C1406.6 -390.5 1397 -375.1 1389.5 -354.8C1382 -334.5 1378.3 -307.5 1378.3 -273.9L1300.3 -310.8C1300.3 -353.5 1309 -393.5 1326.3 -430.8C1343.6 -468.1 1369.7 -498.2 1404.5 -521.2C1439.3 -544.2 1483.2 -555.7 1536.2 -555.7C1578.5 -555.7 1613 -548.5 1639.6 -534.2C1666.3 -519.9 1687 -501.7 1701.8 -479.7C1716.7 -457.8 1727.2 -434.8 1733.6 -411C1739.9 -387.2 1743.7 -365.5 1745.1 -345.8C1746.4 -326.2 1747.1 -311.8 1747.1 -302.8L1747.1 0ZM1240.3 0L1240.3 -539.7L1361.3 -539.7L1361.3 -360.8L1378.3 -360.8L1378.3 0ZM2035.9 15C1986.3 15 1942.8 2.5 1905.5 -22.5C1868.2 -47.5 1839.1 -81.5 1818.3 -124.4C1797.5 -167.4 1787 -215.9 1787 -269.8C1787 -324.8 1797.6 -373.7 1818.8 -416.5C1839.9 -459.3 1869.7 -493.1 1908 -517.7C1946.3 -542.4 1991.3 -554.7 2042.9 -554.7C2094.2 -554.7 2137.4 -542.2 2172.3 -517.2C2207.3 -492.2 2233.8 -458.3 2251.8 -415.3C2269.8 -372.3 2278.8 -323.8 2278.8 -269.8C2278.8 -215.9 2269.7 -167.4 2251.5 -124.4C2233.4 -81.5 2206.3 -47.5 2170.3 -22.5C2134.4 2.5 2089.5 15 2035.9 15ZM2057.9 -105.9C2088.2 -105.9 2112.5 -112.8 2130.6 -126.4C2148.8 -140.1 2161.9 -159.2 2169.9 -183.9C2177.8 -208.6 2181.8 -237.2 2181.8 -269.8C2181.8 -302.5 2177.8 -331.1 2169.9 -355.8C2161.9 -380.5 2149.1 -399.6 2131.6 -413.3C2114.1 -426.9 2091.2 -433.8 2062.9 -433.8C2032.6 -433.8 2007.7 -426.4 1988.2 -411.5C1968.7 -396.7 1954.3 -376.9 1945 -352.1C1935.6 -327.2 1931 -299.8 1931 -269.8C1931 -239.5 1935.5 -212 1944.5 -187.2C1953.4 -162.3 1967.3 -142.6 1985.9 -127.9C2004.6 -113.3 2028.6 -105.9 2057.9 -105.9ZM2181.8 0L2181.8 -369.8L2164.9 -369.8L2164.9 -719.6L2301.8 -719.6L2301.8 0Z";
/** How far "hund" runs, its last letter-spacing included, in ems: where the ring's 0.04em margin starts. Taken from the same PDF of "hundh". */
export const WORD_ADVANCE = 2.3218;
/** h's ascender, the word's height above the baseline, in ems. */
export const WORD_HEIGHT = 0.72;
/** The ring, as home.css's .o: 0.6em across, 0.155em thick, 0.04em after the word, on the baseline. */
const RING = { margin: 0.04, size: 0.6, thickness: 0.155 };
const LOGO_WIDTH = WORD_ADVANCE + RING.margin + RING.size;
/** The logo's size on the card, in px to the em, and the card's room around it. */
const EM = 150;
const CARD_PADDING = 64;
const CARD_HEIGHT = 236;

type Shown = Pick<Guide, "folder" | "game" | "light">;

/**
 * The logo's ring as SVG: one arc per guide in its light primary, from the left and clockwise with the page's gaps, as the page draws it
 * (render.tsx's `ring`, a conic gradient from -90deg). `cx` and `cy` are its centre, `em` the logo's size.
 */
export const ringArcs = (guides: Pick<Guide, "light">[], cx: number, cy: number, em: number) => {
  const r = ((RING.size - RING.thickness) / 2) * em;
  const paint = (colour: string) => `fill="none" stroke="${colour}" stroke-width="${(RING.thickness * em).toFixed(2)}"`;
  if (guides.length === 1) return `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(2)}" ${paint(guides[0].light["--primary"])}/>`;
  const step = 360 / guides.length;
  const gap = ringGap(guides.length);
  // A point on the ring at an angle clockwise from the top, as CSS turns a conic gradient.
  const at = (degrees: number) => {
    const angle = (degrees * Math.PI) / 180;
    return `${(cx + r * Math.sin(angle)).toFixed(2)} ${(cy - r * Math.cos(angle)).toFixed(2)}`;
  };
  return guides
    .map((guide, i) => {
      const start = -90 + i * step + gap / 2;
      const end = -90 + (i + 1) * step - gap / 2;
      return `<path d="M${at(start)}A${r.toFixed(2)} ${r.toFixed(2)} 0 ${end - start > 180 ? 1 : 0} 1 ${at(end)}" ${paint(guide.light["--primary"])}/>`;
    })
    .join("");
};

/** The card and the logo, over the wall: the word in ink, the ring with every guide (not only the six on the wall). */
const logoCard = (guides: Pick<Guide, "light">[]) => {
  const cardWidth = Math.round(LOGO_WIDTH * EM + 2 * CARD_PADDING);
  const x = (OG_WIDTH - cardWidth) / 2;
  const y = (OG_HEIGHT - CARD_HEIGHT) / 2;
  const left = (OG_WIDTH - LOGO_WIDTH * EM) / 2;
  const baseline = (OG_HEIGHT + WORD_HEIGHT * EM) / 2;
  const ringCentre = left + (WORD_ADVANCE + RING.margin + RING.size / 2) * EM;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">`,
    `<filter id="shadow" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="18"/></filter>`,
    `<rect x="${x}" y="${y + 10}" width="${cardWidth}" height="${CARD_HEIGHT}" rx="28" fill="#000" opacity=".55" filter="url(#shadow)"/>`,
    `<rect x="${x}" y="${y}" width="${cardWidth}" height="${CARD_HEIGHT}" rx="28" fill="${CARD}"/>`,
    `<path transform="translate(${left} ${baseline}) scale(${EM / 1000})" fill="${INK}" d="${WORD}"/>`,
    ringArcs(guides, ringCentre, baseline - (RING.size / 2) * EM, EM),
    `</svg>`,
  ].join("");
};

/** A banner cut to a cell's shape, from its full height and leaning right, or from its full width if it's narrower than that. */
const cut = async (banner: string) => {
  const { width = 0, height = 0 } = await sharp(banner).metadata();
  const cropWidth = Math.round((height * CELL_WIDTH) / CELL_HEIGHT);
  const cropHeight = Math.round((width * CELL_HEIGHT) / CELL_WIDTH);
  const box =
    cropWidth <= width
      ? { left: Math.round((width - cropWidth) * LEAN), top: 0, width: cropWidth, height }
      : { left: 0, top: Math.round((height - cropHeight) / 2), width, height: cropHeight };
  return sharp(banner).extract(box).resize(CELL_WIDTH, CELL_HEIGHT).toBuffer();
};

/** The picture, a 1200×630 JPEG. `apps` holds the guides' folders. With fewer than six guides, the wall starts again from the first. */
export const ogImage = async (guides: Shown[], apps: string) => {
  const wall = await Promise.all(
    wallTiles(guides).map(async (guide, i) => ({
      input: await cut(join(apps, guide.folder, "src", "guide", "banners", "chapter-1.webp")),
      left: (i % COLUMNS) * (CELL_WIDTH + GAP),
      top: Math.floor(i / COLUMNS) * (CELL_HEIGHT + GAP),
    })),
  );
  return sharp({ create: { width: OG_WIDTH, height: OG_HEIGHT, channels: 3, background: PAPER } })
    .composite([...wall, { input: Buffer.from(logoCard(guides)) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
};

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The picture's tags for index.html's head. `url` is its full address: a link preview fetches it from wherever the link was shared. */
export const ogTags = (url: string, guides: Pick<Guide, "game">[]) => {
  const shown = wallGuides(guides);
  const games = new Intl.ListFormat("en", { type: "conjunction" }).format(shown.map((guide) => guide.game));
  const alt = `The hundo logo over the chapter 1 ${shown.length === 1 ? "banner" : "banners"} of ${games}`;
  return [
    `<meta property="og:image" content="${escapeHtml(url)}">`,
    `<meta property="og:image:width" content="${OG_WIDTH}">`,
    `<meta property="og:image:height" content="${OG_HEIGHT}">`,
    `<meta property="og:image:alt" content="${escapeHtml(alt)}">`,
  ].join("\n    ");
};
