import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="not-found__code">404</span>
      <h1>Сторінку не знайдено</h1>
      <p>Схоже, ця квітка ще не розквітла. Поверніться на головну або перегляньте каталог.</p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--outline">
          На головну
        </Link>
        <Link to="/products" className="btn btn--primary">
          До квітів
        </Link>
      </div>
    </section>
  );
}
