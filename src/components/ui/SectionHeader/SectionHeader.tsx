import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  /** Use "\n" to break the title onto a second line, as in the design. */
  title: string;
  titleId?: string;
  description?: string;
  /** Right-aligned call to action, usually a `Button`. */
  action?: ReactNode;
  className?: string;
};

/**
 * Three-column header: title · centred description · action (the last two
 * optional). Each part comes in from its own side as it scrolls into view.
 */
export function SectionHeader({
  title,
  titleId,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.header, className)}>
      <div className={styles.titleBox} data-reveal="left">
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
      </div>
      {description && (
        <p className={styles.description} data-reveal="bottom">
          {description}
        </p>
      )}
      {action && (
        <div className={styles.action} data-reveal="right">
          {action}
        </div>
      )}
    </div>
  );
}
