/**
 * K COFFEE & TEA - CORE JAVASCRIPT ENGINE
 * Handles: CRUD Management, Cart & Order Logic, Live Search & Filtering,
 * Input Validation, LocalStorage Persistence, QR Payment, Receipt Generation, Audio Effects.
 */

// ==========================================================================
// 1. DATA INITIALIZATION & CONSTANTS
// ==========================================================================

const STORAGE_KEYS = {
    ITEMS: 'K_COFFEE_ITEMS_V4',
    CART: 'K_COFFEE_CART_V4',
    ORDERS: 'K_COFFEE_ORDERS_V4',
    THEME: 'K_COFFEE_THEME_V3'
};

// Menu Items seeded with real images copied from Drive D:
const DEFAULT_MENU_ITEMS = [
    {
        id: 1,
        name: "CÃ  PhÃª Äen ÄÃ¡ K Coffee",
        category: "ca-phe",
        categoryName: "CÃ  phÃª",
        price: 25000,
        image: "images/caphedenda.jpg",
        description: "100% háº¡t cÃ  phÃª Robusta rang má»™c pha phin truyá»n thá»‘ng, Ä‘áº¯ng Ä‘áº­m Ä‘Ã  Ä‘Ãºng cháº¥t cÃ  phÃª Viá»‡t.",
        tag: "hot",
        isAvailable: true,
        rating: 5.0,
        soldCount: 420
    },
    {
        id: 2,
        name: "CÃ  PhÃª NÃ¢u ÄÃ¡ (Sá»¯a ÄÃ¡)",
        category: "ca-phe",
        categoryName: "CÃ  phÃª",
        price: 28000,
        image: "images/caphenauda.jpg",
        description: "Cá»‘t cÃ  phÃª phin Ä‘áº­m Ä‘áº·c káº¿t há»£p cÃ¹ng sá»¯a Ä‘áº·c bÃ©o ngá»t thÆ¡m ngon, khá»Ÿi Ä‘áº§u ngÃ y má»›i tá»‰nh tÃ¡o.",
        tag: "bestseller",
        isAvailable: true,
        rating: 4.9,
        soldCount: 560
    },
    {
        id: 3,
        name: "Milo Dáº§m TrÃ¢n ChÃ¢u ÄÆ°á»ng Äen",
        category: "da-xay",
        categoryName: "ÄÃ¡ Xay & Milo",
        price: 35000,
        image: "images/milodamchantrauduongden.jpg",
        description: "Bá»™t Milo nguyÃªn cháº¥t dáº§m cÃ¹ng sá»¯a Ä‘áº·c, Ä‘Ã¡ bÃ o mÃ¡t láº¡nh, topping trÃ¢n chÃ¢u Ä‘Æ°á»ng Ä‘en dáº»o dai bÃ¹i bÃ©o.",
        tag: "hot",
        isAvailable: true,
        rating: 4.9,
        soldCount: 385
    },
    {
        id: 4,
        name: "TrÃ  Sá»¯a TrÃ¢n ChÃ¢u ÄÆ°á»ng Äen",
        category: "tra",
        categoryName: "TrÃ  & TrÃ  Sá»¯a",
        price: 35000,
        image: "images/trasuachanchauduongden.jpg",
        description: "TrÃ  sá»¯a truyá»n thá»‘ng bÃ©o ngáº­y quyá»‡n cÃ¹ng sá»‘t Ä‘Æ°á»ng nÃ¢u thÆ¡m lá»«ng vÃ  trÃ¢n chÃ¢u Ä‘Æ°á»ng Ä‘en dáº»o ngá»t.",
        tag: "bestseller",
        isAvailable: true,
        rating: 5.0,
        soldCount: 620
    },
    {
        id: 5,
        name: "TrÃ  Sá»¯a TrÃ¢n ChÃ¢u HoÃ ng Kim",
        category: "tra",
        categoryName: "TrÃ  & TrÃ  Sá»¯a",
        price: 32000,
        image: "images/trasuachantrauhoangkim.jpg",
        description: "TrÃ  sá»¯a vá»‹ Ä‘áº­m Ä‘Ã  thanh tao, káº¿t há»£p cÃ¹ng trÃ¢n chÃ¢u hoÃ ng kim mÃ u vÃ ng Ã³ng Ã¡nh dai giÃ²n sáº§n sáº­t.",
        tag: "hot",
        isAvailable: true,
        rating: 4.8,
        soldCount: 340
    },
    {
        id: 6,
        name: "TrÃ  Sá»¯a TrÃ¢n ChÃ¢u Báº¡c HÃ ",
        category: "tra",
        categoryName: "TrÃ  & TrÃ  Sá»¯a",
        price: 32000,
        image: "images/trasuachantraubacha.jpg",
        description: "Sá»± tÆ°Æ¡i mÃ¡t sáº£ng khoÃ¡i cá»§a siro báº¡c hÃ  xanh ngá»c hÃ²a quyá»‡n trong tá»«ng ngá»¥m trÃ  sá»¯a thÆ¡m bÃ©o.",
        tag: "new",
        isAvailable: true,
        rating: 4.7,
        soldCount: 215
    },
    {
        id: 7,
        name: "TrÃ  XoÃ i TrÃ¢n ChÃ¢u HoÃ ng Kim",
        category: "tra",
        categoryName: "TrÃ  & TrÃ  Sá»¯a",
        price: 38000,
        image: "images/traxoaichantrauhoangkim.jpg",
        description: "NÆ°á»›c cá»‘t trÃ  hoa lÃ i thanh nháº¹ káº¿t há»£p má»©t xoÃ i nhiá»‡t Ä‘á»›i chua ngá»t vÃ  trÃ¢n chÃ¢u hoÃ ng kim thÆ¡m ngon.",
        tag: "new",
        isAvailable: true,
        rating: 4.9,
        soldCount: 280
    },
    {
        id: 8,
        name: "CÃ  PhÃª Muá»‘i K Coffee",
        category: "ca-phe",
        categoryName: "CÃ  phÃª",
        price: 32000,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
        description: "Lá»›p kem muá»‘i bÃ©o máº·n sÃ¡nh má»‹n hÃ²a quyá»‡n hoÃ n háº£o cÃ¹ng cÃ  phÃª phin nguyÃªn cháº¥t K Coffee.",
        tag: "hot",
        isAvailable: true,
        rating: 4.9,
        soldCount: 310
    },
    {
        id: 9,
        name: "Báº¡c Xá»‰u Sá»¯a Dá»«a Ba Táº§ng",
        category: "ca-phe",
        categoryName: "CÃ  phÃª",
        price: 35000,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80",
        description: "Cá»‘t dá»«a Báº¿n Tre bÃ©o bÃ¹i, sá»¯a Ä‘áº·c ngá»t dá»‹u vÃ  lá»›p cÃ  phÃª Robusta rang má»™c thÆ¡m ná»“ng nÃ n.",
        tag: "",
        isAvailable: true,
        rating: 4.8,
        soldCount: 290
    },
    {
        id: 10,
        name: "Chocolate Frappuccino ÄÃ¡ Xay",
        category: "da-xay",
        categoryName: "ÄÃ¡ Xay & Milo",
        price: 45000,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
        description: "Sá»‘t sÃ´-cÃ´-la xay cÃ¹ng Ä‘Ã¡ tuyáº¿t mÃ¡t láº¡nh, phá»§ bÃ´ng kem tÆ°Æ¡i vÃ  chip socola vá»¥n giÃ²n rá»¥m.",
        tag: "",
        isAvailable: true,
        rating: 4.8,
        soldCount: 190
    },
    {
        id: 11,
        name: "BÃ¡nh Tiramisu Cacao Cá»• Äiá»ƒn",
        category: "banh",
        categoryName: "BÃ¡nh Ngá»t",
        price: 35000,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
        description: "Tá»«ng lá»›p bÃ¡nh Savoiardi tháº¥m Ä‘Æ°á»£m hÆ°Æ¡ng cÃ  phÃª K Coffee vÃ  kem Mascarpone bá»“ng bá»nh phá»§ bá»™t cacao.",
        tag: "bestseller",
        isAvailable: true,
        rating: 5.0,
        soldCount: 360
    },
    {
        id: 12,
        name: "BÃ¡nh Croissant BÆ¡ PhÃ¡p NÆ°á»›ng GiÃ²n",
        category: "banh",
        categoryName: "BÃ¡nh Ngá»t",
        price: 30000,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
        description: "BÃ¡nh sá»«ng bÃ² ngÃ n lá»›p thÆ¡m lá»«ng bÆ¡ PhÃ¡p cao cáº¥p, vá» ngoÃ i vÃ ng Æ°Æ¡m giÃ²n rá»¥m thÆ¡m ngon.",
        tag: "",
        isAvailable: true,
        rating: 4.7,
        soldCount: 140
    }
];

// Active State
let currentFilterCategory = 'all';
let currentSortBy = 'default';
let currentPriceFilter = 'all';
let currentSearchQuery = '';
let activeCustomizingItem = null;
let appliedVoucher = null;

// ==========================================================================
// 2. STORAGE CONTROLLERS
// ==========================================================================

function getItemsFromStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.ITEMS);
        if (data) {
            return JSON.parse(data);
        }
    } catch (e) {
        console.error("Lá»—i Ä‘á»c Storage mÃ³n nÆ°á»›c:", e);
    }
    // Seed default if empty
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(DEFAULT_MENU_ITEMS));
    return DEFAULT_MENU_ITEMS;
}

function saveItemsToStorage(items) {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
}

function getCartFromStorage() {
    try {
        const cart = localStorage.getItem(STORAGE_KEYS.CART);
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        return [];
    }
}

function saveCartToStorage(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartBadges();
}

function getOrdersFromStorage() {
    try {
        const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return orders ? JSON.parse(orders) : [];
    } catch (e) {
        return [];
    }
}

function saveOrdersToStorage(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

// ==========================================================================
// 3. UI RENDERING & MENU DISPLAY
// ==========================================================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'Ä‘';
}

function removeVietnameseTones(str) {
    if (!str) return '';
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/Ä‘/g, 'd').replace(/Ä/g, 'D')
        .toLowerCase()
        .trim();
}

function renderMenu() {
    const container = document.getElementById('menuGridContainer');
    const resultCountEl = document.getElementById('filterResultCount');
    if (!container) return;

    let items = getItemsFromStorage();

    // 1. Search Query
    if (currentSearchQuery) {
        const queryNorm = removeVietnameseTones(currentSearchQuery);
        items = items.filter(item => {
            const nameNorm = removeVietnameseTones(item.name);
            const descNorm = removeVietnameseTones(item.description);
            const catNorm = removeVietnameseTones(item.categoryName);
            return nameNorm.includes(queryNorm) || descNorm.includes(queryNorm) || catNorm.includes(queryNorm);
        });
    }

    // 2. Category Filter
    if (currentFilterCategory !== 'all') {
        items = items.filter(item => item.category === currentFilterCategory);
    }

    // 3. Price Filter
    if (currentPriceFilter === 'under35') {
        items = items.filter(item => item.price < 35000);
    } else if (currentPriceFilter === '35to50') {
        items = items.filter(item => item.price >= 35000 && item.price <= 50000);
    } else if (currentPriceFilter === 'over50') {
        items = items.filter(item => item.price > 50000);
    }

    // 4. Sort
    if (currentSortBy === 'price-asc') {
        items.sort((a, b) => a.price - b.price);
    } else if (currentSortBy === 'price-desc') {
        items.sort((a, b) => b.price - a.price);
    } else if (currentSortBy === 'name-asc') {
        items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSortBy === 'bestseller') {
        items.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
    }

    // Update result count text
    if (resultCountEl) {
        resultCountEl.textContent = `Hiá»ƒn thá»‹ ${items.length} mÃ³n K Coffee`;
    }

    // Empty state
    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="empty-state py-5 text-center">
                    <div class="empty-state-icon">
                        <i class="fa-solid fa-mug-hot"></i>
                    </div>
                    <h4 class="fw-bold mb-2">KhÃ´ng tÃ¬m tháº¥y mÃ³n phÃ¹ há»£p</h4>
                    <p class="text-muted mb-4">HÃ£y thá»­ tÃ¬m vá»›i tá»« khÃ³a khÃ¡c hoáº·c xÃ³a bá»™ lá»c Ä‘á»ƒ xem toÃ n bá»™ thá»±c Ä‘Æ¡n K Coffee nhÃ©!</p>
                    <button class="btn btn-gold" onclick="resetAllFilters()">
                        <i class="fa-solid fa-rotate-left me-1"></i> Xem láº¡i táº¥t cáº£ mÃ³n K Coffee
                    </button>
                </div>
            </div>
        `;
        return;
    }

    // Render Cards: Clicking anywhere or "Äáº·t Ngay" opens Customize Modal
    container.innerHTML = items.map(item => {
        let tagBadge = '';
        if (item.tag === 'hot') {
            tagBadge = `<span class="badge-tag badge-tag-hot"><i class="fa-solid fa-fire me-1"></i>BÃ¡n Cháº¡y</span>`;
        } else if (item.tag === 'new') {
            tagBadge = `<span class="badge-tag badge-tag-new"><i class="fa-solid fa-sparkles me-1"></i>Má»›i Ra Máº¯t</span>`;
        } else if (item.tag === 'bestseller') {
            tagBadge = `<span class="badge-tag badge-tag-hot"><i class="fa-solid fa-crown me-1"></i>Äáº·c Sáº£n K Coffee</span>`;
        }

        const outOfStockOverlay = !item.isAvailable 
            ? `<div class="out-of-stock-overlay"><i class="fa-solid fa-ban me-2"></i>Táº¡m Háº¿t HÃ ng</div>` 
            : '';

        const actionButtonsHtml = item.isAvailable 
            ? `<button class="btn btn-sm btn-gold rounded-pill px-3 fw-bold" onclick="openCustomizeModal(${item.id})" title="TÃ¹y chá»‰nh chi tiáº¿t & Äáº·t mÃ³n">
                 <i class="fa-solid fa-bolt me-1"></i>Äáº·t Ngay
               </button>`
            : `<button class="btn btn-sm btn-secondary disabled rounded-pill px-3" disabled title="Táº¡m háº¿t mÃ³n">
                 <i class="fa-solid fa-lock me-1"></i>Táº¡m Háº¿t
               </button>`;

        return `
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                <div class="product-card">
                    ${outOfStockOverlay}
                    <div class="product-card-img-wrapper" onclick="openCustomizeModal(${item.id})" style="cursor: pointer;">
                        <img src="${item.image}" alt="${escapeHtml(item.name)}" class="product-card-img" loading="lazy" onerror="this.src='images/caphedenda.jpg'">
                        <div class="product-badge-group">
                            <span class="badge-tag badge-tag-category">${escapeHtml(item.categoryName || 'Äá»“ uá»‘ng')}</span>
                            ${tagBadge}
                        </div>
                    </div>
                    <div class="product-card-body">
                        <div class="d-flex align-items-center justify-content-between mb-1">
                            <div class="small text-warning">
                                <i class="fa-solid fa-star"></i>
                                <span class="fw-bold ms-1 text-dark">${item.rating || 4.9}</span>
                            </div>
                            <span class="small text-muted"><i class="fa-solid fa-fire-burner me-1 text-secondary"></i>ÄÃ£ bÃ¡n ${item.soldCount || 100}+</span>
                        </div>
                        <h3 class="product-title" onclick="openCustomizeModal(${item.id})">${escapeHtml(item.name)}</h3>
                        <p class="product-desc">${escapeHtml(item.description)}</p>
                        <div class="product-footer flex-wrap gap-2">
                            <div class="product-price">
                                ${formatCurrency(item.price)}
                            </div>
                            ${actionButtonsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================================
// 4. MODAL TÃ™Y CHá»ˆNH CHI TIáº¾T (SIZE, ÄÃ, ÄÆ¯á»œNG, TOPPING) & Äáº¶T HÃ€NG
// ==========================================================================

function openCustomizeModal(itemId) {
    const items = getItemsFromStorage();
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (!item.isAvailable) {
        showToast('MÃ³n nÃ y hiá»‡n Ä‘ang táº¡m háº¿t hÃ ng!', 'warning', 'fa-ban');
        return;
    }

    activeCustomizingItem = item;

    const imgEl = document.getElementById('modalItemImage');
    imgEl.src = item.image;
    imgEl.onerror = () => { imgEl.src = 'images/caphedenda.jpg'; };

    document.getElementById('modalItemName').textContent = item.name;
    document.getElementById('modalItemCategory').textContent = item.categoryName;
    document.getElementById('modalItemDesc').textContent = item.description;
    document.getElementById('modalItemPriceBase').textContent = formatCurrency(item.price);

    // Reset Form Defaults
    document.querySelector('input[name="itemSize"][value="M"]').checked = true;
    const sugarSelect = document.querySelector('select[name="itemSugar"]');
    if (sugarSelect) sugarSelect.value = '100%';
    const iceSelect = document.querySelector('select[name="itemIce"]');
    if (iceSelect) iceSelect.value = '100%';
    document.querySelectorAll('.topping-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('modalItemQty').value = 1;
    document.getElementById('modalItemNote').value = '';

    updateModalCalculatedPrice();

    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('customizeItemModal'));
    modal.show();
}

function updateModalCalculatedPrice() {
    if (!activeCustomizingItem) return;

    let unitPrice = activeCustomizingItem.price;

    // Size calculation
    const selectedSize = document.querySelector('input[name="itemSize"]:checked')?.value || 'M';
    if (selectedSize === 'L') unitPrice += 10000;
    else if (selectedSize === 'S') unitPrice -= 4000;

    // Toppings calculation
    const toppings = document.querySelectorAll('.topping-checkbox:checked');
    toppings.forEach(t => {
        unitPrice += parseInt(t.getAttribute('data-price') || 0);
    });

    const qty = parseInt(document.getElementById('modalItemQty').value) || 1;
    const totalPrice = unitPrice * qty;

    const totalEl = document.getElementById('modalItemTotalPrice');
    if (totalEl) {
        totalEl.textContent = formatCurrency(totalPrice);
    }
}

function changeModalQty(delta) {
    const input = document.getElementById('modalItemQty');
    let val = parseInt(input.value) || 1;
    val += delta;
    if (val < 1) val = 1;
    if (val > 99) val = 99;
    input.value = val;
    updateModalCalculatedPrice();
}

// Add to Cart or Order Directly
function confirmAddToCart(orderImmediately = false) {
    if (!activeCustomizingItem) return;

    const selectedSize = document.querySelector('input[name="itemSize"]:checked')?.value || 'M';
    const selectedSugar = document.querySelector('select[name="itemSugar"]')?.value || '100%';
    const selectedIce = document.querySelector('select[name="itemIce"]')?.value || '100%';
    const note = document.getElementById('modalItemNote').value.trim();
    const qty = parseInt(document.getElementById('modalItemQty').value) || 1;

    let toppings = [];
    let toppingCost = 0;
    document.querySelectorAll('.topping-checkbox:checked').forEach(cb => {
        toppings.push(cb.value);
        toppingCost += parseInt(cb.getAttribute('data-price') || 0);
    });

    let unitPrice = activeCustomizingItem.price;
    if (selectedSize === 'L') unitPrice += 10000;
    if (selectedSize === 'S') unitPrice -= 4000;
    unitPrice += toppingCost;

    const cart = getCartFromStorage();

    // Check if duplicate customization exists
    const toppingKey = toppings.sort().join(',');
    const existingIndex = cart.findIndex(c => 
        c.itemId === activeCustomizingItem.id &&
        c.size === selectedSize &&
        c.sugar === selectedSugar &&
        c.ice === selectedIce &&
        c.toppingKey === toppingKey
    );

    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({
            cartId: Date.now() + Math.random().toString(36).substring(2, 5),
            itemId: activeCustomizingItem.id,
            name: activeCustomizingItem.name,
            image: activeCustomizingItem.image,
            basePrice: activeCustomizingItem.price,
            unitPrice: unitPrice,
            qty: qty,
            size: selectedSize,
            sugar: selectedSugar,
            ice: selectedIce,
            toppings: toppings,
            toppingKey: toppingKey,
            note: note
        });
    }

    saveCartToStorage(cart);
    playDingSound();

    // Close modal
    const modalEl = document.getElementById('customizeItemModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    if (orderImmediately) {
        showToast(`Äang má»Ÿ mÃ n hÃ¬nh xÃ¡c nháº­n thanh toÃ¡n...`, 'success', 'fa-bolt');
        setTimeout(() => {
            openCheckoutModal();
        }, 250);
    } else {
        showToast(`ÄÃ£ thÃªm "${activeCustomizingItem.name}" vÃ o giá» K Coffee!`, 'success', 'fa-cart-plus');
    }
}

// ==========================================================================
// 5. CART DRAWER & FLOATING BAR LOGIC
// ==========================================================================

function openCartDrawer() {
    renderCartDrawer();
    const drawerEl = document.getElementById('cartOffcanvas');
    if (drawerEl) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
        bsOffcanvas.show();
    }
}

function updateCartBadges() {
    const cart = getCartFromStorage();
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);

    const b1 = document.getElementById('cartCountBadge');
    const b2 = document.getElementById('cartCountBadgeMobile');
    if (b1) b1.textContent = totalCount;
    if (b2) b2.textContent = totalCount;

    // Update Floating Cart Bar
    const floatingBar = document.getElementById('floatingCartBar');
    const floatCount = document.getElementById('floatingCartCount');
    const floatTotal = document.getElementById('floatingCartTotal');

    if (floatingBar) {
        if (totalCount > 0) {
            floatingBar.style.display = 'flex';
            if (floatCount) floatCount.textContent = `${totalCount} mÃ³n`;
            if (floatTotal) floatTotal.textContent = formatCurrency(subtotal);
        } else {
            floatingBar.style.display = 'none';
        }
    }
}

function renderCartDrawer() {
    const container = document.getElementById('cartDrawerItemsContainer');
    const footerContainer = document.getElementById('cartDrawerFooter');
    if (!container) return;

    const cart = getCartFromStorage();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state py-5 text-center">
                <i class="fa-solid fa-basket-shopping empty-state-icon"></i>
                <h5 class="fw-bold mt-2">Giá» hÃ ng K Coffee Ä‘ang trá»‘ng</h5>
                <p class="text-muted small">KhÃ¡m phÃ¡ ngay thá»±c Ä‘Æ¡n ngáº­p trÃ n mÃ³n thÆ¡m ngon nhÃ©!</p>
                <button class="btn btn-outline-coffee btn-sm mt-2" data-bs-dismiss="offcanvas">
                    <i class="fa-solid fa-arrow-left me-1"></i> Chá»n mÃ³n K Coffee ngay
                </button>
            </div>
        `;
        if (footerContainer) footerContainer.style.display = 'none';
        return;
    }

    if (footerContainer) footerContainer.style.display = 'block';

    let subtotal = 0;

    container.innerHTML = cart.map(item => {
        const itemTotal = item.unitPrice * item.qty;
        subtotal += itemTotal;

        const toppingsText = item.toppings && item.toppings.length > 0
            ? `<div class="text-muted small">+ Topping: ${item.toppings.join(', ')}</div>`
            : '';

        return `
            <div class="cart-drawer-item">
                <img src="${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-thumb" onerror="this.src='images/caphedenda.jpg'">
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="fw-bold">${escapeHtml(item.name)}</div>
                        <button class="btn btn-link text-danger p-0 ms-2" onclick="removeCartItem('${item.cartId}')" title="XÃ³a mÃ³n">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <div class="small text-muted">
                        Size ${item.size} â€¢ ${item.sugar} Ä‘Æ°á»ng â€¢ ${item.ice} Ä‘Ã¡
                    </div>
                    ${toppingsText}
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <div class="d-flex align-items-center gap-2">
                            <button class="cart-qty-btn" onclick="updateCartQty('${item.cartId}', -1)">-</button>
                            <span class="fw-bold px-1">${item.qty}</span>
                            <button class="cart-qty-btn" onclick="updateCartQty('${item.cartId}', 1)">+</button>
                        </div>
                        <div class="cart-price-line">
                            ${formatCurrency(itemTotal)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Voucher logic
    let discount = 0;
    if (appliedVoucher) {
        if (appliedVoucher.type === 'percent') {
            discount = Math.round(subtotal * (appliedVoucher.value / 100));
        } else if (appliedVoucher.type === 'fixed') {
            discount = appliedVoucher.value;
        }
    }
    if (discount > subtotal) discount = subtotal;

    const shippingFee = subtotal > 150000 || (appliedVoucher && appliedVoucher.code === 'FREESHIP') ? 0 : 15000;
    const finalTotal = subtotal - discount + shippingFee;

    document.getElementById('cartDrawerSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('cartDrawerDiscount').textContent = discount > 0 ? '-' + formatCurrency(discount) : '0Ä‘';
    document.getElementById('cartDrawerShipping').textContent = shippingFee === 0 ? 'Miá»…n phÃ­' : formatCurrency(shippingFee);
    document.getElementById('cartDrawerTotal').textContent = formatCurrency(finalTotal);
}

function updateCartQty(cartId, delta) {
    const cart = getCartFromStorage();
    const item = cart.find(c => c.cartId === cartId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeCartItem(cartId);
        return;
    }
    saveCartToStorage(cart);
    renderCartDrawer();
}

function removeCartItem(cartId) {
    let cart = getCartFromStorage();
    cart = cart.filter(c => c.cartId !== cartId);
    saveCartToStorage(cart);
    renderCartDrawer();
    showToast('ÄÃ£ xÃ³a mÃ³n khá»i giá» hÃ ng K Coffee', 'info', 'fa-trash');
}

function applyVoucherCode() {
    const input = document.getElementById('voucherInput');
    const code = input.value.trim().toUpperCase();

    if (!code) {
        showToast('Vui lÃ²ng nháº­p mÃ£ Æ°u Ä‘Ã£i', 'warning', 'fa-circle-exclamation');
        return;
    }

    if (code === 'COFFEE10') {
        appliedVoucher = { code: 'COFFEE10', type: 'percent', value: 10, label: 'Giáº£m 10% tá»•ng Ä‘Æ¡n' };
        showToast('Ãp dá»¥ng mÃ£ COFFEE10 giáº£m 10% thÃ nh cÃ´ng!', 'success', 'fa-tags');
    } else if (code === 'BANME') {
        appliedVoucher = { code: 'BANME', type: 'fixed', value: 20000, label: 'Giáº£m 20.000Ä‘' };
        showToast('Ãp dá»¥ng mÃ£ BANME giáº£m 20.000Ä‘ thÃ nh cÃ´ng!', 'success', 'fa-tags');
    } else if (code === 'FREESHIP') {
        appliedVoucher = { code: 'FREESHIP', type: 'fixed', value: 0, label: 'Miá»…n phÃ­ váº­n chuyá»ƒn' };
        showToast('Ãp dá»¥ng mÃ£ FREESHIP miá»…n phÃ­ giao hÃ ng!', 'success', 'fa-truck-fast');
    } else {
        showToast('MÃ£ giáº£m giÃ¡ khÃ´ng há»£p lá»‡ hoáº·c Ä‘Ã£ háº¿t háº¡n!', 'danger', 'fa-triangle-exclamation');
        return;
    }

    renderCartDrawer();
}

// ==========================================================================
// 6. THá»¦ Tá»¤C Äáº¶T HÃ€NG & MÃƒ QR THANH TOÃN
// ==========================================================================

function togglePaymentQR(show) {
    const box = document.getElementById('qrPaymentBox');
    if (box) {
        box.style.display = show ? 'block' : 'none';
    }
}

function openCheckoutModal() {
    const cart = getCartFromStorage();
    if (cart.length === 0) {
        showToast('Giá» hÃ ng Ä‘ang trá»‘ng, vui lÃ²ng chá»n mÃ³n trÆ°á»›c!', 'warning', 'fa-bag-shopping');
        return;
    }

    // Close offcanvas if opened
    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (offcanvasEl) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvasInstance) offcanvasInstance.hide();
    }

    // Populate checkout review
    let subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    let discount = 0;
    if (appliedVoucher) {
        if (appliedVoucher.type === 'percent') discount = Math.round(subtotal * (appliedVoucher.value / 100));
        else if (appliedVoucher.type === 'fixed') discount = appliedVoucher.value;
    }
    if (discount > subtotal) discount = subtotal;
    const shippingFee = subtotal > 150000 || (appliedVoucher && appliedVoucher.code === 'FREESHIP') ? 0 : 15000;
    const total = subtotal - discount + shippingFee;

    document.getElementById('checkoutSummaryTotal').textContent = formatCurrency(total);
    document.getElementById('checkoutItemCountText').textContent = `${cart.reduce((s, i) => s + i.qty, 0)} mÃ³n Ä‘á»“ uá»‘ng`;

    // Update QR Amount
    const qrAmount = document.getElementById('qrModalAmount');
    if (qrAmount) qrAmount.textContent = formatCurrency(total);

    // Check payment selection state
    const qrRadio = document.querySelector('input[name="paymentMethod"][value="qr"]');
    togglePaymentQR(qrRadio && qrRadio.checked);

    const checkoutModalEl = document.getElementById('checkoutOrderModal');
    // Reset form khi má»Ÿ láº¡i
    const form = checkoutModalEl.querySelector('form');
    if (form) form.reset();
    togglePaymentQR(false);
    const checkoutModal = bootstrap.Modal.getOrCreateInstance(checkoutModalEl);
    checkoutModal.show();
}

function submitCustomerOrder(event) {
    event.preventDefault();

    const name = document.getElementById('orderCustomerName').value.trim();
    const phone = document.getElementById('orderCustomerPhone').value.trim();
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'delivery';
    const address = document.getElementById('orderCustomerAddress').value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cash';
    const note = document.getElementById('orderCustomerNote').value.trim();

    // Validation
    if (!name || name.length < 2) {
        showToast('Vui lÃ²ng nháº­p há» tÃªn há»£p lá»‡ (tá»‘i thiá»ƒu 2 kÃ½ tá»±)!', 'warning', 'fa-circle-exclamation');
        document.getElementById('orderCustomerName').focus();
        return;
    }

    const cleanPhone = phone.replace(/[\s\-\.]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 12) {
        showToast('Sá»‘ Ä‘iá»‡n thoáº¡i khÃ´ng há»£p lá»‡ (tá»« 9 Ä‘áº¿n 11 sá»‘)!', 'warning', 'fa-phone-slash');
        document.getElementById('orderCustomerPhone').focus();
        return;
    }

    if (orderType === 'delivery' && (!address || address.length < 4)) {
        showToast('Vui lÃ²ng nháº­p Ä‘á»‹a chá»‰ giao hÃ ng cá»¥ thá»ƒ!', 'warning', 'fa-location-dot');
        document.getElementById('orderCustomerAddress').focus();
        return;
    }

    const cart = getCartFromStorage();
    if (cart.length === 0) return;

    let subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    let discount = 0;
    if (appliedVoucher) {
        if (appliedVoucher.type === 'percent') discount = Math.round(subtotal * (appliedVoucher.value / 100));
        else if (appliedVoucher.type === 'fixed') discount = appliedVoucher.value;
    }
    if (discount > subtotal) discount = subtotal;
    const shippingFee = (orderType === 'dine-in' || subtotal > 150000 || (appliedVoucher && appliedVoucher.code === 'FREESHIP')) ? 0 : 15000;
    const total = subtotal - discount + shippingFee;

    const orderId = 'KC-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
        orderId: orderId,
        date: new Date().toLocaleString('vi-VN'),
        timestamp: Date.now(),
        customer: {
            name: name,
            phone: phone,
            type: orderType,
            address: address || 'Táº¡i quÃ¡n (BÃ n)',
            note: note
        },
        paymentMethod: paymentMethod,
        items: [...cart],
        subtotal: subtotal,
        discount: discount,
        shippingFee: shippingFee,
        total: total,
        status: 'Chá» pha cháº¿'
    };

    // Save to storage
    const orders = getOrdersFromStorage();
    orders.unshift(newOrder);
    saveOrdersToStorage(orders);

    // Update items sold count
    const menuItems = getItemsFromStorage();
    cart.forEach(cartItem => {
        const found = menuItems.find(m => m.id === cartItem.itemId);
        if (found) {
            found.soldCount = (found.soldCount || 0) + cartItem.qty;
        }
    });
    saveItemsToStorage(menuItems);

    // Clear cart & applied voucher
    saveCartToStorage([]);
    appliedVoucher = null;

    // Close checkout modal
    const checkoutModalEl = document.getElementById('checkoutOrderModal');
    const checkoutInstance = bootstrap.Modal.getInstance(checkoutModalEl);
    if (checkoutInstance) checkoutInstance.hide();

    // Trigger Success Audio & Toast
    playDingSound();
    showToast(`Äáº·t mÃ³n thÃ nh cÃ´ng táº¡i K Coffee! MÃ£ Ä‘Æ¡n: ${orderId}`, 'success', 'fa-circle-check');

    // Show thermal receipt
    displayPrintableReceipt(newOrder);

    // Refresh views
    renderMenu();
    renderAdminView();
}

function displayPrintableReceipt(order) {
    const container = document.getElementById('receiptContentArea');
    if (!container) return;

    const itemsHtml = order.items.map(item => `
        <tr>
            <td style="text-align: left;">
                <strong>${escapeHtml(item.name)}</strong> (Size ${item.size})
                ${item.toppings && item.toppings.length ? `<br><small>Topping: ${item.toppings.join(', ')}</small>` : ''}
            </td>
            <td style="text-align: center;">${item.qty}</td>
            <td style="text-align: right;">${formatCurrency(item.unitPrice * item.qty)}</td>
        </tr>
    `).join('');

    const qrReceiptSection = order.paymentMethod === 'qr' ? `
        <div class="text-center my-2 p-2 border border-dashed rounded bg-light">
            <div class="fw-bold small text-primary mb-1"><i class="fa-solid fa-qrcode me-1"></i>ÄÃ£ thanh toÃ¡n qua MÃ£ QR NgÃ¢n HÃ ng</div>
            <img src="images/qr_code.webp" alt="QR Code" style="max-width: 110px; height: auto;" onerror="this.src='images/qr_code.jpg'">
        </div>
    ` : '';

    container.innerHTML = `
        <div class="thermal-receipt">
            <div class="receipt-header">
                <div class="receipt-title">K COFFEE & TEA</div>
                <div>128 ÄÆ°á»ng Hoa Há»“ng, PhÃº Nhuáº­n, TP.HCM</div>
                <div>Hotline: 1900 8888 â€¢ kcoffee.vn</div>
                <div class="mt-2 fw-bold">--- HÃ“A ÄÆ N BÃN HÃ€NG ---</div>
            </div>
            <div class="small mb-2">
                <div><strong>MÃ£ Ä‘Æ¡n hÃ ng:</strong> ${order.orderId}</div>
                <div><strong>Thá»i gian:</strong> ${order.date}</div>
                <div><strong>KhÃ¡ch hÃ ng:</strong> ${escapeHtml(order.customer.name)} (${order.customer.phone})</div>
                <div><strong>HÃ¬nh thá»©c:</strong> ${order.customer.type === 'dine-in' ? 'Uá»‘ng táº¡i quÃ¡n' : 'Giao hÃ ng táº­n nÆ¡i'}</div>
                <div><strong>Äá»‹a chá»‰/BÃ n:</strong> ${escapeHtml(order.customer.address)}</div>
                <div><strong>Thanh toÃ¡n:</strong> ${order.paymentMethod === 'cash' ? 'Tiá»n máº·t khi nháº­n' : 'Chuyá»ƒn khoáº£n MÃ£ QR'}</div>
            </div>
            <table>
                <thead>
                    <tr style="border-bottom: 1px dashed #333;">
                        <th style="text-align: left;">MÃ³n</th>
                        <th style="text-align: center;">SL</th>
                        <th style="text-align: right;">T.Tiá»n</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            <div class="receipt-total">
                <div class="d-flex justify-content-between">
                    <span>Táº¡m tÃ­nh:</span>
                    <span>${formatCurrency(order.subtotal)}</span>
                </div>
                ${order.discount > 0 ? `
                <div class="d-flex justify-content-between text-danger">
                    <span>Giáº£m giÃ¡:</span>
                    <span>-${formatCurrency(order.discount)}</span>
                </div>` : ''}
                <div class="d-flex justify-content-between">
                    <span>PhÃ­ giao hÃ ng:</span>
                    <span>${order.shippingFee === 0 ? '0Ä‘' : formatCurrency(order.shippingFee)}</span>
                </div>
                <div class="d-flex justify-content-between fs-5 mt-1 pt-1" style="border-top: 1px solid #333;">
                    <span>Tá»”NG Cá»˜NG:</span>
                    <span>${formatCurrency(order.total)}</span>
                </div>
            </div>
            ${qrReceiptSection}
            <div class="text-center small mt-3">
                <p class="mb-1">Cáº£m Æ¡n quÃ½ khÃ¡ch Ä‘Ã£ tin tÆ°á»Ÿng & lá»±a chá»n K Coffee!</p>
                <p class="mb-0 text-muted">Wifi: KCoffeePass2026</p>
            </div>
        </div>
    `;

    const receiptModal = new bootstrap.Modal(document.getElementById('printableReceiptModal'));
    receiptModal.show();
}

function printCurrentReceipt() {
    window.print();
}

// ==========================================================================
// 7. QUáº¢N LÃ CRUD MÃ“N NÆ¯á»šC (ADMIN MANAGEMENT)
// ==========================================================================

function renderAdminView() {
    renderAdminStats();
    renderAdminItemsTable();
    renderAdminOrdersTable();
}

function renderAdminStats() {
    const items = getItemsFromStorage();
    const orders = getOrdersFromStorage();

    const totalItemsEl = document.getElementById('adminStatTotalItems');
    const totalOrdersEl = document.getElementById('adminStatTotalOrders');
    const totalRevenueEl = document.getElementById('adminStatTotalRevenue');
    const topSellerEl = document.getElementById('adminStatTopSeller');

    if (totalItemsEl) totalItemsEl.textContent = items.length;
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;

    const totalRev = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
    if (totalRevenueEl) totalRevenueEl.textContent = formatCurrency(totalRev);

    // Top seller
    if (items.length > 0) {
        const sorted = [...items].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
        if (topSellerEl) topSellerEl.textContent = sorted[0].name;
    }
}

function renderAdminItemsTable() {
    const tableBody = document.getElementById('adminItemsTableBody');
    if (!tableBody) return;

    const items = getItemsFromStorage();

    if (items.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">ChÆ°a cÃ³ mÃ³n nÃ o trong thá»±c Ä‘Æ¡n K Coffee. HÃ£y báº¥m "+ ThÃªm mÃ³n má»›i"!</td></tr>`;
        return;
    }

    tableBody.innerHTML = items.map((item, index) => {
        const statusBadge = item.isAvailable 
            ? `<span class="badge bg-success-subtle text-success border border-success-subtle"><i class="fa-solid fa-circle-check me-1"></i>Äang bÃ¡n</span>`
            : `<span class="badge bg-danger-subtle text-danger border border-danger-subtle"><i class="fa-solid fa-circle-xmark me-1"></i>Háº¿t hÃ ng</span>`;

        return `
            <tr>
                <td class="fw-bold">${index + 1}</td>
                <td>
                    <img src="${item.image}" alt="${escapeHtml(item.name)}" class="admin-item-thumb" onerror="this.src='images/caphedenda.jpg'">
                </td>
                <td>
                    <div class="fw-bold">${escapeHtml(item.name)}</div>
                    <small class="text-muted">${escapeHtml(item.description)}</small>
                </td>
                <td>
                    <span class="badge bg-secondary-subtle text-secondary">${escapeHtml(item.categoryName || item.category)}</span>
                </td>
                <td class="fw-bold text-coffee-accent">${formatCurrency(item.price)}</td>
                <td>${statusBadge}</td>
                <td class="text-end">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="openEditItemModal(${item.id})" title="Chá»‰nh sá»­a thÃ´ng tin">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="confirmDeleteItem(${item.id})" title="XÃ³a mÃ³n">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderAdminOrdersTable() {
    const tableBody = document.getElementById('adminOrdersTableBody');
    if (!tableBody) return;

    const orders = getOrdersFromStorage();

    if (orders.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">ChÆ°a cÃ³ Ä‘Æ¡n hÃ ng nÃ o Ä‘Æ°á»£c ghi nháº­n táº¡i K Coffee.</td></tr>`;
        return;
    }

    tableBody.innerHTML = orders.map(ord => {
        let statusClass = 'bg-warning-subtle text-warning-emphasis';
        if (ord.status === 'Äang pha cháº¿') statusClass = 'bg-info-subtle text-info-emphasis';
        if (ord.status === 'ÄÃ£ hoÃ n thÃ nh') statusClass = 'bg-success-subtle text-success-emphasis';
        if (ord.status === 'ÄÃ£ há»§y') statusClass = 'bg-danger-subtle text-danger-emphasis';

        const summaryItems = ord.items.map(i => `${i.name} (x${i.qty})`).join(', ');

        return `
            <tr>
                <td class="fw-bold">${ord.orderId}</td>
                <td class="small text-muted">${ord.date}</td>
                <td>
                    <div class="fw-bold">${escapeHtml(ord.customer.name)}</div>
                    <div class="small text-muted">${ord.customer.phone} - ${ord.customer.type === 'dine-in' ? 'Táº¡i bÃ n' : 'Giao táº­n nÆ¡i'}</div>
                </td>
                <td class="small" style="max-width: 250px;">${escapeHtml(summaryItems)}</td>
                <td class="fw-bold text-coffee-accent">${formatCurrency(ord.total)}</td>
                <td>
                    <select class="form-select form-select-sm ${statusClass} fw-bold" onchange="updateOrderStatus('${ord.orderId}', this.value)">
                        <option value="Chá» pha cháº¿" ${ord.status === 'Chá» pha cháº¿' ? 'selected' : ''}>Chá» pha cháº¿</option>
                        <option value="Äang pha cháº¿" ${ord.status === 'Äang pha cháº¿' ? 'selected' : ''}>Äang pha cháº¿</option>
                        <option value="ÄÃ£ hoÃ n thÃ nh" ${ord.status === 'ÄÃ£ hoÃ n thÃ nh' ? 'selected' : ''}>ÄÃ£ hoÃ n thÃ nh</option>
                        <option value="ÄÃ£ há»§y" ${ord.status === 'ÄÃ£ há»§y' ? 'selected' : ''}>ÄÃ£ há»§y</option>
                    </select>
                </td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-secondary" onclick="viewOrderReceipt('${ord.orderId}')" title="Xem & In láº¡i hÃ³a Ä‘Æ¡n">
                        <i class="fa-solid fa-receipt"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getOrdersFromStorage();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        order.status = newStatus;
        saveOrdersToStorage(orders);
        showToast(`ÄÃ£ cáº­p nháº­t tráº¡ng thÃ¡i Ä‘Æ¡n ${orderId} -> ${newStatus}`, 'info', 'fa-clock-rotate-left');
        renderAdminStats();
    }
}

function viewOrderReceipt(orderId) {
    const orders = getOrdersFromStorage();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        displayPrintableReceipt(order);
    }
}

// Open modal for Create New Item
function openAddItemModal() {
    document.getElementById('itemModalTitle').textContent = 'ThÃªm MÃ³n Äá»“ Uá»‘ng Má»›i K Coffee';
    document.getElementById('editItemId').value = '';
    document.getElementById('itemForm').reset();
    document.getElementById('itemIsAvailable').checked = true;
    document.getElementById('itemImagePreview').src = 'images/caphedenda.jpg';

    const modal = new bootstrap.Modal(document.getElementById('itemFormModal'));
    modal.show();
}

// Open modal for Editing Item
function openEditItemModal(id) {
    const items = getItemsFromStorage();
    const item = items.find(i => i.id === id);
    if (!item) return;

    document.getElementById('itemModalTitle').textContent = 'Chá»‰nh Sá»­a ThÃ´ng Tin MÃ³n K Coffee';
    document.getElementById('editItemId').value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemImage').value = item.image;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemTag').value = item.tag || '';
    document.getElementById('itemIsAvailable').checked = item.isAvailable;
    document.getElementById('itemImagePreview').src = item.image;

    const modal = new bootstrap.Modal(document.getElementById('itemFormModal'));
    modal.show();
}

// Save (Add or Update) Item
function saveItemFormSubmit(event) {
    event.preventDefault();

    const idVal = document.getElementById('editItemId').value;
    const name = document.getElementById('itemName').value.trim();
    const category = document.getElementById('itemCategory').value;
    const price = parseInt(document.getElementById('itemPrice').value);
    let image = document.getElementById('itemImage').value.trim();
    const description = document.getElementById('itemDescription').value.trim();
    const tag = document.getElementById('itemTag').value;
    const isAvailable = document.getElementById('itemIsAvailable').checked;

    // Validation
    if (!name || name.length < 2) {
        showToast('TÃªn mÃ³n pháº£i cÃ³ Ã­t nháº¥t 2 kÃ½ tá»±!', 'warning', 'fa-triangle-exclamation');
        document.getElementById('itemName').focus();
        return;
    }
    if (isNaN(price) || price <= 0) {
        showToast('GiÃ¡ bÃ¡n pháº£i lÃ  sá»‘ nguyÃªn dÆ°Æ¡ng há»£p lá»‡!', 'warning', 'fa-triangle-exclamation');
        document.getElementById('itemPrice').focus();
        return;
    }
    if (!image) {
        image = 'images/caphedenda.jpg';
    }

    const categoryNames = {
        'ca-phe': 'CÃ  phÃª',
        'tra': 'TrÃ  & TrÃ  Sá»¯a',
        'da-xay': 'ÄÃ¡ Xay & Milo',
        'banh': 'BÃ¡nh Ngá»t'
    };

    let items = getItemsFromStorage();

    if (idVal) {
        // UPDATE existing
        const targetId = parseInt(idVal);
        const index = items.findIndex(i => i.id === targetId);
        if (index > -1) {
            items[index] = {
                ...items[index],
                name: name,
                category: category,
                categoryName: categoryNames[category] || 'Äá»“ uá»‘ng',
                price: price,
                image: image,
                description: description,
                tag: tag,
                isAvailable: isAvailable
            };
            showToast(`ÄÃ£ cáº­p nháº­t mÃ³n "${name}" thÃ nh cÃ´ng!`, 'success', 'fa-pen-clip');
        }
    } else {
        // CREATE new
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        const newItem = {
            id: newId,
            name: name,
            category: category,
            categoryName: categoryNames[category] || 'Äá»“ uá»‘ng',
            price: price,
            image: image,
            description: description,
            tag: tag,
            isAvailable: isAvailable,
            rating: 5.0,
            soldCount: 0
        };
        items.unshift(newItem);
        showToast(`ÄÃ£ thÃªm mÃ³n má»›i "${name}" vÃ o thá»±c Ä‘Æ¡n K Coffee!`, 'success', 'fa-circle-plus');
    }

    saveItemsToStorage(items);

    // Hide Modal
    const modalEl = document.getElementById('itemFormModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    // Re-render
    renderMenu();
    renderAdminView();
}

// Delete Confirmation
let pendingDeleteId = null;

function confirmDeleteItem(id) {
    const items = getItemsFromStorage();
    const item = items.find(i => i.id === id);
    if (!item) return;

    pendingDeleteId = id;
    document.getElementById('deleteItemConfirmName').textContent = item.name;

    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show();
}

function executeDeleteItem() {
    if (!pendingDeleteId) return;

    let items = getItemsFromStorage();
    const item = items.find(i => i.id === pendingDeleteId);
    items = items.filter(i => i.id !== pendingDeleteId);
    saveItemsToStorage(items);

    pendingDeleteId = null;

    const modalEl = document.getElementById('confirmDeleteModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    showToast(`ÄÃ£ xÃ³a mÃ³n khá»i thá»±c Ä‘Æ¡n K Coffee!`, 'danger', 'fa-trash-can');
    renderMenu();
    renderAdminView();
}

// Reset Default Seeds
function resetDefaultMenuData() {
    if (confirm('Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n khÃ´i phá»¥c toÃ n bá»™ thá»±c Ä‘Æ¡n máº«u ban Ä‘áº§u cá»§a K Coffee khÃ´ng?')) {
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(DEFAULT_MENU_ITEMS));
        showToast('ÄÃ£ khÃ´i phá»¥c dá»¯ liá»‡u thá»±c Ä‘Æ¡n gá»‘c K Coffee!', 'info', 'fa-rotate-left');
        renderMenu();
        renderAdminView();
    }
}

// ==========================================================================
// 8. TÃŒM KIáº¾M, Lá»ŒC & Sáº®P Xáº¾P Sá»° KIá»†N
// ==========================================================================

function handleLiveSearch(event) {
    currentSearchQuery = event.target.value;
    renderMenu();
}

function filterByCategory(categoryKey, clickedElement) {
    currentFilterCategory = categoryKey;

    // Toggle active chip style
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    if (clickedElement) {
        clickedElement.classList.add('active');
    }

    renderMenu();
}

function handlePriceFilter(selectElement) {
    currentPriceFilter = selectElement.value;
    renderMenu();
}

function handleSortOrder(selectElement) {
    currentSortBy = selectElement.value;
    renderMenu();
}

function resetAllFilters() {
    currentSearchQuery = '';
    currentFilterCategory = 'all';
    currentPriceFilter = 'all';
    currentSortBy = 'default';

    const searchInput = document.getElementById('menuSearchInput');
    if (searchInput) searchInput.value = '';

    const priceSelect = document.getElementById('filterPriceSelect');
    if (priceSelect) priceSelect.value = 'all';

    const sortSelect = document.getElementById('sortOrderSelect');
    if (sortSelect) sortSelect.value = 'default';

    document.querySelectorAll('.category-chip').forEach(chip => {
        if (chip.getAttribute('data-category') === 'all') chip.classList.add('active');
        else chip.classList.remove('active');
    });

    renderMenu();
}

// Quick Sample Images Picker for Admin
function pickSampleImage(url) {
    document.getElementById('itemImage').value = url;
    document.getElementById('itemImagePreview').src = url;
}

// ==========================================================================
// 9. CHUYá»‚N TAB (MENU KHÃCH HÃ€NG <-> ADMIN QUáº¢N LÃ)
// ==========================================================================

function switchMainTab(tabName) {
    const menuSec = document.getElementById('customerViewSection');
    const adminSec = document.getElementById('adminViewSection');
    const navMenu = document.getElementById('navLinkMenu');
    const navAdmin = document.getElementById('navLinkAdmin');

    if (tabName === 'admin') {
        if (menuSec) menuSec.style.display = 'none';
        if (adminSec) adminSec.style.display = 'block';
        if (navMenu) navMenu.classList.remove('active');
        if (navAdmin) navAdmin.classList.add('active');
        renderAdminView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        if (menuSec) menuSec.style.display = 'block';
        if (adminSec) adminSec.style.display = 'none';
        if (navMenu) navMenu.classList.add('active');
        if (navAdmin) navAdmin.classList.remove('active');
        renderMenu();
    }
}

// ==========================================================================
// 10. TOAST NOTIFICATIONS & AUDIO EFFECTS
// ==========================================================================

function showToast(message, type = 'info', icon = 'fa-bell') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toastId = 'toast_' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast custom-toast toast-${type} align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex p-2">
                <div class="toast-body d-flex align-items-center gap-2">
                    <i class="fa-solid ${icon} fs-5 text-${type}"></i>
                    <div>${escapeHtml(message)}</div>
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

// Built-in Web Audio API synthesizer for ding sound (zero external audio dependency)
function playDingSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
        // Audio error ignore
    }
}

// ==========================================================================
// 11. THEME SWITCHER (DARK / LIGHT)
// ==========================================================================

function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    applyTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    const icon = document.getElementById('themeIcon');
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun text-warning';
        } else {
            icon.className = 'fa-solid fa-moon text-warning';
        }
    }
}

// Utility: Prevent XSS
function escapeHtml(string) {
    if (!string) return '';
    return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ==========================================================================
// 12. INITIALIZATION ON DOCUMENT READY
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCartBadges();
    renderMenu();

    // Image URL live preview in form
    const itemImageInput = document.getElementById('itemImage');
    if (itemImageInput) {
        itemImageInput.addEventListener('input', (e) => {
            const preview = document.getElementById('itemImagePreview');
            if (preview && e.target.value) {
                preview.src = e.target.value;
            }
        });
    }

    // Phone input live update for QR code transfer memo
    const phoneInput = document.getElementById('orderCustomerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            const qrContent = document.getElementById('qrModalTransferContent');
            if (qrContent) {
                qrContent.textContent = 'KC ' + (e.target.value.trim() || '[Sá»‘ Ä‘iá»‡n thoáº¡i]');
            }
        });
    }
});

