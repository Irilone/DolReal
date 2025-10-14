import type { Locale } from '@/types/i18n';
import { notFound } from 'next/navigation';
import { getLocaleDirection, isValidLocale } from '@/lib/utils/locale';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/features/Header';
import { Footer } from '@/components/features/Footer';

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  if (!isValidLocale(lang)) {
    notFound();
  }
  
  const direction = getLocaleDirection(lang);

  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header locale={lang} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}