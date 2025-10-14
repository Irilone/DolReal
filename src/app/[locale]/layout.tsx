import type { Locale } from '@/types/i18n';
import { notFound } from 'next/navigation';
import { getLocaleDirection, isValidLocale } from '@/lib/utils/locale';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/features/Header';
import { Footer } from '@/components/features/Footer';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return [
    { locale: 'se' },
    { locale: 'en' },
    { locale: 'ar' },
    { locale: 'fa' },
    { locale: 'zh' },
    { locale: 'es' },
  ];
}

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = params.locale;

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