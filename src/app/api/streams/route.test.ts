// src/app/api/streams/route.test.ts
import { GET } from './route';

describe('/api/streams', () => {
  it('returns all streams for day 1', async () => {
    const request = new Request('http://localhost/api/streams?day=1');
    const response = await GET(request);
    const data = await response.json();

    expect(data.streams).toHaveLength(4);
    expect(data.streams.every((s: any) => s.active)).toBe(true);
  });

  it('returns only Nodväst for day 2', async () => {
    const request = new Request('http://localhost/api/streams?day=2');
    const response = await GET(request);
    const data = await response.json();

    const activeStreams = data.streams.filter((s: any) => s.active);
    expect(activeStreams).toHaveLength(1);
    expect(activeStreams[0].id).toBe('nodvast');
  });
});
