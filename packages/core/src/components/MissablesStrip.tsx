import { Collapsible } from "@base-ui/react/collapsible";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { LaterAction } from "./Later";
import { TickItem } from "./TickItem";
import { choiceOf, config, hasChoices, hasMissables, missablesLeft, missableWhy } from "../guide";
import { useHeldRows } from "../useHeldRows";
import { useProgress } from "../store/progress";
import type { Chapter } from "../types";
import { pressClasses } from "./press-style";

/**
 * "Don't miss" strip for a chapter: the unchecked entries that can be lost for good, and the recommended ways at its one-way choices.
 * While the guide flags no missable at all, a chapter with nothing to list says so instead.
 */
export function MissablesStrip({ chapter }: { chapter: Chapter }) {
  const reassurance = !hasMissables && config.reassurance ? <Reassurance {...config.reassurance} /> : null;
  if (!hasMissables && !hasChoices) return reassurance;
  // Re-mount per chapter so a held list never leaks into the next one.
  return <MissablesList key={chapter.id} chapter={chapter} empty={reassurance} />;
}

// The strip's frame and its header, which opens and closes it.
const frame = cva("rounded-card border bg-surface", { variants: { tone: { clear: "border-line", flagged: "border-missable-line" } } });
const caretClasses = "size-4 flex-none text-muted group-data-panel-open/trigger:rotate-180";

function Reassurance({ text }: NonNullable<typeof config.reassurance>) {
  return (
    <aside className={`${frame({ tone: "clear" })} px-4 py-2.5 text-14/normal text-muted phone:px-3`} aria-label="Missable entries">
      <strong className="font-extrabold text-ink">Nothing is flagged as permanently missable.</strong> {text}
    </aside>
  );
}

function MissablesList({ chapter, empty }: { chapter: Chapter; /** What shows while the chapter has nothing to list. */ empty: ReactNode }) {
  const checks = useProgress((s) => s.data.checks);
  const { rows, hold } = useHeldRows(missablesLeft(chapter, checks), checks);
  if (!rows.length) return empty;
  const left = rows.filter((row) => checks[row.id] !== true).length;
  return (
    <Collapsible.Root render={<aside />} defaultOpen className={frame({ tone: "flagged" })} aria-label="Missable entries">
      <Collapsible.Trigger className={`${pressClasses} group/trigger flex min-h-12 w-full cursor-pointer items-center justify-between gap-2.5 border-0 bg-transparent px-4 py-3 text-left font-sans text-16/normal text-inherit phone:px-3`}>
        <strong className="font-display text-24 leading-[1.2] font-bold tracking-[-0.015em]">Don’t miss before moving on</strong>
        <span className="ml-auto flex items-center gap-2.5 text-12 whitespace-nowrap text-muted tabular-nums">
          {left} left
          <Icon name="down" className={caretClasses} />
        </span>
      </Collapsible.Trigger>
      <Collapsible.Panel hiddenUntilFound>
        <ul className="m-0 list-none px-4 pb-2">
          {rows.map((row) => (
            <TickItem
              key={row.id}
              row={row}
              prefix="missable"
              ticked={checks[row.id] === true}
              detail={missableWhy(row.id) ?? row.group}
              tag={choiceOf(row.id) ? "one-way" : undefined}
              action={checks[row.id] === true ? undefined : <LaterAction row={row} />}
              jumpLabel={`Jump to “${row.title}”`}
              onToggle={hold}
            />
          ))}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
