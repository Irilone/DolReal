import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { Locale } from '@/types/i18n';

import se from './locales/se.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import fa from './locales/fa.json';
import zh from './locales/zh.json';
import es from './locales/es.json';

const resources = {
  se: { translation: se },
  en: { translation: en },
  ar: { translation: ar },
  fa: { translation: fa },
  zh: { translation: zh },
  es: { translation: es },
};

export function initI18n(locale: Locale = 'se') {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: locale,
      fallbackLng: 'se',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
}

export default i18n;
