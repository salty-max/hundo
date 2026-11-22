import { chapters } from "../guide";
import { ChapterNumber } from "./ChapterHero";
import { Icon } from "./Icon";
import { Button, LinkButton, pageTitleClasses } from "./ui";

/** What revealing `chapter` also reveals, past the `ceiling`: the chapters between them, or nothing when it is the next one. */
function alsoReveals(chapter: number, ceiling: number) {
  const first = ceiling + 1;
  const last = chapter - 1;
  if (last < first) return "";
  return last === first ? `Revealing it now also reveals chapter ${first}.` : `Revealing it now also reveals chapters ${first} to ${last}.`;
}

// The veil: a crossed hatch in the guide's primary, the way a banner would hold the chapter's art, fading out from the words to its edges.
const veilClasses =
  "absolute inset-0 -z-1 bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--primary)_22%,transparent)_0_1px,transparent_1px_11px),repeating-linear-gradient(45deg,color-mix(in_srgb,var(--primary)_14%,transparent)_0_1px,transparent_1px_11px)] mask-[radial-gradient(closest-side,#000_35%,transparent)]";

/**
 * A chapter past the ones the reader has revealed (spoiler protection): its number and the rail's teaser for it, never its title or art,
 * why it is hidden, what revealing it opens, and the way on or back. It takes what is left of the page's height (Layout's track) and sits
 * in the middle of it, over a veil in the guide's palette; taller than the room, it is as tall as it needs and the page scrolls.
 */
export function SealedChapter({ chapter, ceiling, onReveal }: { chapter: number; ceiling: number; onReveal: () => void }) {
  const teaser = chapters[chapter - 1]?.teaser;
  return (
    <div className="flex grow flex-col">
      {/* Auto margins centre it in the track both ways, and never push it past the top when it is taller than the room. */}
      <div className="relative isolate m-auto flex w-full max-w-140 flex-col gap-6 px-6 py-12 text-center phone:gap-5 phone:px-2 phone:py-10">
        <div className={veilClasses} aria-hidden="true" />
        <span className="grid size-16 place-items-center self-center rounded-full border border-soft-line bg-soft text-soft-ink shadow-[0_0_0_0.625rem_color-mix(in_srgb,var(--soft)_55%,transparent)] [&_svg]:size-7">
          <Icon name="lock" />
        </span>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-13 font-bold">
            <ChapterNumber chapter={chapter} />
            {/* A hidden chapter's place name stays out of search snippets, as it does in the rail (search.ts). */}
            {teaser && <span data-nosnippet="">{teaser}</span>}
          </div>
          <h1 className={pageTitleClasses}>
            <span className="sr-only">Chapter {chapter}:</span> Not revealed yet
          </h1>
          <p className="max-w-100 self-center text-15/[1.6] phone:text-14/normal">
            Hidden to spare you spoilers until you reach it. {alsoReveals(chapter, ceiling)}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button look="accent" icon="unlock" onClick={onReveal}>
            Reveal chapter {chapter}
          </Button>
          <LinkButton to={`/guide/${ceiling}`} icon="left">
            Back to chapter {ceiling}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
