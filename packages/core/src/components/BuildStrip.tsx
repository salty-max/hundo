import { Icon } from "./Icon";
import { Button } from "./ui";
import { buildName, chapterPlan } from "../guide";
import { useBuild } from "../store/build";
import { useUi } from "../store/ui";
import type { Chapter } from "../types";

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** "2 steps and 1 pick from build guides", or nothing. */
function inThisChapter(chapter: Chapter, picked: readonly string[]) {
  const rows = chapterPlan(chapter, picked);
  const steps = rows.reduce((sum, row) => sum + row.tasks.length, 0);
  const picks = rows.reduce((sum, row) => sum + row.picks.length, 0);
  return [steps && count(steps, "step", "steps"), picks && count(picks, "pick from build guides", "picks from build guides")].filter(Boolean).join(" and ");
}

/**
 * The build's strip under a chapter's banner, in a guide with builds: the build, what this chapter holds for it, and the way to change it,
 * on every chapter at every size. With no build, the way to choose one.
 */
export function BuildStrip({ chapter }: { chapter: Chapter }) {
  const joined = useBuild((s) => s.picked.join(" "));
  const asked = useBuild((s) => s.asked);
  const openDialog = useUi((s) => s.openDialog);
  const picked = joined ? joined.split(" ") : [];
  const here = picked.length ? inThisChapter(chapter, picked) : "";
  return (
    <section
      aria-label="Your build"
      className="flex flex-wrap items-center gap-x-3.5 gap-y-2 rounded-card border border-soft-line bg-soft px-4 py-2.5 phone:px-3"
    >
      <Icon name="sword" className="size-4.5 shrink-0 text-primary" />
      <p className="min-w-0 flex-1 basis-56 text-14/sm">
        {picked.length ? (
          <>
            <strong>{buildName(picked)}</strong>
            <span className="text-muted"> · {here ? `in this chapter, ${here}` : "nothing for it in this chapter"}</span>
          </>
        ) : asked ? (
          <span className="text-muted">No build chosen: just the checklist.</span>
        ) : (
          <>
            <strong>Playing a build?</strong>
            <span className="text-muted"> Pick one, and the guide points out what build guides use for it and the steps to it.</span>
          </>
        )}
      </p>
      <Button size="compact" onClick={() => openDialog({ kind: "build" })}>
        {picked.length ? "Change build" : "Choose build"}
      </Button>
    </section>
  );
}
