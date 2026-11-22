import { Popover } from "@base-ui/react/popover";
import { cva } from "class-variance-authority";
import { Fragment, useId } from "react";
import { chunks, loadFailed } from "./chunks";
import { pressTextClasses } from "./press-style";
import { whoSays as whoSaysHandle, type WhoSaysPayload } from "./who-says";
import { hasBuildLines, leadsFor, notesFor, tasksFor, warningsFor, whoSays, type Leads } from "../guide";
import { useBuild } from "../store/build";
import type { BuildNote, BuildTask, Row } from "../types";

/** Where a build's words sit: in a prose row, a compact list's row, a checklist row's text column, or the Progress page's plan. */
type At = "prose" | "list" | "column" | "plan";

/** The reader's pick, read as one string, so a row redraws only when the pick changes. */
function usePicked() {
  const joined = useBuild((s) => s.picked.join(" "));
  return joined ? joined.split(" ") : [];
}

// The build's words under the row's own, on a rail of the guide's colour, in the row's type: one size down in prose, the row's own size and
// tint in a list or a checklist row, where the text is already the smaller, muted one. In a compact list they wrap under the step's words,
// not its box.
const rail = cva("block border-s-2 border-build-line", {
  variants: {
    at: {
      prose: "mt-2 ps-3.5 text-15/[1.65] phone:ps-3",
      list: "ms-check-indent mt-1 basis-full ps-3 text-14/normal text-muted",
      column: "mt-2 ps-3 text-15/[1.6] text-muted",
      plan: "mt-1 ps-3 text-14/normal",
    },
  },
});

/** The build a line is for, as small capitals before it, read as "For your Paladin:". */
function Lead({ name }: { name: string }) {
  return (
    <span className="me-1.5 text-11 font-extrabold tracking-[0.08em] whitespace-nowrap text-soft-ink uppercase">
      <span className="sr-only">For your </span>
      {name}
      <span className="sr-only">: </span>
    </span>
  );
}

// A quiet button: dotted, muted words, 24px tall for its target, above a checklist row's label, which stretches over the whole row.
const whoClasses = `${pressTextClasses} relative z-1 inline-flex min-h-6 cursor-pointer items-center border-0 bg-transparent p-0 align-baseline font-sans text-13 font-semibold text-muted underline decoration-dotted decoration-[1.5px] underline-offset-4 hover:text-ink data-popup-open:text-ink`;

/**
 * Who says so, for these lines: a detached trigger of the one popover (who-says.ts). `of` finishes its name for a screen reader ("for your
 * Paladin, on “Join the Way of White”"), so a build's and an add-on's on one row aren't two buttons of one name. Until the popover's chunk
 * has arrived it is a plain button; a tap then loads it and opens it on this trigger.
 */
export function WhoSaysTrigger({ lines, of }: { lines: WhoSaysPayload["lines"]; of: string }) {
  const id = useId();
  const open = () => {
    if (!chunks.whoSays.get()) chunks.whoSays.load().then(() => requestAnimationFrame(() => whoSaysHandle.open(id)), loadFailed);
  };
  return (
    <Popover.Trigger handle={whoSaysHandle} payload={{ lines }} id={id} className={whoClasses} onClick={open}>
      Who says so
      <span className="sr-only">, {of}</span>
    </Popover.Trigger>
  );
}

/** A note's Who says so: who recommends each pick under it. A note with no pick under it states game facts, as the row does, and has none. */
function WhoSaysButton({ note, picked, row }: { note: BuildNote; picked: readonly string[]; row: Row }) {
  const lines = whoSays(note, picked);
  if (!lines.length) return null;
  return (
    <>
      {" "}
      <WhoSaysTrigger lines={lines} of={`for your ${leadsFor(picked).note(note)}, on “${row.title}”`} />
    </>
  );
}


/**
 * A row's words for the reader's build on its rail: the build's notes, each led by the build it's for and followed by its Who says so;
 * for a pick that reads steps (a custom one, or a build the guide hasn't written notes for yet), the steps that serve its leanings; and
 * any deadline a step sets. Spans only, so it sits inside a prose row's `<p>` as well as in the plan. `leads` name the build before each
 * line; the plan, which is the build's already, names it only beside an add-on.
 */
export function BuildWords({ row, at, picked, notes, tasks, warnings, leads }: { row: Row; at: At; picked: readonly string[]; notes: BuildNote[]; tasks: BuildTask[]; warnings: string[]; leads?: Leads }) {
  return (
    <span className={rail({ at })}>
      {notes.map((note, i) => (
        <span key={i} className="block">
          {leads && <Lead name={leads.note(note)} />}
          {note.text}
          <WhoSaysButton note={note} picked={picked} row={row} />
        </span>
      ))}
      {tasks.map((task, i) => (
        <span key={task.title} className="block">
          {leads && i === 0 && <Lead name={leads.steps} />}
          <strong className={at === "column" || at === "list" ? "text-ink" : undefined}>{task.title}.</strong> {task.text}
          {task.before && <Fragment> {task.before}</Fragment>}
        </span>
      ))}
      {warnings.map((warning) => (
        <strong key={warning} className="block">
          {warning}
        </strong>
      ))}
    </span>
  );
}

/** A row's build words under its own, for the pick only. Nothing for a row without any, which never reads the pick: a guide without builds draws nothing. */
export function BuildLines({ row, at }: { row: Row; at: Exclude<At, "plan"> }) {
  return hasBuildLines(row.id) ? <Lines row={row} at={at} /> : null;
}

function Lines({ row, at }: { row: Row; at: Exclude<At, "plan"> }) {
  const picked = usePicked();
  const notes = notesFor(row.id, picked);
  const tasks = tasksFor(row.id, picked);
  const warnings = warningsFor(row.id, picked);
  if (!notes.length && !tasks.length && !warnings.length) return null;
  return <BuildWords row={row} at={at} picked={picked} notes={notes} tasks={tasks} warnings={warnings} leads={leadsFor(picked)} />;
}
