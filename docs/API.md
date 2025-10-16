# API Documentation - DolReal

Complete API reference for the DolReal streaming platform.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Streams API](#streams-api)
  - [Schedule API](#schedule-api)
  - [InfraNodus API](#infranodus-api)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)

---

## Overview

The DolReal API provides programmatic access to live stream data, schedule information, and knowledge graph visualization for the "Dagar om Lagar 2025" event.

**Base URL**: `https://dolreal.example.com/api` (adjust for your deployment)

**API Version**: v1

**Response Format**: JSON

---

## Authentication

### API Keys

Some endpoints require API keys for external services:

```bash
# Environment variables
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
INFRANODUS_API_KEY=your_infranodus_api_key
```

### CORS

CORS is enabled for all origins during development. In production, configure allowed origins in `next.config.js`.

---

## API Endpoints

### Streams API

#### GET `/api/streams`

Retrieve information about all available live streams.

**Request:**

```http
GET /api/streams HTTP/1.1
Host: dolreal.example.com
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `day` | integer | No | Filter by event day (1 or 2) |
| `active` | boolean | No | Filter by active status |

**Response:**

```json
{
  "success": true,
  "data": {
    "streams": [
      {
        "id": "nodvast",
        "name": "Nodväst",
        "videoId": "abc123xyz",
        "isLive": true,
        "viewerCount": 1523,
        "startTime": "2025-11-06T09:00:00Z",
        "endTime": "2025-11-06T17:00:00Z",
        "thumbnailUrl": "https://i.ytimg.com/vi/abc123xyz/maxresdefault.jpg"
      },
      {
        "id": "nodsyd",
        "name": "Nodsyd",
        "videoId": "def456uvw",
        "isLive": true,
        "viewerCount": 892,
        "startTime": "2025-11-06T09:00:00Z",
        "endTime": "2025-11-06T17:00:00Z",
        "thumbnailUrl": "https://i.ytimg.com/vi/def456uvw/maxresdefault.jpg"
      },
      {
        "id": "nodost",
        "name": "Nodöst",
        "videoId": "ghi789rst",
        "isLive": true,
        "viewerCount": 1247,
        "startTime": "2025-11-06T09:00:00Z",
        "endTime": "2025-11-06T17:00:00Z",
        "thumbnailUrl": "https://i.ytimg.com/vi/ghi789rst/maxresdefault.jpg"
      },
      {
        "id": "nodmidd",
        "name": "Nodmidd",
        "videoId": "jkl012opq",
        "isLive": true,
        "viewerCount": 2103,
        "startTime": "2025-11-06T09:00:00Z",
        "endTime": "2025-11-06T17:00:00Z",
        "thumbnailUrl": "https://i.ytimg.com/vi/jkl012opq/maxresdefault.jpg"
      }
    ],
    "totalViewers": 5765,
    "activeStreams": 4
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "YOUTUBE_API_ERROR",
    "message": "Failed to fetch stream data from YouTube API"
  }
}
```

---

#### GET `/api/streams/:streamId`

Retrieve detailed information about a specific stream.

**Request:**

```http
GET /api/streams/nodvast HTTP/1.1
Host: dolreal.example.com
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `streamId` | string | Yes | Stream identifier (nodvast, nodsyd, nodost, nodmidd) |

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "nodvast",
    "name": "Nodväst",
    "videoId": "abc123xyz",
    "isLive": true,
    "viewerCount": 1523,
    "likeCount": 234,
    "startTime": "2025-11-06T09:00:00Z",
    "endTime": "2025-11-06T17:00:00Z",
    "description": "Live coverage of the Nodväst track at Dagar om Lagar 2025",
    "thumbnailUrl": "https://i.ytimg.com/vi/abc123xyz/maxresdefault.jpg",
    "embedUrl": "https://www.youtube.com/embed/abc123xyz",
    "chatEnabled": true,
    "statistics": {
      "totalViews": 15234,
      "peakViewers": 2145,
      "averageViewTime": "45:32"
    }
  }
}
```

---

#### GET `/api/streams/:streamId/status`

Check the live status of a specific stream (lightweight endpoint).

**Request:**

```http
GET /api/streams/nodvast/status HTTP/1.1
Host: dolreal.example.com
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "nodvast",
    "isLive": true,
    "viewerCount": 1523,
    "lastUpdated": "2025-11-06T12:34:56Z"
  }
}
```

---

### Schedule API

#### GET `/api/schedule`

Retrieve the complete event schedule.

**Request:**

```http
GET /api/schedule HTTP/1.1
Host: dolreal.example.com
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `day` | integer | No | Filter by day (1 or 2) |
| `stream` | string | No | Filter by stream ID |
| `lang` | string | No | Language for localized content (se, en) |

**Response:**

```json
{
  "success": true,
  "data": {
    "schedule": [
      {
        "id": "session-001",
        "title": "Opening Keynote",
        "titleSv": "Öppningsanförande",
        "description": "Welcome and introduction to Dagar om Lagar 2025",
        "descriptionSv": "Välkommen och introduktion till Dagar om Lagar 2025",
        "startTime": "2025-11-06T09:00:00Z",
        "endTime": "2025-11-06T10:00:00Z",
        "day": 1,
        "streams": ["nodvast", "nodsyd", "nodost", "nodmidd"],
        "speakers": [
          {
            "name": "John Doe",
            "title": "Event Organizer",
            "bio": "..."
          }
        ],
        "type": "keynote",
        "tags": ["opening", "introduction"]
      },
      {
        "id": "session-002",
        "title": "Legal Tech Innovation",
        "titleSv": "Innovation inom juridisk teknik",
        "startTime": "2025-11-06T10:15:00Z",
        "endTime": "2025-11-06T11:15:00Z",
        "day": 1,
        "streams": ["nodvast"],
        "speakers": [],
        "type": "panel",
        "tags": ["technology", "innovation"]
      }
    ]
  }
}
```

---

#### GET `/api/schedule/current`

Get currently active sessions.

**Request:**

```http
GET /api/schedule/current HTTP/1.1
Host: dolreal.example.com
```

**Response:**

```json
{
  "success": true,
  "data": {
    "currentSessions": [
      {
        "id": "session-005",
        "title": "Panel Discussion: Future of Law",
        "stream": "nodvast",
        "startTime": "2025-11-06T14:00:00Z",
        "endTime": "2025-11-06T15:00:00Z",
        "progress": 0.45
      }
    ],
    "upcomingSessions": [
      {
        "id": "session-006",
        "title": "Workshop: AI in Legal Practice",
        "stream": "nodsyd",
        "startTime": "2025-11-06T15:15:00Z",
        "endTime": "2025-11-06T16:15:00Z",
        "startsIn": 4500
      }
    ]
  }
}
```

---

### InfraNodus API

#### GET `/api/infranodus/graph`

Retrieve the knowledge graph data for visualization.

**Request:**

```http
GET /api/infranodus/graph HTTP/1.1
Host: dolreal.example.com
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `stream` | string | No | Filter by stream ID |
| `timeRange` | string | No | Time range (1h, 3h, 6h, 24h, all) |

**Response:**

```json
{
  "success": true,
  "data": {
    "nodes": [
      {
        "id": "node-001",
        "label": "Legal Technology",
        "weight": 45,
        "category": "concept"
      },
      {
        "id": "node-002",
        "label": "AI Ethics",
        "weight": 38,
        "category": "concept"
      }
    ],
    "edges": [
      {
        "source": "node-001",
        "target": "node-002",
        "weight": 12
      }
    ],
    "metadata": {
      "totalConcepts": 156,
      "totalConnections": 423,
      "lastUpdated": "2025-11-06T14:35:22Z"
    }
  }
}
```

---

## Data Models

### Stream

```typescript
interface Stream {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  videoId: string;               // YouTube video ID
  isLive: boolean;               // Live status
  viewerCount: number;           // Current viewers
  likeCount?: number;            // Total likes
  startTime: string;             // ISO 8601 datetime
  endTime: string;               // ISO 8601 datetime
  description?: string;          // Stream description
  thumbnailUrl: string;          // Thumbnail image URL
  embedUrl: string;              // YouTube embed URL
  chatEnabled: boolean;          // Chat availability
  statistics?: StreamStats;      // Optional statistics
}

interface StreamStats {
  totalViews: number;
  peakViewers: number;
  averageViewTime: string;       // Format: "HH:MM:SS"
}
```

### Session

```typescript
interface Session {
  id: string;                    // Unique identifier
  title: string;                 // English title
  titleSv: string;               // Swedish title
  description?: string;          // English description
  descriptionSv?: string;        // Swedish description
  startTime: string;             // ISO 8601 datetime
  endTime: string;               // ISO 8601 datetime
  day: number;                   // Event day (1 or 2)
  streams: string[];             // Stream IDs
  speakers: Speaker[];           // Array of speakers
  type: SessionType;             // Session type
  tags: string[];                // Topic tags
}

type SessionType = 'keynote' | 'panel' | 'workshop' | 'presentation' | 'break';

interface Speaker {
  name: string;
  title: string;
  bio?: string;
  avatarUrl?: string;
}
```

### Knowledge Graph

```typescript
interface GraphNode {
  id: string;
  label: string;
  weight: number;
  category: string;
}

interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    totalConcepts: number;
    totalConnections: number;
    lastUpdated: string;
  };
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid API key |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `YOUTUBE_API_ERROR` | 502 | YouTube API failure |
| `INFRANODUS_API_ERROR` | 502 | InfraNodus API failure |
| `INTERNAL_ERROR` | 500 | Internal server error |

---

## Rate Limiting

### Limits

- **Anonymous requests**: 100 requests per hour per IP
- **Authenticated requests**: 1000 requests per hour per API key

### Headers

Rate limit information is included in response headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1699272000
```

### Rate Limit Exceeded

When rate limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "retryAfter": 3600
    }
  }
}
```

---

## Examples

### Fetch All Live Streams

```javascript
// Using fetch API
async function getAllStreams() {
  const response = await fetch('https://dolreal.example.com/api/streams');
  const data = await response.json();
  
  if (data.success) {
    console.log(`Total viewers: ${data.data.totalViewers}`);
    data.data.streams.forEach(stream => {
      console.log(`${stream.name}: ${stream.viewerCount} viewers`);
    });
  }
}
```

### Get Current Schedule

```javascript
// Using axios
import axios from 'axios';

async function getCurrentSchedule() {
  try {
    const response = await axios.get('https://dolreal.example.com/api/schedule/current');
    
    if (response.data.success) {
      const { currentSessions, upcomingSessions } = response.data.data;
      console.log('Currently live:', currentSessions);
      console.log('Coming up next:', upcomingSessions);
    }
  } catch (error) {
    console.error('Error fetching schedule:', error);
  }
}
```

### Monitor Stream Status

```javascript
// Polling example with React
import { useEffect, useState } from 'react';

function useStreamStatus(streamId) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://dolreal.example.com/api/streams/${streamId}/status`
        );
        const data = await response.json();
        
        if (data.success) {
          setStatus(data.data);
        }
      } catch (error) {
        console.error('Error fetching stream status:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchStatus();

    // Poll every 30 seconds
    const interval = setInterval(fetchStatus, 30000);

    return () => clearInterval(interval);
  }, [streamId]);

  return { status, loading };
}

// Usage
function StreamViewer() {
  const { status, loading } = useStreamStatus('nodvast');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Nodväst Stream</h2>
      <p>Status: {status.isLive ? 'Live' : 'Offline'}</p>
      <p>Viewers: {status.viewerCount}</p>
    </div>
  );
}
```

### Fetch Knowledge Graph

```javascript
// Using async/await
async function getKnowledgeGraph(timeRange = 'all') {
  const url = new URL('https://dolreal.example.com/api/infranodus/graph');
  url.searchParams.append('timeRange', timeRange);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      const { nodes, edges, metadata } = data.data;
      
      // Process graph data for visualization
      console.log(`Total concepts: ${metadata.totalConcepts}`);
      console.log(`Total connections: ${metadata.totalConnections}`);
      
      return { nodes, edges };
    }
  } catch (error) {
    console.error('Error fetching knowledge graph:', error);
    return null;
  }
}
```

---

## Client Libraries

### JavaScript/TypeScript

```bash
npm install @dolreal/api-client
```

```typescript
import { DolRealClient } from '@dolreal/api-client';

const client = new DolRealClient({
  baseURL: 'https://dolreal.example.com/api',
  apiKey: 'your-api-key' // Optional
});

// Fetch streams
const streams = await client.streams.getAll();

// Get specific stream
const stream = await client.streams.get('nodvast');

// Get schedule
const schedule = await client.schedule.getCurrent();
```

### Python

```bash
pip install dolreal-api
```

```python
from dolreal import DolRealAPI

client = DolRealAPI(
    base_url='https://dolreal.example.com/api',
    api_key='your-api-key'  # Optional
)

# Fetch streams
streams = client.streams.get_all()

# Get specific stream
stream = client.streams.get('nodvast')

# Get schedule
schedule = client.schedule.get_current()
```

---

## Webhooks

### Event Notifications

Subscribe to real-time event notifications:

- Stream started
- Stream ended
- Viewer milestone reached
- New session started

Contact the development team to register webhook endpoints.

---

## Support

For API support and questions:

- **Documentation**: [GitHub Docs](https://github.com/Irilone/DolReal/tree/main/docs)
- **Issues**: [GitHub Issues](https://github.com/Irilone/DolReal/issues)
- **Email**: api-support@dolreal.example.com

---

**Last Updated**: 2025-10-16  
**API Version**: v1.0.0
