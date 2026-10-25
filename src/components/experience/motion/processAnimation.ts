import {
  gsap,
  query,
  queryAll,
  revealOnce,
  SETTLE,
  type Cleanup,
  type MotionContext,
} from "./shared";

const SVG_NS = "http://www.w3.org/2000/svg";

type Box = { top: number; bottom: number; cx: number };

/**
 * One path per hand-off: from below a step's number, along the gap under
 * its card, to just above the next number (they alternate sides).
 */
function connectorPaths(list: HTMLElement, steps: HTMLElement[]) {
  const origin = list.getBoundingClientRect();
  const box = (element: Element): Box => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top - origin.top,
      bottom: rect.bottom - origin.top,
      cx: rect.left + rect.width / 2 - origin.left,
    };
  };

  const rows = steps.map(box);
  const numbers = steps.map((step) => box(query(step, "step-number") ?? step));

  return rows.slice(1).map((row, i) => {
    const from = numbers[i];
    const to = numbers[i + 1];
    const gap = (rows[i].bottom + row.top) / 2;
    const start = from.bottom + 10;
    const end = to.top - 10;
    const direction = Math.sign(to.cx - from.cx) || 1;
    const r = Math.max(0, Math.min(14, Math.abs(to.cx - from.cx) / 2, gap - start, end - gap));
    return [
      `M ${from.cx} ${start}`,
      `L ${from.cx} ${gap - r}`,
      `Q ${from.cx} ${gap} ${from.cx + direction * r} ${gap}`,
      `L ${to.cx - direction * r} ${gap}`,
      `Q ${to.cx} ${gap} ${to.cx} ${gap + r}`,
      `L ${to.cx} ${end}`,
    ].join(" ");
  });
}

/**
 * Line linking the steps, drawn progressively as they scroll past. It sits
 * behind the cards and is purely decorative.
 */
function connectingLine(list: HTMLElement, steps: HTMLElement[], reduce: boolean): Cleanup {
  if (steps.length < 2) return;

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("data-motion", "process-line");
  const paths = steps.slice(1).map(() => svg.appendChild(document.createElementNS(SVG_NS, "path")));
  list.prepend(svg);

  const progress = { value: reduce ? 1 : 0 };
  let lengths: number[] = [];

  const draw = () => {
    const share = progress.value * paths.length;
    paths.forEach((path, i) => {
      const drawn = Math.min(1, Math.max(0, share - i));
      path.style.strokeDashoffset = String(lengths[i] * (1 - drawn));
    });
  };

  const build = () => {
    connectorPaths(list, steps).forEach((d, i) => paths[i].setAttribute("d", d));
    lengths = paths.map((path) => path.getTotalLength());
    paths.forEach((path, i) => {
      path.style.strokeDasharray = String(lengths[i]);
    });
    draw();
  };

  build();
  const observer = new ResizeObserver(build);
  observer.observe(list);

  if (!reduce) {
    gsap.to(progress, {
      value: 1,
      ease: "none",
      onUpdate: draw,
      scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
    });
  }

  return () => {
    observer.disconnect();
    svg.remove();
  };
}

/*
 * "How It Works": as each step arrives its number fades up, its card slides
 * in from the side opposite the number and the icon settles into place.
 */
export function setupProcessAnimation({ root, reduce }: MotionContext): Cleanup {
  const section = query(root, "process");
  const list = section && query(section, "process-steps");
  if (!section || !list) return;
  const steps = queryAll(list, "step");

  steps.forEach((step, index) => {
    const number = query(step, "step-number");
    const card = query(step, "step-card");
    const icon = query(step, "step-icon");
    if (!number || !card) return;

    revealOnce(
      step,
      (timeline) => {
        if (reduce) {
          timeline.from([number, card], { opacity: 0, duration: 0.6, ...SETTLE });
          return;
        }
        // Odd steps have their number on the right, so their card comes from the left.
        const side = index % 2 ? -1 : 1;
        timeline
          .from(number, { opacity: 0, y: 18, duration: 0.9, ...SETTLE })
          .from(card, { opacity: 0, x: 36 * side, duration: 1, ...SETTLE }, 0.08);
        if (icon) {
          timeline.from(
            icon,
            { opacity: 0, scale: 0.6, rotation: -15, duration: 0.9, ease: "back.out(1.4)", ...SETTLE },
            0.3,
          );
        }
      },
      "top 82%",
    );
  });

  return connectingLine(list, steps, reduce);
}
