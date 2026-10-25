import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneState } from "../sceneState";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** What every section's animation setup receives. */
export type MotionContext = {
  root: HTMLElement;
  state: SceneState;
  /** prefers-reduced-motion: only short fades, nothing moves. */
  reduce: boolean;
  /** ≥ 1340px: card rows sit side by side (below that they scroll sideways). */
  wide: boolean;
  /** ≥ 1200px: two-column sections (home's About, the About page's laboratory) sit side by side. */
  desktop: boolean;
};

/** Undo work GSAP doesn't track (elements added to the page, observers). */
export type Cleanup = (() => void) | void;

/** Smooth deceleration used for every reveal. */
export const EASE = "power3.out";
/** Shared settings that strip reveal styles once they're done, leaving the design untouched. */
export const SETTLE = { clearProps: "opacity,transform" } as const;

export function query<T extends HTMLElement = HTMLElement>(scope: ParentNode, name: string) {
  return scope.querySelector<T>(`[data-motion="${name}"]`);
}

export function queryAll<T extends HTMLElement = HTMLElement>(scope: ParentNode, name: string) {
  return Array.from(scope.querySelectorAll<T>(`[data-motion="${name}"]`));
}

/** Already on screen when the animations start (e.g. after a reload mid-page). */
export function isOnScreen(element: Element) {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

/**
 * Plays `build` once when `trigger` scrolls into view. Elements the visitor
 * can already see are left alone rather than hidden and replayed. Only
 * opacity and transforms are animated (never `visibility`), so content stays
 * available to screen readers and keyboard focus throughout.
 */
export function revealOnce(
  trigger: Element,
  build: (timeline: gsap.core.Timeline) => void,
  start = "top 85%",
) {
  if (isOnScreen(trigger)) return;
  build(
    gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: { trigger, start, once: true },
    }),
  );
}
