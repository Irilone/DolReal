jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body: unknown, init?: ResponseInit) => ({
      body,
      status: init?.status ?? 200,
      headers: new Map([['content-type', 'application/json']]),
    })),
  },
}));

import { buildStreams } from './route';
import type { Stream } from '@/types/stream';

const ORIGINAL_ENV = { ...process.env } as NodeJS.ProcessEnv;
const BASE_ENV = {
  NODVAST_YOUTUBE_ID: 'test-nodvast-id',
  NODSYD_YOUTUBE_ID: 'test-nodsyd-id',
  NODOST_YOUTUBE_ID: 'test-nodost-id',
  NODMIDD_YOUTUBE_ID: 'test-nodmidd-id',
} as const;

describe('buildStreams', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, ...BASE_ENV };
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns four active streams for day 1', () => {
    const streams = buildStreams(1);

    expect(streams).toHaveLength(4);
    expect(streams.every((stream) => stream.active)).toBe(true);
    expect(streams.map((stream) => stream.id)).toEqual([
      'nodvast',
      'nodsyd',
      'nodost',
      'nodmidd',
    ]);
  });

  it('marks only Nodväst active on day 2', () => {
    const streams = buildStreams(2);

    const active = streams.filter((stream) => stream.active);
    const inactive = streams.filter((stream) => !stream.active);

    expect(active).toHaveLength(1);
    expect(active[0].id).toBe('nodvast');
    expect(active[0].day).toBe(2);
    expect(inactive).toHaveLength(3);
    expect(inactive.every((stream) => stream.day === 1)).toBe(true);
  });

  it('constructs valid YouTube embed URLs', () => {
    const streams = buildStreams(1);

    streams.forEach((stream) => {
      expect(stream.embedUrl).toBe(
        `https://www.youtube.com/embed/${encodeURIComponent(stream.youtubeId)}`
      );
    });
  });

  it('uses environment variables for YouTube IDs', () => {
    const streams = buildStreams(1);

    const ids = streams.map((stream: Stream) => stream.youtubeId);
    expect(ids).toEqual([
      'test-nodvast-id',
      'test-nodsyd-id',
      'test-nodost-id',
      'test-nodmidd-id',
    ]);
  });

  it('throws when an expected env var is missing', () => {
    delete process.env.NODVAST_YOUTUBE_ID;

    expect(() => buildStreams(1)).toThrow('Missing environment variable: NODVAST_YOUTUBE_ID');
  });
});
