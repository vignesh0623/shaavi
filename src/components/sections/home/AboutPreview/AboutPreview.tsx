import { Button, CustomersBadge, PhotoFrame, Pill } from "@/components/ui";
import { routes } from "@/config/routes";
import { images } from "@/constants/images";
import { stats } from "@/content/home";
import styles from "./AboutPreview.module.css";

/** Homepage teaser for the About page. */
export function AboutPreview() {
  return (
    <section className={styles.section} aria-labelledby="about-preview-title" data-motion="about">
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.intro}>
            {/* From 768px its frame is narrow and tall, so the photo is
                drawn at least 416px wide. */}
            <PhotoFrame
              src={images.home.labResearch}
              alt="Scientist preparing blood samples in the laboratory"
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(50vw + 32px), (max-width: 1199px) calc(50vw - 72px), 416px"
              className={styles.photo}
              data-motion="about-photo"
            />
            <div className={styles.content} data-motion="about-content">
              <div className={styles.heading}>
                <Pill dot>About Us</Pill>
                <h2 id="about-preview-title" className={styles.title}>
                  About Shaavi Healthcare
                </h2>
              </div>
              <div className={styles.copy}>
                <p>
                  At Shaavi, we provide accurate, timely, and reliable diagnostic services
                  using advanced technology and expert professionals, ensuring precision,
                  quality, and exceptional patient care.
                </p>
                <p>
                  From routine health check-ups to specialized tests, we deliver fast,
                  accurate results with a commitment to quality and patient care.
                </p>
              </div>
              <Button href={routes.about} variant="dark" size="md" icon="arrow">
                Know More About Us
              </Button>
            </div>
          </div>

          <ul className={styles.stats} data-motion="stats">
            {stats.map((stat) => (
              <li key={stat.value} className={styles.stat}>
                <p className={styles.statValue} data-motion="stat-value">
                  {stat.value}
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.aside} data-motion="about-aside">
          <PhotoFrame
            src={images.home.microscope}
            alt="Laboratory microscope"
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1199px) calc(100vw - 144px), 399px"
            className={styles.tallPhoto}
          />
          <CustomersBadge className={styles.badge} />
        </div>
      </div>
    </section>
  );
}
