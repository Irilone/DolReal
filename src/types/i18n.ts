export type Locale = 'se' | 'en' | 'ar' | 'fa' | 'zh' | 'es' | 'it';

export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  direction: Direction;
  flag: string;
}

export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  se: { code: 'se', name: 'Swedish', nativeName: 'Svenska', direction: 'ltr', flag: '🇸🇪' },
  en: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', flag: '🇬🇧' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', flag: '🇸🇦' },
  fa: { code: 'fa', name: 'Farsi', nativeName: 'فارسی', direction: 'rtl', flag: '🇮🇷' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr', flag: '🇨🇳' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', flag: '🇪🇸' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', flag: '🇮🇹' },
};
