import type { Locale } from '@/types/i18n';
import { notFound } from 'next/navigation';
import { getLocaleDirection, isValidLocale } from '@/lib/utils/locale';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/features/Header';
import { Footer } from '@/components/features/Footer';

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!isValidLocale(locale)) {
    notFound();
  }
  
  const direction = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header locale={locale} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
