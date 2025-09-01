document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const pageHeader = document.querySelector('.page-header');
    if (navToggle && pageHeader) {
        navToggle.addEventListener('click', () => {
            pageHeader.classList.toggle('nav-active');
            const isExpanded = pageHeader.classList.contains('nav-active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    const form = document.getElementById('pricelistForm'); 
    if (form) { 
        const punyaSouvenirRadios = document.querySelectorAll('input[name="punyaSouvenir"]');
        const detailSouvenirGroup = document.getElementById('detailSouvenirGroup');
        const detailSouvenirTextarea = document.getElementById('detailSouvenir');
        const anggaranSouvenirGroup = document.getElementById('anggaranSouvenirGroup');
        const anggaranSouvenirRadios = document.querySelectorAll('input[name="anggaranSouvenir"]'); 
        
        function toggleSouvenirDetails() {
            const selectedPunyaSouvenir = document.querySelector('input[name="punyaSouvenir"]:checked');
            if (detailSouvenirGroup && anggaranSouvenirGroup && detailSouvenirTextarea) { 
                if (selectedPunyaSouvenir && selectedPunyaSouvenir.value === 'Sudah Ada / Sedang Dipertimbangkan') {
                    detailSouvenirGroup.style.display = 'block';
                    detailSouvenirTextarea.required = true;
                    anggaranSouvenirGroup.style.display = 'block';
                    let isAnggaranSouvenirChecked = false;
                    anggaranSouvenirRadios.forEach(radio => {
                        if (radio.checked) isAnggaranSouvenirChecked = true;
                    });
                    if (!isAnggaranSouvenirChecked && anggaranSouvenirRadios.length > 0) {
                        anggaranSouvenirRadios[0].required = true;
                        for (let i = 1; i < anggaranSouvenirRadios.length; i++) {
                            anggaranSouvenirRadios[i].required = false;
                        }
                    } else {
                         anggaranSouvenirRadios.forEach(radio => radio.required = false );
                    }
                } else {
                    detailSouvenirGroup.style.display = 'none';
                    detailSouvenirTextarea.required = false;
                    detailSouvenirTextarea.value = ''; 
                    anggaranSouvenirGroup.style.display = 'none';
                    anggaranSouvenirRadios.forEach(radio => { 
                        radio.checked = false; 
                        radio.required = false; 
                    });
                }
            }
        }

        punyaSouvenirRadios.forEach(radio => { radio.addEventListener('change', toggleSouvenirDetails); });
        toggleSouvenirDetails(); 

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            if (anggaranSouvenirGroup && anggaranSouvenirGroup.style.display === 'block') {
                const selectedAnggaranSouvenir = document.querySelector('input[name="anggaranSouvenir"]:checked');
                if (!selectedAnggaranSouvenir) {
                    alert('Mohon pilih rentang anggaran souvenir.');
                    const firstAnggaranSouvenirRadio = document.querySelector('input[name="anggaranSouvenir"]');
                    if(firstAnggaranSouvenirRadio) firstAnggaranSouvenirRadio.focus();
                    return; 
                }
            }

            const nomorTujuanBisnis = '6285640546232'; // PASTIKAN INI NOMOR WA BISNIS ANDA YANG BENAR
            const nama = document.getElementById('nama').value;
            let nomorWhatsappUser = document.getElementById('nomorWhatsapp').value;
            const estimasiUndangan = document.getElementById('estimasiUndangan').value;
            const tanggalPernikahanInput = document.getElementById('tanggalPernikahan');
            let tanggalPernikahanFormatted = "Belum ditentukan";
            if (tanggalPernikahanInput.value) {
                try {
                    tanggalPernikahanFormatted = new Date(tanggalPernikahanInput.value).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
                } catch (e) {
                    console.error("Error formatting date:", e);
                    tanggalPernikahanFormatted = tanggalPernikahanInput.value; 
                }
            }

            const preferensiUndanganElement = document.querySelector('input[name="preferensiUndangan"]:checked');
            const preferensiUndangan = preferensiUndanganElement ? preferensiUndanganElement.value : "Belum dipilih";
            const anggaranUndanganElement = document.querySelector('input[name="anggaranUndangan"]:checked');
            const anggaranUndangan = anggaranUndanganElement ? anggaranUndanganElement.value : "Belum dipilih";
            const punyaSouvenirElement = document.querySelector('input[name="punyaSouvenir"]:checked');
            const punyaSouvenir = punyaSouvenirElement ? punyaSouvenirElement.value : "Belum dipilih";
            let detailSouvenir = "";
            let anggaranSouvenir = "";
            if (punyaSouvenir === 'Sudah Ada / Sedang Dipertimbangkan') {
                detailSouvenir = document.getElementById('detailSouvenir').value;
                const anggaranSouvenirElement = document.querySelector('input[name="anggaranSouvenir"]:checked');
                anggaranSouvenir = anggaranSouvenirElement ? anggaranSouvenirElement.value : "Belum dipilih";
            }
            let pesan = `🔔 Permintaan Pricelist Undangan Baru (Sakina Visuals) 🔔\n\n`;
            pesan += `Berikut adalah detail dari calon klien:\n\n`;
            pesan += `👤 Nama: ${nama}\n`;
            pesan += `📱 WhatsApp Klien: +62${nomorWhatsappUser}\n`;
            pesan += `🔢 Estimasi Undangan: ${estimasiUndangan} pcs\n`;
            pesan += `🗓️ Rencana Tanggal Pernikahan: ${tanggalPernikahanFormatted}\n\n`;
            pesan += `✨ Preferensi Undangan:\n • ${preferensiUndangan}\n\n`;
            pesan += `💰 Estimasi Anggaran Undangan (per pcs):\n • ${anggaranUndangan}\n\n`;
            pesan += `🎁 Status Rencana Souvenir:\n • ${punyaSouvenir}\n`;
            if (punyaSouvenir === 'Sudah Ada / Sedang Dipertimbangkan') {
                pesan += `  🏷️ Detail Souvenir: ${detailSouvenir || "Tidak diisi"}\n`;
                pesan += `  💸 Anggaran Souvenir (per pcs): ${anggaranSouvenir || "Belum dipilih"}\n`;
            }
            pesan += `\nMohon untuk segera ditindaklanjuti. Terima kasih!`;
            const encodedPesan = encodeURIComponent(pesan);
            const whatsappURL = `https://wa.me/${nomorTujuanBisnis}?text=${encodedPesan}`;
            window.open(whatsappURL, '_blank');
        });
    } 
});
