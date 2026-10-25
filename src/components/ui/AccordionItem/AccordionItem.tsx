import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./AccordionItem.module.css";

type AccordionItemProps = {
  /** Always-visible heading row. */
  title: ReactNode;
  /** Revealed when the item is open. */
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

/**
 * Collapsible light-blue card built on native <details>/<summary>, so it is
 * keyboard- and screen-reader-accessible without any JavaScript.
 */
export function AccordionItem({ title, children, defaultOpen, className }: AccordionItemProps) {
  return (
    <details open={defaultOpen} className={cx(styles.item, className)}>
      <summary className={styles.summary}>
        {title}
        <Icon name="arrowDown" className={styles.arrow} />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
