// src/lib/utils/locale.ts
import type { Locale } from '@/types/i18n';

const rtlLocales: Locale[] = ['ar', 'fa'];

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

export function isValidLocale(locale: string): locale is Locale {
  return ['se', 'en', 'ar', 'fa', 'zh', 'es'].includes(locale);
}