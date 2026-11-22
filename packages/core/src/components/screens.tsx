import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { Checkbox, FileField, RadioGroup, Switch } from "./controls";
// The settings screen is in the dialog's chunk, so it uses the select itself: the shell's stand-in would flash while the select loaded.
import { SelectImpl as Select } from "./select-impl";
import { DialogDescription, DialogFooter, DialogSeparator, DialogStatus, DialogText } from "./dialog";
import { StorageWarning } from "./StorageWarning";
import { Button } from "./ui";
import { brand, byId, chapters, readChapter, text } from "../guide";
import { exportProgress } from "../backup";
import { validateState } from "../progress-state";
import { isOpen, useProgress } from "../store/progress";
import { useSyncStatus } from "../store/sync";
import { canKeepAwake, useAwake } from "../store/awake";
import { declined, uncounted, useCounts } from "../counts";
import { install, useInstall } from "../store/install";
import { installed } from "../persistence";
import { normalizeTheme, themeOptions, useTheme } from "../store/theme";
import { useUi, type DialogState } from "../store/ui";
import type { ProgressState } from "../types";

type Screens = NonNullable<DialogState>;

/** A question that needs an answer. */
export function ConfirmScreen({ dialog }: { dialog: Extract<Screens, { kind: "confirm" }> }) {
  const closeDialog = useUi((s) => s.closeDialog);
  const closeDialogThen = useUi((s) => s.closeDialogThen);
  // The safe answer takes the focus when the action destroys something.
  return (
    <>
      <DialogDescription>{dialog.explanation}</DialogDescription>
      <DialogFooter>
        <Button look={dialog.danger ? "danger" : ""} data-autofocus={dialog.danger ? undefined : ""} onClick={() => closeDialogThen(dialog.onConfirm)}>
          {dialog.label}
        </Button>
        <Button data-autofocus={dialog.danger ? "" : undefined} onClick={closeDialog}>
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
}

/**
 * Installing the guide, where the browser can: Chromium's own dialog once it has offered one, or in Safari on an iPhone or iPad the way to
 * the Home Screen, with what an app added from there starts with. Nothing once the guide runs installed.
 */
function InstallSection() {
  const offer = useInstall((s) => s.offer);
  const safari = useInstall((s) => s.safari);
  if (!offer && !safari) return null;
  return (
    <>
      <DialogSeparator />
      {offer ? (
        <>
          <DialogText>Install the guide as an app, with an icon of its own.</DialogText>
          <DialogFooter>
            <Button onClick={install}>Install app</Button>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogText>To use the guide as an app, open Safari’s Share menu and choose Add to Home Screen.</DialogText>
          <DialogText small>
            The app starts with none of this tab’s progress. Sync devices here first and it should come up linked, or export a backup and
            import it in the app.
          </DialogText>
        </>
      )}
    </>
  );
}

/**
 * Theme, how far the guide reveals, keeping the screen on (where the browser can), counting visits (counts.ts), the progress backup, and
 * installing the guide. The reader's build has a dialog of its own (BuildScreen.tsx).
 */
export function SettingsScreen() {
  const data = useProgress((s) => s.data);
  const preference = useTheme((s) => s.preference);
  const keptAwake = useAwake((s) => s.on);
  const counting = useCounts((s) => s.on);
  const closeDialogThen = useUi((s) => s.closeDialogThen);
  const openDialog = useUi((s) => s.openDialog);
  const announce = useUi((s) => s.announce);
  const synced = useSyncStatus((s) => s.phase !== "off");
  const safari = useInstall((s) => s.safari);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(preference);
  const [awake, setAwake] = useState(keptAwake);
  const [count, setCount] = useState(counting);
  const [notTracked] = useState(declined);
  const [spoilers, setSpoilers] = useState(data.spoilers);
  const [ceiling, setCeiling] = useState(data.ceiling);
  const [imported, setImported] = useState<ProgressState>();
  const [feedback, setFeedback] = useState<{ text: string; error: boolean }>({ text: "", error: false });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    useTheme.getState().setPreference(theme);
    useAwake.getState().setOn(awake);
    useCounts.getState().setOn(count);
    useProgress.getState().saveSettings({ spoilers, ceiling });
    closeDialogThen(() => announce("Guide settings saved."));
    const next = useProgress.getState().data;
    const [view, param] = pathname.split("/").filter(Boolean);
    if (view === "guide" && !isOpen(next, readChapter(param, next.chapter))) navigate(`/guide/${next.chapter}`);
  };

  const pickFile = async (file: File | undefined) => {
    setImported(undefined);
    if (!file) return setFeedback({ text: "", error: false });
    try {
      if (file.size > 1_000_000) throw new Error("The backup is too large.");
      const parsed = validateState(JSON.parse(await file.text()));
      setImported(parsed);
      // Rows this build has: a newer build's backup may carry ticks it can't show, which it keeps all the same.
      const count = Object.keys(parsed.checks).filter((id) => byId.has(id)).length;
      setFeedback({ text: `${count} checked ${count === 1 ? "entry" : "entries"} found. Select Replace with backup to load them.`, error: false });
    } catch {
      setFeedback({ text: `Couldn’t read this ${brand.name} progress backup.`, error: true });
    }
  };

  const replace = () => {
    if (!imported) return;
    // A backup's ticks weren't made here: they start and finish no chapter in the visit counts.
    uncounted(() => useProgress.getState().replaceAll(imported));
    closeDialogThen(() => announce("Progress backup loaded."));
    const [view, param] = pathname.split("/").filter(Boolean);
    if (view === "guide") navigate(`/guide/${isOpen(imported, imported.chapter) ? imported.chapter : imported.ceiling}`);
    else if (!param) navigate(pathname);
  };

  return (
    <>
      <DialogText>Choose your theme and how far the guide can reveal.</DialogText>
      <form id="guide-settings" className="grid gap-2.5" onSubmit={submit}>
        <RadioGroup label="Appearance" choices={themeOptions} value={theme} onChange={(next) => setTheme(normalizeTheme(next))} />
        <Checkbox label="Hide later chapters" checked={spoilers} onChange={setSpoilers} />
        <Select
          id="ceiling"
          label="Reveal through"
          choices={chapters.map((chapter): [number, string] => [chapter.id, `Chapter ${chapter.id}`])}
          value={ceiling}
          onChange={(next) => setCeiling(readChapter(next))}
        />
        {canKeepAwake() && <Switch label="Keep screen on" checked={awake} onChange={setAwake} />}
        <Switch label="Count my visits" checked={count && !notTracked} onChange={setCount} disabled={notTracked} />
        <DialogText small>
          {notTracked
            ? "Your browser asks sites not to track it, so this guide counts nothing here."
            : "Anonymous totals, with no cookie and no id: whether the guide runs as an app, which pages and chapter numbers you open, which chapters you start or finish, and each device you link. Kept 25 months by the guides’ sync server, in Frankfurt."}
        </DialogText>
        <DialogFooter>
          <Button type="submit" look="">
            Save settings
          </Button>
        </DialogFooter>
      </form>
      <DialogSeparator />
      <DialogText>
        {text.backupBlurb} Importing replaces the current progress{synced ? ", here and on every device you sync with" : ""}.
      </DialogText>
      {!safari && !installed() && (
        <DialogText small>
          Installed on a phone or tablet? The installed app can keep its own separate storage. Export here first, then import in the installed app.
        </DialogText>
      )}
      <StorageWarning />
      <FileField id="import-file" label="Import progress backup" accept=".json,application/json" onChange={(file) => void pickFile(file)} />
      <DialogStatus error={feedback.error}>{feedback.text}</DialogStatus>
      <DialogFooter>
        <Button
          onClick={() => {
            exportProgress();
            // (the page's own announcement is behind the modal, where a screen reader can't hear it)
            setFeedback({ text: "Progress backup exported.", error: false });
          }}
        >
          Export progress
        </Button>
        <Button id="import-button" disabled={!imported} onClick={replace}>
          Replace with backup
        </Button>
        <Button onClick={() => openDialog({ kind: "sync" })}>Sync devices</Button>
      </DialogFooter>
      <InstallSection />
    </>
  );
}
