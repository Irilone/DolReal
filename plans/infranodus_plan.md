# InfraNodus Integration Plan

## Objective
Integrate InfraNodus knowledge graph visualization and network analysis into "Dagar om Lagar 2025" Next.js application using REST API.

## InfraNodus Overview
- **Purpose**: Text network visualization and discourse analysis
- **Technology**: Graph-based text analysis using network science
- **Use Case**: Visualize concepts and relationships from event discussions
- **Integration Method**: REST API (no dedicated MCP server available)

## API Access Setup

### Step 1: Obtain API Credentials
1. Sign up at https://infranodus.com
2. Navigate to **Settings → API Access**
3. Generate API key
4. Note rate limits: 100 requests/hour (free tier), 1000 requests/hour (pro tier)

Store in `.env`:
```bash
INFRANODUS_API_KEY=your-api-key-here
INFRANODUS_API_URL=https://infranodus.com/api
```

### Step 2: Test API Connection
```bash
# Test API with curl
curl -X GET "https://infranodus.com/api/user" \
  -H "Authorization: Bearer ${INFRANODUS_API_KEY}"
```

Expected response:
```json
{
  "status": "success",
  "user": {
    "username": "...",
    "plan": "pro"
  }
}
```

## API Integration Architecture

### Client-Side vs Server-Side
**Recommendation**: Server-side API calls (Next.js API routes)

**Reason**:
- Protects API key from exposure
- Enables caching and rate limiting
- Allows data transformation before sending to client

### API Route Structure
```typescript
// src/app/api/infranodus/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { text, contextId } = await request.json();
  
  const response = await fetch('https://infranodus.com/api/statement', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.INFRANODUS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      context: contextId,
      statement: text,
    }),
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}
```

## Core API Endpoints

### 1. Create Context (Graph Container)
```http
POST /api/context
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "name": "DoL_2025_Day1_Nodvast",
  "description": "Network analysis for Nodväst stream, Day 1",
  "language": "sv"
}
```

Response:
```json
{
  "context_id": "abc123",
  "url": "https://infranodus.com/contexts/abc123"
}
```

### 2. Add Text for Analysis
```http
POST /api/statement
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "context": "abc123",
  "statement": "Discussion text from YouTube chat or transcript..."
}
```

### 3. Get Graph Visualization
```http
GET /api/context/{context_id}/graph
Authorization: Bearer {api_key}
```

Response:
```json
{
  "nodes": [
    { "id": "concept1", "label": "democracy", "weight": 15 },
    { "id": "concept2", "label": "legislation", "weight": 12 }
  ],
  "edges": [
    { "source": "concept1", "target": "concept2", "weight": 8 }
  ]
}
```

### 4. Get Key Concepts
```http
GET /api/context/{context_id}/concepts
Authorization: Bearer {api_key}
```

Response:
```json
{
  "concepts": [
    { "term": "democracy", "occurrences": 15, "betweenness": 0.45 },
    { "term": "legislation", "occurrences": 12, "betweenness": 0.38 }
  ]
}
```

## Data Flow Architecture

### Real-Time Chat Analysis
```
YouTube Live Chat 
  → YouTube API (fetch messages)
  → Next.js API route (/api/chat/process)
  → InfraNodus API (add statements)
  → Store context_id in database
  → Frontend polls for graph updates
```

### Transcript Analysis
```
Completed Stream
  → YouTube transcript API
  → Batch process text chunks
  → InfraNodus analysis
  → Generate graph
  → Display on archive page
```

## Frontend Components

### Graph Visualization Component
```typescript
// src/components/InfraNodusGraph.tsx
'use client';

import { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

interface GraphData {
  nodes: { id: string; label: string; val: number }[];
  links: { source: string; target: string; value: number }[];
}

export function InfraNodusGraph({ contextId }: { contextId: string }) {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  
  useEffect(() => {
    async function fetchGraph() {
      const response = await fetch(`/api/infranodus/graph/${contextId}`);
      const data = await response.json();
      setGraphData(data);
    }
    
    fetchGraph();
    const interval = setInterval(fetchGraph, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [contextId]);
  
  if (!graphData) return <div>Loading graph...</div>;
  
  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="label"
      nodeVal="val"
      linkWidth="value"
      nodeColor={() => '#0ea5e9'}
      linkColor={() => '#64748b'}
    />
  );
}
```

### Concept Cloud Component
```typescript
// src/components/ConceptCloud.tsx
export function ConceptCloud({ concepts }: { concepts: Concept[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {concepts.map(concept => (
        <span
          key={concept.term}
          className="px-3 py-1 rounded-full bg-primary-100 text-primary-800"
          style={{
            fontSize: `${Math.max(0.75, concept.betweenness * 2)}rem`
          }}
        >
          {concept.term}
        </span>
      ))}
    </div>
  );
}
```

## Caching Strategy

### Context Caching
```typescript
// src/lib/infranodus-cache.ts
import { unstable_cache } from 'next/cache';

export const getCachedGraph = unstable_cache(
  async (contextId: string) => {
    const response = await fetch(`https://infranodus.com/api/context/${contextId}/graph`, {
      headers: { 'Authorization': `Bearer ${process.env.INFRANODUS_API_KEY}` }
    });
    return response.json();
  },
  ['infranodus-graph'],
  { revalidate: 300 } // Cache for 5 minutes
);
```

## Rate Limiting

### Client-Side Throttling
```typescript
// src/lib/rate-limiter.ts
export class RateLimiter {
  private queue: (() => Promise<any>)[] = [];
  private processing = false;
  
  constructor(private requestsPerMinute: number) {}
  
  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }
  
  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    
    while (this.queue.length > 0) {
      const fn = this.queue.shift()!;
      await fn();
      await new Promise(resolve => setTimeout(resolve, 60000 / this.requestsPerMinute));
    }
    
    this.processing = false;
  }
}

export const infraNodusLimiter = new RateLimiter(100); // 100 req/hour
```

## Use Cases

### Use Case 1: Live Event Analysis
**Goal**: Real-time visualization of discussion themes

**Implementation**:
1. Create context for each stream at event start
2. Poll YouTube chat API every 30 seconds
3. Batch send messages to InfraNodus
4. Update graph visualization on frontend every minute

### Use Case 2: Post-Event Report
**Goal**: Generate comprehensive analysis of event discussions

**Implementation**:
1. Fetch full transcripts from all 4 streams
2. Process in chunks (max 5000 chars per request)
3. Generate separate graphs for each node (Nodväst, Nodsyd, etc.)
4. Create master graph combining all discussions
5. Export PDF report with key concepts and connections

### Use Case 3: Multi-Language Analysis
**Goal**: Compare concepts across different language streams

**Implementation**:
1. Create separate contexts for each language
2. Use InfraNodus language-specific analysis (sv, en, ar, fa, zh, es)
3. Map translated concepts to find commonalities
4. Visualize in unified interface with language toggles

## Alternative: MCP Server Development

### If Dedicated MCP Server Needed
Since InfraNodus doesn't have an official MCP server, we could build one:

```typescript
// infranodus-mcp-server/src/index.ts
import { McpServer } from '@modelcontextprotocol/sdk';

const server = new McpServer({
  name: 'infranodus',
  version: '1.0.0',
  capabilities: {
    tools: ['analyze_text', 'get_graph', 'get_concepts'],
  },
});

server.tool('analyze_text', async ({ text, context }) => {
  const response = await fetch('https://infranodus.com/api/statement', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.INFRANODUS_API_KEY}` },
    body: JSON.stringify({ context, statement: text }),
  });
  return response.json();
});

server.start();
```

**Recommendation**: Not necessary for v1.0 - REST API integration is sufficient.

## Testing Strategy

### Unit Tests
```typescript
// src/lib/infranodus.test.ts
import { analyzeText } from './infranodus';

describe('InfraNodus API', () => {
  it('should analyze text and return concepts', async () => {
    const result = await analyzeText('Test discussion about democracy');
    expect(result.concepts).toContainEqual(
      expect.objectContaining({ term: 'democracy' })
    );
  });
});
```

### Integration Tests
```bash
# Test full flow
bun test:integration -- --grep "InfraNodus"
```

## Error Handling

### API Error Responses
```typescript
// src/lib/infranodus-client.ts
export async function handleInfraNodusError(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 401:
        throw new Error('Invalid InfraNodus API key');
      case 429:
        throw new Error('Rate limit exceeded. Try again later.');
      case 500:
        throw new Error('InfraNodus server error');
      default:
        throw new Error(error.message || 'Unknown error');
    }
  }
}
```

## Security Considerations

### API Key Protection
- Store in environment variables only
- Never expose in client-side code
- Use Next.js API routes as proxy
- Rotate keys monthly

### Data Privacy
- Anonymize user data before sending to InfraNodus
- Comply with GDPR for EU users
- Provide opt-out for chat analysis

## Documentation Links
- InfraNodus API Docs: https://infranodus.com/api/docs
- InfraNodus GitHub: https://github.com/noduslabs/infranodus
- Network Science Basics: https://infranodus.com/docs/network-analysis

## Success Criteria
- [ ] InfraNodus API key obtained and tested
- [ ] Next.js API routes created for all endpoints
- [ ] Graph visualization component implemented
- [ ] Caching strategy working (5min cache, <100 req/hour)
- [ ] Rate limiting prevents API overuse
- [ ] Test analysis completed with sample data
- [ ] Error handling covers all edge cases
- [ ] Documentation for adding new analysis features
