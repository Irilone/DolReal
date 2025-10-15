import { NextRequest, NextResponse } from 'next/server'
import { Stream } from '@/types'

const streams: Stream[] = [
  { id: '1', node: 'nodvast', title: 'Nodväst', youtubeId: process.env.NODVAST_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '2', node: 'nodsyd', title: 'Nodsyd', youtubeId: process.env.NODSYD_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '3', node: 'nodost', title: 'Nodöst', youtubeId: process.env.NODOST_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '4', node: 'nodmidd', title: 'Nodmidd', youtubeId: process.env.NODMIDD_YOUTUBE_ID || '', active: true, day: 1 },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const day = searchParams.get('day')

  if (day === '2') {
    return NextResponse.json(streams.map(s => ({
      ...s,
      active: s.node === 'nodvast'
    })))
  }

  return NextResponse.json(streams)
type Day = 1 | 2;

type StreamDefinition = {
  id: Stream['id'];
  name: Stream['title'];
  envKey: string;
  activeDays: readonly Day[];
  defaultDay: Day;
};

const STREAM_DEFINITIONS: readonly StreamDefinition[] = [
  {
    id: 'nodvast',
    name: 'Nodväst',
    envKey: 'NODVAST_YOUTUBE_ID',
    activeDays: [1, 2],
    defaultDay: 1,
  },
  {
    id: 'nodsyd',
    name: 'Nodsyd',
    envKey: 'NODSYD_YOUTUBE_ID',
    activeDays: [1],
    defaultDay: 1,
  },
  {
    id: 'nodost',
    name: 'Nodöst',
    envKey: 'NODOST_YOUTUBE_ID',
    activeDays: [1],
    defaultDay: 1,
  },
  {
    id: 'nodmidd',
    name: 'Nodmidd',
    envKey: 'NODMIDD_YOUTUBE_ID',
    activeDays: [1],
    defaultDay: 1,
  },
] as const;

const YOUTUBE_EMBED_BASE = 'https://www.youtube.com';

function parseDayParam(value: string | null): Day | null {
  if (value === null || value === '1') {
    return 1;
  }

  if (value === '2') {
    return 2;
  }

  return null;
}

function requireEnv(key: string, env: NodeJS.ProcessEnv): string {
  const value = env[key];

  if (!value || !value.trim()) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

function buildStreams(day: Day, env: NodeJS.ProcessEnv = process.env): Stream[] {
  return STREAM_DEFINITIONS.map((definition) => {
    const youtubeId = requireEnv(definition.envKey, env);
    const active = definition.activeDays.includes(day);

    const embedUrl = new URL(`/embed/${encodeURIComponent(youtubeId)}`, YOUTUBE_EMBED_BASE).toString();

    return {
      id: definition.id,
      name: definition.name,
      youtubeId,
      embedUrl,
      active,
      day: active ? day : definition.defaultDay,
    } satisfies Stream;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dayParam = searchParams.get('day');
  const day = parseDayParam(dayParam);

  if (day === null) {
    return NextResponse.json(
      { error: 'Invalid day parameter. Allowed values are "1" or "2".' },
      { status: 400 }
    );
  }

  try {
    const streams = buildStreams(day);
    return NextResponse.json({ streams });
  } catch (error) {
    return NextResponse.json(
      { error: 'Stream configuration is incomplete. Verify YouTube environment variables.' },
      { status: 500 }
    );
  }
}

export { buildStreams };
