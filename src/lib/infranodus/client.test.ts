// src/lib/infranodus/client.test.ts
import { getInfraNodusEmbed, fetchGraphData } from './client';
import { MCPClient } from '@/lib/mcp/client';

// Mocks for MCP client
const callMock = jest.fn();
const MCPClientImpl = jest.fn().mockImplementation(() => ({ call: callMock }));

jest.mock('@/lib/mcp/client', () => ({
  MCPClient: jest.fn(),
}));

describe('infranodus client', () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    (MCPClient as unknown as jest.Mock).mockImplementation(MCPClientImpl);
    callMock.mockReset();
    process.env = { ...ORIGINAL_ENV };
    process.env.INFRANODUS_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it('uses MCP when enabled', async () => {
    process.env.INFRANODUS_MCP_ENABLED = 'true';
    process.env.INFRANODUS_MCP_URL = 'https://mcp.test/rpc';
    callMock.mockResolvedValueOnce({ embedUrl: 'https://embed/mocked' });

    const url = await getInfraNodusEmbed('abc');

    expect(MCPClient).toHaveBeenCalledWith({ serverUrl: 'https://mcp.test/rpc' });
    expect(callMock).toHaveBeenCalledWith('getEmbed', { nodeId: 'abc' });
    expect(url).toBe('https://embed/mocked');
  });

  it('falls back to static embed URL when MCP disabled', async () => {
    delete process.env.INFRANODUS_MCP_ENABLED;

    const url = await getInfraNodusEmbed('xyz');

    expect(url).toBe('https://infranodus.com/embed/xyz');
    expect(MCPClientImpl).not.toHaveBeenCalled();
  });

  it('fetchGraphData calls REST API with auth header', async () => {
    const fake = { ok: true };
    const jsonMock = jest.fn().mockResolvedValue(fake);
    const fetchMock = jest.fn().mockResolvedValue({ json: jsonMock } as any);
    // @ts-ignore override global fetch for test
    global.fetch = fetchMock;

    const res = await fetchGraphData('node-7');

    expect(fetchMock).toHaveBeenCalledWith('https://infranodus.com/api/graph/node-7', {
      headers: {
        Authorization: `Bearer ${process.env.INFRANODUS_API_KEY}`,
      },
    });
    expect(res).toBe(fake);
  });
});