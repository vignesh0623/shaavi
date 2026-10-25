import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { Button, Pill, PriceTag, ReportDelivery } from "@/components/ui";
import type { TestProfile } from "@/content/home";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./ProfileCard.module.css";

type ProfileCardProps = TestProfile & {
  /** "eager" when the photo is already on screen elsewhere on the page. */
  loading?: ImageProps["loading"];
  /** The home page's row animates itself; other rows reveal their cards. */
  "data-reveal"?: Reveal;
};

/** "Popular Test Profiles" card (also "Other Profiles You May Need"). */
export function ProfileCard({
  name,
  testsIncluded,
  reportDelivery,
  price,
  originalPrice,
  image,
  href,
  loading,
  "data-reveal": reveal,
}: ProfileCardProps) {
  return (
    <article className={styles.card} data-motion="card" data-reveal={reveal}>
      {/* The photo opens the page too; keyboards and screen readers use the
          name and the button, so it's left out for them. */}
      <Link href={href} tabIndex={-1} aria-hidden className={styles.media} data-motion="card-media">
        <Image src={image} alt="" fill sizes="204px" loading={loading} className={styles.image} />
      </Link>
      <div className={styles.body}>
        <div className={styles.heading}>
          <h3 className={styles.name}>
            <Link href={href} className={cx(styles.nameLink, "tap-area")}>
              {name}
            </Link>
          </h3>
          <Pill size="sm">
            Including {testsIncluded} {testsIncluded === 1 ? "Test" : "Tests"}
          </Pill>
        </div>
        <ReportDelivery time={reportDelivery} />
        <PriceTag price={price} originalPrice={originalPrice} />
      </div>
      <Button href={href} variant="outline" size="sm" fullWidth data-motion="card-action">
        View Details
        <span className="visually-hidden"> for {name}</span>
      </Button>
    </article>
  );
}
