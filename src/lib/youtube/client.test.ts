// src/lib/youtube/client.test.ts
import { getStreamStatus, listLiveStreams, checkConcurrentStreams } from './client';
import { google } from 'googleapis';

// Mock googleapis
jest.mock('googleapis');

describe('YouTube Client', () => {
  const mockYouTubeList = jest.fn();
  const mockSearchList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    (google.youtube as jest.Mock).mockReturnValue({
      videos: {
        list: mockYouTubeList,
      },
      search: {
        list: mockSearchList,
      },
    });

    process.env.YOUTUBE_API_KEY = 'test-api-key';
  });

  describe('getStreamStatus', () => {
    it('returns live streaming details for a valid video ID', async () => {
      const mockLiveDetails = {
        actualStartTime: '2024-01-01T10:00:00Z',
        concurrentViewers: '1234',
        activeLiveChatId: 'test-chat-id',
      };

      mockYouTubeList.mockResolvedValue({
        data: {
          items: [
            {
              liveStreamingDetails: mockLiveDetails,
              snippet: {
                title: 'Test Stream',
                liveBroadcastContent: 'live',
              },
            },
          ],
        },
      });

      const result = await getStreamStatus('test-video-id');

      expect(result).toEqual(mockLiveDetails);
      expect(mockYouTubeList).toHaveBeenCalledWith({
        part: ['snippet', 'liveStreamingDetails'],
        id: ['test-video-id'],
      });
    });

    it('returns undefined when video has no items', async () => {
      mockYouTubeList.mockResolvedValue({
        data: {
          items: [],
        },
      });

      const result = await getStreamStatus('non-existent-id');

      expect(result).toBeUndefined();
    });

    it('returns undefined when video has no live streaming details', async () => {
      mockYouTubeList.mockResolvedValue({
        data: {
          items: [
            {
              snippet: {
                title: 'Regular Video',
              },
            },
          ],
        },
      });

      const result = await getStreamStatus('regular-video-id');

      expect(result).toBeUndefined();
    });

    it('handles API errors gracefully', async () => {
      mockYouTubeList.mockRejectedValue(new Error('API Error'));

      await expect(getStreamStatus('error-id')).rejects.toThrow('API Error');
    });

    it('uses correct API key from environment', async () => {
      mockYouTubeList.mockResolvedValue({
        data: { items: [] },
      });

      await getStreamStatus('test-id');

      expect(google.youtube).toHaveBeenCalledWith({
        version: 'v3',
        auth: 'test-api-key',
      });
    });
  });

  describe('listLiveStreams', () => {
    it('returns live streams for a channel', async () => {
      const mockStreams = [
        {
          id: { videoId: 'stream1' },
          snippet: { title: 'Stream 1' },
        },
        {
          id: { videoId: 'stream2' },
          snippet: { title: 'Stream 2' },
        },
      ];

      mockSearchList.mockResolvedValue({
        data: {
          items: mockStreams,
        },
      });

      const result = await listLiveStreams('test-channel-id');

      expect(result).toEqual(mockStreams);
      expect(mockSearchList).toHaveBeenCalledWith({
        part: ['snippet'],
        channelId: 'test-channel-id',
        eventType: 'live',
        type: ['video'],
      });
    });

    it('returns empty array when no live streams', async () => {
      mockSearchList.mockResolvedValue({
        data: {
          items: [],
        },
      });

      const result = await listLiveStreams('channel-no-streams');

      expect(result).toEqual([]);
    });

    it('returns undefined when items is not present', async () => {
      mockSearchList.mockResolvedValue({
        data: {},
      });

      const result = await listLiveStreams('channel-id');

      expect(result).toBeUndefined();
    });

    it('handles search API errors', async () => {
      mockSearchList.mockRejectedValue(new Error('Search failed'));

      await expect(listLiveStreams('error-channel')).rejects.toThrow(
        'Search failed'
      );
    });
  });

  describe('checkConcurrentStreams', () => {
    it('returns count and within limit when streams are below limit', async () => {
      const mockStreams = Array(5).fill({
        id: { videoId: 'stream' },
        snippet: { title: 'Stream' },
      });

      mockSearchList.mockResolvedValue({
        data: { items: mockStreams },
      });

      const result = await checkConcurrentStreams('test-channel');

      expect(result).toEqual({
        count: 5,
        withinLimit: true,
      });
    });

    it('returns within limit false when exactly at 13 streams', async () => {
      const mockStreams = Array(13).fill({
        id: { videoId: 'stream' },
        snippet: { title: 'Stream' },
      });

      mockSearchList.mockResolvedValue({
        data: { items: mockStreams },
      });

      const result = await checkConcurrentStreams('test-channel');

      expect(result).toEqual({
        count: 13,
        withinLimit: false,
      });
    });

    it('returns within limit true when exactly at 12 streams', async () => {
      const mockStreams = Array(12).fill({
        id: { videoId: 'stream' },
        snippet: { title: 'Stream' },
      });

      mockSearchList.mockResolvedValue({
        data: { items: mockStreams },
      });

      const result = await checkConcurrentStreams('test-channel');

      expect(result).toEqual({
        count: 12,
        withinLimit: true,
      });
    });

    it('handles zero streams correctly', async () => {
      mockSearchList.mockResolvedValue({
        data: { items: [] },
      });

      const result = await checkConcurrentStreams('empty-channel');

      expect(result).toEqual({
        count: 0,
        withinLimit: true,
      });
    });

    it('handles undefined items as zero count', async () => {
      mockSearchList.mockResolvedValue({
        data: {},
      });

      const result = await checkConcurrentStreams('channel-id');

      expect(result).toEqual({
        count: 0,
        withinLimit: true,
      });
    });

    it('propagates errors from listLiveStreams', async () => {
      mockSearchList.mockRejectedValue(new Error('List failed'));

      await expect(checkConcurrentStreams('error-channel')).rejects.toThrow(
        'List failed'
      );
    });
  });

  describe('Integration scenarios', () => {
    it('correctly identifies live vs upcoming streams', async () => {
      mockYouTubeList.mockResolvedValue({
        data: {
          items: [
            {
              liveStreamingDetails: {
                actualStartTime: '2024-01-01T10:00:00Z',
                concurrentViewers: '500',
              },
              snippet: {
                liveBroadcastContent: 'live',
              },
            },
          ],
        },
      });

      const status = await getStreamStatus('live-stream-id');

      expect(status?.actualStartTime).toBeDefined();
      expect(status?.concurrentViewers).toBe('500');
    });

    it('handles scheduled streams without concurrent viewers', async () => {
      mockYouTubeList.mockResolvedValue({
        data: {
          items: [
            {
              liveStreamingDetails: {
                scheduledStartTime: '2024-01-02T10:00:00Z',
              },
              snippet: {
                liveBroadcastContent: 'upcoming',
              },
            },
          ],
        },
      });

      const status = await getStreamStatus('upcoming-stream-id');

      expect(status?.scheduledStartTime).toBeDefined();
      expect(status?.concurrentViewers).toBeUndefined();
    });
  });
});