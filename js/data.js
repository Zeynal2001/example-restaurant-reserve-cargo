/**
 * Aura Gourmet & Lounge - Restaurant Data Store
 * Complete static data for Menu, Table Zones, Promo Codes, Reviews & Delivery Tracking
 * Fully localized for Azerbaijani (az), English (en), and Russian (ru)
 */

export const RESTAURANT_CONFIG = {
  name: "Aura Gourmet & Lounge",
  tagline: {
    az: "Lüks Qastronomiya & Zərif Dadlar",
    en: "Luxury Gastronomy & Exquisite Tastes",
    ru: "Изысканная гастрономия и роскошный вкус"
  },
  phone: "+994 (50) 890 40 40",
  whatsapp: "+994508904040",
  email: "reserve@auragourmet.az",
  address: {
    az: "Nizami küçəsi 48, Fəvvarələr Meydanı yaxınlığı, Bakı, Azərbaycan",
    en: "48 Nizami Street, near Fountains Square, Baku, Azerbaijan",
    ru: "ул. Низами 48, около Площади Фонтанов, Баку, Азербайджан"
  },
  openingHours: {
    az: "Hər gün: 11:00 – 01:00",
    en: "Every day: 11:00 – 01:00",
    ru: "Ежедневно: 11:00 – 01:00"
  },
  deliveryHours: {
    az: "Hər gün: 11:30 – 23:30",
    en: "Every day: 11:30 – 23:30",
    ru: "Ежедневно: 11:30 – 23:30"
  },
  deliveryFee: 4.00,
  freeDeliveryThreshold: 40.00,
  currency: "₼",
  devContact: "https://wa.me/994508904040?text=Salam,%20restoran%20vebsaytı%20sifarişi%20ilə%20bağlı%20əlaqə%20saxlayıram"
};

export const TABLE_ZONES = [
  {
    id: "main_hall",
    icon: "fa-music",
    name: {
      az: "Əsas Zal (Canlı Musiqi & Toy/Banket)",
      en: "Main Grand Hall (Live Music & Banquets)",
      ru: "Главный Гранд Зал (Музыка и Банкеты)"
    },
    desc: {
      az: "Zərif çilçıraqlar, canlı royal ifası və 120 nəfərlik geniş ziyafət sahəsi",
      en: "Crystal chandeliers, live piano & grand dining space up to 120 guests",
      ru: "Хрустальные люстры, рояль и просторный зал для торжеств до 120 гостей"
    }
  },
  {
    id: "terrace_sea",
    icon: "fa-cloud-sun",
    name: {
      az: "Teras & Şəhər Panoraması",
      en: "Terrace & City View",
      ru: "Терраса и Панорама"
    },
    desc: {
      az: "Təmiz hava, gecə işıqları və açıq səma mənzərəsi",
      en: "Fresh breeze, evening skyline & open sky views",
      ru: "Свежий воздух, огни вечернего Баку и открытое небо"
    }
  },
  {
    id: "vip_lounge",
    icon: "fa-crown",
    name: {
      az: "VIP Otaq (Özəl & Şöminəli)",
      en: "VIP Lounge (Private Fireplace)",
      ru: "VIP Зал (Каминный)"
    },
    desc: {
      az: "15 nəfərə qədər xüsusi ailə, nişan və işgüzar görüşlər üçün",
      en: "Exclusive room for up to 15 guests, family events & private banquets",
      ru: "Приватный зал до 15 персон для семейных праздников и закрытых встреч"
    }
  },
  {
    id: "romantic_corner",
    icon: "fa-heart",
    name: {
      az: "Romantik Şam İşıqlı Guşə",
      en: "Romantic Candlelight Corner",
      ru: "Романтический уголок"
    },
    desc: {
      az: "Cütlüklər və evlilik təklifləri üçün xüsusi çiçək və şam bəzədilməsi",
      en: "Decorated for couples, anniversaries and marriage proposals",
      ru: "Уютный уединенный столик при свечах для помолвок и свиданий"
    }
  }
];

export const TIME_SLOTS = [
  "12:00", "13:00", "14:30", "16:00", "18:00", "19:00", "20:00", "21:30", "22:30"
];

export const EVENT_OCCASIONS = [
  { id: "casual", name: { az: "Standart Nahar / Şam Yeməyi", en: "Casual Lunch / Dinner", ru: "Обычный обед / ужин" } },
  { id: "birthday", name: { az: "Ad Günü & Yubiley Qeyd etməsi", en: "Birthday & Anniversary Party", ru: "День рождения и юбилей" } },
  { id: "wedding", name: { az: "Toy Məclisi / Böyük Ziyafət", en: "Wedding Banquet / Reception", ru: "Свадебный банкет / Торжество" } },
  { id: "engagement", name: { az: "Nişan / Xınayaxdı Mərasimi", en: "Engagement / Henna Celebration", ru: "Помолвка / Хнаяхды" } },
  { id: "romantic", name: { az: "Romantik Şam & Evlilik Təklifi", en: "Romantic Proposal Dinner", ru: "Романтический ужин и предложение" } },
  { id: "corporate", name: { az: "Korporativ Tədbir / Banket", en: "Corporate Dinner & Gala", ru: "Корпоративный банкет" } },
  { id: "kids", name: { az: "Uşaq Bayramı / Şənlik", en: "Kids Birthday Celebration", ru: "Детский праздник / День рождения" } },
  { id: "business", name: { az: "İşgüzar Görüş & Danışıqlar", en: "Business Lunch / Executive Meeting", ru: "Деловая встреча / Переговоры" } }
];

export const MENU_CATEGORIES = [
  {
    id: "all",
    icon: "fa-utensils",
    name: { az: "Bütün Menyu", en: "All Menu", ru: "Всё Меню" }
  },
  {
    id: "burgers",
    icon: "fa-burger",
    name: { az: "Burgerlər", en: "Burgers", ru: "Бургеры" }
  },
  {
    id: "steaks",
    icon: "fa-fire",
    name: { az: "Steyklər & Qril", en: "Steaks & Grill", ru: "Стейки и Гриль" }
  },
  {
    id: "main",
    icon: "fa-bowl-food",
    name: { az: "Əsas Yeməklər", en: "Main Courses", ru: "Основные Блюда" }
  },
  {
    id: "seafood",
    icon: "fa-fish",
    name: { az: "Dəniz Məhsulları", en: "Seafood", ru: "Морепродукты" }
  },
  {
    id: "starters",
    icon: "fa-cheese",
    name: { az: "Qəlyanaltılar", en: "Starters & Salads", ru: "Закуски и Салаты" }
  },
  {
    id: "desserts",
    icon: "fa-cake-candles",
    name: { az: "Desertlər", en: "Desserts", ru: "Десерты" }
  },
  {
    id: "drinks",
    icon: "fa-wine-glass",
    name: { az: "İçkilər & Şərab", en: "Drinks & Wine", ru: "Напитки и Вина" }
  }
];

export const MENU_ITEMS = [
  // --- BURGERS ---
  {
    id: "dish-burger-1",
    category: "burgers",
    name: {
      az: "Aura Black Angus Truffle Burger",
      en: "Aura Black Angus Truffle Burger",
      ru: "Трюфельный Бургер Black Angus"
    },
    price: 19.00,
    badge: {
      az: "Şefin Burgeri",
      en: "Chef's Burger",
      ru: "Шеф-бургер"
    },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "200g şirəli Black Angus mal əti, kərə yağlı brioche bulkası, qara trüfel mayonezi, karamelizə edilmiş soğan, ərinmiş qırmızı çeddar pendiri və xırçıltılı kartof fri ilə.",
      en: "200g prime Black Angus patty, buttery brioche bun, black truffle aioli, caramelized onions, melted aged cheddar & golden french fries.",
      ru: "200г сочной котлеты Black Angus, сдобная булочка бриошь, трюфельный соус, карамелизованный лук, чеддер и хрустящий картофель фри."
    },
    calories: "780 kcal",
    time: { az: "15-18 dəq", en: "15-18 min", ru: "15-18 мин" },
    tags: ["populyar", "halal", "chef"],
    isPopular: true
  },
  {
    id: "dish-burger-2",
    category: "burgers",
    name: {
      az: "Smash Wagyu Bacon Cheeseburger",
      en: "Smash Wagyu Bacon Cheeseburger",
      ru: "Смэш Бургер с беконом Вагю"
    },
    price: 22.00,
    badge: {
      az: "İkiqat Ət & Çeddar",
      en: "Double Wagyu & Cheddar",
      ru: "Двойной Вагю и Чеддер"
    },
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "İkiqat qızardılmış incə Wagyu əti, xırçıltılı halal can əti bekonu, ikiqat çeddar, xüsusi hisə verilmiş barbekyu sousu və kənd xiyarı turşusu.",
      en: "Double smashed Wagyu beef, crispy halal beef bacon, double cheddar, smoked BBQ glaze and homemade pickled cucumber.",
      ru: "Двойная хрустящая котлета Вагю, хрустящий халяль бекон, двойной чеддер, копченый BBQ соус и домашние маринованные огурчики."
    },
    calories: "820 kcal",
    time: { az: "15 dəq", en: "15 min", ru: "15 мин" },
    tags: ["populyar", "halal"],
    isPopular: true
  },
  {
    id: "dish-burger-3",
    category: "burgers",
    name: {
      az: "Crispy Chicken & Jalapeño Burger",
      en: "Crispy Chicken & Jalapeño Burger",
      ru: "Хрустящий Чикен Бургер Халапеньо"
    },
    price: 16.00,
    badge: {
      az: "Xırçıltılı & Acılı",
      en: "Crispy & Spicy",
      ru: "Хрустящий и острый"
    },
    image: "https://images.unsplash.com/photo-1525164286253-04e68b9d94c6?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Xüsusi kornfleksli xırçıltılı toyuq filesi, acılı meksika jalapeno bibəri, təzə kələm coleslaw salatı və sarımsaqlı ranch sousu.",
      en: "Crispy buttermilk cornflake chicken fillet, pickled jalapeños, fresh creamy coleslaw and house ranch sauce.",
      ru: "Хрустящее куриное филе в кукурузной панировке, маринованный халапеньо, салат коулсло и соус ранч."
    },
    calories: "640 kcal",
    time: { az: "12-15 dəq", en: "12-15 min", ru: "12-15 мин" },
    tags: ["halal"]
  },

  // --- STEAKS ---
  {
    id: "dish-1",
    category: "steaks",
    name: {
      az: "Ribeye Steak Black Angus",
      en: "Ribeye Steak Black Angus",
      ru: "Рибай Стейк Блэк Ангус"
    },
    price: 48.00,
    badge: {
      az: "Şefin İmzası",
      en: "Chef's Signature",
      ru: "Фирменное блюдо"
    },
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Mərmər dərəcəli Black Angus əti, rozmarinli kərə yağı, qızardılmış çeri pomidor və tüstülənmiş dəniz duzu ilə.",
      en: "Prime marble Black Angus beef, rosemary garlic butter, charred cherry tomatoes & smoked sea salt.",
      ru: "Мраморная говядина Black Angus, розмариновое масло, томаты черри и копченая морская соль."
    },
    calories: "680 kcal",
    time: { az: "20-25 dəq", en: "20-25 min", ru: "20-25 мин" },
    tags: ["populyar", "halal", "chef"],
    isPopular: true
  },
  {
    id: "dish-2",
    category: "steaks",
    name: {
      az: "T-Bone Steak Dry-Aged",
      en: "T-Bone Steak Dry-Aged",
      ru: "Т-Бон Стейк 28 дней вызревания"
    },
    price: 56.00,
    badge: {
      az: "28 Günlük Dinləndirilmiş",
      en: "28-Day Dry-Aged",
      ru: "28 дней вызревания"
    },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Xüsusi şəraitdə 28 gün yetişdirilmiş təbii ət, qril tərəvəzlər və truffle demi-glace sousu ilə süfrəyə verilir.",
      en: "28-day aged tender beef cut, roasted vegetables and rich truffle demi-glace sauce.",
      ru: "Нежнейшее мясо 28-дневного сухого вызревания с овощами гриль и трюфельным соусом демиглас."
    },
    calories: "740 kcal",
    time: { az: "25 dəq", en: "25 min", ru: "25 мин" },
    tags: ["chef", "halal"]
  },

  // --- SEAFOOD ---
  {
    id: "dish-3",
    category: "seafood",
    name: {
      az: "Qızılbalıq Filesi (Norveç)",
      en: "Norwegian Salmon Fillet",
      ru: "Филе Норвежского Лосося"
    },
    price: 34.00,
    badge: {
      az: "Populyar",
      en: "Popular",
      ru: "Популярное"
    },
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Qızılı qabıqlı qızılbalıq filesi, quşqonmaz (sparja), limonlu kərə yağı emulsiyası və zəfəranlı püre.",
      en: "Crispy-skinned Norwegian salmon, tender asparagus, lemon butter emulsion & saffron puree.",
      ru: "Хрустящее филе атлантического лосося со спаржей, лимонным бер-бланом и шафрановым пюре."
    },
    calories: "450 kcal",
    time: { az: "18-20 dəq", en: "18-20 min", ru: "18-20 мин" },
    tags: ["populyar"],
    isPopular: true
  },
  {
    id: "dish-4",
    category: "seafood",
    name: {
      az: "Kral Krevetləri Qrildə",
      en: "Grilled King Prawns",
      ru: "Королевские Креветки Гриль"
    },
    price: 38.00,
    badge: {
      az: "Dəniz Ətri",
      en: "Fresh Ocean",
      ru: "Свежий улов"
    },
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Sarımsaqlı zeytun yağı və ağ bibərlə marinad olunmuş jumbo krevetlər, avokado salsası ilə.",
      en: "Jumbo king prawns marinated in garlic oil & herbs, served with citrus avocado salsa.",
      ru: "Гигантские королевские креветки в чесночном масле с зеленью и сальсой из авокадо."
    },
    calories: "320 kcal",
    time: { az: "15 dəq", en: "15 min", ru: "15 мин" },
    tags: ["chef"]
  },

  // --- MAIN COURSES ---
  {
    id: "dish-5",
    category: "main",
    name: {
      az: "Ördək Döş Əti Portağal Qlazuru ilə",
      en: "Duck Breast with Orange Glaze",
      ru: "Утиная грудка в апельсиновой глазури"
    },
    price: 32.00,
    badge: {
      az: "Fransız Mətbəxi",
      en: "French Classic",
      ru: "Французская классика"
    },
    image: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Xırçıltılı dəri ilə zərif ördək əti, karamelizə edilmiş körpə yerkökü və təbii portağal reduksiyası.",
      en: "Crispy skin tender duck breast, caramelized baby carrots and natural orange reduction.",
      ru: "Нежная утиная грудка с хрустящей корочкой, карамельной морковью и апельсиновым соусом."
    },
    calories: "520 kcal",
    time: { az: "22 dəq", en: "22 min", ru: "22 мин" },
    tags: ["halal"]
  },
  {
    id: "dish-6",
    category: "main",
    name: {
      az: "Truffle Fettuccine Alfredo",
      en: "Truffle Fettuccine Alfredo",
      ru: "Трюфельные Феттуччине Альфредо"
    },
    price: 24.00,
    badge: {
      az: "Əl İşi Pasta",
      en: "Handmade Pasta",
      ru: "Домашняя паста"
    },
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Təzə ev makaronu, qara trüfel yağı, 24 aylıq Parmigiano Reggiano pendiri və qaymaqlı zərif sous.",
      en: "Handmade pasta, black truffle oil, aged Parmigiano Reggiano & velvety cream sauce.",
      ru: "Домашняя свежая паста, масло черного трюфеля, пармезан 24 месяца и нежный сливочный соус."
    },
    calories: "490 kcal",
    time: { az: "15 dəq", en: "15 min", ru: "15 мин" },
    tags: ["vegetarian", "populyar"],
    isPopular: true
  },

  // --- STARTERS ---
  {
    id: "dish-7",
    category: "starters",
    name: {
      az: "Burrata & İtalyan Çeri Pomidorları",
      en: "Burrata & Heirloom Tomatoes",
      ru: "Буррата с томатами черри"
    },
    price: 19.00,
    badge: {
      az: "Təzə & Yüngül",
      en: "Fresh & Light",
      ru: "Свежее и легкое"
    },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Krem teksturalı təzə burrata pendiri, pesto sousu, qızardılmış şam fıstığı və balzamik qlazur.",
      en: "Creamy fresh burrata cheese, aromatic basil pesto, toasted pine nuts & balsamic glaze.",
      ru: "Сливочная свежая буррата, домашний песто из базилика, кедровые орешки и бальзамик."
    },
    calories: "380 kcal",
    time: { az: "8 dəq", en: "8 min", ru: "8 мин" },
    tags: ["vegetarian"]
  },
  {
    id: "dish-8",
    category: "starters",
    name: {
      az: "Mal Əti Karpaçço (Carpaccio)",
      en: "Beef Carpaccio",
      ru: "Карпаччо из говядины"
    },
    price: 22.00,
    badge: {
      az: "Şefin Tövsiyəsi",
      en: "Chef's Choice",
      ru: "Рекомендация шефа"
    },
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Nazik doğranmış xam can əti, rukola yarpaqları, kapari, parmezan yonqarları və sızma zeytun yağı.",
      en: "Thinly sliced tenderloin beef, fresh arugula, capers, parmesan shavings & cold-pressed oil.",
      ru: "Тончайшие слайсы говяжьей вырезки, руккола, каперсы, стружка пармезана и оливковое масло."
    },
    calories: "290 kcal",
    time: { az: "10 dəq", en: "10 min", ru: "10 мин" },
    tags: ["chef", "halal"]
  },

  // --- DESSERTS ---
  {
    id: "dish-9",
    category: "desserts",
    name: {
      az: "Aura Qızılı Şokolad Sferası",
      en: "Aura Golden Chocolate Sphere",
      ru: "Золотая шоколадная сфера Aura"
    },
    price: 16.00,
    badge: {
      az: "İmza Desert",
      en: "Signature Dessert",
      ru: "Авторский десерт"
    },
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "24k yeməli qızıl tozu ilə bəzədilmiş Belçika şokoladı sferası, isti karamel tökülərkən əriyən dondurma nüvəsi.",
      en: "Belgian chocolate sphere with edible 24k gold, filled with artisan gelato & warm caramel pour.",
      ru: "Бельгийская шоколадная сфера с пищевым золотом 24k, тающим мороженым и горячей карамелью."
    },
    calories: "440 kcal",
    time: { az: "10 dəq", en: "10 min", ru: "10 мин" },
    tags: ["chef", "populyar"],
    isPopular: true
  },
  {
    id: "dish-10",
    category: "desserts",
    name: {
      az: "Klassik San Sebastian Cheesecake",
      en: "Classic San Sebastian Cheesecake",
      ru: "Чизкейк Сан-Себастьян"
    },
    price: 13.00,
    badge: {
      az: "Krem Tekstura",
      en: "Creamy Texture",
      ru: "Кремовая текстура"
    },
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Yanıq qabığı və axan krem içi ilə məşhur Bask cheesecake-i, isti südlü Belçika şokoladı ilə.",
      en: "Famous burnt Basque cheesecake with gooey center and premium warm chocolate dip.",
      ru: "Знаменитый баскский обожженный чизкейк с тающей серединкой и теплым молочным шоколадом."
    },
    calories: "410 kcal",
    time: { az: "5 dəq", en: "5 min", ru: "5 мин" },
    tags: ["populyar"]
  },

  // --- DRINKS ---
  {
    id: "dish-11",
    category: "drinks",
    name: {
      az: "Aura Zəfəran & Qızılgül Mocktail",
      en: "Aura Saffron & Rose Mocktail",
      ru: "Моктейль Шафран и Роза"
    },
    price: 11.00,
    badge: {
      az: "Özəl Resept",
      en: "Signature Mocktail",
      ru: "Особый рецепт"
    },
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Yerli zəfəran ekstraktı, təbii qızılgül suyu, təzə sıxılmış qreypfrut və qazlı bulaq suyu.",
      en: "Local Absheron saffron infusion, wild rose water, fresh pink grapefruit & sparkling water.",
      ru: "Настой апшеронского шафрана, натуральная розовая вода, свежий грейпфрут и минеральная вода."
    },
    calories: "110 kcal",
    time: { az: "5 dəq", en: "5 min", ru: "5 мин" },
    tags: ["halal"]
  },
  {
    id: "dish-12",
    category: "drinks",
    name: {
      az: "Təzə Çəkilmiş Kofe & Desert Qəhvəsi",
      en: "Artisan Coffee Selection",
      ru: "Авторский свежесваренный кофе"
    },
    price: 8.00,
    badge: {
      az: "100% Arabica",
      en: "100% Arabica",
      ru: "100% Арабика"
    },
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    desc: {
      az: "Efiopiya və Kolumbiya dağ dənələrindən xüsusi qovrulmuş aromatik espresso və ya kapuçino.",
      en: "Fresh roasted Ethiopian & Colombian highland beans crafted into espresso or cappuccino.",
      ru: "Свежеобжаренные высокогорные зерна из Эфиопии и Колумбии: эспрессо или капучино."
    },
    calories: "40 kcal",
    time: { az: "5 dəq", en: "5 min", ru: "5 мин" },
    tags: ["halal"]
  }
];

export const PROMO_CODES = {
  "BAKU2026": { discountPercent: 10, label: { az: "10% Açılış Endirimi", en: "10% Opening Discount", ru: "10% Скидка на открытие" } },
  "AURA15": { discountPercent: 15, label: { az: "15% VIP Müştəri Endirimi", en: "15% VIP Discount", ru: "15% VIP Скидка" } },
  "PULSUZ": { freeDelivery: true, label: { az: "Pulsuz Çatdırılma", en: "Free Delivery", ru: "Бесплатная доставка" } }
};

export const REVIEWS = [
  {
    id: 1,
    name: "Leyla Məmmədova",
    role: {
      az: "Food Blogger & Qonaq",
      en: "Food Blogger & Foodie",
      ru: "Фуд-блогер и гость"
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: {
      az: "12 Oktyabr, 2026",
      en: "October 12, 2026",
      ru: "12 октября 2026"
    },
    text: {
      az: "Bakıda ziyarət etdiyim ən möhtəşəm ab-havaya malik restorandır. Black Angus steyk və xüsusən Terasın gecə mənzərəsi əvəzolunmazdır. Çatdırılma da 35 dəqiqəyə isti gəldi!",
      en: "One of the most exquisite dining experiences in Baku. The Black Angus steak and nighttime terrace view are unmatched. Delivery arrived steaming hot in 35 minutes!",
      ru: "Потрясающая атмосфера в самом центре Баку! Стейк Black Angus и вид с террасы просто незабываемы. Доставка карго приехала горячей всего за 35 минут!"
    }
  },
  {
    id: 2,
    name: "Rauf Əliyev",
    role: {
      az: "İş Adamı / VIP Qonaq",
      en: "Business Executive",
      ru: "Бизнесмен / VIP Гость"
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: {
      az: "18 Oktyabr, 2026",
      en: "October 18, 2026",
      ru: "18 октября 2026"
    },
    text: {
      az: "Həm sayt vasitəsilə masanı rezervasiya etmək çox rahat idi, həm də VIP otaqda təşkil olunmuş şam yeməyimiz yüksək səviyyədə keçdi. Xidmət və personal olduqca peşəkardır.",
      en: "Booking the table online was effortless. Our dinner in the private VIP room was top tier. The service staff is remarkably attentive and professional.",
      ru: "Бронировать столик онлайн через сайт невероятно удобно. Наш ужин в VIP зале прошел на высшем уровне. Персонал очень внимателен и профессионален."
    }
  },
  {
    id: 3,
    name: "Nərmin Qasımova",
    role: {
      az: "Dizayner",
      en: "Interior Designer",
      ru: "Дизайнер"
    },
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: {
      az: "22 Oktyabr, 2026",
      en: "October 22, 2026",
      ru: "22 октября 2026"
    },
    text: {
      az: "Saytın dizaynı necə zövqlüdürsə, yeməklər və qablaşdırma da bir o qədər premiumdur. Karqo çatdırılmasında hər şey xüsusi termo-qutularda çatdırılır. Əla təcrübə!",
      en: "The website aesthetics match the culinary elegance in real life. Meals in thermo-cargo packaging arrive pristine and piping hot. Remarkable standard!",
      ru: "Сайт стильный, а блюда и ресторанная подача еще лучше! Вся карго-доставка упакована в качественные термо-боксы. Обязательно закажу снова!"
    }
  }
];

export function getLocalized(obj, field, lang = 'az') {
  if (!obj || !obj[field]) return '';
  if (typeof obj[field] === 'object' && obj[field] !== null) {
    return obj[field][lang] || obj[field]['az'] || Object.values(obj[field])[0] || '';
  }
  return obj[field];
}
