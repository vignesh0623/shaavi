import Image from "next/image";
import { Pill } from "@/components/ui";
import type { IconName } from "@/constants/icons";
import { images } from "@/constants/images";
import { cx } from "@/lib/cx";
import styles from "./PageIntro.module.css";

export type PageIntroContent = {
  /** Label of the tag above the title. */
  eyebrow: string;
  title: string;
  /** Centred text under the title; "\n" starts a new line. */
  description: string;
};

type PageIntroProps = PageIntroContent & {
  /** Icon shown in the tag. */
  icon: IconName;
  className?: string;
};

/** Page heading over a soft glow: tag, title and a short description (FAQ, legal pages). */
export function PageIntro({ eyebrow, title, description, icon, className }: PageIntroProps) {
  return (
    <header className={cx(styles.intro, className)}>
      <Image
        src={images.decor.introGlow}
        alt=""
        width={1382}
        height={1162}
        loading="eager"
        className={styles.glow}
      />
      <div className={styles.content}>
        <Pill icon={icon} data-reveal="top">
          {eyebrow}
        </Pill>
        <h1 className={styles.title} data-reveal="left">
          {title}
        </h1>
        <p className={styles.description} data-reveal="right">
          {description}
        </p>
      </div>
    </header>
  );
}
