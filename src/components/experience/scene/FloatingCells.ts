import {
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  LatheGeometry,
  Mesh,
  SphereGeometry,
  Vector2,
  type BufferGeometry,
  type ShaderMaterial,
} from "three";
import { createCellMaterial, palette, type SharedUniforms } from "./materials";

/** Where one cell rests (world units) and how it moves. */
export type CellPlacement = {
  x: number;
  y: number;
  z: number;
  radius: number;
};

/** Red blood cell: the classic biconcave disc (Evans & Fung profile). */
function bloodCellGeometry() {
  const steps = 24;
  const profile: Vector2[] = [];
  const thickness = (r: number) =>
    0.5 * Math.sqrt(Math.max(0, 1 - r * r)) * (0.207 + 2.003 * r * r - 1.123 * r ** 4);
  for (let i = 0; i <= steps; i++) {
    const r = i / steps;
    profile.push(new Vector2(r, thickness(r)));
  }
  for (let i = steps - 1; i >= 0; i--) {
    const r = i / steps;
    profile.push(new Vector2(r, -thickness(r)));
  }
  return new LatheGeometry(profile, 48);
}

/** Pseudo-random but repeatable values, so the layout is the same on every load. */
function seeded(index: number, salt: number) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

class CellSwarm {
  readonly mesh: Mesh<InstancedBufferGeometry, ShaderMaterial>;
  private readonly field: InstancedBufferAttribute;
  private readonly motion: InstancedBufferAttribute;
  private readonly shape: InstancedBufferAttribute;
  private readonly ring: InstancedBufferAttribute;

  constructor(
    base: BufferGeometry,
    material: ShaderMaterial,
    capacity: number,
    salt: number,
    spin: number,
  ) {
    const geometry = new InstancedBufferGeometry();
    geometry.index = base.index;
    geometry.setAttribute("position", base.getAttribute("position"));
    geometry.setAttribute("normal", base.getAttribute("normal"));

    this.field = new InstancedBufferAttribute(new Float32Array(capacity * 3), 3);
    this.motion = new InstancedBufferAttribute(new Float32Array(capacity * 4), 4);
    this.shape = new InstancedBufferAttribute(new Float32Array(capacity * 4), 4);
    this.ring = new InstancedBufferAttribute(new Float32Array(capacity * 4), 4);
    geometry.setAttribute("aField", this.field);
    geometry.setAttribute("aMotion", this.motion);
    geometry.setAttribute("aShape", this.shape);
    geometry.setAttribute("aRing", this.ring);
    geometry.instanceCount = 0;

    // Motion and spin never change, so they are written once.
    for (let i = 0; i < capacity; i++) {
      this.motion.setXYZW(
        i,
        seeded(i, salt),
        0.05 + seeded(i, salt + 1) * 0.08,
        0.18 + seeded(i, salt + 2) * 0.22,
        (seeded(i, salt + 3) - 0.5) * spin,
      );
      const ax = seeded(i, salt + 4) - 0.5;
      const ay = seeded(i, salt + 5) - 0.5;
      const az = seeded(i, salt + 6) - 0.5;
      this.shape.setXYZW(i, ax || 0.1, ay || 0.1, az || 0.1, 1);
    }

    this.mesh = new Mesh(geometry, material);
    // Positions are computed in the shader, so the bounding volume is unknown.
    this.mesh.frustumCulled = false;
  }

  /** Writes resting positions and each cell's slot in the closing halo. */
  place(placements: CellPlacement[], ringOffset: number, ringTotal: number) {
    const count = Math.min(placements.length, this.field.count);
    placements.slice(0, count).forEach((cell, i) => {
      this.field.setXYZ(i, cell.x, cell.y, cell.z);
      this.shape.setW(i, cell.radius);
      const slot = ringOffset + i;
      // Spread around and across the halo, irregularly, so they don't line up.
      this.ring.setXYZW(
        i,
        (slot / ringTotal) * Math.PI * 2 + (seeded(slot, 9) - 0.5) * 0.5,
        (seeded(slot, 10) + seeded(slot, 13) - 1) * 0.2,
        (seeded(slot, 11) - 0.5) * 0.08,
        seeded(slot, 12) * 0.35,
      );
    });
    this.field.needsUpdate = true;
    this.shape.needsUpdate = true;
    this.ring.needsUpdate = true;
    this.mesh.geometry.instanceCount = count;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

/** Translucent cells and a few red blood cells drifting around the page. */
export class FloatingCells {
  readonly cells: CellSwarm;
  readonly bloodCells: CellSwarm;
  private readonly sphere = new SphereGeometry(1, 40, 28);
  private readonly disc = bloodCellGeometry();

  constructor(shared: SharedUniforms, capacity: { cells: number; bloodCells: number }) {
    this.cells = new CellSwarm(
      this.sphere,
      createCellMaterial(shared, {
        core: palette.mist,
        rim: palette.rim,
        nucleus: palette.nucleus,
        nucleusAmount: 1,
        opacity: 0.9,
      }),
      capacity.cells,
      1,
      0.3,
    );
    this.bloodCells = new CellSwarm(
      this.disc,
      createCellMaterial(shared, {
        core: palette.bloodCore,
        rim: palette.bloodRim,
        nucleus: palette.bloodRim,
        nucleusAmount: 0,
        opacity: 0.85,
      }),
      capacity.bloodCells,
      2,
      // Blood cells tumble a little faster, so their dimpled shape reads.
      0.7,
    );
    this.bloodCells.mesh.renderOrder = 1;
  }

  get meshes() {
    return [this.cells.mesh, this.bloodCells.mesh];
  }

  place(cells: CellPlacement[], bloodCells: CellPlacement[]) {
    const total = cells.length + bloodCells.length;
    this.cells.place(cells, 0, total);
    this.bloodCells.place(bloodCells, cells.length, total);
  }

  dispose() {
    this.cells.dispose();
    this.bloodCells.dispose();
    this.sphere.dispose();
    this.disc.dispose();
  }
}
