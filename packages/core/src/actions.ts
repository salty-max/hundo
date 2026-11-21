import { hasBuilds } from "./guide";
import { useBuild } from "./store/build";
import { useProgress } from "./store/progress";
import { useUi } from "./store/ui";

/**
 * Check or uncheck entries and offer an Undo toast that puts exactly the previous state back.
 * `message` describes the change ("Checked 12 in “Hyrule Field”.").
 */
export function changeChecks(ids: string[], checked: boolean, message: string) {
  const progress = useProgress.getState();
  const prev = { ...progress.data.checks };
  const changed = ids.filter((id) => (prev[id] === true) !== checked);
  if (!changed.length) return;
  progress.setMany(changed, checked);
  useUi.getState().showToast(message, () => {
    useProgress.getState().restore(changed, prev);
    useUi.getState().announce("Change undone.");
  });
  if (checked && hasBuilds) askForBuild();
}

/**
 * In a guide with builds, the reader's first tick asks once how they're playing: the build dialog's welcome. The welcome saves asked as it
 * shows (BuildScreen.tsx), so closing it in any way answers it (store/build.ts), and a reader who already has a build is never asked; if
 * its chunk can't be fetched (offline before the page's idle preload), it never shows and the next tick asks again. Never on load: a
 * visitor from search, Lighthouse and the screenshots tick nothing, so they meet no dialog. A tick, not a sync or an import, which never
 * come through here. A first Check all asks too.
 */
function askForBuild() {
  if (useBuild.getState().asked) return;
  // After the box has drawn its tick, and never over a dialog already open (or one still loading): it waits for the next tick.
  setTimeout(() => {
    const ui = useUi.getState();
    if (useBuild.getState().asked || ui.dialog) return;
    const { toast } = ui;
    ui.openDialog({ kind: "build", welcome: true });
    const stop = useUi.subscribe((state) => {
      if (state.dialog !== null) return;
      stop();
      // The modal hid the tick's toast and its Undo: show it again as the welcome closes. A welcome that never showed leaves the toast
      // that says why.
      if (toast && useBuild.getState().asked) state.showToast(toast.message, toast.undo);
    });
  }, 0);
}
