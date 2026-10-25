import type { Metadata } from "next";
import { ScrollExperience } from "@/components/experience";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { CatalogIntro, TestCatalog, toCatalogItem } from "@/components/sections/tests";
import { CallToAction } from "@/components/sections/shared";
import { testRoute } from "@/config/routes";
import { testCatalogueIntro, tests, testSearchText } from "@/content/tests";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "All Tests",
  description:
    "Browse Shaavi Healthcare’s private blood tests, with prices and what each one measures.",
};

const items = tests.map((test) =>
  toCatalogItem(test, { href: testRoute(test.slug), searchText: testSearchText(test) }),
);

/** All Tests: the design, with the home page's 3D backdrop and closing animation. */
export default function TestsPage() {
  return (
    <PageTransition>
      <ScrollExperience page="catalog">
        <CatalogIntro {...testCatalogueIntro} />
        <TestCatalog kind="tests" items={items} className={styles.catalog} />
        <CallToAction className={styles.cta} />
      </ScrollExperience>
    </PageTransition>
  );
}
