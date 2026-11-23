import { Collapsible } from "@base-ui/react/collapsible";
import { Link } from "react-router";
import { CheckBox } from "./CheckBox";
import { Icon } from "./Icon";
import { AsideMark } from "./Later";
import { rowLinkClasses } from "./TickItem";
import { BuildWords } from "./BuildMark";
import { Button, Empty, Panel, PanelActions, PanelHead, PanelText, PanelTitle, Tag } from "./ui";
import { buildName, buildOf, buildPlan, chapters, leadsFor, readsNotes, weaponTrack, type PlanRow, type TrackBranch, type TrackFork, type TrackItem, type TrackStage, type WeaponTrack } from "../guide";
import { two } from "../format";
import { isOpen, useProgress } from "../store/progress";
import { useBuild } from "../store/build";
import { useUi } from "../store/ui";
import type { BuildStart, Chapter } from "../types";

/**
 * The Progress page's Build advice: the build's weapon milestones, then its plan, chapter by chapter in the chapters revealed, each row
 * that holds something for it with the build's words for it, ticked in place. Advice along the walkthrough, never a plan for the reader's
 * levels or a record of their gear. Drawn whenever the guide has builds, so its address (/dashboard/build) means the same with or without
 * a pick; without one it says how to choose one.
 */
export function BuildPanel() {
  const picked = useBuild((s) => s.picked);
  const openDialog = useUi((s) => s.openDialog);

  return (
    <Panel id="build" aria-labelledby="build-title">
      <PanelHead>
        <PanelTitle id="build-title">{picked.length ? `Build advice: ${buildName(picked)}` : "Build advice"}</PanelTitle>
        <PanelText>
          {/* A pick that reads steps (a custom one, or a build without notes yet) has no weapon milestones, so it isn't promised them. */}
          {!picked.length
            ? "Pick the build you’re playing, and the walkthrough adds advice for it at the steps where it matters, gathered here chapter by chapter. It changes no count."
            : readsNotes(picked)
              ? "Advice for your build at the steps where it matters, in the chapters you’ve revealed. It doesn’t plan your levels or know your gear, and it changes no count."
              : "The steps to your build, chapter by chapter in the chapters you’ve revealed. It doesn’t plan your levels or know your gear, and it changes no count."}
        </PanelText>
      </PanelHead>
      {/* Keyed on the pick, so a new one opens its chapters afresh. */}
      {picked.length > 0 && <Plan key={picked.join(" ")} picked={picked} />}
      <PanelActions>
        <Button onClick={() => openDialog({ kind: "build" })}>{picked.length ? "Change build" : "Choose build"}</Button>
      </PanelActions>
    </Panel>
  );
}

function Plan({ picked }: { picked: string[] }) {
  const data = useProgress((s) => s.data);
  const plan = buildPlan((n) => isOpen(data, n), picked);
  const track = weaponTrack((n) => isOpen(data, n), picked);
  const hidden = chapters.filter((chapter) => !isOpen(data, chapter.id)).length;
  const drawn = track && (track.start || track.line.length) ? track : null;
  if (!plan.length && !drawn) return <Empty>Nothing in the chapters you’ve revealed is for this build yet. More shows as you reveal chapters.</Empty>;
  return (
    <div className="grid gap-2">
      {drawn && <Track track={drawn} picked={picked} more={hidden > 0} />}
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
        <AsideMark row={row} at="column" />
      </div>
      <Link className={rowLinkClasses} to={`/guide/${row.chapter}/${row.id}`} aria-label={`Jump to “${row.title}” in chapter ${row.chapter}`}>
        Jump to
      </Link>
    </li>
  );
}

/** A stretch of the track's line between two stages: the guide's colour, or dashed in the muted tint where it's the way off a default. */
function Join({ dashed, className }: { dashed: boolean; className: string }) {
  return <span aria-hidden="true" className={`absolute w-0 border-s-2 ${dashed ? "border-dashed border-muted" : "border-build-line"} ${className}`} />;
}

/** A stage's dot: always open, since the track is advice and holds nothing the reader has done. */
function Dot({ dashed }: { dashed: boolean }) {
  return <span aria-hidden="true" className={`relative mt-0.5 size-3.5 rounded-full border-2 bg-surface ${dashed ? "border-dashed border-muted" : "border-primary"}`} />;
}

const ways = ["", "One way", "Two ways", "Three ways", "Four ways"];

/**
 * The build's weapon milestones: how guides start it, then the stages its notes name, from the revealed chapters, as a line with its
 * branches off it (weaponTrack): what guides default to on the line, the other way off it dashed, or equal ways where guides split with
 * no default, each saying when to take it. A recommendation by chapter, never the reader's progress: no tick fills a stage. Each stage's
 * name jumps to its row. Only the start and the branches say why, since the plan under it holds the words. Nothing says what hidden
 * chapters hold, only that more shows as they're revealed.
 */
function Track({ track, picked, more }: { track: WeaponTrack; picked: string[]; more: boolean }) {
  const name = buildOf(picked)?.build.name ?? buildName(picked);
  return (
    <section aria-labelledby="build-track" className="grid gap-2.5 rounded-card border border-soft-line bg-soft px-4 py-3.5 phone:p-3">
      <div className="grid gap-1">
        <h3 id="build-track" className="m-0 flex items-center gap-2 text-12 font-extrabold tracking-[0.04em] text-soft-ink uppercase [&_svg]:size-4 [&_svg]:text-primary">
          <Icon name="sword" />
          Weapon milestones
        </h3>
        <p className="text-13/normal text-muted">
          Where {name} guides take {track.start?.weapon ? `the ${track.start.weapon}` : "their weapon"}, chapter by chapter. Advice, not a record of your
          gear: ticking a step doesn’t move it.
        </p>
      </div>
      <ol className="m-0 grid list-none p-0">
        {track.start && <Start start={track.start} last={!track.line.length} />}
        <Line items={track.line} dashed={false} />
      </ol>
      {more && <p className="text-12/normal text-muted">More shows as you reveal chapters.</p>}
    </section>
  );
}

/** The weapon guides start the build with: no row, so no link, and the start's why under it. */
function Start({ start, last }: { start: BuildStart; last: boolean }) {
  // The why is written to follow "Weapon:", so it takes a capital and a full stop here.
  const why = [`Starting as ${start.class}.`, start.why && `${start.why[0].toUpperCase()}${start.why.slice(1)}.`].filter(Boolean).join(" ");
  return (
    <li className={`relative grid grid-cols-[0.875rem_minmax(0,1fr)_auto] gap-x-2.5 ${last ? "" : "pb-3"}`}>
      {!last && <Join dashed={false} className="inset-s-1.5 top-4 -bottom-0.5" />}
      <Dot dashed={false} />
      <span className="grid min-w-0 gap-0.5">
        <span>
          <strong className="text-14/sm">{start.weapon}</strong>{" "}
          <span className="text-11 font-extrabold tracking-[0.07em] whitespace-nowrap text-soft-ink uppercase">
            <span className="sr-only">, </span>
            Starting weapon
          </span>
        </span>
        <span className="text-13/normal text-muted">{why}</span>
      </span>
      <span className="text-12/normal font-bold whitespace-nowrap text-muted">from the start</span>
    </li>
  );
}

/** A line of the track, as items of the list it sits in: its stages, each joined to what follows, and its forks where they leave it. */
function Line({ items, dashed }: { items: TrackItem[]; dashed: boolean }) {
  return items.map((item, i) => {
    const last = i === items.length - 1;
    if ("stage" in item) return <Stage key={item.stage.row.id} stage={item.stage} last={last} dashed={dashed} />;
    // A fork comes after the stage it's placed after (weaponTrack), or after another fork placed there too.
    const at = items
      .slice(0, i)
      .reverse()
      .flatMap((before) => ("stage" in before ? [before.stage] : []))[0];
    return <Fork key={`fork-${item.fork.branches[0].branch.id}`} fork={item.fork} at={at} last={last} dashed={dashed} />;
  });
}

/** A stage: its dot, its name as a link to its row ("or" before it where it's one way of several), why where it's a branch of its own, and its chapter. */
function Stage({ stage, last, dashed, or, why, from }: { stage: TrackStage; last: boolean; dashed: boolean; or?: boolean; why?: string; from?: string }) {
  const { row, note } = stage;
  return (
    <li className={`relative grid grid-cols-[0.875rem_minmax(0,1fr)_auto] gap-x-2.5 ${last ? "" : "pb-3"}`}>
      {!last && <Join dashed={dashed} className="inset-s-1.5 top-4 -bottom-0.5" />}
      <Dot dashed={dashed} />
      <span className="grid min-w-0 gap-0.5">
        <span>
          {or && <span className="text-14/sm text-muted">or </span>}
          <Link to={`/guide/${row.chapter}/${row.id}`} className="text-14/sm font-bold text-ink underline decoration-line underline-offset-3 hover:decoration-primary">
            {note.stage}
          </Link>
          {from && <span className="text-12 text-muted"> · from {from}</span>}
        </span>
        {why && <span className="text-13/normal text-muted">{why}</span>}
      </span>
      <span className="text-12/normal font-bold whitespace-nowrap text-muted tabular-nums">ch. {row.chapter}</span>
    </li>
  );
}

/**
 * The branches that leave a line at one place, each hung off the line by an elbow. Where the line goes on past the stage they leave they're
 * the other way to what guides default to, dashed, and the line runs by on their left; where it ends there they're equal ways, said as such.
 */
function Fork({ fork, at, last, dashed }: { fork: TrackFork; at: TrackStage; last: boolean; dashed: boolean }) {
  const { branches, alternative, more } = fork;
  const tone = dashed || alternative;
  const stage = branches[0].from.note.stage;
  // Equal ways are said as such; with one still in a hidden chapter, only that more are to come, not how many.
  const caption = alternative ? "" : more ? `Ways from ${stage}: more show as you reveal chapters` : branches.length > 1 ? `${ways[branches.length] ?? `${branches.length} ways`} from ${stage}` : "";
  return (
    <li className={`relative ps-6 ${last ? "" : "pb-3"}`}>
      {!last && <Join dashed={dashed} className="-inset-y-0.5 inset-s-1.5" />}
      {caption && (
        <p className="relative m-0 pb-2 text-11 font-extrabold tracking-[0.07em] text-soft-ink uppercase">
          <Join dashed={dashed} className="-inset-s-4.5 -top-0.5 bottom-0" />
          {caption}
        </p>
      )}
      <ul className="m-0 grid list-none p-0">
        {branches.map((item, j) => (
          <Branch
            key={item.branch.id}
            item={item}
            away={item.from.row.id !== at.row.id}
            last={j === branches.length - 1}
            or={alternative || j > 0}
            dashed={tone}
            // Equal ways hang one under another off the line that ends here, so it runs on down to the next one's elbow.
            pass={!alternative && j < branches.length - 1 ? { dashed } : undefined}
          />
        ))}
      </ul>
    </li>
  );
}

/**
 * One way off the line: a branch of one stage drawn as that stage, with its why under it; a longer one with its name and why over its own
 * line, however much of it is revealed. `away`: it's drawn further down than the stage it leaves, so it names that stage.
 */
function Branch({ item, away, last, or, dashed, pass }: { item: TrackBranch; away: boolean; last: boolean; or: boolean; dashed: boolean; pass?: { dashed: boolean } }) {
  const { branch, line } = item;
  const from = away ? item.from.note.stage : undefined;
  const single = item.single && "stage" in line[0] ? line[0].stage : null;
  return (
    <li className={`relative ${last ? "" : "pb-2.5"}`}>
      {/* The elbow off the line it leaves, never dashed: dashes on a curve this small break up. The way off a default takes the muted tint. */}
      <span aria-hidden="true" className={`absolute -inset-s-4.5 -top-0.5 h-3 w-3.5 rounded-es-[0.5625rem] border-s-2 border-b-2 ${dashed ? "border-muted" : "border-build-line"}`} />
      {pass && <Join dashed={pass.dashed} className="inset-y-0 -inset-s-4.5" />}
      {single ? (
        <ol className="m-0 list-none p-0">
          <Stage stage={single} last dashed={dashed} or={or} why={branch.why} from={from} />
        </ol>
      ) : (
        <>
          <p className="m-0 grid gap-0.5 pb-2">
            <span>
              <strong className="text-14/sm font-extrabold">{branch.name}</strong>
              {from && <span className="text-12 text-muted"> · from {from}</span>}
            </span>
            <span className="text-13/normal text-muted">{branch.why}</span>
          </p>
          <ol className="m-0 grid list-none p-0">
            <Line items={line} dashed={dashed} />
          </ol>
        </>
      )}
    </li>
  );
}
