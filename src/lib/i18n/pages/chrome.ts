import type { Locale } from "@/lib/site";
import type { PageChrome } from "@/lib/i18n/pages/types";

const en: PageChrome = {
  lastUpdated: "Last updated: {date}",
  aboutH1: "About Us",
  aboutLead:
    "SSMM Panel is the growth desk behind ssmmpanel.com — built for creators and resellers who want clear service lines, not cloned panel filler.",
  aboutUsefulLinks: "Useful links",
  aboutImgAlt: "About SSMM Panel — Instagram TikTok YouTube growth desk cover",
  privacyLead:
    "This page explains what SSMM Panel collects when you use the panel, how deposits and orders are handled, and how to reach us about privacy requests.",
  termsLead:
    "These terms govern accounts, orders, balance top-ups, and API access on SSMM Panel. Read them before large deposits or reseller integration.",
  privacyMetaTitle: "Privacy Policy — How SSMM Panel Handles Your Data",
  privacyMetaDesc:
    "SSMM Panel privacy policy: account data, order links, payment proofs, cookies, retention, and how to contact us. We never ask for social media passwords.",
  termsMetaTitle: "Terms of Service — SSMM Panel Rules for Orders & API",
  termsMetaDesc:
    "SSMM Panel terms of service covering accounts, orders, deposits, chargebacks, reseller API use, and prohibited activity on ssmmpanel.com.",
  aboutMetaTitle: "About Us — SSMM Panel for Creators & Resellers",
  aboutMetaDesc:
    "About SSMM Panel: an operator-built SMM desk on ssmmpanel.com with free trials, PayPal/crypto top-ups, transparent rates, and a PerfectPanel-compatible API.",
  linkServices: "Services catalog",
  linkFree: "Free trial packs",
  linkPayments: "Payment methods",
  linkBlog: "Blog guides",
  linkApi: "Reseller API docs",
  linkContact: "Contact",
  paymentMetaTitle: "{method} — Add Funds",
  paymentMetaDesc:
    "Top up SSMM Panel with {method}. Manual confirmation via WhatsApp or ticket. Fast balance credit after payment proof.",
  paymentIntro:
    "Use {method} to top up your SSMM Panel balance. Deposits are confirmed manually today so every payment stays reliable — automation for Cryptomus and Binance Pay is on the roadmap.",
  paymentHowToTitle: "How to add funds with {method}",
  paymentSteps: [
    { name: "Open Add funds", text: "Sign in and choose {method} as your deposit method." },
    {
      name: "Send the payment",
      text: "Transfer your USD amount via {method}. Include your SSMM username in the payment note.",
    },
    {
      name: "Send proof",
      text: "Message WhatsApp {whatsapp} or open a ticket with the screenshot.",
    },
    { name: "Get credited", text: "After verification we add the amount to your panel balance." },
  ],
  apiEndpoint: "Endpoint",
  apiAuthNote: "Authenticate with your API key from the dashboard. PerfectPanel-compatible actions:",
  apiActions: [
    { action: "services", body: "List all services (id, name, type, category, rate, min, max)." },
    { action: "add", body: "Place an order: service, link, quantity (+ optional comments)." },
    { action: "status", body: "Check order status with order id." },
    { action: "balance", body: "Return your current USD balance." },
  ],
  apiExample: "Example curl",
  servicesNote: "Sample services listed · full catalog inside the dashboard",
  servicesColId: "ID",
  servicesColService: "Service",
  servicesColRate: "Rate / 1K",
  servicesColMin: "Min",
  servicesColMax: "Max",
  freeRules: [
    "One claim per pack during its cooldown window.",
    "Public profile or media link only — never share your password.",
    "Free packs are for testing delivery. Upgrade to paid services for larger growth.",
    "Abuse, private accounts, or invalid links may be rejected without retry.",
    "Create a free account to claim packs and track status in your dashboard.",
  ],
  freePackRules: [
    "Sign up, then submit your public link from the dashboard.",
    "Respect the {hours}-hour cooldown between claims of this pack.",
    "Private or invalid links will not be delivered.",
    "Never share your social media password with anyone.",
  ],
  blogUpdated: "Updated {date}",
  blogReadMeta: "{date} · Updated {updated} · {author} · {min} min · {words} words",
  blogCtaTitle: "Ready to place a controlled first order?",
  blogCtaBody: "Create a free account, try a free pack, then top up when a service line looks right.",
  loginNoAccount: "No account?",
  loginCreate: "Sign up",
  signupHaveAccount: "Already registered?",
  signupLogin: "Sign in",
  formUsername: "Username",
  formPassword: "Password",
  formEmail: "Email",
  formLoginBtn: "Sign in",
  formSignupBtn: "Create account",
  formError: "Something went wrong. Please try again.",
};

const tr: PageChrome = {
  lastUpdated: "Son güncelleme: {date}",
  aboutH1: "Hakkımızda",
  aboutLead:
    "SSMM Panel, ssmmpanel.com arkasındaki büyüme masasıdır — klon panel metinleri değil, net servis hatları isteyen içerik üreticileri ve reseller’lar için kuruldu.",
  aboutUsefulLinks: "Faydalı bağlantılar",
  aboutImgAlt: "SSMM Panel hakkında — Instagram TikTok YouTube büyüme masası kapak görseli",
  privacyLead:
    "Bu sayfa, paneli kullanırken SSMM Panel’in hangi verileri topladığını, yatırımların ve siparişlerin nasıl işlendiğini ve gizlilik talepleri için bize nasıl ulaşacağınızı açıklar.",
  termsLead:
    "Bu şartlar SSMM Panel’de hesapları, siparişleri, bakiye yüklemelerini ve API erişimini düzenler. Büyük yatırımlar veya reseller entegrasyonundan önce okuyun.",
  privacyMetaTitle: "Gizlilik Politikası — SSMM Panel Verilerinizi Nasıl İşler",
  privacyMetaDesc:
    "SSMM Panel gizlilik politikası: hesap verileri, sipariş linkleri, ödeme kanıtları, çerezler, saklama ve iletişim. Sosyal medya şifresi asla istemeyiz.",
  termsMetaTitle: "Hizmet Şartları — SSMM Panel Sipariş ve API Kuralları",
  termsMetaDesc:
    "SSMM Panel hizmet şartları: hesaplar, siparişler, yatırımlar, chargeback’ler, reseller API kullanımı ve ssmmpanel.com’da yasaklı faaliyetler.",
  aboutMetaTitle: "Hakkımızda — İçerik Üreticileri ve Reseller’lar için SSMM Panel",
  aboutMetaDesc:
    "SSMM Panel hakkında: ssmmpanel.com’da ücretsiz denemeler, PayPal/kripto yükleme, şeffaf fiyatlar ve PerfectPanel uyumlu API sunan operatör masası.",
  linkServices: "Servis kataloğu",
  linkFree: "Ücretsiz deneme paketleri",
  linkPayments: "Ödeme yöntemleri",
  linkBlog: "Blog rehberleri",
  linkApi: "Reseller API dokümanları",
  linkContact: "İletişim",
  paymentMetaTitle: "{method} — Bakiye Yükle",
  paymentMetaDesc:
    "SSMM Panel bakiyesini {method} ile yükleyin. WhatsApp veya ticket ile manuel onay. Ödeme kanıtından sonra hızlı kredi.",
  paymentIntro:
    "SSMM Panel bakiyenizi {method} ile yükleyin. Yatırımlar bugün manuel doğrulanır; böylece her ödeme güvenilir kalır — Cryptomus ve Binance Pay otomasyonu yol haritasında.",
  paymentHowToTitle: "{method} ile nasıl bakiye yüklenir",
  paymentSteps: [
    { name: "Bakiye yüklemeyi açın", text: "Giriş yapın ve yatırım yöntemi olarak {method} seçin." },
    {
      name: "Ödemeyi gönderin",
      text: "USD tutarını {method} ile gönderin. Ödeme notuna SSMM kullanıcı adınızı yazın.",
    },
    {
      name: "Kanıt gönderin",
      text: "WhatsApp {whatsapp} üzerinden yazın veya ekran görüntüsüyle ticket açın.",
    },
    { name: "Bakiye yansısın", text: "Doğrulama sonrası tutarı panel bakiyenize ekleriz." },
  ],
  apiEndpoint: "Uç nokta",
  apiAuthNote: "Dashboard’daki API anahtarınızla kimlik doğrulayın. PerfectPanel uyumlu aksiyonlar:",
  apiActions: [
    { action: "services", body: "Tüm servisleri listele (id, name, type, category, rate, min, max)." },
    { action: "add", body: "Sipariş ver: service, link, quantity (+ isteğe bağlı comments)." },
    { action: "status", body: "Sipariş durumunu order id ile kontrol et." },
    { action: "balance", body: "Güncel USD bakiyeni döndür." },
  ],
  apiExample: "Örnek curl",
  servicesNote: "Örnek servisler listelenir · tam katalog dashboard’da",
  servicesColId: "ID",
  servicesColService: "Servis",
  servicesColRate: "Fiyat / 1K",
  servicesColMin: "Min",
  servicesColMax: "Max",
  freeRules: [
    "Her paket için bekleme süresi içinde yalnızca bir talep.",
    "Yalnızca herkese açık profil veya medya linki — şifrenizi asla paylaşmayın.",
    "Ücretsiz paketler teslimatı test içindir. Daha büyük büyüme için ücretli servislere geçin.",
    "Kötüye kullanım, gizli hesaplar veya geçersiz linkler yeniden deneme olmadan reddedilebilir.",
    "Paketleri talep etmek ve durumu takip etmek için ücretsiz hesap oluşturun.",
  ],
  freePackRules: [
    "Kayıt olun, ardından dashboard’dan herkese açık linkinizi gönderin.",
    "Bu paket için talepler arasında {hours} saatlik bekleme süresine uyun.",
    "Gizli veya geçersiz linkler teslim edilmez.",
    "Sosyal medya şifrenizi kimseyle paylaşmayın.",
  ],
  blogUpdated: "Güncellendi {date}",
  blogReadMeta: "{date} · Güncellendi {updated} · {author} · {min} dk · {words} kelime",
  blogCtaTitle: "Kontrollü ilk siparişinizi vermeye hazır mısınız?",
  blogCtaBody: "Ücretsiz hesap açın, bir ücretsiz paket deneyin, servis hattı doğru görünce bakiye yükleyin.",
  loginNoAccount: "Hesabınız yok mu?",
  loginCreate: "Kayıt ol",
  signupHaveAccount: "Zaten kayıtlı mısınız?",
  signupLogin: "Giriş yap",
  formUsername: "Kullanıcı adı",
  formPassword: "Şifre",
  formEmail: "E-posta",
  formLoginBtn: "Giriş yap",
  formSignupBtn: "Hesap oluştur",
  formError: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
};

const es: PageChrome = {
  lastUpdated: "Última actualización: {date}",
  aboutH1: "Sobre nosotros",
  aboutLead:
    "SSMM Panel es el escritorio de crecimiento detrás de ssmmpanel.com — pensado para creadores y reseellers que quieren líneas de servicio claras, no texto clonado de paneles.",
  aboutUsefulLinks: "Enlaces útiles",
  aboutImgAlt: "Sobre SSMM Panel — portada del escritorio de crecimiento Instagram TikTok YouTube",
  privacyLead:
    "Esta página explica qué recoge SSMM Panel cuando usas el panel, cómo se gestionan depósitos y pedidos, y cómo contactarnos por solicitudes de privacidad.",
  termsLead:
    "Estos términos rigen cuentas, pedidos, recargas de saldo y acceso API en SSMM Panel. Léelos antes de depósitos grandes o integración de revendedor.",
  privacyMetaTitle: "Política de privacidad — Cómo SSMM Panel trata tus datos",
  privacyMetaDesc:
    "Política de privacidad de SSMM Panel: datos de cuenta, enlaces de pedidos, comprobantes de pago, cookies, retención y contacto. Nunca pedimos contraseñas de redes sociales.",
  termsMetaTitle: "Términos de servicio — Reglas de pedidos y API de SSMM Panel",
  termsMetaDesc:
    "Términos de SSMM Panel sobre cuentas, pedidos, depósitos, chargebacks, uso de API de revendedor y actividad prohibida en ssmmpanel.com.",
  aboutMetaTitle: "Sobre nosotros — SSMM Panel para creadores y reseellers",
  aboutMetaDesc:
    "Sobre SSMM Panel: escritorio SMM operado en ssmmpanel.com con pruebas gratis, recargas PayPal/crypto, tarifas transparentes y API compatible con PerfectPanel.",
  linkServices: "Catálogo de servicios",
  linkFree: "Paquetes de prueba gratis",
  linkPayments: "Métodos de pago",
  linkBlog: "Guías del blog",
  linkApi: "Docs de API de revendedor",
  linkContact: "Contacto",
  paymentMetaTitle: "{method} — Añadir fondos",
  paymentMetaDesc:
    "Recarga SSMM Panel con {method}. Confirmación manual por WhatsApp o ticket. Crédito rápido tras el comprobante.",
  paymentIntro:
    "Usa {method} para recargar el saldo de SSMM Panel. Los depósitos se confirman manualmente hoy para que cada pago sea fiable — la automatización de Cryptomus y Binance Pay está en la hoja de ruta.",
  paymentHowToTitle: "Cómo añadir fondos con {method}",
  paymentSteps: [
    { name: "Abrir Añadir fondos", text: "Inicia sesión y elige {method} como método de depósito." },
    {
      name: "Enviar el pago",
      text: "Transfiere tu importe en USD con {method}. Incluye tu usuario SSMM en la nota del pago.",
    },
    {
      name: "Enviar comprobante",
      text: "Escribe por WhatsApp {whatsapp} o abre un ticket con la captura.",
    },
    { name: "Recibir el crédito", text: "Tras la verificación añadimos el importe a tu saldo del panel." },
  ],
  apiEndpoint: "Endpoint",
  apiAuthNote: "Autentícate con tu clave API del panel. Acciones compatibles con PerfectPanel:",
  apiActions: [
    { action: "services", body: "Listar todos los servicios (id, name, type, category, rate, min, max)." },
    { action: "add", body: "Crear un pedido: service, link, quantity (+ comments opcionales)." },
    { action: "status", body: "Consultar el estado del pedido con el order id." },
    { action: "balance", body: "Devolver tu saldo actual en USD." },
  ],
  apiExample: "Ejemplo curl",
  servicesNote: "Servicios de muestra listados · catálogo completo en el panel",
  servicesColId: "ID",
  servicesColService: "Servicio",
  servicesColRate: "Tarifa / 1K",
  servicesColMin: "Mín",
  servicesColMax: "Máx",
  freeRules: [
    "Una solicitud por paquete durante su ventana de enfriamiento.",
    "Solo enlace público de perfil o media — nunca compartas tu contraseña.",
    "Los paquetes gratis sirven para probar la entrega. Pasa a servicios de pago para crecer más.",
    "Abuso, cuentas privadas o enlaces inválidos pueden rechazarse sin reintento.",
    "Crea una cuenta gratis para reclamar paquetes y seguir el estado en el panel.",
  ],
  freePackRules: [
    "Regístrate y envía tu enlace público desde el panel.",
    "Respeta el enfriamiento de {hours} horas entre solicitudes de este paquete.",
    "Los enlaces privados o inválidos no se entregan.",
    "Nunca compartas tu contraseña de redes sociales con nadie.",
  ],
  blogUpdated: "Actualizado {date}",
  blogReadMeta: "{date} · Actualizado {updated} · {author} · {min} min · {words} palabras",
  blogCtaTitle: "¿Listo para hacer un primer pedido controlado?",
  blogCtaBody: "Crea una cuenta gratis, prueba un paquete gratis y recarga cuando una línea te convenza.",
  loginNoAccount: "¿Sin cuenta?",
  loginCreate: "Regístrate",
  signupHaveAccount: "¿Ya estás registrado?",
  signupLogin: "Iniciar sesión",
  formUsername: "Usuario",
  formPassword: "Contraseña",
  formEmail: "Correo",
  formLoginBtn: "Iniciar sesión",
  formSignupBtn: "Crear cuenta",
  formError: "Algo salió mal. Inténtalo de nuevo.",
};

const ptBr: PageChrome = {
  lastUpdated: "Última atualização: {date}",
  aboutH1: "Sobre nós",
  aboutLead:
    "SSMM Panel é a mesa de crescimento por trás de ssmmpanel.com — feita para criadores e revendedores que querem linhas de serviço claras, não texto clonado de painel.",
  aboutUsefulLinks: "Links úteis",
  aboutImgAlt: "Sobre o SSMM Panel — capa da mesa de crescimento Instagram TikTok YouTube",
  privacyLead:
    "Esta página explica o que o SSMM Panel coleta quando você usa o painel, como depósitos e pedidos são tratados e como falar conosco sobre privacidade.",
  termsLead:
    "Estes termos regem contas, pedidos, recargas de saldo e acesso à API no SSMM Panel. Leia antes de depósitos grandes ou integração de revendedor.",
  privacyMetaTitle: "Política de privacidade — Como o SSMM Panel trata seus dados",
  privacyMetaDesc:
    "Política de privacidade do SSMM Panel: dados da conta, links de pedidos, comprovantes, cookies, retenção e contato. Nunca pedimos senhas de redes sociais.",
  termsMetaTitle: "Termos de serviço — Regras de pedidos e API do SSMM Panel",
  termsMetaDesc:
    "Termos do SSMM Panel sobre contas, pedidos, depósitos, chargebacks, uso da API de revendedor e atividade proibida em ssmmpanel.com.",
  aboutMetaTitle: "Sobre nós — SSMM Panel para criadores e revendedores",
  aboutMetaDesc:
    "Sobre o SSMM Panel: mesa SMM operada em ssmmpanel.com com testes grátis, recargas PayPal/crypto, tarifas transparentes e API compatível com PerfectPanel.",
  linkServices: "Catálogo de serviços",
  linkFree: "Pacotes de teste grátis",
  linkPayments: "Métodos de pagamento",
  linkBlog: "Guias do blog",
  linkApi: "Docs da API de revendedor",
  linkContact: "Contato",
  paymentMetaTitle: "{method} — Adicionar fundos",
  paymentMetaDesc:
    "Recarregue o SSMM Panel com {method}. Confirmação manual via WhatsApp ou ticket. Crédito rápido após o comprovante.",
  paymentIntro:
    "Use {method} para recarregar o saldo do SSMM Panel. Os depósitos são confirmados manualmente hoje para manter cada pagamento confiável — automação Cryptomus e Binance Pay está no roadmap.",
  paymentHowToTitle: "Como adicionar fundos com {method}",
  paymentSteps: [
    { name: "Abrir Adicionar fundos", text: "Entre na conta e escolha {method} como método de depósito." },
    {
      name: "Enviar o pagamento",
      text: "Transfira o valor em USD via {method}. Inclua seu usuário SSMM na nota do pagamento.",
    },
    {
      name: "Enviar comprovante",
      text: "Fale no WhatsApp {whatsapp} ou abra um ticket com a captura de tela.",
    },
    { name: "Receber o crédito", text: "Após a verificação, creditamos o valor no saldo do painel." },
  ],
  apiEndpoint: "Endpoint",
  apiAuthNote: "Autentique com sua chave de API do painel. Ações compatíveis com PerfectPanel:",
  apiActions: [
    { action: "services", body: "Listar todos os serviços (id, name, type, category, rate, min, max)." },
    { action: "add", body: "Criar um pedido: service, link, quantity (+ comments opcionais)." },
    { action: "status", body: "Consultar o status do pedido com o order id." },
    { action: "balance", body: "Retornar seu saldo atual em USD." },
  ],
  apiExample: "Exemplo curl",
  servicesNote: "Serviços de amostra listados · catálogo completo no painel",
  servicesColId: "ID",
  servicesColService: "Serviço",
  servicesColRate: "Taxa / 1K",
  servicesColMin: "Mín",
  servicesColMax: "Máx",
  freeRules: [
    "Uma solicitação por pacote durante a janela de espera.",
    "Apenas link público de perfil ou mídia — nunca compartilhe sua senha.",
    "Pacotes grátis são para testar a entrega. Use serviços pagos para crescimento maior.",
    "Abuso, contas privadas ou links inválidos podem ser rejeitados sem nova tentativa.",
    "Crie uma conta grátis para resgatar pacotes e acompanhar o status no painel.",
  ],
  freePackRules: [
    "Cadastre-se e envie seu link público pelo painel.",
    "Respeite a espera de {hours} horas entre solicitações deste pacote.",
    "Links privados ou inválidos não serão entregues.",
    "Nunca compartilhe sua senha de rede social com ninguém.",
  ],
  blogUpdated: "Atualizado {date}",
  blogReadMeta: "{date} · Atualizado {updated} · {author} · {min} min · {words} palavras",
  blogCtaTitle: "Pronto para fazer um primeiro pedido controlado?",
  blogCtaBody: "Crie uma conta grátis, teste um pacote grátis e recarregue quando a linha fizer sentido.",
  loginNoAccount: "Não tem conta?",
  loginCreate: "Cadastre-se",
  signupHaveAccount: "Já tem cadastro?",
  signupLogin: "Entrar",
  formUsername: "Usuário",
  formPassword: "Senha",
  formEmail: "E-mail",
  formLoginBtn: "Entrar",
  formSignupBtn: "Criar conta",
  formError: "Algo deu errado. Tente novamente.",
};

const ar: PageChrome = {
  lastUpdated: "آخر تحديث: {date}",
  aboutH1: "من نحن",
  aboutLead:
    "SSMM Panel هو مكتب النمو خلف ssmmpanel.com — مبني لصنّاع المحتوى والموزّعين الذين يريدون خطوط خدمات واضحة، لا نصوص لوحات منسوخة.",
  aboutUsefulLinks: "روابط مفيدة",
  aboutImgAlt: "عن SSMM Panel — غلاف مكتب نمو إنستغرام وتيك توك ويوتيوب",
  privacyLead:
    "توضح هذه الصفحة ما يجمعه SSMM Panel عند استخدام اللوحة، وكيف تُعالَج الإيداعات والطلبات، وكيف تتواصل معنا بخصوص الخصوصية.",
  termsLead:
    "تحكم هذه الشروط الحسابات والطلبات وشحن الرصيد والوصول إلى واجهة البرمجة في SSMM Panel. اقرأها قبل الإيداعات الكبيرة أو تكامل الموزّعين.",
  privacyMetaTitle: "سياسة الخصوصية — كيف يتعامل SSMM Panel مع بياناتك",
  privacyMetaDesc:
    "سياسة خصوصية SSMM Panel: بيانات الحساب وروابط الطلبات وإثباتات الدفع وملفات تعريف الارتباط والاحتفاظ والتواصل. لا نطلب كلمات مرور التواصل الاجتماعي.",
  termsMetaTitle: "شروط الخدمة — قواعد الطلبات وواجهة البرمجة في SSMM Panel",
  termsMetaDesc:
    "شروط SSMM Panel حول الحسابات والطلبات والإيداعات والاسترجاعات واستخدام واجهة الموزّعين والأنشطة المحظورة على ssmmpanel.com.",
  aboutMetaTitle: "من نحن — SSMM Panel لصنّاع المحتوى والموزّعين",
  aboutMetaDesc:
    "عن SSMM Panel: مكتب SMM تشغيلي على ssmmpanel.com مع تجارب مجانية وشحن PayPal/عملات رقمية وأسعار شفافة وواجهة متوافقة مع PerfectPanel.",
  linkServices: "كتالوج الخدمات",
  linkFree: "باقات التجربة المجانية",
  linkPayments: "طرق الدفع",
  linkBlog: "أدلة المدونة",
  linkApi: "وثائق واجهة الموزّعين",
  linkContact: "تواصل معنا",
  paymentMetaTitle: "{method} — إضافة رصيد",
  paymentMetaDesc:
    "اشحن SSMM Panel عبر {method}. تأكيد يدوي عبر واتساب أو تذكرة. إضافة رصيد سريعة بعد إثبات الدفع.",
  paymentIntro:
    "استخدم {method} لشحن رصيد SSMM Panel. تُؤكَّد الإيداعات يدويًا اليوم ليبقى كل دفع موثوقًا — أتمتة Cryptomus وBinance Pay ضمن خارطة الطريق.",
  paymentHowToTitle: "كيفية إضافة رصيد عبر {method}",
  paymentSteps: [
    { name: "افتح إضافة الرصيد", text: "سجّل الدخول واختر {method} كطريقة إيداع." },
    {
      name: "أرسل الدفع",
      text: "حوّل المبلغ بالدولار عبر {method}. أدرج اسم مستخدم SSMM في ملاحظة الدفع.",
    },
    {
      name: "أرسل الإثبات",
      text: "راسل واتساب {whatsapp} أو افتح تذكرة مع لقطة الشاشة.",
    },
    { name: "احصل على الرصيد", text: "بعد التحقق نضيف المبلغ إلى رصيد اللوحة." },
  ],
  apiEndpoint: "نقطة النهاية",
  apiAuthNote: "صادِق بمفتاح واجهة البرمجة من لوحة التحكم. إجراءات متوافقة مع PerfectPanel:",
  apiActions: [
    { action: "services", body: "سرد كل الخدمات (id, name, type, category, rate, min, max)." },
    { action: "add", body: "إنشاء طلب: service وlink وquantity (+ comments اختياري)." },
    { action: "status", body: "التحقق من حالة الطلب بمعرّف order." },
    { action: "balance", body: "إرجاع رصيدك الحالي بالدولار." },
  ],
  apiExample: "مثال curl",
  servicesNote: "خدمات نموذجية معروضة · الكتالوج الكامل داخل لوحة التحكم",
  servicesColId: "المعرّف",
  servicesColService: "الخدمة",
  servicesColRate: "السعر / 1K",
  servicesColMin: "الحد الأدنى",
  servicesColMax: "الحد الأقصى",
  freeRules: [
    "مطالبة واحدة لكل باقة خلال نافذة الانتظار.",
    "رابط ملف أو وسائط عام فقط — لا تشارك كلمة المرور أبدًا.",
    "الباقات المجانية لاختبار التسليم. انتقل إلى الخدمات المدفوعة للنمو الأكبر.",
    "إساءة الاستخدام أو الحسابات الخاصة أو الروابط غير الصالحة قد تُرفض دون إعادة محاولة.",
    "أنشئ حسابًا مجانيًا للمطالبة بالباقات وتتبع الحالة في لوحة التحكم.",
  ],
  freePackRules: [
    "سجّل ثم أرسل رابطك العام من لوحة التحكم.",
    "احترم فترة الانتظار البالغة {hours} ساعة بين مطالبات هذه الباقة.",
    "لن يُسلَّم الروابط الخاصة أو غير الصالحة.",
    "لا تشارك كلمة مرور حسابك الاجتماعي مع أي شخص.",
  ],
  blogUpdated: "حدّث في {date}",
  blogReadMeta: "{date} · حدّث في {updated} · {author} · {min} د · {words} كلمة",
  blogCtaTitle: "جاهز لأول طلب مضبوط؟",
  blogCtaBody: "أنشئ حسابًا مجانيًا، جرّب باقة مجانية، ثم اشحن عندما تناسبك خط الخدمة.",
  loginNoAccount: "ليس لديك حساب؟",
  loginCreate: "إنشاء حساب",
  signupHaveAccount: "لديك حساب بالفعل؟",
  signupLogin: "تسجيل الدخول",
  formUsername: "اسم المستخدم",
  formPassword: "كلمة المرور",
  formEmail: "البريد الإلكتروني",
  formLoginBtn: "تسجيل الدخول",
  formSignupBtn: "إنشاء حساب",
  formError: "حدث خطأ ما. حاول مرة أخرى.",
};

const id: PageChrome = {
  lastUpdated: "Terakhir diperbarui: {date}",
  aboutH1: "Tentang kami",
  aboutLead:
    "SSMM Panel adalah meja pertumbuhan di balik ssmmpanel.com — dibuat untuk kreator dan reseller yang ingin baris layanan jelas, bukan teks panel kloning.",
  aboutUsefulLinks: "Tautan berguna",
  aboutImgAlt: "Tentang SSMM Panel — sampul meja pertumbuhan Instagram TikTok YouTube",
  privacyLead:
    "Halaman ini menjelaskan apa yang dikumpulkan SSMM Panel saat Anda memakai panel, bagaimana deposit dan pesanan ditangani, serta cara menghubungi kami untuk permintaan privasi.",
  termsLead:
    "Syarat ini mengatur akun, pesanan, isi saldo, dan akses API di SSMM Panel. Baca sebelum deposit besar atau integrasi reseller.",
  privacyMetaTitle: "Kebijakan privasi — Cara SSMM Panel menangani data Anda",
  privacyMetaDesc:
    "Kebijakan privasi SSMM Panel: data akun, tautan pesanan, bukti pembayaran, cookie, retensi, dan kontak. Kami tidak pernah meminta kata sandi media sosial.",
  termsMetaTitle: "Syarat layanan — Aturan pesanan & API SSMM Panel",
  termsMetaDesc:
    "Syarat SSMM Panel mencakup akun, pesanan, deposit, chargeback, penggunaan API reseller, dan aktivitas terlarang di ssmmpanel.com.",
  aboutMetaTitle: "Tentang kami — SSMM Panel untuk kreator & reseller",
  aboutMetaDesc:
    "Tentang SSMM Panel: meja SMM di ssmmpanel.com dengan uji coba gratis, top-up PayPal/kripto, tarif transparan, dan API kompatibel PerfectPanel.",
  linkServices: "Katalog layanan",
  linkFree: "Paket uji coba gratis",
  linkPayments: "Metode pembayaran",
  linkBlog: "Panduan blog",
  linkApi: "Dokumen API reseller",
  linkContact: "Kontak",
  paymentMetaTitle: "{method} — Tambah dana",
  paymentMetaDesc:
    "Isi saldo SSMM Panel dengan {method}. Konfirmasi manual via WhatsApp atau tiket. Kredit cepat setelah bukti pembayaran.",
  paymentIntro:
    "Gunakan {method} untuk mengisi saldo SSMM Panel. Deposit dikonfirmasi manual hari ini agar setiap pembayaran andal — otomasi Cryptomus dan Binance Pay ada di peta jalan.",
  paymentHowToTitle: "Cara menambah dana dengan {method}",
  paymentSteps: [
    { name: "Buka Tambah dana", text: "Masuk dan pilih {method} sebagai metode deposit." },
    {
      name: "Kirim pembayaran",
      text: "Transfer jumlah USD melalui {method}. Cantumkan username SSMM Anda di catatan pembayaran.",
    },
    {
      name: "Kirim bukti",
      text: "Kirim pesan WhatsApp {whatsapp} atau buka tiket dengan tangkapan layar.",
    },
    { name: "Saldo dikreditkan", text: "Setelah verifikasi kami menambahkan jumlah ke saldo panel Anda." },
  ],
  apiEndpoint: "Endpoint",
  apiAuthNote: "Autentikasi dengan kunci API dari dasbor. Aksi kompatibel PerfectPanel:",
  apiActions: [
    { action: "services", body: "Daftar semua layanan (id, name, type, category, rate, min, max)." },
    { action: "add", body: "Buat pesanan: service, link, quantity (+ comments opsional)." },
    { action: "status", body: "Cek status pesanan dengan order id." },
    { action: "balance", body: "Kembalikan saldo USD Anda saat ini." },
  ],
  apiExample: "Contoh curl",
  servicesNote: "Layanan contoh terdaftar · katalog penuh di dalam dasbor",
  servicesColId: "ID",
  servicesColService: "Layanan",
  servicesColRate: "Tarif / 1K",
  servicesColMin: "Min",
  servicesColMax: "Maks",
  freeRules: [
    "Satu klaim per paket selama jendela cooldown.",
    "Hanya tautan profil atau media publik — jangan pernah bagikan kata sandi.",
    "Paket gratis untuk menguji pengiriman. Naik ke layanan berbayar untuk pertumbuhan lebih besar.",
    "Penyalahgunaan, akun privat, atau tautan tidak valid dapat ditolak tanpa percobaan ulang.",
    "Buat akun gratis untuk mengklaim paket dan melacak status di dasbor.",
  ],
  freePackRules: [
    "Daftar, lalu kirim tautan publik Anda dari dasbor.",
    "Hormati cooldown {hours} jam antar klaim paket ini.",
    "Tautan privat atau tidak valid tidak akan dikirim.",
    "Jangan pernah bagikan kata sandi media sosial Anda kepada siapa pun.",
  ],
  blogUpdated: "Diperbarui {date}",
  blogReadMeta: "{date} · Diperbarui {updated} · {author} · {min} mnt · {words} kata",
  blogCtaTitle: "Siap membuat pesanan pertama yang terkontrol?",
  blogCtaBody: "Buat akun gratis, coba paket gratis, lalu isi saldo saat baris layanan terlihat tepat.",
  loginNoAccount: "Belum punya akun?",
  loginCreate: "Daftar",
  signupHaveAccount: "Sudah terdaftar?",
  signupLogin: "Masuk",
  formUsername: "Nama pengguna",
  formPassword: "Kata sandi",
  formEmail: "Email",
  formLoginBtn: "Masuk",
  formSignupBtn: "Buat akun",
  formError: "Terjadi kesalahan. Silakan coba lagi.",
};

const bn: PageChrome = {
  lastUpdated: "সর্বশেষ আপডেট: {date}",
  aboutH1: "আমাদের সম্পর্কে",
  aboutLead:
    "SSMM Panel হলো ssmmpanel.com-এর পেছনের গ্রোথ ডেস্ক — ক্লোন প্যানেল টেক্সট নয়, স্পষ্ট সার্ভিস লাইন চায় এমন ক্রিয়েটর ও রিসেলারদের জন্য তৈরি।",
  aboutUsefulLinks: "দরকারি লিঙ্ক",
  aboutImgAlt: "SSMM Panel সম্পর্কে — ইনস্টাগ্রাম টিকটক ইউটিউব গ্রোথ ডেস্ক কভার",
  privacyLead:
    "এই পৃষ্ঠায় বলা আছে প্যানেল ব্যবহারের সময় SSMM Panel কী তথ্য সংগ্রহ করে, ডিপোজিট ও অর্ডার কীভাবে পরিচালিত হয় এবং গোপনীয়তা অনুরোধে আমাদের সাথে কীভাবে যোগাযোগ করবেন।",
  termsLead:
    "এই শর্তাবলী SSMM Panel-এ অ্যাকাউন্ট, অর্ডার, ব্যালেন্স টপ-আপ ও API অ্যাক্সেস নিয়ন্ত্রণ করে। বড় ডিপোজিট বা রিসেলার ইন্টিগ্রেশনের আগে পড়ুন।",
  privacyMetaTitle: "গোপনীয়তা নীতি — SSMM Panel আপনার ডেটা কীভাবে পরিচালনা করে",
  privacyMetaDesc:
    "SSMM Panel গোপনীয়তা নীতি: অ্যাকাউন্ট ডেটা, অর্ডার লিঙ্ক, পেমেন্ট প্রুফ, কুকি, সংরক্ষণ ও যোগাযোগ। আমরা কখনো সোশ্যাল মিডিয়া পাসওয়ার্ড চাই না।",
  termsMetaTitle: "সেবার শর্তাবলী — SSMM Panel অর্ডার ও API নিয়ম",
  termsMetaDesc:
    "SSMM Panel শর্তাবলী: অ্যাকাউন্ট, অর্ডার, ডিপোজিট, চার্জব্যাক, রিসেলার API ব্যবহার এবং ssmmpanel.com-এ নিষিদ্ধ কার্যকলাপ।",
  aboutMetaTitle: "আমাদের সম্পর্কে — ক্রিয়েটর ও রিসেলারদের জন্য SSMM Panel",
  aboutMetaDesc:
    "SSMM Panel সম্পর্কে: ssmmpanel.com-এ অপারেটর-নির্মিত SMM ডেস্ক—ফ্রি ট্রায়াল, PayPal/ক্রিপ্টো টপ-আপ, স্বচ্ছ রেট ও PerfectPanel-সামঞ্জস্যপূর্ণ API।",
  linkServices: "সার্ভিস ক্যাটালগ",
  linkFree: "ফ্রি ট্রায়াল প্যাক",
  linkPayments: "পেমেন্ট পদ্ধতি",
  linkBlog: "ব্লগ গাইড",
  linkApi: "রিসেলার API ডক্স",
  linkContact: "যোগাযোগ",
  paymentMetaTitle: "{method} — ফান্ড যোগ করুন",
  paymentMetaDesc:
    "{method} দিয়ে SSMM Panel টপ-আপ করুন। WhatsApp বা টিকিটে ম্যানুয়াল নিশ্চিতকরণ। পেমেন্ট প্রুফের পর দ্রুত ব্যালেন্স ক্রেডিট।",
  paymentIntro:
    "SSMM Panel ব্যালেন্স টপ-আপ করতে {method} ব্যবহার করুন। আজ ডিপোজিট ম্যানুয়ালি নিশ্চিত হয় যাতে প্রতিটি পেমেন্ট নির্ভরযোগ্য থাকে — Cryptomus ও Binance Pay অটোমেশন রোডম্যাপে আছে।",
  paymentHowToTitle: "{method} দিয়ে কীভাবে ফান্ড যোগ করবেন",
  paymentSteps: [
    { name: "Add funds খুলুন", text: "সাইন ইন করে ডিপোজিট পদ্ধতি হিসেবে {method} বেছে নিন।" },
    {
      name: "পেমেন্ট পাঠান",
      text: "{method} এর মাধ্যমে আপনার USD পরিমাণ পাঠান। পেমেন্ট নোটে SSMM ইউজারনেম লিখুন।",
    },
    {
      name: "প্রুফ পাঠান",
      text: "WhatsApp {whatsapp}-এ মেসেজ করুন অথবা স্ক্রিনশটসহ টিকিট খুলুন।",
    },
    { name: "ক্রেডিট পান", text: "যাচাইয়ের পর আমরা পরিমাণটি আপনার প্যানেল ব্যালেন্সে যোগ করি।" },
  ],
  apiEndpoint: "এন্ডপয়েন্ট",
  apiAuthNote: "ড্যাশবোর্ডের API কী দিয়ে প্রমাণীকরণ করুন। PerfectPanel-সামঞ্জস্যপূর্ণ অ্যাকশন:",
  apiActions: [
    { action: "services", body: "সব সার্ভিস তালিকা (id, name, type, category, rate, min, max)।" },
    { action: "add", body: "অর্ডার দিন: service, link, quantity (+ ঐচ্ছিক comments)।" },
    { action: "status", body: "order id দিয়ে অর্ডার স্ট্যাটাস দেখুন।" },
    { action: "balance", body: "বর্তমান USD ব্যালেন্স ফেরত দিন।" },
  ],
  apiExample: "উদাহরণ curl",
  servicesNote: "নমুনা সার্ভিস তালিকাভুক্ত · সম্পূর্ণ ক্যাটালগ ড্যাশবোর্ডে",
  servicesColId: "আইডি",
  servicesColService: "সার্ভিস",
  servicesColRate: "রেট / ১কে",
  servicesColMin: "সর্বনিম্ন",
  servicesColMax: "সর্বোচ্চ",
  freeRules: [
    "কুলডাউন উইন্ডোতে প্রতি প্যাকে একবারই দাবি।",
    "শুধু পাবলিক প্রোফাইল বা মিডিয়া লিঙ্ক — কখনো পাসওয়ার্ড শেয়ার করবেন না।",
    "ফ্রি প্যাক ডেলিভারি পরীক্ষার জন্য। বড় গ্রোথের জন্য পেইড সার্ভিসে যান।",
    "অপব্যবহার, প্রাইভেট অ্যাকাউন্ট বা অবৈধ লিঙ্ক পুনরায় চেষ্টা ছাড়াই বাতিল হতে পারে।",
    "প্যাক দাবি ও স্ট্যাটাস ট্র্যাক করতে ফ্রি অ্যাকাউন্ট তৈরি করুন।",
  ],
  freePackRules: [
    "সাইন আপ করুন, তারপর ড্যাশবোর্ড থেকে পাবলিক লিঙ্ক জমা দিন।",
    "এই প্যাকের দাবির মধ্যে {hours} ঘণ্টার কুলডাউন মানুন।",
    "প্রাইভেট বা অবৈধ লিঙ্ক ডেলিভার হবে না।",
    "সোশ্যাল মিডিয়া পাসওয়ার্ড কারো সাথে শেয়ার করবেন না।",
  ],
  blogUpdated: "আপডেট {date}",
  blogReadMeta: "{date} · আপডেট {updated} · {author} · {min} মি · {words} শব্দ",
  blogCtaTitle: "নিয়ন্ত্রিত প্রথম অর্ডার দিতে প্রস্তুত?",
  blogCtaBody: "ফ্রি অ্যাকাউন্ট তৈরি করুন, একটি ফ্রি প্যাক চেষ্টা করুন, সার্ভিস লাইন ঠিক মনে হলে টপ-আপ করুন।",
  loginNoAccount: "অ্যাকাউন্ট নেই?",
  loginCreate: "সাইন আপ",
  signupHaveAccount: "ইতিমধ্যে নিবন্ধিত?",
  signupLogin: "সাইন ইন",
  formUsername: "ইউজারনেম",
  formPassword: "পাসওয়ার্ড",
  formEmail: "ইমেইল",
  formLoginBtn: "সাইন ইন",
  formSignupBtn: "অ্যাকাউন্ট তৈরি",
  formError: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
};

const hi: PageChrome = {
  lastUpdated: "अंतिम अपडेट: {date}",
  aboutH1: "हमारे बारे में",
  aboutLead:
    "SSMM Panel, ssmmpanel.com के पीछे का ग्रोथ डेस्क है — क्लोन पैनल टेक्स्ट नहीं, स्पष्ट सर्विस लाइन चाहने वाले क्रिएटर्स और रीसेलर्स के लिए बनाया गया।",
  aboutUsefulLinks: "उपयोगी लिंक",
  aboutImgAlt: "SSMM Panel के बारे में — Instagram TikTok YouTube ग्रोथ डेस्क कवर",
  privacyLead:
    "यह पेज बताता है कि पैनल इस्तेमाल करते समय SSMM Panel क्या डेटा एकत्र करता है, डिपॉज़िट और ऑर्डर कैसे संभाले जाते हैं, और प्राइवेसी अनुरोधों के लिए हमसे कैसे संपर्क करें।",
  termsLead:
    "ये शर्तें SSMM Panel पर अकाउंट, ऑर्डर, बैलेंस टॉप-अप और API एक्सेस नियंत्रित करती हैं। बड़े डिपॉज़िट या रीसेलर इंटीग्रेशन से पहले पढ़ें।",
  privacyMetaTitle: "प्राइवेसी नीति — SSMM Panel आपका डेटा कैसे संभालता है",
  privacyMetaDesc:
    "SSMM Panel प्राइवेसी नीति: अकाउंट डेटा, ऑर्डर लिंक, पेमेंट प्रूफ, कुकीज़, रिटेंशन और संपर्क। हम कभी सोशल मीडिया पासवर्ड नहीं माँगते।",
  termsMetaTitle: "सेवा की शर्तें — SSMM Panel ऑर्डर और API नियम",
  termsMetaDesc:
    "SSMM Panel शर्तें: अकाउंट, ऑर्डर, डिपॉज़िट, चार्जबैक, रीसेलर API उपयोग और ssmmpanel.com पर निषिद्ध गतिविधि।",
  aboutMetaTitle: "हमारे बारे में — क्रिएटर्स और रीसेलर्स के लिए SSMM Panel",
  aboutMetaDesc:
    "SSMM Panel के बारे में: ssmmpanel.com पर ऑपरेटर-निर्मित SMM डेस्क—फ्री ट्रायल, PayPal/क्रिप्टो टॉप-अप, पारदर्शी रेट और PerfectPanel-संगत API।",
  linkServices: "सर्विस कैटलॉग",
  linkFree: "फ्री ट्रायल पैक",
  linkPayments: "पेमेंट विधियाँ",
  linkBlog: "ब्लॉग गाइड",
  linkApi: "रीसेलर API डॉक्स",
  linkContact: "संपर्क",
  paymentMetaTitle: "{method} — फंड जोड़ें",
  paymentMetaDesc:
    "{method} से SSMM Panel टॉप-अप करें। WhatsApp या टिकट से मैन्युअल पुष्टि। पेमेंट प्रूफ के बाद तेज़ बैलेंस क्रेडिट।",
  paymentIntro:
    "SSMM Panel बैलेंस टॉप-अप के लिए {method} उपयोग करें। आज डिपॉज़िट मैन्युअल रूप से पुष्टि होते हैं ताकि हर पेमेंट भरोसेमंद रहे — Cryptomus और Binance Pay ऑटोमेशन रोडमैप पर है।",
  paymentHowToTitle: "{method} से फंड कैसे जोड़ें",
  paymentSteps: [
    { name: "Add funds खोलें", text: "साइन इन करें और डिपॉज़िट विधि के रूप में {method} चुनें।" },
    {
      name: "पेमेंट भेजें",
      text: "{method} से अपनी USD राशि ट्रांसफर करें। पेमेंट नोट में अपना SSMM यूज़रनेम लिखें।",
    },
    {
      name: "प्रूफ भेजें",
      text: "WhatsApp {whatsapp} पर मैसेज करें या स्क्रीनशॉट के साथ टिकट खोलें।",
    },
    { name: "क्रेडिट पाएँ", text: "वेरिफिकेशन के बाद हम राशि आपके पैनल बैलेंस में जोड़ते हैं।" },
  ],
  apiEndpoint: "एंडपॉइंट",
  apiAuthNote: "डैशबोर्ड की API कुंजी से प्रमाणित करें। PerfectPanel-संगत एक्शन:",
  apiActions: [
    { action: "services", body: "सभी सर्विस सूची (id, name, type, category, rate, min, max)।" },
    { action: "add", body: "ऑर्डर दें: service, link, quantity (+ वैकल्पिक comments)।" },
    { action: "status", body: "order id से ऑर्डर स्टेटस जाँचें।" },
    { action: "balance", body: "आपका वर्तमान USD बैलेंस लौटाएँ।" },
  ],
  apiExample: "उदाहरण curl",
  servicesNote: "नमूना सर्विस सूचीबद्ध · पूरा कैटलॉग डैशबोर्ड में",
  servicesColId: "आईडी",
  servicesColService: "सर्विस",
  servicesColRate: "रेट / 1K",
  servicesColMin: "न्यूनतम",
  servicesColMax: "अधिकतम",
  freeRules: [
    "कूलडाउन विंडो में प्रति पैक एक ही क्लेम।",
    "केवल पब्लिक प्रोफ़ाइल या मीडिया लिंक — कभी पासवर्ड साझा न करें।",
    "फ्री पैक डिलीवरी टेस्ट के लिए हैं। बड़े ग्रोथ के लिए पेड सर्विस चुनें।",
    "दुरुपयोग, प्राइवेट अकाउंट या अमान्य लिंक बिना पुनः प्रयास के अस्वीकार हो सकते हैं।",
    "पैक क्लेम और स्टेटस ट्रैक करने के लिए फ्री अकाउंट बनाएँ।",
  ],
  freePackRules: [
    "साइन अप करें, फिर डैशबोर्ड से अपना पब्लिक लिंक जमा करें।",
    "इस पैक के क्लेम के बीच {hours}-घंटे का कूलडाउन मानें।",
    "प्राइवेट या अमान्य लिंक डिलीवर नहीं होंगे।",
    "अपना सोशल मीडिया पासवर्ड किसी के साथ साझा न करें।",
  ],
  blogUpdated: "अपडेट {date}",
  blogReadMeta: "{date} · अपडेट {updated} · {author} · {min} मि · {words} शब्द",
  blogCtaTitle: "नियंत्रित पहला ऑर्डर देने को तैयार?",
  blogCtaBody: "फ्री अकाउंट बनाएँ, एक फ्री पैक आज़माएँ, फिर जब सर्विस लाइन सही लगे तो टॉप-अप करें।",
  loginNoAccount: "अकाउंट नहीं है?",
  loginCreate: "साइन अप",
  signupHaveAccount: "पहले से पंजीकृत?",
  signupLogin: "साइन इन",
  formUsername: "यूज़रनेम",
  formPassword: "पासवर्ड",
  formEmail: "ईमेल",
  formLoginBtn: "साइन इन",
  formSignupBtn: "अकाउंट बनाएँ",
  formError: "कुछ गलत हुआ। कृपया फिर कोशिश करें।",
};

const map: Partial<Record<Locale, PageChrome>> = {
  en,
  tr,
  es,
  "pt-br": ptBr,
  ar,
  id,
  bn,
  hi,
};

export function getPageChrome(locale: Locale): PageChrome {
  return map[locale] ?? en;
}
