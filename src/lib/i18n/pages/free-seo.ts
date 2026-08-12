import type { FreePack, FreePlatform } from "@/lib/data/free-services";
import { FREE_PACKS } from "@/lib/data/free-services";
import type { Locale } from "@/lib/site";

export type FreeFaq = { q: string; a: string };

type MetricKey =
  | "followers"
  | "likes"
  | "views"
  | "storyViews"
  | "comments"
  | "subscribers"
  | "members"
  | "postViews"
  | "pageLikes"
  | "postLikes"
  | "plays";

const PACK_METRIC: Record<string, MetricKey> = {
  "free-instagram-followers-20": "followers",
  "free-instagram-likes-10": "likes",
  "free-instagram-views-50": "views",
  "free-instagram-story-views-25": "storyViews",
  "free-instagram-comments-5": "comments",
  "free-tiktok-followers-15": "followers",
  "free-tiktok-likes-20": "likes",
  "free-tiktok-views-50": "views",
  "free-youtube-likes-5": "likes",
  "free-youtube-views-50": "views",
  "free-youtube-subscribers-3": "subscribers",
  "free-telegram-members-10": "members",
  "free-telegram-post-views-30": "postViews",
  "free-facebook-page-likes-10": "pageLikes",
  "free-facebook-post-likes-15": "postLikes",
  "free-twitter-followers-10": "followers",
  "free-twitter-likes-15": "likes",
  "free-spotify-plays-25": "plays",
  "free-spotify-followers-10": "followers",
  "free-twitch-followers-10": "followers",
};

type TitleMode = "prefix" | "suffix" | "suffix-de" | "ar";

type TableCopy = {
  field: string;
  value: string;
  why: string;
  pack: string;
  platform: string;
  quantity: string;
  cooldown: string;
  password: string;
  next: string;
  packWhy: string;
  platformWhy: string;
  quantityWhy: string;
  cooldownWhy: string;
  passwordWhy: string;
  passwordVal: string;
  nextWhy: string;
  nextVal: string;
  hours: string;
};

type ContentCopy = {
  intro1: string;
  intro3: string;
  hWhat: string;
  pWhat1: string;
  pWhat2: string;
  hWho: string;
  pWho1: string;
  pWho2: string;
  pWho3: string;
  hHow: string;
  steps: string[];
  pHow: string;
  hLink: string;
  pLink1: string;
  pLink2: string;
  pLink3: string;
  hDiff: string;
  pDiff1: string;
  pDiff2: string;
  pDiff3: string;
  hCool: string;
  pCool1: string;
  pCool2: string;
  hAfter: string;
  pAfter1: string;
  pAfter2: string;
  pAfter3: string;
  hRel: string;
  hCheck: string;
  checks: string[];
  outro: string;
};

type LocaleBundle = {
  platforms: Record<FreePlatform, string>;
  blurbs: Record<FreePlatform, string>;
  units: Record<MetricKey, string>;
  titleMetric: Record<MetricKey, string>;
  freeWord: string;
  titleMode: TitleMode;
  kw: string;
  desc: string;
  metaTitle: string;
  metaDesc: string;
  imageAlt: string;
  keywords: [string, string, string];
  relatedBlog: string;
  relatedServices: string;
  relatedPayments: string;
  table: TableCopy;
  faq: [string, string][];
  takeaway: string;
  content: ContentCopy;
};

type HtmlCtx = {
  title: string;
  unit: string;
  qty: number;
  cooldown: number;
  fk: string;
  label: string;
  blurb: string;
  hours: string;
  relatedBlog: string;
  relatedServices: string;
  relatedPayments: string;
};

function fill(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

function interp(tpl: string, ctx: HtmlCtx): string {
  return tpl
    .replace(/\$\{title\}/g, ctx.title)
    .replace(/\$\{unit\}/g, ctx.unit)
    .replace(/\$\{qty\}/g, String(ctx.qty))
    .replace(/\$\{cooldown\}/g, String(ctx.cooldown))
    .replace(/\$\{fk\}/g, ctx.fk)
    .replace(/\$\{label\}/g, ctx.label)
    .replace(/\$\{blurb\}/g, ctx.blurb)
    .replace(/\$\{hours\}/g, ctx.hours)
    .replace(/\$\{relatedBlog\}/g, ctx.relatedBlog)
    .replace(/\$\{relatedServices\}/g, ctx.relatedServices)
    .replace(/\$\{relatedPayments\}/g, ctx.relatedPayments);
}

function metricOf(pack: FreePack): MetricKey {
  return PACK_METRIC[pack.slug] ?? "followers";
}

function buildTitle(b: LocaleBundle, platform: FreePlatform, metric: MetricKey): string {
  const pl = b.platforms[platform];
  const tm = b.titleMetric[metric];
  switch (b.titleMode) {
    case "suffix-de":
      return `${tm} de ${pl} ${b.freeWord}`;
    case "suffix":
    case "ar":
      return `${tm} ${pl} ${b.freeWord}`;
    default:
      return `${b.freeWord} ${pl} ${tm}`;
  }
}

function resolveLocale(locale?: Locale | null): Locale {
  if (locale && locale in BUNDLES) return locale;
  return "en";
}

function packVars(pack: FreePack, b: LocaleBundle) {
  const metric = metricOf(pack);
  const platform = b.platforms[pack.platform];
  const unit = b.units[metric];
  const titleMetric = b.titleMetric[metric];
  const title = buildTitle(b, pack.platform, metric);
  const base = {
    platform,
    unit,
    titleMetric,
    qty: pack.quantity,
    cooldown: pack.cooldownHours,
    title,
    label: platform,
    fk: fill(b.kw, { platform, unit }),
  };
  return base;
}

function renderContentHtml(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  const c = b.content;
  const T = b.table;
  const steps = c.steps.map((s) => `<li>${interp(s, ctx)}</li>`).join("\n");
  const checks = c.checks.map((s) => `<li>${interp(s, ctx)}</li>`).join("\n");
  const platformWhy = fill(T.platformWhy, { label: ctx.label });

  return `
<p>${interp(c.intro1, ctx)}</p>

<p>${ctx.blurb}</p>

<p>${interp(c.intro3, ctx)}</p>

<h2>${interp(c.hWhat, ctx)}</h2>
<p>${interp(c.pWhat1, ctx)}</p>
<p>${interp(c.pWhat2, ctx)}</p>

<table>
<thead>
<tr><th>${T.field}</th><th>${T.value}</th><th>${T.why}</th></tr>
</thead>
<tbody>
<tr><td>${T.pack}</td><td>${ctx.title}</td><td>${T.packWhy}</td></tr>
<tr><td>${T.platform}</td><td>${ctx.label}</td><td>${platformWhy}</td></tr>
<tr><td>${T.quantity}</td><td>${ctx.qty} ${ctx.unit}</td><td>${T.quantityWhy}</td></tr>
<tr><td>${T.cooldown}</td><td>${ctx.cooldown} ${T.hours}</td><td>${T.cooldownWhy}</td></tr>
<tr><td>${T.password}</td><td>${T.passwordVal}</td><td>${T.passwordWhy}</td></tr>
<tr><td>${T.next}</td><td>${T.nextVal}</td><td>${T.nextWhy}</td></tr>
</tbody>
</table>

<h2>${interp(c.hWho, ctx)}</h2>
<p>${interp(c.pWho1, ctx)}</p>
<p>${interp(c.pWho2, ctx)}</p>
<p>${interp(c.pWho3, ctx)}</p>

<h2>${interp(c.hHow, ctx)}</h2>
<ol>
${steps}
</ol>
<p>${interp(c.pHow, ctx)}</p>

<h2>${interp(c.hLink, ctx)}</h2>
<p>${interp(c.pLink1, ctx)}</p>
<p>${interp(c.pLink2, ctx)}</p>
<p>${interp(c.pLink3, ctx)}</p>

<h2>${interp(c.hDiff, ctx)}</h2>
<p>${interp(c.pDiff1, ctx)}</p>
<p>${interp(c.pDiff2, ctx)}</p>
<p>${interp(c.pDiff3, ctx)}</p>

<h2>${interp(c.hCool, ctx)}</h2>
<p>${interp(c.pCool1, ctx)}</p>
<p>${interp(c.pCool2, ctx)}</p>

<h2>${interp(c.hAfter, ctx)}</h2>
<p>${interp(c.pAfter1, ctx)}</p>
<p>${interp(c.pAfter2, ctx)}</p>
<p>${interp(c.pAfter3, ctx)}</p>

<h2>${interp(c.hRel, ctx)}</h2>
${relatedHtml}

<h2>${interp(c.hCheck, ctx)}</h2>
<ul>
${checks}
</ul>
<p>${interp(c.outro, ctx)}</p>
`.trim();
}

/** Per-locale HTML template builders (shared structure, localized prose). */
function contentHtmlEn(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}
function contentHtmlTr(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}
function contentHtmlEs(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}
function contentHtmlPtBr(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}
function contentHtmlAr(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}
function contentHtmlId(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}
function contentHtmlBn(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}
function contentHtmlHi(b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string): string {
  return renderContentHtml(b, ctx, relatedHtml);
}

const CONTENT_BUILDERS: Record<
  Locale,
  (b: LocaleBundle, ctx: HtmlCtx, relatedHtml: string) => string
> = {
  en: contentHtmlEn,
  tr: contentHtmlTr,
  es: contentHtmlEs,
  "pt-br": contentHtmlPtBr,
  ar: contentHtmlAr,
  id: contentHtmlId,
  bn: contentHtmlBn,
  hi: contentHtmlHi,
};

// —— Locale bundles (fields + long-form content) ——
// Content continues in the same file via BUNDLES below.

const enContent: ContentCopy = {
  intro1:
    "Looking for <strong>${fk}</strong> you can actually claim and track? On SSMM Panel the <strong>${title}</strong> pack delivers <strong>${qty} ${unit}</strong> to a public ${label} target so you can watch start time, remains, and final status before you fund a larger balance. This page is the operator guide for that exact trial — not a recycled “free followers forever” script paragraph.",
  intro3:
    'Free inventory exists to reduce blind deposits. Read the rules, paste a public URL, claim once per cooldown, then decide whether the same metric deserves a paid line from <a href="/services">Services</a>. For the wider free-vs-paid decision tree, see our guide on <a href="/blog/free-smm-services-vs-paid-when-to-upgrade">${relatedBlog}</a>.',
  hWhat: "What ${title} includes",
  pWhat1:
    "The pack name is literal: you are requesting ${qty} ${unit} through the free-services desk on ssmmpanel.com. Quantity is capped on purpose. Tiny packs make it easier to see whether a link format is accepted and whether status moves from pending to processing without guessing in a chat thread.",
  pWhat2:
    'Cooldown is <strong>${cooldown} ${hours}</strong> between successful claims of this same pack. That limit protects inventory for other testers and blocks farming with throwaway accounts. If you need daily volume, that is a paid workflow after <a href="/payments">adding funds</a>.',
  hWho: "Who should claim ${fk}",
  pWho1:
    "Creators who have never ordered on SSMM Panel should start here. A free pack teaches the dashboard language — New order vs Free Services, status labels, and where remains appear — without a PayPal screenshot first.",
  pWho2:
    'Shop owners can use ${unit} samples around a single public post or profile when they want to know if a link will be rejected before a product drop. Resellers should treat free packs as personal QA, not as customer SKUs; customer traffic belongs on paid API lines documented at <a href="/api-docs">API docs</a>.',
  pWho3:
    'If you are brand-new to panels entirely, read <a href="/blog/what-is-an-smm-panel-beginners-guide-2026">what is an SMM panel</a> first, then return to claim ${title}.',
  hHow: "How to claim this free pack step by step",
  steps: [
    '<a href="/signup">Create a free account</a> with a username you will also put on payment notes later.',
    "Confirm you can log into the dashboard and open Free Services.",
    "Select <strong>${title}</strong> and copy the link format tips shown for ${label}.",
    "Paste a <strong>public</strong> ${label} URL. Private targets usually fail silently or cancel.",
    "Submit and watch Orders (or the free-claim status view) until the run finishes or partially completes.",
    "Wait the full ${cooldown}h before claiming this pack again. Use that time to decide on a paid top-up.",
  ],
  pHow: 'Payment is not required for this trial. When you are ready to scale, use <a href="/payments/paypal">PayPal</a>, crypto, or another method listed on Payments, then re-order a larger ${unit} line from the live catalog.',
  hLink: "Link rules and safety for ${label}",
  pLink1:
    "Public means a visitor who is not logged in as you can open the URL. Locked accounts, restricted posts, or geo-blocked media are common reasons free ${unit} never start. Fix visibility first; do not burn the cooldown on a private target.",
  pLink2:
    'Never share passwords, recovery codes, or session cookies with any panel — including SSMM Panel. Some industry practices still push unclear forms; our free and paid desks are link-based. For a neutral background on social marketing tactics, skim Wikipedia’s overview of <a href="https://en.wikipedia.org/wiki/Social_media_marketing" rel="noopener noreferrer">social media marketing</a>, then keep your operational rules strict.',
  pLink3:
    "Start with this free quantity even if you plan bigger numbers later. Huge first spikes on empty profiles look unnatural and teach you nothing about which service ID to keep.",
  hDiff: "How free delivery differs from paid ${unit}",
  pDiff1:
    "Free packs share the same general status vocabulary as paid orders — pending, processing, partial, completed — but inventory priority and speed can differ. A free line that starts within a reasonable window is a green light to fund the wallet. A free line that stalls past the description is a signal to open a ticket with your username before you deposit.",
  pDiff2:
    "Paid ${label} ${unit} unlock higher max quantities, optional drip-feed on some rows, and refill windows when the service text says so. Free packs intentionally omit campaign features so the trial stays simple.",
  pDiff3:
    'Track the service notes you see after a successful free claim. When you move to paid, re-order a row that behaved similarly. Our <a href="/blog/how-to-place-your-first-smm-panel-order">first order guide</a> walks through signup, deposit, and checkout on SSMM Panel.',
  hCool: "Cooldown and fair use",
  pCool1:
    'The ${cooldown}-hour window applies per account for this pack. Creating stacks of throwaway emails to farm ${fk} violates fair use and can freeze free access. Opening payment disputes without contacting support first can also freeze paid access — read <a href="/terms">Terms of Service</a>.',
  pCool2:
    "One clean claim that you document with before/after screenshots is more valuable than five rushed claims. Operators who treat free packs as measurement tools graduate to paid lines faster and waste less balance.",
  hAfter: "After the trial: upgrade path on SSMM Panel",
  pAfter1:
    "When ${qty} ${unit} looks acceptable, open Services, filter ${label}, and pick a paid row for the same metric. Confirm rate per 1,000, min/max, and drip-feed notes before checkout. Small first deposits are welcome — see the Payments landings for proof + username matching.",
  pAfter2:
    "Creators who only need occasional bumps can stay on the dashboard. Stores that sell SMM to their own customers should generate an API key and call services/add/status/balance. Free packs stay outside that automation path on purpose.",
  pAfter3:
    'Still unsure? Browse sibling free packs below, or ask on <a href="/contact">Contact</a> / WhatsApp with your username. Privacy details live in the <a href="/privacy">Privacy Policy</a>; company context is on <a href="/about">About Us</a>.',
  hRel: "Related free packs and next reads",
  hCheck: "Quick checklist before you click claim",
  checks: [
    "Account created on ssmmpanel.com",
    "Target is public on ${label}",
    "You understand the quantity is ${qty} ${unit}",
    "You can wait ${cooldown}h before repeating this pack",
    "You will not send a password to anyone",
    "You know where Orders/status will appear after submit",
  ],
  outro:
    "Claim <strong>${title}</strong> when that list is true. Use the free result as evidence, then either stop, try another free metric, or deposit and scale with eyes open.",
};

const BUNDLES: Record<Locale, LocaleBundle> = {
  en: {
    platforms: {
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      telegram: "Telegram",
      facebook: "Facebook",
      twitter: "Twitter / X",
      spotify: "Spotify",
      twitch: "Twitch",
    },
    blurbs: {
      instagram:
        "Instagram still concentrates the most SMM trial traffic — profile proof, post likes, Reels views, stories, and comments each sit on separate service rows with their own min/max rules.",
      tiktok:
        "TikTok trials are usually about watching how a new clip’s views or likes begin. Public video URLs and profile links are enough; never hand over a login.",
      youtube:
        "YouTube free packs stay intentionally tiny. Likes, views, and subscribers behave differently in the supplier feed, so a small sample teaches you which line to re-order later.",
      telegram:
        "Telegram trials focus on public channels, groups, and post links. Member and view lines often need longer cooldowns because inventory moves slower than Instagram likes.",
      facebook:
        "Facebook page and post packs help shops test whether a public page URL is accepted before paying for larger engagement.",
      twitter:
        "Twitter/X free packs use public profile or post URLs. Counts are small on purpose so you can read status updates without committing budget.",
      spotify:
        "Spotify trials cover plays and followers on public track, artist, or playlist links — useful before you fund music-focused paid lines.",
      twitch:
        "Twitch follower trials are for public channels. Treat them as a format check, then move to paid inventory when a stream schedule needs more volume.",
    },
    units: {
      followers: "followers",
      likes: "likes",
      views: "views",
      storyViews: "story views",
      comments: "comments",
      subscribers: "subscribers",
      members: "members",
      postViews: "post views",
      pageLikes: "page likes",
      postLikes: "post likes",
      plays: "plays",
    },
    titleMetric: {
      followers: "Followers",
      likes: "Likes",
      views: "Views",
      storyViews: "Story Views",
      comments: "Comments",
      subscribers: "Subscribers",
      members: "Members",
      postViews: "Post Views",
      pageLikes: "Page Likes",
      postLikes: "Post Likes",
      plays: "Plays",
    },
    freeWord: "Free",
    titleMode: "prefix",
    kw: "free {platform} {unit}",
    desc: "Claim {qty} free {platform} {unit} on a public target to judge start time before a paid top-up. No password required.",
    metaTitle: "Free {platform} {titleMetric} — {qty} Trial Pack | SSMM",
    metaDesc:
      "Get free {platform} {unit} ({qty}) on SSMM Panel. Public link only, {cooldown}h cooldown, no password. Test delivery before you deposit.",
    imageAlt: "Free {platform} {titleMetric} pack cover — {qty} {unit} trial on SSMM Panel",
    keywords: ["free {platform} {unit}", "{platform} {unit} trial", "free smm pack"],
    relatedBlog: "Free SMM services vs paid",
    relatedServices: "Paid services catalog",
    relatedPayments: "Payment methods",
    table: {
      field: "Field",
      value: "Value",
      why: "Why it matters",
      pack: "Pack",
      platform: "Platform",
      quantity: "Quantity",
      cooldown: "Cooldown",
      password: "Password",
      next: "Next step",
      packWhy: "Focus keyword and H1 match this name for clear intent",
      platformWhy: "Use a public {label} URL only",
      quantityWhy: "Sized for a delivery test, not a campaign",
      cooldownWhy: "Prevents repeat farming of free inventory",
      passwordWhy: "Public link / username formats only",
      passwordVal: "Never required",
      nextWhy: "Scale the same metric after the trial",
      nextVal: "Paid services or API",
      hours: "hours",
    },
    faq: [
      [
        "How do I claim {fk} on SSMM Panel?",
        "Create a free account, open Free Services, choose {title}, and submit a public {label} link from the dashboard. Respect the {cooldown}-hour cooldown before claiming the same pack again.",
      ],
      [
        "Do I need a password for {title}?",
        "No. SSMM Panel only needs a public URL or username the service accepts. If any form asks for a social password, stop and contact support — that is not our flow.",
      ],
      [
        "How many {unit} are in this free pack?",
        "This trial includes {qty} {unit}. It is sized for testing start time and status reporting, not for a full growth campaign.",
      ],
      [
        "What if my account or post is private?",
        "Private targets usually cannot be fulfilled. Switch the profile, post, or channel to public, wait a few minutes, then submit again after the cooldown if needed.",
      ],
      [
        "When should I upgrade from free to paid?",
        "Upgrade after a free pack completes cleanly and you want the same metric at higher quantity. Keep the service ID notes from Orders, top up via PayPal or crypto, then re-order from Services or the API.",
      ],
      [
        "Can resellers automate free packs through the API?",
        "Free packs are for human trials with fair-use cooldowns. Resellers should use paid PerfectPanel-compatible /api/v2 inventory for customer orders — see API docs after signup.",
      ],
    ],
    takeaway:
      "{title} gives you {qty} free {unit} on a public {label} link so you can judge delivery before depositing. Keep the {cooldown}h cooldown, never share passwords, and move to paid services only after the trial looks right.",
    content: enContent,
  },
  "tr": {
    platforms: {
  "instagram": "Instagram",
  "tiktok": "TikTok",
  "youtube": "YouTube",
  "telegram": "Telegram",
  "facebook": "Facebook",
  "twitter": "Twitter / X",
  "spotify": "Spotify",
  "twitch": "Twitch"
},
    blurbs: {
  "instagram": "Instagram hâlâ en çok ücretsiz SMM denemesini çeken platform — profil kanıtı, gönderi beğenisi, Reels izlenmesi, hikâye ve yorumlar ayrı satırlarda, kendi min/max kurallarıyla durur.",
  "tiktok": "TikTok denemeleri genelde yeni bir klibin izlenme veya beğenisinin nasıl başladığını görmek içindir. Herkese açık video ve profil linki yeter; asla giriş bilgisi vermeyin.",
  "youtube": "YouTube ücretsiz paketleri bilerek küçüktür. Beğeni, izlenme ve abone tedarikçi akışında farklı davranır; küçük bir örnek sonra hangi satırı yeniden sipariş edeceğinizi öğretir.",
  "telegram": "Telegram denemeleri herkese açık kanallar, gruplar ve gönderi linklerine odaklanır. Üye ve görüntülenme satırları Instagram beğenisine göre daha yavaş ilerlediği için genelde daha uzun bekleme ister.",
  "facebook": "Facebook sayfa ve gönderi paketleri, mağazaların büyük etkileşim ödemeden önce herkese açık sayfa URL’sinin kabul edilip edilmediğini test etmesine yardım eder.",
  "twitter": "Twitter/X ücretsiz paketleri herkese açık profil veya gönderi URL’si kullanır. Adetler bilerek küçüktür; bütçe bağlamadan durum güncellemelerini okuyabilirsiniz.",
  "spotify": "Spotify denemeleri herkese açık parça, sanatçı veya çalma listesi linklerinde dinlenme ve takipçiyi kapsar — müzik odaklı ücretli satırlara yüklemeden önce faydalıdır.",
  "twitch": "Twitch takipçi denemeleri herkese açık kanallar içindir. Önce format kontrolü yapın; yayın takviminiz daha yüksek hacim istediğinde ücretli envantere geçin."
},
    units: {
  "followers": "takipçi",
  "likes": "beğeni",
  "views": "izlenme",
  "storyViews": "hikâye izlenmesi",
  "comments": "yorum",
  "subscribers": "abone",
  "members": "üye",
  "postViews": "gönderi görüntülenmesi",
  "pageLikes": "sayfa beğenisi",
  "postLikes": "gönderi beğenisi",
  "plays": "dinlenme"
},
    titleMetric: {
  "followers": "Takipçi",
  "likes": "Beğeni",
  "views": "İzlenme",
  "storyViews": "Hikâye İzlenmesi",
  "comments": "Yorum",
  "subscribers": "Abone",
  "members": "Üye",
  "postViews": "Gönderi Görüntülenmesi",
  "pageLikes": "Sayfa Beğenisi",
  "postLikes": "Gönderi Beğenisi",
  "plays": "Dinlenme"
},
    freeWord: "Ücretsiz",
    titleMode: "prefix",
    kw: "ücretsiz {platform} {unit}",
    desc: "Herkese açık bir hedefte {qty} ücretsiz {platform} {unit} talep ederek ücretli yüklemeden önce başlangıç süresini görün. Şifre gerekmez.",
    metaTitle: "Ücretsiz {platform} {titleMetric} — {qty} Deneme Paketi | SSMM",
    metaDesc: "SSMM Panel’de ücretsiz {platform} {unit} ({qty}) alın. Yalnızca herkese açık link, {cooldown} saat bekleme, şifre yok. Yatırım öncesi teslimatı test edin.",
    imageAlt: "Ücretsiz {platform} {titleMetric} paket kapağı — SSMM Panel’de {qty} {unit} denemesi",
    keywords: [
  "ücretsiz {platform} {unit}",
  "{platform} {unit} denemesi",
  "ücretsiz smm paketi"
],
    relatedBlog: "Ücretsiz SMM hizmetleri ve ücretli yükseltme",
    relatedServices: "Ücretli hizmet kataloğu",
    relatedPayments: "Ödeme yöntemleri",
    table: {
  "field": "Alan",
  "value": "Değer",
  "why": "Neden önemli",
  "pack": "Paket",
  "platform": "Platform",
  "quantity": "Adet",
  "cooldown": "Bekleme",
  "password": "Şifre",
  "next": "Sonraki adım",
  "packWhy": "Odak anahtar kelime ve H1 bu adla net niyet gösterir",
  "platformWhy": "Yalnızca herkese açık {label} URL’si kullanın",
  "quantityWhy": "Kampanya değil, teslimat testi için boyutlandırıldı",
  "cooldownWhy": "Ücretsiz envanterin tekrar tekrar farm edilmesini engeller",
  "passwordWhy": "Yalnızca herkese açık link / kullanıcı adı formatları",
  "passwordVal": "Asla gerekmez",
  "nextWhy": "Denemeden sonra aynı metriği ölçekleyin",
  "nextVal": "Ücretli hizmetler veya API",
  "hours": "saat"
},
    faq: [
  [
    "SSMM Panel’de {fk} nasıl talep edilir?",
    "Ücretsiz hesap oluşturun, Ücretsiz Hizmetler’i açın, {title} paketini seçin ve panelden herkese açık bir {label} linki gönderin. Aynı paketi tekrar talep etmeden önce {cooldown} saatlik beklemeye uyun."
  ],
  [
    "{title} için şifre gerekir mi?",
    "Hayır. SSMM Panel yalnızca hizmetin kabul ettiği herkese açık URL veya kullanıcı adı ister. Bir form sosyal şifre sorarsa durun ve destekle iletişime geçin — bu bizim akışımız değildir."
  ],
  [
    "Bu ücretsiz pakette kaç {unit} var?",
    "Bu deneme {qty} {unit} içerir. Tam bir büyüme kampanyası için değil; başlangıç süresi ve durum raporunu test etmek için boyutlandırılmıştır."
  ],
  [
    "Hesabım veya gönderim gizliyse ne olur?",
    "Gizli hedefler genelde karşılanamaz. Profili, gönderiyi veya kanalı herkese açık yapın, birkaç dakika bekleyin, gerekirse bekleme sonrası tekrar gönderin."
  ],
  [
    "Ücretsizden ücretliye ne zaman geçmeliyim?",
    "Ücretsiz paket temiz tamamlandıktan ve aynı metriği daha yüksek adette istediğinizde yükseltin. Siparişlerden servis ID notlarını saklayın, PayPal veya kripto ile bakiye yükleyin, sonra Hizmetler veya API’den yeniden sipariş verin."
  ],
  [
    "Bayiler ücretsiz paketleri API ile otomatikleştirebilir mi?",
    "Ücretsiz paketler adil kullanım beklemeli insan denemeleri içindir. Bayiler müşteri siparişleri için ücretli PerfectPanel uyumlu /api/v2 envanterini kullanmalıdır — kayıt sonrası API belgelerine bakın."
  ]
],
    takeaway: "{title}, herkese açık bir {label} linkinde {qty} ücretsiz {unit} vererek yatırımdan önce teslimatı değerlendirmenizi sağlar. {cooldown} saatlik beklemeyi koruyun, asla şifre paylaşmayın ve deneme doğru görünene kadar ücretli hizmetlere geçmeyin.",
    content: {
  "intro1": "<strong>${fk}</strong> için gerçekten talep edip takip edebileceğiniz bir deneme mi arıyorsunuz? SSMM Panel’de <strong>${title}</strong> paketi, herkese açık bir ${label} hedefine <strong>${qty} ${unit}</strong> gönderir; böylece daha büyük bakiye yüklemeden önce başlangıç süresini, kalanı ve son durumu izlersiniz. Bu sayfa tam olarak o denemenin operatör rehberidir — “sonsuz ücretsiz takipçi” ezber paragrafı değildir.",
  "intro3": "Ücretsiz envanter, kör yatırımları azaltmak için vardır. Kuralları okuyun, herkese açık URL yapıştırın, her beklemede bir kez talep edin, sonra aynı metriğin <a href=\"/services\">Hizmetler</a> üzerinden ücretli satıra değip değmeyeceğine karar verin. Daha geniş ücretsiz-ücretli karar ağacı için <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">${relatedBlog}</a> rehberimize bakın.",
  "hWhat": "${title} neleri kapsar",
  "pWhat1": "Paket adı kelimenin tam anlamıyla budur: ssmmpanel.com ücretsiz hizmetler masasında ${qty} ${unit} istiyorsunuz. Adet bilerek sınırlıdır. Küçük paketler, link formatının kabul edilip edilmediğini ve durumun sohbet tahminine gerek kalmadan bekliyor’dan işleniyor’a geçip geçmediğini görmeyi kolaylaştırır.",
  "pWhat2": "Bekleme, aynı paketin başarılı talepleri arasında <strong>${cooldown} ${hours}</strong>’tir. Bu limit diğer test kullanıcıları için envanteri korur ve tek kullanımlık hesaplarla farm’ı engeller. Günlük hacim istiyorsanız, bu <a href=\"/payments\">bakiye yükledikten</a> sonraki ücretli iş akışıdır.",
  "hWho": "${fk} kimler talep etmeli",
  "pWho1": "SSMM Panel’de hiç sipariş vermemiş üreticiler burada başlamalı. Ücretsiz paket, önce PayPal ekran görüntüsü olmadan panel dilini öğretir — Yeni sipariş ile Ücretsiz Hizmetler, durum etiketleri ve kalanın nerede göründüğü.",
  "pWho2": "Mağaza sahipleri, ürün düşüşünden önce bir linkin reddedilip edilmeyeceğini bilmek için tek bir herkese açık gönderi veya profil etrafında ${unit} örneği kullanabilir. Bayiler ücretsiz paketleri müşteri SKU’su değil kişisel QA saymalı; müşteri trafiği <a href=\"/api-docs\">API belgeleri</a>nde anlatılan ücretli API satırlarına aittir.",
  "pWho3": "Panellere tamamen yeniyseniz önce <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">SMM paneli nedir</a> yazısını okuyun, sonra ${title} talep etmek için dönün.",
  "hHow": "Bu ücretsiz paketi adım adım nasıl talep edersiniz",
  "steps": [
    "Sonra ödeme notlarına da yazacağınız bir kullanıcı adıyla <a href=\"/signup\">ücretsiz hesap oluşturun</a>.",
    "Panele giriş yapabildiğinizi ve Ücretsiz Hizmetler’i açabildiğinizi doğrulayın.",
    "<strong>${title}</strong> paketini seçin ve ${label} için gösterilen link format ipuçlarını kopyalayın.",
    "<strong>Herkese açık</strong> bir ${label} URL’si yapıştırın. Gizli hedefler genelde sessizce başarısız olur veya iptal edilir.",
    "Gönderin ve çalıştırma bitene veya kısmen tamamlanana kadar Siparişler’i (veya ücretsiz talep durum görünümünü) izleyin.",
    "Bu paketi tekrar talep etmeden önce tam ${cooldown} saat bekleyin. Bu süreyi ücretli yükleme kararı için kullanın."
  ],
  "pHow": "Bu deneme için ödeme gerekmez. Ölçeklemeye hazır olduğunuzda <a href=\"/payments/paypal\">PayPal</a>, kripto veya Ödemeler’de listelenen başka bir yöntemi kullanın, sonra canlı katalogdan daha büyük bir ${unit} satırı yeniden sipariş edin.",
  "hLink": "${label} için link kuralları ve güvenlik",
  "pLink1": "Herkese açık demek, sizin olarak giriş yapmamış bir ziyaretçinin URL’yi açabilmesidir. Kilitli hesaplar, kısıtlı gönderiler veya bölge engelli medya, ücretsiz ${unit}’in hiç başlamamasının yaygın nedenleridir. Önce görünürlüğü düzeltin; gizli hedefte beklemeyi yakmayın.",
  "pLink2": "Hiçbir panele — SSMM Panel dahil — şifre, kurtarma kodu veya oturum çerezi vermeyin. Sektörde haksız kullanım hâlâ belirsiz formları iter; bizim ücretsiz ve ücretli masalarımız link tabanlıdır. Sosyal pazarlama taktikleri için tarafsız arka plan olarak Wikipedia’daki <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a> özetine göz atın, sonra operasyon kurallarınızı sıkı tutun.",
  "pLink3": "Sonra daha büyük sayılar planlasanız bile bu ücretsiz adetle başlayın. Boş profillerde ilk devasa sıçramalar doğallıktan uzak durur ve hangi servis ID’sini tutacağınızı öğretmez.",
  "hDiff": "Ücretsiz teslimat ücretli ${unit}’den nasıl farklıdır",
  "pDiff1": "Ücretsiz paketler ücretli siparişlerle aynı genel durum dilini paylaşır — bekliyor, işleniyor, kısmi, tamamlandı — ancak envanter önceliği ve hız farklı olabilir. Makul sürede başlayan ücretsiz satır cüzdanı doldurmak için yeşil ışıktır. Açıklamayı geçen şekilde takılan satır, yatırmadan önce kullanıcı adınızla ticket açmanız gerektiğinin işaretidir.",
  "pDiff2": "Ücretli ${label} ${unit}, daha yüksek maksimum adetler, bazı satırlarda isteğe bağlı drip-feed ve servis metni söylüyorsa refill pencereleri açar. Ücretsiz paketler denemeyi basit tutmak için kampanya özelliklerini bilerek çıkarır.",
  "pDiff3": "Başarılı ücretsiz talepten sonra gördüğünüz servis notlarını takip edin. Ücretliye geçince benzer davranan satırı yeniden sipariş etmeye çalışın. <a href=\"/blog/how-to-place-your-first-smm-panel-order\">İlk sipariş rehberimiz</a> kayıt, bakiye ve checkout adımlarını anlatır.",
  "hCool": "Bekleme, adil kullanım ve hesap haksız kullanımı",
  "pCool1": "Bu paket için ${cooldown} saatlik pencere hesap başına geçerlidir. ${fk} farm etmek için tek kullanımlık e-posta yığınları oluşturmak adil kullanımı ihlal eder ve ücretsiz erişimi dondurabilir. Sonraki yatırımlarda payment disputes eğilimli ödeme davranışı ücretli erişimi de dondurabilir — <a href=\"/terms\">Hizmet Şartları</a>’nı okuyun.",
  "pCool2": "Önce/sonra ekran görüntüleriyle belgelenen tek temiz talep, acele beş talepten daha değerlidir. Ücretsiz paketleri ölçüm aracı sayan operatörler ücretli satırlara daha hızlı geçer ve daha az bakiye yakar.",
  "hAfter": "Denemeden sonra: SSMM Panel’de yükseltme yolu",
  "pAfter1": "${qty} ${unit} kabul edilebilir göründüğünde Hizmetler’i açın, ${label} filtreleyin ve aynı metrik için ücretli bir satır seçin. Ödeme öncesi 1.000 başına oranı, min/max ve drip-feed notlarını doğrulayın. Küçük ilk yatırımlar memnuniyetle karşılanır — kanıt + kullanıcı adı eşleştirmesi için Ödemeler sayfalarına bakın.",
  "pAfter2": "Ara sıra yükseltme isteyen üreticiler panelde kalabilir. Kendi müşterilerine SMM satan mağazalar API anahtarı üretip services/add/status/balance çağırmalıdır. Ücretsiz paketler bilerek bu otomasyon yolunun dışında kalır.",
  "pAfter3": "Hâlâ emin değil misiniz? Aşağıdaki kardeş ücretsiz paketlere bakın veya kullanıcı adınızla <a href=\"/contact\">İletişim</a> / WhatsApp üzerinden sorun. Gizlilik detayları <a href=\"/privacy\">Gizlilik Politikası</a>’nda; şirket bağlamı <a href=\"/about\">Hakkımızda</a>’da.",
  "hRel": "İlgili ücretsiz paketler ve sonraki okumalar",
  "hCheck": "Talep’e tıklamadan önce hızlı kontrol listesi",
  "checks": [
    "ssmmpanel.com üzerinde hesap oluşturuldu",
    "Hedef ${label} üzerinde herkese açık",
    "Adedin ${qty} ${unit} olduğunu biliyorsunuz",
    "Bu paketi tekrarlamadan önce ${cooldown} saat bekleyebilirsiniz",
    "Kimseye şifre göndermeyeceksiniz",
    "Gönderimden sonra Siparişler/durumun nerede görüneceğini biliyorsunuz"
  ],
  "outro": "Bu liste doğruysa <strong>${title}</strong> talep edin. Ücretsiz sonucu kanıt olarak kullanın; sonra durun, başka ücretsiz metriği deneyin veya gözünüz açık yatırıp ölçekleyin."
},
  },
  "es": {
    platforms: {
  "instagram": "Instagram",
  "tiktok": "TikTok",
  "youtube": "YouTube",
  "telegram": "Telegram",
  "facebook": "Facebook",
  "twitter": "Twitter / X",
  "spotify": "Spotify",
  "twitch": "Twitch"
},
    blurbs: {
  "instagram": "Instagram sigue concentrando la mayor parte del tráfico de prueba SMM: prueba de perfil, likes, vistas de Reels, historias y comentarios van en filas distintas con sus propias reglas de mínimo/máximo.",
  "tiktok": "Las pruebas de TikTok suelen servir para ver cómo arrancan las vistas o likes de un clip nuevo. Bastan URL públicas de video o perfil; nunca entregues el login.",
  "youtube": "Los packs gratis de YouTube son deliberadamente pequeños. Likes, vistas y suscriptores se comportan distinto en el feed del proveedor, así que una muestra diminuta te enseña qué línea volver a pedir.",
  "telegram": "Las pruebas de Telegram se centran en canales, grupos y posts públicos. Las líneas de miembros y vistas suelen necesitar cooldowns más largos porque el inventario se mueve más lento que los likes de Instagram.",
  "facebook": "Los packs de página y publicación de Facebook ayudan a las tiendas a comprobar si se acepta una URL pública antes de pagar engagement mayor.",
  "twitter": "Los packs gratis de Twitter/X usan URLs públicas de perfil o post. Las cantidades son pequeñas a propósito para leer el estado sin comprometer presupuesto.",
  "spotify": "Las pruebas de Spotify cubren reproducciones y seguidores en enlaces públicos de pista, artista o playlist — útiles antes de financiar líneas musicales de pago.",
  "twitch": "Las pruebas de seguidores de Twitch son para canales públicos. Trátalas como control de formato y pasa a inventario de pago cuando el calendario del stream pida más volumen."
},
    units: {
  "followers": "seguidores",
  "likes": "likes",
  "views": "vistas",
  "storyViews": "vistas de historia",
  "comments": "comentarios",
  "subscribers": "suscriptores",
  "members": "miembros",
  "postViews": "vistas de publicación",
  "pageLikes": "me gusta de página",
  "postLikes": "me gusta de publicación",
  "plays": "reproducciones"
},
    titleMetric: {
  "followers": "Seguidores",
  "likes": "Likes",
  "views": "Vistas",
  "storyViews": "Vistas de Historia",
  "comments": "Comentarios",
  "subscribers": "Suscriptores",
  "members": "Miembros",
  "postViews": "Vistas de Publicación",
  "pageLikes": "Me Gusta de Página",
  "postLikes": "Me Gusta de Publicación",
  "plays": "Reproducciones"
},
    freeWord: "gratis",
    titleMode: "suffix-de",
    kw: "{unit} de {platform} gratis",
    desc: "Reclama {qty} {unit} de {platform} gratis en un destino público para juzgar el tiempo de inicio antes de una recarga de pago. Sin contraseña.",
    metaTitle: "{titleMetric} de {platform} gratis — Pack de prueba {qty} | SSMM",
    metaDesc: "Consigue {unit} de {platform} gratis ({qty}) en SSMM Panel. Solo enlace público, cooldown de {cooldown}h, sin contraseña. Prueba la entrega antes de depositar.",
    imageAlt: "Portada del pack {titleMetric} de {platform} gratis — prueba de {qty} {unit} en SSMM Panel",
    keywords: [
  "{unit} de {platform} gratis",
  "prueba {platform} {unit}",
  "pack smm gratis"
],
    relatedBlog: "Servicios SMM gratis vs de pago",
    relatedServices: "Catálogo de servicios de pago",
    relatedPayments: "Métodos de pago",
    table: {
  "field": "Campo",
  "value": "Valor",
  "why": "Por qué importa",
  "pack": "Pack",
  "platform": "Plataforma",
  "quantity": "Cantidad",
  "cooldown": "Cooldown",
  "password": "Contraseña",
  "next": "Siguiente paso",
  "packWhy": "La keyword foco y el H1 coinciden con este nombre",
  "platformWhy": "Usa solo una URL pública de {label}",
  "quantityWhy": "Dimensionado para una prueba de entrega, no una campaña",
  "cooldownWhy": "Evita el farm repetido del inventario gratis",
  "passwordWhy": "Solo formatos de enlace / usuario públicos",
  "passwordVal": "Nunca se requiere",
  "nextWhy": "Escala la misma métrica después de la prueba",
  "nextVal": "Servicios de pago o API",
  "hours": "horas"
},
    faq: [
  [
    "¿Cómo reclamo {fk} en SSMM Panel?",
    "Crea una cuenta gratis, abre Free Services, elige {title} y envía un enlace público de {label} desde el panel. Respeta el cooldown de {cooldown} horas antes de reclamar el mismo pack otra vez."
  ],
  [
    "¿Necesito contraseña para {title}?",
    "No. SSMM Panel solo necesita una URL o usuario público que acepte el servicio. Si un formulario pide contraseña de red social, para y contacta soporte — ese no es nuestro flujo."
  ],
  [
    "¿Cuántos {unit} incluye este pack gratis?",
    "Esta prueba incluye {qty} {unit}. Está pensada para medir inicio y estado, no para una campaña completa de crecimiento."
  ],
  [
    "¿Qué pasa si mi cuenta o publicación es privada?",
    "Los destinos privados suelen no cumplirse. Pon el perfil, post o canal en público, espera unos minutos y vuelve a enviar tras el cooldown si hace falta."
  ],
  [
    "¿Cuándo debo pasar de gratis a de pago?",
    "Sube de nivel cuando un pack gratis termine bien y quieras la misma métrica a mayor cantidad. Guarda las notas del service ID en Pedidos, recarga con PayPal o crypto y vuelve a pedir en Servicios o la API."
  ],
  [
    "¿Pueden los resellers automatizar packs gratis por API?",
    "Los packs gratis son pruebas humanas con cooldowns de uso justo. Los resellers deben usar inventario de pago PerfectPanel /api/v2 para pedidos de clientes — ver docs de API tras el registro."
  ]
],
    takeaway: "{title} te da {qty} {unit} gratis en un enlace público de {label} para juzgar la entrega antes de depositar. Mantén el cooldown de {cooldown}h, nunca compartas contraseñas y pasa a servicios de pago solo cuando la prueba se vea bien.",
    content: {
  "intro1": "¿Buscas <strong>${fk}</strong> que realmente puedas reclamar y seguir? En SSMM Panel el pack <strong>${title}</strong> entrega <strong>${qty} ${unit}</strong> a un destino público de ${label} para que veas tiempo de inicio, remains y estado final antes de fondear un saldo mayor. Esta página es la guía operativa de esa prueba exacta — no un párrafo reciclado de “seguidores gratis para siempre”.",
  "intro3": "El inventario gratis existe para reducir depósitos a ciegas. Lee las reglas, pega una URL pública, reclama una vez por cooldown y decide si la misma métrica merece una línea de pago en <a href=\"/services\">Servicios</a>. Para el árbol de decisión gratis vs pago, consulta nuestra guía sobre <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">${relatedBlog}</a>.",
  "hWhat": "Qué incluye ${title}",
  "pWhat1": "El nombre del pack es literal: estás pidiendo ${qty} ${unit} en el escritorio de free-services de ssmmpanel.com. La cantidad está limitada a propósito. Los packs diminutos facilitan ver si se acepta el formato del enlace y si el estado pasa de pending a processing sin adivinar en un chat.",
  "pWhat2": "El cooldown es de <strong>${cooldown} ${hours}</strong> entre reclamos exitosos del mismo pack. Ese límite protege el inventario para otros testers y bloquea el farming con cuentas desechables. Si necesitas volumen diario, ese es un flujo de pago tras <a href=\"/payments\">añadir fondos</a>.",
  "hWho": "Quién debería reclamar ${fk}",
  "pWho1": "Los creadores que nunca han pedido en SSMM Panel deberían empezar aquí. Un pack gratis enseña el lenguaje del panel — New order vs Free Services, etiquetas de estado y dónde aparecen los remains — sin una captura de PayPal primero.",
  "pWho2": "Los dueños de tienda pueden usar muestras de ${unit} en un solo post o perfil público cuando quieren saber si un enlace será rechazado antes de un lanzamiento. Los resellers deben tratar los packs gratis como QA personal, no como SKUs de cliente; el tráfico de clientes pertenece a líneas API de pago documentadas en <a href=\"/api-docs\">docs de API</a>.",
  "pWho3": "Si eres nuevo en paneles por completo, lee primero <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">qué es un panel SMM</a> y luego vuelve a reclamar ${title}.",
  "hHow": "Cómo reclamar este pack gratis paso a paso",
  "steps": [
    "<a href=\"/signup\">Crea una cuenta gratis</a> con un usuario que también pondrás en las notas de pago.",
    "Confirma que puedes entrar al panel y abrir Free Services.",
    "Selecciona <strong>${title}</strong> y copia los consejos de formato de enlace para ${label}.",
    "Pega una URL <strong>pública</strong> de ${label}. Los destinos privados suelen fallar en silencio o cancelarse.",
    "Envía y observa Pedidos (o la vista de estado del reclamo gratis) hasta que termine o complete parcialmente.",
    "Espera las ${cooldown}h completas antes de reclamar este pack otra vez. Usa ese tiempo para decidir un top-up de pago."
  ],
  "pHow": "No se requiere pago para esta prueba. Cuando estés listo para escalar, usa <a href=\"/payments/paypal\">PayPal</a>, crypto u otro método listado en Pagos, luego vuelve a pedir una línea mayor de ${unit} del catálogo en vivo.",
  "hLink": "Reglas de enlace y seguridad para ${label}",
  "pLink1": "Público significa que un visitante que no ha iniciado sesión como tú puede abrir la URL. Cuentas bloqueadas, posts restringidos o medios con bloqueo geográfico son motivos habituales de que los ${unit} gratis nunca arranquen. Arregla la visibilidad primero; no quemes el cooldown en un destino privado.",
  "pLink2": "Nunca compartas contraseñas, códigos de recuperación ni cookies de sesión con ningún panel — incluido SSMM Panel. El uso indebido del sector sigue empujando formularios dudosos; nuestros escritorios gratis y de pago son por enlace. Para un contexto neutro sobre tácticas de marketing social, lee el resumen de Wikipedia sobre <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a> y mantén reglas operativas estrictas.",
  "pLink3": "Empieza con esta cantidad gratis aunque planees números mayores después. Picos enormes al inicio en perfiles vacíos se ven antinaturales y no enseñan qué service ID conservar.",
  "hDiff": "Cómo difiere la entrega gratis de ${unit} de pago",
  "pDiff1": "Los packs gratis comparten el mismo vocabulario de estado que los pedidos de pago — pending, processing, partial, completed — pero la prioridad y velocidad del inventario pueden diferir. Una línea gratis que arranca en una ventana razonable es luz verde para fondear la cartera. Una que se atasca más allá de la descripción es señal de abrir un ticket con tu usuario antes de depositar.",
  "pDiff2": "Los ${unit} de pago de ${label} desbloquean máximos más altos, drip-feed opcional en algunas filas y ventanas de refill cuando el texto del servicio lo indica. Los packs gratis omiten a propósito funciones de campaña para mantener la prueba simple.",
  "pDiff3": "Sigue las notas de servicio que ves tras un reclamo gratis exitoso. Al pasar a pago, reordena una fila que se comportó igual. Nuestra <a href=\"/blog/how-to-place-your-first-smm-panel-order\">guía del primer pedido</a> explica registro, saldo y checkout en SSMM Panel.",
  "hCool": "Cooldown, uso justo y uso indebido de cuenta",
  "pCool1": "La ventana de ${cooldown} horas aplica por cuenta para este pack. Crear pilas de emails desechables para farmear ${fk} viola el uso justo y puede congelar el acceso gratis. El comportamiento de pago propenso a payment disputes en depósitos posteriores también puede congelar el acceso de pago — lee los <a href=\"/terms\">Términos de Servicio</a>.",
  "pCool2": "Un reclamo limpio documentado con capturas antes/después vale más que cinco reclamos apresurados. Los operadores que tratan los packs gratis como herramientas de medición pasan antes a líneas de pago y desperdician menos saldo.",
  "hAfter": "Después de la prueba: ruta de upgrade en SSMM Panel",
  "pAfter1": "Cuando ${qty} ${unit} se vean aceptables, abre Servicios, filtra ${label} y elige una fila de pago para la misma métrica. Confirma rate por 1.000, min/max y notas de drip-feed antes del checkout. Los primeros depósitos pequeños son bienvenidos — mira las landings de Pagos para prueba + coincidencia de usuario.",
  "pAfter2": "Los creadores que solo necesitan empujones ocasionales pueden quedarse en el panel. Las tiendas que venden SMM a sus propios clientes deben generar una API key y llamar services/add/status/balance. Los packs gratis quedan fuera de esa automatización a propósito.",
  "pAfter3": "¿Aún con dudas? Mira packs gratis hermanos abajo o pregunta en <a href=\"/contact\">Contacto</a> / WhatsApp con tu usuario. La privacidad está en la <a href=\"/privacy\">Política de Privacidad</a>; el contexto de la empresa en <a href=\"/about\">Sobre nosotros</a>.",
  "hRel": "Packs gratis relacionados y siguientes lecturas",
  "hCheck": "Checklist rápida antes de pulsar reclamar",
  "checks": [
    "Cuenta creada en ssmmpanel.com",
    "El destino es público en ${label}",
    "Entiendes que la cantidad es ${qty} ${unit}",
    "Puedes esperar ${cooldown}h antes de repetir este pack",
    "No enviarás una contraseña a nadie",
    "Sabes dónde aparecerán Pedidos/estado tras enviar"
  ],
  "outro": "Reclama <strong>${title}</strong> cuando esa lista sea cierta. Usa el resultado gratis como evidencia y luego para, prueba otra métrica gratis, o deposita y escala con los ojos abiertos."
},
  },
  "pt-br": {
    platforms: {
  "instagram": "Instagram",
  "tiktok": "TikTok",
  "youtube": "YouTube",
  "telegram": "Telegram",
  "facebook": "Facebook",
  "twitter": "Twitter / X",
  "spotify": "Spotify",
  "twitch": "Twitch"
},
    blurbs: {
  "instagram": "O Instagram ainda concentra o maior tráfego de teste SMM — prova de perfil, curtidas, views de Reels, stories e comentários ficam em linhas separadas, cada uma com min/max próprios.",
  "tiktok": "Testes de TikTok costumam mostrar como views ou curtidas de um clipe novo começam. URLs públicas de vídeo ou perfil bastam; nunca entregue login.",
  "youtube": "Os packs grátis do YouTube são propositadamente pequenos. Curtidas, views e inscritos se comportam diferente no feed do fornecedor, então uma amostra mínima ensina qual linha pedir de novo.",
  "telegram": "Testes de Telegram focam canais, grupos e posts públicos. Linhas de membros e views muitas vezes pedem cooldown maior porque o estoque anda mais lento que curtidas do Instagram.",
  "facebook": "Packs de página e post do Facebook ajudam lojas a testar se uma URL pública é aceita antes de pagar engajamento maior.",
  "twitter": "Packs grátis de Twitter/X usam URLs públicas de perfil ou post. As quantidades são pequenas de propósito para ler o status sem comprometer orçamento.",
  "spotify": "Testes do Spotify cobrem plays e seguidores em links públicos de faixa, artista ou playlist — úteis antes de financiar linhas pagas de música.",
  "twitch": "Testes de seguidores da Twitch são para canais públicos. Trate como checagem de formato e vá ao inventário pago quando a agenda da live pedir mais volume."
},
    units: {
  "followers": "seguidores",
  "likes": "curtidas",
  "views": "visualizações",
  "storyViews": "visualizações de story",
  "comments": "comentários",
  "subscribers": "inscritos",
  "members": "membros",
  "postViews": "visualizações de post",
  "pageLikes": "curtidas de página",
  "postLikes": "curtidas de post",
  "plays": "reproduções"
},
    titleMetric: {
  "followers": "Seguidores",
  "likes": "Curtidas",
  "views": "Visualizações",
  "storyViews": "Visualizações de Story",
  "comments": "Comentários",
  "subscribers": "Inscritos",
  "members": "Membros",
  "postViews": "Visualizações de Post",
  "pageLikes": "Curtidas de Página",
  "postLikes": "Curtidas de Post",
  "plays": "Reproduções"
},
    freeWord: "grátis",
    titleMode: "suffix",
    kw: "{unit} {platform} grátis",
    desc: "Resgate {qty} {unit} de {platform} grátis em um alvo público para julgar o tempo de início antes de um top-up pago. Sem senha.",
    metaTitle: "{titleMetric} {platform} grátis — Pack de teste {qty} | SSMM",
    metaDesc: "Ganhe {unit} de {platform} grátis ({qty}) no SSMM Panel. Só link público, cooldown de {cooldown}h, sem senha. Teste a entrega antes de depositar.",
    imageAlt: "Capa do pack {titleMetric} {platform} grátis — teste de {qty} {unit} no SSMM Panel",
    keywords: [
  "{unit} {platform} grátis",
  "teste {platform} {unit}",
  "pack smm grátis"
],
    relatedBlog: "Serviços SMM grátis vs pagos",
    relatedServices: "Catálogo de serviços pagos",
    relatedPayments: "Métodos de pagamento",
    table: {
  "field": "Campo",
  "value": "Valor",
  "why": "Por que importa",
  "pack": "Pack",
  "platform": "Plataforma",
  "quantity": "Quantidade",
  "cooldown": "Cooldown",
  "password": "Senha",
  "next": "Próximo passo",
  "packWhy": "Keyword foco e H1 batem com este nome para intenção clara",
  "platformWhy": "Use apenas uma URL pública de {label}",
  "quantityWhy": "Dimensionado para teste de entrega, não campanha",
  "cooldownWhy": "Impede farm repetido do inventário grátis",
  "passwordWhy": "Somente formatos de link / usuário públicos",
  "passwordVal": "Nunca exigida",
  "nextWhy": "Escale a mesma métrica depois do teste",
  "nextVal": "Serviços pagos ou API",
  "hours": "horas"
},
    faq: [
  [
    "Como resgato {fk} no SSMM Panel?",
    "Crie uma conta grátis, abra Free Services, escolha {title} e envie um link público de {label} pelo painel. Respeite o cooldown de {cooldown} horas antes de resgatar o mesmo pack de novo."
  ],
  [
    "Preciso de senha para {title}?",
    "Não. O SSMM Panel só precisa de uma URL ou usuário público que o serviço aceite. Se algum formulário pedir senha de rede social, pare e fale com o suporte — esse não é o nosso fluxo."
  ],
  [
    "Quantos {unit} tem neste pack grátis?",
    "Este teste inclui {qty} {unit}. Serve para medir início e status, não para uma campanha completa de crescimento."
  ],
  [
    "E se minha conta ou post for privado?",
    "Alvos privados geralmente não são cumpridos. Deixe o perfil, post ou canal público, espere alguns minutos e envie de novo após o cooldown se precisar."
  ],
  [
    "Quando devo subir do grátis para o pago?",
    "Faça upgrade depois que um pack grátis concluir bem e você quiser a mesma métrica em quantidade maior. Guarde as notas do service ID em Pedidos, recarregue via PayPal ou crypto e peça de novo em Serviços ou na API."
  ],
  [
    "Revendedores podem automatizar packs grátis pela API?",
    "Packs grátis são testes humanos com cooldown de uso justo. Revendedores devem usar inventário pago PerfectPanel /api/v2 para pedidos de clientes — veja a documentação da API após o cadastro."
  ]
],
    takeaway: "{title} dá a você {qty} {unit} grátis em um link público de {label} para julgar a entrega antes de depositar. Mantenha o cooldown de {cooldown}h, nunca compartilhe senhas e vá aos serviços pagos só quando o teste parecer certo.",
    content: {
  "intro1": "Procurando <strong>${fk}</strong> que você realmente possa resgatar e acompanhar? No SSMM Panel o pack <strong>${title}</strong> entrega <strong>${qty} ${unit}</strong> a um alvo público de ${label} para você ver tempo de início, remains e status final antes de financiar um saldo maior. Esta página é o guia do operador dessa prova exata — não um parágrafo reciclado de “seguidores grátis para sempre”.",
  "intro3": "O inventário grátis existe para reduzir depósitos cegos. Leia as regras, cole uma URL pública, resgate uma vez por cooldown e decida se a mesma métrica merece uma linha paga em <a href=\"/services\">Serviços</a>. Para a árvore de decisão grátis vs pago, veja nosso guia sobre <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">${relatedBlog}</a>.",
  "hWhat": "O que ${title} inclui",
  "pWhat1": "O nome do pack é literal: você está pedindo ${qty} ${unit} no balcão free-services de ssmmpanel.com. A quantidade é limitada de propósito. Packs minúsculos facilitam ver se o formato do link é aceito e se o status muda de pending para processing sem adivinhar no chat.",
  "pWhat2": "O cooldown é de <strong>${cooldown} ${hours}</strong> entre resgates bem-sucedidos do mesmo pack. Esse limite protege o inventário para outros testadores e bloqueia farming com contas descartáveis. Se precisa de volume diário, esse é um fluxo pago depois de <a href=\"/payments\">adicionar fundos</a>.",
  "hWho": "Quem deve resgatar ${fk}",
  "pWho1": "Criadores que nunca pediram no SSMM Panel devem começar aqui. Um pack grátis ensina a linguagem do painel — New order vs Free Services, rótulos de status e onde aparecem remains — sem um print de PayPal primeiro.",
  "pWho2": "Donos de loja podem usar amostras de ${unit} em um único post ou perfil público quando querem saber se um link será rejeitado antes de um lançamento. Revendedores devem tratar packs grátis como QA pessoal, não como SKUs de cliente; o tráfego de clientes fica nas linhas API pagas documentadas em <a href=\"/api-docs\">docs da API</a>.",
  "pWho3": "Se você é novo em painéis por completo, leia primeiro <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">o que é um painel SMM</a> e depois volte para resgatar ${title}.",
  "hHow": "Como resgatar este pack grátis passo a passo",
  "steps": [
    "<a href=\"/signup\">Crie uma conta grátis</a> com um usuário que também colocará nas notas de pagamento.",
    "Confirme que consegue entrar no painel e abrir Free Services.",
    "Selecione <strong>${title}</strong> e copie as dicas de formato de link mostradas para ${label}.",
    "Cole uma URL <strong>pública</strong> de ${label}. Alvos privados geralmente falham em silêncio ou cancelam.",
    "Envie e acompanhe Pedidos (ou a visão de status do resgate grátis) até a execução terminar ou completar parcialmente.",
    "Espere as ${cooldown}h completas antes de resgatar este pack de novo. Use esse tempo para decidir um top-up pago."
  ],
  "pHow": "Pagamento não é necessário para este teste. Quando estiver pronto para escalar, use <a href=\"/payments/paypal\">PayPal</a>, crypto ou outro método listado em Pagamentos, depois peça de novo uma linha maior de ${unit} no catálogo ao vivo.",
  "hLink": "Regras de link e segurança para ${label}",
  "pLink1": "Público significa que um visitante que não está logado como você consegue abrir a URL. Contas bloqueadas, posts restritos ou mídia com bloqueio geográfico são motivos comuns de ${unit} grátis nunca começarem. Corrija a visibilidade primeiro; não queime o cooldown num alvo privado.",
  "pLink2": "Nunca compartilhe senhas, códigos de recuperação ou cookies de sessão com nenhum painel — incluindo o SSMM Panel. Algumas práticas do setor ainda usam formulários pouco claros; nossos balcões grátis e pagos são baseados em link. Para um contexto neutro sobre táticas de marketing social, veja o resumo da Wikipedia sobre <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a> e mantenha regras operacionais rígidas.",
  "pLink3": "Comece com esta quantidade grátis mesmo se planejar números maiores depois. Picos enormes no início em perfis vazios parecem artificiais e não ensinam qual service ID manter.",
  "hDiff": "Como a entrega grátis difere de ${unit} pagos",
  "pDiff1": "Packs grátis compartilham o mesmo vocabulário geral de status dos pedidos pagos — pending, processing, partial, completed — mas prioridade e velocidade do inventário podem diferir. Uma linha grátis que começa numa janela razoável é sinal verde para financiar a carteira. Uma que trava além da descrição é sinal para abrir ticket com seu usuário antes de depositar.",
  "pDiff2": "${unit} pagos de ${label} liberam máximos maiores, drip-feed opcional em algumas linhas e janelas de refill quando o texto do serviço diz. Packs grátis omitem de propósito recursos de campanha para manter o teste simples.",
  "pDiff3": "Acompanhe as notas de serviço que você vê após um resgate grátis bem-sucedido. Ao ir para o pago, peça de novo uma linha que se comportou de forma parecida. Nosso <a href=\"/blog/how-to-place-your-first-smm-panel-order\">guia do primeiro pedido</a> explica cadastro, saldo e checkout no SSMM Panel.",
  "hCool": "Cooldown, uso justo e uso indebido de conta",
  "pCool1": "A janela de ${cooldown} horas vale por conta para este pack. Criar pilhas de e-mails descartáveis para farmar ${fk} viola o uso justo e pode congelar o acesso grátis. Comportamento de pagamento propenso a payment disputes em depósitos posteriores também pode congelar o acesso pago — leia os <a href=\"/terms\">Termos de Serviço</a>.",
  "pCool2": "Um resgate limpo documentado com prints antes/depois vale mais que cinco resgates apressados. Operadores que tratam packs grátis como ferramentas de medição sobem mais rápido para linhas pagas e gastam menos saldo.",
  "hAfter": "Depois do teste: caminho de upgrade no SSMM Panel",
  "pAfter1": "Quando ${qty} ${unit} parecerem aceitáveis, abra Serviços, filtre ${label} e escolha uma linha paga para a mesma métrica. Confirme rate por 1.000, min/max e notas de drip-feed antes do checkout. Pequenos primeiros depósitos são bem-vindos — veja as landings de Pagamentos para prova + combinação de usuário.",
  "pAfter2": "Criadores que só precisam de empurrões ocasionais podem ficar no painel. Lojas que vendem SMM aos próprios clientes devem gerar uma API key e chamar services/add/status/balance. Packs grátis ficam de fora desse caminho de automação de propósito.",
  "pAfter3": "Ainda em dúvida? Veja packs grátis irmãos abaixo ou pergunte em <a href=\"/contact\">Contato</a> / WhatsApp com seu usuário. Privacidade está na <a href=\"/privacy\">Política de Privacidade</a>; contexto da empresa em <a href=\"/about\">Sobre nós</a>.",
  "hRel": "Packs grátis relacionados e próximas leituras",
  "hCheck": "Checklist rápida antes de clicar em resgatar",
  "checks": [
    "Conta criada em ssmmpanel.com",
    "O alvo está público no ${label}",
    "Você entende que a quantidade é ${qty} ${unit}",
    "Pode esperar ${cooldown}h antes de repetir este pack",
    "Não enviará senha para ninguém",
    "Sabe onde Pedidos/status aparecerão após o envio"
  ],
  "outro": "Resgate <strong>${title}</strong> quando essa lista for verdadeira. Use o resultado grátis como evidência e então pare, teste outra métrica grátis, ou deposite e escale de olhos abertos."
},
  },
  "ar": {
    platforms: {
  "instagram": "إنستغرام",
  "tiktok": "تيك توك",
  "youtube": "يوتيوب",
  "telegram": "تيليجرام",
  "facebook": "فيسبوك",
  "twitter": "تويتر / X",
  "spotify": "سبوتيفاي",
  "twitch": "تويتش"
},
    blurbs: {
  "instagram": "لا يزال إنستغرام يجمع أكبر قدر من تجارب SMM المجانية — إثبات الملف، إعجابات المنشور، مشاهدات الريلز، القصص والتعليقات لكل منها صف خدمة منفصل بقواعد حد أدنى/أقصى خاصة.",
  "tiktok": "تجارب تيك توك غالباً لمراقبة كيف تبدأ مشاهدات أو إعجابات مقطع جديد. روابط الفيديو والملف العامة تكفي؛ لا تسلم بيانات الدخول أبداً.",
  "youtube": "باقات يوتيوب المجانية صغيرة عمداً. الإعجابات والمشاهدات والمشتركون يتصرفون بشكل مختلف في تغذية المورد، لذا عينة صغيرة تعلّمك أي سطر تعيد طلبه لاحقاً.",
  "telegram": "تركّز تجارب تيليجرام على القنوات والمجموعات وروابط المنشورات العامة. سطور الأعضاء والمشاهدات غالباً تحتاج فترة انتظار أطول لأن المخزون يتحرك أبطأ من إعجابات إنستغرام.",
  "facebook": "باقات صفحات ومنشورات فيسبوك تساعد المتاجر على اختبار قبول رابط صفحة عامة قبل الدفع لتفاعل أكبر.",
  "twitter": "باقات تويتر/X المجانية تستخدم روابط ملف أو منشور عامة. الأعداد صغيرة عمداً لتقرأ تحديثات الحالة دون التزام بميزانية.",
  "spotify": "تجارب سبوتيفاي تغطي التشغيلات والمتابعين على روابط مسار أو فنان أو قائمة عامة — مفيدة قبل تمويل سطور موسيقى مدفوعة.",
  "twitch": "تجارب متابعي تويتش للقنوات العامة. اعتبرها فحص تنسيق ثم انتقل للمخزون المدفوع عندما يحتاج جدول البث حجماً أكبر."
},
    units: {
  "followers": "متابعون",
  "likes": "إعجابات",
  "views": "مشاهدات",
  "storyViews": "مشاهدات القصص",
  "comments": "تعليقات",
  "subscribers": "مشتركون",
  "members": "أعضاء",
  "postViews": "مشاهدات المنشور",
  "pageLikes": "إعجابات الصفحة",
  "postLikes": "إعجابات المنشور",
  "plays": "تشغيلات"
},
    titleMetric: {
  "followers": "متابعون",
  "likes": "إعجابات",
  "views": "مشاهدات",
  "storyViews": "مشاهدات القصص",
  "comments": "تعليقات",
  "subscribers": "مشتركون",
  "members": "أعضاء",
  "postViews": "مشاهدات المنشور",
  "pageLikes": "إعجابات الصفحة",
  "postLikes": "إعجابات المنشور",
  "plays": "تشغيلات"
},
    freeWord: "مجاناً",
    titleMode: "ar",
    kw: "{unit} {platform} مجاناً",
    desc: "اطلب {qty} {unit} {platform} مجاناً على هدف عام لتقييم وقت البدء قبل شحن رصيد مدفوع. لا كلمة مرور مطلوبة.",
    metaTitle: "{titleMetric} {platform} مجاناً — باقة تجريبية {qty} | SSMM",
    metaDesc: "احصل على {unit} {platform} مجاناً ({qty}) على SSMM Panel. رابط عام فقط، انتظار {cooldown} ساعة، بلا كلمة مرور. اختبر التسليم قبل الإيداع.",
    imageAlt: "غلاف باقة {titleMetric} {platform} مجاناً — تجربة {qty} {unit} على SSMM Panel",
    keywords: [
  "{unit} {platform} مجاناً",
  "تجربة {platform} {unit}",
  "باقة smm مجانية"
],
    relatedBlog: "خدمات SMM المجانية مقابل المدفوعة",
    relatedServices: "كتالوج الخدمات المدفوعة",
    relatedPayments: "طرق الدفع",
    table: {
  "field": "الحقل",
  "value": "القيمة",
  "why": "لماذا يهم",
  "pack": "الباقة",
  "platform": "المنصة",
  "quantity": "الكمية",
  "cooldown": "فترة الانتظار",
  "password": "كلمة المرور",
  "next": "الخطوة التالية",
  "packWhy": "كلمة التركيز وH1 يطابقان هذا الاسم لقصد واضح",
  "platformWhy": "استخدم رابط {label} عاماً فقط",
  "quantityWhy": "مقاس لاختبار التسليم لا لحملة كاملة",
  "cooldownWhy": "يمنع استنزاف المخزون المجاني مراراً",
  "passwordWhy": "صيغ رابط / اسم مستخدم عامة فقط",
  "passwordVal": "غير مطلوبة أبداً",
  "nextWhy": "وسّع نفس المقياس بعد التجربة",
  "nextVal": "خدمات مدفوعة أو API",
  "hours": "ساعات"
},
    faq: [
  [
    "كيف أطلب {fk} على SSMM Panel؟",
    "أنشئ حساباً مجانياً، افتح الخدمات المجانية، اختر {title}، وأرسل رابط {label} عاماً من لوحة التحكم. احترم انتظار {cooldown} ساعة قبل طلب نفس الباقة مجدداً."
  ],
  [
    "هل أحتاج كلمة مرور لـ {title}؟",
    "لا. يحتاج SSMM Panel فقط رابطاً أو اسم مستخدم عاماً يقبله الخدمة. إن طلب أي نموذج كلمة مرور لحساب اجتماعي، توقف وتواصل مع الدعم — هذا ليس مسارنا."
  ],
  [
    "كم عدد {unit} في هذه الباقة المجانية؟",
    "تشمل هذه التجربة {qty} {unit}. هي بحجم اختبار وقت البدء وحالة الطلب، لا حملة نمو كاملة."
  ],
  [
    "ماذا لو كان حسابي أو منشوري خاصاً؟",
    "الأهداف الخاصة غالباً لا تُنفَّذ. اجعل الملف أو المنشور أو القناة عامة، انتظر دقائق، ثم أعد الإرسال بعد فترة الانتظار إن لزم."
  ],
  [
    "متى أنتقل من المجاني إلى المدفوع؟",
    "ارتقِ بعد اكتمال باقة مجانية بسلاسة ورغبتك بنفس المقياس بكمية أعلى. احتفظ بملاحظات معرّف الخدمة من الطلبات، اشحن عبر PayPal أو العملات الرقمية، ثم أعد الطلب من الخدمات أو API."
  ],
  [
    "هل يمكن للبائعين أتمتة الباقات المجانية عبر API؟",
    "الباقات المجانية لتجارب بشرية بفترات استخدام عادل. على البائعين استخدام مخزون /api/v2 المدفوع المتوافق مع PerfectPanel لطلبات العملاء — راجع وثائق API بعد التسجيل."
  ]
],
    takeaway: "{title} يمنحك {qty} {unit} مجاناً على رابط {label} عام لتقييم التسليم قبل الإيداع. التزم بانتظار {cooldown} ساعة، لا تشارك كلمات المرور، وانتقل للخدمات المدفوعة فقط عندما تبدو التجربة صحيحة.",
    content: {
  "intro1": "هل تبحث عن <strong>${fk}</strong> يمكنك طلبها ومتابعتها فعلاً؟ في SSMM Panel تُسلّم باقة <strong>${title}</strong> <strong>${qty} ${unit}</strong> إلى هدف ${label} عام لتراقب وقت البدء والمتبقي والحالة النهائية قبل تمويل رصيد أكبر. هذه الصفحة دليل المشغّل لتلك التجربة تحديداً — وليست فقرة مكررة عن «متابعين مجاناً للأبد».",
  "intro3": "يوجد المخزون المجاني لتقليل الإيداعات العمياء. اقرأ القواعد، الصق رابطاً عاماً، اطلب مرة لكل فترة انتظار، ثم قرر إن كان المقياس نفسه يستحق سطراً مدفوعاً من <a href=\"/services\">الخدمات</a>. لشجرة قرار المجاني مقابل المدفوع الأوسع، راجع دليلنا عن <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">${relatedBlog}</a>.",
  "hWhat": "ماذا تشمل ${title}",
  "pWhat1": "اسم الباقة حرفي: تطلب ${qty} ${unit} عبر مكتب الخدمات المجانية على ssmmpanel.com. الكمية محدودة عمداً. الباقات الصغيرة تسهّل رؤية قبول صيغة الرابط وانتقال الحالة من pending إلى processing دون تخمين في دردشة.",
  "pWhat2": "فترة الانتظار <strong>${cooldown} ${hours}</strong> بين الطلبات الناجحة لنفس الباقة. يحمي ذلك المخزون لمختبرين آخرين ويمنع الاستنزاف بحسابات مؤقتة. إن احتجت حجماً يومياً فذلك مسار مدفوع بعد <a href=\"/payments\">إضافة رصيد</a>.",
  "hWho": "من ينبغي أن يطلب ${fk}",
  "pWho1": "المبدعون الذين لم يطلبوا قط على SSMM Panel يجب أن يبدأوا هنا. تعلّم الباقة المجانية لغة اللوحة — New order مقابل Free Services، تسميات الحالة وأين يظهر المتبقي — دون لقطة PayPal أولاً.",
  "pWho2": "يمكن لأصحاب المتاجر استخدام عينات ${unit} حول منشور أو ملف عام واحد عندما يريدون معرفة إن كان الرابط سيُرفض قبل إطلاق منتج. على البائعين معاملة الباقات المجانية كـ QA شخصي لا كـ SKU للعملاء؛ حركة العملاء تخص سطور API المدفوعة الموثقة في <a href=\"/api-docs\">وثائق API</a>.",
  "pWho3": "إن كنت جديداً تماماً على اللوحات، اقرأ أولاً <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">ما هي لوحة SMM</a> ثم عُد لطلب ${title}.",
  "hHow": "كيف تطلب هذه الباقة المجانية خطوة بخطوة",
  "steps": [
    "<a href=\"/signup\">أنشئ حساباً مجانياً</a> باسم مستخدم ستضعه أيضاً في ملاحظات الدفع لاحقاً.",
    "أكد أنك تستطيع الدخول إلى اللوحة وفتح الخدمات المجانية.",
    "اختر <strong>${title}</strong> وانسخ نصائح صيغة الرابط المعروضة لـ ${label}.",
    "الصق رابط ${label} <strong>عاماً</strong>. الأهداف الخاصة غالباً تفشل بصمت أو تُلغى.",
    "أرسل وراقب الطلبات (أو عرض حالة الطلب المجاني) حتى ينتهي التشغيل أو يكتمل جزئياً.",
    "انتظر ${cooldown} ساعة كاملة قبل طلب هذه الباقة مجدداً. استخدم ذلك الوقت لتقرير شحن مدفوع."
  ],
  "pHow": "الدفع غير مطلوب لهذه التجربة. عندما تكون جاهزاً للتوسيع، استخدم <a href=\"/payments/paypal\">PayPal</a> أو العملات الرقمية أو طريقة أخرى مدرجة في المدفوعات، ثم أعد طلب سطر ${unit} أكبر من الكتالوج الحي.",
  "hLink": "قواعد الرابط والأمان لـ ${label}",
  "pLink1": "عام يعني أن زائراً غير مسجّل كحسابك يستطيع فتح الرابط. الحسابات المقفلة أو المنشورات المقيدة أو الوسائط المحظورة جغرافياً أسباب شائعة لعدم بدء ${unit} المجانية. أصلح الظهور أولاً؛ لا تحرق فترة الانتظار على هدف خاص.",
  "pLink2": "لا تشارك كلمات المرور أو رموز الاستعادة أو ملفات تعريف الجلسة مع أي لوحة — بما فيها SSMM Panel. أنماط إساءة القطاع ما زالت تدفع نماذج مشبوهة؛ مكاتبنا المجانية والمدفوعة قائمة على الروابط. لخلفية محايدة عن تسويق وسائل التواصل، اطّلع على نظرة Wikipedia عن <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a> ثم أبقِ قواعدك التشغيلية صارمة.",
  "pLink3": "ابدأ بهذه الكمية المجانية حتى لو خططت لأرقام أكبر لاحقاً. القفزات الهائلة الأولى على ملفات فارغة تبدو غير طبيعية ولا تعلّمك أي معرّف خدمة تبقي.",
  "hDiff": "كيف يختلف التسليم المجاني عن ${unit} المدفوعة",
  "pDiff1": "تشارك الباقات المجانية نفس مفردات الحالة العامة للطلبات المدفوعة — pending وprocessing وpartial وcompleted — لكن أولوية المخزون والسرعة قد تختلف. سطر مجاني يبدأ ضمن نافذة معقولة ضوء أخضر لتمويل المحفظة. سطر يتوقف أطول من الوصف إشارة لفتح تذكرة باسم مستخدمك قبل الإيداع.",
  "pDiff2": "تفتح ${unit} ${label} المدفوعة كميات قصوى أعلى وتقطيراً اختيارياً في بعض الصفوف ونوافذ إعادة تعبئة عندما يقول نص الخدمة ذلك. تحذف الباقات المجانية ميزات الحملات عمداً لتبقى التجربة بسيطة.",
  "pDiff3": "تتبّع ملاحظات الخدمة بعد طلب مجاني ناجح. عند الانتقال للمدفوع أعد طلب صف تصرّف بالمثل. يوضح <a href=\"/blog/how-to-place-your-first-smm-panel-order\">دليل الطلب الأول</a> خطوات التسجيل والرصيد وإتمام الطلب على SSMM Panel.",
  "hCool": "فترة الانتظار والاستخدام العادل وإساءة الحساب",
  "pCool1": "تنطبق نافذة ${cooldown} ساعة لكل حساب لهذه الباقة. إنشاء أكوام بريد مؤقت لاستنزاف ${fk} ينتهك الاستخدام العادل وقد يجمّد الوصول المجاني. سلوك الدفع المعرّض لاسترداد الرسوم في الإيداعات اللاحقة قد يجمّد الوصول المدفوع أيضاً — اقرأ <a href=\"/terms\">شروط الخدمة</a>.",
  "pCool2": "طلب نظيف واحد توثّقه بلقطات قبل/بعد أثمن من خمسة طلبات متعجّلة. المشغّلون الذين يعاملون الباقات المجانية كأدوات قياس ينتقلون أسرع للسطور المدفوعة ويهدرون رصيداً أقل.",
  "hAfter": "بعد التجربة: مسار الترقية على SSMM Panel",
  "pAfter1": "عندما تبدو ${qty} ${unit} مقبولة، افتح الخدمات، صفّ ${label}، واختر صفاً مدفوعاً لنفس المقياس. أكّد السعر لكل 1,000 والحد الأدنى/الأقصى وملاحظات التقطير قبل الدفع. الإيداعات الأولى الصغيرة مرحّب بها — راجع صفحات المدفوعات لمطابقة الإثبات + اسم المستخدم.",
  "pAfter2": "المبدعون الذين يحتاجون دفعات عرضية فقط يمكنهم البقاء على اللوحة. المتاجر التي تبيع SMM لعملائها يجب أن تولّد مفتاح API وتستدعي services/add/status/balance. تبقى الباقات المجانية خارج مسار الأتمتة ذلك عمداً.",
  "pAfter3": "ما زلت متردداً؟ تصفّح باقات مجانية شقيقة أدناه أو اسأل عبر <a href=\"/contact\">اتصل بنا</a> / واتساب مع اسم المستخدم. تفاصيل الخصوصية في <a href=\"/privacy\">سياسة الخصوصية</a>؛ سياق الشركة في <a href=\"/about\">من نحن</a>.",
  "hRel": "باقات مجانية ذات صلة وقراءات تالية",
  "hCheck": "قائمة تحقق سريعة قبل النقر على طلب",
  "checks": [
    "تم إنشاء حساب على ssmmpanel.com",
    "الهدف عام على ${label}",
    "تفهم أن الكمية ${qty} ${unit}",
    "يمكنك انتظار ${cooldown} ساعة قبل تكرار هذه الباقة",
    "لن ترسل كلمة مرور لأي أحد",
    "تعرف أين ستظهر الطلبات/الحالة بعد الإرسال"
  ],
  "outro": "اطلب <strong>${title}</strong> عندما تكون تلك القائمة صحيحة. استخدم نتيجة المجاني كدليل ثم توقف أو جرّب مقياساً مجانياً آخر أو أودع ووسّع بعينين مفتوحتين."
},
  },
  "id": {
    platforms: {
  "instagram": "Instagram",
  "tiktok": "TikTok",
  "youtube": "YouTube",
  "telegram": "Telegram",
  "facebook": "Facebook",
  "twitter": "Twitter / X",
  "spotify": "Spotify",
  "twitch": "Twitch"
},
    blurbs: {
  "instagram": "Instagram masih menyedot paling banyak lalu lintas uji SMM — bukti profil, likes posting, views Reels, story, dan komentar masing-masing di baris layanan terpisah dengan aturan min/max sendiri.",
  "tiktok": "Uji TikTok biasanya untuk melihat bagaimana views atau likes klip baru mulai. URL video dan profil publik sudah cukup; jangan pernah menyerahkan login.",
  "youtube": "Paket gratis YouTube sengaja kecil. Likes, views, dan subscriber berperilaku berbeda di feed supplier, jadi sampel kecil mengajarkan baris mana yang dipesan ulang nanti.",
  "telegram": "Uji Telegram fokus ke channel, grup, dan tautan post publik. Baris member dan views sering butuh cooldown lebih panjang karena inventori bergerak lebih lambat daripada likes Instagram.",
  "facebook": "Paket halaman dan post Facebook membantu toko menguji apakah URL halaman publik diterima sebelum membayar engagement lebih besar.",
  "twitter": "Paket gratis Twitter/X memakai URL profil atau post publik. Jumlahnya kecil dengan sengaja agar Anda bisa membaca status tanpa mengunci anggaran.",
  "spotify": "Uji Spotify mencakup play dan followers pada tautan trek, artis, atau playlist publik — berguna sebelum mendanai baris musik berbayar.",
  "twitch": "Uji followers Twitch untuk channel publik. Anggap sebagai cek format, lalu pindah ke inventori berbayar saat jadwal stream butuh volume lebih besar."
},
    units: {
  "followers": "followers",
  "likes": "likes",
  "views": "views",
  "storyViews": "story views",
  "comments": "komentar",
  "subscribers": "subscriber",
  "members": "member",
  "postViews": "views postingan",
  "pageLikes": "likes halaman",
  "postLikes": "likes postingan",
  "plays": "plays"
},
    titleMetric: {
  "followers": "Followers",
  "likes": "Likes",
  "views": "Views",
  "storyViews": "Story Views",
  "comments": "Komentar",
  "subscribers": "Subscriber",
  "members": "Member",
  "postViews": "Views Postingan",
  "pageLikes": "Likes Halaman",
  "postLikes": "Likes Postingan",
  "plays": "Plays"
},
    freeWord: "Gratis",
    titleMode: "suffix",
    kw: "{unit} {platform} gratis",
    desc: "Klaim {qty} {unit} {platform} gratis pada target publik untuk menilai waktu mulai sebelum top-up berbayar. Tanpa password.",
    metaTitle: "{titleMetric} {platform} Gratis — Paket Uji {qty} | SSMM",
    metaDesc: "Dapatkan {unit} {platform} gratis ({qty}) di SSMM Panel. Hanya tautan publik, cooldown {cooldown} jam, tanpa password. Uji pengiriman sebelum deposit.",
    imageAlt: "Sampul paket {titleMetric} {platform} Gratis — uji {qty} {unit} di SSMM Panel",
    keywords: [
  "{unit} {platform} gratis",
  "uji {platform} {unit}",
  "paket smm gratis"
],
    relatedBlog: "Layanan SMM gratis vs berbayar",
    relatedServices: "Katalog layanan berbayar",
    relatedPayments: "Metode pembayaran",
    table: {
  "field": "Bidang",
  "value": "Nilai",
  "why": "Mengapa penting",
  "pack": "Paket",
  "platform": "Platform",
  "quantity": "Jumlah",
  "cooldown": "Cooldown",
  "password": "Password",
  "next": "Langkah berikutnya",
  "packWhy": "Kata kunci fokus dan H1 cocok dengan nama ini",
  "platformWhy": "Gunakan hanya URL {label} publik",
  "quantityWhy": "Ukuran untuk uji pengiriman, bukan kampanye",
  "cooldownWhy": "Mencegah farm berulang inventori gratis",
  "passwordWhy": "Hanya format tautan / username publik",
  "passwordVal": "Tidak pernah diperlukan",
  "nextWhy": "Skalakan metrik yang sama setelah uji coba",
  "nextVal": "Layanan berbayar atau API",
  "hours": "jam"
},
    faq: [
  [
    "Bagaimana cara klaim {fk} di SSMM Panel?",
    "Buat akun gratis, buka Free Services, pilih {title}, dan kirim tautan {label} publik dari dasbor. Hormati cooldown {cooldown} jam sebelum klaim paket yang sama lagi."
  ],
  [
    "Apakah saya perlu password untuk {title}?",
    "Tidak. SSMM Panel hanya butuh URL atau username publik yang diterima layanan. Jika formulir meminta password sosial, berhenti dan hubungi dukungan — itu bukan alur kami."
  ],
  [
    "Berapa banyak {unit} dalam paket gratis ini?",
    "Uji coba ini mencakup {qty} {unit}. Ukurannya untuk menguji waktu mulai dan status, bukan kampanye pertumbuhan penuh."
  ],
  [
    "Bagaimana jika akun atau postingan saya privat?",
    "Target privat biasanya tidak bisa dipenuhi. Jadikan profil, post, atau channel publik, tunggu beberapa menit, lalu kirim lagi setelah cooldown jika perlu."
  ],
  [
    "Kapan saya harus upgrade dari gratis ke berbayar?",
    "Upgrade setelah paket gratis selesai bersih dan Anda ingin metrik yang sama dengan jumlah lebih besar. Simpan catatan service ID dari Orders, top-up via PayPal atau crypto, lalu pesan ulang dari Services atau API."
  ],
  [
    "Bisakah reseller mengotomatiskan paket gratis lewat API?",
    "Paket gratis untuk uji manusia dengan cooldown penggunaan wajar. Reseller harus memakai inventori berbayar PerfectPanel /api/v2 untuk pesanan pelanggan — lihat docs API setelah daftar."
  ]
],
    takeaway: "{title} memberi Anda {qty} {unit} gratis pada tautan {label} publik agar Anda bisa menilai pengiriman sebelum deposit. Jaga cooldown {cooldown} jam, jangan pernah bagikan password, dan pindah ke layanan berbayar hanya setelah uji coba terlihat benar.",
    content: {
  "intro1": "Mencari <strong>${fk}</strong> yang benar-benar bisa diklaim dan dilacak? Di SSMM Panel paket <strong>${title}</strong> mengirim <strong>${qty} ${unit}</strong> ke target ${label} publik agar Anda bisa melihat waktu mulai, remains, dan status akhir sebelum mendanai saldo lebih besar. Halaman ini adalah panduan operator untuk uji coba itu — bukan paragraf daur ulang “followers gratis selamanya”.",
  "intro3": "Inventori gratis ada untuk mengurangi deposit buta. Baca aturan, tempel URL publik, klaim sekali per cooldown, lalu putuskan apakah metrik yang sama pantas mendapat baris berbayar dari <a href=\"/services\">Services</a>. Untuk pohon keputusan gratis vs berbayar yang lebih luas, lihat panduan kami tentang <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">${relatedBlog}</a>.",
  "hWhat": "Apa saja yang termasuk ${title}",
  "pWhat1": "Nama paket bersifat harfiah: Anda meminta ${qty} ${unit} melalui meja free-services di ssmmpanel.com. Jumlah dibatasi dengan sengaja. Paket kecil memudahkan melihat apakah format tautan diterima dan apakah status bergerak dari pending ke processing tanpa menebak di chat.",
  "pWhat2": "Cooldown adalah <strong>${cooldown} ${hours}</strong> antara klaim berhasil paket yang sama. Batas itu melindungi inventori untuk penguji lain dan memblok farm dengan akun sekali pakai. Jika butuh volume harian, itu alur berbayar setelah <a href=\"/payments\">menambah dana</a>.",
  "hWho": "Siapa yang sebaiknya klaim ${fk}",
  "pWho1": "Kreator yang belum pernah memesan di SSMM Panel sebaiknya mulai di sini. Paket gratis mengajarkan bahasa dasbor — New order vs Free Services, label status, dan di mana remains muncul — tanpa screenshot PayPal dulu.",
  "pWho2": "Pemilik toko dapat memakai sampel ${unit} pada satu post atau profil publik ketika ingin tahu apakah tautan akan ditolak sebelum drop produk. Reseller harus memperlakukan paket gratis sebagai QA pribadi, bukan SKU pelanggan; lalu lintas pelanggan ada di baris API berbayar yang didokumentasikan di <a href=\"/api-docs\">docs API</a>.",
  "pWho3": "Jika Anda benar-benar baru pada panel, baca dulu <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">apa itu SMM panel</a>, lalu kembali untuk klaim ${title}.",
  "hHow": "Cara klaim paket gratis ini langkah demi langkah",
  "steps": [
    "<a href=\"/signup\">Buat akun gratis</a> dengan username yang juga akan Anda tulis di catatan pembayaran nanti.",
    "Pastikan Anda bisa masuk ke dasbor dan membuka Free Services.",
    "Pilih <strong>${title}</strong> dan salin tips format tautan yang ditampilkan untuk ${label}.",
    "Tempel URL ${label} yang <strong>publik</strong>. Target privat biasanya gagal diam-diam atau dibatalkan.",
    "Kirim dan pantau Orders (atau tampilan status klaim gratis) sampai jalan selesai atau selesai sebagian.",
    "Tunggu ${cooldown} jam penuh sebelum klaim paket ini lagi. Gunakan waktu itu untuk memutuskan top-up berbayar."
  ],
  "pHow": "Pembayaran tidak diperlukan untuk uji coba ini. Saat siap menskalakan, gunakan <a href=\"/payments/paypal\">PayPal</a>, crypto, atau metode lain di Payments, lalu pesan ulang baris ${unit} yang lebih besar dari katalog live.",
  "hLink": "Aturan tautan dan keamanan untuk ${label}",
  "pLink1": "Publik berarti pengunjung yang tidak login sebagai Anda dapat membuka URL. Akun terkunci, post dibatasi, atau media diblokir geo adalah alasan umum ${unit} gratis tidak pernah mulai. Perbaiki visibilitas dulu; jangan habiskan cooldown pada target privat.",
  "pLink2": "Jangan pernah membagikan password, kode pemulihan, atau cookie sesi ke panel mana pun — termasuk SSMM Panel. Pola penyalahgunaan industri masih mendorong formulir mencurigakan; meja gratis dan berbayar kami berbasis tautan. Untuk latar netral tentang taktik pemasaran sosial, lihat ringkasan Wikipedia tentang <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a>, lalu jaga aturan operasional Anda ketat.",
  "pLink3": "Mulai dengan jumlah gratis ini meskipun nanti merencanakan angka lebih besar. Lonjakan awal besar di profil kosong terlihat tidak alami dan tidak mengajarkan service ID mana yang dipertahankan.",
  "hDiff": "Bagaimana pengiriman gratis berbeda dari ${unit} berbayar",
  "pDiff1": "Paket gratis memakai kosakata status umum yang sama dengan pesanan berbayar — pending, processing, partial, completed — tetapi prioritas dan kecepatan inventori bisa berbeda. Baris gratis yang mulai dalam jendela wajar adalah lampu hijau untuk mendanai dompet. Baris yang macet melewati deskripsi adalah sinyal membuka tiket dengan username Anda sebelum deposit.",
  "pDiff2": "${unit} ${label} berbayar membuka max quantity lebih tinggi, drip-feed opsional di beberapa baris, dan jendela refill saat teks layanan mengatakannya. Paket gratis sengaja menghilangkan fitur kampanye agar uji coba tetap sederhana.",
  "pDiff3": "Lacak catatan layanan yang Anda lihat setelah klaim gratis berhasil. Saat pindah ke berbayar, pesan ulang baris yang berperilaku mirip. <a href=\"/blog/how-to-place-your-first-smm-panel-order\">Panduan pesanan pertama</a> kami menjelaskan daftar, saldo, dan checkout di SSMM Panel.",
  "hCool": "Cooldown, penggunaan wajar, dan penyalahgunaan akun",
  "pCool1": "Jendela ${cooldown} jam berlaku per akun untuk paket ini. Membuat tumpukan email sekali pakai untuk farm ${fk} melanggar penggunaan wajar dan dapat membekukan akses gratis. Perilaku pembayaran rentan payment disputes pada deposit berikutnya juga dapat membekukan akses berbayar — baca <a href=\"/terms\">Syarat Layanan</a>.",
  "pCool2": "Satu klaim bersih yang Anda dokumentasikan dengan screenshot sebelum/sesudah lebih berharga daripada lima klaim tergesa. Operator yang memperlakukan paket gratis sebagai alat ukur naik ke baris berbayar lebih cepat dan membuang lebih sedikit saldo.",
  "hAfter": "Setelah uji coba: jalur upgrade di SSMM Panel",
  "pAfter1": "Ketika ${qty} ${unit} terlihat dapat diterima, buka Services, filter ${label}, dan pilih baris berbayar untuk metrik yang sama. Konfirmasi rate per 1.000, min/max, dan catatan drip-feed sebelum checkout. Deposit pertama kecil diterima — lihat landing Payments untuk bukti + pencocokan username.",
  "pAfter2": "Kreator yang hanya butuh dorongan sesekali bisa tetap di dasbor. Toko yang menjual SMM ke pelanggan sendiri harus membuat API key dan memanggil services/add/status/balance. Paket gratis sengaja berada di luar jalur otomatisasi itu.",
  "pAfter3": "Masih ragu? Jelajahi paket gratis saudara di bawah, atau tanya di <a href=\"/contact\">Kontak</a> / WhatsApp dengan username Anda. Detail privasi ada di <a href=\"/privacy\">Kebijakan Privasi</a>; konteks perusahaan di <a href=\"/about\">Tentang Kami</a>.",
  "hRel": "Paket gratis terkait dan bacaan berikutnya",
  "hCheck": "Checklist cepat sebelum mengeklik klaim",
  "checks": [
    "Akun dibuat di ssmmpanel.com",
    "Target publik di ${label}",
    "Anda paham jumlahnya ${qty} ${unit}",
    "Anda bisa menunggu ${cooldown} jam sebelum mengulang paket ini",
    "Anda tidak akan mengirim password ke siapa pun",
    "Anda tahu di mana Orders/status muncul setelah kirim"
  ],
  "outro": "Klaim <strong>${title}</strong> ketika daftar itu benar. Gunakan hasil gratis sebagai bukti, lalu berhenti, coba metrik gratis lain, atau deposit dan skalakan dengan mata terbuka."
},
  },
  "bn": {
    platforms: {
  "instagram": "Instagram",
  "tiktok": "TikTok",
  "youtube": "YouTube",
  "telegram": "Telegram",
  "facebook": "Facebook",
  "twitter": "Twitter / X",
  "spotify": "Spotify",
  "twitch": "Twitch"
},
    blurbs: {
  "instagram": "Instagram এখনও সবচেয়ে বেশি ফ্রি SMM ট্রায়াল ট্রাফিক টানে — প্রোফাইল প্রুফ, পোস্ট লাইক, Reels ভিউ, স্টোরি ও কমেন্ট আলাদা সার্ভিস সারিতে থাকে নিজস্ব min/max নিয়মসহ।",
  "tiktok": "TikTok ট্রায়াল সাধারণত নতুন ক্লিপের ভিউ বা লাইক কীভাবে শুরু হয় তা দেখার জন্য। পাবলিক ভিডিও ও প্রোফাইল লিংকই যথেষ্ট; কখনো লগইন হস্তান্তর করবেন না।",
  "youtube": "YouTube ফ্রি প্যাক ইচ্ছাকৃতভাবে ছোট রাখা হয়। লাইক, ভিউ ও সাবস্ক্রাইবার সাপ্লায়ার ফিডে আলাদা আচরণ করে, তাই ছোট নমুনা পরে কোন লাইন আবার অর্ডার করবেন শেখায়।",
  "telegram": "Telegram ট্রায়াল পাবলিক চ্যানেল, গ্রুপ ও পোস্ট লিংকে ফোকাস করে। মেম্বার ও ভিউ লাইনে প্রায়ই লম্বা কুলডাউন লাগে কারণ ইনভেন্টরি Instagram লাইকের চেয়ে ধীর চলে।",
  "facebook": "Facebook পেজ ও পোস্ট প্যাক দোকানগুলোকে বড় এনগেজমেন্ট কেনার আগে পাবলিক পেজ URL গ্রহণযোগ্য কিনা পরীক্ষা করতে সাহায্য করে।",
  "twitter": "Twitter/X ফ্রি প্যাক পাবলিক প্রোফাইল বা পোস্ট URL ব্যবহার করে। সংখ্যা ইচ্ছাকৃতভাবে ছোট যাতে বাজেট না বেঁধে স্ট্যাটাস আপডেট পড়া যায়।",
  "spotify": "Spotify ট্রায়াল পাবলিক ট্র্যাক, আর্টিস্ট বা প্লেলিস্ট লিংকে প্লে ও ফলোয়ার কভার করে — মিউজিক ফোকাসড পেইড লাইনে টাকা রাখার আগে কাজে লাগে।",
  "twitch": "Twitch ফলোয়ার ট্রায়াল পাবলিক চ্যানেলের জন্য। ফরম্যাট চেক হিসেবে নিন, তারপর স্ট্রিম শিডিউলে বেশি ভলিউম লাগলে পেইড ইনভেন্টরিতে যান।"
},
    units: {
  "followers": "ফলোয়ার",
  "likes": "লাইক",
  "views": "ভিউ",
  "storyViews": "স্টোরি ভিউ",
  "comments": "কমেন্ট",
  "subscribers": "সাবস্ক্রাইবার",
  "members": "মেম্বার",
  "postViews": "পোস্ট ভিউ",
  "pageLikes": "পেজ লাইক",
  "postLikes": "পোস্ট লাইক",
  "plays": "প্লে"
},
    titleMetric: {
  "followers": "ফলোয়ার",
  "likes": "লাইক",
  "views": "ভিউ",
  "storyViews": "স্টোরি ভিউ",
  "comments": "কমেন্ট",
  "subscribers": "সাবস্ক্রাইবার",
  "members": "মেম্বার",
  "postViews": "পোস্ট ভিউ",
  "pageLikes": "পেজ লাইক",
  "postLikes": "পোস্ট লাইক",
  "plays": "প্লে"
},
    freeWord: "ফ্রি",
    titleMode: "prefix",
    kw: "ফ্রি {platform} {unit}",
    desc: "পেইড টপ-আপের আগে স্টার্ট টাইম দেখতে পাবলিক টার্গেটে {qty} ফ্রি {platform} {unit} দাবি করুন। পাসওয়ার্ড লাগে না।",
    metaTitle: "ফ্রি {platform} {titleMetric} — {qty} ট্রায়াল প্যাক | SSMM",
    metaDesc: "SSMM Panel-এ ফ্রি {platform} {unit} ({qty}) নিন। শুধু পাবলিক লিংক, {cooldown} ঘণ্টা কুলডাউন, পাসওয়ার্ড নেই। ডিপোজিটের আগে ডেলিভারি টেস্ট করুন।",
    imageAlt: "ফ্রি {platform} {titleMetric} প্যাক কভার — SSMM Panel-এ {qty} {unit} ট্রায়াল",
    keywords: [
  "ফ্রি {platform} {unit}",
  "{platform} {unit} ট্রায়াল",
  "ফ্রি smm প্যাক"
],
    relatedBlog: "ফ্রি SMM সার্ভিস বনাম পেইড",
    relatedServices: "পেইড সার্ভিস ক্যাটালগ",
    relatedPayments: "পেমেন্ট পদ্ধতি",
    table: {
  "field": "ফিল্ড",
  "value": "মান",
  "why": "কেন গুরুত্বপূর্ণ",
  "pack": "প্যাক",
  "platform": "প্ল্যাটফর্ম",
  "quantity": "পরিমাণ",
  "cooldown": "কুলডাউন",
  "password": "পাসওয়ার্ড",
  "next": "পরবর্তী ধাপ",
  "packWhy": "ফোকাস কিওয়ার্ড ও H1 এই নামের সাথে মিলে স্পষ্ট ইন্টেন্ট দেয়",
  "platformWhy": "শুধু পাবলিক {label} URL ব্যবহার করুন",
  "quantityWhy": "ক্যাম্পেইন নয়, ডেলিভারি টেস্টের জন্য সাইজ করা",
  "cooldownWhy": "ফ্রি ইনভেন্টরি বারবার ফার্ম করা ঠেকায়",
  "passwordWhy": "শুধু পাবলিক লিংক / ইউজারনেম ফরম্যাট",
  "passwordVal": "কখনোই লাগে না",
  "nextWhy": "ট্রায়ালের পর একই মেট্রিক স্কেল করুন",
  "nextVal": "পেইড সার্ভিস বা API",
  "hours": "ঘণ্টা"
},
    faq: [
  [
    "SSMM Panel-এ {fk} কীভাবে দাবি করব?",
    "ফ্রি অ্যাকাউন্ট তৈরি করুন, Free Services খুলুন, {title} বেছে নিন এবং ড্যাশবোর্ড থেকে পাবলিক {label} লিংক জমা দিন। একই প্যাক আবার দাবির আগে {cooldown} ঘণ্টার কুলডাউন মানুন।"
  ],
  [
    "{title}-এর জন্য কি পাসওয়ার্ড লাগে?",
    "না। SSMM Panel শুধু সেই পাবলিক URL বা ইউজারনেম চায় যা সার্ভিস গ্রহণ করে। কোনো ফর্ম সোশ্যাল পাসওয়ার্ড চাইলে থামুন এবং সাপোর্টে যোগাযোগ করুন — এটা আমাদের ফ্লো নয়।"
  ],
  [
    "এই ফ্রি প্যাকে কত {unit} আছে?",
    "এই ট্রায়ালে {qty} {unit} আছে। এটা পূর্ণ গ্রোথ ক্যাম্পেইনের জন্য নয়; স্টার্ট টাইম ও স্ট্যাটাস রিপোর্ট টেস্টের জন্য।"
  ],
  [
    "অ্যাকাউন্ট বা পোস্ট প্রাইভেট হলে কী হবে?",
    "প্রাইভেট টার্গেট সাধারণত পূরণ হয় না। প্রোফাইল, পোস্ট বা চ্যানেল পাবলিক করুন, কয়েক মিনিট অপেক্ষা করুন, প্রয়োজনে কুলডাউনের পর আবার জমা দিন।"
  ],
  [
    "ফ্রি থেকে পেইডে কখন আপগ্রেড করব?",
    "ফ্রি প্যাক পরিষ্কার শেষ হলে এবং একই মেট্রিক বেশি পরিমাণে চাইলে আপগ্রেড করুন। Orders থেকে সার্ভিস ID নোট রাখুন, PayPal বা ক্রিপ্টোতে টপ-আপ করুন, তারপর Services বা API থেকে আবার অর্ডার দিন।"
  ],
  [
    "রিসেলাররা কি API দিয়ে ফ্রি প্যাক অটোমেট করতে পারে?",
    "ফ্রি প্যাক ফেয়ার-ইউজ কুলডাউনসহ মানব ট্রায়ালের জন্য। রিসেলারদের কাস্টমার অর্ডারের জন্য পেইড PerfectPanel-কম্প্যাটিবল /api/v2 ইনভেন্টরি ব্যবহার করা উচিত — সাইনআপের পর API ডক দেখুন।"
  ]
],
    takeaway: "{title} আপনাকে পাবলিক {label} লিংকে {qty} ফ্রি {unit} দেয় যাতে ডিপোজিটের আগে ডেলিভারি বিচার করতে পারেন। {cooldown} ঘণ্টার কুলডাউন রাখুন, কখনো পাসওয়ার্ড শেয়ার করবেন না, এবং ট্রায়াল ঠিক মনে হলেই পেইড সার্ভিসে যান।",
    content: {
  "intro1": "এমন <strong>${fk}</strong> খুঁজছেন যা সত্যিই দাবি ও ট্র্যাক করা যায়? SSMM Panel-এ <strong>${title}</strong> প্যাক একটি পাবলিক ${label} টার্গেটে <strong>${qty} ${unit}</strong> পৌঁছায় যাতে বড় ব্যালেন্স ফান্ড করার আগে স্টার্ট টাইম, remains ও চূড়ান্ত স্ট্যাটাস দেখতে পারেন। এই পেজ সেই ট্রায়ালের অপারেটর গাইড — “চিরকাল ফ্রি ফলোয়ার” স্ক্রিপ্ট প্যারাগ্রাফ নয়।",
  "intro3": "অন্ধ ডিপোজিট কমাতে ফ্রি ইনভেন্টরি আছে। নিয়ম পড়ুন, পাবলিক URL পেস্ট করুন, প্রতি কুলডাউনে একবার দাবি করুন, তারপর সিদ্ধান্ত নিন একই মেট্রিক <a href=\"/services\">Services</a> থেকে পেইড লাইনের যোগ্য কিনা। বিস্তৃত ফ্রি-বনাম-পেইড সিদ্ধান্তের জন্য <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">${relatedBlog}</a> গাইড দেখুন।",
  "hWhat": "${title}-এ কী আছে",
  "pWhat1": "প্যাকের নাম আক্ষরিক: আপনি ssmmpanel.com-এর free-services ডেস্কে ${qty} ${unit} চাইছেন। পরিমাণ ইচ্ছাকৃতভাবে সীমিত। ছোট প্যাক দেখায় লিংক ফরম্যাট গ্রহণযোগ্য কিনা এবং স্ট্যাটাস চ্যাট অনুমান ছাড়াই pending থেকে processing-এ যায় কিনা।",
  "pWhat2": "একই প্যাকের সফল দাবির মধ্যে কুলডাউন <strong>${cooldown} ${hours}</strong>। এটি অন্য টেস্টারদের জন্য ইনভেন্টরি রক্ষা করে এবং ফেলে-দেওয়া অ্যাকাউন্টে ফার্মিং আটকায়। দৈনিক ভলিউম চাইলে সেটা <a href=\"/payments\">ফান্ড যোগ</a> করার পরের পেইড ওয়ার্কফ্লো।",
  "hWho": "${fk} কে দাবি করবেন",
  "pWho1": "যারা SSMM Panel-এ কখনো অর্ডার করেননি তারা এখানে শুরু করুন। ফ্রি প্যাক ড্যাশবোর্ডের ভাষা শেখায় — New order বনাম Free Services, স্ট্যাটাস লেবেল ও remains কোথায় দেখা যায় — আগে PayPal স্ক্রিনশট ছাড়াই।",
  "pWho2": "দোকান মালিকরা প্রোডাক্ট ড্রপের আগে লিংক রিজেক্ট হবে কিনা জানতে একক পাবলিক পোস্ট বা প্রোফাইলে ${unit} স্যাম্পল ব্যবহার করতে পারেন। রিসেলারদের ফ্রি প্যাককে কাস্টমার SKU না বলে ব্যক্তিগত QA ভাবা উচিত; কাস্টমার ট্রাফিক <a href=\"/api-docs\">API ডকস</a>-এ নথিভুক্ত পেইড API লাইনে থাকে।",
  "pWho3": "প্যানেলে একেবারে নতুন হলে আগে <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">SMM প্যানেল কী</a> পড়ুন, তারপর ${title} দাবি করতে ফিরে আসুন।",
  "hHow": "এই ফ্রি প্যাক ধাপে ধাপে কীভাবে দাবি করবেন",
  "steps": [
    "পরে পেমেন্ট নোটেও লিখবেন এমন ইউজারনেম দিয়ে <a href=\"/signup\">ফ্রি অ্যাকাউন্ট তৈরি করুন</a>।",
    "ড্যাশবোর্ডে লগইন ও Free Services খোলা যায় কিনা নিশ্চিত করুন।",
    "<strong>${title}</strong> বেছে নিন এবং ${label}-এর লিংক ফরম্যাট টিপস কপি করুন।",
    "<strong>পাবলিক</strong> ${label} URL পেস্ট করুন। প্রাইভেট টার্গেট সাধারণত নীরবে ফেল হয় বা বাতিল হয়।",
    "জমা দিন এবং রান শেষ বা আংশিক সম্পন্ন হওয়া পর্যন্ত Orders (বা ফ্রি-ক্লেইম স্ট্যাটাস ভিউ) দেখুন।",
    "এই প্যাক আবার দাবির আগে পুরো ${cooldown} ঘণ্টা অপেক্ষা করুন। সেই সময় পেইড টপ-আপ সিদ্ধান্তে ব্যবহার করুন।"
  ],
  "pHow": "এই ট্রায়ালে পেমেন্ট লাগে না। স্কেল করতে প্রস্তুত হলে <a href=\"/payments/paypal\">PayPal</a>, ক্রিপ্টো বা Payments-এর অন্য পদ্ধতি ব্যবহার করুন, তারপর লাইভ ক্যাটালগ থেকে বড় ${unit} লাইন আবার অর্ডার করুন।",
  "hLink": "${label}-এর জন্য লিংক নিয়ম ও নিরাপত্তা",
  "pLink1": "পাবলিক মানে আপনি হিসেবে লগইন না করা ভিজিটর URL খুলতে পারে। লক অ্যাকাউন্ট, সীমিত পোস্ট বা জিও-ব্লক মিডিয়া ফ্রি ${unit} কখনো শুরু না হওয়ার সাধারণ কারণ। আগে ভিজিবিলিটি ঠিক করুন; প্রাইভেট টার্গেটে কুলডাউন পোড়াবেন না।",
  "pLink2": "কোনো প্যানেলের সাথে — SSMM Panel সহ — পাসওয়ার্ড, রিকভারি কোড বা সেশন কুকি শেয়ার করবেন না। ইন্ডাস্ট্রি অ্যাবিউজ এখনও সন্দেহজনক ফর্ম ঠেলে; আমাদের ফ্রি ও পেইড ডেস্ক লিংক-ভিত্তিক। সোশ্যাল মার্কেটিং ট্যাকটিকসের নিরপেক্ষ ব্যাকগ্রাউন্ডের জন্য Wikipedia-র <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a> সারাংশ দেখুন, তারপর অপারেশনাল নিয়ম কঠোর রাখুন।",
  "pLink3": "পরে বড় সংখ্যা পরিকল্পনা করলেও এই ফ্রি পরিমাণ দিয়ে শুরু করুন। খালি প্রোফাইলে প্রথম বিশাল স্পাইক অস্বাভাবিক লাগে এবং কোন সার্ভিস ID রাখবেন শেখায় না।",
  "hDiff": "ফ্রি ডেলিভারি পেইড ${unit} থেকে কীভাবে আলাদা",
  "pDiff1": "ফ্রি প্যাক পেইড অর্ডারের মতোই সাধারণ স্ট্যাটাস শব্দভাণ্ডার ভাগ করে — pending, processing, partial, completed — কিন্তু ইনভেন্টরি অগ্রাধিকার ও গতি আলাদা হতে পারে। যুক্তিসংগত সময়ে শুরু হওয়া ফ্রি লাইন ওয়ালেট ফান্ডের সবুজ সংকেত। বিবরণ পেরিয়ে আটকে থাকা লাইন ডিপোজিটের আগে ইউজারনেম দিয়ে টিকিট খোলার ইঙ্গিত।",
  "pDiff2": "পেইড ${label} ${unit} উচ্চতর max, কিছু সারিতে ঐচ্ছিক drip-feed এবং সার্ভিস টেক্সট বললে refill উইন্ডো খোলে। ফ্রি প্যাক ইচ্ছাকৃতভাবে ক্যাম্পেইন ফিচার বাদ দেয় যাতে ট্রায়াল সহজ থাকে।",
  "pDiff3": "সফল ফ্রি দাবির পর দেখা সার্ভিস নোট ট্র্যাক করুন। পেইডে গিয়ে অনুরূপ আচরণ করা সারি আবার অর্ডার করুন। আমাদের <a href=\"/blog/how-to-place-your-first-smm-panel-order\">প্রথম অর্ডার গাইড</a> সাইনআপ, ব্যালেন্স ও চেকআউট ব্যাখ্যা করে।",
  "hCool": "কুলডাউন, ফেয়ার ইউজ ও অ্যাকাউন্ট অ্যাবিউজ",
  "pCool1": "এই প্যাকের জন্য ${cooldown} ঘণ্টার উইন্ডো অ্যাকাউন্ট প্রতি প্রযোজ্য। ${fk} ফার্ম করতে ফেলে-দেওয়া ইমেইল স্তূপ তৈরি করা ফেয়ার ইউজ ভাঙে এবং ফ্রি অ্যাক্সেস ফ্রিজ করতে পারে। পরবর্তী ডিপোজিটে payment disputes-প্রবণ পেমেন্ট আচরণ পেইড অ্যাক্সেসও ফ্রিজ করতে পারে — <a href=\"/terms\">Terms of Service</a> পড়ুন।",
  "pCool2": "আগে/পরে স্ক্রিনশট দিয়ে নথিভুক্ত এক পরিষ্কার দাবি পাঁচটি তাড়াহুড়ো দাবির চেয়ে বেশি মূল্যবান। যারা ফ্রি প্যাককে পরিমাপ টুল মানেন তারা দ্রুত পেইড লাইনে যান এবং কম ব্যালেন্স নষ্ট করেন।",
  "hAfter": "ট্রায়ালের পর: SSMM Panel-এ আপগ্রেড পথ",
  "pAfter1": "${qty} ${unit} গ্রহণযোগ্য মনে হলে Services খুলুন, ${label} ফিল্টার করুন এবং একই মেট্রিকের পেইড সারি বেছে নিন। চেকআউটের আগে প্রতি 1,000 রেট, min/max ও drip-feed নোট নিশ্চিত করুন। ছোট প্রথম ডিপোজিট স্বাগত — প্রুফ + ইউজারনেম ম্যাচের জন্য Payments ল্যান্ডিং দেখুন।",
  "pAfter2": "যারা শুধু মাঝে মাঝে বাম্প চান তারা ড্যাশবোর্ডে থাকতে পারেন। নিজের কাস্টমারকে SMM বিক্রি করা স্টোরগুলোর API কী তৈরি করে services/add/status/balance কল করা উচিত। ফ্রি প্যাক ইচ্ছাকৃতভাবে সেই অটোমেশন পথের বাইরে থাকে।",
  "pAfter3": "এখনও নিশ্চিত নন? নিচের সিবলিং ফ্রি প্যাক দেখুন, বা ইউজারনেম দিয়ে <a href=\"/contact\">Contact</a> / WhatsApp-এ জিজ্ঞাসা করুন। প্রাইভেসি বিস্তারিত <a href=\"/privacy\">Privacy Policy</a>-তে; কোম্পানি প্রসঙ্গ <a href=\"/about\">About Us</a>-এ।",
  "hRel": "সম্পর্কিত ফ্রি প্যাক ও পরবর্তী পঠন",
  "hCheck": "ক্লেইম ক্লিকের আগে দ্রুত চেকলিস্ট",
  "checks": [
    "ssmmpanel.com-এ অ্যাকাউন্ট তৈরি হয়েছে",
    "টার্গেট ${label}-এ পাবলিক",
    "পরিমাণ ${qty} ${unit} বোঝেন",
    "এই প্যাক পুনরাবৃত্তির আগে ${cooldown} ঘণ্টা অপেক্ষা করতে পারেন",
    "কাউকে পাসওয়ার্ড পাঠাবেন না",
    "জমার পর Orders/স্ট্যাটাস কোথায় দেখাবে জানেন"
  ],
  "outro": "তালিকা সত্য হলে <strong>${title}</strong> দাবি করুন। ফ্রি ফলাফল প্রমাণ হিসেবে ব্যবহার করুন; তারপর থামুন, অন্য ফ্রি মেট্রিক চেষ্টা করুন, বা চোখ খোলা রেখে ডিপোজিট করে স্কেল করুন।"
},
  },
  "hi": {
    platforms: {
  "instagram": "Instagram",
  "tiktok": "TikTok",
  "youtube": "YouTube",
  "telegram": "Telegram",
  "facebook": "Facebook",
  "twitter": "Twitter / X",
  "spotify": "Spotify",
  "twitch": "Twitch"
},
    blurbs: {
  "instagram": "Instagram अभी भी सबसे ज़्यादा फ्री SMM ट्रायल ट्रैफिक खींचता है — प्रोफ़ाइल प्रूफ, पोस्ट लाइक्स, Reels व्यूज़, स्टोरी और कमेंट्स अलग सर्विस पंक्तियों में अपने min/max नियमों के साथ रहते हैं।",
  "tiktok": "TikTok ट्रायल अक्सर यह देखने के लिए होते हैं कि नए क्लिप के व्यूज़ या लाइक्स कैसे शुरू होते हैं। पब्लिक वीडियो और प्रोफ़ाइल लिंक काफ़ी हैं; कभी लॉगिन न दें।",
  "youtube": "YouTube फ्री पैक जानबूझकर छोटे रखे जाते हैं। लाइक्स, व्यूज़ और सब्सक्राइबर सप्लायर फीड में अलग व्यवहार करते हैं, इसलिए छोटा सैंपल बाद में कौन-सी लाइन दोबारा ऑर्डर करनी है सिखाता है।",
  "telegram": "Telegram ट्रायल पब्लिक चैनल, ग्रुप और पोस्ट लिंक पर केंद्रित हैं। मेंबर और व्यू लाइनों को अक्सर लंबा कूलडाउन चाहिए क्योंकि इन्वेंटरी Instagram लाइक्स से धीमी चलती है।",
  "facebook": "Facebook पेज और पोस्ट पैक दुकानों को बड़े एंगेजमेंट पर पैसे लगाने से पहले पब्लिक पेज URL स्वीकार होता है या नहीं, जाँचने में मदद करते हैं।",
  "twitter": "Twitter/X फ्री पैक पब्लिक प्रोफ़ाइल या पोस्ट URL उपयोग करते हैं। संख्या जानबूझकर छोटी है ताकि बजट बाँधे बिना स्टेटस अपडेट पढ़ सकें।",
  "spotify": "Spotify ट्रायल पब्लिक ट्रैक, आर्टिस्ट या प्लेलिस्ट लिंक पर प्लेज़ और फॉलोअर्स कवर करते हैं — म्यूज़िक-फोकस्ड पेड लाइनों में फंड करने से पहले उपयोगी।",
  "twitch": "Twitch फॉलोअर ट्रायल पब्लिक चैनलों के लिए हैं। इन्हें फ़ॉर्मेट चेक मानें, फिर जब स्ट्रीम शेड्यूल को ज़्यादा वॉल्यूम चाहिए तो पेड इन्वेंटरी पर जाएँ।"
},
    units: {
  "followers": "फॉलोअर्स",
  "likes": "लाइक्स",
  "views": "व्यूज़",
  "storyViews": "स्टोरी व्यूज़",
  "comments": "कमेंट्स",
  "subscribers": "सब्सक्राइबर",
  "members": "मेंबर्स",
  "postViews": "पोस्ट व्यूज़",
  "pageLikes": "पेज लाइक्स",
  "postLikes": "पोस्ट लाइक्स",
  "plays": "प्लेज़"
},
    titleMetric: {
  "followers": "फॉलोअर्स",
  "likes": "लाइक्स",
  "views": "व्यूज़",
  "storyViews": "स्टोरी व्यूज़",
  "comments": "कमेंट्स",
  "subscribers": "सब्सक्राइबर",
  "members": "मेंबर्स",
  "postViews": "पोस्ट व्यूज़",
  "pageLikes": "पेज लाइक्स",
  "postLikes": "पोस्ट लाइक्स",
  "plays": "प्लेज़"
},
    freeWord: "मुफ़्त",
    titleMode: "prefix",
    kw: "मुफ़्त {platform} {unit}",
    desc: "पेड टॉप-अप से पहले स्टार्ट टाइम जाँचने के लिए पब्लिक टारगेट पर {qty} मुफ़्त {platform} {unit} क्लेम करें। पासवर्ड की ज़रूरत नहीं।",
    metaTitle: "मुफ़्त {platform} {titleMetric} — {qty} ट्रायल पैक | SSMM",
    metaDesc: "SSMM Panel पर मुफ़्त {platform} {unit} ({qty}) पाएँ। केवल पब्लिक लिंक, {cooldown} घंटे कूलडाउन, बिना पासवर्ड। डिपॉज़िट से पहले डिलीवरी टेस्ट करें।",
    imageAlt: "मुफ़्त {platform} {titleMetric} पैक कवर — SSMM Panel पर {qty} {unit} ट्रायल",
    keywords: [
  "मुफ़्त {platform} {unit}",
  "{platform} {unit} ट्रायल",
  "मुफ़्त smm पैक"
],
    relatedBlog: "मुफ़्त SMM सेवाएँ बनाम पेड",
    relatedServices: "पेड सेवा कैटलॉग",
    relatedPayments: "भुगतान विधियाँ",
    table: {
  "field": "फ़ील्ड",
  "value": "मान",
  "why": "क्यों ज़रूरी",
  "pack": "पैक",
  "platform": "प्लेटफ़ॉर्म",
  "quantity": "मात्रा",
  "cooldown": "कूलडाउन",
  "password": "पासवर्ड",
  "next": "अगला कदम",
  "packWhy": "फ़ोकस कीवर्ड और H1 इस नाम से मेल खाकर स्पष्ट इंटेंट देते हैं",
  "platformWhy": "केवल पब्लिक {label} URL उपयोग करें",
  "quantityWhy": "कैंपेन नहीं, डिलीवरी टेस्ट के लिए आकार",
  "cooldownWhy": "फ्री इन्वेंटरी के बार-बार फ़ार्मिंग को रोकता है",
  "passwordWhy": "केवल पब्लिक लिंक / यूज़रनेम फ़ॉर्मेट",
  "passwordVal": "कभी आवश्यक नहीं",
  "nextWhy": "ट्रायल के बाद वही मेट्रिक स्केल करें",
  "nextVal": "पेड सेवाएँ या API",
  "hours": "घंटे"
},
    faq: [
  [
    "SSMM Panel पर {fk} कैसे क्लेम करें?",
    "मुफ़्त खाता बनाएँ, Free Services खोलें, {title} चुनें, और डैशबोर्ड से पब्लिक {label} लिंक सबमिट करें। वही पैक दोबारा क्लेम करने से पहले {cooldown}-घंटे के कूलडाउन का सम्मान करें।"
  ],
  [
    "क्या {title} के लिए पासवर्ड चाहिए?",
    "नहीं। SSMM Panel को केवल वह पब्लिक URL या यूज़रनेम चाहिए जिसे सेवा स्वीकार करे। अगर कोई फ़ॉर्म सोशल पासवर्ड माँगे, रुकें और सपोर्ट से संपर्क करें — यह हमारा फ़्लो नहीं है।"
  ],
  [
    "इस फ्री पैक में कितने {unit} हैं?",
    "इस ट्रायल में {qty} {unit} शामिल हैं। यह पूरे ग्रोथ कैंपेन के लिए नहीं; स्टार्ट टाइम और स्टेटस रिपोर्टिंग टेस्ट के लिए है।"
  ],
  [
    "अगर मेरा अकाउंट या पोस्ट प्राइवेट हो तो?",
    "प्राइवेट टारगेट आमतौर पर पूरे नहीं होते। प्रोफ़ाइल, पोस्ट या चैनल पब्लिक करें, कुछ मिनट प्रतीक्षा करें, फिर ज़रूरत हो तो कूलडाउन के बाद फिर सबमिट करें।"
  ],
  [
    "फ्री से पेड पर कब अपग्रेड करें?",
    "जब फ्री पैक साफ़ पूरा हो जाए और आप वही मेट्रिक ज़्यादा मात्रा में चाहें। Orders से सर्विस ID नोट रखें, PayPal या क्रिप्टो से टॉप-अप करें, फिर Services या API से दोबारा ऑर्डर करें।"
  ],
  [
    "क्या रीसेलर API से फ्री पैक ऑटोमेट कर सकते हैं?",
    "फ्री पैक फेयर-यूज़ कूलडाउन वाले ह्यूमन ट्रायल के लिए हैं। रीसेलर को ग्राहक ऑर्डर के लिए पेड PerfectPanel-संगत /api/v2 इन्वेंटरी उपयोग करनी चाहिए — साइनअप के बाद API डॉक्स देखें।"
  ]
],
    takeaway: "{title} आपको पब्लिक {label} लिंक पर {qty} मुफ़्त {unit} देता है ताकि डिपॉज़िट से पहले डिलीवरी जाँच सकें। {cooldown} घंटे का कूलडाउन रखें, कभी पासवर्ड साझा न करें, और ट्रायल सही लगे तभी पेड सेवाओं पर जाएँ।",
    content: {
  "intro1": "<strong>${fk}</strong> की तलाश है जिसे सच में क्लेम और ट्रैक कर सकें? SSMM Panel पर <strong>${title}</strong> पैक पब्लिक ${label} टारगेट पर <strong>${qty} ${unit}</strong> देता है ताकि बड़ा बैलेंस फंड करने से पहले स्टार्ट टाइम, remains और अंतिम स्टेटस देख सकें। यह पेज उसी ट्रायल की ऑपरेटर गाइड है — “हमेशा मुफ़्त फॉलोअर्स” वाला रीसाइकल्ड पैराग्राफ़ नहीं।",
  "intro3": "अंधे डिपॉज़िट कम करने के लिए फ्री इन्वेंटरी है। नियम पढ़ें, पब्लिक URL पेस्ट करें, हर कूलडाउन पर एक बार क्लेम करें, फिर तय करें कि वही मेट्रिक <a href=\"/services\">Services</a> की पेड लाइन के लायक है या नहीं। व्यापक फ्री-बनाम-पेड निर्णय के लिए <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">${relatedBlog}</a> गाइड देखें।",
  "hWhat": "${title} में क्या शामिल है",
  "pWhat1": "पैक का नाम शाब्दिक है: आप ssmmpanel.com के free-services डेस्क पर ${qty} ${unit} माँग रहे हैं। मात्रा जानबूझकर सीमित है। छोटे पैक दिखाते हैं कि लिंक फ़ॉर्मेट स्वीकार होता है या नहीं और स्टेटस चैट में अनुमान लगाए बिना pending से processing पर जाता है या नहीं।",
  "pWhat2": "इसी पैक के सफल क्लेम के बीच कूलडाउन <strong>${cooldown} ${hours}</strong> है। यह अन्य टेस्टरों के लिए इन्वेंटरी बचाता है और थ्रोअवे अकाउंट से फ़ार्मिंग रोकता है। रोज़ाना वॉल्यूम चाहिए तो वह <a href=\"/payments\">फंड जोड़ने</a> के बाद का पेड वर्कफ़्लो है।",
  "hWho": "${fk} किसे क्लेम करना चाहिए",
  "pWho1": "जिन क्रिएटर्स ने SSMM Panel पर कभी ऑर्डर नहीं किया उन्हें यहीं शुरू करना चाहिए। फ्री पैक डैशबोर्ड की भाषा सिखाता है — New order बनाम Free Services, स्टेटस लेबल और remains कहाँ दिखते हैं — बिना पहले PayPal स्क्रीनशॉट के।",
  "pWho2": "दुकान मालिक प्रोडक्ट ड्रॉप से पहले लिंक रिजेक्ट होगा या नहीं जानने के लिए एक पब्लिक पोस्ट या प्रोफ़ाइल पर ${unit} सैंपल उपयोग कर सकते हैं। रीसेलर को फ्री पैक ग्राहक SKU नहीं बल्कि निजी QA मानना चाहिए; ग्राहक ट्रैफ़िक <a href=\"/api-docs\">API डॉक्स</a> में दर्ज पेड API लाइनों पर है।",
  "pWho3": "अगर आप पैनलों में बिल्कुल नए हैं, पहले <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">SMM पैनल क्या है</a> पढ़ें, फिर ${title} क्लेम करने लौटें।",
  "hHow": "यह फ्री पैक स्टेप बाई स्टेप कैसे क्लेम करें",
  "steps": [
    "बाद में पेमेंट नोट्स पर भी लिखे जाने वाले यूज़रनेम से <a href=\"/signup\">मुफ़्त खाता बनाएँ</a>।",
    "पुष्टि करें कि डैशबोर्ड में लॉगिन और Free Services खोल सकते हैं।",
    "<strong>${title}</strong> चुनें और ${label} के लिए दिखाए लिंक फ़ॉर्मेट टिप्स कॉपी करें।",
    "<strong>पब्लिक</strong> ${label} URL पेस्ट करें। प्राइवेट टारगेट अक्सर चुपचाप फ़ेल या कैंसल होते हैं।",
    "सबमिट करें और रन खत्म या आंशिक पूरा होने तक Orders (या फ्री-क्लेम स्टेटस व्यू) देखें।",
    "इस पैक को दोबारा क्लेम करने से पहले पूरे ${cooldown} घंटे प्रतीक्षा करें। उस समय का उपयोग पेड टॉप-अप तय करने में करें।"
  ],
  "pHow": "इस ट्रायल के लिए भुगतान आवश्यक नहीं। स्केल के लिए तैयार हों तो <a href=\"/payments/paypal\">PayPal</a>, क्रिप्टो या Payments पर सूचीबद्ध अन्य विधि उपयोग करें, फिर लाइव कैटलॉग से बड़ी ${unit} लाइन दोबारा ऑर्डर करें।",
  "hLink": "${label} के लिए लिंक नियम और सुरक्षा",
  "pLink1": "पब्लिक का मतलब है कि आप के रूप में लॉगिन न किया विज़िटर URL खोल सकता है। लॉक अकाउंट, प्रतिबंधित पोस्ट या जियो-ब्लॉक मीडिया मुफ़्त ${unit} के कभी न शुरू होने के आम कारण हैं। पहले विज़िबिलिटी ठीक करें; प्राइवेट टारगेट पर कूलडाउन न जलाएँ।",
  "pLink2": "किसी भी पैनल — SSMM Panel सहित — के साथ पासवर्ड, रिकवरी कोड या सेशन कुकी साझा न करें। इंडस्ट्री एब्यूज़ अभी भी संदिग्ध फ़ॉर्म धकेलता है; हमारे फ्री और पेड डेस्क लिंक-आधारित हैं। सोशल मार्केटिंग टैक्टिक्स की तटस्थ पृष्ठभूमि के लिए Wikipedia का <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a> सार देखें, फिर ऑपरेशनल नियम सख्त रखें।",
  "pLink3": "बाद में बड़े नंबर प्लान करें तो भी इस मुफ़्त मात्रा से शुरू करें। खाली प्रोफ़ाइल पर पहले विशाल स्पाइक अस्वाभाविक लगते हैं और कौन-सा सर्विस ID रखना है नहीं सिखाते।",
  "hDiff": "मुफ़्त डिलीवरी पेड ${unit} से कैसे अलग है",
  "pDiff1": "फ्री पैक पेड ऑर्डर जैसा ही सामान्य स्टेटस शब्दावली साझा करते हैं — pending, processing, partial, completed — पर इन्वेंटरी प्राथमिकता और गति अलग हो सकती है। उचित विंडो में शुरू होने वाली फ्री लाइन वॉलेट फंड करने की हरी झंडी है। विवरण से आगे अटकने वाली लाइन डिपॉज़िट से पहले आपके यूज़रनेम से टिकट खोलने का संकेत है।",
  "pDiff2": "पेड ${label} ${unit} ऊँची max मात्रा, कुछ पंक्तियों पर वैकल्पिक drip-feed और सर्विस टेक्स्ट कहे तो refill विंडो खोलते हैं। फ्री पैक जानबूझकर कैंपेन फ़ीचर हटाते हैं ताकि ट्रायल सरल रहे।",
  "pDiff3": "सफल फ्री क्लेम के बाद दिखने वाले सर्विस नोट ट्रैक करें। पेड पर जाते समय वैसी ही व्यवहार वाली पंक्ति दोबारा ऑर्डर करें। हमारी <a href=\"/blog/how-to-place-your-first-smm-panel-order\">पहला ऑर्डर गाइड</a> साइनअप, बैलेंस और चेकआउट समझाती है।",
  "hCool": "कूलडाउन, फेयर यूज़ और अकाउंट एब्यूज़",
  "pCool1": "इस पैक के लिए ${cooldown}-घंटे की विंडो प्रति अकाउंट लागू होती है। ${fk} फ़ार्म करने के लिए थ्रोअवे ईमेल के ढेर बनाना फेयर यूज़ तोड़ता है और फ्री एक्सेस फ्रीज़ कर सकता है। बाद के डिपॉज़िट पर payment disputes-प्रवण भुगतान व्यवहार पेड एक्सेस भी फ्रीज़ कर सकता है — <a href=\"/terms\">Terms of Service</a> पढ़ें।",
  "pCool2": "पहले/बाद स्क्रीनशॉट से दर्ज एक साफ़ क्लेम पाँच जल्दबाज़ी वाले क्लेम से ज़्यादा क़ीमती है। जो ऑपरेटर फ्री पैक को माप उपकरण मानते हैं वे पेड लाइनों पर तेज़ी से पहुँचते हैं और कम बैलेंस बर्बाद करते हैं।",
  "hAfter": "ट्रायल के बाद: SSMM Panel पर अपग्रेड पथ",
  "pAfter1": "जब ${qty} ${unit} स्वीकार्य लगें, Services खोलें, ${label} फ़िल्टर करें और उसी मेट्रिक की पेड पंक्ति चुनें। चेकआउट से पहले प्रति 1,000 रेट, min/max और drip-feed नोट पुष्टि करें। छोटे पहले डिपॉज़िट स्वागत योग्य हैं — प्रूफ़ + यूज़रनेम मैच के लिए Payments लैंडिंग देखें।",
  "pAfter2": "जिन्हें केवल कभी-कभी बंप चाहिए वे डैशबोर्ड पर रह सकते हैं। अपने ग्राहकों को SMM बेचने वाले स्टोर को API कुंजी बनाकर services/add/status/balance कॉल करना चाहिए। फ्री पैक जानबूझकर उस ऑटोमेशन पथ से बाहर रहते हैं।",
  "pAfter3": "अभी भी अनिश्चित? नीचे सिबलिंग फ्री पैक देखें, या अपने यूज़रनेम के साथ <a href=\"/contact\">Contact</a> / WhatsApp पर पूछें। प्राइवेसी विवरण <a href=\"/privacy\">Privacy Policy</a> में; कंपनी संदर्भ <a href=\"/about\">About Us</a> पर।",
  "hRel": "संबंधित फ्री पैक और अगली रीडिंग",
  "hCheck": "क्लेम क्लिक से पहले त्वरित चेकलिस्ट",
  "checks": [
    "ssmmpanel.com पर अकाउंट बना",
    "टारगेट ${label} पर पब्लिक है",
    "आप समझते हैं मात्रा ${qty} ${unit} है",
    "इस पैक को दोहराने से पहले ${cooldown} घंटे प्रतीक्षा कर सकते हैं",
    "आप किसी को पासवर्ड नहीं भेजेंगे",
    "आप जानते हैं सबमिट के बाद Orders/स्टेटस कहाँ दिखेंगे"
  ],
  "outro": "जब वह सूची सही हो तो <strong>${title}</strong> क्लेम करें। मुफ़्त परिणाम को प्रमाण मानें, फिर रुकें, कोई और फ्री मेट्रिक आज़माएँ, या आँखें खुली रखकर डिपॉज़िट करें और स्केल करें।"
},
  },
};

function relatedLinks(pack: FreePack, locale: Locale): string {
  const b = BUNDLES[resolveLocale(locale)];
  const siblings = FREE_PACKS.filter((p) => p.platform === pack.platform && p.slug !== pack.slug).slice(0, 3);
  const other = FREE_PACKS.filter((p) => p.platform !== pack.platform).slice(0, 2);
  const links = [...siblings, ...other]
    .map((p) => {
      const loc = localizeFreePack(p, locale);
      return `<li><a href="/free-services/${p.slug}">${loc.title}</a> — ${loc.quantity} ${loc.unit}</li>`;
    })
    .join("");
  return `<ul>${links}<li><a href="/blog/free-smm-services-vs-paid-when-to-upgrade">${b.relatedBlog}</a></li><li><a href="/services">${b.relatedServices}</a></li><li><a href="/payments">${b.relatedPayments}</a></li></ul>`;
}

export function getPlatformLabel(platform: FreePlatform, locale: Locale = "en"): string {
  return BUNDLES[resolveLocale(locale)].platforms[platform];
}

export function getPlatformBlurb(platform: FreePlatform, locale: Locale = "en"): string {
  return BUNDLES[resolveLocale(locale)].blurbs[platform];
}

export function localizeFreePack(pack: FreePack, locale: Locale = "en"): FreePack {
  const b = BUNDLES[resolveLocale(locale)];
  const v = packVars(pack, b);
  return {
    ...pack,
    title: v.title,
    unit: v.unit,
    description: fill(b.desc, v),
    focusKeyword: v.fk,
    metaTitle: fill(b.metaTitle, v),
    metaDescription: fill(b.metaDesc, v),
    imageAlt: fill(b.imageAlt, v),
    keywords: b.keywords.map((k) => fill(k, v)),
  };
}

export function buildFreePackFaqs(pack: FreePack, locale: Locale = "en"): FreeFaq[] {
  const loc = resolveLocale(locale);
  const localized = localizeFreePack(pack, loc);
  const b = BUNDLES[loc];
  const label = b.platforms[pack.platform];
  const vars = {
    fk: localized.focusKeyword,
    title: localized.title,
    label,
    cooldown: pack.cooldownHours,
    unit: localized.unit,
    qty: pack.quantity,
  };
  return b.faq.map(([q, a]) => ({ q: fill(q, vars), a: fill(a, vars) }));
}

export function buildFreePackTakeaway(pack: FreePack, locale: Locale = "en"): string {
  const loc = resolveLocale(locale);
  const localized = localizeFreePack(pack, loc);
  const b = BUNDLES[loc];
  return fill(b.takeaway, {
    title: localized.title,
    qty: pack.quantity,
    unit: localized.unit,
    label: b.platforms[pack.platform],
    cooldown: pack.cooldownHours,
  });
}

export function buildFreePackContentHtml(pack: FreePack, locale: Locale = "en"): string {
  const loc = resolveLocale(locale);
  const b = BUNDLES[loc];
  const localized = localizeFreePack(pack, loc);
  const ctx: HtmlCtx = {
    title: localized.title,
    unit: localized.unit,
    qty: pack.quantity,
    cooldown: pack.cooldownHours,
    fk: localized.focusKeyword,
    label: b.platforms[pack.platform],
    blurb: b.blurbs[pack.platform],
    hours: b.table.hours,
    relatedBlog: b.relatedBlog,
    relatedServices: b.relatedServices,
    relatedPayments: b.relatedPayments,
  };
  return CONTENT_BUILDERS[loc](b, ctx, relatedLinks(pack, loc));
}

export function wordCountHtml(html: string): number {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}
