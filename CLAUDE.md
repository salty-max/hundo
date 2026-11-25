# hundo

Spoiler-aware PWA completion guides for single-player games: a pnpm workspace with one shared app in `packages/core` and one guide per folder in `apps/` (the README lists them). React 19, TypeScript, Vite, Vitest. GitHub `salty-max/hundo`, deployed as one Vercel project per guide plus `hundo-api` for the sync API, and served at `<sub>.hundo.quest`. The README has the layout. This file is the rules.

## Commands

- `pnpm install` at the root (pnpm 11, pinned in `packageManager`; Node 26 like Vercel and CI).
- `pnpm check`: lint (warnings fail), typecheck, tests and build for the packages this tree changes against `origin/main` and the packages that read what it changes (`tools/check.mjs`; its first line names them and why): a core change checks every package, a guide's data that guide, docs nothing. `pnpm check --all` checks every package, as CI always does; `--dry-run` prints the first line alone. Through the harness: `bun harness/q.ts check -- bun run check`, which stamps the tree for the push gate (only that command, word for word: `--all` and `--base` stamp nothing) and, with the check queue on, may wait its turn behind another session's check (see Sessions and worktrees). A test that reads a file outside its own package needs its rule in `tools/scope.mjs` ([docs/testing.md](docs/testing.md#what-pnpm-check-runs)).
- `bun harness/hooks.ts install .`, once per clone, from the main checkout's root: it points `core.hooksPath` at `harness/githooks`. `bun harness/hooks.ts status` shows whether they're on. It refuses in a worktree.
- In an app folder: `pnpm dev`, `pnpm test`, `pnpm build`, `pnpm preview`, `pnpm icons`. At the root, `pnpm screenshots [app,…]` retakes the install dialog's pictures from production builds (not part of the check; a heavy job, see Heavy browser jobs below). A `cd` lasts one command in a session here (`.claude/settings.json`), so reach the folder in the same command, `cd apps/<name> && pnpm test`, or use `pnpm -C apps/<name> test`.
- Browser pane: `preview_start` with `koholint`, `rdr` or `echoes` for dev, or `<name>-preview` for a production build (`.claude/launch.json`). These load only in a session started in this repository. They serve the folder the session works in: its worktree when the app opened it in one, the main checkout otherwise, so read the `cwd` in `preview_list` before trusting a page ([docs/testing.md](docs/testing.md#which-folder-the-pane-serves)). A port that's taken moves to the next free one, so read the port from the result (`docs/testing.md`).
- The landing page for hundo.quest: `home/` (`hundo-home`, its own Vercel project), made at build from every guide's own files, so a new guide needs nothing there. `preview_start` with `home` for dev or `home-preview` for a production build, `pnpm -C home test`, and `pnpm lighthouse home` at the root (CI's `lighthouse-home` job). Its notes are `home/README.md` and [docs/deploying.md](docs/deploying.md#the-landing-page).
- Sync API: `services/sync` serves sync codes. `pnpm -C services/sync test`, or `preview_start` with `sync-api` for it on port 8787 with an in-memory store. Its notes are `services/sync/README.md`. A guide's dev and preview servers send `/api` there (`SYNC_API` names another address), so start it first to try sync ([docs/testing.md](docs/testing.md#sync-in-a-browser)).
- Screenshots: `node .claude/skills/guide-check/scripts/shoot.mjs --out <dir> [--apps a,b | --all]` (the `guide-check` skill). Without `--apps`, the guides whose own files the change touches, and Koholint, Red Dead and Echoes beside them when it reaches every guide (core, the root's files).
- Lighthouse: `pnpm lighthouse [app,… | --all]` at the root audits the production builds as CI's `lighthouse` job does, about two minutes a guide, and stays out of `pnpm check` ([docs/testing.md](docs/testing.md#lighthouse)). Without names, the guides whose own files the change touches; a change to core or the root's files alone asks for names, since CI audits each guide.
- Component stories: `pnpm --filter hundo-stories storybook`, or `preview_start` with `storybook`. They run as tests, axe in every guide's palette and theme, inside `pnpm check` when a change reaches them: one Vitest project and one Chrome, each story rendered under each guide and theme in turn (`.storybook/every-look.ts`), two story files at a time (`maxWorkers` in `vitest.config.ts`). They need the system Google Chrome ([docs/testing.md](docs/testing.md#stories)).
- **Heavy browser jobs take their turn in the queue.** `pnpm lighthouse` and guide-check's `shoot.mjs`, `tab-switch.mjs`, `tab-trace.mjs`, `reveal-probe.mjs` and `sheet-probe.mjs` queue themselves (`tools/queued.mjs`, through `bun harness/q.ts --queue <name>`), in the same machine-wide line as `check`, so one runs at a time however many sessions ask: several at once took the Mac's load past 200 and filled its swap. `pnpm screenshots` doesn't (its script is core's and its entry the root `package.json`, both of which every guide's Vercel ignore command watches): run it as `bun harness/q.ts --queue screenshots -- pnpm screenshots [app,…]`. Run them all in the background, as a queued check (Sessions and worktrees). A queued job is stopped after 30 minutes (`[checks] queue_limit`, `--limit <minutes>`; a script that can take longer passes its own to `queueSelf`), because a hung one holds the place for everyone, and `bun harness/q.ts --queue-status` shows who holds it. A queued job's output is in the log its verdict line names, in `.cache/logs/`. The scripts that queue themselves also print the log's last lines after the verdict (Lighthouse's table is there); `screenshots` run through bare q prints the verdict alone, so read its log. CI, `HARNESS_QUEUE=off` and a run already inside a queued command skip the queue, and the job then prints as it runs ([docs/testing.md](docs/testing.md#heavy-jobs-share-the-mac)).

## Which skill and doc for which task

The skills, in `.claude/skills/`, hold the procedures. The docs hold the reference they point to.

| Task | Skill | Doc |
| --- | --- | --- |
| Add a guide | `guide-new` | `docs/adding-a-guide.md` |
| Write or fix chapter data, missables, counts, `facts-to-verify.md` | `guide-content` | `docs/chapter-data.md` |
| Chapter banners | `guide-banners` | `docs/house-style.md` |
| Palette, fonts, corners, icon, buttons | | `docs/house-style.md` |
| Anything in `packages/core` | | `docs/core.md` |
| Look at a change in a browser, before and after | `guide-check` | `docs/testing.md` |
| Vercel, previews, production, a new project | `guide-deploy` | `docs/deploying.md` |
| The sync API (`services/sync`) | | `services/sync/README.md`, `docs/deploying.md` |

## Hard rules

Each one is a mistake already made, or one that would cost readers their progress.

- **Storage keys never change, and an address changes only with a hand-off.** Progress lives in each reader's localStorage under `<storagePrefix>.v1` on the guide's origin, the theme under `<storagePrefix>.theme`, a synced device's ledger under `<storagePrefix>.sync`, Keep screen on under `<storagePrefix>.awake`, the last place read under `<storagePrefix>.place`, when the guide last asked to keep its storage under `<storagePrefix>.persist`, Count my visits turned off under `<storagePrefix>.counts`, the leanings ticked in Your build under `<storagePrefix>.build`, and whether the guide has asked for a build under `<storagePrefix>.build-asked`. A new key, or a bare move to a new address, starts everyone from nothing (and a new `.sync` makes every synced device send all it has again). A move needs `brand.home`, `brand.movedFrom` and the old address left serving ([docs/deploying.md](docs/deploying.md#pitfalls)). The `.v1` stays even when the save format's `version` moves on. Each guide's `guide.test.ts` pins all nine keys, and Lordran's also pins its leaning ids, which a reader's pick saves, and that a retired one (`hum`) never comes back. hundo.quest keeps one key of its own, the reader's theme under `hundo.theme` on its origin, and `home/src/deploy.test.ts` pins it.
- **A guide's `brand.id` never changes.** It's the `guide` written into every backup, and the name the sync API (`services/sync`) stores a guide's progress under. The API's `GUIDES` list must hold every guide's id, and `services/sync/src/project.test.ts` fails when it doesn't.
- **Row ids never change once live.** They're the saved checks, and a renamed id comes back unticked for every reader. Each guide's `data/live-ids.txt` lists every id that has shipped, and `data.test.ts` fails on one that's gone: break a bundled row up through `data/splits.ts`, which ticks every part for a reader who ticked the bundle ([docs/chapter-data.md](docs/chapter-data.md#splitting-a-row)).
- **`theme-init.js` stays an external file.** The CSP has `script-src 'self'` and no inline scripts. `deploy.test.ts` checks both.
- **No `cleanUrls` in `vercel.json`.** It breaks the SPA rewrite, so deep links 404. `deploy.test.ts` checks it.
- **The catch-all skips `/api`, `/assets`, `/fonts`, `/icons` and `/workbox-`, `/api` goes to the sync API ahead of it, and a long cache comes only with a found file.** A missing hashed asset must 404, not come back as HTML, and that 404 must not carry the one-year cache. A missing call must be the API's answer, not the app's page. So `vercel.json` is `routes` alone, with the cache rules after `{ "handle": "hit" }` (never `headers` or `rewrites` beside it: [docs/deploying.md](docs/deploying.md#what-verceljson-sets)). `deploy.test.ts` checks the routes and their order, and `headers.sh` checks a preview's 404s.
- **Every app's `vercel.json` is the same file**, and its ignore command (`scripts/vercel-ignore.sh`) watches the app, core, `scripts` and the root workspace files, and only ever exits 0 or 1: Vercel fails a deployment on any other code. `deploy.test.ts` checks all of it.
- **A guide sets only its palette (`theme.css`), its fonts and `corners` (`brand.ts`), its icon art and its banners.** Every other look is core's. `theme.test.ts` holds the palette to eleven keys and to contrast in both themes.
- **Never pass `className` (or `style`) to `Button`.** Pick a `look`. The type forbids both.
- **Raw CSS imports load empty in Vitest unless they're let through.** Read a stylesheet as text with `?raw`, which `vite.ts`'s `test.css.include` allows. The theme test once passed on nothing because of this.
- **A missable needs two independent sources on different hosts.** Anything weaker goes in the app's `docs/facts-to-verify.md`. So does every count, weight or claim nobody has confirmed, in the same commit as the data.
- **Commit `pnpm-lock.yaml` with any `package.json` change.** CI and Vercel install with `--frozen-lockfile`.

## Working rules

- **Look before calling it done.** Every visible change gets opened in a browser on desktop and phone, in light and dark. For a core change, do that in an article guide and in Red Dead (`docs/testing.md`).
- **Preview first.** Nothing reaches production without a look at its Vercel preview: headers, deep links, the service worker (`docs/deploying.md`).
- **No push, deploy, merge to `main` or new Vercel project without the user's go**, asked of the user in the opener when a child wants it (a child asks nothing, see Harness below), in the session itself when it has no opener. A merge to `main` deploys every guide whose ignore command sees a change.
- **A plain `git push` to origin, alone in its call or beside read-only git (`status`, `fetch`, `log`, `diff`), raises no permission prompt here**, and in no other folder is that so: `[asks] skip` in `harness.toml` keeps the three push asks out of `.claude/settings.json`, and the user's own settings run a hook (`harness/claude-hooks/ask-push.ts` in the harness repository, its header says what it allows and asks) that allows such a push in this repository and its worktrees and asks for every other push, here too when it is destructive, among them `--force`, `-f`, `--force-with-lease`, `--delete`, `-d`, `--mirror`, `--all`, `--tags`, a refspec starting with `+` or `:`, another remote. A plain push chained with anything else (`git commit … && git push`, a check, a script) gets no opinion from the hook, and the normal permission flow decides. `main` is protected on GitHub, so a push can't change it: what a push reaches is a pull request's branch and its previews, apart from a new Vercel project's first deployment, which lands on production ([docs/deploying.md](docs/deploying.md#a-new-project), step 8; `vercel git connect` still asks). The go above still stands, and the pre-push gates (a passing check, a recorded review) still run. `gh pr merge` and every Vercel command still ask.
- **No unverifiable claims** in the guides, the READMEs or these docs. Comments only where they explain a why.

## Sessions and worktrees

hundo sets `[hooks] lock = false`, `[session] worktrees = true` and `[session] decisions = "opener"` in `harness.toml`. Each child session works in its own git worktree on its own branch, cut from `main`, and asks the user nothing: its questions and every go go to its opener. A task that wants its plan approved first doesn't start in plan mode (`session.ts` refuses `--plan` here, since leaving plan mode asks in the child's own session): it is a `--kind prose` (Opus) child that writes its plan, sets its card waiting-review, sends the plan to its opener and stops. The opener asks the user and, for a code task, moves that child to Sonnet before it relays the answer quoted (a CLI child can't be moved: the build is then a new `--kind code` child on the approved plan). Nothing commits to `main` here and the work meets in pull requests, so no session waits for another's. The board is the list of who does what, not a lock. A card can still be `blocked --on` another, as a choice (the last item).

- **`pnpm install` first in a new worktree.** It has no `node_modules`.
- **Open a child from the desktop app.** The harness's CLI path adds `--worktree` to `claude --bg` (`claude --help` lists `-w, --worktree [name]`), but nobody has run the two together here, so a CLI-opened child may start in the main checkout: look at its folder first.
- **Where the harness reads the main checkout.** The git hooks (`core.hooksPath` is absolute) and everything the tools read from `harness.toml` while they run (`lock`, `queue`, `decisions`, `worktrees`, the check) come from the main checkout, so a change to either only takes effect once the main checkout has it merged and pulled: until then `session.ts` run in a worktree still prints the old rules. The board and the check stamps are shared by every worktree. `hooks.ts install` refuses in a worktree.
- **A sync, `init` or `doctor` acts on the worktree it is given.** `bun ~/code/wow-addons/harness/harness-sync.ts <worktree>` writes that worktree's own `harness/` and `init.ts <worktree> --section-only` its own CLAUDE.md section, rendered from its own `harness.toml`: a harness update is a commit on a branch like any other, not an edit in the main checkout. `doctor.ts <worktree>` judges the worktree's files and the hooks as the main checkout has them.
- **`session.ts check` may say "git fetch first".** Unpushed commits are counted by content against the remote as last fetched, so a branch merged since the last fetch still reads unpushed. Fetch and run it again: a rebase-merged branch then reads nothing unpushed, whatever new ids the rebase gave its commits (a patch changed in the rebase still counts).
- **A queued check can wait minutes.** `[checks] queue = true` runs one `check` at a time on the Mac, and the heavy browser jobs above stand in the same line, so `bun harness/q.ts check -- bun run check` may print a waiting line, naming the holder and repeated every five minutes, and sit in the line behind another session's check or Lighthouse run. Run it in the background: a foreground Bash call is capped at 10 minutes with the wait and the check both inside it, and the waiting line warns that a call that times out loses its place.
- **Rewrites of core are sequenced on purpose.** The component rewrite, and anything else that rewrites core under every guide, goes one at a time: a worktree spares the wait, not the rebase. The card that comes second is set `blocked --on` the first (`board.ts set <id> --status blocked --on <card>`), which is a choice and the board then reads as it always did, or it starts once the first has landed.

<!-- harness:start -->

## Harness

This project runs under a small harness (`harness.toml`, tools in `harness/`). The rules
below are checked by git hooks or by tools, so they are not advice.

- **One task, one session, one card.** A session's first write is its card:
  `bun harness/board.ts add <repo> "<title>" --repos <repo> --try "…" --committed "(none yet)" --left "…"`.
  It names the repositories the task writes. Nothing refuses a commit for want of it
  (`[hooks] lock = false`): keeping it is the session's own rule. Move the card at each
  stop
  (`board.ts set <id> --status waiting-test|waiting-review|ready-to-push|done`).
- **Checks go through q**: `bun harness/q.ts check -- <the check>`. One verdict line,
  the log in `.cache/logs/`, the tree stamped. A push is refused for a tree with no
  passing check. Never pipe a check into `tail`; anything long goes to a file.
- **The board is a list, not a lock.** A `note:` that another card is running in a
  repository only says who else is there: keep to your own files and talk to that
  session by its id, don't wait for it. `board.ts held` shows who runs where. A card
  can still be `blocked --on` another, as a choice.
- **Each child works in a worktree of its own**, on a branch of its own
  (`[session] worktrees = true`): commit there, never in the main checkout. The board,
  its cards and the check stamps are shared by every worktree, and `harness/packet.ts`,
  `review.ts` and `session.ts check` act on the worktree they are run from or asked
  about. The git hooks run from the main checkout (`core.hooksPath` is the absolute
  path `hooks.ts install` wrote there, so a worktree's own copy of the tools is never
  the one that runs) and the tools read `harness.toml` from it: install the hooks
  there (`bun harness/hooks.ts install .`), never from a worktree.
- **Review before the commit**: `bun harness/packet.ts <repo>` on the uncommitted files,
  the `reviewer` helper reads the packet, fix what it finds, then
  `bun harness/review.ts <repo> "<verdict>"`, then one commit. A push is refused for a
  change no review stands behind (docs are waived).
- **Commits**: Conventional Commits, lowercase subjects, no AI co-author or "generated
  with" line (the commit-msg hook refuses them).
- Ask before any push, release or deploy.
- Rules this project keeps beyond these: `CLAUDE.md`.

How sessions work together (behaviour: no hook checks these):

- **A new task asked in a session that has its own is opened as a child** (the `child`
  skill): tell the user its name and where to find it, write nothing for it here. A
  small follow-up of the same thread stays.
- **Every decision is taken in the opener, never in a child**
  (`[session] decisions = "opener"`). A child asks the user nothing: it sends each
  question (a push, a merge, any choice) to its opener with the options and its
  recommendation, and stops. The opener asks the user through the question tool
  (`AskUserQuestion`, or `wrap_up`'s ask), the recommended answer first and marked
  "(Recommended)". Never a question buried in prose.
- **A go is the user's, asked in the opener.** A child never pushes and never asks
  for a go: its report says what is committed and what a push would send
  (repository, sha range, push only). The opener asks the user, then pushes on their
  answer or relays it to the child quoted. A push go never covers a deploy or a
  release: each is asked again.
- **A plan comes to the opener, not to a child in plan mode.** Leaving plan mode asks
  the user in the child's own window, where nothing routes it to the opener, so no
  child starts in it (`--plan` is refused). A task that needs a design settled first
  is a child on the stronger model, without `--plan`, whose task says: take your card,
  write your plan, set the card `waiting-review`, send the plan to your opener and
  stop. The opener asks the user. For a code task it moves the child to the project's
  default model (`set_session_model`) before it relays the answer quoted, because the
  relay wakes the child; a CLI child can't be moved, so its build is a new child on
  the approved plan.
- **Close a finished child yourself**: its work pushed (or dropped) and its card done,
  then `bun harness/session.ts check <local_id>` and archive it (desktop) or
  `session.ts close` (CLI). Never wait to be told. Never one that waits on the user,
  holds an open card or has a follow-up on its way.
- **Pick each child's model from its task**: the project's default for mechanical work
  from a written brief, a stronger model at higher effort for judgment (prose, voice,
  security, design, a plan the user must approve).
  Set it when the child starts and say the choice in one line.
- **Never kill or signal a process another session may share.** A dev server, an e2e
  server or a watcher may be another session's. A hook refuses it in your Bash
  (`harness/nokill.ts --session`): by name, port or group, a literal pid, a runner.
  What passes is a job your command put in the background with `&`, then `kill $!` or
  `kill %1` in the same command. A background task of yours stops with TaskStop;
  anything else, report it.
- **A problem found along the way gets fixed now**, under its own card, or handed to a
  new session at once. Never only mentioned in the report.
- **Review your own work before saying it is done**: read the diff, grep for leftovers,
  check each claim in the report, see CI's verdict. Chain a commit after the check with
  `&&`, never `;`.
- **"Can't" is a research task first**: the docs, the code that does the same thing, the
  web. Say what was checked, and "not verified" with the probe that would settle it,
  never "impossible" on a guess.

<!-- harness:end -->
