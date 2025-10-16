// src/lib/mcp/client.ts
interface MCPAuth {
  token: string;
}

export class MCPClient {
  constructor(private config: { serverUrl: string; auth?: MCPAuth }) {}

  async call(method: string, params: Record<string, unknown>) {
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
