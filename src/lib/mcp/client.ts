// src/lib/mcp/client.ts
interface MCPAuth {
  token: string;
}

interface MCPConfig {
  serverUrl: string;
  auth?: MCPAuth;
}

export class MCPClient {
  constructor(private config: MCPConfig) {}

  async call(method: string, params: Record<string, unknown>): Promise<unknown> {
    const response = await fetch(this.config.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.auth && {
          'Authorization': `Bearer ${this.config.auth.token}`,
        }),
      },
      body: JSON.stringify({ method, params }),
    });
    return response.json();
  }
}
