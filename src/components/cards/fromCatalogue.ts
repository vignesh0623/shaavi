import { profileRoute, testRoute } from "@/config/routes";
import type { BookedTest, TestProfile } from "@/content/home";
import {
  DEFAULT_REPORT_DELIVERY,
  testCount,
  type CatalogKind,
  type LabProfile,
  type LabTest,
} from "@/content/tests";
import { formatPrice } from "@/lib/price";

/*
 * A price-booklet entry as the showcase cards show it, linking to its page.
 * `image` replaces the booklet's photo (the home page keeps the design's).
 */

export function profileCardProps(profile: LabProfile, image = profile.image): TestProfile {
  return {
    name: profile.name,
    testsIncluded: testCount(profile),
    reportDelivery: profile.reportDelivery ?? DEFAULT_REPORT_DELIVERY,
    price: formatPrice(profile.price),
    originalPrice: profile.originalPrice ? formatPrice(profile.originalPrice) : undefined,
    image,
    href: profileRoute(profile.slug),
  };
}

/** A test, or a profile (the home page's Liver Function Test), as a test card. */
export function testCardProps(
  entry: LabTest | LabProfile,
  kind: CatalogKind,
  image = entry.image,
): BookedTest {
  return {
    name: entry.name,
    reportDelivery: entry.reportDelivery ?? DEFAULT_REPORT_DELIVERY,
    price: formatPrice(entry.price),
    originalPrice: entry.originalPrice ? formatPrice(entry.originalPrice) : undefined,
    image,
    href: kind === "tests" ? testRoute(entry.slug) : profileRoute(entry.slug),
  };
}
