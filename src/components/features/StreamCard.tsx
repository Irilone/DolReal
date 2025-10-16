'use client';

import { useTranslation } from 'react-i18next';
import type { Stream } from '@/types/stream';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StreamCardProps {
  stream: Stream;
  onSelect: () => void;
}

export function StreamCard({ stream, onSelect }: StreamCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{stream.name}</span>
          {stream.active ? (
            <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              {t('streams.live')}
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {t('streams.inactive')}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-200 shadow-inner dark:bg-slate-800">
          {stream.active ? (
            <iframe
              src={stream.embedUrl}
              title={stream.name}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto mb-2 h-12 w-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Stream ej aktiv
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              {t('event.day' + stream.day, { defaultValue: `Dag ${stream.day}` })}
            </span>
          </div>
          <Button
            onClick={onSelect}
            disabled={!stream.active}
            size="sm"
            className="transition-transform hover:scale-105"
          >
            {stream.active ? (
              <>
                <svg
                  className="mr-1.5 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                {t('streams.watch')}
              </>
            ) : (
              t('streams.inactive')
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
