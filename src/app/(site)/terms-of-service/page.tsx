import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { LegalDocument } from "@/components/sections/legal";
import { PageIntro } from "@/components/sections/shared";
import { termsOfService } from "@/content/legal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for clinical laboratory, pathology, specimen collection and diagnostic services provided by Shaavi Healthcare.",
};

export default function TermsOfServicePage() {
  return (
    <PageTransition>
      <main className={styles.page}>
        <PageIntro icon="packageCheck" {...termsOfService.intro} />
        <LegalDocument content={termsOfService} className={styles.document} />
      </main>
    </PageTransition>
  );
}
