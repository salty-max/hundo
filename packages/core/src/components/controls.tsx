import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { Fieldset } from "@base-ui/react/fieldset";
import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { useId, useState } from "react";
import { buttonClass } from "./buttonStyle";
import { checkBox, checkIconClasses, checkMarkClasses } from "./check-style";
import { Icon } from "./Icon";
import { fieldClasses } from "./select-style";
import { pressClasses } from "./press-style";

// Core's form controls: Base UI's headless parts, styled from the guide's palette through the tokens in tokens.css. Like Button, none of
// them takes a className or a style: a guide gets the look it's given. The parts follow shadcn's Base UI components, adapted to the house tokens.

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/** A labelled tick box: the house 26px box, and the whole line (44px tall) is the target. */
export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-14/sm font-bold has-data-disabled:cursor-not-allowed has-data-disabled:opacity-[.46]">
      <BaseCheckbox.Root
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        className={checkBox()}
      >
        <BaseCheckbox.Indicator className={checkMarkClasses}>
          <Icon name="check" className={checkIconClasses} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label}
    </label>
  );
}

interface CheckboxGroupProps {
  label: string;
  choices: [key: string, label: string][];
  value: string[];
  onChange: (value: string[]) => void;
  /** Mark the first box as where a dialog's focus goes on opening (data-autofocus). */
  autoFocus?: boolean;
}

/**
 * Several of a few choices, each a labelled tick box: Base UI's checkbox group, a fieldset named by its legend, so a screen reader hears
 * the group's name on entering it. The boxes flow into as many columns of 9rem as fit, and each line (44px tall) is its box's target.
 */
export function CheckboxGroup({ label, choices, value, onChange, autoFocus = false }: CheckboxGroupProps) {
  return (
    <Fieldset.Root render={<BaseCheckboxGroup value={value} onValueChange={onChange} />} className="grid gap-1">
      <Fieldset.Legend className="text-13 font-bold">{label}</Fieldset.Legend>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-x-4">
        {choices.map(([key, text], i) => (
          <label key={key} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-14/sm font-bold">
            <BaseCheckbox.Root value={key} className={checkBox()} data-autofocus={autoFocus && i === 0 ? "" : undefined}>
              <BaseCheckbox.Indicator className={checkMarkClasses}>
                <Icon name="check" className={checkIconClasses} />
              </BaseCheckbox.Indicator>
            </BaseCheckbox.Root>
            {text}
          </label>
        ))}
      </div>
    </Fieldset.Root>
  );
}

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  /** A quieter line under it, which the switch is described by. */
  description?: string;
}

/**
 * An on/off setting, Base UI's switch: the words, then the switch at the end of the line, which is 44px tall and the target as a whole. The
 * track takes the guide's button corners (a pill where buttons are pills), the house edge while off and the primary fill while on.
 */
export function Switch({ label, checked, onChange, disabled = false, description }: SwitchProps) {
  const descriptionId = useId();
  const line = (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-2.5 text-14/sm font-bold has-data-disabled:cursor-not-allowed has-data-disabled:opacity-[.46]">
      {label}
      <BaseSwitch.Root
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        aria-describedby={description ? descriptionId : undefined}
        className={`${pressClasses} relative inline-flex h-7 w-12 shrink-0 items-center rounded-button border-2 border-edge bg-surface p-0.5 data-checked:border-primary data-checked:bg-primary`}
      >
        <BaseSwitch.Thumb className="size-5 rounded-button bg-edge transition-[translate,background-color] duration-150 ease-out in-data-theme-switch:transition-none data-checked:translate-x-5 data-checked:bg-on-primary" />
      </BaseSwitch.Root>
    </label>
  );
  if (!description) return line;
  return (
    <div>
      {line}
      <p id={descriptionId} className="-mt-2 mb-1 text-13 text-muted">
        {description}
      </p>
    </div>
  );
}

interface RadioGroupProps {
  label: string;
  choices: [key: string, label: string][];
  value: string;
  onChange: (value: string) => void;
}

/** One of a few choices, all showing: a row of segments. Tab enters the group once and the arrow keys move between segments. */
export function RadioGroup({ label, choices, value, onChange }: RadioGroupProps) {
  const labelId = useId();
  return (
    <div className={fieldClasses}>
      <span id={labelId}>{label}</span>
      <BaseRadioGroup aria-labelledby={labelId} value={value} onValueChange={(next) => onChange(String(next))} className="grid auto-cols-fr grid-flow-col gap-2">
        {choices.map(([key, text]) => (
          <label
            key={key}
            className={`${pressClasses} flex min-h-11 cursor-pointer items-center justify-center rounded-control border border-control-line bg-surface px-3 text-center text-14/sm font-bold text-muted select-none not-has-data-checked:hover:bg-raised has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-focus has-data-checked:border-soft-line has-data-checked:bg-soft has-data-checked:text-soft-ink`}
          >
            <Radio.Root value={key} className="sr-only" />
            {text}
          </label>
        ))}
      </BaseRadioGroup>
    </div>
  );
}

interface CardRadioGroupProps {
  label: string;
  /** Each card: its title, its line (hidden on a phone), an optional note under it (kept on a phone), and its chips. */
  choices: { value: string; title: string; text: string; note?: string; chips: string[] }[];
  /** "" for none chosen. */
  value: string;
  onChange: (value: string) => void;
}

/**
 * One of several choices that each need a line to explain: a grid of cards (three across in a wide dialog, two on a phone, where the line
 * goes and the chips stay). Tab enters the group once and the arrow keys move between cards; each card is its whole target.
 */
export function CardRadioGroup({ label, choices, value, onChange }: CardRadioGroupProps) {
  const labelId = useId();
  return (
    <div className="grid gap-1.5">
      <span id={labelId} className="text-13 font-bold">
        {label}
      </span>
      <BaseRadioGroup
        aria-labelledby={labelId}
        value={value}
        onValueChange={(next) => onChange(String(next))}
        className="grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] gap-2 phone:grid-cols-2"
      >
        {choices.map((choice) => (
          <label
            key={choice.value}
            className={`${pressClasses} grid cursor-pointer content-start gap-1 rounded-control border border-control-line bg-surface px-3 py-2.5 text-left select-none not-has-data-checked:hover:bg-raised has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-focus has-data-checked:border-primary has-data-checked:bg-soft has-data-checked:inset-ring has-data-checked:inset-ring-primary`}
          >
            <span className="flex items-center gap-2">
              {/* Named by its title alone, and described by its line, note and chips, so a screen reader hears "Quality" first, not the whole card. */}
              <Radio.Root
                value={choice.value}
                aria-labelledby={`${labelId}-${choice.value}`}
                aria-describedby={[`${labelId}-${choice.value}-text`, choice.note && `${labelId}-${choice.value}-note`, `${labelId}-${choice.value}-chips`].filter(Boolean).join(" ")}
                className="grid size-4.5 shrink-0 place-items-center rounded-full border-2 border-edge bg-surface data-checked:border-5 data-checked:border-primary"
              />
              <strong id={`${labelId}-${choice.value}`} className="text-14/sm font-extrabold">
                {choice.title}
              </strong>
            </span>
            <span id={`${labelId}-${choice.value}-text`} className="text-13/normal text-muted phone:hidden">
              {choice.text}
            </span>
            {choice.note && (
              <span id={`${labelId}-${choice.value}-note`} className="text-12 font-bold text-muted">
                {choice.note}
              </span>
            )}
            <span id={`${labelId}-${choice.value}-chips`} className="flex flex-wrap gap-1">
              {choice.chips.map((chip) => (
                <span key={chip} className="rounded-tag border border-soft-line px-1.5 py-0.5 text-11 font-extrabold text-soft-ink">
                  {chip}
                </span>
              ))}
            </span>
          </label>
        ))}
      </BaseRadioGroup>
    </div>
  );
}

interface FileFieldProps {
  id: string;
  label: string;
  accept?: string;
  /** The chosen file, or undefined when the choice is cleared. */
  onChange: (file: File | undefined) => void;
}

/**
 * A file picker. The browser's own "Choose File" button can't be styled, so the input stays (hidden, still focusable and still what a
 * screen reader finds) and its label is drawn as a button, with the chosen file's name beside it.
 */
export function FileField({ id, label, accept, onChange }: FileFieldProps) {
  const [name, setName] = useState("");
  return (
    <div className={fieldClasses}>
      <span id={`${id}-label`}>{label}</span>
      <div className="flex flex-wrap items-center gap-2.5">
        <label className={`cursor-pointer has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-focus ${buttonClass("outline", "default")}`}>
          <input
            id={id}
            type="file"
            accept={accept}
            aria-labelledby={`${id}-label ${id}-button`}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setName(file?.name ?? "");
              onChange(file);
            }}
          />
          <span id={`${id}-button`}>Choose file</span>
        </label>
        <span className="text-14/sm font-semibold text-muted">{name || "No file chosen"}</span>
      </div>
    </div>
  );
}

interface CodeFieldProps {
  id: string;
  label: string;
  /** How many characters; each gets its own box. */
  length?: number;
  value: string;
  onChange: (value: string) => void;
  /** Called once when the last box is filled, also when a whole code is pasted. */
  onComplete?: (value: string) => void;
  /** Supporting text, read with the field. */
  description?: string;
  invalid?: boolean;
  disabled?: boolean;
  /** Letters and digits (a recovery code), where the default is digits only. */
  alphanumeric?: boolean;
  /** Takes the focus when the screen opens. */
  autoFocus?: boolean;
}

/**
 * A short code, one box per character: the sixth digit of a pairing code. Typing moves on by itself, Backspace goes back, a pasted code
 * fills every box, and a phone's one-time-code suggestion fills them too. The first box carries the label's name; the others say which one they are.
 */
export function CodeField({ id, label, length = 6, value, onChange, onComplete, description, invalid = false, disabled = false, alphanumeric = false, autoFocus = false }: CodeFieldProps) {
  const descriptionId = `${id}-description`;
  return (
    <div className={fieldClasses}>
      <label htmlFor={id}>{label}</label>
      <BaseOTPField.Root
        id={id}
        length={length}
        value={value}
        onValueChange={onChange}
        onValueComplete={(code) => onComplete?.(code)}
        validationType={alphanumeric ? "alphanumeric" : "numeric"}
        disabled={disabled}
        className="flex max-w-xs gap-2"
      >
        {Array.from({ length }, (_, index) => (
          <BaseOTPField.Input
            key={index}
            aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
            aria-describedby={description ? descriptionId : undefined}
            aria-invalid={(invalid && !disabled) || undefined}
            data-autofocus={autoFocus && index === 0 ? "" : undefined}
            className="h-11 min-w-0 flex-1 rounded-control border border-control-line bg-surface p-0 text-center text-18/lg font-bold text-ink disabled:cursor-not-allowed disabled:opacity-[.46] aria-invalid:border-2 aria-invalid:border-error"
          />
        ))}
      </BaseOTPField.Root>
      {description && (
        <p id={descriptionId} className="text-13 font-semibold text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
