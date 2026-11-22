import { Popover } from "@base-ui/react/popover";

/** What a build note's Who says so opens: each pick under the note, with the sites that recommend it for the reader's build. */
export interface WhoSaysPayload {
  lines: { item: string; by: string[] }[];
}

/**
 * The one popover every build note's Who says so shares, as the icon buttons share one tooltip (tooltip-handle.ts). A trigger is detached,
 * tied to this handle and carrying its note's lines as the payload; the popover itself (WhoSays.tsx, with floating-ui's positioning under
 * it) is a chunk of its own that WhoSaysHost mounts once the page is idle and a build is picked. A tap that comes before it has arrived
 * loads it and opens it then (BuildMark's WhoSaysButton).
 */
export const whoSays = Popover.createHandle<WhoSaysPayload>();
