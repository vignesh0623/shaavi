import {
  gsap,
  query,
  revealOnce,
  ScrollTrigger,
  SETTLE,
  type Cleanup,
  type MotionContext,
} from "./shared";

/*
 * Final call to action: the copy fades up, the design's floating cells drift
 * in towards the centre (landing on their design positions as the section
 * centres on screen, in step with the 3D halo) and the button gets a soft
 * pulse while the section is in view (styled in ScrollExperience.module.css).
 */
export function setupCtaMotion({ root, reduce }: MotionContext): Cleanup {
  const section = query(root, "cta");
  if (!section) return;
  const content = query(section, "cta-content");
  const decor = query(section, "cta-decor");
  const button = query(section, "cta-button");

  if (content) {
    revealOnce(
      content,
      (timeline) =>
        timeline.from(
          content.children,
          reduce
            ? { opacity: 0, duration: 0.6, ...SETTLE }
            : { opacity: 0, y: 24, duration: 1, stagger: 0.1, ...SETTLE },
        ),
      "top 80%",
    );
  }

  if (reduce) return;

  if (decor) {
    const bounds = section.getBoundingClientRect();
    const centre = bounds.left + bounds.width / 2;
    for (const cell of Array.from(decor.children)) {
      const rect = cell.getBoundingClientRect();
      const side = rect.left + rect.width / 2 < centre ? -1 : 1;
      gsap.fromTo(
        cell,
        { x: 70 * side, y: 12 },
        {
          x: 0,
          y: 0,
          ease: "power1.out",
          scrollTrigger: { trigger: section, start: "top bottom", end: "clamp(center center)", scrub: 1.5 },
        },
      );
    }
  }

  if (button) {
    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      end: "bottom top",
      onToggle: ({ isActive }) => button.toggleAttribute("data-glow", isActive),
    });
    return () => button.removeAttribute("data-glow");
  }
}
