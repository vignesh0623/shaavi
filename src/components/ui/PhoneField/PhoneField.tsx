import Image from "next/image";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import { TextField, type TextFieldProps } from "../TextField/TextField";
import styles from "./PhoneField.module.css";

export type DialCodeOption = { country: string; code: string; flag: string };

type PhoneFieldProps = Omit<Extract<TextFieldProps, { multiline?: false }>, "icon" | "type"> & {
  /** Accessible name of the dialling code menu, e.g. "Country code". */
  codeLabel: string;
  codes: DialCodeOption[];
  /** The chosen dialling code, e.g. "+44". */
  code: string;
  onCodeChange: (code: string) => void;
  /** Form name of the dialling code. */
  codeName?: string;
};

/**
 * Mobile number field: a dialling code (flag, code and chevron over a native
 * menu, so keyboards and phones get their own picker) beside an underlined
 * number field.
 */
export function PhoneField({
  codeLabel,
  codes,
  code,
  onCodeChange,
  codeName,
  className,
  ...field
}: PhoneFieldProps) {
  const chosen = codes.find((option) => option.code === code) ?? codes[0];

  return (
    <div className={cx(styles.phone, field.error && styles.invalid, className)}>
      <div className={styles.code}>
        <Image src={chosen.flag} alt="" width={21} height={13} className={styles.flag} />
        <span className={cx(styles.codeText, "text-trim")}>{chosen.code}</span>
        <Icon name="chevronDownSmall" />
        <select
          name={codeName}
          aria-label={codeLabel}
          value={chosen.code}
          onChange={(event) => onCodeChange(event.target.value)}
          className={styles.select}
        >
          {codes.map((option) => (
            <option key={option.code} value={option.code}>
              {option.country} ({option.code})
            </option>
          ))}
        </select>
      </div>
      <TextField type="tel" className={styles.number} {...field} />
    </div>
  );
}
