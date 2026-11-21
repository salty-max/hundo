import { Collapsible } from "@base-ui/react/collapsible";
import { Link } from "react-router";
import { CheckBox } from "./CheckBox";
import { Icon } from "./Icon";
import { rowLinkClasses } from "./TickItem";
import { Button, Empty, Panel, PanelActions, PanelHead, PanelText, PanelTitle, Tag } from "./ui";
import { buildName, buildPlan, chapters, recommendedBy, stepNumber, type PlanRow } from "../guide";
import { two } from "../format";
import { isOpen, useProgress } from "../store/progress";
import { useBuild } from "../store/build";
import { useUi } from "../store/ui";
import type { Chapter } from "../types";

/**
 * The Progress page's Your build: the build's plan, chapter by chapter in the chapters revealed, each row that holds a step, a pick or a
 * fact for it, ticked in place. Drawn whenever the guide has builds, so its address (/dashboard/build) means the same with or without a
 * pick; without one it says how to choose one.
 */
export function BuildPanel() {
  const picked = useBuild((s) => s.picked);
  const openDialog = useUi((s) => s.openDialog);

  return (
    <Panel id="build" aria-labelledby="build-title">
      <PanelHead>
        <PanelTitle id="build-title">{picked.length ? `Your build: ${buildName(picked)}` : "Your build"}</PanelTitle>
        <PanelText>
          {picked.length
            ? "The steps to it and what build guides use for it, chapter by chapter in the chapters you’ve revealed. It changes no count."
            : "Pick the build you play, and its steps and what build guides use for it show here, chapter by chapter. It changes no count."}
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
  const hidden = chapters.filter((chapter) => !isOpen(data, chapter.id)).length;
  if (!plan.length) return <Empty>Nothing in the chapters you’ve revealed is for this build yet. More shows as you reveal chapters.</Empty>;
  return (
    <div className="grid gap-2">
      {plan.map(({ chapter, rows }) => (
        <ChapterPart key={chapter.id} chapter={chapter} rows={rows} picked={picked} />
      ))}
      {hidden > 0 && (
        <p className="flex items-center gap-2 border-t border-line-soft pt-3 text-13 text-muted [&_svg]:size-4">
          <Icon name="lock" />
          {hidden === 1 ? "One more chapter is" : `${hidden} more chapters are`} hidden by spoiler protection: their steps and picks show as you reveal them.
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

/** A row in the plan: its box and title, then its steps (numbered), its picks (with who recommends them) and its facts, and Jump to. */
function PlanItem({ item: { row, tasks, picks, entries }, picked, ticked }: { item: PlanRow; picked: string[]; ticked: boolean }) {
  const id = `plan-${row.id}`;
  return (
    <li className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 border-t border-line-soft py-2.5 first:border-t-0 phone:gap-2.5">
      <CheckBox id={id} labelId={`${id}-label`} row={row} />
      <div className="grid gap-1 leading-[1.3]">
        <label id={`${id}-label`} htmlFor={id} className="cursor-pointer">
          <strong className={ticked ? "text-15 text-muted line-through decoration-1" : "text-15"}>{row.title}</strong>
          {row.tags.includes("missable") && (
            <>
              {" "}
              <Tag tag="missable" at="prose" />
            </>
          )}
        </label>
        <div className="grid gap-1 text-13/normal text-muted">
          {tasks.map((task) => (
            <p key={task.title} className="flex items-start gap-2">
              <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-primary text-11 font-extrabold text-primary tabular-nums">
                <span className="sr-only">Step </span>
                {stepNumber(task, picked)}
                <span className="sr-only">:</span>
              </span>
              <span>
                <strong className="text-ink">{task.title}.</strong> {task.text}
              </span>
            </p>
          ))}
          {picks.map((pick) => (
            <p key={pick.item} className="flex items-start gap-2">
              <span className="grid w-5 shrink-0 place-items-center pt-0.5 text-primary [&_svg]:size-3.5">
                <Icon name="star" />
              </span>
              <span>
                <span className="sr-only">Build guides use </span>
                <strong className="text-ink">{pick.item}</strong>: {pick.why} · {recommendedBy(pick)}
              </span>
            </p>
          ))}
          {entries.map((entry) => (
            <p key={entry.note} className="flex items-start gap-2">
              <span aria-hidden="true" className="grid w-5 shrink-0 place-items-center">
                ·
              </span>
              <span>{entry.note}</span>
            </p>
          ))}
        </div>
      </div>
      <Link className={rowLinkClasses} to={`/guide/${row.chapter}/${row.id}`} aria-label={`Jump to “${row.title}” in chapter ${row.chapter}`}>
        Jump to
      </Link>
    </li>
  );
}
