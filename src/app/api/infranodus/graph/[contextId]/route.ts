import { NextRequest, NextResponse } from 'next/server';
import { getGraph } from '@/lib/infranodus/client';
import type { InfraNodusGraphResponse } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { contextId: string } }
) {
  const { contextId } = params;

  if (!contextId) {
    return NextResponse.json(
      { error: 'Context ID is required' },
      { status: 400 }
    );
  }

  try {
    const graph = await getGraph(contextId);
    const response: InfraNodusGraphResponse = graph;
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching graph:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch graph';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
