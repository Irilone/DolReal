import { useEffect, useState } from 'react';
import type { ViewerCount } from '@/types/stream';

export function useViewerCount(videoIds: string[], refreshInterval: number = 30000) {
  const [counts, setCounts] = useState<ViewerCount[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoIds.length === 0) {
      setLoading(false);
      return;
    }

    async function fetchCounts() {
      try {
        const params = new URLSearchParams({ videoIds: videoIds.join(',') });
        const response = await fetch(`/api/viewer-count?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch viewer count');
        }

        const data = await response.json();
        setCounts(data.counts);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
    const interval = setInterval(fetchCounts, refreshInterval);

    return () => clearInterval(interval);
  }, [videoIds, refreshInterval]);

  return { counts, total, loading, error };
}
