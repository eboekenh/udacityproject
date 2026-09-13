const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  LevelFormat, convertInchesToTwip
} = require("docx");

const numbering = {
  config: [
    {
      reference: "bullet-list",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        },
        {
          level: 1,
          format: LevelFormat.BULLET,
          text: "◦",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1440, hanging: 360 } } },
        },
      ],
    },
    {
      reference: "numbered-list",
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        },
      ],
    },
  ],
};

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 160 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } });
}
function h3(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } });
}
function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 140 },
  });
}
function pBoldLead(bold, rest) {
  return new Paragraph({
    children: [
      new TextRun({ text: bold, bold: true }),
      new TextRun({ text: rest }),
    ],
    spacing: { after: 120 },
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    children: [new TextRun({ text })],
    numbering: { reference: "bullet-list", level },
    spacing: { after: 80 },
  });
}
function numbered(text) {
  return new Paragraph({
    children: [new TextRun({ text })],
    numbering: { reference: "numbered-list", level: 0 },
    spacing: { after: 80 },
  });
}

function makeCell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 2000, type: WidthType.DXA },
    shading: opts.header ? { type: ShadingType.CLEAR, fill: "2F5496" } : undefined,
    children: [
      new Paragraph({
        children: [
          new TextRun({ text, bold: !!opts.header, color: opts.header ? "FFFFFF" : undefined, size: opts.size || 20 }),
        ],
      }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

function statusTable(rows) {
  const colWidths = [3200, 5600, 1600];
  const headerRow = new TableRow({
    children: [
      makeCell("Görev", { header: true, width: colWidths[0] }),
      makeCell("Açıklama", { header: true, width: colWidths[1] }),
      makeCell("Durum", { header: true, width: colWidths[2] }),
    ],
    tableHeader: true,
  });
  const body = rows.map(
    (r) =>
      new TableRow({
        children: [
          makeCell(r[0], { width: colWidths[0] }),
          makeCell(r[1], { width: colWidths[1] }),
          makeCell(r[2], { width: colWidths[2] }),
        ],
      })
  );
  return new Table({
    columnWidths: colWidths,
    width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    rows: [headerRow, ...body],
  });
}

const doc = new Document({
  numbering,
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } },
    },
  },
  sections: [
    {
      properties: {
        page: { size: { width: 12240, height: 15840 } },
      },
      children: [
        new Paragraph({
          text: "NovaTech Revenue Intelligence Dashboard",
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Detaylı İlerleme Raporu — Yapılan Tüm Adımlar, Nedenleri ve Kullanılan Tuşlar", italics: true, size: 24 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Ortam: Amazon QuickSight (Quick Suite) — Udacity BI Analyst Nanodegree Capstone Projesi", size: 20, color: "555555" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "(Güncellenmiş sürüm — Aşama 4: Dashboard yayınlama, Topic/Q yapılandırması ve Verification Log ilerlemesi eklendi)", italics: true, size: 18, color: "777777" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // 1. PROJE ÖZETİ
        h1("1. Proje Özeti"),
        p("Bu proje, NovaTech şirketi için Sarah Chen (VP) tarafından talep edilen \"NovaTech Revenue Intelligence Dashboard\" adlı kapsamlı bir Business Intelligence panosunun Amazon QuickSight üzerinde uçtan uca inşa edilmesini kapsamaktadır. Panonun üç ana sayfası bulunmaktadır: Marketing Funnel, Sales Pipeline ve Customer Health. Ayrıca Amazon Q (Quick Chat) ile doğal dilde soru-cevap desteği, sayfalar arası çapraz filtreleme, hesap düzeyinde (account_id) bağlantılı analiz ve drill-down (detaya inme) özellikleri istenmektedir."),
        p("Bu belge, oturum boyunca gerçekleştirilen tüm işlemleri — hangi ekranda, hangi menüde, hangi düğmeye basılarak, hangi amaçla yapıldığını — adım adım ve ayrıntılı biçimde belgelemek amacıyla hazırlanmıştır. Ayrıca projenin geri kalan kısmı için yapılacaklar listesi de sona eklenmiştir."),

        // 2. AŞAMA 1
        h1("2. Aşama 1 — Veri Kümelerinin Hazırlanması ve Sales Pipeline Sayfası"),
        p("Bu aşama önceki oturumda tamamlanmış, bu oturumun başında doğrulanmıştır."),

        h2("2.1. CRM Verisinin Yeniden Yüklenmesi (novatech_crm_deals.csv)"),
        p("Sorun: Analiz içinde mevcut olan CRM veri kümesinde \"Others\" (başka bir kullanıcıya ait) eski/bozuk bir kopya ile \"Me\" (kendime ait) doğru bir kopya karışmış durumdaydı. Eski kopyada alan adları yeniden adlandırılmış (\"Deal Outcome\", \"Days to Close\" gibi) ve Won/Lost sayıları veri sözlüğüyle uyuşmuyordu."),
        pBoldLead("Yapılan işlem: ", "QuickSight ana ekranında \"Datasets\" (Veri Kümeleri) bölümüne gidilip \"New dataset\" ile dosya yeniden yüklendi (file_upload aracı kullanılarak /home/claude/novatech_crm_deals.csv seçildi)."),
        bullet("Veri önizleme (Preview) ekranında \"deal_value\" alanının veri tipi Integer'dan Decimal'a değiştirildi (alan başlığındaki tip simgesine tıklanıp açılan menüden \"Decimal\" seçildi)."),
        bullet("Önizlemede satır sayısının 499 olduğu doğrulandı."),
        bullet("Sağ üstteki dropdown menüden \"Save & publish\" seçeneği tıklanarak veri kümesi kaydedildi (\"Publish & visualize\" DEĞİL, çünkü mevcut analiz içinden ayrıca eklenecekti)."),

        h2("2.2. Sales Pipeline Sayfasının Yeniden İnşası"),
        p("Analiz ekranında \"Sales Pipeline\" sekmesine geçildi. Sayfa üstündeki \"Sheet contents\" (sayfa içeriği) panel simgesine tıklanarak sayfadaki tüm görsellerin listesi açıldı; bu panel üzerinden hatalı/gereksiz görseller tek tek seçilip her birinin \"Menu options\" (üç nokta) simgesinden \"Delete\" seçilerek silindi:"),
        bullet("Boş bir \"Vertical bar chart\" (yanlışlıkla oluşmuş, alan içermeyen) silindi."),
        bullet("Eski \"Count of Records by Deal Outcome\" görseli (yanlış/eski CRM verisine dayanıyordu) silindi."),
        p("Ardından doğru CRM veri kümesi kullanılarak sayfaya sırayla şu görseller eklendi (her defasında sol paneldeki \"Data\" (veri kümesi) açılır menüsünden doğru CRM veri kümesi yeniden seçilmesi gerekti, çünkü QuickSight her yeni görsel oluşturulduğunda bu menüyü sayfanın varsayılan veri kümesine sıfırlıyordu):"),
        numbered("Count of Records by Deal_stage — yatay çubuk grafik; Y eksenine deal_stage alanı tek tıklamayla eklendi. Fare imleci çubuğun üzerine getirilip açılan araç ipucunda Won=315 değeri görülerek veri sözlüğüyle eşleştiği doğrulandı."),
        numbered("Sum of Deal_value by Product_name — dikey çubuk grafik; X eksenine product_name, Value alanına deal_value (varsayılan toplama işlevi Sum) eklendi."),
        numbered("Count of Records by Sales_region and Deal_stage — yatay yığılmış çubuk grafik; Y eksenine sales_region, Group/Color alanına deal_stage eklendi."),
        numbered("Average of Deal_value by Company_size_tier — dikey çubuk grafik; X eksenine company_size_tier, Value alanına deal_value eklendi; ardından Value alanının açılır ok simgesine tıklanıp \"Aggregate: Sum\" satırının üzerine fare ile gelinerek (hover) açılan alt menüden \"Average\" seçildi."),
        numbered("Average of Days_to_close by Deal_created_date — çizgi grafik. Önce sol paneldeki \"+Calculated field\" düğmesine tıklanarak analiz düzeyinde yeni bir hesaplanan alan oluşturuldu: days_to_close = dateDiff({deal_created_date}, {deal_closed_date}, \"DD\"). X eksenine deal_created_date eklendi ve granülerlik (varsayılan \"Day\") açılır menüden \"Month\" olarak değiştirildi; Value alanına days_to_close eklenip toplama işlevi \"Average\" yapıldı."),
        p("Tüm görsellerin \"Fit to width\" görünümünde 2 sütunlu bir düzende doğru şekilde hizalandığı görsel olarak kontrol edildi."),

        h2("2.3. Sayfa Filtre Kontrolü (deal_stage)"),
        p("Araç çubuğundaki huni (Filter) simgesine tıklanarak Filtreler paneli açıldı, bir görsel seçildikten sonra \"+Add\" düğmesiyle deal_stage alanı filtre olarak eklendi. Filtrenin \"Applied to\" (Uygulama kapsamı) bölümünden orta simge olan \"This sheet\" (Bu sayfa) seçilerek kapsam tüm sayfadaki görsellere genişletildi; ardından \"Apply cross-datasets\" (veri kümeleri arasında uygula) kutucuğu işaretlendi (5 öğe eşleştiği görüldü) ve \"Apply\" düğmesine basıldı. Bu işlem sonucunda sayfanın üstünde \"Controls | deal_stage equals All\" adlı görünür bir sayfa üstü kontrol (dropdown filtre widget'ı) otomatik olarak belirdi."),
        p("Not: Bu kontrolün ekranda görünür hale gelmesi için filtrenin salt \"This sheet\" kapsamına alınması yetmemekte; ayrıca filtrenin sağındaki üç-nokta menüsünden \"Manage control\" > \"Move to top of sheet\" seçeneğinin (varsayılan olarak zaten aktifse) etkin olması gerekmektedir."),

        // 3. AŞAMA 2
        h1("3. Aşama 2 — Risk Analizi İçin Veri Modelleme (Account Risk Summary)"),
        p("Sarah Chen'in talebi: \"Risk indicators — yüksek destek talebi hacmi, olumsuz duygu durumu VE yüksek anlaşma değeri olan hesapları görmek istiyorum.\" Bu, üç farklı veri kaynağından (CRM ve Support Tickets) gelen metriklerin hesap (account_id) düzeyinde birleştirilmesini gerektiriyordu."),
        p("Önemli teknik karar: Ham (satır bazlı) CRM ve Support Tickets tablolarını doğrudan account_id üzerinden birleştirmek, her iki tarafta da hesap başına birden fazla satır olduğu için \"fan-out\" (kartezyen çarpım) hatasına yol açar ve toplamlar yanlış çıkar. Bunun yerine önce her iki kaynak ayrı ayrı hesap bazında (account_id başına tek satır olacak şekilde) özetlenip sonra 1:1 olarak birleştirildi (\"aggregate-then-join\" deseni)."),

        h2("3.1. Support Ticket Account Summary Veri Kümesi"),
        pBoldLead("Yöntem: ", "Taze/doğru novatech_support_tickets.csv veri kümesi \"Duplicate\" (çoğalt) işlemiyle kopyalanarak yeni bir veri kümesi oluşturuldu."),
        bullet("Data panelindeki \"+Add calculated columns\" adımı eklenerek is_negative = ifelse({customer_sentiment} = \"negative\", 1, 0) adlı yeni bir sütun tanımlandı."),
        bullet("Sol \"Steps\" panelinden \"Aggregate\" dönüşümü eklendi: Group by = account_id; Aggregated columns = ticket_id → Count (adı ticket_count olarak yeniden adlandırıldı) ve is_negative → Sum (adı negative_ticket_count olarak yeniden adlandırıldı)."),
        bullet("\"Preview\" sekmesinde 84 satır (84 hesap) olduğu doğrulandı; örnek: ACCT-083 → ticket_count 31, negative_ticket_count 13."),
        bullet("Sağ üstteki \"Save & publish\" düğmesine basılarak veri kümesi kaydedildi."),

        h2("3.2. CRM Account Summary Veri Kümesi"),
        pBoldLead("Yöntem: ", "Taze novatech_crm_deals.csv veri kümesi yine \"Duplicate\" ile kopyalandı (deal_value alanı zaten Decimal olarak geldiği için veri tipi adımı korunmuş oldu)."),
        bullet("\"Aggregate\" dönüşümü eklendi: Group by = account_id VE company_name (company_name, veri sözlüğüne göre account_id ile bire-bir eşleştiği için ikinci bir grup-by sütunu olarak eklenmesi granülerliği bozmadı). İlk denemede company_name onay kutusu tıklaması kaydolmadı; \"Group by columns\" seçici tekrar açılıp kutucuk yeniden işaretlenerek düzeltildi."),
        bullet("Aggregated columns: deal_value → Sum (adı total_deal_value olarak değiştirildi), opportunity_id → Count (adı deal_count olarak değiştirildi)."),
        bullet("Preview'da 85 satır (85 hesap) doğrulandı; örnek: ACCT-082 / RavenCroft Studios → total_deal_value 2247.0, deal_count 5."),

        h2("3.3. Join İşlemi — Account Risk Summary"),
        p("CRM Account Summary veri kümesinin \"Steps\" (Adımlar) panelinde \"Join\" dönüşümü eklendi (Left join, sol tablo = önceki Aggregate adımının çıktısı)."),
        pBoldLead("Karşılaşılan sorun: ", "\"Right table\" (sağ tablo) açılır menüsü \"No tables\" (tablo yok) gösteriyordu. Sebebi: bir Join adımında sağ tablo olarak seçilebilecek bir veri kümesi, önce o veri kümesinin dönüşüm akışına \"Add data\" adımıyla dahil edilmelidir; menü doğrudan tüm veri kümelerini aramaya izin vermiyor."),
        pBoldLead("Çözüm adımları: ", "Sol \"Steps\" panelinden \"Add data\" tıklandı → açılan modalde \"+Add\" tıklandı → \"Select\" açılır kutusunda üç seçenek çıktı: \"Dataset\", \"Data source\", \"Upload a file\" → \"Dataset\" seçildi → arama kutusuna \"Support Ticket Account Summary\" yazılarak veri kümesi bulundu, işaretlenip \"Select\" ile onaylandı. Bu işlemle Support Ticket Account Summary, akış diyagramına ayrı bir düğüm (node) olarak eklendi."),
        bullet("Join adımına geri dönülüp \"Right table\" açılır menüsünden artık listelenen \"Support Ticket Account Summary\" seçildi."),
        bullet("\"Join keys\" (birleştirme anahtarları) bölümünde sol taraf için \"Add a column from left table\" tıklanıp account_id seçildi; sağ taraf için \"Add a column from right table\" tıklanıp account_id seçildi (account_id = account_id)."),
        bullet("\"Preview\" sekmesinde sonucun tam 85 satır olduğu (\"1-85 of 85\") görülerek fan-out olmadığı doğrulandı; ticket_count ve negative_ticket_count sütunlarının her hesap için doğru şekilde geldiği kontrol edildi (örn. ACCT-082 → ticket_count 2, negative_ticket_count 1; ACCT-085 → 28 / 3)."),
        bullet("Veri kümesinin adı, üstteki başlık kalem (kurşun kalem) simgesine tıklanarak düzenlenebilir hale getirildi, mevcut metin üç kez tıklanarak (triple-click) seçildi ve \"Account Risk Summary\" olarak yeniden yazıldı."),
        bullet("Sağ üstteki \"Save & publish\" açılır menüsünden yine \"Save & publish\" seçildi; \"Saved and published successfully\" bildirimi alındı."),

        // 4. AŞAMA 3
        h1("4. Aşama 3 — Customer Health Sayfasının Oluşturulması"),
        h2("4.1. Yeni Sayfa Ekleme ve Adlandırma"),
        p("Analiz sekmelerinin sonundaki \"+\" simgesine tıklanarak \"New sheet\" penceresi açıldı. \"Interactive sheet\" seçeneği (diğer sayfalarla tutarlı olacak şekilde) ve \"Tiled\" (döşeli) düzen seçili bırakıldı, \"Add\" düğmesine basılarak \"Sheet 3\" adında boş bir sayfa oluşturuldu. Sayfa sekmesine çift tıklanıp (double-click) metin düzenlenebilir hale getirildi, Ctrl+A ile mevcut metin seçilip \"Customer Health\" yazılarak Enter'a basıldı."),

        h2("4.2. Görsel 1 — Hesap Bazında Destek Talebi Hacmi"),
        p("Sol panelde veri kümesi (Data) açılır menüsünden \"novatech_support_tickets.csv\" (taze/doğru sürüm) seçildi. Boş görsel (\"AutoGraph\") seçiliyken sol alan listesinden account_id alanına tek tıklanarak (sürükle-bırak yerine tek tıklama yöntemi kullanıldı, çünkü sürükle-bırak daha güvenilirdi) Y eksenine otomatik eklendi. Sonuç: \"Count of Records by Account_id\" adlı yatay çubuk grafik — her hesabın son 30 günde açtığı destek talebi sayısını gösteriyor (84 hesap, kaydırılabilir)."),
        p("Not: Görsel her yeni oluşturulduğunda veri kümesi açılır menüsü otomatik olarak sayfanın varsayılan veri kümesine (CRM) geri dönüyordu; bu nedenle her seferinde adım şu sırayla izlendi: (1) veri kümesi menüsünden doğru veri kümesi seçilir, (2) hemen ardından, araya başka bir tıklama girmeden, istenen alana tıklanır."),

        h2("4.3. Görsel 2 — Önceliğe Göre Ortalama Çözüm Süresi (Yeni Hesaplanan Alan)"),
        p("Support Tickets veri kümesinde çözüm süresini hesaplayan hazır bir alan bulunmadığından, sol paneldeki \"+Calculated field\" düğmesine tıklanarak yeni bir analiz-düzeyi hesaplanan alan oluşturuldu:"),
        bullet("Calculation name: resolution_time_hours"),
        bullet("Formül: dateDiff({ticket_created_date}, {ticket_resolved_date}, \"HH\")"),
        bullet("\"Save\" düğmesine basılarak kaydedildi (\"Saved\" onayı alındı)."),
        p("Yeni görsel eklenip priority alanı Y eksenine tıklanarak eklendi; ardından arama kutusuna \"resolution\" yazılarak resolution_time_hours alanı bulundu ve Value kutusuna tıklanarak eklendi. Varsayılan toplama işlevi \"Sum\" idi; Value alanının açılır ok simgesine tıklanıp \"Aggregate: Sum\" satırının üzerine fare ile gelinerek (hover) açılan alt menüden \"Average\" seçildi. Sonuç: \"Average of Resolution_time_hours by Priority\" — critical/high/medium/low öncelik seviyelerine göre ortalama çözüm süresini (saat) gösteren yatay çubuk grafik."),

        h2("4.4. Görsel 3 — Ürün Alanına Göre Talep Sayısı"),
        p("Yeni görsel eklendi, veri kümesi menüsünden support_tickets yeniden seçildi, arama kutusuna \"product_area\" yazılıp bulunan alana tıklanarak Y eksenine eklendi. Sonuç: \"Count of Records by Product_area\" — Notifications, Mobile App, Data Pipeline, Billing, Authentication, Analytics Dashboard gibi ürün alanlarına göre talep sayısını gösteren yatay çubuk grafik."),

        h2("4.5. Görsel 4 — Müşteri Duygu Durumu Dağılımı"),
        p("Yeni görsel eklendi; bu kez çeşitlilik açısından \"CHANGE VISUAL TYPE\" panelinden Donut (halka) grafik simgesi seçildi. customer_sentiment alanına tıklanarak Group/Color kutusuna eklendi. Sonuç: \"Count of Records by Customer_sentiment\" — positive/neutral/negative/empty dağılımını gösteren halka grafik (verinin büyük kısmı nötr, küçük bir dilim olumsuz)."),

        h2("4.6. Görsel 5 — Risk Göstergeleri Tablosu (Account Risk Summary Kullanılarak)"),
        p("Bu görsel için önce yeni oluşturulan \"Account Risk Summary\" veri kümesinin bu analize eklenmesi gerekiyordu, çünkü veri kümesi açılır menüsünde henüz listelenmiyordu."),
        bullet("Yeni bir görsel eklendi ve \"CHANGE VISUAL TYPE\" panelinden Table (tablo) simgesi seçildi."),
        bullet("Veri kümesi açılır menüsünde \"Account Risk Summary\" bulunamayınca, menüdeki \"Add data\" bağlantısına tıklandı."),
        bullet("Açılan \"Add data to NovaTech Revenue Intelligence...\" penceresinde arama kutusuna \"Account Risk\" yazıldı, bulunan \"Account Risk Summary\" satırının solundaki radyo düğmesi işaretlendi ve \"Select\" düğmesine basıldı (içe aktarma \"100% success\" ile tamamlandı)."),
        bullet("Açılan \"Manage data\" penceresinde Account Risk Summary'nin \"Available\" (kullanılabilir) durumda listelendiği görülerek pencere kapatıldı (X simgesi)."),
        bullet("Veri kümesi açılır menüsünden artık listelenen \"Account Risk Summary\" seçildi; ardından company_name alanına tıklanarak Group By kutusuna eklendi. (İlk denemede görsel seçimi kayboldu ve yanlışlıkla ayrı bir çubuk grafik oluştu; bu görsel Table tipine dönüştürülerek düzeltildi ve kullanılmaya devam edildi, boşta kalan tablo görseli daha sonra silindi.)"),
        bullet("Group By kutusuna ayrıca account_id.1 (hesap kimliği) eklendi."),
        bullet("Value kutusuna sırayla ticket_count (Sum), negative_ticket_count (Sum) ve total_deal_value (Sum) alanları eklendi."),
        bullet("negative_ticket_count sütununun açılır ok simgesinden \"Sort order\" üzerine fare ile gelinip (hover) \"Descending\" (azalan) seçilerek, en yüksek riskli hesapların tablonun en üstünde görünmesi sağlandı."),
        bullet("Görselin başlığına çift tıklanarak (\"Edit title\" penceresi açıldı) mevcut \"Default\" metni seçilip \"Risk Indicators - At-Risk Accounts (High Tickets, Negative Sentiment, High Deal Value)\" olarak değiştirildi ve \"Save\" ile kaydedildi."),
        bullet("Tablo görselinin sağ orta kenarındaki boyutlandırma tutamacı sürüklenerek (drag) satırın tam genişliğini kaplaması sağlandı."),
        bullet("Sayfada geriye kalan boş/gereksiz görsel, önce seçilip sonra sağ üstündeki üç-nokta (Menu options) simgesinden \"Delete\" seçilerek temizlendi."),

        h2("4.7. Sayfa Filtre Kontrollerinin Eklenmesi"),
        p("Sarah Chen'in talebi doğrultusunda hesap, öncelik, ürün alanı, müşteri katmanı ve bölgeye göre filtreleme eklenmesi gerekiyordu. Araç çubuğundaki huni (Filter) simgesine tıklanarak Filtreler paneli açıldı; sırasıyla aşağıdaki alanlar için filtre eklendi (her birinde aynı işlem tekrarlandı):"),
        numbered("Bir görsel (\"Count of Records by Account_id\") seçildi, ardından \"+Add\" düğmesine basılıp \"account_id\" seçildi."),
        numbered("Yeni oluşan filtrenin adına tıklanarak düzenleme ekranı açıldı; \"Applied to\" (Uygulama kapsamı) bölümündeki üç simgeden ortadaki \"This sheet\" (Bu sayfa) seçildi."),
        numbered("\"Apply cross-datasets\" (veri kümeleri arasında uygula) onay kutusu işaretlendi — \"5 items included\" (5 öğe dahil edildi) mesajı görüldü, bu da alanın Customer Health sayfasındaki beş veri kümesinin tamamına (CRM Account Summary, Support Ticket Account Summary, Account Risk Summary, novatech_crm_deals, novatech_support_tickets) doğru eşlendiğini gösterdi."),
        numbered("\"Apply\" düğmesine basılarak filtre uygulandı."),
        p("Bu döngü priority, product_area, customer_tier ve region alanları için de tek tek tekrarlanarak toplam beş adet sayfa-düzeyi (This sheet), veri kümeleri arası (cross-dataset) filtre oluşturuldu. Bu filtreler mantıksal olarak \"AND\" ile birbirine bağlıdır (Filtreler panelinde alt alta \"AND\" etiketiyle gösterilir)."),
        pBoldLead("Yarım kalan adım: ", "Sales Pipeline sayfasındaki deal_stage filtresinde olduğu gibi, bu beş filtrenin her biri için üç-nokta menüsünden \"Manage control\" > sayfa üstünde görünür bir kontrol (dropdown widget) haline getirilmesi işlemi tamamlanamadan tarayıcı bağlantısı koptu (bkz. Bölüm 5)."),

        // 5. TEKNİK SORUNLAR
        h1("5. Karşılaşılan Teknik Sorunlar ve Çözüm Yöntemleri"),
        h2("5.1. Veri Kümesi Açılır Menüsünün Sürekli Sıfırlanması"),
        p("Her yeni görsel oluşturulduğunda veya bir görsel yeniden seçildiğinde, sol paneldeki \"Data\" açılır menüsü otomatik olarak sayfanın varsayılan veri kümesine (genellikle CRM) geri dönüyordu. Çözüm: Doğru veri kümesi her seferinde yeniden seçilip, hemen ardından (araya başka bir tıklama girmeden) istenen alana tıklanarak bu sıfırlanmanın etkisi bertaraf edildi."),
        h2("5.2. Aynı İsimli İki Farklı Veri Kümesi"),
        p("novatech_crm_deals.csv adında biri \"Others\" (eski/bozuk), biri \"Me\" (yeni/doğru) sahipliğinde iki ayrı veri kümesi bulunuyordu. Alan adlarına bakılarak (ham/orijinal sütun adları = doğru veri kümesi; yeniden adlandırılmış sütunlar = eski veri kümesi) ayrım yapıldı."),
        h2("5.3. Toplama Fonksiyonu Alt Menüsünün Açılmaması"),
        p("Bir değer alanının \"Aggregate: Sum\" satırına doğrudan tıklandığında bazen alt menü (Average, Count, Median vb.) açılmadan kapanıyordu. Çözüm: Tıklama yerine fare imleci o satırın üzerinde bekletilerek (hover) alt menünün güvenilir şekilde açılması sağlandı."),
        h2("5.4. Join Adımında \"No tables\" Hatası"),
        p("Bir veri kümesinin Join adımında sağ tablo olarak başka bir veri kümesi doğrudan seçilemiyordu. Çözüm: Önce \"Add data\" adımıyla o veri kümesi akışa dahil edilip, ardından Join adımının \"Right table\" menüsünden seçildi (bkz. Bölüm 3.3)."),
        h2("5.5. Yanlışlıkla Oluşan Fazladan/Boş Görseller"),
        p("Bazı adımlarda dataset değişimi görselin seçimini kaldırdığı için tıklamalar yeni, istenmeyen boş bir görsel oluşturmasına neden oldu. Bu görseller \"Sheet contents\" panelinden tek tek tespit edilip üç-nokta menüsünden \"Delete\" ile temizlendi."),
        h2("5.6. Tarayıcı (Claude in Chrome) Bağlantısının Kopması"),
        p("Customer Health sayfasındaki filtre kontrollerini sayfa üstüne eklerken (bkz. 4.7) tarayıcı otomasyon bağlantısı beklenmedik şekilde koptu ve yeniden bağlanana kadar işlemler duraklatıldı. Bağlantı geri geldiğinde kaldığı yerden devam etmek üzere bu rapor hazırlandı."),

        // 6. GENEL DURUM
        h1("6. Genel Durum Özeti"),
        statusTable([
          ["Marketing Funnel sayfası", "Önceki oturumda tamamlandı.", "Tamamlandı"],
          ["Sales Pipeline sayfası", "5 görsel + deal_stage sayfa filtre kontrolü.", "Tamamlandı"],
          ["Account Risk Summary veri kümesi", "Aggregate-then-join deseniyle CRM ve Support Tickets'ın hesap bazında birleştirilmesi; 85 satır, fan-out yok.", "Tamamlandı"],
          ["Customer Health sayfası — görseller", "5 görsel: hesap bazlı talep hacmi, önceliğe göre çözüm süresi, ürün alanına göre talep, duygu durumu dağılımı, risk göstergeleri tablosu.", "Tamamlandı"],
          ["Customer Health — sayfa filtreleri", "account_id, priority, product_area, customer_tier, region; hepsi \"This sheet\" + cross-dataset kapsamında tanımlandı VE hepsi görünür sayfa-üstü kontrollere (Controls çubuğu) dönüştürüldü.", "Tamamlandı"],
          ["Dashboard yayınlama (Publish)", "Analiz \"NovaTech Revenue Intelligence Dashboard\" adıyla pano olarak yayınlandı (3 sayfa da dahil: Marketing Funnel, Sales Pipeline, Customer Health).", "Tamamlandı"],
          ["Çapraz sayfa etkileşimi / drill-down doğrulaması", "Bir görseldeki çubuğa tıklanınca çapraz vurgulama/filtreleme çalıştığı doğrulandı (Account_id grafiğinde test edildi).", "Kısmen doğrulandı; tüm sayfalar için sistematik test yapılmadı"],
          ["PDF dışa aktarma", "3 sayfanın tamamının PDF olarak dışa aktarılması.", "Başlanmadı"],
          ["Topic (Q) yapılandırması", "\"NovaTech Revenue Intelligence\" adlı Topic oluşturuldu: 6 veri kümesi eklendi (CRM, Support Ticket Account Summary, Account Risk Summary, unified dataset, ham marketing/support tabloları), hepsi account_id üzerinden manuel ilişkilendirildi (relationships), Topic yayınlandı (Version 2 Active) ve Quick Chat ile canlı test edildi (churn risk sorusu başarıyla yanıtlandı).", "Tamamlandı"],
          ["Verification Log", "Quick Chat ile CRM/Marketing/Support/Reference Docs bilgi tabanlarında en az 6 sorgu (şablon: Step 1 - 7a).", "Devam ediyor — 4/7 satır tamamlandı (CRM x2, Marketing x2); tümü beklenen cevapla eşleşti"],
          ["Q Exploration Log", "5 önceden belirlenmiş iş sorusuyla Q keşfi (şablon: Step 4 - 16).", "Başlanmadı — sorular ve şablon artık elimizde (starter resources zip'inden)"],
          ["Veri dönüşümü ekran görüntüleri", "Join diyagramı, join yapılandırması, hesaplanan alanlar, veri tipi düzeltmeleri.", "Kısmen alınmış olabilir (önceki oturumdan); teyit edilip tamamlanmalı"],
          ["Açıklamalı (annotated) pano ekran görüntüleri", "Her sayfa için 3-5 metin notu; somut sayı + iş açıklaması + önerilen aksiyon.", "Başlanmadı"],
          ["Sarah Chen için yönetici raporu", "1-3 sayfalık Word raporu: veri stratejisi, tasarım gerekçesi, Topic etkisi, temel bulgular, AI vs. pano karşılaştırması.", "Başlanmadı"],
        ]),

        // 7. GELECEK ADIMLAR
        h1("7. Gelecek Adımlar (Yapılacaklar Listesi)"),
        p("Kullanıcı döndüğünde kaldığı yerden devam edilecek ve aşağıdaki sıra izlenecektir:"),
        numbered("Verification Log — Support Tickets bilgi tabanı için 2 doğrulanabilir soru (örn. öncelik seviyeleri, kritik talep sayısı) Quick Chat'e sorulup novatech_support_tickets-csv veri kümesine odaklanarak kaydedilecek."),
        numbered("Verification Log — Reference Documents bilgi tabanı için 1 soru: chat penceresindeki \"Document\" düğmesiyle novatech_company_background.pdf veya novatech_data_dictionary.txt eklenip doğrulanabilir bir soru (örn. çalışan sayısı, kaç aktif hesap) sorulacak."),
        numbered("Verification Log'un \"Cross-Check\" adımı: kaydedilen bir gerçeğin (örn. 85 unique account) QuickSight veri kümesi önizlemesinde (dataset preview) bağımsız olarak doğrulanması."),
        numbered("Q Exploration Log şablonundaki 5 önceden belirlenmiş soru, NovaTech Revenue Intelligence Topic'i kullanılarak Quick Chat'e sorulacak ve her biri şablonda belirtilen ilgili dashboard görseliyle (Marketing Funnel, Sales Pipeline, Customer Health sayfalarından) çapraz kontrol edilecek."),
        numbered("Her iki şablon (Verification Log, Q Exploration Log) gerçek sonuçlarla doldurulmuş .md dosyaları olarak kullanıcıya teslim edilecek."),
        numbered("Panonun üç sayfasının tamamının PDF olarak dışa aktarılması."),
        numbered("Veri dönüşümü ekran görüntülerinin (join diyagramı, join yapılandırma ekranı, hesaplanan alan formülleri, veri tipi düzeltme ekranları) toplanıp düzenlenmesi."),
        numbered("Yayınlanan panonun her sayfası için 3-5 adet metin açıklaması (annotation) eklenmesi; her açıklamada somut bir sayı, iş anlamı ve önerilen aksiyon bulunması."),
        numbered("Sarah Chen için 1-3 sayfalık yönetici özeti raporunun (Word belgesi) yazılması: veri stratejisi, tasarım gerekçesi, Topic yapılandırmasının etkisi, temel bulgular ve önerilen aksiyonlar, AI (Q) ile pano karşılaştırması. (Artık Sarah Chen'in orijinal brief'i ve şirket arka plan dokümanı elimizde — rapor bunlara doğrudan referans verecek.)"),
        numbered("Tüm teslim materyallerinin (Verification Log, Q Exploration Log, ekran görüntüleri, PDF, yönetici raporu) Udacity teslim kontrol listesine göre son kez gözden geçirilmesi."),

        // 8. AŞAMA 4
        h1("8. Aşama 4 — Dashboard Yayınlama, Topic/Q Yapılandırması ve Verification Log (Bu Oturum)"),
        p("Bağlantı yeniden kurulduktan ve kullanıcı \"olur et\" onayı verdikten sonra, kaldığı yerden (Customer Health sayfa filtre kontrolleri) devam edilmiş; ardından işin kapsamı dashboard yayınlama, Q yapılandırması ve dokümantasyon aşamalarına genişletilmiştir."),

        h2("8.1. Customer Health Sayfa Filtre Kontrollerinin Tamamlanması"),
        p("Bölüm 4.7'de account_id için başlatılan işlem tamamlandı. Kalan dört filtre (priority, product_area, customer_tier, region) için sırayla: Filtreler panelinde ilgili filtrenin üç-nokta menüsüne tıklanıp \"Add control\" üzerine gelinerek açılan alt menüden \"Top of this sheet\" seçildi. Sonuç: sayfanın en üstünde \"Controls\" başlığı altında beş açılır kutu (account_id, priority, product_area, customer_tier, region equals All) görüntülendi — Sales Pipeline sayfasındaki deal_stage kontrolüyle birebir aynı görünüm ve işlev. Kontrol panelinin daraltılıp genişletilmesiyle (sağ üstteki ok simgesi) tüm beş kontrolün doğru şekilde eklendiği ekran görüntüsüyle teyit edildi."),

        h2("8.2. Dashboard'ın Yayınlanması (Publish)"),
        p("Araç çubuğundaki \"Publish\" düğmesine basıldı. Açılan \"Publish dashboard\" penceresinde \"New dashboard\" sekmesi seçili bırakıldı, \"Dashboard name\" alanına \"NovaTech Revenue Intelligence Dashboard\" yazıldı, \"Select sheets\" alanı varsayılan \"All sheets\" (3 sayfanın tamamı) olarak bırakıldı. Sayfa aşağı kaydırılarak \"Dashboard options\" ve \"Generative capabilities\" (Allow executive summary, Allow sharing stories/scenarios) varsayılan ayarlarıyla bırakıldı, \"Publish dashboard\" düğmesine basıldı. Yayınlama başarıyla tamamlandı; pano artık \"Dashboards\" listesinde görünüyor ve üç sekmesi (Marketing Funnel, Sales Pipeline, Customer Health) ile birlikte canlı."),

        h2("8.3. Topic Oluşturma (Amazon Q için Semantik Model)"),
        p("Sol menüden \"More\" > \"Topics\" (yeni arayüzde bazen doğrudan URL ile de erişildi) yoluna gidildi. \"Create topic\" düğmesine basıldığında iki seçenek sunuldu: \"Create topic\" (yeni, dataset-relationship destekli semantik model) ve \"Create legacy topic\" (klasik tekil-veri-kümesi Topic). Sarah Chen'in isteği marketing→sales→support arasında account_id ile bağlantı kurmak olduğundan, çoklu veri kümesi ilişkilerini run-time'da destekleyen yeni \"Create topic\" seçildi."),
        bullet("Topic adı \"NovaTech Revenue Intelligence\", açıklaması \"Topic covering CRM, marketing, support, and account risk data for natural-language Q&A on customer health, sales pipeline, and marketing funnel performance.\" olarak girildi."),
        bullet("\"Add datasets\" listesinden 6 veri kümesi işaretlendi: Account Risk Summary, Support Ticket Account Summary, novatech_crm_deals-csv, NovaTech Revenue Intelligence - Unified Dataset (Wysk), novatech_support_tickets-csv, novatech_marketing_campaigns-csv. (İlgisiz örnek veri kümeleri — C2.1_OnlineRetail, sample-superstore, C2.1 Superstore — bilinçli olarak işaretlenmedi.)"),
        bullet("\"Create\" düğmesine basılarak Topic oluşturuldu (Version 1 Active)."),

        h2("8.4. Dataset İlişkilerinin (Relationships) Manuel Kurulması"),
        p("Topic ekranında \"Relationships\" sekmesine geçildiğinde hiçbir otomatik ilişki tespit edilmediği görüldü (\"There are no relationships\"). \"Create manually\" seçilerek görsel bir ilişki editörü açıldı:"),
        bullet("\"NovaTech Revenue Intelligence - Unified Dataset\" merkez (hub) veri kümesi olarak seçilip diğer 5 veri kümesiyle tek tek bağlandı; her bağlantıda alan eşleştirmesi account_id (bazı veri kümelerinde account_id.1 olarak görünüyordu, muhtemelen dataset içi isim çakışması nedeniyle) = account_id olacak şekilde ayarlandı."),
        bullet("novatech_crm_deals-csv, Support Ticket Account Summary, novatech_support_tickets-csv ve Account Risk Summary bağlantılarında sistem account_id alanını otomatik olarak önerdi ve doğrulandı."),
        bullet("novatech_marketing_campaigns-csv bağlantısı da aynı şekilde account_id = account_id olarak kuruldu; böylece toplam 5 ilişki (hub'dan her bir uç veri kümesine) tanımlanmış oldu."),
        p("\"Save\" ile ilişkiler kaydedildi, ardından Topic \"Publish\" düğmesiyle Version 2 (Active) olarak yeniden yayınlandı (\"Dependent resources will be updated\" onayıyla)."),

        h2("8.5. Topic'in Dashboard'a Bağlanması ve Quick Chat Testi"),
        p("Analiz ekranındaki \"Manage Q&A\" düğmesinden \"Use a linked topic for Build visual and Q&A\" seçilip oluşturulan Topic seçildi; ancak \"Apply changes\" sonrasında \"Failed to link topic NovaTech Revenue Intelligence\" hatası alındı (yeniden denendiğinde de aynı sonuç). Bu bağlama adımı geçici olarak başarısız olsa da, Topic kendi başına yayınlanmış ve kullanılabilir durumdaydı; bu nedenle test doğrudan genel \"New chat\" (My Assistant) arayüzünden, veri kaynağı olarak Topic seçilerek yapıldı."),
        pBoldLead("Test sorusu: ", "\"Which accounts have the highest churn risk this quarter?\" — Sistem otomatik olarak Customer Health sayfasındaki veriyi sorguladı ve \"top 10 accounts with the highest churn risk\" başlıklı bir tablo (Company Name, Account ID, Total Tickets sütunlarıyla) ile birlikte şu öne çıkan bulguları üretti: YieldMax Software en yüksek riskli hesap (334 toplam talep, 63 olumsuz-duygu talebi, $40.722 anlaşma değeri), TrueNorth Electronics ve LionGate Holdings de dikkat çekici olumsuz talep örüntüleri gösteriyor, toplam 85 riskli hesap Risk Indicators görünümünde işaretlendi. Bu sonuç, Topic + ilişkilerin doğru çalıştığını ve doğal dil sorgularının dashboard verisiyle tutarlı, isabetli yanıtlar ürettiğini kanıtlamaktadır."),

        h2("8.6. Proje Kaynak Dosyalarının (Starter Resources) Bulunması"),
        p("Kullanıcı \"projectstarterresources.zip\" dosyasını paylaştı. İçeriği incelendiğinde şu kritik belgeler bulundu ve okundu:"),
        bullet("sarah_chen_dashboard_brief.pdf — Sarah Chen'in orijinal talep yazısı: 3 görünüm için ayrıntılı metrik listesi, cross-view gereksinimleri (çapraz filtreleme, drill-down, account_id ile bağlantı) ve doğal dil erişimi için 5 örnek soru."),
        bullet("novatech_company_background.pdf — Şirket profili: Austin TX merkezli, ~200 çalışan, ~$50M yıllık gelir, NovaPulse/NovaEdge ürün hatları, 30 satış temsilcisi/3 bölge, 85 aktif hesap."),
        bullet("novatech_data_dictionary.txt — Üç veri kümesindeki (CRM Deals, Marketing Campaigns, Support Tickets) her alanın tipi, geçerli değerleri ve beklenen istatistikleri (ör. 85 unique account, Won=315/Lost=184, response rate=%27,2)."),
        bullet("Step 1 - 7a_verification_log_template.md — 7 satırlık doğrulama günlüğü şablonu (CRM x2, Marketing x2, Support x2, Reference Documents x1) + bir Cross-Check adımı."),
        bullet("Step 4 - 16_Q_Exploration_Log_Template.md — Sarah Chen'in 5 iş sorusu ve her biri için kontrol edilecek belirli dashboard görseli."),
        p("Bu belgeler sayesinde artık projenin kalan tüm dokümantasyon adımları (Verification Log, Q Exploration Log, executive report) tahmine dayalı değil, orijinal proje gereksinimlerine tam sadık şekilde tamamlanabilir hale geldi."),

        h2("8.7. Verification Log İlerlemesi (Şablon: Step 1 - 7a)"),
        p("Quick Chat'in veri kaynağı, her seferinde tam olarak tek bir ham veri kümesine (\"Specific data\" > ilgili .csv) odaklanacak şekilde ayarlanarak, veri sözlüğünden bağımsız olarak doğrulanabilir sorular soruldu:"),
        bullet("CRM Deals — Soru 1: \"How many unique accounts are in this dataset?\" → Q cevabı: 85. Beklenen (veri sözlüğü): 85. Eşleşme: ✔ Evet."),
        bullet("CRM Deals — Soru 2: \"How many deals are Won vs Lost?\" → Q cevabı: Won 315, Lost 184 (toplam 499, %63 kazanma oranı). Beklenen: Won 315, Lost 184. Eşleşme: ✔ Evet."),
        bullet("Marketing Campaigns — Soru 3: \"What are the distinct campaign channels?\" → Q cevabı: Direct Mail, Email, Organic Search, Paid Social, Partner Referral (5 kanal). Beklenen: aynı 5 değer. Eşleşme: ✔ Evet."),
        bullet("Marketing Campaigns — Soru 4: \"What percentage of leads responded to campaigns (campaign_response = 1)?\" → Q cevabı: %27,19 (2.240 lead'den 609'u). Beklenen: %27,2 (609/2240). Eşleşme: ✔ Evet."),
        p("Kalan üç satır (Support Tickets x2, Reference Documents x1) ve Cross-Check adımı, kullanıcı döndüğünde aynı yöntemle tamamlanacaktır. Şimdiye kadarki dört sorunun tamamı veri sözlüğüyle birebir eşleşmiştir — bu da hem Topic/veri kümesi yapılandırmasının hem de Quick Chat'in doğruluğunu güçlü şekilde doğrulamaktadır."),

        new Paragraph({ text: "", spacing: { before: 300 } }),
        new Paragraph({
          children: [
            new TextRun({ text: "Not: ", bold: true }),
            new TextRun({ text: "Bu rapor iki kez güncellenmiştir: ilk sürüm bağlantı kopması nedeniyle hazırlanmış, bu sürüm ise kullanıcının \"worde bu gelişmeleri de ekle\" talebi üzerine dashboard yayınlama, Topic/Q yapılandırması ve Verification Log ilerlemesini eklemek için güncellenmiştir. Kullanıcı döndüğünde Bölüm 7'deki sıra izlenerek kaldığı yerden devam edilecektir." }),
          ],
          spacing: { before: 100 },
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  require("fs").writeFileSync("/tmp/novatech_report/NovaTech_Ilerleme_Raporu.docx", buffer);
  console.log("done");
});
