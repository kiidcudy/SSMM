import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

/** Text-only wordmark — matches site header look, transparent PNG */
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="560" height="112" viewBox="0 0 560 112" fill="none">
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="8" y="74" fill="#F8FAFC" font-size="64" font-weight="800" letter-spacing="1.5">SSMM</text>
    <text x="214" y="74" fill="#7DD3FC" font-size="64" font-weight="600" letter-spacing="0.5">Panel</text>
  </g>
  <rect x="216" y="86" width="148" height="4" rx="2" fill="#22D3EE"/>
</svg>`;

writeFileSync(join(dir, "logo.svg"), svg);

await sharp(Buffer.from(svg), { density: 300 })
  .resize({ width: 560, height: 112, fit: "fill" })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(join(dir, "logo.png"));

console.log("ok");
