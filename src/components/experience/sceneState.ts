/**
 * Values the scroll animations write and the 3D scene reads every frame.
 * It is a plain mutable object (not React state) so scrolling never
 * re-renders anything.
 */
export type SceneState = {
  /** Camera moves this far towards the scene (world units). */
  dolly: number;
  /** Camera tilt around the X axis (radians). */
  tilt: number;
  /** Camera orbit around the Y axis (radians). */
  orbit: number;
  /** 0 → 1: visibility of the "How It Works" object. */
  process: number;
  /** "How It Works" step the object shows (0–3). */
  step: number;
  /** 0 → 1: cells and particles gathering into a soft halo around the final call to action. */
  converge: number;
};

export function createSceneState(): SceneState {
  return { dolly: 0, tilt: 0, orbit: 0, process: 0, step: 0, converge: 0 };
}
