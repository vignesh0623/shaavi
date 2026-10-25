import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./DetailsTable.module.css";

export type DetailsTableRow = [label: string, value: string];

type DetailsTableProps = {
  rows: DetailsTableRow[];
  /** Row height: 48px (`md`) or 56px (`lg`). */
  size?: "md" | "lg";
  /** Id of the heading that names the table. */
  labelledBy?: string;
  className?: string;
  "data-reveal"?: Reveal;
};

/** Two-column table of labels and values in a rounded outline. */
export function DetailsTable({
  rows,
  size = "md",
  labelledBy,
  className,
  "data-reveal": reveal,
}: DetailsTableProps) {
  return (
    <table
      className={cx(styles.table, styles[size], className)}
      aria-labelledby={labelledBy}
      data-reveal={reveal}
    >
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row" className={styles.label}>
              {label}
            </th>
            <td className={styles.value}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
