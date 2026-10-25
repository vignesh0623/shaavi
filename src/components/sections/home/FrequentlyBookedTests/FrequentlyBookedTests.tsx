import { TestCard } from "@/components/cards";
import { testCardProps } from "@/components/cards/fromCatalogue";
import { ShowcaseSection } from "@/components/sections/shared";
import { routes } from "@/config/routes";
import { frequentlyBookedTests, showcaseDescription } from "@/content/home";
import { getProfile, getTest } from "@/content/tests";

export function FrequentlyBookedTests() {
  return (
    <ShowcaseSection
      id="tests"
      title={"Frequently\nBooked Tests"}
      description={showcaseDescription}
      action={{ label: "See All Tests", href: routes.tests }}
    >
      {frequentlyBookedTests.map(({ kind, slug, image }) => {
        const entry = kind === "tests" ? getTest(slug) : getProfile(slug);
        if (!entry) throw new Error(`frequentlyBookedTests: no ${kind} "${slug}" in the booklet`);
        return <TestCard key={slug} {...testCardProps(entry, kind, image)} linked />;
      })}
    </ShowcaseSection>
  );
}
