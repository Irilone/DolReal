import { NextRequest, NextResponse } from 'next/server';
import { getStreamHealth } from '@/lib/youtube/client';
import type { StreamHealthResponse } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { streamId: string } }
) {
  const { streamId } = params;

  if (!streamId) {
    return NextResponse.json(
      { error: 'Stream ID is required' },
      { status: 400 }
    );
  }

  try {
    const health = await getStreamHealth(streamId);
    const response: StreamHealthResponse = health;
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching stream health:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stream health' },
      { status: 500 }
    );
  }
}
