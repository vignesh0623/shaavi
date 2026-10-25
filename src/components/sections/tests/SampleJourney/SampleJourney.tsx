import { Icon } from "@/components/ui";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./SampleJourney.module.css";

type SampleJourneyProps = {
  title: string;
  steps: string[];
  className?: string;
  "data-reveal"?: Reveal;
};

/** "Simple Sample Journey": numbered steps from booking to results. */
export function SampleJourney({ title, steps, className, "data-reveal": reveal }: SampleJourneyProps) {
  return (
    <div className={cx(styles.card, className)} data-reveal={reveal}>
      <div className={styles.heading}>
        <Icon name="flaskRound" />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step} className={styles.step}>
            <span className={styles.number}>
              <span className="text-trim">{index + 1}</span>
            </span>
            <span className={styles.text}>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
