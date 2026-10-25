import { cx } from "@/lib/cx";
import styles from "./CatalogCardSkeleton.module.css";

/**
 * Placeholder in the shape of a `CatalogCard`, shown while tests load;
 * `pill` stands in for a profile's "Including … Tests".
 */
export function CatalogCardSkeleton({ pill = false }: { pill?: boolean }) {
  return (
    <div className={styles.card} aria-hidden>
      <span className={cx(styles.block, styles.media)} />
      <span className={styles.body}>
        <span className={styles.heading}>
          <span className={cx(styles.block, styles.name)} />
          <span className={styles.lines}>
            <span className={cx(styles.block, styles.line)} />
            <span className={cx(styles.block, styles.line, styles.short)} />
          </span>
          {pill && <span className={cx(styles.block, styles.pill)} />}
        </span>
        <span className={cx(styles.block, styles.delivery)} />
        <span className={cx(styles.block, styles.price)} />
      </span>
      <span className={cx(styles.block, styles.action)} />
    </div>
  );
}
