import type { RawChapter } from "@hundo/core/types";

export default {
  id: 12,
  title: "The Kiln and the First Ending",
  region: "Firelink Altar · Kiln of the First Flame",
  teaser: "Late game",
  intro: "Finish anything you want in this cycle before entering the final arena. The ending starts your next cycle automatically.",
  sources: [["Kiln route and Black Knight variants", "https://darksouls.wikidot.com/kiln-of-the-first-flame"], ["Cycle reset and carryover", "https://darksouls.wikidot.com/new-game-plus"], ["Ending achievements", "https://steamcommunity.com/achievements/570940"]],
  groups: [
    {
      title: "Before entering the final arena",
      location: "Firelink Altar · Kiln of the First Flame",
      sources: [["Gwyn’s fight, Solaire’s sign and the next-cycle warning", "https://darksouls.wikidot.com/gwyn-lord-of-cinder"], ["Black Knight drop rates", "https://darksouls.wikidot.com/black-knight"], ["Solaire’s summons need human form", "https://darksouls.wikidot.com/solaire-of-astora"], ["Dark Lord ending achievement", "https://darksouls.wikidot.com/achievements"], ["What Gwyn’s soul can become", "https://darksouls.wikidot.com/soul-of-gwyn-lord-of-cinder"], ["The Firelink Altar and the Lordvessel", "https://darksouls.wikidot.com/kingseeker-frampt"], ["Master Key: Domhnall’s price, kept in NG+", "https://darksouls.wikidot.com/master-key"], ["NG+ starts at the Asylum, without the Lordvessel or most keys", "https://darksouls.wiki.fextralife.com/New+Game+Plus"], ["Shards from Seath and the Four Kings, Lord Souls from Nito and the Bed of Chaos", "https://darksouls.wikidot.com/lordvessel"], ["The altar’s stone door to the Kiln, and the vessel as its bonfire", "https://darksouls.wikidot.com/firelink-altar"], ["The Offer souls option, and the placed vessel as a bonfire", "https://darksouls.wiki.fextralife.com/Lordvessel"]],
      rows: [
        ["route-ng-ready", ["route"], "Finish the first-run NPC checklist before fighting Gwyn", "Killing Gwyn sends you straight into NG+, so close out this cycle first: the NPC stories, covenant spells, DLC and upgrades from the earlier chapters. NG+ starts back at the Asylum and takes your Embers, so do any ascending now. It takes every key but the Master Key too, the Crest of Artorias with them: if you lack the Master Key, buy it from Domhnall at Firelink for 5,000 souls. Keep the boss souls you’re saving for later recipes."],
        ["route-kiln-door", ["route"], "Open the Kiln of the First Flame", "You can’t warp to the Firelink Altar: talk to Frampt and let him carry you down again. Choose the Lordvessel’s Offer souls option to place what the four left you, a Bequeathed Lord Soul Shard each from Seath and the Four Kings and a Lord Soul each from Nito and the Bed of Chaos, and the stone gates beside the altar open onto the Kiln. The Kiln has no bonfire before Gwyn: the placed Lordvessel, which serves as the altar’s bonfire, is the nearest. Farm any gear you still need there before you go through Gwyn’s fog.", {"requires": ["boss-seath", "boss-kings", "boss-nito", "boss-bed-of-chaos"]}],
        ["forge-kiln-farm", ["route"], "Farm the Kiln Black Knights for equipment and chunks", "Five Black Knights guard the way down, and unlike the others in the game these respawn. Each always drops a chunk: plain Titanite from the two sword knights, red from the greatsword knight, white from the greataxe knight, blue from the halberd knight. Their weapons are a one-in-five drop, and only from the knight carrying that weapon. On the interlocking bridges just before the third knight, the Black Knight Set lies behind the pillar on the right as you face him: turn onto the right-hand beam, hugging the pillar."],
        ["boss-gwyn", ["boss"], "Defeat Gwyn, Lord of Cinder", "While human, look for Solaire’s sign on your left after the third Black Knight (the straight sword one), just before the stairs down. It’s there only if you killed the red-eyed Chaos Bug in chapter 9 and then talked to him in the shortcut area, and he’s still alive. Gwyn can’t leap or lunge through the pillars, so put one between you to heal. Everything but his grab can be parried; otherwise block, stay clear of the grab and hit him after a missed kick or grab.", {"reference": "https://darksouls.wikidot.com/kiln-of-the-first-flame"}],
        ["ending-dark-lord", ["ending"], "Leave the Kiln for the Dark Lord ending", "After defeating Gwyn, a bonfire sits in his arena: walk back out through the fog gate without lighting it. You needn’t be a Darkwraith: only this last choice decides the ending. It sends you into NG+. Save Gwyn’s soul for Sunlight Spear.", {"reference": "https://darksouls.wikidot.com/kiln-of-the-first-flame"}],
      ],
    },
  ],
} satisfies RawChapter;
