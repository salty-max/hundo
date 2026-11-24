import { Panel, PanelHead, PanelText, PanelTitle } from "@hundo/core/components/ui";
import { allRows } from "@hundo/core/guide";
import { useProgress } from "@hundo/core/store/progress";

const secrets = allRows.filter((row) => row.tags.includes("secret"));

/** The game's own total on Repentance+, which `secrets` must match (`guide.test.ts`). */
export const ALL_SECRETS = 641;

/**
 * How many secrets the game should list for the reader's ticks. Many secrets pop chapters before their row (totals, a Normal win's
 * unlock), so the game running ahead of the guide is the usual gap, and the panel says where to look. It needs no input.
 */
export function GameCheck() {
  const checks = useProgress((s) => s.data.checks);
  const have = secrets.filter((row) => checks[row.id] === true).length;
  return (
    <Panel id="game-check" aria-labelledby="game-check-title">
      <PanelHead>
        <PanelTitle id="game-check-title">Check against the game</PanelTitle>
        <PanelText>
          The game lists its secrets from the main menu, under Stats, then Secrets: {ALL_SECRETS} of them on Repentance+.
        </PanelText>
      </PanelHead>
      <PanelText tone="ink">
        {have === ALL_SECRETS ? `You should have all ${ALL_SECRETS} secrets.` : `You should have ${have} of the ${ALL_SECRETS} secrets.`}
      </PanelText>
      <PanelText>
        If the game shows more unlocked, something isn’t ticked yet: many secrets come chapters before their row, most of them the totals
        in chapter 13 and the Normal unlocks in the notes (chapters 9 to 12). If it shows fewer, something ticked here isn’t unlocked yet.
      </PanelText>
    </Panel>
  );
}
