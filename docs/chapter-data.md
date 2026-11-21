# Writing and sourcing chapter data

A guide's content is plain TypeScript in `apps/<name>/src/guide/data`: one module per chapter, plus `missables.ts`, `questlines.ts`, `sources.ts` where the guide has guide-wide references, and `build-plan.ts` where the game is played by build. The types are in `packages/core/src/types.ts`. The rules below that core's tests enforce are marked **(tested)**. The rest is how the three guides are written.

## A chapter

```ts
import type { RawChapter } from "@hundo/core/types";

export default {
  id: 2,
  title: "Gerudo Desert",
  region: "Suthorn Prairie · Gerudo Oasis · Gerudo Sanctum",
  teaser: "Gerudo Desert",
  intro: "Leave Suthorn by the prairie, then follow Dohna's investigation through the Cryptic Cavern and Gerudo Sanctum.",
  sources: [["Cryptic Cavern puzzles", "https://www.nintendolife.com/guides/zelda-echoes-of-wisdom-cryptic-cavern-walkthrough"]],
  groups: [
    {
      title: "Suthorn Prairie on the way west",
      location: "Suthorn Prairie",
      note: "The Heart Piece on the pillar in the prairie pond is easiest on the way back with Platboom.",
      sources: [["Prairie quests", "https://www.nintendolife.com/guides/zelda-echoes-of-wisdom-all-side-quest-locations-and-rewards"]],
      rows: [
        ["quest-up-a-wall", ["side-quest"], "Finish Up a Wall", "Go to the stone pillars northwest of Lueburry's house. Speak to the stranded man from below, clear the monsters around him, then speak again to claim 20 rupees."],
      ],
    },
  ],
} satisfies RawChapter;
```

- **`id`**: chapters are numbered 1, 2, 3… in order, and each has rows **(tested)**. List each new module in `config.ts`'s `chapters`.
- **`title`**, **`region`** and **`intro`** show on the chapter's banner once it's revealed.
- **`teaser`**: what the rail shows while the chapter is still hidden. Use a place name and never story. Where even the title gives the story away, use "Late game", as chapters 8 and 9 of Echoes and 4 and 5 of Red Dead do.
- **`sources`**: the chapter's references, as `[label, url]`.
- **`groups`**: the sections. A group has a `title` and `rows`, plus optional fields:
  - `location`;
  - `icon`;
  - `note`: a tip that covers the whole section;
  - `sources`;
  - `map`: one map for every row in the group (see Maps);
  - `compact: true`, for catalogue lists such as monsters, recipes or crystals. The article layout then shows a tight checklist instead of prose. Echoes' `sweep-lists.ts` is the example.

## A row

`[id, tags, title, text, extra?]`

- **`id`** is the saved check: progress stores `{ [id]: true }`.
  - It must be unique across the guide **(tested)**.
  - Write it in kebab-case, starting with the kind of row, as `quest-up-a-wall`, `echo-aruroda` or `mission-exodus-in-america` do.
  - **Never rename or reuse an id once the guide is live.** On load, a saved check for an id the data no longer has is dropped, so a renamed row comes back unticked for every reader. A reused id ticks the wrong row.
- **`tags`**: every tag must be a category in `config.ts` **(tested)**. The first one is the row's label and decides its icon and tone. A row counts toward every category it carries, so a dungeon chest is `["dungeon-chest", "chest"]`. Never add the `missable` tag by hand: core adds it to the rows listed in `missables.ts`.
- **`title`**: never empty **(tested)**. In the article layout it's the checkbox label, so the guides write it as an action: "Learn Aruroda in the dunes". Red Dead's checklist uses the mission's own name.
- **`text`**: the directions, in the second person, in the order the player meets things. Name the landmark, the action and the reward. Give exact counts and prices where the source gives them.
- **`extra`** (optional):
  - `{ quantity: 3 }`: the row awards that many of the guide's `quantity` category, counted by amount.
  - `{ reference: "https://…" }`: the page this row alone was written from (see Sources: it isn't shown). It must be https **(tested)**.
  - `{ map: ["Site", "https://…"] }`: this row's own map, only where it differs from its group's (see Maps).

## Maps

- A map is a reader's tool, not a citation: `map: [site, url]` on a group shows "Map on <site>" under its title, and on a row "Map" beside its tags or after its text, each opening in a new tab. It's a field of its own so a source never comes back into view.
- Only a page whose main content marks where the thing is qualifies: a map image or an interactive map of those rows (iRedDead's outfit and location maps, Nintendo Life's regional Might Crystal maps). A walkthrough, an area's wiki page or another tracker doesn't.
- Give a group its map; give a row one only when its map differs from the group's. Each has a site name and an https address, and a row never repeats its group's map **(tested)**.
- Link to a heading on the page (`#…`) when the page has one for that region or item, read from the page's own HTML, not guessed. A heading that moves only lands the reader at the top of the page.
- Link, never copy: a map's image is the game's art and the site's work, so it is never saved, embedded or hotlinked.

## Sources

- Sources are provenance: the pages the data was written from, kept so it can be checked (the tests below, the `source-checker` helper, `docs/facts-to-verify.md`). **No guide shows them**: no line under a section or a group, no link on a row, no Sources page. Readers get the directions, not the citations. Keep them complete anyway: they're how "no unverifiable claims" and the two-hosts rule for missables stay checkable.
- Every link is https and has a label **(tested)**. That covers guide, chapter and group sources, the reassurance's sources and row references.
- Label a source by what it settles ("Sanctum interior and roof chest"), not just by the site's name. Red Dead adds the site in front: "iRedDead · story missions".
- Draft from the pages you link, and link the page you actually used. Where two pages disagree, note it in `docs/facts-to-verify.md`, with which one the data follows.
- Before rows are committed, someone who didn't write them checks every claim against the page it cites (the `guide-content` skill, step 5).
- Each guide's README says the content was drafted from community guides and not replayed in the game. Keep that true: anything you did check in the game, say so in `facts-to-verify.md`.

## Missables

`data/missables.ts` exports `missables`: the rows a player can lose for good.

```ts
export const missables: Missable[] = [
  {
    id: "optional-i-know-you-start",
    why: "Time-limited: finish all three parts before the last main mission, or the chain fails.",
    sources: ["https://www.ireddead.com/rdr/guides/i-know-you", "https://www.gamesradar.com/red-dead-redemption-stranger-mission-guide/2/"],
  },
];
```

- An entry needs **two independent sources on different hosts** that agree on the exact condition **(tested: two hosts, https, a real row id, a `why` of more than 10 characters)**. Anything weaker goes in `docs/facts-to-verify.md`, not in the strip.
- `why` is one line: the exact condition for losing it.
- While nothing qualifies, export a `reassurance` instead: one honest sentence and two sources on different hosts **(tested)**. Echoes and Koholint do this. The strip then shows the sentence alone in place of a "Don't miss" list, in every chapter with nothing to list: a [one-way choice](#one-way-choices) is listed in its own chapter, and the others keep the sentence.

## One-way choices

`data/choices.ts` exports `choices`, which `config.ts` passes as `choices`. Each one is a decision a single playthrough can't take every way of: Lordran's Frampt or Kaathe, Hallownest's Nailsmith. The guide recommends one way for this playthrough, and puts each other way in a later playthrough's chapter as a row of its own: an NG+ chapter where the game has one, otherwise a "Second save" chapter at the end. Every way counts, so 100% takes the later playthrough too, as endings do (decided 19 Nov 2026).

```ts
export const choices: Choice[] = [
  {
    row: "quest-lordvessel-frampt",
    name: "Frampt or Kaathe",
    why: "If Kaathe takes you to place the Lordvessel, Frampt leaves until the next playthrough.",
    later: [{ row: "cycle-ng-plus-plus-kaathe", on: "NG++" }],
    sources: ["https://darksouls.wikidot.com/darkstalker-kaathe", "https://darksouls.wiki.fextralife.com/Kingseeker+Frampt"],
  },
];
```

- **`row`** is the way recommended for this playthrough, a row in the choice's chapter. Core draws it inside the choice's block and lists it in "Don't miss" with the `why` until it's ticked. That warning is the choice's, so the row is never in `missables.ts` as well **(tested)**.
- **`later`** holds the other ways, at least one, each a row in a later chapter than the choice's **(tested)**, with `on` naming its playthrough as the block shows it ("NG+", "a second save"). In its own chapter that row links back to the choice.
- **A row is in one choice at most**, as `row` or as a later way **(tested)**.
- **`sources`**: two independent https hosts that agree, as a missable needs **(tested)**. Anything weaker goes in `docs/facts-to-verify.md`.
- **Spoilers.** The `name` and the `why` show in the choice's chapter, and so does each later way's title (the block names it, and names its chapter by number only). All three say only what the choice's chapter already says, as a questline's name does. No test can catch one that spoils.
- **Not a choice**: ways that all fit on one playthrough (Dark Souls' boss-soul items over NG, NG+ and NG++; endings in order), a row that already covers every outcome ("by ritual or banishment"), and a loss with nothing in return, which is a missable (Zote).
- Core adds the `one-way` tag to a choice's row, as it adds `missable`: never write either in the data **(tested)**.
- A choice's row can carry any categories. New rows for later ways get new ids, which is safe for saves. An existing row's id never changes.

## Questlines

`data/questlines.ts` exports `questlines`: the Questlines page's tab word, title and intro, and its lines, each a chained side quest made of rows that already exist.

```ts
export const questlines: Questlines = {
  tab: "Quests",
  title: "NPC questlines",
  intro: "Each character’s story in order, as far as you’ve revealed. Ticking a step here ticks it in the guide.",
  cover: ["quest", "invasion"],
  lines: [{ id: "siegmeyer", name: "Siegmeyer of Catarina", steps: ["quest-sieg-gate", "quest-sieg-sens", …] }],
};
```

- **Steps are row ids in route order, each once** **(tested)**. Order comes from the route alone: the steps a reader has revealed are then always the line's first ones. An arc that truly runs against the route is two lines.
- **`cover`** lists tags whose every row must be in some line **(tested)**. A row may be in two lines, as Logan's and Griggs's farewell is.
- **A line's `id`** is kebab-case and unique **(tested)**, and stays once live: it's the line's address.
- **A name says only what the line's first step's chapter already says**: the character as first met ("Siegmeyer of Catarina", never the daughter met later). It shows as soon as that chapter is revealed, so it follows the same rule as a chapter's `teaser`. There's no blurb, for the same reason. No test can catch a name that spoils.
- A line is a claim that its steps belong together. Group only what the rows' own texts or two sources tie together, and put any doubt in `facts-to-verify.md`.

## Builds

A guide whose game is played by build can point a reader toward theirs: `config.ts` passes `builds: { leanings, named, picks, tasks }`, all from `data/build-plan.ts` (Lordran's). Only Lordran has builds (decided 21 Nov 2026, after research on how Dark Souls builds work and what build guides recommend). A build never counts: everything in it points at a row that already exists and changes nothing about it ([core.md](core.md#builds) has what the reader sees). A row shows build lines only for a step or a pick: what a weapon scales with or needs is no hint on its own (the stat-index facts of the first version went on 21 Nov 2026, the user's call), and survives only as a pick's `needs`.

- **Leanings** (`builds.leanings`): `{ id, label }`, the ways a reader levels. Lordran's are Strength, Dexterity, Intelligence and Faith (the stats behind every requirement and scaling) and Pyromancy (which grows with the flame, not a stat). Attunement isn't a leaning, since every caster needs it. Ids are lowercase and unique **(tested)**, each in a named build or served by a step **(tested)**, and **never change once live**: a reader's pick saves them, so the guide's `guide.test.ts` pins them. A leaning can be retired, never renamed or reused: Humanity (`hum`) went with the Chaos weapons add-on on 21 Nov 2026, a saved pick that holds it reads without it (`normalizeBuild`), and Lordran's test holds that the id never comes back.
- **Named builds** (`builds.named`): `{ id, name, stats, blurb, addon?, start? }`, the builds readers know by name, as build guides name them, each a set of leanings: Quality is `["str", "dex"]`, Pyromancer `["pyro"]`. An add-on (Pyromancy) goes on top of another build. No two named builds, and no two add-ons, share their leanings **(tested)**, so a pick has one name. The blurb is a play style, never a later item. Ids are data only, never saved.
- **`start`**: how build guides start a named build, `{ class, weapon?, why?, guides, lists?, sources }`: the class with its article ("a Cleric", "a Bandit or a Warrior"), the weapon that class starts with where guides fight with it early (the first stage of the build's weapon track: starting gear has no row), and what they say it's for. It shows on the build's card in the dialog, from the reader's first tick, so it names nothing past chapter 1. Its links follow a pick's rule for that one build: a guide for it and two independent hosts **(tested)**, none tagged with builds. A `why` needs a `weapon` **(tested)**. Where guides start a build as different classes, one host each, or only one names a class, it has no start (Lordran's Magic Knight and Quality). Lordran's `guide.test.ts` knows the classes' starting stats, and every class a start names must be one it knows **(tested)**.
- **Every named build has a weapon** on its track (a start's weapon, or a weapon or path pick) **and a step** its leanings serve **(tested)**: the reader's ask, that no build lives on its spells alone.

### Picks (`picks`): what build guides use

```ts
{ row: "quest-quelaana", for: ["pyromancer", "pyromancy"], kind: "spell", item: "Great Combustion", role: "upgrade", core: true, why: "a close-range burst",
  guides: [["Fextralife", "https://darksouls.wiki.fextralife.com/Pyromaniac+Build"]], lists: [["TheGamer", "https://www.thegamer.com/dark-souls-best-builds/"]], sources: ["https://darksouls.wikidot.com/quelaana-of-izalith"] }
```

- **The sourcing rule.** For **each named build in `for`**, a pick needs **a build guide for that build and two independent hosts in all** **(tested per build, "www." aside)**. A build guide (`guides`) lays a build out: a Fextralife build page (all of Fextralife is one host), a class guide such as gamevoyagers', a build page such as magicgameworld's, a Steam guide. A ranked "best builds" list (`lists`: TheGamer, Gameranx, GamersDecide and the like) is a second voice only. A guide for another build doesn't count for this one: a Paladin page doesn't back a pure Faith pick, and a pyromancer's guide doesn't back the Pyromancy add-on, which needs a melee build with pyromancy beside it. A guide counts for the build its stat spread is, whatever its title says: a Strength page with 32 Intelligence for Crystal Magic Weapon is a Str/Int hybrid, not Pure Strength (Fextralife's player pages often garble their stat blocks, so say in `facts-to-verify.md` how one was read). Forum threads (Steam discussions, Reddit), machine-written pages, and a page that lists twenty weapons without choosing don't count. A pick that fails for a build drops that build, or goes to `docs/facts-to-verify.md`. Whether a page is a guide, a list, or for which build is the writer's and the source-checker's call; the test only counts hosts per build, from the links' own tags.
- **A link** is `[name, url]` on a pick for one build, and `[name, url, builds]` on a pick for several, naming the builds it backs (a sorcerer's guide and a pyromancer's naming one ring) **(tested)**. The builds place is an id list, hidden from the reader-text walk; the name is reader text. A reader sees only the names that back their build.
- **`row`**: where the reader comes by it, as early as the guide offers it (Great Combustion on Quelana's row in chapter 3, not the spell's own row in chapter 9).
- **`for`**: the named builds (ids) the guides recommend it for. Each build in it meets the rule on its own **(tested)**.
- **`item`** as the game names it; **`why`**: what guides use it for, as a build guide says it ("a first weapon you can use now"), with a fact where it helps (a price, what it can't do): which stats it scales with, never a scaling letter **(tested)**: the wikis' letter ranges differ and a +0 letter rises with each upgrade. Nothing past the row's chapter, and no string a build shows says "best": names, blurbs, starts, picks and steps **(tested)**.
- **`role`**: when it serves the build **(tested)**: `starter`, usable in the opening hours with the build's starting class's stats (Lordran's test holds every starter's `needs` to a class its build starts as, within three levels, two hands counting Strength 1.5 times); `upgrade`, what the build moves to once its stats or upgrades allow; `endgame`, what it ends on. A pick whose role differs by build is two picks: no two picks for one item on one row share a build **(tested)**. **`core`**: what the build is built around and keeps (the flame, a ring that raises every spell). **`rare`**: it doesn't come every time (a random drop), and only a core pick may be one **(tested)**: anything less isn't worth the farming. A big weapon found early is a pick only if guides use it, and its role and `needs` say when (the Demon's Great Hammer, no class can wield early and one stub guide names, isn't).
- **`needs`**: what it takes to use, one-handed, by leaning id (`{ str: 16, dex: 10 }`), from its wiki page, keys the guide's leanings **(tested)**. The row shows it as "needs 16 Strength and 10 Dexterity"; a two-handed figure, where it matters, goes in `why`.
- **The weapon track** is a named build's `start` weapon, then its path steps (`path: true`) and its `weapon` and `path` picks in route order, revealed chapters only. A path pick ("A Divine weapon") names the path a weapon takes at a smith.
- **The guides' names** are shown ("· Fextralife, TheGamer"), never their links. **`sources`**: wiki pages for any fact in `why`.

### Steps (`tasks`): what a build does

```ts
{ row: "quest-laurentius", serves: ["pyro"], title: "Buy his pyromancies and start on the flame", text: "Laurentius sells Fireball for 800 souls…", sources: ["https://darksouls.wikidot.com/laurentius"] }
```

- **A step is done when its row is ticked**, so it sits only on a row whose tick means it's done: a trainer's row that includes buying, a covenant joined, an ember taken, a milestone the row names (Quelana's row needs a +10 flame, so it carries the +10). An upgrade no row stands for is part of the step it leads to; never a numbered step on a row ticked for something else ("Find Andre" isn't "reinforce to +5"). Don't add rows for steps: they'd show for every reader.
- **`serves`**: leanings, any of them **(tested)**. **`title`**: a short imperative, no full stop **(tested)**. **`text`**: who, where, what it costs, what it opens, from the wikis, nothing past the row's chapter.
- **`before`**: what's lost if it waits, in the row's own terms, on **two independent hosts** **(tested)**, and **never on a missable row** **(tested)**, whose warning already says it.
- **`path`**: a step on the weapon's path (a smith, an ember, a reinforcement), shown in the build's weapon track too **(tested)**. Chaos sits here, as the Fire path's next step at Vamos for the pyromancy leaning: no build's guides on two hosts take a weapon Chaos, so it's an option a step names, never a pick.
- Steps are numbered per pick in route order; where the wikis disagree on a price or a condition, the text says what both agree on and `facts-to-verify.md` keeps both readings.
- Picks and steps go through the `source-checker` helper before they're committed, as rows do.

## Achievements

A platform's achievements (Steam, Xbox, PlayStation trophies) are a good source: their list is a quick way to check nothing is missing, and a count can cite one. **A reader sees achievements only when the game keeps a list of its own**, so every reader has one whatever they play on: in-game where the platform has no achievements, as Hollow Knight's Feats on Switch. Then the guide's config sets `achievements` with two hosts or more that say so, and the guide calls them the game's achievements, by the game's own names. Without it no text a reader sees says "achievement" or "trophy" **(tested: `data.test.ts` walks every reader-facing string in the config, `readerText` in core)**: no target, category, chip or row named after one, and no achievement's name dressed as a list's (Lordran shows none, since nothing found names a list of Dark Souls Remastered's own, so its rare weapons aren't "Knight's Honor"; [its facts-to-verify.md](../apps/lordran/docs/facts-to-verify.md#achievements-a-source-never-shown) says what backs that and what would settle it). A row that existed only for an achievement keeps its id: it counts as its real kind, or becomes a route step when the board already counts what it asks. Decided 19 Nov 2026.

## Counts

Every target in `completion.board` has a `goal`, and core's `data.test.ts` holds it to the target's rows, so a missing or doubled row fails a count. Where the game has a fixed total, the goal is that total and the target is `list: "game"`. A list the guide makes up itself is `list: "guide"`, its goal is its rows, and none of its rows may count under another target. The test checks the data against the number, not the number against the game, so record where each number came from in `facts-to-verify.md`.

## Facts to verify

Each guide keeps `docs/facts-to-verify.md`: what the guide claims that nobody has confirmed. A reader or a later session can then tell guidance from fact. Update it in the same commit as the data it's about.

What goes in:

- **Counts and weights** taken from sources and not recounted in the game, with where they came from.
- **Missable candidates** with fewer than two sources, and what each source says.
- **Disagreements** between sources, and which one the data follows.
- **How a source was read.** Say "read directly on 2026-11-14", "read in the browser (fetching was refused)" (a page you read yourself, since the `source-checker` helper has no browser), "unread (fetching was refused)" (a page the helper couldn't fetch) or "search summary only": a page that blocked fetching and was only seen through a search summary is weaker.
- **Spoiler checks** done by eye, not by a playtester.
- **Content left out on purpose**, and why, so nobody adds it back as a "fix".

For each open question, Koholint's table also says what would settle it. Use that shape for anything a playthrough or a second source could close.

## After a data change

- Run `pnpm test` in the app folder for a quick loop, then `pnpm check` at the root.
- Open the changed chapter in a browser, in both layouts if the guide has a checklist page, and read the rows as a player would ([testing.md](testing.md#in-a-browser)).
