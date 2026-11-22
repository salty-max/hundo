import { Collapsible } from "@base-ui/react/collapsible";
import { Link } from "react-router";
import { CheckBox } from "./CheckBox";
import { Icon } from "./Icon";
import { rowLinkClasses } from "./TickItem";
import { BuildWords } from "./BuildMark";
import { Button, Empty, Panel, PanelActions, PanelHead, PanelText, PanelTitle, Tag } from "./ui";
import { buildName, buildOf, buildPlan, chapters, leadsFor, readsNotes, weaponTrack, type PlanRow, type TrackStage } from "../guide";
import { two } from "../format";
import { isOpen, useProgress } from "../store/progress";
import { useBuild } from "../store/build";
import { useUi } from "../store/ui";
import type { Chapter } from "../types";

/**
 * The Progress page's Your build: the build's weapon track, then its plan, chapter by chapter in the chapters revealed, each row that holds
 * something for it with the build's words for it, ticked in place. Drawn whenever the guide has builds, so its address (/dashboard/build) means the same with or
 * without a pick; without one it says how to choose one.
 */
export function BuildPanel() {
  const picked = useBuild((s) => s.picked);
  const openDialog = useUi((s) => s.openDialog);

  return (
    <Panel id="build" aria-labelledby="build-title">
      <PanelHead>
        <PanelTitle id="build-title">{picked.length ? `Your build: ${buildName(picked)}` : "Your build"}</PanelTitle>
        <PanelText>
          {/* A pick that reads steps (a custom one, or a build without notes yet) has no weapon track, so it isn't promised one. */}
          {!picked.length
            ? "Pick the build you play, and what each row means for it shows here, chapter by chapter. It changes no count."
            : readsNotes(picked)
              ? "Your weapon, then what each row means for the build, chapter by chapter in the chapters you’ve revealed. It changes no count."
              : "The steps to the build, chapter by chapter in the chapters you’ve revealed. It changes no count."}
        </PanelText>
      </PanelHead>
      {/* Keyed on the pick, so a new one opens its chapters afresh. */}
      {picked.length > 0 && <Plan key={picked.join(" ")} picked={picked} />}
      <PanelActions>
        <Button onClick={() => openDialog({ kind: "build" })}>{picked.length ? "Change build" : "Choose your build"}</Button>
      </PanelActions>
    </Panel>
  );
}

function Plan({ picked }: { picked: string[] }) {
  const data = useProgress((s) => s.data);
  const plan = buildPlan((n) => isOpen(data, n), picked);
  const track = weaponTrack((n) => isOpen(data, n), picked);
  const hidden = chapters.filter((chapter) => !isOpen(data, chapter.id)).length;
  if (!plan.length && !track.length) return <Empty>Nothing in the chapters you’ve revealed is for this build yet. More shows as you reveal chapters.</Empty>;
  return (
    <div className="grid gap-2">
      {track.length > 0 && <Track stages={track} more={hidden > 0} />}
      {plan.map(({ chapter, rows }) => (
        <ChapterPart key={chapter.id} chapter={chapter} rows={rows} picked={picked} />
      ))}
      {hidden > 0 && (
        <p className="flex items-center gap-2 border-t border-line-soft pt-3 text-13 text-muted [&_svg]:size-4">
          <Icon name="lock" />
          {hidden === 1 ? "One more chapter is" : `${hidden} more chapters are`} hidden by spoiler protection: what they hold for the build shows as you reveal them.
        </p>
      )}
    </div>
  );
}

/**
 * A chapter of the plan, open while anything in it is unticked when the page draws it. It doesn't close as its last row is ticked: the list
 * stays where it is under the pointer.
 */
function ChapterPart({ chapter, rows, picked }: { chapter: Chapter; rows: PlanRow[]; picked: string[] }) {
  const checks = useProgress((s) => s.data.checks);
  const done = rows.filter(({ row }) => checks[row.id] === true).length;
  return (
    <Collapsible.Root defaultOpen={done < rows.length} className="border-t border-line-soft first:border-t-0">
      <h3 className="m-0">
        <Collapsible.Trigger className="group flex min-h-11 w-full cursor-pointer items-center gap-2 border-0 bg-transparent px-0 py-2 text-left font-sans [&_svg]:size-4 [&_svg]:text-muted [&_svg]:transition-transform data-panel-open:[&_svg]:rotate-180">
          <span className="flex-1 text-12 font-extrabold tracking-[0.04em] text-muted uppercase">
            Chapter {two(chapter.id)} · {chapter.title}
          </span>
          <span className="text-12 font-bold text-muted tabular-nums">
            {done === rows.length ? "Done" : `${done} of ${rows.length}`}
          </span>
          <Icon name="down" />
        </Collapsible.Trigger>
      </h3>
      <Collapsible.Panel>
        <ul className="list-none p-0 pb-2">
          {rows.map((item) => (
            <PlanItem key={item.row.id} item={item} picked={picked} ticked={checks[item.row.id] === true} />
          ))}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

/** A row in the plan: its box and title, then the build's words for it on their rail, and Jump to. */
function PlanItem({ item: { row, notes, tasks, warnings }, picked, ticked }: { item: PlanRow; picked: string[]; ticked: boolean }) {
  const id = `plan-${row.id}`;
  // The panel is the build's already: a line names its build only beside an add-on, where two builds share the rows.
  const leads = (buildOf(picked)?.addons.length ?? 0) > 0 ? leadsFor(picked) : undefined;
  return (
    <li className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 border-t border-line-soft py-2.5 first:border-t-0 phone:gap-2.5">
      <CheckBox id={id} labelId={`${id}-label`} row={row} />
      <div className="grid leading-[1.3]">
        <label id={`${id}-label`} htmlFor={id} className="cursor-pointer">
          <strong className={ticked ? "text-15 text-muted line-through decoration-1" : "text-15"}>{row.title}</strong>
          {row.tags.includes("missable") && (
            <>
              {" "}
              <Tag tag="missable" at="prose" />
            </>
          )}
        </label>
        <BuildWords row={row} at="plan" picked={picked} notes={notes} tasks={tasks} warnings={warnings} leads={leads} />
      </div>
      <Link className={rowLinkClasses} to={`/guide/${row.chapter}/${row.id}`} aria-label={`Jump to “${row.title}” in chapter ${row.chapter}`}>
        Jump to
      </Link>
    </li>
  );
}

/**
 * The build's weapon track: how guides start it, then each stage its notes name, in route order, from the revealed chapters: the weapon as
 * each row leaves it, a pick's role where it is one, and its chapter. Only the start says why, since the plan under it holds the words. A stage is
 * filled once its row is ticked (the start always is), and its name jumps to the row. Nothing says what hidden chapters hold, only that more
 * shows as they're revealed.
 */
function Track({ stages, more }: { stages: TrackStage[]; more: boolean }) {
  const checks = useProgress((s) => s.data.checks);
  return (
    <section aria-labelledby="build-track" className="grid gap-2.5 rounded-card border border-soft-line bg-soft px-4 py-3.5 phone:p-3">
      <h3 id="build-track" className="m-0 flex items-center gap-2 text-12 font-extrabold tracking-[0.04em] text-soft-ink uppercase [&_svg]:size-4 [&_svg]:text-primary">
        <Icon name="sword" />
        Main weapon
      </h3>
      <ol className="m-0 grid list-none p-0">
        {stages.map((stage, i) => (
          <Stage key={"start" in stage ? "start" : stage.row.id} stage={stage} last={i === stages.length - 1} done={"start" in stage || checks[stage.row.id] === true} />
        ))}
      </ol>
      {more && <p className="text-12/normal text-muted">More shows as you reveal chapters.</p>}
    </section>
  );
}

function Stage({ stage, done, last }: { stage: TrackStage; done: boolean; last: boolean }) {
  const when = "start" in stage ? "from the start" : `ch. ${stage.row.chapter}`;
  // The start says the class it's carried by, then its why, which is written to follow "Weapon:", so it takes a capital and a full stop.
  const why = "start" in stage ? [`Starting as ${stage.start.class}.`, stage.start.why && `${stage.start.why[0].toUpperCase()}${stage.start.why.slice(1)}.`].filter(Boolean).join(" ") : "";
  return (
    <li className={`relative grid grid-cols-[0.875rem_minmax(0,1fr)_auto] gap-x-2.5 ${last ? "" : "pb-3"}`}>
      {/* The line down to the next stage, behind the dots. */}
      {!last && <span aria-hidden="true" className="absolute inset-s-1.5 top-4 bottom-0 w-0.5 bg-line" />}
      <span aria-hidden="true" className={`relative mt-0.5 size-3.5 rounded-full border-2 border-primary ${done ? "bg-primary" : "bg-surface"}`} />
      <span className="grid min-w-0 gap-0.5">
        <span>
          {"start" in stage ? (
            <strong className="text-14/sm">{stage.start.weapon}</strong>
          ) : (
            <Link to={`/guide/${stage.row.chapter}/${stage.row.id}`} className="text-14/sm font-bold text-ink underline decoration-line underline-offset-3 hover:decoration-primary">
              {stage.note.stage}
            </Link>
          )}{" "}
          {("start" in stage || stage.word) && (
            <span className="text-11 font-extrabold tracking-[0.07em] whitespace-nowrap text-soft-ink uppercase">
              <span className="sr-only">, </span>
              {"start" in stage ? "Starting weapon" : stage.word}
            </span>
          )}
          {done && "row" in stage && <span className="sr-only"> (done)</span>}
        </span>
        {why && <span className="text-13/normal text-muted">{why}</span>}
      </span>
      <span className="text-12/normal font-bold whitespace-nowrap text-muted tabular-nums">{when}</span>
    </li>
  );
}
