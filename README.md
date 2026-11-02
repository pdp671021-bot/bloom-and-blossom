# 🌸 Bloom & Blossom — інтернет-магазин квітів

Адаптивний інтернет-магазин квітів на **React + Vite**. Кошик зберігається в `localStorage`, бекенд не потрібен.

## Можливості

- Головна сторінка з hero-банером, перевагами, категоріями та популярними букетами
- Каталог із 16 товарів у 4 категоріях (Троянди, Тюльпани, Лілії, Соняшники)
- Фільтр за категорією (з посиланням `?category=...`), пошук і сортування
- Кошик: додавання, видалення, зміна кількості, проміжна сума, кількість товарів, доставка, загальна сума
- Кнопки «Очистити кошик» і «Оформити замовлення» (з вікном підтвердження)
- Лічильник товарів у навбарі, сповіщення «додано до кошика»
- Збереження кошика після оновлення сторінки та синхронізація між вкладками
- Mobile-first верстка, плавні анімації, сторінка 404

## Структура проєкту

```
bloom-and-blossom/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CartItem.jsx / CartItem.css
│   │   ├── CategoryFilter.jsx / CategoryFilter.css
│   │   ├── CheckoutModal.jsx / CheckoutModal.css
│   │   ├── FlowerImage.jsx / FlowerImage.css
│   │   ├── Footer.jsx / Footer.css
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── ProductCard.jsx / ProductCard.css
│   │   ├── ScrollToTop.jsx
│   │   └── Toast.jsx / Toast.css
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Cart.jsx / Cart.css
│   │   ├── Home.jsx / Home.css
│   │   ├── NotFound.jsx / NotFound.css
│   │   └── Products.jsx / Products.css
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── format.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```

## Запуск локально

Потрібен **Node.js 18+** (перевірити: `node -v`).

```bash
npm install
npm run dev
```

Сайт відкриється на http://localhost:5173

Інші команди:

```bash
npm run build     # продакшн-збірка в папку dist/
npm run preview   # перегляд продакшн-збірки
```

## Як змінити товари або додати фото

Усі товари — у файлі `src/data/products.js`. Щоб замість ілюстрації показати справжнє фото:

1. Покладіть фото в `public/images/`, наприклад `public/images/red-roses.jpg`
2. Додайте товару поле `image: '/images/red-roses.jpg'`

Там само налаштовуються сума безкоштовної доставки (`FREE_DELIVERY_FROM`) та вартість доставки (`DELIVERY_FEE`).

## Завантаження на GitHub

1. Створіть новий репозиторій на https://github.com/new (наприклад `bloom-and-blossom`), **без** README і .gitignore.
2. У папці проєкту виконайте:

```bash
git init
git add .
git commit -m "Initial commit: Bloom & Blossom flower shop"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГІН/bloom-and-blossom.git
git push -u origin main
```

Папки `node_modules` і `dist` не потрапляють у репозиторій — це налаштовано в `.gitignore`.

Подальші зміни:

```bash
git add .
git commit -m "Опис змін"
git push
```

## Деплой на Vercel

### Варіант 1 — через сайт (рекомендовано)

1. Увійдіть на https://vercel.com через GitHub.
2. Натисніть **Add New… → Project** і оберіть репозиторій `bloom-and-blossom`.
3. Vercel сам визначить Vite. Перевірте налаштування:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Натисніть **Deploy** — за хвилину отримаєте посилання на кшталт `bloom-and-blossom.vercel.app`.

Після цього кожен `git push` у гілку `main` автоматично оновлюватиме сайт.

### Варіант 2 — через термінал

```bash
npm install -g vercel
vercel          # перший деплой (preview), відповісти на питання
vercel --prod   # деплой у продакшн
```

Файл `vercel.json` перенаправляє всі адреси на `index.html`, тому сторінки `/products` і `/cart` відкриваються напряму та після оновлення без помилки 404.
