import { Icon, Pill } from "@/components/ui";
import { cx } from "@/lib/cx";
import styles from "./IncludedTests.module.css";

type IncludedTestsProps = {
  /** Every test in the profile, for "Including … Tests". */
  count: number;
  /** The profile's list; a panel or profile in it names its own tests. */
  items: { name: string; tests?: string[] }[];
  className?: string;
};

/**
 * "Including … Tests" and a grid of what a profile includes, under its
 * description. A panel or another profile in the list shows the tests it
 * holds on a second line (not in the Figma file, whose example has none).
 */
export function IncludedTests({ count, items, className }: IncludedTestsProps) {
  return (
    <div className={cx(styles.included, className)}>
      <h2 className="visually-hidden">Included tests</h2>
      <Pill size="sm" data-reveal="left">
        Including {count} {count === 1 ? "Test" : "Tests"}
      </Pill>
      <ul className={styles.grid}>
        {items.map(({ name, tests }) => (
          <li key={name} className={styles.item} data-reveal="bottom">
            <span className={styles.row}>
              <Icon name="check" />
              <span className={cx(styles.name, "text-trim")}>{name}</span>
            </span>
            {tests && <span className={cx(styles.tests, "text-trim")}>{tests.join(", ")}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
