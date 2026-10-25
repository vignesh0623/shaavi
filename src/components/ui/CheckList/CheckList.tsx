import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import { Icon } from "../Icon/Icon";
import styles from "./CheckList.module.css";

type CheckListProps = {
  /** Heading above the list; leave out when something else names it. */
  title?: string;
  /** Heading level of `title`. */
  level?: 2 | 3;
  items: string[];
  /** Height of each row: `sm` 30px, `md` 34px (the design uses both). */
  size?: "sm" | "md";
  className?: string;
  "data-reveal"?: Reveal;
};

/** Heading over a list of blue-ticked items ("What this test measures"). */
export function CheckList({
  title,
  level = 2,
  items,
  size = "sm",
  className,
  "data-reveal": reveal,
}: CheckListProps) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div className={cx(styles.group, styles[size], className)} data-reveal={reveal}>
      {title && <Heading className={styles.title}>{title}</Heading>}
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            <Icon name="check" />
            <span className={cx(styles.text, "text-trim")}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
