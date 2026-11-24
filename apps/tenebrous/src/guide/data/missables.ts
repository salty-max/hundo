import type { Missable, SourceLink } from "@hundo/core/types";

/**
 * Entries that can be lost for good. An entry belongs here only when two independent sources agree on the exact condition. Nothing
 * qualifies: two hosts say no collectible can be missed, and every area stays open after the finale (facts-to-verify.md).
 */
export const missables: Missable[] = [];

/** What the guide can honestly say while nothing is flagged. */
export const reassurance: { text: string; sources: SourceLink[] } = {
  text: "No collectible can be missed for good: every area stays open after the finale, so anything left behind waits for a later visit.",
  sources: [
    ["Every collectible, and what can be missed (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"],
    ["Mina the Hollower review (Kotaku)", "https://kotaku.com/mina-the-hollower-kotaku-review-2000699544"],
  ],
};
