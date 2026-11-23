import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Button } from "./ui";
import { buildName, chapterPlan } from "../guide";
import { useBuild } from "../store/build";
import { useUi } from "../store/ui";
import type { Chapter } from "../types";

/** "on 2 steps in this chapter": the rows that hold something for the pick (a build and its add-on can both have a note on one), or nothing. */
function inThisChapter(chapter: Chapter, picked: readonly string[]) {
  const rows = chapterPlan(chapter, picked).length;
  return rows ? `on ${rows === 1 ? "1 step" : `${rows} steps`} in this chapter` : "";
}

/**
 * The build's strip under a chapter's banner, in a guide with builds: the build's advice in this chapter and the way to change it, on every
 * chapter at every size. With no build, an invitation, until the reader answers it: a build saved, or No thanks, after which the strip
 * isn't drawn and Settings' Build advice is the way back. It asks nothing on its own: no dialog opens unless the reader asks for it.
 * No thanks leaves a line in its place, which takes the focus, until the reader moves on (GuidePage remounts it per chapter); a build
 * cleared here brings the invitation back in the same place, so the dialog's focus comes back to its button.
 */
export function BuildStrip({ chapter }: { chapter: Chapter }) {
  const joined = useBuild((s) => s.picked.join(" "));
  const asked = useBuild((s) => s.asked);
  const markAsked = useBuild((s) => s.markAsked);
  const openDialog = useUi((s) => s.openDialog);
  const picked = joined ? joined.split(" ") : [];
  const [declined, setDeclined] = useState(false);
  // Whether this page has shown a build: kept as the pick changes, as React's own pattern for state that follows a prop.
  const [hadBuild, setHadBuild] = useState(picked.length > 0);
  if (picked.length > 0 && !hadBuild) setHadBuild(true);
  const line = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (declined) line.current?.focus();
  }, [declined]);
  if (declined)
    return (
      <section aria-label="Build advice" className="rounded-card border border-soft-line bg-soft px-4 py-2.5 phone:px-3">
        <p ref={line} tabIndex={-1} className="text-14/sm text-muted">
          No build advice. Guide settings can turn it on any time.
        </p>
      </section>
    );
  if (!picked.length && asked && !hadBuild) return null;
  const here = picked.length ? inThisChapter(chapter, picked) : "";
  return (
    <section
      aria-label="Build advice"
      className="flex flex-wrap items-center gap-x-3.5 gap-y-2 rounded-card border border-soft-line bg-soft px-4 py-2.5 phone:px-3"
    >
      <Icon name="sword" className="size-4.5 shrink-0 text-primary" />
      <p className="min-w-0 flex-1 basis-56 text-14/sm">
        {picked.length ? (
          <>
            <strong>{buildName(picked)} advice</strong>
            <span className="text-muted"> · {here || "none in this chapter"}</span>
          </>
        ) : (
          <>
            <strong>Playing a build?</strong>
            <span className="text-muted"> The walkthrough can add advice for it at the steps where it matters.</span>
          </>
        )}
      </p>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <Button size="compact" onClick={() => openDialog({ kind: "build" })}>
          {picked.length ? "Change build" : "Choose build"}
        </Button>
        {!picked.length && (
          <Button
            look="link"
            onClick={() => {
              markAsked();
              setDeclined(true);
            }}
          >
            No thanks
          </Button>
        )}
      </span>
    </section>
  );
}
