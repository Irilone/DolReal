'use client';

import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} {t('header.title')}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
