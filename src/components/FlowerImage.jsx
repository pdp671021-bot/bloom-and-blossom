import { useId } from 'react';
import './FlowerImage.css';

/* Кольори пелюсток: [основний, тінь] */
const COLORS = {
  red: ['#E53950', '#A61E35'],
  white: ['#FFFFFF', '#CFC8BD'],
  pink: ['#F48FB1', '#C2185B'],
  blush: ['#F7C6C2', '#D98A86'],
  yellow: ['#FFD54F', '#E0A100'],
  purple: ['#9575CD', '#5E35B1'],
  orange: ['#FFA24C', '#D9651A'],
};

const WRAPS = {
  kraft: ['#D9B98C', '#B8915E'],
  white: ['#FFFFFF', '#D8DDD8'],
  sage: ['#C8DCC4', '#97B691'],
  blush: ['#F9DCDC', '#E3AFAF'],
};

const BACKGROUNDS = {
  rose: ['#FDEFF1', '#F8DDE2'],
  tulip: ['#FFF5E6', '#FCE6C8'],
  lily: ['#F3EFFA', '#E4DAF4'],
  sunflower: ['#FFF8DC', '#FBEAB0'],
};

/* Розташування голівок квітів залежно від їх кількості */
const LAYOUTS = {
  1: [[100, 74]],
  3: [[72, 84], [128, 84], [100, 62]],
  5: [[66, 90], [134, 90], [80, 62], [120, 62], [100, 84]],
  7: [[56, 96], [144, 96], [70, 66], [130, 66], [100, 48], [86, 92], [114, 92]],
};

const HEAD_SCALE = { 1: 1.9, 3: 1.35, 5: 1.08, 7: 0.98 };

function Rose({ petal, dark }) {
  return (
    <g>
      <circle r="20" fill={petal} />
      <circle r="20" fill="none" stroke={dark} strokeWidth="1.5" opacity="0.45" />
      <path
        d="M-12 -2 C-12 -14 10 -15 12 -4 C14 8 2 14 -6 10 C-12 6 -8 -6 0 -5 C6 -4 6 4 1 4"
        fill="none"
        stroke={dark}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </g>
  );
}

function Tulip({ petal, dark }) {
  return (
    <g>
      <path d="M-15 -12 Q-17 14 0 17 Q17 14 15 -12 L7 -3 L0 -19 L-7 -3 Z" fill={petal} />
      <path d="M0 -19 L-7 -3 Q-6 10 0 17 Q6 10 7 -3 Z" fill={dark} opacity="0.3" />
      <path d="M-15 -12 Q-17 14 0 17 Q17 14 15 -12" fill="none" stroke={dark} strokeWidth="1.2" opacity="0.5" />
    </g>
  );
}

function Lily({ petal, dark }) {
  const angles = [0, 60, 120, 180, 240, 300];
  return (
    <g>
      {angles.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <ellipse cx="0" cy="-13" rx="6.5" ry="14" fill={petal} stroke={dark} strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="-21" stroke={dark} strokeWidth="1.2" opacity="0.55" />
        </g>
      ))}
      <circle r="4.5" fill="#C5E1A5" />
      {[-40, -15, 10, 35, 160].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1="0" y1="0" x2="0" y2="-11" stroke="#8D6E63" strokeWidth="1" />
          <ellipse cx="0" cy="-12" rx="1.6" ry="2.6" fill="#E65100" />
        </g>
      ))}
    </g>
  );
}

function Sunflower({ petal, dark }) {
  const angles = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <g>
      {angles.map((a) => (
        <ellipse key={a} cx="0" cy="-17" rx="5" ry="11" fill={petal} stroke={dark} strokeWidth="0.8" transform={`rotate(${a})`} />
      ))}
      <circle r="11" fill="#6D4C41" />
      <circle r="7.5" fill="#4E342E" />
      {[[-4, -3], [3, -4], [-1, 3], [4, 2], [-5, 3], [1, -1]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1" fill="#8D6E63" />
      ))}
    </g>
  );
}

const HEADS = { rose: Rose, tulip: Tulip, lily: Lily, sunflower: Sunflower };

function parseFlower(spec) {
  const [type, color] = spec.split(':');
  const [petal, dark] = type === 'sunflower' ? ['#FFC107', '#E39A00'] : COLORS[color] ?? COLORS.red;
  return { type, petal, dark };
}

function Leaves() {
  return (
    <g fill="#4CAF50">
      <ellipse cx="80" cy="128" rx="7" ry="18" transform="rotate(-38 80 128)" />
      <ellipse cx="120" cy="128" rx="7" ry="18" transform="rotate(38 120 128)" />
      <ellipse cx="88" cy="112" rx="5" ry="13" transform="rotate(-20 88 112)" fill="#66BB6A" />
      <ellipse cx="112" cy="112" rx="5" ry="13" transform="rotate(20 112 112)" fill="#66BB6A" />
    </g>
  );
}

/**
 * Ілюстрація товару у вигляді SVG.
 * Якщо в товару є поле image — показується фото.
 */
export default function FlowerImage({ product, className = '', size = 'md' }) {
  // useId повертає символи на кшталт «:r0:», які не можна використовувати в url(#...)
  const gradientId = `bg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  if (product.image) {
    return (
      <div className={`flower-image flower-image--${size} ${className}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
    );
  }

  const { variant = 'bouquet', flowers = ['rose:red'], wrap = 'kraft' } = product.art ?? {};
  const count = [1, 3, 5, 7].includes(flowers.length) ? flowers.length : 5;
  const layout = LAYOUTS[count];
  const scale = HEAD_SCALE[count];
  const heads = flowers.slice(0, count).map((spec, i) => ({ ...parseFlower(spec), x: layout[i][0], y: layout[i][1] }));
  // Нижні голівки малюємо пізніше, щоб вони були попереду
  const ordered = [...heads].sort((a, b) => a.y - b.y);
  const mainType = parseFlower(flowers[0]).type;
  const [bgFrom, bgTo] = BACKGROUNDS[mainType] ?? BACKGROUNDS.rose;
  const [wrapColor, wrapDark] = WRAPS[wrap] ?? WRAPS.kraft;
  const stemBase = variant === 'single' ? [100, 186] : [100, 160];

  return (
    <div className={`flower-image flower-image--${size} ${className}`}>
      <svg viewBox="0 0 200 200" role="img" aria-label={product.name} preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor={bgFrom} />
            <stop offset="100%" stopColor={bgTo} />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#${gradientId})`} />
        <circle cx="100" cy="88" r="70" fill="#FFFFFF" opacity="0.35" />

        {/* Ручка кошика — позаду квітів */}
        {variant === 'basket' && (
          <path d="M52 132 Q100 18 148 132" fill="none" stroke="#A47148" strokeWidth="7" strokeLinecap="round" />
        )}

        {/* Стебла */}
        <g stroke="#3E8E41" strokeWidth="3" strokeLinecap="round">
          {heads.map((h, i) => (
            <line key={i} x1={h.x} y1={h.y} x2={stemBase[0]} y2={stemBase[1]} />
          ))}
        </g>

        {variant === 'single' ? (
          <g fill="#4CAF50">
            <ellipse cx="86" cy="150" rx="7" ry="18" transform="rotate(-45 86 150)" />
            <ellipse cx="114" cy="135" rx="6" ry="15" transform="rotate(45 114 135)" />
          </g>
        ) : (
          <Leaves />
        )}

        {/* Голівки квітів */}
        {ordered.map((h, i) => {
          const Head = HEADS[h.type] ?? Rose;
          return (
            <g key={i} transform={`translate(${h.x} ${h.y}) scale(${scale})`}>
              <Head petal={h.petal} dark={h.dark} />
            </g>
          );
        })}

        {/* Упаковка / ваза / кошик */}
        {variant === 'bouquet' && (
          <g>
            <path d="M58 122 L142 122 L112 190 L88 190 Z" fill={wrapColor} />
            <path d="M58 122 L100 134 L142 122" fill="none" stroke={wrapDark} strokeWidth="2" strokeLinejoin="round" />
            <path d="M80 128 L95 188 M120 128 L105 188" stroke={wrapDark} strokeWidth="1.2" opacity="0.6" />
            <path d="M100 152 q-16 -12 -20 2 q8 6 20 -2 z M100 152 q16 -12 20 2 q-8 6 -20 -2 z" fill="#2E7D32" />
            <path d="M98 154 l-8 18 M102 154 l8 18" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="152" r="4" fill="#256528" />
          </g>
        )}
        {variant === 'basket' && (
          <g>
            <path d="M44 128 L156 128 L142 184 Q100 192 58 184 Z" fill="#C68B59" />
            <rect x="40" y="122" width="120" height="12" rx="6" fill="#A47148" />
            <g stroke="#A47148" strokeWidth="2" opacity="0.8">
              <path d="M50 146 L150 146 M53 160 L147 160 M56 174 L144 174" />
              <path d="M70 134 L72 186 M90 134 L91 189 M110 134 L109 189 M130 134 L128 186" />
            </g>
          </g>
        )}
        {variant === 'vase' && (
          <g>
            <path d="M74 118 Q64 152 78 186 L122 186 Q136 152 126 118 Z" fill="#E3F2FD" opacity="0.75" />
            <path d="M74 118 Q64 152 78 186 L122 186 Q136 152 126 118 Z" fill="none" stroke="#90A4AE" strokeWidth="2" />
            <path d="M70 152 Q100 160 130 152 L126 186 L74 186 Z" fill="#B3E5FC" opacity="0.55" />
            <path d="M84 126 Q78 150 86 176" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
            <rect x="70" y="113" width="60" height="8" rx="4" fill="#CFD8DC" />
          </g>
        )}
        {variant === 'single' && (
          <g>
            <path d="M100 160 q-14 -10 -18 3 q8 5 18 -3 z M100 160 q14 -10 18 3 q-8 5 -18 -3 z" fill="#2E7D32" />
            <circle cx="100" cy="160" r="3.5" fill="#256528" />
          </g>
        )}
      </svg>
    </div>
  );
}
