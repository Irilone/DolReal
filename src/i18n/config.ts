import i18n from "i18next";
import type { Locale } from "@/types/i18n";

import se from "./locales/se.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import fa from "./locales/fa.json";
import zh from "./locales/zh.json";
import es from "./locales/es.json";

const resources = {
  se: { translation: se },
  en: { translation: en },
  ar: { translation: ar },
  fa: { translation: fa },
  zh: { translation: zh },
  es: { translation: es },
};

const initOptions = {
  resources,
  lng: "se" as Locale,
  fallbackLng: "se" as Locale,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

const initializationPromise: Promise<typeof i18n> =
  typeof window === "undefined"
    ? i18n.isInitialized
      ? Promise.resolve(i18n)
      : i18n.init({
          ...initOptions,
          initImmediate: false,
        })
    : (async () => {
        if (!i18n.isInitialized) {
          const { initReactI18next } = await import("react-i18next");
          i18n.use(initReactI18next);
          await i18n.init(initOptions);
        }
        return i18n;
      })();

export async function initI18n(locale: Locale = "se") {
  await initializationPromise;

  if (i18n.language !== locale) {
    await i18n.changeLanguage(locale);
  }

  return i18n;
}

export default i18n;
