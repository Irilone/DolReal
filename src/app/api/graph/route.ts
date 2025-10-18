import { NextRequest, NextResponse } from 'next/server';
import { getGraph } from '@/lib/infranodus/client';

/**
 * GET /api/graph?nodeId=string
 * Fetches knowledge graph data from InfraNodus for a specific node
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const nodeId = searchParams.get('nodeId');

    if (!nodeId) {
      return NextResponse.json(
        { error: 'Missing required parameter: nodeId' },
        { status: 400 }
      );
    }

    // Fetch graph data from InfraNodus
    const graphData = await getGraph(nodeId);

    return NextResponse.json({
      success: true,
      data: graphData,
    });
  } catch (error) {
    console.error('Error fetching graph data:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to fetch graph data',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
