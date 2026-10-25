import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { IconName } from "@/constants/icons";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./TextField.module.css";

type FieldOwnProps = {
  /** Also names the error message (`<id>-error`). */
  id: string;
  /** Shown as the placeholder; screen readers get it as the label. */
  label: string;
  icon?: IconName;
  /** Message under the field, which marks it invalid. */
  error?: string;
  className?: string;
};

type InputProps = FieldOwnProps & { multiline?: false } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    keyof FieldOwnProps | "placeholder"
  >;

type TextareaProps = FieldOwnProps & { multiline: true } & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof FieldOwnProps | "placeholder"
  >;

export type TextFieldProps = InputProps | TextareaProps;

/**
 * Underlined form field (Figma "Input Box"): an icon and the placeholder over
 * a hairline. The placeholder doubles as the label, which screen readers get
 * from a hidden copy. `multiline` makes it the 70px message box.
 */
export function TextField({
  id,
  label,
  icon,
  error,
  multiline,
  className,
  ...rest
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const control = {
    id,
    placeholder: label,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: styles.input,
  };

  return (
    <div className={cx(styles.field, multiline && styles.multiline, error && styles.invalid, className)}>
      <label className={styles.box}>
        {icon && <Icon name={icon} />}
        <span className="visually-hidden">{label}</span>
        {multiline ? (
          <textarea {...control} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        ) : (
          <input {...control} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
        )}
      </label>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
