import { Collapsible } from "@base-ui/react/collapsible";
import { Button, Empty, Panel, PanelTitle } from "./ui";
import { Icon } from "./Icon";
import { BackButton, LaterAction } from "./Later";
import { TickItem } from "./TickItem";
import { pressClasses } from "./press-style";
import { cats, choiceOf, primaryTag, text } from "../guide";
import { comesBack, needsWords, nextUp } from "../flow";
import { useHeldRows } from "../useHeldRows";
import { isOpen, useProgress } from "../store/progress";
import type { Row } from "../types";

/**
 * The next few steps from this chapter on: first any that came back (set aside, now on a visit to its place; or waiting, now that what it
 * needed is ticked), each with why, then the route. Each has Later, which sets it aside without a tick. A ticked step stays put until
 * "Show next steps". Under it, a line counts the rows set aside and the ones waiting, and opens them.
 */
export function NextUp({ chapter }: { chapter: number }) {
  const data = useProgress((s) => s.data);
  const open = (n: number) => isOpen(data, n);
  const view = nextUp(data, open, chapter, 3);
  const why = new Map(view.items.map((item) => [item.row.id, item]));
  const { rows, holding, hold, release } = useHeldRows(
    view.items.map((item) => item.row),
    data.checks,
  );

  return (
    <Panel pad="snug" aria-labelledby="next-up-title">
      <PanelTitle id="next-up-title">Next up</PanelTitle>
      {rows.length ? (
        <ul className="list-none p-0">
          {rows.map((row) => {
            const came = why.get(row.id);
            return (
              <TickItem
                key={row.id}
                row={row}
                prefix="next"
                ticked={data.checks[row.id] === true}
                detail={`${row.chapter !== chapter ? `Chapter ${row.chapter} · ` : ""}${choiceOf(row.id)?.why ?? `${cats[primaryTag(row)][1]} · ${row.group}`}`}
                tag={came?.why && came.tone ? { text: came.why, tone: came.tone } : choiceOf(row.id) ? "one-way" : undefined}
                action={data.checks[row.id] === true ? undefined : <LaterAction row={row} />}
                jumpLabel={`Jump to “${row.title}” in chapter ${row.chapter}`}
                onToggle={hold}
              />
            );
          })}
        </ul>
      ) : (
        // Waiting rows are never offered as a next step, so with only those left, say so rather than that everything is checked.
        <Empty>{view.waiting.length ? "Everything left here waits on something you don’t have yet." : text.nextUpDone}</Empty>
      )}
      {holding && (
        <div>
          <Button onClick={release}>Show next steps</Button>
        </div>
      )}
      {view.aside.length + view.waiting.length > 0 && <Waiting aside={view.aside} waiting={view.waiting} />}
    </Panel>
  );
}

const caretClasses = "size-4 flex-none text-muted group-data-panel-open/trigger:rotate-180";

/**
 * "1 set aside · 2 waiting", which opens the rows: those set aside, each with when it comes back and Back on route, and those waiting,
 * each with what it needs. Kept out of Next up's steps, never out of sight.
 */
function Waiting({ aside, waiting }: { aside: Row[]; waiting: Row[] }) {
  const data = useProgress((s) => s.data);
  const open = (n: number) => isOpen(data, n);
  // A row ticked here stays put, struck through, as in the steps above, rather than leaving from under the pointer.
  const { rows, hold } = useHeldRows([...aside, ...waiting], data.checks);
  const words = [aside.length ? `${aside.length} set aside` : "", waiting.length ? `${waiting.length} waiting` : ""].filter(Boolean).join(" · ");
  return (
    <Collapsible.Root className="border-t border-line-soft">
      <Collapsible.Trigger
        className={`${pressClasses} group/trigger flex min-h-11 w-full cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left font-sans text-13 text-muted [&_svg]:size-4`}
      >
        {aside.length > 0 && <Icon name="clock" />}
        {aside.length === 0 && <Icon name="lock" />}
        <span className="grow">{words}</span>
        <Icon name="down" className={caretClasses} />
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <ul className="list-none p-0">
          {rows.map((row) => {
            const ticked = data.checks[row.id] === true;
            const aside = data.later?.[row.id] !== undefined;
            return (
              <TickItem
                key={row.id}
                row={row}
                prefix="next-waiting"
                ticked={ticked}
                detail={aside ? comesBack(row, data.later, open) : needsWords(row, data.checks, open) || `${cats[primaryTag(row)][1]} · ${row.group}`}
                tag={aside ? { text: "Set aside", tone: "none" } : undefined}
                action={aside && !ticked ? <BackButton row={row} /> : undefined}
                jumpLabel={`Jump to “${row.title}” in chapter ${row.chapter}`}
                onToggle={hold}
              />
            );
          })}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
