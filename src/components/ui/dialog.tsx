// src/components/ui/dialog.tsx
'use client';

import { ReactNode } from 'react';

interface DialogProps {
  children: ReactNode;
}

export function Dialog({ children }: DialogProps) {
  return <div>{children}</div>;
}
