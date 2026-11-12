// Holographic point-cloud avatar — framework-free core.
// Usage: const holo = createHologram(container, { THREE, colorSrc, depthSrc });
//   colorSrc: holo-color.jpg (contrast-enhanced greyscale of the photo)
//   depthSrc: holo-data.png  (R = depth, G = silhouette mask)
//        holo.dispose();
// The canvas is transparent, so it can sit on top of an existing scene.

const VERT = /* glsl */ `
  uniform sampler2D uColor;
  uniform sampler2D uDepth;
  uniform float uTime;
  uniform float uDepthScale;
  uniform float uPointSize;
  uniform float uGlitch;
  uniform float uPixelRatio;
  attribute vec2 aUv;
  attribute float aRand;
  varying float vBright;
  varying float vAlpha;
  varying float vScan;

  void main() {
    vec2 uv = aUv;

    // glitch: shift a horizontal band sideways for a few frames
    float band = step(abs(uv.y - fract(uTime * 0.37)), 0.035) * uGlitch;
    uv.x += band * 0.03 * sign(sin(uTime * 90.0));

    vec3 c = texture2D(uColor, uv).rgb;
    vec4 data = texture2D(uDepth, uv);   // r = depth, g = silhouette
    float d = data.r;
    vAlpha = smoothstep(0.35, 0.75, data.g) * smoothstep(0.0, 0.22, uv.y); // fade out the chest

    float lum = dot(c, vec3(0.299, 0.587, 0.114));
    float rim = 1.0 - smoothstep(0.0, 0.22, d);          // edges glow brighter
    vBright = 0.14 + lum * 1.05 + rim * 0.45;

    vec3 p = position;
    p.z = d * uDepthScale;
    // tiny breathing jitter so it never looks frozen
    p += vec3(sin(uTime * 1.3 + aRand * 40.0), cos(uTime * 1.1 + aRand * 31.0), 0.0) * 0.0025;

    // vertical scan sweep (bright band travelling up)
    float sweepY = fract(uTime * 0.18) * 1.4 - 0.2;
    vScan = exp(-pow((uv.y - sweepY) * 22.0, 2.0));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPointSize * uPixelRatio * (1.0 + vScan * 0.8) * (2.6 / -mv.z) * step(0.01, vAlpha);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uTint;
  uniform vec3 uHot;
  uniform float uFlicker;
  varying float vBright;
  varying float vAlpha;
  varying float vScan;

  void main() {
    vec2 q = gl_PointCoord - 0.5;
    float r = length(q);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, r);
    // horizontal scanlines in screen space
    float lines = 0.72 + 0.28 * step(0.5, fract(gl_FragCoord.y * 0.5));
    vec3 col = mix(uTint, uHot, clamp(vBright - 0.7, 0.0, 1.0) + vScan * 0.6);
    float a = soft * vAlpha * vBright * lines * uFlicker * (0.9 + vScan);
    gl_FragColor = vec4(col * a, a);
  }
`;

export function createHologram(container, opts) {
  const {
    THREE,
    colorSrc,
    depthSrc,
    tint = '#22d3ee',
    hot = '#e0fbff',
    depthScale = 0.32,
    density,                // grid size; auto by viewport when omitted
    interactive = true,
  } = opts;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.matchMedia('(max-width: 768px)').matches;
  const grid = density || (isSmall ? 150 : 230);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  const pr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pr);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
  camera.position.set(0, 0, 2.6);

  // grid of points; the shader drops the ones outside the silhouette
  const n = grid * grid;
  const pos = new Float32Array(n * 3);
  const uvs = new Float32Array(n * 2);
  const rnd = new Float32Array(n);
  let i = 0;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++, i++) {
      const jx = (Math.random() - 0.5) / grid;
      const jy = (Math.random() - 0.5) / grid;
      const u = x / (grid - 1) + jx, v = y / (grid - 1) + jy;
      pos[i * 3] = u - 0.5;
      pos[i * 3 + 1] = v - 0.5;
      uvs[i * 2] = u;
      uvs[i * 2 + 1] = v;
      rnd[i] = Math.random();
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aUv', new THREE.BufferAttribute(uvs, 2));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));

  const loader = new THREE.TextureLoader();
  const colorTex = loader.load(colorSrc, () => renderOnce());
  const depthTex = loader.load(depthSrc, () => renderOnce());
  [colorTex, depthTex].forEach((t) => { t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; });

  const uniforms = {
    uColor: { value: colorTex },
    uDepth: { value: depthTex },
    uTime: { value: 0 },
    uDepthScale: { value: depthScale },
    uPointSize: { value: (isSmall ? 2.6 : 2.0) * (230 / grid) },
    uPixelRatio: { value: pr },
    uGlitch: { value: 0 },
    uFlicker: { value: 1 },
    uTint: { value: new THREE.Color(tint) },
    uHot: { value: new THREE.Color(hot) },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, uniforms,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // sizing
  function resize() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // keep dots just overlapping whatever the container size:
    // the unit plane fills ~67% of the view height at this fov/distance
    const planePx = h * 0.67;
    uniforms.uPointSize.value = (planePx / grid) * 2.4;
    renderOnce();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // pointer tilt
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  function onPointer(e) {
    const r = container.getBoundingClientRect();
    target.y = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 0.9;
    target.x = ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 0.35;
  }
  if (interactive && !reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true });

  // render loop, paused when off screen or tab hidden
  let visible = true, raf = 0, glitchUntil = 0, nextGlitch = 2;
  const timer = new THREE.Timer(); // THREE.Clock is deprecated since r183
  function renderOnce() { renderer.render(scene, camera); }
  function tick(now) {
    raf = 0;
    if (!visible || document.hidden) return;
    const t = timer.update(now).getElapsed();
    uniforms.uTime.value = t;
    if (t > nextGlitch) { glitchUntil = t + 0.12 + Math.random() * 0.15; nextGlitch = t + 3 + Math.random() * 5; }
    uniforms.uGlitch.value = t < glitchUntil ? 1 : 0;
    uniforms.uFlicker.value = 0.93 + 0.07 * Math.sin(t * 23.0) * Math.sin(t * 3.7) - (t < glitchUntil ? 0.25 : 0);
    cur.x += (target.x - cur.x) * 0.06;
    cur.y += (target.y - cur.y) * 0.06;
    group.rotation.y = cur.y + Math.sin(t * 0.4) * 0.08;
    group.rotation.x = cur.x;
    renderOnce();
    raf = requestAnimationFrame(tick);
  }
  function start() { if (!raf && !reduceMotion) raf = requestAnimationFrame(tick); }

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0.01 });
  io.observe(container);
  const onVis = () => { if (!document.hidden) start(); };
  document.addEventListener('visibilitychange', onVis);

  resize();
  if (reduceMotion) { uniforms.uTime.value = 1.5; renderOnce(); } else start();

  return {
    setTint(hex, hotHex) {
      uniforms.uTint.value.set(hex);
      if (hotHex) uniforms.uHot.value.set(hotHex);
      renderOnce();
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
      timer.dispose();
      geo.dispose(); mat.dispose(); colorTex.dispose(); depthTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
