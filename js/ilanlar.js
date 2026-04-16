document.addEventListener('DOMContentLoaded', () => {
    // 1. Firebase Bağlantısını Kur
    const db = firebase.firestore();

    // 2. HTML Elemanlarını Seç
    const listingsContainer = document.getElementById('listings-container');
    const searchBar = document.getElementById('search-bar');

    // 3. Verileri Firestore'dan Çekme Fonksiyonu
    function ilanlariGetir() {
        // 'kayipIlanlari' koleksiyonuna git ve tarihe göre sırala
        db.collection("kayipIlanlari").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
            listingsContainer.innerHTML = ""; // Yükleniyor yazısını temizle

            if (querySnapshot.empty) {
                listingsContainer.innerHTML = "<p>Henüz hiç ilan verilmemiş.</p>";
                return;
            }

            querySnapshot.forEach((doc) => {
                const ilan = doc.data();
                
                // Her ilan için bir kart (div) oluştur
                const ilanCard = document.createElement('div');
                ilanCard.className = 'listing-card';

                // Kartın içeriğini doldur
                ilanCard.innerHTML = `
                    <div class="listing-header">
                        <h3>${ilan.baslik}</h3>
                        <span class="status-badge">${ilan.kategori}</span>
                    </div>
                    <div class="listing-body">
                        <p><strong>Eşya Durumu:</strong> ${ilan.tasit} - ${ilan.ilce}</p>
                        <p><strong>Açıklama:</strong> ${ilan.esyaAciklama}</p>
                        <p><strong>İletişim:</strong> ${ilan.iletisim || 'Belirtilmemiş'}</p>
                    </div>
                    <div class="listing-footer">
                        <small>Yayınlayan: ${ilan.isim} ${ilan.soyisim}</small>
                    </div>
                `;
                listingsContainer.appendChild(ilanCard);
            });
        }, (error) => {
            console.error("Veri çekme hatası:", error);
            listingsContainer.innerHTML = "<p>İlanlar yüklenirken bir hata oluştu.</p>";
        });
    }

    // Fonksiyonu çalıştır
    ilanlariGetir();
});