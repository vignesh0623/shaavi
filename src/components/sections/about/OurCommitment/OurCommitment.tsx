import { Pill } from "@/components/ui";
import { commitment } from "@/content/about";
import { cx } from "@/lib/cx";
import styles from "./OurCommitment.module.css";

/** Dark closing panel with the company's commitment and tagline. */
export function OurCommitment({ className }: { className?: string }) {
  return (
    <section
      className={cx(styles.panel, className)}
      aria-labelledby="commitment-title"
      data-motion="commitment"
    >
      <div className={styles.row}>
        <div className={styles.lead} data-motion="commitment-lead">
          <Pill dot tone="inverse">
            {commitment.eyebrow}
          </Pill>
          <h2 id="commitment-title" className={styles.heading}>
            {commitment.heading}
          </h2>
          <p className={styles.intro}>{commitment.intro}</p>
        </div>
        <p className={styles.body} data-motion="commitment-body">
          {commitment.body}
        </p>
      </div>
      <p className={styles.tagline} data-motion="commitment-tagline">
        {commitment.tagline.lead}
        <span className={styles.highlight}>{commitment.tagline.highlight}</span>
      </p>
    </section>
  );
}
