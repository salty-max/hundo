import { CardRadioGroup } from "@hundo/core/components/controls";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { expect, userEvent } from "storybook/test";

// Lordran's named builds, as the build dialog shows them (the stories' guide has no builds of its own).
const builds: ComponentProps<typeof CardRadioGroup>["choices"] = [
  { value: "quality", title: "Quality", text: "Strength and Dexterity together: weapons that grow with both.", chips: ["Strength", "Dexterity"] },
  { value: "strength", title: "Pure Strength", text: "Heavy weapons that hit hard and grow with Strength.", note: "Starts as a Bandit or a Warrior", chips: ["Strength"] },
  { value: "sorcerer", title: "Sorcerer", text: "Sorceries from a catalyst, growing with Intelligence.", note: "Starts as a Sorcerer", chips: ["Intelligence"] },
  { value: "magic-knight", title: "Magic Knight", text: "A Dexterity blade beside sorceries: buffs, and weapons that grow with Intelligence.", chips: ["Dexterity", "Intelligence"] },
  { value: "pyromancer", title: "Pyromancer", text: "Fire from a flame you upgrade with souls. No casting stat.", note: "Starts as a Pyromancer, with the Hand Axe", chips: ["Pyromancy"] },
];

/** Holds the value, as the dialog does. */
function Holder(args: ComponentProps<typeof CardRadioGroup>) {
  const [value, setValue] = useState(args.value);
  return <CardRadioGroup {...args} value={value} onChange={setValue} />;
}

const meta = {
  title: "Core/CardRadioGroup",
  component: CardRadioGroup,
  args: { label: "Builds", choices: builds, value: "pyromancer", onChange: () => {} },
  render: (args) => <Holder {...args} />,
  decorators: [(Story) => <div style={{ maxWidth: 680 }}><Story /></div>],
} satisfies Meta<typeof CardRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoneChosen: Story = { args: { value: "" } };

/** Each card's radio is named by its title alone, described by its line, note and chips, and the group named by its label. */
export const Named: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radiogroup", { name: "Builds" })).toBeVisible();
    await expect(canvas.getAllByRole("radio")).toHaveLength(builds.length);
    await expect(canvas.getByRole("radio", { name: "Pyromancer" })).toBeChecked();
    await expect(canvas.getByRole("radio", { name: "Quality" })).not.toBeChecked();
    await expect(canvas.getByRole("radio", { name: "Pyromancer" })).toHaveAccessibleDescription(/Starts as a Pyromancer, with the Hand Axe/);
  },
};

/** The whole card is the target, and the arrow keys move between cards. */
export const Choosing: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Heavy weapons that hit hard and grow with Strength."));
    await expect(canvas.getByRole("radio", { name: "Pure Strength" })).toBeChecked();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("radio", { name: "Sorcerer" })).toBeChecked();
  },
};
