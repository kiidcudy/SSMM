import type { BlogPost } from "@/lib/data/blog/types";
import { BLOG_POSTS } from "@/lib/data/blog/posts";
import { assemblePost } from "@/lib/data/blog/locales/build";

function base(slug: string): BlogPost {
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) throw new Error("missing " + slug);
  return p;
}

export const posts: Record<string, BlogPost> = {
  "what-is-an-smm-panel-beginners-guide-2026": assemblePost(base("what-is-an-smm-panel-beginners-guide-2026"), {
    "title": "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026)",
    "metaTitle": "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026) | SSMM",
    "metaDescription": "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026) — SSMM Panel beginner guide with public links only.",
    "focusKeyword": "smm প্যানেল কী",
    "keywords": [
      "smm প্যানেল কী",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026)",
    "takeaway": "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026) — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026) cover",
    "imageAlt2": "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026) mid image",
    "contentHtml": "<p><strong>SMM প্যানেল কী</strong>? ব্যালেন্স দিয়ে পাবলিক URL-এ ফলোয়ার/লাইক/ভিউ অর্ডারের ড্যাশবোর্ড।</p>\n<p><a href=\"/signup\">SSMM Panel</a>-এ আগে <a href=\"/free-services\">ফ্রি প্যাক</a> নিন। পাসওয়ার্ড কখনো দেবেন না।</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026) cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind smm প্যানেল কী and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026) mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
    "faq": [
      {
        "q": "Password needed?",
        "a": "No. Public URL only."
      },
      {
        "q": "Free trial?",
        "a": "Yes — Free Services packs."
      },
      {
        "q": "Payments?",
        "a": "PayPal, crypto, card and more with proof."
      },
      {
        "q": "API?",
        "a": "PerfectPanel-compatible /api/v2."
      },
      {
        "q": "Support?",
        "a": "WhatsApp, Telegram, ticket, email."
      },
      {
        "q": "Private accounts?",
        "a": "Usually cannot be fulfilled — make public first."
      }
    ]
  }),
  "how-to-place-your-first-smm-panel-order": assemblePost(base("how-to-place-your-first-smm-panel-order"), {
    "title": "SMM প্যানেলে প্রথম অর্ডার কীভাবে দেবেন",
    "metaTitle": "SMM প্যানেল প্রথম অর্ডার গাইড ২০২৬ | SSMM",
    "metaDescription": "ধাপে ধাপে: অ্যাকাউন্ট, ফ্রি প্যাক, ব্যালেন্স, সার্ভিস এবং Orders-এ ট্র্যাক — SSMM Panel.",
    "focusKeyword": "smm প্যানেল অর্ডার",
    "keywords": [
      "smm প্যানেল অর্ডার",
      "প্রথম smm অর্ডার",
      "ssmm টিউটোরিয়াল"
    ],
    "excerpt": "সাইনআপ থেকে প্রথম সম্পূর্ণ অর্ডার — শুধু পাবলিক লিংক।",
    "takeaway": "অ্যাকাউন্ট খুলুন, ফ্রি প্যাক চেষ্টা করুন, ব্যালেন্স যোগ করুন, সার্ভিস ও লিংক বেছে Orders দেখুন।",
    "imageAlt": "SMM প্যানেলে প্রথম অর্ডার কভার",
    "imageAlt2": "SMM প্যানেল অর্ডার ধাপ",
    "contentHtml": "<p>Ready for your <strong>first SMM panel order</strong>? On <a href=\"/signup\">SSMM Panel</a>: create an account, optionally try a free pack, add balance, pick a service, paste a public link, and track it in Orders.</p>\n<p>Public URL only — we never ask for social passwords.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"SMM প্যানেলে প্রথম অর্ডার কভার\" />\n<h2>Step 1 — Create your account</h2>\n<p>Go to <a href=\"/signup\">Sign up</a>. After login you will see New Order, Services, Add Funds, and Orders.</p>\n<p>Vocabulary: <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">what is an SMM panel</a>.</p>\n<h2>Step 2 — Optional free pack</h2>\n<p>Open <a href=\"/free-services\">free services</a>, pick a small pack, paste a public link. Respect cooldown rules.</p>\n<h2>Step 3 — Add balance</h2>\n<p>Visit <a href=\"/payments\">payments</a>, follow instructions, include your username in the note. Start small. PayPal: <a href=\"/blog/paypal-smm-panel-how-to-add-funds\">PayPal guide</a>.</p>\n<h2>Step 4 — Choose a service</h2>\n<p>Browse <a href=\"/services\">services</a>, read rate/min/max, confirm in New Order. Instagram tips: <a href=\"/blog/instagram-smm-panel-followers-likes-reels\">Instagram guide</a>.</p>\n<table><thead><tr><th>Field</th><th>What</th><th>Tip</th></tr></thead><tbody><tr><td>Service</td><td>Platform + metric</td><td>Match your goal</td></tr><tr><td>Link</td><td>Public URL</td><td>Never a password</td></tr><tr><td>Quantity</td><td>Within min/max</td><td>Start small</td></tr></tbody></table>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"SMM প্যানেল অর্ডার ধাপ\" />\n<h2>Step 5 — Track in Orders</h2>\n<p>Watch pending, processing, completed. If stuck, message support with username and order ID. Also: <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">free vs paid</a>.</p>\n<h2>Checklist before confirm</h2>\n<p>Logged in · public link ready · min/max OK · balance covers charge · content published.</p>\n<p><a href=\"/signup\">Create your free account</a> and place a calm first order.</p>",
    "faq": [
      {
        "q": "Do I need a social password?",
        "a": "No. Public URL or username only."
      },
      {
        "q": "Order without deposit?",
        "a": "Yes for free packs. Paid rows need balance."
      },
      {
        "q": "Where do I track progress?",
        "a": "Orders in the dashboard."
      },
      {
        "q": "Balance too low?",
        "a": "Top up on payments, then return to New Order."
      },
      {
        "q": "First quantity?",
        "a": "Stay near the service minimum."
      },
      {
        "q": "How to contact support?",
        "a": "WhatsApp, Telegram, or ticket with username and order ID."
      }
    ]
  }),
  "instagram-smm-panel-followers-likes-reels": assemblePost(base("instagram-smm-panel-followers-likes-reels"), {
    "title": "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ",
    "metaTitle": "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ | SSMM",
    "metaDescription": "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ Followers, likes, Reels on public URLs.",
    "focusKeyword": "instagram smm প্যানেল",
    "keywords": [
      "instagram smm প্যানেল",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ",
    "takeaway": "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ cover",
    "imageAlt2": "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ mid image",
    "contentHtml": "<p><strong>Instagram SMM প্যানেল</strong>-এ আলাদা সারিতে ফলোয়ার, লাইক, Reels।</p>\n<img src=\"/blog/instagram-smm-cover.png\" alt=\"Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind instagram smm প্যানেল and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/instagram-smm-mid.png\" alt=\"Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
    "faq": [
      {
        "q": "Password needed?",
        "a": "No. Public URL only."
      },
      {
        "q": "Free trial?",
        "a": "Yes — Free Services packs."
      },
      {
        "q": "Payments?",
        "a": "PayPal, crypto, card and more with proof."
      },
      {
        "q": "API?",
        "a": "PerfectPanel-compatible /api/v2."
      },
      {
        "q": "Support?",
        "a": "WhatsApp, Telegram, ticket, email."
      },
      {
        "q": "Private accounts?",
        "a": "Usually cannot be fulfilled — make public first."
      }
    ]
  }),
  "paypal-smm-panel-how-to-add-funds": assemblePost(base("paypal-smm-panel-how-to-add-funds"), {
    "title": "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন",
    "metaTitle": "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন | SSMM",
    "metaDescription": "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন Username in note + payment proof.",
    "focusKeyword": "paypal smm প্যানেল",
    "keywords": [
      "paypal smm প্যানেল",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন",
    "takeaway": "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন cover",
    "imageAlt2": "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন mid image",
    "contentHtml": "<p><strong>PayPal SMM প্যানেল</strong> ব্যালেন্স: পেমেন্ট + ইউজারনেম নোট + প্রুফ।</p>\n<img src=\"/blog/paypal-smm-cover.png\" alt=\"PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind paypal smm প্যানেল and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/paypal-smm-mid.png\" alt=\"PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
    "faq": [
      {
        "q": "Password needed?",
        "a": "No. Public URL only."
      },
      {
        "q": "Free trial?",
        "a": "Yes — Free Services packs."
      },
      {
        "q": "Payments?",
        "a": "PayPal, crypto, card and more with proof."
      },
      {
        "q": "API?",
        "a": "PerfectPanel-compatible /api/v2."
      },
      {
        "q": "Support?",
        "a": "WhatsApp, Telegram, ticket, email."
      },
      {
        "q": "Private accounts?",
        "a": "Usually cannot be fulfilled — make public first."
      }
    ]
  }),
  "free-smm-services-vs-paid-when-to-upgrade": assemblePost(base("free-smm-services-vs-paid-when-to-upgrade"), {
    "title": "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড",
    "metaTitle": "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড | SSMM",
    "metaDescription": "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড When to upgrade from free trials.",
    "focusKeyword": "ফ্রি smm সার্ভিস",
    "keywords": [
      "ফ্রি smm সার্ভিস",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড",
    "takeaway": "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড cover",
    "imageAlt2": "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড mid image",
    "contentHtml": "<p><strong>ফ্রি SMM সার্ভিস</strong> দিয়ে টেস্ট করুন — SSMM-এ ২০টি ট্রায়াল প্যাক।</p>\n<img src=\"/blog/free-vs-paid-cover.png\" alt=\"ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind ফ্রি smm সার্ভিস and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/free-vs-paid-mid.png\" alt=\"ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
    "faq": [
      {
        "q": "Password needed?",
        "a": "No. Public URL only."
      },
      {
        "q": "Free trial?",
        "a": "Yes — Free Services packs."
      },
      {
        "q": "Payments?",
        "a": "PayPal, crypto, card and more with proof."
      },
      {
        "q": "API?",
        "a": "PerfectPanel-compatible /api/v2."
      },
      {
        "q": "Support?",
        "a": "WhatsApp, Telegram, ticket, email."
      },
      {
        "q": "Private accounts?",
        "a": "Usually cannot be fulfilled — make public first."
      }
    ]
  }),
};
