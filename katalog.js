document.addEventListener('DOMContentLoaded', function() {
    // --- Variabel Global & Selektor DOM ---
    const waBusinessNumber = '6281229236446'; // PASTIKAN INI NOMOR WA BISNIS ANDA YANG BENAR

    const navToggle = document.querySelector('.nav-toggle');
    const pageHeader = document.querySelector('.page-header');
    const previewModal = document.getElementById('previewModal');
    let previewModalCloseButton, previewModalImage, previewModalItemName, previewModalItemCodePopup,
        previewModalProductSpecsList, previewModalBonusesList, previewModalAdditionalNotes,
        previewModalPricingTableBody, previewModalProductionTime, previewModalShippingOrigin,
        previewModalShippingServices, previewModalShippingNotes, previewModalKonsultasiButton,
        previewModalAddToCartButton, previewModalTabButtons, previewModalTabContents;
    let currentPreviewItemId = null;

    const catalogGrid = document.querySelector('.catalog-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activeCategoryTitle = document.getElementById('activeCategoryTitle');

    const cartIconContainer = document.getElementById('cartIconContainer');
    const cartItemCountElement = document.getElementById('cartItemCount');
    const cartModal = document.getElementById('cartModal');
    const closeCartModalButton = document.getElementById('closeCartModal');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalAmountElement = document.getElementById('cartTotalAmount');
    const clearCartButton = document.getElementById('clearCartButton');
    const proceedToCheckoutButton = document.getElementById('proceedToCheckoutButton');
    const checkoutFormContainer = document.getElementById('checkoutFormContainer');
    const checkoutForm = document.getElementById('checkoutForm');

    let cart = [];

    function initializePage() {
        setupEventListeners();
        loadCartFromStorage();
        initializeCatalog();
    }

    function setupEventListeners() {
        if (navToggle && pageHeader) navToggle.addEventListener('click', toggleMobileNav);
        if (previewModal) {
            assignPreviewModalSelectors();
            if (previewModalCloseButton) previewModalCloseButton.addEventListener('click', closeProductPreviewModal);
            previewModal.addEventListener('click', (event) => {
                if (event.target === previewModal) closeProductPreviewModal();
            });
            if (previewModalTabButtons) {
                previewModalTabButtons.forEach(button => {
                    button.addEventListener('click', function() { showProductPreviewModalTab(this.getAttribute('data-tab')); });
                });
            }
            if (previewModalAddToCartButton) {
                previewModalAddToCartButton.addEventListener('click', handleAddToCartFromPreviewModal);
            }
        }
        if (cartIconContainer) cartIconContainer.addEventListener('click', openCartModal);
        if (closeCartModalButton) closeCartModalButton.addEventListener('click', closeCartModal);
        if (cartModal) {
            cartModal.addEventListener('click', (event) => {
                if (event.target === cartModal) closeCartModal();
            });
        }
        if (clearCartButton) clearCartButton.addEventListener('click', handleClearCart);
        if (proceedToCheckoutButton) proceedToCheckoutButton.addEventListener('click', showCheckoutForm);
        if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutFormSubmit);
    }
    
    function assignPreviewModalSelectors() {
        previewModalCloseButton = previewModal.querySelector('.modal-close');
        previewModalImage = document.getElementById('modalImage');
        previewModalItemName = document.getElementById('modalItemName');
        previewModalItemCodePopup = document.getElementById('modalItemCodePopup');
        previewModalProductSpecsList = document.getElementById('modalProductSpecs');
        previewModalBonusesList = document.getElementById('modalBonuses');
        previewModalAdditionalNotes = document.getElementById('modalAdditionalNotes');
        previewModalPricingTableBody = document.getElementById('modalPricingTableBody'); // Untuk menampilkan hargaTiersPopup jika masih ada
        previewModalProductionTime = document.getElementById('modalProductionTime');
        previewModalShippingOrigin = document.getElementById('modalShippingOrigin');
        previewModalShippingServices = document.getElementById('modalShippingServices');
        previewModalShippingNotes = document.getElementById('modalShippingNotes');
        previewModalKonsultasiButton = document.getElementById('modalKonsultasiWhatsapp');
        previewModalAddToCartButton = document.getElementById('modalAddToCartButton');
        previewModalTabButtons = previewModal.querySelectorAll('.modal-tabs .tab-button');
        previewModalTabContents = previewModal.querySelectorAll('.tab-content');
    }

    function toggleMobileNav() {
        pageHeader.classList.toggle('nav-active');
        navToggle.setAttribute('aria-expanded', pageHeader.classList.contains('nav-active'));
    }

    function openProductPreviewModal(itemId) {
        if (!previewModal || typeof catalogData === 'undefined') return;
        const item = catalogData.find(i => i.id === itemId);
        if (!item) { console.error(`Item with ID ${itemId} not found in catalogData.`); return; }
        currentPreviewItemId = itemId;

        if (previewModalImage) {
            previewModalImage.src = item.imageSrc || '';
            previewModalImage.alt = item.altText || 'Pratinjau Undangan';
        }
        if (previewModalItemName) previewModalItemName.textContent = item.titlePopup || item.namaProduk || 'Detail Produk';
        if (previewModalItemCodePopup) previewModalItemCodePopup.textContent = `Kode Produk: ${item.codePopup || item.id}`;
        
        if (previewModalProductSpecsList) {
            previewModalProductSpecsList.innerHTML = '';
            if (item.bahanPopup) previewModalProductSpecsList.innerHTML += `<li>${item.bahanPopup}</li>`;
            if (item.ukuranPopup) previewModalProductSpecsList.innerHTML += `<li>${item.ukuranPopup}</li>`;
        }
        if (previewModalBonusesList) {
            previewModalBonusesList.innerHTML = '';
            if (item.bonusPopup && Array.isArray(item.bonusPopup) && item.bonusPopup.length > 0) {
                item.bonusPopup.forEach(bonusText => { previewModalBonusesList.innerHTML += `<li>${bonusText}</li>`; });
            } else {
                previewModalBonusesList.innerHTML = '<li>-</li>';
            }
        }
        if (previewModalAdditionalNotes) previewModalAdditionalNotes.textContent = item.catatanTambahanPopup || '';
        
        // Tampilkan harga dasar ATAU tabel harga tiers jika masih ada di data-katalog.js
        if (previewModalPricingTableBody) {
            previewModalPricingTableBody.innerHTML = '';
            if (item.hargaTiersPopup && Array.isArray(item.hargaTiersPopup) && item.hargaTiersPopup.length > 0) {
                // Jika Anda masih ingin menampilkan tabel harga bertingkat sebagai INFO
                item.hargaTiersPopup.forEach(tier => {
                    previewModalPricingTableBody.innerHTML += `<tr><td>${tier.jumlah}+ pcs</td><td>${formatCurrency(tier.harga)}</td></tr>`;
                });
            } else if (typeof item.hargaDasar === 'number') {
                // Jika hanya ada hargaDasar, tampilkan itu
                previewModalPricingTableBody.innerHTML = `<tr><td colspan="2" style="text-align:center;">Harga: ${formatCurrency(item.hargaDasar)} /pcs</td></tr>`;
            } else {
                previewModalPricingTableBody.innerHTML = '<tr><td colspan="2" style="text-align:center;">Harga via konsultasi.</td></tr>';
            }
        }

        if (previewModalProductionTime) previewModalProductionTime.textContent = item.estimasiPengerjaanPopup || '-';
        if (previewModalShippingOrigin) previewModalShippingOrigin.textContent = item.pengirimanDariPopup || '-';
        if (previewModalShippingServices) previewModalShippingServices.textContent = item.jasaKirimPopup || '-';
        if (previewModalShippingNotes) previewModalShippingNotes.textContent = item.notePengirimanPopup || '-';
        if (previewModalKonsultasiButton) {
            const konsultasiPesan = `Kak, saya mau konsultasi undangan cetak (Kode: ${item.codePopup || item.id})`;
            previewModalKonsultasiButton.href = `https://wa.me/${waBusinessNumber}?text=${encodeURIComponent(konsultasiPesan)}`;
        }

        showProductPreviewModalTab('detailUndangan');
        previewModal.style.display = 'flex';
        setTimeout(() => previewModal.classList.add('visible'), 10);
    }

    function closeProductPreviewModal() {
        if (!previewModal) return;
        previewModal.classList.remove('visible');
        setTimeout(() => previewModal.style.display = 'none', 300);
        currentPreviewItemId = null;
    }

    function showProductPreviewModalTab(tabId) {
        if (!previewModalTabContents || !previewModalTabButtons || !previewModal) return;
        previewModalTabContents.forEach(content => content.classList.remove('active'));
        previewModalTabButtons.forEach(button => button.classList.remove('active'));
        const targetContent = document.getElementById('tab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
        const targetButton = previewModal.querySelector(`.tab-button[data-tab="${tabId}"]`);
        if (targetContent) targetContent.classList.add('active');
        if (targetButton) targetButton.classList.add('active');
    }

    function handleAddToCartFromPreviewModal() {
        if (currentPreviewItemId) {
            const product = catalogData.find(p => p.id === currentPreviewItemId);
            if (product) {
                const qtyToAdd = product.kuantitasMinimumOrder || 1;
                // Harga akan diambil dari product.hargaDasar di dalam addItemToCart
                addItemToCart(product.id, product.namaProduk, product.imageSrc, qtyToAdd, product.hargaDasar); 
            } else {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Produk tidak ditemukan.' });
            }
        } else {
            Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Tidak ada produk yang dipilih untuk ditambahkan ke keranjang.' });
        }
    }

    function initializeCatalog() {
        if (typeof catalogData === 'undefined' || !Array.isArray(catalogData)) {
            if (catalogGrid) catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color:red;">Error: data-katalog.js tidak dimuat atau variabel catalogData tidak ada.</p>';
            console.error("catalogData is not defined. Make sure data-katalog.js is loaded and correct.");
            return;
        }
        if (filterButtons && filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', handleFilterClick);
            });
            if (catalogData.length > 0) filterButtons[0].click();
            else if (catalogGrid) catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color: var(--form-label-color);">Tidak ada item produk.</p>';
        } else if (catalogData.length > 0) {
            renderCatalogItems(catalogData);
        } else if (catalogGrid) {
            catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color: var(--form-label-color);">Tidak ada item produk.</p>';
        }
    }

    function handleFilterClick() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const selectedCategory = this.getAttribute('data-category');
        if (activeCategoryTitle) activeCategoryTitle.textContent = "CETAK MODEL " + this.textContent.toUpperCase();
        const filteredItems = catalogData.filter(item => item.category === selectedCategory);
        renderCatalogItems(filteredItems);
    }

    function renderCatalogItems(itemsToRender) {
        if (!catalogGrid) return;
        catalogGrid.innerHTML = '';
        if (!itemsToRender || itemsToRender.length === 0) {
            catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color: var(--form-label-color);">Tidak ada item untuk kategori ini.</p>';
            return;
        }
        itemsToRender.forEach(item => {
            // Pastikan item memiliki hargaDasar
            if (!item.id || !item.namaProduk || typeof item.hargaDasar === 'undefined' || !item.imageSrc || typeof item.kuantitasMinimumOrder === 'undefined') {
                console.warn('Melewatkan item karena data penting tidak ada (id, namaProduk, hargaDasar, imageSrc, kuantitasMinimumOrder):', item);
                return;
            }
            const displayPriceText = `Harga: ${formatCurrency(item.hargaDasar)}`; // Menampilkan harga dasar produk

            const itemElement = document.createElement('div');
            itemElement.classList.add('catalog-item');
            itemElement.dataset.itemId = item.id;

            let detailsHTML = '';
            if (item.detailsCard && Array.isArray(item.detailsCard)) {
                item.detailsCard.forEach(detail => { detailsHTML += `<p>${detail}</p>`; });
            }
            itemElement.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.altText || item.namaProduk}">
                <div class="item-details">
                    <h4>${item.codeCard || item.namaProduk}</h4>
                    ${detailsHTML}
                    <p class="item-price">${displayPriceText}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-preview">Preview</button>
                    <button class="btn btn-order btn-add-to-cart">Tambah ke Keranjang</button>
                </div>
            `;
            catalogGrid.appendChild(itemElement);
        });
        addCatalogItemEventListeners();
    }

    function addCatalogItemEventListeners() {
        if (!catalogGrid) return;
        catalogGrid.querySelectorAll('.btn-preview').forEach(button => {
            const itemElement = button.closest('.catalog-item');
            const itemId = itemElement.dataset.itemId;
            button.addEventListener('click', () => openProductPreviewModal(itemId));
        });
        catalogGrid.querySelectorAll('.btn-add-to-cart').forEach(button => {
            const itemElement = button.closest('.catalog-item');
            const itemId = itemElement.dataset.itemId;
            button.addEventListener('click', () => {
                const product = catalogData.find(p => p.id === itemId);
                if (product && typeof product.hargaDasar !== 'undefined') {
                    addItemToCart(product.id, product.namaProduk, product.imageSrc, product.kuantitasMinimumOrder || 1, product.hargaDasar);
                } else {
                    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Produk atau harga dasar produk tidak ditemukan.' });
                }
            });
        });
    }
    
    function formatCurrency(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) amount = 0;
        return 'Rp ' + amount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    function loadCartFromStorage() {
        const storedCart = localStorage.getItem('sakinaShopCart');
        cart = storedCart ? JSON.parse(storedCart) : [];
        updateCartIcon();
    }

    function saveCartToStorage() {
        localStorage.setItem('sakinaShopCart', JSON.stringify(cart));
    }

    function updateCartIcon() {
        if (cartItemCountElement) {
            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartItemCountElement.textContent = totalQuantity;
            cartItemCountElement.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
        }
    }

    function addItemToCart(id, name, image, quantity, pricePerItem) {
        if (typeof pricePerItem !== 'number' || isNaN(pricePerItem)) {
            Swal.fire({ icon: 'error', title: 'Gagal', text: 'Harga produk tidak valid!' });
            console.error("Invalid price for item:", name, pricePerItem);
            return;
        }
        const product = catalogData.find(p => p.id === id);
        if (!product) { Swal.fire({ icon: 'error', title: 'Gagal', text: 'Produk tidak ditemukan!' }); return; }

        const qty = Number(quantity) || Number(product.kuantitasMinimumOrder) || 1;
        // Harga per item sekarang sudah fixed dari product.hargaDasar, tidak perlu getProductPriceForQuantity lagi

        const existingItemIndex = cart.findIndex(item => item.id === id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += qty;
            // pricePerItem tidak berubah karena sudah harga dasar
        } else {
            cart.push({ id, name, image, quantity: qty, pricePerItem }); // pricePerItem adalah hargaDasar
        }
        saveCartToStorage();
        updateCartIcon();
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `"${name}" (${qty} pcs) ditambahkan!`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        if (cartModal && cartModal.style.display === 'flex') renderCartInModal();
    }
    
    function openCartModal() {
        if (!cartModal) return;
        loadCartFromStorage();
        renderCartInModal();
        cartModal.style.display = 'flex';
        setTimeout(() => cartModal.classList.add('visible'), 10);
    }

    function closeCartModal() {
        if (!cartModal) return;
        cartModal.classList.remove('visible');
        setTimeout(() => {
            cartModal.style.display = 'none';
            if (checkoutFormContainer) checkoutFormContainer.style.display = 'none';
        }, 300);
    }
    
    function renderCartInModal() {
        if (!cartItemsContainer || !cartTotalAmountElement || !clearCartButton || !proceedToCheckoutButton) return;
        cartItemsContainer.innerHTML = ''; 

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Keranjang Anda masih kosong.</p>';
            cartTotalAmountElement.textContent = formatCurrency(0);
            clearCartButton.style.display = 'none';
            proceedToCheckoutButton.style.display = 'none';
            if (checkoutFormContainer) checkoutFormContainer.style.display = 'none';
        } else {
            let totalAmount = 0;
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                const subtotal = item.pricePerItem * item.quantity;
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${formatCurrency(item.pricePerItem)} x ${item.quantity} = ${formatCurrency(subtotal)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-change" data-id="${item.id}" data-change="-1" aria-label="Kurangi kuantitas">-</button>
                        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input-cart" aria-label="Kuantitas produk ${item.name}">
                        <button class="quantity-change" data-id="${item.id}" data-change="1" aria-label="Tambah kuantitas">+</button>
                    </div>
                    <div class="cart-item-remove">
                        <button data-id="${item.id}" aria-label="Hapus ${item.name} dari keranjang">&times;</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                totalAmount += subtotal;
            });
            cartTotalAmountElement.textContent = formatCurrency(totalAmount);
            clearCartButton.style.display = 'block';
            proceedToCheckoutButton.style.display = 'block';
            addCartItemModalActionListeners();
        }
    }

    function addCartItemModalActionListeners() {
        if (!cartItemsContainer) return;
        cartItemsContainer.querySelectorAll('.quantity-change').forEach(button => {
            button.addEventListener('click', function() { updateItemQuantityByChange(this.dataset.id, parseInt(this.dataset.change)); });
        });
        cartItemsContainer.querySelectorAll('.cart-item-remove button').forEach(button => {
            button.addEventListener('click', function() { removeItemFromCart(this.dataset.id); });
        });
        cartItemsContainer.querySelectorAll('.quantity-input-cart').forEach(inputField => {
            inputField.addEventListener('change', function() { setItemQuantityFromInput(this.dataset.id, this.value); });
            inputField.addEventListener('keypress', function(event) { if (event.key && !/[0-9]/.test(event.key)) event.preventDefault(); });
        });
    }

    function updateItemQuantityByChange(itemId, change) {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            const productData = catalogData.find(p => p.id === itemId); // Untuk mendapatkan kuantitasMinimumOrder
            if (!productData) return; // Seharusnya tidak terjadi jika item ada di keranjang
            
            let newQuantity = cart[itemIndex].quantity + change;
            const minOrder = productData.kuantitasMinimumOrder || 1;

            if (newQuantity < minOrder) {
                if (change < 0 && cart[itemIndex].quantity > minOrder) {
                    newQuantity = minOrder;
                    Swal.fire({icon:'info', title:'Info', text:`Kuantitas minimum untuk produk ini adalah ${minOrder}.`});
                } else if (change < 0 && cart[itemIndex].quantity <= minOrder) {
                     Swal.fire({
                        title: 'Hapus Item?',
                        text: `Kuantitas minimum adalah ${minOrder}. Hapus "${cart[itemIndex].name}" dari keranjang?`,
                        icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Ya, hapus!', cancelButtonText: 'Batal'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            cart.splice(itemIndex, 1);
                            saveCartToStorage(); renderCartInModal(); updateCartIcon();
                        }
                    });
                    return; 
                } else {
                     newQuantity = cart[itemIndex].quantity; // Abaikan jika invalid & bukan pengurangan di bawah minimum
                }
            }
            
            if (cart[itemIndex]) { // Cek lagi jika item dihapus oleh confirm
                if (newQuantity >= minOrder) {
                    cart[itemIndex].quantity = newQuantity;
                    // pricePerItem tidak perlu dihitung ulang karena sudah hargaDasar
                } else if (newQuantity <= 0 && cart.includes(cart[itemIndex])) {
                    cart.splice(itemIndex, 1);
                }
            }
            
            saveCartToStorage();
            renderCartInModal();
            updateCartIcon();
        }
    }

    function setItemQuantityFromInput(itemId, newValue) {
        let quantity = parseInt(newValue, 10);
        const itemIndex = cart.findIndex(item => item.id === itemId);

        if (itemIndex > -1) {
            const productData = catalogData.find(p => p.id === itemId);
            if (!productData) return;
            const minOrder = productData.kuantitasMinimumOrder || 1;

            if (isNaN(quantity) || quantity < minOrder) {
                Swal.fire({
                    icon: 'warning', title: 'Kuantitas Tidak Valid',
                    text: `Jumlah minimum untuk produk ini adalah ${minOrder}. Kuantitas akan dikembalikan.`, timer: 3000
                });
                // Biarkan renderCartInModal mengembalikan ke nilai cart yang valid
            } else {
                cart[itemIndex].quantity = quantity;
                // pricePerItem tidak perlu dihitung ulang
            }
            saveCartToStorage();
            renderCartInModal();
            updateCartIcon();
        }
    }

    function removeItemFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        saveCartToStorage();
        renderCartInModal();
        updateCartIcon();
        if (cart.length === 0 && checkoutFormContainer) checkoutFormContainer.style.display = 'none';
    }

    function handleClearCart() {
        if (cart.length > 0) {
            Swal.fire({
                title: 'Kosongkan Keranjang?', text: "Yakin ingin mengosongkan seluruh isi keranjang?", icon: 'warning',
                showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, kosongkan!', cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    cart = []; saveCartToStorage(); renderCartInModal(); updateCartIcon();
                    if (checkoutFormContainer) checkoutFormContainer.style.display = 'none';
                    Swal.fire('Dikosongkan!', 'Keranjang belanja Anda telah dikosongkan.', 'success');
                }
            });
        }
    }

    function showCheckoutForm() {
        if (checkoutFormContainer) {
            if (cart.length === 0) {
                Swal.fire({ icon: 'info', title: 'Keranjang Kosong', text: 'Keranjang Anda kosong. Silakan tambahkan produk.' });
                return;
            }
            checkoutFormContainer.style.display = 'block';
            checkoutFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function handleCheckoutFormSubmit(event) {
        event.preventDefault();
        if (!checkoutForm) return;
        const customerName = checkoutForm.querySelector('#customerName').value.trim();
        const customerWhatsApp = checkoutForm.querySelector('#customerWhatsApp').value.trim();
        const customerAddress = checkoutForm.querySelector('#customerAddress').value.trim();
        const customerNotes = checkoutForm.querySelector('#customerNotes').value.trim();

        if (!customerName || !customerWhatsApp || !customerAddress) {
            Swal.fire({ icon: 'error', title: 'Data Tidak Lengkap', text: 'Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Lengkap.' });
            return;
        }
        if (cart.length === 0) { Swal.fire({ icon: 'error', title: 'Keranjang Kosong', text: 'Keranjang Anda kosong.' }); return; }

        let orderDetailsText = " Halo Sakina Visuals, saya ingin memesan:\n\n";
        let totalOrderPrice = 0;
        cart.forEach(item => {
            const subtotal = item.pricePerItem * item.quantity;
            orderDetailsText += `📦 *${item.name}*\n`;
            orderDetailsText += `   Jumlah: ${item.quantity} pcs\n`;
            orderDetailsText += `   Harga Satuan: ${formatCurrency(item.pricePerItem)}\n`;
            orderDetailsText += `   Subtotal: ${formatCurrency(subtotal)}\n\n`;
            totalOrderPrice += subtotal;
        });
        orderDetailsText += `-------------------------------\n`;
        orderDetailsText += `💰 *TOTAL PESANAN: ${formatCurrency(totalOrderPrice)}*\n`;
        orderDetailsText += `_(Belum termasuk ongkos kirim)_\n`;
        orderDetailsText += `-------------------------------\n\n`;
        orderDetailsText += `📝 *DETAIL PEMESAN:*\n`;
        orderDetailsText += `   Nama: ${customerName}\n`;
        orderDetailsText += `   No. WhatsApp: ${customerWhatsApp.startsWith('0') ? '62' + customerWhatsApp.substring(1) : customerWhatsApp}\n`;
        orderDetailsText += `   Alamat Pengiriman:\n   ${customerAddress.replace(/\n/g, '\n   ')}\n`;
        if (customerNotes) orderDetailsText += `\n   Catatan Tambahan:\n   ${customerNotes.replace(/\n/g, '\n   ')}\n`;
        orderDetailsText += `\nMohon segera diinfo untuk total biaya beserta ongkos kirimnya. Terima kasih! 🙏`;

        const whatsappURL = `https://wa.me/${waBusinessNumber}?text=${encodeURIComponent(orderDetailsText)}`;
        
        Swal.fire({
            title: 'Konfirmasi Pesanan', text: "Anda akan diarahkan ke WhatsApp untuk mengirim detail pesanan. Lanjutkan?",
            icon: 'info', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#aaa',
            confirmButtonText: 'Ya, Lanjutkan!', cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(whatsappURL, '_blank');
                cart = []; saveCartToStorage(); updateCartIcon(); renderCartInModal(); 
                checkoutForm.reset();
                if (checkoutFormContainer) checkoutFormContainer.style.display = 'none';
            }
        });
    }

    initializePage();
});