import type { GraphNode, GraphLink } from '@/types/api';
import { getCachedData, setCachedData } from './cache';
import { checkRateLimit } from './rate-limiter';

const INFRANODUS_API_BASE = 'https://infranodus.com/api';

interface InfraNodusAnalyzeResponse {
  context_id: string;
  nodes: GraphNode[];
  links: GraphLink[];
  stats: {
    node_count: number;
    link_count: number;
  };
}

export async function analyzeText(text: string, contextId: string): Promise<string> {
  // Check rate limit
  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded. Please wait before making another request.');
  }

  const apiKey = process.env.INFRANODUS_API_KEY;
  if (!apiKey) {
    throw new Error('INFRANODUS_API_KEY is not configured');
  }

  try {
    const response = await fetch(`${INFRANODUS_API_BASE}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ text, context_id: contextId }),
    });

    if (!response.ok) {
      throw new Error(`InfraNodus API error: ${response.statusText}`);
    }

    const data: InfraNodusAnalyzeResponse = await response.json();
    
    // Cache the result for 5 minutes
    setCachedData(contextId, data, 5 * 60 * 1000);
    
    return data.context_id;
  } catch (error) {
    console.error('Error analyzing text with InfraNodus:', error);
    throw error;
  }
}

export async function getGraph(contextId: string): Promise<{ nodes: GraphNode[]; links: GraphLink[] }> {
  // Check cache first
  const cached = getCachedData<InfraNodusAnalyzeResponse>(contextId);
  if (cached) {
    return { nodes: cached.nodes, links: cached.links };
  }

  // Check rate limit
  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded. Please wait before making another request.');
  }

  const apiKey = process.env.INFRANODUS_API_KEY;
  if (!apiKey) {
    throw new Error('INFRANODUS_API_KEY is not configured');
  }

  try {
    const response = await fetch(`${INFRANODUS_API_BASE}/graph/${contextId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`InfraNodus API error: ${response.statusText}`);
    }

    const data: InfraNodusAnalyzeResponse = await response.json();
    
    // Cache the result for 5 minutes
    setCachedData(contextId, data, 5 * 60 * 1000);
    
    return { nodes: data.nodes, links: data.links };
  } catch (error) {
    console.error('Error fetching graph from InfraNodus:', error);
    throw error;
  }
}
