import { useEffect } from "react";
import { chunks } from "./chunks";
import { useLoadable, whenIdle } from "../loadable";
import { useBuild } from "../store/build";

/**
 * The shell of build notes' Who says so popover, in a guide with builds: once a build is picked, it fetches the popover (WhoSays.tsx) when
 * the page is idle and mounts it. A Who says so tapped before then loads it at once (BuildMark).
 */
export function WhoSaysHost() {
  const loaded = useLoadable(chunks.whoSays, false);
  const picked = useBuild((s) => s.picked.length > 0);
  useEffect(() => (picked ? whenIdle(chunks.whoSays.warm) : undefined), [picked]);
  return loaded ? <loaded.WhoSays /> : null;
}
