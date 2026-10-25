import type { Metadata } from "next";
import { ScrollExperience } from "@/components/experience";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import {
  AboutHero,
  DirectorProfile,
  LeadershipStatement,
  OurCommitment,
  OurLaboratory,
} from "@/components/sections/about";
import { CallToAction } from "@/components/sections/shared";
import { directors } from "@/content/about";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Shaavi Healthcare is an independent clinical diagnostic laboratory based in Hayes, London, providing reliable, accurate and accessible diagnostic services.",
};

const [vishnu, shivani] = directors;

/** About: the static design, with scroll animations and a 3D backdrop layered on. */
export default function AboutPage() {
  return (
    <PageTransition>
      <ScrollExperience page="about">
        <AboutHero />
        <LeadershipStatement className={styles.statement} />
        {/* In view on load on tall screens. */}
        <DirectorProfile {...vishnu} loading="eager" className={styles.firstDirector} />
        <DirectorProfile {...shivani} reverse className={styles.secondDirector} />
        <OurLaboratory className={styles.laboratory} />
        <OurCommitment className={styles.commitment} />
        <CallToAction className={styles.cta} />
      </ScrollExperience>
    </PageTransition>
  );
}
