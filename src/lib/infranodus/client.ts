// src/lib/infranodus/client.ts

// Option 1: MCP Server (if available)
import { MCPClient } from '@/lib/mcp/client';

export async function getInfraNodusEmbed(nodeId: string): Promise<string> {
  if (process.env.INFRANODUS_MCP_ENABLED === 'true') {
    const mcpClient = new MCPClient({
      serverUrl: process.env.INFRANODUS_MCP_URL!,
    });
    const result = await mcpClient.call('getEmbed', { nodeId });
    return result.embedUrl;
  }

  // Option 2: Fallback to iframe embed
  return `https://infranodus.com/embed/${nodeId}`;
}

// Option 3: REST API (if available)
export async function fetchGraphData(nodeId: string) {
  const response = await fetch(
    `https://infranodus.com/api/graph/${nodeId}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.INFRANODUS_API_KEY}`,
      },
    }
  );
  return response.json();
}
