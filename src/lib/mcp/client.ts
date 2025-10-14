// src/lib/mcp/client.ts
export class MCPClient {
  constructor(private config: { serverUrl: string; auth?: any }) {}

  async call(method: string, params: any) {
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
