import type { GuideConfig, Panel } from "./types";

/** Keys whose strings no reader sees: citations, storage, addresses, files, ids (a row's requirements, the splits, a build's branches), tags and settings. */
const hidden = new Set([
  "sources",
  "reference",
  "storagePrefix",
  "backupFile",
  "home",
  "movedFrom",
  "fonts",
  "banners",
  "id",
  "row",
  "tag",
  "opens",
  "steps",
  "serves",
  "quiet",
  "stats",
  "for",
  "kind",
  "role",
  "retired",
  "cover",
  "badges",
  "quantity",
  "icon",
  "layout",
  "corners",
  "requires",
  "splits",
  "branch",
  "from",
]);
/**
 * Tuples whose leading or trailing places hold identifiers: a row's id and tags, a category's icon and tone, a chip's id, the builds a pick's
 * or a build start's guide is for.
 */
const tuples: [path: RegExp, places: number[]][] = [
  [/^chapters\[\d+\]\.groups\[\d+\]\.rows\[\d+\]$/, [0, 1]],
  [/^categories\.[^.[\]]+$/, [2, 3]],
  [/^chips\.\w+\[\d+\]$/, [0]],
  [/^builds\.(picks\[\d+\]|named\[\d+\]\.start)\.(guides|lists)\[\d+\]$/, [2]],
];

/**
 * Every string a reader can see that a guide's data holds, each with its path (`chapters[12].groups[1].rows[4][2]`): a walk over the
 * whole config, so a field added later is checked without anyone listing it. Identifiers are skipped by where they sit, never by how
 * they look, since a reader's word can look like one (Koholint's "amiibo"); a new identifier field shows up as text until it is named
 * above. Links are skipped too, and the panels give their titles only, since a panel's body is a component the walk can't read.
 */
export const readerText = (config: GuideConfig, panels: Panel[] = []): [path: string, text: string][] => {
  const found: [string, string][] = [];
  const walk = (value: unknown, path: string) => {
    if (typeof value === "string") {
      if (!/^https?:\/\//.test(value)) found.push([path, value]);
    } else if (Array.isArray(value)) {
      const skip = tuples.find(([pattern]) => pattern.test(path))?.[1] ?? [];
      value.forEach((item, i) => skip.includes(i) || walk(item, `${path}[${i}]`));
    } else if (value && typeof value === "object") {
      for (const [key, item] of Object.entries(value)) if (!hidden.has(key)) walk(item, path ? `${path}.${key}` : key);
    }
  };
  walk(config, "");
  panels.forEach((panel, i) => walk(panel.title, `panels[${i}].title`));
  return found;
};
