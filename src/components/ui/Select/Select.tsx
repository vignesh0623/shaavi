"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./Select.module.css";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  /** The first is "no choice" (value `""`), shown as `placeholder` on the pill. */
  options: SelectOption[];
  /** The chosen option's value. */
  value: string;
  onChange: (value: string) => void;
  /** On the pill while the first option is chosen, e.g. "Sort By". */
  placeholder?: string;
  "aria-label": string;
  className?: string;
};

/**
 * Pill-shaped menu with a chevron (Figma "Button Normal"), e.g. "Filter By",
 * opening a list in the site's style. It works as a select-only combobox:
 * focus stays on the pill while the arrow keys, Home and End move through
 * the list, Enter or Space chooses, and Escape or Tab closes it.
 */
export function Select({
  options,
  value,
  onChange,
  placeholder,
  "aria-label": label,
  className,
}: SelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  // The highlighted option while the list is open.
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  // Space chooses on keydown; some browsers would click the pill on keyup.
  const spaceHandled = useRef(false);

  const chosen = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const pillLabel = chosen === 0 && placeholder ? placeholder : options[chosen]?.label;
  const optionId = (index: number) => `${id}-option-${index}`;

  // A press anywhere else closes the list (Safari doesn't focus a clicked
  // button, so blur alone can't).
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function show() {
    setActive(chosen);
    setOpen(true);
  }

  function choose(index: number) {
    setOpen(false);
    if (index !== chosen) onChange(options[index].value);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      // Enter and Space open it by clicking.
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        show();
      }
      return;
    }
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        setActive((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        setActive((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        setActive(0);
        break;
      case "End":
        setActive(last);
        break;
      case " ":
        spaceHandled.current = true;
        choose(active);
        break;
      case "Enter":
        choose(active);
        break;
      case "Escape":
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        return;
      default:
        return;
    }
    event.preventDefault();
  }

  return (
    <div ref={rootRef} className={cx(styles.select, className)}>
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-listbox` : undefined}
        aria-activedescendant={open ? optionId(active) : undefined}
        className={styles.field}
        data-chosen={chosen > 0 || undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        onKeyUp={(event) => {
          if (event.key === " " && spaceHandled.current) {
            spaceHandled.current = false;
            event.preventDefault();
          }
        }}
        onBlur={() => setOpen(false)}
      >
        <span className={cx(styles.label, "text-trim")}>{pillLabel}</span>
        <Icon name="chevronRight" className={styles.chevron} />
      </button>

      {open && (
        // Pressing an option keeps focus on the pill.
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-label={label}
          className={styles.list}
          onMouseDown={(event) => event.preventDefault()}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={optionId(index)}
              role="option"
              aria-selected={index === chosen}
              className={cx(styles.option, index === active && styles.active)}
              onMouseMove={() => setActive(index)}
              onClick={() => choose(index)}
            >
              <span className={styles.optionLabel}>{option.label}</span>
              {index === chosen && <Icon name="check" className={styles.check} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
