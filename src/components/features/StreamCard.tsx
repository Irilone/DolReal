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
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{stream.name}</span>
          {stream.active ? (
            <span className="flex items-center gap-1 text-sm font-medium text-red-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              {t('streams.live')}
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-500">
              {t('streams.inactive')}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
          <iframe
            src={stream.embedUrl}
            title={stream.name}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Day {stream.day}
          </p>
          <Button onClick={onSelect} disabled={!stream.active} size="sm">
            {t('streams.watch')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
