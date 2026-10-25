import { RESTAURANT_CONFIG, PROMO_CODES } from './data.js';
import { showToast } from './app.js';

let cart = [];
let appliedPromo = null;

export function initCart() {
  loadCartFromStorage();
  updateCartUI();
  setupCartEvents();
}

function loadCartFromStorage() {
  try {
    cart = JSON.parse(localStorage.getItem('aura_cart') || '[]');
    appliedPromo = JSON.parse(localStorage.getItem('aura_promo') || 'null');
  } catch (e) {
    cart = [];
    appliedPromo = null;
  }
}

function saveCartToStorage() {
  localStorage.setItem('aura_cart', JSON.stringify(cart));
  if (appliedPromo) {
    localStorage.setItem('aura_promo', JSON.stringify(appliedPromo));
  } else {
    localStorage.removeItem('aura_promo');
  }
}

export function addToCart(item, qty = 1) {
  const existing = cart.find(entry => entry.item.id === item.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ item, quantity: qty });
  }
  saveCartToStorage();
  updateCartUI();
}

export function updateQuantity(itemId, delta) {
  const entryIndex = cart.findIndex(entry => entry.item.id === itemId);
  if (entryIndex === -1) return;

  cart[entryIndex].quantity += delta;
  if (cart[entryIndex].quantity <= 0) {
    cart.splice(entryIndex, 1);
    showToast("Məhsul səbətdən silindi", "info");
  }

  saveCartToStorage();
  updateCartUI();
}

export function removeFromCart(itemId) {
  cart = cart.filter(entry => entry.item.id !== itemId);
  saveCartToStorage();
  updateCartUI();
  showToast("Məhsul səbətdən çıxarıldı", "info");
}

export function clearCart() {
  cart = [];
  appliedPromo = null;
  saveCartToStorage();
  updateCartUI();
}

export function getCartSummary() {
  const subtotal = cart.reduce((acc, entry) => acc + (entry.item.price * entry.quantity), 0);
  let discount = 0;
  let delivery = subtotal >= RESTAURANT_CONFIG.freeDeliveryThreshold || subtotal === 0 ? 0 : RESTAURANT_CONFIG.deliveryFee;

  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discount = (subtotal * appliedPromo.discountPercent) / 100;
    }
    if (appliedPromo.freeDelivery) {
      delivery = 0;
    }
  }

  const total = Math.max(0, subtotal - discount + delivery);

  return {
    subtotal,
    discount,
    delivery,
    total,
    itemCount: cart.reduce((acc, entry) => acc + entry.quantity, 0)
  };
}

export function updateCartUI() {
  const summary = getCartSummary();

  // Update header counters
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = summary.itemCount;
    el.style.display = summary.itemCount > 0 ? 'flex' : 'none';
  });

  // Render items in cart drawer
  const container = document.getElementById('cartItemsList');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Səbətiniz boşdur</h4>
        <p>Aura Gourmet menyusundan sevimli təamları seçib sifariş edə bilərsiniz.</p>
        <button class="btn btn-secondary btn-sm" onclick="window.closeCart(); window.location.hash='#menu';">
          Menyuya Bax
        </button>
      </div>
    `;
    renderCartTotals(summary);
    return;
  }

  container.innerHTML = cart.map(entry => `
    <div class="cart-item">
      <img src="${entry.item.image}" alt="${entry.item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${entry.item.name}</h4>
        <span class="cart-item-price">${(entry.item.price * entry.quantity).toFixed(2)} ${RESTAURANT_CONFIG.currency}</span>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="window.changeCartQty('${entry.item.id}', -1)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-count">${entry.quantity}</span>
          <button class="qty-btn" onclick="window.changeCartQty('${entry.item.id}', 1)">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="remove-cart-item" onclick="window.removeCartItem('${entry.item.id}')" title="Sil">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  renderCartTotals(summary);
}

function renderCartTotals(summary) {
  const subtotalEl = document.getElementById('cartSubtotal');
  const deliveryEl = document.getElementById('cartDelivery');
  const discountRow = document.getElementById('cartDiscountRow');
  const discountEl = document.getElementById('cartDiscount');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('proceedCheckoutBtn');

  if (subtotalEl) subtotalEl.textContent = `${summary.subtotal.toFixed(2)} ${RESTAURANT_CONFIG.currency}`;
  if (deliveryEl) {
    if (summary.subtotal === 0) {
      deliveryEl.textContent = `0.00 ${RESTAURANT_CONFIG.currency}`;
    } else if (summary.delivery === 0) {
      deliveryEl.innerHTML = `<span style="color: #10b981; font-weight: 700;">Pulsuz</span>`;
    } else {
      deliveryEl.textContent = `${summary.delivery.toFixed(2)} ${RESTAURANT_CONFIG.currency}`;
    }
  }

  if (discountRow && discountEl) {
    if (summary.discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-${summary.discount.toFixed(2)} ${RESTAURANT_CONFIG.currency}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (totalEl) totalEl.textContent = `${summary.total.toFixed(2)} ${RESTAURANT_CONFIG.currency}`;

  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
  }
}

function setupCartEvents() {
  const promoInput = document.getElementById('promoCodeInput');
  const promoBtn = document.getElementById('applyPromoBtn');

  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;

      if (PROMO_CODES[code]) {
        appliedPromo = { code, ...PROMO_CODES[code] };
        saveCartToStorage();
        updateCartUI();
        showToast(`Promo kod tətbiq olundu: ${appliedPromo.label}`, "success");
        promoInput.value = '';
      } else {
        showToast("Yanlış və ya vaxtı bitmiş promo kod!", "error");
      }
    });
  }
}

// Global functions for inline HTML calls
window.openCart = function() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartBackdrop')?.classList.add('open');
};

window.closeCart = function() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartBackdrop')?.classList.remove('open');
};

window.changeCartQty = function(id, delta) {
  updateQuantity(id, delta);
};

window.removeCartItem = function(id) {
  removeFromCart(id);
};

export { cart };
