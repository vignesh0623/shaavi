import { countOnce } from "./counter";
import {
  gsap,
  query,
  queryAll,
  revealOnce,
  SETTLE,
  type Cleanup,
  type MotionContext,
} from "./shared";

function setupStats(stats: HTMLElement, reduce: boolean): Cleanup {
  revealOnce(stats, (timeline) =>
    timeline.from(
      stats,
      reduce ? { opacity: 0, duration: 0.6, ...SETTLE } : { opacity: 0, y: 28, duration: 1, ...SETTLE },
    ),
  );
  return countOnce(stats, queryAll(stats, "stat-value"), reduce);
}

/*
 * About: the two photos drift at different speeds (each is exactly in its
 * design position when the section is centred on screen), the copy fades up
 * and the stats count up once.
 */
export function setupAboutMotion({ root, reduce, desktop }: MotionContext): Cleanup {
  const section = query(root, "about");
  if (!section) return;
  const photo = query(section, "about-photo");
  const aside = query(section, "about-aside");
  const content = query(section, "about-content");
  const stats = query(section, "stats");

  // Only while the columns sit side by side; stacked, the photos would
  // drift into their neighbours.
  if (!reduce && desktop) {
    const scrollTrigger = { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 };
    if (photo) gsap.fromTo(photo, { y: 36 }, { y: -36, ease: "none", scrollTrigger });
    if (aside) gsap.fromTo(aside, { y: 72 }, { y: -72, ease: "none", scrollTrigger });
  }

  if (content) {
    revealOnce(content, (timeline) =>
      timeline.from(
        content.children,
        reduce
          ? { opacity: 0, duration: 0.6, ...SETTLE }
          : { opacity: 0, y: 28, duration: 1, stagger: 0.1, ...SETTLE },
      ),
    );
  }

  return stats ? setupStats(stats, reduce) : undefined;
}
