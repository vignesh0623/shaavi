import Image from "next/image";
import { images } from "@/constants/images";
import { cx } from "@/lib/cx";
import styles from "./CustomersBadge.module.css";

type CustomersBadgeProps = {
  title?: string;
  caption?: string;
  avatars?: readonly string[];
  className?: string;
};

/** Floating "10K+ Customers Served" card with overlapping avatars. */
export function CustomersBadge({
  title = "10K+ Customers",
  caption = "Served",
  avatars = images.avatars,
  className,
}: CustomersBadgeProps) {
  return (
    <div className={cx(styles.badge, className)}>
      <div className={styles.avatars}>
        {avatars.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={37}
            height={37}
            className={styles.avatar}
          />
        ))}
      </div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.caption}>{caption}</p>
      </div>
    </div>
  );
}
