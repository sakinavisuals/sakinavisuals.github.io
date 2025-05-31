// data-katalog.js
// PENTING: ISI DENGAN DATA PRODUK ANDA YANG LENGKAP DAN AKURAT!
// Pastikan 'jumlah' dan 'harga' di hargaTiersPopup adalah ANGKA.
// Urutkan hargaTiersPopup dari 'jumlah' terkecil ke terbesar.

const catalogData = [
    {
        id: 'sv-l2-001',
        category: 'lipat2',
        namaProduk: 'Undangan Softcover Lipat 2 (SV-L2-001)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/fb88133df7cdebdabd9a91a8b0fff6fedaa1022e/images/cat_lipat2/SV-LP2-001.jpg', 
        altText: 'Undangan Softcover Lipat 2', 
        codeCard: 'KODE : SV-L2-001', 
        detailsCard: ['Jasmine 200gsm', 'A4 Dilipat', 'Aqeela V1 Series'],
        titlePopup: 'UNDANGAN SOFTCOVER LIPAT 2', 
        codePopup: 'SV-L2-001',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 6000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Jasmin Import 200gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-l2-002',
        category: 'lipat2',
        namaProduk: 'Undangan Softcover Lipat 2 (SV-L2-002)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/fb88133df7cdebdabd9a91a8b0fff6fedaa1022e/images/cat_lipat2/SV-LP2-002.jpg', 
        altText: 'Undangan Softcover Lipat 2', 
        codeCard: 'KODE : SV-L2-002', 
        detailsCard: ['Ivory 230gsm', 'A4 Dilipat', 'Aqeela V2 Series'],
        titlePopup: 'UNDANGAN SOFTCOVER LIPAT 2', 
        codePopup: 'SV-L2-002',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 4000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Ivory 230gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-l2-003',
        category: 'lipat2',
        namaProduk: 'Undangan Softcover Lipat 2 (SV-L2-003)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/refs/heads/main/images/cat_lipat2/SV-LP2-003.webp', 
        altText: 'Undangan Softcover Lipat 2', 
        codeCard: 'KODE : SV-L2-003', 
        detailsCard: ['Jasmine 200gsm', 'A4 Dilipat', 'Fresh Garden'],
        titlePopup: 'UNDANGAN SOFTCOVER LIPAT 2', 
        codePopup: 'SV-L2-003',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 6000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Jasmin Import 200gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-l2-004',
        category: 'lipat2',
        namaProduk: 'Undangan Softcover Lipat 2 (SV-L2-004)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/refs/heads/main/images/cat_lipat2/SLIDE%2001.webp', 
        altText: 'Undangan Softcover Lipat 2', 
        codeCard: 'KODE : SV-L2-004', 
        detailsCard: ['Ivory 230gsm', 'A4 Dilipat', 'Classic Burgundy Series'],
        titlePopup: 'UNDANGAN SOFTCOVER LIPAT 2', 
        codePopup: 'SV-L2-004',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 4000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Ivory 230gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-l3-001',
        category: 'lipat3',
        namaProduk: 'Undangan Softcover Semi Amplop (SV-L3-001)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/refs/heads/main/images/cat_lipat2/SV-LP2-003.webp', 
        altText: 'Undangan Softcover Semi Amplop', 
        codeCard: 'KODE : SV-L3-001', 
        detailsCard: ['Jasmine 200gsm', 'A4 Dilipat', 'Garden Bliss'],
        titlePopup: 'UNDANGAN SOFTCOVER SEMI AMPLOP', 
        codePopup: 'SV-L3-001',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 6000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Jasmin Import 200gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-l3-002',
        category: 'lipat3',
        namaProduk: 'Undangan Softcover Semi Amplop (SV-L3-002)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/refs/heads/main/images/cat_lipat3/SV-LP3-002.webp', 
        altText: 'Undangan Softcover Semi Amplop', 
        codeCard: 'KODE : SV-L3-002', 
        detailsCard: ['Jasmine 200gsm', 'A4 Dilipat', 'Khayra Classic'],
        titlePopup: 'UNDANGAN SOFTCOVER SEMI AMPLOP', 
        codePopup: 'SV-L3-001',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 6000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Jasmin Import 200gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-l3-003',
        category: 'lipat3',
        namaProduk: 'Undangan Softcover Semi Amplop (SV-L3-003)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/refs/heads/main/images/cat_amplop/SV-AMP-001.webp', 
        altText: 'Undangan Softcover Semi Amplop', 
        codeCard: 'KODE : SV-L3-003', 
        detailsCard: ['Ivory 230gsm', 'A4 Dilipat', 'Botanical Luxe'],
        titlePopup: 'UNDANGAN SOFTCOVER SEMI AMPLOP', 
        codePopup: 'SV-L3-001',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 4000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Ivory 230gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-amp-001',
        category: 'amplop',
        namaProduk: 'Undangan Amplop (SV-SC-001)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/refs/heads/main/images/cat_lipat3/SV-LP3-001.webp', 
        altText: 'Undangan Amplop', 
        codeCard: 'KODE : SV-SC-001', 
        detailsCard: ['Ivory 230gsm', 'A4 Dilipat (Softcover)', 'Aqeela V2 Series'],
        titlePopup: 'UNDANGAN AMPLOP', 
        codePopup: 'SV-AMP-001',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 4000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Ivory 230gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    {
        id: 'sv-hc-001',
        category: 'hardcover', // Pastikan ID unik jika ini produk yang berbeda dari duplikat lainnya
        namaProduk: 'Undangan Hardcover (SV-HC-001)', // Nama Jelas
        imageSrc: 'https://raw.githubusercontent.com/sakinavisuals/sakinavisuals.github.io/refs/heads/main/images/comson.webp', 
        altText: 'Undangan Hardcover', 
        codeCard: 'KODE : SV-HC-001', 
        detailsCard: ['Ivory 230gsm', 'A4 Dilipat', 'Aqeela V2 Series'],
        titlePopup: 'UNDANGAN HARDCOVER', 
        codePopup: 'SV-HC-001',
        
        // --- DATA HARGA BARU ---
        hargaDasar: 4000, // Harga satuan produk ini (ANGKA)
        // hargaTiersPopup: [ ... ], // BISA DIHAPUS ATAU DIABAIKAN OLEH LOGIKA BARU
        kuantitasMinimumOrder: 1, 
        // --- AKHIR DATA HARGA BARU --- 

        bahanPopup: 'Kertas Ivory 230gsm',
        ukuranPopup: 'Uk. Tertutup 20,5 X 14,5 cm | Uk. Terbuka 29 X 20,5 cm',
        bonusPopup: ['Plastik OPP Bening (Sesuai Jumlah Undangan)', 'Label Nama Tamu', 'Packing Kardus agar paket aman di pengiriman'],
        catatanTambahanPopup: '- Bisa request tambahan: Thank You Card, Kartu Souvenir, Denah Lokasi (Silahkan chat admin untuk info & biaya tambahan).',
        estimasiPengerjaanPopup: '7-10 Hari Kerja (setelah Desain FIX & DP diterima)',
        pengirimanDariPopup: 'Dari Kota Yogyakarta',
        jasaKirimPopup: 'JNE, J&T, POS Indonesia, Wahana, SiCepat, Kargo (untuk partai besar), atau sesuai permintaan.',
        notePengirimanPopup: 'Bisa juga diambil langsung ke lokasi kami (dengan perjanjian).'
    },
    // TAMBAHKAN SEMUA PRODUK ANDA DI SINI DENGAN FORMAT YANG SAMA DAN DATA HARGA YANG AKURAT
];
