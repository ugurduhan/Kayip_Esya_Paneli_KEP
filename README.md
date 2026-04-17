# İstanbul Kayıp Eşya Takip Paneli (TÜBİTAK Projesi)

İstanbul genelindeki toplu taşıma araçlarında (Otobüs, Metrobüs, Metro) unutulan eşyaların takibi ve yönetimi için geliştirilmiş, bulut tabanlı bir yönetim platformudur.

## Proje Vizyonu
Bu proje, kayıp eşya bildirim süreçlerini dijitalleştirerek hem vatandaşların hem de yetkililerin iletişimini hızlandırmayı amaçlar. Dinamik yapısı sayesinde anlık veri girişi ve takibi sağlar.

## Öne Çıkan Özellikler
* **Google Firebase Entegrasyonu:** Veriler gerçek zamanlı (Real-time) olarak Google Cloud sunucularında saklanır.
* **Güvenli Giriş (Auth):** Google Authentication ile sadece yetkilendirilmiş kullanıcıların ilan vermesi sağlanır.
* **Spam Koruması (Rate Limiting):** Aynı kullanıcının kısa sürede kontrolsüzce ilan vermesini engelleyen güvenlik algoritması.
* **Dinamik Filtreleme:** İlanlar arasında eşya türü veya konuma göre anlık arama yapabilme.
* **Modern UI/UX:** Kullanıcı dostu, mobil uyumlu ve temiz bir arayüz tasarımı.

## Teknik Altyapı
* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend/Database:** Google Firebase Firestore
* **Authentication:** Firebase Auth (Google Sign-In)
* **Hosting:** GitHub Pages

## Dosya Yapısı
* `index.html`: Uygulamanın giriş ve ilan verme ana ekranı.
* `ilanlar.html`: Kaydedilen tüm ilanların listelendiği ve filtreleme yapıldığı sayfa.
* `js/app.js`: Firebase bağlantı ayarları ve ana uygulama mantığı.
* `js/ilanlar.js`: Veritabanından veri çekme ve listeleme algoritmaları.

## Geliştirici
**Uğur** *Yalova Üniversitesi - Bilgisayar Programcılığı 1. Sınıf Öğrencisi* **GANO:** 3.30

---
*Bu proje, TÜBİTAK proje yarışmaları standartlarına uygun olarak, bir toplumsal soruna teknolojik çözüm üretme amacıyla geliştirilmiştir.*
