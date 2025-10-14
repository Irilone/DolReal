'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ViewerCount as ViewerCountType } from '@/types/stream';

interface ViewerCountProps {
  videoIds: string[];
  refreshInterval?: number;
}

export function ViewerCount({ videoIds, refreshInterval = 30000 }: ViewerCountProps) {
  const { t } = useTranslation();
  const [counts, setCounts] = useState<ViewerCountType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchViewerCount() {
      try {
        const params = new URLSearchParams({ videoIds: videoIds.join(',') });
        const response = await fetch(`/api/viewer-count?${params}`);
        const data = await response.json();
        
        setCounts(data.counts);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching viewer count:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchViewerCount();
    const interval = setInterval(fetchViewerCount, refreshInterval);

    return () => clearInterval(interval);
  }, [videoIds, refreshInterval]);

  if (loading) {
    return (
      <div className="text-sm text-slate-600 dark:text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
        {total.toLocaleString()} {t('streams.viewers')}
      </span>
    </div>
  );
}
