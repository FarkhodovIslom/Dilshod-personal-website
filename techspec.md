# Texnik topshiriq: Dilshod Zayniddinov — Portfolio sayti

## 1. Loyiha haqida umumiy ma'lumot

**Maqsad:** Freelancer Dilshod Zayniddinov uchun zamonaviy, minimalistik va foydalanuvchiga qulay (user-friendly) portfolio-sayt yaratish.

**Xizmatlar (sайтда ko'rsatiladigan kategoriyalar):**
- Web development
- Mobile development
- Telegram botlar
- Telegram Mini Apps
- Web dizayn

**Dizayn yo'nalishi:** Minimalistik, chiroyli, zerikarli emas. Brutalist/terminal uslubidagi "enterprise $10k+" estetikadan voz kechilgan — bu SNG mintaqasidagi (Freelancehunt/Upwork/Telegram) real mijozlarni qo'rqitib yuborishi mumkin. O'rniga: toza, tushunarli, intuitiv UX + engil "jonli" aksentlar.

**Referens sifatida ishlatilgan hujjat** (TECHSPEC.md) dan faqat **funksionallik** olindi, dizayn va pozitsionirlash (enterprise/$10k+ vayb, soxta metrikalar, Discord/Slack jarayon tavsifi) **olib tashlandi**.

---

## 2. Texnik stack

| Qatlam | Texnologiya |
|---|---|
| Framework | Next.js (App Router, TypeScript, Strict Mode) |
| Styling | Tailwind CSS |
| Ikonkalar | Lucide React |
| Animatsiya | Framer Motion (yengil, ortiqcha bo'lmagan holda) |
| Validatsiya | Zod |
| i18n | next-intl (yoki shunga o'xshash Next.js App Router uchun mos i18n kutubxona) |
| Backend | Next.js Server Actions / API Routes (alohida NestJS-servis **kerak emas**) |
| Deploy | Vercel (yoki shunga o'xshash) |

**Struktura talabi:** modulli arxitektura — `/components/ui`, `/components/sections`, `/lib`, `/data`, `/types`, `/messages` (i18n tarjimalar uchun).

---

## 3. Til qo'llab-quvvatlash (i18n)

Sayt **3 tilda** ishlaydi:

1. **O'zbek** (default til)
2. **Ingliz**
3. **Rus**

**Talablar:**
- Barcha matnlar `/messages/{locale}.json` fayllarida saqlanadi, hech qanday matn komponent ichida hardcode qilinmaydi.
- URL struktura: `/uz/...`, `/en/...`, `/ru/...` (locale prefiksi bilan)
- Til almashtirgich (language switcher) header'da doim ko'rinib turadi.
- O'zbek tilidagi maxsus belgilar (oʻ, gʻ, ʼ) to'g'ri render bo'lishi shart — shrift tanlashda va matn encoding'ida buni tekshirish kerak.
- Lid forma va Telegram botga yuboriladigan xabarlar ham foydalanuvchi tanlagan tilda emas, balki **standart formatda** (barcha maydonlar tushunarli bo'lishi uchun) yuboriladi.

---

## 4. Dizayn tokenlari

### 4.1. Rejim (Theme)
- **Avto-almashtirgich**: Light va Dark rejim, foydalanuvchi tanlashi mumkin (toggle header'da) + `prefers-color-scheme` bo'yicha default aniqlash.
- Dark rejim brutalist emas — "yumshoq" tech-vayb, haddan tashqari kontrastsiz.

### 4.2. Rang palitrasi
- **Aksent rang:** yashil/limon (lime/green) — sochni (sочный), lekin minimalistik vaybni buzmaydigan darajada.
  - Light rejimda: to'yingan, lekin qattiq emas
  - Dark rejimda: **pasaytirilgan yorqinlik** bilan — toza lime dark fonda "kislotali" ko'rinishga aylanib ketmasligi kerak
- Neytral shkala (bg/surface/border/text) — light va dark uchun alohida, oddiy inversiya emas
- Semantik ranglar: success/warning/error (forma holatlar uchun)

### 4.3. Token nomenklaturasi (CSS variables)
```
--bg-primary / --bg-secondary / --bg-elevated (kartochkalar, modal'lar)
--border-default / --border-hover
--text-primary / --text-secondary / --text-muted
--accent / --accent-hover / --accent-muted
--success / --warning / --error
```

### 4.4. Tipografika
- **Asosiy shrift:** Nunito Sans (yoki shunga o'xshash yumshoq, gumanistik sans-serif)
- **Monospace aksent:** texnik detallar (stack, raqamlar) uchun ixtiyoriy, asosiy shrift sifatida emas
- Kirill va o'zbek lotin alifbosi (oʻ, gʻ belgilari) to'liq qo'llab-quvvatlanishi tekshiriladi

### 4.5. Radiuslar va shakl
- **Balans** — o'ta o'tkir burchaklar (brutalist) yoki o'ta yumaloq (bubble) emas
- **Har xil corner-shape** — turli komponentlarda (kartochka, tugma, badge) turlicha radius qo'llash orqali vizual xilma-xillik yaratish, lekin izchil tizim doirasida

### 4.6. Spacing va soyalar
- Rem asosida vertikal ritm, px komponent ichidagi masofalar uchun
- Soyalar minimal, faqat funksional (masalan, modal ustida)

---

## 5. Sahifa tuzilishi va funksionallik

### A. Hero bo'lim
- Sarlavha, qisqa taqdimot (kim, nima bilan shug'ullanadi)
- CTA tugmalar: "Loyiha haqida yozish" (Telegram/forma), portfolio'ga scroll

### B. Xizmatlar bo'limi
5 kategoriya kartochkalar shaklida: Web / Mobile / Telegram botlar / Mini Apps / Web dizayn

### C. Filterable Case Studies (portfolio)
- **Ma'lumotlar manbai:** alohida strongly-typed fayl (`/data/projects.ts`)
- **Filtrlash:** kategoriya bo'yicha (`Barchasi`, `Web`, `Mobile`, `Telegram botlar`, `Mini Apps`, `Dizayn`)
- **Loyiha kartochkasi:** mijoz/soha nomi, muddat, asosiy texnologiyalar (tag'lar), qisqa natija
- **Deep-dive modal** (kartochkaga bosilganda ochiladi):
  - Arxitektura/yechim qisqacha tavsifi
  - Hal qilingan asosiy texnik muammolar
  - Ekran skrinshotlari/preview
- **Muhim:** hozircha barcha loyihalar **placeholder** ma'lumotlar bilan to'ldiriladi, Dilshod keyinchalik o'z real loyihalari bilan almashtiradi. Struktura shunday qilib tuzilishi kerakki, almashtirish oson bo'lsin (bitta `projects.ts` faylida barcha ma'lumot).

### D. Interactive Project Scope & Cost Estimator
Referensdagi to'liq wizard emas, **soddalashtirilgan versiya**:
1. **1-qadam:** Loyiha turi (Web sayt, Mobile ilova, Telegram bot, Mini App, Dizayn)
2. **2-qadam:** Qo'shimcha talablar (auth, to'lov tizimi, real-time, ko'p tillilik va h.k.)
3. **Natija:** taxminiy narx oralig'i va bajarish muddati (statik hisoblash logikasi, `/lib` da)
4. Natijada "Buyurtma berish" tugmasi — pastdagi lid-formaga scroll qiladi va ma'lumotlarni oldindan to'ldiradi

### E. Ish jarayoni (Process)
4 qadamli timeline, **real jarayonga mos** (Discord/Slack emas — Telegram-first):
1. Muloqot va texnik audit (Telegram orqali)
2. Taklif va reja
3. Ishlab chiqish (bosqichma-bosqich yangilanishlar)
4. Topshirish va qo'llab-quvvatlash

### F. Lid-forma (Contact form)
- **Maydonlar:** Ism, Aloqa (Telegram/Email), Loyiha turi (agar estimator ishlatilgan bo'lsa — oldindan to'ldirilgan), Xabar/tavsif
- **Validatsiya:** Zod schema (client-side + server-side)
- **UI holatlari:** Default, Loading, Success, Error (aniq va tushunarli xabarlar bilan)

---

## 6. Backend: Lid yuborish integratsiyasi

- **Arxitektura:** Next.js Server Action → to'g'ridan-to'g'ri Telegram Bot API (`sendMessage`)
- **Baza yo'q** — lidlar faqat Telegram orqali yuboriladi, hech narsa saqlanmaydi
- Bot allaqachon mavjud — kerak bo'ladigan narsalar:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
- Xabar formati: forma to'ldirilgan barcha maydonlar + qaysi tilda yuborilgani (ixtiyoriy) tuzilgan, o'qilishi oson matn ko'rinishida botga yuboriladi
- Xatolik yuz berganda (Telegram API ishlamasa) — foydalanuvchiga aniq xato xabari, forma ma'lumotlari yo'qolmasligi kerak (qayta yuborish imkoniyati)

---

## 7. Sifat mezonlari (Quality criteria)

1. **Hydration xavfsizligi:** SSR bilan bog'liq client-only elementlar (theme toggle, til aniqlash) hydration xatoliklariga olib kelmasligi kerak
2. **Toza komponent tuzilishi:** barcha kod `app/page.tsx` ichida emas, komponentlarga bo'lingan
3. **Type safety:** 100% strict TypeScript, `any` turi ishlatilmaydi
4. **Placeholder yo'q ishlaydigan elementlarda:** barcha tugmalar, modal'lar to'liq ishlashi kerak; production kodda `console.log`/TODO bo'lmasligi kerak (portfolio ma'lumotlari bundan mustasno — ular ataylab placeholder)
5. **Build muvaffaqiyatli o'tishi:** `npm run build` xatosiz (`exit code 0`) yakunlanishi kerak
6. **i18n to'liqligi:** har uchala tilda barcha matnlar tarjima qilingan, tarjima qilinmagan qatorlar qolmagan

---

## 8. Ishga tushirilmaydigan (Out of scope)

- Alohida NestJS backend / baza (Postgres va h.k.)
- Real Discord/Slack integratsiyasi
- To'liq murakkab cost estimator (referensdagi 3-qadamli to'liq wizard, Zod schema har bir qadam uchun alohida)
- Blog/CMS funksionalligi
