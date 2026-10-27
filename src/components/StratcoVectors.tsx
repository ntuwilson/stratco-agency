import React from 'react';

/**
 * Official Stratco 'A' Monogram / Symbol (Brand Manual Page 9)
 */
export function StratcoMark({
  className,
  style,
  color = 'currentColor',
}: {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 46 58 L 22 82 C 14 89 9 82 14 69 C 23 43 37 15 49.5 15 C 62 15 75 45 86 83"
        stroke={color}
        strokeWidth="11.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Official Stratco Wordmark + Red 'A' Symbol + Brandline (Brand Manual Pages 1-4)
 */
export function StratcoWordmark({
  variant = 'adaptive-nav',
  width = 165,
  showTagline = true,
  className,
}: {
  variant?: 'adaptive-nav' | 'full-color' | 'inverted' | 'mono-black' | 'mono-white';
  width?: number;
  showTagline?: boolean;
  className?: string;
}) {
  const getColors = () => {
    switch (variant) {
      case 'full-color':
        return { text: '#2B2B2A', arch: '#AA0622', sub: '#6E6E6E' };
      case 'inverted':
        return { text: '#FFFFFF', arch: '#AA0622', sub: '#CFCDC9' };
      case 'mono-black':
        return { text: '#000000', arch: '#000000', sub: '#333333' };
      case 'mono-white':
        return { text: '#FFFFFF', arch: '#FFFFFF', sub: '#CCCCCC' };
      default:
        return { text: undefined, arch: '#AA0622', sub: '#8C8984' };
    }
  };

  const colors = getColors();
  const isAdaptive = variant === 'adaptive-nav';

  return (
    <svg
      className={className}
      width={width}
      viewBox="0 0 285 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Stratco — Making Brands Unforgettable"
    >
      <text
        x="2"
        y="45"
        className={isAdaptive ? 'logo-text-fill' : undefined}
        fill={colors.text}
        fontFamily="var(--font-brand), Montserrat, sans-serif"
        fontSize="44"
        fontWeight="600"
        letterSpacing="-1.5"
      >
        Str
      </text>
      <path
        d="M 96 34 L 79 49 C 74 53.5 70.5 49 74 40 C 80 23 89 6 97.5 6 C 106 6 114.5 25 122 49.5"
        stroke={colors.arch}
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="126"
        y="45"
        className={isAdaptive ? 'logo-text-fill' : undefined}
        fill={colors.text}
        fontFamily="var(--font-brand), Montserrat, sans-serif"
        fontSize="44"
        fontWeight="600"
        letterSpacing="-1.5"
      >
        tco
      </text>
      {showTagline && (
        <text
          x="66"
          y="62"
          fill={colors.sub}
          fontFamily="var(--font-brand), Montserrat, sans-serif"
          fontSize="10.8"
          fontWeight="500"
          letterSpacing="0.25"
        >
          Making Brands Unforgettable.
        </text>
      )}
    </svg>
  );
}

/**
 * ZettaJoule Square Tile North-East Arrow
 */
export function ArrowNeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.5 14.5L14.5 5.5M14.5 5.5H6.5M14.5 5.5V13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Architectural Blueprint SVGs for Brand Manual Physical Deliverables (Pages 10-18)
 */
export function DeliverableBlueprint({
  type,
}: {
  type: 'stationery' | 'totems' | 'fleet' | 'merch';
}) {
  if (type === 'totems') {
    return (
      <svg viewBox="0 0 600 230" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="42" y1="20" x2="42" y2="210" stroke="#AA0622" strokeWidth="1.2" />
        <text x="10" y="118" fill="#AA0622" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600">
          96 in
        </text>
        <line x1="65" y1="12" x2="175" y2="12" stroke="#1B1B1B" strokeWidth="1.2" />
        <text x="108" y="9" fill="#1B1B1B" fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight="600">
          48 in
        </text>

        <rect x="65" y="20" width="110" height="190" rx="2" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="1.4" />
        <path d="M175 20 L187 28 L187 210 L175 210 Z" fill="#242424" />
        <text x="84" y="48" fill="#1B1B1B" fontFamily="Montserrat, sans-serif" fontSize="18" fontWeight="600">
          Stratco
        </text>
        <rect x="75" y="64" width="90" height="92" rx="4" fill="#2B2B2A" />
        <text x="86" y="88" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="11" fontWeight="500">
          we
        </text>
        <text x="86" y="103" fill="#AA0622" fontFamily="Montserrat, sans-serif" fontSize="11" fontWeight="700">
          don&apos;t create
        </text>
        <text x="86" y="118" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="11" fontWeight="500">
          adverts
        </text>
        <text x="86" y="136" fill="#FF8598" fontFamily="Montserrat, sans-serif" fontSize="10" fontWeight="600">
          we create brands
        </text>
        <text x="82" y="180" fill="#524F4B" fontFamily="Inter, sans-serif" fontSize="6.5">
          Kisakye Complex, Bugolobi
        </text>
        <text x="82" y="191" fill="#524F4B" fontFamily="Inter, sans-serif" fontSize="6.5">
          www.stratco.agency
        </text>

        <rect x="245" y="32" width="105" height="172" fill="#242424" stroke="#1B1B1B" strokeWidth="1.2" />
        <rect x="238" y="204" width="119" height="8" rx="2" fill="#7D7D7D" />
        <text x="260" y="72" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="17" fontWeight="600">
          Stratco
        </text>
        <text x="260" y="118" fill="#AA0622" fontFamily="Montserrat, sans-serif" fontSize="17" fontWeight="600">
          Stratco
        </text>
        <text x="260" y="164" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="17" fontWeight="600">
          Stratco
        </text>

        <rect x="415" y="18" width="52" height="165" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="1.2" />
        <line x1="415" y1="18" x2="415" y2="210" stroke="#1B1B1B" strokeWidth="2.5" />
        <rect x="403" y="204" width="26" height="8" rx="2" fill="#7D7D7D" />
        <text
          x="446"
          y="145"
          fill="#1B1B1B"
          fontFamily="Montserrat, sans-serif"
          fontSize="19"
          fontWeight="600"
          transform="rotate(-90 446 145)"
        >
          Stratco
        </text>

        <rect x="505" y="18" width="52" height="165" fill="#242424" stroke="#1B1B1B" strokeWidth="1.2" />
        <line x1="505" y1="18" x2="505" y2="210" stroke="#1B1B1B" strokeWidth="2.5" />
        <rect x="493" y="204" width="26" height="8" rx="2" fill="#7D7D7D" />
        <text
          x="536"
          y="145"
          fill="#FFFFFF"
          fontFamily="Montserrat, sans-serif"
          fontSize="19"
          fontWeight="600"
          transform="rotate(-90 536 145)"
        >
          Stratco
        </text>
      </svg>
    );
  }

  if (type === 'fleet') {
    return (
      <svg viewBox="0 0 600 230" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(25, 25)">
          <path
            d="M20 115 L55 102 L115 52 L285 52 L285 95 L495 95 L495 148 L20 148 Z"
            fill="#FFFFFF"
            stroke="#1B1B1B"
            strokeWidth="2"
          />
          <path d="M125 58 L200 58 L200 95 L98 95 Z" fill="#242424" />
          <path d="M208 58 L275 58 L275 95 L208 95 Z" fill="#242424" />
          <path
            d="M 272 118 L 245 142 C 237 148 232 142 237 128 C 248 96 264 62 278 62 C 292 62 308 98 320 143"
            stroke="#AA0622"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <text x="128" y="122" fill="#1B1B1B" fontFamily="Montserrat, sans-serif" fontSize="19" fontWeight="600">
            Stratco
          </text>
          <circle cx="95" cy="148" r="30" fill="#242424" stroke="#1B1B1B" strokeWidth="2" />
          <circle cx="95" cy="148" r="14" fill="#E5E5E5" />
          <circle cx="405" cy="148" r="30" fill="#242424" stroke="#1B1B1B" strokeWidth="2" />
          <circle cx="405" cy="148" r="14" fill="#E5E5E5" />
          <line x1="165" y1="15" x2="165" y2="105" stroke="#AA0622" strokeDasharray="3 3" />
          <circle cx="165" cy="15" r="9" fill="#FFFFFF" stroke="#AA0622" />
          <text x="162" y="18" fill="#AA0622" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600">
            a
          </text>
        </g>
      </svg>
    );
  }

  if (type === 'merch') {
    return (
      <svg viewBox="0 0 600 230" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="22" width="120" height="175" rx="6" fill="#242424" stroke="#1B1B1B" strokeWidth="1.5" />
        <line x1="42" y1="22" x2="42" y2="197" stroke="#AA0622" strokeWidth="4" />
        <text x="55" y="112" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="18" fontWeight="600">
          Stratco
        </text>
        <text x="55" y="123" fill="#CFCDC9" fontFamily="Inter, sans-serif" fontSize="5.5">
          Making Brands Unforgettable.
        </text>

        <rect x="175" y="55" width="165" height="115" rx="6" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="1.3" />
        <rect x="242" y="20" width="30" height="35" rx="2" fill="#242424" />
        <rect x="190" y="75" width="44" height="54" rx="3" fill="#E5E5E5" stroke="#1B1B1B" />
        <circle cx="212" cy="94" r="10" fill="#524F4B" />
        <path d="M196 124 C196 112 228 112 228 124" fill="#524F4B" />
        <text x="252" y="84" fill="#1B1B1B" fontFamily="Montserrat, sans-serif" fontSize="14" fontWeight="600">
          Stratco
        </text>
        <text x="252" y="104" fill="#1B1B1B" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600">
          Andrew Muhwezi
        </text>
        <text x="252" y="114" fill="#AA0622" fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="600">
          DIRECTOR · ID 023/16
        </text>
        <text x="252" y="128" fill="#524F4B" fontFamily="Inter, sans-serif" fontSize="6">
          Authorised Signatory
        </text>

        <g transform="translate(380, 18)">
          <path
            d="M45 15 L85 15 L105 15 L145 42 L130 75 L108 62 L108 182 L42 182 L42 62 L20 75 L5 42 Z"
            fill="#FFFFFF"
            stroke="#1B1B1B"
            strokeWidth="1.4"
          />
          <text x="76" y="65" fill="#1B1B1B" fontFamily="Montserrat, sans-serif" fontSize="10" fontWeight="600">
            Stratco
          </text>
          <path
            d="M 92 145 L 74 166 C 68 172 64 166 68 154 C 76 126 92 98 104 98"
            stroke="#AA0622"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    );
  }

  // Default: Stationery
  return (
    <svg viewBox="0 0 600 230" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="190" height="110" rx="6" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="1.2" />
      <path d="M 105 20 L 205 20 L 205 130 L 75 130 Z" fill="#242424" />
      <text x="28" y="75" fill="#1B1B1B" fontFamily="Montserrat, sans-serif" fontSize="17" fontWeight="600">
        Str
      </text>
      <path
        d="M 59 71 L 52 78 C 50 80 48 78 50 74 C 53 66 57 59 60 59 C 63 59 67 67 70 78"
        stroke="#AA0622"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="72" y="75" fill="#1B1B1B" fontFamily="Montserrat, sans-serif" fontSize="17" fontWeight="600">
        tco
      </text>
      <text x="125" y="55" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight="600">
        Andrew Muhwezi
      </text>
      <text x="125" y="67" fill="#CFCDC9" fontFamily="Inter, sans-serif" fontSize="7">
        Director · +256 772 833500
      </text>
      <text x="125" y="81" fill="#CFCDC9" fontFamily="Inter, sans-serif" fontSize="7">
        Bugolobi, Kampala
      </text>
      <text x="125" y="95" fill="#FF8598" fontFamily="Inter, sans-serif" fontSize="7">
        www.stratco.agency
      </text>

      <rect x="235" y="15" width="160" height="195" rx="4" fill="#242424" stroke="#1B1B1B" strokeWidth="1.2" />
      <rect x="395" y="15" width="185" height="195" rx="4" fill="#FFFFFF" stroke="#1B1B1B" strokeWidth="1.2" />
      <path
        d="M 485 135 L 445 175 C 432 187 423 175 432 152 C 448 106 472 58 494 58 C 516 58 538 110 558 176"
        stroke="#AA0622"
        strokeOpacity="0.12"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <text x="415" y="45" fill="#1B1B1B" fontFamily="Montserrat, sans-serif" fontSize="18" fontWeight="600">
        Stratco
      </text>
      <line x1="415" y1="182" x2="560" y2="182" stroke="#1B1B1B" strokeDasharray="2 2" />
      <text x="415" y="196" fill="#524F4B" fontFamily="Inter, sans-serif" fontSize="7">
        Kisakye Complex, Office 301 Bugolobi | info@stratco.agency
      </text>
      <text x="255" y="175" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500">
        Presentation Folder + Proforma
      </text>
      <text x="255" y="189" fill="#CFCDC9" fontFamily="Inter, sans-serif" fontSize="7">
        Fixed &amp; Editable Print Regions
      </text>
    </svg>
  );
}
