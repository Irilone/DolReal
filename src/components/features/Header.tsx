'use client';

import { useTranslation } from 'react-i18next';
import type { Locale } from '@/types/i18n';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {t('header.title')}
          </h1>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href={`/${locale}`}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          >
            {t('nav.home')}
          </a>
          <a
            href={`/${locale}/schedule`}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          >
            {t('nav.schedule')}
          </a>
          <a
            href={`/${locale}/archive`}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          >
            {t('nav.archive')}
          </a>
          <a
            href={`/${locale}/about`}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          >
            {t('nav.about')}
          </a>
        </nav>
      </div>
    </header>
  );
}
