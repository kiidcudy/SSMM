import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="760" height="168" viewBox="0 0 760 168" fill="none">
  <defs>
    <linearGradient id="g" x1="36" y1="24" x2="128" y2="148" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22D3EE"/>
      <stop offset="55%" stop-color="#3B9EF5"/>
      <stop offset="100%" stop-color="#4F6FE8"/>
    </linearGradient>
  </defs>

  <!-- Stroke S mark — transparent, no square plate -->
  <path
    d="M118 42C112 30 96 24 78 24C56 24 42 38 42 56C42 78 62 86 86 94C108 102 124 112 124 130C124 150 106 158 84 158C64 158 48 150 42 138"
    stroke="url(#g)"
    stroke-width="26"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />

  <g font-family="Arial, Helvetica, sans-serif">
    <text x="168" y="100" fill="#F8FAFC" font-size="56" font-weight="800" letter-spacing="2">SSMM</text>
    <text x="368" y="100" fill="#7DD3FC" font-size="56" font-weight="600" letter-spacing="1">Panel</text>
  </g>
  <rect x="370" y="114" width="130" height="3" rx="1.5" fill="#22D3EE"/>
</svg>`;

writeFileSync(join(dir, "logo.svg"), svg);

await sharp(Buffer.from(svg), { density: 240 })
  .resize({ width: 760, height: 168, fit: "fill" })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(join(dir, "logo.png"));

const mark = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
  <defs>
    <linearGradient id="g" x1="40" y1="28" x2="140" y2="156" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22D3EE"/>
      <stop offset="55%" stop-color="#3B9EF5"/>
      <stop offset="100%" stop-color="#4F6FE8"/>
    </linearGradient>
  </defs>
  <path
    d="M130 48C123 34 104 26 84 26C58 26 42 42 42 64C42 90 66 100 94 110C120 120 138 132 138 154C138 176 118 186 92 186C70 186 52 176 44 162"
    transform="translate(0,-12)"
    stroke="url(#g)"
    stroke-width="28"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />
</svg>`;

writeFileSync(join(dir, "logo-mark.svg"), mark);
await sharp(Buffer.from(mark), { density: 240 })
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(join(dir, "logo-mark.png"));

console.log("ok");
