export type FreePlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "telegram"
  | "facebook"
  | "twitter"
  | "spotify"
  | "twitch";

export type FreePack = {
  slug: string;
  platform: FreePlatform;
  title: string;
  quantity: number;
  unit: string;
  description: string;
  cooldownHours: number;
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  keywords: string[];
};

export const FREE_PACKS: FreePack[] = [
  {
    slug: "free-instagram-followers-20",
    platform: "instagram",
    title: "Free Instagram Followers",
    quantity: 20,
    unit: "followers",
    description:
      "Claim 20 free Instagram followers on a public profile to judge start time before a paid top-up. No password required.",
    cooldownHours: 24,
    focusKeyword: "free instagram followers",
    metaTitle: "Free Instagram Followers — 20 Trial Pack | SSMM",
    metaDescription:
      "Get free Instagram followers (20) on SSMM Panel. Public profile only, 24h cooldown, no password. Test delivery before you deposit.",
    image: "/free/free-instagram-followers-20.png",
    imageAlt: "Free Instagram Followers pack cover — 20 followers trial on SSMM Panel",
    keywords: ["free instagram followers", "instagram followers trial", "free smm pack"],
  },
  {
    slug: "free-instagram-likes-10",
    platform: "instagram",
    title: "Free Instagram Likes",
    quantity: 10,
    unit: "likes",
    description:
      "10 free likes for a public Instagram post — useful to preview engagement delivery before buying larger lines.",
    cooldownHours: 12,
    focusKeyword: "free instagram likes",
    metaTitle: "Free Instagram Likes — 10 Post Trial | SSMM Panel",
    metaDescription:
      "Claim free Instagram likes (10) for a public post. Fast cooldown, public URL only. Test SSMM Panel before paid orders.",
    image: "/free/free-instagram-likes-10.png",
    imageAlt: "Free Instagram Likes pack cover — 10 likes trial on SSMM Panel",
    keywords: ["free instagram likes", "instagram likes trial", "free smm services"],
  },
  {
    slug: "free-instagram-views-50",
    platform: "instagram",
    title: "Free Instagram Views",
    quantity: 50,
    unit: "views",
    description:
      "50 free Instagram video or Reels views on a public URL so you can watch how a views line behaves.",
    cooldownHours: 12,
    focusKeyword: "free instagram views",
    metaTitle: "Free Instagram Views — 50 Reels Trial | SSMM",
    metaDescription:
      "Free Instagram views pack (50) for public Reels or videos. No password. Measure start speed on SSMM Panel free services.",
    image: "/free/free-instagram-views-50.png",
    imageAlt: "Free Instagram Views pack cover — 50 views trial on SSMM Panel",
    keywords: ["free instagram views", "free reels views", "instagram views trial"],
  },
  {
    slug: "free-instagram-story-views-25",
    platform: "instagram",
    title: "Free Instagram Story Views",
    quantity: 25,
    unit: "story views",
    description:
      "25 free story views for an active public Instagram story — check format rules before scaling.",
    cooldownHours: 12,
    focusKeyword: "free instagram story views",
    metaTitle: "Free Instagram Story Views — 25 Trial | SSMM",
    metaDescription:
      "Claim free Instagram story views (25). Public story required. Test delivery on SSMM Panel with a short cooldown.",
    image: "/free/free-instagram-story-views-25.png",
    imageAlt: "Free Instagram Story Views pack cover — 25 story views trial",
    keywords: ["free instagram story views", "instagram story views free", "free smm"],
  },
  {
    slug: "free-instagram-comments-5",
    platform: "instagram",
    title: "Free Instagram Comments",
    quantity: 5,
    unit: "comments",
    description:
      "5 free comments on a public Instagram post to sample how comment lines look before paid custom runs.",
    cooldownHours: 24,
    focusKeyword: "free instagram comments",
    metaTitle: "Free Instagram Comments — 5 Trial Pack | SSMM",
    metaDescription:
      "Free Instagram comments (5) for public posts. Preview comment delivery on SSMM Panel — no password, fair cooldown.",
    image: "/free/free-instagram-comments-5.png",
    imageAlt: "Free Instagram Comments pack cover — 5 comments trial on SSMM Panel",
    keywords: ["free instagram comments", "instagram comments trial", "free smm panel"],
  },
  {
    slug: "free-tiktok-followers-15",
    platform: "tiktok",
    title: "Free TikTok Followers",
    quantity: 15,
    unit: "followers",
    description:
      "15 free TikTok followers for a public profile — a controlled trial before larger follower lines.",
    cooldownHours: 24,
    focusKeyword: "free tiktok followers",
    metaTitle: "Free TikTok Followers — 15 Trial Pack | SSMM",
    metaDescription:
      "Get free TikTok followers (15) on SSMM Panel. Public profile link only. Test speed before PayPal or crypto top-ups.",
    image: "/free/free-tiktok-followers-15.png",
    imageAlt: "Free TikTok Followers pack cover — 15 followers trial on SSMM Panel",
    keywords: ["free tiktok followers", "tiktok followers trial", "free smm services"],
  },
  {
    slug: "free-tiktok-likes-20",
    platform: "tiktok",
    title: "Free TikTok Likes",
    quantity: 20,
    unit: "likes",
    description:
      "20 free TikTok likes on a public video URL to preview engagement pacing.",
    cooldownHours: 12,
    focusKeyword: "free tiktok likes",
    metaTitle: "Free TikTok Likes — 20 Video Trial | SSMM Panel",
    metaDescription:
      "Claim free TikTok likes (20) for a public video. Short cooldown, no password. Try SSMM Panel free services today.",
    image: "/free/free-tiktok-likes-20.png",
    imageAlt: "Free TikTok Likes pack cover — 20 likes trial on SSMM Panel",
    keywords: ["free tiktok likes", "tiktok likes free", "free smm pack"],
  },
  {
    slug: "free-tiktok-views-50",
    platform: "tiktok",
    title: "Free TikTok Views",
    quantity: 50,
    unit: "views",
    description:
      "50 free TikTok views so new creators can watch how a views line starts on a public clip.",
    cooldownHours: 12,
    focusKeyword: "free tiktok views",
    metaTitle: "Free TikTok Views — 50 Clip Trial | SSMM Panel",
    metaDescription:
      "Free TikTok views (50) for public videos. Measure start time on SSMM Panel before ordering paid view lines.",
    image: "/free/free-tiktok-views-50.png",
    imageAlt: "Free TikTok Views pack cover — 50 views trial on SSMM Panel",
    keywords: ["free tiktok views", "tiktok views trial", "free smm"],
  },
  {
    slug: "free-youtube-likes-5",
    platform: "youtube",
    title: "Free YouTube Likes",
    quantity: 5,
    unit: "likes",
    description:
      "5 free YouTube likes on a public watch URL — tiny sample before paid engagement lines.",
    cooldownHours: 24,
    focusKeyword: "free youtube likes",
    metaTitle: "Free YouTube Likes — 5 Video Trial | SSMM Panel",
    metaDescription:
      "Claim free YouTube likes (5) for a public video. No password. Test SSMM Panel delivery before larger orders.",
    image: "/free/free-youtube-likes-5.png",
    imageAlt: "Free YouTube Likes pack cover — 5 likes trial on SSMM Panel",
    keywords: ["free youtube likes", "youtube likes trial", "free smm services"],
  },
  {
    slug: "free-youtube-views-50",
    platform: "youtube",
    title: "Free YouTube Views",
    quantity: 50,
    unit: "views",
    description:
      "50 free YouTube views for a public video to observe how a views service reports remains.",
    cooldownHours: 24,
    focusKeyword: "free youtube views",
    metaTitle: "Free YouTube Views — 50 Trial Pack | SSMM Panel",
    metaDescription:
      "Get free YouTube views (50) on a public watch link. Fair cooldown, public URL only — SSMM Panel free trial.",
    image: "/free/free-youtube-views-50.png",
    imageAlt: "Free YouTube Views pack cover — 50 views trial on SSMM Panel",
    keywords: ["free youtube views", "youtube views trial", "free smm panel"],
  },
  {
    slug: "free-youtube-subscribers-3",
    platform: "youtube",
    title: "Free YouTube Subscribers",
    quantity: 3,
    unit: "subscribers",
    description:
      "3 free YouTube subscribers for a public channel — small enough to test rules before paid subscriber lines.",
    cooldownHours: 48,
    focusKeyword: "free youtube subscribers",
    metaTitle: "Free YouTube Subscribers — 3 Trial | SSMM Panel",
    metaDescription:
      "Free YouTube subscribers (3) for public channels. Longer cooldown, no password. Preview SSMM Panel before deposits.",
    image: "/free/free-youtube-subscribers-3.png",
    imageAlt: "Free YouTube Subscribers pack cover — 3 subscribers trial",
    keywords: ["free youtube subscribers", "youtube subscribers trial", "free smm"],
  },
  {
    slug: "free-telegram-members-10",
    platform: "telegram",
    title: "Free Telegram Members",
    quantity: 10,
    unit: "members",
    description:
      "10 free members for a public Telegram channel or group — verify link format before paid member lines.",
    cooldownHours: 48,
    focusKeyword: "free telegram members",
    metaTitle: "Free Telegram Members — 10 Trial Pack | SSMM",
    metaDescription:
      "Claim free Telegram members (10) for public channels. No password. Test SSMM Panel before scaling member orders.",
    image: "/free/free-telegram-members-10.png",
    imageAlt: "Free Telegram Members pack cover — 10 members trial on SSMM Panel",
    keywords: ["free telegram members", "telegram members trial", "free smm services"],
  },
  {
    slug: "free-telegram-post-views-30",
    platform: "telegram",
    title: "Free Telegram Post Views",
    quantity: 30,
    unit: "post views",
    description:
      "30 free post views on a public Telegram post URL to sample view-line behavior.",
    cooldownHours: 24,
    focusKeyword: "free telegram post views",
    metaTitle: "Free Telegram Post Views — 30 Trial | SSMM",
    metaDescription:
      "Free Telegram post views (30) for public posts. Measure delivery on SSMM Panel free services before paid runs.",
    image: "/free/free-telegram-post-views-30.png",
    imageAlt: "Free Telegram Post Views pack cover — 30 views trial",
    keywords: ["free telegram post views", "telegram views free", "free smm pack"],
  },
  {
    slug: "free-facebook-page-likes-10",
    platform: "facebook",
    title: "Free Facebook Page Likes",
    quantity: 10,
    unit: "page likes",
    description:
      "10 free Facebook page likes for a public page — small trial before paid page lines.",
    cooldownHours: 24,
    focusKeyword: "free facebook page likes",
    metaTitle: "Free Facebook Page Likes — 10 Trial | SSMM",
    metaDescription:
      "Claim free Facebook page likes (10). Public page only, no password. Test SSMM Panel before larger Facebook orders.",
    image: "/free/free-facebook-page-likes-10.png",
    imageAlt: "Free Facebook Page Likes pack cover — 10 page likes trial",
    keywords: ["free facebook page likes", "facebook likes trial", "free smm"],
  },
  {
    slug: "free-facebook-post-likes-15",
    platform: "facebook",
    title: "Free Facebook Post Likes",
    quantity: 15,
    unit: "post likes",
    description:
      "15 free likes on a public Facebook post to preview engagement delivery.",
    cooldownHours: 12,
    focusKeyword: "free facebook post likes",
    metaTitle: "Free Facebook Post Likes — 15 Trial | SSMM Panel",
    metaDescription:
      "Free Facebook post likes (15) for public posts. Short cooldown. Try SSMM Panel free services before depositing.",
    image: "/free/free-facebook-post-likes-15.png",
    imageAlt: "Free Facebook Post Likes pack cover — 15 post likes trial",
    keywords: ["free facebook post likes", "facebook post likes free", "free smm services"],
  },
  {
    slug: "free-twitter-followers-10",
    platform: "twitter",
    title: "Free Twitter Followers",
    quantity: 10,
    unit: "followers",
    description:
      "10 free X/Twitter followers for a public profile — controlled sample before paid follower lines.",
    cooldownHours: 24,
    focusKeyword: "free twitter followers",
    metaTitle: "Free Twitter Followers — 10 X Trial | SSMM Panel",
    metaDescription:
      "Get free Twitter (X) followers (10) on a public profile. No password. Test SSMM Panel delivery before paid packs.",
    image: "/free/free-twitter-followers-10.png",
    imageAlt: "Free Twitter Followers pack cover — 10 followers trial on SSMM Panel",
    keywords: ["free twitter followers", "free x followers", "twitter followers trial"],
  },
  {
    slug: "free-twitter-likes-15",
    platform: "twitter",
    title: "Free Twitter Likes",
    quantity: 15,
    unit: "likes",
    description:
      "15 free likes on a public tweet/post URL to watch how an engagement line starts.",
    cooldownHours: 12,
    focusKeyword: "free twitter likes",
    metaTitle: "Free Twitter Likes — 15 Post Trial | SSMM Panel",
    metaDescription:
      "Claim free Twitter likes (15) for a public post. Fair cooldown, public URL only — SSMM Panel free trial.",
    image: "/free/free-twitter-likes-15.png",
    imageAlt: "Free Twitter Likes pack cover — 15 likes trial on SSMM Panel",
    keywords: ["free twitter likes", "free x likes", "twitter likes trial"],
  },
  {
    slug: "free-spotify-plays-25",
    platform: "spotify",
    title: "Free Spotify Plays",
    quantity: 25,
    unit: "plays",
    description:
      "25 free Spotify plays for a public track link — sample play delivery before paid music lines.",
    cooldownHours: 24,
    focusKeyword: "free spotify plays",
    metaTitle: "Free Spotify Plays — 25 Track Trial | SSMM Panel",
    metaDescription:
      "Free Spotify plays (25) for public tracks. No password. Preview SSMM Panel music services before you top up.",
    image: "/free/free-spotify-plays-25.png",
    imageAlt: "Free Spotify Plays pack cover — 25 plays trial on SSMM Panel",
    keywords: ["free spotify plays", "spotify plays trial", "free smm services"],
  },
  {
    slug: "free-spotify-followers-10",
    platform: "spotify",
    title: "Free Spotify Followers",
    quantity: 10,
    unit: "followers",
    description:
      "10 free Spotify artist or playlist followers on a public link for a first quality check.",
    cooldownHours: 48,
    focusKeyword: "free spotify followers",
    metaTitle: "Free Spotify Followers — 10 Trial Pack | SSMM",
    metaDescription:
      "Claim free Spotify followers (10). Public artist/playlist link only. Test SSMM Panel before paid follower lines.",
    image: "/free/free-spotify-followers-10.png",
    imageAlt: "Free Spotify Followers pack cover — 10 followers trial",
    keywords: ["free spotify followers", "spotify followers trial", "free smm pack"],
  },
  {
    slug: "free-twitch-followers-10",
    platform: "twitch",
    title: "Free Twitch Followers",
    quantity: 10,
    unit: "followers",
    description:
      "10 free Twitch followers for a public channel — small trial before paid Twitch lines.",
    cooldownHours: 24,
    focusKeyword: "free twitch followers",
    metaTitle: "Free Twitch Followers — 10 Channel Trial | SSMM",
    metaDescription:
      "Get free Twitch followers (10) for a public channel. No password. Try SSMM Panel free services before depositing.",
    image: "/free/free-twitch-followers-10.png",
    imageAlt: "Free Twitch Followers pack cover — 10 followers trial on SSMM Panel",
    keywords: ["free twitch followers", "twitch followers trial", "free smm services"],
  },
];

export function getFreePack(slug: string): FreePack | undefined {
  return FREE_PACKS.find((p) => p.slug === slug);
}

export function packsByPlatform(platform: FreePlatform): FreePack[] {
  return FREE_PACKS.filter((p) => p.platform === platform);
}
