import { NextRequest, NextResponse } from 'next/server';
import { getViewerCount } from '@/lib/youtube/client';
import type { ViewerCountResponse } from '@/types/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoIdsParam = searchParams.get('videoIds');

  if (!videoIdsParam) {
    return NextResponse.json(
      { error: 'videoIds parameter is required' },
      { status: 400 }
    );
  }

  const videoIds = videoIdsParam.split(',').filter(Boolean);

  if (videoIds.length === 0) {
    return NextResponse.json(
      { error: 'At least one video ID is required' },
      { status: 400 }
    );
  }

  try {
    const counts = await getViewerCount(videoIds);
    const total = counts.reduce((sum, c) => sum + c.concurrentViewers, 0);
    
    const response: ViewerCountResponse = { counts, total };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching viewer count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch viewer count' },
      { status: 500 }
    );
  }
}
