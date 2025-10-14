// src/components/features/LanguageSwitcher.tsx
'use client';
import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '@/types/i18n';

const locales: Locale[] = ['se', 'en', 'ar', 'fa', 'zh', 'es'];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    // This is a simplified example. A real implementation would likely
    // involve a more robust internationalization setup.
    const newPath = `/${newLocale}${pathname}`;
    router.push(newPath);
  };

  return (
    <select onChange={(e) => handleLocaleChange(e.target.value as Locale)}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
