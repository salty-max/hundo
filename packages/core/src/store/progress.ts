import { create } from "zustand";
import type { Checks, Extra, Later, ProgressState } from "../types";
import { STORAGE_KEY, defaultState, validateState } from "../progress-state";
import { readChapter } from "../guide";
import { anchorFor } from "../flow";
import { recordLocalChange } from "../sync/local";

interface Loaded {
  data: ProgressState;
  error: boolean;
}

function load(): Loaded {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return { data: raw ? validateState(JSON.parse(raw)) : defaultState(), error: false };
  } catch {
    return { data: defaultState(), error: true };
  }
}

interface ProgressStore {
  data: ProgressState;
  storageError: boolean;
  setCheck: (id: string, checked: boolean) => void;
  setMany: (ids: string[], checked: boolean) => void;
  /**
   * Put entries back to an earlier state (undo): ids in `prev` become checked, the rest unchecked, and each set aside again if it was in
   * `prevLater` (a tick takes a row off the set-aside list, so undoing it puts it back).
   */
  restore: (ids: string[], prev: Checks, prevLater?: Later) => void;
  /** Set rows aside for later (each anchored to how far the reader has come), or put them back on the route. Ticked rows are skipped. */
  setLater: (ids: string[], later: boolean) => void;
  /** Put these rows' set-aside state back as `prev` had it, anchors and all (undo). Ticked rows are skipped. */
  restoreLater: (ids: string[], prev: Later) => void;
  /** Change the guide's own extra state (run log, in-game percentage…). */
  setExtra: (recipe: (extra: Extra) => Extra) => void;
  visitChapter: (chapter: number) => void;
  reveal: (chapter: number) => void;
  saveSettings: (settings: { spoilers: boolean; ceiling: number }) => void;
  /** Replace the progress with a backup. When this device is synced, the other devices follow. */
  replaceAll: (next: ProgressState) => void;
  /** Save what sync pulled from the group. It isn't a change made here, so it isn't stamped and isn't sent back. */
  applySynced: (next: ProgressState) => void;
  reloadFromStorage: () => void;
}

const initial = load();

export const useProgress = create<ProgressStore>((set, get) => {
  const save = (next: ProgressState) => {
    let storageError = false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      storageError = true;
    }
    set({ data: next, storageError });
  };
  // A change made here: saved first, then stamped for sync (nothing happens there unless this device is linked).
  const commit = (recipe: (draft: ProgressState) => ProgressState) => {
    const prev = get().data;
    const next = recipe(prev);
    save(next);
    recordLocalChange(prev, next);
  };
  // A ticked row is never set aside: ticking one takes it off the list in the same change. `wasLater` puts set-asides back (undo).
  const applyChecks = (ids: string[], isChecked: (id: string) => boolean, wasLater?: Later) =>
    commit((s) => {
      const checks = { ...s.checks };
      const later: Later = { ...s.later };
      for (const id of ids) {
        if (isChecked(id)) {
          checks[id] = true;
          delete later[id];
        } else {
          delete checks[id];
          if (wasLater?.[id] !== undefined) later[id] = wasLater[id];
        }
      }
      return withLater({ ...s, checks }, later);
    });

  return {
    data: initial.data,
    storageError: initial.error,
    setCheck: (id, checked) => applyChecks([id], () => checked),
    setMany: (ids, checked) => applyChecks(ids, () => checked),
    restore: (ids, prev, prevLater) => applyChecks(ids, (id) => prev[id] === true, prevLater),
    setLater: (ids, on) =>
      commit((s) => {
        const later: Later = { ...s.later };
        for (const id of ids) {
          if (!on) delete later[id];
          else if (s.checks[id] !== true) later[id] = anchorFor(id, s.checks, (chapter) => isOpen(s, chapter));
        }
        return withLater(s, later);
      }),
    restoreLater: (ids, prev) =>
      commit((s) => {
        const later: Later = { ...s.later };
        for (const id of ids) {
          if (prev[id] !== undefined && s.checks[id] !== true) later[id] = prev[id];
          else delete later[id];
        }
        return withLater(s, later);
      }),
    setExtra: (recipe) => commit((s) => ({ ...s, extra: recipe(s.extra) })),
    visitChapter: (chapter) => {
      if (get().data.chapter !== chapter) commit((s) => ({ ...s, chapter }));
    },
    reveal: (chapter) => commit((s) => ({ ...s, ceiling: Math.max(chapter, s.ceiling), chapter })),
    saveSettings: ({ spoilers, ceiling }) =>
      commit((s) => {
        const safe = readChapter(ceiling);
        const open = !spoilers || s.chapter <= safe;
        return { ...s, spoilers, ceiling: safe, chapter: open ? s.chapter : safe };
      }),
    replaceAll: (next) => commit(() => next),
    applySynced: save,
    reloadFromStorage: () => {
      const { data, error } = load();
      set({ data, storageError: error });
    },
  };
});

export const isOpen = (state: ProgressState, chapter: number) => !state.spoilers || chapter <= state.ceiling;

/** The state with this set-aside list, and no `later` field at all when it's empty, as a save from before it had one. */
function withLater(state: ProgressState, later: Later): ProgressState {
  const next: ProgressState = { ...state, later };
  if (!Object.keys(later).length) delete next.later;
  return next;
}
