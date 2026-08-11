export type PlatformId =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "telegram"
  | "facebook"
  | "twitter"
  | "spotify"
  | "twitch"
  | "discord"
  | "linkedin"
  | "threads"
  | "snapchat"
  | "reddit"
  | "other";

export function detectPlatform(...parts: Array<string | undefined | null>): PlatformId {
  const text = parts.filter(Boolean).join(" ").toLowerCase();

  if (/instagram|\big\b/.test(text)) return "instagram";
  if (/tik\s*tok|\btt\b/.test(text)) return "tiktok";
  if (/youtube|\byt\b/.test(text)) return "youtube";
  if (/telegram|\btg\b/.test(text)) return "telegram";
  if (/facebook|\bfb\b/.test(text)) return "facebook";
  if (/twitter|x\.com|twitter\/x|(^|[\s|/_-])x([\s|/_-]|$)/.test(text)) return "twitter";
  if (/spotify/.test(text)) return "spotify";
  if (/twitch/.test(text)) return "twitch";
  if (/discord/.test(text)) return "discord";
  if (/linkedin/.test(text)) return "linkedin";
  if (/threads/.test(text)) return "threads";
  if (/snapchat|\bsnap\b/.test(text)) return "snapchat";
  if (/reddit/.test(text)) return "reddit";
  return "other";
}
