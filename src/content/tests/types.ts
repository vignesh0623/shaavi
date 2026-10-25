import type { TestCategory } from "./filters";

/** A panel inside a profile, e.g. "Renal Function Test" and the tests in it. */
export type TestGroup = { name: string; tests: string[] };

/** Slugs of the "Other … you may need", each list in the price booklet's order. */
export type RelatedEntries = { tests?: string[]; profiles?: string[] };

/** What tests and profiles share: a card on their listing and a page of their own. */
type CatalogueEntry = {
  /** URL segment: `/tests/<slug>` or `/profiles/<slug>`. */
  slug: string;
  name: string;
  /** In pounds. */
  price: number;
  /** Struck-through price shown beside `price` when discounted. */
  originalPrice?: number;
  /** Sample tubes or types, as the price booklet lists them (e.g. "1 SST, 1 EDTA"). */
  sample?: string;
  /**
   * What the visitor provides, for "Provide a … sample". Blood whenever
   * `sample` is set; with neither, the journey doesn't name one.
   */
  specimen?: string;
  /** Short description: two lines on the listing's card, in full on the page. */
  description: string;
  /** The first is shown on the page; all of them are used by the filters. */
  categories: TestCategory[];
  /** List beside the photo: what a test measures or a profile covers. */
  measures: { title: string; items: string[] };
  goodFor: string[];
  related: RelatedEntries;
  image: string;
  /** Defaults to `DEFAULT_REPORT_DELIVERY`. */
  reportDelivery?: string;
  /*
   * Not in the price booklet yet. Each one appears among the key details as
   * soon as it is filled in.
   */
  preparation?: string;
  storage?: string;
  volume?: string;
};

/** A single test (All Tests and its own page). */
export type LabTest = CatalogueEntry & {
  /** The booklet's short name, when it differs (e.g. "TSH"); the search finds it. */
  shortName?: string;
};

/** Several tests booked together (Profiles and its own page). */
export type LabProfile = CatalogueEntry & {
  /** Every test in the profile, when the booklet lists more than `measures`. */
  includedTests?: (string | TestGroup)[];
};
