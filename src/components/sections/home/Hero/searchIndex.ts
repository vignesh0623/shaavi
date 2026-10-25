import { profileRoute, testCategoryRoute, testRoute } from "@/config/routes";
import { categories, frequentlyBookedTests, popularProfiles } from "@/content/home";
import {
  categoryLabels,
  categorySummary,
  DEFAULT_REPORT_DELIVERY,
  getProfile,
  getTest,
  profileEntries,
  profiles,
  profileSearchText,
  testCount,
  tests,
  testSearchText,
  type LabProfile,
  type LabTest,
  type TestCategory,
} from "@/content/tests";
import { formatPrice } from "@/lib/price";
import type { SearchCategory, SearchEntry, SearchResult, SearchSuggestions } from "./HeroSearch";

/*
 * What the hero's search lists, built on the server: the browser gets these
 * summaries rather than the whole catalogue. Kept out of the client
 * component's module so its data stays here.
 */

function summary(entry: LabTest | LabProfile) {
  return {
    slug: entry.slug,
    name: entry.name,
    category: categoryLabels[entry.categories[0]],
    price: formatPrice(entry.price),
    originalPrice: entry.originalPrice ? formatPrice(entry.originalPrice) : undefined,
    reportDelivery: entry.reportDelivery ?? DEFAULT_REPORT_DELIVERY,
  };
}

/** `image` replaces the booklet's photo (the home page keeps the design's). */
function testResult(test: LabTest, image = test.image): SearchResult {
  return { ...summary(test), kind: "tests", image, href: testRoute(test.slug) };
}

function profileResult(profile: LabProfile, image = profile.image): SearchResult {
  return {
    ...summary(profile),
    kind: "profiles",
    includes: testCount(profile),
    contents: profileEntries(profile),
    image,
    href: profileRoute(profile.slug),
  };
}

/** A category as a shortcut to its tests, with the home page's photo when it has one. */
function searchCategory(category: TestCategory): SearchCategory | undefined {
  const { count } = categorySummary(category);
  if (!count) return undefined;
  return {
    name: categoryLabels[category],
    tests: count,
    image: categories.find((card) => card.category === category)?.image,
    href: testCategoryRoute(category),
  };
}

function inBooklet<T>(entry: T | undefined, slug: string): T {
  if (!entry) throw new Error(`searchSuggestions: no "${slug}" in the booklet`);
  return entry;
}

/** Every test and profile, with the text All Tests' and Profiles' own searches look in. */
export const searchEntries: SearchEntry[] = [
  ...tests.map((test) => ({ ...testResult(test), searchText: testSearchText(test) })),
  ...profiles.map((profile) => ({ ...profileResult(profile), searchText: profileSearchText(profile) })),
];

/** Every category with tests, in the filters' order. */
export const searchCategories: SearchCategory[] = (Object.keys(categoryLabels) as TestCategory[]).flatMap(
  (category) => searchCategory(category) ?? [],
);

/** Before anything is typed: the home page's own categories, tests and profiles. */
export const searchSuggestions: SearchSuggestions = {
  categories: categories.flatMap(({ category }) => searchCategory(category) ?? []),
  tests: frequentlyBookedTests.map(({ kind, slug, image }) =>
    kind === "tests"
      ? testResult(inBooklet(getTest(slug), slug), image)
      : profileResult(inBooklet(getProfile(slug), slug), image),
  ),
  profiles: popularProfiles.map(({ slug, image }) => profileResult(inBooklet(getProfile(slug), slug), image)),
};
