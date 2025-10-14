import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '@/lib/infranodus/client';
import type { InfraNodusAnalyzeRequest } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: InfraNodusAnalyzeRequest = await request.json();
    
    if (!body.text || !body.contextId) {
      return NextResponse.json(
        { error: 'text and contextId are required' },
        { status: 400 }
      );
    }

    const contextId = await analyzeText(body.text, body.contextId);
    
    return NextResponse.json({ contextId });
  } catch (error) {
    console.error('Error analyzing text:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze text';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
