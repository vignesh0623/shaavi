import { StepCard } from "@/components/cards";
import { CustomersBadge, PhotoFrame, Pill } from "@/components/ui";
import { images } from "@/constants/images";
import { steps } from "@/content/home";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-it-works-title" data-motion="process">
      <div className={styles.inner}>
        <div className={styles.media} data-reveal="left">
          {/* Already in view on load on tablets and tall screens. */}
          <PhotoFrame
            src={images.home.labScientist}
            alt="Lab scientist examining a sample under a microscope"
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 594px, 523px"
            loading="eager"
            className={styles.photo}
          />
          <CustomersBadge className={styles.badge} />
        </div>

        <div className={styles.content} data-motion="process-content">
          <div className={styles.heading} data-motion="process-heading">
            <Pill dot data-reveal="top">
              Our Process
            </Pill>
            <h2 id="how-it-works-title" className={styles.title} data-reveal="right">
              How It Works
            </h2>
          </div>
          <ol className={styles.steps} data-motion="process-steps">
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                {...step}
                number={String(index + 1).padStart(2, "0")}
                reverse={index % 2 === 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
