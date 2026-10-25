import { routes } from "./routes";

export type NavLink = { label: string; href: string };

/** Header navigation. */
export const mainNav: NavLink[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "All Tests", href: routes.tests },
  { label: "Profiles", href: routes.profiles },
  { label: "Contact Us", href: routes.contact },
  { label: "FAQ", href: routes.faq },
];

/** Footer "Quick Links" column. */
export const footerLinks: NavLink[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Tests", href: routes.tests },
  { label: "Profiles", href: routes.profiles },
  { label: "FAQs", href: routes.faq },
  { label: "Contact Us", href: routes.contact },
];

/** Footer bottom bar. */
export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: routes.privacyPolicy },
  { label: "Terms of Service", href: routes.termsOfService },
  { label: "Cookie Policy", href: routes.cookiePolicy },
];

/** A link is active on its own page and on any page nested under it. */
export function isActiveLink(href: string, pathname: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}
