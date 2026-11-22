import { Handoff } from "@hundo/core/components/Handoff";
import { chapterRows, chapters } from "@hundo/core/guide";
import { defaultState } from "@hundo/core/progress-state";
import { useProgress } from "@hundo/core/store/progress";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { expect, within } from "storybook/test";

// "Before you leave chapter N", at a chapter's end above its navigation: whether it's safe to continue, apart from whether everything is
// collected, then what can be lost, what's still open, set aside and waiting. The stories' guide has no requirements, so Waiting and
// Needed later don't show here; their rows are TickItems like the others, and the Needs line is a LineChip-styled link.
const chapter = chapters[0];
const [first, second] = chapterRows(chapter);

const meta = {
  title: "Core/Handoff",
  component: Handoff,
  args: { chapter },
  decorators: [
    (Story, { parameters }) => {
      useProgress.setState({ data: { ...defaultState(), ...(parameters.save ?? {}) } });
      return (
        <MemoryRouter>
          <div style={{ maxWidth: 760 }}>
            <Story />
          </div>
        </MemoryRouter>
      );
    },
  ],
} satisfies Meta<typeof Handoff>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing ticked yet: the verdict, then what's still open, each with Later, and the way to the rest. */
export const Open: Story = {
  play: async ({ canvas }) => {
    const card = canvas.getByRole("region", { name: `Before you leave chapter ${chapter.id}` });
    await expect(within(card).getByRole("region", { name: "Still open here" })).toBeVisible();
  },
};

/** Two steps set aside: listed for a return, with when each comes back and Back on route. */
export const SetAside: Story = {
  parameters: { save: { later: { [first.id]: first.id, [second.id]: second.id } } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: `Back on route: ${first.title}` })).toBeVisible();
  },
};

/** Everything in the chapter ticked: safe, and collected. */
export const Done: Story = {
  parameters: { save: { checks: Object.fromEntries(chapterRows(chapter).map((row) => [row.id, true as const])) } },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Everything here is collected.")).toBeVisible();
  },
};
