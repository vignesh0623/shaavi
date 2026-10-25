import Image, { type ImageProps } from "next/image";
import Link from "next/link";
// Own modules rather than the ui index: this card renders in the browser too.
import { Button } from "@/components/ui/Button/Button";
import { Pill } from "@/components/ui/Pill/Pill";
import { PriceTag } from "@/components/ui/PriceTag/PriceTag";
import { ReportDelivery } from "@/components/ui/ReportDelivery/ReportDelivery";
import { cx } from "@/lib/cx";
import styles from "./CatalogCard.module.css";

type CatalogCardProps = {
  name: string;
  /** Shown up to two lines; the test's own page has it in full. */
  description: string;
  /** How many tests a profile includes, as a pill under the description. */
  includes?: number;
  reportDelivery: string;
  price: string;
  originalPrice?: string;
  image: string;
  href: string;
  /** "eager" for cards in view as the page opens. */
  loading?: ImageProps["loading"];
};

/**
 * One test in the All Tests grid, or one profile in Profiles (with its
 * `includes` pill). Its `data-motion` hooks give it the home page cards'
 * hover (see ScrollExperience.module.css).
 */
export function CatalogCard({
  name,
  description,
  includes,
  reportDelivery,
  price,
  originalPrice,
  image,
  href,
  loading,
}: CatalogCardProps) {
  return (
    <article className={styles.card} data-motion="card">
      {/* The photo opens the page too; keyboards and screen readers use the
          name and the button, so it's left out for them. */}
      <Link href={href} tabIndex={-1} aria-hidden className={styles.media} data-motion="card-media">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 271px"
          loading={loading}
          className={styles.image}
        />
      </Link>
      <div className={styles.body}>
        <div className={styles.heading}>
          <h2 className={styles.name}>
            <Link href={href} className={cx(styles.nameLink, "tap-area")}>
              {name}
            </Link>
          </h2>
          <p className={styles.description}>{description}</p>
          {includes !== undefined && (
            <Pill size="sm">
              Including {includes} {includes === 1 ? "Test" : "Tests"}
            </Pill>
          )}
        </div>
        <ReportDelivery time={reportDelivery} />
        <PriceTag price={price} originalPrice={originalPrice} />
      </div>
      <Button
        href={href}
        variant="light"
        size="sm"
        icon="arrowSmall"
        fullWidth
        className={styles.action}
        data-motion="card-action"
      >
        View Details
        <span className="visually-hidden"> for {name}</span>
      </Button>
    </article>
  );
}
