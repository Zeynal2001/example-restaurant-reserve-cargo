import { MENU_ITEMS, MENU_CATEGORIES, RESTAURANT_CONFIG } from './data.js';
import { addToCart } from './cart.js';
import { showToast } from './app.js';

let activeCategory = 'all';
let searchQuery = '';
let activeFilter = 'all';

export function initMenu() {
  renderCategories();
  renderMenuItems();
  setupFilterEvents();
}

function renderCategories() {
  const container = document.getElementById('menuCategories');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map(cat => `
    <button class="cat-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
      <i class="fa-solid ${cat.icon}"></i>
      <span>${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      renderMenuItems();
    });
  });
}

export function renderMenuItems() {
  const container = document.getElementById('menuGrid');
  if (!container) return;

  const favorites = getFavorites();

  let filtered = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesQuickFilter = activeFilter === 'all' || 
      (activeFilter === 'popular' && item.isPopular) ||
      (activeFilter === 'chef' && item.tags?.includes('chef')) ||
      (activeFilter === 'vegetarian' && item.tags?.includes('vegetarian')) ||
      (activeFilter === 'halal' && item.tags?.includes('halal'));

    return matchesCategory && matchesSearch && matchesQuickFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--color-text-secondary);">
        <i class="fa-solid fa-utensils" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-accent-gold);"></i>
        <h3>Təəssüf ki, axtarışınıza uyğun yemək tapılmadı</h3>
        <p style="margin-top: 0.5rem;">Zəhmət olmasa axtarış sözünü dəyişin və ya başqa kateqoriyaya baxın.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isFav = favorites.includes(item.id);
    return `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-card-img-wrap" onclick="window.openDishDetail('${item.id}')" style="cursor: pointer;">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ''}
          <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); window.toggleFavorite('${item.id}', this)" title="Sevimlilərə əlavə et">
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>

        <div class="menu-card-body">
          <div class="dish-header">
            <h3 class="dish-name" onclick="window.openDishDetail('${item.id}')" style="cursor: pointer;">${item.name}</h3>
            <span class="dish-price">${item.price.toFixed(2)} ${RESTAURANT_CONFIG.currency}</span>
          </div>

          <p class="dish-desc">${item.desc}</p>

          <div class="dish-meta">
            ${item.calories ? `<span><i class="fa-solid fa-fire text-gold"></i> ${item.calories}</span>` : ''}
            ${item.time ? `<span><i class="fa-regular fa-clock text-gold"></i> ${item.time}</span>` : ''}
          </div>

          <div class="dish-action-row">
            <button class="add-to-cart-btn" onclick="window.handleAddToCart('${item.id}')">
              <i class="fa-solid fa-plus"></i> Səbətə At
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupFilterEvents() {
  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderMenuItems();
    });
  }

  const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
  quickFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quickFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderMenuItems();
    });
  });
}

// Global window actions for event handling
window.handleAddToCart = function(id) {
  const item = MENU_ITEMS.find(d => d.id === id);
  if (!item) return;
  addToCart(item, 1);
  showToast(`"${item.name}" səbətə əlavə olundu!`, "success");
};

window.toggleFavorite = function(id, btn) {
  let favs = getFavorites();
  const icon = btn.querySelector('i');
  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id);
    btn.classList.remove('active');
    icon.className = 'fa-regular fa-heart';
    showToast("Sevimlilərdən çıxarıldı", "info");
  } else {
    favs.push(id);
    btn.classList.add('active');
    icon.className = 'fa-solid fa-heart';
    showToast("Sevimlilərə əlavə olundu!", "success");
  }
  localStorage.setItem('aura_favorites', JSON.stringify(favs));
};

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('aura_favorites') || '[]');
  } catch (e) {
    return [];
  }
}

window.openDishDetail = function(id) {
  const item = MENU_ITEMS.find(d => d.id === id);
  if (!item) return;

  const modal = document.getElementById('dishDetailModal');
  const content = document.getElementById('dishDetailContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; max-height: 280px;">
      <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <h2 style="font-family: var(--font-serif); font-size: 1.6rem;">${item.name}</h2>
        ${item.badge ? `<span class="card-badge" style="position: static; display: inline-block; margin-top: 0.4rem;">${item.badge}</span>` : ''}
      </div>
      <div style="font-size: 1.6rem; font-weight: 800; color: var(--color-accent-gold); white-space: nowrap;">
        ${item.price.toFixed(2)} ${RESTAURANT_CONFIG.currency}
      </div>
    </div>
    <p style="color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${item.desc}</p>
    <div style="display: flex; gap: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <div>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">Kalori dəyəri</span>
        <strong style="color: var(--color-accent-gold);">${item.calories || 'Məlum deyil'}</strong>
      </div>
      <div>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">Hazırlanma vaxtı</span>
        <strong style="color: var(--color-accent-gold);">${item.time || '15-20 dəq'}</strong>
      </div>
      <div>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">Xüsusiyyət</span>
        <strong style="color: var(--color-accent-gold); text-transform: capitalize;">${item.tags?.join(', ') || 'Halal'}</strong>
      </div>
    </div>
    <div style="display: flex; gap: 1rem;">
      <button class="btn btn-primary" style="flex: 1;" onclick="window.handleAddToCart('${item.id}'); window.closeModal('dishDetailModal');">
        <i class="fa-solid fa-cart-plus"></i> Səbətə Əlavə Et (${item.price.toFixed(2)} ${RESTAURANT_CONFIG.currency})
      </button>
    </div>
  `;

  modal.classList.add('open');
};
