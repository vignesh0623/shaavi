import Image from "next/image";
import { Pill } from "@/components/ui";
import { laboratory } from "@/content/about";
import { cx } from "@/lib/cx";
import styles from "./OurLaboratory.module.css";

export function OurLaboratory({ className }: { className?: string }) {
  return (
    <section
      className={cx(styles.section, className)}
      aria-labelledby="laboratory-title"
      data-motion="laboratory"
    >
      <div className={styles.row} data-motion="laboratory-row">
        <figure className={styles.media} data-motion="laboratory-media">
          {/* On narrow phones the box is tall (the quote wraps), so the
              photo is drawn up to 760px wide. */}
          <Image
            src={laboratory.image}
            alt="Scientists at work in the Shaavi Healthcare laboratory"
            fill
            sizes="(max-width: 559px) 760px, (max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 616px"
            className={styles.image}
          />
          <blockquote className={styles.quote} data-motion="laboratory-quote">
            <span className={styles.dot} aria-hidden />
            <p className={styles.quoteText}>{laboratory.quote}</p>
          </blockquote>
        </figure>

        <div className={styles.content} data-motion="laboratory-content">
          <div className={styles.heading}>
            <Pill dot>{laboratory.eyebrow}</Pill>
            <h2 id="laboratory-title" className={styles.title}>
              {laboratory.title}
            </h2>
          </div>
          <p className={styles.intro}>{laboratory.intro}</p>
          <p className={styles.body}>{laboratory.body}</p>
        </div>
      </div>
    </section>
  );
}
