/**
 * Lightweight Multi-Language (i18n) module
 * Supports AZ (Azərbaycan), EN (English), RU (Русский)
 */

export const TRANSLATIONS = {
  az: {
    nav_home: "Ana Səhifə",
    nav_about: "Haqqımızda",
    nav_menu: "Menyu & Sifariş",
    nav_reserve: "Masa Rezervi",
    nav_cargo: "Çatdırılma / Karqo",
    nav_reviews: "Rəylər",
    nav_contact: "Əlaqə",
    hero_badge: "İndi Açıqdır • Sürətli Çatdırılma 30-45 dəq",
    hero_title: "Zərif Zövqlərin və Qastronomiyanın Əsl Məkanı",
    hero_desc: "Aura Gourmet & Lounge — canlı royal melodiyaları, təcrübəli şeflərimizin lüks steykləri və dəniz məhsulları ilə unudulmaz təəssürat yaradır.",
    hero_btn_reserve: "Masa Rezerv Et",
    hero_btn_menu: "Onlayn Menyu & Karqo",
    hero_stat_exp: "İllik Təcrübə",
    hero_stat_dishes: "Lüks Resept",
    hero_stat_rating: "Müştəri Razılığı",
    strip_fresh: "Təzə İnqrediyentlər",
    strip_fresh_sub: "100% Təbii və Halal Məhsullar",
    strip_chef: "Usta Şeflər",
    strip_chef_sub: "Beynəlxalq Təcrübəli Heyət",
    strip_cargo: "Sürətli Karqo",
    strip_cargo_sub: "Termo-qutuda İsti Çatdırılma",
    strip_live: "Canlı Musiqi",
    strip_live_sub: "Hər axşam Royal və Caz"
  },
  en: {
    nav_home: "Home",
    nav_about: "About Us",
    nav_menu: "Menu & Order",
    nav_reserve: "Reservation",
    nav_cargo: "Delivery / Cargo",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    hero_badge: "Open Now • Fast Delivery 30-45 mins",
    hero_title: "Where Culinary Art Meets Luxurious Ambience",
    hero_desc: "Aura Gourmet & Lounge — offering prime steaks, fresh seafood, and live piano evenings in the heart of Baku.",
    hero_btn_reserve: "Book a Table",
    hero_btn_menu: "Explore Menu & Order",
    hero_stat_exp: "Years Experience",
    hero_stat_dishes: "Signature Dishes",
    hero_stat_rating: "Guest Satisfaction",
    strip_fresh: "Fresh Ingredients",
    strip_fresh_sub: "100% Organic & Halal Certified",
    strip_chef: "Master Chefs",
    strip_chef_sub: "International Culinary Team",
    strip_cargo: "Express Cargo",
    strip_cargo_sub: "Hot Delivery in Thermo-Boxes",
    strip_live: "Live Music",
    strip_live_sub: "Piano & Jazz Every Evening"
  },
  ru: {
    nav_home: "Главная",
    nav_about: "О нас",
    nav_menu: "Меню и Заказ",
    nav_reserve: "Бронь стола",
    nav_cargo: "Доставка / Карго",
    nav_reviews: "Отзывы",
    nav_contact: "Контакты",
    hero_badge: "Открыто • Быстрая доставка 30-45 мин",
    hero_title: "Изысканный вкус и роскошная атмосфера",
    hero_desc: "Aura Gourmet & Lounge — сочные стейки, свежие морепродукты и живая музыка рояля в центре Баку.",
    hero_btn_reserve: "Забронировать стол",
    hero_btn_menu: "Онлайн меню и заказ",
    hero_stat_exp: "Лет опыта",
    hero_stat_dishes: "Авторских блюд",
    hero_stat_rating: "Довольных гостей",
    strip_fresh: "Свежие продукты",
    strip_fresh_sub: "100% Натуральное и Халяль",
    strip_chef: "Мастера шефы",
    strip_chef_sub: "Международный опыт",
    strip_cargo: "Экспресс Карго",
    strip_cargo_sub: "Горячая термо-доставка",
    strip_live: "Живая музыка",
    strip_live_sub: "Рояль и джаз каждый вечер"
  }
};

let currentLang = 'az';

export function initI18n() {
  currentLang = localStorage.getItem('aura_lang') || 'az';
  applyLanguage(currentLang);
  setupLanguageDropdown();
}

export function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'az';
  currentLang = lang;
  localStorage.setItem('aura_lang', lang);

  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) {
    langLabel.textContent = lang.toUpperCase();
  }

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

function setupLanguageDropdown() {
  const btn = document.getElementById('langToggleBtn');
  const dropdown = document.getElementById('langDropdown');

  if (btn && dropdown) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const selected = opt.dataset.lang;
        applyLanguage(selected);
        dropdown.classList.remove('open');
      });
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
  }
}
