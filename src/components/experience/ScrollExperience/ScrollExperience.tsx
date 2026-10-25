"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { LaboratoryCanvas } from "../LaboratoryCanvas/LaboratoryCanvas";
import type { ExperiencePage } from "../pages";
import { createSceneState } from "../sceneState";
import styles from "./ScrollExperience.module.css";

type ScrollExperienceProps = {
  /** Which page this is: decides its animations and where the 3D cells rest. */
  page: ExperiencePage;
  children: ReactNode;
  className?: string;
};

/**
 * Page wrapper (home, About): renders the page's <main> and layers the scroll
 * animations (GSAP) and the 3D backdrop (Three.js) on top of the sections it
 * wraps. Both libraries load after the page is interactive; without them the
 * page is exactly the static design.
 */
export function ScrollExperience({ page, children, className }: ScrollExperienceProps) {
  const rootRef = useRef<HTMLElement>(null);
  // Shared with the 3D scene; mutated by scroll, never re-renders.
  const [sceneState] = useState(createSceneState);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("../motion")
      .then(({ setupPageMotion }) => {
        if (!cancelled) cleanup = setupPageMotion(page, root, sceneState);
      })
      .catch(() => {
        // The static design is complete without the animations.
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [page, sceneState]);

  return (
    <main ref={rootRef} className={cx(styles.page, className)}>
      <LaboratoryCanvas rootRef={rootRef} page={page} state={sceneState} />
      {children}
    </main>
  );
}
