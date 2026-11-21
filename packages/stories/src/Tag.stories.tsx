import { chapters, cats } from "@hundo/core/guide";
import { Quantity, Tag } from "@hundo/core/components/ui";
import type { Tone } from "@hundo/core/types";
import type { Meta, StoryObj } from "@storybook/react-vite";

// A category's label in its tone, as the rows, the article and the checklist show it.
const row = { ...chapters[0].groups[0].rows[0], quantity: 3 };
// A build pick's labels, as BuildMark.tsx tones them.
const roles: [string, Tone][] = [
  ["Starter", "mint"],
  ["Upgrade", "sky"],
  ["Endgame", "violet"],
  ["Core", "clay"],
  ["Rare drop", "amber"],
];

const meta = {
  title: "Core/Tag",
  component: Tag,
  args: { tag: "heart" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One label. */
export const One: Story = {};

/**
 * Every category of the guide, each in its tone (a category with none takes the soft primary), then Missable and a quantity, then a build
 * pick's role, Core and Rare drop in theirs. The pick tags and Missable (rose) together draw every tone, whatever the guide's categories use,
 * so axe checks each in every look.
 */
export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {Object.keys(cats).map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
      <Tag tag="missable" />
      <Quantity row={row} />
      {roles.map(([word, tone]) => (
        <Tag key={word} tag="role" tone={tone}>
          {word}
        </Tag>
      ))}
    </div>
  ),
};

/** In prose: raised a little, level with the words around it. */
export const InProse: Story = {
  render: () => (
    <p style={{ maxWidth: 520, lineHeight: 1.8 }}>
      <strong>Open the chest by the river.</strong> <Quantity row={row} at="prose" /> <Tag tag="missable" at="prose" /> It closes for good once
      you leave the area, so take it on the way in.
    </p>
  ),
};

/** The column of tags at the end of a checklist row, where on a phone a long label wraps under itself. */
export const InColumn: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, width: 120 }}>
      <Tag tag="challenge" at="column" />
      <Tag tag="missable" at="column" />
    </div>
  ),
};
