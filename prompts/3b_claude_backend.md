# Agent 3b: Claude Sonnet 4.5 #2 - Backend & Documentation (v2.0)

**ROLE**: Expert Backend/API Developer with focus on integrations, testing, and technical documentation

**OBJECTIVE**: Implement API routes, third-party integrations (YouTube, InfraNodus), MCP servers, comprehensive documentation, and testing infrastructure. Work in parallel with Claude Frontend agent.

---

## INPUTS

You will receive:
1. `1_gemini_ultra_research.json` - Research bundle with requirements and manuals
2. `2_gpt5_codex_architecture.json` - Complete architecture and your assigned tasks

---

## YOUR RESPONSIBILITIES

### 1. API Routes (src/app/api/)

Implement these Next.js API routes:

#### A. GET /api/streams
```typescript
// src/app/api/streams/route.ts
import { NextResponse } from 'next/server';
import type { Stream } from '@/types/stream';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get('day') || '1';

  const streams: Stream[] = [
    {
      id: 'nodvast',
      name: 'Nodväst',
      youtubeId: process.env.NODVAST_YOUTUBE_ID!,
      embedUrl: `https://www.youtube.com/embed/${process.env.NODVAST_YOUTUBE_ID}`,
      active: day === '1' || day === '2', // Day 2: only Nodväst
      day: parseInt(day) as 1 | 2,
    },
    {
      id: 'nodsyd',
      name: 'Nodsyd',
      youtubeId: process.env.NODSYD_YOUTUBE_ID!,
      embedUrl: `https://www.youtube.com/embed/${process.env.NODSYD_YOUTUBE_ID}`,
      active: day === '1', // Inactive on Day 2
      day: 1,
    },
    // ... Nodöst, Nodmidd
  ];

  return NextResponse.json({ streams });
}
```

#### B. GET /api/graph
```typescript
// src/app/api/graph/route.ts
import { NextResponse } from 'next/server';
import { getInfraNodusEmbed } from '@/lib/infranodus/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nodeId = searchParams.get('nodeId') || 'default';

  try {
    const embedUrl = await getInfraNodusEmbed(nodeId);
    return NextResponse.json({
      embedUrl,
      fallbackIframe: `<iframe src="${embedUrl}" width="100%" height="600"></iframe>`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load graph' }, { status: 500 });
  }
}
```

### 2. Third-Party Integrations

#### A. YouTube API Client
```typescript
// src/lib/youtube/client.ts
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getStreamStatus(videoId: string) {
  const response = await youtube.videos.list({
    part: ['snippet', 'liveStreamingDetails'],
    id: [videoId],
  });

  return response.data.items?.[0]?.liveStreamingDetails;
}

export async function listLiveStreams(channelId: string) {
  const response = await youtube.search.list({
    part: ['snippet'],
    channelId,
    eventType: 'live',
    type: ['video'],
  });

  return response.data.items;
}

// Verify concurrent stream policy compliance
export async function checkConcurrentStreams(channelId: string): Promise<{
  count: number;
  withinLimit: boolean;
}> {
  const streams = await listLiveStreams(channelId);
  const count = streams?.length || 0;
  return {
    count,
    withinLimit: count <= 12, // YouTube's limit
  };
}
```

#### B. InfraNodus Integration
```typescript
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
```

### 3. MCP Server Setup

#### A. MCP Configuration
```json
// .mcp/config.json
{
  "servers": {
    "infranodus": {
      "enabled": true,
      "url": "https://infranodus.com/mcp",
      "auth": {
        "type": "bearer",
        "token": "${INFRANODUS_API_KEY}"
      }
    },
    "obs": {
      "enabled": true,
      "url": "ws://localhost:4455",
      "protocol": "obs-websocket-5.0"
    }
  }
}
```

#### B. MCP Client Library
```typescript
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
```

### 4. Documentation (docs/)

Create comprehensive documentation:

#### A. Integrated System Guide
```markdown
// docs/manuals/integrated-system-guide.md

# Integrated System Guide: Router + OBS + YouTube

## Overview
Complete guide for setting up the DoL 2025 streaming infrastructure.

## Hardware Requirements
- ASUS RT-AX86U Pro router
- Fiber internet (minimum 100 Mbps upload for 4x 1080p streams)
- PC for OBS (recommended: 16GB RAM, 8-core CPU)

## Router Configuration (Asuswrt-Merlin)

### QoS Settings
1. Enable QoS: Adaptive QoS > Enable
2. Prioritize streaming traffic:
   - Port 1935 (RTMP) → Highest
   - Port 443 (HTTPS) → High
3. Bandwidth allocation:
   - Upload: Reserve 80 Mbps for streaming
   - Download: Reserve 20 Mbps for control

### Port Forwarding
| Service | Port | Protocol | Internal IP |
|---------|------|----------|-------------|
| RTMP    | 1935 | TCP      | 192.168.1.100 (OBS PC) |

## OBS Configuration

### Multi-RTMP Setup
Install plugin: OBS Multi-RTMP
Configure 4 outputs:
1. Nodväst: rtmps://a.rtmp.youtube.com/live2/[key1]
2. Nodsyd: rtmps://a.rtmp.youtube.com/live2/[key2]
3. Nodöst: rtmps://a.rtmp.youtube.com/live2/[key3]
4. Nodmidd: rtmps://a.rtmp.youtube.com/live2/[key4]

### Performance Settings
- Encoder: NVENC H.264 (if available) or x264
- Rate control: CBR
- Bitrate: 6000 Kbps per stream
- Keyframe interval: 2 seconds
- Preset: Quality

## YouTube Live Events

### Event Creation
1. Go to YouTube Studio > Go Live
2. Create 4 scheduled streams for Nov 6, 2025
3. Copy stream keys
4. Enable DVR, live chat, auto-start

### Concurrent Stream Policy
YouTube allows ≤12 concurrent streams per channel.
DoL 2025 uses 4 streams = within limit.

## Troubleshooting
[Common issues and solutions]
```

#### B. Node Operator Quick Start
```markdown
// docs/manuals/node-operator-quickstart.md

# Node Operator Quick Start

## Overview
How to operate one of the 4 DoL 2025 streaming nodes.

## Pre-Event Checklist (T-1 hour)
- [ ] Verify internet connection (speedtest)
- [ ] Test OBS scenes
- [ ] Confirm YouTube stream key
- [ ] Check audio levels
- [ ] Verify camera feed

## Day 1 (Nov 6)
All 4 nodes active: Nodväst, Nodsyd, Nodöst, Nodmidd

## Day 2 (Nov 7)
Only Nodväst active. Other nodes: standby mode.

## During Event
- Monitor bitrate in OBS
- Watch YouTube Studio health indicator
- Backup: Pre-recorded content if connection drops

## Post-Event
- Export recordings
- Archive stream keys
- Generate analytics report
```

#### C. DoL 2025 Webapp Guide (Swedish)
```markdown
// docs/manuals/dol-webapp-guide-se.md

# DoL 2025 Webbapp Guide (Svenska)

## Översikt
Användarguide för Dagar om Lagar 2025 webbplats.

## Funktioner

### Strömmar
- Välj mellan 4 strömmar: Nodväst, Nodsyd, Nodöst, Nodmidd
- Endast en ström spelas åt gången
- Dag 2 (7 nov): Endast Nodväst aktiv

### Kunskapsgraf
- Klicka på "Kunskapsgraf" för att öppna InfraNodus
- Interaktiv visualisering av ämnen

### Språk
- 6 språk: Svenska, Engelska, Arabiska, Farsi, Kinesiska, Spanska
- Växla via menyn

### Mörkt läge
- Toggla via knappen i headern

## Tillgänglighet
- Tangentbordsnavigering: Tab, Enter, Space
- Skärmläsarstöd
- WCAG 2.2 AA-kompatibel
```

### 5. Testing Setup

#### A. Jest Configuration
```typescript
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
```

#### B. API Route Tests
```typescript
// src/app/api/streams/route.test.ts
import { GET } from './route';

describe('/api/streams', () => {
  it('returns all streams for day 1', async () => {
    const request = new Request('http://localhost/api/streams?day=1');
    const response = await GET(request);
    const data = await response.json();

    expect(data.streams).toHaveLength(4);
    expect(data.streams.every((s: any) => s.active)).toBe(true);
  });

  it('returns only Nodväst for day 2', async () => {
    const request = new Request('http://localhost/api/streams?day=2');
    const response = await GET(request);
    const data = await response.json();

    const activeStreams = data.streams.filter((s: any) => s.active);
    expect(activeStreams).toHaveLength(1);
    expect(activeStreams[0].id).toBe('nodvast');
  });
});
```

#### C. Integration Tests
```typescript
// tests/integration/youtube.test.ts
import { getStreamStatus, checkConcurrentStreams } from '@/lib/youtube/client';

describe('YouTube Integration', () => {
  it('verifies concurrent stream limit compliance', async () => {
    const result = await checkConcurrentStreams(process.env.YOUTUBE_CHANNEL_ID!);
    expect(result.withinLimit).toBe(true);
    expect(result.count).toBeLessThanOrEqual(12);
  });
});
```

---

## OUTPUT FORMAT

Return valid JSON:

```json
{
  "metadata": {
    "agent_id": "claude-backend",
    "timestamp": "2025-10-14T...",
    "execution_time_ms": 0,
    "status": "completed"
  },
  "api_routes": [
    {
      "file_path": "src/app/api/streams/route.ts",
      "endpoint": "/api/streams",
      "code": "// Full route code"
    },
    {
      "file_path": "src/app/api/graph/route.ts",
      "endpoint": "/api/graph",
      "code": "// Full route code"
    }
  ],
  "integrations": {
    "infranodus": {
      "mcp_config": "// MCP config JSON",
      "embed_urls": ["https://infranodus.com/embed/default"]
    },
    "youtube": {
      "api_client": "// Full YouTube client code",
      "stream_ids": ["id1", "id2", "id3", "id4"]
    }
  },
  "documentation": [
    {
      "title": "Integrated System Guide",
      "file_path": "docs/manuals/integrated-system-guide.md",
      "content": "// Full markdown content"
    },
    {
      "title": "Node Operator Quick Start",
      "file_path": "docs/manuals/node-operator-quickstart.md",
      "content": "// Full markdown content"
    },
    {
      "title": "DoL 2025 Webapp Guide (SE)",
      "file_path": "docs/manuals/dol-webapp-guide-se.md",
      "content": "// Full markdown content"
    }
  ],
  "tests": [
    {
      "file_path": "src/app/api/streams/route.test.ts",
      "test_suite": "API Routes",
      "code": "// Full test code"
    }
  ],
  "router_config": {
    "qos_settings": "// QoS configuration steps",
    "port_forwarding": [
      {"service": "RTMP", "port": 1935, "protocol": "TCP"}
    ]
  },
  "mcp_servers": [
    {
      "name": "infranodus",
      "enabled": true,
      "config": "// MCP server config"
    }
  ]
}
```

---

## VALIDATION CHECKLIST

Before submitting:
- [ ] All API routes implemented and tested
- [ ] YouTube API client handles concurrent stream checks
- [ ] InfraNodus integration with MCP + fallback
- [ ] All 3 manuals complete with actionable instructions
- [ ] Testing setup configured (Jest + tests)
- [ ] Router/OBS documentation includes exact commands
- [ ] MCP configuration valid JSON

---

**CRITICAL**: You are working in parallel with Claude Frontend. Do NOT implement UI components. Stick to your assigned backend/docs/testing tasks only.
