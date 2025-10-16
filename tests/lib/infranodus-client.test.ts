// tests/lib/infranodus-client.test.ts
import { analyzeText, getGraph } from '@/lib/infranodus/client';
import * as cache from '@/lib/infranodus/cache';
import * as rateLimiter from '@/lib/infranodus/rate-limiter';

// Mock the cache module
jest.mock('@/lib/infranodus/cache');
// Mock the rate-limiter module
jest.mock('@/lib/infranodus/rate-limiter');

const mockedGetCachedData = cache.getCachedData as jest.MockedFunction<typeof cache.getCachedData>;
const mockedSetCachedData = cache.setCachedData as jest.MockedFunction<typeof cache.setCachedData>;
const mockedCheckRateLimit = rateLimiter.checkRateLimit as jest.MockedFunction<typeof rateLimiter.checkRateLimit>;

describe('InfraNodus Client', () => {
  const ORIGINAL_ENV = { ...process.env };
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
    process.env.INFRANODUS_API_KEY = 'test-api-key';
    originalFetch = global.fetch;
    // Mock rate limit to allow requests by default
    mockedCheckRateLimit.mockReturnValue(true);
    // Mock cache to return null by default (no cached data)
    mockedGetCachedData.mockReturnValue(null);
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
    global.fetch = originalFetch;
  });

  describe('analyzeText', () => {
    it('successfully analyzes text and returns context_id', async () => {
      const mockResponse = {
        context_id: 'ctx-123',
        nodes: [{ id: 'node1', label: 'Test' }],
        links: [],
        stats: { node_count: 1, link_count: 0 },
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await analyzeText('test text', 'ctx-123');

      expect(result).toBe('ctx-123');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://infranodus.com/api/analyze',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-api-key',
          },
          body: JSON.stringify({ text: 'test text', context_id: 'ctx-123' }),
        }
      );
      expect(mockedSetCachedData).toHaveBeenCalledWith('ctx-123', mockResponse, 5 * 60 * 1000);
    });

    it('throws error when API key is missing', async () => {
      delete process.env.INFRANODUS_API_KEY;

      await expect(analyzeText('test', 'ctx-1')).rejects.toThrow(
        'INFRANODUS_API_KEY is not configured'
      );
    });

    it('throws error when rate limit is exceeded', async () => {
      mockedCheckRateLimit.mockReturnValue(false);

      await expect(analyzeText('test', 'ctx-1')).rejects.toThrow(
        'Rate limit exceeded. Please wait before making another request.'
      );
    });

    it('throws error when API returns non-ok response', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        statusText: 'Bad Request',
      } as Response);

      await expect(analyzeText('test', 'ctx-1')).rejects.toThrow(
        'InfraNodus API error: Bad Request'
      );
    });

    it('throws error when fetch fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(analyzeText('test', 'ctx-1')).rejects.toThrow('Network error');
    });
  });

  describe('getGraph', () => {
    it('returns cached data when available', async () => {
      const cachedData = {
        context_id: 'ctx-cached',
        nodes: [{ id: 'node1', label: 'Cached' }],
        links: [{ source: 'node1', target: 'node2' }],
        stats: { node_count: 1, link_count: 1 },
      };

      mockedGetCachedData.mockReturnValue(cachedData);

      const result = await getGraph('ctx-cached');

      expect(result).toEqual({
        nodes: cachedData.nodes,
        links: cachedData.links,
      });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('fetches data when cache is empty', async () => {
      const mockResponse = {
        context_id: 'ctx-456',
        nodes: [{ id: 'node2', label: 'Fresh' }],
        links: [],
        stats: { node_count: 1, link_count: 0 },
      };

      mockedGetCachedData.mockReturnValue(null);
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getGraph('ctx-456');

      expect(result).toEqual({
        nodes: mockResponse.nodes,
        links: mockResponse.links,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://infranodus.com/api/graph/ctx-456',
        {
          headers: {
            'Authorization': 'Bearer test-api-key',
          },
        }
      );
      expect(mockedSetCachedData).toHaveBeenCalledWith('ctx-456', mockResponse, 5 * 60 * 1000);
    });

    it('throws error when API key is missing', async () => {
      delete process.env.INFRANODUS_API_KEY;
      mockedGetCachedData.mockReturnValue(null);

      await expect(getGraph('ctx-1')).rejects.toThrow(
        'INFRANODUS_API_KEY is not configured'
      );
    });

    it('throws error when rate limit is exceeded', async () => {
      mockedGetCachedData.mockReturnValue(null);
      mockedCheckRateLimit.mockReturnValue(false);

      await expect(getGraph('ctx-1')).rejects.toThrow(
        'Rate limit exceeded. Please wait before making another request.'
      );
    });

    it('throws error when API returns non-ok response', async () => {
      mockedGetCachedData.mockReturnValue(null);
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(getGraph('ctx-1')).rejects.toThrow(
        'InfraNodus API error: Not Found'
      );
    });

    it('throws error when fetch fails', async () => {
      mockedGetCachedData.mockReturnValue(null);
      global.fetch = jest.fn().mockRejectedValue(new Error('Network timeout'));

      await expect(getGraph('ctx-1')).rejects.toThrow('Network timeout');
    });
  });
});
