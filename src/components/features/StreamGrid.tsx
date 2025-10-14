'use client';

import { useState, useEffect } from 'react';
import type { Stream } from '@/types/stream';
import { StreamCard } from './StreamCard';
import { useStreamStore } from '@/stores/streamStore';

interface StreamGridProps {
  initialStreams: Stream[];
}

export function StreamGrid({ initialStreams }: StreamGridProps) {
  const { streams, setStreams, selectNode } = useStreamStore();

  useEffect(() => {
    setStreams(initialStreams);
  }, [initialStreams, setStreams]);

  const handleStreamSelect = (nodeId: string) => {
    selectNode(nodeId);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {(streams.length > 0 ? streams : initialStreams).map((stream) => (
        <StreamCard
          key={stream.id}
          stream={stream}
          onSelect={() => handleStreamSelect(stream.id)}
        />
      ))}
    </div>
  );
}
