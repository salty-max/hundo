import { Icon } from "./Icon";
import { Tag } from "./ui";
import { buildName, hasBuildLines, needsText, pickRoles, picksFor, recommendedBy, stepNumber, tasksFor } from "../guide";
import { useBuild } from "../store/build";
import type { BuildPick, PickRole, Row, Tone } from "../types";

type At = "prose" | "list" | "column";

/** The reader's pick, read as one string, so a row redraws only when the pick changes. */
function usePicked() {
  const joined = useBuild((s) => s.picked.join(" "));
  return joined ? joined.split(" ") : [];
}

/** What a row holds for the pick: its steps and the picks build guides make. */
function useForRow(row: Row) {
  const picked = usePicked();
  return { picked, tasks: tasksFor(row.id, picked), picks: picksFor(row.id, picked) };
}

/**
 * A row's build tag, beside its other tags: the build's name ("Pyromancer") on a row that holds a step or a pick for it. Nothing for a row
 * without any, which never reads the pick, so a guide without builds draws nothing and subscribes to nothing, and a memoised row (RouteRow)
 * redraws for a new pick only when it has some.
 */
export function BuildBadge({ row, at }: { row: Row; at: At }) {
  return hasBuildLines(row.id) ? <Badge row={row} at={at} /> : null;
}

function Badge({ row, at }: { row: Row; at: At }) {
  const { picked, tasks, picks } = useForRow(row);
  if (!tasks.length && !picks.length) return null;
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

/** Each role's tint, from the tones the categories use, which axe checks in every guide's look (`Tag.stories`, AllTones). */
const roleTone: Record<PickRole, Tone> = { starter: "mint", upgrade: "sky", endgame: "violet" };

/**
 * A pick's words: its role, Core and Rare drop as tags, then the item, what guides use it for, what it needs, and the guides that back the
 * reader's build, named, never linked. Spans only, so it sits inside a prose row's `<p>` as well as in the plan.
 */
export function PickWords({ pick, picked, strong = "" }: { pick: BuildPick; picked: readonly string[]; strong?: string }) {
  const needs = needsText(pick);
  return (
    <>
      <Tag tag="role" at="prose" tone={roleTone[pick.role]}>
        {pickRoles[pick.role]}
      </Tag>
      <span className="sr-only">, </span>{" "}
      {pick.core && (
        <>
          <Tag tag="core" at="prose" tone="clay">
            Core
          </Tag>
          <span className="sr-only">, </span>{" "}
        </>
      )}
      {pick.rare && (
        <>
          <Tag tag="rare" at="prose" tone="amber">
            Rare drop
          </Tag>
          <span className="sr-only">, </span>{" "}
        </>
      )}
      <span className="sr-only">build guides use </span>
      <strong className={strong}>{pick.item}</strong>: {pick.why}
      <span className="text-muted">
        {needs && ` · ${needs}`} · {recommendedBy(pick, picked)}
      </span>
    </>
  );
}

/** A step's number in the build's order, in a ring. */
export function StepNumber({ n, label }: { n: number; label: string }) {
  return (
    <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-primary text-11 font-extrabold text-primary tabular-nums">
      <span className="sr-only">Step </span>
      {n}
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** A row's build lines under its words: its steps, numbered in the build's order, then what build guides use from it, each with its role. */
export function BuildNote({ row, at }: { row: Row; at: At }) {
  return hasBuildLines(row.id) ? <Note row={row} at={at} /> : null;
}

function Note({ row, at }: { row: Row; at: At }) {
  const { picked, tasks, picks } = useForRow(row);
  if (!tasks.length && !picks.length) return null;
  // Inside a prose row's <p>, so spans shown as blocks, never a div. In a compact list it wraps under the step's words, not its box.
  return (
    <span className={`${at === "list" ? "basis-full ps-check-indent" : "mt-2"} grid gap-1.5 text-13/normal`}>
      {tasks.map((task) => (
        <span key={task.title} className="flex items-start gap-2">
          <StepNumber n={stepNumber(task, picked)} label=" for your build:" />
          <span>
            <strong>{task.title}.</strong> {task.text}
            {task.before && <span className="text-muted"> {task.before}</span>}
          </span>
        </span>
      ))}
      {picks.map((pick) => (
        <span key={`${pick.item} ${pick.for.join(" ")}`} className="flex items-start gap-2">
          <span className="grid w-5 shrink-0 place-items-center pt-0.5 text-primary [&_svg]:size-3.5">
            <Icon name="star" />
          </span>
          <span>
            <PickWords pick={pick} picked={picked} />
          </span>
        </span>
      ))}
    </span>
  );
}
