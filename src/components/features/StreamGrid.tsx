// src/components/features/StreamGrid.tsx
'use client';

import type { Stream } from '@/types/stream';
import { StreamCard } from './StreamCard';

interface StreamGridProps {
  initialStreams: Stream[];
}

export function StreamGrid({ initialStreams }: StreamGridProps) {
  if (initialStreams.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-500 dark:text-slate-400">Loading streams...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {initialStreams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} onSelect={() => {}} />
      ))}
    </div>
  );
}