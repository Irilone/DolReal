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
