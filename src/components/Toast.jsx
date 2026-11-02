import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import './Toast.css';

export default function Toast() {
  const { toast } = useCart();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.key}>
          <span className="toast__icon" aria-hidden="true">✓</span>
          <span className="toast__message">{toast.message}</span>
          <Link to="/cart" className="toast__link">
            До кошика
          </Link>
        </div>
      )}
    </div>
  );
}
