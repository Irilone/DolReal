// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import se from './locales/se.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import fa from './locales/fa.json';
import zh from './locales/zh.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      se: { translation: se },
      en: { translation: en },
      ar: { translation: ar },
      fa: { translation: fa },
      zh: { translation: zh },
      es: { translation: es },
    },
    lng: 'se',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
