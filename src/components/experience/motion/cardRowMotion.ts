import { query, queryAll, revealOnce, SETTLE, type Cleanup, type MotionContext } from "./shared";

type CardRowOptions = {
  /** Cards slide in from the side (Frequently Booked Tests) rather than from below. */
  fromSide?: boolean;
};

/*
 * Popular Test Profiles and Frequently Booked Tests: cards arrive one after
 * another while their photos settle from a slight zoom. Every card stays a
 * normal link/button throughout; hover effects live in CSS.
 */
export function setupCardRow(
  sectionId: string,
  { root, reduce, wide }: MotionContext,
  { fromSide = false }: CardRowOptions = {},
): Cleanup {
  const section = root.querySelector<HTMLElement>(`#${sectionId}`);
  const row = section && query(section, "cards");
  if (!section || !row) return;
  const cards = queryAll(row, "card");
  const images = cards.flatMap((card) => {
    const image = query(card, "card-media")?.querySelector("img");
    return image ? [image] : [];
  });

  revealOnce(row, (timeline) => {
    if (reduce) {
      timeline.from(cards, { opacity: 0, duration: 0.6, stagger: 0.08, ...SETTLE });
      return;
    }
    // Below 1340px the row scrolls sideways; moving cards up from below
    // there would briefly add a vertical scrollbar, so they slide in instead.
    const offset = fromSide || !wide ? { x: 44 } : { y: 40 };
    timeline.from(cards, { opacity: 0, ...offset, duration: 1, stagger: 0.1, ...SETTLE });
    timeline.from(
      images,
      fromSide
        ? { scale: 1.22, rotation: -4, duration: 1.2, ease: "power2.out", stagger: 0.1, ...SETTLE }
        : { scale: 1.16, yPercent: 5, duration: 1.4, ease: "power2.out", stagger: 0.1, ...SETTLE },
      0.05,
    );
  });
}
