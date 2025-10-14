// src/app/api/streams/route.ts
import { NextResponse } from 'next/server';
import type { Stream } from '@/types/stream';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get('day') || '1';

  const streams: Stream[] = [
    {
      id: 'nodvast',
      name: 'Nodväst',
      youtubeId: process.env.NODVAST_YOUTUBE_ID!,
      embedUrl: `https://www.youtube.com/embed/${process.env.NODVAST_YOUTUBE_ID}`,
      active: day === '1' || day === '2', // Day 2: only Nodväst
      day: parseInt(day) as 1 | 2,
    },
    {
      id: 'nodsyd',
      name: 'Nodsyd',
      youtubeId: process.env.NODSYD_YOUTUBE_ID!,
      embedUrl: `https://www.youtube.com/embed/${process.env.NODSYD_YOUTUBE_ID}`,
      active: day === '1', // Inactive on Day 2
      day: 1,
    },
    {
      id: 'nodost',
      name: 'Nodöst',
      youtubeId: process.env.NODOST_YOUTUBE_ID!,
      embedUrl: `https://www.youtube.com/embed/${process.env.NODOST_YOUTUBE_ID}`,
      active: day === '1', // Inactive on Day 2
      day: 1,
    },
    {
      id: 'nodmidd',
      name: 'Nodmidd',
      youtubeId: process.env.NODMIDD_YOUTUBE_ID!,
      embedUrl: `https://www.youtube.com/embed/${process.env.NODMIDD_YOUTUBE_ID}`,
      active: day === '1', // Inactive on Day 2
      day: 1,
    },
  ];

  return NextResponse.json({ streams });
}
