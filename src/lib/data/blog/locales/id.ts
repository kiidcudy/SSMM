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
    "title": "Apa itu panel SMM? Panduan pemula yang nyata (2026)",
    "metaTitle": "Apa itu panel SMM? Panduan pemula yang nyata (20 | SSMM",
    "metaDescription": "Apa itu panel SMM? Panduan pemula yang nyata (2026) — SSMM Panel beginner guide with public links only.",
    "focusKeyword": "apa itu panel smm",
    "keywords": [
      "apa itu panel smm",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Apa itu panel SMM? Panduan pemula yang nyata (2026)",
    "takeaway": "Apa itu panel SMM? Panduan pemula yang nyata (2026) — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Apa itu panel SMM? Panduan pemula yang nyata (2026) cover",
    "imageAlt2": "Apa itu panel SMM? Panduan pemula yang nyata (2026) mid image",
    "contentHtml": "<p>Mencari <strong>apa itu panel SMM</strong>? Itu dasbor untuk memesan followers/likes/views dengan saldo dan URL publik saja.</p>\n<p>Di <a href=\"/signup\">SSMM Panel</a>, coba <a href=\"/free-services\">paket gratis</a> dulu. Jangan pernah kirim password.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"Apa itu panel SMM? Panduan pemula yang nyata (2026) cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind apa itu panel smm and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"Apa itu panel SMM? Panduan pemula yang nyata (2026) mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "Cara membuat pesanan pertama di panel SMM",
    "metaTitle": "Panduan pesanan pertama panel SMM 2026 | SSMM",
    "metaDescription": "Langkah demi langkah: akun, paket gratis, saldo, layanan, dan lacak di Orders di SSMM Panel.",
    "focusKeyword": "pesanan panel smm",
    "keywords": [
      "pesanan panel smm",
      "pesanan pertama smm",
      "tutorial ssmm"
    ],
    "excerpt": "Dari daftar hingga pesanan pertama selesai — hanya tautan publik.",
    "takeaway": "Buat akun, coba paket gratis, isi saldo, pilih layanan dan tautan, lacak di Orders.",
    "imageAlt": "Cara membuat pesanan pertama di panel SMM",
    "imageAlt2": "Langkah pesanan panel SMM",
    "contentHtml": "<p>Ready for your <strong>first SMM panel order</strong>? On <a href=\"/signup\">SSMM Panel</a>: create an account, optionally try a free pack, add balance, pick a service, paste a public link, and track it in Orders.</p>\n<p>Public URL only — we never ask for social passwords.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"Cara membuat pesanan pertama di panel SMM\" />\n<h2>Step 1 — Create your account</h2>\n<p>Go to <a href=\"/signup\">Sign up</a>. After login you will see New Order, Services, Add Funds, and Orders.</p>\n<p>Vocabulary: <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">what is an SMM panel</a>.</p>\n<h2>Step 2 — Optional free pack</h2>\n<p>Open <a href=\"/free-services\">free services</a>, pick a small pack, paste a public link. Respect cooldown rules.</p>\n<h2>Step 3 — Add balance</h2>\n<p>Visit <a href=\"/payments\">payments</a>, follow instructions, include your username in the note. Start small. PayPal: <a href=\"/blog/paypal-smm-panel-how-to-add-funds\">PayPal guide</a>.</p>\n<h2>Step 4 — Choose a service</h2>\n<p>Browse <a href=\"/services\">services</a>, read rate/min/max, confirm in New Order. Instagram tips: <a href=\"/blog/instagram-smm-panel-followers-likes-reels\">Instagram guide</a>.</p>\n<table><thead><tr><th>Field</th><th>What</th><th>Tip</th></tr></thead><tbody><tr><td>Service</td><td>Platform + metric</td><td>Match your goal</td></tr><tr><td>Link</td><td>Public URL</td><td>Never a password</td></tr><tr><td>Quantity</td><td>Within min/max</td><td>Start small</td></tr></tbody></table>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"Langkah pesanan panel SMM\" />\n<h2>Step 5 — Track in Orders</h2>\n<p>Watch pending, processing, completed. If stuck, message support with username and order ID. Also: <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">free vs paid</a>.</p>\n<h2>Checklist before confirm</h2>\n<p>Logged in · public link ready · min/max OK · balance covers charge · content published.</p>\n<p><a href=\"/signup\">Create your free account</a> and place a calm first order.</p>",
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
    "title": "Panel SMM Instagram: followers, likes, dan views Reels",
    "metaTitle": "Panel SMM Instagram: followers, likes, dan views | SSMM",
    "metaDescription": "Panel SMM Instagram: followers, likes, dan views Reels Followers, likes, Reels on public URLs.",
    "focusKeyword": "panel smm instagram",
    "keywords": [
      "panel smm instagram",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Panel SMM Instagram: followers, likes, dan views Reels",
    "takeaway": "Panel SMM Instagram: followers, likes, dan views Reels — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Panel SMM Instagram: followers, likes, dan views Reels cover",
    "imageAlt2": "Panel SMM Instagram: followers, likes, dan views Reels mid image",
    "contentHtml": "<p><strong>Panel SMM Instagram</strong> memisahkan baris followers, likes, dan Reels.</p>\n<img src=\"/blog/instagram-smm-cover.png\" alt=\"Panel SMM Instagram: followers, likes, dan views Reels cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind panel smm instagram and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/instagram-smm-mid.png\" alt=\"Panel SMM Instagram: followers, likes, dan views Reels mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "Panel SMM PayPal — cara isi saldo dengan aman",
    "metaTitle": "Panel SMM PayPal — cara isi saldo dengan aman | SSMM",
    "metaDescription": "Panel SMM PayPal — cara isi saldo dengan aman Username in note + payment proof.",
    "focusKeyword": "panel smm paypal",
    "keywords": [
      "panel smm paypal",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Panel SMM PayPal — cara isi saldo dengan aman",
    "takeaway": "Panel SMM PayPal — cara isi saldo dengan aman — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Panel SMM PayPal — cara isi saldo dengan aman cover",
    "imageAlt2": "Panel SMM PayPal — cara isi saldo dengan aman mid image",
    "contentHtml": "<p>Isi saldo <strong>panel SMM PayPal</strong>: transfer, tulis username di catatan, kirim bukti.</p>\n<img src=\"/blog/paypal-smm-cover.png\" alt=\"Panel SMM PayPal — cara isi saldo dengan aman cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind panel smm paypal and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/paypal-smm-mid.png\" alt=\"Panel SMM PayPal — cara isi saldo dengan aman mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "Layanan SMM gratis vs berbayar — kapan upgrade",
    "metaTitle": "Layanan SMM gratis vs berbayar — kapan upgrade | SSMM",
    "metaDescription": "Layanan SMM gratis vs berbayar — kapan upgrade When to upgrade from free trials.",
    "focusKeyword": "layanan smm gratis",
    "keywords": [
      "layanan smm gratis",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Layanan SMM gratis vs berbayar — kapan upgrade",
    "takeaway": "Layanan SMM gratis vs berbayar — kapan upgrade — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Layanan SMM gratis vs berbayar — kapan upgrade cover",
    "imageAlt2": "Layanan SMM gratis vs berbayar — kapan upgrade mid image",
    "contentHtml": "<p><strong>Layanan SMM gratis</strong> untuk uji coba sebelum top-up besar — 20 paket di SSMM.</p>\n<img src=\"/blog/free-vs-paid-cover.png\" alt=\"Layanan SMM gratis vs berbayar — kapan upgrade cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind layanan smm gratis and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/free-vs-paid-mid.png\" alt=\"Layanan SMM gratis vs berbayar — kapan upgrade mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
  "tiktok-growth-smm-panel-guide-2026": assemblePost(base("tiktok-growth-smm-panel-guide-2026"), {
    "title": "Panduan Panel SMM TikTok 2026: Followers, Views & Realitas FYP",
    "metaTitle": "Panel SMM TikTok 2026: Followers & Views | SSMM",
    "metaDescription": "Gunakan panel SMM TikTok dengan benar: followers untuk bukti profil, views/likes untuk cold start, drip-feed, dan ekspektasi FYP jujur.",
    "focusKeyword": "panel smm tiktok",
    "keywords": ["panel smm tiktok","beli followers tiktok","views tiktok panel","ssmmpanel.com"],
    "excerpt": "Playbook 2026 — followers, views/likes, drip-feed, FYP tanpa ilusi.",
    "takeaway": "Panel TikTok terbaik saat tiap layanan punya peran jelas. Tempo pelan, tanpa password.",
    "imageAlt": "Sampul panduan pertumbuhan panel SMM TikTok 2026",
    "imageAlt2": "Diagram mix layanan TikTok mingguan",
    "contentHtml": "<p><strong>Panel SMM TikTok</strong> adalah dashboard operator untuk memesan followers, views, likes, dan engagement hanya dengan link publik. Di 2026 TikTok masih menghargai watch time, replay, dan save — tapi optik cold start penting. Panduan ini menjelaskan layanan mana yang dibeli, drip-feed, dan kebiasaan posting tanpa tipu diri soal For You Page.</p>\n<p>SSMM Panel punya TikTok di <a href=\"/services\">services</a> dan <a href=\"/free-services\">free services</a>. Baca <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">apa itu panel SMM</a> dan bandingkan <a href=\"/blog/instagram-smm-panel-followers-likes-reels\">panduan Instagram</a>.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"Sampul panduan pertumbuhan panel SMM TikTok 2026\" />\n<h2>Apa bisa dan tidak bisa panel TikTok</h2>\n<p>Panel menaikkan angka visible dan membuat video terlihat aktif di jam pertama. Tidak bisa menciptakan hook atau memperbaiki retensi buruk. FYP bukan otomatis — watch time dan replay yang menentukan. Aturan password: hanya URL publik.</p>\n<h2>Followers: bukti profil</h2>\n<p>Followers membuat profil terlihat hidup. Akun baru: drip pelan, jumlah modest. Publikasikan konten dulu. <a href=\"/blog/how-to-place-your-first-smm-panel-order\">Pesanan pertama</a>.</p>\n<h2>Views: hangatkan counter</h2>\n<p>Views membantu cold start. Bukan pengganti watch time. Perbaiki hook di frame pertama. Catat log video: waktu publish, ukuran order, retensi 24 jam.</p>\n<h2>Likes: timing</h2>\n<p>Likes untuk URL video spesifik. Pesan segera setelah publish. <a href=\"/services\">services</a>.</p>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"Diagram mix layanan TikTok mingguan\" />\n<h2>Drip-feed & partial</h2>\n<p>Drip-feed untuk akun muda. Partial mengembalikan saldo. <a href=\"/faq\">FAQ</a> lalu <a href=\"/contact\">contact</a>. <a href=\"/api-docs\">API docs</a>.</p>\n<h2>Mix mingguan</h2>\n<table><thead><tr><th>Tugas</th><th>Utama</th><th>Sekunder</th><th>Catatan</th></tr></thead><tbody><tr><td>Profil kosong</td><td>Followers drip</td><td>—</td><td>Konten dulu</td></tr><tr><td>Video cold start</td><td>Views</td><td>Likes</td><td>Perbaiki hook</td></tr><tr><td>Drop produk</td><td>Views+likes</td><td>Shares</td><td>Offer jelas</td></tr><tr><td>QA panel</td><td>Gratis</td><td>Bayar kecil</td><td><a href=\"/free-services\">free services</a></td></tr></tbody></table>\n<h2>Gratis vs berbayar</h2>\n<p>Gratis uji format link. <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">gratis vs berbayar</a>. <a href=\"/payments\">payments</a>. PayPal: <a href=\"/blog/paypal-smm-panel-how-to-add-funds\">panduan</a>.</p>\n<h2>Kebiasaan konten & anggaran</h2>\n<p>Bio jelas, satu CTA, balas komentar awal. Bagi anggaran test/scale.</p>\n<h2>Sprint dua minggu</h2>\n<p>Minggu 1: profil, 4 video, <a href=\"/free-services\">trial gratis</a>. Minggu 2: views+likes, drip followers, <a href=\"/payments\">/payments</a>.</p>\n<p><a href=\"/signup\">Buat akun</a> · <a href=\"/services\">services</a> · <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">gratis vs berbayar</a> · <a href=\"/blog/how-to-place-your-first-smm-panel-order\">pesanan pertama</a> · <a href=\"/blog/instagram-smm-panel-followers-likes-reels\">Instagram</a> · <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">pemula</a>. Konten, ukur, lalu pesan.</p>",
    "faq": [
      {
        "q": "Apa itu panel SMM TikTok?",
        "a": "Dashboard pesan followers, views, likes dengan link publik."
      },
      {
        "q": "Followers atau views dulu?",
        "a": "Profil kosong: drip followers. Video kuat: views + likes."
      },
      {
        "q": "Minta password?",
        "a": "Tidak. Hanya URL publik."
      },
      {
        "q": "Views jamin FYP?",
        "a": "Tidak. Retensi dan replay yang menentukan."
      },
      {
        "q": "Kapan drip-feed?",
        "a": "Akun baru atau niche sensitif."
      },
      {
        "q": "Tes gratis?",
        "a": "Ya, di free services."
      },
      {
        "q": "Bedanya dengan Instagram?",
        "a": "TikTok lebih bergantung watch time per upload."
      }
    ]
  }),
};