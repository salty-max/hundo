import { create } from "zustand";

export type DialogState =
  | { kind: "settings" }
  /** The reader's build. `welcome`: asked once, on the first tick in a guide with builds (actions.ts). */
  | { kind: "build"; welcome?: boolean }
  | { kind: "sync" }
  | { kind: "confirm"; title: string; explanation: string; label: string; danger?: boolean; onConfirm: () => void }
  | null;

export interface Toast {
  id: number;
  message: string;
  undo?: () => void;
}

interface UiStore {
  toast: Toast | null;
  showToast: (message: string, undo?: () => void) => void;
  /** Close the toast with this id; a timer from an older toast leaves a newer one alone. */
  dismissToast: (id: number) => void;
  /** Message for the polite live region. */
  announcement: string;
  announce: (text: string) => void;
  dialog: DialogState;
  openDialog: (dialog: NonNullable<DialogState>) => void;
  closeDialog: () => void;
  /** Counts the openings, so a screen opened again while the last one is still fading out starts afresh, not with the old one's state. */
  dialogKey: number;
  /** Runs once, after the dialog it was set for (`key`) has finished closing. */
  afterClose: { key: number; run: () => void } | null;
  /**
   * Close the dialog, then run `after` when it has gone. A modal dialog hides the page behind it from screen readers until it's gone,
   * so a message announced before that is never heard.
   */
  closeDialogThen: (after: () => void) => void;
  /** Which route groups the reader opened or closed by hand. */
  openGroups: Record<string, boolean>;
  setGroupOpen: (key: string, open: boolean) => void;
  setGroupsOpen: (keys: string[], open: boolean) => void;
}

let toastId = 0;

export const useUi = create<UiStore>((set, get) => ({
  toast: null,
  showToast: (message, undo) => set({ toast: { id: ++toastId, message, undo } }),
  dismissToast: (id) => set((s) => (s.toast?.id === id ? { toast: null } : s)),
  announcement: "",
  announce: (announcement) => set({ announcement }),
  dialog: null,
  dialogKey: 0,
  openDialog: (dialog) => {
    // An action still waiting for the last dialog to finish closing is never dropped, and never left to run at some later dialog's close.
    const { afterClose, dialogKey } = get();
    set({ dialog, dialogKey: dialogKey + 1, afterClose: null });
    afterClose?.run();
  },
  closeDialog: () => set({ dialog: null }),
  afterClose: null,
  closeDialogThen: (after) => set((s) => ({ dialog: null, afterClose: { key: s.dialogKey, run: after } })),
  openGroups: {},
  setGroupOpen: (key, open) => set((s) => (s.openGroups[key] === open ? s : { openGroups: { ...s.openGroups, [key]: open } })),
  setGroupsOpen: (keys, open) =>
    set((s) => ({ openGroups: { ...s.openGroups, ...Object.fromEntries(keys.map((key) => [key, open])) } })),
}));
