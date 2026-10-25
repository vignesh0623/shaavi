import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./CategoryCard.module.css";

/*
 * The caption sits on a progressive blur (sharp at its top edge, fully
 * frosted at the bottom), built from a few blurred copies of the photo
 * that fade in one after another. The browser reuses the same image file.
 */
const FROST_LAYERS = [styles.frost1, styles.frost2, styles.frost3, styles.frost4];

type CategoryCardProps = {
  name: string;
  image: string;
  href: string;
  /** Revealed on hover and keyboard focus, e.g. "6 tests · from £50.00". */
  summary: string;
  /** Label of the pill revealed with the summary, e.g. "View Tests". */
  action: string;
  "data-reveal"?: Reveal;
};

/**
 * Photo card with a frosted caption strip (hero category row). On hover or
 * keyboard focus the caption rises to cover the photo in a tinted blur, and
 * the name lifts to reveal a summary and a pill.
 */
export function CategoryCard({
  name,
  image,
  href,
  summary,
  action,
  "data-reveal": reveal,
}: CategoryCardProps) {
  return (
    <Link href={href} className={styles.card} data-reveal={reveal}>
      <span className={styles.media}>
        <Image src={image} alt="" fill sizes="196px" loading="eager" className={styles.image} />
        {FROST_LAYERS.map((layer) => (
          <Image
            key={layer}
            src={image}
            alt=""
            fill
            sizes="196px"
            loading="eager"
            className={cx(styles.image, styles.frost, layer)}
          />
        ))}
        <span className={styles.caption}>
          <span className={cx(styles.name, "text-trim")}>{name}</span>
          <span className={styles.details}>
            <span className={styles.detailsInner}>
              <span className={styles.summary}>{summary}</span>
              {/* The whole card is the link; the pill only shows where it goes. */}
              <span className={styles.action} aria-hidden>
                <span className="text-trim">{action}</span>
                <Icon name="arrowRight" />
              </span>
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
