import type { BlogPost } from "../types";
import { post as p1 } from "./best-smm-panel-2026";
import { post as p2 } from "./buy-followers-with-smm-panel-2026";
import { post as p3 } from "./tiktok-smm-panel-guide-2026";
import { post as p4 } from "./youtube-smm-panel-subscribers-views-2026";
import { post as p5 } from "./how-to-buy-likes-safely-smm-panel-2026";
import { post as p6 } from "./what-is-an-smm-panel";
import { post as p7 } from "./how-to-place-your-first-smm-panel-order";
import { post as p8 } from "./instagram-smm-panel";
import { post as p9 } from "./paypal-smm-panel";
import { post as p10 } from "./free-smm-services-vs-paid";

export const BLOG_POSTS: BlogPost[] = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
