import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { LegalDocument } from "@/components/sections/legal";
import { PageIntro } from "@/components/sections/shared";
import { cookiePolicy } from "@/content/legal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Shaavi Healthcare uses cookies and similar technologies on its website, and how to manage your cookie choices.",
};

export default function CookiePolicyPage() {
  return (
    <PageTransition>
      <main className={styles.page}>
        <PageIntro icon="packageCheck" {...cookiePolicy.intro} />
        <LegalDocument content={cookiePolicy} className={styles.document} />
      </main>
    </PageTransition>
  );
}
