import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import CheckoutModal from '../components/CheckoutModal.jsx';
import { useCart } from '../context/CartContext.jsx';
import { FREE_DELIVERY_FROM } from '../data/products.js';
import { formatPrice, pluralize } from '../utils/format.js';
import './Cart.css';

export default function Cart() {
  const { items, totalItems, subtotal, delivery, grandTotal, clearCart } = useCart();
  const [order, setOrder] = useState(null);

  const leftForFreeDelivery = Math.max(FREE_DELIVERY_FROM - subtotal, 0);
  const progress = Math.min((subtotal / FREE_DELIVERY_FROM) * 100, 100);

  function handleClear() {
    if (window.confirm('Очистити кошик? Усі товари буде видалено.')) {
      clearCart();
    }
  }

  function handleCheckout() {
    // Бекенду немає — імітуємо оформлення замовлення
    setOrder({
      number: String(Date.now()).slice(-6),
      totalItems,
      grandTotal,
    });
    clearCart();
  }

  const closeModal = useCallback(() => setOrder(null), []);

  return (
    <div className="cart-page">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Ваше замовлення</span>
          <h1 className="page-header__title">Кошик</h1>
          {items.length > 0 && (
            <p className="page-header__text">
              У кошику {totalItems} {pluralize(totalItems, ['товар', 'товари', 'товарів'])} на суму{' '}
              {formatPrice(subtotal)}
            </p>
          )}
        </div>
      </section>

      <div className="container cart-page__content">
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__icon" aria-hidden="true">
              💐
            </div>
            <h2>Ваш кошик порожній</h2>
            <p>Додайте улюблені букети з каталогу — ми подбаємо про решту.</p>
            <Link to="/products" className="btn btn--primary btn--lg">
              Перейти до квітів
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              <div className="cart-list__header">
                <h2>Товари ({items.length})</h2>
                <button type="button" className="btn btn--ghost" onClick={handleClear}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  Очистити кошик
                </button>
              </div>

              <ul className="cart-list__items">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>

              <Link to="/products" className="cart-list__continue">
                ← Продовжити покупки
              </Link>
            </div>

            <aside className="summary" aria-label="Підсумок замовлення">
              <h2 className="summary__title">Підсумок</h2>

              <div className="summary__delivery">
                {leftForFreeDelivery > 0 ? (
                  <p>
                    Додайте ще <strong>{formatPrice(leftForFreeDelivery)}</strong> для безкоштовної доставки
                  </p>
                ) : (
                  <p>
                    🎉 <strong>Безкоштовна доставка</strong> вже ваша!
                  </p>
                )}
                <div className="summary__progress" aria-hidden="true">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <dl className="summary__rows">
                <div className="summary__row">
                  <dt>Кількість товарів</dt>
                  <dd>{totalItems}</dd>
                </div>
                <div className="summary__row">
                  <dt>Проміжна сума</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="summary__row">
                  <dt>Доставка</dt>
                  <dd>{delivery === 0 ? <span className="summary__free">Безкоштовно</span> : formatPrice(delivery)}</dd>
                </div>
                <div className="summary__row summary__row--total">
                  <dt>Загальна сума</dt>
                  <dd>{formatPrice(grandTotal)}</dd>
                </div>
              </dl>

              <button type="button" className="btn btn--primary btn--lg btn--block" onClick={handleCheckout}>
                Оформити замовлення
              </button>
              <p className="summary__note">🔒 Безпечне оформлення. Оплата при отриманні.</p>
            </aside>
          </div>
        )}
      </div>

      {order && <CheckoutModal order={order} onClose={closeModal} />}
    </div>
  );
}
