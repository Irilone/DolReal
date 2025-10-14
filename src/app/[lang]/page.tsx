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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl">
          {t('event.title')}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-slate-600 dark:text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {t('event.description')}
        </p>
        <p className="mt-2 max-w-md mx-auto text-base text-slate-500 dark:text-slate-500 sm:text-lg md:mt-3 md:text-xl md:max-w-3xl">
          {t('event.dates')}
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <nav aria-label="Website settings">
          <div className="flex items-center gap-4">
            <LanguageSelector currentLocale={lang} />
            <ThemeToggle />
          </div>
        </nav>
        <ViewerCount videoIds={activeVideoIds} aria-label="Live viewer count" />
      </div>

      <StreamGrid initialStreams={initialStreams} />
    </div>
  );
}
