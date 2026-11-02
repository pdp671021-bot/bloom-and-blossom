import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, pluralize } from '../utils/format.js';
import './CheckoutModal.css';

export default function CheckoutModal({ order, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 id="checkout-title" className="modal__title">Дякуємо за замовлення!</h2>
        <p className="modal__text">
          Замовлення <strong>№{order.number}</strong> прийнято. Наш флорист зв&apos;яжеться з вами найближчим часом
          для підтвердження доставки.
        </p>

        <dl className="modal__summary">
          <div>
            <dt>Товарів</dt>
            <dd>
              {order.totalItems} {pluralize(order.totalItems, ['товар', 'товари', 'товарів'])}
            </dd>
          </div>
          <div>
            <dt>До сплати</dt>
            <dd>{formatPrice(order.grandTotal)}</dd>
          </div>
        </dl>

        <div className="modal__actions">
          <Link to="/products" className="btn btn--primary btn--block" onClick={onClose}>
            Продовжити покупки
          </Link>
          <button ref={closeRef} type="button" className="btn btn--outline btn--block" onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
