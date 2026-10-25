import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { ContactSection } from "@/components/sections/contact";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about a test, a profile or a home collection? Send Shaavi Healthcare a message, email or call us.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main className={styles.page}>
        <ContactSection />
      </main>
    </PageTransition>
  );
}
