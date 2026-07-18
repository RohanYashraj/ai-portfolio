// Generates flat, on-brand placeholder SVGs (worksheet grid + indigo curve).
// Run: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "placeholders");
mkdirSync(outDir, { recursive: true });

const LINE = "#E7E7E2";
const INDIGO = "#2E3A87";
const SLATE = "#5B6472";

// A faint square grid with tiny "+" ticks at intersections.
function grid(w, h, step = 40) {
  let lines = "";
  for (let x = step; x < w; x += step) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = step; y < h; y += step) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  let ticks = "";
  for (let x = step; x < w; x += step)
    for (let y = step; y < h; y += step)
      ticks += `<path d="M${x - 3} ${y} H${x + 3} M${x} ${y - 3} V${y + 3}"/>`;
  return `<g stroke="${LINE}" stroke-width="1">${lines}</g><g stroke="${INDIGO}" stroke-opacity="0.18" stroke-width="1">${ticks}</g>`;
}

function curve(w, h, shape) {
  const pts = [];
  const n = 60;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    let y;
    if (shape === "density") y = Math.exp(-Math.pow((t - 0.5) * 4, 2));
    else if (shape === "logistic") y = 1 / (1 + Math.exp(-(t - 0.5) * 10));
    else y = Math.exp(-t * 2.2); // survival
    const px = t * w;
    const py = h - (0.18 * h + y * 0.62 * h);
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return `<polyline points="${pts.join(" ")}" fill="none" stroke="${INDIGO}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function cover(label, shape) {
  const w = 1200;
  const h = 800;
  // Transparent background so the theme-aware container colour shows through.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${grid(w, h, 48)}
  ${curve(w, h, shape)}
  <text x="56" y="${h - 56}" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="26" letter-spacing="3" fill="${SLATE}">${label.toUpperCase()}</text>
</svg>`;
}

function profile() {
  const w = 900;
  const h = 1100;
  // Simple, neutral figure silhouette on the worksheet grid.
  const cx = w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${grid(w, h, 50)}
  <g fill="${INDIGO}" fill-opacity="0.14">
    <circle cx="${cx}" cy="${h * 0.42}" r="150"/>
    <path d="M${cx - 250} ${h} a250 250 0 0 1 500 0 Z"/>
  </g>
  <text x="56" y="${h - 56}" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="26" letter-spacing="3" fill="${SLATE}">PORTRAIT · UPLOAD IN STUDIO</text>
</svg>`;
}

const files = {
  "profile.svg": profile(),
  "cover-book.svg": cover("Book", "logistic"),
  "cover-research.svg": cover("Research", "density"),
  "cover-teaching.svg": cover("Teaching", "survival"),
  "cover-client.svg": cover("Client work", "logistic"),
  "cover-conference.svg": cover("Conference", "density"),
  "cover-post.svg": cover("Writing", "survival"),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(outDir, name), svg);
  console.log("wrote", name);
}
