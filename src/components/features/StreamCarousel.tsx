'use client'

import { useState } from 'react'
import { Stream } from '@/types'

const streams: Stream[] = [
  { id: '1', node: 'nodvast', title: 'Nodväst', youtubeId: process.env.NEXT_PUBLIC_NODVAST_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '2', node: 'nodsyd', title: 'Nodsyd', youtubeId: process.env.NEXT_PUBLIC_NODSYD_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '3', node: 'nodost', title: 'Nodöst', youtubeId: process.env.NEXT_PUBLIC_NODOST_YOUTUBE_ID || '', active: true, day: 1 },
  { id: '4', node: 'nodmidd', title: 'Nodmidd', youtubeId: process.env.NEXT_PUBLIC_NODMIDD_YOUTUBE_ID || '', active: true, day: 1 },
]

export default function StreamCarousel() {
  const [activeStream, setActiveStream] = useState(0)
  const [eventDay, setEventDay] = useState(1)

  const activeStreams = eventDay === 2 
    ? streams.filter(s => s.node === 'nodvast')
    : streams

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={() => setEventDay(1)}
          className={`px-6 py-2 rounded-md ${eventDay === 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
          aria-pressed={eventDay === 1}
        >
          Dag 1 (6 Nov)
        </button>
        <button
          onClick={() => setEventDay(2)}
          className={`px-6 py-2 rounded-md ${eventDay === 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
          aria-pressed={eventDay === 2}
        >
          Dag 2 (7 Nov)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {streams.map((stream, idx) => {
          const isActive = eventDay === 1 || stream.node === 'nodvast'
          return (
            <div
              key={stream.id}
              className={`border rounded-lg p-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}
            >
              <h3 className="text-xl font-semibold mb-4">{stream.title}</h3>
              {isActive ? (
                <div className="aspect-video bg-black rounded">
                  <iframe
                    src={`https://www.youtube.com/embed/${stream.youtubeId}?enablejsapi=1`}
                    className="w-full h-full rounded"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${stream.title} stream`}
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded flex items-center justify-center">
                  <p className="text-muted-foreground">Ej aktiv idag</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
