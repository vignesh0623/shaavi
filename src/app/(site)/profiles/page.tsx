import type { Metadata } from "next";
import { ScrollExperience } from "@/components/experience";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { CatalogIntro, TestCatalog, toCatalogItem } from "@/components/sections/tests";
import { CallToAction } from "@/components/sections/shared";
import { profileRoute } from "@/config/routes";
import { profileCatalogueIntro, profiles, profileSearchText, testCount } from "@/content/tests";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Test Profiles",
  description:
    "Browse Shaavi Healthcare’s health profiles: groups of blood tests booked together, with prices and every test each one includes.",
};

const items = profiles.map((profile) =>
  toCatalogItem(profile, {
    href: profileRoute(profile.slug),
    searchText: profileSearchText(profile),
    includes: testCount(profile),
  }),
);

/** Profiles: the design, with the home page's 3D backdrop and closing animation. */
export default function ProfilesPage() {
  return (
    <PageTransition>
      <ScrollExperience page="catalog">
        <CatalogIntro {...profileCatalogueIntro} className={styles.intro} />
        <TestCatalog kind="profiles" items={items} className={styles.catalog} />
        <CallToAction className={styles.cta} />
      </ScrollExperience>
    </PageTransition>
  );
}
