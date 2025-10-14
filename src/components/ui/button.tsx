// src/components/ui/button.tsx
'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ children, variant, size, onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{children}</button>;
}
