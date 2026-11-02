import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import { CATEGORIES, PRODUCTS } from '../data/products.js';
import { pluralize } from '../utils/format.js';
import './Products.css';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Рекомендовані' },
  { value: 'price-asc', label: 'Ціна: від низької' },
  { value: 'price-desc', label: 'Ціна: від високої' },
  { value: 'name', label: 'За назвою (А–Я)' },
];

const VALID_CATEGORIES = new Set(['all', ...CATEGORIES.map((c) => c.id)]);

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const rawCategory = searchParams.get('category') ?? 'all';
  const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : 'all';

  const counts = useMemo(() => {
    const result = { all: PRODUCTS.length };
    CATEGORIES.forEach((c) => {
      result[c.id] = PRODUCTS.filter((p) => p.category === c.id).length;
    });
    return result;
  }, []);

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'uk'));
        break;
      default:
        break;
    }
    return list;
  }, [category, query, sort]);

  function handleCategoryChange(id) {
    if (id === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: id });
    }
  }

  function resetFilters() {
    setQuery('');
    setSort('featured');
    setSearchParams({});
  }

  const activeLabel = category === 'all' ? 'Усі квіти' : CATEGORIES.find((c) => c.id === category)?.label;

  return (
    <div className="products-page">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Каталог</span>
          <h1 className="page-header__title">Наші квіти</h1>
          <p className="page-header__text">
            Обирайте букети, кошики й композиції — кожен зібраний флористом із найсвіжіших квітів.
          </p>
        </div>
      </section>

      <section className="container products-page__content">
        <CategoryFilter active={category} onChange={handleCategoryChange} counts={counts} />

        <div className="toolbar">
          <label className="toolbar__search">
            <span className="visually-hidden">Пошук квітів</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Пошук: троянди, кошик, ваза…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <div className="toolbar__right">
            <p className="toolbar__count">
              {activeLabel}: <strong>{visibleProducts.length}</strong>{' '}
              {pluralize(visibleProducts.length, ['товар', 'товари', 'товарів'])}
            </p>
            <label className="toolbar__sort">
              <span className="visually-hidden">Сортування</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="products-page__empty">
            <span aria-hidden="true">🥀</span>
            <h2>Нічого не знайдено</h2>
            <p>Спробуйте змінити запит або оберіть іншу категорію.</p>
            <button type="button" className="btn btn--primary" onClick={resetFilters}>
              Скинути фільтри
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
