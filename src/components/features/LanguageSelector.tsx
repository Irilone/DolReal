'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '@/types/i18n';
import { LOCALE_CONFIGS } from '@/types/i18n';

interface LanguageSelectorProps {
  currentLocale: Locale;
}

export function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        className="appearance-none rounded-md border border-slate-300 bg-white px-4 py-2 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        aria-label="Select language"
      >
        {Object.values(LOCALE_CONFIGS).map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.flag} {locale.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}
