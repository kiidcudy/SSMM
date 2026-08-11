/** Seed catalog shown before upstream sync. Mapped to provider services later. */
export type PanelService = {
  id: number;
  category: string;
  name: string;
  rate: number;
  min: number;
  max: number;
  type: "default" | "custom_comments";
  description: string;
  providerServiceId?: number;
};

export const SEED_CATEGORIES = [
  "Instagram Followers",
  "Instagram Likes",
  "Instagram Views",
  "TikTok Followers",
  "TikTok Likes",
  "TikTok Views",
  "YouTube Subscribers",
  "YouTube Views",
  "Telegram Members",
] as const;

export const SEED_SERVICES: PanelService[] = [
  {
    id: 1001,
    category: "Instagram Followers",
    name: "Instagram Followers | Max 5K | Fast",
    rate: 0.89,
    min: 50,
    max: 5000,
    type: "default",
    description: "Fast Instagram followers. Public profile required. No password.",
  },
  {
    id: 1002,
    category: "Instagram Followers",
    name: "Instagram Followers | Max 20K | Refill 30D",
    rate: 1.45,
    min: 100,
    max: 20000,
    type: "default",
    description: "Higher quality followers with 30-day refill window when available.",
  },
  {
    id: 1101,
    category: "Instagram Likes",
    name: "Instagram Likes | Instant",
    rate: 0.12,
    min: 20,
    max: 10000,
    type: "default",
    description: "Instant likes for public Instagram posts and Reels.",
  },
  {
    id: 1201,
    category: "Instagram Views",
    name: "Instagram Reels Views",
    rate: 0.08,
    min: 100,
    max: 500000,
    type: "default",
    description: "Reels / video views. Paste the public media URL.",
  },
  {
    id: 2001,
    category: "TikTok Followers",
    name: "TikTok Followers | Max 10K",
    rate: 1.1,
    min: 50,
    max: 10000,
    type: "default",
    description: "TikTok profile followers. Account must be public.",
  },
  {
    id: 2101,
    category: "TikTok Likes",
    name: "TikTok Likes | Fast",
    rate: 0.15,
    min: 50,
    max: 50000,
    type: "default",
    description: "Likes for TikTok videos.",
  },
  {
    id: 2201,
    category: "TikTok Views",
    name: "TikTok Views | Cheap",
    rate: 0.03,
    min: 500,
    max: 1000000,
    type: "default",
    description: "High-speed TikTok views for new uploads.",
  },
  {
    id: 3001,
    category: "YouTube Subscribers",
    name: "YouTube Subscribers | Slow",
    rate: 3.5,
    min: 50,
    max: 5000,
    type: "default",
    description: "Gradual YouTube subscribers. Channel must be public.",
  },
  {
    id: 3101,
    category: "YouTube Views",
    name: "YouTube Views | HQ",
    rate: 0.95,
    min: 500,
    max: 100000,
    type: "default",
    description: "High retention style views for public videos.",
  },
  {
    id: 4001,
    category: "Telegram Members",
    name: "Telegram Channel Members",
    rate: 0.7,
    min: 50,
    max: 20000,
    type: "default",
    description: "Members for public Telegram channels/groups.",
  },
];

export function servicesByCategory(): Record<string, PanelService[]> {
  const map: Record<string, PanelService[]> = {};
  for (const s of SEED_SERVICES) {
    (map[s.category] ??= []).push(s);
  }
  return map;
}

export function getService(id: number): PanelService | undefined {
  return SEED_SERVICES.find((s) => s.id === id);
}

export function chargeFor(service: PanelService, quantity: number): number {
  return Math.round((service.rate * quantity) / 1000 * 10000) / 10000;
}
