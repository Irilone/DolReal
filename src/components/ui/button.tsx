// src/components/ui/button.tsx
'use client';

import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'md', 
  onClick, 
  disabled,
  className = '',
  ...ariaProps
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-white/40 hover:bg-white/10',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  }[variant] || variantClasses['default'];
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  }[size] || sizeClasses['md'];

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...ariaProps}
    >
      {children}
    </button>
  );
}
