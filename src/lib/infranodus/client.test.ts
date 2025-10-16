// src/lib/infranodus/client.test.ts
import { getInfraNodusEmbed, fetchGraphData } from './client';
import { MCPClient } from '@/lib/mcp/client';

// Mock MCPClient
jest.mock('@/lib/mcp/client');
// Mock fetch globally
// @ts-ignore
global.fetch = jest.fn();

describe('InfraNodus Client', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getInfraNodusEmbed', () => {
    describe('with MCP enabled', () => {
      beforeEach(() => {
        process.env.INFRANODUS_MCP_ENABLED = 'true';
        process.env.INFRANODUS_MCP_URL = 'http://localhost:8080/mcp';
      });

      it('uses MCP client when enabled', async () => {
        const mockCall = jest.fn().mockResolvedValue({
          embedUrl: 'http://mcp-embed-url/node123',
        });

        (MCPClient as jest.Mock).mockImplementation(() => ({
          call: mockCall,
        }));

        const result = await getInfraNodusEmbed('node123');

        expect(result).toBe('http://mcp-embed-url/node123');
        expect(MCPClient).toHaveBeenCalledWith({
          serverUrl: 'http://localhost:8080/mcp',
        });
        expect(mockCall).toHaveBeenCalledWith('getEmbed', { nodeId: 'node123' });
      });

      it('passes correct node ID to MCP client', async () => {
        const mockCall = jest.fn().mockResolvedValue({
          embedUrl: 'http://embed-url',
        });

        (MCPClient as jest.Mock).mockImplementation(() => ({
          call: mockCall,
        }));

        await getInfraNodusEmbed('test-node-456');

        expect(mockCall).toHaveBeenCalledWith('getEmbed', {
          nodeId: 'test-node-456',
        });
      });

      it('handles MCP client errors', async () => {
        const mockCall = jest
          .fn()
          .mockRejectedValue(new Error('MCP connection failed'));

        (MCPClient as jest.Mock).mockImplementation(() => ({
          call: mockCall,
        }));

        await expect(getInfraNodusEmbed('error-node')).rejects.toThrow(
          'MCP connection failed'
        );
      });

      it('handles missing embedUrl in MCP response', async () => {
        const mockCall = jest.fn().mockResolvedValue({});

        (MCPClient as jest.Mock).mockImplementation(() => ({
          call: mockCall,
        }));

        const result = await getInfraNodusEmbed('node123');

        expect(result).toBeUndefined();
      });
    });

    describe('with MCP disabled (fallback)', () => {
      beforeEach(() => {
        process.env.INFRANODUS_MCP_ENABLED = 'false';
      });

      it('returns iframe embed URL when MCP is disabled', async () => {
        const result = await getInfraNodusEmbed('node789');

        expect(result).toBe('https://infranodus.com/embed/node789');
        expect(MCPClient).not.toHaveBeenCalled();
      });

      it('correctly encodes node IDs in URLs', async () => {
        const result = await getInfraNodusEmbed('node-with-special-chars');

        expect(result).toBe(
          'https://infranodus.com/embed/node-with-special-chars'
        );
      });

      it('handles empty node ID', async () => {
        const result = await getInfraNodusEmbed('');

        expect(result).toBe('https://infranodus.com/embed/');
      });
    });

    describe('with MCP env var not set', () => {
      beforeEach(() => {
        delete process.env.INFRANODUS_MCP_ENABLED;
      });

      it('defaults to fallback when MCP_ENABLED is undefined', async () => {
        const result = await getInfraNodusEmbed('default-node');

        expect(result).toBe('https://infranodus.com/embed/default-node');
        expect(MCPClient).not.toHaveBeenCalled();
      });
    });
  });

  describe('fetchGraphData', () => {
    beforeEach(() => {
      process.env.INFRANODUS_API_KEY = 'test-api-key-123';
    });

    it('fetches graph data from REST API', async () => {
      const mockGraphData = {
        nodes: [
          { id: '1', label: 'Node 1' },
          { id: '2', label: 'Node 2' },
        ],
        edges: [{ from: '1', to: '2' }],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockGraphData,
      });

      const result = await fetchGraphData('graph123');

      expect(result).toEqual(mockGraphData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://infranodus.com/api/graph/graph123',
        {
          headers: {
            Authorization: 'Bearer test-api-key-123',
          },
        }
      );
    });

    it('includes API key in authorization header', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await fetchGraphData('node-abc');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-api-key-123',
          }),
        })
      );
    });

    it('constructs correct API URL with node ID', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await fetchGraphData('special-node-id');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://infranodus.com/api/graph/special-node-id',
        expect.any(Object)
      );
    });

    it('handles fetch errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      await expect(fetchGraphData('error-node')).rejects.toThrow(
        'Network error'
      );
    });

    it('handles non-OK responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(fetchGraphData('missing-node')).rejects.toThrow(
        'InfraNodus API error: 404 Not Found'
      );
    });

    it('handles JSON parsing errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(fetchGraphData('invalid-json-node')).rejects.toThrow(
        'Invalid JSON'
      );
    });

    it('handles missing API key', async () => {
      delete process.env.INFRANODUS_API_KEY;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      await fetchGraphData('node-id');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer undefined',
          }),
        })
      );
    });
  });

  describe('Integration scenarios', () => {
    it('can switch between MCP and fallback modes', async () => {
      process.env.INFRANODUS_MCP_ENABLED = 'true';
      process.env.INFRANODUS_MCP_URL = 'http://localhost:8080';

      const mockCall = jest.fn().mockResolvedValue({
        embedUrl: 'http://mcp-url',
      });

      (MCPClient as jest.Mock).mockImplementation(() => ({
        call: mockCall,
      }));

      let result = await getInfraNodusEmbed('node1');
      expect(result).toBe('http://mcp-url');

      process.env.INFRANODUS_MCP_ENABLED = 'false';
      jest.clearAllMocks();

      result = await getInfraNodusEmbed('node2');
      expect(result).toBe('https://infranodus.com/embed/node2');
      expect(MCPClient).not.toHaveBeenCalled();
    });

    it('handles complex node IDs correctly', async () => {
      const complexId = 'node-123-abc_def.ghi';
      const result = await getInfraNodusEmbed(complexId);

      expect(result).toBe(`https://infranodus.com/embed/${complexId}`);
    });
  });

  describe('Error recovery', () => {
    it('does not fallback to iframe when MCP is enabled but fails', async () => {
      process.env.INFRANODUS_MCP_ENABLED = 'true';
      process.env.INFRANODUS_MCP_URL = 'http://localhost:8080';

      (MCPClient as jest.Mock).mockImplementation(() => ({
        call: jest.fn().mockRejectedValue(new Error('MCP failed')),
      }));

      await expect(getInfraNodusEmbed('node-id')).rejects.toThrow(
        'MCP failed'
      );
    });
  });
});
