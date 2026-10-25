import { countOnce } from "./counter";
import { query, queryAll, revealOnce, SETTLE, type Cleanup, type MotionContext } from "./shared";

/*
 * About, leadership statement: the statement fades up, then the highlights
 * panel rises with its three highlights arriving one after another, and the
 * one with a number ("200+ tests & profiles") counts up once.
 */
export function setupStatementMotion({ root, reduce }: MotionContext): Cleanup {
  const section = query(root, "statement");
  if (!section) return;
  const text = query(section, "statement-text");
  const panel = query(section, "highlights");

  if (text) {
    revealOnce(text, (timeline) =>
      timeline.from(
        text,
        reduce ? { opacity: 0, duration: 0.6, ...SETTLE } : { opacity: 0, y: 28, duration: 1.1, ...SETTLE },
      ),
    );
  }

  if (!panel) return;
  revealOnce(panel, (timeline) => {
    if (reduce) {
      timeline.from(panel, { opacity: 0, duration: 0.6, ...SETTLE });
      return;
    }
    timeline
      .from(panel, { opacity: 0, y: 32, duration: 1, ...SETTLE })
      .from(queryAll(panel, "highlight"), { opacity: 0, y: 18, duration: 0.9, stagger: 0.12, ...SETTLE }, 0.15);
  });

  // Counts as its highlight arrives.
  return countOnce(panel, queryAll(panel, "highlight-title"), reduce, { delay: 0.3 });
}
