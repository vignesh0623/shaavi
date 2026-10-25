"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
// Own modules rather than the ui index: this renders in the browser too.
import { Icon } from "@/components/ui/Icon/Icon";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { routes } from "@/config/routes";
import type { CatalogKind } from "@/content/tests/filters";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./HeroSearch.module.css";

/** An entry in a profile's list: a test, a panel or another profile. */
export type ProfileEntry = {
  name: string;
  /** How many of the profile's tests it accounts for. */
  tests: number;
  /** Every name inside a panel or profile. */
  contains: string[];
};

/** A test or profile as the panel lists it; the hero builds these on the server. */
export type SearchResult = {
  kind: CatalogKind;
  slug: string;
  name: string;
  /** Its first category's label, e.g. "General Wellness". */
  category: string;
  price: string;
  originalPrice?: string;
  reportDelivery: string;
  /** How many tests a profile includes. */
  includes?: number;
  /** A profile's list, a few of which show under its name. */
  contents?: ProfileEntry[];
  image: string;
  /** The test's or profile's own page. */
  href: string;
};

/** A result the search can find, with the lowercase text it looks in. */
export type SearchEntry = SearchResult & { searchText: string };

/** A category with tests, opening All Tests filtered by it. */
export type SearchCategory = { name: string; tests: number; image?: string; href: string };

/** What the panel shows before anything is typed. */
export type SearchSuggestions = {
  categories: SearchCategory[];
  tests: SearchResult[];
  profiles: SearchResult[];
};

type Column = {
  kind: CatalogKind;
  title: string;
  /** Every match, when it lists search results. */
  count?: number;
  items: SearchResult[];
  more?: { label: string; href: string };
};

/** Results each column lists; "See all" opens the rest on All Tests or Profiles. */
const RESULT_LIMIT = 5;
/** Included tests a profile's row names; its page lists them all. */
const PREVIEW_LIMIT = 3;
/** Space kept between the panel and the bottom of the screen. */
const SCREEN_EDGE = 16;

const NOUNS: Record<CatalogKind, { one: string; many: string }> = {
  tests: { one: "test", many: "tests" },
  profiles: { one: "profile", many: "profiles" },
};

function plural(count: number, kind: CatalogKind) {
  return `${count} ${count === 1 ? NOUNS[kind].one : NOUNS[kind].many}`;
}

/** All Tests or Profiles filtered by a search, e.g. `/tests?q=vitamin`. */
function searchRoute(kind: CatalogKind, query: string) {
  return `${routes[kind]}?${new URLSearchParams({ q: query })}`;
}

function includesQuery(name: string, query: string) {
  return name.toLowerCase().includes(query);
}

/**
 * How well an entry matches: the query at the start of its name, at a
 * word's start, inside a word, in a test a profile includes, or only in its
 * description.
 */
function rank({ name, contents }: SearchResult, query: string) {
  const index = name.toLowerCase().indexOf(query);
  if (index === 0) return 0;
  if (index > 0) return /[\s(/-]/.test(name[index - 1]) ? 1 : 2;
  const included = contents?.some(
    (entry) => includesQuery(entry.name, query) || entry.contains.some((inner) => includesQuery(inner, query)),
  );
  return included ? 3 : 4;
}

/**
 * Entries of one kind that the listing's own search would show (the query
 * anywhere in their text), best matches first.
 */
function find(entries: SearchEntry[], kind: CatalogKind, query: string): SearchResult[] {
  return entries
    .filter((entry) => entry.kind === kind && entry.searchText.includes(query))
    .map((entry) => ({ entry, rank: rank(entry, query) }))
    .sort((a, b) => a.rank - b.rank)
    .map(({ entry }) => entry);
}

/**
 * A few of what a profile includes: what matches the query first (a test
 * inside a panel by its own name), then the start of its list.
 */
function preview(contents: ProfileEntry[], query: string) {
  const picked = new Map<ProfileEntry, { name: string; matched: boolean }>();
  for (const entry of query ? contents : []) {
    if (picked.size === PREVIEW_LIMIT) break;
    const name = includesQuery(entry.name, query)
      ? entry.name
      : entry.contains.find((inner) => includesQuery(inner, query));
    if (name) picked.set(entry, { name, matched: true });
  }
  for (const entry of contents) {
    if (picked.size === PREVIEW_LIMIT) break;
    if (!picked.has(entry)) picked.set(entry, { name: entry.name, matched: false });
  }
  return [...picked.values()];
}

/** The name, with the part matching the query marked. */
function Highlighted({ text, query }: { text: string; query: string }) {
  const index = query ? text.toLowerCase().indexOf(query) : -1;
  if (index < 0) return text;
  const end = index + query.length;
  return (
    <>
      {text.slice(0, index)}
      <mark className={styles.match}>{text.slice(index, end)}</mark>
      {text.slice(end)}
    </>
  );
}

type HeroSearchProps = {
  entries: SearchEntry[];
  /** Every category with tests; the search offers those whose name matches. */
  categories: SearchCategory[];
  suggestions: SearchSuggestions;
  /** For the search bar itself. */
  className?: string;
  "data-reveal"?: Reveal;
};

/**
 * The home page's search. Typing opens a panel of the matching categories,
 * tests and profiles, each test and profile with its photo, category, report
 * time and price; while the field is empty the panel stays closed. Arrow keys
 * move through the panel and Enter opens the
 * highlighted entry; otherwise Enter shows every match on All Tests (or on
 * Profiles, when only profiles match).
 */
export function HeroSearch({
  entries,
  categories,
  suggestions,
  className,
  "data-reveal": reveal,
}: HeroSearchProps) {
  const router = useRouter();
  const baseId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  // The highlighted option; -1 leaves the field itself active.
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Set when the keyboard moves the highlight, which keeps it in view.
  const keyboardMoved = useRef(false);

  const term = query.trim().toLowerCase();
  // The panel only shows once something is typed, not on focus alone.
  const shown = open && term !== "";
  const matches = useMemo(
    () =>
      term
        ? {
            tests: find(entries, "tests", term),
            profiles: find(entries, "profiles", term),
            categories: categories.filter(({ name }) => name.toLowerCase().includes(term)),
          }
        : null,
    [entries, categories, term],
  );

  const shownCategories = matches ? matches.categories : suggestions.categories;
  const columns: Column[] = matches
    ? (["tests", "profiles"] as const).flatMap((kind) => {
        const found = matches[kind];
        if (!found.length) return [];
        const title = kind === "tests" ? "Tests" : "Profiles";
        const more =
          found.length > RESULT_LIMIT
            ? { label: `See all ${plural(found.length, kind)}`, href: searchRoute(kind, query.trim()) }
            : undefined;
        return [{ kind, title, count: found.length, items: found.slice(0, RESULT_LIMIT), more }];
      })
    : [
        {
          kind: "tests",
          title: "Frequently Booked Tests",
          items: suggestions.tests,
          more: { label: "See all tests", href: routes.tests },
        },
        {
          kind: "profiles",
          title: "Popular Test Profiles",
          items: suggestions.profiles,
          more: { label: "See all profiles", href: routes.profiles },
        },
      ];

  // Every option's link, in the order the arrow keys visit them.
  const options = [
    ...shownCategories.map(({ href }) => href),
    ...columns.flatMap(({ items, more }) => [...items.map(({ href }) => href), ...(more ? [more.href] : [])]),
  ];
  const optionId = (index: number) => `${baseId}-option-${index}`;
  const activeHref = shown && active >= 0 ? options[active] : undefined;

  const status = !matches
    ? ""
    : options.length
      ? `${plural(matches.tests.length, "tests")} and ${plural(matches.profiles.length, "profiles")} found`
      : "No tests or profiles found";

  // Opening the panel scrolls the page just enough for it to fit, never
  // past the search bar.
  useEffect(() => {
    const panel = panelRef.current;
    const root = rootRef.current;
    if (!shown || !panel || !root) return;
    const screen = window.visualViewport?.height ?? window.innerHeight;
    const overflow = panel.getBoundingClientRect().bottom + SCREEN_EDGE - screen;
    const room = root.getBoundingClientRect().top - SCREEN_EDGE;
    if (overflow <= 0 || room <= 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollBy({ top: Math.min(overflow, room), behavior: reduce ? "auto" : "smooth" });
  }, [shown]);

  // The highlighted page loads ahead, so opening it is instant.
  useEffect(() => {
    if (activeHref) router.prefetch(activeHref);
  }, [activeHref, router]);

  useEffect(() => {
    if (!keyboardMoved.current) return;
    keyboardMoved.current = false;
    if (active >= 0) document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
  });

  function close() {
    setOpen(false);
    setActive(-1);
  }

  function onQueryChange(value: string) {
    setQuery(value);
    setActive(-1);
    // Escape clears a closed field: that shouldn't reopen it.
    if (value) setOpen(true);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!shown) {
        setOpen(true);
        return;
      }
      if (!options.length) return;
      // The field sits before the first option, so the highlight cycles
      // through it.
      const step = event.key === "ArrowDown" ? 1 : -1;
      const positions = options.length + 1;
      keyboardMoved.current = true;
      setActive(((active + 1 + step + positions) % positions) - 1);
    } else if (event.key === "Enter" && activeHref) {
      event.preventDefault();
      router.push(activeHref);
    } else if (event.key === "Escape" && shown) {
      event.preventDefault();
      close();
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = query.trim();
    const onlyProfiles = matches && !matches.tests.length && matches.profiles.length > 0;
    router.push(text ? searchRoute(onlyProfiles ? "profiles" : "tests", text) : routes.tests);
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }

  // Options are numbered as they render, in the same order as `options`.
  let next = 0;
  function optionProps() {
    const index = next++;
    return {
      id: optionId(index),
      role: "option",
      "aria-selected": index === active,
      tabIndex: -1,
      prefetch: false,
      onMouseMove: () => setActive(index),
    } as const;
  }

  return (
    <div ref={rootRef} className={styles.root} onBlur={onBlur}>
      <SearchBar
        query={query}
        onQueryChange={onQueryChange}
        onSubmit={onSubmit}
        inputProps={{
          role: "combobox",
          "aria-expanded": shown,
          "aria-controls": shown ? `${baseId}-listbox` : undefined,
          "aria-autocomplete": "list",
          "aria-activedescendant": activeHref ? optionId(active) : undefined,
          onFocus: () => setOpen(true),
          onClick: () => setOpen(true),
          onKeyDown,
        }}
        className={className}
        data-reveal={reveal}
      />

      {shown && (
        // Pressing in the panel keeps focus in the field, so it stays open
        // until the click lands (Safari doesn't focus links on click).
        <div ref={panelRef} className={styles.panel} onMouseDown={(event) => event.preventDefault()}>
          <div className={styles.scroller}>
            <div
              id={`${baseId}-listbox`}
              role="listbox"
              aria-label={matches ? "Search results" : "Popular tests and profiles"}
              className={styles.listbox}
              hidden={!options.length}
            >
              {shownCategories.length > 0 && (
                <div role="group" aria-labelledby={`${baseId}-categories`} className={styles.group}>
                  <p id={`${baseId}-categories`} className={styles.heading}>
                    {matches ? "Categories" : "Browse by Category"}
                  </p>
                  <div className={styles.chips}>
                    {shownCategories.map((category) => (
                      <Link key={category.href} href={category.href} className={styles.chip} {...optionProps()}>
                        <span className={styles.chipMedia}>
                          {category.image ? (
                            <Image src={category.image} alt="" width={28} height={28} className={styles.chipImage} />
                          ) : (
                            <Icon name="testTubes" />
                          )}
                        </span>
                        <span className={styles.chipName}>
                          <Highlighted text={category.name} query={term} />
                        </span>
                        <span className={styles.chipCount}>{plural(category.tests, "tests")}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.columns}>
                {columns.map((column) => (
                  <div
                    key={column.kind}
                    role="group"
                    aria-labelledby={`${baseId}-${column.kind}`}
                    className={cx(styles.group, styles.column)}
                  >
                    <p id={`${baseId}-${column.kind}`} className={styles.heading}>
                      {column.title}
                      {column.count !== undefined && <span className={styles.count}> ({column.count})</span>}
                    </p>
                    {column.items.map((item) => (
                      <Link key={item.href} href={item.href} className={styles.result} {...optionProps()}>
                        <Image src={item.image} alt="" width={56} height={56} className={styles.thumb} />
                        <span className={styles.details}>
                          <span className={styles.name}>
                            <Highlighted text={item.name} query={term} />
                          </span>
                          <span className={styles.meta}>
                            <span className={styles.kind}>{item.kind === "tests" ? "Test" : "Profile"}</span>
                            <span>{item.category}</span>
                          </span>
                          <span className={styles.meta}>Report in {item.reportDelivery}</span>
                          {item.contents && (
                            <span className={styles.included}>
                              <span className="visually-hidden">Includes </span>
                              {preview(item.contents, term).map(({ name, matched }, index) => (
                                <span key={index} className={cx(styles.includedItem, matched && styles.matched)}>
                                  <Icon name="check" />
                                  <span className={styles.includedName}>
                                    {matched ? <Highlighted text={name} query={term} /> : name}
                                  </span>
                                </span>
                              ))}
                              {item.includes !== undefined && (
                                <span className={styles.viewAll}>
                                  View all {plural(item.includes, "tests")}
                                  <Icon name="arrowRight" />
                                </span>
                              )}
                            </span>
                          )}
                        </span>
                        <span className={styles.price}>
                          <span className={styles.current}>{item.price}</span>
                          {item.originalPrice && (
                            <s className={styles.original}>
                              <span className="visually-hidden">Was </span>
                              {item.originalPrice}
                            </s>
                          )}
                        </span>
                      </Link>
                    ))}
                    {column.more && (
                      <Link href={column.more.href} className={styles.more} {...optionProps()}>
                        {column.more.label}
                        <Icon name="arrowRight" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {!options.length && (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>No tests or profiles match “{query.trim()}”</p>
                <p className={styles.emptyText}>Check the spelling, or browse everything we offer.</p>
                <div className={styles.emptyLinks}>
                  <Link href={routes.tests} className={styles.emptyLink}>
                    All Tests
                  </Link>
                  <Link href={routes.profiles} className={styles.emptyLink}>
                    All Profiles
                  </Link>
                  <Link href={routes.contact} className={styles.emptyLink}>
                    Ask Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="visually-hidden" aria-live="polite">
        {shown ? status : ""}
      </p>
    </div>
  );
}
