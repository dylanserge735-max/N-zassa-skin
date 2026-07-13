'use client';

export default function Logo({ size = 'md', variant = 'full' }: { size?: 'sm' | 'md' | 'lg'; variant?: 'full' | 'icon' }) {
  const sizes = {
    sm: { icon: 32, text: 'text-xl' },
    md: { icon: 48, text: 'text-2xl' },
    lg: { icon: 64, text: 'text-4xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div 
        className="relative flex items-center justify-center rounded-full"
        style={{ 
          width: icon, 
          height: icon,
          background: 'linear-gradient(135deg, #D4AF37 0%, #5C4033 100%)',
        }}
      >
        <svg viewBox="0 0 48 48" width={icon * 0.6} height={icon * 0.6} fill="none">
          <path
            d="M24 8c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8z"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M24 14c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z"
            fill="white"
            fillOpacity="0.3"
          />
          <circle cx="24" cy="24" r="4" fill="white" />
          <path
            d="M24 4v4M24 40v4M4 24h4M40 24h4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {variant === 'full' && (
        <div className="flex flex-col">
          <span 
            className={`font-bold ${text}`}
            style={{ fontFamily: 'Playfair Display, serif', color: '#0D0D0D' }}
          >
            N&apos;Zassa <span style={{ color: '#D4AF37' }}>Skin</span>
          </span>
        </div>
      )}
    </div>
  );
}
