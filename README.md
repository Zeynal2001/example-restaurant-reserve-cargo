# 🍽️ Aura Gourmet & Lounge — Restoran & Kafe Vebsaytı (Portfolio Nümunəsi)

Müasir, lüks dizaynlı, **tamamilə backend-siz** (Serverless, LocalStorage + WhatsApp inteqrasiyalı) və **GitHub Pages** üçün 100% hazır restoran və kafe vebsaytı şablonu.

Bu layihə restoran və kafe sahiblərinə vebsayt xidməti təklif edən developerlər üçün **real müştəri cəlb edəcək canlı portfel nümunəsi** kimi hazırlanıb.

---

## ✨ Əsas Xüsusiyyətlər

### 1. 📅 İnteraktiv Masa Rezervasiyası
- **Zonaların vizual seçimi:** Əsas Zal (Canlı musiqi), Teras (Dəniz mənzərəsi), VIP Şöminəli Otaq, Romantik Cütlük Guşəsi.
- **Tarix və Saat slotları:** Keçmiş tarixlərin qarşısının alınması, saatların seçimi.
- **Rezervasiya Kodu:** Hər qonaq üçün unikal rezervasiya kodu (məs: `REZ-84920`).
- **Rezervasiyaları Yoxla & Ləğv Et:** Müştəri daxil olub öz aktiv rezervasiyalarını görə və istəsə ləğv edə bilər.
- **WhatsApp Təsdiqi:** Rezervasiya olunan kimi restorana hazır formatlı WhatsApp mesajı göndərmək imkanı.

### 2. 🍲 Zəngin Menyu & Axtarış Sistemi
- Kateqoriyalar: *Steyklər & Qril, Əsas Yeməklər, Dəniz Məhsulları, Qəlyanaltılar, Desertlər, İçkilər*.
- Canlı axtarış və sürətli filtrlər (*Populyar, Şefin Seçimi, Halal, Vegetarian*).
- Kalori dəyəri, hazırlanma vaxtı, inqrediyentlər və allergen məlumatları.
- Təam Detalları pop-up pəncərəsi (Dish Detail Modal).
- Bəyənmə / Sevimlilər (Favorites) sistemi (`localStorage`-də yadda saxlanılır).

### 3. 🛵 Çatdırılma / Karqo & Onlayn Sifariş
- **Sürüşən Səbət (Cart Drawer):** Porsiyaların artırılıb-azaldılması, avtomatik cəm hesablama.
- **Promo Kod Sistemi:** 
  - `BAKU2026` — 10% endirim
  - `AURA15` — 15% VIP endirim
  - `PULSUZ` — Pulsuz çatdırılma
- **Çatdırılma Növləri:** Kuryerlə Qapıya Çatdırılma və ya Restorandan Gəl-Götür (Takeaway).
- **WhatsApp ilə Birbaşa Sifariş:** Restorana təamlar, saylar, ünvan, qeydlər və yekun məbləğlə birlikdə peşəkar formatlanmış WhatsApp sifariş mesajı göndərir.
- **Canlı Karqo İzləmə Simulyatoru (Live Tracking):**
  - Sifariş nömrəsi ilə canlı status izləmə (`Qəbul edildi` ➔ `Hazırlanır` ➔ `Kuryer yoldadır` ➔ `Çatdırıldı`).
  - Kuryer məlumatı və təxmini vaxt (ETA).

### 4. 🌐 Çoxdilli Dəstək (Multi-Language i18n)
- 🇦🇿 Azərbaycan dili (əsas)
- 🇬🇧 İngilis dili (English)
- 🇷🇺 Rus dili (Русский)
*(Bir kliklə menyunun və səhifənin bütün başlıqları dəyişir)*

### 5. 💎 Lüks Dizayn & Responsive Qrafika
- Obsidian/Charcoal tünd fon, zərif qızılı (`#E5B369`) vurğular, glassmorphism effektləri.
- Mobil telefon, planşet və noutbuklarda tam adaptiv (responsive).

---

## 🚀 GitHub Pages-də 1 Dəqiqəyə Deploy Etmək

Heç bir `npm build` və ya backend quraşdırması tələb olunmur! Statik HTML/CSS/JS strukturu olduğu üçün GitHub Pages-də dərhal açılır.

### Addım 1: Terminalda cari qovluğu Git ilə başladın
```bash
git init
git add .
git commit -m "feat: Restoran vebsaytı ilkin versiya"
```

### Addım 2: GitHub-da yeni repozitoriya yaradın
1. [github.com/new](https://github.com/new) ünvanına daxil olun.
2. Repozitoriyanıza ad verin (məsələn: `restaurant-reserve-cargo`).
3. **Public** seçin və yaradın.

### Addım 3: Kodu GitHub-a yükləyin
```bash
git branch -M main
git remote add origin https://github.com/istifadeci-adiniz/restaurant-reserve-cargo.git
git push -u origin main
```

### Addım 4: GitHub Pages-i Aktivləşdirin
1. Repozitoriyanızda **Settings** bölməsinə keçin.
2. Sol menyudan **Pages** seçin.
3. **Build and deployment** hissəsində:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` seçin, qovluq olaraq `/ (root)` saxlayın.
4. **Save** düyməsinə klikləyin.

🎉 **Təbriklər!** 1-2 dəqiqə ərzində saytınız bu linkdə canlı yayımda olacaq:
`https://istifadeci-adiniz.github.io/restaurant-reserve-cargo/`

---

## 🛠️ Restorana Uyğunlaşdırma (Necə Dəyişmək Olar?)

Bütün restoran məlumatları və menyu tək bir mərkəzi faylda toplanıb:  
📁 [js/data.js](file:///d:/ExampleRestaurantReserveCargo/js/data.js)

- **Restoran adı, telefon, ünvan və WhatsApp nömrəsi:** `RESTAURANT_CONFIG` obyektində dəyişin:
  ```javascript
  export const RESTAURANT_CONFIG = {
    name: "Sizin Restoranın Adı",
    phone: "+994 (50) 123 45 67",
    whatsapp: "+994501234567", // Bura sifarişlərin gedəcəyi WhatsApp nömrəsini yazın!
    address: "Bakı şəhəri, ...",
    ...
  };
  ```
- **Yeni yeməklər və qiymətlər əlavə etmək:** `MENU_ITEMS` massivinə yeni yemək əlavə edin və ya mövcud olanları dəyişin.

---

## 💼 Müştəriyə (Restoran Sahibinə) Təqdimat Tövsiyələri

1. **Saytın üst hissəsində Developer Banneri var:**  
   Restoran sahibi sayta baxanda dərhal sizinlə əlaqə saxlaya biləcəyi WhatsApp düyməsini görəcək.
2. **WhatsApp inteqrasiyasını nümayiş etdirin:**  
   Menyudan yemək seçib "WhatsApp ilə Sifariş Göndər" vurun. Müştəriyə göstərin ki, restoran işçisi heç bir mürəkkəb proqram öyrənmədən, birbaşa WhatsApp-da sifarişi səliqəli çek formasında qəbul edir.
3. **Masa rezervasiyasını göstərin:**  
   Teras, VIP otaq seçimi və rezerv kodunun çıxması restoran sahiblərinin ən çox sevdiyi vizual funksiyadır.
4. **Heç bir server xərci yoxdur:**  
   Restoran sahibinə izah edə bilərsiniz ki, bu sayt üçün aylıq bahalı server ödəmələrinə ehtiyac yoxdur, domen aldıqdan sonra ömürlük rahatlıqla işləyir.
