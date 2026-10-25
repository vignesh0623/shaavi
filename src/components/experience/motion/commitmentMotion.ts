import { query, revealOnce, SETTLE, type Cleanup, type MotionContext } from "./shared";

/*
 * About, Our Commitment: the dark panel rises into place and its copy
 * follows, the lead column first, then the paragraph beside it and finally
 * the tagline.
 */
export function setupCommitmentMotion({ root, reduce }: MotionContext): Cleanup {
  const panel = query(root, "commitment");
  if (!panel) return;
  const lead = query(panel, "commitment-lead");
  const copy = [
    ...(lead ? Array.from(lead.children) : []),
    query(panel, "commitment-body"),
    query(panel, "commitment-tagline"),
  ].filter((element) => element !== null);

  revealOnce(panel, (timeline) => {
    if (reduce) {
      timeline.from(panel, { opacity: 0, duration: 0.6, ...SETTLE });
      return;
    }
    timeline
      .from(panel, { opacity: 0, y: 40, duration: 1, ...SETTLE })
      .from(copy, { opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ...SETTLE }, 0.25);
  });
}
