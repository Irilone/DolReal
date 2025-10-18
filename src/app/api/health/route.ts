import { NextResponse } from 'next/server';

/**
 * GET /api/health
 * System health check endpoint
 * Returns API status and connectivity information
 */
export async function GET() {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        infranodus: process.env.INFRANODUS_API_KEY ? 'configured' : 'not configured',
        youtube: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ? 'configured' : 'not configured',
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
      },
    };

    return NextResponse.json(health);
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
