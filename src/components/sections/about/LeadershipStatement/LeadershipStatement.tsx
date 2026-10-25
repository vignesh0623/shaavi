import { highlights, leadershipStatement } from "@/content/about";
import { cx } from "@/lib/cx";
import styles from "./LeadershipStatement.module.css";

/** Founding statement followed by three key highlights. */
export function LeadershipStatement({ className }: { className?: string }) {
  return (
    <section
      className={cx(styles.section, className)}
      aria-label="Our leadership"
      data-motion="statement"
    >
      <p className={styles.statement} data-motion="statement-text">
        {leadershipStatement}
      </p>
      <ul className={styles.highlights} data-motion="highlights">
        {highlights.map((highlight) => (
          <li key={highlight.title} className={styles.highlight} data-motion="highlight">
            <p className={styles.title} data-motion="highlight-title">
              {highlight.title}
            </p>
            <p className={styles.description}>{highlight.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
