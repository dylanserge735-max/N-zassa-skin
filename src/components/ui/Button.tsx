'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-[#0D0D0D] hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5 focus:ring-[#D4AF37]',
    secondary: 'bg-[#0D0D0D] text-[#D4AF37] border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D] focus:ring-[#D4AF37]',
    outline: 'bg-transparent border-2 border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white focus:ring-[#5C4033]',
    ghost: 'bg-transparent text-[#5C4033] hover:bg-[#5C4033]/10 focus:ring-[#5C4033]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
