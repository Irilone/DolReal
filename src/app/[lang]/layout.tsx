import { notFound } from "next/navigation";
import { getLocaleDirection, isValidLocale } from "@/lib/utils/locale";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { Header } from "@/components/features/Header";
import { Footer } from "@/components/features/Footer";
import { initI18n } from "@/i18n/config";
import type { Locale } from "@/types/i18n";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  await initI18n(locale);

  const direction = getLocaleDirection(locale);

  return (
    <ThemeProvider>
      <I18nProvider locale={locale}>
        <div className="flex min-h-screen flex-col">
          <Header locale={locale} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
