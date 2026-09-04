export function InstagramIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Botanical({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 74 100" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 95C25 75 43 54 47 12M30 72C22 66 18 54 19 39M38 53C50 51 59 43 64 33M44 35C34 29 30 20 31 11" />
        <path d="M47 18C38 11 46 3 51 2C55 10 50 16 47 18Z" />
        <path d="M43 38C31 36 30 26 32 22C42 24 45 31 43 38Z" />
        <path d="M40 49C39 35 51 30 56 31C56 40 49 48 40 49Z" />
        <path d="M32 66C21 64 20 53 22 48C31 51 35 59 32 66Z" />
        <path d="M27 79C28 67 41 64 47 66C43 76 35 80 27 79Z" />
        <path d="M20 48C11 44 12 33 15 28C23 33 24 42 20 48Z" />
        <path d="M54 46C53 35 63 27 69 27C70 37 62 45 54 46Z" />
        <path d="M33 24C23 24 20 14 23 8C31 10 35 17 33 24Z" />
      </g>
    </svg>
  );
}

export function Brand({ light = false, large = false }: { light?: boolean; large?: boolean }) {
  return (
    <span className={`brand ${light ? 'brand-light' : ''} ${large ? 'brand-large' : ''}`}>
      <Botanical className="brand-botanical" />
      <span className="brand-type">
        <span className="brand-name">maham<span className="brand-dot">.</span></span>
        <span className="brand-descriptor">THE BRIDAL DIETITIAN</span>
      </span>
    </span>
  );
}