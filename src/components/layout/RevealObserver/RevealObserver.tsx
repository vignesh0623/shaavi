"use client";

import { useEffect } from "react";

/** Time between blocks that come into view together (ms). */
const STEP = 80;
/** The last of them starts within this, however many there are: a long
    batch arrives closer together rather than dragging on (ms). */
const SPREAD = 960;
/** Blocks whose tops are this close (px) form a row, taken left to right. */
const ROW = 24;

const PENDING = "[data-reveal]:not([data-revealed])";

type Arrival = { element: HTMLElement; rect: DOMRectReadOnly };

/** The blocks in reading order: rows from the top, each row from the left. */
function readingOrder(arrivals: Arrival[]) {
  const rows: Arrival[][] = [];
  for (const arrival of [...arrivals].sort((a, b) => a.rect.top - b.rect.top)) {
    const row = rows.at(-1);
    if (row && arrival.rect.top - row[0].rect.top < ROW) row.push(arrival);
    else rows.push([arrival]);
  }
  return rows.flatMap((row) =>
    row.sort((a, b) => a.rect.left - b.rect.left).map(({ element }) => element),
  );
}

/** Whether globals.css has begun showing the page itself, as it does when the scripts are late. */
function fallbackStarted() {
  return document
    .getAnimations()
    .some(
      (animation) =>
        animation instanceof CSSAnimation &&
        animation.animationName === "reveal-fallback" &&
        (animation.effect?.getComputedTiming().progress ?? 0) > 0,
    );
}

/**
 * Plays the reveals (`data-reveal`, see lib/reveal.ts): each block arrives
 * once, as it comes into view. It watches the whole document, so it picks up
 * every new page, and cards added later, by itself.
 */
export function RevealObserver() {
  useEffect(() => {
    // Browsers without this media feature get no reveals: globals.css hides
    // nothing for them.
    if (!matchMedia("(scripting: enabled)").matches) return;
    const html = document.documentElement;

    // Already on show: hiding it again to replay it would flicker.
    if (fallbackStarted()) {
      document.querySelectorAll(PENDING).forEach((element) => {
        element.setAttribute("data-revealed", "instant");
      });
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        const arriving = new Map<Element, DOMRectReadOnly>();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          arriving.set(entry.target, entry.boundingClientRect);
        }
        // A row that scrolls sideways shows only some of its cards: the rest
        // arrive with them, so they're in place when swiped to.
        for (const element of [...arriving.keys()]) {
          element
            .closest("[data-reveal-group]")
            ?.querySelectorAll(PENDING)
            .forEach((member) => {
              if (!arriving.has(member)) arriving.set(member, member.getBoundingClientRect());
            });
        }

        const shown: Arrival[] = [];
        for (const [element, rect] of arriving) {
          intersection.unobserve(element);
          // Above the screen (going back restores a page's scroll position;
          // a quick scroll can pass a block by), so it's simply there.
          if (rect.bottom <= 0) element.setAttribute("data-revealed", "instant");
          else shown.push({ element: element as HTMLElement, rect });
        }
        const step = Math.min(STEP, SPREAD / Math.max(shown.length - 1, 1));
        readingOrder(shown).forEach((element, index) => {
          element.style.setProperty("--reveal-delay", `${Math.round(index * step)}ms`);
          element.setAttribute("data-revealed", "");
        });
      },
      // Once a block is a little way up the screen. Everything above the
      // screen counts as reached too, so none is left hidden there.
      { rootMargin: "100000px 0px -8% 0px" },
    );

    const forEachPending = (node: Node, callback: (element: Element) => void) => {
      if (!(node instanceof Element)) return;
      if (node.matches(PENDING)) callback(node);
      node.querySelectorAll(PENDING).forEach(callback);
    };
    const observe = (element: Element) => intersection.observe(element);
    const unobserve = (element: Element) => intersection.unobserve(element);

    // New blocks (and elements that become one) are watched; blocks that
    // leave the page unseen (it was left before they scrolled into view)
    // are let go of.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "attributes") forEachPending(record.target, observe);
        record.removedNodes.forEach((node) => forEachPending(node, unobserve));
        record.addedNodes.forEach((node) => forEachPending(node, observe));
      }
    });

    forEachPending(document.body, observe);
    mutations.observe(document.body, {
      childList: true,
      subtree: true,
      attributeFilter: ["data-reveal"],
    });
    // Turns off the fallback in globals.css.
    html.setAttribute("data-reveal-ready", "");

    return () => {
      intersection.disconnect();
      mutations.disconnect();
      html.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
