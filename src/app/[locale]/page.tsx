'use client';

import { useState, useEffect } from 'react';
import type { Locale } from '@/types/i18n';
import type { Stream } from '@/types/stream';
import { StreamGrid } from '@/components/features/StreamGrid';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { ViewerCount } from '@/components/features/ViewerCount';

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

interface HomePageProps {
  params: { locale: Locale };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const [initialStreams, setInitialStreams] = useState<Stream[]>([]);

  useEffect(() => {
    getInitialStreams().then(setInitialStreams);
  }, []);

  const activeVideoIds = initialStreams
    .filter((s) => s.active)
    .map((s) => s.youtubeId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl">
          Dagar om Lagar 2025
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-slate-600 dark:text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Välkommen till Dagar om Lagar 2025.
        </p>
        <p className="mt-2 max-w-md mx-auto text-base text-slate-500 dark:text-slate-500 sm:text-lg md:mt-3 md:text-xl md:max-w-3xl">
          6-7 november 2025
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <nav aria-label="Website settings">
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </nav>
        <ViewerCount videoIds={activeVideoIds} aria-label="Live viewer count" />
      </div>

      <StreamGrid initialStreams={initialStreams} />
    </div>
  );
}