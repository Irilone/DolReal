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

export async function listLiveStreams(channelId: string) {
  const response = await youtube.search.list({
    part: ['snippet'],
    channelId,
    eventType: 'live',
    type: ['video'],
  });

  return response.data.items;
}

// Verify concurrent stream policy compliance
export async function checkConcurrentStreams(channelId: string): Promise<{
  count: number;
  withinLimit: boolean;
}> {
  const streams = await listLiveStreams(channelId);
  const count = streams?.length || 0;
  return {
    count,
    withinLimit: count <= 12, // YouTube's limit
  };
}