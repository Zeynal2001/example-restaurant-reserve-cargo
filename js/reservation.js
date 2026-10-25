import { TABLE_ZONES, TIME_SLOTS, EVENT_OCCASIONS, RESTAURANT_CONFIG, getLocalized } from './data.js';
import { showToast } from './app.js';
import { getCurrentLang, TRANSLATIONS } from './i18n.js';

let selectedZone = TABLE_ZONES[0].id;
let selectedTime = TIME_SLOTS[4]; // 18:00 default

export function initReservation() {
  renderZoneChips();
  renderTimeSlots();
  renderOccasionOptions();
  renderGuestOptions();
  setupDateInput();
  setupReservationForm();

  window.addEventListener('languageChanged', () => {
    renderZoneChips();
    renderOccasionOptions();
    renderGuestOptions();
  });
}

function renderZoneChips() {
  const container = document.getElementById('zoneChipsContainer');
  if (!container) return;
  const lang = getCurrentLang();

  container.innerHTML = TABLE_ZONES.map(zone => {
    const name = getLocalized(zone, 'name', lang);
    const desc = getLocalized(zone, 'desc', lang);
    return `
      <div class="zone-chip ${zone.id === selectedZone ? 'selected' : ''}" data-zone="${zone.id}">
        <i class="fa-solid ${zone.icon}"></i>
        <div class="zone-chip-info">
          <h5>${name}</h5>
          <p>${desc}</p>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.zone-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.zone-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedZone = chip.dataset.zone;
    });
  });
}

function renderTimeSlots() {
  const container = document.getElementById('timeSlotsSelect');
  if (!container) return;

  container.innerHTML = TIME_SLOTS.map(time => `
    <option value="${time}" ${time === selectedTime ? 'selected' : ''}>${time}</option>
  `).join('');
}

function renderOccasionOptions() {
  const select = document.getElementById('resOccasion');
  if (!select) return;
  const lang = getCurrentLang();
  const currentVal = select.value;

  select.innerHTML = EVENT_OCCASIONS.map(occ => {
    const name = getLocalized(occ, 'name', lang);
    return `<option value="${name}">${name}</option>`;
  }).join('');

  if (currentVal) {
    // try to keep selected if possible
    const exists = Array.from(select.options).some(o => o.value === currentVal);
    if (exists) select.value = currentVal;
  }
}

function renderGuestOptions() {
  const select = document.getElementById('resGuests');
  if (!select) return;
  const lang = getCurrentLang();

  const options = {
    az: [
      { val: "1 nəfər", label: "1 nəfər (Fərdi)" },
      { val: "2 nəfər", label: "2 nəfər (Cütlük)", selected: true },
      { val: "3-4 nəfər", label: "3 - 4 nəfər (Ailəvi)" },
      { val: "5-8 nəfər", label: "5 - 8 nəfər (Dostlar)" },
      { val: "10-15 nəfər", label: "10 - 15 nəfər (VIP Otaq)" },
      { val: "20-50 nəfər", label: "20 - 50 nəfər (Korporativ / Kiçik Ziyafət)" },
      { val: "50-120 nəfər", label: "50 - 120 nəfər (Toy / Böyük Banket)" }
    ],
    en: [
      { val: "1 Guest", label: "1 Guest (Individual)" },
      { val: "2 Guests", label: "2 Guests (Couple)", selected: true },
      { val: "3-4 Guests", label: "3 - 4 Guests (Family)" },
      { val: "5-8 Guests", label: "5 - 8 Guests (Friends)" },
      { val: "10-15 Guests", label: "10 - 15 Guests (VIP Room)" },
      { val: "20-50 Guests", label: "20 - 50 Guests (Corporate Banquet)" },
      { val: "50-120 Guests", label: "50 - 120 Guests (Wedding / Grand Banquet)" }
    ],
    ru: [
      { val: "1 персона", label: "1 персона (Индивидуально)" },
      { val: "2 персоны", label: "2 персоны (Пара)", selected: true },
      { val: "3-4 персоны", label: "3 - 4 персоны (Семья)" },
      { val: "5-8 персон", label: "5 - 8 персон (Компания)" },
      { val: "10-15 персон", label: "10 - 15 персон (VIP Зал)" },
      { val: "20-50 персон", label: "20 - 50 персон (Корпоратив / Банкет)" },
      { val: "50-120 персон", label: "50 - 120 персон (Свадьба / Большой Банкет)" }
    ]
  }[lang] || [];

  select.innerHTML = options.map(opt => `
    <option value="${opt.val}" ${opt.selected ? 'selected' : ''}>${opt.label}</option>
  `).join('');
}

function setupDateInput() {
  const dateInput = document.getElementById('resDate');
  if (!dateInput) return;

  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  if (!dateInput.value) {
    dateInput.value = today;
  }
}

function setupReservationForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = getCurrentLang();

    const name = document.getElementById('resName')?.value.trim();
    const phone = document.getElementById('resPhone')?.value.trim();
    const email = document.getElementById('resEmail')?.value.trim();
    const date = document.getElementById('resDate')?.value;
    const time = document.getElementById('timeSlotsSelect')?.value;
    const guests = document.getElementById('resGuests')?.value;
    const occasion = document.getElementById('resOccasion')?.value;
    const notes = document.getElementById('resNotes')?.value.trim();

    if (!name || !phone || !date || !time) {
      const err = {
        az: "Zəhmət olmasa tələb olunan sahələri doldurun!",
        en: "Please fill in all required fields!",
        ru: "Пожалуйста, заполните обязательные поля!"
      }[lang] || "Zəhmət olmasa sahələri doldurun!";
      showToast(err, "error");
      return;
    }

    const zoneObj = TABLE_ZONES.find(z => z.id === selectedZone) || TABLE_ZONES[0];
    const reservationCode = "REZ-" + Math.floor(10000 + Math.random() * 90000);

    const reservation = {
      code: reservationCode,
      name,
      phone,
      email: email || (lang === 'en' ? "Not provided" : lang === 'ru' ? "Не указан" : "Qeyd edilməyib"),
      date,
      time,
      guests: guests || "2 nəfər",
      zone: getLocalized(zoneObj, 'name', lang),
      occasion: occasion || (lang === 'en' ? "Dining" : lang === 'ru' ? "Обед/Ужин" : "Nahar / Şam"),
      notes: notes || (lang === 'en' ? "None" : lang === 'ru' ? "Нет" : "Xüsusi qeyd yoxdur"),
      createdAt: new Date().toISOString(),
      status: lang === 'en' ? "Confirmed" : lang === 'ru' ? "Подтверждено" : "Təsdiqləndi"
    };

    saveReservation(reservation);
    showReservationSuccessModal(reservation);
    form.reset();
    setupDateInput();

    const successMsg = {
      az: "Masanız uğurla rezerv edildi!",
      en: "Your table has been successfully reserved!",
      ru: "Ваш столик успешно забронирован!"
    }[lang] || "Rezervasiya təsdiqləndi!";

    showToast(successMsg, "success");
  });
}

function saveReservation(reservation) {
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem('aura_reservations') || '[]');
  } catch (e) {
    list = [];
  }
  list.unshift(reservation);
  localStorage.setItem('aura_reservations', JSON.stringify(list));
}

function showReservationSuccessModal(res) {
  const modal = document.getElementById('resSuccessModal');
  const content = document.getElementById('resSuccessContent');
  if (!modal || !content) return;
  const lang = getCurrentLang();

  const labels = {
    az: {
      title: "Rezervasiyanız Təsdiqləndi!",
      sub: "Sizi restoranımızda salamlamaqdan məmnun olarıq.",
      code: "Rezervasiya Kodu:",
      guest: "Qonaq:",
      datetime: "Tarix & Saat:",
      count: "Qonaq Sayı:",
      zone: "Seçilmiş Masa / Zal:",
      event: "Tədbir / Məqsəd:",
      wa: "WhatsApp-a Təsdiq Göndər",
      close: "Bağla"
    },
    en: {
      title: "Table Booking Confirmed!",
      sub: "We look forward to welcoming you to Aura Gourmet.",
      code: "Booking Code:",
      guest: "Guest:",
      datetime: "Date & Time:",
      count: "Party Size:",
      zone: "Dining Zone:",
      event: "Occasion / Event:",
      wa: "Send WhatsApp Confirmation",
      close: "Close"
    },
    ru: {
      title: "Бронирование подтверждено!",
      sub: "Будем рады приветствовать вас в нашем ресторане.",
      code: "Код брони:",
      guest: "Гость:",
      datetime: "Дата и время:",
      count: "Количество гостей:",
      zone: "Выбранная зона / Зал:",
      event: "Повод / Мероприятие:",
      wa: "Подтвердить в WhatsApp",
      close: "Закрыть"
    }
  }[lang] || labels.az;

  const waMessage = encodeURIComponent(
    `Salam Aura Gourmet!\n` +
    `• ${labels.code} ${res.code}\n` +
    `• ${labels.guest} ${res.name}\n` +
    `• ${labels.datetime} ${res.date} • ${res.time}\n` +
    `• ${labels.count} ${res.guests}\n` +
    `• ${labels.zone} ${res.zone}\n` +
    `• ${labels.event} ${res.occasion}`
  );

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16,185,129,0.15); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1rem;">
        <i class="fa-solid fa-check"></i>
      </div>
      <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-text-primary);">${labels.title}</h3>
      <p style="color: var(--color-text-secondary); font-size: 0.9rem;">${labels.sub}</p>
    </div>

    <div style="background: var(--card-subtle-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px dashed var(--color-border-subtle); margin-bottom: 0.75rem;">
        <span style="color: var(--color-text-muted); font-size: 0.85rem;">${labels.code}</span>
        <strong style="color: var(--color-accent-gold); font-size: 1.15rem; font-family: monospace;">${res.code}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-regular fa-user text-gold"></i> ${labels.guest}</span>
        <strong>${res.name}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-regular fa-calendar text-gold"></i> ${labels.datetime}</span>
        <strong>${res.date} • ${res.time}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-solid fa-users text-gold"></i> ${labels.count}</span>
        <strong>${res.guests}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-solid fa-champagne-glasses text-gold"></i> ${labels.event}</span>
        <strong style="color: var(--color-accent-gold);">${res.occasion}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-solid fa-chair text-gold"></i> ${labels.zone}</span>
        <strong style="color: var(--color-accent-gold);">${res.zone}</strong>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <a href="https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${waMessage}" target="_blank" class="btn btn-whatsapp" style="width: 100%;">
        <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> ${labels.wa}
      </a>
      <button class="btn btn-secondary" onclick="window.closeModal('resSuccessModal')">
        ${labels.close}
      </button>
    </div>
  `;

  modal.classList.add('open');
}

// Check existing reservations modal
window.openMyReservationsModal = function() {
  const modal = document.getElementById('myReservationsModal');
  const container = document.getElementById('myReservationsList');
  if (!modal || !container) return;

  renderUserReservations();
  modal.classList.add('open');
};

export function renderUserReservations() {
  const container = document.getElementById('myReservationsList');
  if (!container) return;
  const lang = getCurrentLang();

  let list = [];
  try {
    list = JSON.parse(localStorage.getItem('aura_reservations') || '[]');
  } catch (e) {
    list = [];
  }

  if (list.length === 0) {
    const emptyLabels = {
      az: { title: "Aktiv rezervasiyanız yoxdur", sub: "Siz dərhal onlayn formada masa rezerv edə bilərsiniz." },
      en: { title: "No active reservations found", sub: "You can easily book a table anytime using our booking form." },
      ru: { title: "Нет активных броней", sub: "Вы можете забронировать столик в удобное время через онлайн-форму." }
    }[lang] || { title: "Aktiv rezerv yoxdur", sub: "Masa rezerv edin." };

    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--color-text-secondary);">
        <i class="fa-regular fa-calendar-xmark" style="font-size: 3rem; color: var(--color-text-muted); margin-bottom: 1rem;"></i>
        <h4 style="color: var(--color-text-primary); font-size: 1.2rem;">${emptyLabels.title}</h4>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">${emptyLabels.sub}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => `
    <div style="background: var(--card-subtle-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
        <span style="font-family: monospace; font-weight: 700; color: var(--color-accent-gold); font-size: 1rem;">${item.code}</span>
        <span style="background: rgba(16,185,129,0.15); color: #10b981; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
          ${item.status}
        </span>
      </div>
      <p style="font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem;">${item.name} (${item.guests})</p>
      <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.8rem;">
        <i class="fa-regular fa-calendar text-gold"></i> ${item.date} • ${item.time} | <strong>${item.zone}</strong> (${item.occasion})
      </p>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="window.cancelReservation('${item.code}')" style="color: #ef4444; border-color: rgba(239,68,68,0.3);">
          <i class="fa-solid fa-xmark"></i> ${lang === 'en' ? 'Cancel' : lang === 'ru' ? 'Отменить' : 'Ləğv Et'}
        </button>
      </div>
    </div>
  `).join('');
}

window.cancelReservation = function(code) {
  const lang = getCurrentLang();
  const promptText = {
    az: `Həqiqətən ${code} nömrəli rezervasiyanı ləğv etmək istəyirsiniz?`,
    en: `Are you sure you want to cancel reservation ${code}?`,
    ru: `Вы действительно хотите отменить бронь ${code}?`
  }[lang] || `Cancel ${code}?`;

  if (!confirm(promptText)) return;

  let list = JSON.parse(localStorage.getItem('aura_reservations') || '[]');
  list = list.filter(r => r.code !== code);
  localStorage.setItem('aura_reservations', JSON.stringify(list));
  renderUserReservations();
  showToast(lang === 'ru' ? "Бронь отменена" : lang === 'en' ? "Reservation cancelled" : "Rezervasiya ləğv edildi", "info");
};
