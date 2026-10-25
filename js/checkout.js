import { RESTAURANT_CONFIG } from './data.js';
import { cart, getCartSummary, clearCart, updateCartUI } from './cart.js';
import { showToast } from './app.js';

let deliveryType = 'delivery'; // 'delivery' or 'takeaway'
let currentActiveTrackingInterval = null;

export function initCheckout() {
  setupDeliveryTypeSelector();
  setupCheckoutForm();
}

function setupDeliveryTypeSelector() {
  const cards = document.querySelectorAll('.delivery-radio-card');
  const addressContainer = document.getElementById('deliveryAddressFields');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      deliveryType = card.dataset.type;

      if (addressContainer) {
        addressContainer.style.display = deliveryType === 'takeaway' ? 'none' : 'block';
      }
    });
  });
}

function setupCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  // WhatsApp order button
  const waBtn = document.getElementById('sendOrderWhatsAppBtn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      processOrder(true);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    processOrder(false);
  });
}

function processOrder(isWhatsAppDirect) {
  const summary = getCartSummary();
  if (cart.length === 0) {
    showToast("Səbətiniz boşdur!", "error");
    return;
  }

  const name = document.getElementById('checkoutName')?.value.trim();
  const phone = document.getElementById('checkoutPhone')?.value.trim();
  const address = document.getElementById('checkoutAddress')?.value.trim();
  const note = document.getElementById('checkoutNote')?.value.trim();
  const payment = document.getElementById('checkoutPayment')?.value;

  if (!name || !phone) {
    showToast("Zəhmət olmasa ad və telefon nömrənizi qeyd edin!", "error");
    return;
  }

  if (deliveryType === 'delivery' && !address) {
    showToast("Zəhmət olmasa çatdırılma ünvanını daxil edin!", "error");
    return;
  }

  const orderId = "CARGO-" + Math.floor(1000 + Math.random() * 9000);
  const orderData = {
    id: orderId,
    name,
    phone,
    deliveryType,
    address: deliveryType === 'delivery' ? address : 'Restorandan Gəl-Götür',
    note: note || 'Qeyd yoxdur',
    paymentMethod: payment || 'Qapıda Nağd',
    items: [...cart],
    summary,
    createdAt: new Date().toISOString(),
    status: 'Qəbul edildi'
  };

  saveOrder(orderData);

  if (isWhatsAppDirect) {
    // Construct rich Azerbaijani WhatsApp message
    let itemsText = cart.map(c => `• ${c.item.name} x ${c.quantity} = ${(c.item.price * c.quantity).toFixed(2)} ${RESTAURANT_CONFIG.currency}`).join('\n');
    
    const message = encodeURIComponent(
      ` Salam Aura Gourmet! Yeni sifariş vermək istəyirəm:\n\n` +
      ` Sifariş No: ${orderId}\n` +
      ` Müştəri: ${name}\n` +
      ` Telefon: ${phone}\n` +
      ` Növü: ${deliveryType === 'delivery' ? 'Kuryerlə Çatdırılma' : 'Gəl-Götür'}\n` +
      (deliveryType === 'delivery' ? ` Ünvan: ${address}\n` : '') +
      ` Ödəniş: ${payment}\n` +
      ` Qeyd: ${note || 'Yoxdur'}\n\n` +
      ` Sifariş Təamları:\n${itemsText}\n\n` +
      ` Ara Cəm: ${summary.subtotal.toFixed(2)} ${RESTAURANT_CONFIG.currency}\n` +
      (summary.discount > 0 ? ` Endirim: -${summary.discount.toFixed(2)} ${RESTAURANT_CONFIG.currency}\n` : '') +
      ` Çatdırılma: ${summary.delivery === 0 ? 'Pulsuz' : summary.delivery.toFixed(2) + ' ' + RESTAURANT_CONFIG.currency}\n` +
      ` YEKUN MƏBLƏĞ: ${summary.total.toFixed(2)} ${RESTAURANT_CONFIG.currency}\n\n` +
      `Zəhmət olmasa sifarişi qəbul edib təsdiqləyin!`
    );

    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${message}`, '_blank');
  }

  // Clear cart and close modals
  clearCart();
  window.closeModal('checkoutModal');
  window.closeCart();

  // Open live tracker simulator
  openLiveTrackerModal(orderData);
  showToast("Sifarişiniz qəbul edildi və kuryer sisteminə yönləndirildi!", "success");
}

function saveOrder(order) {
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem('aura_orders') || '[]');
  } catch (e) {
    list = [];
  }
  list.unshift(order);
  localStorage.setItem('aura_orders', JSON.stringify(list));
}

// Global modal trigger for checkout
window.openCheckoutModal = function() {
  const summary = getCartSummary();
  if (cart.length === 0) {
    showToast("Zəhmət olmasa əvvəlcə menyudan yemək seçin!", "info");
    return;
  }

  const modal = document.getElementById('checkoutModal');
  const summaryBox = document.getElementById('checkoutOrderReview');
  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>Məhsul sayı:</span> <strong>${summary.itemCount} ədəd</strong>
      </div>
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>Məbləğ:</span> <strong>${summary.subtotal.toFixed(2)} ${RESTAURANT_CONFIG.currency}</strong>
      </div>
      ${summary.discount > 0 ? `
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; color: #10b981;">
        <span>Endirim:</span> <strong>-${summary.discount.toFixed(2)} ${RESTAURANT_CONFIG.currency}</strong>
      </div>` : ''}
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>Çatdırılma:</span> <strong>${summary.delivery === 0 ? 'Pulsuz' : summary.delivery.toFixed(2) + ' ' + RESTAURANT_CONFIG.currency}</strong>
      </div>
      <div style="font-size: 1.15rem; font-weight: 800; border-top: 1px dashed var(--color-border-subtle); padding-top: 0.5rem; display: flex; justify-content: space-between; color: var(--color-accent-gold);">
        <span>Yekun:</span> <span>${summary.total.toFixed(2)} ${RESTAURANT_CONFIG.currency}</span>
      </div>
    `;
  }

  modal?.classList.add('open');
};

export function openLiveTrackerModal(order) {
  const modal = document.getElementById('liveTrackerModal');
  if (!modal) return;

  const idBadge = document.getElementById('trackerModalOrderId');
  const addressText = document.getElementById('trackerModalAddress');
  const etaTimer = document.getElementById('trackerEtaTimer');

  if (idBadge) idBadge.textContent = order.id;
  if (addressText) addressText.textContent = order.address;
  if (etaTimer) etaTimer.textContent = "35 dəq";

  // Reset steps
  updateTrackerSteps(1);

  modal.classList.add('open');

  // Clear existing timer if any
  if (currentActiveTrackingInterval) {
    clearInterval(currentActiveTrackingInterval);
  }

  // Simulate progress through stages
  let stage = 1;
  let remainingMinutes = 35;

  currentActiveTrackingInterval = setInterval(() => {
    stage++;
    remainingMinutes -= 10;
    if (remainingMinutes < 5) remainingMinutes = 5;

    if (etaTimer) {
      etaTimer.textContent = stage >= 4 ? "Çatdırıldı!" : `${remainingMinutes} dəq`;
    }

    updateTrackerSteps(stage);

    if (stage >= 4) {
      clearInterval(currentActiveTrackingInterval);
      showToast(`Sifariş No: ${order.id} ünvana çatdırıldı. Nuş olsun!`, "success");
    }
  }, 9000); // changes stage every 9 seconds for demonstration
}

function updateTrackerSteps(currentStage) {
  for (let i = 1; i <= 4; i++) {
    const stepElements = [
      document.getElementById(`trackStep${i}`),
      document.getElementById(`modalTrackStep${i}`)
    ];

    stepElements.forEach(stepEl => {
      if (!stepEl) return;
      stepEl.classList.remove('done', 'current');
      if (i < currentStage) {
        stepEl.classList.add('done');
        const icon = stepEl.querySelector('.track-dot i');
        if (icon) icon.className = "fa-solid fa-check";
      } else if (i === currentStage) {
        stepEl.classList.add('current');
      }
    });
  }
}

// Order lookup by ID
window.trackOrderByUserInput = function() {
  const input = document.getElementById('trackOrderInput');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast("Zəhmət olmasa Sifariş Nömrəsini daxil edin (məs: CARGO-1024)", "info");
    return;
  }

  let list = [];
  try {
    list = JSON.parse(localStorage.getItem('aura_orders') || '[]');
  } catch (e) {
    list = [];
  }

  const found = list.find(o => o.id === code);
  if (found) {
    openLiveTrackerModal(found);
  } else {
    // Generate simulated order for demo showcase
    const demoOrder = {
      id: code,
      address: "Nəsimi r., 28 May küçəsi 14",
      items: [],
      summary: { total: 42.00 }
    };
    openLiveTrackerModal(demoOrder);
    showToast("Demo sifariş izləmə rejimi aktivləşdirildi", "info");
  }
};
