// Opal planet (agency) or sun (academy): a spinning pearl sphere with thin-film iridescence, a tilted
// ring and an orbiting moon that passes behind it. Light follows the pointer
// with a soft spring; scrolling speeds up the spin.
// Plain WebGL1, no dependencies. Falls back to the CSS orb if unavailable.

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uSpin;
uniform float uIntro;
uniform vec2 uMouse;
uniform vec2 uCenter;
uniform float uRadius;
uniform vec3 uBg;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uDark;
uniform float uSun;

const vec3 PEARL = vec3(1.0, 0.984, 0.969);
const vec3 COSMOS = vec3(0.118, 0.086, 0.220);
const float TILT = -0.32;
const float FLAT = 0.28;

// Signature gradient loop: c1 -> c2 -> c3 -> pearl -> c1
vec3 pal(float t) {
  t = fract(t) * 4.0;
  if (t < 1.0) return mix(uC1, uC2, smoothstep(0.0, 1.0, t));
  if (t < 2.0) return mix(uC2, uC3, smoothstep(1.0, 2.0, t));
  if (t < 3.0) return mix(uC3, PEARL, smoothstep(2.0, 3.0, t));
  return mix(PEARL, uC1, smoothstep(3.0, 4.0, t));
}

float caustic(vec2 p, float t) {
  float v = sin(p.x * 1.7 + t * 0.21 + sin(p.y * 1.3 - t * 0.17));
  v += sin(p.y * 2.1 - t * 0.13 + sin(p.x * 1.9 + t * 0.11));
  v += sin((p.x + p.y) * 1.2 + t * 0.09);
  return v / 3.0;
}

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// Ring in its own flattened plane. Returns rgb + alpha.
vec4 ring(vec2 p, float r, float t) {
  vec2 q = rot(TILT) * p;
  vec2 e = vec2(q.x, q.y / FLAT);
  float rr = length(e) / r;
  float inner = 1.38, outer = 1.72;
  float band = smoothstep(inner, inner + 0.03, rr) * (1.0 - smoothstep(outer - 0.05, outer, rr));
  float stripes = 0.55 + 0.45 * sin(rr * 90.0) * sin(rr * 23.0 + 1.3);
  float gap = 1.0 - 0.8 * smoothstep(0.012, 0.0, abs(rr - 1.55));
  vec3 c = mix(pal(rr * 0.9 + t * 0.015), PEARL, 0.35);
  float a = band * stripes * gap * mix(0.55, 0.7, uDark);
  return vec4(c, a);
}

void main() {
  float m = min(uRes.x, uRes.y);
  vec2 frag = gl_FragCoord.xy;
  vec2 p = (frag - uCenter) / m;
  float intro = uIntro;
  float r = (uRadius / m) * (0.86 + 0.14 * intro) * (1.0 + uSun * 0.012 * sin(uTime * 1.3));
  float d = length(p);
  float t = uTime;

  // Background with faint refracted caustics.
  vec2 cq = frag / m * 2.4;
  float c = caustic(cq, t);
  float band = smoothstep(0.55, 1.0, c);
  float nearOrb = exp(-max(d - r, 0.0) * 1.6);
  vec3 col = mix(uBg, pal(c * 0.3 + t * 0.02), band * mix(0.10, 0.06, uDark) * (0.4 + nearOrb));

  // Halo.
  float ang = atan(p.y, p.x) / 6.2831;
  float halo = exp(-max(d - r, 0.0) * 5.0);
  col = mix(col, pal(ang + t * 0.03), halo * mix(0.45, 0.34, uDark) * intro);

  // Sun: a wide bloom plus a corona of slowly shimmering rays.
  if (uSun > 0.5) {
    float h = max(d - r, 0.0) / r;
    float a6 = ang * 6.2831;
    float rays = 0.5 + 0.5 * sin(a6 * 16.0 + 1.8 * sin(a6 * 5.0 + t * 0.4) + t * 0.1);
    rays = pow(rays, 3.0) * (0.6 + 0.4 * sin(a6 * 7.0 - t * 0.25));
    float corona = exp(-h * 2.6) * (0.35 + 1.1 * rays) + exp(-h * 7.0) * 0.6;
    float bloom = exp(-h * 0.85);
    vec3 warm = mix(uC2, uC1, 0.5 + 0.5 * sin(a6 * 3.0 + t * 0.1));
    col = mix(col, warm, clamp(bloom * 0.62 * intro, 0.0, 1.0));
    col = mix(col, mix(warm, PEARL, 0.1), clamp(corona * 1.0 * intro, 0.0, 1.0));
  }

  // Which half of the ring is in front: the lower half (q.y < 0) faces us.
  vec2 q = rot(TILT) * p;
  vec4 rg = ring(p, r, t);
  rg.a *= intro * (1.0 - uSun);

  // Moon on the ring's plane.
  float ma = uSpin * 1.6 + 1.2;
  vec2 mq = vec2(cos(ma), sin(ma) * FLAT) * r * 1.9;
  vec2 mpos = rot(-TILT) * mq;
  float mr = r * 0.075;
  float md = length(p - mpos) + uSun * 1e3;
  bool moonBehind = sin(ma) > 0.0;

  // Back layers: far half of the ring, and the moon when it is behind.
  if (q.y > 0.0) col = mix(col, rg.rgb, rg.a);
  if (moonBehind && md < mr) {
    vec3 mn = normalize(vec3((p - mpos) / mr, sqrt(max(1.0 - dot((p - mpos) / mr, (p - mpos) / mr), 0.0))));
    float ml = clamp(dot(mn, normalize(vec3(-0.5, 0.6, 0.8))), 0.0, 1.0);
    vec3 moon = mix(pal(0.6), PEARL, 0.6) * (0.55 + 0.5 * ml);
    col = mix(col, moon, smoothstep(mr, mr - 1.5 / m, md) * intro);
  }

  // Planet.
  if (d < r + 2.0 / m) {
    float z = sqrt(max(r * r - d * d, 0.0));
    vec3 n = normalize(vec3(p, z));

    // Liquid wobble in the surface normal.
    vec3 w = vec3(
      sin(n.y * 3.1 + t * 0.55 + sin(n.x * 4.3 - t * 0.37)),
      sin(n.z * 2.9 - t * 0.45 + sin(n.y * 5.1 + t * 0.29)),
      sin(n.x * 3.3 + t * 0.41)
    );
    vec3 nl = normalize(n + w * 0.08);

    // Surface pattern spins around a tilted axis.
    vec3 ns = n;
    ns.xy = rot(TILT) * ns.xy;
    float s1 = sin(uSpin), c1 = cos(uSpin);
    ns = vec3(c1 * ns.x + s1 * ns.z, ns.y, -s1 * ns.x + c1 * ns.z);
    float lat = asin(clamp(ns.y, -1.0, 1.0));
    float lon = atan(ns.x, ns.z);

    vec3 v = vec3(0.0, 0.0, 1.0);
    float ndv = clamp(dot(nl, v), 0.0, 1.0);

    // Thin-film interference plus soft latitude bands, like a gas giant in pearl.
    float bands = sin(lat * 7.0 + 1.4 * sin(lon * 2.0 + lat * 3.0) + t * 0.1);
    float film = ndv * 1.6
      + 0.22 * bands
      + 0.28 * sin(lon * 3.0 + lat * 2.0)
      + 0.18 * sin(ns.x * 6.0 - t * 0.24)
      + dot(uMouse, nl.xy) * 0.3;
    vec3 iri = pal(film * 0.5 + 0.1);
    vec3 s = mix(iri, PEARL, 0.14 + 0.3 * ndv + 0.06 * bands);

    if (uSun > 0.5) {
      // Plasma granulation that drifts with the spin, hotter toward the core.
      float g = sin(lat * 5.0 + 1.4 * sin(lon * 3.0 + t * 0.3))
              + 0.7 * sin(lon * 4.0 - t * 0.22 + lat * 2.0);
      vec3 plasma = mix(uC2, uC1, 0.5 + 0.5 * sin(g + t * 0.2));
      plasma = mix(plasma, uC3, 0.16 * smoothstep(0.6, 1.0, sin(g * 1.7 - t * 0.15)));
      // Warm body, white-hot core, glowing limb.
      s = mix(plasma, PEARL, 0.08 + 0.5 * pow(ndv, 3.0));
      s = mix(s, mix(uC2, uC1, 0.3), pow(1.0 - ndv, 1.4) * 0.5);
      // A touch of extra saturation so it reads as light on a pearl page.
      s = mix(vec3(dot(s, vec3(0.3333))), s, 1.18);
    }

    vec3 L = normalize(vec3(uMouse * 0.8 + vec2(-0.35, 0.5), 0.95));
    float diff = clamp(dot(nl, L), 0.0, 1.0);
    s *= mix(0.72 + 0.34 * diff, 1.0 + 0.06 * diff, uSun);
    float spec = pow(clamp(dot(reflect(-L, nl), v), 0.0, 1.0), 48.0);
    s += spec * 0.85 * (1.0 - uSun);
    s += pow(clamp(dot(reflect(-L, nl), v), 0.0, 1.0), 6.0) * 0.08 * (1.0 - uSun);

    float fr = pow(1.0 - ndv, 3.0);
    s = mix(s, mix(uC2, uC1, 0.35 + 0.35 * sin(ang * 6.2831 + t * 0.2)), fr * 0.6 * (1.0 - uSun * 0.5));

    // Volume: the underside picks up shadow.
    vec3 shade = mix(mix(uBg, uC2, 0.55), mix(COSMOS, uC2, 0.7), uDark);
    s = mix(s, shade, smoothstep(0.1, -1.0, nl.y) * mix(0.35, 0.28, uDark) * (1.0 - uSun));

    // Ring shadow band across the planet.
    float rs = abs((rot(TILT) * (p + vec2(0.0, r * 0.06))).y) / r;
    s *= 1.0 - 0.12 * smoothstep(0.09, 0.0, rs - 0.02) * intro * (1.0 - uSun);

    float edge = smoothstep(r + 1.5 / m, r - 1.5 / m, d);
    col = mix(col, s, edge * (0.2 + 0.8 * intro));
  }

  // Front layers: near half of the ring, and the moon when it is in front.
  if (q.y <= 0.0) col = mix(col, rg.rgb, rg.a);
  if (!moonBehind && md < mr) {
    vec3 mn = normalize(vec3((p - mpos) / mr, sqrt(max(1.0 - dot((p - mpos) / mr, (p - mpos) / mr), 0.0))));
    float ml = clamp(dot(mn, normalize(vec3(-0.5, 0.6, 0.8))), 0.0, 1.0);
    vec3 moon = mix(pal(0.6), PEARL, 0.6) * (0.55 + 0.5 * ml) + pow(ml, 20.0) * 0.4;
    col = mix(col, moon, smoothstep(mr, mr - 1.5 / m, md) * intro);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

type RGB = [number, number, number];
const hex = (h: string): RGB => {
  const n = parseInt(h.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export const PALETTES: Record<string, [string, string, string]> = {
  // Agency: Aurora (technology & AI).
  aurora: ["#8fd3ff", "#c3a8ff", "#ff9ed2"],
  // Academy: Tropical sunrise (community & new beginnings).
  sunrise: ["#ff9ed2", "#ffc48c", "#8ef0c8"],
};

type Opal = { destroy: () => void };

export function mountOpal(
  canvas: HTMLCanvasElement,
  anchor: HTMLElement,
  palette = "aurora",
  body: "planet" | "sun" = "planet",
): Opal | null {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
    return s;
  };

  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  } catch (err) {
    console.warn("[opal]", err);
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const loc = (name: string) => gl.getUniformLocation(prog, name);
  const u = {
    res: loc("uRes"),
    time: loc("uTime"),
    spin: loc("uSpin"),
    intro: loc("uIntro"),
    mouse: loc("uMouse"),
    center: loc("uCenter"),
    radius: loc("uRadius"),
    bg: loc("uBg"),
    c1: loc("uC1"),
    c2: loc("uC2"),
    c3: loc("uC3"),
    dark: loc("uDark"),
    sun: loc("uSun"),
  };
  gl.uniform1f(u.sun, body === "sun" ? 1 : 0);

  const [c1, c2, c3] = (PALETTES[palette] ?? PALETTES.aurora).map(hex);
  gl.uniform3fv(u.c1, c1);
  gl.uniform3fv(u.c2, c2);
  gl.uniform3fv(u.c3, c3);

  // Background comes from the host section, so light/dark themes just work.
  const setBg = () => {
    const host = canvas.closest("section") ?? document.body;
    const m = getComputedStyle(host).backgroundColor.match(/[\d.]+/g) ?? ["30", "22", "56"];
    const bg: RGB = [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
    const lum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2];
    gl.uniform3fv(u.bg, bg);
    gl.uniform1f(u.dark, lum < 0.5 ? 1 : 0);
  };
  setBg();
  const scheme = matchMedia("(prefers-color-scheme: dark)");
  scheme.addEventListener("change", () => {
    setBg();
    draw(performance.now());
  });

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dprCap = matchMedia("(pointer: coarse)").matches ? 1.25 : 1.6;
  let center = [0, 0];
  let radius = 100;
  let running = false;

  const layout = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const cr = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(cr.width * dpr));
    canvas.height = Math.max(1, Math.round(cr.height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    const ar = anchor.getBoundingClientRect();
    center = [(ar.left + ar.width / 2 - cr.left) * dpr, (cr.bottom - (ar.top + ar.height / 2)) * dpr];
    // The planet leaves room for its ring; the sun leaves room for its corona.
    radius = (ar.width / 2) * (body === "sun" ? 0.5 : 0.58) * dpr;
    if (!running) draw(performance.now());
  };

  // Pointer, smoothed with a critically-damped spring.
  const target = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };
  const vel = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const start = performance.now();
  let last = start;
  let raf = 0;
  let spin = 0.6;
  let boost = 0;

  const draw = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const elapsed = (now - start) / 1000;

    const k = 38;
    const damp = 2 * Math.sqrt(k) * 0.9;
    for (const a of ["x", "y"] as const) {
      vel[a] += ((target[a] - pos[a]) * k - vel[a] * damp) * dt;
      pos[a] += vel[a] * dt;
    }

    // Scroll velocity nudges the spin, then eases back.
    const lenis = (window as unknown as { lenis?: { velocity: number } }).lenis;
    boost += (Math.min(Math.abs(lenis?.velocity ?? 0) * 0.05, 1.2) - boost) * Math.min(dt * 4, 1);
    spin += dt * (0.22 + boost);

    const intro = reduce ? 1 : 1 - Math.pow(1 - Math.min(elapsed / 2.2, 1), 3);

    gl.uniform2f(u.res, canvas.width, canvas.height);
    gl.uniform1f(u.time, reduce ? 8 : elapsed);
    gl.uniform1f(u.spin, reduce ? 0.6 : spin);
    gl.uniform1f(u.intro, intro);
    gl.uniform2f(u.mouse, pos.x, pos.y);
    gl.uniform2f(u.center, center[0], center[1]);
    gl.uniform1f(u.radius, radius);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const loop = (now: number) => {
    draw(now);
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    if (running || reduce) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const ro = new ResizeObserver(layout);
  ro.observe(canvas);
  ro.observe(anchor);
  const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()));
  io.observe(canvas);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener("visibilitychange", onVis);

  layout();

  return {
    destroy() {
      pause();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
    },
  };
}
