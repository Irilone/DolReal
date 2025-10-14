import { NextRequest, NextResponse } from 'next/server'
import { Stream } from '@/types'

const streams: Stream[] = [
  { id: '1', node: 'nodvast', title: 'Nodväst', youtubeId: process.env.NODVAST_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '2', node: 'nodsyd', title: 'Nodsyd', youtubeId: process.env.NODSYD_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '3', node: 'nodost', title: 'Nodöst', youtubeId: process.env.NODOST_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '4', node: 'nodmidd', title: 'Nodmidd', youtubeId: process.env.NODMIDD_YOUTUBE_ID || '', active: true, day: 1 },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const day = searchParams.get('day')

  if (day === '2') {
    return NextResponse.json(streams.map(s => ({
      ...s,
      active: s.node === 'nodvast'
    })))
  }

  return NextResponse.json(streams)
}
