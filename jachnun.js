/* Procedural jachnun illustration: a rolled, layered, caramelised log — not a sausage.
   jachnun({ x, y, len, th, rot, seed }) returns an SVG <g> string. Needs the shared
   defs from jachnunDefs() once per document. */

(() => {
function mulberry(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f1 = (n) => n.toFixed(1);

// Catmull-Rom through points -> cubic bezier segments (continuing an open path)
function smooth(pts) {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f1(c1[0])},${f1(c1[1])} ${f1(c2[0])},${f1(c2[1])} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return d;
}

function jachnunDefs() {
  return `
  <linearGradient id="jg-body" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#a8682f"/>
    <stop offset=".35" stop-color="#83481b"/>
    <stop offset=".8" stop-color="#55290c"/>
    <stop offset="1" stop-color="#3a1906"/>
  </linearGradient>
  <linearGradient id="jg-ends" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#2a1004" stop-opacity=".45"/>
    <stop offset=".12" stop-color="#2a1004" stop-opacity="0"/>
    <stop offset=".88" stop-color="#2a1004" stop-opacity="0"/>
    <stop offset="1" stop-color="#2a1004" stop-opacity=".35"/>
  </linearGradient>
  <filter id="jf-soft" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="jf-tiny" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".8"/></filter>`;
}

let jUid = 0;
function jachnun({ x = 0, y = 0, len = 240, th = 56, rot = 0, seed = 1, shadow = false } = {}) {
  const r = mulberry(seed * 9973 + 17);
  const id = `jc${++jUid}`;
  const h = th / 2;
  const halfAt = (px) => h * (1 - 0.26 * Math.pow(Math.max(0, Math.min(1, px / len)), 1.5));

  // --- layer boundaries first: everything else (outline steps, shading) follows them
  const edges = [];
  for (let lx = h * 0.85; lx < len - h * 0.55; lx += th * (0.24 + r() * 0.32)) {
    edges.push({ x: lx, lean: (r() - 0.4) * th * 0.28, partial: r() < 0.25 });
  }

  // --- outline: one point per layer, so each sheet steps the silhouette a little
  const top = [], bot = [];
  const xs = [h * 0.5, ...edges.map((e) => e.x), len - h * 0.5];
  xs.forEach((px) => {
    const half = halfAt(px);
    top.push([px - 0, -half * (1 + (r() - 0.5) * 0.1)]);
    bot.push([px, half * (1 + (r() - 0.5) * 0.1)]);
  });
  const N = top.length - 1;
  const T0 = top[0], B0 = bot[0], TN = top[N], BN = bot[N];
  const capR = (BN[1] - TN[1]) / 2;
  const body =
    `M${f1(T0[0])},${f1(T0[1])}` + smooth(top) +
    ` C${f1(TN[0] + capR * 1.2)},${f1(TN[1])} ${f1(BN[0] + capR * 1.2)},${f1(BN[1])} ${f1(BN[0])},${f1(BN[1])}` +
    smooth([...bot].reverse()) +
    ` C${f1(B0[0] - h * 0.7)},${f1(B0[1])} ${f1(T0[0] - h * 0.7)},${f1(T0[1])} ${f1(T0[0])},${f1(T0[1])} Z`;

  // --- each sheet a slightly different tone (the patchwork you see on a real one)
  let sheets = '';
  for (let i = 0; i < edges.length; i++) {
    const a = edges[i], b = edges[i + 1] || { x: len + h, lean: 0 };
    const ha = halfAt(a.x) * 1.2, hb = halfAt(b.x) * 1.2;
    const light = r() < 0.5;
    sheets += `<path d="M${f1(a.x - a.lean)},${f1(-ha)} L${f1(b.x - b.lean)},${f1(-hb)} L${f1(b.x + b.lean)},${f1(hb)} L${f1(a.x + a.lean)},${f1(ha)} Z" fill="${light ? '#d7975a' : '#24100a'}" opacity="${(light ? 0.07 + r() * 0.12 : 0.05 + r() * 0.12).toFixed(2)}"/>`;
  }

  // --- the sheet edges: soft shadow under a frayed, light lip
  let lips = '';
  for (const e of edges) {
    const half = halfAt(e.x), pts = [];
    const to = e.partial ? -0.2 + r() * 0.7 : 1.1;
    for (let i = 0; i <= 5; i++) {
      const t = -1.1 + (to + 1.1) * (i / 5);
      pts.push([e.x + e.lean * t + (r() - 0.5) * th * 0.025, t * half]);
    }
    const d = `M${f1(pts[0][0])},${f1(pts[0][1])}` + smooth(pts);
    lips += `<path d="${d}" transform="translate(${f1(th * 0.035)},0)" stroke="#1a0802" stroke-opacity=".42" stroke-width="${f1(th * 0.07)}" fill="none" filter="url(#jf-tiny)"/>`;
    lips += `<path d="${d}" stroke="#d9a873" stroke-opacity="${(0.3 + r() * 0.25).toFixed(2)}" stroke-width="${f1(th * (0.016 + r() * 0.012))}" fill="none" stroke-linecap="round"/>`;
  }

  // --- gloss: a long soft sheen and a few gentle wet spots
  let gloss = `<path d="M${f1(len * 0.06)},${f1(-h * 0.45)} Q${f1(len * 0.45)},${f1(-h * 0.68)} ${f1(len * 0.9)},${f1(-h * 0.36)}" stroke="#ffd9a6" stroke-opacity=".2" stroke-width="${f1(th * 0.18)}" fill="none" stroke-linecap="round" filter="url(#jf-soft)"/>`;
  for (let i = 0; i < Math.round(len / 60); i++) {
    const px = h + r() * (len - h * 2), py = -h * (0.25 + r() * 0.4);
    gloss += `<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(th * (0.07 + r() * 0.08))}" ry="${f1(th * 0.03)}" fill="#ffe6c4" opacity="${(0.12 + r() * 0.12).toFixed(2)}" filter="url(#jf-tiny)"/>`;
  }

  // --- tiny pale specks
  let specks = '';
  for (let i = 0; i < Math.round(len / 8); i++) {
    const px = h * 0.6 + r() * (len - h * 1.2), py = (r() - 0.5) * th * 0.85;
    specks += `<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(th * (0.007 + r() * 0.012))}" fill="#f1dcc0" opacity="${(0.3 + r() * 0.35).toFixed(2)}"/>`;
  }

  // --- the folded end: stacked sheet edges following the cap
  let cap = '';
  for (let i = 0; i < 3; i++) {
    const inset = h * (0.1 + i * 0.17);
    const ex = T0[0] - h * 0.6 + inset, ty = T0[1] + inset * 0.85, by = B0[1] - inset * 0.85;
    cap += `<path d="M${f1(T0[0] + inset * 0.4)},${f1(ty)} C${f1(ex)},${f1(ty)} ${f1(ex)},${f1(by)} ${f1(B0[0] + inset * 0.4)},${f1(by)}" stroke="#d09a5e" stroke-opacity="${(0.45 - i * 0.1).toFixed(2)}" stroke-width="${f1(th * 0.02)}" fill="none" stroke-linecap="round"/>`;
  }

  // --- fine cracks and wrinkles in the dough
  let wrinkles = '';
  for (let i = 0; i < Math.round(len / 10); i++) {
    const px = h * 0.8 + r() * (len - h * 1.6), py = (r() - 0.5) * th * 0.8;
    const dx = th * (0.06 + r() * 0.14), dy = (r() - 0.5) * th * 0.12;
    const light = r() < 0.6;
    wrinkles += `<path d="M${f1(px)},${f1(py)} q${f1(dx / 2)},${f1(dy + (r() - 0.5) * th * 0.06)} ${f1(dx)},${f1(dy)}" stroke="${light ? '#e2b47e' : '#1e0b03'}" stroke-opacity="${(light ? 0.18 + r() * 0.2 : 0.2 + r() * 0.2).toFixed(2)}" stroke-width="${f1(th * 0.012)}" fill="none" stroke-linecap="round"/>`;
  }

  const sh = shadow
    ? `<ellipse cx="${f1(len / 2)}" cy="${f1(h * 0.6)}" rx="${f1(len * 0.52)}" ry="${f1(h * 0.75)}" fill="#3a1a08" opacity=".22" filter="url(#jf-soft)"/>`
    : '';

  return `<g transform="translate(${f1(x)},${f1(y)}) rotate(${rot})">
    ${sh}
    <clipPath id="${id}"><path d="${body}"/></clipPath>
    <path d="${body}" fill="url(#jg-body)"/>
    <g clip-path="url(#${id})">
      ${sheets}
      <rect x="-10" y="${f1(-th)}" width="${f1(len + 20)}" height="${f1(th * 2)}" fill="url(#jg-ends)"/>
      ${wrinkles}${lips}${specks}${gloss}${cap}
    </g>
    <path d="${body}" fill="none" stroke="#2a1004" stroke-opacity=".4" stroke-width="${f1(th * 0.022)}"/>
  </g>`;
}

window.jachnun = jachnun;
window.jachnunDefs = jachnunDefs;
})();
