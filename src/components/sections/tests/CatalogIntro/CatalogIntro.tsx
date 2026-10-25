import Image from "next/image";
import { BackLink, Pill } from "@/components/ui";
import { routes } from "@/config/routes";
import type { IconName } from "@/constants/icons";
import { images } from "@/constants/images";
import { cx } from "@/lib/cx";
import { CatalogSearch } from "./CatalogSearch";
import styles from "./CatalogIntro.module.css";

type CatalogIntroProps = {
  eyebrow: string;
  /** Before the eyebrow: a test tube on All Tests, two on Profiles. */
  icon: IconName;
  title: string;
  searchPlaceholder: string;
  className?: string;
};

/** All Tests or Profiles heading over a soft glow: back arrow, tag, title and search. */
export function CatalogIntro({
  eyebrow,
  icon,
  title,
  searchPlaceholder,
  className,
}: CatalogIntroProps) {
  return (
    <header className={cx(styles.intro, className)} data-motion="hero">
      <Image
        src={images.decor.glow}
        alt=""
        width={1330}
        height={1330}
        loading="eager"
        className={styles.glow}
        data-motion="hero-glow"
      />
      <BackLink href={routes.home} className={styles.back} data-reveal="left" />
      <div className={styles.content} data-motion="hero-content">
        <Pill icon={icon} data-reveal="top">
          {eyebrow}
        </Pill>
        <h1 className={styles.title} data-reveal="left">
          {title}
        </h1>
        <CatalogSearch
          placeholder={searchPlaceholder}
          className={styles.search}
          data-reveal="bottom"
        />
      </div>
    </header>
  );
}
