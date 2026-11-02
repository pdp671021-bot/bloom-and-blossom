import { CATEGORIES } from '../data/products.js';
import './CategoryFilter.css';

export default function CategoryFilter({ active, onChange, counts }) {
  const options = [{ id: 'all', label: 'Усі квіти', emoji: '💐' }, ...CATEGORIES];

  return (
    <div className="category-filter" role="group" aria-label="Фільтр за категорією">
      {options.map((category) => {
        const isActive = active === category.id;
        return (
          <button
            key={category.id}
            type="button"
            className={`category-filter__chip${isActive ? ' category-filter__chip--active' : ''}`}
            onClick={() => onChange(category.id)}
            aria-pressed={isActive}
          >
            <span aria-hidden="true">{category.emoji}</span>
            {category.label}
            <span className="category-filter__count">{counts[category.id] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
