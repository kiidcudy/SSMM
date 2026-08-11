import { SITE } from "@/lib/site";

export const PRIVACY_SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      `This Privacy Policy explains how ${SITE.name} (“we”, “us”) collects, uses, and protects information when you visit ${SITE.domain}, create an account, place orders, top up balance, open tickets, or contact support on WhatsApp/Telegram.`,
      "We designed this policy for operators who expect clarity — not legal fog. We do not ask for social media passwords. Orders use public URLs only.",
    ],
  },
  {
    id: "data-we-collect",
    title: "Information we collect",
    body: [
      "Account data: username, email address, hashed password, API key (if generated), preferred language, and account status.",
      "Order data: service ID, public link or username you submit, quantity, charge amount, status history, remains, and timestamps.",
      "Payment data you send voluntarily: method chosen, amount, transaction references, screenshots or proof links, and the username note you include. Card numbers are not stored on our servers when you pay through third-party processors.",
      "Support data: ticket messages, WhatsApp/Telegram correspondence, and attachments you choose to share.",
      "Technical logs: IP address, browser/user-agent, approximate region, and security events needed to stop abuse (failed logins, rate limits).",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use information",
    body: [
      "Provide and improve the panel: authenticate sessions, show balance, process orders, sync status from upstream providers, and credit verified deposits.",
      "Communicate: send transactional notices about deposits, order issues, or security alerts. Marketing emails are optional and can be declined.",
      "Prevent abuse: detect free-trial farming, chargeback patterns, duplicate spam orders, and API misuse.",
      "Comply with law: respond to valid legal requests when required.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing with processors and providers",
    body: [
      "Upstream SMM suppliers receive only what is needed to fulfill an order (public link, quantity, service parameters). They should not receive your panel password.",
      "Payment networks (PayPal, crypto processors, banks, Skrill, etc.) process funds under their own policies. We receive confirmation and proof you share for manual matching.",
      "Hosting, email, and analytics vendors may process technical data under contract. We do not sell personal data to brokers.",
    ],
  },
  {
    id: "retention",
    title: "Retention and security",
    body: [
      "Account and order records are kept while your account is active and for a reasonable period afterward for disputes, accounting, and fraud prevention.",
      "You can request account closure by emailing support. Some records may remain where law or chargeback defense requires it.",
      "We use hashed passwords, HTTPS, access controls on admin tools, and least-privilege practices. No method is perfect — report suspected breaches to support immediately.",
    ],
  },
  {
    id: "rights",
    title: "Your choices and rights",
    body: [
      "Access/update: edit profile details in the dashboard where available, or email us to correct account data.",
      "Export/delete: request a summary of account data or deletion subject to legal holds and open balances/disputes.",
      "Cookies: essential cookies keep you logged in. If we add optional analytics cookies later, we will disclose them here.",
      "Region-specific rights (GDPR/CCPA-style): contact us to exercise access, correction, deletion, or objection where applicable. We respond within a reasonable timeframe.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "The panel is intended for adults who can form a contract. If you believe a minor created an account, contact us so we can review and remove it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      `We may update this page as products or laws change. The “Last updated” date at the top of the Privacy page reflects the latest revision. Material changes may also be noted in the dashboard or by email.`,
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      `Privacy questions: ${SITE.email}. WhatsApp: ${SITE.whatsappDisplay}. Telegram: @${SITE.telegram}.`,
    ],
  },
];

export const TERMS_SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      `By creating an account or using ${SITE.name} at ${SITE.domain}, you agree to these Terms of Service. If you disagree, do not use the service.`,
      "You must be legally able to enter a contract in your jurisdiction. You are responsible for compliance with platform rules of Instagram, TikTok, YouTube, Telegram, and any network you target.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts and API keys",
    body: [
      "Keep credentials and API keys private. You are responsible for actions taken under your account.",
      "We may suspend or terminate accounts for abuse: free-trial farming, chargebacks, spam ordering, credential stuffing, or attempts to reverse-engineer provider credentials.",
      "One person/business should not create endless throwaway accounts to bypass fair-use limits on free packs.",
    ],
  },
  {
    id: "orders",
    title: "Orders and services",
    body: [
      "Service descriptions (rate, min/max, start time, refill, drip-feed) are indicative and can change when suppliers update inventory.",
      "Never place duplicate orders for the same link and service while another is still processing unless the description allows it.",
      "Never submit passwords. Only public URLs or usernames accepted by the service row.",
      "Partial, canceled, or failed orders may return unused balance according to the service’s rules and supplier report. Refill windows, when offered, apply only as written on that service.",
      "We are a panel operator routing orders to suppliers. We do not guarantee organic ranking, algorithm favors, or permanent metrics on third-party platforms.",
    ],
  },
  {
    id: "payments",
    title: "Payments and balance",
    body: [
      "Deposits are credited after verification of payment proof matched to your username. False proofs are grounds for suspension.",
      "Balance is non-transferable between users unless we explicitly approve a migration.",
      "Chargebacks or payment disputes opened without contacting support first may lead to permanent bans and forfeiture of remaining balance.",
      "Prices are shown in USD unless stated otherwise. Taxes, if any, are your responsibility in your region.",
    ],
  },
  {
    id: "api",
    title: "Reseller API",
    body: [
      "The public API is PerfectPanel-compatible for services, add, status, and balance. Rate limits and fair-use rules apply.",
      "You may not use the API to attack infrastructure, scrape proprietary supplier lists for resale as a clone of our catalog without authorization, or overload status polling.",
      "You remain responsible for how you present services to your own customers, including your refund policy toward them.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited use",
    body: [
      "Illegal content, impersonation of protected brands where prohibited, malware distribution, harassment campaigns, or anything that violates applicable law.",
      "Attempting to access other users’ accounts, admin tools, or provider credentials.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer and liability",
    body: [
      "Services are provided “as available.” Platforms may change algorithms or remove metrics without notice.",
      "To the fullest extent permitted by law, our liability is limited to the unused balance on your account related to the disputed order. We are not liable for lost profits, reputation damage, or indirect losses.",
    ],
  },
  {
    id: "changes-law",
    title: "Changes and governing matters",
    body: [
      "We may update these terms; continued use after the update date means acceptance. For material changes we may post a notice in the dashboard.",
      `Contact for legal notices: ${SITE.email}. Support channels: WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}.`,
    ],
  },
];

export const ABOUT_SECTIONS = [
  {
    id: "who",
    title: "Who we are",
    body: [
      `${SITE.name} is an operator-built social media marketing desk at ${SITE.domain}. Creators, shops, and resellers keep a USD balance, choose service lines for Instagram, TikTok, YouTube, Telegram and more, and place orders with public links only.`,
      "Unlike lookalike script themes that ship the same homepage paragraphs to every niche domain, we maintain this site, SEO pages, free trial packs, payment landings, and a PerfectPanel-compatible API under one brand.",
    ],
  },
  {
    id: "what-we-do",
    title: "What we do differently",
    body: [
      "Transparent rate-per-1k and min/max before you confirm a charge.",
      "Free packs so you can judge start time before a large top-up.",
      "Manual deposit matching with username + proof for PayPal, crypto, Skrill, cards, and other listed methods — with clear payment landing pages.",
      "Order statuses written back to the dashboard (and API) so you are not guessing from chat screenshots.",
      "Reseller API (/api/v2) for stores that want to sell under their own branding.",
    ],
  },
  {
    id: "who-for",
    title: "Who SSMM Panel is for",
    body: [
      "Creators who need a controlled bump on a post or profile without hiring a full agency retainer.",
      "Small shops testing engagement around product drops.",
      "Resellers connecting inventory through the API while keeping margin and customer support on their side.",
    ],
  },
  {
    id: "safety",
    title: "Safety principles",
    body: [
      "No password collection for Instagram, TikTok, YouTube, or Telegram.",
      "Start small; prefer drip-feed when a service offers it and your account is new.",
      "Read service notes for refill and partial rules before scaling a line.",
      "Contact support early if a line stalls beyond the description — WhatsApp and tickets are staffed for operators, not bots-only loops.",
    ],
  },
  {
    id: "contact",
    title: "Talk to the team",
    body: [
      `Email ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, or Telegram @${SITE.telegram}. For deposits see the Payments section; for product questions see FAQ and the Blog guides.`,
    ],
  },
];

export const FAQ_PAGE_ITEMS = [
  {
    q: "How is SSMM Panel different from a random cheap SMM script?",
    a: "SSMM Panel runs on ssmmpanel.com with its own order desk, free trial packs, payment landing pages and a PerfectPanel-compatible /api/v2 endpoint. You are not dropping into an untouched demo theme with recycled homepage text.",
  },
  {
    q: "Do I need to share my Instagram or TikTok password?",
    a: "No. Orders use a public profile, post or video URL only. If a service ever asks for a password, skip it and open a ticket — that is not how this panel is meant to work.",
  },
  {
    q: "Can I try a service before a large PayPal or crypto top-up?",
    a: "Yes. Free packs exist so you can watch start time and delivery pattern on a tiny quantity. When a line behaves the way you expect, fund the wallet and re-order the same service ID.",
  },
  {
    q: "How do balance top-ups get credited?",
    a: "Choose PayPal, card, crypto, Skrill, Revolut, Payoneer, Paysafecard, bank transfer, Binance Pay or Cryptomus, send the payment with your username in the note, then share proof on WhatsApp or a ticket. Support matches the receipt and updates the balance.",
  },
  {
    q: "What does drip-feed do on this panel?",
    a: "When a service supports drip-feed, you split quantity across days (for example equal daily likes) instead of dumping everything in one burst. Use it when you want slower, staged delivery on the same link.",
  },
  {
    q: "Can resellers sell SSMM inventory from their own store?",
    a: "Yes. Generate an API key in the dashboard and call services, add, status and balance like other PerfectPanel-style panels. Your buyers stay on your domain; margin and branding stay yours.",
  },
  {
    q: "What happens if an order only partially completes?",
    a: "Status and remains update from the supplier feed. Unused quantity may return to balance according to that service’s partial/cancel rules — check the service description before you scale.",
  },
  {
    q: "Which platforms can I order for?",
    a: "The catalog typically includes Instagram, TikTok, YouTube, Telegram and additional networks as inventory allows. Open Services after login to see live categories and rates.",
  },
  {
    q: "Is there a minimum deposit?",
    a: "Small first deposits are welcome. Exact minimums can vary by payment method — see each Payments landing page and Add funds in the dashboard for current guidance.",
  },
  {
    q: "How do I contact support?",
    a: `Email ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}, or open a ticket from the dashboard. Include your username and order ID when asking about a specific run.`,
  },
  {
    q: "Where can I read longer guides?",
    a: "Visit the Blog for beginner explanations, Instagram ordering notes, PayPal deposit steps, and free-vs-paid upgrade advice. Those articles include tables, FAQs and internal links to Services and Payments.",
  },
  {
    q: "Where are the legal documents?",
    a: "Privacy Policy and Terms of Service are linked in the footer. About Us explains how the panel is operated. Read them before large deposits or API integration.",
  },
];
