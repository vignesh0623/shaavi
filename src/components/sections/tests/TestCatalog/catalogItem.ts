import { DEFAULT_REPORT_DELIVERY, type LabProfile, type LabTest } from "@/content/tests";
import type { CatalogItem } from "./TestCatalog";

/**
 * A test or profile as the listing grid needs it, with the link, search text
 * and (for a profile) test count the page gives it. Kept out of the client
 * component's module so pages can call it on the server.
 */
export function toCatalogItem(
  entry: LabTest | LabProfile,
  extra: Pick<CatalogItem, "href" | "searchText" | "includes">,
): CatalogItem {
  return {
    slug: entry.slug,
    name: entry.name,
    description: entry.description,
    price: entry.price,
    originalPrice: entry.originalPrice,
    categories: entry.categories,
    image: entry.image,
    reportDelivery: entry.reportDelivery ?? DEFAULT_REPORT_DELIVERY,
    ...extra,
  };
}
