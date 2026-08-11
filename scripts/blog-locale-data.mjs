/** Locale blog content factories — natural phrasing per language */

function postPack({
  title, metaTitle, metaDescription, fk, kw, excerpt, takeaway, alt1, alt2,
  intro, sections, table, outro, faq,
}) {
  return { title, metaTitle, metaDescription, fk, kw, excerpt, takeaway, alt1, alt2, intro, sections, table, outro, faq };
}

function makeLocale(t) {
  return {
    what: postPack(t.what),
    cheap: postPack(t.cheap),
    ig: postPack(t.ig),
    pp: postPack(t.pp),
    free: postPack(t.free),
  };
}

const tr = makeLocale({
  what: {
    title: "SMM Panel Nedir? Gerçek Başlangıç Rehberi (2026)",
    metaTitle: "SMM Panel Nedir? 2026 Başlangıç Rehberi | SSMM",
    metaDescription: "SMM panel nedir? Sipariş nasıl çalışır, güvenlik kuralları ve SSMM Panel’de ilk siparişi herkese açık linkle nasıl verirsin — net anlatım.",
    fk: "smm panel nedir",
    kw: ["smm panel nedir", "smm panel rehberi", "takipçi paneli", "ssmmpanel.com"],
    excerpt: "İçerik üreticileri ve küçük mağazalar için 2026’da SMM panelin ne olduğu, sipariş akışı ve ilk adımlar.",
    takeaway: "SMM panel, herkese açık linklerle sosyal kanıt siparişi verdiğin self-servis bir panodur. Küçük başla, durumu izle, sonra ücretli satıra geç. SSMM Panel ücretsiz deneme ve şeffaf servis sunar.",
    alt1: "SMM panel nedir — 2026 başlangıç rehberi kapak görseli",
    alt2: "SMM panel sipariş akışı — kayıt yükleme sipariş",
    intro: [
      "<strong>SMM panel nedir</strong> diye arıyorsan: sosyal medya pazarlama paneli; takipçi, beğeni, izlenme gibi servisleri bakiyeyle sipariş ettiğin web panosudur. Bakiye yükler, servis seçer, herkese açık URL yapıştırır, sistem teslimatı üst sağlayıcıya iletir.",
      "Ajans paketinden farkı kontrol sende kalmasıdır. <a href=\"/signup\">SSMM Panel</a>’de önce <a href=\"/free-services\">ücretsiz paket</a> dene, sonra <a href=\"/services\">servisler</a> ve <a href=\"/payments\">ödeme</a> ile ölçekle. Şifre asla istenmez.",
    ],
    sections: [
      { h2: "SMM Panel Nedir? Sade Anlatım", ps: [
        "Paneli toptan sosyal kanıt tezgâhı gibi düşün. Ajans strateji satar; panel teslimat satırları satar. Adet ve hızı sen seçersin; durum pending’den completed’a yazılır.",
        "Satırlar platform ve metrik bazlıdır: 1K fiyatı, min/max, drip-feed ve refill notları. En düşük rakam değil, okunabilir açıklama önemlidir. Genel çerçeve için <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a> maddesine bakabilirsin.",
      ]},
      { h2: "2026’da Kim Kullanıyor?", ps: [
        "Boş duran profillerde dikkat tutmak isteyen üreticiler, ürün düşüşünde beğeni/izlenme isteyen mağazalar, API ile kendi mağazasından satan reseller’lar.",
        "Ücretsiz deneme link formatını öğrenmek için idealdir. Kontrol sende: hangi URL, hangi adet, hangi zaman.",
      ]},
      { h2: "Tipik Sipariş Adımları", ps: [
        "Kayıt ol → bakiye yükle (<a href=\"/blog/paypal-smm-panel-how-to-add-funds\">PayPal rehberi</a>) → kategori/servis seç → herkese açık link → adet → gönder → Orders’tan izle.",
        "Reseller otomasyonu için <a href=\"/api-docs\">API dokümanı</a> var; önce 2–3 manuel sipariş önerilir.",
      ]},
      { h2: "Güvenlik ve İlk Sipariş İpuçları", ps: [
        "Özel hesaplara sipariş verme. Yeni hesapta devasa sıçrama yapma. Drip-feed varsa yavaş teslimat için kullan. Şifre paylaşan formlardan uzak dur.",
        "Ücretsiz vs ücretli karar için <a href=\"/blog/free-smm-services-vs-paid-when-to-upgrade\">bu rehbere</a> bak. Ucuz panel seçerken <a href=\"/blog/how-to-choose-the-cheapest-smm-panel\">kontrol listesi</a> işe yarar.",
      ]},
    ],
    table: { h: ["Hedef", "Servis tipi", "İpucu"], rows: [
      ["Profil kanıtı", "Takipçi", "Yeni hesapta yavaş başla"],
      ["Gönderi etkileşimi", "Beğeni", "Yayından hemen sonra"],
      ["Reels/video", "İzlenme", "Organikle birlikte kullan"],
    ]},
    outro: [
      "<a href=\"/signup\">Ücretsiz hesap aç</a>, bir deneme paketi al, sonra aynı metrikte ücretli satıra geç. Instagram odaklıysan <a href=\"/blog/instagram-smm-panel-followers-likes-reels\">Instagram rehberine</a> devam et.",
    ],
    faq: [
      ["SMM panel şifre ister mi?", "Hayır. Sadece herkese açık link veya kullanıcı adı formatı."],
      ["İlk siparişte ne kadar yüklemeliyim?", "Önce ücretsiz paket; sonra küçük PayPal/kripto yüklemesi yeterli."],
      ["Partial ne demek?", "Kısmi teslimat. Kalan adet ve iade kuralları servis satırına göre işler."],
      ["Reseller API var mı?", "Evet, PerfectPanel uyumlu /api/v2 — dashboard’dan anahtar alırsın."],
      ["Hangi platformlar?", "Instagram, TikTok, YouTube, Telegram ve katalogdaki diğerleri."],
      ["Destek nasıl?", "WhatsApp, Telegram, ticket veya e-posta — kullanıcı adını yaz."],
    ],
  },
  cheap: {
    title: "En Ucuz SMM Panel Nasıl Seçilir? (Tuzağa Düşmeden)",
    metaTitle: "En Ucuz SMM Panel Seçim Rehberi 2026 | SSMM",
    metaDescription: "En ucuz SMM panel sadece düşük fiyat değildir. Oran, refill, destek ve tamamlanma oranını nasıl karşılaştıracağını öğren.",
    fk: "en ucuz smm panel",
    kw: ["en ucuz smm panel", "ucuz smm panel", "smm panel karşılaştırma"],
    excerpt: "1K fiyatı, refill, destek ve deneme paketine bakmadan para yatırma.",
    takeaway: "En ucuz satır işe yaramayan satırdır. SSMM Panel’de ücretsiz dene, oranı ve durumu oku, sonra yükle.",
    alt1: "En ucuz SMM panel karşılaştırma kontrol listesi kapağı",
    alt2: "SMM panel oran ve refill karşılaştırma görseli",
    intro: [
      "<strong>En ucuz SMM panel</strong> ararken sadece fiyat sıralamasına bakma. Teslim edilmeyen sipariş veya kaybolan destek, ‘ucuz’u pahalıya getirir.",
      "SSMM Panel’de oranlar şeffaf, ücretsiz paketler test için var, destek kanıt+kullanıcı adıyla yüklemeyi eşler. <a href=\"/free-services\">Ücretsiz servisler</a> ile başla.",
    ],
    sections: [
      { h2: "Yüklemeden Önce Kontrol Listesi", ps: [
        "1K başına fiyat + min/max net mi? Servis notunda refill/partial var mı? Destek WhatsApp/ticket cevap veriyor mu? API dökümanı reseller için hazır mı?",
        "Küçük ücretsiz veya düşük adetli siparişle hızı ölç. Aynı ID’yi not et.",
      ]},
      { h2: "Fiyat Tuzağı", ps: [
        "Aşırı düşük oran çoğu zaman kalitesiz envanter veya iptal demektir. Ortalama başlama süresi ve kalan adet raporuna bak.",
        "Ajans fiyatıyla panel fiyatını karıştırma; farklı ürünlerdir.",
      ]},
      { h2: "SSMM Panel’de Nasıl Karar Verirsin?", ps: [
        "Ücretsiz paket → Orders durumu → beğendiğin satırı ücretli tekrarla. <a href=\"/payments\">Ödeme yöntemleri</a> ve <a href=\"/faq\">SSS</a> yardımcı olur.",
        "Reseller isen <a href=\"/api-docs\">API</a> ile kendi mağazandan sat; müşteri üst sağlayıcıyı görmez.",
      ]},
      { h2: "Kırmızı Bayraklar", ps: [
        "Şifre isteyen formlar, ‘anında 100K’ vaatleri, destek kanalı olmayan paneller, sürekli pending kalan siparişler.",
        "Şüphede ticket aç, kullanıcı adını yaz, büyük yükleme yapma.",
      ]},
    ],
    table: { h: ["Ölçüt", "İyi işaret", "Kötü işaret"], rows: [
      ["Fiyat", "Net 1K oranı", "Gizli ücret"],
      ["Destek", "Kanıt sonrası kredi", "Cevapsız sohbet"],
      ["Deneme", "Ücretsiz/küçük paket", "Zorunlu yüksek depozito"],
    ]},
    outro: ["<a href=\"/signup\">Hesap aç</a>, bir satırı test et, sonra ölçekle. Instagram için ayrı rehberimiz var."],
    faq: [
      ["En ucuz her zaman en iyisi mi?", "Hayır. Tamamlanma ve destek olmadan ucuz anlamsızdır."],
      ["Nasıl test ederim?", "Ücretsiz paket veya düşük adetle başla."],
      ["Refill nedir?", "Düşüş olursa belirli sürede tamamlanma vaadi — satırda yazmalı."],
      ["API şart mı?", "Sadece reseller için; bireysel kullanıcı panelden sipariş verir."],
      ["Minimum yükleme?", "Küçük tutarlar kabul edilir; yöntem sayfasına bak."],
      ["Chargeback?", "Önce destekle konuş; aksi halde hesap riski oluşur."],
    ],
  },
  ig: {
    title: "Instagram SMM Panel: Takipçi, Beğeni ve Reels İzlenme",
    metaTitle: "Instagram SMM Panel Rehberi — Takipçi & Reels | SSMM",
    metaDescription: "Instagram SMM panelinde takipçi, beğeni ve Reels izlenmeyi ne zaman sipariş edeceğin, drip-feed ve link kuralları.",
    fk: "instagram smm panel",
    kw: ["instagram smm panel", "instagram takipçi", "reels izlenme"],
    excerpt: "Hedefine göre doğru Instagram satırını seç; şifre yok, herkese açık URL.",
    takeaway: "Takipçi profil kanıtı, beğeni gönderi, izlenme Reels içindir. Aynı ID’yi ücretsiz denedikten sonra tekrarla.",
    alt1: "Instagram SMM panel takipçi beğeni Reels kapak",
    alt2: "Instagram sipariş satırları karışımı görseli",
    intro: [
      "<strong>Instagram SMM panel</strong> arayışı genelde takipçi + beğeni + Reels karışımı ister. SSMM Panel’de bunlar ayrı satırlardır; herkese açık profil/gönderi/Reels linki yeter.",
      "Önce <a href=\"/free-services\">ücretsiz Instagram paketleri</a> ile hızı gör, sonra <a href=\"/services\">servisler</a>den ölçekle.",
    ],
    sections: [
      { h2: "Takipçi Ne Zaman?", ps: ["Profil boş görünmesin diye kontrollü adet. Yeni hesapta drip-feed tercih et.", "Özel hesaplara sipariş gitmez."]},
      { h2: "Beğeni ve Reels", ps: ["Beğeniyi yayın sonrası ver. Reels izlenme organik hashtag ile birlikte daha anlamlıdır.", "Haftalar sonra ölü gönderiye yükleme israf olabilir."]},
      { h2: "Sipariş Pratiği", ps: ["Kategori → satır → URL → adet → onay. Orders’tan remains izle.", "Story için aktif story gerekir."]},
      { h2: "Sonraki Adım", ps: ["İyi giden satırı not et. Reseller isen API’ye geç. Genel panel bilgisi için <a href=\"/blog/what-is-an-smm-panel-beginners-guide-2026\">SMM panel nedir</a> yazısına bak."]},
    ],
    table: { h: ["Metrik", "Link tipi", "Not"], rows: [
      ["Takipçi", "Profil", "Yavaş başla"],
      ["Beğeni", "Gönderi", "Taze içerik"],
      ["Reels izlenme", "Reels URL", "Organikle birleştir"],
    ]},
    outro: ["<a href=\"/signup\">Kayıt ol</a> ve bir ücretsiz Instagram paketiyle başla."],
    faq: [
      ["Şifre gerekir mi?", "Hayır."],
      ["Story’ye nasıl?", "Hikâye herkese açık ve aktif olmalı."],
      ["Yorum paketi var mı?", "Katalogda comment satırları olabilir; açıklamayı oku."],
      ["Drip-feed?", "Varsa günlük eşit dilimler halinde teslimat."],
      ["Ücretsiz deneme?", "Evet, Free Services’te."],
      ["Ne zaman ücretli?", "Deneme temiz bittiyse ve daha yüksek adet istiyorsan."],
    ],
  },
  pp: {
    title: "PayPal SMM Panel — Bakiye Nasıl Güvenle Yüklenir?",
    metaTitle: "PayPal SMM Panel Bakiye Yükleme Rehberi | SSMM",
    metaDescription: "PayPal SMM panel bakiyesi: tutarı gönder, kullanıcı adını nota yaz, kanıtı ilet, destek cüzdanı günceller.",
    fk: "paypal smm panel",
    kw: ["paypal smm panel", "smm panel bakiye paypal", "smm ödeme"],
    excerpt: "PayPal ve diğer yöntemlerle SSMM bakiyesi yükleme adımları.",
    takeaway: "Nota kullanıcı adını yaz, kanıtı WhatsApp/ticket ile gönder; bakiye eşleşince tanımlanır.",
    alt1: "PayPal SMM panel bakiye yükleme kapak",
    alt2: "Ödeme kanıtı ve kullanıcı adı kontrol listesi",
    intro: [
      "<strong>PayPal SMM panel</strong> arıyorsan SSMM Panel PayPal’ın yanında kart, kripto, Skrill ve diğer yöntemleri kabul eder. Bugün yüklemeler kanıtla manuel onaylanır.",
      "Adımlar: Add funds → PayPal → tutarı gönder → nota kullanıcı adı → kanıt → bakiye. Detaylı yöntemler: <a href=\"/payments/paypal\">PayPal sayfası</a>.",
    ],
    sections: [
      { h2: "Adım Adım PayPal", ps: ["Dashboard’da Add funds aç. PayPal’ı seç. USD tutarı gönder.", "Not alanına panel kullanıcı adını yaz. Ekran görüntüsünü destekle paylaş."]},
      { h2: "Diğer Yöntemler", ps: ["Kripto, kart, Skrill, Revolut, Payoneer, PSC, havale, Binance Pay, Cryptomus — hepsi <a href=\"/payments\">Payments</a> altında.", "Hepsi aynı kural: kanıt + kullanıcı adı."]},
      { h2: "Sık Hatalar", ps: ["Nota isim yazmamak, yanlış tutar, özel ekran görüntüsü, sabırsız ikinci ödeme.", "Tek kanıtla bekle; destek eşleştirir."]},
      { h2: "Sonrası", ps: ["Bakiye gelince New order veya ücretsiz paket. API için bakiyeyi /api/v2 balance ile okuyabilirsin."]},
    ],
    table: { h: ["Adım", "Sen", "Destek"], rows: [
      ["1", "Yöntem seç", "—"],
      ["2", "Öde + nota yaz", "—"],
      ["3", "Kanıt gönder", "Eşleştirir"],
      ["4", "Sipariş ver", "Durum günceller"],
    ]},
    outro: ["<a href=\"/signup\">Giriş yap</a> veya kayıt ol, sonra Add funds’a geç."],
    faq: [
      ["Ne kadar sürer?", "Kanıt netse genelde hızlı onaylanır."],
      ["Kripto da var mı?", "Evet."],
      ["Minimum?", "Küçük ilk yükleme mümkün."],
      ["Chargeback?", "Önce destek; aksi risklidir."],
      ["Otomatik mi?", "Şu an manuel onay; otomasyon yol haritasında."],
      ["Kullanıcı adı şart mı?", "Evet, eşleştirme için."],
    ],
  },
  free: {
    title: "Ücretsiz SMM Servisleri vs Ücretli — Ne Zaman Yükseltmeli?",
    metaTitle: "Ücretsiz SMM Servisleri vs Ücretli Rehber | SSMM",
    metaDescription: "Ücretsiz SMM servisleriyle test et, ücretliye ne zaman geçeceğini öğren. SSMM Panel deneme ve ölçek yolu.",
    fk: "ücretsiz smm servisleri",
    kw: ["ücretsiz smm servisleri", "ücretsiz takipçi deneme", "smm panel ücretsiz"],
    excerpt: "Ücretsiz paket kaliteyi ölçer; ücretli tutarlı büyümeyi açar.",
    takeaway: "Ücretsizle hızı gör, aynı satırı ücretli tekrarla. Şifre yok, cooldown’a uy.",
    alt1: "Ücretsiz SMM servisleri vs ücretli karar kapağı",
    alt2: "Denemeden ölçeğe geçiş görseli",
    intro: [
      "<strong>Ücretsiz SMM servisleri</strong> panele ilk girişte kör yükleme riskini azaltır. SSMM Panel’de 20 deneme paketi var; cooldown ve herkese açık link kuralı geçerlidir.",
      "Liste: <a href=\"/free-services\">Free Services</a>. Yükseltme sonrası <a href=\"/payments\">ödeme</a> ve <a href=\"/services\">katalog</a>.",
    ],
    sections: [
      { h2: "Ücretsizde Kal", ps: ["İlk panel deneyimi, link formatı testi, destek hızını ölçmek için."]},
      { h2: "Ücretliye Geç", ps: ["Günlük tutarlı büyüme, müşteri işi, API otomasyonu gerektiğinde."]},
      { h2: "Karar Tablosu", ps: ["Ücretsiz temiz bittiyse ve aynı metriği büyütmek istiyorsan yükle.", "Takıldıysa ticket aç, büyük para yatırma."]},
      { h2: "Pratik Yol", ps: ["Ücretsiz paketi al → Orders izle → beğendiğin ID’yi not et → küçük bakiye → tekrar sipariş."]},
    ],
    table: { h: ["Durum", "Ücretsiz", "Ücretli"], rows: [
      ["Adet", "Küçük", "Yüksek max"],
      ["Amaç", "Test", "Ölçek"],
      ["API", "Hayır (insan denemesi)", "Evet"],
    ]},
    outro: ["Bugün bir ücretsiz paketle başla: <a href=\"/free-services\">tüm paketler</a>."],
    faq: [
      ["Kaç ücretsiz paket var?", "20 — IG, TT, YT, TG, FB, X, Spotify, Twitch."],
      ["Cooldown nedir?", "Aynı paketi tekrar almak için bekleme süresi."],
      ["Şifre?", "İstenmez."],
      ["Ücretli refill?", "Satır açıklamasına bağlı."],
      ["Reseller ücretsizi satabilir mi?", "Hayır; müşteri için ücretli API kullan."],
      ["Nasıl yükseltilir?", "Ödeme sonrası Services’ten aynı metrik."],
    ],
  },
});

// For other locales, clone structure with natural translations
function translatePack(base, mapFn) {
  return mapFn(base);
}

const es = makeLocale({
  what: {
    title: "¿Qué es un panel SMM? Guía real para principiantes (2026)",
    metaTitle: "¿Qué es un panel SMM? Guía 2026 | SSMM Panel",
    metaDescription: "Qué es un panel SMM, cómo funcionan los pedidos, reglas de seguridad y cómo hacer el primer pedido en SSMM Panel solo con enlaces públicos.",
    fk: "qué es un panel smm",
    kw: ["qué es un panel smm", "guía panel smm", "panel seguidores", "ssmmpanel.com"],
    excerpt: "Explicación práctica 2026 para creadores y tiendas: pedidos, seguridad y primeros pasos.",
    takeaway: "Un panel SMM es un escritorio self-service para pedir prueba social con enlaces públicos. Empieza pequeño en SSMM Panel con pruebas gratis.",
    alt1: "Qué es un panel SMM — portada guía principiante 2026",
    alt2: "Flujo de pedido en panel SMM ilustrado",
    intro: [
      "Si buscas <strong>qué es un panel SMM</strong>: es un panel web donde compras seguidores, likes o vistas con saldo, eliges servicio, pegas una URL pública y se cumple el pedido.",
      "En <a href=\"/signup\">SSMM Panel</a> prueba <a href=\"/free-services\">packs gratis</a> antes de <a href=\"/payments\">recargar</a>. Nunca pidas ni envíes contraseñas.",
    ],
    sections: [
      { h2: "Definición clara", ps: ["El panel vende cumplimiento, no estrategia de agencia. Lees precio por 1K, min/max y notas de refill.", "Contexto amplio: <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a>."]},
      { h2: "Quién lo usa", ps: ["Creadores, tiendas y revendedores API. El control de cantidad y enlace es tuyo."]},
      { h2: "Pasos del pedido", ps: ["Registro → fondos → servicio → enlace público → cantidad → Orders. API en <a href=\"/api-docs\">docs</a>."]},
      { h2: "Seguridad", ps: ["Solo perfiles públicos. Evita picos enormes en cuentas nuevas. Usa drip-feed si existe."]},
    ],
    table: { h: ["Meta", "Servicio", "Consejo"], rows: [["Prueba social", "Seguidores", "Empieza lento"], ["Post", "Likes", "Tras publicar"], ["Reels", "Vistas", "Con orgánico"]]},
    outro: ["<a href=\"/signup\">Crea cuenta</a> y prueba un pack gratis."],
    faq: [["¿Contraseña?", "No."], ["¿Cuánto depositar?", "Primero gratis, luego poco."], ["¿Partial?", "Entrega parcial según la fila."], ["¿API?", "Sí, /api/v2."], ["¿Plataformas?", "IG, TikTok, YouTube, Telegram…"], ["¿Soporte?", "WhatsApp, Telegram, ticket."]],
  },
  cheap: {
    title: "Cómo elegir el panel SMM más barato sin que te engañen",
    metaTitle: "Panel SMM más barato — checklist 2026 | SSMM",
    metaDescription: "El panel SMM más barato no es solo el precio más bajo. Compara tarifa, refill, soporte y pruebas.",
    fk: "panel smm más barato",
    kw: ["panel smm más barato", "panel smm barato", "comparar panel smm"],
    excerpt: "Checklist antes de depositar: tarifa, soporte, prueba gratis.",
    takeaway: "Barato sin entrega es caro. Prueba en SSMM Panel y luego escala.",
    alt1: "Checklist panel SMM más barato portada",
    alt2: "Comparar tarifas y refill panel SMM",
    intro: ["Buscar el <strong>panel SMM más barato</strong> exige mirar más que el número. SSMM ofrece pruebas y soporte con comprobante."],
    sections: [
      { h2: "Checklist", ps: ["Tarifa/1K clara, refill escrito, soporte real, API si revendes."]},
      { h2: "Trampa del precio", ps: ["Precios absurdos suelen fallar o cancelar."]},
      { h2: "Decidir en SSMM", ps: ["Pack gratis → Orders → repetir fila de pago."]},
      { h2: "Banderas rojas", ps: ["Piden contraseña, promesas mágicas, cero soporte."]},
    ],
    table: { h: ["Criterio", "Bien", "Mal"], rows: [["Precio", "Claro", "Oculto"], ["Soporte", "Crédito tras prueba", "Silencio"], ["Prueba", "Pack gratis", "Depósito alto obligatorio"]]},
    outro: ["<a href=\"/signup\">Regístrate</a> y prueba una fila."],
    faq: [["¿Lo más barato es mejor?", "No."], ["¿Cómo probar?", "Pack gratis."], ["¿Refill?", "Si la fila lo dice."], ["¿API?", "Para resellers."], ["¿Mínimo?", "Depósitos pequeños ok."], ["¿Chargeback?", "Habla primero con soporte."]],
  },
  ig: {
    title: "Panel SMM Instagram: seguidores, likes y vistas Reels",
    metaTitle: "Panel SMM Instagram — guía práctica | SSMM",
    metaDescription: "Cómo pedir seguidores, likes y vistas Reels en un panel SMM Instagram con URL pública.",
    fk: "panel smm instagram",
    kw: ["panel smm instagram", "seguidores instagram", "vistas reels"],
    excerpt: "Elige la fila correcta según tu meta en Instagram.",
    takeaway: "Seguidores = perfil, likes = post, vistas = Reels. Prueba gratis primero.",
    alt1: "Panel SMM Instagram portada",
    alt2: "Mezcla de servicios Instagram",
    intro: ["Un <strong>panel SMM Instagram</strong> separa métricas en filas. En SSMM solo enlaces públicos."],
    sections: [
      { h2: "Seguidores", ps: ["Prueba social controlada; drip en cuentas nuevas."]},
      { h2: "Likes y Reels", ps: ["Likes tras publicar; vistas con orgánico."]},
      { h2: "Práctica", ps: ["Categoría → fila → URL → cantidad → Orders."]},
      { h2: "Siguiente", ps: ["Repite el ID que funcionó."]},
    ],
    table: { h: ["Métrica", "Enlace", "Nota"], rows: [["Seguidores", "Perfil", "Lento"], ["Likes", "Post", "Fresco"], ["Reels", "URL Reels", "Con orgánico"]]},
    outro: ["Empieza en <a href=\"/free-services\">packs gratis</a>."],
    faq: [["¿Password?", "No."], ["¿Stories?", "Deben estar activas y públicas."], ["¿Comentarios?", "Si hay fila en catálogo."], ["¿Drip?", "Si la fila lo permite."], ["¿Gratis?", "Sí."], ["¿Pago?", "Tras una prueba limpia."]],
  },
  pp: {
    title: "Panel SMM PayPal — cómo añadir fondos con seguridad",
    metaTitle: "Panel SMM PayPal recarga de saldo | SSMM",
    metaDescription: "Recarga SSMM Panel con PayPal: envía el pago, pon tu usuario en la nota, comparte el comprobante.",
    fk: "panel smm paypal",
    kw: ["panel smm paypal", "recargar panel smm paypal"],
    excerpt: "Pasos para cargar saldo con PayPal y otros métodos.",
    takeaway: "Nota con usuario + comprobante = crédito de saldo.",
    alt1: "Panel SMM PayPal portada",
    alt2: "Checklist comprobante de pago",
    intro: ["Si buscas <strong>panel SMM PayPal</strong>, SSMM acepta PayPal y más. Confirmación manual con prueba."],
    sections: [
      { h2: "Pasos PayPal", ps: ["Add funds → PayPal → envía USD → nota con usuario → prueba al soporte."]},
      { h2: "Otros métodos", ps: ["Crypto, tarjeta, Skrill… en <a href=\"/payments\">Payments</a>."]},
      { h2: "Errores", ps: ["Olvidar el usuario en la nota o duplicar pagos."]},
      { h2: "Después", ps: ["Pide en New order o packs gratis."]},
    ],
    table: { h: ["Paso", "Tú", "Soporte"], rows: [["1", "Elige método", "—"], ["2", "Paga + nota", "—"], ["3", "Prueba", "Verifica"], ["4", "Pide", "Estado"]]},
    outro: ["<a href=\"/signup\">Entra</a> y abre Add funds."],
    faq: [["¿Tiempo?", "Rápido si la prueba es clara."], ["¿Crypto?", "Sí."], ["¿Mínimo?", "Pequeño ok."], ["¿Chargeback?", "Habla antes."], ["¿Auto?", "Manual hoy."], ["¿Usuario en nota?", "Obligatorio."]],
  },
  free: {
    title: "Servicios SMM gratis vs de pago — cuándo subir",
    metaTitle: "Servicios SMM gratis vs pago | SSMM Panel",
    metaDescription: "Usa servicios SMM gratis para probar y decide cuándo pasar a pago en SSMM Panel.",
    fk: "servicios smm gratis",
    kw: ["servicios smm gratis", "seguidores gratis prueba", "panel smm gratis"],
    excerpt: "Gratis mide calidad; pago escala volumen.",
    takeaway: "Prueba gratis, respeta cooldown, escala el mismo ID de pago.",
    alt1: "Servicios SMM gratis vs pago portada",
    alt2: "De prueba a escala",
    intro: ["Los <strong>servicios SMM gratis</strong> reducen depósitos a ciegas. SSMM tiene 20 packs de prueba."],
    sections: [
      { h2: "Quédate en gratis", ps: ["Primera vez, test de enlace, medir soporte."]},
      { h2: "Pasa a pago", ps: ["Crecimiento diario, clientes, API."]},
      { h2: "Tabla de decisión", ps: ["Si el gratis termina bien, recarga."]},
      { h2: "Ruta", ps: ["Pack gratis → Orders → ID → depósito → repetir."]},
    ],
    table: { h: ["", "Gratis", "Pago"], rows: [["Cantidad", "Pequeña", "Alta"], ["Meta", "Test", "Escala"], ["API", "No", "Sí"]]},
    outro: ["Ve a <a href=\"/free-services\">packs gratis</a>."],
    faq: [["¿Cuántos packs?", "20."], ["¿Cooldown?", "Espera entre claims."], ["¿Password?", "No."], ["¿Refill pago?", "Según fila."], ["¿Reseller vende gratis?", "No."], ["¿Cómo subir?", "Payments + Services."]],
  },
});

// Shorter factories for remaining locales using same structure pattern
function quickLocale(lang) {
  const d = {
    pt: {
      whatT: "O que é um painel SMM? Guia real para iniciantes (2026)",
      cheapT: "Como escolher o painel SMM mais barato sem cair em golpe",
      igT: "Painel SMM Instagram: seguidores, likes e views de Reels",
      ppT: "Painel SMM PayPal — como adicionar fundos com segurança",
      freeT: "Serviços SMM grátis vs pagos — quando fazer upgrade",
      whatFk: "o que é um painel smm",
      cheapFk: "painel smm mais barato",
      igFk: "painel smm instagram",
      ppFk: "painel smm paypal",
      freeFk: "serviços smm grátis",
    },
    id: {
      whatT: "Apa itu panel SMM? Panduan pemula yang nyata (2026)",
      cheapT: "Cara memilih panel SMM termurah tanpa tertipu",
      igT: "Panel SMM Instagram: followers, likes, dan views Reels",
      ppT: "Panel SMM PayPal — cara isi saldo dengan aman",
      freeT: "Layanan SMM gratis vs berbayar — kapan upgrade",
      whatFk: "apa itu panel smm",
      cheapFk: "panel smm termurah",
      igFk: "panel smm instagram",
      ppFk: "panel smm paypal",
      freeFk: "layanan smm gratis",
    },
    ar: {
      whatT: "ما هو لوحة SMM؟ دليل مبتدئين حقيقي (2026)",
      cheapT: "كيف تختار أرخص لوحة SMM دون أن تُخدع",
      igT: "لوحة SMM لإنستغرام: متابعون وإعجابات ومشاهدات الريلز",
      ppT: "لوحة SMM عبر PayPal — شحن الرصيد بأمان",
      freeT: "خدمات SMM المجانية مقابل المدفوعة — متى الترقية",
      whatFk: "ما هو لوحة smm",
      cheapFk: "أرخص لوحة smm",
      igFk: "لوحة smm انستغرام",
      ppFk: "لوحة smm paypal",
      freeFk: "خدمات smm مجانية",
    },
    bn: {
      whatT: "SMM প্যানেল কী? সত্যিকারের বিগিনার গাইড (2026)",
      cheapT: "প্রতারিত না হয়ে সবচেয়ে সস্তা SMM প্যানেল কীভাবে বেছে নেবেন",
      igT: "Instagram SMM প্যানেল: ফলোয়ার, লাইক ও Reels ভিউ",
      ppT: "PayPal SMM প্যানেল — নিরাপদে ব্যালেন্স যোগ করুন",
      freeT: "ফ্রি SMM সার্ভিস বনাম পেইড — কখন আপগ্রেড",
      whatFk: "smm প্যানেল কী",
      cheapFk: "সস্তা smm প্যানেল",
      igFk: "instagram smm প্যানেল",
      ppFk: "paypal smm প্যানেল",
      freeFk: "ফ্রি smm সার্ভিস",
    },
    hi: {
      whatT: "SMM पैनल क्या है? असली बिगिनर गाइड (2026)",
      cheapT: "धोखा खाए बिना सबसे सस्ता SMM पैनल कैसे चुनें",
      igT: "Instagram SMM पैनल: फॉलोअर्स, लाइक्स और Reels व्यूज़",
      ppT: "PayPal SMM पैनल — सुरक्षित तरीके से बैलेंस जोड़ें",
      freeT: "फ्री SMM सेवाएँ बनाम पेड — कब अपग्रेड करें",
      whatFk: "smm पैनल क्या है",
      cheapFk: "सस्ता smm पैनल",
      igFk: "instagram smm पैनल",
      ppFk: "paypal smm पैनल",
      freeFk: "फ्री smm सेवाएँ",
    },
  }[lang];

  const pass = "No";
  const yes = "Yes";

  const skeleton = (title, fk, topic) => ({
    title,
    metaTitle: `${title.split("—")[0].split("?")[0].trim()} | SSMM`,
    metaDescription: `${title} SSMM Panel ssmmpanel.com — public links only, free trials, clear orders.`,
    fk,
    kw: [fk, "ssmm panel", "smm panel"],
    excerpt: title,
    takeaway: `${title} — start with a free pack on SSMM Panel, public URL only, then scale paid lines.`,
    alt1: `${title} cover`,
    alt2: `${title} mid image`,
    intro: [
      `<strong>${fk}</strong> — practical guide on SSMM Panel (ssmmpanel.com). Use <a href="/free-services">free services</a>, then <a href="/payments">payments</a> and <a href="/services">services</a>. Never share passwords.`,
      `This article explains ${topic} with clear steps for creators and resellers.`,
    ],
    sections: [
      { h2: "Overview", ps: [`Learn the core idea behind ${fk} and how SSMM Panel fits a real workflow.`, "Orders use public URLs only."] },
      { h2: "How it works", ps: ["Sign up, optional free pack, deposit with username + proof, order from the dashboard.", "Track status in Orders; resellers can use <a href=\"/api-docs\">API docs</a>."] },
      { h2: "Practical tips", ps: ["Start small. Prefer drip-feed on new accounts when available.", "Read service min/max and refill notes before scaling."] },
      { h2: "Next steps", ps: ["Open <a href=\"/signup\">signup</a>, claim a free pack, then upgrade when the line looks right.", "See also our other blog guides and <a href=\"/faq\">FAQ</a>."] },
    ],
    table: {
      h: ["Item", "Action", "Note"],
      rows: [
        ["Account", "Sign up", "Free"],
        ["Test", "Free pack", "Public link"],
        ["Scale", "Paid order", "Same metric"],
      ],
    },
    outro: [`Start now: <a href="/signup">create an account</a> on SSMM Panel.`],
    faq: [
      ["Password needed?", pass === "No" ? "No. Public URL only." : pass],
      ["Free trial?", "Yes — Free Services packs."],
      ["Payments?", "PayPal, crypto, card and more with proof."],
      ["API?", "PerfectPanel-compatible /api/v2."],
      ["Support?", "WhatsApp, Telegram, ticket, email."],
      ["Private accounts?", "Usually cannot be fulfilled — make public first."],
    ],
  });

  return makeLocale({
    what: { ...skeleton(d.whatT, d.whatFk, "SMM panels"), title: d.whatT, fk: d.whatFk, metaTitle: `${d.whatT.slice(0, 48)} | SSMM`, metaDescription: `${d.whatT} — SSMM Panel beginner guide with public links only.` },
    cheap: { ...skeleton(d.cheapT, d.cheapFk, "choosing a cheap panel"), title: d.cheapT, fk: d.cheapFk, metaTitle: `${d.cheapT.slice(0, 48)} | SSMM`, metaDescription: `${d.cheapT} Checklist for rates, refill and support.` },
    ig: { ...skeleton(d.igT, d.igFk, "Instagram orders"), title: d.igT, fk: d.igFk, metaTitle: `${d.igT.slice(0, 48)} | SSMM`, metaDescription: `${d.igT} Followers, likes, Reels on public URLs.` },
    pp: { ...skeleton(d.ppT, d.ppFk, "PayPal deposits"), title: d.ppT, fk: d.ppFk, metaTitle: `${d.ppT.slice(0, 48)} | SSMM`, metaDescription: `${d.ppT} Username in note + payment proof.` },
    free: { ...skeleton(d.freeT, d.freeFk, "free vs paid packs"), title: d.freeT, fk: d.freeFk, metaTitle: `${d.freeT.slice(0, 48)} | SSMM`, metaDescription: `${d.freeT} When to upgrade from free trials.` },
  });
}

// Improve pt-br / id / ar / bn / hi with fuller native intros by overlaying after skeleton
const ptBr = quickLocale("pt");
const id = quickLocale("id");
const ar = quickLocale("ar");
const bn = quickLocale("bn");
const hi = quickLocale("hi");

// Patch pt-br intros to Portuguese
ptBr.what.intro = [
  "Se você busca <strong>o que é um painel SMM</strong>: é um painel web para pedir seguidores, likes e views com saldo, colando só URL pública.",
  "No <a href=\"/signup\">SSMM Panel</a>, teste <a href=\"/free-services\">pacotes grátis</a> antes de <a href=\"/payments\">depositar</a>. Nunca compartilhe senha.",
];
ptBr.what.sections = [
  { h2: "Definição clara", ps: ["O painel vende cumprimento, não consultoria de agência. Veja preço por 1K, min/max e notas.", "Contexto: <a href=\"https://en.wikipedia.org/wiki/Social_media_marketing\" rel=\"noopener noreferrer\">social media marketing</a>."] },
  { h2: "Quem usa", ps: ["Criadores, lojas e revendedores via API."] },
  { h2: "Passos do pedido", ps: ["Cadastro → saldo → serviço → link público → quantidade → Orders."] },
  { h2: "Segurança", ps: ["Só perfis públicos. Evite picos enormes em contas novas."] },
];
ptBr.what.faq = [["Precisa de senha?", "Não."], ["Quanto depositar?", "Primeiro grátis, depois pouco."], ["Partial?", "Entrega parcial conforme a linha."], ["API?", "Sim, /api/v2."], ["Plataformas?", "IG, TikTok, YouTube, Telegram…"], ["Suporte?", "WhatsApp, Telegram, ticket."]];

ptBr.cheap.intro = ["O <strong>painel SMM mais barato</strong> não é só o menor preço. Veja entrega e suporte. SSMM tem testes grátis."];
ptBr.ig.intro = ["Um <strong>painel SMM Instagram</strong> separa seguidores, likes e Reels. Só links públicos no SSMM."];
ptBr.pp.intro = ["Para <strong>painel SMM PayPal</strong>: pague, coloque o usuário na nota, envie o comprovante."];
ptBr.free.intro = ["<strong>Serviços SMM grátis</strong> reduzem depósito cego. Há 20 packs de teste no SSMM."];

id.what.intro = [
  "Mencari <strong>apa itu panel SMM</strong>? Itu dasbor untuk memesan followers/likes/views dengan saldo dan URL publik saja.",
  "Di <a href=\"/signup\">SSMM Panel</a>, coba <a href=\"/free-services\">paket gratis</a> dulu. Jangan pernah kirim password.",
];
id.cheap.intro = ["<strong>Panel SMM termurah</strong> harus dicek pengiriman dan support-nya, bukan hanya harga."];
id.ig.intro = ["<strong>Panel SMM Instagram</strong> memisahkan baris followers, likes, dan Reels."];
id.pp.intro = ["Isi saldo <strong>panel SMM PayPal</strong>: transfer, tulis username di catatan, kirim bukti."];
id.free.intro = ["<strong>Layanan SMM gratis</strong> untuk uji coba sebelum top-up besar — 20 paket di SSMM."];

ar.what.intro = [
  "إذا بحثت عن <strong>ما هو لوحة SMM</strong>: لوحة ويب لطلب متابعين وإعجابات ومشاهدات برصيد ورابط عام فقط.",
  "في <a href=\"/signup\">SSMM Panel</a> جرّب <a href=\"/free-services\">الباقات المجانية</a> قبل الشحن. لا تشارك كلمة المرور أبدًا.",
];
ar.cheap.intro = ["<strong>أرخص لوحة SMM</strong> ليست أقل سعر فقط — راقب التسليم والدعم."];
ar.ig.intro = ["<strong>لوحة SMM لإنستغرام</strong> تفصل صفوف المتابعين والإعجابات والريلز."];
ar.pp.intro = ["لشحن <strong>لوحة SMM عبر PayPal</strong>: ادفع، اكتب اسم المستخدم، أرسل الإثبات."];
ar.free.intro = ["<strong>خدمات SMM المجانية</strong> تقلّل الإيداع الأعمى — 20 باقة تجريبية."];

bn.what.intro = [
  "<strong>SMM প্যানেল কী</strong>? ব্যালেন্স দিয়ে পাবলিক URL-এ ফলোয়ার/লাইক/ভিউ অর্ডারের ড্যাশবোর্ড।",
  "<a href=\"/signup\">SSMM Panel</a>-এ আগে <a href=\"/free-services\">ফ্রি প্যাক</a> নিন। পাসওয়ার্ড কখনো দেবেন না।",
];
bn.cheap.intro = ["<strong>সস্তা SMM প্যানেল</strong> মানে শুধু দাম নয় — ডেলিভারি ও সাপোর্ট দেখুন।"];
bn.ig.intro = ["<strong>Instagram SMM প্যানেল</strong>-এ আলাদা সারিতে ফলোয়ার, লাইক, Reels।"];
bn.pp.intro = ["<strong>PayPal SMM প্যানেল</strong> ব্যালেন্স: পেমেন্ট + ইউজারনেম নোট + প্রুফ।"];
bn.free.intro = ["<strong>ফ্রি SMM সার্ভিস</strong> দিয়ে টেস্ট করুন — SSMM-এ ২০টি ট্রায়াল প্যাক।"];

hi.what.intro = [
  "<strong>SMM पैनल क्या है</strong>? पब्लिक URL पर फॉलोअर्स/लाइक्स/व्यूज़ ऑर्डर करने वाला डैशबोर्ड।",
  "<a href=\"/signup\">SSMM Panel</a> पर पहले <a href=\"/free-services\">फ्री पैक</a> आज़माएँ। पासवर्ड कभी न दें।",
];
hi.cheap.intro = ["<strong>सस्ता SMM पैनल</strong> सिर्फ़ कीमत नहीं — डिलीवरी और सपोर्ट देखें।"];
hi.ig.intro = ["<strong>Instagram SMM पैनल</strong> में फॉलोअर्स, लाइक्स, Reels अलग पंक्तियाँ हैं।"];
hi.pp.intro = ["<strong>PayPal SMM पैनल</strong> बैलेंस: भुगतान + यूज़रनेम नोट + प्रूफ़।"];
hi.free.intro = ["<strong>फ्री SMM सेवाएँ</strong> से टेस्ट करें — SSMM पर 20 ट्रायल पैक।"];

export const LOCALE_DATA = { tr, es, "pt-br": ptBr, ar, id, bn, hi };
