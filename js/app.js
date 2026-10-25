import { initI18n } from './i18n.js';
import { initMenu } from './menu.js';
import { initCart } from './cart.js';
import { initReservation } from './reservation.js';
import { initCheckout } from './checkout.js';
import { REVIEWS } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initMenu();
  initCart();
  initReservation();
  initCheckout();
  renderReviews();
  setupNavigation();
  setupModals();
});

function setupNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');

  // Shrink header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

function renderReviews() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  container.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="stars">
          ${Array(r.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
        </div>
        <span class="review-date">${r.date}</span>
      </div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <img src="${r.avatar}" alt="${r.name}" class="author-avatar">
        <div class="author-name">
          <h5>${r.name}</h5>
          <p>${r.role}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function setupModals() {
  // Backdrop click to close modals
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      window.closeCart();
    }
  });
}

// Global modal close function
window.closeModal = function(modalId) {
  document.getElementById(modalId)?.classList.remove('open');
};

// Toast notification system
export function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let iconHtml = '<i class="fa-solid fa-circle-info toast-icon"></i>';
  if (type === 'success') iconHtml = '<i class="fa-solid fa-circle-check toast-icon"></i>';
  if (type === 'error') iconHtml = '<i class="fa-solid fa-circle-exclamation toast-icon"></i>';

  toast.innerHTML = `
    ${iconHtml}
    <div style="font-size: 0.9rem; font-weight: 500;">${message}</div>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  setTimeout(() => toast.classList.add('show'), 50);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
