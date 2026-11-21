import type { ComponentType } from "react";
import { BuildScreen } from "./BuildScreen";
import { ConfirmScreen, SettingsScreen } from "./screens";
import { SyncScreen } from "./SyncScreen";
import type { DialogState } from "../store/ui";

type Dialogs = NonNullable<DialogState>;

export interface DialogScreen<D> {
  title: (dialog: D) => string;
  /** An alert dialog (a question that needs an answer): it isn't dismissed by a click outside it. */
  alert?: boolean;
  /** `wide` for a screen with a list or a row of fields. */
  size?: "default" | "wide";
  /** The screen's body. Mark the element that should take the focus on opening with data-autofocus; without one, the first field does. */
  Body: ComponentType<{ dialog: D }>;
}

/**
 * Every screen the dialog can show, by the `kind` in the UI store's DialogState. DialogHost picks from this map and never changes:
 * a new screen adds its kind to DialogState, its body as a component, and one entry here.
 */
export const screens: { [K in Dialogs["kind"]]: DialogScreen<Extract<Dialogs, { kind: K }>> } = {
  settings: { title: () => "Guide settings", Body: SettingsScreen },
  sync: { title: () => "Sync devices", Body: SyncScreen },
  build: { title: (dialog) => (dialog.welcome ? "How are you playing?" : "Your build"), size: "wide", Body: BuildScreen },
  confirm: { title: (dialog) => dialog.title, alert: true, Body: ConfirmScreen },
};
