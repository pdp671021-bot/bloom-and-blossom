import { useEffect, useRef, useState } from 'react';
import FlowerImage from './FlowerImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getCategoryLabel } from '../data/products.js';
import { formatPrice } from '../utils/format.js';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, quantities } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(null);
  const inCart = quantities[product.id] ?? 0;

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleAdd() {
    addToCart(product.id);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <article className="product-card">
      <div className="product-card__media">
        <FlowerImage product={product} />
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        {inCart > 0 && (
          <span className="product-card__in-cart" title="Уже в кошику">
            У кошику: {inCart}
          </span>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{getCategoryLabel(product.category)}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className={`btn btn--primary product-card__button${justAdded ? ' product-card__button--added' : ''}`}
            onClick={handleAdd}
            aria-label={`Додати «${product.name}» до кошика`}
          >
            {justAdded ? (
              <>
                <span aria-hidden="true">✓</span> Додано
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                У кошик
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
