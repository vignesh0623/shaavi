import type { ReactNode } from "react";
import type { IconName } from "@/constants/icons";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import { Icon } from "../Icon/Icon";
import styles from "./InfoCard.module.css";

type InfoCardProps = {
  icon: IconName;
  label: string;
  /** Text, or a link such as an email address. */
  value: ReactNode;
  /** `plain` drops the card around it (Contact Us details). */
  variant?: "card" | "plain";
  className?: string;
  "data-reveal"?: Reveal;
};

/**
 * One key detail, such as "Report delivery · 48 hours", with an icon. Renders
 * a `dt`/`dd` pair, so place the cards in a `<dl>`.
 */
export function InfoCard({
  icon,
  label,
  value,
  variant = "card",
  className,
  "data-reveal": reveal,
}: InfoCardProps) {
  return (
    <div className={cx(styles.card, variant === "plain" && styles.plain, className)} data-reveal={reveal}>
      <dt className={cx(styles.label, "text-trim")}>
        {/* Inside the term, as a `<dl>` group may only hold `dt`s and `dd`s. */}
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
        {label}
      </dt>
      <dd className={cx(styles.value, "text-trim")}>{value}</dd>
    </div>
  );
}
