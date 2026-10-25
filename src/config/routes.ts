/**
 * Every page URL in one place. Link to these instead of hard-coding paths,
 * so a page can move without hunting through components.
 */
export const routes = {
  home: "/",
  about: "/about",
  tests: "/tests",
  profiles: "/profiles",
  contact: "/contact",
  faq: "/faq",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
  cookiePolicy: "/cookie-policy",
} as const;

export type Route = (typeof routes)[keyof typeof routes];

/** A test's own page, e.g. `/tests/albumin`. */
export function testRoute(slug: string) {
  return `${routes.tests}/${slug}`;
}

/** A profile's own page, e.g. `/profiles/lipid-profile`. */
export function profileRoute(slug: string) {
  return `${routes.profiles}/${slug}`;
}

/** All Tests showing one category, e.g. `/tests?category=fertility`. */
export function testCategoryRoute(category: string) {
  return `${routes.tests}?category=${category}`;
}
