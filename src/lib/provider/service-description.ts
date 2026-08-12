/**
 * Builds SMMFlare-style multi-line service descriptions from name + flags.
 * No brand names; no face emojis — structured symbol lines only.
 */

const BRAND_RE =
  /\b(smmflare|ssmm\s*panel|ssmmpanel|ssmm|smm\s*flare|perfect\s*panel)\b/gi;

/** Face / people emoji ranges commonly used in provider names */
const FACE_EMOJI_RE =
  /[\u{1F600}-\u{1F64F}\u{1F910}-\u{1F92F}\u{1F970}-\u{1F97A}\u{1F9D0}-\u{1F9DF}\u{263A}\u{FE0F}?\u{1F44B}-\u{1F44F}\u{1F64C}\u{1F64F}\u{1F465}-\u{1F46A}\u{1F9B8}\u{1F9B9}\u{1F9D1}-\u{1F9DD}\u{1F464}\u{1F465}\u{1F476}\u{1F9D2}\u{1FAC3}\u{1FAC4}\u{1FAC5}]/gu;

function cleanText(raw: string): string {
  return String(raw || "")
    .replace(BRAND_RE, "")
    .replace(FACE_EMOJI_RE, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*\|\s*\|\s*/g, " | ")
    .replace(/^\s*\|\s*|\s*\|\s*$/g, "")
    .trim();
}

function fmtNum(n: number): string {
  return n.toLocaleString("en-US");
}

function hasLine(lines: string[], needle: RegExp): boolean {
  return lines.some((l) => needle.test(l));
}

/** Pull bracket tags and pipe segments into feature phrases */
function extractFeatures(name: string): { title: string; features: string[] } {
  const cleaned = cleanText(name);
  const pipeParts = cleaned
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);

  const titleRaw = pipeParts[0] || cleaned;
  const title = titleRaw.replace(/\s*\[[^\]]*\]\s*/g, " ").replace(/\s{2,}/g, " ").trim();

  const features: string[] = [];
  const bracketRe = /\[([^\]]+)\]/g;
  let m: RegExpExecArray | null;
  while ((m = bracketRe.exec(titleRaw)) !== null) {
    const inner = cleanText(m[1]);
    if (inner) features.push(inner);
  }

  for (const part of pipeParts.slice(1)) {
    const withoutDupBrackets = part.replace(/\[([^\]]+)\]/g, (_, inner: string) => {
      const t = cleanText(inner);
      if (t) features.push(t);
      return "";
    });
    const rest = cleanText(withoutDupBrackets);
    if (rest) features.push(rest);
  }

  // Deduplicate (case-insensitive)
  const seen = new Set<string>();
  const unique = features.filter((f) => {
    const key = f.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { title: title || cleaned, features: unique };
}

function decorateFeature(feature: string): string {
  const f = cleanText(feature)
    .replace(/^\s*[⭐🌟✨♻️⚡🚀⏱⏰📈✔️✅⚠⚠️★☆•·]+\s*/u, "")
    .trim();
  if (!f) return "";

  const lower = f.toLowerCase();

  if (/provider\s*service/i.test(f)) return "★ Featured quality line";
  if (/instant\s*start|instant\b/i.test(lower) && !/refill/i.test(lower)) {
    return `⏱ Estimated start: Instant`;
  }
  if (/non\s*drop|less\s*drop|low\s*drop|no\s*drop/i.test(lower)) {
    return `★ ${f}`;
  }
  if (/refill/i.test(lower)) {
    const days = f.match(/(\d+)\s*days?/i)?.[1];
    if (days) return `♻️ Refill window: ${days} days`;
    if (/no\s*refill/i.test(lower)) return "⚠ No refill on this line";
    return `♻️ ${f}`;
  }
  if (/speed\s*:/i.test(lower) || /\/\s*day|per\s*day|k\/day|\/day/i.test(lower)) {
    const speed = f.replace(/^\s*speed\s*:\s*/i, "").trim();
    return `⚡ Speed: ${speed}`;
  }
  if (/^day\s*[\d.,]+\s*[kmb]?$/i.test(lower) || /^[\d.,]+\s*[kmb]?\s*\/?\s*day$/i.test(lower)) {
    const speed = f.replace(/^day\s*/i, "").trim();
    return `⚡ Speed: ~${speed} / Day`;
  }
  if (/real\s*app\s*data|real\s*data|hq\s*accounts|old\s*accounts|organic|high\s*quality|quality/i.test(lower)) {
    return `★ ${f}`;
  }
  if (/max\s*:?\s*[\d.,]+\s*[kmb]?/i.test(lower)) {
    return `📦 ${f}`;
  }
  if (/minute|hour|watch\s*time|duration|retention/i.test(lower)) {
    return `⏱ ${f}`;
  }
  if (/target|geo|country|usa|language/i.test(lower)) {
    return `◎ ${f}`;
  }
  if (/engagement|share|comment|like|view|follower|subscriber|member/i.test(lower) && f.length < 48) {
    return `☆ ${f}`;
  }
  return `• ${f}`;
}

function platformHint(title: string, category: string): string | null {
  const blob = `${title} ${category}`.toLowerCase();
  if (/youtube|yt\b/.test(blob)) {
    return "⚠ Link must be public (video / Shorts / channel as required by the line)";
  }
  if (/instagram|ig\b/.test(blob)) {
    return "⚠ Profile or post must be public and match the service type";
  }
  if (/tiktok/.test(blob)) {
    return "⚠ Profile or video must be public before you submit";
  }
  if (/telegram/.test(blob)) {
    return "⚠ Use a public invite / post link that matches the service type";
  }
  if (/twitter|x\/twitter|\bx\b/.test(blob)) {
    return "⚠ Post or profile must be public and reachable";
  }
  if (/facebook|fb\b/.test(blob)) {
    return "⚠ Page or post must be public and match the service type";
  }
  if (/spotify|soundcloud|twitch|kick|discord|threads|linkedin/.test(blob)) {
    return "⚠ Target URL must be public and correct for this service";
  }
  if (/traffic|website|seo|backlink/.test(blob)) {
    return "⚠ Use a full https URL; keep the page online during delivery";
  }
  return "⚠ Target must be public and reachable for the full delivery window";
}

export type DescriptionInput = {
  name: string;
  category?: string;
  type?: string;
  min: number;
  max: number;
  refill?: boolean;
  cancel?: boolean;
  dripfeed?: boolean;
};

/** Multi-line description with leading symbols (SMMFlare-style layout). */
export function buildServiceDescription(input: DescriptionInput): string {
  const { title, features } = extractFeatures(input.name);
  const lines: string[] = [];

  lines.push(`🚀 ${title}`);
  lines.push("");

  const decorated = features.map(decorateFeature).filter(Boolean);
  // Prefer unique decorated lines
  const seen = new Set<string>();
  for (const d of decorated) {
    const key = d.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(d);
  }

  if (!hasLine(lines, /estimated start|instant/i)) {
    lines.push("⏱ Estimated start: as soon as the queue allows");
  }

  if (input.refill && !hasLine(lines, /refill/i)) {
    lines.push("♻️ Refill: available on this line");
  } else if (!input.refill && !hasLine(lines, /no refill|refill/i)) {
    lines.push("• Refill: not included");
  }

  if (input.cancel) {
    lines.push("✔️ Cancel: supported while pending / early processing");
  } else {
    lines.push("• Cancel: not available once accepted");
  }

  if (input.dripfeed) {
    lines.push("💧 Drip-feed: supported");
  }

  const typeLabel = cleanText(input.type || "Default");
  if (typeLabel && typeLabel.toLowerCase() !== "default") {
    lines.push(`◎ Order type: ${typeLabel}`);
  }

  lines.push(`📦 Quantity range: ${fmtNum(input.min)} – ${fmtNum(input.max)}`);

  const hint = platformHint(title, input.category || "");
  if (hint) lines.push(hint);

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function cleanServiceName(name: string): string {
  return cleanText(name)
    .replace(/\|\s*Provider Service\s*$/i, "")
    .replace(/🌟\s*Provider Service/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
