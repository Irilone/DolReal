import { Stream, StreamHealth, ViewerCount, EventDay } from './stream';

// GET /api/streams
export interface StreamsResponse {
  streams: Stream[];
  currentDay: EventDay;
}

// GET /api/stream-health/[streamId]
export type StreamHealthResponse = StreamHealth;

// GET /api/viewer-count
export interface ViewerCountResponse {
  counts: ViewerCount[];
  total: number;
}

// POST /api/infranodus/analyze
export interface InfraNodusAnalyzeRequest {
  text: string;
  contextId: string;
}

export interface InfraNodusAnalyzeResponse {
  success: boolean;
  contextId: string;
  statementId: string;
}

// GET /api/infranodus/graph/[contextId]
export interface GraphNode {
  id: string;
  label: string;
  val: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface InfraNodusGraphResponse {
  nodes: GraphNode[];
  links: GraphLink[];
}
