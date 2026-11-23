import { useProgress } from "./store/progress";
import { useUi } from "./store/ui";

/**
 * Check or uncheck entries and offer an Undo toast that puts exactly the previous state back.
 * `message` describes the change ("Checked 12 in “Hyrule Field”.").
 */
export function changeChecks(ids: string[], checked: boolean, message: string) {
  const progress = useProgress.getState();
  const prev = { ...progress.data.checks };
  const prevLater = { ...progress.data.later };
  const changed = ids.filter((id) => (prev[id] === true) !== checked);
  if (!changed.length) return;
  progress.setMany(changed, checked);
  useUi.getState().showToast(message, () => {
    useProgress.getState().restore(changed, prev, prevLater);
    useUi.getState().announce("Change undone.");
  });
}

/**
 * Set rows aside for later, or put them back on the route, with an Undo toast that puts exactly the previous list back. `message` says
 * what happened and, setting aside, when it comes back.
 */
export function changeLater(ids: string[], later: boolean, message: string) {
  const progress = useProgress.getState();
  const { checks, later: was = {} } = progress.data;
  const changed = ids.filter((id) => checks[id] !== true && (was[id] !== undefined) !== later);
  if (!changed.length) return;
  progress.setLater(changed, later);
  useUi.getState().showToast(message, () => {
    useProgress.getState().restoreLater(changed, was);
    useUi.getState().announce("Change undone.");
  });
}

