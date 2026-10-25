import { gsap, isOnScreen, ScrollTrigger, type Cleanup } from "./shared";

type Counter = { play: (delay: number) => void; restore: () => void };

/**
 * Counts a number like "10K+" or "20+ years" up from 0. Screen readers get
 * the final value from a visually hidden copy; when the count ends the
 * original text is put back exactly as it was.
 */
function prepareCounter(element: HTMLElement): Counter | null {
  const final = element.textContent ?? "";
  const match = final.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return null;
  const [, before, digits, after] = match;

  const shown = document.createElement("span");
  shown.setAttribute("aria-hidden", "true");
  shown.textContent = `${before}0${after}`;
  const announced = document.createElement("span");
  announced.className = "visually-hidden";
  announced.textContent = final;
  element.replaceChildren(shown, announced);

  const value = { current: 0 };
  let tween: gsap.core.Tween | undefined;
  const restore = () => {
    tween?.kill();
    element.textContent = final;
  };

  return {
    play: (delay) => {
      tween = gsap.to(value, {
        current: Number(digits),
        duration: 1.8,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          shown.textContent = `${before}${Math.round(value.current)}${after}`;
        },
        onComplete: restore,
      });
    },
    restore,
  };
}

/**
 * Counts the numbers in `values` up once, the first time `trigger` comes into
 * view (`start`), each `delay` seconds later plus a small stagger. Text without
 * a number is left alone, and so is everything when the visitor can already
 * see it or prefers reduced motion.
 */
export function countOnce(
  trigger: Element,
  values: HTMLElement[],
  reduce: boolean,
  { start = "top 85%", delay = 0.15 } = {},
): Cleanup {
  if (reduce || isOnScreen(trigger)) return;
  const counters = values.flatMap((value) => {
    const counter = prepareCounter(value);
    return counter ? [counter] : [];
  });
  if (!counters.length) return;

  ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => counters.forEach((counter, i) => counter.play(delay + i * 0.1)),
  });

  return () => counters.forEach((counter) => counter.restore());
}
