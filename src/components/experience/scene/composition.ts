import type { ExperiencePage } from "../pages";

/*
 * Where the cells rest. Each placement is a point on screen at a given
 * scroll position ("stage"), a depth and an apparent radius. The scene turns
 * it into world space, so cells sit in the page's free areas when their
 * section is in view and drift with parallax as the page scrolls.
 */

export type Rect = { x: number; y: number; width: number; height: number };

/** A section whose side margins host a few cells; `content` sets those margins. */
export type SectionBox = { section: Rect; content: Rect | null };

/** Positions on the current page, in page pixels (relative to <main>). */
export type PageLayout = {
  width: number;
  height: number;
  pageHeight: number;
  hero: Rect | null;
  heroContent: Rect | null;
  sections: SectionBox[];
  cta: Rect | null;
  ctaContent: Rect | null;
};

export type StagedPlacement = {
  /** Scroll position (page px) at which the cell sits at (x, y) on screen. */
  stage: number;
  x: number;
  y: number;
  z: number;
  /** Apparent radius in px. */
  radius: number;
};

type Slot = [x: number, y: number, z: number, radius: number];

type PageScene = {
  /** Hero slots in the page's 1440px Figma frame (y from the top of the page). */
  heroCells: Slot[];
  heroBloodCells: Slot[];
  /** The hero copy's column in the frame; slots either side stay in those margins. */
  heroColumn: [left: number, right: number];
  /**
   * Sections whose side margins host a few cells (CSS selectors, matched in
   * page order); `content`, looked up inside each, sets the margins.
   */
  sections: { section: string; content?: string }[];
  /**
   * A cell either side of each section, or (sparser) one per section on
   * alternating sides with a blood cell in every other section.
   */
  sectionCells: "both" | "alternate";
  /** Share of the device tier's particle count the page draws. */
  particleShare: number;
  /**
   * Nothing of the layer shows over the hero, which keeps only the design's
   * own cell renders; it fades in below the hero's bottom edge.
   */
  clearHero?: boolean;
};

const FRAME_WIDTH = 1440;

export const PAGE_SCENES: Record<ExperiencePage, PageScene> = {
  /*
   * Hero slots in the 1440 × 900 frame fill the gaps the design's own cell
   * renders leave free (the copy column spans x 309–1131, the category cards
   * start at y 612). The hero itself is kept as in Figma (`clearHero`), so
   * these cells show only once they drift below it as the page scrolls.
   */
  home: {
    heroCells: [
      [262, 452, 1.2, 28],
      [1302, 548, 0.8, 24],
      [252, 142, 0.4, 18],
      [1394, 122, -2, 15],
      [1420, 596, 2.4, 38],
      [468, 562, -6, 20],
      [985, 574, -7, 26],
    ],
    heroBloodCells: [
      [286, 298, 0.2, 17],
      [1182, 562, -1.5, 17],
      [1262, 150, -3, 15],
    ],
    heroColumn: [309, 1131],
    sections: [
      { section: '[data-motion="process"]', content: '[data-motion="process-content"]' },
      { section: '[data-motion="about"]' },
      { section: "#tests" },
    ],
    sectionCells: "both",
    particleShare: 1,
    clearHero: true,
  },
  /*
   * The 564px hero is already busy: two portraits (x 31–522 and 1010–1358),
   * two cell renders and the copy (x 379–1060, y 125–481). It and the
   * sections below get a sparser scene: a few hero slots in the corners and
   * below the intro, a cell per section and half the particles.
   */
  about: {
    heroCells: [
      [150, 168, 0.6, 20],
      [1168, 168, 0.4, 19],
      [1404, 430, 1.8, 26],
      [602, 540, -4, 18],
    ],
    heroBloodCells: [
      [74, 478, 0.2, 15],
      [1104, 252, -1.5, 14],
    ],
    heroColumn: [379, 1060],
    sections: [
      { section: '[data-motion="statement"]', content: '[data-motion="statement-text"]' },
      { section: '[data-motion="director"]' },
      { section: '[data-motion="laboratory"]', content: '[data-motion="laboratory-row"]' },
      { section: '[data-motion="commitment"]' },
    ],
    sectionCells: "alternate",
    particleShare: 0.5,
  },
  /*
   * All Tests and Profiles: a few cells either side of the intro (its copy
   * spans x 309–1131 and the filters start at y 353), one in each margin of
   * the grid, and a little over half the particles.
   */
  catalog: {
    heroCells: [
      [212, 172, 0.8, 24],
      [1238, 146, 0.4, 20],
      [120, 306, -2.5, 15],
      [1336, 272, 1.6, 28],
      [1166, 318, -5, 14],
    ],
    heroBloodCells: [
      [268, 278, 0.2, 15],
      [1398, 178, -1.5, 14],
    ],
    heroColumn: [309, 1131],
    sections: [{ section: '[data-motion="catalog"]' }],
    sectionCells: "both",
    particleShare: 0.6,
  },
};

/** Maps a Figma-frame x to the live viewport, keeping slots in the same margin. */
function mapHeroX(x: number, layout: PageLayout, [columnLeft, columnRight]: [number, number]) {
  const content = layout.heroContent;
  if (!content) return (x / FRAME_WIDTH) * layout.width;
  const left = content.x;
  const right = content.x + content.width;
  if (x < columnLeft) return left - (columnLeft - x) * (left / columnLeft);
  if (x > columnRight) {
    const margin = layout.width - right;
    return right + (x - columnRight) * (margin / (FRAME_WIDTH - columnRight));
  }
  return left + ((x - columnLeft) / (columnRight - columnLeft)) * content.width;
}

/** Scroll position that centres a section in the viewport. */
function centreStage(section: Rect | null, layout: PageLayout) {
  if (!section) return null;
  const max = Math.max(0, layout.pageHeight - layout.height);
  return Math.min(max, Math.max(0, section.y + section.height / 2 - layout.height / 2));
}

/** Free margin either side of a section's content (at least a sliver). */
function margins(layout: PageLayout, content: Rect | null) {
  const contentWidth = content?.width ?? Math.min(1296, layout.width - 144);
  const left = content ? content.x : (layout.width - contentWidth) / 2;
  const right = content ? layout.width - (content.x + content.width) : left;
  return { left: Math.max(left, 24), right: Math.max(right, 24) };
}

function sectionSlots(
  section: Rect | null,
  content: Rect | null,
  layout: PageLayout,
  kind: "cells" | "blood",
): StagedPlacement[] {
  const stage = centreStage(section, layout);
  if (stage === null) return [];
  const { left, right } = margins(layout, content);
  const h = layout.height;
  const w = layout.width;
  if (kind === "blood") {
    return [{ stage, x: w - right / 2, y: h * 0.42, z: 0.3, radius: 18 }];
  }
  return [
    { stage, x: left / 2, y: h * 0.3, z: 0.6, radius: Math.min(22, left / 2.4) },
    { stage, x: w - right / 2, y: h * 0.72, z: 1, radius: Math.min(26, right / 2.4) },
  ];
}

/** Interleaves lists so a lower cell count keeps a few in every section. */
function interleave<T>(groups: T[][]) {
  const out: T[] = [];
  const longest = Math.max(0, ...groups.map((group) => group.length));
  for (let i = 0; i < longest; i++) for (const group of groups) if (group[i]) out.push(group[i]);
  return out;
}

export function composeCells(
  layout: PageLayout,
  scene: PageScene,
  counts: { cells: number; bloodCells: number },
) {
  const hero = (slots: Slot[]) =>
    slots.map(([x, y, z, radius]) => ({
      stage: 0,
      x: mapHeroX(x, layout, scene.heroColumn),
      y,
      z,
      radius,
    }));

  const heroCells = hero(scene.heroCells);
  const heroBlood = hero(scene.heroBloodCells);

  const alternate = scene.sectionCells === "alternate";
  const sectionCells = layout.sections.map(({ section, content }, index) => {
    const slots = sectionSlots(section, content, layout, "cells");
    return alternate ? slots.slice(index % 2, index % 2 + 1) : slots;
  });
  const sectionBlood = layout.sections.flatMap(({ section, content }, index) =>
    alternate && index % 2 ? [] : sectionSlots(section, content, layout, "blood"),
  );

  // The hero gets the first half of the budget, then the sections take turns.
  const heroShare = Math.ceil(counts.cells / 2);
  const cells = [
    ...heroCells.slice(0, heroShare),
    ...interleave([...sectionCells, heroCells.slice(heroShare)]),
  ].slice(0, counts.cells);

  const bloodCells = interleave([heroBlood, sectionBlood]).slice(0, counts.bloodCells);

  return { cells, bloodCells };
}
