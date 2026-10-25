/**
 * Aura Gourmet & Lounge - Restaurant Data Store
 * Complete static data for Menu, Table Zones, Promo Codes, Reviews & Delivery Tracking
 */

export const RESTAURANT_CONFIG = {
  name: "Aura Gourmet & Lounge",
  tagline: "Lüks Qastronomiya & Zərif Dadlar",
  phone: "+994 (50) 890 40 40",
  whatsapp: "+994508904040",
  email: "reserve@auragourmet.az",
  address: "Nizami küçəsi 48, Fəvvarələr Meydanı, Bakı, Azərbaycan",
  openingHours: "Hər gün: 11:00 – 01:00",
  deliveryHours: "Hər gün: 11:30 – 23:30",
  deliveryFee: 4.00,
  freeDeliveryThreshold: 40.00,
  currency: "₼",
  devContact: "https://wa.me/994508904040?text=Salam,%20restoran%20vebsaytı%20sifarişi%20ilə%20bağlı%20əlaqə%20saxlayıram"
};

export const TABLE_ZONES = [
  {
    id: "main_hall",
    name: "Əsas Zal (Canlı Musiqi)",
    icon: "fa-music",
    desc: "Zərif çilçıraqlar, canlı royal ifası və geniş atmosfer"
  },
  {
    id: "terrace_sea",
    name: "Teras & Şəhər Panoraması",
    icon: "fa-cloud-sun",
    desc: "Təmiz hava, gecə işıqları və açıq səma mənzərəsi"
  },
  {
    id: "vip_lounge",
    name: "VIP Otaq (Özəl & Şöminəli)",
    icon: "fa-crown",
    desc: "10 nəfərə qədər xüsusi ailə və işgüzar görüşlər üçün"
  },
  {
    id: "romantic_corner",
    name: "Romantik Şam İşıqlı Guşə",
    icon: "fa-heart",
    desc: "Cütlüklər üçün xüsusi bəzədilmiş sakit və təcrid olunmuş masa"
  }
];

export const TIME_SLOTS = [
  "12:00", "13:00", "14:30", "16:00", "18:00", "19:00", "20:00", "21:30", "22:30"
];

export const MENU_CATEGORIES = [
  { id: "all", name: "Bütün Menyu", icon: "fa-utensils" },
  { id: "steaks", name: "Steyklər & Qril", icon: "fa-fire" },
  { id: "main", name: "Əsas Yeməklər", icon: "fa-bowl-food" },
  { id: "seafood", name: "Dəniz Məhsulları", icon: "fa-fish" },
  { id: "starters", name: "Qəlyanaltılar", icon: "fa-cheese" },
  { id: "desserts", name: "Desertlər", icon: "fa-cake-candles" },
  { id: "drinks", name: "İçkilər & Şərab", icon: "fa-wine-glass" }
];

export const MENU_ITEMS = [
  {
    id: "dish-1",
    category: "steaks",
    name: "Ribeye Steak Black Angus",
    price: 48.00,
    badge: "Şefin İmzası",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
    desc: "Mərmər dərəcəli Black Angus əti, rozmarinli kərə yağı, qızardılmış çeri pomidor və tüstülənmiş dəniz duzu ilə.",
    calories: "680 kcal",
    time: "20-25 dəq",
    tags: ["populyar", "halal", "chef"],
    isPopular: true
  },
  {
    id: "dish-2",
    category: "steaks",
    name: "T-Bone Steak Dry-Aged",
    price: 56.00,
    badge: "28 Günlü Dinləndirilmiş",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    desc: "Xüsusi şəraitdə 28 gün yetişdirilmiş təbii ət, qril tərəvəzlər və truffle demi-glace sousu ilə süfrəyə verilir.",
    calories: "740 kcal",
    time: "25 dəq",
    tags: ["chef", "halal"]
  },
  {
    id: "dish-3",
    category: "seafood",
    name: "Qızılbalıq Filesi (Norveç)",
    price: 34.00,
    badge: "Populyar",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80",
    desc: "Qızılı qabıqlı qızılbalıq filesi, quşqonmaz (sparja), limonlu kərə yağı emulsiyası və zəfəranlı püre.",
    calories: "450 kcal",
    time: "18-20 dəq",
    tags: ["populyar"],
    isPopular: true
  },
  {
    id: "dish-4",
    category: "seafood",
    name: "Kral Krevetləri Qrildə",
    price: 38.00,
    badge: "Dəniz Ətri",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=80",
    desc: "Sarımsaqlı zeytun yağı və ağ bibərlə marinad olunmuş jumbo krevetlər, avokado salsası ilə.",
    calories: "320 kcal",
    time: "15 dəq",
    tags: ["chef"]
  },
  {
    id: "dish-5",
    category: "main",
    name: "Ördək Döş Əti Portağal Qlazuru ilə",
    price: 32.00,
    badge: "Fransız Mətbəxi",
    image: "https://images.unsplash.com/photo-1514944298352-f47285145b59?auto=format&fit=crop&w=700&q=80",
    desc: "Xırçıltılı dəri ilə zərif ördək əti, karamelizə edilmiş körpə yerkökü və təbii portağal reduksiyası.",
    calories: "520 kcal",
    time: "22 dəq",
    tags: ["halal"]
  },
  {
    id: "dish-6",
    category: "main",
    name: "Truffle Fettuccine Alfredo",
    price: 24.00,
    badge: "Əl İşi Pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=700&q=80",
    desc: "Təzə ev makaronu, qara trüfel yağı, 24 aylıq Parmigiano Reggiano pendiri və qaymaqlı zərif sous.",
    calories: "490 kcal",
    time: "15 dəq",
    tags: ["vegetarian", "populyar"],
    isPopular: true
  },
  {
    id: "dish-7",
    category: "starters",
    name: "Burrata & İtalyan Çeri Pomidorları",
    price: 19.00,
    badge: "Təzə & Yüngül",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910609a?auto=format&fit=crop&w=700&q=80",
    desc: "Krem teksturalı təzə burrata pendiri, pesto sousu, qızardılmış şam fıstığı və balzamik qlazur.",
    calories: "380 kcal",
    time: "8 dəq",
    tags: ["vegetarian"]
  },
  {
    id: "dish-8",
    category: "starters",
    name: "Mal Əti Karpaçço (Carpaccio)",
    price: 22.00,
    badge: "Şefin Tövsiyəsi",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80",
    desc: "Nazik doğranmış xam can əti, rukola yarpaqları, kapari, parmezan yonqarları və sızma zeytun yağı.",
    calories: "290 kcal",
    time: "10 dəq",
    tags: ["chef", "halal"]
  },
  {
    id: "dish-9",
    category: "desserts",
    name: "Aura Qızılı Şokolad Sferası",
    price: 16.00,
    badge: "İmza Desert",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=700&q=80",
    desc: "24k yeməli qızıl tozu ilə bəzədilmiş Belçika şokoladı sferası, isti karamel tökülərkən əriyən dondurma nüvəsi.",
    calories: "440 kcal",
    time: "10 dəq",
    tags: ["chef", "populyar"],
    isPopular: true
  },
  {
    id: "dish-10",
    category: "desserts",
    name: "Klassik San Sebastian Cheesecake",
    price: 13.00,
    badge: "Krem Tekstura",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
    desc: "Yanıq qabığı və axan krem içi ilə məşhur Bask cheesecake-i, isti südlü Belçika şokoladı ilə.",
    calories: "410 kcal",
    time: "5 dəq",
    tags: ["populyar"]
  },
  {
    id: "dish-11",
    category: "drinks",
    name: "Aura Zəfəran & Qızılgül Mocktail",
    price: 11.00,
    badge: "Özəl Resept",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    desc: "Yerli zəfəran ekstraktı, təbii qızılgül suyu, təzə sıxılmış qreypfrut və qazlı bulaq suyu.",
    calories: "110 kcal",
    time: "5 dəq",
    tags: ["halal"]
  },
  {
    id: "dish-12",
    category: "drinks",
    name: "Təzə Çəkilmiş Kofe & Desert Qəhvəsi",
    price: 8.00,
    badge: "100% Arabica",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    desc: "Efiopiya və Kolumbiya dağ dənələrindən xüsusi qovrulmuş aromatik espresso və ya kapuçino.",
    calories: "40 kcal",
    time: "5 dəq",
    tags: ["halal"]
  }
];

export const PROMO_CODES = {
  "BAKU2026": { discountPercent: 10, label: "10% Açılış Endirimi" },
  "AURA15": { discountPercent: 15, label: "15% VIP Müştəri Endirimi" },
  "PULSUZ": { freeDelivery: true, label: "Pulsuz Çatdırılma" }
};

export const REVIEWS = [
  {
    id: 1,
    name: "Leyla Məmmədova",
    role: "Food Blogger & Qonaq",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "12 Oktyabr, 2026",
    text: "Bakıda ziyarət etdiyim ən möhtəşəm ab-havaya malik restorandır. Black Angus steyk və xüsusən Terasın gecə mənzərəsi əvəzolunmazdır. Çatdırılma da 35 dəqiqəyə isti gəldi!"
  },
  {
    id: 2,
    name: "Rauf Əliyev",
    role: "İş Adamı / VIP Qonaq",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "18 Oktyabr, 2026",
    text: "Həm sayt vasitəsilə masanı rezervasiya etmək çox rahat idi, həm də VIP otaqda təşkil olunmuş şam yeməyimiz yüksək səviyyədə keçdi. Xidmət və personal olduqca peşəkardır."
  },
  {
    id: 3,
    name: "Nərmin Qasımova",
    role: "Dizayner",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "22 Oktyabr, 2026",
    text: "Saytın dizaynı necə zövqlüdürsə, yeməklər və qablaşdırma da bir o qədər premiumdur. Karqo çatdırılmasında hər şey xüsusi termo-qutularda çatdırılır. Əla təcrübə!"
  }
];
