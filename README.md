# 🐷 KOPILKA - Moliyaviy Tartib & Jamg'arma Kalendari

> Yil oxirigacha pul yig'ish jarayonini kuzatuvchi interaktiv va chiroyli moliyaviy kalendar ilovasi.

## 📋 Loyiha Haqida

**KOPILKA** - bu zamonaviy, foydalanuvchi-do'st veb-ilovasi bo'lib, sizga yillik moliyaviy maqsadlaringizni ta'qib qilish va har kuni jamg'aradigan pul miqdorini kuzatishga yordam beradi.

### 🌟 Asosiy Xususiyatlar

- 📅 **Interaktiv Kalendariy Ko'rinish** - Har bir kun uchun jamg'arilgan pul miqdorini yoki
- 💰 **Statistika Paneli** - Jami yig'ilgan pul, qolgan miqdor, kunlik tavsiya
- 🎯 **Maqsad Boshqaruvi** - Yillik maqsadingizni o'rnatish va o'zgartirish
- 📊 **Yillik Progress** - Yil oxirigacha qancha vaqt qolganini ko'rish
- 🔥 **Jamg'arma Streaki** - Ketma-ketlik qancha kun davom etganini kuzatish
- 📱 **Responsiv Dizayn** - Hamma qurilmalar uchun moxon
- 💾 **LocalStorage** - Barcha ma'lumotlar saqlaladi va tarmoq zaruri emas
- 🌙 **Qora Tema** - Tepa va ko'z uchun yaxshi dizayn

## 🚀 Boshlanish

### 1️⃣ Repozitoriyani Clone Qiling
```bash
git clone https://github.com/naimovxushnud1-ship-it/pul.git
cd pul
```

### 2️⃣ Brauzerda Ochish
```bash
# index.html faylini brauzerda oching
open index.html
# yoki
start index.html
```

Hamma! 🎉 Ilovani ishlatishga tayyor!

## 📖 Qanday Ishlatiladi

### 1. Maqsad O'rnatish
- "Yillik Maqsad" kartasida **qalam ikonkasini** bosing
- Yangi maqsad miqdorini kiriting (masalan: 10,000,000 UZS)
- **Saqlash** tugmasini bosing

### 2. Pul Qo'shish
**Usul 1: Kalendardan**
- Kalendardan istalgan kunni bosing
- Miqdor kiriting
- Izoh qo'shishingiz mumkin (ixtiyoriy)
- Tezkor tugmalar: +10k, +20k, +50k, +100k UZS
- **Saqlash** tugmasini bosing

**Usul 2: Bugunning Tezkor Qo'shishi**
- "Bugunga tezkor qo'shish" tugmasini bosing
- To'g'ridan-to'g'ri bugunning sanaiga pul kiriting

### 3. O'tkazma Ko'rish
- "Oxirgi O'tkazmalar" jadvalida barcha tranzaksiyalarni ko'ring
- Har bir qo'shilmani tahrirlash yoki o'chirish imkoniyati mavjud

### 4. Statistika Kuzatish
- **Jami Yig'ildi** - Necha pul yig'ilgan
- **Yillik Maqsad** - Helafl maqsad
- **Jamg'arma Streaki** - Ketma-ketlik qancha kun
- **Kunlik Tavsiya** - Har kuni necha so'm yig'ishingiz kerak
- **Yillik Progress** - Yil necha foiz davom etgan

## 🛠️ Texnologiyalar

- **HTML5** - Strukturaning asosi
- **CSS3** - Zamonaviy dizayn va animatsiyalar
- **JavaScript (ES6+)** - Dinamik funksionalliq
- **LocalStorage API** - Ma'lumotlar saqlash
- **FontAwesome Icons** - Chiroyli ikonkalar
- **Google Fonts (Inter, Orbitron)** - Zamonaviy shriftlar

## 📁 Fayl Strukturasi

```
pul/
├── index.html       # Asosiy HTML fayli
├── style.css        # Barcha CSS stillar
├── app.js           # JavaScript logikasi
├── README.md        # Dokumentatsiya
└── .gitignore       # Git ignore fayllar
```

## 🎨 Dizayn Xususiyatlari

- **Glass Morphism** - Zamonaviy shishah effekti
- **Dark Theme** - Ko'z uchun yumshaq qora ranglar
- **Gradient Buttons** - Chiroyli gradient ranglar
- **Smooth Animations** - Silliq animatsiyalar
- **Responsive Grid** - Har qanday ekran uchun moxon

## 💡 Foydali Maslahatlar

1. 📅 Kunlik jamg'aramni yangilashni esdan kechirmaslik uchun bugunning tezkor qo'shish tugmasini ishlating
2. 🎯 Realistik maqsad o'rnatib, kunlik tavsiyani kuzating
3. 🔥 Streakni buzsangiz, uning o'rnini yana boshlashga harakat qiling
4. 💰 Tezkor tugmalarni o'zingizga qulay miqdorlarni o'rnatib ishlatishingiz mumkin

## 🐛 Muammolarni Hal Qilish

### Ma'lumotlar O'chilib Ketsa?
- Browser'ning LocalStorage'ini tozalang:
  - DevTools (F12) → Application → LocalStorage → Clear

### Ilovani Qayta Boshlash
- CTRL + Shift + R (Windows) yoki CMD + Shift + R (Mac)

## 🔐 Ma'lumotlar Xavfsizligi

- Barcha ma'lumotlar **LocalStorage'da** saqlanadi
- Serverga yuborilmaydi
- Faqat siz foydalanuvchi brauzeringizda ko'rib olishingiz mumkin

## 🤝 Hissa Qo'shish

Agar sizda yaxshi fikrlar bo'lsa:
1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlaringizni commit qiling
4. Push qiling va Pull Request yarating

## 📝 Litsenziya

Bu loyiha **MIT Litsenziyasi** ostida. Batafsil axborot uchun [LICENSE](LICENSE) faylini ko'ring.

## 👨‍💻 Muallif

**naimovxushnud1-ship-it**

---

## 🎯 Kelasi Xususiyatlar (Roadmap)

- [ ] 📊 Grafiklarda yig'im statistikasi
- [ ] 🏆 Yugurish taxtasi (Leaderboard)
- [ ] 🔔 Bildirishnomalar va ogohlantirish
- [ ] 🌐 Multi-language qo'llab-quvvatlash
- [ ] 📤 CSV/PDF formatida eksport
- [ ] ☁️ Cloud sync (Google Drive, iCloud)
- [ ] 📱 Mobile app (React Native)

## ⭐ Agar Yoqqan Bo'lsa

Agar bu loyiha sizga yoqqan bo'lsa, iltimos ⭐ star berish esdan kechirmang! 😊

---

**Yil oxirigacha toxtash yo'q! 💪 Jamg'araning uchun esa KOPILKA! 🐷**