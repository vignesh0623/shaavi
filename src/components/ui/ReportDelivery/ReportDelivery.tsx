import { cx } from "@/lib/cx";
import styles from "./ReportDelivery.module.css";

type ReportDeliveryProps = {
  time: string;
  className?: string;
};

/** "Report Delivery - 48 hours" line shown on test cards. */
export function ReportDelivery({ time, className }: ReportDeliveryProps) {
  return (
    <p className={cx(styles.delivery, className)}>
      Report Delivery - <span className={styles.time}>{time}</span>
    </p>
  );
}
