import { MENU_ITEMS, RESTAURANT_CONFIG, getLocalized } from './data.js';
import { addToCart } from './cart.js';
import { showToast } from './app.js';
import { getCurrentLang, TRANSLATIONS } from './i18n.js';
import { renderMenuItems } from './menu.js';

let favorites = [];

export function initFavorites() {
  loadFavorites();
  updateFavoritesUI();
  setupFavoritesEvents();

  window.addEventListener('languageChanged', () => {
    updateFavoritesUI();
  });
}

export function getFavorites() {
  loadFavorites();
  return favorites;
}

export function loadFavorites() {
  try {
    favorites = JSON.parse(localStorage.getItem('aura_favorites') || '[]');
  } catch (e) {
    favorites = [];
  }
  return favorites;
}

export function saveFavorites() {
  localStorage.setItem('aura_favorites', JSON.stringify(favorites));
}

export function toggleFavorite(id, btnElement) {
  loadFavorites();
  const lang = getCurrentLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.az;
  const isCurrentlyFav = favorites.includes(id);

  if (isCurrentlyFav) {
    favorites = favorites.filter(favId => favId !== id);
    saveFavorites();
    updateFavoritesUI();
    showToast(dict.fav_toast_removed || "Sevimlilərdən çıxarıldı", "info");
  } else {
    favorites.push(id);
    saveFavorites();
    updateFavoritesUI();
    showToast(dict.fav_toast_added || "Sevimlilərə əlavə olundu!", "success");
  }

  // Update card buttons if any on page
  document.querySelectorAll(`.fav-btn[data-dish-id="${id}"]`).forEach(btn => {
    const isFav = favorites.includes(id);
    btn.classList.toggle('active', isFav);
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    }
  });

  // If menu currently has favorites filter active, re-render menu
  const activeQuickFilter = document.querySelector('.quick-filter-btn.active');
  if (activeQuickFilter && activeQuickFilter.dataset.filter === 'favorites') {
    renderMenuItems();
  }
}

export function openFavorites() {
  updateFavoritesUI();
  const drawer = document.getElementById('favoritesDrawer');
  const backdrop = document.getElementById('favBackdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeFavorites() {
  const drawer = document.getElementById('favoritesDrawer');
  const backdrop = document.getElementById('favBackdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

export function updateFavoritesUI() {
  loadFavorites();
  const lang = getCurrentLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.az;
  const count = favorites.length;

  // Header counter badge
  const headerBadge = document.getElementById('headerFavCount');
  if (headerBadge) {
    headerBadge.textContent = count;
    headerBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  // Quick filter counter badge
  const filterBadge = document.getElementById('favFilterBadge');
  if (filterBadge) {
    filterBadge.textContent = count;
    filterBadge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  // Drawer title count
  const drawerCount = document.getElementById('favDrawerCount');
  if (drawerCount) {
    drawerCount.textContent = `(${count})`;
  }

  // Render items in favorites drawer
  const container = document.getElementById('favItemsList');
  const footer = document.getElementById('favFooter');
  if (!container) return;

  const favoriteItems = MENU_ITEMS.filter(item => favorites.includes(item.id));

  if (favoriteItems.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-regular fa-heart" style="color: #ef4444; font-size: 3rem; margin-bottom: 1rem;"></i>
        <h4>${dict.fav_empty_title || "Sevimlilər siyahınız boşdur"}</h4>
        <p>${dict.fav_empty_sub || "Bəyəndiyiniz təamların üzərindəki ürək ikonuna klikləyərək onları burada toplaya bilərsiniz."}</p>
        <button class="btn btn-secondary btn-sm" onclick="window.closeFavorites(); window.location.hash='#menu';">
          ${dict.cart_view_menu || "Menyuya Bax"}
        </button>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  container.innerHTML = favoriteItems.map(item => {
    const itemName = getLocalized(item, 'name', lang);
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${itemName}" class="cart-item-img" onclick="window.closeFavorites(); window.openDishDetail('${item.id}');" style="cursor: pointer;">
        <div class="cart-item-details">
          <h4 class="cart-item-name" onclick="window.closeFavorites(); window.openDishDetail('${item.id}');" style="cursor: pointer;">${itemName}</h4>
          <span class="cart-item-price">${item.price.toFixed(2)} ${RESTAURANT_CONFIG.currency}</span>
          <div style="margin-top: 0.6rem; display: flex; gap: 0.5rem; align-items: center;">
            <button class="btn btn-primary btn-sm" onclick="window.handleAddToCart('${item.id}')" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
              <i class="fa-solid fa-plus"></i> ${dict.btn_add_cart || "Səbətə At"}
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.toggleFavorite('${item.id}')" style="padding: 0.4rem 0.7rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.3);" title="${dict.fav_clear_all || 'Sil'}">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

export function addAllFavoritesToCart() {
  loadFavorites();
  const favoriteItems = MENU_ITEMS.filter(item => favorites.includes(item.id));
  if (favoriteItems.length === 0) return;

  const lang = getCurrentLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.az;

  favoriteItems.forEach(item => {
    addToCart(item, 1);
  });

  closeFavorites();
  showToast(dict.fav_item_added_all || "Bütün sevimli təamlar səbətə əlavə olundu!", "success");

  // Open cart drawer so user sees items
  if (window.openCart) {
    window.openCart();
  }
}

export function clearAllFavorites() {
  favorites = [];
  saveFavorites();
  updateFavoritesUI();
  renderMenuItems();
  const lang = getCurrentLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.az;
  showToast(dict.fav_clear_all_toast || "Bütün sevimlilər təmizləndi", "info");
}

function setupFavoritesEvents() {
  const addAllBtn = document.getElementById('addAllFavsToCartBtn');
  if (addAllBtn) {
    addAllBtn.addEventListener('click', addAllFavoritesToCart);
  }
}

// Expose to window for global inline onclicks
window.openFavorites = openFavorites;
window.closeFavorites = closeFavorites;
window.toggleFavorite = toggleFavorite;
window.clearAllFavorites = clearAllFavorites;
window.addAllFavoritesToCart = addAllFavoritesToCart;
