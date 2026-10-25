import Image from "next/image";
import { CategoryCard, ViewAllCategoriesCard } from "@/components/cards";
import { Button, Pill } from "@/components/ui";
import { images } from "@/constants/images";
import { routes, testCategoryRoute } from "@/config/routes";
import { categories, categoryReveal, type Category } from "@/content/home";
import { categorySummary } from "@/content/tests";
import { formatPrice } from "@/lib/price";
import styles from "./Hero.module.css";
import { HeroSearch } from "./HeroSearch";
import { searchCategories, searchEntries, searchSuggestions } from "./searchIndex";

/**
 * Where a category card leads and what it reveals on hover: the category on
 * All Tests, or the contact page while it has no tests.
 */
function categoryLink({ category }: Category) {
  const { count, from } = categorySummary(category);
  if (from === undefined) {
    return {
      href: routes.contact,
      summary: categoryReveal.emptySummary,
      action: categoryReveal.emptyAction,
    };
  }
  return {
    href: testCategoryRoute(category),
    summary: `${count} ${count === 1 ? "test" : "tests"} · from ${formatPrice(from)}`,
    action: categoryReveal.action,
  };
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-motion="hero">
      {/* The glow and the renders are clipped to the hero on their own, so
          the search's panel can reach past its bottom edge. */}
      <div className={styles.clip} aria-hidden>
        <Image
          src={images.home.heroGlow}
          alt=""
          width={2606}
          height={1886}
          loading="eager"
          className={styles.glow}
          data-motion="hero-glow"
        />
      </div>

      <div className={styles.content} data-motion="hero-content">
        <div className={styles.intro}>
          <Pill icon="packageCheck" data-reveal="top">
            Secure Specimen Handling Delivery
          </Pill>
          <h1 id="hero-title" className={styles.title} data-reveal="left">
            We Provide Reliable &amp; High-
            <br />
            Quality Clinical Services
          </h1>
          <p className={styles.subtitle} data-reveal="right">
            Shaavi Healthcare makes private blood testing simple and accessible across
            the UK through our years of expertise &amp; great team
          </p>
        </div>
        <div className={styles.actions}>
          <HeroSearch
            entries={searchEntries}
            categories={searchCategories}
            suggestions={searchSuggestions}
            className={styles.search}
            data-reveal="bottom"
          />
          {/* <Button href="#" variant="soft" size="lg" icon="download" data-reveal="bottom">
            Download Report
          </Button> */}
        </div>
      </div>

      {/* The cards, not their list items, slide in: below 1200px the row
          snaps to the items' positions as it scrolls sideways. */}
      <ul className={styles.categories} data-reveal-group>
        {categories.map((category) => (
          <li key={category.name}>
            <CategoryCard
              name={category.name}
              image={category.image}
              {...categoryLink(category)}
              data-reveal="right"
            />
          </li>
        ))}
        <li>
          <ViewAllCategoriesCard
            images={images.categories.more}
            href={routes.tests}
            data-reveal="right"
          />
        </li>
      </ul>

      {/* Floating 3D renders, blended into the background like the design. */}
      <div className={styles.decor} aria-hidden data-motion="hero-decor">
        <Image
          src={images.decor.cellDivision}
          alt=""
          width={288}
          height={288}
          loading="eager"
          className={styles.cellDivision}
        />
        <Image
          src={images.decor.cellCluster}
          alt=""
          width={408}
          height={408}
          loading="eager"
          className={styles.cellCluster}
        />
        <Image
          src={images.decor.cellSphere}
          alt=""
          width={136}
          height={136}
          loading="eager"
          className={styles.cellSphere}
        />
        <Image
          src={images.decor.microscope}
          alt=""
          width={44}
          height={67}
          loading="eager"
          className={styles.microscope}
        />
      </div>
    </section>
  );
}
