import { BuildWords, WhoSaysTrigger } from "@hundo/core/components/BuildMark";
import { WhoSays } from "@hundo/core/components/WhoSays";
import { chapters, type Leads } from "@hundo/core/guide";
import type { BuildNote, BuildTask } from "@hundo/core/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

// A build's words under a row, on the rail of the guide's colour. The stories' guide has no builds, so its row carries made-up words and
// names: what's drawn is the look, in every guide's palette and theme, which axe checks.
const row = chapters[0].groups[0].rows[0];
const note: BuildNote = {
  row: row.id,
  for: ["story"],
  text: "Take your weapon to +5 here, while your spells are few: it does most of the early fighting until they grow. The ring can wait until 18 Faith.",
};
const task: BuildTask = {
  row: row.id,
  serves: ["story"],
  title: "Buy the first spells",
  text: "She sells two for 1,000 souls each, and a third once the bell has rung.",
  sources: ["https://example.com/"],
};
const leads: Leads = { note: () => "Paladin", steps: "Intelligence and Faith" };
const words = { row, picked: [] as string[], notes: [note], tasks: [] as BuildTask[], warnings: [] as string[] };

const meta = {
  title: "Core/BuildNote",
  component: BuildWords,
  args: { ...words, at: "prose", leads },
} satisfies Meta<typeof BuildWords>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Under a prose row: the row's words, then the build's on its rail, one size down, led by the build's name in small capitals. */
export const InProse: Story = {
  render: (args) => (
    <p style={{ maxWidth: 620, lineHeight: 1.8 }}>
      <strong>{row.title}.</strong> {row.text}
      <BuildWords {...args} />
    </p>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/^Take your weapon/)).toBeVisible();
    await expect(canvas.getByText("Paladin", { exact: false })).toBeVisible();
  },
};

/** A pick that reads steps (a custom one, or a build without notes yet): its leanings' steps, titled, on the same rail. */
export const Steps: Story = {
  args: { notes: [], tasks: [task], leads },
  render: (args) => (
    <p style={{ maxWidth: 620, lineHeight: 1.8 }}>
      <strong>{row.title}.</strong> {row.text}
      <BuildWords {...args} />
    </p>
  ),
};

/** A step's deadline after the note, in bold: what is lost if it waits. */
export const WithDeadline: Story = {
  args: { warnings: ["Buy every spell he sells: his catalyst turns up only if you do."] },
  render: InProse.render,
};

/**
 * Who says so after the note, and its popover open: who recommends the pick under it, by name, never linked. Axe checks the whole page,
 * the popup in its portal included, but not the focus guards Base UI puts beside the trigger of an open popover: empty spans hidden from
 * assistive tech whose only job is to hand the focus on (aria-hidden-focus reads them as focusable content).
 */
export const WhoSaysOpen: Story = {
  parameters: { a11y: { context: { exclude: ["[data-base-ui-focus-guard]"] } } },
  render: (args) => (
    <>
      <p style={{ maxWidth: 620, lineHeight: 1.8 }}>
        <strong>{row.title}.</strong> {row.text}
        <span style={{ display: "block" }}>
          {note.text} <WhoSaysTrigger lines={[{ item: "Homeward", by: ["Fextralife", "Steam"] }]} of={`for your Paladin, on “${args.row.title}”`} />
        </span>
      </p>
      <WhoSays />
    </>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: /^Who says so/ }));
    const popup = await within(canvasElement.ownerDocument.body).findByRole("dialog", { name: "Who says so" });
    await expect(popup).toHaveTextContent("Homeward: recommended by Fextralife and Steam.");
  },
};

/** In the Progress page's plan, under the row's title: the panel is the build's already, so no name leads it. */
export const InPlan: Story = {
  args: { at: "plan", leads: undefined },
  render: (args) => (
    <div style={{ maxWidth: 520, display: "grid", lineHeight: 1.3 }}>
      <strong style={{ fontSize: 15 }}>{row.title}</strong>
      <BuildWords {...args} />
    </div>
  ),
};

/** In a checklist row's column of text, in the row's own size and tint. */
export const InColumn: Story = {
  args: { at: "column" },
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <strong>{row.title}</strong>
      <p style={{ margin: "4px 0 0" }}>{row.text}</p>
      <BuildWords {...args} />
    </div>
  ),
};
