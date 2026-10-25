import { countOnce } from "./counter";
import { query, queryAll, revealOnce, SETTLE, type Cleanup, type MotionContext } from "./shared";

/*
 * About, director profiles: the portrait rises into place, the person's
 * head emerges above the frame, the badge follows (its "20+" counts up once)
 * and the biography fades up line by line.
 *
 * The framed photo already shows the person; the cut-out on top of it only
 * adds the part above the frame. So the two always move together (any zoom
 * or offset between them would show a double image) and only that top part
 * is revealed on its own.
 */
export function setupDirectorMotion({ root, reduce }: MotionContext): Cleanup {
  const cleanups = queryAll(root, "director").map((profile) => {
    const portrait = query(profile, "director-portrait");
    const frame = query(profile, "director-frame");
    const cutout = query(profile, "director-cutout");
    const badge = query(profile, "director-badge");
    const content = query(profile, "director-content");
    // The pill, the name and each paragraph of the biography.
    const lines = content ? Array.from(content.querySelectorAll(":scope > * > *")) : [];

    revealOnce(profile, (timeline) => {
      if (reduce) {
        timeline.from(portrait ? [portrait, ...lines] : lines, { opacity: 0, duration: 0.6, ...SETTLE });
        return;
      }
      if (portrait) timeline.from(portrait, { opacity: 0, y: 36, duration: 1, ...SETTLE }, 0);
      if (cutout && frame) {
        // Clipped at the frame's top edge to begin with, the head then
        // emerges above it.
        const overhang = frame.getBoundingClientRect().top - cutout.getBoundingClientRect().top;
        const round = `round ${getComputedStyle(cutout).borderRadius}`;
        timeline.fromTo(
          cutout,
          { clipPath: `inset(${Math.max(0, overhang)}px 0px 0px 0px ${round})` },
          {
            clipPath: `inset(0px 0px 0px 0px ${round})`,
            duration: 1.1,
            ease: "power3.out",
            clearProps: "clipPath",
          },
          0.25,
        );
      }
      if (badge) {
        timeline.from(badge, { opacity: 0, y: 14, scale: 0.94, duration: 0.8, ...SETTLE }, 0.65);
      }
      timeline.from(lines, { opacity: 0, y: 24, duration: 0.9, stagger: 0.08, ...SETTLE }, 0.1);
    });

    // Counts as the badge arrives.
    const value = query(profile, "badge-value");
    return countOnce(profile, value ? [value] : [], reduce, { delay: 0.7 });
  });

  return () => cleanups.forEach((cleanup) => cleanup?.());
}
