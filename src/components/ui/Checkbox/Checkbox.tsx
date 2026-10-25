import type { InputHTMLAttributes } from "react";
import type { IconName } from "@/constants/icons";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./Checkbox.module.css";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  label: string;
  /** After the label, e.g. the WhatsApp logo. */
  icon?: IconName;
  className?: string;
};

/** Figma "Checkbox - Large" with its label (and an optional icon after it). */
export function Checkbox({ label, icon, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx(styles.checkbox, "tap-area", className)}>
      <input type="checkbox" className={styles.input} {...rest} />
      <span className={cx(styles.label, "text-trim")}>{label}</span>
      {icon && <Icon name={icon} />}
    </label>
  );
}
