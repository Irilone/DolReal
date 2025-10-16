'use client';

import { useTranslation } from 'react-i18next';
import type { StreamHealth } from '@/types/stream';
import { useStreamHealth } from '@/hooks/useStreamHealth';

interface StreamHealthIndicatorProps {
  streamId: string | null;
  refreshInterval?: number;
}

export function StreamHealthIndicator({ 
  streamId, 
  refreshInterval = 30000 
}: StreamHealthIndicatorProps) {
  const { t } = useTranslation();
  const { health, loading } = useStreamHealth(streamId, refreshInterval);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <div className="h-3 w-3 animate-pulse rounded-full bg-slate-300"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (!health) {
    return null;
  }

  const statusColors = {
    good: 'bg-green-500',
    ok: 'bg-yellow-500',
    bad: 'bg-red-500',
    offline: 'bg-slate-400',
  };

  const statusText = {
    good: t('health.good'),
    ok: t('health.ok'),
    bad: t('health.bad'),
    offline: t('health.offline'),
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${statusColors[health.status]}`} />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {statusText[health.status]}
      </span>
    </div>
  );
}
