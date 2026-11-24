import type { Missable, SourceLink } from "@hundo/core/types";

/**
 * Entries that can be lost for good. An entry belongs here only when two independent sources agree on the exact condition. Nothing
 * qualifies: a failed run costs that run, and a broken streak starts again (facts-to-verify.md says how far the sources go).
 */
export const missables: Missable[] = [];

/** What the guide can honestly say while nothing is flagged. */
export const reassurance: { text: string; sources: SourceLink[] } = {
  text: "No secret is known to be lost for good: a failed run costs only that run, and a broken streak starts again on the next one.",
  sources: [
    ["Tips: the streaks, and what breaks them (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievement_Tips"],
    ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"],
  ],
};
