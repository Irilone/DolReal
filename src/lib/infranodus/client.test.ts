/* @jest-environment node */
// src/lib/infranodus/client.test.ts
import { analyzeText, getGraph } from './client';

// Mock the cache and rate limiter modules
jest.mock('./cache', () => ({
  getCachedData: jest.fn(),
  setCachedData: jest.fn(),
}));

jest.mock('./rate-limiter', () => ({
  checkRateLimit: jest.fn(() => true),
}));

const ORIGINAL_ENV = { ...process.env };

describe('InfraNodus Client', () => {
  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      INFRANODUS_API_KEY: 'test-api-key',
    } as NodeJS.ProcessEnv;
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV } as NodeJS.ProcessEnv;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV as NodeJS.ProcessEnv;
  });

  describe('analyzeText', () => {
    it('successfully analyzes text and returns context ID', async () => {
      const mockResponse = {
        context_id: 'test-context-123',
        nodes: [],
        links: [],
        stats: { node_count: 0, link_count: 0 },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await analyzeText('test text', 'test-context');

      expect(result).toBe('test-context-123');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://infranodus.com/api/analyze',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-api-key',
          }),
        })
      );
    });

    it('throws error when API key is not configured', async () => {
      process.env.INFRANODUS_API_KEY = '';

      await expect(analyzeText('test text', 'test-context')).rejects.toThrow(
        'INFRANODUS_API_KEY is not configured'
      );
    });

    it('throws error when API request fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(analyzeText('test text', 'test-context')).rejects.toThrow(
        'InfraNodus API error: Not Found'
      );
    });

    it('throws error when rate limit is exceeded', async () => {
      const { checkRateLimit } = require('./rate-limiter');
      (checkRateLimit as jest.Mock).mockReturnValueOnce(false);

      await expect(analyzeText('test text', 'test-context')).rejects.toThrow(
        'Rate limit exceeded'
      );
    });
  });

  describe('getGraph', () => {
    it('returns cached graph data if available', async () => {
      const { getCachedData } = require('./cache');
      const mockCachedData = {
        context_id: 'test-context',
        nodes: [{ id: 'node1', label: 'Node 1' }],
        links: [{ source: 'node1', target: 'node2' }],
        stats: { node_count: 1, link_count: 1 },
      };

      (getCachedData as jest.Mock).mockReturnValueOnce(mockCachedData);

      const result = await getGraph('test-context');

      expect(result).toEqual({
        nodes: mockCachedData.nodes,
        links: mockCachedData.links,
      });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('fetches graph data from API when not cached', async () => {
      const { getCachedData } = require('./cache');
      (getCachedData as jest.Mock).mockReturnValueOnce(null);

      const mockResponse = {
        context_id: 'test-context-123',
        nodes: [{ id: 'node1', label: 'Node 1' }],
        links: [{ source: 'node1', target: 'node2' }],
        stats: { node_count: 1, link_count: 1 },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getGraph('test-context');

      expect(result).toEqual({
        nodes: mockResponse.nodes,
        links: mockResponse.links,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://infranodus.com/api/graph/test-context',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-api-key',
          }),
        })
      );
    });

    it('throws error when API key is not configured', async () => {
      const { getCachedData } = require('./cache');
      (getCachedData as jest.Mock).mockReturnValueOnce(null);
      process.env.INFRANODUS_API_KEY = '';

      await expect(getGraph('test-context')).rejects.toThrow(
        'INFRANODUS_API_KEY is not configured'
      );
    });

    it('throws error when API request fails', async () => {
      const { getCachedData } = require('./cache');
      (getCachedData as jest.Mock).mockReturnValueOnce(null);

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(getGraph('test-context')).rejects.toThrow(
        'InfraNodus API error: Internal Server Error'
      );
    });

    it('caches fetched graph data', async () => {
      const { getCachedData, setCachedData } = require('./cache');
      (getCachedData as jest.Mock).mockReturnValueOnce(null);

      const mockResponse = {
        context_id: 'test-context-123',
        nodes: [{ id: 'node1', label: 'Node 1' }],
        links: [{ source: 'node1', target: 'node2' }],
        stats: { node_count: 1, link_count: 1 },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await getGraph('test-context');

      expect(setCachedData).toHaveBeenCalledWith(
        'test-context',
        mockResponse,
        5 * 60 * 1000
      );
    });
  });
});
