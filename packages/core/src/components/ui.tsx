import { Button as BaseButton } from "@base-ui/react/button";
import { Progress } from "@base-ui/react/progress";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Tooltip } from "@base-ui/react/tooltip";
import { cva } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Link } from "react-router";
import { buttonClass, type ButtonSize, type ButtonStyle } from "./buttonStyle";
import { Icon, type IconName } from "./Icon";
import { toneClasses } from "./tone";
import { tooltip as tooltipHandle } from "./tooltip-handle";
import { cats, config, tagName } from "../guide";
import type { Row, Tone } from "../types";
import { pct } from "../format";
import { pressClasses } from "./press-style";

interface ButtonProps extends Omit<ComponentPropsWithRef<"button">, "style" | "className"> {
  look?: ButtonStyle;
  size?: ButtonSize;
  icon?: IconName;
  /**
   * While it's disabled, the button keeps its place in the Tab order and is announced as unavailable (aria-disabled) instead of
   * dropping out: for a button that is disabled for a moment while the focus is on it, so the focus doesn't fall to the page.
   */
  focusableWhenDisabled?: boolean;
}

/** A button, on Base UI's: a `look` and a `size` instead of classes. A click on a disabled one does nothing, focusable or not. */
export function Button({ look = "outline", size = "default", icon, children, type = "button", disabled = false, focusableWhenDisabled = false, ...rest }: ButtonProps) {
  return (
    // Focusable only while disabled: Base UI writes aria-disabled="false" on an enabled button that has the option on.
    <BaseButton type={type} disabled={disabled} focusableWhenDisabled={focusableWhenDisabled && disabled} className={buttonClass(look, size)} {...rest}>
      {icon && <Icon name={icon} />}
      {children}
    </BaseButton>
  );
}

export function LinkButton({ to, look = "outline", size = "default", icon, children }: { to: string; look?: ButtonStyle; size?: ButtonSize; icon?: IconName; children: ReactNode }) {
  return (
    <Link className={buttonClass(look, size)} to={to}>
      {icon && <Icon name={icon} />}
      {children}
    </Link>
  );
}

// The top bar sets --icon-w and --icon-h where its buttons are a different size (a phone's title bar), so no class is needed on one.
const iconButtonClasses = `${pressClasses} grid h-(--icon-h,2.5rem) w-(--icon-w,2.5rem) place-items-center rounded-control border border-control-line bg-transparent p-0 text-inherit not-disabled:hover:bg-raised disabled:cursor-not-allowed disabled:opacity-[.46] [&_svg]:size-4.5`;

type IconButtonProps = { label: string; icon: IconName; tooltip?: boolean } & Omit<ComponentPropsWithRef<"button">, "className" | "style">;

/**
 * A square button with an icon and no words: `label` is what a screen reader says. With `tooltip`, a pointer resting on it or a
 * keyboard reaching it also shows the label (tooltip-handle.ts), for the buttons whose icon alone may not say enough.
 */
export function IconButton({ label, icon, tooltip = false, ...rest }: IconButtonProps) {
  const button = (
    <BaseButton type="button" className={iconButtonClasses} aria-label={label} {...rest}>
      <Icon name={icon} />
    </BaseButton>
  );
  return tooltip ? <Tooltip.Trigger handle={tooltipHandle} payload={label} render={button} /> : button;
}

// The chips wrap onto as many lines as they need, or stay on one line that scrolls sideways (the checklist's on a phone, where a wall of
// chips would push the list off the first screen). The line runs to the screen's edges, so a cut-off chip says there are more, and it
// keeps room above and below for the focus ring, which a line that scrolls would otherwise cut off.
const chipGroup = cva("flex gap-1.5", {
  variants: {
    flow: { wrap: "flex-wrap", scroll: "-mx-(--gutter) -my-1.5 scrollbar-none overflow-x-auto overscroll-x-contain px-(--gutter) py-1.5 *:shrink-0" },
  },
  defaultVariants: { flow: "wrap" },
});

interface ChipGroupProps {
  /** What the chips choose between, for a screen reader: the group's name. */
  label: string;
  choices: [key: string, label: string][];
  value: string;
  onChange: (value: string) => void;
  /** Wrap onto more lines (the default), or keep to one line that scrolls sideways. */
  flow?: "wrap" | "scroll";
}

/**
 * A row of chips, one of them pressed: a filter or a mode. Base UI's toggle group, one choice at a time. Tab reaches the group once and
 * the arrow keys move between chips without pressing them; Enter or Space presses one. Pressing the pressed chip again keeps it pressed,
 * so something is always chosen, and tells the page again. A value that isn't among the chips (a filter the page's select set) leaves none pressed.
 */
export function ChipGroup({ label, choices, value, onChange, flow }: ChipGroupProps) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      onValueChange={(next) => {
        // Pressing the pressed chip lets go of it in Base UI; here it stays pressed, and the page still hears it (the route clears a highlight).
        onChange(next[0] ?? value);
      }}
      className={chipGroup({ flow })}
    >
      {choices.map(([key, text]) => (
        <Toggle
          key={key}
          value={key}
          className={`${pressClasses} min-h-10 rounded-button border border-line bg-surface px-3.5 py-2 text-13 leading-[1.4] font-bold text-muted hover:border-control-line data-pressed:border-soft-line data-pressed:bg-soft data-pressed:text-soft-ink phone:px-2.5`}
        >
          {text}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

/** A filter that is on, as a chip that turns it off: the checklist's filters on a phone, where the controls that set them are in a sheet. */
export function ActiveFilter({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <BaseButton
      className={`${pressClasses} flex min-h-8 items-center gap-1 rounded-button border border-soft-line bg-soft px-2.5 text-12 font-bold text-soft-ink [&_svg]:size-3.5`}
      aria-label={`Remove filter: ${label}`}
      onClick={onRemove}
    >
      {label}
      <Icon name="x" />
    </BaseButton>
  );
}

/** How much of something is done, as a thin bar: Base UI's progress, named by `label` and read as a percentage. It is as wide as what holds it. */
export function ProgressBar({ done, total, label }: { done: number; total: number; label: string }) {
  return (
    <Progress.Root value={pct(done, total)} aria-label={label}>
      <Progress.Track className="h-1.5 overflow-hidden rounded-[20px] bg-bar-track">
        <Progress.Indicator className="block h-full rounded-[inherit] bg-primary" />
      </Progress.Track>
    </Progress.Root>
  );
}

// A card on the dashboard, Next up, and a guide's own panels (Koholint's deathless run, Red Dead's calibration). It holds the room
// between its parts, which carry no margin of their own: the room inside it and between its parts go together, so they can't be mixed.
const panel = cva("flex flex-col rounded-card border border-line bg-surface", {
  variants: {
    pad: { roomy: "gap-3 px-5 py-4 phone:px-4", snug: "gap-2 px-4 py-3.5 phone:px-3" },
  },
  defaultVariants: { pad: "roomy" },
});

type SectionProps = Omit<ComponentPropsWithRef<"section">, "className" | "style">;

/**
 * A panel: its title, its words and its actions are the Panel parts below, one under the other. `pad` is the room inside it and between
 * its parts (snug for a short list that sits between other parts of a page). What holds the panel keeps the room around it.
 */
export function Panel({ pad, ...rest }: SectionProps & { pad?: "roomy" | "snug" }) {
  return <section className={panel({ pad })} {...rest} />;
}

/** A panel's title. It can take the focus (not by Tab), so an address that names its panel (the Progress page's) can move the focus to it. */
export function PanelTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} tabIndex={-1} className="m-0 font-display text-24 leading-[1.2] font-bold tracking-[-0.015em]">
      {children}
    </h2>
  );
}

/** A panel's title and the words that open it, kept closer to each other than to the rest of the panel. */
export function PanelHead({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}

// What a panel says: muted as a rule, in ink for a result the reader asked for, in the error colour for what went wrong.
const panelText = cva("text-14", {
  variants: { tone: { muted: "text-muted", ink: "text-ink", error: "text-error" } },
  defaultVariants: { tone: "muted" },
});

export function PanelText({ tone, ...rest }: Omit<ComponentPropsWithRef<"p">, "className" | "style"> & { tone?: "muted" | "ink" | "error" }) {
  return <p className={panelText({ tone })} {...rest} />;
}

/** A form in a panel, under its words: the fields and their buttons. The panel's code checks the values, so the browser's own checks are off. */
export function PanelForm(props: Omit<ComponentPropsWithRef<"form">, "className" | "style">) {
  return <form noValidate {...props} />;
}

/** A panel's one big number, with what it counts beside it: a run's deaths. */
export function PanelFigure({ value, unit }: { value: number; unit: string }) {
  return (
    <p className="text-38 leading-none font-extrabold tabular-nums">
      {value}
      <small className="ml-1.5 text-14 text-muted">{unit}</small>
    </p>
  );
}

/** A row of buttons in a panel. */
export function PanelActions(props: Omit<ComponentPropsWithRef<"div">, "className" | "style">) {
  return <div className="flex flex-wrap items-center gap-2" {...props} />;
}

/** What a list says in place of its rows when it has none. */
export const Empty = ({ children }: { children: ReactNode }) => (
  <div className="rounded-card border border-dashed border-control-line bg-raised px-4 py-5 text-14 text-muted">{children}</div>
);

/** A note above a page's content, with an icon: what the page leaves out, and why. */
export function Callout({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-small border border-line bg-soft px-3 py-2.5 text-13 text-soft-ink [&_svg]:mt-px [&_svg]:size-4">
      <Icon name={icon} />
      <span>{children}</span>
    </div>
  );
}

/** A page's title: it scales with the page column (`cqi` of the page's container in `<main>`, Layout), down to 30px on a phone. */
export const pageTitleClasses = "font-display text-[clamp(1.875rem,6cqi,3.625rem)] leading-[1.17] font-bold tracking-[-0.015em] phone:leading-[1.15]";

/**
 * A page's title, the line under it, and a figure in a pill under that (the Questlines page's count). Its spacing is compact on a phone.
 */
export function PageHeading({ title, intro, stat }: { title: string; intro?: ReactNode; stat?: ReactNode }) {
  return (
    <header>
      <h1 className={pageTitleClasses}>{title}</h1>
      {intro && <p className="mt-1.5 text-14 text-muted phone:mt-1 phone:text-13 phone:leading-[1.45]">{intro}</p>}
      {stat && <span className="mt-2 inline-block rounded-tag bg-soft px-3 py-1 text-12 font-extrabold text-soft-ink">{stat}</span>}
    </header>
  );
}

/**
 * A page that opens with a heading: the heading, then the page's parts one under the other. The page keeps the room between them, more
 * under the heading than between the parts, so a part carries no margin of its own and one that renders nothing leaves no gap.
 */
export function HeadedPage({ title, intro, stat, children }: { title: string; intro?: ReactNode; stat?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 phone:gap-3.5">
      <PageHeading title={title} intro={intro} stat={stat} />
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

// A category's label. In prose it sits a little above the baseline, level with the words' middle; in a row's column of tags, on a phone, a
// long one wraps under itself instead of pushing the row wider.
const tag = cva("rounded-tag px-2 py-1 text-11 font-extrabold tracking-[0.02em] whitespace-nowrap", {
  variants: { tone: toneClasses, at: { line: "", prose: "align-[0.125rem]", column: "phone:max-w-21 phone:text-right phone:whitespace-normal" } },
  defaultVariants: { tone: "none", at: "line" },
});

type TagAt = "line" | "prose" | "column";

/** A category label, coloured by the category's tone, or by `tone` for a label that is no category (a build pick's role). */
export function Tag({ tag: name, at, tone, children }: { tag: string; at?: TagAt; tone?: Tone | "none"; children?: ReactNode }) {
  return (
    <span className={tag({ tone: tone ?? (name === "missable" ? "rose" : name === "one-way" ? "amber" : (cats[name]?.[3] ?? "none")), at })}>
      {children ?? cats[name]?.[1] ?? (name === "missable" ? "Missable" : name === "one-way" ? "One-way" : name)}
    </span>
  );
}

/** "+3" for a row whose amount counts toward the guide's quantity category. */
export function Quantity({ row, at }: { row: Row; at?: TagAt }) {
  const tag = config.quantity ?? "";
  return (
    <Tag tag={tag} at={at}>
      +{row.quantity}
      <span className="sr-only"> {tagName(tag)}</span>
    </Tag>
  );
}
