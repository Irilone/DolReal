// src/components/features/ViewerCount.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ViewerCountProps {
  videoIds: string[];
}

export function ViewerCount({ videoIds }: ViewerCountProps) {
  const { t } = useTranslation();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Placeholder - actual YouTube API integration needed
    setCount(videoIds.length * 42);
  }, [videoIds]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
      </span>
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {count} {t('streams.viewers')}
      </span>
    </div>
  );
}