import { Collapsible } from "@base-ui/react/collapsible";
import { Fieldset } from "@base-ui/react/fieldset";
import { useState } from "react";
import { CardRadioGroup, CheckboxGroup, Switch } from "./controls";
import { DialogDescription, DialogFooter, DialogText } from "./dialog";
import { Icon } from "./Icon";
import { Button } from "./ui";
import { addons, buildName, buildOf, leaningName, leanings, namedBuilds } from "../guide";
import { normalizeBuild, useBuild } from "../store/build";
import { useUi, type DialogState } from "../store/ui";

type Build = Extract<NonNullable<DialogState>, { kind: "build" }>;

/**
 * The reader's build: the builds readers know by name as cards, the add-ons that go on top of one (Pyromancy beside a melee build), and
 * the stats themselves for a pick that is no named build. Nothing is kept until Save build; Just the checklist keeps no build. Opened from
 * the strip under each chapter's banner and from the Progress page, and once as the welcome, on the first tick (actions.ts).
 */
export function BuildScreen({ dialog }: { dialog: Build }) {
  const saved = useBuild((s) => s.picked);
  const setPicked = useBuild((s) => s.setPicked);
  const closeDialogThen = useUi((s) => s.closeDialogThen);
  const announce = useUi((s) => s.announce);
  const [pick, setPick] = useState(saved);
  const of = buildOf(pick);
  // A saved pick that is no named build opens with the stats showing, so it's there to see and change.
  const [ownStats, setOwnStats] = useState(pick.length > 0 && !of);

  const choose = (id: string) => {
    const build = namedBuilds.find((candidate) => candidate.id === id);
    if (!build) return;
    // The add-ons already on stay on, unless the new build holds them already (Pyromancy on a Pyromancer).
    const kept = (of?.addons ?? []).filter((addon) => !addon.stats.every((stat) => build.stats.includes(stat))).flatMap((addon) => addon.stats);
    setPick(normalizeBuild([...build.stats, ...kept].join(" ")));
  };
  const toggleAddon = (stats: string[], on: boolean) => {
    const base = of?.build.stats ?? [];
    setPick(normalizeBuild((on ? [...pick, ...stats] : pick.filter((id) => !stats.includes(id) || base.includes(id))).join(" ")));
  };
  const finish = (next: string[]) => {
    setPicked(next);
    closeDialogThen(() => announce(next.length ? `Your build: ${buildName(next)}.` : "No build: just the checklist."));
  };

  return (
    <>
      <DialogDescription>
        {dialog.welcome
          ? "Pick the build you’re playing, and the guide points out what build guides use for it and the steps to it: what to buy, where to upgrade, who to see before they leave."
          : "Pick the build you play. The guide marks what build guides use for it and the steps to it, in the chapters you’ve revealed."}
      </DialogDescription>
      <div className="grid gap-4">
        <CardRadioGroup
          label="Builds"
          choices={namedBuilds.map((build) => ({ value: build.id, title: build.name, text: build.blurb, chips: build.stats.map(leaningName) }))}
          value={of?.build.id ?? ""}
          onChange={choose}
        />
        {addons.length > 0 && (
          // Add-ons wait for a build: one switched on with none chosen would pick a build for the reader (Pyromancy alone is Pyromancer).
          <Fieldset.Root className="grid">
            <Fieldset.Legend className="text-13 font-bold">Add to it</Fieldset.Legend>
            {addons.map((addon) => {
              const within = of !== null && addon.stats.every((stat) => of.build.stats.includes(stat));
              return (
                <Switch
                  key={addon.id}
                  label={addon.name}
                  checked={within || (of?.addons.includes(addon) ?? false)}
                  disabled={!of || within}
                  description={!of ? `${addon.blurb} Choose a build first.` : within ? `Part of the ${of.build.name} build.` : addon.blurb}
                  onChange={(on) => toggleAddon(addon.stats, on)}
                />
              );
            })}
          </Fieldset.Root>
        )}
        <Collapsible.Root open={ownStats} onOpenChange={setOwnStats}>
          <Collapsible.Trigger className="group inline-flex min-h-8 cursor-pointer items-center gap-1.5 border-0 bg-transparent px-0 py-1 text-13 font-extrabold text-primary underline underline-offset-3 [&_svg]:size-4 [&_svg]:transition-transform data-panel-open:[&_svg]:rotate-180">
            Pick stats yourself
            <Icon name="down" />
          </Collapsible.Trigger>
          <Collapsible.Panel className="pt-2">
            <CheckboxGroup label="Stats" choices={leanings.map(({ id, label }): [string, string] => [id, label])} value={pick} onChange={(next) => setPick(normalizeBuild(next.join(" ")))} />
          </Collapsible.Panel>
        </Collapsible.Root>
        {pick.length > 0 && !of && (
          <DialogText small>
            {buildName(pick)} is no named build. Its steps and facts still show; build guides’ picks are made for named builds.
          </DialogText>
        )}
      </div>
      {dialog.welcome && <DialogText small>It changes no count. Change it any time from the strip under each chapter’s banner.</DialogText>}
      {/* Held at the foot of the dialog's scrolling body, so on a phone Just the checklist is one tap away under the cards. */}
      <div className="sticky -bottom-2 -mx-2 mt-2 border-t border-line bg-surface px-2 pb-2">
        <DialogFooter>
          <Button look="" disabled={pick.length === 0} focusableWhenDisabled onClick={() => finish(pick)}>
            Save build
          </Button>
          <Button onClick={() => finish([])}>Just the checklist</Button>
        </DialogFooter>
      </div>
    </>
  );
}
