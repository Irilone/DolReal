import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
})

export async function getStreamStatus(streamId: string) {
  try {
    const response = await youtube.videos.list({
      part: ['liveStreamingDetails', 'snippet'],
      id: [streamId],
    })

    const video = response.data.items?.[0]
    if (!video) return null

    return {
      isLive: video.snippet?.liveBroadcastContent === 'live',
      viewerCount: parseInt(video.liveStreamingDetails?.concurrentViewers || '0'),
      title: video.snippet?.title || '',
      thumbnail: video.snippet?.thumbnails?.high?.url || '',
    }
  } catch (error) {
    console.error('YouTube API error:', error)
    return null
  }
}
