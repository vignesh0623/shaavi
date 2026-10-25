import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { ExperienceBadge, Pill } from "@/components/ui";
import type { Director } from "@/content/about";
import { cx } from "@/lib/cx";
import styles from "./DirectorProfile.module.css";

type DirectorProfileProps = Director & {
  /** Puts the portrait on the right. */
  reverse?: boolean;
  /** "eager" when the portrait can be on screen as the page opens. */
  loading?: ImageProps["loading"];
  className?: string;
};

/**
 * Leadership profile: framed photo with a cut-out portrait that rises above
 * the frame, an experience badge, and the person's biography.
 */
export function DirectorProfile({
  role,
  name,
  bio,
  photo,
  cutout,
  badge,
  reverse,
  loading,
  className,
}: DirectorProfileProps) {
  const titleId = `director-${name.toLowerCase().replace(/\s+/g, "-")}`;
  // Positions are given relative to the 400×421 frame so they scale with it.
  const geometry = {
    "--cutout-x": cutout.x,
    "--cutout-y": cutout.y,
    "--cutout-w": cutout.width,
    "--cutout-h": cutout.height,
    "--badge-x": badge.x,
    "--badge-y": badge.y,
  } as CSSProperties;

  return (
    <section
      aria-labelledby={titleId}
      className={cx(styles.profile, reverse && styles.reverse, className)}
      data-motion="director"
    >
      <div className={styles.portrait} style={geometry} data-motion="director-portrait">
        <div className={styles.frame} data-motion="director-frame">
          <Image
            src={photo}
            alt=""
            fill
            sizes="400px"
            loading={loading}
            className={styles.photo}
          />
        </div>
        <Image
          src={cutout.src}
          alt={name}
          width={cutout.width}
          height={cutout.height}
          loading={loading}
          className={cx(styles.cutout, cutout.roundedBottom && styles.cutoutRounded)}
          data-motion="director-cutout"
        />
        <ExperienceBadge
          value={badge.value}
          caption={badge.caption}
          tone={badge.tone}
          className={styles.badge}
          data-motion="director-badge"
        />
      </div>

      <div className={styles.content} data-motion="director-content">
        <div className={styles.heading}>
          <Pill dot>{role}</Pill>
          <h2 id={titleId} className={styles.name}>
            {name}
          </h2>
        </div>
        <div className={styles.bio}>
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
