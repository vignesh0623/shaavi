import {
  DoubleSide,
  FrontSide,
  ShaderMaterial,
  Vector3,
  Vector4,
  type IUniform,
  type Side,
} from "three";

/*
 * Custom shaders keep the scene light: no textures, no lights, no
 * post-processing. Colours are written in sRGB and output premultiplied,
 * so the transparent canvas composites cleanly over the page.
 */

/** sRGB hex → 0–1 components, written to the screen unchanged. */
export function rgb(hex: number) {
  return new Vector3(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255);
}

/** Palette drawn from the brand blues (Blues/Primary #0087c6, light #b6ddef). */
export const palette = {
  primary: 0x0087c6,
  light: 0xb6ddef,
  mist: 0xe4f3fa,
  rim: 0x63afd9,
  nucleus: 0x2c6c94,
  white: 0xffffff,
  bloodCore: 0xf7d3d8,
  bloodRim: 0xd77482,
} as const;

/** Uniforms every material reads; one object, updated once per frame. */
export type SharedUniforms = {
  uTime: IUniform<number>;
  uIntro: IUniform<number>;
  uConverge: IUniform<number>;
  /** Centre of the closing halo (world). */
  uRingCenter: IUniform<Vector3>;
  /** Its orbit: radius, vertical squash, depth (sine of the tilt), spin speed. */
  uRingShape: IUniform<Vector4>;
  /**
   * Screen rects (NDC x0, y0, x1, y1) kept clear for text: elements fade to a
   * trace behind the hero copy (A) and vanish behind the closing call to action (B).
   */
  uFocusA: IUniform<Vector4>;
  uFocusB: IUniform<Vector4>;
  uPixelRatio: IUniform<number>;
  uSizeScale: IUniform<number>;
};

export function createSharedUniforms(): SharedUniforms {
  const offscreen = new Vector4(4, 4, 4, 4);
  return {
    uTime: { value: 0 },
    uIntro: { value: 0 },
    uConverge: { value: 0 },
    uRingCenter: { value: new Vector3() },
    uRingShape: { value: new Vector4(1, 0.26, 0.97, 0.05) },
    uFocusA: { value: offscreen.clone() },
    uFocusB: { value: offscreen.clone() },
    uPixelRatio: { value: 1 },
    uSizeScale: { value: 1 },
  };
}

const GLSL_COMMON = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uConverge;
  uniform vec3 uRingCenter;
  uniform vec4 uRingShape;
  uniform vec4 uFocusA;
  uniform vec4 uFocusB;

  vec3 rotateAxis(vec3 v, vec3 axis, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);
  }

  // Slot in the soft halo the elements gather into at the end of the page: a
  // tilted orbit whose front half (towards the camera) sits below the centre.
  // ring.y places an element inside or outside the orbit; inner ones circle a
  // little faster, so the halo swirls instead of turning in one piece.
  vec3 ringPoint(vec4 ring) {
    float angle = ring.x + uTime * uRingShape.w * (1.0 - ring.y * 1.5);
    float radius = uRingShape.x * (1.0 + ring.y);
    return uRingCenter + vec3(
      cos(angle) * radius,
      -sin(angle) * radius * uRingShape.y + ring.z * uRingShape.x,
      sin(angle) * radius * uRingShape.z
    );
  }

  // 1 outside the focus rects (radius in NDC); 0.12 behind the hero copy and
  // 0 behind the closing call to action, so its halo never smudges the text.
  float focusFade(vec2 ndc, float radius) {
    vec2 a = max(uFocusA.xy - ndc, ndc - uFocusA.zw);
    vec2 b = max(uFocusB.xy - ndc, ndc - uFocusB.zw);
    float hero = mix(0.12, 1.0, smoothstep(-0.02, 0.08, max(a.x, a.y) - radius));
    return min(hero, smoothstep(-0.02, 0.08, max(b.x, b.y) - radius));
  }
`;

const GLSL_NOISE = /* glsl */ `
  float hash31(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise3(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash31(i), hash31(i + vec3(1, 0, 0)), f.x),
          mix(hash31(i + vec3(0, 1, 0)), hash31(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash31(i + vec3(0, 0, 1)), hash31(i + vec3(1, 0, 1)), f.x),
          mix(hash31(i + vec3(0, 1, 1)), hash31(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    );
  }
`;

/* ---------------------------------------------------------------- */
/* Floating cells and blood cells (instanced)                        */
/* ---------------------------------------------------------------- */

const CELL_VERTEX = /* glsl */ `
  ${GLSL_COMMON}

  attribute vec3 aField;   // resting position (world)
  attribute vec4 aMotion;  // seed, float amplitude, float speed, spin speed
  attribute vec4 aShape;   // spin axis (xyz), radius (w)
  attribute vec4 aRing;    // halo slot: angle, offset from the orbit, height, delay

  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vLocal;
  varying float vFade;

  void main() {
    float seed = aMotion.x;
    float t = uTime * aMotion.z + seed * 6.2831;
    vec3 drift = vec3(sin(t), sin(t * 0.83 + 1.7), sin(t * 0.61 + 2.9) * 0.6) * aMotion.y;
    vec3 center = aField + drift;

    float gather = smoothstep(aRing.w, aRing.w + 0.6, uConverge);
    gather = gather * gather * (3.0 - 2.0 * gather);
    center = mix(center, ringPoint(aRing), gather);

    float radius = aShape.w * mix(1.0, 0.5, gather) * (0.7 + 0.3 * uIntro);
    vec3 axis = normalize(aShape.xyz);
    float spin = uTime * aMotion.w + seed * 12.0;

    vec4 mv = modelViewMatrix * vec4(center + rotateAxis(position, axis, spin) * radius, 1.0);
    gl_Position = projectionMatrix * mv;

    vNormal = normalize(normalMatrix * rotateAxis(normal, axis, spin));
    vView = -mv.xyz;
    vLocal = position;

    vec4 clip = projectionMatrix * modelViewMatrix * vec4(center, 1.0);
    float ndcRadius = radius * projectionMatrix[1][1] / clip.w;
    float depthFade = smoothstep(48.0, 22.0, -mv.z);
    vFade = focusFade(clip.xy / clip.w, ndcRadius) * mix(0.45, 1.0, depthFade) * uIntro;
  }
`;

const CELL_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCore;
  uniform vec3 uRim;
  uniform vec3 uNucleus;
  uniform float uNucleusAmount;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vLocal;
  varying float vFade;

  ${GLSL_NOISE}

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float facing = clamp(dot(n, v), 0.0, 1.0);
    float fresnel = pow(1.0 - facing, 2.4);

    // Thin, glassy membrane: clear in the middle, brighter at the rim.
    vec3 color = mix(uCore, uRim, fresnel);
    float alpha = 0.07 + 0.7 * fresnel;

    // Soft nucleus with an organic edge, seen through the membrane.
    float grain = noise3(vLocal * 3.1 + uTime * 0.04);
    float nucleus = smoothstep(0.6, 0.84, facing + (grain - 0.5) * 0.24) * uNucleusAmount;
    vec3 nucleusColor = uNucleus * (0.78 + 0.44 * noise3(vLocal * 9.0));
    color = mix(color, nucleusColor, nucleus * 0.85);
    alpha = mix(alpha, 0.58, nucleus);

    // Small specular highlight from a fixed upper-left light.
    vec3 h = normalize(normalize(vec3(-0.35, 0.75, 0.55)) + v);
    float spec = pow(max(dot(n, h), 0.0), 48.0);
    color = mix(color, vec3(1.0), spec * 0.75);
    alpha = max(alpha, spec * 0.8);

    alpha *= uOpacity * vFade;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

type CellLook = { core: number; rim: number; nucleus: number; nucleusAmount: number; opacity: number };

export function createCellMaterial(shared: SharedUniforms, look: CellLook) {
  return new ShaderMaterial({
    uniforms: {
      ...shared,
      uCore: { value: rgb(look.core) },
      uRim: { value: rgb(look.rim) },
      uNucleus: { value: rgb(look.nucleus) },
      uNucleusAmount: { value: look.nucleusAmount },
      uOpacity: { value: look.opacity },
    },
    vertexShader: CELL_VERTEX,
    fragmentShader: CELL_FRAGMENT,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
  });
}

/* ---------------------------------------------------------------- */
/* Particles                                                         */
/* ---------------------------------------------------------------- */

const PARTICLE_VERTEX = /* glsl */ `
  ${GLSL_COMMON}
  uniform float uPixelRatio;
  uniform float uSizeScale;

  attribute vec4 aMotion;  // seed, float amplitude, float speed, size (px)
  attribute vec4 aRing;    // halo slot: angle, offset from the orbit, height, delay (< 0: fades out)
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float t = uTime * aMotion.z + aMotion.x * 6.2831;
    vec3 p = position + vec3(sin(t), sin(t * 0.9 + 1.1), sin(t * 0.7 + 2.3)) * aMotion.y;

    float joins = step(0.0, aRing.w);
    float gather = smoothstep(aRing.w, aRing.w + 0.6, uConverge) * joins;
    p = mix(p, ringPoint(aRing), gather);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aMotion.w * uPixelRatio * uSizeScale / -mv.z;

    float leave = (1.0 - joins) * smoothstep(0.05, 0.6, uConverge);
    float depthFade = smoothstep(60.0, 24.0, -mv.z);
    vAlpha = (1.0 - leave) * mix(0.35, 1.0, depthFade) * uIntro
      * focusFade(gl_Position.xy / gl_Position.w, 0.0);
    vColor = aColor;
  }
`;

const PARTICLE_FRAGMENT = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = a * a * vAlpha * uOpacity;
    gl_FragColor = vec4(vColor * a, a);
  }
`;

export function createParticleMaterial(shared: SharedUniforms, opacity: number) {
  return new ShaderMaterial({
    uniforms: { ...shared, uOpacity: { value: opacity } },
    vertexShader: PARTICLE_VERTEX,
    fragmentShader: PARTICLE_FRAGMENT,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
  });
}

/* ---------------------------------------------------------------- */
/* Lab objects: glass, solid and soft shadow                         */
/* ---------------------------------------------------------------- */

const OBJECT_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vNormal = normalize(normalMatrix * normal);
    vView = -mv.xyz;
  }
`;

const GLASS_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uRim;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    if (!gl_FrontFacing) n = -n;
    float facing = clamp(dot(n, v), 0.0, 1.0);
    float fresnel = pow(1.0 - facing, 2.0);
    vec3 color = mix(uColor, uRim, fresnel);
    float alpha = 0.16 + 0.62 * fresnel;
    vec3 h = normalize(normalize(vec3(-0.35, 0.75, 0.55)) + v);
    float spec = pow(max(dot(n, h), 0.0), 64.0);
    color = mix(color, vec3(1.0), spec * 0.8);
    alpha = max(alpha, spec * 0.85) * uOpacity;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

const SOLID_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    vec3 l = normalize(vec3(-0.35, 0.75, 0.55));
    float wrap = dot(n, l) * 0.5 + 0.5;
    float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 3.0);
    vec3 color = uColor * (0.66 + 0.42 * wrap) + fresnel * 0.18;
    float spec = pow(max(dot(n, normalize(l + v)), 0.0), 40.0);
    color = min(color + spec * 0.35, vec3(1.0));
    gl_FragColor = vec4(color * uOpacity, uOpacity);
  }
`;

export type ObjectMaterial = ShaderMaterial & { uniforms: { uOpacity: IUniform<number> } };

export function createGlassMaterial(color: number, rim: number, side: Side = DoubleSide) {
  return new ShaderMaterial({
    uniforms: { uColor: { value: rgb(color) }, uRim: { value: rgb(rim) }, uOpacity: { value: 1 } },
    vertexShader: OBJECT_VERTEX,
    fragmentShader: GLASS_FRAGMENT,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
    side,
  }) as ObjectMaterial;
}

export function createSolidMaterial(color: number) {
  return new ShaderMaterial({
    uniforms: { uColor: { value: rgb(color) }, uOpacity: { value: 1 } },
    vertexShader: OBJECT_VERTEX,
    fragmentShader: SOLID_FRAGMENT,
    transparent: true,
    premultipliedAlpha: true,
    side: FrontSide,
  }) as ObjectMaterial;
}

const SHADOW_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.0, d);
    a = a * a * uOpacity;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

/** Soft round shadow under the "How It Works" object. */
export function createShadowMaterial(color: number) {
  return new ShaderMaterial({
    uniforms: { uColor: { value: rgb(color) }, uOpacity: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: SHADOW_FRAGMENT,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
  }) as ObjectMaterial;
}
