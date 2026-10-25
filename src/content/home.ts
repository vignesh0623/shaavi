import type { IconName } from "@/constants/icons";
import { images } from "@/constants/images";
import type { CatalogKind, TestCategory } from "./tests";

/*
 * Homepage content, copied verbatim from the Figma design
 * ("Enhancement Tracker - September 2026" › Homepage - Light Blue).
 * Site-wide links and contact details live in src/config.
 */

/** `category`: the All Tests category the card opens. */
export type Category = { name: string; image: string; category: TestCategory };

export const categories: Category[] = [
  { name: "Men’s Health", image: images.categories.mensHealth, category: "mens-health" },
  { name: "Women’s Health", image: images.categories.womensHealth, category: "womens-health" },
  { name: "Allergy", image: images.categories.allergy, category: "allergy" },
  { name: "Hormones", image: images.categories.hormones, category: "hormones" },
  { name: "Fertility", image: images.categories.fertility, category: "fertility" },
];

/**
 * Revealed when a category card is hovered or focused, under a summary such
 * as "6 tests · from £50.00". A category with no tests yet offers contact.
 */
export const categoryReveal = {
  action: "View Tests",
  emptySummary: "Ask us about these tests",
  emptyAction: "Contact Us",
};

export type Step = { title: string; description: string; icon: IconName };

export const steps: Step[] = [
  {
    title: "Get Your Lab Order or Kit",
    description: "Obtain a physician order  or lab kit",
    icon: "medicalKit",
  },
  {
    title: "Book Your Appointment",
    description: "Choose a convinient date & time",
    icon: "calendarCheck",
  },
  {
    title: "We Come To You",
    description: "A trained professional performs your collection.",
    icon: "ambulance",
  },
  {
    title: "We Deliver Your Specimen",
    description: "Secure transport to your preferred laboratory or carrier",
    icon: "medicalReport",
  },
];

export type TestProfile = {
  name: string;
  testsIncluded: number;
  reportDelivery: string;
  price: string;
  /** Struck-through price beside `price`, when the profile is discounted. */
  originalPrice?: string;
  image: string;
  href: string;
};

/** A price-booklet entry the home page shows, by slug. `image` keeps the
    design's photo where it shows the same thing; otherwise the catalogue's. */
export type FeaturedEntry = { slug: string; image?: string };

/**
 * "Popular Test Profiles": booklet profiles, so each card's name, price and
 * test count match the page it opens. Figma's Alcohol Profile isn't in the
 * booklet; General Biochemistry takes its place.
 */
export const popularProfiles: FeaturedEntry[] = [
  { slug: "general-biochemistry" },
  { slug: "lipid-profile", image: images.profiles.lipid },
  { slug: "thyroid-profile", image: images.profiles.thyroid },
  { slug: "vitamins", image: images.profiles.vitaminD },
  { slug: "renal-function-test", image: images.profiles.kidney },
];

export type BookedTest = {
  /** Use "\n" where the design breaks the name onto a second line. */
  name: string;
  reportDelivery: string;
  price: string;
  /** Struck-through price beside `price`, when the test is discounted. */
  originalPrice?: string;
  image: string;
  href: string;
};

/**
 * "Frequently Booked Tests": booklet entries (Liver Function Test is one of
 * its profiles). Figma's Malarial Antigen PCR isn't in the booklet; the
 * Vitamin D test takes its place.
 */
export const frequentlyBookedTests: (FeaturedEntry & { kind: CatalogKind })[] = [
  { kind: "tests", slug: "glycated-haemoglobin-hba1c", image: images.tests.hba1c },
  { kind: "tests", slug: "full-blood-count", image: images.tests.completeBloodCount },
  { kind: "profiles", slug: "liver-function-test", image: images.tests.liverFunction },
  { kind: "tests", slug: "vitamin-d" },
  { kind: "tests", slug: "glucose", image: images.tests.fastingBloodSugar },
];

export const showcaseDescription =
  "With our easy finger-prick blood tests, you can investigate key areas of your health that directly impact your wellbeing.";

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "10K+", label: "Customers\nServed" },
  { value: "100+", label: "Medical\nProfessionals" },
  { value: "200+", label: "Diagnostic\nTests & Profiles" },
  { value: "98%", label: "Customer\nSatisfaction" },
];
