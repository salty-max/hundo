import { Popover } from "@base-ui/react/popover";
import { inWords } from "../guide";
import { whoSays } from "./who-says";

/**
 * Who recommends what a build's note says: the popover behind each note's Who says so, naming each pick under the note and the sites that
 * recommend it, never linked. Loaded by WhoSaysHost; nothing else imports this.
 */
export function WhoSays() {
  return (
    <Popover.Root handle={whoSays}>
      {({ payload }) => (
        <Popover.Portal>
          <Popover.Positioner sideOffset={6} collisionPadding={16} className="z-50">
            <Popover.Popup className="grid w-[min(20rem,calc(100vw-2rem))] origin-(--transform-origin) gap-1 rounded-card border border-line bg-surface px-3.5 py-3 text-14/normal text-ink shadow-[0_10px_28px_-10px_var(--shadow)] transition-[scale,opacity] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
              <Popover.Title className="text-11 font-extrabold tracking-[0.08em] text-soft-ink uppercase">Who says so</Popover.Title>
              {payload?.lines.map(({ item, by }) => (
                <p key={item}>
                  <strong>{item}</strong>: recommended by {inWords(by)}.
                </p>
              ))}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
}
