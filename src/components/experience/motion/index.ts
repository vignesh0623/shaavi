import type { ExperiencePage } from "../pages";
import type { SceneState } from "../sceneState";
import { setupAboutMotion } from "./aboutMotion";
import { setupCardRow } from "./cardRowMotion";
import { setupCommitmentMotion } from "./commitmentMotion";
import { setupCtaMotion } from "./ctaMotion";
import { setupDirectorMotion } from "./directorMotion";
import { setupHeroMotion } from "./heroMotion";
import { setupLaboratoryMotion } from "./laboratoryMotion";
import { setupProcessAnimation } from "./processAnimation";
import { setupSceneTimeline } from "./sceneTimeline";
import { gsap, queryAll, ScrollTrigger, type Cleanup, type MotionContext } from "./shared";
import { setupStatementMotion } from "./statementMotion";

/** Each page's animations, section by section from the top. */
const PAGES: Record<ExperiencePage, (motion: MotionContext) => Cleanup[]> = {
  home: (motion) => [
    setupSceneTimeline(motion, queryAll(motion.root, "about")),
    setupHeroMotion(motion),
    setupProcessAnimation(motion),
    setupCardRow("profiles", motion),
    setupAboutMotion(motion),
    setupCardRow("tests", motion, { fromSide: true }),
    setupCtaMotion(motion),
  ],
  about: (motion) => [
    setupSceneTimeline(motion, queryAll(motion.root, "director")),
    setupHeroMotion(motion),
    setupStatementMotion(motion),
    setupDirectorMotion(motion),
    setupLaboratoryMotion(motion),
    setupCommitmentMotion(motion),
    setupCtaMotion(motion),
  ],
  // All Tests and Profiles: the camera eases in past the intro and the
  // closing call to action gathers its halo. The cards animate themselves as
  // they load.
  catalog: (motion) => [setupSceneTimeline(motion, []), setupCtaMotion(motion)],
};

/**
 * Sets up a page's scroll animations and returns a function that removes
 * them all (inline styles, triggers, added elements). Everything is rebuilt
 * when a breakpoint or the reduced-motion preference changes.
 */
export function setupPageMotion(page: ExperiencePage, root: HTMLElement, state: SceneState) {
  const media = gsap.matchMedia();

  media.add(
    {
      // Always true, so the setup runs at every width.
      any: "all",
      reduce: "(prefers-reduced-motion: reduce)",
      wide: "(min-width: 1340px)",
      desktop: "(min-width: 1200px)",
    },
    (context) => {
      const { reduce = false, wide = false, desktop = false } = context.conditions ?? {};
      const cleanups = PAGES[page]({ root, state, reduce, wide, desktop });
      return () => cleanups.forEach((cleanup) => cleanup?.());
    },
  );

  // Web fonts can reflow text after load; re-measure trigger positions then.
  let active = true;
  document.fonts?.ready.then(() => active && ScrollTrigger.refresh());

  // So can content that grows after load (All Tests adds cards as you
  // scroll), moving every trigger below it.
  let height = root.offsetHeight;
  let refreshTimer = 0;
  const resizeObserver = new ResizeObserver(() => {
    if (root.offsetHeight === height) return;
    height = root.offsetHeight;
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  resizeObserver.observe(root);

  return () => {
    active = false;
    resizeObserver.disconnect();
    window.clearTimeout(refreshTimer);
    media.revert();
  };
}
