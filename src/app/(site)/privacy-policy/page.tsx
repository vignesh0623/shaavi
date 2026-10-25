import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { LegalDocument } from "@/components/sections/legal";
import { PageIntro } from "@/components/sections/shared";
import { privacyPolicy } from "@/content/legal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Shaavi Healthcare collects, uses, shares and protects personal and health data, and your data protection rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
      <main className={styles.page}>
        <PageIntro icon="packageCheck" {...privacyPolicy.intro} />
        <LegalDocument content={privacyPolicy} className={styles.document} />
      </main>
    </PageTransition>
  );
}
