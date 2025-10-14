'use client';

import { use, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Locale } from '@/types/i18n';
import type { Stream } from '@/types/stream';
import { StreamGrid } from '@/components/features/StreamGrid';
import { LanguageSelector } from '@/components/features/LanguageSelector';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { ViewerCount } from '@/components/features/ViewerCount';

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default function HomePage({ params }: HomePageProps) {
  const { lang } = use(params);
  const { t } = useTranslation();
  const [initialStreams, setInitialStreams] = useState<Stream[]>([]);

  useEffect(() => {
    async function getInitialStreams(): Promise<Stream[]> {
      try {
        const res = await fetch('/api/streams');
        if (!res.ok) {
          console.error('Failed to fetch initial streams');
          return [];
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching streams:', error);
        return [];
      }
    }
    getInitialStreams().then(setInitialStreams);
  }, []);

  const activeVideoIds = initialStreams
    .filter((s) => s.active)
    .map((s) => s.youtubeId);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl md:text-7xl">
            {t('event.title')}
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-xl text-slate-600 dark:text-slate-400">
            {t('event.description')}
          </p>
          <div className="mb-8 flex items-center justify-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{t('event.dates')}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LanguageSelector currentLocale={lang} />
            <ThemeToggle />
            <ViewerCount videoIds={activeVideoIds} />
          </div>
        </div>
      </div>

      {/* Streams Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            {t('streams.live')} {t('streams.title', { defaultValue: 'Strömmar' })}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Välj en stream för att titta live
          </p>
        </div>
        <StreamGrid initialStreams={initialStreams} />
      </div>
    </>
  );
}
