import type { Missable, SourceLink } from "@hundo/core/types";

/**
 * Entries that can be lost for good. An entry belongs here only when two independent sources agree on the exact condition. Nothing
 * qualifies: RPG Site says nothing is permanently missable and the credits put you back before the final battle, and Realm of Darkness's
 * post-game answer has you go on collecting (facts-to-verify.md). Gwaelin's homecoming is no loss: the other way is a separate save.
 */
export const missables: Missable[] = [];

/** What the guide can honestly say while nothing is flagged. */
export const reassurance: { text: string; sources: SourceLink[] } = {
  text: "Nothing can be lost for good: the game carries on after the credits, so anything left behind can still be collected.",
  sources: [
    ["Nothing is permanently missable, and where the credits leave you (RPG Site)", "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"],
    ["What to do after the Dragonlord (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-tips/"],
  ],
};
