/**
 * Каталог товарів.
 *
 * art — опис ілюстрації для компонента FlowerImage:
 *   variant: 'bouquet' | 'basket' | 'vase' | 'single'
 *   flowers: список голівок квітів у форматі 'тип:колір'
 *            типи: rose, tulip, lily, sunflower
 *   wrap:    колір упаковки (для букетів)
 *
 * Щоб використати власні фото, додайте поле image: '/images/назва.jpg'
 * (файл покладіть у папку public/images) — картка покаже фото замість ілюстрації.
 */

export const CATEGORIES = [
  { id: 'roses', label: 'Троянди', emoji: '🌹', description: 'Класика, що говорить про почуття' },
  { id: 'tulips', label: 'Тюльпани', emoji: '🌷', description: 'Весняний настрій цілий рік' },
  { id: 'lilies', label: 'Лілії', emoji: '🪷', description: 'Витонченість і чарівний аромат' },
  { id: 'sunflowers', label: 'Соняшники', emoji: '🌻', description: 'Сонце у вашому домі' },
];

export const PRODUCTS = [
  // ---------- Троянди ----------
  {
    id: 'red-rose-bouquet',
    name: 'Букет червоних троянд',
    category: 'roses',
    price: 1450,
    description: 'Сім пишних червоних троянд у крафтовій упаковці.',
    badge: 'Хіт',
    art: { variant: 'bouquet', flowers: Array(7).fill('rose:red'), wrap: 'kraft' },
  },
  {
    id: 'white-rose-bouquet',
    name: 'Букет білих троянд',
    category: 'roses',
    price: 1550,
    description: 'Ніжні білі троянди — ідеально для весілля чи освідчення.',
    art: { variant: 'bouquet', flowers: Array(7).fill('rose:white'), wrap: 'sage' },
  },
  {
    id: 'pink-rose-tenderness',
    name: 'Рожеві троянди «Ніжність»',
    category: 'roses',
    price: 1250,
    description: "П'ять рожевих троянд з евкаліптом у пастельній упаковці.",
    art: { variant: 'bouquet', flowers: Array(5).fill('rose:pink'), wrap: 'blush' },
  },
  {
    id: 'blush-rose-basket',
    name: 'Кошик троянд «Пудра»',
    category: 'roses',
    price: 1890,
    description: 'Плетений кошик із пудровими та білими трояндами.',
    art: {
      variant: 'basket',
      flowers: ['rose:blush', 'rose:white', 'rose:blush', 'rose:blush', 'rose:white', 'rose:blush', 'rose:blush'],
    },
  },

  // ---------- Тюльпани ----------
  {
    id: 'pink-tulips',
    name: 'Рожеві тюльпани',
    category: 'tulips',
    price: 790,
    description: 'Сім свіжих рожевих тюльпанів — символ весни та радості.',
    badge: 'Новинка',
    art: { variant: 'bouquet', flowers: Array(7).fill('tulip:pink'), wrap: 'white' },
  },
  {
    id: 'yellow-tulips',
    name: 'Жовті тюльпани',
    category: 'tulips',
    price: 750,
    description: 'Яскраві жовті тюльпани, що піднімають настрій.',
    art: { variant: 'bouquet', flowers: Array(7).fill('tulip:yellow'), wrap: 'kraft' },
  },
  {
    id: 'purple-tulips-vase',
    name: 'Фіолетові тюльпани у вазі',
    category: 'tulips',
    price: 950,
    description: "П'ять глибоких фіолетових тюльпанів у скляній вазі.",
    art: { variant: 'vase', flowers: Array(5).fill('tulip:purple') },
  },
  {
    id: 'rainbow-tulip-mix',
    name: 'Райдужний мікс тюльпанів',
    category: 'tulips',
    price: 1100,
    description: 'Різнокольорові тюльпани для найяскравіших свят.',
    art: {
      variant: 'bouquet',
      flowers: ['tulip:red', 'tulip:yellow', 'tulip:purple', 'tulip:pink', 'tulip:orange', 'tulip:white', 'tulip:yellow'],
      wrap: 'white',
    },
  },

  // ---------- Лілії ----------
  {
    id: 'white-lily-bouquet',
    name: 'Букет білих лілій',
    category: 'lilies',
    price: 1190,
    description: "П'ять білосніжних лілій із тонким ароматом.",
    art: { variant: 'bouquet', flowers: Array(5).fill('lily:white'), wrap: 'sage' },
  },
  {
    id: 'premium-lily-collection',
    name: 'Преміум-колекція лілій',
    category: 'lilies',
    price: 2290,
    description: 'Розкішна композиція з білих, рожевих і помаранчевих лілій.',
    badge: 'Преміум',
    art: {
      variant: 'basket',
      flowers: ['lily:white', 'lily:pink', 'lily:orange', 'lily:white', 'lily:pink', 'lily:white', 'lily:orange'],
    },
  },
  {
    id: 'pink-stargazer-lilies',
    name: 'Рожеві лілії «Старгейзер»',
    category: 'lilies',
    price: 1290,
    description: 'Яскраві рожеві лілії з виразними цятками.',
    art: { variant: 'bouquet', flowers: Array(5).fill('lily:pink'), wrap: 'blush' },
  },
  {
    id: 'orange-lily-vase',
    name: 'Помаранчеві лілії у вазі',
    category: 'lilies',
    price: 1350,
    description: 'Теплі помаранчеві лілії у стильній вазі — готовий подарунок.',
    art: { variant: 'vase', flowers: Array(3).fill('lily:orange') },
  },

  // ---------- Соняшники ----------
  {
    id: 'sunflower-basket',
    name: 'Кошик соняшників',
    category: 'sunflowers',
    price: 1090,
    description: "П'ять великих соняшників у плетеному кошику.",
    badge: 'Хіт',
    art: { variant: 'basket', flowers: Array(5).fill('sunflower:yellow') },
  },
  {
    id: 'summer-sunflower-mix',
    name: 'Літній мікс із соняшниками',
    category: 'sunflowers',
    price: 1250,
    description: 'Соняшники з жовтими тюльпанами — справжнє літо в букеті.',
    art: {
      variant: 'bouquet',
      flowers: ['sunflower:yellow', 'tulip:yellow', 'sunflower:yellow', 'tulip:orange', 'sunflower:yellow', 'tulip:yellow', 'sunflower:yellow'],
      wrap: 'kraft',
    },
  },
  {
    id: 'single-sunflower',
    name: 'Соняшник поштучно',
    category: 'sunflowers',
    price: 190,
    description: 'Один великий соняшник зі стрічкою — маленька радість.',
    art: { variant: 'single', flowers: ['sunflower:yellow'] },
  },
  {
    id: 'sunflower-rose-duo',
    name: 'Дует: соняшники й троянди',
    category: 'sunflowers',
    price: 1590,
    description: 'Сміливе поєднання сонячних соняшників і червоних троянд.',
    art: {
      variant: 'bouquet',
      flowers: ['sunflower:yellow', 'rose:red', 'sunflower:yellow', 'rose:red', 'sunflower:yellow', 'rose:red', 'rose:red'],
      wrap: 'kraft',
    },
  },
];

export const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export function getCategoryLabel(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.label ?? '';
}

/** Безкоштовна доставка від цієї суми */
export const FREE_DELIVERY_FROM = 1500;
/** Вартість доставки, якщо сума замовлення менша */
export const DELIVERY_FEE = 150;
