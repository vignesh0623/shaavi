import Image from "next/image";
import { InfoCard, Pill } from "@/components/ui";
import { images } from "@/constants/images";
import { contactDetails, contactIntro } from "@/content/contact";
import { cx } from "@/lib/cx";
import { ContactForm } from "../ContactForm/ContactForm";
import styles from "./ContactSection.module.css";

/**
 * Contact Us: heading and contact details beside the message form, over a
 * soft glow.
 */
export function ContactSection({ className }: { className?: string }) {
  return (
    <section className={cx(styles.section, className)} aria-labelledby="contact-title">
      <Image
        src={images.decor.contactGlow}
        alt=""
        width={1282}
        height={1196}
        loading="eager"
        className={styles.glow}
      />
      <div className={styles.inner}>
        <div className={styles.info}>
          <div className={styles.intro}>
            <Pill icon="heartHandshake" data-reveal="top">
              {contactIntro.eyebrow}
            </Pill>
            <h1 id="contact-title" className={styles.title} data-reveal="left">
              {contactIntro.title}
            </h1>
            <p className={styles.description} data-reveal="bottom">
              {contactIntro.description}
            </p>
          </div>
          <dl className={styles.details}>
            {contactDetails.map(({ icon, label, value, href }) => (
              <InfoCard
                key={label}
                variant="plain"
                data-reveal="bottom"
                icon={icon}
                label={label}
                value={
                  href ? (
                    <a href={href} className={cx(styles.link, "tap-area")}>
                      {value}
                    </a>
                  ) : (
                    value
                  )
                }
              />
            ))}
          </dl>
        </div>
        <ContactForm className={styles.form} data-reveal="right" />
      </div>
    </section>
  );
}
