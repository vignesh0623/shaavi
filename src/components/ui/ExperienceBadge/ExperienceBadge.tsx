import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";
import styles from "./ExperienceBadge.module.css";

type ExperienceBadgeProps = Omit<ComponentProps<"div">, "children"> & {
  value: string;
  caption: string;
  tone?: "dark" | "primary";
};

/**
 * Small solid card such as "20+ years · Clinical diagnostics expertise".
 * Other attributes go on the card.
 */
export function ExperienceBadge({
  value,
  caption,
  tone = "dark",
  className,
  ...rest
}: ExperienceBadgeProps) {
  return (
    <div className={cx(styles.badge, styles[tone], className)} {...rest}>
      <p className={styles.value} data-motion="badge-value">
        {value}
      </p>
      <p className={styles.caption}>{caption}</p>
    </div>
  );
}
