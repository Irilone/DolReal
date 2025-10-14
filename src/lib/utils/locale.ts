import type { Locale, Direction } from '@/types/i18n';
import { LOCALE_CONFIGS } from '@/types/i18n';

export function isValidLocale(locale: string): locale is Locale {
  return ['se', 'en', 'ar', 'fa', 'zh', 'es'].includes(locale);
}

export function getLocaleDirection(locale: Locale): Direction {
  return LOCALE_CONFIGS[locale].direction;
}

export function getLocaleName(locale: Locale, native: boolean = false): string {
  return native ? LOCALE_CONFIGS[locale].nativeName : LOCALE_CONFIGS[locale].name;
}

export function getLocaleFlag(locale: Locale): string {
  return LOCALE_CONFIGS[locale].flag;
}

export function sanitizeLocale(locale: string | undefined): Locale {
  if (!locale || !isValidLocale(locale)) {
    return 'se'; // Default to Swedish
  }
  return locale;
}

export function isRTL(locale: Locale): boolean {
  return getLocaleDirection(locale) === 'rtl';
}
