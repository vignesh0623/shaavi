import { gsap, query, queryAll, ScrollTrigger, type Cleanup, type MotionContext } from "./shared";

/*
 * The hero's copy, search and cards never move. The design's floating cell
 * renders drift gently and lag behind as the hero scrolls away, adding depth
 * in front of the 3D layer; portraits (About) sink a little less, so they
 * read as nearer. At the top of the page everything is exactly where the
 * design puts it.
 *
 * The renders are moved one by one: transforming their container would
 * isolate their luminosity blending from the page and change their colour.
 */
export function setupHeroMotion({ root, reduce }: MotionContext): Cleanup {
  const hero = query(root, "hero");
  if (reduce || !hero) return;
  const scrollTrigger = { trigger: hero, start: "top top", end: "bottom top", scrub: true };

  // Anchored to the hero's bottom edge, they only ever move down into its clip.
  const portraits = queryAll(hero, "hero-portrait");
  if (portraits.length) gsap.to(portraits, { y: 60, ease: "none", scrollTrigger });

  const decor = query(hero, "hero-decor");
  if (!decor) return;
  const renders = Array.from(decor.children) as HTMLElement[];

  gsap.to(renders, { y: 140, ease: "none", scrollTrigger });

  // Each render bobs about 8px on its own slow cycle, starting from its
  // design position (yPercent, so it combines with the scroll drift above).
  // Rotation is relative: the renders keep their designed angles.
  const floats = renders.map((render, index) =>
    gsap.to(render, {
      yPercent: ((index % 2 ? 8 : -8) / Math.max(render.offsetHeight, 1)) * 100,
      rotation: index % 2 ? "+=1.5" : "-=1.5",
      duration: 4.5 + index * 0.8,
      delay: index * 0.35,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    }),
  );

  // No work while the hero is off screen.
  ScrollTrigger.create({
    trigger: hero,
    start: "top bottom",
    end: "bottom top",
    onToggle: ({ isActive }) => floats.forEach((tween) => (isActive ? tween.resume() : tween.pause())),
  });
}
