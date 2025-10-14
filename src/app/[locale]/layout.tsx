import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/types/i18n';
import { isValidLocale, getLocaleDirection } from '@/lib/utils/locale';
import { initI18n } from '@/i18n/config';

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

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;

  return {
    title: 'Dagar om Lagar 2025',
    description: 'Ett juridiskt symposium som utforskar lagar och samhälle',
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const direction = getLocaleDirection(locale);

  // Initialize i18n on server
  initI18n(locale);

  return (
    <div lang={locale} dir={direction}>
      {children}
    </div>
  );
}
