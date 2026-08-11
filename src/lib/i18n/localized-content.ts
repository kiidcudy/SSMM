import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";

export type FaqItem = { q: string; a: string };
export type PlatformItem = { id: string; title: string; body: string; href: string };
export type ContactBodies = { wa: string; tg: string; email: string };

type LocaleBundle = {
  platforms: PlatformItem[];
  homeFaqs: FaqItem[];
  extraFaqs: FaqItem[];
  contact: ContactBodies;
};

const en: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "Instagram",
      body: "Followers, likes, Reels views and story views. Paste a public profile or post link — no password needed.",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "TikTok",
      body: "Video views, likes and followers for public TikTok links. Give new videos a stronger start.",
      href: "/services",
    },
    {
      id: "youtube",
      title: "YouTube",
      body: "Views, likes and subscribers. Paste your video link, choose quantity, and track the order.",
      href: "/services",
    },
    {
      id: "telegram",
      title: "Telegram",
      body: "Channel members and post views for public links. Ideal for channels and communities.",
      href: "/services",
    },
    {
      id: "facebook",
      title: "Facebook",
      body: "Page likes, post likes and followers. Grow your Facebook presence with public links only.",
      href: "/services",
    },
    {
      id: "twitter",
      title: "Twitter / X",
      body: "Followers, likes and views for public posts. Support your X account with simple orders.",
      href: "/services",
    },
    {
      id: "spotify",
      title: "Spotify",
      body: "Plays, followers and playlist support. Boost your music reach with public links.",
      href: "/services",
    },
    {
      id: "twitch",
      title: "Twitch",
      body: "Followers and views for streamers. Help your channel look active before and during streams.",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "Why choose SSMM Panel?",
      a: "SSMM Panel is an affordable SMM panel with free trial packs, clear prices, easy PayPal and crypto top-ups, and real WhatsApp support across Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify and Twitch.",
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
      q: "How do I track my order?",
      a: "Open Orders in your panel to see live progress. If you need help, message support on WhatsApp or Telegram anytime.",
    },
  ],
  extraFaqs: [
    {
      q: "What happens if an order only partially completes?",
      a: "The status and remaining quantity update in Orders. Unused quantity may return to your balance depending on that service’s rules — check the service description before you order more.",
    },
    {
      q: "Which platforms can I order for?",
      a: "You can order for Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify and Twitch. Open Services after login to see live categories and prices.",
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
      a: "Privacy Policy and Terms of Service are linked in the footer. About Us explains how the panel is run. Read them before larger top-ups.",
    },
  ],
  contact: {
    wa: "Fastest channel for payment proofs and order questions.",
    tg: "Chat with support about orders and top-ups.",
    email: "Use email for account issues and formal requests.",
  },
};

const tr: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "Instagram",
      body: "Takipçi, beğeni, Reels ve story izlenme. Herkese açık profil veya gönderi linkini yapıştır — şifre gerekmez.",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "TikTok",
      body: "Video izlenme, beğeni ve takipçi. Yeni videona güçlü başlangıç veya hesabını büyütmek için uygun seçenekler.",
      href: "/services",
    },
    {
      id: "youtube",
      title: "YouTube",
      body: "İzlenme, beğeni ve abone. Video linkini yapıştır, adedi seç ve siparişini takip et.",
      href: "/services",
    },
    {
      id: "telegram",
      title: "Telegram",
      body: "Kanal üyesi ve gönderi izlenmesi. Duyuru kanalları ve topluluklar için görünür başlangıç.",
      href: "/services",
    },
    {
      id: "facebook",
      title: "Facebook",
      body: "Sayfa beğenisi, gönderi beğenisi ve takipçi. Facebook hesabını herkese açık linklerle büyüt.",
      href: "/services",
    },
    {
      id: "twitter",
      title: "Twitter / X",
      body: "Takipçi, beğeni ve izlenme. X hesabına basit siparişlerle destek ol.",
      href: "/services",
    },
    {
      id: "spotify",
      title: "Spotify",
      body: "Dinlenme, takipçi ve playlist desteği. Müziğinin görünürlüğünü artır.",
      href: "/services",
    },
    {
      id: "twitch",
      title: "Twitch",
      body: "Takipçi ve izlenme. Yayın öncesi ve sırasında kanalını daha aktif göster.",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "Neden SSMM Panel’i tercih etmeliyim?",
      a: "SSMM Panel; ücretsiz deneme, net fiyatlar, kolay PayPal/kripto yükleme ve gerçek WhatsApp desteği sunan bir SMM paneldir. Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify ve Twitch siparişlerini güvenle verebilirsin.",
    },
    {
      q: "Instagram veya TikTok şifremi paylaşmam gerekiyor mu?",
      a: "Hayır. Siparişler yalnızca herkese açık profil, gönderi veya video linki ister. Bir servis şifre isterse geç — bu panel öyle çalışmaz; destekten yaz.",
    },
    {
      q: "Büyük PayPal veya kripto yüklemesinden önce deneyebilir miyim?",
      a: "Evet. Ücretsiz paketlerle küçük adette teslimatı görürsün. Beğenirsen bakiye yükleyip aynı servisi yeniden sipariş edersin.",
    },
    {
      q: "Bakiye yüklemeleri nasıl tanımlanıyor?",
      a: "PayPal, kart, kripto, Skrill, Revolut, Payoneer, Paysafecard, banka havalesi, Binance Pay veya Cryptomus’tan birini seç; notuna kullanıcı adını yazıp ödemeyi gönder, kanıtı WhatsApp veya ticket ile ilet. Destek makbuzu eşleştirir, bakiyeyi günceller.",
    },
    {
      q: "Bu panelde drip-feed ne işe yarar?",
      a: "Servis destekliyorsa adedi günlere bölersin (örneğin her gün eşit beğeni) — hepsini tek seferde bırakmazsın. Aynı linkte daha yavaş, kademeli teslimat istiyorsan kullan.",
    },
    {
      q: "Siparişimin durumunu nasıl takip ederim?",
      a: "Panele girip Siparişler bölümünden ilerlemeyi anlık görebilirsin. Takılırsan WhatsApp veya Telegram’dan destek ekibine yazman yeterli.",
    },
  ],
  extraFaqs: [
    {
      q: "Sipariş yalnızca kısmen tamamlanırsa ne olur?",
      a: "Durum ve kalan adet Siparişler’de güncellenir. Kullanılmayan miktar o servisin kurallarına göre bakiyeye dönebilir — daha fazla sipariş vermeden önce açıklamaya bak.",
    },
    {
      q: "Hangi platformlar için sipariş verebilirim?",
      a: "Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify ve Twitch için sipariş verebilirsin. Canlı kategoriler ve fiyatlar için giriş yaptıktan sonra Servisler’i aç.",
    },
    {
      q: "Minimum yükleme var mı?",
      a: "Küçük ilk yüklemeler sorun değil. Tam minimumlar yönteme göre değişebilir — her ödemenin sayfasına ve paneldeki bakiye yükleme rehberine bak.",
    },
    {
      q: "Desteke nasıl ulaşırım?",
      a: `E-posta ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram} veya panelden ticket. Belirli bir sipariş için kullanıcı adını ve sipariş numaranı yaz.`,
    },
    {
      q: "Daha uzun rehberleri nerede okurum?",
      a: "Blog’da başlangıç anlatımları, Instagram sipariş notları, PayPal yükleme adımları ve ücretsiz–ücretli geçiş tavsiyeleri var.",
    },
    {
      q: "Yasal belgeler nerede?",
      a: "Gizlilik Politikası ve Kullanım Şartları alt menüde. Hakkımızda paneli nasıl işlettiğimizi anlatır. Daha büyük yüklemeden önce oku.",
    },
  ],
  contact: {
    wa: "Ödeme kanıtı ve sipariş soruları için en hızlı kanal.",
    tg: "Sipariş ve bakiye soruları için buradan yaz.",
    email: "Hesap sorunları ve resmi talepler için e-posta kullan.",
  },
};

const es: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "Instagram",
      body: "Seguidores, likes, vistas de Reels y stories. Pega el enlace público — sin contraseña.",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "TikTok",
      body: "Vistas, likes y seguidores. Ideal para dar un mejor arranque a videos nuevos.",
      href: "/services",
    },
    {
      id: "youtube",
      title: "YouTube",
      body: "Vistas, likes y suscriptores. Pega el enlace del video y sigue el pedido.",
      href: "/services",
    },
    {
      id: "telegram",
      title: "Telegram",
      body: "Miembros de canal y vistas de posts para canales y comunidades.",
      href: "/services",
    },
    {
      id: "facebook",
      title: "Facebook",
      body: "Me gusta de página, likes y seguidores con enlaces públicos.",
      href: "/services",
    },
    {
      id: "twitter",
      title: "Twitter / X",
      body: "Seguidores, likes y vistas para tu cuenta de X.",
      href: "/services",
    },
    {
      id: "spotify",
      title: "Spotify",
      body: "Reproducciones, seguidores y apoyo a playlists.",
      href: "/services",
    },
    {
      id: "twitch",
      title: "Twitch",
      body: "Seguidores y vistas para streamers y canales en vivo.",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "¿Por qué elegir SSMM Panel?",
      a: "SSMM Panel es un panel SMM asequible con pruebas gratis, precios claros, recargas fáciles y soporte WhatsApp en Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify y Twitch.",
    },
    {
      q: "¿Tengo que compartir mi contraseña de Instagram o TikTok?",
      a: "No. Los pedidos solo usan URL pública de perfil, post o video. Si un servicio pide contraseña, sáltalo y abre un ticket — así no trabaja este panel.",
    },
    {
      q: "¿Puedo probar un servicio antes de un top-up grande con PayPal o crypto?",
      a: "Sí. Los packs gratis existen para ver tiempo de inicio y patrón de entrega en cantidad chica. Cuando la línea se comporte como esperas, fondea la billetera y vuelve a pedir el mismo ID de servicio.",
    },
    {
      q: "¿Cómo se acreditan los top-ups de saldo?",
      a: "Elige PayPal, tarjeta, crypto, Skrill, Revolut, Payoneer, Paysafecard, transferencia, Binance Pay o Cryptomus; envía el pago con tu usuario en la nota y comparte el comprobante por WhatsApp o ticket. Soporte cruza el recibo y actualiza el saldo.",
    },
    {
      q: "¿Qué hace el drip-feed en este panel?",
      a: "Si el servicio lo permite, divides la cantidad en varios días (por ejemplo likes diarios iguales) en vez de soltar todo de un golpe. Úsalo cuando quieras entrega más lenta y escalonada en el mismo link.",
    },
    {
      q: "¿Cómo sé si mi pedido está funcionando?",
      a: "Abre Pedidos en el panel. Verás si está en espera, en proceso, parcial o terminado — sin adivinar con capturas del chat.",
    },
  ],
  extraFaqs: [
    {
      q: "¿Qué pasa si un pedido solo se completa en parte?",
      a: "El status y remains se actualizan desde el feed del proveedor. La cantidad no usada puede volver al saldo según las reglas de parcial/cancelación de ese servicio — léelas antes de escalar.",
    },
    {
      q: "¿Para qué plataformas puedo pedir?",
      a: "Puedes pedir para Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify y Twitch. Abre Servicios tras iniciar sesión para ver categorías y precios en vivo.",
    },
    {
      q: "¿Hay un depósito mínimo?",
      a: "Los primeros depósitos pequeños están bien. Los mínimos exactos pueden variar por método — mira cada página de Payments y Add funds en el panel.",
    },
    {
      q: "¿Cómo contacto a soporte?",
      a: `Email ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}, o abre un ticket desde el panel. Incluye usuario e ID del pedido si preguntas por un run concreto.`,
    },
    {
      q: "¿Dónde leo guías más largas?",
      a: "En el Blog hay explicaciones para principiantes, notas de pedidos en Instagram, pasos de depósito PayPal y consejos free vs paid. Incluyen tablas, FAQ y links a Services y Payments.",
    },
    {
      q: "¿Dónde están los documentos legales?",
      a: "Política de Privacidad y Términos de Servicio están en el footer. About Us explica cómo se opera el panel. Léelos antes de recargas grandes.",
    },
  ],
  contact: {
    wa: "El canal más rápido para comprobantes de pago y dudas de pedidos.",
    tg: "Chatea con soporte sobre pedidos y recargas.",
    email: "Usa el email para temas de cuenta y solicitudes formales.",
  },
};

const ptBr: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "Instagram",
      body: "Seguidores, curtidas, views de Reels e stories. Cole o link público — sem senha.",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "TikTok",
      body: "Views, curtidas e seguidores. Começo mais forte para vídeos novos.",
      href: "/services",
    },
    {
      id: "youtube",
      title: "YouTube",
      body: "Views, curtidas e inscritos. Cole o link do vídeo e acompanhe o pedido.",
      href: "/services",
    },
    {
      id: "telegram",
      title: "Telegram",
      body: "Membros de canal e views de posts para canais e comunidades.",
      href: "/services",
    },
    {
      id: "facebook",
      title: "Facebook",
      body: "Curtidas de página, likes e seguidores com links públicos.",
      href: "/services",
    },
    {
      id: "twitter",
      title: "Twitter / X",
      body: "Seguidores, curtidas e views para sua conta no X.",
      href: "/services",
    },
    {
      id: "spotify",
      title: "Spotify",
      body: "Plays, seguidores e apoio a playlists.",
      href: "/services",
    },
    {
      id: "twitch",
      title: "Twitch",
      body: "Seguidores e views para streamers e canais ao vivo.",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "Por que escolher o SSMM Panel?",
      a: "O SSMM Panel é um painel SMM acessível com testes grátis, preços claros, recargas fáceis e suporte WhatsApp em Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify e Twitch.",
    },
    {
      q: "Preciso compartilhar a senha do Instagram ou TikTok?",
      a: "Não. Os pedidos usam só URL pública de perfil, post ou vídeo. Se algum serviço pedir senha, pule e abra um ticket — não é assim que este painel funciona.",
    },
    {
      q: "Posso testar um serviço antes de um top-up grande via PayPal ou crypto?",
      a: "Sim. Os packs grátis existem pra você ver tempo de início e padrão de entrega numa quantidade pequena. Quando a linha se comportar como você espera, abasteça a carteira e peça de novo o mesmo ID de serviço.",
    },
    {
      q: "Como os top-ups de saldo são creditados?",
      a: "Escolha PayPal, cartão, crypto, Skrill, Revolut, Payoneer, Paysafecard, transferência, Binance Pay ou Cryptomus; envie o pagamento com seu username na nota e mande o comprovante no WhatsApp ou num ticket. O suporte cruza o recibo e atualiza o saldo.",
    },
    {
      q: "O que o drip-feed faz neste painel?",
      a: "Quando o serviço permite, você divide a quantidade em vários dias (por exemplo curtidas iguais por dia) em vez de jogar tudo de uma vez. Use quando quiser entrega mais lenta e escalonada no mesmo link.",
    },
    {
      q: "Como sei se meu pedido está funcionando?",
      a: "Abra Pedidos no painel. Você vê se está aguardando, em andamento, parcial ou concluído — sem adivinhar por prints do chat.",
    },
  ],
  extraFaqs: [
    {
      q: "O que acontece se um pedido só completar parcialmente?",
      a: "Status e remains atualizam pelo feed do fornecedor. A quantidade não usada pode voltar ao saldo conforme as regras de parcial/cancelamento daquele serviço — confira a descrição antes de escalar.",
    },
    {
      q: "Para quais plataformas posso pedir?",
      a: "Você pode pedir para Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify e Twitch. Abra Serviços após o login para ver categorias e preços ao vivo.",
    },
    {
      q: "Tem depósito mínimo?",
      a: "Primeiros depósitos pequenos são bem-vindos. Os mínimos exatos podem variar por método — veja cada página de Payments e o Add funds no painel.",
    },
    {
      q: "Como falo com o suporte?",
      a: `E-mail ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}, ou abra um ticket no painel. Inclua username e ID do pedido quando for sobre um run específico.`,
    },
    {
      q: "Onde leio guias mais longos?",
      a: "No Blog tem explicações pra iniciantes, notas de pedido no Instagram, passos de depósito PayPal e dicas free vs pago. Os artigos trazem tabelas, FAQ e links pra Services e Payments.",
    },
    {
      q: "Onde ficam os documentos legais?",
      a: "Política de Privacidade e Termos de Serviço estão no footer. About Us explica como o painel é operado. Leia antes de recargas maiores.",
    },
  ],
  contact: {
    wa: "Canal mais rápido pra comprovantes de pagamento e dúvidas de pedido.",
    tg: "Fale com o suporte sobre pedidos e recargas.",
    email: "Use o e-mail pra problemas de conta e pedidos formais.",
  },
};

const ar: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "إنستغرام",
      body: "متابعون وإعجابات ومشاهدات ريلز وستوريز. رابط عام فقط — بلا كلمة مرور.",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "تيك توك",
      body: "مشاهدات وإعجابات ومتابعون. بداية أقوى للفيديوهات الجديدة.",
      href: "/services",
    },
    {
      id: "youtube",
      title: "يوتيوب",
      body: "مشاهدات وإعجابات ومشتركون. الصق رابط الفيديو وتابع الطلب.",
      href: "/services",
    },
    {
      id: "telegram",
      title: "تيليغرام",
      body: "أعضاء القنوات ومشاهدات المنشورات للقنوات والمجتمعات.",
      href: "/services",
    },
    {
      id: "facebook",
      title: "فيسبوك",
      body: "إعجابات الصفحة والمنشورات والمتابعون بروابط عامة.",
      href: "/services",
    },
    {
      id: "twitter",
      title: "تويتر / X",
      body: "متابعون وإعجابات ومشاهدات لحسابك على X.",
      href: "/services",
    },
    {
      id: "spotify",
      title: "سبوتيفاي",
      body: "تشغيلات ومتابعون ودعم قوائم التشغيل.",
      href: "/services",
    },
    {
      id: "twitch",
      title: "تويتش",
      body: "متابعون ومشاهدات للبث المباشر والقنوات.",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "لماذا أختار SSMM Panel؟",
      a: "SSMM Panel لوحة SMM مناسبة بأسعار واضحة وتجارب مجانية وشحن سهل ودعم واتساب لإنستغرام وتيك توك ويوتيوب وتيليغرام وفيسبوك وتويتر/X وسبوتيفاي وتويتش.",
    },
    {
      q: "هل أحتاج لمشاركة كلمة مرور إنستغرام أو تيك توك؟",
      a: "لا. الطلبات تستخدم فقط رابط ملف أو منشور أو فيديو عام. إن طلبت خدمة كلمة مرور، تجاوزها وافتح تذكرة — هذا ليس أسلوب عمل اللوحة.",
    },
    {
      q: "هل يمكنني التجربة قبل شحن كبير عبر PayPal أو العملات الرقمية؟",
      a: "نعم. الحزم المجانية موجودة لترى وقت البدء ونمط التسليم بكمية صغيرة. عندما يتصرّف الخط كما تتوقع، اشحن المحفظة وأعد طلب نفس معرّف الخدمة.",
    },
    {
      q: "كيف يُضاف رصيد الشحن؟",
      a: "اختر PayPal أو البطاقة أو العملات الرقمية أو Skrill أو Revolut أو Payoneer أو Paysafecard أو التحويل البنكي أو Binance Pay أو Cryptomus، أرسل الدفع مع اسم المستخدم في الملاحظة، ثم شارك الإثبات عبر واتساب أو تذكرة. الدعم يطابق الإيصال ويحدّث الرصيد.",
    },
    {
      q: "ماذا يفعل التغذية التدريجية (drip-feed) في هذه اللوحة؟",
      a: "عندما تدعم الخدمة drip-feed، تقسّم الكمية على أيام (مثل إعجابات يومية متساوية) بدل إسقاط كل شيء دفعة واحدة. استخدمها عندما تريد تسليمًا أبطأ ومتدرجًا على نفس الرابط.",
    },
    {
      q: "كيف أعرف أن طلبي يعمل؟",
      a: "افتح الطلبات في اللوحة. ترى إن كان بانتظار أو قيد التنفيذ أو جزئيًا أو مكتملًا — بلا تخمين من لقطات الشات.",
    },
  ],
  extraFaqs: [
    {
      q: "ماذا يحدث إذا اكتمل الطلب جزئيًا فقط؟",
      a: "تتحدّث الحالة والمتبقي من تغذية المورّد. قد تعود الكمية غير المستخدمة إلى الرصيد وفق قواعد الجزئي/الإلغاء لتلك الخدمة — راجع الوصف قبل التوسّع.",
    },
    {
      q: "ما المنصات التي يمكنني الطلب لها؟",
      a: "يمكنك الطلب لإنستغرام وتيك توك ويوتيوب وتيليغرام وفيسبوك وتويتر/X وسبوتيفاي وتويتش. افتح الخدمات بعد تسجيل الدخول لترى الفئات والأسعار.",
    },
    {
      q: "هل يوجد حد أدنى للإيداع؟",
      a: "الإيداعات الأولى الصغيرة مرحّب بها. الحدود الدنيا الدقيقة قد تختلف حسب طريقة الدفع — راجع صفحة كل طريقة في Payments وAdd funds في اللوحة.",
    },
    {
      q: "كيف أتواصل مع الدعم؟",
      a: `البريد ${SITE.email}، واتساب ${SITE.whatsappDisplay}، تيليغرام @${SITE.telegram}، أو افتح تذكرة من اللوحة. أدرج اسم المستخدم ومعرّف الطلب عند السؤال عن تشغيل معيّن.`,
    },
    {
      q: "أين أقرأ أدلة أطول؟",
      a: "زُر المدونة لشروحات المبتدئين وملاحظات طلب إنستغرام وخطوات إيداع PayPal ونصائح المجاني مقابل المدفوع. المقالات تتضمن جداول وأسئلة شائعة وروابط داخلية إلى Services وPayments.",
    },
    {
      q: "أين المستندات القانونية؟",
      a: "سياسة الخصوصية وشروط الخدمة في التذييل. صفحة من نحن تشرح كيف تُدار اللوحة. اقرأها قبل الشحنات الأكبر.",
    },
  ],
  contact: {
    wa: "أسرع قناة لإثباتات الدفع وأسئلة الطلبات.",
    tg: "تحدث مع الدعم حول الطلبات وشحن الرصيد.",
    email: "استخدم البريد لمشاكل الحساب والطلبات الرسمية.",
  },
};

const id: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "Instagram",
      body: "Followers, likes, views Reels dan story. Tempel tautan publik — tanpa kata sandi.",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "TikTok",
      body: "Views, likes, dan followers. Awal lebih kuat untuk video baru.",
      href: "/services",
    },
    {
      id: "youtube",
      title: "YouTube",
      body: "Views, likes, dan subscribers. Tempel tautan video dan pantau pesanan.",
      href: "/services",
    },
    {
      id: "telegram",
      title: "Telegram",
      body: "Member channel dan views post untuk channel dan komunitas.",
      href: "/services",
    },
    {
      id: "facebook",
      title: "Facebook",
      body: "Like halaman, like post, dan followers dengan tautan publik.",
      href: "/services",
    },
    {
      id: "twitter",
      title: "Twitter / X",
      body: "Followers, likes, dan views untuk akun X Anda.",
      href: "/services",
    },
    {
      id: "spotify",
      title: "Spotify",
      body: "Plays, followers, dan dukungan playlist.",
      href: "/services",
    },
    {
      id: "twitch",
      title: "Twitch",
      body: "Followers dan views untuk streamer dan channel live.",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "Mengapa memilih SSMM Panel?",
      a: "SSMM Panel adalah panel SMM terjangkau dengan uji coba gratis, harga jelas, top-up mudah, dan dukungan WhatsApp untuk Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify, dan Twitch.",
    },
    {
      q: "Apakah saya harus bagikan password Instagram atau TikTok?",
      a: "Tidak. Order hanya memakai URL publik profil, post, atau video. Kalau ada layanan yang minta password, lewati dan buka ticket — panel ini tidak bekerja seperti itu.",
    },
    {
      q: "Bisa coba dulu sebelum top-up PayPal atau crypto besar?",
      a: "Bisa. Paket gratis ada supaya kamu lihat waktu mulai dan pola delivery di jumlah kecil. Kalau barisnya sesuai harapan, isi saldo dan pesan ulang service ID yang sama.",
    },
    {
      q: "Bagaimana top-up saldo dikreditkan?",
      a: "Pilih PayPal, kartu, crypto, Skrill, Revolut, Payoneer, Paysafecard, transfer bank, Binance Pay, atau Cryptomus; kirim pembayaran dengan username di catatan, lalu bagikan bukti lewat WhatsApp atau ticket. Support mencocokkan struk dan memperbarui saldo.",
    },
    {
      q: "Apa fungsi drip-feed di panel ini?",
      a: "Kalau layanan mendukung drip-feed, kamu membagi kuantitas ke beberapa hari (misalnya likes harian yang sama) alih-alih menumpahkan semuanya sekaligus. Pakai saat ingin delivery lebih lambat dan bertahap di link yang sama.",
    },
    {
      q: "Bagaimana saya tahu pesanan saya berjalan?",
      a: "Buka Pesanan di panel. Anda melihat apakah menunggu, diproses, sebagian, atau selesai — tanpa menebak dari tangkapan layar chat.",
    },
  ],
  extraFaqs: [
    {
      q: "Apa yang terjadi jika order hanya selesai sebagian?",
      a: "Status dan remains diperbarui dari feed supplier. Kuantitas yang belum terpakai bisa kembali ke saldo sesuai aturan partial/cancel layanan itu — cek deskripsi sebelum scale.",
    },
    {
      q: "Platform apa saja yang bisa diorder?",
      a: "Anda bisa memesan untuk Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify, dan Twitch. Buka Layanan setelah login untuk kategori dan harga yang live.",
    },
    {
      q: "Ada deposit minimum?",
      a: "Deposit pertama yang kecil diperbolehkan. Minimum pasti bisa beda per metode — lihat tiap halaman Payments dan Add funds di dashboard.",
    },
    {
      q: "Bagaimana menghubungi support?",
      a: `Email ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}, atau buka ticket dari dashboard. Sertakan username dan order ID kalau bertanya soal run tertentu.`,
    },
    {
      q: "Di mana baca panduan yang lebih panjang?",
      a: "Kunjungi Blog untuk penjelasan pemula, catatan order Instagram, langkah deposit PayPal, dan saran free vs berbayar. Artikelnya punya tabel, FAQ, serta tautan ke Services dan Payments.",
    },
    {
      q: "Di mana dokumen legal?",
      a: "Kebijakan Privasi dan Syarat Layanan ada di footer. About Us menjelaskan cara panel dijalankan. Baca sebelum top-up yang lebih besar.",
    },
  ],
  contact: {
    wa: "Kanal tercepat untuk bukti pembayaran dan pertanyaan order.",
    tg: "Chat dengan support soal pesanan dan top-up.",
    email: "Pakai email untuk masalah akun dan permintaan resmi.",
  },
};

const bn: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "ইনস্টাগ্রাম",
      body: "ফলোয়ার, লাইক, Reels ও স্টোরি ভিউ। পাবলিক লিংক পেস্ট করুন — পাসওয়ার্ড লাগে না।",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "টিকটক",
      body: "ভিডিও ভিউ, লাইক ও ফলোয়ার। নতুন ভিডিওর জন্য শক্তিশালী শুরু।",
      href: "/services",
    },
    {
      id: "youtube",
      title: "ইউটিউব",
      body: "ভিউ, লাইক ও সাবস্ক্রাইবার। লিংক পেস্ট করে অর্ডার ট্র্যাক করুন।",
      href: "/services",
    },
    {
      id: "telegram",
      title: "টেলিগ্রাম",
      body: "চ্যানেল মেম্বার ও পোস্ট ভিউ — চ্যানেল ও কমিউনিটির জন্য।",
      href: "/services",
    },
    {
      id: "facebook",
      title: "ফেসবুক",
      body: "পেজ লাইক, পোস্ট লাইক ও ফলোয়ার — পাবলিক লিংক দিয়ে।",
      href: "/services",
    },
    {
      id: "twitter",
      title: "টুইটার / X",
      body: "ফলোয়ার, লাইক ও ভিউ — X অ্যাকাউন্টের জন্য।",
      href: "/services",
    },
    {
      id: "spotify",
      title: "স্পটিফাই",
      body: "প্লে, ফলোয়ার ও প্লেলিস্ট সাপোর্ট।",
      href: "/services",
    },
    {
      id: "twitch",
      title: "টুইচ",
      body: "ফলোয়ার ও ভিউ — স্ট্রিমার ও লাইভ চ্যানেলের জন্য।",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "কেন SSMM Panel বেছে নেবেন?",
      a: "SSMM Panel সাশ্রয়ী একটি SMM প্যানেল — ফ্রি ট্রায়াল, স্পষ্ট দাম, সহজ টপ-আপ ও WhatsApp সাপোর্টসহ ইনস্টাগ্রাম, টিকটক, ইউটিউব, টেলিগ্রাম, ফেসবুক, টুইটার/X, স্পটিফাই ও টুইচ।",
    },
    {
      q: "Instagram বা TikTok পাসওয়ার্ড শেয়ার করতে হবে?",
      a: "না। অর্ডারে শুধু পাবলিক প্রোফাইল, পোস্ট বা ভিডিও URL লাগে। কোনো সার্ভিস পাসওয়ার্ড চাইলে স্কিপ করুন আর টিকেট খুলুন — এই প্যানেল এভাবে কাজ করে না।",
    },
    {
      q: "বড় PayPal বা ক্রিপ্টো টপ-আপের আগে ট্রাই করা যায়?",
      a: "হ্যাঁ। ফ্রি প্যাক দিয়ে ছোট কোয়ান্টিটিতে স্টার্ট টাইম আর ডেলিভারি প্যাটার্ন দেখতে পারেন। লাইন ঠিকমতো চললে ওয়ালেট ফান্ড করে একই সার্ভিস ID আবার অর্ডার করুন।",
    },
    {
      q: "ব্যালেন্স টপ-আপ কীভাবে ক্রেডিট হয়?",
      a: "PayPal, কার্ড, ক্রিপ্টো, Skrill, Revolut, Payoneer, Paysafecard, ব্যাংক ট্রান্সফার, Binance Pay বা Cryptomus বেছে নিন; নোটে ইউজারনেম দিয়ে পেমেন্ট পাঠান, তারপর WhatsApp বা টিকেটে প্রুফ দিন। সাপোর্ট রসিদ মিলিয়ে ব্যালেন্স আপডেট করে।",
    },
    {
      q: "এই প্যানেলে drip-feed কী করে?",
      a: "সার্ভিস সাপোর্ট করলে কোয়ান্টিটি দিনে ভাগ করেন (যেমন প্রতিদিন সমান লাইক) — এক ঝটকায় সব ফেলে দেন না। একই লিংকে ধীর, ধাপে ধাপে ডেলিভারি চাইলে ব্যবহার করুন।",
    },
    {
      q: "অর্ডার কাজ করছে কিনা কীভাবে বুঝব?",
      a: "প্যানেলে অর্ডার খুলুন। অপেক্ষায়, চলছে, আংশিক নাকি শেষ — সেটাই দেখবেন; চ্যাট স্ক্রিনশট থেকে অনুমান লাগবে না।",
    },
  ],
  extraFaqs: [
    {
      q: "অর্ডার শুধু আংশিক সম্পন্ন হলে কী হয়?",
      a: "স্ট্যাটাস ও remains সাপ্লায়ার ফিড থেকে আপডেট হয়। অব্যবহৃত কোয়ান্টিটি সেই সার্ভিসের partial/cancel নিয়ম অনুযায়ী ব্যালেন্সে ফিরতে পারে — স্কেল করার আগে বর্ণনা দেখুন।",
    },
    {
      q: "কোন কোন প্ল্যাটফর্মের জন্য অর্ডার করা যায়?",
      a: "ইনস্টাগ্রাম, টিকটক, ইউটিউব, টেলিগ্রাম, ফেসবুক, টুইটার/X, স্পটিফাই ও টুইচে অর্ডার করা যায়। লাইভ ক্যাটাগরি ও দাম দেখতে লগইনের পর সার্ভিস খুলুন।",
    },
    {
      q: "মিনিমাম ডিপোজিট আছে?",
      a: "ছোট প্রথম ডিপোজিট স্বাগতম। ঠিক মিনিমাম মেথডভেদে বদলাতে পারে — প্রতিটি Payments ল্যান্ডিং আর ড্যাশবোর্ডের Add funds দেখুন।",
    },
    {
      q: "সাপোর্টে কীভাবে যোগাযোগ করব?",
      a: `ইমেইল ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}, অথবা ড্যাশবোর্ড থেকে টিকেট। নির্দিষ্ট রান নিয়ে জিজ্ঞাসায় ইউজারনেম ও অর্ডার ID দিন।`,
    },
    {
      q: "লম্বা গাইড কোথায় পড়ব?",
      a: "Blog-এ বিগিনার ব্যাখ্যা, Instagram অর্ডার নোট, PayPal ডিপোজিট ধাপ আর ফ্রি বনাম পেইড আপগ্রেড পরামর্শ আছে। আর্টিকেলে টেবিল, FAQ আর Services/Payments লিংকও থাকে।",
    },
    {
      q: "লিগ্যাল ডকুমেন্ট কোথায়?",
      a: "Privacy Policy ও Terms of Service ফুটারে লিংক করা। About Us প্যানেল কীভাবে চলে তা ব্যাখ্যা করে। বড় টপ-আপের আগে পড়ুন।",
    },
  ],
  contact: {
    wa: "পেমেন্ট প্রুফ ও অর্ডার প্রশ্নের জন্য সবচেয়ে দ্রুত চ্যানেল।",
    tg: "অর্ডার ও টপ-আপ নিয়ে সাপোর্টের সাথে চ্যাট করুন।",
    email: "অ্যাকাউন্ট সমস্যা ও আনুষ্ঠানিক অনুরোধের জন্য ইমেইল ব্যবহার করুন।",
  },
};

const hi: LocaleBundle = {
  platforms: [
    {
      id: "instagram",
      title: "Instagram",
      body: "फॉलोअर्स, लाइक्स, Reels और स्टोरी व्यूज़। पब्लिक लिंक पेस्ट करें — पासवर्ड नहीं।",
      href: "/services",
    },
    {
      id: "tiktok",
      title: "TikTok",
      body: "वीडियो व्यूज़, लाइक्स और फॉलोअर्स। नई वीडियो के लिए मज़बूत शुरुआत।",
      href: "/services",
    },
    {
      id: "youtube",
      title: "YouTube",
      body: "व्यूज़, लाइक्स और सब्सक्राइबर्स। लिंक पेस्ट करें और ऑर्डर ट्रैक करें।",
      href: "/services",
    },
    {
      id: "telegram",
      title: "Telegram",
      body: "चैनल मेंबर्स और पोस्ट व्यूज़ — चैनल व कम्युनिटी के लिए।",
      href: "/services",
    },
    {
      id: "facebook",
      title: "Facebook",
      body: "पेज लाइक्स, पोस्ट लाइक्स और फॉलोअर्स — पब्लिक लिंक से।",
      href: "/services",
    },
    {
      id: "twitter",
      title: "Twitter / X",
      body: "फॉलोअर्स, लाइक्स और व्यूज़ — आपके X अकाउंट के लिए।",
      href: "/services",
    },
    {
      id: "spotify",
      title: "Spotify",
      body: "प्ले, फॉलोअर्स और प्लेलिस्ट सपोर्ट।",
      href: "/services",
    },
    {
      id: "twitch",
      title: "Twitch",
      body: "फॉलोअर्स और व्यूज़ — स्ट्रीमर्स और लाइव चैनल के लिए।",
      href: "/services",
    },
  ],
  homeFaqs: [
    {
      q: "SSMM Panel क्यों चुनें?",
      a: "SSMM Panel किफ़ायती SMM पैनल है — फ्री ट्रायल, साफ़ कीमतें, आसान टॉप-अप और WhatsApp सपोर्ट के साथ Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify और Twitch।",
    },
    {
      q: "क्या Instagram या TikTok पासवर्ड शेयर करना पड़ेगा?",
      a: "नहीं। ऑर्डर सिर्फ पब्लिक प्रोफ़ाइल, पोस्ट या वीडियो URL लेते हैं। कोई सर्विस पासवर्ड माँगे तो छोड़ दें और टिकट खोलें — यह पैनल ऐसे नहीं चलता।",
    },
    {
      q: "बड़े PayPal या क्रिप्टो टॉप-अप से पहले ट्राय कर सकते हैं?",
      a: "हाँ। फ्री पैक से छोटी क्वांटिटी पर स्टार्ट टाइम और डिलीवरी पैटर्न देख सकते हैं। लाइन उम्मीद के मुताबिक चले तो वॉलेट फंड करके वही सर्विस ID दोबारा ऑर्डर करें।",
    },
    {
      q: "बैलेंस टॉप-अप कैसे क्रेडिट होते हैं?",
      a: "PayPal, कार्ड, क्रिप्टो, Skrill, Revolut, Payoneer, Paysafecard, बैंक ट्रांसफर, Binance Pay या Cryptomus चुनें; नोट में यूज़रनेम डालकर पेमेंट भेजें, फिर WhatsApp या टिकट पर प्रूफ शेयर करें। सपोर्ट रसीद मिलाकर बैलेंस अपडेट करता है।",
    },
    {
      q: "इस पैनल पर drip-feed क्या करता है?",
      a: "सर्विस सपोर्ट करे तो क्वांटिटी दिनों में बाँटते हैं (जैसे रोज़ बराबर लाइक्स) — सब एक झटके में नहीं। उसी लिंक पर धीमी, स्टेप्ड डिलीवरी चाहिए तो यूज़ करें।",
    },
    {
      q: "मेरा ऑर्डर चल रहा है, कैसे जानूँ?",
      a: "पैनल में Orders खोलें। इंतज़ार, प्रोसेसिंग, आंशिक या पूरा — वहीं दिखेगा; चैट स्क्रीनशॉट से अंदाज़ा लगाने की ज़रूरत नहीं।",
    },
  ],
  extraFaqs: [
    {
      q: "ऑर्डर सिर्फ पार्टली पूरा हो तो क्या होता है?",
      a: "स्टेटस और remains सप्लायर फीड से अपडेट होते हैं। बची क्वांटिटी उस सर्विस के partial/cancel नियमों के अनुसार बैलेंस में लौट सकती है — स्केल करने से पहले डिस्क्रिप्शन देखें।",
    },
    {
      q: "किन प्लेटफ़ॉर्म्स के लिए ऑर्डर कर सकते हैं?",
      a: "Instagram, TikTok, YouTube, Telegram, Facebook, Twitter/X, Spotify और Twitch पर ऑर्डर कर सकते हैं। लाइव कैटेगरी और कीमत के लिए लॉगिन के बाद सर्विसेज़ खोलें।",
    },
    {
      q: "मिनिमम डिपॉज़िट है?",
      a: "छोटे पहले डिपॉज़िट ठीक हैं। सटीक मिनिमम मेथड के हिसाब से बदल सकते हैं — हर Payments लैंडिंग और डैशबोर्ड का Add funds देखें।",
    },
    {
      q: "सपोर्ट से कैसे संपर्क करें?",
      a: `ईमेल ${SITE.email}, WhatsApp ${SITE.whatsappDisplay}, Telegram @${SITE.telegram}, या डैशबोर्ड से टिकट। किसी खास रन के बारे में पूछें तो यूज़रनेम और ऑर्डर ID डालें।`,
    },
    {
      q: "लंबे गाइड कहाँ पढ़ें?",
      a: "Blog पर बिगिनर समझ, Instagram ऑर्डर नोट्स, PayPal डिपॉज़िट स्टेप्स और फ्री बनाम पेड अपग्रेड सलाह मिलती है। आर्टिकल्स में टेबल, FAQ और Services/Payments लिंक भी हैं।",
    },
    {
      q: "लीगल डॉक्यूमेंट्स कहाँ हैं?",
      a: "Privacy Policy और Terms of Service फुटर में लिंक हैं। About Us बताता है पैनल कैसे चलाया जाता है। बड़े टॉप-अप से पहले पढ़ें।",
    },
  ],
  contact: {
    wa: "पेमेंट प्रूफ़ और ऑर्डर सवालों के लिए सबसे तेज़ चैनल।",
    tg: "ऑर्डर और टॉप-अप के लिए सपोर्ट से चैट करें।",
    email: "अकाउंट मुद्दों और औपचारिक अनुरोधों के लिए ईमेल इस्तेमाल करें।",
  },
};

const BUNDLES: Partial<Record<Locale, LocaleBundle>> & { en: LocaleBundle } = {
  en,
  tr,
  es,
  "pt-br": ptBr,
  ar,
  id,
  bn,
  hi,
};

function bundleFor(locale: Locale): LocaleBundle {
  return BUNDLES[locale] ?? en;
}

export function getPlatforms(locale: Locale): PlatformItem[] {
  return bundleFor(locale).platforms;
}

export function getHomeFaqs(locale: Locale): FaqItem[] {
  return bundleFor(locale).homeFaqs;
}

export function getFaqPageItems(locale: Locale): FaqItem[] {
  const b = bundleFor(locale);
  return [...b.homeFaqs, ...b.extraFaqs];
}

export function getContactBodies(locale: Locale): ContactBodies {
  return bundleFor(locale).contact;
}
