import type { ReactNode } from "react";
import type { IconName } from "@/constants/icons";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import { Icon } from "../Icon/Icon";
import styles from "./Pill.module.css";

type PillProps = {
  children: ReactNode;
  /** Leading 18px icon. */
  icon?: IconName;
  /** Leading 12px brand-blue dot. */
  dot?: boolean;
  size?: "md" | "sm";
  /** `inverse` lightens the label for dark backgrounds. */
  tone?: "default" | "inverse";
  className?: string;
  "data-reveal"?: Reveal;
};

/** Light-blue rounded tag used for section eyebrows and card badges. */
export function Pill({
  children,
  icon,
  dot,
  size = "md",
  tone = "default",
  className,
  "data-reveal": reveal,
}: PillProps) {
  return (
    <span className={cx(styles.pill, styles[size], styles[tone], className)} data-reveal={reveal}>
      {icon && <Icon name={icon} />}
      {dot && <span className={styles.dot} aria-hidden />}
      <span className={cx(styles.label, "text-trim")}>{children}</span>
    </span>
  );
}
