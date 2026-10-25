import { BufferAttribute, BufferGeometry, Points, type ShaderMaterial } from "three";
import { createParticleMaterial, palette, rgb, type SharedUniforms } from "./materials";

function seeded(index: number, salt: number) {
  const x = Math.sin(index * 91.7 + salt * 47.3) * 24634.6345;
  return x - Math.floor(x);
}

/** Mostly brand blues, some white, and a few rose "sample" specks. */
const COLORS = [
  { color: rgb(palette.primary), share: 0.4 },
  { color: rgb(palette.rim), share: 0.35 },
  { color: rgb(palette.white), share: 0.15 },
  { color: rgb(palette.bloodRim), share: 0.1 },
];

/** Share of particles that join the closing halo; the rest fade out. */
const RING_SHARE = 0.35;

/** Fine sample/lab particles drifting at every depth. One draw call. */
export class MedicalParticles {
  readonly points: Points<BufferGeometry, ShaderMaterial>;
  private readonly positions: BufferAttribute;

  constructor(shared: SharedUniforms, count: number) {
    const geometry = new BufferGeometry();
    this.positions = new BufferAttribute(new Float32Array(count * 3), 3);
    const motion = new Float32Array(count * 4);
    const ring = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      motion.set(
        [
          seeded(i, 1),
          0.04 + seeded(i, 2) * 0.12,
          0.12 + seeded(i, 3) * 0.25,
          // Mostly tiny, a few larger specks.
          2 + seeded(i, 4) ** 3 * 5,
        ],
        i * 4,
      );

      const joins = seeded(i, 5) < RING_SHARE;
      ring.set(
        [
          seeded(i, 6) * Math.PI * 2,
          // A soft band, densest along the orbit and thinning out either
          // side, so the gathered particles read as a halo rather than a line.
          (seeded(i, 7) + seeded(i, 11) - 1) * 0.28,
          (seeded(i, 8) - 0.5) * 0.1,
          joins ? seeded(i, 9) * 0.35 : -1,
        ],
        i * 4,
      );

      let pick = seeded(i, 10);
      const { color } = COLORS.find(({ share }) => (pick -= share) < 0) ?? COLORS[0];
      colors.set([color.x, color.y, color.z], i * 3);
    }

    geometry.setAttribute("position", this.positions);
    geometry.setAttribute("aMotion", new BufferAttribute(motion, 4));
    geometry.setAttribute("aRing", new BufferAttribute(ring, 4));
    geometry.setAttribute("aColor", new BufferAttribute(colors, 3));

    this.points = new Points(geometry, createParticleMaterial(shared, 0.75));
    this.points.frustumCulled = false;
  }

  get count() {
    return this.positions.count;
  }

  /** Writes each particle's resting position (world units). */
  place(position: (index: number, random: (salt: number) => number) => [number, number, number]) {
    for (let i = 0; i < this.positions.count; i++) {
      const [x, y, z] = position(i, (salt) => seeded(i, 20 + salt));
      this.positions.setXYZ(i, x, y, z);
    }
    this.positions.needsUpdate = true;
  }

  /** Draws only the first `count` particles (used when the frame rate drops). */
  limit(count: number) {
    this.points.geometry.setDrawRange(0, count);
  }

  dispose() {
    this.points.geometry.dispose();
    this.points.material.dispose();
  }
}
