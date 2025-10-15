/** @jest-environment node */
// src/app/api/streams/route.test.ts
import { GET } from './route';

const ORIGINAL_ENV = process.env;

const VALID_STREAM_ENV = {
  NODVAST_YOUTUBE_ID: 'video-nodvast',
  NODSYD_YOUTUBE_ID: 'video-nodsyd',
  NODOST_YOUTUBE_ID: 'video-nodost',
  NODMIDD_YOUTUBE_ID: 'video-nodmidd',
};

describe('/api/streams', () => {
  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      ...VALID_STREAM_ENV,
    } as NodeJS.ProcessEnv;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns all streams for day 1 with valid configuration', async () => {
    const request = new Request('http://localhost/api/streams?day=1');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.streams).toHaveLength(4);
    expect(data.streams.every((stream: any) => stream.active)).toBe(true);
    expect(data.streams.every((stream: any) => stream.embedUrl.includes('https://www.youtube.com/embed/'))).toBe(
      true
    );
  });

  it('returns only Nodväst as active for day 2', async () => {
    const request = new Request('http://localhost/api/streams?day=2');
    const response = await GET(request);
    const data = await response.json();

    const activeStreams = data.streams.filter((stream: any) => stream.active);
    expect(response.status).toBe(200);
    expect(activeStreams).toHaveLength(1);
    expect(activeStreams[0].id).toBe('nodvast');
    expect(activeStreams[0].day).toBe(2);
  });

  it('rejects invalid day parameters', async () => {
    const request = new Request('http://localhost/api/streams?day=3');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/Invalid day parameter/);
  });

  it('fails with a 500 when required environment variables are missing', async () => {
    process.env = {
      ...process.env,
      NODVAST_YOUTUBE_ID: '',
    } as NodeJS.ProcessEnv;

    const request = new Request('http://localhost/api/streams?day=1');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toMatch(/Stream configuration is incomplete/);
  });
});
