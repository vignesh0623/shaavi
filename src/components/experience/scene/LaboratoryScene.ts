import {
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Vector4,
} from "three";
import type { ExperiencePage } from "../pages";
import type { QualitySettings } from "../quality";
import type { SceneState } from "../sceneState";
import {
  composeCells,
  PAGE_SCENES,
  type PageLayout,
  type Rect,
  type StagedPlacement,
} from "./composition";
import { FloatingCells, type CellPlacement } from "./FloatingCells";
import { createSharedUniforms } from "./materials";
import { MedicalParticles } from "./MedicalParticles";
import { ProcessStage } from "./ProcessObjects";

const FOV = 18;
const CAMERA_Z = 22;
const TAN_HALF_FOV = Math.tan(((FOV / 2) * Math.PI) / 180);
/** Tilt of the orbit the closing halo follows; its front half dips below the centre. */
const RING_TILT = 1.31;
const INTRO_SECONDS = 2.2;
/** Depth (px) of the fade-in under the hero's bottom edge on pages that keep the hero clear. */
const HERO_FADE = 140;

type Options = {
  /** Element the canvas is created in (spans the whole page, behind it). */
  container: HTMLElement;
  /** The page element; sections are measured inside it. */
  root: HTMLElement;
  /** Which page this is: where its cells rest. */
  page: ExperiencePage;
  state: SceneState;
  quality: QualitySettings;
  /** Called once the first frame is on screen. */
  onReady: () => void;
};

const query = (root: HTMLElement, name: string) =>
  root.querySelector<HTMLElement>(`[data-motion="${name}"]`);

/** The smallest rect around all of `rects` (null when there are none). */
function union(rects: Rect[]): Rect | null {
  if (!rects.length) return null;
  const left = Math.min(...rects.map((r) => r.x));
  const top = Math.min(...rects.map((r) => r.y));
  const right = Math.max(...rects.map((r) => r.x + r.width));
  const bottom = Math.max(...rects.map((r) => r.y + r.height));
  return { x: left, y: top, width: right - left, height: bottom - top };
}

/**
 * Where the closing call to action's copy sits, so the halo can come right up
 * to it: across, its lines of text (narrower than the boxes around them);
 * down, its box without padding, which the reveal never moves.
 */
function copyRect(copy: HTMLElement, origin: DOMRect): Rect {
  const box = copy.getBoundingClientRect();
  const style = getComputedStyle(copy);
  const range = document.createRange();
  let left = box.right;
  let right = box.left;
  for (const child of Array.from(copy.children)) {
    range.selectNodeContents(child);
    const line = range.getBoundingClientRect();
    if (!line.width) continue;
    left = Math.min(left, line.left);
    right = Math.max(right, line.right);
  }
  if (left >= right) [left, right] = [box.left, box.right];
  const top = box.top + parseFloat(style.paddingTop);
  const bottom = box.bottom - parseFloat(style.paddingBottom);
  return { x: left - origin.left, y: top - origin.top, width: right - left, height: bottom - top };
}

/**
 * The page-wide 3D layer: floating cells, particles, the "How It Works"
 * object and the closing halo, viewed by a camera that travels with scroll.
 *
 * World space is locked to the page: at depth 0 one pixel of scroll moves
 * the camera exactly one pixel, so objects anchored to the layout stay put
 * while nearer and farther ones drift (parallax).
 */
export class LaboratoryScene {
  private readonly options: Options;
  private readonly canvas = document.createElement("canvas");
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(FOV, 1, 0.1, 120);
  private readonly uniforms = createSharedUniforms();
  private readonly cells: FloatingCells;
  private readonly particles: MedicalParticles;
  private readonly process: ProcessStage | null;

  private layout: PageLayout | null = null;
  /** Centre (page px) and size of the free space right of the "How It Works" title. */
  private processArea: { x: number; y: number; size: number } | null = null;
  private pixelRatio: number;
  private running = false;
  private frameId = 0;
  private lastFrame = 0;
  private startTime = -1;
  private slowFrames = 0;
  private ready = false;
  private readonly pointer = new Vector2();
  private readonly pointerTarget = new Vector2();
  private readonly ringCenter = new Vector3();
  private readonly anchor = new Vector3();
  private readonly raycaster = new Raycaster();
  private readonly ground = new Plane(new Vector3(0, 0, 1), 0);
  private readonly ndc = new Vector2();

  private readonly resizeObserver: ResizeObserver;
  private readonly visibilityObserver: IntersectionObserver;
  private inView = true;
  /** Where the hero's bottom edge last sat on screen (px), for `clearHero`. */
  private heroEdge = Number.NaN;

  constructor(options: Options) {
    this.options = options;
    const { quality, container } = options;

    this.canvas.setAttribute("aria-hidden", "true");
    container.append(this.canvas);

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: quality.antialias,
      powerPreference: "low-power",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, quality.maxPixelRatio);
    this.renderer.setPixelRatio(this.pixelRatio);

    this.cells = new FloatingCells(this.uniforms, quality);
    this.particles = new MedicalParticles(
      this.uniforms,
      Math.round(quality.particles * PAGE_SCENES[options.page].particleShare),
    );
    // Only the home page's "How It Works" has a step object.
    this.process =
      quality.processObject && query(options.root, "process-heading") ? new ProcessStage() : null;
    this.scene.add(...this.cells.meshes, this.particles.points);
    if (this.process) this.scene.add(this.process.group);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.canvas);
    this.resizeObserver.observe(options.root);

    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.inView = entry.isIntersecting;
      this.updateRunning();
    });
    this.visibilityObserver.observe(container);

    document.addEventListener("visibilitychange", this.updateRunning);
    this.canvas.addEventListener("webglcontextlost", this.handleContextLost);
    if (quality.pointer) window.addEventListener("pointermove", this.handlePointer, { passive: true });

    this.resize();
    this.updateRunning();
  }

  dispose() {
    this.running = false;
    cancelAnimationFrame(this.frameId);
    this.resizeObserver.disconnect();
    this.visibilityObserver.disconnect();
    document.removeEventListener("visibilitychange", this.updateRunning);
    this.canvas.removeEventListener("webglcontextlost", this.handleContextLost);
    window.removeEventListener("pointermove", this.handlePointer);

    this.cells.dispose();
    this.particles.dispose();
    this.process?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.canvas.remove();
  }

  /* ---------------- layout ---------------- */

  private resize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.uniforms.uPixelRatio.value = this.pixelRatio;
    // Particle sizes are in px at the camera's resting distance.
    this.uniforms.uSizeScale.value = CAMERA_Z;
    this.measure(width, height);
    this.place();
  }

  private measure(width: number, height: number) {
    const { root } = this.options;
    const origin = root.getBoundingClientRect();
    const rect = (element: Element | null): Rect | null => {
      if (!element) return null;
      const r = element.getBoundingClientRect();
      return { x: r.left - origin.left, y: r.top - origin.top, width: r.width, height: r.height };
    };
    const all = (selector: string, scope: ParentNode = root) =>
      Array.from(scope.querySelectorAll<HTMLElement>(selector));
    const copy = query(root, "cta-content");
    this.layout = {
      width,
      height,
      pageHeight: origin.height,
      hero: rect(query(root, "hero")),
      // The hero copy can come in more than one block (About: title and intro).
      heroContent: union(all('[data-motion="hero-content"]').map((element) => rect(element)!)),
      sections: PAGE_SCENES[this.options.page].sections.flatMap(({ section, content }) =>
        all(section).map((element) => ({
          section: rect(element)!,
          content: content ? rect(element.querySelector(content)) : null,
        })),
      ),
      cta: rect(query(root, "cta")),
      ctaContent: copy && copyRect(copy, origin),
    };

    // Home: the free space right of the "How It Works" title.
    const heading = rect(query(root, "process-heading"));
    const content = rect(query(root, "process-content"));
    this.processArea = null;
    if (heading && content) {
      const left = heading.x + heading.width + 24;
      const right = content.x + content.width;
      const free = right - left;
      if (free >= 140) {
        this.processArea = {
          x: right - free * 0.42,
          y: heading.y + heading.height / 2 - 6,
          size: Math.min(150, free * 0.6),
        };
      }
    }
  }

  /** World units per screen pixel at depth `z`, with the camera at rest. */
  private unitsPerPixel(z: number) {
    const height = this.layout?.height ?? 1;
    return (2 * (CAMERA_Z - z) * TAN_HALF_FOV) / height;
  }

  private toWorld(cell: StagedPlacement): CellPlacement {
    const layout = this.layout!;
    const k = this.unitsPerPixel(cell.z);
    return {
      x: (cell.x - layout.width / 2) * k,
      y: -cell.stage * this.unitsPerPixel(0) - (cell.y - layout.height / 2) * k,
      z: cell.z,
      radius: cell.radius * k,
    };
  }

  private place() {
    const layout = this.layout;
    if (!layout) return;
    const { quality, page } = this.options;
    const { cells, bloodCells } = composeCells(layout, PAGE_SCENES[page], quality);
    this.cells.place(cells.map((c) => this.toWorld(c)), bloodCells.map((c) => this.toWorld(c)));

    // Particles fill the whole journey at every depth.
    const travel = Math.max(0, layout.pageHeight - layout.height) * this.unitsPerPixel(0);
    this.particles.place((_, random) => {
      const z = -12 + 16 * random(1) ** 0.7;
      const k = this.unitsPerPixel(z);
      const halfWidth = (layout.width / 2) * k * 1.05;
      const halfHeight = (layout.height / 2) * k * 1.1;
      return [
        (random(2) * 2 - 1) * halfWidth,
        halfHeight - random(3) * (travel + halfHeight * 2),
        z,
      ];
    });
  }

  /* ---------------- frame loop ---------------- */

  private readonly updateRunning = () => {
    const shouldRun = this.inView && !document.hidden;
    if (shouldRun === this.running) return;
    this.running = shouldRun;
    if (shouldRun) {
      this.lastFrame = performance.now();
      this.frameId = requestAnimationFrame(this.frame);
    } else {
      cancelAnimationFrame(this.frameId);
    }
  };

  private readonly frame = (now: number) => {
    if (!this.running) return;
    this.frameId = requestAnimationFrame(this.frame);

    const minInterval = 1000 / this.options.quality.fps;
    const elapsed = now - this.lastFrame;
    if (elapsed < minInterval - 2) return;
    this.lastFrame = now;
    this.adaptQuality(elapsed);

    if (this.startTime < 0) this.startTime = now;
    const time = (now - this.startTime) / 1000;
    const delta = Math.min(elapsed / 1000, 0.1);
    this.update(time, delta);
    this.renderer.render(this.scene, this.camera);

    if (!this.ready) {
      this.ready = true;
      this.options.onReady();
    }
  };

  /** Lowers resolution if frames keep running long (slow GPU, battery saver). */
  private adaptQuality(elapsed: number) {
    const budget = (1000 / this.options.quality.fps) * 1.6;
    this.slowFrames = elapsed > budget ? this.slowFrames + 1 : Math.max(0, this.slowFrames - 1);
    if (this.slowFrames < 45) return;
    this.slowFrames = 0;
    if (this.pixelRatio > 1) {
      this.pixelRatio = Math.max(1, this.pixelRatio - 0.25);
      this.renderer.setPixelRatio(this.pixelRatio);
      this.resize();
    } else {
      this.particles.limit(Math.floor(this.particles.count * 0.6));
    }
  }

  private update(time: number, delta: number) {
    const layout = this.layout;
    if (!layout) return;
    const { state, root } = this.options;
    const u = this.uniforms;

    u.uTime.value = time;
    const intro = Math.min(1, time / INTRO_SECONDS);
    u.uIntro.value = 1 - (1 - intro) ** 3;
    u.uConverge.value = state.converge;

    // Camera: page-locked travel, plus a gentle orbit around the depth-0
    // plane for the pointer, tilt and the About section's slow pan.
    const scroll = Math.min(
      Math.max(0, window.scrollY - (root.offsetTop || 0)),
      Math.max(0, layout.pageHeight - layout.height),
    );
    const baseY = -scroll * this.unitsPerPixel(0);
    const ease = 1 - Math.exp(-delta * 2.5);
    this.pointer.lerp(this.pointerTarget, ease);
    const distance = CAMERA_Z - state.dolly;
    const yaw = state.orbit + this.pointer.x * 0.028;
    const pitch = state.tilt + this.pointer.y * 0.02;
    this.camera.position.set(
      Math.sin(yaw) * distance,
      baseY + Math.sin(pitch) * distance,
      Math.cos(yaw) * Math.cos(pitch) * distance,
    );
    this.camera.lookAt(0, baseY, 0);
    this.camera.updateMatrixWorld();

    if (PAGE_SCENES[this.options.page].clearHero) this.clearHero(layout.hero, scroll);

    // Text the cells must not crowd: the hero copy and the closing call to action.
    this.focusRect(layout.heroContent, scroll, u.uFocusA.value);
    this.focusRect(layout.ctaContent, scroll, u.uFocusB.value);

    // Closing halo around the call to action.
    if (layout.ctaContent) {
      const c = layout.ctaContent;
      const centreY = c.y + c.height / 2;
      this.screenToWorld(c.x + c.width / 2, centreY - scroll, this.ringCenter);
      const radiusPx = Math.min(560, Math.max(layout.width * 0.39, 160), layout.width * 0.46);
      // Flattened where needed so the band stays inside the section; its
      // front half, nearer the camera, reaches further down than the back up.
      const section = layout.cta;
      const room = section
        ? Math.min(centreY - section.y, section.y + section.height - centreY)
        : radiusPx;
      const squash = Math.min(Math.cos(RING_TILT), (room * 0.5) / radiusPx);
      u.uRingCenter.value.copy(this.ringCenter);
      u.uRingShape.value.set(radiusPx * this.unitsPerPixel(0), squash, Math.sin(RING_TILT), 0.05);
    }

    // "How It Works" object, in the free space right of the section title.
    if (this.process) {
      const area = this.processArea;
      if (area) {
        this.screenToWorld(area.x, area.y - scroll, this.anchor);
        this.process.setAnchor(this.anchor, area.size * this.unitsPerPixel(0));
      }
      this.process.update(time, delta, area ? state.process : 0, state.step);
    }
  }

  /**
   * Hides the layer over the hero as it sits on screen, fading it in under
   * the hero's bottom edge; once the hero has scrolled away, nothing is hidden.
   */
  private clearHero(hero: Rect | null, scroll: number) {
    const edge = hero ? Math.round(hero.y + hero.height - scroll) : -HERO_FADE;
    if (edge === this.heroEdge) return;
    this.heroEdge = edge;
    const mask = edge > -HERO_FADE ? `linear-gradient(transparent ${edge}px, #000 ${edge + HERO_FADE}px)` : "";
    this.canvas.style.maskImage = mask;
    this.canvas.style.webkitMaskImage = mask;
  }

  /** Converts a page rect to NDC (x0, y0, x1, y1) for the given scroll. */
  private focusRect(rect: Rect | null, scroll: number, out: Vector4) {
    const layout = this.layout!;
    if (!rect) {
      out.set(4, 4, 4, 4);
      return;
    }
    const x0 = (rect.x / layout.width) * 2 - 1;
    const x1 = ((rect.x + rect.width) / layout.width) * 2 - 1;
    const y0 = 1 - ((rect.y + rect.height - scroll) / layout.height) * 2;
    const y1 = 1 - ((rect.y - scroll) / layout.height) * 2;
    out.set(x0, y0, x1, y1);
  }

  /** Point on the depth-0 plane under a screen position (canvas px). */
  private screenToWorld(x: number, y: number, out: Vector3) {
    const layout = this.layout!;
    this.ndc.set((x / layout.width) * 2 - 1, 1 - (y / layout.height) * 2);
    this.raycaster.setFromCamera(this.ndc, this.camera);
    this.raycaster.ray.intersectPlane(this.ground, out);
  }

  /* ---------------- events ---------------- */

  private readonly handlePointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    this.pointerTarget.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -((event.clientY / window.innerHeight) * 2 - 1),
    );
  };

  private readonly handleContextLost = (event: Event) => {
    event.preventDefault();
    this.running = false;
    cancelAnimationFrame(this.frameId);
    this.canvas.style.display = "none";
  };
}
