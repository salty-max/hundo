# Hundo sync API

The server behind sync codes: it lets a reader's devices share one guide's progress without an account. A device shows a six-digit code, another types it, and from then on the two exchange progress through this API. Each guide keeps its progress in the browser first, and the API only lets devices catch up with each other. It runs as its own Vercel project, `hundo-api`, at `api.hundo.quest` ([deploying.md](../../docs/deploying.md#the-sync-api)). The guides reach it through a rewrite of their own `/api` (their `vercel.json`), so a call is same-origin and the cookies are set by the guide's own host.

## Calls

Every endpoint is a POST with a JSON body that carries `"p": 1`, the protocol, which only ever grows. Replies are JSON, never cached.

| Path | Body | Answer |
| --- | --- | --- |
| `/api/pair/start` | `label` | a six-digit `code`, good for ten minutes and one use. A device with no link waits as pending for fifteen minutes. |
| `/api/pair/claim` | `code`, `label`, `guide` (optional, counted with the link) | `linked: true`, with `already` or `moved` when they apply. A wrong, expired or used code is `400 code`, and a group that already has twelve devices is `409 devices`. |
| `/api/status` | | `linked` and the devices in the group (label, last seen, which is this one). A device that was showing a code finds out here that it was used. |
| `/api/sync` | `guide`, `entries`, `touch`, and `rev` (optional) | the winning entries for the guide, the device count, the server's clock and `rev`, the revision of the guide's data. A call with `rev`, no entries and no `touch` that finds the revision unchanged is answered `{"unchanged": true, "rev", "now"}` and nothing else. |
| `/api/remove` | `id` | `ok`. Takes another device of the group out (the id is in `/api/status`'s list); it can't name itself (that is unlinking) or a device of another group (`400`). Its next call is `401 unlinked`. |
| `/api/unlink` | | takes this device out and clears its cookies. The last device out deletes the group's data. |
| `/api/forget` | | deletes the group's data and every device in it. |
| `/api/count` | `guide`, `counts` | `ok`, and `counted`, false once the month's budget is spent. Reads no cookie and needs none ([Visit counts](#visit-counts)). |
| `/api/summary` | `guide`, `summary`: `{ percent, chapter }`, or `null` | `ok`, and the `hundo_p_<guide>` cookie set to that summary, or cleared for `null`. From a linked device, the summary is also kept for its group; from anyone else, nothing is stored ([A guide's summary](#a-guides-summary)). |
| `/api/summaries` | | every guide's summary the caller's group holds: `{ "summaries": { "<guide>": { "percent", "chapter" } } }`, `null` for a guide whose last report was "nothing checked", and a guide never reported left out. A device still waiting on a code gets `{ "summaries": {} }`. The one call hundo.quest itself may make ([A guide's summary](#a-guides-summary)). |

Errors: `400` (bad body, code, guide, entries, summary, or a stamp more than a day ahead, which also returns `now`), `401 unlinked` (and the cookies are cleared), `403 origin` (and hundo.quest calling anything but `/api/summaries`), `409 devices`, `413`, `429 limit`, `503` (the store is down or not set up).

### Who may call

Who is calling comes from the `Origin` alone: a guide on `https://*.hundo.quest` (not `api.`) writes to the `prod` namespace, the landing page on `https://hundo.quest` itself may read `/api/summaries` there and gets a 403 for every other route (it reads, and pairs nothing), and a host named like one of the team's previews (`hundo-<project>-<hash or git-branch>-jellycat.vercel.app`; the name is all that is checked) or `localhost` writes to `test`, whose data is kept for a week. Anything else gets a 403, and so does a call with no `Origin`. The host isn't checked against it: behind a guide's rewrite this API gets its own host in `Host`, and no `x-forwarded-host` that names the guide's (seen on the first guide preview). Previews and `localhost` can't tell the landing page from a guide, so there the landing page isn't held to its one route. A browser sets `Origin` and no page script can change it. A script on another site is refused for its `Origin`, and couldn't read an answer anyway: the API never sends `Access-Control-Allow-Origin`, and `OPTIONS` is a 405. A form or `text/plain` post, which needs no preflight, is refused for its content type: the body must be `application/json`, checked before anything touches the store.

### Cookies

- `hundo_sync=<deviceId>.<secret>`: `HttpOnly; Secure; SameSite=Lax; Path=/api`, 400 days. The server keeps only a SHA-256 of the secret. On hundo.quest it has `Domain=hundo.quest`, so one link covers every guide in a browser. On a preview or localhost it is host-only, and `Secure` is dropped only for plain-http localhost.
- `hundo_link=<fingerprint>`: the same but `Path=/` and readable by script. The fingerprint is ten characters of a hash of the group id and opens nothing. A guide reads it to know it is linked, with no request.

- `hundo_p_<guide>=1.<percent>.<chapter>`: one per guide, set by `/api/summary` for every reader, synced or not, with the same attributes as `hundo_link` (`Path=/`, readable by script, 400 days, `Domain=hundo.quest` on hundo.quest). hundo.quest reads it to show a returning reader their progress ([A guide's summary](#a-guides-summary)).

A device that is only showing a code gets the first cookie for fifteen minutes and not the second, so a guide's other tabs don't try to sync before there is a group.

## What it keeps

All keys sit under `hs:<namespace>:`.

| Key | Holds | Kept |
| --- | --- | --- |
| `dv:<deviceId>` | hash of the secret, the group, a label such as "Safari · iPhone · Koholint app" (the guide's short name, for an installed app) | 400 days from the last touch (15 minutes while pending) |
| `gd:<group>` | each device's label and when it last synced | 400 days from the last touch |
| `p:<group>:<guide>` | the guide's progress, as a sorted set with one member per entry, `key<TAB>stamp<TAB>value`, scored by the stamp | 400 days from the last touch |
| `pc:<code>` | the device that showed the code | 10 minutes |
| `sm:<group>:<guide>` | the guide's summary as a device of the group last sent it to `/api/summary`: `1.<percent>.<chapter>`, the cookie's own text, or `none` once nothing is checked, in place of a summary it held. Only for a linked device ([A guide's summary](#a-guides-summary)) | 400 days from the last summary |
| `rv:<group>:<guide>` | the revision of that guide's data in the group: a counter that goes up, last of all, whenever a sync writes it, and that a poll can read in one command to learn that nothing changed | 400 days from the last touch |
| `st:<guide>:<yyyy-mm-dd>` | that guide's visit counts for the day (UTC), one field each, and `pair`, the links made that day | 25 months (a week under `test`) |
| `st:budget:<yyyy-mm>` | the store commands counting has used this month | 40 days |
| `rl:…` | counters for the limits: for pairing, keyed by a salted hash of the visitor's IP address, and for sync, by the device | the length of their window, an hour at most |

No email, no name. The server sees IP addresses, as any web server does, and uses them only through those counters. The visit counts hold no address, cookie or device. A guide's summary (`/api/summary`) is kept only for a linked device, under its group, and is two numbers worked out from the progress the group already keeps there; for anyone else it is answered and kept nowhere. The last device out of a group, and "delete synced progress", delete the summaries with the rest. A "touch" is the once-a-day request that pushes the expiry out.

### Visit counts

The guides count visits (what and why: [core.md](../../docs/core.md#visit-counts), and the README's "Privacy" section for readers). A guide sends `/api/count` its counts without cookies, so nothing in a call names the device, and `count` in `src/app.ts` reads no cookie and no address either: it adds the counts to the guide's day hash and nothing else. A field must fit `COUNT_FIELD` (`v:app`, `v:tab`, `p:guide/<n>`, `p:checklist`, `p:dashboard`, `p:questlines` (the Questlines page, taken ahead of the guides: no build sends it yet), `p:sources` (from builds older than 17 Nov 2026, which had a Sources page), `s:<n>`, `f:<n>`), at most 12 of them, each a whole number from 1 to 50, or the call is a 400 that costs the store nothing. `pair` is the server's own: a successful `/api/pair/claim` that made a new link (not `already`) adds one under the `guide` it names, and a client that names none isn't counted: an older build, or a reader who turned counting off or whose browser sends Global Privacy Control or Do Not Track (the guide then leaves `guide` out). A count that fails never fails the link.

Counting shares the store's 500,000 commands a month with sync, which mustn't run short for it, so it has a budget: 100,000 commands a month in production and 10,000 under `test`. A call first adds what its write will cost (its fields plus two) to `st:budget:<month>`, and once that is past the budget it writes nothing more that month and answers `counted: false`. Counting's own writes stay within the budget. A refused call still costs one command, until the instance answering it has seen the budget spent: it then refuses without the store (`spent` in `Deps`). Only the firewall's rate limits bound those calls. The one for every `/api/` call allows 120 a minute an address, which is some 170,000 commands a day on refusals from one address, from instances that haven't seen the budget spent yet. A rule for `/api/count` alone, `sync api: counts`, published on 17 Nov 2026, holds an address to 10 calls a minute (fixed window): at most 14,400 commands a day on refusals from one address ([deploying.md](../../docs/deploying.md#the-sync-api) has the rules). A call costs its fields plus two commands, and the month's first one more. At about four a call, the budget is some 25,000 visits' worth a month across the guides; when it runs out early, that's the time to move the database to pay-as-you-go.

Anyone can POST made-up counts with a forged Origin from outside a browser, as with any counter: the caps keep one call from skewing a day, and the numbers are indicative, not audited.

`pnpm stats [days] [--test]` (from this folder; 30 days by default) prints each guide's visits (and the installed app's share), pages, each chapter shown, started and finished, and links made, then the sync groups as they stand: how many hold how many devices, and how many have two or more devices synced in the last 30 days. It reads each group's record (`gd:`), whose values hold the device labels beside their last-synced times, and prints only counts, never a label. It runs with the database's read-only token, `KV_REST_API_READ_ONLY_TOKEN` with `KV_REST_API_URL`, from the environment or from `.env.local`, which `vercel env pull --project hundo-api --environment production` writes (git ignores it). A 30-day read costs 91 commands, plus a SCAN and one for each group.

### A guide's summary

hundo.quest is a page of its own, with no access to the guides' storage. To show a returning reader their progress, it reads a cookie each guide keeps on every hundo.quest host, `hundo_p_<guide>`, holding `1.<percent>.<chapter>`: the format, the guide's overall completion as its Progress page shows it (rounded down), and the chapter the reader was last in. This route sets it, so that no guide writes it from script. The guides call it from core's `summary.ts` ([core.md](../../docs/core.md#hundoquests-summary)): a moment after one opens, and a few seconds after its checks or chapter last changed, only when the cookie says something else than it would, and at once when the page is hidden with a call still waiting. A linked device waits for its page load's first sync, then calls once whatever the cookie says (below).

`summary` in `src/app.ts` takes a `guide` from `GUIDES`, a whole `percent` from 0 to 100 and a `chapter` from 1 to 999 (the bound the visit counts use: this API knows no guide's chapters, and a guide that gains one mustn't wait on it), and nothing else, or `null` to clear the cookie (nothing is checked). The cookie's name is built from the `GUIDES` entry and its value from the two numbers, never from the body's text. The call carries the guide's cookies like any other to `/api` (a browser keeps a response's cookies only from a call that sends its own), and its answer is the same with or without them (a test holds it to that).

**For a linked device the summary also goes to the group.** An installed iPhone or iPad app keeps a cookie jar of its own (below), so the cookie it gets never reaches Safari's, or any other browser's. Sync goes through this server, so the server can carry it: when the call brings a `hundo_sync` of a device in a group, `summary` also keeps the cookie's text under the group, `sm:<group>:<guide>`, for 400 days from the last one, and `none` for `null`. `none` is kept rather than nothing so that a guide reset on one device reads as reset to the others, not as never reported (which, on hundo.quest, would leave each browser's own, older cookie showing). It is kept only in place of a summary the group already holds (`SET … XX`): a guide's progress joins a group only when a device opens it after linking, so a device that has nothing checked may just be the first of the group to open it, and its "nothing" mustn't pass for a reset of what the others haven't brought yet. The last summary to arrive wins: every device works its summary out again after each sync that changes its progress, so one sent from a device not yet caught up is replaced at the next change. `/api/summaries` gives the group's summaries back to any of its devices, and is the one route hundo.quest itself may call (its side: [home/README.md](../../home/README.md)). A linked guide sends nothing before its page load's first sync has finished, so it never speaks for the group from progress that hasn't caught up (an app just added to the Home Screen starts with Safari's cookies and none of the progress), and then sends once whatever its cookie says, so the group hears from a device whose cookie was already in step, and the copy fills in after the API's deploy at each linked device's next visit.

- **What it costs.** A call with no `hundo_sync`, or one of the wrong shape, makes no store command and keeps nothing, as before. A well-shaped one costs the device's record (one command, which also refuses a cookie that opens nothing), and from a linked device one `SET` more: two. `/api/summaries` costs two, the device's record and one `MGET` of every guide's summary, and writes nothing. Neither has a limit of its own, which would cost commands itself: the firewall's rule for every `/api/` call (120 a minute an address) holds a flood to 240 commands a minute an address, the price of polls. A guide sends a summary after its progress changes, and a linked one once more a page load, a few times a visit at most.
- **The store's failures don't fail the call.** The cookie is the answer: a store that is down or out of quota leaves the group's copy as it was, and still sets the cookie.
- **A pending device** (one showing a code, with no group yet) keeps nothing and reads `{}`, and `/api/summaries` leaves its cookie: unlinking it there would end the pairing it waits on. Any other caller without a device is `401 unlinked`, as everywhere, which clears its sync cookies.
- **A write and a delete in the same instant.** A summary that lands just after the last device left, or after "delete synced progress", leaves its key behind under a group nobody can reach again, until it expires, as a push that lands then leaves a few keys ([Known limits](#known-limits-and-what-isnt-checked-yet)).
- **One guide at a time.** A guide's progress is merged across devices only while that guide is open, so just after two devices link, the group's summary of a guide is the one last sent by whichever device reported it, until a device opens it and syncs.

Why the server and not the guide's script, and what was checked on 20 Nov 2026: a 400-day cookie on a parent domain (hosts under `127.0.0.1.nip.io`), set once by page script and once by a `Set-Cookie` on a `fetch` answer, in each browser fresh with its default settings, the expiry read from the browser's own cookie jar (a throwaway Playwright script):

| Browser | Set by script | Set by the server |
| --- | --- | --- |
| Chrome 158 | 400 days | 400 days |
| Brave 156 | 180 days | 180 days |
| Firefox 157 (Playwright's build) | 400 days | 400 days |
| WebKit 27.2 (Playwright's build) | 400 days | 400 days |

- **Safari: not verified.** WebKit capped a cookie set by `document.cookie` at seven days in 2019, and not one set in a response ([ITP 2.1](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/)). A 2022 change is reported to have lifted that cap and to delete such cookies instead with the site's other script-written data after seven days of Safari use without a visit ([Simo Ahava](https://www.simoahava.com/privacy/first-party-cookies-webkit-revisited/)). By both accounts a cookie a server sets keeps its 400 days. Playwright's WebKit may run without tracking prevention, so its row says nothing about Safari. What would settle it: the same two cookies made in Safari itself, and their expiry read in Web Inspector (Storage, Cookies), or through `safaridriver` once `safaridriver --enable` has been run.
- **Brave** says it keeps a cookie set by script seven days and one set by a server 180 ([Forgetful Browsing](https://brave.com/privacy-updates/25-forgetful-browsing/), and a reply from Brave on [its forum](https://community.brave.com/t/cookie-max-age-too-short/466612)). Brave 156 above kept both 180 days.
- **The address it comes from.** Since Safari 16.4, a cookie set in a response from a server whose address doesn't share the first half of the site's is held to seven days ([WebKit bug 247865](https://bugs.webkit.org/show_bug.cgi?id=247865)). A guide calls its own `/api`, which Vercel answers from the page's own host, so the address is the page's: on 20 Nov 2026 `https://koholint.hundo.quest/` and a POST to its `/api` both answered from 216.150.16.129, with no redirect.
- **Out of the cookie's reach:** an installed iPhone or iPad app keeps a cookie jar of its own, copied from Safari's once when it's added to the home screen ([core.md](../../docs/core.md#syncing-devices): WebKit says so, and a probe on 15 Nov 2026 saw it), so a cookie set in it never reaches hundo.quest in Safari. A linked app's summary still reaches its group (above).

### Revisions

Each guide's data in a group has a revision, a counter that goes up with every write, last of all (nobody who sees the new number can find the data not yet written). A device sends the revision it last saw, and when it is still current the answer is the one line above. The revision in an answer is the one read before the data, so a change another device makes in the middle of a call is found by the next poll, and is the new number only when this call's own write is the only one that landed. A client that sends no `rev` (an older build) is answered in full as before, and one that gets no `rev` back (an older server) never asks the short question. The protocol stays 1: the field is new and optional both ways.

### Merging

`src/ledger.ts` is the model: progress is flattened to keys (`c:<rowId>` ticked or not, `l:<rowId>` for a row set aside, holding the row id the reader had reached or `0` once it's back, `ceiling`, `chapter`, `spoilers`, `x:<path>` for a guide's own extra state), each with a stamp, and the later stamp wins per key. On a tie a fixed order of values decides: a tick over an untick, a higher number over a lower, spoiler protection on, a number over a string (so an `l:` back on the route beats a set-aside). **A new kind of key ships here first**: `parseEntries` refuses a whole push with one key it doesn't know, and a guide retries for ever, so a guide that sent `l:` to an API without it would stall every tick. A guide reads answers leniently and keeps a key of a kind it doesn't know without sending it (`cleanEntries` and `sendable` in its `sync/local.ts`). With `l:`, a guide's data holds at most two keys a row plus its settings and leaves: about 1,400 for Echoes' 663 rows, under the 2,000 allowed. A key's winner is read back from its members. A member never changes, so two devices pushing at once only ever add members and never overwrite each other, and a sync removes the members that have lost, which can't take a later change with it, since a later change is a different member. A guide's data therefore stays about as big as its keys however often they change. Stamps come from a hybrid clock on the device (never behind a change it has seen), and the server refuses any more than a day ahead of its own clock. A sync answers with the state as the server held it plus that device's own push, so a change another device pushes in the same instant arrives with the next sync. `ledger.ts` has no imports, and the guides carry a byte-identical copy at `packages/core/src/sync/ledger.ts` that a test holds equal: change both together.

### Limits

- Pairing: ten codes an hour and ten tries per fifteen minutes from one address (an IPv6 address counts by its /64), and 300 failed tries across everyone per ten minutes.
- Sync: 120 a minute from one device. That holds a runaway client or a stolen cookie to a trickle. It doesn't guard the store (below).
- A request is at most 256 KB and 1,500 entries. A guide's data holds at most 2,000 keys, of which at most 60 are extra-state leaves of at most 256 bytes. A group has at most twelve devices. One not seen for 60 days is removed by itself the next time its group is read, a sync or a look at the list or a join, and has to be linked again: a lost phone that wakes up is unlinked, not let back in. One that calls before anyone has looked is heard first and stays.
- A sync costs six store commands to pull (the device's record, the sync counter and its expiry, the revision, the data and the device list), ten to push a new key and eleven to change one, and two more on any that comes more than a minute after the device was last marked seen. A poll that asks whether anything changed (`rev` given, nothing to send, no touch) costs two: the device's record and the revision. It isn't counted against the per-device limit: that counter is checked only after the data is read, so it never saved the store a command (a call it refused cost six), and the firewall's rate limit is what holds a flood (at its 120 calls a minute for one address, valid quiet calls cost 240 commands a minute, against 600 for the pulls they replace). The client turns a poll into a full sync every ten minutes, which refreshes the device's last-seen and the device count, and when its daily touch is due. A guide left open polls every 20 seconds to 2 minutes ([core.md](../../docs/core.md#syncing-devices)): about 100 commands an hour untouched, so Upstash's free 500,000 commands a month goes to something like a pair of devices in steady use, or many times that many left open and idle.

### Known limits, and what isn't checked yet

- The API takes the visitor's address from `x-real-ip` (or `x-forwarded-for`). The pairing limits rest on it, so if every request arrived with one address, or none, all readers would share them. Behind a guide's rewrite, `x-real-ip`, `x-forwarded-for` and `x-vercel-forwarded-for` held the same address, not a Vercel one (read from the runtime logs on 2026-11-15, on a call from a browser on a guide preview), so the limits count readers apart. The sync limit is per device and doesn't depend on it.
- Anyone can use up the wrong-try cap and so pause pairing for everyone for ten minutes. Devices already linked go on syncing. The cap is also what bounds guessing a six-digit code: with N codes showing, an attacker who keeps the cap used up hits one with a chance of at most 300 × N in a million every ten minutes.
- Nothing in this service can stop a flood of requests from using up the store's commands: each request, even a refused one, costs it at least one, so the limits protect groups and not the quota. The guard for that is a set of rate-limit rules in the Vercel project's firewall, for pairing, for every `/api/` call and for counting ([deploying.md](../../docs/deploying.md#the-sync-api) has them): a request they turn away never reaches the function, so it costs no store command. When the quota runs out, syncing answers 503 and every guide keeps working on its own.
- A guide's extra state keeps every path it has ever used, since a path can't be removed, so over its whole life it may use at most 60 distinct ones.
- Any device of a group can remove any other (`/api/remove`), as it could unlink itself or delete the whole group: the removed one is unlinked the next time it connects, and its own progress stays on it. So a stolen cookie can unlink every legitimate device and stay in, with the group's data: whoever presses Remove first wins, and the owners can evict a thief the same way. The call has no limit of its own beyond twelve devices a group and the firewall's.
- Removing a device is checked against the device's own record, but between that check and the delete there is one store round trip, in which a device that moves to another group at that instant would be unlinked there. A device removed in the middle of its own sync writes itself back into the list, with no record: its next call is unlinked, and a Remove on that row tidies it.
- A group's data can be deleted (the last device leaves) and made again, and a guide's revision then starts over at 0. A device that held an old revision for that group and happens to hold exactly the new one would be told "unchanged" until its next full sync, at most ten minutes. Each device's revision is only used within one group's ledger, and linking again starts a ledger afresh, so it takes a stale device to hit it.
- A device's last-seen is refreshed by full syncs only, so the list can show a device that is polling as last seen up to about twelve minutes ago.
- Two devices joining a full group in the same instant can take it past twelve.
- If the last device of a group leaves in the same instant that another joins, the group's data on the server can be lost. The devices keep theirs.
- A push or a summary that lands just after "delete synced progress" can leave a few keys behind. They expire like the rest.
- Two devices changing one counter, such as Koholint's death count, at the same moment keep the later value and not the sum.

## Run it

```bash
pnpm -C services/sync dev
```

serves it on `http://127.0.0.1:8787` with an in-memory store that is lost on restart (`PORT` changes the port). In the browser pane that is `preview_start` with `sync-api`.

```bash
pnpm -C services/sync test
```

runs the model's tests, the API tests on an in-memory store with a fake clock, and `project.test.ts`, which holds the folder to what Vercel needs: one thin function per route in `api/`, imports only from this folder and Node, and the `vercel.json` and ignore script. With `SYNC_TEST_REDIS_URL` and `SYNC_TEST_REDIS_TOKEN` set to a **test** database, the store contract in `src/store.test.ts` also runs against real Upstash, to prove it answers the commands the same way as the in-memory store.

## Adding a guide

Add its `brand.id` to `GUIDES` in `src/app.ts`. `project.test.ts` fails until every app's id is in the list.
