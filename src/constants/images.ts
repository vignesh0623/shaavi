/**
 * Raster images and decorative art exported from the Figma file. Files live
 * in `public/images`:
 *   home/, about/, faq/      page-specific photos
 *   categories/, profiles/,
 *   tests/                   catalogue photos, reusable on any page
 *   avatars/, decor/         shared artwork
 * Photos are exported already framed the way the design shows them.
 */
export const images = {
  home: {
    heroGlow: "/images/home/hero-glow.svg",
    labScientist: "/images/home/lab-scientist.jpg",
    labResearch: "/images/home/lab-research.jpg",
    microscope: "/images/home/microscope.jpg",
  },
  about: {
    heroGlow: "/images/about/hero-glow.svg",
    heroScientist: "/images/about/hero-scientist.png",
    heroDoctor: "/images/about/hero-doctor.png",
    vishnuDuttPhoto: "/images/about/vishnu-dutt-photo.jpg",
    vishnuDutt: "/images/about/vishnu-dutt.png",
    shivaniPhoto: "/images/about/shivani-photo.jpg",
    shivani: "/images/about/shivani.png",
    laboratory: "/images/about/laboratory.jpg",
  },
  faq: {
    laboratory: "/images/faq/laboratory.jpg",
  },
  categories: {
    mensHealth: "/images/categories/mens-health.jpg",
    womensHealth: "/images/categories/womens-health.jpg",
    allergy: "/images/categories/allergy.jpg",
    hormones: "/images/categories/hormones.jpg",
    fertility: "/images/categories/fertility.jpg",
    more: [
      "/images/categories/more-1.jpg",
      "/images/categories/more-2.jpg",
      "/images/categories/more-3.jpg",
      "/images/categories/more-4.jpg",
      "/images/categories/more-5.jpg",
      "/images/categories/more-6.jpg",
    ],
  },
  profiles: {
    lipid: "/images/profiles/lipid.jpg",
    thyroid: "/images/profiles/thyroid.jpg",
    vitaminD: "/images/profiles/vitamin-d.jpg",
    kidney: "/images/profiles/kidney.jpg",
  },
  tests: {
    hba1c: "/images/tests/hba1c.jpg",
    completeBloodCount: "/images/tests/complete-blood-count.jpg",
    liverFunction: "/images/tests/liver-function.jpg",
    fastingBloodSugar: "/images/tests/fasting-blood-sugar.jpg",
    /** Beside the "Simple Sample Journey" on a test's page. */
    sampleJourney: "/images/tests/sample-journey.png",
  },
  /** Country flags for phone numbers' dialling codes (21 × 13). */
  flags: {
    gb: "/images/flags/gb.svg",
    in: "/images/flags/in.svg",
  },
  avatars: [
    "/images/avatars/avatar-1.png",
    "/images/avatars/avatar-2.png",
    "/images/avatars/avatar-3.png",
  ],
  decor: {
    glow: "/images/decor/glow.svg",
    /** Soft blue glow behind the FAQ and legal page intros. */
    introGlow: "/images/decor/intro-glow.svg",
    /** Flatter glow at the top of a test's page. */
    detailGlow: "/images/decor/detail-glow.svg",
    /** Glow behind the Contact Us heading and form. */
    contactGlow: "/images/decor/contact-glow.svg",
    cellSphere: "/images/decor/cell-sphere.png",
    cellCluster: "/images/decor/cell-cluster.png",
    cellDivision: "/images/decor/cell-division.png",
    microscope: "/images/decor/microscope.png",
  },
} as const;

/**
 * A test's or profile's photo, named after its slug:
 * `public/images/tests/<slug>.jpg` or `public/images/profiles/<slug>.jpg`.
 * A new entry needs only its file there.
 */
export function catalogueImage(kind: "tests" | "profiles", slug: string) {
  return `/images/${kind}/${slug}.jpg`;
}
