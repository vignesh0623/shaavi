"use client";

import { useEffect, useMemo, useRef, useState } from "react";
// Imported from their own modules rather than the index files, so only these
// components (and none of the test data) end up in the browser bundle.
import { CatalogCard } from "@/components/cards/CatalogCard/CatalogCard";
import { CatalogCardSkeleton } from "@/components/cards/CatalogCard/CatalogCardSkeleton";
import { Button } from "@/components/ui/Button/Button";
import { Select } from "@/components/ui/Select/Select";
import {
  categoryLabels,
  filterCategories,
  inPriceRange,
  priceRanges,
  sortOptions,
  type CatalogKind,
  type PriceRange,
  type TestCategory,
} from "@/content/tests/filters";
import { cx } from "@/lib/cx";
import { formatPrice } from "@/lib/price";
import { replaceUrlSearchParams, useUrlSearchParams } from "@/lib/urlState";
import styles from "./TestCatalog.module.css";

/** What the grid needs of a test or profile; the page builds these from the catalogue. */
export type CatalogItem = {
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categories: TestCategory[];
  image: string;
  reportDelivery: string;
  /** The test's or profile's own page. */
  href: string;
  /** How many tests a profile includes. */
  includes?: number;
  /** Lowercase text the search looks in. */
  searchText: string;
};

/** Cards shown at first, and added each time the visitor nears the end. */
const PAGE_SIZE = 8;
/** The grid has four columns at most. */
const ROW_SIZE = 4;
/*
 * Everything is filtered in the browser, so results are instant. These
 * pauses show placeholders first, so a new search or filter reads as one.
 */
const FILTER_DELAY = 450;
const LOAD_MORE_DELAY = 700;

const FILTERS = ["q", "category", "price", "sort"];

/** What each listing calls its entries. */
const NOUNS: Record<CatalogKind, { one: string; many: string }> = {
  tests: { one: "Test", many: "Tests" },
  profiles: { one: "Profile", many: "Profiles" },
};

const sortMenu = [
  { value: "", label: "Default order" },
  ...sortOptions.map(({ slug, label }) => ({ value: slug, label })),
];

function priceMenu(ranges: PriceRange[]) {
  return [
    { value: "", label: "All prices" },
    ...ranges.map(({ slug, label }) => ({ value: slug, label })),
  ];
}

function isCategory(value: string | null): value is TestCategory {
  return value !== null && Object.hasOwn(categoryLabels, value);
}

/** The filters in the URL, as a string that changes when any of them does. */
function filterKey(params: URLSearchParams) {
  const key = new URLSearchParams();
  for (const name of FILTERS) {
    const value = params.get(name);
    if (value) key.set(name, value);
  }
  return key.toString();
}

/** The entries a filter key selects, in the chosen order. */
function selectItems(items: CatalogItem[], ranges: PriceRange[], key: string) {
  const params = new URLSearchParams(key);
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const category = params.get("category");
  const price = ranges.find(({ slug }) => slug === params.get("price"));
  const sort = sortOptions.find(({ slug }) => slug === params.get("sort"));

  const selected = items.filter(
    (item) =>
      (!isCategory(category) || item.categories.includes(category)) &&
      (!price || inPriceRange(item.price, price)) &&
      (!query || item.searchText.includes(query)),
  );
  return sort ? selected.sort(sort.compare) : selected;
}

function placeholders(count: number, pill: boolean) {
  return Array.from({ length: count }, (_, index) => (
    <li key={`placeholder-${index}`} aria-hidden>
      <CatalogCardSkeleton pill={pill} />
    </li>
  ));
}

type TestCatalogProps = {
  /** Single tests (All Tests) or profiles (Profiles). */
  kind: CatalogKind;
  items: CatalogItem[];
  className?: string;
};

/**
 * All Tests or Profiles: category chips, "Sort By" and "Filter By" menus and
 * the cards they select, eight at a time as the visitor scrolls. The filters
 * live in the URL (`?q=`, `?category=`, `?price=`, `?sort=`), so they survive
 * a reload and coming back from a test's page.
 */
export function TestCatalog({ kind, items, className }: TestCatalogProps) {
  const noun = NOUNS[kind];
  const ranges = priceRanges[kind];
  const params = useUrlSearchParams();
  const key = filterKey(params);
  const category = params.get("category");
  const activeCategory = isCategory(category) ? category : null;
  // A category with no chip in the design (the home page's Hormones card
  // links to one) gets a chip while it is chosen, so the filter shows.
  const chips =
    activeCategory && !filterCategories.includes(activeCategory)
      ? [null, ...filterCategories, activeCategory]
      : [null, ...filterCategories];

  // The results on screen are for `shownKey`; until it catches up with the
  // URL, placeholders stand in for them.
  const [shownKey, setShownKey] = useState(key);
  // Cards on screen, and whether they answer a search or filter made on the
  // page (rather than being the page's own).
  const [page, setPage] = useState({ count: PAGE_SIZE, filtered: false });
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loading = shownKey !== key;
  const results = useMemo(() => selectItems(items, ranges, shownKey), [items, ranges, shownKey]);
  const hasMore = !loading && page.count < results.length;

  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => {
      setShownKey(key);
      setPage({ count: PAGE_SIZE, filtered: true });
      setLoadingMore(false);
    }, FILTER_DELAY);
    return () => window.clearTimeout(timer);
  }, [key, loading]);

  // Nearing the end of the grid loads the next cards. Observing again after
  // each load picks up a sentinel that is still in view.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || loadingMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoadingMore(true);
      },
      { rootMargin: "0px 0px 400px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, page.count]);

  useEffect(() => {
    if (!loadingMore) return;
    const timer = window.setTimeout(() => {
      setPage(({ count, filtered }) => ({ count: count + PAGE_SIZE, filtered }));
      setLoadingMore(false);
    }, LOAD_MORE_DELAY);
    return () => window.clearTimeout(timer);
  }, [loadingMore]);

  const shown = results.slice(0, page.count);
  // Photos in the first row load straight away, and so do later copies of
  // them: they cost nothing more, and Next's dev check, which matches images
  // by URL, would otherwise flag the first row's as lazy.
  const eagerImages = new Set(results.slice(0, ROW_SIZE).map(({ image }) => image));
  const count = `${results.length} ${results.length === 1 ? noun.one : noun.many}`;
  const status = loading
    ? `Loading ${noun.many.toLowerCase()}`
    : `Showing ${shown.length} of ${count.toLowerCase()}`;

  return (
    <section className={cx(styles.catalog, className)} aria-label={noun.many} data-motion="catalog">
      <div className={styles.toolbar}>
        <div className={styles.chips} role="group" aria-label="Filter by category" data-reveal="left">
          {chips.map((slug) => {
            const active = slug === activeCategory;
            return (
              <Button
                key={slug ?? "all"}
                variant={active ? "dark" : "subtle"}
                size="sm"
                aria-pressed={active}
                onClick={() => replaceUrlSearchParams({ category: slug })}
              >
                {slug ? categoryLabels[slug] : "All"}
              </Button>
            );
          })}
        </div>
        <div className={styles.summary} data-reveal="right">
          <p className={cx(styles.count, "text-trim")}>{count}</p>
          <div className={styles.menus}>
            <Select
              aria-label={`Sort ${noun.many.toLowerCase()}`}
              placeholder="Sort By"
              options={sortMenu}
              value={params.get("sort") ?? ""}
              onChange={(sort) => replaceUrlSearchParams({ sort })}
            />
            <Select
              aria-label="Filter by price"
              placeholder="Filter By"
              options={priceMenu(ranges)}
              value={params.get("price") ?? ""}
              onChange={(price) => replaceUrlSearchParams({ price })}
            />
          </div>
        </div>
      </div>

      <div className={styles.results} aria-busy={loading || loadingMore}>
        {loading ? (
          <ul className={styles.grid} aria-hidden>
            {placeholders(PAGE_SIZE, kind === "profiles")}
          </ul>
        ) : results.length > 0 ? (
          <>
            <ul className={styles.grid}>
              {shown.map((item, index) => {
                // A search's or filter's first cards rise into place at
                // once; the others zoom in as they scroll into view, like
                // the rest of the page (RevealObserver).
                const entering = page.filtered && index < PAGE_SIZE;
                return (
                  <li
                    key={item.slug}
                    className={entering ? styles.entering : undefined}
                    // Each row's cards arrive one after another.
                    style={entering ? { animationDelay: `${(index % ROW_SIZE) * 70}ms` } : undefined}
                    data-reveal={entering ? undefined : "zoom"}
                  >
                    <CatalogCard
                      name={item.name}
                      description={item.description}
                      includes={item.includes}
                      reportDelivery={item.reportDelivery}
                      price={formatPrice(item.price)}
                      originalPrice={item.originalPrice ? formatPrice(item.originalPrice) : undefined}
                      image={item.image}
                      href={item.href}
                      loading={eagerImages.has(item.image) ? "eager" : undefined}
                    />
                  </li>
                );
              })}
              {loadingMore &&
                placeholders(Math.min(PAGE_SIZE, results.length - page.count), kind === "profiles")}
            </ul>
            {hasMore && <div ref={sentinelRef} className={styles.sentinel} />}
          </>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              No {noun.many.toLowerCase()} match your search.
            </p>
            <Button
              variant="soft"
              size="sm"
              onClick={() => replaceUrlSearchParams({ q: null, category: null, price: null, sort: null })}
            >
              Show All {noun.many}
            </Button>
          </div>
        )}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
