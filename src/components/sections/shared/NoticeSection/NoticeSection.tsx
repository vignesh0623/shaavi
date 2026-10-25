import Image from "next/image";
import { Button, Pill } from "@/components/ui";
import { routes } from "@/config/routes";
import type { IconName } from "@/constants/icons";
import { images } from "@/constants/images";
import styles from "./NoticeSection.module.css";

type NoticeSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: IconName;
  action?: { label: string; href: string };
};

/** Page-top message band, used by coming-soon and not-found pages. */
export function NoticeSection({
  eyebrow,
  title,
  description,
  icon = "packageCheck",
  action = { label: "Back To Home", href: routes.home },
}: NoticeSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="notice-title">
      <Image
        src={images.about.heroGlow}
        alt=""
        width={2696}
        height={1886}
        loading="eager"
        className={styles.glow}
      />
      <div className={styles.content}>
        <Pill icon={icon} data-reveal="top">
          {eyebrow}
        </Pill>
        <h1 id="notice-title" className={styles.title} data-reveal="left">
          {title}
        </h1>
        <p className={styles.text} data-reveal="right">
          {description}
        </p>
        <Button href={action.href} variant="primary" size="md" icon="arrow" data-reveal="bottom">
          {action.label}
        </Button>
      </div>
    </section>
  );
}
