export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="#2E7D32" />
      <g transform="translate(32 30)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-10" rx="7" ry="11" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="6" fill="#66BB6A" />
      </g>
    </svg>
  );
}
