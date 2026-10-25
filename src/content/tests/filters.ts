/*
 * Filters on All Tests and Profiles. Kept apart from the catalogue so the
 * client component that filters the page can import them without the data.
 */

/** The two listings: single tests and profiles. */
export type CatalogKind = "tests" | "profiles";

export const categoryLabels = {
  "general-wellness": "General Wellness",
  "mens-health": "Men’s Health",
  "womens-health": "Women’s Health",
  allergy: "Allergy",
  fertility: "Fertility",
  // No chips of their own in the design; their tests show under "All" (a
  // link to one adds its chip while chosen), and the home page's Hormones
  // card links to that category.
  "sexual-health": "Sexual Health",
  hormones: "Hormones",
  "cancer-markers": "Cancer Markers",
} as const;

export type TestCategory = keyof typeof categoryLabels;

/** Category chips after "All", in the design's order. */
export const filterCategories: TestCategory[] = [
  "general-wellness",
  "mens-health",
  "womens-health",
  "allergy",
  "fertility",
];

export type PriceRange = { slug: string; label: string; min?: number; max?: number };

/** Options of each listing's "Filter By" menu; `min` is included, `max` is not. */
export const priceRanges: Record<CatalogKind, PriceRange[]> = {
  // Single tests cost £15–£90.
  tests: [
    { slug: "under-25", label: "Under £25", max: 25 },
    { slug: "25-49", label: "£25 – £49", min: 25, max: 50 },
    { slug: "50-74", label: "£50 – £74", min: 50, max: 75 },
    { slug: "75-plus", label: "£75 and above", min: 75 },
  ],
  profiles: [
    { slug: "under-50", label: "Under £50", max: 50 },
    { slug: "50-99", label: "£50 – £99", min: 50, max: 100 },
    { slug: "100-199", label: "£100 – £199", min: 100, max: 200 },
    { slug: "200-plus", label: "£200 and above", min: 200 },
  ],
};

export function inPriceRange(price: number, { min = 0, max = Infinity }: PriceRange) {
  return price >= min && price < max;
}

type Sortable = { name: string; price: number };

export type SortOption = {
  slug: string;
  label: string;
  compare: (a: Sortable, b: Sortable) => number;
};

/** Options of the "Sort By" menu; without one, the listing keeps the booklet's order. */
export const sortOptions: SortOption[] = [
  { slug: "price-asc", label: "Price: Low to High", compare: (a, b) => a.price - b.price },
  { slug: "price-desc", label: "Price: High to Low", compare: (a, b) => b.price - a.price },
  { slug: "name", label: "Name: A to Z", compare: (a, b) => a.name.localeCompare(b.name) },
];
