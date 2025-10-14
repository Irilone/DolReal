// src/components/features/StreamCarousel.tsx
'use client';
import { YouTubePlayer } from './YouTubePlayer';
import type { Stream } from '@/types/stream';
import { useState } from 'react';

interface StreamCarouselProps {
  streams: Stream[];
  currentDay: 1 | 2;
}

export function StreamCarousel({ streams, currentDay }: StreamCarouselProps) {
  const [activeStreamId, setActiveStreamId] = useState<string | null>(null);

  return (
    <div>
      {streams.map((stream) => (
        <div key={stream.id}>
          <h2>{stream.name}</h2>
          {currentDay === 2 && stream.id !== 'nodvast' ? (
            <p>Ej aktiv idag</p>
          ) : (
            <button onClick={() => setActiveStreamId(stream.id)}>Play</button>
          )}
        </div>
      ))}
      {activeStreamId && <YouTubePlayer videoId={streams.find(s => s.id === activeStreamId)?.youtubeId || ''} />}
    </div>
  );
}
