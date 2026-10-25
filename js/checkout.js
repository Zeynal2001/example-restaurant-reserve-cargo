import { RESTAURANT_CONFIG, getLocalized } from './data.js';
import { cart, getCartSummary, clearCart, updateCartUI } from './cart.js';
import { showToast } from './app.js';
import { getCurrentLang, TRANSLATIONS } from './i18n.js';

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
  const lang = getCurrentLang();

  if (cart.length === 0) {
    showToast(lang === 'en' ? "Your cart is empty!" : lang === 'ru' ? "Корзина пуста!" : "Səbətiniz boşdur!", "error");
    return;
  }

  const name = document.getElementById('checkoutName')?.value.trim();
  const phone = document.getElementById('checkoutPhone')?.value.trim();
  const address = document.getElementById('checkoutAddress')?.value.trim();
  const note = document.getElementById('checkoutNote')?.value.trim();
  const payment = document.getElementById('checkoutPayment')?.value;

  if (!name || !phone) {
    showToast(lang === 'en' ? "Please provide your name and phone number!" : lang === 'ru' ? "Укажите имя и телефон!" : "Zəhmət olmasa ad və telefon nömrənizi qeyd edin!", "error");
    return;
  }

  if (deliveryType === 'delivery' && !address) {
    showToast(lang === 'en' ? "Please provide a delivery address!" : lang === 'ru' ? "Укажите адрес доставки!" : "Zəhmət olmasa çatdırılma ünvanını daxil edin!", "error");
    return;
  }

  const orderId = "CARGO-" + Math.floor(1000 + Math.random() * 9000);
  const orderData = {
    id: orderId,
    name,
    phone,
    deliveryType,
    address: deliveryType === 'delivery' ? address : (lang === 'en' ? 'Takeaway Pickup' : lang === 'ru' ? 'Самовывоз из ресторана' : 'Restorandan Gəl-Götür'),
    note: note || (lang === 'en' ? 'None' : lang === 'ru' ? 'Нет' : 'Qeyd yoxdur'),
    paymentMethod: payment || 'Qapıda Nağd',
    items: [...cart],
    summary,
    createdAt: new Date().toISOString(),
    status: lang === 'en' ? 'Order Received' : lang === 'ru' ? 'Заказ принят' : 'Qəbul edildi'
  };

  saveOrder(orderData);

  if (isWhatsAppDirect) {
    // Construct rich WhatsApp message in current language
    let itemsText = cart.map(c => {
      const iName = getLocalized(c.item, 'name', lang);
      return `• ${iName} x ${c.quantity} = ${(c.item.price * c.quantity).toFixed(2)} ${RESTAURANT_CONFIG.currency}`;
    }).join('\n');
    
    const intro = lang === 'en' ? "Hello Aura Gourmet! I'd like to place an order:" :
                  lang === 'ru' ? "Здравствуйте, Aura Gourmet! Хочу сделать заказ:" :
                  "Salam Aura Gourmet! Yeni sifariş vermək istəyirəm:";

    const message = encodeURIComponent(
      ` ${intro}\n\n` +
      ` Order ID: ${orderId}\n` +
      ` Name: ${name}\n` +
      ` Phone: ${phone}\n` +
      ` Type: ${deliveryType === 'delivery' ? 'Courier Delivery' : 'Takeaway Pickup'}\n` +
      (deliveryType === 'delivery' ? ` Address: ${address}\n` : '') +
      ` Payment: ${payment}\n` +
      ` Note: ${note || '-'}\n\n` +
      ` Items:\n${itemsText}\n\n` +
      ` Subtotal: ${summary.subtotal.toFixed(2)} ${RESTAURANT_CONFIG.currency}\n` +
      (summary.discount > 0 ? ` Discount: -${summary.discount.toFixed(2)} ${RESTAURANT_CONFIG.currency}\n` : '') +
      ` Delivery: ${summary.delivery === 0 ? 'FREE' : summary.delivery.toFixed(2) + ' ' + RESTAURANT_CONFIG.currency}\n` +
      ` TOTAL: ${summary.total.toFixed(2)} ${RESTAURANT_CONFIG.currency}\n\n` +
      `Please confirm the order!`
    );

    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${message}`, '_blank');
  }

  // Clear cart and close modals
  clearCart();
  window.closeModal('checkoutModal');
  window.closeCart();

  // Open live tracker simulator
  openLiveTrackerModal(orderData);
  const toastSuccess = {
    az: "Sifarişiniz qəbul edildi və kuryer sisteminə yönləndirildi!",
    en: "Order received and dispatched to live courier system!",
    ru: "Заказ принят и передан в систему курьерской доставки!"
  }[lang] || "Sifariş qəbul edildi!";

  showToast(toastSuccess, "success");
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
  const lang = getCurrentLang();

  if (cart.length === 0) {
    showToast(lang === 'en' ? "Please select dishes from the menu first!" : lang === 'ru' ? "Сначала выберите блюда из меню!" : "Zəhmət olmasa əvvəlcə menyudan yemək seçin!", "info");
    return;
  }

  const modal = document.getElementById('checkoutModal');
  const summaryBox = document.getElementById('checkoutOrderReview');

  const reviewLabels = {
    az: { count: "Məhsul sayı:", subtotal: "Məbləğ:", disc: "Endirim:", del: "Çatdırılma:", free: "Pulsuz", tot: "Yekun:" },
    en: { count: "Item count:", subtotal: "Subtotal:", disc: "Discount:", del: "Delivery:", free: "Free", tot: "Total:" },
    ru: { count: "Кол-во блюд:", subtotal: "Сумма:", disc: "Скидка:", del: "Доставка:", free: "Бесплатно", tot: "Итого:" }
  }[lang] || reviewLabels.az;

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>${reviewLabels.count}</span> <strong>${summary.itemCount}</strong>
      </div>
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>${reviewLabels.subtotal}</span> <strong>${summary.subtotal.toFixed(2)} ${RESTAURANT_CONFIG.currency}</strong>
      </div>
      ${summary.discount > 0 ? `
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; color: #10b981;">
        <span>${reviewLabels.disc}</span> <strong>-${summary.discount.toFixed(2)} ${RESTAURANT_CONFIG.currency}</strong>
      </div>` : ''}
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>${reviewLabels.del}</span> <strong>${summary.delivery === 0 ? reviewLabels.free : summary.delivery.toFixed(2) + ' ' + RESTAURANT_CONFIG.currency}</strong>
      </div>
      <div style="font-size: 1.15rem; font-weight: 800; border-top: 1px dashed var(--color-border-subtle); padding-top: 0.5rem; display: flex; justify-content: space-between; color: var(--color-accent-gold);">
        <span>${reviewLabels.tot}</span> <span>${summary.total.toFixed(2)} ${RESTAURANT_CONFIG.currency}</span>
      </div>
    `;
  }

  modal?.classList.add('open');
};

export function openLiveTrackerModal(order) {
  const modal = document.getElementById('liveTrackerModal');
  if (!modal) return;
  const lang = getCurrentLang();

  const idBadge = document.getElementById('trackerModalOrderId');
  const addressText = document.getElementById('trackerModalAddress');
  const etaTimer = document.getElementById('trackerEtaTimer');

  if (idBadge) idBadge.textContent = order.id;
  if (addressText) addressText.textContent = order.address;
  if (etaTimer) etaTimer.textContent = lang === 'ru' ? "35 мин" : lang === 'en' ? "35 mins" : "35 dəq";

  // Reset steps
  updateTrackerSteps(1);

  modal.classList.add('open');

  // Clear existing timer if any
  if (currentActiveTrackingInterval) {
    clearInterval(currentActiveTrackingInterval);
  }

  let stage = 1;
  let remainingMinutes = 35;

  currentActiveTrackingInterval = setInterval(() => {
    stage++;
    remainingMinutes -= 10;
    if (remainingMinutes < 5) remainingMinutes = 5;

    const unit = lang === 'ru' ? 'мин' : lang === 'en' ? 'mins' : 'dəq';
    const deliveredTxt = lang === 'ru' ? 'Доставлен!' : lang === 'en' ? 'Delivered!' : 'Çatdırıldı!';

    if (etaTimer) {
      etaTimer.textContent = stage >= 4 ? deliveredTxt : `${remainingMinutes} ${unit}`;
    }

    updateTrackerSteps(stage);

    if (stage >= 4) {
      clearInterval(currentActiveTrackingInterval);
      const doneMsg = {
        az: `Sifariş No: ${order.id} ünvana çatdırıldı. Nuş olsun!`,
        en: `Order ${order.id} has been delivered. Bon appétit!`,
        ru: `Заказ ${order.id} успешно доставлен. Приятного аппетита!`
      }[lang] || "Sifariş çatdırıldı!";
      showToast(doneMsg, "success");
    }
  }, 9000);
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
  const lang = getCurrentLang();
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    const prompt = lang === 'en' ? "Please enter an Order ID (e.g. CARGO-1024)" :
                   lang === 'ru' ? "Пожалуйста, введите номер заказа (напр. CARGO-1024)" :
                   "Zəhmət olmasa Sifariş Nömrəsini daxil edin (məs: CARGO-1024)";
    showToast(prompt, "info");
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
      address: lang === 'ru' ? "г. Баку, ул. 28 Мая 14" : lang === 'en' ? "14 May 28th Street, Baku" : "Nəsimi r., 28 May küçəsi 14",
      items: [],
      summary: { total: 42.00 }
    };
    openLiveTrackerModal(demoOrder);
    showToast(lang === 'ru' ? "Демо режим отслеживания включен" : lang === 'en' ? "Demo order tracking mode active" : "Demo sifariş izləmə rejimi aktivləşdirildi", "info");
  }
};
