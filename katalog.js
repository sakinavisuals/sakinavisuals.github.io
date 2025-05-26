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

    const catalogGrid = document.querySelector('.catalog-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activeCategoryTitle = document.getElementById('activeCategoryTitle');
    const previewModal = document.getElementById('previewModal');
    // Pastikan previewModal tidak null sebelum mengakses propertinya
    let modalCloseButton, modalImage, modalItemName, modalItemCodePopup, 
        modalProductSpecsList, modalBonusesList, modalAdditionalNotes,
        modalPricingTableBody, modalProductionTime, modalShippingOrigin,
        modalShippingServices, modalShippingNotes, modalKonsultasiButton,
        modalTabButtons, modalTabContents;

    if (previewModal) {
        modalCloseButton = previewModal.querySelector('.modal-close');
        modalImage = document.getElementById('modalImage');
        modalItemName = document.getElementById('modalItemName');
        modalItemCodePopup = document.getElementById('modalItemCodePopup');
        modalProductSpecsList = document.getElementById('modalProductSpecs');
        modalBonusesList = document.getElementById('modalBonuses');
        modalAdditionalNotes = document.getElementById('modalAdditionalNotes');
        modalPricingTableBody = document.getElementById('modalPricingTableBody');
        modalProductionTime = document.getElementById('modalProductionTime');
        modalShippingOrigin = document.getElementById('modalShippingOrigin');
        modalShippingServices = document.getElementById('modalShippingServices');
        modalShippingNotes = document.getElementById('modalShippingNotes');
        modalKonsultasiButton = document.getElementById('modalKonsultasiWhatsapp');
        modalTabButtons = previewModal.querySelectorAll('.modal-tabs .tab-button');
        modalTabContents = previewModal.querySelectorAll('.tab-content');
    }


    function renderCatalogItems(itemsToRender) {
        if (!catalogGrid) return; // Tambahkan pengecekan jika catalogGrid tidak ada
        catalogGrid.innerHTML = ''; 
        // Pastikan catalogData sudah terdefinisi (dari file data-katalog.js)
        if (typeof catalogData === 'undefined' || !Array.isArray(catalogData)) {
            console.error('catalogData is not defined or not an array.');
            catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color: red;">Data katalog tidak ditemukan.</p>';
            return;
        }
        if (itemsToRender.length === 0 && itemsToRender !== catalogData) {
            catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color: var(--form-label-color);">Tidak ada item untuk kategori ini.</p>';
            return;
        }
        itemsToRender.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('catalog-item');
            itemElement.setAttribute('data-item-id', item.id); 
            
            let detailsHTML = '';
            if(item.detailsCard && Array.isArray(item.detailsCard)){
                item.detailsCard.forEach(detail => { detailsHTML += `<p>${detail}</p>`; });
            }

            itemElement.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.altText || 'Gambar Produk'}">
                <div class="item-details">
                    <h4>${item.codeCard || 'Kode Produk'}</h4>
                    ${detailsHTML}
                </div>
                <div class="item-actions">
                    <a href="#" class="btn btn-preview" data-itemid="${item.id}">Preview</a>
                    <a href="https://wa.me/628123456789?text=Halo%20Sakina%20Visuals,%20saya%20tertarik%20untuk%20order%20undangan%20kode:%20${item.codePopup || item.codeCard || item.id}" class="btn btn-order" target="_blank">Order Now</a>
                </div>
            `;
            catalogGrid.appendChild(itemElement);
        });
        addPreviewButtonListeners();
    }

    function openPreviewModal(itemId) {
        if (!previewModal || typeof catalogData === 'undefined') return; // Pastikan modal & data ada

        const item = catalogData.find(i => i.id === itemId); 
        if (!item) return;

        if (modalImage) {
            modalImage.src = item.imageSrc || '';
            modalImage.alt = item.altText || 'Pratinjau Undangan';
        }
        if (modalItemName) modalItemName.textContent = item.titlePopup || item.altText || 'Detail Produk'; 
        if (modalItemCodePopup) modalItemCodePopup.textContent = `Kode Produk: ${item.codePopup || item.id}`; 
        
        if (modalProductSpecsList) {
            modalProductSpecsList.innerHTML = ''; 
            if (item.bahanPopup) modalProductSpecsList.innerHTML += `<li>${item.bahanPopup}</li>`;
            if (item.ukuranPopup) modalProductSpecsList.innerHTML += `<li>${item.ukuranPopup}</li>`;
        }
        
        if (modalBonusesList) {
            modalBonusesList.innerHTML = ''; 
            if (item.bonusPopup && Array.isArray(item.bonusPopup) && item.bonusPopup.length > 0) {
                item.bonusPopup.forEach(bonusText => { modalBonusesList.innerHTML += `<li>${bonusText}</li>`; });
            } else {
                modalBonusesList.innerHTML = '<li>-</li>';
            }
        }
        
        if (modalAdditionalNotes) modalAdditionalNotes.textContent = item.catatanTambahanPopup || '';
        
        if (modalPricingTableBody) {
            modalPricingTableBody.innerHTML = ''; 
            if (item.hargaTiersPopup && Array.isArray(item.hargaTiersPopup) && item.hargaTiersPopup.length > 0) {
                item.hargaTiersPopup.forEach(tier => {
                    modalPricingTableBody.innerHTML += `<tr><td>${tier.jumlah}</td><td>${tier.harga}</td></tr>`;
                });
            } else {
                modalPricingTableBody.innerHTML = '<tr><td colspan="2" style="text-align:center;">Harga via konsultasi.</td></tr>';
            }
        }

        if (modalProductionTime) modalProductionTime.textContent = item.estimasiPengerjaanPopup || '-';
        if (modalShippingOrigin) modalShippingOrigin.textContent = item.pengirimanDariPopup || '-';
        if (modalShippingServices) modalShippingServices.textContent = item.jasaKirimPopup || '-';
        if (modalShippingNotes) modalShippingNotes.textContent = item.notePengirimanPopup || '';
        
        if (modalKonsultasiButton) {
            const konsultasiPesan = `Kak, saya mau konsultasi undangan cetak kode : ${item.codePopup || item.id}`;
            modalKonsultasiButton.href = `https://wa.me/628123456789?text=${encodeURIComponent(konsultasiPesan)}`;
        }
        
        const orderNowPopupBtn = document.getElementById('modalOrderNowWhatsapp');
        if (orderNowPopupBtn) {
            orderNowPopupBtn.href = `https://wa.me/628123456789?text=${encodeURIComponent('Halo Sakina Visuals, saya mau order undangan cetak kode: ' + (item.codePopup || item.id))}`;
        }

        showModalTab('detailUndangan'); 
        previewModal.style.display = 'flex'; 
        setTimeout(() => previewModal.classList.add('visible'), 10); 
    }

    function closeModal() {
        if (!previewModal) return;
        previewModal.classList.remove('visible');
        setTimeout(() => previewModal.style.display = 'none', 300); 
    }
    
    function showModalTab(tabId) {
        if (!modalTabContents || !modalTabButtons || !previewModal) return;
        modalTabContents.forEach(content => content.classList.remove('active'));
        modalTabButtons.forEach(button => button.classList.remove('active'));
        const targetContent = document.getElementById('tab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
        const targetButton = previewModal.querySelector(`.tab-button[data-tab="${tabId}"]`);
        if (targetContent) targetContent.classList.add('active');
        if (targetButton) targetButton.classList.add('active');
    }

    function addPreviewButtonListeners() {
        if (!catalogGrid) return;
        const previewButtons = catalogGrid.querySelectorAll('.btn-preview');
        previewButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            newButton.addEventListener('click', function(event) {
                event.preventDefault();
                const itemId = this.getAttribute('data-itemid');
                openPreviewModal(itemId);
            });
        });
    }
    
    if (modalCloseButton) {
      modalCloseButton.addEventListener('click', closeModal);
    }
    if (previewModal) {
      previewModal.addEventListener('click', function(event) { 
          if (event.target === previewModal) { closeModal(); }
      });
    }
    
    if (modalTabButtons) {
        modalTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                showModalTab(this.getAttribute('data-tab'));
            });
        });
    }

    if (filterButtons && filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const selectedCategory = this.getAttribute('data-category');
                if (activeCategoryTitle) {
                    const categoryName = this.textContent;
                    activeCategoryTitle.textContent = "CETAK MODEL " + categoryName.toUpperCase();
                }
                // Pastikan catalogData sudah terdefinisi
                if (typeof catalogData !== 'undefined') {
                    const filteredItems = catalogData.filter(item => item.category === selectedCategory); 
                    renderCatalogItems(filteredItems);
                } else {
                    console.error('catalogData is not available for filtering.');
                }
            });
        });

        // Initial load
        if (typeof catalogData !== 'undefined') {
            filterButtons[0].click(); 
        } else {
             // Fallback if catalogData is not loaded, render nothing or an error
            if (catalogGrid) {
                catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color:red;">Gagal memuat data katalog. Pastikan file data-katalog.js ada dan benar.</p>';
            }
        }
    } else if (typeof catalogData !== 'undefined') { // If no filter buttons, render all
        renderCatalogItems(catalogData);
    } else {
        if (catalogGrid) {
            catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color:red;">Gagal memuat data katalog dan filter.</p>';
        }
    }
});