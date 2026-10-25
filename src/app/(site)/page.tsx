import { ScrollExperience } from "@/components/experience";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import {
  AboutPreview,
  FrequentlyBookedTests,
  Hero,
  HowItWorks,
  PopularProfiles,
} from "@/components/sections/home";
import { CallToAction } from "@/components/sections/shared";
import styles from "./page.module.css";

/** Home: the static design, with scroll animations and a 3D backdrop layered on. */
export default function HomePage() {
  return (
    <PageTransition>
      <ScrollExperience page="home">
        <Hero />
        <HowItWorks />
        <PopularProfiles />
        <AboutPreview />
        <FrequentlyBookedTests />
        <CallToAction className={styles.cta} decorLoading="eager" />
      </ScrollExperience>
    </PageTransition>
  );
}
