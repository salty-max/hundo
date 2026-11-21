import { Icon } from "./Icon";
import { Tag } from "./ui";
import { buildName, forBuild, hasBuildEntry, picksFor, recommendedBy, stepNumber, tasksFor } from "../guide";
import { useBuild } from "../store/build";
import type { Row } from "../types";

type At = "prose" | "list" | "column";

/** The reader's pick, read as one string, so a row redraws only when the pick changes. */
function usePicked() {
  const joined = useBuild((s) => s.picked.join(" "));
  return joined ? joined.split(" ") : [];
}

/** What a row holds for the pick: its steps, the picks build guides make, and the facts by stat. */
function useForRow(row: Row) {
  const picked = usePicked();
  return { picked, tasks: tasksFor(row.id, picked), picks: picksFor(row.id, picked), entries: forBuild(row.id, picked) };
}

/**
 * A row's build tag, beside its other tags: the build's name ("Pyromancer") on a row that holds a step, a pick or a fact for it. Nothing
 * for a row without any, which never reads the pick, so a guide without builds draws nothing and subscribes to nothing, and a memoised row
 * (RouteRow) redraws for a new pick only when it has some.
 */
export function BuildBadge({ row, at }: { row: Row; at: At }) {
  return hasBuildEntry(row.id) ? <Badge row={row} at={at} /> : null;
}

function Badge({ row, at }: { row: Row; at: At }) {
  const { picked, tasks, picks, entries } = useForRow(row);
  if (!tasks.length && !picks.length && !entries.length) return null;
  return (
    <>
      <Tag tag="build" at={at === "list" ? "line" : at}>
        {/* A build's name alone says nothing to a screen reader about why it's there. */}
        <span className="sr-only">For your build: </span>
        {buildName(picked)}
      </Tag>
      {at === "prose" && " "}
    </>
  );
}

/**
 * A row's build lines under its words: its steps, numbered in the build's order, then what build guides use from it, naming the guides,
 * then the facts by stat, quieter.
 */
export function BuildNote({ row, at }: { row: Row; at: At }) {
  return hasBuildEntry(row.id) ? <Note row={row} at={at} /> : null;
}

function Note({ row, at }: { row: Row; at: At }) {
  const { picked, tasks, picks, entries } = useForRow(row);
  if (!tasks.length && !picks.length && !entries.length) return null;
  // Inside a prose row's <p>, so spans shown as blocks, never a div. In a compact list it wraps under the step's words, not its box.
  return (
    <span className={`${at === "list" ? "basis-full ps-check-indent" : "mt-2"} grid gap-1.5 text-13/normal`}>
      {tasks.map((task) => (
        <span key={task.title} className="flex items-start gap-2">
          <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-primary text-11 font-extrabold text-primary tabular-nums">
            <span className="sr-only">Step </span>
            {stepNumber(task, picked)}
            <span className="sr-only"> for your build:</span>
          </span>
          <span>
            <strong>{task.title}.</strong> {task.text}
            {task.before && <span className="text-muted"> {task.before}</span>}
          </span>
        </span>
      ))}
      {picks.map((pick) => (
        <span key={pick.item} className="flex items-start gap-2">
          <span className="grid w-5 shrink-0 place-items-center pt-0.5 text-primary [&_svg]:size-3.5">
            <Icon name="star" />
          </span>
          <span>
            <span className="sr-only">Build guides use </span>
            <strong>{pick.item}</strong>: {pick.why} <span className="text-muted">· {recommendedBy(pick)}</span>
          </span>
        </span>
      ))}
      {entries.map((entry) => (
        <span key={entry.note} className="flex items-start gap-2 text-muted">
          <span aria-hidden="true" className="grid w-5 shrink-0 place-items-center">
            ·
          </span>
          <span>{entry.note}</span>
        </span>
      ))}
    </span>
  );
}
