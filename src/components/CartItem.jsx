import FlowerImage from './FlowerImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getCategoryLabel } from '../data/products.js';
import { formatPrice } from '../utils/format.js';
import './CartItem.css';

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, updateQuantity, removeFromCart, maxQuantity } = useCart();
  const { product, quantity, lineTotal } = item;

  return (
    <li className="cart-item">
      <div className="cart-item__image">
        <FlowerImage product={product} size="sm" />
      </div>

      <div className="cart-item__info">
        <span className="cart-item__category">{getCategoryLabel(product.category)}</span>
        <h3 className="cart-item__name">{product.name}</h3>
        <span className="cart-item__unit">{formatPrice(product.price)} / шт.</span>
      </div>

      <div className="cart-item__controls">
        <div className="quantity" role="group" aria-label={`Кількість: ${product.name}`}>
          <button
            type="button"
            className="quantity__btn"
            onClick={() => decreaseQuantity(product.id)}
            disabled={quantity <= 1}
            aria-label="Зменшити кількість"
          >
            −
          </button>
          <input
            className="quantity__input"
            type="number"
            inputMode="numeric"
            min="1"
            max={maxQuantity}
            value={quantity}
            onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
            aria-label="Кількість"
          />
          <button
            type="button"
            className="quantity__btn"
            onClick={() => increaseQuantity(product.id)}
            disabled={quantity >= maxQuantity}
            aria-label="Збільшити кількість"
          >
            +
          </button>
        </div>

        <span className="cart-item__total">{formatPrice(lineTotal)}</span>

        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeFromCart(product.id)}
          aria-label={`Видалити «${product.name}» з кошика`}
          title="Видалити"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
    </li>
  );
}
