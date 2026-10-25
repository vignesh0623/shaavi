import { Icon } from "@/components/ui";
import type { Step } from "@/content/home";
import { cx } from "@/lib/cx";
import styles from "./StepCard.module.css";

type StepCardProps = Step & {
  /** Two-digit step number shown beside the card ("01"). */
  number: string;
  /** Puts the number on the right, as on even steps. */
  reverse?: boolean;
};

/** One "How It Works" step: big muted number + white card. */
export function StepCard({ number, title, description, icon, reverse }: StepCardProps) {
  return (
    <li className={cx(styles.step, reverse && styles.reverse)} data-motion="step">
      <span className={cx(styles.number, "text-trim")} aria-hidden data-motion="step-number">
        {number}
      </span>
      <div className={styles.card} data-motion="step-card">
        <span className={styles.iconCircle} data-motion="step-icon">
          <Icon name={icon} />
        </span>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </li>
  );
}
