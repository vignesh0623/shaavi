import Link from "next/link";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./Logo.module.css";

type LogoProps = {
  /** `inverse` renders the "HEALTHCARE" line in white for dark backgrounds. */
  tone?: "default" | "inverse";
  className?: string;
};

export function Logo({ tone = "default", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Shaavi Healthcare home"
      className={cx(styles.logo, styles[tone], className)}
    >
      <Icon name="logoMark" />
      <span className={styles.wordmark}>
        <span className={cx(styles.name, "text-trim")}>SHAAVI</span>
        <span className={cx(styles.tagline, "text-trim")}>HEALTHCARE</span>
      </span>
    </Link>
  );
}
