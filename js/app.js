document.addEventListener('DOMContentLoaded', () => {
    // 1. Firebase Servislerini Tanımla (En tepede olmalı ki herkes görsün)
    const db = firebase.firestore(); 
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    let sonIlanZamani = localStorage.getItem('sonIlanTarihi') || 0;

    // 2. HTML Elemanlarını Seç
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginWarning = document.getElementById('login-warning');
    const formWrapper = document.getElementById('form-wrapper');
    const userDisplayName = document.getElementById('user-display-name');
    const form = document.getElementById('lost-item-form');
    const submitButton = document.getElementById('submit-button');

    // 3. Giriş İşlemi
    if(loginBtn) {
        loginBtn.addEventListener('click', () => {
            auth.signInWithPopup(provider)
                .then((result) => {
                    console.log("Giriş başarılı:", result.user.displayName);
                })
                .catch((error) => {
                    console.error("Giriş hatası:", error);
                    alert("Giriş yapılırken bir hata oluştu: " + error.message);
                });
        });
    }

    // 4. Çıkış İşlemi
    if(logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            auth.signOut().then(() => {
                alert("Çıkış yapıldı.");
            });
        });
    }

    // 5. Oturum Durumunu İzle
    auth.onAuthStateChanged((user) => {
        if (user) {
            if(loginWarning) loginWarning.classList.add('hidden');
            if(formWrapper) formWrapper.classList.remove('hidden');
            if(logoutBtn) logoutBtn.classList.remove('hidden');
            if(userDisplayName) userDisplayName.textContent = user.displayName;
        } else {
            if(loginWarning) loginWarning.classList.remove('hidden');
            if(formWrapper) formWrapper.classList.add('hidden');
            if(logoutBtn) logoutBtn.classList.add('hidden');
        }
    });
    
    // 6. Form Dinamikleri (Karakter sayacı ve Koşullu alanlar)
    if (form) { 
        const esyaAciklama = document.getElementById('esya-aciklama');
        const charCounter = document.getElementById('char-counter');
        const maxChars = 300; 

        esyaAciklama.addEventListener('input', () => {
            const remaining = maxChars - esyaAciklama.value.length;
            charCounter.textContent = `Kalan karakter: ${remaining}`;
        });

        const tasitSelect = document.getElementById('tasit');
        const conditionalFields = document.querySelectorAll('.conditional-field');

        tasitSelect.addEventListener('change', () => {
            conditionalFields.forEach(field => field.classList.add('hidden'));
            const targetField = document.getElementById(`detay-${tasitSelect.value}`);
            if (targetField) targetField.classList.remove('hidden');
        });

        // 7. VERİTABANINA KAYDETME (ASIL ÖNEMLİ KISIM)
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const simdi = Date.now();
    const birGun = 24 * 60 * 60 * 1000;

    if (simdi - sonIlanZamani < birGun) {
        const kalanMs = birGun - (simdi - sonIlanZamani);
        const kalanSaat = Math.floor(kalanMs / (1000 * 60 * 60));
        alert(`Sabotajı engellemek için günde sadece 1 ilan verebilirsiniz. ${kalanSaat} saat sonra tekrar deneyin.`);
        return; // Kodun devam etmesini (veritabanına yazmasını) burada durdurur
    }
            
            submitButton.disabled = true;
            submitButton.textContent = 'Gönderiliyor...';

            const data = {
                isim: document.getElementById('isim').value,
                soyisim: document.getElementById('soyisim').value,
                telefon: document.getElementById('telefon').value,
                baslik: document.getElementById('baslik').value,
                kategori: document.getElementById('kategori').value,
                ilce: document.getElementById('ilce').value,
                tasit: document.getElementById('tasit').value,
                esyaAciklama: document.getElementById('esya-aciklama').value,
                iletisim: document.getElementById('iletisim').value || '',
                detaylar: {},
                userId: auth.currentUser.uid, 
                userEmail: auth.currentUser.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Aktif olan detay alanındaki (İETT, Metro vb.) verileri topla
            const activeFieldId = `detay-${data.tasit}`;
            const activeField = document.getElementById(activeFieldId);
            if (activeField) {
                activeField.querySelectorAll('input, select').forEach(input => {
                    if (input.value) data.detaylar[input.id] = input.value;
                });
            }

            // Firestore'a gönder
            db.collection("kayipIlanlari").add(data)
                .then(() => {
                    sonIlanZamani = Date.now();
    localStorage.setItem('sonIlanTarihi', sonIlanZamani);
                    alert("Kayıp eşya ilanınız başarıyla eklendi.");
                    form.reset();
                    charCounter.textContent = `Kalan karakter: ${maxChars}`;
                    conditionalFields.forEach(field => field.classList.add('hidden'));
                })
                .catch((error) => {
                    console.error("Firestore Hatası: ", error);
                    alert("Veritabanı hatası: " + error.message);
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'İlanı Gönder';
                });
        });
    }
});