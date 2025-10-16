import { useEffect, useState } from 'react';
import type { StreamHealth } from '@/types/stream';

export function useStreamHealth(streamId: string | null, refreshInterval: number = 30000) {
  const [health, setHealth] = useState<StreamHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!streamId) {
      setLoading(false);
      return;
    }

    async function fetchHealth() {
      try {
        const response = await fetch(`/api/stream-health/${streamId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch stream health');
        }

        const data: StreamHealth = await response.json();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, refreshInterval);

    return () => clearInterval(interval);
  }, [streamId, refreshInterval]);

  return { health, loading, error };
}
