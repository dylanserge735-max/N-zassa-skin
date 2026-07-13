'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5
              text-base text-gray-900 placeholder-gray-400
              transition-all duration-300
              focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/15
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${icon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
