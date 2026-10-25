import { TABLE_ZONES, TIME_SLOTS, RESTAURANT_CONFIG } from './data.js';
import { showToast } from './app.js';

let selectedZone = TABLE_ZONES[0].id;
let selectedTime = TIME_SLOTS[4]; // 18:00 default

export function initReservation() {
  renderZoneChips();
  renderTimeSlots();
  setupDateInput();
  setupReservationForm();
}

function renderZoneChips() {
  const container = document.getElementById('zoneChipsContainer');
  if (!container) return;

  container.innerHTML = TABLE_ZONES.map(zone => `
    <div class="zone-chip ${zone.id === selectedZone ? 'selected' : ''}" data-zone="${zone.id}">
      <i class="fa-solid ${zone.icon}"></i>
      <div class="zone-chip-info">
        <h5>${zone.name}</h5>
        <p>${zone.desc}</p>
      </div>
    </div>
  `).join('');

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

function setupDateInput() {
  const dateInput = document.getElementById('resDate');
  if (!dateInput) return;

  // Set min date to today in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.value = today;
}

function setupReservationForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('resName')?.value.trim();
    const phone = document.getElementById('resPhone')?.value.trim();
    const email = document.getElementById('resEmail')?.value.trim();
    const date = document.getElementById('resDate')?.value;
    const time = document.getElementById('timeSlotsSelect')?.value;
    const guests = document.getElementById('resGuests')?.value;
    const occasion = document.getElementById('resOccasion')?.value;
    const notes = document.getElementById('resNotes')?.value.trim();

    if (!name || !phone || !date || !time) {
      showToast("Zəhmət olmasa tələb olunan sahələri doldurun!", "error");
      return;
    }

    const zoneObj = TABLE_ZONES.find(z => z.id === selectedZone) || TABLE_ZONES[0];
    const reservationCode = "REZ-" + Math.floor(10000 + Math.random() * 90000);

    const reservation = {
      code: reservationCode,
      name,
      phone,
      email: email || "Qeyd edilməyib",
      date,
      time,
      guests: guests || "2 nəfər",
      zone: zoneObj.name,
      occasion: occasion || "Standart Görüş",
      notes: notes || "Xüsusi qeyd yoxdur",
      createdAt: new Date().toISOString(),
      status: "Təsdiqləndi"
    };

    saveReservation(reservation);
    showReservationSuccessModal(reservation);
    form.reset();
    setupDateInput();
    showToast("Masanız uğurla rezerv edildi!", "success");
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

  const waMessage = encodeURIComponent(
    `Salam Aura Gourmet! Mən masa rezervasiyası etmişəm:\n` +
    `• Rezerv Kodu: ${res.code}\n` +
    `• Ad: ${res.name}\n` +
    `• Tarix və Saat: ${res.date} saat ${res.time}\n` +
    `• Qonaq sayı: ${res.guests}\n` +
    `• Zona: ${res.zone}\n` +
    `• Qeyd: ${res.occasion}`
  );

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16,185,129,0.15); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1rem;">
        <i class="fa-solid fa-check"></i>
      </div>
      <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #fff;">Rezervasiyanız Təsdiqləndi!</h3>
      <p style="color: var(--color-text-secondary); font-size: 0.9rem;">Sizi restoranımızda salamlamaqdan məmnun olarıq.</p>
    </div>

    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px dashed var(--color-border-subtle); margin-bottom: 0.75rem;">
        <span style="color: var(--color-text-muted); font-size: 0.85rem;">Rezervasiya Kodu:</span>
        <strong style="color: var(--color-accent-gold); font-size: 1.1rem; font-family: monospace;">${res.code}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-regular fa-user text-gold"></i> Qonaq:</span>
        <strong>${res.name}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-regular fa-calendar text-gold"></i> Tarix & Saat:</span>
        <strong>${res.date} • ${res.time}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-solid fa-users text-gold"></i> Qonaq Sayı:</span>
        <strong>${res.guests}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
        <span style="color: var(--color-text-secondary);"><i class="fa-solid fa-chair text-gold"></i> Seçilmiş Masa:</span>
        <strong style="color: var(--color-accent-gold);">${res.zone}</strong>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <a href="https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=${waMessage}" target="_blank" class="btn btn-whatsapp" style="width: 100%;">
        <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> WhatsApp-a Təsdiq Göndər
      </a>
      <button class="btn btn-secondary" onclick="window.closeModal('resSuccessModal')">
        Bağla
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

  let list = [];
  try {
    list = JSON.parse(localStorage.getItem('aura_reservations') || '[]');
  } catch (e) {
    list = [];
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
        <i class="fa-regular fa-calendar-xmark" style="font-size: 3rem; color: var(--color-text-muted); margin-bottom: 1rem;"></i>
        <h4>Aktiv rezervasiyanız yoxdur</h4>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Siz dərhal onlayn formada masa rezerv edə bilərsiniz.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
        <span style="font-family: monospace; font-weight: 700; color: var(--color-accent-gold);">${item.code}</span>
        <span style="background: rgba(16,185,129,0.15); color: #10b981; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: var(--radius-full);">
          ${item.status}
        </span>
      </div>
      <p style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem;">${item.name} (${item.guests})</p>
      <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.8rem;">
        <i class="fa-regular fa-calendar text-gold"></i> ${item.date} • ${item.time} | <strong>${item.zone}</strong>
      </p>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="window.cancelReservation('${item.code}')" style="color: #ef4444; border-color: rgba(239,68,68,0.3);">
          <i class="fa-solid fa-xmark"></i> Ləğv Et
        </button>
      </div>
    </div>
  `).join('');
}

window.cancelReservation = function(code) {
  if (!confirm(`Həqiqətən ${code} nömrəli rezervasiyanı ləğv etmək istəyirsiniz?`)) return;

  let list = JSON.parse(localStorage.getItem('aura_reservations') || '[]');
  list = list.filter(r => r.code !== code);
  localStorage.setItem('aura_reservations', JSON.stringify(list));
  renderUserReservations();
  showToast("Rezervasiya ləğv edildi", "info");
};
