// src/app/api/graph/route.test.ts
import { GET } from './route';
import { getInfraNodusEmbed } from '@/lib/infranodus/client';

jest.mock('@/lib/infranodus/client', () => ({
  getInfraNodusEmbed: jest.fn(),
}));

const mockedGet = getInfraNodusEmbed as jest.MockedFunction<typeof getInfraNodusEmbed>;

describe('/api/graph', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('returns embedUrl and fallback iframe for provided nodeId', async () => {
    mockedGet.mockResolvedValue('https://infranodus.com/embed/node-42');

    const req = new Request('http://localhost/api/graph?nodeId=node-42');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.embedUrl).toBe('https://infranodus.com/embed/node-42');
    expect(data.fallbackIframe).toContain(data.embedUrl);
  });

  it('uses default nodeId when missing', async () => {
    mockedGet.mockResolvedValue('https://infranodus.com/embed/default');

    const req = new Request('http://localhost/api/graph');
    const res = await GET(req);
    const data = await res.json();

    expect(mockedGet).toHaveBeenCalledWith('default');
    expect(data.embedUrl).toBe('https://infranodus.com/embed/default');
  });

  it('returns 500 when client throws', async () => {
    mockedGet.mockRejectedValue(new Error('boom'));

    const req = new Request('http://localhost/api/graph?nodeId=broken');
    const res = await GET(req);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/Failed to load graph/);
  });
});