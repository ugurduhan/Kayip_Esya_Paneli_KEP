document.addEventListener('DOMContentLoaded', () => {
    
    const db = firebase.firestore();

    const listingsContainer = document.getElementById('listings-container');
    const searchBar = document.getElementById('search-bar'); // TODO: Arama fonksiyonu eklenecek

    // İlanları realtime dinle
    function ilanlariGetir() {
        db.collection("kayipIlanlari").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
            listingsContainer.innerHTML = ""; 

            if (querySnapshot.empty) {
                listingsContainer.innerHTML = "<p>Henüz hiç ilan verilmemiş.</p>";
                return;
            }

            querySnapshot.forEach((doc) => {
                const ilan = doc.data();
                
                const ilanCard = document.createElement('div');
                ilanCard.className = 'listing-card';

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

    ilanlariGetir();
});
