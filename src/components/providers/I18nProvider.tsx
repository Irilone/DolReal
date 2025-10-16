"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { initI18n } from "@/i18n/config";
import type { Locale } from "@/types/i18n";

interface I18nProviderProps {
  locale: Locale;
  children: React.ReactNode;
}

export function I18nProvider({ locale, children }: I18nProviderProps) {
  useEffect(() => {
    void initI18n(locale);
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
