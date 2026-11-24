import type { RawChapter } from "@hundo/core/types";

export default {
  id: 10,
  title: "Through the Abyss",
  region: "Ruined Chapel · Bellways · Deep Docks · The Abyss",
  teaser: "Ruined Chapel",
  intro: "Find the Snail Shamans in the Ruined Chapel, win back the Bellways and ride the diving bell into the Abyss. Climb out with Silk Soar, then take it to the high places you couldn't reach before.",
  sources: [["Act 3 objectives and their order", "https://hollowknight.wiki/w/Acts"], ["Act 3 route: the Cradle, Moss Grotto, the boss before the Bell Beast, the Abyss", "https://www.nintendolife.com/guides/hollow-knight-silksong-progression-guide-recommended-route"], ["The Abyss: the one-way bell, Weavenest Absolom", "https://hollowknight.wiki/w/The_Abyss_(Silksong)"], ["Silk Soar: where and how", "https://hollowknight.wiki/w/Silk_Soar"], ["Farsight: where it is and what it shows", "https://hollowknight.wiki/w/Farsight"]],
  groups: [
    {
      title: "A changed Pharloom and the diving bell",
      location: "The Cradle · Moss Grotto · Bellways · Deep Docks",
      sources: [["Escaping the ruined Cradle", "https://hollowknight.wiki/w/The_Cradle"], ["The Ruined Chapel's Act 3 room", "https://hollowknight.wiki/w/Moss_Grotto"], ["Snail Shamans: Awaiting the End, The Dark Below", "https://hollowknight.wiki/w/Snail_Shamans_(Silksong)"], ["Bell Eater fight", "https://hollowknight.wiki/w/Bell_Eater"], ["Diving bell and its key", "https://hollowknight.wiki/w/Diving_Bell"], ["Ballow", "https://hollowknight.wiki/w/Ballow"]],
      rows: [
        ["wish-ruined-chapel", ["route"], "Meet the Snail Shamans at the Ruined Chapel", "You start in the wrecked Cradle with only the Hunter Crest and Silkspear: escape it, and you come out in Songclave. Make for the Ruined Chapel in Moss Grotto, beside Bone Bottom, where the Caretaker and his family now hide as the Snail Shamans in a room that was shut before. Speak to them and they send you to Deep Docks, where a way down beneath Pharloom still exists.", {"reference": "https://hollowknight.wiki/w/Snail_Shamans_(Silksong)"}],
        ["boss-bell-eater", ["boss"], "Defeat Bell Eater to restore the Bellways", "The first time you call at a Bellway, a huge centipede bursts out in place of the Bell Beast, and every other station stays dead until it's beaten. Follow it down its hole into the tunnels. Its grey plates shrug off your needle: hit the soft beige rear or the red head whenever either pokes out. When it falls the Bell Beast returns to finish it, and her young teach you the Beastling Call.", {"reference": "https://hollowknight.wiki/w/Bell_Eater"}],
        ["route-diving-bell", ["route"], "Get Ballow's key and ride the diving bell", "In Deep Docks, talk to Ballow, shovelling beside the Forge Daughter's shop. He goes down to the old diving bell at the base of the docks, in the part that opened when you beat the Forebrothers: climb through the open floor gate at the top right of the bell's room to his control panel and talk again for the Diving Bell Key. Get ready before you climb in, because the first trip is one-way: the bell's shield breaks on the way down and it can't bring you back up.", {"reference": "https://hollowknight.wiki/w/Diving_Bell"}],
      ],
    },
    {
      title: "Weavenest Absolom and the escape",
      location: "The Abyss",
      sources: [["Weavenest Absolom and the way out", "https://hollowknight.wiki/w/The_Abyss_(Silksong)"], ["Lace's projection by the Void sea", "https://hollowknight.wiki/w/Lace"], ["Elegy of the Deep", "https://hollowknight.wiki/w/Elegy_of_the_Deep"], ["The Shamans teach the Elegy and send you for the hearts", "https://hollowknight.wiki/w/Snail_Shamans_(Silksong)"]],
      rows: [
        ["ability-silk-soar", ["ability"], "Learn Silk Soar inside Weavenest Absolom", "In the Abyss's lower east, cross the lake of Void tendrils and the platforming past it to Weavenest Absolom, and play the Needolin to open its door. Silk Soar waits in the Weaver spire at the very bottom. Hold Down and Harpoon to charge it, then let go: Hornet flings her needle at the nearest ceiling and flies up after it, for one strand of Silk. The broken Weaver lifts you pass show where it takes you up.", {"reference": "https://hollowknight.wiki/w/Silk_Soar"}],
        ["pickup-farsight", ["pickup"], "Take the Farsight from the upper east Absolom passage", "Before you climb out, search the Weavenest's upper eastern passage for the Farsight, a folded-up Weaver instrument. If you miss it, it keeps: Ballow later reinforces the bell so you can ride down and back up whenever you like.", {"reference": "https://hollowknight.wiki/w/Farsight"}],
        ["route-abyss-escape", ["route"], "Escape to Deep Docks with Silk Soar", "Once you've met Lace's projection on the shore of the Void sea and learnt Silk Soar, climb out of the Abyss, flying up wherever a broken lift marks the way, until you're back in Deep Docks. Go back to the Snail Shamans at the Ruined Chapel. They teach you the Elegy of the Deep, played by holding Down with the Needolin to step into old memories, and send you after Pharloom's old hearts.", {"reference": "https://hollowknight.wiki/w/Elegy_of_the_Deep"}],
        ["route-farsight-bellhome", ["route"], "Build the Farsight in the Bellhome", "Take the Farsight to your Bellhome in Bellhart and assemble it there. From then on the game shows its own completion percentage in your inventory and on your save file, and the Tools, Silk Skills, Journal entries and Materium entries you still lack appear as small grey circles.", {"reference": "https://hollowknight.wiki/w/Farsight"}],
      ],
    },
    {
      title: "Silk Soar revisits",
      location: "Ruined Chapel · Weavenest Atla · Far Fields · Wormways",
      compact: true,
      sources: [["Shaman Crest", "https://hollowknight.wiki/w/Shaman_Crest"], ["Eva's thresholds", "https://hollowknight.wiki/w/Eva"], ["Sylphsong", "https://hollowknight.wiki/w/Sylphsong"], ["The target room and the Skarr scout", "https://hollowknight.wiki/w/Unnamed_Skarr"], ["Curveclaw's point while the scout has it", "https://hollowknight.wiki/w/Completion_(Silksong)"], ["Advanced Alchemy", "https://hollowknight.wiki/w/Advanced_Alchemy"], ["Plasmified Zango", "https://hollowknight.wiki/w/Plasmified_Zango"]],
      rows: [
        ["crest-shaman", ["crest"], "Bind the Shaman Crest above the Ruined Chapel", "In the Shamans' new room, to the right of where they sit, a gap in the ceiling is out of reach without Silk Soar. Fly up, smash the breakable walls along the hidden passage, and claim the great snail shell at its end, one of the Shamans' ancestors, to bind the Crest. It lets you equip several Silk Skills at once and strengthens them.", {"reference": "https://hollowknight.wiki/w/Moss_Grotto"}],
        ["wish-eva-vesticrest", ["pickup"], "Upgrade the Vesticrest with Eva", "Eva in Weavenest Atla counts the slots unlocked on every Crest except the Hunter Crest, whether a Crest came with them or a Memory Locket opened them. At 12 she grants the Vesticrest, an extra yellow slot whatever Crest you wear; at 20 it gains a blue slot; at 27 she upgrades the Hunter Crest a second time. None of this needs Silk Soar, so visit her whenever you reach a count. She won't let you near while you're plasmified or cursed.", {"reference": "https://hollowknight.wiki/w/Eva"}],
        ["ability-sylphsong", ["ability"], "Bind Eva in Weavenest Atla to learn Sylphsong", "At 32 unlocked slots across your Crests other than the Hunter, counting those a Crest starts with and those opened by Memory Lockets, Eva asks you to bind her. Accept and she becomes Sylphsong, which refills your Silk while you rest at a bench. If you're short, the Shaman Crest's slots count, and so does every slot a spare Memory Locket opens once you spend it.", {"reference": "https://hollowknight.wiki/w/Sylphsong"}],
        ["challenge-curvesickle", ["challenge"], "Clear the Far Fields Curveclaw target room", "The Skarr target room sits above the Far Fields Bellway. Go in with the Curveclaw equipped. Hit every target with a single throw and a friendly Skarr scout pops up and takes your Curveclaw: until you get it back, it no longer counts toward your percentage. Rest at any bench, come back, and pick the Curvesickle up off the floor to restore the point.", {"reference": "https://hollowknight.wiki/w/Completion_(Silksong)"}],
        ["wish-advanced-alchemy", ["wish"], "Continue Zylotol's Advanced Alchemy in Act 3", "With the Wormways now overrun by Plasmium, and Alchemist's Assistant behind you, talk to Alchemist Zylotol again. He hands back the Needle Phial: charge it fully and stab plasmified creatures such as Plasmids and Plasmidases to draw out 10 samples of Plasmified Blood. Bring them to him for the Plasmium Gland, which refills your Plasmium Phial at any bench.", {"reference": "https://hollowknight.wiki/w/Advanced_Alchemy"}],
        ["boss-plasmified-zango", ["boss"], "Defeat Plasmified Zango in the western Wormways", "Zango's corpse in a secret room of the western Wormways has risen, plasmified, now that the Plasmium has spread. He heals whenever you stop hurting him, so keep the pressure on; the room doesn't lock, so you can leave and come back. Each Plasmified Blood you draw from him with the Needle Phial cuts his health for good, and four draws kill him.", {"reference": "https://hollowknight.wiki/w/Plasmified_Zango"}],
      ],
    },
    {
      title: "Collectibles and unlocks · Brightvein",
      location: "Brightvein",
      compact: true,
      map: ["Pharloom Calculator", "https://pharloomcalculator.com/map/"],
      rows: [
        ["mask-shard-20", ["mask-shard"], "Mask Shard · Brightvein", "From Mount Fay's south-eastern bench, head south and then west. In the room west of the big chasm, Silk Soar from the rock floating in the icy water up into Brightvein, then bounce off the Mnemonords along its platforming run to the shard.", {"reference": "https://hollowknight.wiki/w/Mount_Fay", "map": ["Map Genie", "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479460"]}],
      ],
    },
    {
      title: "Collectibles and unlocks · Bellhart",
      location: "Bellhart",
      compact: true,
      map: ["Pharloom Calculator", "https://pharloomcalculator.com/map/"],
      rows: [
        ["memory-locket-bellhart-2", ["memory-locket"], "Memory Locket · Bellhart (#2)", "This locket sits above your Bellhome at the top of Bellhart.", {"reference": "https://hollowknight.wiki/w/Memory_Locket", "map": ["Map Genie", "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478212"]}],
      ],
    },
    {
      title: "Collectibles and unlocks · Whiteward",
      location: "Whiteward",
      compact: true,
      map: ["Pharloom Calculator", "https://pharloomcalculator.com/map/"],
      rows: [
        ["relic-choral-commandment-whiteward-2", ["relic"], "Choral Commandment · Whiteward (#2)", "A second Commandment lies among the corpses on the right side of a Whiteward room, behind a breakable wall that hides the way in. Silk Soar gets you up to it; a precise jump with the Faydown Cloak can too.", {"reference": "https://hollowknight.wiki/w/Choral_Commandment", "map": ["Map Genie", "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478919"]}],
      ],
    },
    {
      title: "Collectibles and unlocks · High Halls",
      location: "High Halls",
      compact: true,
      map: ["Pharloom Calculator", "https://pharloomcalculator.com/map/"],
      rows: [
        ["relic-rune-harp-high-halls", ["relic"], "Rune Harp · High Halls", "Go back through the High Halls to the bedchamber where Conductor Ballador lay. The Rune Harp is on the left side of the room now; it's only there from this point in the story.", {"reference": "https://hollowknight.wiki/w/Rune_Harp", "map": ["Map Genie", "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479495"]}],
      ],
    },
    {
      title: "Collectibles and unlocks · The Abyss",
      location: "The Abyss",
      compact: true,
      map: ["Pharloom Calculator", "https://pharloomcalculator.com/map/"],
      rows: [
        ["relic-arcane-egg", ["relic"], "Arcane Egg", "In the Abyss, take the room you enter from the west and follow it to its dead end for the Arcane Egg, a black stone relic older than Pharloom.", {"reference": "https://hollowknight.wiki/w/Arcane_Egg_(Silksong)", "map": ["Map Genie", "https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479281"]}],
        ["map-the-abyss", ["map"], "Get the Abyss map", "The Abyss's map is a rune tablet you read down there. If you leave without it, the reinforced bell can take you back later.", {"reference": "https://hollowknight.wiki/w/Map_and_Quill_(Silksong)#Maps"}],
      ],
    },
  ],
} satisfies RawChapter;
