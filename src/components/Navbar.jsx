import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import Logo from './Logo.jsx';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Головна', end: true },
  { to: '/products', label: 'Квіти' },
];

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const location = useLocation();

  // Закриваємо мобільне меню при переході на іншу сторінку
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Тінь під навбаром при прокрутці
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Анімація лічильника при зміні кількості
  useEffect(() => {
    if (totalItems === 0) return undefined;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 350);
    return () => clearTimeout(timer);
  }, [totalItems]);

  const linkClass = ({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`;

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Головна навігація">
        <Link to="/" className="navbar__brand" aria-label="Bloom & Blossom — на головну">
          <Logo />
          <span>Bloom &amp; Blossom</span>
        </Link>

        <ul className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`} id="main-menu">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/cart" className={linkClass}>
              Кошик
            </NavLink>
          </li>
        </ul>

        <div className="navbar__actions">
          <NavLink
            to="/cart"
            className={({ isActive }) => `navbar__cart${isActive ? ' navbar__cart--active' : ''}`}
            aria-label={`Кошик, товарів: ${totalItems}`}
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className={`navbar__badge${bump ? ' navbar__badge--bump' : ''}`}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            className={`navbar__toggle${menuOpen ? ' navbar__toggle--open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
