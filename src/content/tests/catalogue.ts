import type { IconName } from "@/constants/icons";
import type { TestCategory } from "./filters";
import { profiles } from "./profiles";
import { tests } from "./tests";
import type { LabProfile, LabTest } from "./types";

/*
 * Lookups over the price booklet's tests (`tests.ts`) and profiles
 * (`profiles.ts`), and the copy their listings share.
 */

/** Report time shown when a test or profile doesn't set its own (as in the design). */
export const DEFAULT_REPORT_DELIVERY = "48 hours";

export function getTest(slug: string) {
  return tests.find((test) => test.slug === slug);
}

export function getProfile(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}

/** The "Other … you may need": related tests and profiles, in the booklet's order. */
export function getRelated({ related }: LabTest | LabProfile) {
  return {
    tests: (related.tests ?? []).flatMap((slug) => getTest(slug) ?? []),
    profiles: (related.profiles ?? []).flatMap((slug) => getProfile(slug) ?? []),
  };
}

/** A profile named inside another one, e.g. "Thyroid Profile" in Wellman. */
function findProfileByName(name: string) {
  const key = name.toLowerCase();
  return profiles.find((profile) => profile.name.toLowerCase() === key);
}

/** The booklet's list of what a profile includes: its own list, or else what it measures. */
function contentsOf(profile: LabProfile) {
  return profile.includedTests ?? profile.measures.items;
}

/**
 * What a profile includes, as the booklet lists it. A panel or another
 * profile in the list comes with the tests it holds.
 */
export function profileContents(profile: LabProfile) {
  return contentsOf(profile).map((entry) => {
    if (typeof entry !== "string") return { name: entry.name, tests: entry.tests };
    const nested = findProfileByName(entry);
    if (!nested || nested === profile) return { name: entry };
    return {
      name: entry,
      tests: contentsOf(nested).map((item) => (typeof item === "string" ? item : item.name)),
    };
  });
}

/** How many tests a profile covers; a panel or another profile in it counts by its tests. */
export function testCount(profile: LabProfile): number {
  return contentsOf(profile).reduce((total, entry) => {
    if (typeof entry !== "string") return total + entry.tests.length;
    const nested = findProfileByName(entry);
    return total + (nested && nested !== profile ? testCount(nested) : 1);
  }, 0);
}

/** Every name in a profile's list, through its panels and the profiles it includes. */
function includedNames(profile: LabProfile): string[] {
  return contentsOf(profile).flatMap((entry) => {
    if (typeof entry !== "string") return [entry.name, ...entry.tests];
    const nested = findProfileByName(entry);
    return nested && nested !== profile ? [entry, ...includedNames(nested)] : [entry];
  });
}

/**
 * What a profile includes, each entry with the tests it counts for (as in
 * `testCount`) and every name inside it, through its panels and profiles.
 */
export function profileEntries(profile: LabProfile) {
  return contentsOf(profile).map((entry) => {
    if (typeof entry !== "string") {
      return { name: entry.name, tests: entry.tests.length, contains: entry.tests };
    }
    const nested = findProfileByName(entry);
    if (!nested || nested === profile) return { name: entry, tests: 1, contains: [] };
    return { name: entry, tests: testCount(nested), contains: includedNames(nested) };
  });
}

/** How many tests a category holds and its lowest price (none: no tests yet). */
export function categorySummary(category: TestCategory) {
  const prices = tests.filter((test) => test.categories.includes(category)).map(({ price }) => price);
  return { count: prices.length, from: prices.length ? Math.min(...prices) : undefined };
}

function searchWords(entry: LabTest | LabProfile, extra: string[]) {
  return [entry.name, ...extra, entry.description, ...entry.measures.items, ...entry.goodFor]
    .join(" ")
    .toLowerCase();
}

/** Lowercase text the All Tests search looks in, short name included. */
export function testSearchText(test: LabTest) {
  return searchWords(test, test.shortName ? [test.shortName] : []);
}

/** Lowercase text the Profiles search looks in, every test in the profile included. */
export function profileSearchText(profile: LabProfile) {
  return searchWords(profile, includedNames(profile));
}

type CatalogueIntro = { eyebrow: string; icon: IconName; title: string; searchPlaceholder: string };

/** All Tests heading. */
export const testCatalogueIntro: CatalogueIntro = {
  eyebrow: "All Tests",
  icon: "testTube",
  title: "Find The Right Test",
  searchPlaceholder: "Search for tests",
};

/** Profiles heading. */
export const profileCatalogueIntro: CatalogueIntro = {
  eyebrow: "All Profiles",
  icon: "testTubes",
  title: "Find The Right Profile",
  searchPlaceholder: "Search for profiles",
};
