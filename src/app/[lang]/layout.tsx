import { notFound } from "next/navigation";

import { Header } from "@/components/features/Header";
import { Footer } from "@/components/features/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { getLocaleDirection, isValidLocale } from "@/lib/utils/locale";
import type { Locale } from "@/types/i18n";

type LayoutParams = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

export default async function LocaleLayout({ children, params }: LayoutParams) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const direction = getLocaleDirection(locale);

  return (
    <ThemeProvider>
      <I18nProvider locale={locale}>
        <div className="flex min-h-screen flex-col" dir={direction}>
          <Header locale={locale} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
