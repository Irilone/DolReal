// src/components/features/StreamGrid.tsx
'use client';

import type { Stream } from '@/types/stream';
import { StreamCard } from './StreamCard';

interface StreamGridProps {
  initialStreams: Stream[];
}

export function StreamGrid({ initialStreams }: StreamGridProps) {
  return (
    <div>
      {initialStreams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} onSelect={() => {}} />
      ))}
    </div>
  );
}