// src/app/api/streams/route.test.ts
import { GET } from './route';
import type { Stream } from '@/types/stream';

// Store original env
const ORIGINAL_ENV = { ...process.env };

describe('/api/streams', () => {
  beforeEach(() => {
    // Set up test environment variables
    process.env = {
      ...ORIGINAL_ENV,
      NODVAST_YOUTUBE_ID: 'test-nodvast-id',
      NODSYD_YOUTUBE_ID: 'test-nodsyd-id',
      NODOST_YOUTUBE_ID: 'test-nodost-id',
      NODMIDD_YOUTUBE_ID: 'test-nodmidd-id',
    };
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  describe('Day 1 behavior', () => {
    it('returns all streams for day 1', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      expect(data.streams).toHaveLength(4);
      expect(data.streams.every((s: any) => s.active)).toBe(true);
    });

    it('returns correct stream structure for day 1', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      const stream = data.streams[0];
      expect(stream).toHaveProperty('id');
      expect(stream).toHaveProperty('name');
      expect(stream).toHaveProperty('youtubeId');
      expect(stream).toHaveProperty('embedUrl');
      expect(stream).toHaveProperty('active');
      expect(stream).toHaveProperty('day');
    });

    it('returns all expected stream IDs for day 1', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      const streamIds = data.streams.map((s: Stream) => s.id);
      expect(streamIds).toEqual(['nodvast', 'nodsyd', 'nodost', 'nodmidd']);
    });

    it('sets correct day property for all streams on day 1', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      data.streams.forEach((stream: Stream) => {
        expect(stream.day).toBe(1);
      });
    });
  });

  describe('Day 2 behavior', () => {
    it('returns only Nodväst as active for day 2', async () => {
      const request = new Request('http://localhost/api/streams?day=2');
      const response = await GET(request);
      const data = await response.json();

      const activeStreams = data.streams.filter((s: Stream) => s.active);
      expect(activeStreams).toHaveLength(1);
      expect(activeStreams[0].id).toBe('nodvast');
    });

    it('returns all 4 streams for day 2 (with 3 inactive)', async () => {
      const request = new Request('http://localhost/api/streams?day=2');
      const response = await GET(request);
      const data = await response.json();

      expect(data.streams).toHaveLength(4);
      const inactiveStreams = data.streams.filter((s: Stream) => !s.active);
      expect(inactiveStreams).toHaveLength(3);
    });

    it('sets correct day property for Nodväst on day 2', async () => {
      const request = new Request('http://localhost/api/streams?day=2');
      const response = await GET(request);
      const data = await response.json();

      const nodvast = data.streams.find((s: Stream) => s.id === 'nodvast');
      expect(nodvast.day).toBe(2);
    });

    it('keeps day 1 for inactive streams on day 2', async () => {
      const request = new Request('http://localhost/api/streams?day=2');
      const response = await GET(request);
      const data = await response.json();

      const inactiveStreams = data.streams.filter((s: Stream) => !s.active);
      inactiveStreams.forEach((stream: Stream) => {
        expect(stream.day).toBe(1);
      });
    });
  });

  describe('Default behavior', () => {
    it('defaults to day 1 when no day parameter provided', async () => {
      const request = new Request('http://localhost/api/streams');
      const response = await GET(request);
      const data = await response.json();

      expect(data.streams).toHaveLength(4);
      expect(data.streams.every((s: Stream) => s.active)).toBe(true);
    });

    it('defaults to day 1 when empty day parameter provided', async () => {
      const request = new Request('http://localhost/api/streams?day=');
      const response = await GET(request);
      const data = await response.json();

      const activeStreams = data.streams.filter((s: Stream) => s.active);
      expect(activeStreams).toHaveLength(4);
    });
  });

  describe('Invalid day parameter handling', () => {
    it('handles invalid day parameter gracefully (treats as string)', async () => {
      const request = new Request('http://localhost/api/streams?day=3');
      const response = await GET(request);
      const data = await response.json();

      // Implementation treats any non-'1' or '2' as inactive for all except nodvast
      expect(response.status).toBe(200);
      expect(data.streams).toHaveLength(4);
    });

    it('handles non-numeric day parameter', async () => {
      const request = new Request('http://localhost/api/streams?day=invalid');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.streams).toHaveLength(4);
    });
  });

  describe('YouTube embed URL format', () => {
    it('generates correct embed URLs', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      data.streams.forEach((stream: Stream) => {
        expect(stream.embedUrl).toMatch(/^https:\/\/www\.youtube\.com\/embed\//);
        expect(stream.embedUrl).toContain(stream.youtubeId);
      });
    });

    it('uses environment variables for YouTube IDs', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      expect(data.streams[0].youtubeId).toBe('test-nodvast-id');
      expect(data.streams[1].youtubeId).toBe('test-nodsyd-id');
      expect(data.streams[2].youtubeId).toBe('test-nodost-id');
      expect(data.streams[3].youtubeId).toBe('test-nodmidd-id');
    });
  });

  describe('Response format', () => {
    it('returns JSON response with streams array', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toHaveProperty('streams');
      expect(Array.isArray(data.streams)).toBe(true);
    });

    it('returns 200 status code', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);

      expect(response.status).toBe(200);
    });

    it('returns correct content-type header', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);

      expect(response.headers.get('content-type')).toContain('application/json');
    });
  });

  describe('Stream names and IDs', () => {
    it('returns correct stream names', async () => {
      const request = new Request('http://localhost/api/streams?day=1');
      const response = await GET(request);
      const data = await response.json();

      const names = data.streams.map((s: Stream) => s.name);
      expect(names).toEqual(['Nodväst', 'Nodsyd', 'Nodöst', 'Nodmidd']);
    });

    it('maintains consistent stream order', async () => {
      const request1 = new Request('http://localhost/api/streams?day=1');
      const request2 = new Request('http://localhost/api/streams?day=2');
      
      const response1 = await GET(request1);
      const response2 = await GET(request2);
      
      const data1 = await response1.json();
      const data2 = await response2.json();

      const ids1 = data1.streams.map((s: Stream) => s.id);
      const ids2 = data2.streams.map((s: Stream) => s.id);

      expect(ids1).toEqual(ids2);
    });
  });

  describe('Environment variable handling', () => {
    it('handles missing environment variables', async () => {
      process.env.NODVAST_YOUTUBE_ID = undefined;
      
      const request = new Request('http://localhost/api/streams?day=1');
      
      // The implementation uses non-null assertion, so it will return undefined
      // This test documents the current behavior
      const response = await GET(request);
      const data = await response.json();
      
      expect(data.streams[0].youtubeId).toBeUndefined();
    });
  });
});