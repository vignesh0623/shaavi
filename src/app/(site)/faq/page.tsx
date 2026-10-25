import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { FaqList, MedicalNotice } from "@/components/sections/faq";
import { PageIntro } from "@/components/sections/shared";
import { faqIntro, faqs } from "@/content/faq";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about blood testing, appointments, results and laboratory services at Shaavi Healthcare.",
};

export default function FaqPage() {
  return (
    <PageTransition>
      <main className={styles.page}>
        <PageIntro icon="messageQuestion" {...faqIntro} />
        <FaqList items={faqs} className={styles.list} />
        <MedicalNotice className={styles.notice} />
      </main>
    </PageTransition>
  );
}
