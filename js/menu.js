import { MENU_ITEMS, MENU_CATEGORIES, RESTAURANT_CONFIG, getLocalized } from './data.js';
import { addToCart } from './cart.js';
import { showToast } from './app.js';
import { getCurrentLang, TRANSLATIONS } from './i18n.js';
import { getFavorites, toggleFavorite } from './favorites.js';

let activeCategory = 'all';
let searchQuery = '';
let activeFilter = 'all';

export function initMenu() {
  renderCategories();
  renderMenuItems();
  setupFilterEvents();

  // Re-render when language changes
  window.addEventListener('languageChanged', () => {
    renderCategories();
    renderMenuItems();
  });
}

function renderCategories() {
  const container = document.getElementById('menuCategories');
  if (!container) return;
  const lang = getCurrentLang();

  container.innerHTML = MENU_CATEGORIES.map(cat => {
    const name = getLocalized(cat, 'name', lang);
    return `
      <button class="cat-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${name}</span>
      </button>
    `;
  }).join('');

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
  const lang = getCurrentLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['az'];
  const favorites = getFavorites();

  let filtered = MENU_ITEMS.filter(item => {
    const itemName = getLocalized(item, 'name', lang).toLowerCase();
    const itemDesc = getLocalized(item, 'desc', lang).toLowerCase();
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = itemName.includes(searchQuery.toLowerCase()) || 
                          itemDesc.includes(searchQuery.toLowerCase());
    const matchesQuickFilter = activeFilter === 'all' || 
      (activeFilter === 'popular' && item.isPopular) ||
      (activeFilter === 'chef' && item.tags?.includes('chef')) ||
      (activeFilter === 'vegetarian' && item.tags?.includes('vegetarian')) ||
      (activeFilter === 'halal' && item.tags?.includes('halal')) ||
      (activeFilter === 'favorites' && favorites.includes(item.id));

    return matchesCategory && matchesSearch && matchesQuickFilter;
  });

  if (filtered.length === 0) {
    if (activeFilter === 'favorites') {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--color-text-secondary);">
          <i class="fa-regular fa-heart" style="font-size: 3.2rem; margin-bottom: 1.2rem; color: #ef4444;"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-text-primary); margin-bottom: 0.6rem;">${dict.fav_empty_title || "Sevimlilər siyahınız boşdur"}</h3>
          <p style="font-size: 0.95rem; max-width: 480px; margin: 0 auto 1.5rem;">${dict.fav_empty_sub || "Bəyəndiyiniz təamların üzərindəki ürək ikonuna klikləyərək onları burada toplaya bilərsiniz."}</p>
          <button class="btn btn-secondary btn-sm" onclick="document.querySelector('.quick-filter-btn[data-filter=\\'all\\']').click()">
            <i class="fa-solid fa-utensils"></i> ${dict.filter_all || "Bütün Menyu"}
          </button>
        </div>
      `;
      return;
    }

    const emptyMsg = {
      az: { title: "Axtarışınıza uyğun təam tapılmadı", sub: "Zəhmət olmasa axtarış sözünü dəyişin və ya başqa kateqoriyaya baxın." },
      en: { title: "No culinary items matched your search", sub: "Please try another keyword or browse different categories." },
      ru: { title: "Блюда не найдены", sub: "Пожалуйста, измените запрос поиска или выберите другую категорию." }
    }[lang] || { title: "Təam tapılmadı", sub: "Zəhmət olmasa yenidən yoxlayın." };

    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--color-text-secondary);">
        <i class="fa-solid fa-utensils" style="font-size: 2.8rem; margin-bottom: 1rem; color: var(--color-accent-gold);"></i>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-text-primary);">${emptyMsg.title}</h3>
        <p style="margin-top: 0.5rem; font-size: 0.95rem;">${emptyMsg.sub}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isFav = favorites.includes(item.id);
    const name = getLocalized(item, 'name', lang);
    const desc = getLocalized(item, 'desc', lang);
    const badge = getLocalized(item, 'badge', lang);
    const prepTime = getLocalized(item, 'time', lang);
    const addBtnText = dict.btn_add_cart || "Səbətə At";

    return `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-card-img-wrap" onclick="window.openDishDetail('${item.id}')" style="cursor: pointer;">
          <img src="${item.image}" alt="${name}" loading="lazy">
          ${badge ? `<span class="card-badge">${badge}</span>` : ''}
          <button class="fav-btn ${isFav ? 'active' : ''}" data-dish-id="${item.id}" onclick="event.stopPropagation(); window.toggleFavorite('${item.id}', this)" title="${dict.fav_drawer_title || 'Sevimlilər'}">
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>

        <div class="menu-card-body">
          <div class="dish-header">
            <h3 class="dish-name" onclick="window.openDishDetail('${item.id}')" style="cursor: pointer;">${name}</h3>
            <span class="dish-price">${item.price.toFixed(2)} ${RESTAURANT_CONFIG.currency}</span>
          </div>

          <p class="dish-desc">${desc}</p>

          <div class="dish-meta">
            ${item.calories ? `<span><i class="fa-solid fa-fire text-gold"></i> ${item.calories}</span>` : ''}
            ${prepTime ? `<span><i class="fa-regular fa-clock text-gold"></i> ${prepTime}</span>` : ''}
          </div>

          <div class="dish-action-row">
            <button class="add-to-cart-btn" onclick="window.handleAddToCart('${item.id}')">
              <i class="fa-solid fa-plus"></i> ${addBtnText}
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
  const lang = getCurrentLang();
  const name = getLocalized(item, 'name', lang);
  addToCart(item, 1);

  const toastMsg = {
    az: `"${name}" səbətə əlavə olundu!`,
    en: `"${name}" added to cart!`,
    ru: `"${name}" добавлено в корзину!`
  }[lang] || `"${name}" added!`;

  showToast(toastMsg, "success");
};


window.openDishDetail = function(id) {
  const item = MENU_ITEMS.find(d => d.id === id);
  if (!item) return;
  const lang = getCurrentLang();
  const name = getLocalized(item, 'name', lang);
  const desc = getLocalized(item, 'desc', lang);
  const badge = getLocalized(item, 'badge', lang);
  const time = getLocalized(item, 'time', lang);

  const labels = {
    az: { cal: "Kalori dəyəri", time: "Hazırlanma vaxtı", feat: "Xüsusiyyət", add: "Səbətə Əlavə Et" },
    en: { cal: "Calories", time: "Prep Time", feat: "Features", add: "Add to Order Cart" },
    ru: { cal: "Калорийность", time: "Время готовки", feat: "Особенности", add: "Добавить в корзину" }
  }[lang] || { cal: "Kalori", time: "Vaxt", feat: "Xüsusiyyət", add: "Səbətə At" };

  const modal = document.getElementById('dishDetailModal');
  const content = document.getElementById('dishDetailContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; max-height: 280px;">
      <img src="${item.image}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; gap: 1rem;">
      <div>
        <h2 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-text-primary);">${name}</h2>
        ${badge ? `<span class="card-badge" style="position: static; display: inline-block; margin-top: 0.4rem;">${badge}</span>` : ''}
      </div>
      <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-accent-gold); white-space: nowrap;">
        ${item.price.toFixed(2)} ${RESTAURANT_CONFIG.currency}
      </div>
    </div>
    <p style="color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${desc}</p>
    <div style="display: flex; gap: 1rem; padding: 1rem; background: var(--card-subtle-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); margin-bottom: 1.5rem; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 100px;">
        <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">${labels.cal}</span>
        <strong style="color: var(--color-accent-gold);">${item.calories || '450 kcal'}</strong>
      </div>
      <div style="flex: 1; min-width: 100px;">
        <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">${labels.time}</span>
        <strong style="color: var(--color-accent-gold);">${time || '15-20 min'}</strong>
      </div>
      <div style="flex: 1; min-width: 100px;">
        <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">${labels.feat}</span>
        <strong style="color: var(--color-accent-gold); text-transform: capitalize;">${item.tags?.join(', ') || 'Halal'}</strong>
      </div>
    </div>
    <div style="display: flex; gap: 1rem;">
      <button class="btn btn-primary" style="width: 100%;" onclick="window.handleAddToCart('${item.id}'); window.closeModal('dishDetailModal');">
        <i class="fa-solid fa-cart-plus"></i> ${labels.add} (${item.price.toFixed(2)} ${RESTAURANT_CONFIG.currency})
      </button>
    </div>
  `;

  modal.classList.add('open');
};
