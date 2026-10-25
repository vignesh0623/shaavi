import { ProfileCard } from "@/components/cards";
import { profileCardProps } from "@/components/cards/fromCatalogue";
import { ShowcaseSection } from "@/components/sections/shared";
import { routes } from "@/config/routes";
import { popularProfiles, showcaseDescription } from "@/content/home";
import { getProfile } from "@/content/tests";
import styles from "./PopularProfiles.module.css";

export function PopularProfiles() {
  return (
    <ShowcaseSection
      id="profiles"
      tone="tinted"
      title={"Popular\nTest Profiles"}
      description={showcaseDescription}
      action={{ label: "See All Profiles", href: routes.profiles }}
      equalHeights
      className={styles.section}
    >
      {popularProfiles.map(({ slug, image }) => {
        const profile = getProfile(slug);
        if (!profile) throw new Error(`popularProfiles: no profile "${slug}" in the booklet`);
        return <ProfileCard key={slug} {...profileCardProps(profile, image)} />;
      })}
    </ShowcaseSection>
  );
}
