"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { ExperiencePage } from "../pages";
import { detectQuality } from "../quality";
import type { SceneState } from "../sceneState";
import styles from "./LaboratoryCanvas.module.css";

type LaboratoryCanvasProps = {
  /** The page element the scene measures its sections in. */
  rootRef: RefObject<HTMLElement | null>;
  page: ExperiencePage;
  state: SceneState;
};

/**
 * Decorative 3D layer behind the page. Three.js is downloaded only once the
 * browser is idle, and only on devices that should run it; everywhere else
 * the static design is shown as is.
 */
export function LaboratoryCanvas({ rootRef, page, state }: LaboratoryCanvasProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      const quality = detectQuality();
      if (!quality || cancelled) return;
      import("../scene")
        .then(({ LaboratoryScene }) => {
          if (cancelled) return;
          const scene = new LaboratoryScene({
            container: track,
            root,
            page,
            state,
            quality,
            onReady: () => track.setAttribute("data-ready", ""),
          });
          dispose = () => {
            scene.dispose();
            track.removeAttribute("data-ready");
          };
        })
        .catch(() => {
          // The static design is complete without the 3D layer.
        });
    };

    // Wait for an idle moment so the page's own content loads first.
    let cancelIdle: () => void;
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      cancelIdle = () => window.cancelIdleCallback(id);
    } else {
      const id = window.setTimeout(start, 400);
      cancelIdle = () => window.clearTimeout(id);
    }

    // Switching reduced motion on mid-visit removes the scene straight away.
    const handleMotionPreference = () => {
      if (!reducedMotion.matches) return;
      dispose?.();
      dispose = undefined;
    };
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      cancelled = true;
      cancelIdle();
      reducedMotion.removeEventListener("change", handleMotionPreference);
      dispose?.();
    };
  }, [rootRef, page, state]);

  return <div ref={trackRef} className={styles.track} aria-hidden />;
}
