# NovaTech Revenue Intelligence Dashboard — Bağımsız Rubric Review

**İncelenen klasör:** `udacity project\delivery`
**Reviewer perspektifi:** Udacity mentor/rubric'ine göre, elde mevcut dosyalar üzerinden

---

## ⚠️ GÜNCELLEME: İkinci bir (ChatGPT tarafından yapılan) review'i ham CSV'lere karşı fact-check ettim

Aşağıdaki orijinal review'imden SONRA, kullanıcı ayrı bir ChatGPT review'i getirdi ve o review'in iddialarını doğrulamamı istedi. Ham CSV'leri (`novatech_crm_deals.csv`, `novatech_marketing_campaigns.csv`, `novatech_support_tickets.csv`) ve data dictionary'yi indirip pandas ile bizzat hesapladım. Sonuç: **ChatGPT'nin en kritik bulgusu doğru ve benim orijinal review'imin gözden kaçırdığı, verdict'i değiştiren bir sorun.**

**En önemli doğrulanmış bulgu — ROI hesabı gerçekten yanlış:**

- Data dictionary `campaign_spend`'i şöyle tanımlıyor: *"Marketing cost attributed to this lead/touchpoint (USD). Varies by channel."* — yani bu alan, kampanya başına tekrarlanan sabit bir değer DEĞİL, her lead/satır için ayrı bir maliyet.
- Ben bunu ham veride bizzat kontrol ettim: örn. "NovaPulse Launch" kampanyasının 409 satırının **409'u da farklı** `campaign_spend` değerine sahip (501–14.995 USD arası). Yani "kampanya düzeyinde tek bir değerin lead satırlarına çoğaltılması" (fan-out) teorisi **yanlış** — proje teslimindeki ve dashboard'daki bu açıklama gerçek veriyle uyuşmuyor.
- Doğru hesapla (SUM(revenue) − SUM(spend)) / SUM(spend), ham veriden:
  - Toplam spend: **12.359.497,34 USD**, toplam revenue: **1.127.223,09 USD**
  - **Genel ROI: −%90,88** (ChatGPT'nin verdiği rakamla birebir eşleşiyor)
  - Kampanya bazında da eşleşiyor: NovaPulse Launch −%83,73, NovaEdge Awareness −%97,74 (ChatGPT'nin tablosuyla aynı).
- Yani dashboard'da, Q&A log'da ve executive report'ta tekrar tekrar övünülen **"Topic sayesinde ROI −%94'ten +%3.254,9'a düzeldi, tüm kampanyalar kârlı"** anlatısı **yanlış bir "düzeltme"**. Gerçekte her iki taraf da (ne −%94 ne de +%3.254,9) doğru değil; ham veriyle tutarlı doğru rakam yaklaşık **−%91** (tüm kampanyalar zararda). Bu, projenin "AI-Powered Analysis" bölümünün merkezindeki flagship bulgu olduğu için ciddi bir sorun.

**Diğer doğruladığım ChatGPT iddiaları (hepsi ham veriyle teyit edildi):**

- Verification Log #2'deki tarih aralığı gerçekten hatalı: gerçek `deal_created_date` aralığı 2023-06-17→2025-01-25, `deal_closed_date` aralığı ise 2023-12-03→**2025-01-31** (log'daki "Jan 25 2025" kapanış tarihi olarak yanlış). ✅ ChatGPT haklı.
- `opportunity_id`: 499 kayıttan sadece 496'sı benzersiz (3 ID iki farklı hesapta tekrarlanıyor). ✅ Doğru.
- `ticket_id`: 3.000 kayıttan 2.996'sı benzersiz. ✅ Doğru.
- `customer_sentiment` alanında data dictionary "Nulls: None" dese de gerçekte **59 satır boş** — ve bu 59 satır, çözümlenmemiş 59 ticket'la (null `ticket_resolved_date`) **hiç örtüşmüyor** (tamamen ayrı kayıtlar). ✅ Doğru, gerçek ve daha önce hiç belgelenmemiş bir veri kalitesi sorunu.
- Critical ticket'larda ortalama çözüm süresi ~56,6 saat (56,12/56,13 rakamlarıyla uyumlu); "43,0 saat" rakamı ham veriden üretilemiyor ve "50 ticket'lık farklı bir subset" açıklaması geçersiz çünkü critical kategorisinin tamamı zaten tam 50 kayıt. ✅ ChatGPT haklı, tutarsızlık gerçek ve çözülmemiş.
- Funnel stage sırası: data dictionary "Prospect → Lead → Qualified Lead → Opportunity → Closed Won" diyor; dashboard grafiği "Lead, Prospect, Qualified Lead..." sırasıyla gösteriyor. ✅ Doğru, mantıksal sıra bozuk.
- "Marketing ile Sales arasında ortak anahtar yok" ifadesi: `account_id` üçü de ortak (data dictionary bunu açıkça söylüyor) — rapordaki ifade yanıltıcı/teknik olarak yanlış yazılmış, olması gereken "customer_segment ile company_size_tier aynı şey değil" olmalıydı. ✅ ChatGPT'nin eleştirisi haklı.
- Negative sentiment / deal value korelasyonu: ben de benzer büyüklükte bir korelasyon buldum (~0,53), AMA ham ticket_count'un deal value ile korelasyonu da (~0,57) neredeyse aynı büyüklükte çıktı — yani "sentiment, ticket volume'dan daha iyi tahmin eder" iddiası benim hesabımda da desteklenmiyor. ✅ ChatGPT'nin şüpheciliği haklı çıktı.

**Doğrulayamadığım noktalar (kanıt artık mevcut değil):** ChatGPT'nin incelediği ekran görüntülerinin bir kısmı (`.review_tmp` klasöründeki çıkarılmış görseller) bu konuşma sırasında diskten silinmiş görünüyor; "Topic ekranında Datasets (0) yazıyor" gibi bazı noktaları ilk incelemede kendi gözümle görmüştüm ve executive report da zaten bunu "sonradan düzeltilen bir eksiklik" olarak kabul ediyor, ama son/düzeltilmiş halinin ekran görüntüsünü tekrar doğrulayamadım. "18 vs 21 riskli hesap eşiği" gibi birkaç noktayı da aynı sebeple tekrar kontrol edemedim.

**Sonuç: ChatGPT'nin review'i benimkinden daha sıkı ve haklı çıktı.** Benim ilk review'im daha çok "kanıt var mı/eksik mi" düzeyinde kalmıştı; ChatGPT ham sayıları gerçekten yeniden hesaplayarak ROI metodolojisindeki temel hatayı yakalamış. **Revize genel verdict: bu proje şu anki haliyle pass etmemeli** — eksik screenshot'ları eklemek yetmez, önce ROI hesabı (ve buna dayanan "Topic'in ROI'yi düzelttiği" anlatısının tamamı: dashboard annotation'ı, Q&A log, executive report) düzeltilmeli, sonra orijinal review'deki eksiklikler (annotation screenshot'ları, cross-sheet navigation kanıtı, kesilen metinler) giderilmeli.

---

## Orijinal review (yukarıdaki güncellemeden önce yazıldı, hâlâ geçerli noktalar içeriyor)

**Not:** Klasörde zaten bir "self-audit" (README_SUBMISSION_STATUS.md, muhtemelen ChatGPT tarafından yazılmış) vardı. Aşağıdaki değerlendirme onu referans almakla birlikte, dosyaların (docx, PDF, screenshot) içeriğini bizzat açıp bağımsız olarak kontrol ederek yapıldı — birkaç noktada self-audit'in gözden kaçırdığı ek bulgular var (aşağıda işaretli).

---

## GENEL SONUÇ: Şu anki haliyle henüz PASS etmeye hazır değil — ama çok yakın

İçerik kalitesi genel olarak çok güçlü (veri doğrulama, ETL/join, executive report hepsi rubric'i net şekilde karşılıyor). Ancak **1 deliverable tamamen eksik** ve **görsel kanıtlarda 2 somut sorun** var. Bunlar düzeltilmeden submit edilirse mentor'ün en az 1-2 kriteri "kısmen karşılanmadı" olarak işaretleme riski yüksek.

---

## 1) Data Preparation & Quality — ✅ KARŞILIYOR

- **Verification log:** 6/6 entry, üç KB'nin hepsini kapsıyor, her satırda soru + beklenen cevap + Q'nun cevabı + Match/No Match + not var. Tüm cevaplar "Yes/Match". Rubric'in istediği format (checkable facts: satır sayısı, tarih aralığı, null sayıları) birebir uygulanmış. **Tam karşılıyor.**
- **Type corrections + calculated fields:** CRM (`days_to_close`), Marketing (`campaign_roi`), Support (`resolution_time_hours`) — üç veri setinin her birinde bir tane, toplamda 3 calculated field (rubric ≥2 istiyor). Formüller, gerekçeler ve önizleme değerleri detaylı belgelenmiş. Type correction'lar (annual_revenue_usd, deal_value, annual_income → Decimal) ekran görüntüleriyle gösterilmiş. **Tam karşılıyor, hatta gerekenin üzerinde.**
- **Unified dataset / join:** Join config ekran görüntüsünü bizzat açıp kontrol ettim — CRM LEFT JOIN Marketing LEFT JOIN Support, account_id üzerinden, "Left join" açıkça seçili görünüyor. Anchor tablo (CRM) ve join type gerekçesi raporda yazılı. Dataset detail sayfası: 63 kolon, 63.420 satır, "100% success", 3 kaynağın hepsi listede. **Tam karşılıyor.**

## 2) Dashboard Design & Interactivity — ⚠️ KISMEN KARŞILIYOR (kanıt eksik/sorunlu)

PDF export'ların üçünü de bizzat açıp içeriğine baktım:

- **3 sheet var:** Marketing Funnel, Sales Pipeline, Customer Health — isimler dahil rubric'e birebir uyuyor. ✅
- **KPI kartları + görseller:** Her sayfada 2-3 KPI kartı + 4-6 farklı görsel tipi (bar, line, pie, tablo). Gereğinden fazla. ✅
- **Filtre kontrolleri:** Her üç sayfada da en az bir filtre var (Marketing: campaign_name, Sales: deal_stage, Customer Health: 5 filtre — account_id, priority, product_area, customer_tier, region). Rubric ≥2 sayfa istiyor, 3/3 sayfada var. ✅
- **Cross-dataset görsel (Customer Health):** "Risk Indicators" tablosu `account_id.1` (join'den gelen kolon) kullanıyor ve ticket_count + total_deal_value'yu birleştiriyor — unified dataset'ten geldiği açık. ✅
- **One-click filtering (2+ görsel üzerinde) — ⚠️ kanıt zayıf:** `filter_action_sales_pipeline.png`'i açtım. Görüntü sadece "Won" barına tıklanınca aynı grafikte tooltip açıldığını gösteriyor (Count: 315). Yanındaki ikinci grafik (Sum of Deal_value by Product_name) görünürde hiç değişmemiş/filtrelenmemiş durumda. Yani bu screenshot **tek bir görselin kendi içindeki seçimini** gösteriyor, "iki veya daha fazla görsel üzerinde one-click filtering" kanıtı olarak yeterli değil. **Önerim:** dashboard'a girip gerçekten bir görsele tıklayınca İKİNCİ bir görselin de filtrelendiğini (renk/veri değişimi) gösteren yeni bir ekran görüntüsü al.
- **Cross-sheet navigation action — ⚠️ hiç kanıt yok:** Instructions'ta açıkça "Take screenshots of... the navigation action setup" deniyor ve rubric "at least one cross-sheet navigation action" istiyor. Delivery klasöründe (tüm alt klasörler dahil, recursive olarak taradım) bu konuda **tek bir dosya/screenshot bile yok**. Mentor sadece PDF/screenshot'lara bakacaksa bu kriter için hiç kanıt bulamaz. **Önerim:** navigation action'ın Actions panelindeki konfigürasyon ekranını ve tıklandığında diğer sayfaya geçtiğini gösteren 1-2 ekran görüntüsü ekle.
- **Annotation'lar (3-5 adet, quantified finding + business impact + recommended action):**
  - Marketing Funnel: 2 annotation, ikisi de tam ve okunaklı (ROI bulgusu + Partner Referral konsantrasyonu). ✅
  - Sales Pipeline: 1 annotation var, finding + business impact tam ama **"Recommended action" cümlesi PDF export'ta yarıda kesiliyor** ("...to confirm faster closes aren't" — cümle burada bitiyor, devamı yok). Bu, self-audit'in hiç fark etmediği bir sorun — sadece Customer Health'te olduğunu düşünmüşler.
  - Customer Health: 1 annotation var, aynı şekilde **"Recommended action: Assign a dedicated customer" ifadesinde yarıda kesiliyor** (self-audit bunu doğru tespit etmiş).
  - Toplamda 4 annotation (rubric 3-5 istiyor, sayı olarak uygun) ama **2/4'ünün recommended action kısmı mentor'e görünmüyor** — "each annotation should state... a recommended action" kriterini tam karşılamıyor olabilir.
- **Annotated dashboard screenshots (deliverable):** `07_annotated_dashboard_screenshots/` klasörünü bizzat listeledim — içinde sadece bir `README_ACTION_NEEDED.md` var, **hiç screenshot dosyası yok**. Bu, submission checklist'teki 8 zorunlu maddeden biri ve şu an tamamen boş. **Bu tek başına net bir blocker.**
- **PDF export:** 3 sayfa da mevcut, dashboard'ın "Corrected" versiyonundan alınmış görünüyor. ✅

## 3) AI-Powered Analysis & Communication — ✅ Büyük ölçüde karşılıyor, küçük bir eksik

- **Before/after Topic:** Custom Instructions ekran görüntüsü (Topic setup) net şekilde mevcut. 3 baseline soru (channel revenue, response rate, win rate) before/after screenshot çiftleriyle belgelenmiş. En güçlü örnek: campaign ROI'nin Topic öncesi -94% (fanned-out spend bug'ı yüzünden) → Topic sonrası +3.254,9% olarak düzeltilmesi — ölçülebilir, somut bir iyileştirme örneği, hem executive report'ta hem dashboard annotation'ında hem QA log'da tutarlı şekilde tekrarlanmış. ✅
- **Q Exploration Log:** Toplamda 8 farklı soru (3 baseline tekrarı hariç), en az 2 tanesi açıkça cross-dataset ("high ticket volume + high deal value", "ticket risk vs Won/Lost"). Rubric ≥5 istiyor, fazlasıyla karşılanıyor. ⚠️ Küçük nokta: rubric her log entry'sinde "Q's response ve dashboard'a karşı verification" bekliyor; docx'teki entry'lerin çoğunda bu doğrulama sadece ekran görüntüsü olarak var, yazılı bir "dashboard'la karşılaştırdım, eşleşiyor" notu sadece 2 entry'de (ROI ve resolution-time discrepancy) mevcut. Diğer entry'ler için yazılı doğrulama notu eklemek kriteri daha sağlam karşılar.
- **Annotation'lar ve executive report** yukarıda değerlendirildi.
- **Executive report** (`NovaTech_Executive_Report_SarahChen.docx`, bizzat python-docx ile açıp paragraf + tabloları okudum): Data strategy, dashboard design rationale, Topic'in Q accuracy'e etkisi, key insights + recommended actions (tablo halinde, 5 satır, hepsi quantified), AI vs dashboard agreement/disagreement (tablo, 7 satır) — rubric'in istediği 5 bölümün hepsi mevcut ve somut sayılarla desteklenmiş. Raw SQL/formül yok, tam cümleler kullanılmış, teknik terimler ("Topic") ilk kullanımda açıklanmış. ~930 kelime + 3 tablo → 1-3 sayfa aralığında olması muhtemel. **Tam karşılıyor.**
- **Dashboard executive summary (opsiyonel):** Bilinçli olarak atlanmış, rubric/brief bunu opsiyonel sayıyor. Sorun değil.

---

## Submit Etmeden Önce Yapılması Gerekenler (öncelik sırasıyla)

1. **[BLOCKER]** `07_annotated_dashboard_screenshots/` klasörüne, dashboard'daki 4 annotation'ın okunaklı, yakın çekim ekran görüntülerini ekle.
2. **[BLOCKER-yakın]** Sales Pipeline ve Customer Health sayfalarındaki annotation text box'larını büyüt/uzat, recommended action cümlesinin tamamı görünecek şekilde yeniden export al (Customer Health için zaten not edilmişti; Sales Pipeline için bu review'de yeni tespit edildi).
3. **[Orta risk]** Cross-sheet navigation action'ın konfigürasyonunu ve çalıştığını gösteren en az 1 ekran görüntüsü ekle — şu an hiç kanıt yok.
4. **[Orta risk]** One-click filtering için ikinci bir görselin de değiştiğini net gösteren bir ekran görüntüsü al; mevcut `filter_action_sales_pipeline.png` sadece tek görselin kendi seçimini gösteriyor.
5. **[Düşük risk / opsiyonel iyileştirme]** Q Exploration Log'daki her entry'ye kısa bir yazılı "dashboard ile karşılaştırıldı, eşleşiyor / şu şekilde farklı" notu ekle.

Bu 5 maddeden ilk ikisi düzeltilmeden submit edilirse, "Dashboard Design & Interactivity" ve "AI-Powered Analysis & Communication" bölümlerinden en az birinde puan kaybı riski var. 3 ve 4 eklenirse dosya tam anlamıyla rubric'in her satırına karşılık gelen kanıt içerir hale gelir.
