import { createSceneState } from "../sceneState";
import { gsap, query, queryAll, ScrollTrigger, type Cleanup, type MotionContext } from "./shared";

/*
 * Scroll drives the 3D scene through one continuous journey. Each segment
 * starts where the previous one ended, so scrolling back and forth never
 * makes the camera jump. `pan` is the page's centrepiece (home: About; the
 * About page: the two director profiles), which gets a slow cinematic pan.
 */
export function setupSceneTimeline({ root, state, reduce }: MotionContext, pan: HTMLElement[]): Cleanup {
  // The 3D layer doesn't run with reduced motion.
  if (reduce) return;

  const hero = query(root, "hero");
  const process = query(root, "process");
  const cta = query(root, "cta");
  const segment = { immediateRender: false };

  // Hero → How It Works: the camera eases forward and dips slightly.
  if (hero) {
    gsap.fromTo(
      state,
      { dolly: 0, tilt: 0 },
      {
        dolly: 0.8,
        tilt: -0.02,
        ease: "power1.inOut",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
      },
    );
  }

  if (process) {
    // The step object fades in with the section and out as it leaves.
    gsap
      .timeline({
        scrollTrigger: { trigger: process, start: "top 75%", end: "bottom 25%", scrub: 0.8 },
      })
      .fromTo(state, { process: 0 }, { process: 1, duration: 0.2, ease: "power2.out" })
      .to(state, { process: 1, duration: 0.6 })
      .to(state, { process: 0, duration: 0.2, ease: "power2.in" });

    // Each step swaps the object as it reaches the reading line.
    queryAll(process, "step").forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 72%",
        onEnter: () => {
          state.step = index;
        },
        onLeaveBack: () => {
          state.step = Math.max(0, index - 1);
        },
      });
    });
  }

  // The centrepiece: a slow, cinematic pan and push-in, settling back as it leaves.
  if (pan.length) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: pan[0],
          endTrigger: pan.at(-1),
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })
      .fromTo(
        state,
        { orbit: 0, dolly: 0.8, tilt: -0.02 },
        { orbit: 0.09, dolly: 1.5, tilt: 0.02, ease: "sine.inOut", ...segment },
      )
      .to(state, { orbit: 0, dolly: 0.8, tilt: -0.02, ease: "sine.inOut" });
  }

  // Final call to action: everything gathers into a soft halo around it.
  if (cta) {
    gsap.fromTo(
      state,
      { converge: 0, dolly: 0.8 },
      {
        converge: 1,
        dolly: 0.3,
        ease: "power1.inOut",
        ...segment,
        scrollTrigger: { trigger: cta, start: "top bottom", end: "clamp(center center)", scrub: 1.5 },
      },
    );
  }

  return () => Object.assign(state, createSceneState());
}
