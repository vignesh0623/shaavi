import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { Icon, PriceTag, ReportDelivery } from "@/components/ui";
import type { BookedTest } from "@/content/home";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./TestCard.module.css";

type TestCardProps = BookedTest & {
  /** "eager" when the photo is already on screen elsewhere on the page. */
  loading?: ImageProps["loading"];
  /** A click anywhere on the card opens the page (the home page's row);
      otherwise the photo, the name and the arrow do. */
  linked?: boolean;
  /** The home page's row animates itself; other rows reveal their cards. */
  "data-reveal"?: Reveal;
};

/** "Frequently Booked Tests" card (also "Other Tests You May Need"). */
export function TestCard({
  name,
  reportDelivery,
  price,
  originalPrice,
  image,
  href,
  loading,
  linked = false,
  "data-reveal": reveal,
}: TestCardProps) {
  // Covering the 86×82 frame, the photo is drawn about 118px wide.
  const photo = <Image src={image} alt="" fill sizes="118px" loading={loading} className={styles.image} />;
  const arrow = <Icon name="arrowOutwardCircle" />;

  return (
    <article className={cx(styles.card, linked && styles.linked)} data-motion="card" data-reveal={reveal}>
      {/* A linked card is one link (its name's, stretched over the card), so
          its photo and arrow are only pictures. Otherwise they are links too;
          keyboards and screen readers skip the photo's, which repeats the name's. */}
      <div className={styles.top}>
        {linked ? (
          <div className={styles.media} data-motion="card-media">
            {photo}
          </div>
        ) : (
          <Link href={href} tabIndex={-1} aria-hidden className={styles.media} data-motion="card-media">
            {photo}
          </Link>
        )}
        {linked ? (
          <span className={styles.open} aria-hidden>
            {arrow}
          </span>
        ) : (
          <Link href={href} aria-label={`View ${name.replace("\n", " ")}`} className={styles.open}>
            {arrow}
          </Link>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={href} className={cx(styles.nameLink, linked ? styles.stretched : "tap-area")}>
            {name}
          </Link>
        </h3>
        <ReportDelivery time={reportDelivery} />
        <PriceTag price={price} originalPrice={originalPrice} strikeTone="placeholder" />
      </div>
    </article>
  );
}
