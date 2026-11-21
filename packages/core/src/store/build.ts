import { create } from "zustand";
import { brand, leanings } from "../guide";

/**
 * The leanings of this device's reader's build: what the guide points toward. A key of its own, beside the progress, like the theme: it
 * is a lens over the checklist, never progress, so it isn't synced and isn't in backups, and losing it costs a tap, not a tick. The picked
 * ids, space-separated in the guide's order ("dex fth"), or nothing.
 */
export const BUILD_KEY = `${brand.storagePrefix}.build`;

/**
 * Whether the guide has asked this device's reader for a build (the welcome on the first tick): set once they pick or skip, and never
 * cleared, so the welcome never comes back. A key apart from the pick's, which a tab still on an older build removes whenever it saves its
 * settings with no pick: an empty pick couldn't say "asked". The time it was set, in ms since the epoch.
 */
export const BUILD_ASKED_KEY = `${brand.storagePrefix}.build-asked`;

/** The ids in `value` the guide still names, in the guide's order: a leaning a later build drops is dropped from the pick. */
export const normalizeBuild = (value: unknown): string[] => {
  const ids = new Set(typeof value === "string" ? value.split(" ") : []);
  return leanings.filter((leaning) => ids.has(leaning.id)).map((leaning) => leaning.id);
};

const get = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/** Asked, or answered before there was asking: a reader who picked a build under the old Guide settings is never asked. */
const readAsked = () => get(BUILD_ASKED_KEY) !== null || (get(BUILD_KEY) ?? "").trim() !== "";

interface BuildStore {
  picked: string[];
  /** The guide has asked for a build (or the reader picked one), so the welcome stays away. */
  asked: boolean;
  setPicked: (picked: string[]) => void;
  /** The welcome was shown: whatever the reader does with it, it's answered. */
  markAsked: () => void;
  /** Re-read after another tab changed the pick. */
  sync: (value: unknown) => void;
  /** Re-read after another tab was asked. */
  syncAsked: () => void;
}

/** The ids already saved that this build doesn't name: a pick saved here keeps a leaning a newer build added in another tab. */
function unknownSaved() {
  const known = new Set(leanings.map((leaning) => leaning.id));
  return (get(BUILD_KEY) ?? "").split(" ").filter((id) => id && !known.has(id));
}

function saveAsked() {
  try {
    if (localStorage.getItem(BUILD_ASKED_KEY) === null) localStorage.setItem(BUILD_ASKED_KEY, String(Date.now()));
  } catch {
    /* storage unavailable: asked for this session only */
  }
}

export const useBuild = create<BuildStore>((set, getState) => ({
  picked: normalizeBuild(get(BUILD_KEY)),
  asked: readAsked(),
  setPicked: (next) => {
    const picked = normalizeBuild(next.join(" "));
    const saved = [...picked, ...unknownSaved()];
    try {
      if (saved.length) localStorage.setItem(BUILD_KEY, saved.join(" "));
      else localStorage.removeItem(BUILD_KEY);
    } catch {
      /* storage unavailable: the pick still applies for this session */
    }
    saveAsked();
    if (picked.join(" ") !== getState().picked.join(" ")) set({ picked });
    if (!getState().asked) set({ asked: true });
  },
  markAsked: () => {
    saveAsked();
    if (!getState().asked) set({ asked: true });
  },
  sync: (value) => {
    const picked = normalizeBuild(value);
    if (picked.join(" ") !== getState().picked.join(" ")) set({ picked });
    if (!getState().asked && readAsked()) set({ asked: true });
  },
  syncAsked: () => {
    if (!getState().asked && readAsked()) set({ asked: true });
  },
}));
