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
    "title": "O que é um painel SMM? Guia real para iniciantes (2026)",
    "metaTitle": "O que é um painel SMM? Guia real para iniciantes | SSMM",
    "metaDescription": "O que é um painel SMM? Guia real para iniciantes (2026) — SSMM Panel beginner guide with public links only.",
    "focusKeyword": "o que é um painel smm",
    "keywords": [
      "o que é um painel smm",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "O que é um painel SMM? Guia real para iniciantes (2026)",
    "takeaway": "O que é um painel SMM? Guia real para iniciantes (2026) — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "O que é um painel SMM? Guia real para iniciantes (2026) cover",
    "imageAlt2": "O que é um painel SMM? Guia real para iniciantes (2026) mid image",
    "contentHtml": "<p>Se você busca <strong>o que é um painel SMM</strong>: é um painel web para pedir seguidores, likes e views com saldo, colando só URL pública.</p>\n<p>No <a href=\"/signup\">SSMM Panel</a>, teste <a href=\"/free-services\">pacotes grátis</a> antes de <a href=\"/payments\">depositar</a>. Nunca compartilhe senha.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"O que é um painel SMM? Guia real para iniciantes (2026) cover\" />\n<h2>Definição clara</h2>\n<p>O painel vende cumprimento, não consultoria de agência. Veja preço por 1K, min/max e notas.</p>\n<p>Contexto: <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a>.</p>\n<h2>Quem usa</h2>\n<p>Criadores, lojas e revendedores via API.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Passos do pedido</h2>\n<p>Cadastro → saldo → serviço → link público → quantidade → Orders.</p>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"O que é um painel SMM? Guia real para iniciantes (2026) mid image\" />\n<h2>Segurança</h2>\n<p>Só perfis públicos. Evite picos enormes em contas novas.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
    "faq": [
      {
        "q": "Precisa de senha?",
        "a": "Não."
      },
      {
        "q": "Quanto depositar?",
        "a": "Primeiro grátis, depois pouco."
      },
      {
        "q": "Partial?",
        "a": "Entrega parcial conforme a linha."
      },
      {
        "q": "API?",
        "a": "Sim, /api/v2."
      },
      {
        "q": "Plataformas?",
        "a": "IG, TikTok, YouTube, Telegram…"
      },
      {
        "q": "Suporte?",
        "a": "WhatsApp, Telegram, ticket."
      }
    ]
  }),
  "how-to-place-your-first-smm-panel-order": assemblePost(base("how-to-place-your-first-smm-panel-order"), {
    "title": "Como fazer seu primeiro pedido em um painel SMM",
    "metaTitle": "Primeiro pedido no painel SMM 2026 | SSMM",
    "metaDescription": "Passo a passo: conta, pack grátis, saldo, serviço e acompanhamento em Orders no SSMM Panel.",
    "focusKeyword": "pedido painel smm",
    "keywords": [
      "pedido painel smm",
      "primeiro pedido smm",
      "tutorial ssmm"
    ],
    "excerpt": "Do cadastro ao primeiro pedido concluído — só link público.",
    "takeaway": "Crie conta, teste pack grátis, adicione saldo, escolha serviço e link, acompanhe em Orders.",
    "imageAlt": "Como fazer o primeiro pedido em um painel SMM",
    "imageAlt2": "Passos do pedido no painel SMM",
    "contentHtml": "<p>Ready for your <strong>first SMM panel order</strong>? On <a href=\"/signup\">SSMM Panel</a>: create an account, optionally try a free pack, add balance, pick a service, paste a public link, and track it in Orders.</p>\n<p>Public URL only — we never ask for social passwords.</p>\n<img src=\"/blog/smm-panel-beginners-cover.png\" alt=\"Como fazer o primeiro pedido em um painel SMM\" />\n<h2>Step 1 — Create your account</h2>\n<p>Go to <a href=\"/signup\">Sign up</a>. After login you will see New Order, Services, Add Funds, and Orders.</p>\n<p>Vocabulary: <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">what is an SMM panel</a>.</p>\n<h2>Step 2 — Optional free pack</h2>\n<p>Open <a href=\"/free-services\">free services</a>, pick a small pack, paste a public link. Respect cooldown rules.</p>\n<h2>Step 3 — Add balance</h2>\n<p>Visit <a href=\"/payments\">payments</a>, follow instructions, include your username in the note. Start small. PayPal: <a href=\"/blog/paypal-smm-panel-how-to-add-funds\">PayPal guide</a>.</p>\n<h2>Step 4 — Choose a service</h2>\n<p>Browse <a href=\"/services\">services</a>, read rate/min/max, confirm in New Order. Instagram tips: <a href=\"/blog/instagram-smm-panel-followers-likes-reels\">Instagram guide</a>.</p>\n<table><thead><tr><th>Field</th><th>What</th><th>Tip</th></tr></thead><tbody><tr><td>Service</td><td>Platform + metric</td><td>Match your goal</td></tr><tr><td>Link</td><td>Public URL</td><td>Never a password</td></tr><tr><td>Quantity</td><td>Within min/max</td><td>Start small</td></tr></tbody></table>\n<img src=\"/blog/smm-panel-beginners-mid.png\" alt=\"Passos do pedido no painel SMM\" />\n<h2>Step 5 — Track in Orders</h2>\n<p>Watch pending, processing, completed. If stuck, message support with username and order ID. Also: <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">free vs paid</a>.</p>\n<h2>Checklist before confirm</h2>\n<p>Logged in · public link ready · min/max OK · balance covers charge · content published.</p>\n<p><a href=\"/signup\">Create your free account</a> and place a calm first order.</p>",
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
    "title": "Painel SMM Instagram: seguidores, likes e views de Reels",
    "metaTitle": "Painel SMM Instagram: seguidores, likes e views  | SSMM",
    "metaDescription": "Painel SMM Instagram: seguidores, likes e views de Reels Followers, likes, Reels on public URLs.",
    "focusKeyword": "painel smm instagram",
    "keywords": [
      "painel smm instagram",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Painel SMM Instagram: seguidores, likes e views de Reels",
    "takeaway": "Painel SMM Instagram: seguidores, likes e views de Reels — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Painel SMM Instagram: seguidores, likes e views de Reels cover",
    "imageAlt2": "Painel SMM Instagram: seguidores, likes e views de Reels mid image",
    "contentHtml": "<p>Um <strong>painel SMM Instagram</strong> separa seguidores, likes e Reels. Só links públicos no SSMM.</p>\n<img src=\"/blog/instagram-smm-cover.png\" alt=\"Painel SMM Instagram: seguidores, likes e views de Reels cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind painel smm instagram and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/instagram-smm-mid.png\" alt=\"Painel SMM Instagram: seguidores, likes e views de Reels mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "Painel SMM PayPal — como adicionar fundos com segurança",
    "metaTitle": "Painel SMM PayPal — como adicionar fundos com se | SSMM",
    "metaDescription": "Painel SMM PayPal — como adicionar fundos com segurança Username in note + payment proof.",
    "focusKeyword": "painel smm paypal",
    "keywords": [
      "painel smm paypal",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Painel SMM PayPal — como adicionar fundos com segurança",
    "takeaway": "Painel SMM PayPal — como adicionar fundos com segurança — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Painel SMM PayPal — como adicionar fundos com segurança cover",
    "imageAlt2": "Painel SMM PayPal — como adicionar fundos com segurança mid image",
    "contentHtml": "<p>Para <strong>painel SMM PayPal</strong>: pague, coloque o usuário na nota, envie o comprovante.</p>\n<img src=\"/blog/paypal-smm-cover.png\" alt=\"Painel SMM PayPal — como adicionar fundos com segurança cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind painel smm paypal and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/paypal-smm-mid.png\" alt=\"Painel SMM PayPal — como adicionar fundos com segurança mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
    "title": "Serviços SMM grátis vs pagos — quando fazer upgrade",
    "metaTitle": "Serviços SMM grátis vs pagos — quando fazer upgr | SSMM",
    "metaDescription": "Serviços SMM grátis vs pagos — quando fazer upgrade When to upgrade from free trials.",
    "focusKeyword": "serviços smm grátis",
    "keywords": [
      "serviços smm grátis",
      "ssmm panel",
      "smm panel"
    ],
    "excerpt": "Serviços SMM grátis vs pagos — quando fazer upgrade",
    "takeaway": "Serviços SMM grátis vs pagos — quando fazer upgrade — start with a free pack on SSMM Panel, public URL only, then scale paid lines.",
    "imageAlt": "Serviços SMM grátis vs pagos — quando fazer upgrade cover",
    "imageAlt2": "Serviços SMM grátis vs pagos — quando fazer upgrade mid image",
    "contentHtml": "<p><strong>Serviços SMM grátis</strong> reduzem depósito cego. Há 20 packs de teste no SSMM.</p>\n<img src=\"/blog/free-vs-paid-cover.png\" alt=\"Serviços SMM grátis vs pagos — quando fazer upgrade cover\" />\n<h2>Overview</h2>\n<p>Learn the core idea behind serviços smm grátis and how SSMM Panel fits a real workflow.</p>\n<p>Orders use public URLs only.</p>\n<h2>How it works</h2>\n<p>Sign up, optional free pack, deposit with username + proof, order from the dashboard.</p>\n<p>Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>.</p>\n<table><thead><tr><th>Item</th><th>Action</th><th>Note</th></tr></thead><tbody><tr><td>Account</td><td>Sign up</td><td>Free</td></tr><tr><td>Test</td><td>Free pack</td><td>Public link</td></tr><tr><td>Scale</td><td>Paid order</td><td>Same metric</td></tr></tbody></table>\n<h2>Practical tips</h2>\n<p>Start small. Prefer drip-feed on new accounts when available.</p>\n<p>Read service min/max and refill notes before scaling.</p>\n<img src=\"/blog/free-vs-paid-mid.png\" alt=\"Serviços SMM grátis vs pagos — quando fazer upgrade mid image\" />\n<h2>Next steps</h2>\n<p>Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.</p>\n<p>See also our other blog guides and <a href=\"/faq\">FAQ</a>.</p>\n<p>Start now: <a href=\"/signup\">create an account</a> on SSMM Panel.</p>",
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
