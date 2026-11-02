import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Footer.css';

const SOCIALS = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7H17l.5-4h-4V8.9c0-.6.4-.9 1-.9z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M21.5 4.3 2.9 11.5c-1 .4-1 1.6 0 1.9l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.5 4.9 3.6c.6.4 1.4.1 1.6-.6l3.3-15.6c.2-1-.8-1.8-1.8-1.5zM9.6 14.4l-.4 3.7-1.4-4.5 9.6-6.1-7.8 6.9z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.8 0-2.5-1.8-4.3-4.4-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.7-2.4 6.8-5.6 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A10 10 0 1 0 12 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Link to="/" className="footer__brand">
            <Logo size={38} />
            <span>Bloom &amp; Blossom</span>
          </Link>
          <p>
            Свіжі квіти щодня та авторські букети з любов&apos;ю. Доставляємо радість до ваших дверей.
          </p>
          <ul className="footer__socials" aria-label="Ми в соцмережах">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} aria-label={s.name} title={s.name} onClick={(e) => e.preventDefault()}>
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">Навігація</h3>
          <ul className="footer__links">
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/products">Квіти</Link></li>
            <li><Link to="/cart">Кошик</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">Каталог</h3>
          <ul className="footer__links">
            <li><Link to="/products?category=roses">Троянди</Link></li>
            <li><Link to="/products?category=tulips">Тюльпани</Link></li>
            <li><Link to="/products?category=lilies">Лілії</Link></li>
            <li><Link to="/products?category=sunflowers">Соняшники</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">Контакти</h3>
          <ul className="footer__links footer__contacts">
            <li><a href="tel:+380000000000">+38 (000) 000-00-00</a></li>
            <li><a href="mailto:hello@bloomblossom.ua">hello@bloomblossom.ua</a></li>
            <li>Щодня 08:00–21:00</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Bloom &amp; Blossom. Усі права захищено.</p>
          <p>Зроблено з 🌿 в Україні</p>
        </div>
      </div>
    </footer>
  );
}
