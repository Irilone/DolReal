// src/lib/youtube/client.ts
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getStreamStatus(videoId: string) {
  const response = await youtube.videos.list({
    part: ['snippet', 'liveStreamingDetails'],
    id: [videoId],
  });

  return response.data.items?.[0]?.liveStreamingDetails;
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
