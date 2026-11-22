// What the Vite plugin (plugin.ts) writes into the pages: the markup, rendered to static HTML, and the stylesheet that carries each guide's
// palette, display font and corners. Runs in Node at build.
import { renderToStaticMarkup } from "react-dom/server";
import type { Guide, Palette } from "./guides";
import { BackdropPreloads, Home, NotFound, type GuideArt } from "./page";

export const renderHome = (guides: Guide[], art: Record<string, GuideArt>) => renderToStaticMarkup(<Home guides={guides} art={art} />);
export const renderBackdropHead = (art: GuideArt["backdrop"]) => renderToStaticMarkup(<BackdropPreloads art={art} />);
export const renderNotFound = () => renderToStaticMarkup(<NotFound />);

/** hundo's own font, named apart from any guide's so a guide that sets Manrope as its display font keeps its own face. */
export const HUNDO_FONT = "Hundo Sans";

const vars = (palette: Palette) =>
  Object.entries(palette)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

// A guide's corners, as core's tokens.css sets them for its preset (brand.corners).
const CORNERS: Record<Guide["corners"], string> = {
  narrow: "--r-button:8px;--r-card:12px;--r-hero:16px;--r-tile:10px",
  normal: "--r-button:999px;--r-card:16px;--r-hero:22px;--r-tile:14px",
};

/** The gap between the logo ring's arcs, in degrees, for so many guides: the link preview's ring (og.ts) keeps it too. */
export const ringGap = (count: number) => (count > 1 ? Math.min(2.2, 360 / count / 4) : 0);

/** The logo's ring: one arc per guide in its primary, so it gains one with each new guide. */
export const ring = (guides: Guide[], theme: "light" | "dark") => {
  const step = 360 / guides.length;
  const gap = ringGap(guides.length);
  const stops = guides.flatMap((guide, i) => {
    const start = i * step + gap / 2;
    const end = (i + 1) * step - gap / 2;
    return [`${guide[theme]["--primary"]} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`, `transparent ${end.toFixed(2)}deg ${(end + gap).toFixed(2)}deg`];
  });
  return `conic-gradient(from -90deg,${stops.join(",")})`;
};

/**
 * A rule for the dark theme, as home.css writes its own: the reader's choice of dark (theme.ts, `data-theme` on the root), or a dark device
 * with no choice of light. `selector` is under the root ("" for the root itself).
 */
export const inDark = (selector: string, declarations: string) => {
  const under = (root: string) => (selector ? `${root} ${selector}` : root);
  return `${under(':root[data-theme="dark"]')}{${declarations}}\n@media (prefers-color-scheme:dark){${under(':root:not([data-theme="light"])')}{${declarations}}}`;
};

/** The stylesheet built from the guides: the fonts' faces, each guide's palette in both themes, its corners and display font, the ring. */
export const guidesCss = (guides: Guide[], fonts: { hundo: string; display: Record<string, string> }) => {
  const faces = [
    `@font-face{font-family:"${HUNDO_FONT}";src:url(${fonts.hundo}) format("woff2");font-weight:200 800;font-display:swap}`,
    ...guides
      .filter((guide, i) => guides.findIndex((other) => other.display.family === guide.display.family) === i)
      .map((guide) => `@font-face{font-family:"${guide.display.family}";src:url(${fonts.display[guide.folder]}) format("woff2");font-weight:${guide.display.weight};font-display:swap}`),
  ];
  const looks = guides.map(
    (guide) =>
      `.g-${guide.folder}{${vars(guide.light)};${CORNERS[guide.corners]};--display:"${guide.display.family}",${guide.display.fallback}}\n` +
      inDark(`.g-${guide.folder}`, vars(guide.dark)),
  );
  const rings = `:root{--ring:${ring(guides, "light")}}\n${inDark("", `--ring:${ring(guides, "dark")}`)}`;
  return [...faces, ...looks, rings].join("\n") + "\n";
};

/** The tab's icon: the logo's ring, drawn with each guide's light primary, which reads on light and dark browser chrome alike. */
export const faviconSvg = (guides: Guide[]) => {
  const step = (2 * Math.PI) / guides.length;
  const gap = guides.length > 1 ? Math.min(0.1, step / 4) : 0;
  const point = (angle: number) => `${(16 + 11 * Math.cos(angle - Math.PI / 2)).toFixed(2)} ${(16 + 11 * Math.sin(angle - Math.PI / 2)).toFixed(2)}`;
  const arcs =
    guides.length === 1
      ? [`<circle cx="16" cy="16" r="11" stroke="${guides[0].light["--primary"]}"/>`]
      : guides.map((guide, i) => {
          const start = i * step + gap / 2;
          const end = (i + 1) * step - gap / 2;
          return `<path d="M${point(start)}A11 11 0 ${end - start > Math.PI ? 1 : 0} 1 ${point(end)}" stroke="${guide.light["--primary"]}"/>`;
        });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke-width="6">${arcs.join("")}</svg>\n`;
};
