# Yeni Dashboard Export'ları (13 Eylül, 15:48-15:50) — Veri Doğruluğu Review'i

Üç yeni PDF'i (Marketing Funnel, Sales Pipeline, Customer Health) ham CSV'lere (`novatech_crm_deals.csv`, `novatech_marketing_campaigns.csv`, `novatech_support_tickets.csv`) ve data dictionary'ye karşı pandas ile tek tek hesaplayarak doğruladım. Bu, önceki versiyondan tamamen farklı, yeniden yapılmış bir dashboard.

## Genel izlenim: ROI sorunu düzelmiş, ama 3 yeni sorun var

**İyi haber — flagship ROI hatası düzeltilmiş:** Marketing Funnel'daki yeni annotation "All six campaigns have negative ROI, with NovaPulse Launch performing best at −83.7%" diyor. Bunu ham veriden bağımsız olarak yeniden hesapladım: **NovaPulse Launch −83.73%, NovaEdge Awareness −97.74%, genel ROI ≈ −%91**. Birebir örtüşüyor. Önceki "+3.254,9%, tüm kampanyalar kârlı" hatası artık yok — bu düzeltme doğru yapılmış.

Ama üç yeni sorun tespit ettim, aşağıda detaylı.

---

## 1) Marketing Funnel — ✅ büyük ölçüde doğru, 1 küçük tutarsızlık

Ham veriyle birebir eşleşen noktalar:
- **Direct Mail response rate %53,0** ✅ (ham veri: %53,02)
- **Direct Mail lead-to-deal conversion %49,0** ✅ (ham veri, funnel_stage=Closed Won oranı: %48,99)
- **Campaign Spend vs Revenue** grafiği artık `campaign_spend (Sum)` kullanıyor (önceki AVG hatası düzelmiş) — NovaPulse Launch ve Digital Retarget çubukları ham veriyle aynı büyüklükte (~2,42M).
- **Total Marketing Records: 2.240** ✅ ham satır sayısıyla birebir.

**Tutarsızlık:** "Average Campaign ROI by Campaign" grafiği NovaPulse Launch için **−81,2%** gösteriyor (satır bazlı `campaign_roi` alanının basit ortalaması), ama üstteki annotation metni **−83,7%** diyor (toplam gelir/toplam harcama oranı — farklı bir hesap yöntemi). İkisi de makul birer yöntem ama **aynı sayıyı vermiyorlar ve dashboard içinde iki farklı rakam yan yana duruyor.** Grafiğin kendi legend'ındaki değerle annotation'daki değer tutmalı. **Öneri:** Ya annotation'ı grafiğin gösterdiği −81,2%'ye güncelle, ya da grafiği "SUM(revenue)-SUM(spend))/SUM(spend)" bazlı bir hesaba çevirip −83,7% ile eşleştir. Diğer 5 kampanya için de aynı iki yöntem sırayı değiştiriyor (örn. Digital Retarget ile Enterprise Expansion arasındaki sıralama yönteme göre değişiyor) — sıralama tutarlılığı için tek bir yöntemde karar kılınmalı.

## 2) Sales Pipeline — ✅ sayılar doğru, 2 etiket/birim hatası

Ham veriyle birebir eşleşenler: Win Rate %63,13 ✅, Avg Deal Value 1.417,24 ✅, Total Revenue 707.201 ✅, Central/East/West win rate (%69,9 / %57,8 / %58,8) ✅, Loss Reasons dağılımı (No Decision Made 43, Poor Product Fit 43, Competitor Won 34, Timing Not Right 33, Budget Constraints 31) ✅, company_size_tier'a göre ortalama deal value sıralaması (Enterprise > Small > Medium > Large) ✅, 7 farklı `product_name` (dictionary'deki 7 değerle birebir, "NovaPulse Star..." iki kez görünmesi veri hatası değil — Starter ve Standard'ın kesilmiş etiketleri).

**Hata 1 — birim etiketi yanlış:** "Average days to close deal **(In hrs)**" KPI kartı **66,76** gösteriyor. Ben ham veriden `days_to_close` ortalamasını hesapladım: **66,7595 GÜN** — birebir aynı sayı. Yani kart aslında GÜN cinsinden doğru değeri gösteriyor ama etiket yanlışlıkla "hrs" (saat) yazıyor. **Düzeltme:** Etiketi "(In days)" yap, ya da gerçekten saat istiyorsan değeri ×24 ile çarpman gerekir (~1.602 saat).

**Hata 2 — yazım hatası:** "Average Deal **clsosing** Time" grafik başlığında yazım hatası var ("closing" olmalı).

**Küçük gözlem:** "Average Deal Closing Time" grafiği artık ay ay çok inişli-çıkışlı bir çizgi gösteriyor (7,8 ile 107,7 arasında sıçrıyor), önceki export'taki daha düzgün azalan trendden farklı — muhtemelen artık `deal_closed_date`'e göre gruplandığı ve bazı aylarda çok az deal kapandığı için (küçük örneklem → gürültülü ortalama). Yanlış değil ama yorumlarken dikkatli olunmalı; "aylık trend" olarak sunmak yerine "işlem hacminin düşük olduğu aylarda ortalama güvenilir değildir" notu eklenebilir.

## 3) Customer Health — ⚠️ sayılar çoğunlukla doğru ama iki önemli sorun var

Ham veriyle birebir eşleşenler: "Tickets by Product Area" ve annotation'daki "Notifications 601, Analytics Dashboard 597" ✅ (ham veri: Notifications 601, Analytics Dashboard 597, Authentication 582, Mobile App 581, Billing 329, Data Pipeline 310 — hepsi eşleşiyor). "Top Account by Support Ticket Volume" listesi ✅ (ACCT-041: 334, ACCT-035: 180, ACCT-076: 176... hepsi ham veriyle birebir).

**Sorun 1 — Total Support Tickets KPI'si artık 2.996, ama bu "düzeltme" aslında yanlış yönde:** Ben `ticket_id`'yi kontrol ettim: 3.000 kayıtta 4 çift halinde toplam 8 satır aynı ID'yi paylaşıyor (`TKT-284055`, `TKT-634299`, `TKT-679459`, `TKT-946331`). Ama bu çiftlerin her birine baktığımda **farklı account_id, farklı product_area, farklı priority, farklı tarih** görüyorum — yani bunlar gerçek kopya kayıt değil, sadece ID üretiminde rastlantısal bir çakışma (496/499 opportunity_id'deki duruma benzer). Bu durumda `COUNT DISTINCT ticket_id` kullanmak, birbirinden tamamen farklı 4 gerçek ticket'ı "aynı ticket" sayıp düşürüyor — yani 2.996 rakamı **3.000'den daha az doğru**, çünkü 4 gerçek ticket'ı yanlışlıkla siliyor. **Düzeltme:** Bu alanda `COUNT(*)` (ham satır sayısı, 3.000) kullanılmalı; ID çakışmasını ayrı bir veri kalitesi notu olarak belgelemek yeterli, satırları düşürmemeli.

**Sorun 2 (daha önemli) — Customer Health sayfasında artık unified/joined dataset'ten gelen bir görsel yok:** Rubric açıkça "Customer Health sheet'te unified (joined) dataset'ten üretilmiş en az bir görsel" istiyor. Önceki versiyonda "Risk Indicators" tablosu ticket_count + negative_ticket_count'u CRM'deki **total_deal_value** ile birlikte gösteriyordu (join'den geldiği açıktı). Bu yeni PDF'de "Top Account by Support Ticket Volume" ve "At Risk Accounts" tabloları sadece support_tickets alanlarını gösteriyor (`account_id`, `customer_sentiment`, `ticket_id`, `tickets_last_30_days`) — **hiçbir yerde `deal_value` veya CRM'den gelen bir alan yok.** Bu, rubric'in özellikle aradığı cross-dataset görseli kaybetmiş görünüyor. **Düzeltme:** "At Risk Accounts" tablosuna unified dataset'ten `total_deal_value` (veya CRM'deki `deal_value` toplamı) kolonunu ekle, böylece hem support hem CRM verisini birleştiren bir görsel geri gelsin.

**Ayrıca:** "At Risk Accounts" tablosu şu anki haliyle gerçek bir risk eşiği uygulamıyor gibi görünüyor — ACCT-001 gibi sadece 1 ticket'ı olan hesaplar da listede, bu da "riskli hesaplar" başlığıyla çelişiyor. Bir eşik (örn. ticket_count > ortalama VE negative_ticket_count > ortalama) uygulanırsa görsel adıyla tutarlı hale gelir.

---

## Özet Tablo

| Bulgu | Doğru mu? | Not |
|---|---|---|
| Marketing: ROI artık negatif, NovaPulse Launch en iyisi | ✅ Doğru | Ham veriyle birebir |
| Marketing: Direct Mail response/conversion rate | ✅ Doğru | %53,0 / %49,0 ham veriyle eşleşiyor |
| Marketing: annotation ROI rakamı vs. grafik ROI rakamı | ⚠️ Tutarsız | −83,7% vs. −81,2%, iki farklı hesap yöntemi |
| Sales: win rate, deal value, region, loss reasons | ✅ Doğru | Hepsi ham veriyle birebir |
| Sales: "days to close (in hrs)" etiketi | ❌ Yanlış etiket | Değer gün, etiket saat diyor |
| Sales: "clsosing" yazım hatası | ❌ Yazım hatası | Kozmetik ama düzeltilmeli |
| Customer Health: product area / top accounts | ✅ Doğru | Ham veriyle birebir |
| Customer Health: Total Tickets = 2.996 (distinct) | ❌ Yanlış yön | ID çakışması gerçek kopya değil; 3.000 doğru olmalı |
| Customer Health: unified dataset görseli | ❌ Kayıp | Cross-dataset (deal_value) görseli artık yok, rubric şartı riskte |
