// src/components/providers/ThemeProvider.tsx
'use client';

import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <div>{children}</div>;
}