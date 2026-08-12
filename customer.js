function renderCustomerProducts() {
  const grid = document.getElementById('customer-product-list');
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="openProductDetail(${p.id})">
      <img src="${p.img}" class="product-img" alt="${p.name}">
      <div class="product-info">
        <span class="badge-store">Gadget Store</span>
        <div class="product-title">${p.name}</div>
        <div class="product-price">Rp ${p.price.toLocaleString('id-ID')}</div>
        <div class="product-meta">
          <span><i class="fa-solid fa-star" style="color:#FFB800;"></i> ${p.rating}</span>
          <span>${p.sold} Terjual</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openProductDetail(id) {
  selectedDetailProduct = products.find(p => p.id === id);
  if (!selectedDetailProduct) return;

  selectedColor = selectedDetailProduct.colors[0];
  selectedQuantity = 1;

  const initialImg = selectedDetailProduct.colorMap?.[selectedColor] || selectedDetailProduct.img;
  const officialLink = selectedDetailProduct.officialUrl || "https://www.apple.com/id/iphone/";

  const container = document.getElementById('detail-content');
  container.innerHTML = `
    <div class="media-slider-container">
      <div class="media-slider">
        <!-- Slide 1: Foto Produk -->
        <div class="media-slide">
          <span class="media-badge"><i class="fa-solid fa-image"></i> Foto 1/2</span>
          <img src="${initialImg}" id="main-detail-img" alt="${selectedDetailProduct.name}">
        </div>
        <!-- Slide 2: Video Produk -->
        <div class="media-slide">
          <span class="media-badge"><i class="fa-solid fa-video"></i> Video 2/2</span>
          <video controls playsinline loop muted autoplay style="width:100%; height:330px; object-fit:cover;">
            <source src="${selectedDetailProduct.video}" type="video/mp4">
            Browser Anda tidak mendukung pemutaran video.
          </video>
        </div>
      </div>
    </div>

    <div class="detail-container">
      <span class="badge-store">Gadget Store • Jakarta Selatan</span>
      <h2 style="font-size:17px; margin:4px 0 8px; color:var(--text-dark);">${selectedDetailProduct.name}</h2>
      <div style="font-size:20px; font-weight:700; color:var(--primary); margin-bottom:4px;">
        Rp ${selectedDetailProduct.price.toLocaleString('id-ID')}
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-bottom:12px;">
        <span>Stok Tersedia: ${selectedDetailProduct.stock} unit</span> | 
        <span><i class="fa-solid fa-truck-fast" style="color: #27ae60;"></i> Pengiriman 2-3 Hari</span>
      </div>

      <!-- HYPERLINK WEB RESMI APPLE IPHONE -->
      <div class="video-hyperlink-box">
        <span style="font-size:11px; color:var(--text-muted); font-weight:600;"><i class="fa-brands fa-apple" style="color:var(--primary); font-size:14px;"></i> Web Resmi Product:</span>
        <a href="${officialLink}" target="_blank" class="video-hyperlink-btn">
          Lihat Spesifikasi Apple <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>

      <!-- HYPERLINK VIDEO STREAM SHOWCASE -->
      <div class="video-hyperlink-box" style="margin-top:8px;">
        <span style="font-size:11px; color:var(--text-muted); font-weight:600;"><i class="fa-solid fa-film" style="color:var(--primary);"></i> Video Stream HD:</span>
        <a href="${selectedDetailProduct.video}" target="_blank" class="video-hyperlink-btn">
          Buka Full Video <i class="fa-solid fa-play"></i>
        </a>
      </div>

      <hr style="border:none; border-top:1px solid var(--border-light); margin:12px 0;">

      <h4 style="font-size:13px; margin-bottom:6px; color:var(--text-dark);">Deskripsi Lengkap Gadget</h4>
      <p style="font-size:12px; color:#555; line-height:1.6; margin-bottom:20px;">${selectedDetailProduct.desc}</p>

      <hr style="border:none; border-top:1px solid var(--border-light); margin:12px 0;">

      <div class="flex-between" style="margin-bottom:10px;">
        <h4 style="font-size:14px; font-weight:700; color:var(--text-dark);">
          ${selectedDetailProduct.rating} <i class="fa-solid fa-star" style="color:#FFB800;"></i> Penilaian Pembeli (${selectedDetailProduct.reviews ? selectedDetailProduct.reviews.length : 0})
        </h4>
      </div>

      <div id="reviews-list">
        ${renderReviews(selectedDetailProduct.reviews)}
      </div>

      <div style="display:flex; gap:10px; margin-top:24px;">
        <button class="btn btn-outline" onclick="openVariantSheetForCart()"><i class="fa-solid fa-cart-plus"></i> + Keranjang</button>
        <button class="btn btn-primary" onclick="openVariantSheetForBuy()">Beli Sekarang</button>
      </div>
    </div>
  `;
  navigateTo('product-detail-page');
}

function renderReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    return `<p style="font-size:12px; color:var(--text-muted);">Belum ada ulasan untuk produk ini.</p>`;
  }
  return reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-user">${r.name}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div style="color:#FFB800; font-size:10px; margin-bottom:2px;">
        ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
      </div>
      <div class="review-variant">${r.variant || 'Variasi: Standard'}</div>
      <p class="review-comment">${r.comment}</p>
    </div>
  `).join('');
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding:40px 0; color:var(--primary-dark);">
        <i class="fa-solid fa-laptop" style="font-size:48px; color:var(--color-rose); margin-bottom:12px;"></i>
        <p style="font-weight:600;">Keranjang belanjaan gadget-mu masih kosong</p>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map((item, index) => {
    total += item.product.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${item.selectedImg || item.product.img}" class="cart-img" alt="${item.product.name}">
        <div class="cart-details">
          <div style="font-weight:600; font-size:13px;">${item.product.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">Warna: <strong>${item.color}</strong></div>
          <div style="font-weight:700; color:var(--primary); font-size:13px; margin-top:2px;">Rp ${item.product.price.toLocaleString('id-ID')}</div>
          <div class="flex-between" style="margin-top:6px;">
            <span style="font-size:12px;">Jumlah: <strong>${item.qty} unit</strong></span>
            <div style="display:flex; gap:6px;">
              <button onclick="openVariantSheetFromCart(${index})" class="btn btn-secondary" style="padding:4px 8px; font-size:10px;"><i class="fa-solid fa-pen"></i> Ubah Opsi</button>
              <button onclick="removeFromCart(${index})" style="border:none; background:none; color:#FF3B30; font-size:11px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('cart-total-price').innerText = `Rp ${total.toLocaleString('id-ID')}`;
  footer.style.display = 'block';
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  renderCart();
  showToast("Produk dihapus dari keranjang");
}

function renderCheckout() {
  const container = document.getElementById('checkout-items');
  const nameEl = document.getElementById('checkout-cust-name');
  const phoneEl = document.getElementById('checkout-cust-phone');
  
  if (nameEl) nameEl.innerText = currentUser ? currentUser.name : 'Seraphine Azellie';
  if (phoneEl) phoneEl.innerText = currentUser ? currentUser.phone : '08123456789';

  let subtotal = 0;
  container.innerHTML = cart.map(item => {
    subtotal += item.product.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${item.selectedImg || item.product.img}" class="cart-img" alt="${item.product.name}">
        <div class="cart-details">
          <div style="font-weight:600; font-size:13px;">${item.product.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">Warna Terpilih: <strong>${item.color}</strong></div>
          <div class="flex-between" style="margin-top:6px;">
            <span style="font-weight:700; color:var(--primary); font-size:12px;">Rp ${item.product.price.toLocaleString('id-ID')}</span>
            <span style="font-size:12px;">x${item.qty} unit</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const shipping = 15000;
  document.getElementById('checkout-subtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById('checkout-total').innerText = `Rp ${(subtotal + shipping).toLocaleString('id-ID')}`;
}

function openVariantSheetForCart() {
  sheetTargetIndex = null;
  sheetActionMode = 'add_to_cart';
  openSheetGeneric(selectedDetailProduct, selectedColor, selectedQuantity, "Masukkan ke Keranjang");
}

function openVariantSheetForBuy() {
  sheetTargetIndex = null;
  sheetActionMode = 'buy_now';
  openSheetGeneric(selectedDetailProduct, selectedColor, selectedQuantity, "Lanjut ke Checkout");
}

function openVariantSheetFromCart(index) {
  sheetTargetIndex = index;
  sheetActionMode = 'edit_cart';
  const item = cart[index];
  openSheetGeneric(item.product, item.color, item.qty, "Simpan Perubahan");
}

/* PROSES CHECKOUT DENGAN SINKRONISASI DATA DAN NOTIFIKASI KHUSUS ADMIN */
function processOrder() {
  if (cart.length === 0) return;
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const custName = currentUser ? currentUser.name : 'Seraphine Azellie';
  const custPhone = currentUser ? currentUser.phone : '08123456789';
  const custEmail = currentUser ? currentUser.email : 'seraphineazellie@gmail.com';
  const custAddress = 'Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan';
  
  const paymentMethodVal = document.getElementById('payment-method').value;
  let paymentLabel = 'COD';
  if (paymentMethodVal.includes('Transfer')) paymentLabel = 'Transfer Bank';
  if (paymentMethodVal.includes('E-Wallet')) paymentLabel = 'E-Wallet';

  const orderIdCode = 'AZR-' + Math.floor(100000 + Math.random() * 900000);
  const itemNames = cart.map(i => `${i.product.name} x${i.qty}`).join(', ');

  const newOrder = {
    id: orderIdCode,
    date: '07 Ags 2026',
    category: 'harian',
    customer: custName,
    phone: custPhone,
    email: custEmail,
    address: custAddress,
    items: [...cart],
    shippingFee: 15000,
    total: subtotal + 15000,
    payment: paymentLabel,
    status: 'Dikemas'
  };

  orders.unshift(newOrder);

  // NOTIFIKASI DIKIRIM KE ANTRIAN KHUSUS ADMIN (TIDAK MUNCUL DI PELANGGAN)
  adminNotificationsQueue.push(`Pesanan ${newOrder.id} masuk dipesan oleh ${custName} (${itemNames})`);

  cart = [];
  updateCartBadge();
  
  // TOAST PELANGGAN TAMPILKAN KONFIRMASI PEMESANAN
  showToast("Pesanan Anda Berhasil Dibuat!");

  navigateTo('customer-orders-page');
}

/* TAMPILAN PESANAN SAMA PERSIS SEPERTI FOTO/SCREENSHOT ACUAN USER */
function renderCustomerOrders() {
  const container = document.getElementById('customer-order-list');
  if (orders.length === 0) {
    container.innerHTML = `<p class="text-center" style="color:var(--primary-dark); padding:30px;">Belum ada riwayat pesanan.</p>`;
    return;
  }

  container.innerHTML = orders.map(order => {
    const itemSummaryList = order.items.map(i => `${i.product.name}`).join(', ');
    const ongkirText = order.shippingFee ? ` (Inc. Ongkir Rp ${order.shippingFee.toLocaleString('id-ID')})` : ' (Inc. Ongkir Rp 15.000)';

    return `
      <div class="order-card-azariya">
        <div class="order-card-header">
          <span class="order-id-title">#${order.id}</span>
          <span class="order-status-badge"><i class="fa-solid fa-box"></i> ${order.status}</span>
        </div>
        <div class="order-detail-line"><strong>Pemesanan Oleh:</strong> ${order.customer} (${order.phone || '08123456789'})</div>
        <div class="order-detail-line"><strong>Email:</strong> ${order.email || 'seraphineazellie@gmail.com'}</div>
        <div class="order-detail-line"><strong>Alamat Pengiriman:</strong> ${order.address || 'Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan'}</div>
        
        <div class="order-product-line">${itemSummaryList}${ongkirText}</div>
        <div class="order-price-line">Rp ${order.total.toLocaleString('id-ID')} (${order.payment})</div>
      </div>
    `;
  }).join('');
}

function clearCustomerHistory() {
  if (confirm("Apakah Anda yakin ingin menghapus semua riwayat pesanan?")) {
    orders = [];
    renderCustomerOrders();
    showToast("Riwayat pesanan berhasil dibersihkan.");
  }
}
