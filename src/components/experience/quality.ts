/**
 * How much 3D the current device gets. Decided once, before Three.js is
 * downloaded, so phones and low-power devices never pay for the full scene.
 */
export type QualityTier = "high" | "medium" | "low";

export type QualitySettings = {
  tier: QualityTier;
  cells: number;
  bloodCells: number;
  particles: number;
  /** The "How It Works" object and its pedestal. */
  processObject: boolean;
  maxPixelRatio: number;
  antialias: boolean;
  /** Camera follows the mouse. */
  pointer: boolean;
  /** Frame-rate cap. */
  fps: number;
};

const SETTINGS: Record<QualityTier, Omit<QualitySettings, "tier" | "pointer">> = {
  high: {
    cells: 22,
    bloodCells: 6,
    particles: 900,
    processObject: true,
    maxPixelRatio: 1.75,
    antialias: true,
    fps: 60,
  },
  medium: {
    cells: 14,
    bloodCells: 4,
    particles: 420,
    processObject: true,
    maxPixelRatio: 1.25,
    antialias: false,
    fps: 60,
  },
  low: {
    cells: 8,
    bloodCells: 2,
    particles: 160,
    processObject: false,
    maxPixelRatio: 1,
    antialias: false,
    fps: 30,
  },
};

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

/**
 * Returns `null` when the page should stay as the static design: reduced
 * motion, data saver, or no WebGL.
 */
export function detectQuality(): QualitySettings | null {
  const nav = navigator as NavigatorHints;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  if (nav.connection?.saveData) return null;
  if (!supportsWebGL()) return null;

  const width = window.innerWidth;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  let tier: QualityTier = "high";
  if (width < 640 || cores <= 2 || memory <= 2) tier = "low";
  else if (width < 1024 || !finePointer || cores <= 4) tier = "medium";

  return { tier, ...SETTINGS[tier], pointer: finePointer && tier !== "low" };
}
