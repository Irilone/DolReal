// src/components/features/Header.tsx
'use client';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DarkModeToggle } from './DarkModeToggle';
import type { Locale } from '@/types/i18n';

interface HeaderProps {
  currentLocale: Locale;
}

export function Header({ currentLocale }: HeaderProps) {
  return (
    <header>
      <div>Logo</div>
      <LanguageSwitcher />
      <DarkModeToggle />
    </header>
  );
}
