function Crown({ shape, colors: [leaf, accent] }) {
  switch (shape) {
    case 'conifer':
      return (
        <g fill={leaf}>
          <rect x="95" y="120" width="10" height="20" fill="#6b4f35" />
          <polygon points="100,30 140,90 60,90" fill={accent} />
          <polygon points="100,55 150,120 50,120" />
        </g>
      );
    case 'round':
      return (
        <g>
          <rect x="94" y="100" width="12" height="40" fill="#6b4f35" />
          <circle cx="100" cy="78" r="46" fill={leaf} />
          <circle cx="78" cy="70" r="24" fill={accent} />
          <circle cx="124" cy="88" r="20" fill={accent} />
        </g>
      );
    case 'olive':
      return (
        <g>
          <path d="M100 140 C98 115 88 105 92 90 M100 140 C104 118 114 108 110 92" stroke="#6b4f35" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="80" cy="78" rx="34" ry="22" fill={leaf} />
          <ellipse cx="122" cy="72" rx="32" ry="24" fill={accent} />
          <ellipse cx="100" cy="56" rx="30" ry="20" fill={leaf} />
          <circle cx="84" cy="84" r="4" fill="#3d4a2c" />
          <circle cx="118" cy="80" r="4" fill="#3d4a2c" />
          <circle cx="104" cy="60" r="4" fill="#3d4a2c" />
        </g>
      );
    case 'fruit':
      return (
        <g>
          <rect x="94" y="100" width="12" height="40" fill="#6b4f35" />
          <circle cx="100" cy="76" r="44" fill={leaf} />
          <circle cx="82" cy="66" r="7" fill={accent} />
          <circle cx="116" cy="62" r="7" fill={accent} />
          <circle cx="104" cy="92" r="7" fill={accent} />
          <circle cx="74" cy="94" r="7" fill={accent} />
          <circle cx="126" cy="88" r="7" fill={accent} />
        </g>
      );
    case 'corn':
      return (
        <g>
          <rect x="97" y="40" width="6" height="100" fill={leaf} />
          <path d="M100 120 Q70 100 60 70 M100 100 Q130 80 142 52 M100 80 Q76 62 72 36" stroke={leaf} strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="112" cy="96" rx="8" ry="18" fill={accent} transform="rotate(20 112 96)" />
        </g>
      );
    case 'strawberry':
      return (
        <g>
          <ellipse cx="78" cy="108" rx="24" ry="16" fill={leaf} />
          <ellipse cx="122" cy="108" rx="24" ry="16" fill={leaf} />
          <ellipse cx="100" cy="94" rx="26" ry="18" fill={leaf} />
          <path d="M84 116 q8 22 16 0 z" fill={accent} />
          <path d="M108 120 q8 20 16 0 z" fill={accent} />
        </g>
      );
    default:
      return <circle cx="100" cy="80" r="40" fill={leaf} />;
  }
}

export default function ProductImage({ product, className = '' }) {
  if (product.image) {
    return <img src={product.image} alt={product.name} className={`object-cover ${className}`} />;
  }
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`${product.name} çizimi`} className={className}>
      <rect width="200" height="200" fill="#e9eddd" />
      <ellipse cx="100" cy="176" rx="60" ry="8" fill="#d8dfc6" />
      <Crown shape={product.shape} colors={product.colors} />
      <path d="M68 138 h64 l-8 38 h-48 z" fill="#b7754e" />
      <rect x="64" y="132" width="72" height="10" rx="3" fill="#c98a60" />
    </svg>
  );
}
