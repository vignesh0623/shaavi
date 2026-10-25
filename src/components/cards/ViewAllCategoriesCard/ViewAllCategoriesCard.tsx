import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./ViewAllCategoriesCard.module.css";

type ViewAllCategoriesCardProps = {
  /** Six mosaic photos, laid out 2 × 3. */
  images: readonly string[];
  href: string;
  label?: string;
  "data-reveal"?: Reveal;
};

export function ViewAllCategoriesCard({
  images,
  href,
  label = "View All Categories",
  "data-reveal": reveal,
}: ViewAllCategoriesCardProps) {
  return (
    <Link href={href} className={styles.card} data-reveal={reveal}>
      <span className={styles.panel} aria-hidden />
      <span className={styles.footer}>
        <span className={cx(styles.label, "text-trim")}>{label}</span>
        <Icon name="arrowRight" className={styles.arrow} />
      </span>
      <span className={styles.mosaic}>
        {images.map((src) => (
          <span key={src} className={styles.tile}>
            <Image
              src={src}
              alt=""
              fill
              sizes="98px"
              loading="eager"
              className={styles.image}
            />
          </span>
        ))}
      </span>
    </Link>
  );
}
