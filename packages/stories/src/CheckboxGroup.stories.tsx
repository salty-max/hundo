import { CheckboxGroup } from "@hundo/core/components/controls";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { expect, userEvent } from "storybook/test";

// Lordran's leanings, as the build dialog's Pick stats yourself shows them (the stories' guide has no builds of its own).
const leanings: [string, string][] = [
  ["str", "Strength"],
  ["dex", "Dexterity"],
  ["int", "Intelligence"],
  ["fth", "Faith"],
  ["pyro", "Pyromancy"],
];

/** Holds the value, as a form does. */
function Holder(args: ComponentProps<typeof CheckboxGroup>) {
  const [value, setValue] = useState(args.value);
  return <CheckboxGroup {...args} value={value} onChange={setValue} />;
}

const meta = {
  title: "Core/CheckboxGroup",
  component: CheckboxGroup,
  args: { label: "Stats", choices: leanings, value: ["dex", "fth"], onChange: () => {} },
  render: (args) => <Holder {...args} />,
  decorators: [(Story) => <div style={{ maxWidth: 460 }}><Story /></div>],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoneTicked: Story = { args: { value: [] } };

/** The group is named by its legend, and each box by its words. */
export const Named: Story = {
  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", { name: "Stats" });
    await expect(group).toBeVisible();
    await expect(canvas.getAllByRole("checkbox")).toHaveLength(leanings.length);
    await expect(canvas.getByRole("checkbox", { name: "Dexterity" })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Strength" })).not.toBeChecked();
  },
};

/** Each box takes Tab and Space on its own, and clicking the words ticks it: the whole 44px line is the target. */
export const Keyboard: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();
    const strength = canvas.getByRole("checkbox", { name: "Strength" });
    await expect(strength).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(strength).toBeChecked();
    await userEvent.click(canvas.getByText("Faith"));
    await expect(canvas.getByRole("checkbox", { name: "Faith" })).not.toBeChecked();
  },
};
