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
    "title": "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026)",
    "metaTitle": "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026) | SSMM",
    "metaDescription": "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026) — SSMM Panel beginner guide with public links only.",
    "focusKeyword": "ما هو لوحة smm",
    "keywords": [
      "ما هو لوحة smm",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026)",
    "takeaway": "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026) — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026) cover",
    "imageAlt2": "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026) mid image",
    "contentHtml": "<p>إذا بحثت عن <strong>ما هو لوحة SMM</strong>: لوحة ويب لطلب متابعين وإعجابات ومشاهدات برصيد ورابط عام فقط.</p>\n<p>في <a href=\"/signup\">SSMM Panel</a> جرّب <a href=\"/free-services\">الباقات المجانية</a> قبل الشحن. لا تشارك كلمة المرور أبدًا.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026) cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind ما هو لوحة smm and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026) mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "كيف تضع أول طلب في لوحة SMM",
    "metaTitle": "دليل أول طلب لوحة SMM 2026 | SSMM",
    "metaDescription": "خطوات: حساب، باقة مجانية، رصيد، خدمة ومتابعة الطلب في Orders على SSMM Panel.",
    "focusKeyword": "طلب لوحة smm",
    "keywords": [
      "طلب لوحة smm",
      "أول طلب smm",
      "شرح ssmm"
    ],
    "excerpt": "من التسجيل إلى أول طلب مكتمل — رابط عام فقط.",
    "takeaway": "أنشئ حساباً، جرّب باقة مجانية، أضف رصيداً، اختر خدمة ورابطاً، تابع في Orders.",
    "imageAlt": "كيف تضع أول طلب في لوحة SMM",
    "imageAlt2": "خطوات طلب لوحة SMM",
    "contentHtml": "<p>Ready for your <strong>first SMM panel order</strong>? On <a href=\"/signup\">SSMM Panel</a>: create an account, optionally try a free pack, add balance, pick a service, paste a public link, and track it in Orders.</p>\n<p>Public URL only — we never ask for social passwords.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"كيف تضع أول طلب في لوحة SMM\" />\n<h2>Step 1 — Create your account</h2>\n<p>Go to <a href=\"/signup\">Sign up</a>. After login you will see New Order, Services, Add Funds, and Orders.</p>\n<p>Vocabulary: <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">what is an SMM panel</a>.</p>\n<h2>Step 2 — Optional free pack</h2>\n<p>Open <a href=\"/free-services\">free services</a>, pick a small pack, paste a public link. Respect cooldown rules.</p>\n<h2>Step 3 — Add balance</h2>\n<p>Visit <a href=\"/payments\">payments</a>, follow instructions, include your username in the note. Start small. PayPal: <a href=\"/blog/paypal-smm-panel-how-to-add-funds\">PayPal guide</a>.</p>\n<h2>Step 4 — Choose a service</h2>\n<p>Browse <a href=\"/services\">services</a>, read rate/min/max, confirm in New Order. Instagram tips: <a href=\"/blog/instagram-smm-panel-followers-likes-reels\">Instagram guide</a>.</p>\n<table><thead><tr><th>Field</th><th>What</th><th>Tip</th></tr></thead><tbody><tr><td>Service</td><td>Platform + metric</td><td>Match your goal</td></tr><tr><td>Link</td><td>Public URL</td><td>Never a password</td></tr><tr><td>Quantity</td><td>Within min/max</td><td>Start small</td></tr></tbody></table>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"خطوات طلب لوحة SMM\" />\n<h2>Step 5 — Track in Orders</h2>\n<p>Watch pending, processing, completed. If stuck, message support with username and order ID. Also: <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">free vs paid</a>.</p>\n<h2>Checklist before confirm</h2>\n<p>Logged in · public link ready · min/max OK · balance covers charge · content published.</p>\n<p><a href=\"/signup\">Create your free account</a> and place a calm first order.</p>",
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
    "title": "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز",
    "metaTitle": "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات ال | SSMM",
    "metaDescription": "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز Followers, likes, Reels on public URLs.",
    "focusKeyword": "لوحة smm انستغرام",
    "keywords": [
      "لوحة smm انستغرام",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز",
    "takeaway": "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز cover",
    "imageAlt2": "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز mid image",
    "contentHtml": "<p><strong>لوحة SMM لإنستغرام</strong> تفصل صفوف المتابعين والإعجابات والريلز.</p>\n<img src=\"/blog/instagram-smm-cover.png\" alt=\"لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind لوحة smm انستغرام and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/instagram-smm-mid.png\" alt=\"لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "لوحة SMM عبر PayPal — شحن الرصيد بأمان",
    "metaTitle": "لوحة SMM عبر PayPal — شحن الرصيد بأمان | SSMM",
    "metaDescription": "لوحة SMM عبر PayPal — شحن الرصيد بأمان Username in note + payment proof.",
    "focusKeyword": "لوحة smm paypal",
    "keywords": [
      "لوحة smm paypal",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "لوحة SMM عبر PayPal — شحن الرصيد بأمان",
    "takeaway": "لوحة SMM عبر PayPal — شحن الرصيد بأمان — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "لوحة SMM عبر PayPal — شحن الرصيد بأمان cover",
    "imageAlt2": "لوحة SMM عبر PayPal — شحن الرصيد بأمان mid image",
    "contentHtml": "<p>لشحن <strong>لوحة SMM عبر PayPal</strong>: ادفع، اكتب اسم المستخدم، أرسل الإثبات.</p>\n<img src=\"/blog/paypal-smm-cover.png\" alt=\"لوحة SMM عبر PayPal — شحن الرصيد بأمان cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind لوحة smm paypal and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/paypal-smm-mid.png\" alt=\"لوحة SMM عبر PayPal — شحن الرصيد بأمان mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "خدمات SMM المجانية مقابل المدفوعة — متى الترقية",
    "metaTitle": "خدمات SMM المجانية مقابل المدفوعة — متى الترقية | SSMM",
    "metaDescription": "خدمات SMM المجانية مقابل المدفوعة — متى الترقية When to upgrade from free trials.",
    "focusKeyword": "خدمات smm مجانية",
    "keywords": [
      "خدمات smm مجانية",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "خدمات SMM المجانية مقابل المدفوعة — متى الترقية",
    "takeaway": "خدمات SMM المجانية مقابل المدفوعة — متى الترقية — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "خدمات SMM المجانية مقابل المدفوعة — متى الترقية cover",
    "imageAlt2": "خدمات SMM المجانية مقابل المدفوعة — متى الترقية mid image",
    "contentHtml": "<p><strong>خدمات SMM المجانية</strong> تقلّل الإيداع الأعمى — 20 باقة تجريبية.</p>\n<img src=\"/blog/free-vs-paid-cover.png\" alt=\"خدمات SMM المجانية مقابل المدفوعة — متى الترقية cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind خدمات smm مجانية and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/free-vs-paid-mid.png\" alt=\"خدمات SMM المجانية مقابل المدفوعة — متى الترقية mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
