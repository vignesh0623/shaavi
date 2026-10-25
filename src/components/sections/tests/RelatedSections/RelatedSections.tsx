import { ProfileCard, TestCard } from "@/components/cards";
import { profileCardProps, testCardProps } from "@/components/cards/fromCatalogue";
import { ShowcaseSection } from "@/components/sections/shared";
import type { CatalogKind, LabProfile, LabTest } from "@/content/tests";

type RelatedSectionsProps = {
  /** The page's own kind: its row comes first, as "Other … You May Need". */
  lead: CatalogKind;
  tests: LabTest[];
  profiles: LabProfile[];
  /** The page's own photo: cards showing it too load it straight away. */
  pageImage: string;
  /** Spaces the rows from the content above (one tinted band). */
  className?: string;
};

/**
 * The booklet's "Other … you may need" at the foot of a test's or profile's
 * page: related tests as test cards and related profiles as profile cards,
 * each row only when it has any.
 */
export function RelatedSections({ lead, tests, profiles, pageImage, className }: RelatedSectionsProps) {
  if (tests.length === 0 && profiles.length === 0) return null;

  // Next's dev check, which matches images by URL, would flag lazy copies of
  // a photo the page has already loaded.
  const loading = (image: string) => (image === pageImage ? "eager" : undefined);

  const testRow = tests.length > 0 && (
    <ShowcaseSection
      id="related-tests"
      tone="tinted"
      title={lead === "tests" ? "Other Tests You May Need" : "Related Tests"}
    >
      {tests.map((test) => (
        <TestCard
          key={test.slug}
          {...testCardProps(test, "tests")}
          loading={loading(test.image)}
          data-reveal="right"
        />
      ))}
    </ShowcaseSection>
  );

  const profileRow = profiles.length > 0 && (
    <ShowcaseSection
      id="related-profiles"
      tone="tinted"
      title={lead === "profiles" ? "Other Profiles You May Need" : "Related Profiles"}
      equalHeights
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.slug}
          {...profileCardProps(profile)}
          loading={loading(profile.image)}
          data-reveal="right"
        />
      ))}
    </ShowcaseSection>
  );

  return (
    <div className={className}>
      {lead === "tests" ? testRow : profileRow}
      {lead === "tests" ? profileRow : testRow}
    </div>
  );
}
