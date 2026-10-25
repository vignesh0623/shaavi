import {
  BoxGeometry,
  CurvePath,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  LineCurve3,
  Mesh,
  PlaneGeometry,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  type BufferGeometry,
} from "three";
import {
  createGlassMaterial,
  createShadowMaterial,
  createSolidMaterial,
  palette,
  type ObjectMaterial,
} from "./materials";

/*
 * The four "How It Works" steps as small lab objects, built from simple
 * shapes (about one unit tall, centred on the origin):
 *   01 test tube · 02 appointment calendar · 03 sample drop · 04 report
 */

type Part = { material: ObjectMaterial; opacity: number };

class LabObject {
  readonly group = new Group();
  private readonly parts: Part[] = [];

  add(geometry: BufferGeometry, material: ObjectMaterial, opacity = 1, renderOrder = 1) {
    const mesh = new Mesh(geometry, material);
    mesh.renderOrder = renderOrder;
    this.group.add(mesh);
    this.parts.push({ material, opacity });
    return mesh;
  }

  set opacity(value: number) {
    this.group.visible = value > 0.002;
    for (const part of this.parts) part.material.uniforms.uOpacity.value = part.opacity * value;
  }
}

function roundedRect(width: number, height: number, top: number, bottom = top) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new Shape();
  shape.moveTo(x + bottom, y);
  shape.lineTo(x + width - bottom, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + bottom);
  shape.lineTo(x + width, y + height - top);
  shape.quadraticCurveTo(x + width, y + height, x + width - top, y + height);
  shape.lineTo(x + top, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - top);
  shape.lineTo(x, y + bottom);
  shape.quadraticCurveTo(x, y, x + bottom, y);
  return shape;
}

function slab(width: number, height: number, depth: number, top: number, bottom = top) {
  const geometry = new ExtrudeGeometry(roundedRect(width, height, top, bottom), {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 10,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

function polyline(points: [number, number][], radius: number) {
  const path = new CurvePath<Vector3>();
  for (let i = 1; i < points.length; i++) {
    const [ax, ay] = points[i - 1];
    const [bx, by] = points[i];
    path.add(new LineCurve3(new Vector3(ax, ay, 0), new Vector3(bx, by, 0)));
  }
  return new TubeGeometry(path, 16, radius, 8, false);
}

function testTube() {
  const object = new LabObject();
  const radius = 0.15;
  const height = 0.95;

  // Rounded-bottom glass tube, open at the top.
  const glass: Vector2[] = [];
  for (let i = 0; i <= 12; i++) {
    const a = -Math.PI / 2 + (i / 12) * (Math.PI / 2);
    glass.push(new Vector2(Math.cos(a) * radius, Math.sin(a) * radius + radius));
  }
  glass.push(new Vector2(radius, height));
  object.add(new LatheGeometry(glass, 40), createGlassMaterial(palette.mist, palette.rim), 1, 2);

  // Sample filling the lower half.
  const inner = radius * 0.84;
  const level = 0.5;
  const liquid: Vector2[] = [];
  for (let i = 0; i <= 12; i++) {
    const a = -Math.PI / 2 + (i / 12) * (Math.PI / 2);
    liquid.push(new Vector2(Math.cos(a) * inner + 0.0001, Math.sin(a) * inner + radius));
  }
  liquid.push(new Vector2(inner, level), new Vector2(0.0001, level));
  object.add(new LatheGeometry(liquid, 40), createSolidMaterial(palette.primary), 0.95);

  const rim = object.add(new TorusGeometry(radius, 0.016, 10, 40), createSolidMaterial(palette.mist));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = height;

  for (const [x, y, r] of [
    [-0.04, 0.22, 0.022],
    [0.035, 0.32, 0.016],
    [-0.01, 0.41, 0.012],
  ]) {
    const bubble = object.add(new SphereGeometry(r, 12, 10), createSolidMaterial(palette.light), 0.9);
    bubble.position.set(x, y, 0.05);
  }

  object.group.children.forEach((child) => (child.position.y -= height / 2));
  object.group.rotation.z = -0.3;
  return object;
}

function calendar() {
  const object = new LabObject();
  object.add(slab(0.9, 0.82, 0.07, 0.11), createSolidMaterial(0xf8fcfe));

  const header = object.add(slab(0.9, 0.22, 0.074, 0.11, 0.0001), createSolidMaterial(palette.primary));
  header.position.y = 0.3;

  for (const x of [-0.22, 0.22]) {
    const ring = object.add(new TorusGeometry(0.06, 0.016, 10, 28), createSolidMaterial(palette.nucleus));
    ring.rotation.y = Math.PI / 2;
    ring.position.set(x, 0.41, 0);
  }

  // Day grid with today's appointment highlighted.
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const today = row === 1 && col === 2;
      const cell = object.add(
        new BoxGeometry(0.13, 0.1, 0.02),
        createSolidMaterial(today ? palette.primary : 0xd5ebf6),
      );
      cell.position.set(-0.3 + col * 0.2, 0.07 - row * 0.16, 0.045);
      if (today) {
        const tick = object.add(
          polyline(
            [
              [-0.03, 0],
              [-0.008, -0.022],
              [0.034, 0.022],
            ],
            0.009,
          ),
          createSolidMaterial(palette.white),
        );
        tick.position.set(cell.position.x, cell.position.y, 0.062);
      }
    }
  }

  object.group.rotation.set(0.08, -0.32, 0);
  return object;
}

function sampleDrop() {
  const object = new LabObject();
  const profile = (scale: number) => {
    const points: Vector2[] = [];
    for (let i = 0; i <= 32; i++) {
      const t = (i / 32) * Math.PI;
      const r = 0.36 * Math.sin(t) * Math.sin(t / 2) ** 0.9;
      points.push(new Vector2(Math.max(r * scale, 0.0001), (0.08 + 0.43 * Math.cos(t)) * scale));
    }
    return points;
  };

  object.add(new LatheGeometry(profile(1), 44), createGlassMaterial(palette.mist, palette.rim), 1, 2);
  const core = object.add(new LatheGeometry(profile(0.72), 44), createSolidMaterial(palette.primary), 0.92);
  core.position.y = -0.06;

  object.group.position.y = 0.04;
  return object;
}

function report() {
  const object = new LabObject();
  object.add(slab(0.72, 0.94, 0.035, 0.06), createSolidMaterial(palette.white));

  const title = object.add(new BoxGeometry(0.34, 0.055, 0.012), createSolidMaterial(palette.primary));
  title.position.set(-0.12, 0.33, 0.024);

  [0.5, 0.44, 0.5, 0.32].forEach((width, i) => {
    const line = object.add(new BoxGeometry(width, 0.03, 0.01), createSolidMaterial(0xd5ebf6));
    line.position.set(-0.25 + width / 2, 0.18 - i * 0.1, 0.022);
  });

  const badge = object.add(new CylinderGeometry(0.15, 0.15, 0.04, 40), createSolidMaterial(palette.primary));
  badge.rotation.x = Math.PI / 2;
  badge.position.set(0.24, -0.33, 0.05);

  const check = object.add(
    polyline(
      [
        [-0.055, 0],
        [-0.015, -0.04],
        [0.06, 0.045],
      ],
      0.016,
    ),
    createSolidMaterial(palette.white),
  );
  check.position.set(0.24, -0.33, 0.075);

  object.group.rotation.set(0.05, 0.3, 0);
  return object;
}

const TRANSITION_SECONDS = 0.9;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Shows the object for the active step, cross-fading as steps change. */
export class ProcessStage {
  readonly group = new Group();
  private readonly objects = [testTube(), calendar(), sampleDrop(), report()];
  private readonly pedestal = new Group();
  private readonly pedestalParts: Part[] = [];
  private current = 0;
  private next = 0;
  private blend = 1;
  private visibility = 0;

  constructor() {
    for (const object of this.objects) this.group.add(object.group);

    // A thin ring and a soft shadow ground the object.
    const ringMaterial = createSolidMaterial(palette.primary);
    const ring = new Mesh(new TorusGeometry(0.62, 0.006, 8, 96), ringMaterial);
    ring.rotation.x = Math.PI - 1.3;
    const shadowMaterial = createShadowMaterial(palette.nucleus);
    const shadow = new Mesh(new PlaneGeometry(1.5, 0.42), shadowMaterial);
    shadow.position.z = -0.4;
    this.pedestal.add(shadow, ring);
    this.pedestal.position.y = -0.66;
    this.pedestalParts.push({ material: ringMaterial, opacity: 0.32 }, { material: shadowMaterial, opacity: 0.16 });
    this.group.add(this.pedestal);
    this.group.visible = false;
  }

  /** Centre and height (world units) of the free space beside the section title. */
  setAnchor(center: Vector3, height: number) {
    this.group.position.copy(center);
    this.group.scale.setScalar(height / 1.5);
  }

  /** `visibility` 0–1 fades the whole stage; `step` picks the object. */
  update(time: number, delta: number, visibility: number, step: number) {
    this.visibility += (visibility - this.visibility) * Math.min(1, delta * 5);
    this.group.visible = this.visibility > 0.002;
    if (!this.group.visible) return;

    const target = Math.min(this.objects.length - 1, Math.max(0, Math.round(step)));
    if (target !== this.next) {
      if (this.blend >= 0.5) this.current = this.next;
      this.next = target;
      this.blend = this.current === this.next ? 1 : 0;
    }
    this.blend = Math.min(1, this.blend + delta / TRANSITION_SECONDS);
    if (this.blend >= 1) this.current = this.next;
    const mix = easeInOut(this.blend);

    this.objects.forEach((object, i) => {
      let weight = 0;
      if (i === this.next) weight = this.current === this.next ? 1 : mix;
      else if (i === this.current) weight = 1 - mix;

      object.opacity = weight * this.visibility;
      if (!object.group.visible) return;
      // Incoming objects turn in from one side, outgoing ones turn away.
      const away = (1 - weight) * (i === this.next ? -0.7 : 0.7);
      object.group.scale.setScalar(0.78 + 0.22 * weight);
      object.group.position.y = Math.sin(time * 0.9 + i) * 0.035 + (1 - weight) * 0.06;
      object.group.rotation.y = this.baseYaw(i) + Math.sin(time * 0.45) * 0.22 + away;
    });

    for (const part of this.pedestalParts) {
      part.material.uniforms.uOpacity.value = part.opacity * this.visibility;
    }
  }

  private baseYaw(index: number) {
    return [0, -0.32, 0, 0.3][index];
  }

  dispose() {
    this.group.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();
        (child.material as ObjectMaterial).dispose();
      }
    });
  }
}
