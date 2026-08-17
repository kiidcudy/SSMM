export function splitOrderTarget(raw: string): { link: string; comments: string[] } {
  const text = raw ?? "";
  const marker = "---COMMENTS---";
  const idx = text.indexOf(marker);
  if (idx === -1) {
    return { link: text.trim(), comments: [] };
  }
  const link = text.slice(0, idx).trim();
  const comments = text
    .slice(idx + marker.length)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return { link, comments };
}
