import { Link } from 'react-router-dom';
import FlowerImage from '../components/FlowerImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { CATEGORIES, PRODUCTS, FREE_DELIVERY_FROM } from '../data/products.js';
import { formatPrice, pluralize } from '../utils/format.js';
import './Home.css';

const countLabel = (n) => `${n} ${pluralize(n, ['пропозиція', 'пропозиції', 'пропозицій'])}`;

const HERO_BOUQUET = {
  name: 'Авторський букет Bloom & Blossom',
  art: {
    variant: 'bouquet',
    flowers: ['rose:blush', 'lily:white', 'tulip:pink', 'sunflower:yellow', 'rose:red', 'tulip:purple', 'rose:white'],
    wrap: 'kraft',
  },
};

/* Обкладинки категорій */
const CATEGORY_ART = {
  roses: { variant: 'single', flowers: ['rose:red'] },
  tulips: { variant: 'single', flowers: ['tulip:pink'] },
  lilies: { variant: 'single', flowers: ['lily:white'] },
  sunflowers: { variant: 'single', flowers: ['sunflower:yellow'] },
};

const FEATURES = [
  {
    title: 'Свіжі квіти щодня',
    text: 'Отримуємо квіти від перевірених фермерів щоранку.',
    icon: 'M12 22c4-4 8-7.6 8-12a8 8 0 1 0-16 0c0 4.4 4 8 8 12z M12 6v8 M9 11l3 3 3-3',
  },
  {
    title: 'Доставка за 2 години',
    text: `Безкоштовно для замовлень від ${formatPrice(FREE_DELIVERY_FROM)}.`,
    icon: 'M3 7h11v9H3z M14 10h4l3 3v3h-7z M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    title: 'Ручна робота',
    text: 'Кожен букет збирає флорист — з увагою до деталей.',
    icon: 'M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6C19 16.6 12 21 12 21z',
  },
];

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.badge).slice(0, 4);

  return (
    <div className="home">
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero__decor hero__decor--one" aria-hidden="true" />
        <div className="hero__decor hero__decor--two" aria-hidden="true" />

        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">🌿 Квіткова крамниця</span>
            <h1 className="hero__title">
              Bloom <span>&amp;</span> Blossom
            </h1>
            <p className="hero__lead">Квіти, що говорять замість слів.</p>
            <p className="hero__description">
              Свіжі троянди, тюльпани, лілії та соняшники в авторських букетах. Збираємо з любов&apos;ю та
              доставляємо в день замовлення — для свят, побачень і просто так.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn--primary btn--lg">
                Купити зараз
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#categories" className="btn btn--outline btn--lg">
                Категорії
              </a>
            </div>
            <ul className="hero__stats">
              <li>
                <strong>16+</strong>
                <span>букетів у каталозі</span>
              </li>
              <li>
                <strong>2 год</strong>
                <span>середня доставка</span>
              </li>
              <li>
                <strong>4.9★</strong>
                <span>оцінка клієнтів</span>
              </li>
            </ul>
          </div>

          <div className="hero__visual">
            <div className="hero__image">
              <FlowerImage product={HERO_BOUQUET} />
            </div>
            <div className="hero__float hero__float--top">
              <span aria-hidden="true">🌷</span>
              <div>
                <strong>Свіжий завоз</strong>
                <small>сьогодні о 07:00</small>
              </div>
            </div>
            <div className="hero__float hero__float--bottom">
              <span aria-hidden="true">🚚</span>
              <div>
                <strong>Безкоштовна доставка</strong>
                <small>від {formatPrice(FREE_DELIVERY_FROM)}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Переваги ---------- */}
      <section className="features">
        <div className="container features__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature">
              <div className="feature__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <div>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__text">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Категорії ---------- */}
      <section className="section" id="categories">
        <div className="container">
          <div className="home__heading">
            <span className="eyebrow">Каталог</span>
            <h2 className="section-title">Оберіть свої квіти</h2>
            <p className="section-subtitle">Чотири улюблені категорії — від класичних троянд до сонячних соняшників.</p>
          </div>

          <div className="categories">
            {CATEGORIES.map((c) => (
              <Link key={c.id} to={`/products?category=${c.id}`} className="category-tile">
                <div className="category-tile__image">
                  <FlowerImage product={{ name: c.label, art: CATEGORY_ART[c.id] }} />
                </div>
                <div className="category-tile__body">
                  <h3>{c.label}</h3>
                  <p>{c.description}</p>
                  <span className="category-tile__count">
                    {countLabel(PRODUCTS.filter((p) => p.category === c.id).length)} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Популярне ---------- */}
      <section className="section home__popular">
        <div className="container">
          <div className="home__heading home__heading--row">
            <div>
              <span className="eyebrow">Популярне</span>
              <h2 className="section-title">Улюблені букети клієнтів</h2>
            </div>
            <Link to="/products" className="btn btn--outline">
              Увесь каталог
            </Link>
          </div>

          <div className="products-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <h2 className="cta__title">Подаруйте емоції вже сьогодні</h2>
              <p className="cta__text">Оформіть замовлення до 18:00 — і ми доставимо букет того ж дня.</p>
            </div>
            <Link to="/products" className="btn btn--lg cta__button">
              Обрати букет
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
