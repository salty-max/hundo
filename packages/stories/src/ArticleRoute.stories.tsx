import { ArticleRoute } from "@hundo/core/components/ArticleRoute";
import { chapters } from "@hundo/core/guide";
import { defaultState } from "@hundo/core/progress-state";
import { useProgress } from "@hundo/core/store/progress";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { expect } from "storybook/test";

// A chapter as prose: a section per group, each step's opening words its checkbox, the list of sections beside it (folded above it when
// the route is narrower than 52rem, whatever the screen). The second group is shown as a compact list, whose text lines up under each step's words, not its box.
const chapter = { ...chapters[0], groups: [chapters[0].groups[0], { ...chapters[0].groups[1], compact: true }] };
const linked = chapter.groups[0].rows[1];

const meta = {
  title: "Core/ArticleRoute",
  component: ArticleRoute,
  args: { chapter, footer: null },
  decorators: [
    (Story, { parameters }) => {
      useProgress.setState({ data: { ...defaultState(), ...(parameters.save ?? {}) } });
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
} satisfies Meta<typeof ArticleRoute>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A section in prose and a compact one. */
export const ProseAndList: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("article")).toBeVisible();
  },
};

/** A step reached by a link: it stands out, with the accent's bar at its start. */
export const LinkedStep: Story = { args: { target: `entry-${linked.id}` } };

const asideProse = chapter.groups[0].rows[0];
const asideListed = chapter.groups[1].rows[0];
/** A step set aside in prose and one in the compact list: each carries a Set aside tag that puts it back, and when it comes back. */
export const SetAside: Story = {
  parameters: { save: { later: { [asideProse.id]: asideProse.id, [asideListed.id]: asideListed.id } } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: `Set aside. Put “${asideProse.title}” back on the route` })).toBeVisible();
    await expect(canvas.getByRole("button", { name: `Set aside. Put “${asideListed.title}” back on the route` })).toBeVisible();
  },
};

// The grid ArticleRoute draws its parts in, with its column tracks and the gap between them as the browser worked them out.
function layout(article: HTMLElement) {
  const grid = article.parentElement!;
  const style = getComputedStyle(grid);
  const tracks = style.gridTemplateColumns.split(" ").map(parseFloat);
  return { grid, tracks, gap: parseFloat(style.columnGap) };
}

const inWidth = (width: number): Story["decorators"] => [
  (Story) => (
    <div style={{ width }}>
      <Story />
    </div>
  ),
];

/** The article fills its column, whatever the guide's font: no `ch` or other cap on the card, the text in it, the column or the grid, so on a wide page it always meets the contents beside it. */
export const FillsItsColumn: Story = {
  decorators: inWidth(1500),
  play: async ({ canvas }) => {
    const article = canvas.getByRole("article");
    const { grid, tracks, gap } = layout(article);
    // The contents beside the article, which takes a route at least 52rem wide (1500px here): one track would be the folded layout.
    await expect(tracks).toHaveLength(2);
    await expect(article.getBoundingClientRect().width).toBeCloseTo(tracks[0], 1);
    await expect(article.querySelector("section")!.getBoundingClientRect().width).toBeCloseTo(tracks[0], 1);
    await expect(tracks.reduce((sum, track) => sum + track, 0) + gap * (tracks.length - 1)).toBeCloseTo(grid.getBoundingClientRect().width, 1);
    await expect(grid.getBoundingClientRect().width).toBeCloseTo(grid.parentElement!.getBoundingClientRect().width, 1);

    // The text fills the card too: a step's paragraph and a compact row's text are as wide as the card's inside.
    const section = article.querySelector("section")!;
    const padding = getComputedStyle(section);
    const inside = section.clientWidth - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight);
    const step = article.querySelector(`#entry-${chapter.groups[0].rows[0].id}`)!;
    const row = chapter.groups[1].rows.find((candidate) => candidate.text)!;
    const text = article.querySelector(`#entry-${row.id}`)!.lastElementChild!;
    await expect(step.getBoundingClientRect().width).toBeCloseTo(inside, 1);
    await expect(text.getBoundingClientRect().width).toBeCloseTo(inside, 1);
  },
};

/**
 * Folded above the article in a route under 52rem, the contents box and the article are one column wide, however wide that is (a column
 * wider than a cap would show it). The fold follows the route's own width: 780px on the story's wide screen folds it all the same.
 */
export const FoldedFillsItsColumn: Story = {
  decorators: inWidth(780),
  play: async ({ canvas }) => {
    const article = canvas.getByRole("article");
    const { tracks } = layout(article);
    const contents = canvas.getByRole("button", { name: /In this chapter/ }).parentElement!;
    await expect(tracks).toHaveLength(1);
    await expect(article.getBoundingClientRect().width).toBeCloseTo(tracks[0], 1);
    await expect(contents.getBoundingClientRect().width).toBeCloseTo(tracks[0], 1);
  },
};

const sectionMap: [string, string] = ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-echoes-of-wisdom-all-might-crystal-locations#lake-hylia-4-might-crystals"];
const stepMap: [string, string] = ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations"];
const [prose, list] = chapter.groups;

/** Maps: a section's under its title, named by its site; a step's after its text in prose, and after its badges in a list. */
export const WithMaps: Story = {
  args: {
    chapter: {
      ...chapter,
      groups: [
        { ...prose, map: sectionMap, rows: [{ ...prose.rows[0], map: stepMap }, ...prose.rows.slice(1)] },
        { ...list, rows: [{ ...list.rows[0], map: stepMap }, ...list.rows.slice(1)] },
      ],
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: `Map on Nintendo Life for ${prose.title} (opens in a new tab)` })).toHaveAttribute("href", sectionMap[1]);
    await expect(canvas.getByRole("link", { name: `Map for ${prose.rows[0].title} on Nintendo Life (opens in a new tab)` })).toHaveTextContent("Map");
    await expect(canvas.getByRole("link", { name: `Map for ${list.rows[0].title} on Nintendo Life (opens in a new tab)` })).toBeVisible();
  },
};
