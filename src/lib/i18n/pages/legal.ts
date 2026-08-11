import { SITE, type Locale } from "@/lib/site";
import type { LegalBundle, LegalSection } from "@/lib/i18n/pages/types";

const enPrivacy: LegalSection[] = [
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

const enTerms: LegalSection[] = [
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

const enAbout: LegalSection[] = [
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

const trPrivacy: LegalSection[] = [
  {
    id: "overview",
    title: "Genel bakış",
    body: [
      `Bu Gizlilik Politikası, ${SITE.name} (“biz”) olarak ${SITE.domain} adresini ziyaret ettiğinizde, hesap oluşturduğunuzda, sipariş verdiğinizde, bakiye yüklediğinizde, ticket açtığınızda veya WhatsApp/Telegram üzerinden destekle iletişime geçtiğinizde bilgileri nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.`,
      "Bu politikayı hukuki sis değil, netlik bekleyen operatörler için yazdık. Sosyal medya şifresi istemeyiz. Siparişler yalnızca herkese açık URL kullanır.",
    ],
  },
  {
    id: "data-we-collect",
    title: "Topladığımız bilgiler",
    body: [
      "Hesap verileri: kullanıcı adı, e-posta, hash’lenmiş şifre, API anahtarı (oluşturulduysa), tercih edilen dil ve hesap durumu.",
      "Sipariş verileri: servis ID, gönderdiğiniz herkese açık link veya kullanıcı adı, adet, ücret tutarı, durum geçmişi, kalan miktar ve zaman damgaları.",
      "Gönüllü gönderdiğiniz ödeme verileri: seçilen yöntem, tutar, işlem referansları, ekran görüntüleri veya kanıt linkleri ve eklediğiniz kullanıcı adı notu. Üçüncü taraf işlemciler üzerinden ödeme yaptığınızda kart numaraları sunucularımızda saklanmaz.",
      "Destek verileri: ticket mesajları, WhatsApp/Telegram yazışmaları ve paylaşmayı seçtiğiniz ekler.",
      "Teknik günlükler: IP adresi, tarayıcı/user-agent, yaklaşık bölge ve kötüye kullanımı durdurmak için gereken güvenlik olayları (başarısız girişler, hız sınırları).",
    ],
  },
  {
    id: "how-we-use",
    title: "Bilgileri nasıl kullanırız",
    body: [
      "Paneli sağlamak ve iyileştirmek: oturum doğrulama, bakiye gösterme, sipariş işleme, üst sağlayıcılardan durum senkronu ve doğrulanmış yatırımları kredileme.",
      "İletişim: yatırımlar, sipariş sorunları veya güvenlik uyarıları hakkında işlemsel bildirimler. Pazarlama e-postaları isteğe bağlıdır ve reddedilebilir.",
      "Kötüye kullanımı önlemek: ücretsiz deneme tarımı, chargeback kalıpları, yinelenen spam siparişler ve API kötüye kullanımını tespit etmek.",
      "Yasaya uymak: gerektiğinde geçerli yasal taleplere yanıt vermek.",
    ],
  },
  {
    id: "sharing",
    title: "İşlemciler ve sağlayıcılarla paylaşım",
    body: [
      "Üst SMM tedarikçileri yalnızca siparişi yerine getirmek için gerekeni alır (herkese açık link, adet, servis parametreleri). Panel şifrenizi almamalıdırlar.",
      "Ödeme ağları (PayPal, kripto işlemciler, bankalar, Skrill vb.) fonları kendi politikalarına göre işler. Manuel eşleştirme için paylaştığınız onay ve kanıtı alırız.",
      "Hosting, e-posta ve analitik sağlayıcıları sözleşmeli olarak teknik verileri işleyebilir. Kişisel verileri aracılara satmayız.",
    ],
  },
  {
    id: "retention",
    title: "Saklama ve güvenlik",
    body: [
      "Hesap ve sipariş kayıtları hesabınız aktifken ve sonrasında makul bir süre uyuşmazlık, muhasebe ve dolandırıcılık önleme için tutulur.",
      "Destek e-postası ile hesap kapatma talep edebilirsiniz. Yasa veya chargeback savunması gerektirdiğinde bazı kayıtlar kalabilir.",
      "Hash’lenmiş şifreler, HTTPS, admin araçlarında erişim kontrolleri ve en az ayrıcalık uygulamalarını kullanırız. Hiçbir yöntem kusursuz değildir — şüpheli ihlalleri hemen desteğe bildirin.",
    ],
  },
  {
    id: "rights",
    title: "Seçenekleriniz ve haklarınız",
    body: [
      "Erişim/güncelleme: mümkünse dashboard’da profil bilgilerini düzenleyin veya hesap verilerini düzeltmek için e-posta gönderin.",
      "Dışa aktarma/silme: yasal tutma ve açık bakiye/uyuşmazlıklara bağlı olarak hesap verisi özeti veya silme talep edin.",
      "Çerezler: zorunlu çerezler oturumunuzu açık tutar. İleride isteğe bağlı analitik çerezleri eklersek burada açıklayacağız.",
      "Bölgeye özgü haklar (GDPR/CCPA tarzı): uygulanabilir olduğu yerde erişim, düzeltme, silme veya itiraz için bize ulaşın. Makul sürede yanıtlarız.",
    ],
  },
  {
    id: "children",
    title: "Çocuklar",
    body: [
      "Panel, sözleşme yapabilecek yetişkinler içindir. Bir çocuğun hesap oluşturduğunu düşünüyorsanız, inceleyip kaldırmamız için bize ulaşın.",
    ],
  },
  {
    id: "changes",
    title: "Bu politikadaki değişiklikler",
    body: [
      `Ürünler veya yasalar değiştikçe bu sayfayı güncelleyebiliriz. Gizlilik sayfasının üstündeki “Son güncelleme” tarihi son revizyonu yansıtır. Önemli değişiklikler dashboard’da veya e-posta ile de bildirilebilir.`,
    ],
  },
  {
    id: "contact",
    title: "İletişim",
    body: [
      `Gizlilik soruları: ${SITE.email}. WhatsApp: ${SITE.whatsappDisplay}. Telegram: @${SITE.telegram}.`,
    ],
  },
];

const trTerms: LegalSection[] = [
  {
    id: "acceptance",
    title: "Şartların kabulü",
    body: [
      `${SITE.domain} adresinde ${SITE.name} hesabı oluşturarak veya hizmeti kullanarak bu Hizmet Şartlarını kabul etmiş olursunuz. Kabul etmiyorsanız hizmeti kullanmayın.`,
      "Yargı alanınızda yasal olarak sözleşme yapabiliyor olmalısınız. Instagram, TikTok, YouTube, Telegram ve hedeflediğiniz ağların platform kurallarına uymak sizin sorumluluğunuzdadır.",
    ],
  },
  {
    id: "accounts",
    title: "Hesaplar ve API anahtarları",
    body: [
      "Kimlik bilgilerini ve API anahtarlarını gizli tutun. Hesabınız altında yapılan işlemlerden siz sorumlusunuz.",
      "Kötüye kullanım nedeniyle hesapları askıya alabilir veya sonlandırabiliriz: ücretsiz deneme tarımı, chargeback, spam sipariş, kimlik bilgisi doldurma veya sağlayıcı kimlik bilgilerini tersine mühendislik girişimleri.",
      "Bir kişi/işletme, ücretsiz paketlerdeki adil kullanım limitlerini aşmak için sonsuz atılabilir hesap oluşturmamalıdır.",
    ],
  },
  {
    id: "orders",
    title: "Siparişler ve servisler",
    body: [
      "Servis açıklamaları (fiyat, min/max, başlangıç süresi, refill, drip-feed) gösterge niteliğindedir ve tedarikçiler envanter güncellediğinde değişebilir.",
      "Açıklama izin vermedikçe, aynı link ve servis için başka sipariş hâlâ işlenirken yinelenen sipariş vermeyin.",
      "Asla şifre göndermeyin. Yalnızca servis satırının kabul ettiği herkese açık URL veya kullanıcı adları.",
      "Kısmi, iptal veya başarısız siparişler, servisin kurallarına ve tedarikçi raporuna göre kullanılmayan bakiyeyi iade edebilir. Refill pencereleri sunulduğunda yalnızca o serviste yazıldığı gibi uygulanır.",
      "Siparişleri tedarikçilere yönlendiren bir panel operatörüyüz. Üçüncü taraf platformlarda organik sıralama, algoritma avantajı veya kalıcı metrik garanti etmeyiz.",
    ],
  },
  {
    id: "payments",
    title: "Ödemeler ve bakiye",
    body: [
      "Yatırımlar, kullanıcı adınıza eşleşen ödeme kanıtı doğrulandıktan sonra kredilenir. Sahte kanıt askıya alma gerekçesidir.",
      "Bakiye, açıkça onayladığımız bir taşıma dışında kullanıcılar arasında devredilemez.",
      "Önce destekle iletişime geçmeden açılan chargeback veya ödeme uyuşmazlıkları kalıcı yasak ve kalan bakiyenin kaybına yol açabilir.",
      "Fiyatlar aksi belirtilmedikçe USD cinsindendir. Varsa vergiler bölgenizde sizin sorumluluğunuzdadır.",
    ],
  },
  {
    id: "api",
    title: "Reseller API",
    body: [
      "Herkese açık API; services, add, status ve balance için PerfectPanel uyumludur. Hız sınırları ve adil kullanım kuralları geçerlidir.",
      "API’yi altyapıya saldırmak, yetkisiz katalog klonu için tescilli tedarikçi listelerini kazımak veya durum yoklamasını aşırı yüklemek için kullanamazsınız.",
      "Kendi müşterilerinize servisleri nasıl sunduğunuzdan, onlara yönelik iade politikanız dahil, siz sorumlusunuz.",
    ],
  },
  {
    id: "prohibited",
    title: "Yasak kullanım",
    body: [
      "Yasadışı içerik, yasaklandığı yerde korunan markaları taklit, zararlı yazılım dağıtımı, taciz kampanyaları veya geçerli yasayı ihlal eden her şey.",
      "Diğer kullanıcıların hesaplarına, admin araçlarına veya sağlayıcı kimlik bilgilerine erişmeye çalışmak.",
    ],
  },
  {
    id: "disclaimer",
    title: "Sorumluluk reddi ve sorumluluk",
    body: [
      "Hizmetler “mevcut olduğu kadarıyla” sunulur. Platformlar algoritmaları değiştirebilir veya metrikleri önceden haber vermeden kaldırabilir.",
      "Yasanın izin verdiği ölçüde sorumluluğumuz, uyuşmazlıklı siparişle ilgili hesabınızdaki kullanılmayan bakiye ile sınırlıdır. Kâr kaybı, itibar zararı veya dolaylı zararlardan sorumlu değiliz.",
    ],
  },
  {
    id: "changes-law",
    title: "Değişiklikler ve yönetim konuları",
    body: [
      "Bu şartları güncelleyebiliriz; güncelleme tarihinden sonra kullanıma devam etmek kabul anlamına gelir. Önemli değişikliklerde dashboard’da bildirim yayınlayabiliriz.",
      `Yasal bildirimler için iletişim: ${SITE.email}. Destek kanalları: WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}.`,
    ],
  },
];

const trAbout: LegalSection[] = [
  {
    id: "who",
    title: "Biz kimiz",
    body: [
      `${SITE.name}, ${SITE.domain} adresinde operatör tarafından kurulmuş bir sosyal medya pazarlama masasıdır. İçerik üreticileri, mağazalar ve reseller’lar USD bakiye tutar; Instagram, TikTok, YouTube, Telegram ve daha fazlası için servis hatları seçer; yalnızca herkese açık linklerle sipariş verir.`,
      "Her niş domaine aynı ana sayfa paragraflarını gönderen benzer script temalarının aksine; bu siteyi, SEO sayfalarını, ücretsiz deneme paketlerini, ödeme açılışlarını ve PerfectPanel uyumlu API’yi tek marka altında sürdürürüz.",
    ],
  },
  {
    id: "what-we-do",
    title: "Farklı ne yapıyoruz",
    body: [
      "Ücret onayından önce şeffaf 1k başına fiyat ve min/max.",
      "Büyük yüklemeden önce başlangıç süresini değerlendirebilmeniz için ücretsiz paketler.",
      "PayPal, kripto, Skrill, kartlar ve listelenen diğer yöntemler için kullanıcı adı + kanıt ile manuel yatırım eşleştirme — net ödeme açılış sayfalarıyla.",
      "Sipariş durumlarının dashboard’a (ve API’ye) yazılması; sohbet ekran görüntülerinden tahmin etmezsiniz.",
      "Kendi markasıyla satmak isteyen mağazalar için Reseller API (/api/v2).",
    ],
  },
  {
    id: "who-for",
    title: "SSMM Panel kimler için",
    body: [
      "Tam ajans retainer’ı tutmadan bir gönderi veya profilde kontrollü yükseltme isteyen içerik üreticileri.",
      "Ürün lansmanlarında etkileşimi test eden küçük mağazalar.",
      "Marjı ve müşteri desteğini kendi tarafında tutarak API üzerinden envanter bağlayan reseller’lar.",
    ],
  },
  {
    id: "safety",
    title: "Güvenlik ilkeleri",
    body: [
      "Instagram, TikTok, YouTube veya Telegram için şifre toplama yok.",
      "Küçük başlayın; servis sunuyorsa ve hesabınız yeniyse drip-feed tercih edin.",
      "Bir hattı büyütmeden önce refill ve kısmi kurallar için servis notlarını okuyun.",
      "Bir hat açıklamanın ötesinde takılırsa erken destekle iletişime geçin — WhatsApp ve ticket’lar yalnızca bot döngüsü değil, operatörler için personellidir.",
    ],
  },
  {
    id: "contact",
    title: "Ekiple konuşun",
    body: [
      `E-posta ${SITE.email}, WhatsApp ${SITE.whatsappDisplay} veya Telegram @${SITE.telegram}. Yatırımlar için Ödemeler bölümüne; ürün soruları için SSS ve Blog rehberlerine bakın.`,
    ],
  },
];

const esPrivacy: LegalSection[] = [
  {
    id: "overview",
    title: "Resumen",
    body: [
      `Esta Política de privacidad explica cómo ${SITE.name} (“nosotros”) recopila, usa y protege la información cuando visitas ${SITE.domain}, creas una cuenta, haces pedidos, recargas saldo, abres tickets o contactas soporte por WhatsApp/Telegram.`,
      "Diseñamos esta política para operadores que esperan claridad, no niebla legal. No pedimos contraseñas de redes sociales. Los pedidos usan solo URL públicas.",
    ],
  },
  {
    id: "data-we-collect",
    title: "Información que recopilamos",
    body: [
      "Datos de cuenta: usuario, correo, contraseña hasheada, clave API (si se genera), idioma preferido y estado de la cuenta.",
      "Datos de pedido: ID de servicio, enlace público o usuario que envías, cantidad, cargo, historial de estado, restante y marcas de tiempo.",
      "Datos de pago que envías voluntariamente: método, importe, referencias de transacción, capturas o enlaces de prueba y la nota con tu usuario. Los números de tarjeta no se almacenan en nuestros servidores cuando pagas con procesadores de terceros.",
      "Datos de soporte: mensajes de ticket, correspondencia de WhatsApp/Telegram y adjuntos que elijas compartir.",
      "Registros técnicos: IP, navegador/user-agent, región aproximada y eventos de seguridad para frenar abuso (accesos fallidos, límites de tasa).",
    ],
  },
  {
    id: "how-we-use",
    title: "Cómo usamos la información",
    body: [
      "Prestar y mejorar el panel: autenticar sesiones, mostrar saldo, procesar pedidos, sincronizar estado con proveedores y acreditar depósitos verificados.",
      "Comunicar: avisos transaccionales sobre depósitos, problemas de pedido o alertas de seguridad. El marketing por correo es opcional y puede rechazarse.",
      "Prevenir abuso: detectar abuso de pruebas gratis, patrones de chargeback, pedidos spam duplicados y mal uso de la API.",
      "Cumplir la ley: responder a solicitudes legales válidas cuando sea necesario.",
    ],
  },
  {
    id: "sharing",
    title: "Compartir con procesadores y proveedores",
    body: [
      "Los proveedores SMM upstream reciben solo lo necesario para cumplir un pedido (enlace público, cantidad, parámetros del servicio). No deben recibir tu contraseña del panel.",
      "Las redes de pago (PayPal, procesadores crypto, bancos, Skrill, etc.) procesan fondos bajo sus propias políticas. Recibimos la confirmación y la prueba que compartes para el emparejamiento manual.",
      "Proveedores de hosting, correo y analítica pueden procesar datos técnicos bajo contrato. No vendemos datos personales a intermediarios.",
    ],
  },
  {
    id: "retention",
    title: "Retención y seguridad",
    body: [
      "Los registros de cuenta y pedidos se conservan mientras la cuenta esté activa y un periodo razonable después por disputas, contabilidad y prevención de fraude.",
      "Puedes solicitar el cierre de cuenta por correo a soporte. Algunos registros pueden permanecer si la ley o la defensa ante chargebacks lo exigen.",
      "Usamos contraseñas hasheadas, HTTPS, controles de acceso en herramientas de admin y privilegio mínimo. Ningún método es perfecto — informa de inmediato sospechas de filtración.",
    ],
  },
  {
    id: "rights",
    title: "Tus opciones y derechos",
    body: [
      "Acceso/actualización: edita el perfil en el panel cuando esté disponible, o escríbenos para corregir datos de cuenta.",
      "Exportar/eliminar: solicita un resumen de datos o eliminación sujeto a retenciones legales y saldos/disputas abiertas.",
      "Cookies: las esenciales mantienen tu sesión. Si añadimos cookies analíticas opcionales, las revelaremos aquí.",
      "Derechos regionales (estilo GDPR/CCPA): contáctanos para ejercer acceso, corrección, eliminación u oposición cuando aplique. Respondemos en un plazo razonable.",
    ],
  },
  {
    id: "children",
    title: "Menores",
    body: [
      "El panel está pensado para adultos que puedan celebrar un contrato. Si crees que un menor creó una cuenta, contáctanos para revisarla y eliminarla.",
    ],
  },
  {
    id: "changes",
    title: "Cambios en esta política",
    body: [
      `Podemos actualizar esta página cuando cambien productos o leyes. La fecha “Última actualización” al inicio de Privacidad refleja la revisión más reciente. Los cambios materiales también pueden anunciarse en el panel o por correo.`,
    ],
  },
  {
    id: "contact",
    title: "Contacto",
    body: [
      `Preguntas de privacidad: ${SITE.email}. WhatsApp: ${SITE.whatsappDisplay}. Telegram: @${SITE.telegram}.`,
    ],
  },
];

const esTerms: LegalSection[] = [
  {
    id: "acceptance",
    title: "Aceptación de los términos",
    body: [
      `Al crear una cuenta o usar ${SITE.name} en ${SITE.domain}, aceptas estos Términos de servicio. Si no estás de acuerdo, no uses el servicio.`,
      "Debes poder celebrar un contrato legalmente en tu jurisdicción. Eres responsable de cumplir las reglas de Instagram, TikTok, YouTube, Telegram y cualquier red a la que dirijas pedidos.",
    ],
  },
  {
    id: "accounts",
    title: "Cuentas y claves API",
    body: [
      "Mantén privadas las credenciales y claves API. Eres responsable de las acciones bajo tu cuenta.",
      "Podemos suspender o cerrar cuentas por abuso: abuso de pruebas gratis, chargebacks, pedidos spam, credential stuffing o intentos de ingeniería inversa de credenciales de proveedor.",
      "Una persona/negocio no debe crear cuentas desechables sin fin para eludir límites de uso justo de paquetes gratis.",
    ],
  },
  {
    id: "orders",
    title: "Pedidos y servicios",
    body: [
      "Las descripciones (tarifa, min/máx, inicio, refill, drip-feed) son orientativas y pueden cambiar cuando los proveedores actualicen inventario.",
      "No hagas pedidos duplicados del mismo enlace y servicio mientras otro siga procesándose, salvo que la descripción lo permita.",
      "Nunca envíes contraseñas. Solo URL públicas o usuarios aceptados por la fila del servicio.",
      "Pedidos parciales, cancelados o fallidos pueden devolver saldo no usado según las reglas del servicio y el informe del proveedor. Las ventanas de refill, si existen, aplican solo como indique ese servicio.",
      "Somos un operador de panel que enruta pedidos a proveedores. No garantizamos ranking orgánico, favores del algoritmo ni métricas permanentes en plataformas de terceros.",
    ],
  },
  {
    id: "payments",
    title: "Pagos y saldo",
    body: [
      "Los depósitos se acreditan tras verificar la prueba de pago emparejada con tu usuario. Pruebas falsas justifican suspensión.",
      "El saldo no es transferible entre usuarios salvo que aprobemos expresamente una migración.",
      "Chargebacks o disputas de pago abiertas sin contactar soporte primero pueden implicar ban permanente y pérdida del saldo restante.",
      "Los precios se muestran en USD salvo indicación contraria. Los impuestos, si los hay, son tu responsabilidad en tu región.",
    ],
  },
  {
    id: "api",
    title: "API de revendedor",
    body: [
      "La API pública es compatible con PerfectPanel para services, add, status y balance. Aplican límites de tasa y uso justo.",
      "No puedes usar la API para atacar infraestructura, raspar listas propietarias de proveedores para revender un clon de nuestro catálogo sin autorización, ni saturar el polling de estado.",
      "Sigues siendo responsable de cómo presentas los servicios a tus clientes, incluida tu política de reembolso hacia ellos.",
    ],
  },
  {
    id: "prohibited",
    title: "Uso prohibido",
    body: [
      "Contenido ilegal, suplantación de marcas protegidas donde esté prohibido, distribución de malware, campañas de acoso o cualquier cosa que viole la ley aplicable.",
      "Intentar acceder a cuentas de otros usuarios, herramientas de admin o credenciales de proveedor.",
    ],
  },
  {
    id: "disclaimer",
    title: "Descargo y responsabilidad",
    body: [
      "Los servicios se ofrecen “según disponibilidad”. Las plataformas pueden cambiar algoritmos o quitar métricas sin aviso.",
      "En la medida máxima permitida por la ley, nuestra responsabilidad se limita al saldo no usado de tu cuenta relacionado con el pedido en disputa. No respondemos por lucro cesante, daño reputacional ni pérdidas indirectas.",
    ],
  },
  {
    id: "changes-law",
    title: "Cambios y asuntos aplicables",
    body: [
      "Podemos actualizar estos términos; el uso continuado tras la fecha de actualización implica aceptación. Para cambios materiales podemos publicar un aviso en el panel.",
      `Contacto para avisos legales: ${SITE.email}. Canales de soporte: WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}.`,
    ],
  },
];

const esAbout: LegalSection[] = [
  {
    id: "who",
    title: "Quiénes somos",
    body: [
      `${SITE.name} es un escritorio de marketing en redes sociales construido por operadores en ${SITE.domain}. Creadores, tiendas y reseellers mantienen saldo en USD, eligen líneas para Instagram, TikTok, YouTube, Telegram y más, y piden solo con enlaces públicos.`,
      "A diferencia de temas script clonados que envían los mismos párrafos a cada dominio, mantenemos este sitio, páginas SEO, paquetes de prueba, landings de pago y una API compatible con PerfectPanel bajo una sola marca.",
    ],
  },
  {
    id: "what-we-do",
    title: "Qué hacemos distinto",
    body: [
      "Tarifa por 1k y min/máx transparentes antes de confirmar el cargo.",
      "Paquetes gratis para juzgar el tiempo de inicio antes de una recarga grande.",
      "Emparejamiento manual de depósitos con usuario + prueba para PayPal, crypto, Skrill, tarjetas y otros métodos listados — con landings de pago claras.",
      "Estados de pedido escritos en el panel (y API) para no adivinar desde capturas de chat.",
      "API de revendedor (/api/v2) para tiendas que quieren vender con su propia marca.",
    ],
  },
  {
    id: "who-for",
    title: "Para quién es SSMM Panel",
    body: [
      "Creadores que necesitan un impulso controlado en un post o perfil sin retainer de agencia completa.",
      "Pequeñas tiendas que prueban engagement en lanzamientos de producto.",
      "Resellers que conectan inventario por API manteniendo margen y soporte al cliente de su lado.",
    ],
  },
  {
    id: "safety",
    title: "Principios de seguridad",
    body: [
      "Sin recolección de contraseñas de Instagram, TikTok, YouTube o Telegram.",
      "Empieza en pequeño; prefiere drip-feed si el servicio lo ofrece y tu cuenta es nueva.",
      "Lee las notas del servicio sobre refill y parciales antes de escalar una línea.",
      "Contacta soporte pronto si una línea se atasca más allá de la descripción — WhatsApp y tickets están atendidos por operadores, no solo bots.",
    ],
  },
  {
    id: "contact",
    title: "Habla con el equipo",
    body: [
      `Correo ${SITE.email}, WhatsApp ${SITE.whatsappDisplay} o Telegram @${SITE.telegram}. Para depósitos ver Pagos; para dudas de producto ver FAQ y las guías del Blog.`,
    ],
  },
];

const ptBrPrivacy: LegalSection[] = [
  {
    id: "overview",
    title: "Visão geral",
    body: [
      `Esta Política de Privacidade explica como a ${SITE.name} (“nós”) coleta, usa e protege informações quando você visita ${SITE.domain}, cria uma conta, faz pedidos, recarrega saldo, abre tickets ou fala com o suporte no WhatsApp/Telegram.`,
      "Escrevemos esta política para operadores que esperam clareza — não névoa jurídica. Não pedimos senhas de redes sociais. Pedidos usam apenas URLs públicas.",
    ],
  },
  {
    id: "data-we-collect",
    title: "Informações que coletamos",
    body: [
      "Dados da conta: usuário, e-mail, senha com hash, chave de API (se gerada), idioma preferido e status da conta.",
      "Dados do pedido: ID do serviço, link público ou usuário enviado, quantidade, valor cobrado, histórico de status, restante e carimbos de tempo.",
      "Dados de pagamento que você envia voluntariamente: método, valor, referências de transação, capturas ou links de comprovante e a nota com seu usuário. Números de cartão não são armazenados em nossos servidores quando você paga por processadores de terceiros.",
      "Dados de suporte: mensagens de ticket, correspondência WhatsApp/Telegram e anexos que você optar por compartilhar.",
      "Logs técnicos: IP, navegador/user-agent, região aproximada e eventos de segurança para conter abuso (logins falhos, limites de taxa).",
    ],
  },
  {
    id: "how-we-use",
    title: "Como usamos as informações",
    body: [
      "Prestar e melhorar o painel: autenticar sessões, mostrar saldo, processar pedidos, sincronizar status com fornecedores e creditar depósitos verificados.",
      "Comunicar: avisos transacionais sobre depósitos, problemas de pedido ou alertas de segurança. E-mails de marketing são opcionais e podem ser recusados.",
      "Prevenir abuso: detectar abuso de testes grátis, padrões de chargeback, pedidos spam duplicados e mau uso da API.",
      "Cumprir a lei: responder a solicitações legais válidas quando necessário.",
    ],
  },
  {
    id: "sharing",
    title: "Compartilhamento com processadores e fornecedores",
    body: [
      "Fornecedores SMM upstream recebem apenas o necessário para cumprir um pedido (link público, quantidade, parâmetros do serviço). Não devem receber a senha do seu painel.",
      "Redes de pagamento (PayPal, processadores crypto, bancos, Skrill etc.) processam fundos sob as próprias políticas. Recebemos confirmação e o comprovante que você compartilha para correspondência manual.",
      "Fornecedores de hosting, e-mail e analytics podem processar dados técnicos sob contrato. Não vendemos dados pessoais a intermediários.",
    ],
  },
  {
    id: "retention",
    title: "Retenção e segurança",
    body: [
      "Registros de conta e pedidos são mantidos enquanto a conta estiver ativa e por um período razoável depois, para disputas, contabilidade e prevenção de fraude.",
      "Você pode solicitar o encerramento da conta por e-mail ao suporte. Alguns registros podem permanecer quando a lei ou a defesa de chargeback exigirem.",
      "Usamos senhas com hash, HTTPS, controles de acesso em ferramentas admin e privilégio mínimo. Nenhum método é perfeito — reporte suspeitas de violação imediatamente.",
    ],
  },
  {
    id: "rights",
    title: "Suas escolhas e direitos",
    body: [
      "Acesso/atualização: edite o perfil no painel quando disponível, ou envie e-mail para corrigir dados da conta.",
      "Exportar/excluir: solicite um resumo dos dados ou exclusão sujeita a retenções legais e saldos/disputas em aberto.",
      "Cookies: cookies essenciais mantêm você logado. Se adicionarmos cookies analíticos opcionais, divulgaremos aqui.",
      "Direitos regionais (estilo GDPR/CCPA): contate-nos para exercer acesso, correção, exclusão ou oposição quando aplicável. Respondemos em prazo razoável.",
    ],
  },
  {
    id: "children",
    title: "Crianças",
    body: [
      "O painel é destinado a adultos capazes de celebrar contrato. Se acredita que um menor criou uma conta, contate-nos para revisarmos e removê-la.",
    ],
  },
  {
    id: "changes",
    title: "Alterações nesta política",
    body: [
      `Podemos atualizar esta página conforme produtos ou leis mudem. A data “Última atualização” no topo da Privacidade reflete a revisão mais recente. Mudanças materiais também podem ser avisadas no painel ou por e-mail.`,
    ],
  },
  {
    id: "contact",
    title: "Contato",
    body: [
      `Dúvidas de privacidade: ${SITE.email}. WhatsApp: ${SITE.whatsappDisplay}. Telegram: @${SITE.telegram}.`,
    ],
  },
];

const ptBrTerms: LegalSection[] = [
  {
    id: "acceptance",
    title: "Aceitação dos termos",
    body: [
      `Ao criar uma conta ou usar a ${SITE.name} em ${SITE.domain}, você concorda com estes Termos de Serviço. Se discordar, não use o serviço.`,
      "Você deve poder celebrar um contrato legalmente na sua jurisdição. É responsável por cumprir as regras do Instagram, TikTok, YouTube, Telegram e de qualquer rede que alvo.",
    ],
  },
  {
    id: "accounts",
    title: "Contas e chaves de API",
    body: [
      "Mantenha credenciais e chaves de API privadas. Você é responsável pelas ações na sua conta.",
      "Podemos suspender ou encerrar contas por abuso: abuso de testes grátis, chargebacks, pedidos spam, credential stuffing ou tentativas de engenharia reversa de credenciais de fornecedor.",
      "Uma pessoa/empresa não deve criar contas descartáveis sem fim para contornar limites de uso justo dos pacotes grátis.",
    ],
  },
  {
    id: "orders",
    title: "Pedidos e serviços",
    body: [
      "Descrições de serviço (taxa, min/máx, início, refill, drip-feed) são indicativas e podem mudar quando fornecedores atualizarem o inventário.",
      "Nunca faça pedidos duplicados do mesmo link e serviço enquanto outro ainda estiver processando, salvo se a descrição permitir.",
      "Nunca envie senhas. Apenas URLs públicas ou usuários aceitos pela linha do serviço.",
      "Pedidos parciais, cancelados ou falhos podem devolver saldo não usado conforme as regras do serviço e o relatório do fornecedor. Janelas de refill, quando oferecidas, valem só como escrito naquele serviço.",
      "Somos um operador de painel que roteia pedidos a fornecedores. Não garantimos ranking orgânico, favores de algoritmo ou métricas permanentes em plataformas de terceiros.",
    ],
  },
  {
    id: "payments",
    title: "Pagamentos e saldo",
    body: [
      "Depósitos são creditados após verificação do comprovante correspondente ao seu usuário. Comprovantes falsos justificam suspensão.",
      "O saldo é intransferível entre usuários, salvo se aprovarmos explicitamente uma migração.",
      "Chargebacks ou disputas de pagamento abertas sem contactar o suporte primeiro podem gerar banimento permanente e perda do saldo restante.",
      "Preços são mostrados em USD salvo indicação em contrário. Impostos, se houver, são sua responsabilidade na sua região.",
    ],
  },
  {
    id: "api",
    title: "API de revendedor",
    body: [
      "A API pública é compatível com PerfectPanel para services, add, status e balance. Limites de taxa e uso justo se aplicam.",
      "Você não pode usar a API para atacar infraestrutura, raspar listas proprietárias de fornecedores para revender um clone do nosso catálogo sem autorização, nem sobrecarregar o polling de status.",
      "Você continua responsável por como apresenta serviços aos seus clientes, incluindo a política de reembolso deles.",
    ],
  },
  {
    id: "prohibited",
    title: "Uso proibido",
    body: [
      "Conteúdo ilegal, personificação de marcas protegidas onde for proibido, distribuição de malware, campanhas de assédio ou qualquer coisa que viole a lei aplicável.",
      "Tentar acessar contas de outros usuários, ferramentas admin ou credenciais de fornecedor.",
    ],
  },
  {
    id: "disclaimer",
    title: "Isenção e responsabilidade",
    body: [
      "Os serviços são fornecidos “conforme disponíveis”. Plataformas podem mudar algoritmos ou remover métricas sem aviso.",
      "Na máxima extensão permitida por lei, nossa responsabilidade limita-se ao saldo não usado da sua conta relacionado ao pedido em disputa. Não respondemos por lucros cessantes, dano reputacional ou perdas indiretas.",
    ],
  },
  {
    id: "changes-law",
    title: "Alterações e assuntos aplicáveis",
    body: [
      "Podemos atualizar estes termos; o uso contínuo após a data de atualização significa aceitação. Para mudanças materiais podemos publicar aviso no painel.",
      `Contato para avisos legais: ${SITE.email}. Canais de suporte: WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}.`,
    ],
  },
];

const ptBrAbout: LegalSection[] = [
  {
    id: "who",
    title: "Quem somos",
    body: [
      `${SITE.name} é uma mesa de marketing em redes sociais construída por operadores em ${SITE.domain}. Criadores, lojas e revendedores mantêm saldo em USD, escolhem linhas para Instagram, TikTok, YouTube, Telegram e mais, e pedem só com links públicos.`,
      "Diferente de temas script parecidos que enviam os mesmos parágrafos a cada domínio, mantemos este site, páginas SEO, pacotes de teste, landings de pagamento e uma API compatível com PerfectPanel sob uma única marca.",
    ],
  },
  {
    id: "what-we-do",
    title: "O que fazemos de diferente",
    body: [
      "Taxa por 1k e min/máx transparentes antes de confirmar a cobrança.",
      "Pacotes grátis para avaliar o tempo de início antes de uma recarga grande.",
      "Correspondência manual de depósito com usuário + comprovante para PayPal, crypto, Skrill, cartões e outros métodos listados — com landings de pagamento claras.",
      "Status de pedidos gravados no painel (e na API) para você não adivinhar por capturas de chat.",
      "API de revendedor (/api/v2) para lojas que querem vender com a própria marca.",
    ],
  },
  {
    id: "who-for",
    title: "Para quem é o SSMM Panel",
    body: [
      "Criadores que precisam de um impulso controlado em um post ou perfil sem retainer de agência completa.",
      "Pequenas lojas testando engajamento em lançamentos de produto.",
      "Revendedores que conectam inventário pela API mantendo margem e suporte ao cliente do seu lado.",
    ],
  },
  {
    id: "safety",
    title: "Princípios de segurança",
    body: [
      "Sem coleta de senhas do Instagram, TikTok, YouTube ou Telegram.",
      "Comece pequeno; prefira drip-feed quando o serviço oferecer e sua conta for nova.",
      "Leia as notas do serviço sobre refill e parciais antes de escalar uma linha.",
      "Fale com o suporte cedo se uma linha travar além da descrição — WhatsApp e tickets são atendidos por operadores, não só bots.",
    ],
  },
  {
    id: "contact",
    title: "Fale com a equipe",
    body: [
      `E-mail ${SITE.email}, WhatsApp ${SITE.whatsappDisplay} ou Telegram @${SITE.telegram}. Para depósitos veja Pagamentos; para dúvidas de produto veja FAQ e os guias do Blog.`,
    ],
  },
];

const arPrivacy: LegalSection[] = [
  {
    id: "overview",
    title: "نظرة عامة",
    body: [
      `توضح سياسة الخصوصية هذه كيف تجمع ${SITE.name} («نحن») المعلومات وتستخدمها وتحميها عند زيارة ${SITE.domain} أو إنشاء حساب أو تقديم طلبات أو شحن الرصيد أو فتح تذاكر أو التواصل مع الدعم عبر واتساب/تيليغرام.`,
      "صغنا هذه السياسة لمشغّلين يتوقعون وضوحًا لا ضبابًا قانونيًا. لا نطلب كلمات مرور التواصل الاجتماعي. الطلبات تستخدم روابط عامة فقط.",
    ],
  },
  {
    id: "data-we-collect",
    title: "المعلومات التي نجمعها",
    body: [
      "بيانات الحساب: اسم المستخدم والبريد وكلمة المرور المُجزَّأة ومفتاح واجهة البرمجة (إن وُجد) واللغة المفضّلة وحالة الحساب.",
      "بيانات الطلب: معرّف الخدمة والرابط العام أو اسم المستخدم والكمية والمبلغ وسجل الحالة والمتبقي والطوابع الزمنية.",
      "بيانات الدفع التي ترسلها طوعًا: الطريقة والمبلغ ومراجع المعاملة ولقطات الشاشة أو روابط الإثبات وملاحظة اسم المستخدم. لا تُخزَّن أرقام البطاقات على خوادمنا عند الدفع عبر معالجات طرف ثالث.",
      "بيانات الدعم: رسائل التذاكر ومراسلات واتساب/تيليغرام والمرفقات التي تختار مشاركتها.",
      "سجلات تقنية: عنوان IP والمتصفح/وكيل المستخدم والمنطقة التقريبية وأحداث الأمان لوقف إساءة الاستخدام (فشل تسجيل الدخول وحدود المعدّل).",
    ],
  },
  {
    id: "how-we-use",
    title: "كيف نستخدم المعلومات",
    body: [
      "تقديم اللوحة وتحسينها: مصادقة الجلسات وعرض الرصيد ومعالجة الطلبات ومزامنة الحالة من المزوّدين وشحن الإيداعات الموثَّقة.",
      "التواصل: إشعارات معاملات حول الإيداعات أو مشاكل الطلبات أو تنبيهات الأمان. رسائل التسويق اختيارية ويمكن رفضها.",
      "منع إساءة الاستخدام: اكتشاف استغلال التجارب المجانية وأنماط الاسترجاع وطلبات السبام المكررة وإساءة واجهة البرمجة.",
      "الامتثال للقانون: الرد على الطلبات القانونية الصحيحة عند الاقتضاء.",
    ],
  },
  {
    id: "sharing",
    title: "المشاركة مع المعالجات والمزوّدين",
    body: [
      "يتلقى مزوّدو SMM الأعلى فقط ما يلزم لتنفيذ الطلب (رابط عام وكمية ومعلمات الخدمة). لا ينبغي أن يتلقوا كلمة مرور اللوحة.",
      "شبكات الدفع (PayPal ومعالجات العملات والبنوك وSkrill وغيرها) تعالج الأموال وفق سياساتها. نتلقى التأكيد والإثبات الذي تشاركه للمطابقة اليدوية.",
      "قد يعالج مزوّدو الاستضافة والبريد والتحليلات بيانات تقنية بموجب عقد. لا نبيع البيانات الشخصية للوسطاء.",
    ],
  },
  {
    id: "retention",
    title: "الاحتفاظ والأمان",
    body: [
      "تُحفظ سجلات الحساب والطلبات أثناء نشاط الحساب ولفترة معقولة بعده للنزاعات والمحاسبة ومنع الاحتيال.",
      "يمكنك طلب إغلاق الحساب عبر البريد للدعم. قد تبقى بعض السجلات حيث يقتضي القانون أو الدفاع عن الاسترجاع.",
      "نستخدم كلمات مرور مجزّأة وHTTPS وضوابط وصول لأدوات الإدارة وأقل صلاحيات. لا طريقة كاملة — بلّغ فورًا عن أي اختراق مشتبه.",
    ],
  },
  {
    id: "rights",
    title: "خياراتك وحقوقك",
    body: [
      "الوصول/التحديث: عدّل ملفك في لوحة التحكم عند التوفر، أو راسلنا لتصحيح بيانات الحساب.",
      "التصدير/الحذف: اطلب ملخصًا لبيانات الحساب أو الحذف مع مراعاة القيود القانونية والأرصدة/النزاعات المفتوحة.",
      "ملفات تعريف الارتباط: الأساسية تبقيك مسجّل الدخول. إذا أضفنا ملفات تحليل اختيارية لاحقًا سنفصح عنها هنا.",
      "حقوق إقليمية (بأسلوب GDPR/CCPA): تواصل معنا لممارسة الوصول أو التصحيح أو الحذف أو الاعتراض حيث ينطبق. نرد خلال إطار زمني معقول.",
    ],
  },
  {
    id: "children",
    title: "الأطفال",
    body: [
      "اللوحة مخصّصة للبالغين القادرين على إبرام عقد. إذا كنت تعتقد أن قاصرًا أنشأ حسابًا، تواصل معنا لمراجعته وإزالته.",
    ],
  },
  {
    id: "changes",
    title: "تغييرات هذه السياسة",
    body: [
      `قد نحدّث هذه الصفحة مع تغيّر المنتجات أو القوانين. يعكس تاريخ «آخر تحديث» أعلى صفحة الخصوصية أحدث مراجعة. قد تُذكر التغييرات الجوهرية أيضًا في لوحة التحكم أو بالبريد.`,
    ],
  },
  {
    id: "contact",
    title: "التواصل",
    body: [
      `أسئلة الخصوصية: ${SITE.email}. واتساب: ${SITE.whatsappDisplay}. تيليغرام: @${SITE.telegram}.`,
    ],
  },
];

const arTerms: LegalSection[] = [
  {
    id: "acceptance",
    title: "قبول الشروط",
    body: [
      `بإنشاء حساب أو استخدام ${SITE.name} على ${SITE.domain} فإنك توافق على شروط الخدمة هذه. إن لم توافق فلا تستخدم الخدمة.`,
      "يجب أن تكون قادرًا قانونيًا على إبرام عقد في ولايتك. أنت مسؤول عن الامتثال لقواعد إنستغرام وتيك توك ويوتيوب وتيليغرام وأي شبكة تستهدفها.",
    ],
  },
  {
    id: "accounts",
    title: "الحسابات ومفاتيح واجهة البرمجة",
    body: [
      "حافظ على سرية بيانات الدخول ومفاتيح واجهة البرمجة. أنت مسؤول عن الإجراءات تحت حسابك.",
      "قد نعلّق أو ننهي الحسابات بسبب الإساءة: استغلال التجارب المجانية والاسترجاعات وطلبات السبام وملء بيانات الاعتماد أو محاولات هندسة عكسية لبيانات المزوّد.",
      "لا ينبغي لشخص/عمل إنشاء حسابات رمي لا تنتهي لتجاوز حدود الاستخدام العادل للباقات المجانية.",
    ],
  },
  {
    id: "orders",
    title: "الطلبات والخدمات",
    body: [
      "وصف الخدمات (السعر والحد الأدنى/الأقصى ووقت البدء وإعادة التعبئة والتقطير) إرشادي وقد يتغيّر عند تحديث المزوّدين للمخزون.",
      "لا تضع طلبات مكررة لنفس الرابط والخدمة بينما آخر ما زال قيد المعالجة ما لم يسمح الوصف بذلك.",
      "لا ترسل كلمات مرور أبدًا. فقط روابط عامة أو أسماء مستخدم يقبلها صف الخدمة.",
      "قد تُعيد الطلبات الجزئية أو الملغاة أو الفاشلة الرصيد غير المستخدم وفق قواعد الخدمة وتقرير المزوّد. نوافذ إعادة التعبئة، إن وُجدت، تُطبَّق كما هو مكتوب على تلك الخدمة فقط.",
      "نحن مشغّل لوحة يوجّه الطلبات إلى المزوّدين. لا نضمن ترتيبًا عضويًا أو محاباة خوارزمية أو مقاييس دائمة على منصات طرف ثالث.",
    ],
  },
  {
    id: "payments",
    title: "المدفوعات والرصيد",
    body: [
      "تُشحن الإيداعات بعد التحقق من إثبات الدفع المطابق لاسم المستخدم. الإثباتات الزائفة مبرر للتعليق.",
      "الرصيد غير قابل للتحويل بين المستخدمين ما لم نوافق صراحة على نقل.",
      "الاسترجاعات أو نزاعات الدفع المفتوحة دون التواصل مع الدعم أولًا قد تؤدي إلى حظر دائم ومصادرة الرصيد المتبقي.",
      "الأسعار بالدولار ما لم يُذكر غير ذلك. الضرائب، إن وجدت، مسؤوليتك في منطقتك.",
    ],
  },
  {
    id: "api",
    title: "واجهة الموزّعين",
    body: [
      "واجهة البرمجة العامة متوافقة مع PerfectPanel لـ services وadd وstatus وbalance. تُطبَّق حدود المعدّل والاستخدام العادل.",
      "لا يجوز استخدام الواجهة لمهاجمة البنية أو كشط قوائم المزوّدين لإعادة بيع نسخة من كتالوجنا دون إذن أو إغراق استعلام الحالة.",
      "تبقى مسؤولًا عن كيفية عرض الخدمات لعملائك بما في ذلك سياسة الاسترداد تجاههم.",
    ],
  },
  {
    id: "prohibited",
    title: "الاستخدام المحظور",
    body: [
      "محتوى غير قانوني أو انتحال علامات محمية حيث يُحظر أو توزيع برمجيات خبيثة أو حملات مضايقة أو أي شيء يخالف القانون المعمول به.",
      "محاولة الوصول إلى حسابات مستخدمين آخرين أو أدوات الإدارة أو بيانات اعتماد المزوّد.",
    ],
  },
  {
    id: "disclaimer",
    title: "إخلاء المسؤولية والمسؤولية القانونية",
    body: [
      "تُقدَّم الخدمات «حسب التوفر». قد تغيّر المنصات الخوارزميات أو تزيل المقاييس دون إشعار.",
      "إلى أقصى حد يسمح به القانون، تقتصر مسؤوليتنا على الرصيد غير المستخدم المرتبط بالطلب المتنازع عليه. لسنا مسؤولين عن خسارة الأرباح أو الضرر السمعي أو الخسائر غير المباشرة.",
    ],
  },
  {
    id: "changes-law",
    title: "التغييرات والأمور الحاكمة",
    body: [
      "قد نحدّث هذه الشروط؛ استمرار الاستخدام بعد تاريخ التحديث يعني القبول. للتغييرات الجوهرية قد ننشر إشعارًا في لوحة التحكم.",
      `التواصل للإشعارات القانونية: ${SITE.email}. قنوات الدعم: واتساب ${SITE.whatsappDisplay}، تيليغرام @${SITE.telegram}.`,
    ],
  },
];

const arAbout: LegalSection[] = [
  {
    id: "who",
    title: "من نحن",
    body: [
      `${SITE.name} مكتب تسويق عبر التواصل الاجتماعي بناه مشغّلون على ${SITE.domain}. يحتفظ صنّاع المحتوى والمتاجر والموزّعون برصيد بالدولار، ويختارون خطوط خدمات لإنستغرام وتيك توك ويوتيوب وتيليغرام وغيرها، ويقدّمون طلبات بروابط عامة فقط.`,
      "بخلاف قوالب السكربت المتشابهة التي ترسل الفقرات نفسها لكل نطاق، نحن نصون هذا الموقع وصفحات SEO وباقات التجربة وصفحات الدفع وواجهة متوافقة مع PerfectPanel تحت علامة واحدة.",
    ],
  },
  {
    id: "what-we-do",
    title: "ما الذي نفعله بشكل مختلف",
    body: [
      "سعر لكل ألف وحد أدنى/أقصى شفافان قبل تأكيد الخصم.",
      "باقات مجانية لتقييم وقت البدء قبل شحن كبير.",
      "مطابقة يدوية للإيداع باسم المستخدم + الإثبات لـ PayPal والعملات وSkrill والبطاقات والطرق المدرجة — مع صفحات دفع واضحة.",
      "حالات الطلب تُكتب في لوحة التحكم (وواجهة البرمجة) فلا تخمّن من لقطات الدردشة.",
      "واجهة موزّعين (/api/v2) للمتاجر التي تريد البيع بعلامتها الخاصة.",
    ],
  },
  {
    id: "who-for",
    title: "لمن SSMM Panel",
    body: [
      "صنّاع محتوى يحتاجون دفعة مضبوطة لمنشور أو ملف دون عقد وكالة كامل.",
      "متاجر صغيرة تختبر التفاعل حول إطلاق المنتجات.",
      "موزّعون يربطون المخزون عبر الواجهة مع الإبقاء على الهامش ودعم العملاء لديهم.",
    ],
  },
  {
    id: "safety",
    title: "مبادئ السلامة",
    body: [
      "لا جمع لكلمات مرور إنستغرام أو تيك توك أو يوتيوب أو تيليغرام.",
      "ابدأ صغيرًا؛ فضّل التقطير عندما تتيحه الخدمة وحسابك جديد.",
      "اقرأ ملاحظات الخدمة عن إعادة التعبئة والجزئي قبل توسيع خط.",
      "تواصل مع الدعم مبكرًا إذا توقف خط بعد الوصف — واتساب والتذاكر يُداران لمشغّلين لا حلقات بوت فقط.",
    ],
  },
  {
    id: "contact",
    title: "تحدث مع الفريق",
    body: [
      `البريد ${SITE.email} أو واتساب ${SITE.whatsappDisplay} أو تيليغرام @${SITE.telegram}. للإيداعات راجع المدفوعات؛ لأسئلة المنتج راجع الأسئلة الشائعة وأدلة المدونة.`,
    ],
  },
];

const idPrivacy: LegalSection[] = [
  {
    id: "overview",
    title: "Ringkasan",
    body: [
      `Kebijakan Privasi ini menjelaskan bagaimana ${SITE.name} (“kami”) mengumpulkan, menggunakan, dan melindungi informasi saat Anda mengunjungi ${SITE.domain}, membuat akun, memesan, mengisi saldo, membuka tiket, atau menghubungi dukungan di WhatsApp/Telegram.`,
      "Kami merancang kebijakan ini untuk operator yang mengharapkan kejelasan — bukan kabut hukum. Kami tidak meminta kata sandi media sosial. Pesanan hanya memakai URL publik.",
    ],
  },
  {
    id: "data-we-collect",
    title: "Informasi yang kami kumpulkan",
    body: [
      "Data akun: nama pengguna, email, kata sandi ter-hash, kunci API (jika dibuat), bahasa pilihan, dan status akun.",
      "Data pesanan: ID layanan, tautan publik atau username yang Anda kirim, kuantitas, biaya, riwayat status, sisa, dan stempel waktu.",
      "Data pembayaran yang Anda kirim secara sukarela: metode, jumlah, referensi transaksi, tangkapan layar atau tautan bukti, dan catatan username. Nomor kartu tidak disimpan di server kami saat Anda membayar lewat pemroses pihak ketiga.",
      "Data dukungan: pesan tiket, korespondensi WhatsApp/Telegram, dan lampiran yang Anda pilih untuk dibagikan.",
      "Log teknis: alamat IP, browser/user-agent, wilayah perkiraan, dan peristiwa keamanan untuk menghentikan penyalahgunaan (login gagal, batas laju).",
    ],
  },
  {
    id: "how-we-use",
    title: "Cara kami menggunakan informasi",
    body: [
      "Menyediakan dan meningkatkan panel: mengautentikasi sesi, menampilkan saldo, memproses pesanan, menyinkronkan status dari penyedia hulu, dan mengkredit deposit terverifikasi.",
      "Berkomunikasi: mengirim pemberitahuan transaksional tentang deposit, masalah pesanan, atau peringatan keamanan. Email pemasaran bersifat opsional dan dapat ditolak.",
      "Mencegah penyalahgunaan: mendeteksi farming uji coba gratis, pola chargeback, pesanan spam duplikat, dan penyalahgunaan API.",
      "Mematuhi hukum: menanggapi permintaan hukum yang sah bila diperlukan.",
    ],
  },
  {
    id: "sharing",
    title: "Berbagi dengan pemroses dan penyedia",
    body: [
      "Pemasok SMM hulu hanya menerima yang diperlukan untuk memenuhi pesanan (tautan publik, kuantitas, parameter layanan). Mereka tidak boleh menerima kata sandi panel Anda.",
      "Jaringan pembayaran (PayPal, pemroses kripto, bank, Skrill, dll.) memproses dana di bawah kebijakan mereka sendiri. Kami menerima konfirmasi dan bukti yang Anda bagikan untuk pencocokan manual.",
      "Vendor hosting, email, dan analitik dapat memproses data teknis di bawah kontrak. Kami tidak menjual data pribadi ke broker.",
    ],
  },
  {
    id: "retention",
    title: "Retensi dan keamanan",
    body: [
      "Catatan akun dan pesanan disimpan selama akun aktif dan untuk periode wajar setelahnya demi sengketa, akuntansi, dan pencegahan penipuan.",
      "Anda dapat meminta penutupan akun dengan mengirim email ke dukungan. Beberapa catatan dapat tetap ada bila hukum atau pertahanan chargeback mengharuskannya.",
      "Kami memakai kata sandi ter-hash, HTTPS, kontrol akses pada alat admin, dan praktik hak istimewa minimal. Tidak ada metode yang sempurna — laporkan dugaan pelanggaran segera.",
    ],
  },
  {
    id: "rights",
    title: "Pilihan dan hak Anda",
    body: [
      "Akses/pembaruan: edit detail profil di dasbor jika tersedia, atau email kami untuk memperbaiki data akun.",
      "Ekspor/hapus: minta ringkasan data akun atau penghapusan tunduk pada penahanan hukum dan saldo/sengketa terbuka.",
      "Cookie: cookie esensial menjaga Anda tetap masuk. Jika kami menambahkan cookie analitik opsional nanti, kami akan mengungkapkannya di sini.",
      "Hak khusus wilayah (gaya GDPR/CCPA): hubungi kami untuk mengakses, memperbaiki, menghapus, atau keberatan bila berlaku. Kami merespons dalam jangka waktu wajar.",
    ],
  },
  {
    id: "children",
    title: "Anak-anak",
    body: [
      "Panel ditujukan untuk orang dewasa yang dapat membuat kontrak. Jika Anda yakin anak di bawah umur membuat akun, hubungi kami agar kami dapat meninjau dan menghapusnya.",
    ],
  },
  {
    id: "changes",
    title: "Perubahan pada kebijakan ini",
    body: [
      `Kami dapat memperbarui halaman ini seiring perubahan produk atau hukum. Tanggal “Terakhir diperbarui” di bagian atas Privasi mencerminkan revisi terbaru. Perubahan material juga dapat dicatat di dasbor atau lewat email.`,
    ],
  },
  {
    id: "contact",
    title: "Kontak",
    body: [
      `Pertanyaan privasi: ${SITE.email}. WhatsApp: ${SITE.whatsappDisplay}. Telegram: @${SITE.telegram}.`,
    ],
  },
];

const idTerms: LegalSection[] = [
  {
    id: "acceptance",
    title: "Penerimaan syarat",
    body: [
      `Dengan membuat akun atau menggunakan ${SITE.name} di ${SITE.domain}, Anda menyetujui Syarat Layanan ini. Jika tidak setuju, jangan gunakan layanan.`,
      "Anda harus secara hukum mampu membuat kontrak di yurisdiksi Anda. Anda bertanggung jawab mematuhi aturan platform Instagram, TikTok, YouTube, Telegram, dan jaringan mana pun yang Anda targetkan.",
    ],
  },
  {
    id: "accounts",
    title: "Akun dan kunci API",
    body: [
      "Jaga kredensial dan kunci API tetap rahasia. Anda bertanggung jawab atas tindakan di bawah akun Anda.",
      "Kami dapat menangguhkan atau menghentikan akun karena penyalahgunaan: farming uji coba gratis, chargeback, pesanan spam, credential stuffing, atau upaya merekayasa balik kredensial penyedia.",
      "Satu orang/bisnis tidak boleh membuat akun buangan tanpa henti untuk melewati batas penggunaan wajar paket gratis.",
    ],
  },
  {
    id: "orders",
    title: "Pesanan dan layanan",
    body: [
      "Deskripsi layanan (tarif, min/maks, waktu mulai, refill, drip-feed) bersifat indikatif dan dapat berubah saat pemasok memperbarui inventaris.",
      "Jangan buat pesanan duplikat untuk tautan dan layanan yang sama sementara yang lain masih diproses kecuali deskripsi mengizinkannya.",
      "Jangan pernah mengirim kata sandi. Hanya URL publik atau username yang diterima baris layanan.",
      "Pesanan parsial, dibatalkan, atau gagal dapat mengembalikan saldo yang tidak terpakai sesuai aturan layanan dan laporan pemasok. Jendela refill, jika ditawarkan, berlaku hanya seperti tertulis pada layanan itu.",
      "Kami adalah operator panel yang merutekan pesanan ke pemasok. Kami tidak menjamin peringkat organik, favor algoritma, atau metrik permanen di platform pihak ketiga.",
    ],
  },
  {
    id: "payments",
    title: "Pembayaran dan saldo",
    body: [
      "Deposit dikreditkan setelah verifikasi bukti pembayaran yang cocok dengan username Anda. Bukti palsu menjadi alasan penangguhan.",
      "Saldo tidak dapat dipindahkan antar pengguna kecuali kami secara eksplisit menyetujui migrasi.",
      "Chargeback atau sengketa pembayaran yang dibuka tanpa menghubungi dukungan terlebih dahulu dapat menyebabkan ban permanen dan hilangnya sisa saldo.",
      "Harga ditampilkan dalam USD kecuali dinyatakan lain. Pajak, jika ada, menjadi tanggung jawab Anda di wilayah Anda.",
    ],
  },
  {
    id: "api",
    title: "API reseller",
    body: [
      "API publik kompatibel PerfectPanel untuk services, add, status, dan balance. Batas laju dan aturan penggunaan wajar berlaku.",
      "Anda tidak boleh memakai API untuk menyerang infrastruktur, mengikis daftar pemasok proprietary untuk dijual ulang sebagai klon katalog kami tanpa otorisasi, atau membebani polling status.",
      "Anda tetap bertanggung jawab atas cara Anda menyajikan layanan kepada pelanggan sendiri, termasuk kebijakan pengembalian dana kepada mereka.",
    ],
  },
  {
    id: "prohibited",
    title: "Penggunaan terlarang",
    body: [
      "Konten ilegal, peniruan merek terlindungi di mana dilarang, distribusi malware, kampanye pelecehan, atau apa pun yang melanggar hukum yang berlaku.",
      "Mencoba mengakses akun pengguna lain, alat admin, atau kredensial penyedia.",
    ],
  },
  {
    id: "disclaimer",
    title: "Penafian dan tanggung jawab",
    body: [
      "Layanan disediakan “sebagaimana tersedia.” Platform dapat mengubah algoritma atau menghapus metrik tanpa pemberitahuan.",
      "Sejauh diizinkan hukum, tanggung jawab kami terbatas pada saldo yang tidak terpakai di akun Anda terkait pesanan yang disengketakan. Kami tidak bertanggung jawab atas hilangnya keuntungan, kerusakan reputasi, atau kerugian tidak langsung.",
    ],
  },
  {
    id: "changes-law",
    title: "Perubahan dan hal yang berlaku",
    body: [
      "Kami dapat memperbarui syarat ini; penggunaan berkelanjutan setelah tanggal pembaruan berarti penerimaan. Untuk perubahan material kami dapat memasang pemberitahuan di dasbor.",
      `Kontak untuk pemberitahuan hukum: ${SITE.email}. Saluran dukungan: WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}.`,
    ],
  },
];

const idAbout: LegalSection[] = [
  {
    id: "who",
    title: "Siapa kami",
    body: [
      `${SITE.name} adalah meja pemasaran media sosial yang dibangun operator di ${SITE.domain}. Kreator, toko, dan reseller mempertahankan saldo USD, memilih baris layanan untuk Instagram, TikTok, YouTube, Telegram dan lainnya, serta memesan hanya dengan tautan publik.`,
      "Berbeda dari tema skrip mirip yang mengirim paragraf beranda yang sama ke setiap domain niche, kami merawat situs ini, halaman SEO, paket uji coba, landing pembayaran, dan API kompatibel PerfectPanel di bawah satu merek.",
    ],
  },
  {
    id: "what-we-do",
    title: "Apa yang kami lakukan berbeda",
    body: [
      "Tarif per 1k dan min/maks transparan sebelum Anda mengonfirmasi biaya.",
      "Paket gratis agar Anda bisa menilai waktu mulai sebelum top-up besar.",
      "Pencocokan deposit manual dengan username + bukti untuk PayPal, kripto, Skrill, kartu, dan metode terdaftar lainnya — dengan landing pembayaran yang jelas.",
      "Status pesanan ditulis kembali ke dasbor (dan API) sehingga Anda tidak menebak dari tangkapan layar chat.",
      "API reseller (/api/v2) untuk toko yang ingin menjual dengan merek sendiri.",
    ],
  },
  {
    id: "who-for",
    title: "Untuk siapa SSMM Panel",
    body: [
      "Kreator yang butuh dorongan terkontrol pada postingan atau profil tanpa retainer agensi penuh.",
      "Toko kecil yang menguji engagement di sekitar peluncuran produk.",
      "Reseller yang menghubungkan inventaris lewat API sambil menjaga margin dan dukungan pelanggan di sisi mereka.",
    ],
  },
  {
    id: "safety",
    title: "Prinsip keamanan",
    body: [
      "Tidak ada pengumpulan kata sandi untuk Instagram, TikTok, YouTube, atau Telegram.",
      "Mulai kecil; lebih suka drip-feed bila layanan menawarkannya dan akun Anda baru.",
      "Baca catatan layanan untuk aturan refill dan parsial sebelum menskalakan sebuah baris.",
      "Hubungi dukungan lebih awal jika sebuah baris macet di luar deskripsi — WhatsApp dan tiket dilayani operator, bukan hanya loop bot.",
    ],
  },
  {
    id: "contact",
    title: "Bicara dengan tim",
    body: [
      `Email ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, atau Telegram @${SITE.telegram}. Untuk deposit lihat Pembayaran; untuk pertanyaan produk lihat FAQ dan panduan Blog.`,
    ],
  },
];

const bnPrivacy: LegalSection[] = [
  {
    id: "overview",
    title: "সারসংক্ষেপ",
    body: [
      `এই গোপনীয়তা নীতি ব্যাখ্যা করে ${SITE.name} (“আমরা”) কীভাবে তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করে যখন আপনি ${SITE.domain} ভিজিট করেন, অ্যাকাউন্ট তৈরি করেন, অর্ডার দেন, ব্যালেন্স টপ-আপ করেন, টিকিট খোলেন বা WhatsApp/Telegram-এ সাপোর্টে যোগাযোগ করেন।`,
      "আমরা এই নীতি লিখেছি অপারেটরদের জন্য যারা স্বচ্ছতা চান — আইনি কুয়াশা নয়। আমরা সোশ্যাল মিডিয়া পাসওয়ার্ড চাই না। অর্ডারে শুধু পাবলিক URL ব্যবহৃত হয়।",
    ],
  },
  {
    id: "data-we-collect",
    title: "আমরা যে তথ্য সংগ্রহ করি",
    body: [
      "অ্যাকাউন্ট ডেটা: ইউজারনেম, ইমেইল, হ্যাশ করা পাসওয়ার্ড, API কী (তৈরি হলে), পছন্দের ভাষা এবং অ্যাকাউন্ট স্ট্যাটাস।",
      "অর্ডার ডেটা: সার্ভিস ID, আপনার পাঠানো পাবলিক লিঙ্ক বা ইউজারনেম, পরিমাণ, চার্জ, স্ট্যাটাস ইতিহাস, বাকি এবং টাইমস্ট্যাম্প।",
      "আপনি স্বেচ্ছায় পাঠানো পেমেন্ট ডেটা: পদ্ধতি, পরিমাণ, লেনদেনের রেফারেন্স, স্ক্রিনশট বা প্রুফ লিঙ্ক এবং ইউজারনেম নোট। তৃতীয় পক্ষ প্রসেসর দিয়ে পে করলে কার্ড নম্বর আমাদের সার্ভারে সংরক্ষিত হয় না।",
      "সাপোর্ট ডেটা: টিকিট মেসেজ, WhatsApp/Telegram যোগাযোগ এবং আপনি শেয়ার করা অ্যাটাচমেন্ট।",
      "টেকনিক্যাল লগ: IP ঠিকানা, ব্রাউজার/user-agent, আনুমানিক অঞ্চল এবং অপব্যবহার রোধে প্রয়োজনীয় সিকিউরিটি ইভেন্ট (ব্যর্থ লগইন, রেট লিমিট)।",
    ],
  },
  {
    id: "how-we-use",
    title: "তথ্য কীভাবে ব্যবহার করি",
    body: [
      "প্যানেল সরবরাহ ও উন্নতি: সেশন প্রমাণীকরণ, ব্যালেন্স দেখানো, অর্ডার প্রসেস, আপস্ট্রিম প্রোভাইডার থেকে স্ট্যাটাস সিঙ্ক এবং যাচাইকৃত ডিপোজিট ক্রেডিট।",
      "যোগাযোগ: ডিপোজিট, অর্ডার সমস্যা বা সিকিউরিটি অ্যালার্ট নিয়ে লেনদেনমূলক নোটিশ। মার্কেটিং ইমেইল ঐচ্ছিক এবং প্রত্যাখ্যানযোগ্য।",
      "অপব্যবহার রোধ: ফ্রি-ট্রায়াল ফার্মিং, চার্জব্যাক প্যাটার্ন, ডুপ্লিকেট স্প্যাম অর্ডার এবং API অপব্যবহার শনাক্ত করা।",
      "আইন মেনে চলা: প্রয়োজনে বৈধ আইনি অনুরোধে সাড়া দেওয়া।",
    ],
  },
  {
    id: "sharing",
    title: "প্রসেসর ও প্রোভাইডারের সাথে শেয়ারিং",
    body: [
      "আপস্ট্রিম SMM সাপ্লায়ার শুধু অর্ডার পূরণে যা দরকার তা পায় (পাবলিক লিঙ্ক, পরিমাণ, সার্ভিস প্যারামিটার)। তারা আপনার প্যানেল পাসওয়ার্ড পাবে না।",
      "পেমেন্ট নেটওয়ার্ক (PayPal, ক্রিপ্টো প্রসেসর, ব্যাংক, Skrill ইত্যাদি) নিজ নীতিতে ফান্ড প্রসেস করে। ম্যানুয়াল ম্যাচিংয়ের জন্য আপনার শেয়ার করা নিশ্চিতকরণ ও প্রুফ আমরা পাই।",
      "হোস্টিং, ইমেইল ও অ্যানালিটিক্স ভেন্ডর চুক্তির অধীনে টেকনিক্যাল ডেটা প্রসেস করতে পারে। আমরা ব্যক্তিগত তথ্য ব্রোকারদের কাছে বিক্রি করি না।",
    ],
  },
  {
    id: "retention",
    title: "সংরক্ষণ ও নিরাপত্তা",
    body: [
      "অ্যাকাউন্ট ও অর্ডার রেকর্ড অ্যাকাউন্ট সক্রিয় থাকাকালীন এবং পরে বিরোধ, হিসাব ও জালিয়াতি প্রতিরোধের জন্য যুক্তিসঙ্গত সময় রাখা হয়।",
      "সাপোর্টে ইমেইল করে অ্যাকাউন্ট বন্ধের অনুরোধ করতে পারেন। আইন বা চার্জব্যাক প্রতিরক্ষায় কিছু রেকর্ড থাকতে পারে।",
      "আমরা হ্যাশ করা পাসওয়ার্ড, HTTPS, অ্যাডমিন টুলে অ্যাক্সেস কন্ট্রোল এবং ন্যূনতম সুবিধা ব্যবহার করি। কোনো পদ্ধতি নিখুঁত নয় — সন্দেহজনক লঙ্ঘন তৎক্ষণাৎ সাপোর্টে জানান।",
    ],
  },
  {
    id: "rights",
    title: "আপনার পছন্দ ও অধিকার",
    body: [
      "অ্যাক্সেস/আপডেট: ড্যাশবোর্ডে প্রোফাইল সম্পাদনা করুন, অথবা অ্যাকাউন্ট ডেটা সংশোধনে ইমেইল করুন।",
      "এক্সপোর্ট/ডিলিট: আইনি হোল্ড ও খোলা ব্যালেন্স/বিরোধ সাপেক্ষে অ্যাকাউন্ট ডেটার সারাংশ বা মুছে ফেলার অনুরোধ করুন।",
      "কুকি: প্রয়োজনীয় কুকি আপনাকে লগইন রাখে। পরে ঐচ্ছিক অ্যানালিটিক্স কুকি যোগ করলে এখানে প্রকাশ করব।",
      "অঞ্চলভিত্তিক অধিকার (GDPR/CCPA ধরনের): প্রয়োজ্য হলে অ্যাক্সেস, সংশোধন, মুছে ফেলা বা আপত্তির জন্য যোগাযোগ করুন। আমরা যুক্তিসঙ্গত সময়ে সাড়া দিই।",
    ],
  },
  {
    id: "children",
    title: "শিশু",
    body: [
      "প্যানেল চুক্তি করতে সক্ষম প্রাপ্তবয়স্কদের জন্য। কোনো নাবালক অ্যাকাউন্ট তৈরি করেছে বলে মনে হলে পর্যালোচনা ও সরাতে আমাদের জানান।",
    ],
  },
  {
    id: "changes",
    title: "এই নীতিতে পরিবর্তন",
    body: [
      `পণ্য বা আইন বদলালে আমরা এই পৃষ্ঠা আপডেট করতে পারি। গোপনীয়তা পৃষ্ঠার উপরের “সর্বশেষ আপডেট” তারিখ সর্বশেষ সংশোধন দেখায়। গুরুত্বপূর্ণ পরিবর্তন ড্যাশবোর্ডে বা ইমেইলেও জানানো যেতে পারে।`,
    ],
  },
  {
    id: "contact",
    title: "যোগাযোগ",
    body: [
      `গোপনীয়তা প্রশ্ন: ${SITE.email}. WhatsApp: ${SITE.whatsappDisplay}. Telegram: @${SITE.telegram}.`,
    ],
  },
];

const bnTerms: LegalSection[] = [
  {
    id: "acceptance",
    title: "শর্তাবলীর স্বীকৃতি",
    body: [
      `${SITE.domain}-এ ${SITE.name} অ্যাকাউন্ট তৈরি বা ব্যবহার করে আপনি এই সেবার শর্তাবলীতে সম্মত হন। অসম্মত হলে সেবা ব্যবহার করবেন না।`,
      "আপনার এখতিয়ারে আইনত চুক্তি করতে সক্ষম হতে হবে। Instagram, TikTok, YouTube, Telegram এবং আপনি যে নেটওয়ার্ক টার্গেট করেন তার প্ল্যাটফর্ম নিয়ম মেনে চলা আপনার দায়িত্ব।",
    ],
  },
  {
    id: "accounts",
    title: "অ্যাকাউন্ট ও API কী",
    body: [
      "ক্রেডেনশিয়াল ও API কী গোপন রাখুন। আপনার অ্যাকাউন্টের অধীনে নেওয়া পদক্ষেপের দায় আপনার।",
      "অপব্যবহারের জন্য আমরা অ্যাকাউন্ট স্থগিত বা বাতিল করতে পারি: ফ্রি-ট্রায়াল ফার্মিং, চার্জব্যাক, স্প্যাম অর্ডার, ক্রেডেনশিয়াল স্টাফিং বা প্রোভাইডার ক্রেডেনশিয়াল রিভার্স-ইঞ্জিনিয়ারিংয়ের চেষ্টা।",
      "এক ব্যক্তি/ব্যবসা ফ্রি প্যাকের ন্যায্য ব্যবহার সীমা এড়াতে অন্তহীন থ্রোঅ্যাওয়ে অ্যাকাউন্ট তৈরি করবে না।",
    ],
  },
  {
    id: "orders",
    title: "অর্ডার ও সার্ভিস",
    body: [
      "সার্ভিস বিবরণ (রেট, min/max, স্টার্ট টাইম, রিফিল, ড্রিপ-ফিড) নির্দেশক এবং সাপ্লায়ার ইনভেন্টরি আপডেট করলে বদলাতে পারে।",
      "বিবরণ অনুমতি না দিলে একই লিঙ্ক ও সার্ভিসের জন্য অন্য অর্ডার প্রসেসিং থাকাকালীন ডুপ্লিকেট অর্ডার দেবেন না।",
      "কখনো পাসওয়ার্ড জমা দেবেন না। শুধু সার্ভিস রো যে পাবলিক URL বা ইউজারনেম গ্রহণ করে।",
      "আংশিক, বাতিল বা ব্যর্থ অর্ডার সার্ভিসের নিয়ম ও সাপ্লায়ার রিপোর্ট অনুযায়ী অব্যবহৃত ব্যালেন্স ফেরত দিতে পারে। রিফিল উইন্ডো থাকলে শুধু সেই সার্ভিসে লেখা অনুযায়ী প্রযোজ্য।",
      "আমরা সাপ্লায়ারদের কাছে অর্ডার রাউট করা প্যানেল অপারেটর। তৃতীয় পক্ষ প্ল্যাটফর্মে অর্গানিক র‌্যাঙ্কিং, অ্যালগরিদম সুবিধা বা স্থায়ী মেট্রিক গ্যারান্টি দিই না।",
    ],
  },
  {
    id: "payments",
    title: "পেমেন্ট ও ব্যালেন্স",
    body: [
      "ইউজারনেমের সাথে মিলিয়ে পেমেন্ট প্রুফ যাচাইয়ের পর ডিপোজিট ক্রেডিট হয়। মিথ্যা প্রুফ স্থগিতকরণের কারণ।",
      "আমরা স্পষ্ট অনুমোদন না দিলে ব্যবহারকারীদের মধ্যে ব্যালেন্স হস্তান্তরযোগ্য নয়।",
      "আগে সাপোর্টে যোগাযোগ না করে চার্জব্যাক বা পেমেন্ট বিরোধ খুললে স্থায়ী ব্যান ও বাকি ব্যালেন্স বাজেয়াপ্ত হতে পারে।",
      "অন্যথায় উল্লেখ না থাকলে মূল্য USD-তে। কর থাকলে আপনার অঞ্চলে আপনার দায়িত্ব।",
    ],
  },
  {
    id: "api",
    title: "রিসেলার API",
    body: [
      "পাবলিক API services, add, status ও balance-এর জন্য PerfectPanel-সামঞ্জস্যপূর্ণ। রেট লিমিট ও ন্যায্য ব্যবহার প্রযোজ্য।",
      "ইনফ্রাস্ট্রাকচারে আক্রমণ, অনুমতি ছাড়া ক্যাটালগ ক্লোন হিসেবে সাপ্লায়ার তালিকা স্ক্র্যাপ, বা স্ট্যাটাস পোলিং ওভারলোড করতে API ব্যবহার করা যাবে না।",
      "নিজ গ্রাহকদের কাছে সার্ভিস উপস্থাপন ও তাদের রিফান্ড নীতিসহ দায় আপনারই থাকবে।",
    ],
  },
  {
    id: "prohibited",
    title: "নিষিদ্ধ ব্যবহার",
    body: [
      "অবৈধ কন্টেন্ট, নিষিদ্ধ স্থানে সুরক্ষিত ব্র্যান্ডের ছদ্মবেশ, ম্যালওয়্যার বিতরণ, হয়রানি অভিযান বা প্রযোজ্য আইন লঙ্ঘন করে এমন কিছু।",
      "অন্য ব্যবহারকারীর অ্যাকাউন্ট, অ্যাডমিন টুল বা প্রোভাইডার ক্রেডেনশিয়ালে প্রবেশের চেষ্টা।",
    ],
  },
  {
    id: "disclaimer",
    title: "দায়মুক্তি ও দায়বদ্ধতা",
    body: [
      "সেবা “যেমন উপলব্ধ” ভিত্তিতে দেওয়া হয়। প্ল্যাটফর্ম অ্যালগরিদম বদলাতে বা মেট্রিক সরিয়ে নিতে পারে নোটিশ ছাড়াই।",
      "আইন যতটুকু অনুমতি দেয়, আমাদের দায় বিতর্কিত অর্ডার-সম্পর্কিত আপনার অ্যাকাউন্টের অব্যবহৃত ব্যালেন্সে সীমাবদ্ধ। মুনাফা ক্ষতি, সুনাম ক্ষতি বা পরোক্ষ ক্ষতির জন্য আমরা দায়ী নই।",
    ],
  },
  {
    id: "changes-law",
    title: "পরিবর্তন ও প্রশাসনিক বিষয়",
    body: [
      "আমরা এই শর্তাবলী আপডেট করতে পারি; আপডেট তারিখের পর ব্যবহার চালিয়ে যাওয়া মানে স্বীকৃতি। গুরুত্বপূর্ণ পরিবর্তনে ড্যাশবোর্ডে নোটিশ দিতে পারি।",
      `আইনি নোটিশের জন্য যোগাযোগ: ${SITE.email}। সাপোর্ট চ্যানেল: WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}।`,
    ],
  },
];

const bnAbout: LegalSection[] = [
  {
    id: "who",
    title: "আমরা কারা",
    body: [
      `${SITE.name} ${SITE.domain}-এ অপারেটর-নির্মিত সোশ্যাল মিডিয়া মার্কেটিং ডেস্ক। ক্রিয়েটর, দোকান ও রিসেলার USD ব্যালেন্স রাখে; Instagram, TikTok, YouTube, Telegram ও আরও সার্ভিস লাইন বেছে নেয়; শুধু পাবলিক লিঙ্ক দিয়ে অর্ডার দেয়।`,
      "প্রতিটি নিশ ডোমেইনে একই হোমপেজ অনুচ্ছেদ পাঠানো ক্লোন স্ক্রিপ্ট থিমের মতো নয়—আমরা এই সাইট, SEO পৃষ্ঠা, ফ্রি ট্রায়াল প্যাক, পেমেন্ট ল্যান্ডিং এবং PerfectPanel-সামঞ্জস্যপূর্ণ API এক ব্র্যান্ডের অধীনে চালাই।",
    ],
  },
  {
    id: "what-we-do",
    title: "আমরা কীভাবে আলাদা",
    body: [
      "চার্জ নিশ্চিত করার আগে স্বচ্ছ ১কে রেট ও min/max।",
      "বড় টপ-আপের আগে স্টার্ট টাইম দেখতে ফ্রি প্যাক।",
      "PayPal, ক্রিপ্টো, Skrill, কার্ড ও তালিকাভুক্ত অন্য পদ্ধতির জন্য ইউজারনেম + প্রুফ দিয়ে ম্যানুয়াল ডিপোজিট ম্যাচিং — স্পষ্ট পেমেন্ট ল্যান্ডিংসহ।",
      "অর্ডার স্ট্যাটাস ড্যাশবোর্ডে (ও API-তে) লেখা হয়, চ্যাট স্ক্রিনশট থেকে অনুমান করতে হয় না।",
      "নিজ ব্র্যান্ডে বিক্রি করতে চাওয়া স্টোরের জন্য রিসেলার API (/api/v2)।",
    ],
  },
  {
    id: "who-for",
    title: "SSMM Panel কাদের জন্য",
    body: [
      "পূর্ণ এজেন্সি রিটেইনার ছাড়াই পোস্ট বা প্রোফাইলে নিয়ন্ত্রিত বাম্প চায় এমন ক্রিয়েটর।",
      "প্রোডাক্ট ড্রপের আশেপাশে এনগেজমেন্ট পরীক্ষা করা ছোট দোকান।",
      "মার্জিন ও গ্রাহক সাপোর্ট নিজের কাছে রেখে API দিয়ে ইনভেন্টরি সংযুক্ত করা রিসেলার।",
    ],
  },
  {
    id: "safety",
    title: "নিরাপত্তা নীতি",
    body: [
      "Instagram, TikTok, YouTube বা Telegram-এর জন্য পাসওয়ার্ড সংগ্রহ নেই।",
      "ছোট করে শুরু করুন; সার্ভিস দিলে এবং অ্যাকাউন্ট নতুন হলে ড্রিপ-ফিড পছন্দ করুন।",
      "লাইন স্কেল করার আগে রিফিল ও আংশিক নিয়মের জন্য সার্ভিস নোট পড়ুন।",
      "বিবরণের বাইরে লাইন আটকে গেলে আগে সাপোর্টে যোগাযোগ করুন — WhatsApp ও টিকিট অপারেটরদের জন্য স্টাফড, শুধু বট লুপ নয়।",
    ],
  },
  {
    id: "contact",
    title: "টিমের সাথে কথা বলুন",
    body: [
      `ইমেইল ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, অথবা Telegram @${SITE.telegram}। ডিপোজিটের জন্য পেমেন্টস দেখুন; প্রোডাক্ট প্রশ্নের জন্য FAQ ও ব্লগ গাইড দেখুন।`,
    ],
  },
];

const hiPrivacy: LegalSection[] = [
  {
    id: "overview",
    title: "अवलोकन",
    body: [
      `यह प्राइवेसी नीति बताती है कि ${SITE.name} (“हम”) कैसे जानकारी एकत्र, उपयोग और सुरक्षित करता है जब आप ${SITE.domain} पर आते हैं, अकाउंट बनाते हैं, ऑर्डर देते हैं, बैलेंस टॉप-अप करते हैं, टिकट खोलते हैं या WhatsApp/Telegram पर सपोर्ट से संपर्क करते हैं।`,
      "हमने यह नीति उन ऑपरेटर्स के लिए लिखी है जो स्पष्टता चाहते हैं — कानूनी धुंध नहीं। हम सोशल मीडिया पासवर्ड नहीं माँगते। ऑर्डर केवल पब्लिक URL इस्तेमाल करते हैं।",
    ],
  },
  {
    id: "data-we-collect",
    title: "हम जो जानकारी एकत्र करते हैं",
    body: [
      "अकाउंट डेटा: यूज़रनेम, ईमेल, हैश किया पासवर्ड, API कुंजी (यदि बनाई गई), पसंदीदा भाषा और अकाउंट स्टेटस।",
      "ऑर्डर डेटा: सर्विस ID, आपका पब्लिक लिंक या यूज़रनेम, मात्रा, चार्ज राशि, स्टेटस इतिहास, बची मात्रा और टाइमस्टैम्प।",
      "आप स्वेच्छा से भेजा पेमेंट डेटा: विधि, राशि, लेनदेन संदर्भ, स्क्रीनशॉट या प्रूफ लिंक और यूज़रनेम नोट। थर्ड-पार्टी प्रोसेसर से भुगतान पर कार्ड नंबर हमारे सर्वर पर संग्रहीत नहीं होते।",
      "सपोर्ट डेटा: टिकट संदेश, WhatsApp/Telegram पत्राचार और आपके साझा किए अटैचमेंट।",
      "तकनीकी लॉग: IP पता, ब्राउज़र/user-agent, अनुमानित क्षेत्र और दुरुपयोग रोकने के लिए सुरक्षा इवेंट (असफल लॉगिन, रेट लिमिट)।",
    ],
  },
  {
    id: "how-we-use",
    title: "जानकारी का उपयोग कैसे करते हैं",
    body: [
      "पैनल प्रदान और सुधार: सेशन प्रमाणीकरण, बैलेंस दिखाना, ऑर्डर प्रोसेस, अपस्ट्रीम प्रोवाइडर से स्टेटस सिंक और सत्यापित डिपॉज़िट क्रेडिट।",
      "संवाद: डिपॉज़िट, ऑर्डर समस्या या सुरक्षा अलर्ट पर लेनदेन नोटिस। मार्केटिंग ईमेल वैकल्पिक हैं और अस्वीकार किए जा सकते हैं।",
      "दुरुपयोग रोकना: फ्री-ट्रायल फार्मिंग, चार्जबैक पैटर्न, डुप्लिकेट स्पैम ऑर्डर और API दुरुपयोग का पता लगाना।",
      "कानून का पालन: आवश्यक होने पर वैध कानूनी अनुरोधों का जवाब देना।",
    ],
  },
  {
    id: "sharing",
    title: "प्रोसेसर और प्रोवाइडर के साथ साझाकरण",
    body: [
      "अपस्ट्रीम SMM सप्लायर को केवल ऑर्डर पूरा करने के लिए आवश्यक डेटा मिलता है (पब्लिक लिंक, मात्रा, सर्विस पैरामीटर)। उन्हें आपका पैनल पासवर्ड नहीं मिलना चाहिए।",
      "पेमेंट नेटवर्क (PayPal, क्रिप्टो प्रोसेसर, बैंक, Skrill आदि) अपनी नीतियों के तहत फंड प्रोसेस करते हैं। मैन्युअल मैचिंग के लिए आपके साझा किए पुष्टि और प्रूफ हमें मिलते हैं।",
      "होस्टिंग, ईमेल और एनालिटिक्स विक्रेता अनुबंध के तहत तकनीकी डेटा प्रोसेस कर सकते हैं। हम व्यक्तिगत डेटा ब्रोकरों को नहीं बेचते।",
    ],
  },
  {
    id: "retention",
    title: "रिटेंशन और सुरक्षा",
    body: [
      "अकाउंट और ऑर्डर रिकॉर्ड अकाउंट सक्रिय रहने तक और उसके बाद विवाद, लेखांकन और धोखाधड़ी रोकथाम के लिए उचित अवधि रखे जाते हैं।",
      "आप सपोर्ट को ईमेल कर अकाउंट बंद करने का अनुरोध कर सकते हैं। कानून या चार्जबैक रक्षा की आवश्यकता पर कुछ रिकॉर्ड रह सकते हैं।",
      "हम हैश किए पासवर्ड, HTTPS, एडमिन टूल पर एक्सेस कंट्रोल और न्यूनतम विशेषाधिकार उपयोग करते हैं। कोई विधि पूर्ण नहीं — संदिग्ध उल्लंघन तुरंत सपोर्ट को बताएँ।",
    ],
  },
  {
    id: "rights",
    title: "आपके विकल्प और अधिकार",
    body: [
      "एक्सेस/अपडेट: जहाँ उपलब्ध हो डैशबोर्ड में प्रोफ़ाइल संपादित करें, या अकाउंट डेटा सुधार के लिए ईमेल करें।",
      "एक्सपोर्ट/डिलीट: कानूनी होल्ड और खुले बैलेंस/विवाद के अधीन अकाउंट डेटा सारांश या हटाने का अनुरोध करें।",
      "कुकीज़: आवश्यक कुकीज़ आपको लॉगिन रखती हैं। बाद में वैकल्पिक एनालिटिक्स कुकी जोड़ेंगे तो यहाँ बताएँगे।",
      "क्षेत्र-विशिष्ट अधिकार (GDPR/CCPA शैली): जहाँ लागू हो एक्सेस, सुधार, हटाना या आपत्ति के लिए संपर्क करें। हम उचित समय में जवाब देते हैं।",
    ],
  },
  {
    id: "children",
    title: "नाबालिग",
    body: [
      "पैनल अनुबंध कर सकने वाले वयस्कों के लिए है। यदि आपको लगता है कि नाबालिग ने अकाउंट बनाया है, समीक्षा और हटाने के लिए संपर्क करें।",
    ],
  },
  {
    id: "changes",
    title: "इस नीति में बदलाव",
    body: [
      `उत्पाद या कानून बदलने पर हम यह पेज अपडेट कर सकते हैं। प्राइवेसी पेज के शीर्ष पर “अंतिम अपडेट” तिथि नवीनतम संशोधन दर्शाती है। महत्वपूर्ण बदलाव डैशबोर्ड या ईमेल से भी बताए जा सकते हैं।`,
    ],
  },
  {
    id: "contact",
    title: "संपर्क",
    body: [
      `प्राइवेसी प्रश्न: ${SITE.email}। WhatsApp: ${SITE.whatsappDisplay}। Telegram: @${SITE.telegram}।`,
    ],
  },
];

const hiTerms: LegalSection[] = [
  {
    id: "acceptance",
    title: "शर्तों की स्वीकृति",
    body: [
      `${SITE.domain} पर ${SITE.name} अकाउंट बनाकर या उपयोग करके आप इन सेवा शर्तों से सहमत होते हैं। असहमत हों तो सेवा का उपयोग न करें।`,
      "आपको अपने क्षेत्राधिकार में कानूनी रूप से अनुबंध करने योग्य होना चाहिए। Instagram, TikTok, YouTube, Telegram और आपके लक्षित नेटवर्क के प्लेटफ़ॉर्म नियमों का पालन आपकी ज़िम्मेदारी है।",
    ],
  },
  {
    id: "accounts",
    title: "अकाउंट और API कुंजियाँ",
    body: [
      "क्रेडेंशियल और API कुंजियाँ निजी रखें। आपके अकाउंट के तहत की गई कार्रवाइयों की ज़िम्मेदारी आपकी है।",
      "दुरुपयोग पर हम अकाउंट निलंबित या समाप्त कर सकते हैं: फ्री-ट्रायल फार्मिंग, चार्जबैक, स्पैम ऑर्डर, क्रेडेंशियल स्टफिंग या प्रोवाइडर क्रेडेंशियल रिवर्स-इंजीनियर करने के प्रयास।",
      "एक व्यक्ति/व्यवसाय फ्री पैक की उचित उपयोग सीमा बाईपास करने के लिए अंतहीन थ्रोअवे अकाउंट नहीं बनाएँ।",
    ],
  },
  {
    id: "orders",
    title: "ऑर्डर और सर्विस",
    body: [
      "सर्विस विवरण (रेट, min/max, स्टार्ट टाइम, रिफिल, ड्रिप-फीड) संकेतात्मक हैं और सप्लायर इन्वेंटरी अपडेट करने पर बदल सकते हैं।",
      "विवरण अनुमति न दे तो उसी लिंक और सर्विस के लिए दूसरा ऑर्डर प्रोसेसिंग रहते डुप्लिकेट ऑर्डर न दें।",
      "कभी पासवर्ड जमा न करें। केवल सर्विस पंक्ति द्वारा स्वीकृत पब्लिक URL या यूज़रनेम।",
      "आंशिक, रद्द या विफल ऑर्डर सर्विस नियमों और सप्लायर रिपोर्ट के अनुसार अव्यवहृत बैलेंस लौटा सकते हैं। रिफिल विंडो, जहाँ दी जाएँ, केवल उसी सर्विस पर लिखे अनुसार लागू होती हैं।",
      "हम सप्लायरों तक ऑर्डर रूट करने वाले पैनल ऑपरेटर हैं। थर्ड-पार्टी प्लेटफ़ॉर्म पर ऑर्गेनिक रैंकिंग, एल्गोरिदम पक्ष या स्थायी मेट्रिक की गारंटी नहीं देते।",
    ],
  },
  {
    id: "payments",
    title: "पेमेंट और बैलेंस",
    body: [
      "यूज़रनेम से मैच किए पेमेंट प्रूफ के सत्यापन के बाद डिपॉज़िट क्रेडिट होते हैं। झूठे प्रूफ निलंबन का आधार हैं।",
      "हम स्पष्ट रूप से माइग्रेशन स्वीकृत न करें तो उपयोगकर्ताओं के बीच बैलेंस हस्तांतरणीय नहीं है।",
      "पहले सपोर्ट से संपर्क किए बिना खोले चार्जबैक या पेमेंट विवाद स्थायी बैन और शेष बैलेंस ज़ब्ती का कारण बन सकते हैं।",
      "अन्यथा न कहा जाए तो कीमतें USD में हैं। कर, यदि हों, आपके क्षेत्र में आपकी ज़िम्मेदारी हैं।",
    ],
  },
  {
    id: "api",
    title: "रीसेलर API",
    body: [
      "पब्लिक API services, add, status और balance के लिए PerfectPanel-संगत है। रेट लिमिट और उचित उपयोग लागू होते हैं।",
      "आप API से इंफ्रास्ट्रक्चर पर हमला, बिना अनुमति हमारे कैटलॉग के क्लोन के रूप में प्रोपराइटरी सप्लायर सूचियाँ स्क्रैप, या स्टेटस पोलिंग ओवरलोड नहीं कर सकते।",
      "आप अपने ग्राहकों को सर्विस कैसे प्रस्तुत करते हैं — उनकी रिफंड नीति सहित — उसके लिए जिम्मेदार रहते हैं।",
    ],
  },
  {
    id: "prohibited",
    title: "निषिद्ध उपयोग",
    body: [
      "अवैध सामग्री, जहाँ निषिद्ध हो संरक्षित ब्रांड का प्रतिरूपण, मैलवेयर वितरण, उत्पीड़न अभियान या लागू कानून का उल्लंघन करने वाली कोई भी चीज़।",
      "अन्य उपयोगकर्ताओं के अकाउंट, एडमिन टूल या प्रोवाइडर क्रेडेंशियल तक पहुँचने का प्रयास।",
    ],
  },
  {
    id: "disclaimer",
    title: "अस्वीकरण और दायित्व",
    body: [
      "सर्विस “जैसी उपलब्ध” दी जाती हैं। प्लेटफ़ॉर्म बिना सूचना एल्गोरिदम बदल या मेट्रिक हटा सकते हैं।",
      "कानून जितनी अनुमति दे, हमारा दायित्व विवादित ऑर्डर से जुड़े आपके अकाउंट के अव्यवहृत बैलेंस तक सीमित है। खोए लाभ, प्रतिष्ठा क्षति या अप्रत्यक्ष हानि के लिए हम उत्तरदायी नहीं।",
    ],
  },
  {
    id: "changes-law",
    title: "बदलाव और शासन संबंधी बातें",
    body: [
      "हम ये शर्तें अपडेट कर सकते हैं; अपडेट तिथि के बाद निरंतर उपयोग स्वीकृति माना जाएगा। महत्वपूर्ण बदलावों पर हम डैशबोर्ड में नोटिस पोस्ट कर सकते हैं।",
      `कानूनी नोटिस के लिए संपर्क: ${SITE.email}। सपोर्ट चैनल: WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}।`,
    ],
  },
];

const hiAbout: LegalSection[] = [
  {
    id: "who",
    title: "हम कौन हैं",
    body: [
      `${SITE.name} ${SITE.domain} पर ऑपरेटर-निर्मित सोशल मीडिया मार्केटिंग डेस्क है। क्रिएटर, दुकानें और रीसेलर USD बैलेंस रखते हैं; Instagram, TikTok, YouTube, Telegram आदि के लिए सर्विस लाइन चुनते हैं; और केवल पब्लिक लिंक से ऑर्डर देते हैं।`,
      "हर निश डोमेन पर वही होमपेज पैराग्राफ भेजने वाले लुकलाइक स्क्रिप्ट थीम के विपरीत, हम इस साइट, SEO पेज, फ्री ट्रायल पैक, पेमेंट लैंडिंग और PerfectPanel-संगत API को एक ब्रांड के तहत चलाते हैं।",
    ],
  },
  {
    id: "what-we-do",
    title: "हम अलग क्या करते हैं",
    body: [
      "चार्ज पुष्टि से पहले पारदर्शी रेट-प्रति-1k और min/max।",
      "बड़े टॉप-अप से पहले स्टार्ट टाइम जाँचने के लिए फ्री पैक।",
      "PayPal, क्रिप्टो, Skrill, कार्ड और अन्य सूचीबद्ध विधियों के लिए यूज़रनेम + प्रूफ से मैन्युअल डिपॉज़िट मैचिंग — स्पष्ट पेमेंट लैंडिंग के साथ।",
      "ऑर्डर स्टेटस डैशबोर्ड (और API) में लिखे जाते हैं ताकि चैट स्क्रीनशॉट से अनुमान न लगाना पड़े।",
      "अपने ब्रांड से बेचने वाले स्टोर के लिए रीसेलर API (/api/v2)।",
    ],
  },
  {
    id: "who-for",
    title: "SSMM Panel किसके लिए है",
    body: [
      "बिना पूर्ण एजेंसी रिटेनर के पोस्ट या प्रोफ़ाइल पर नियंत्रित बंप चाहने वाले क्रिएटर।",
      "प्रोडक्ट ड्रॉप के आसपास एंगेजमेंट टेस्ट करने वाली छोटी दुकानें।",
      "मार्जिन और कस्टमर सपोर्ट अपने पास रखते हुए API से इन्वेंटरी जोड़ने वाले रीसेलर।",
    ],
  },
  {
    id: "safety",
    title: "सुरक्षा सिद्धांत",
    body: [
      "Instagram, TikTok, YouTube या Telegram के लिए पासवर्ड संग्रह नहीं।",
      "छोटे से शुरू करें; सर्विस दे तो और अकाउंट नया हो तो ड्रिप-फीड प्राथमिकता दें।",
      "लाइन स्केल करने से पहले रिफिल और आंशिक नियमों के लिए सर्विस नोट पढ़ें।",
      "विवरण से आगे लाइन अटक जाए तो जल्दी सपोर्ट से संपर्क करें — WhatsApp और टिकट ऑपरेटर्स के लिए स्टाफ्ड हैं, केवल बॉट लूप नहीं।",
    ],
  },
  {
    id: "contact",
    title: "टीम से बात करें",
    body: [
      `ईमेल ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, या Telegram @${SITE.telegram}। डिपॉज़िट के लिए Payments देखें; प्रोडक्ट प्रश्नों के लिए FAQ और ब्लॉग गाइड देखें।`,
    ],
  },
];

const map: Partial<Record<Locale, LegalBundle>> = {
  en: { privacy: enPrivacy, terms: enTerms, about: enAbout },
  tr: { privacy: trPrivacy, terms: trTerms, about: trAbout },
  es: { privacy: esPrivacy, terms: esTerms, about: esAbout },
  "pt-br": { privacy: ptBrPrivacy, terms: ptBrTerms, about: ptBrAbout },
  ar: { privacy: arPrivacy, terms: arTerms, about: arAbout },
  id: { privacy: idPrivacy, terms: idTerms, about: idAbout },
  bn: { privacy: bnPrivacy, terms: bnTerms, about: bnAbout },
  hi: { privacy: hiPrivacy, terms: hiTerms, about: hiAbout },
};

export function getLegalBundle(locale: Locale): LegalBundle {
  return map[locale] ?? map.en!;
}
