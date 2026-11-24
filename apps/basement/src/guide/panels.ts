import type { Panel } from "@hundo/core/types";
import { GameCheck } from "./GameCheck";

/** Opt-in panels for the Progress page; /dashboard/game-check scrolls to how many secrets the game should list. */
export const panels: Panel[] = [{ id: "game-check", title: "Check against the game", Component: GameCheck }];
