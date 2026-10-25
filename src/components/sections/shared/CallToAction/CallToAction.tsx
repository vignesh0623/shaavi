import Image, { type ImageProps } from "next/image";
import { Button, Pill } from "@/components/ui";
import { routes } from "@/config/routes";
import { images } from "@/constants/images";
import { cx } from "@/lib/cx";
import styles from "./CallToAction.module.css";

type CallToActionProps = {
  className?: string;
  /**
   * "eager" on a page whose hero shows the same cell renders (home): they're
   * mostly cached by then, and Next's dev LCP check matches images by URL,
   * so lazy copies here would get the hero's above-the-fold ones flagged.
   */
  decorLoading?: ImageProps["loading"];
};

/** "Book your test" banner shown above the footer. Spacing comes from the page. */
export function CallToAction({ className, decorLoading }: CallToActionProps) {
  return (
    <section
      className={cx(styles.section, className)}
      aria-labelledby="cta-title"
      data-motion="cta"
    >
      <div className={styles.glows} aria-hidden data-motion="cta-glows">
        {/* A tiny SVG, and the same file as the glow behind All Tests' intro:
            loaded straight away so Next's dev LCP check, which matches images
            by URL, doesn't flag that intro's copy as lazy. */}
        {[styles.glowTopLeft, styles.glowBottom, styles.glowRight].map((position) => (
          <Image
            key={position}
            src={images.decor.glow}
            alt=""
            width={1330}
            height={1330}
            loading="eager"
            className={cx(styles.glow, position)}
          />
        ))}
      </div>

      <div className={styles.content} data-motion="cta-content">
        <Pill icon="packageCheck">Trusted Medical Laboratory Services</Pill>
        <h2 id="cta-title" className={styles.title}>
          {/* The design's first line ends in a space that counts when centring. */}
          Fast, Accurate &amp; Reliable&nbsp;
          <br />
          Laboratory Testing
        </h2>
        <p className={styles.text}>
          Shaavi Medical Laboratory delivers precise, timely, and high-quality diagnostic
          testing with expert care and advanced technology
        </p>
        <Button
          href={routes.tests}
          variant="primary"
          size="md"
          icon="arrow"
          className={styles.button}
          data-motion="cta-button"
        >
          Book Your Test Now
        </Button>
      </div>

      <div className={styles.decor} aria-hidden data-motion="cta-decor">
        <Image
          src={images.decor.cellDivision}
          alt=""
          width={246}
          height={246}
          loading={decorLoading}
          className={styles.cellDivision}
        />
        <Image
          src={images.decor.cellSphere}
          alt=""
          width={181}
          height={181}
          loading={decorLoading}
          className={styles.cellSphereLarge}
        />
        <Image
          src={images.decor.cellSphere}
          alt=""
          width={70}
          height={70}
          loading={decorLoading}
          className={styles.cellSphereSmall}
        />
      </div>
    </section>
  );
}
