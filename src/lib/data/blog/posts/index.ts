import type { BlogPost } from "../types";
import { post as p1 } from "./what-is-an-smm-panel";
import { post as p2 } from "./how-to-place-your-first-smm-panel-order";
import { post as p3 } from "./instagram-smm-panel";
import { post as p4 } from "./paypal-smm-panel";
import { post as p5 } from "./free-smm-services-vs-paid";
import { post as p6 } from "./smm-panel-api-for-resellers-2026";

export const BLOG_POSTS: BlogPost[] = [p6, p1, p2, p3, p4, p5];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
