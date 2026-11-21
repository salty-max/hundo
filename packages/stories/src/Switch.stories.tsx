import { Switch } from "@hundo/core/components/controls";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { expect, userEvent } from "storybook/test";

/** Holds the value, as a form does. */
function Holder(args: ComponentProps<typeof Switch>) {
  const [checked, setChecked] = useState(args.checked);
  return <Switch {...args} checked={checked} onChange={setChecked} />;
}

const meta = {
  title: "Core/Switch",
  component: Switch,
  args: { label: "Keep screen on", checked: false, onChange: () => {} },
  render: (args) => <Holder {...args} />,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { checked: true } };

/** Dimmed, and not clickable. */
export const Disabled: Story = {
  args: { checked: true, disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("switch", { name: "Keep screen on" })).toHaveAttribute("aria-disabled", "true");
  },
};

/** A quieter line under it, which the switch is described by (the build dialog's add-ons). */
export const WithDescription: Story = {
  args: { label: "Pyromancy", description: "A flame beside any build: it needs no stat." },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("switch", { name: "Pyromancy" })).toHaveAccessibleDescription("A flame beside any build: it needs no stat.");
  },
};

/** Tab to it, Space turns it on, Space again off; the 3px focus ring shows while it has the keyboard focus. */
export const Keyboard: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch", { name: "Keep screen on" });
    await userEvent.tab();
    await expect(toggle).toHaveFocus();
    await expect(getComputedStyle(toggle).outlineWidth).toBe("3px");
    await userEvent.keyboard(" ");
    await expect(toggle).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(toggle).not.toBeChecked();
  },
};

/** Turning it on is one step: the thumb's slide and its fill, and the track's fill and edge, ease over the same 150ms. */
export const OneStep: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch", { name: "Keep screen on" });
    await userEvent.click(toggle);
    const clock = (element: Element) => [getComputedStyle(element).transitionProperty, getComputedStyle(element).transitionDuration];
    await expect(clock(toggle.firstElementChild!)).toEqual(["translate, background-color", "0.15s"]);
    await expect(clock(toggle)).toEqual(["color, background-color, border-color, box-shadow", "0.15s"]);
  },
};

/** Clicking the words turns it on too: the whole 44px line is the target. */
export const LabelClick: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Keep screen on"));
    await expect(canvas.getByRole("switch", { name: "Keep screen on" })).toBeChecked();
  },
};
