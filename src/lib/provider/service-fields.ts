/** SMMFlare / PerfectPanel service types → form fields */

export type ServiceKind =
  | "default"
  | "package"
  | "seo"
  | "custom_comments"
  | "custom_comments_package"
  | "mentions"
  | "mentions_hashtags"
  | "mentions_custom_list"
  | "mentions_hashtag"
  | "mentions_user_followers"
  | "mentions_media_likers"
  | "comment_likes"
  | "poll"
  | "comment_replies"
  | "invites_from_groups"
  | "subscriptions"
  | "web_traffic";

export type ExtraField =
  | "comments"
  | "keywords"
  | "usernames"
  | "hashtags"
  | "hashtag"
  | "username"
  | "media"
  | "groups"
  | "answer_number"
  | "country"
  | "device"
  | "type_of_traffic"
  | "google_keyword"
  | "referring_url"
  | "posts"
  | "old_posts"
  | "delay"
  | "expiry"
  | "runs"
  | "interval";

export function normalizeServiceType(raw: string | undefined | null): ServiceKind {
  const t = (raw || "Default").toLowerCase().trim();
  const map: Record<string, ServiceKind> = {
    default: "default",
    package: "package",
    seo: "seo",
    "custom comments": "custom_comments",
    "custom comments package": "custom_comments_package",
    mentions: "mentions",
    "mentions with hashtags": "mentions_hashtags",
    "mentions custom list": "mentions_custom_list",
    "mentions hashtag": "mentions_hashtag",
    "mentions user followers": "mentions_user_followers",
    "mentions media likers": "mentions_media_likers",
    "comment likes": "comment_likes",
    poll: "poll",
    "comment replies": "comment_replies",
    "invites from groups": "invites_from_groups",
    subscriptions: "subscriptions",
    "web traffic": "web_traffic",
  };
  return map[t] || "default";
}

export function fieldsForKind(kind: ServiceKind): {
  needsLink: boolean;
  needsQuantity: boolean;
  quantityFromComments?: boolean;
  extras: ExtraField[];
} {
  switch (kind) {
    case "package":
      return { needsLink: true, needsQuantity: false, extras: [] };
    case "seo":
      return { needsLink: true, needsQuantity: true, extras: ["keywords"] };
    case "custom_comments":
      return {
        needsLink: true,
        needsQuantity: true,
        quantityFromComments: true,
        extras: ["comments"],
      };
    case "custom_comments_package":
      return { needsLink: true, needsQuantity: false, extras: ["comments"] };
    case "mentions":
      return { needsLink: true, needsQuantity: true, extras: ["usernames"] };
    case "mentions_hashtags":
      return { needsLink: true, needsQuantity: true, extras: ["usernames", "hashtags"] };
    case "mentions_custom_list":
      return { needsLink: true, needsQuantity: false, extras: ["usernames"] };
    case "mentions_hashtag":
      return { needsLink: true, needsQuantity: true, extras: ["hashtag"] };
    case "mentions_user_followers":
      return { needsLink: true, needsQuantity: true, extras: ["username"] };
    case "mentions_media_likers":
      return { needsLink: true, needsQuantity: true, extras: ["media"] };
    case "comment_likes":
      return { needsLink: true, needsQuantity: true, extras: ["username"] };
    case "poll":
      return { needsLink: true, needsQuantity: true, extras: ["answer_number"] };
    case "comment_replies":
      return { needsLink: true, needsQuantity: false, extras: ["username", "comments"] };
    case "invites_from_groups":
      return { needsLink: true, needsQuantity: true, extras: ["groups"] };
    case "subscriptions":
      return {
        needsLink: false,
        needsQuantity: false,
        extras: ["username", "posts", "old_posts", "delay", "expiry"],
      };
    case "web_traffic":
      return {
        needsLink: true,
        needsQuantity: true,
        extras: ["country", "device", "type_of_traffic", "google_keyword", "referring_url", "runs", "interval"],
      };
    default:
      return { needsLink: true, needsQuantity: true, extras: [] };
  }
}

export function fieldsForService(service: { type: ServiceKind; dripfeed?: boolean }) {
  const base = fieldsForKind(service.type);
  if (!service.dripfeed && service.type !== "web_traffic") return base;
  const extras = [...base.extras];
  if (!extras.includes("runs")) extras.push("runs", "interval");
  return { ...base, extras };
}

export function countLines(text: string): number {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean).length;
}

/** Sell price = provider rate × (1 + margin%). Default 40%. */
export function markupRate(providerRate: number): number {
  const pct = Number(process.env.PROVIDER_MARKUP_PERCENT || "40");
  const factor = 1 + (Number.isFinite(pct) ? pct : 40) / 100;
  return Math.round(providerRate * factor * 10000) / 10000;
}
