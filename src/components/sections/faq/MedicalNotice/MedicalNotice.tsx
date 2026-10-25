import { PhotoFrame } from "@/components/ui";
import { medicalNotice } from "@/content/faq";
import { cx } from "@/lib/cx";
import styles from "./MedicalNotice.module.css";

/** Photo beside the "Important Medical Information" disclaimer. */
export function MedicalNotice({ className }: { className?: string }) {
  return (
    <section className={cx(styles.notice, className)} aria-labelledby="medical-notice-title">
      <PhotoFrame
        src={medicalNotice.image}
        alt="Scientist using a microscope in the laboratory"
        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 348px"
        className={styles.photo}
        data-reveal="left"
      />
      <div className={styles.card} data-reveal="right">
        <h2 id="medical-notice-title" className={styles.title}>
          {medicalNotice.title}
        </h2>
        {medicalNotice.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
