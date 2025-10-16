import { google } from 'googleapis';
import { getStreamStatus, listLiveStreams, checkConcurrentStreams } from './client';

jest.mock('googleapis', () => ({
  google: {
    youtube: jest.fn(),
  },
}));

describe('YouTube client', () => {
  const videosListMock = jest.fn();
  const searchListMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (google.youtube as jest.Mock).mockReturnValue({
      videos: {
        list: videosListMock,
      },
      search: {
        list: searchListMock,
      },
    });
  });

  describe('getStreamStatus', () => {
    it('returns live stream metadata when available', async () => {
      videosListMock.mockResolvedValue({
        data: {
          items: [
            {
              snippet: { liveBroadcastContent: 'live', title: 'Session 1', thumbnails: { high: { url: 'thumb.jpg' } } },
              liveStreamingDetails: { concurrentViewers: '2500' },
            },
          ],
        },
      });

      const status = await getStreamStatus('abc123');

      expect(status).toEqual({
        isLive: true,
        viewerCount: 2500,
        title: 'Session 1',
        thumbnail: 'thumb.jpg',
      });
      expect(videosListMock).toHaveBeenCalledWith({
        part: ['liveStreamingDetails', 'snippet'],
        id: ['abc123'],
      });
    });

    it('returns null when no items are returned', async () => {
      videosListMock.mockResolvedValue({ data: { items: [] } });

      const status = await getStreamStatus('missing');

      expect(status).toBeNull();
    });

    it('returns null when API throws', async () => {
      videosListMock.mockRejectedValue(new Error('API down'));

      const status = await getStreamStatus('broken');

      expect(status).toBeNull();
    });
  });

  describe('listLiveStreams', () => {
    it('returns live search results', async () => {
      const liveItems = [{ id: { videoId: 'stream-1' } }, { id: { videoId: 'stream-2' } }];
      searchListMock.mockResolvedValue({ data: { items: liveItems } });

      const result = await listLiveStreams('channel-1');

      expect(result).toEqual(liveItems);
      expect(searchListMock).toHaveBeenCalledWith({
        part: ['snippet'],
        channelId: 'channel-1',
        eventType: 'live',
        type: ['video'],
      });
    });

    it('returns undefined when request fails', async () => {
      searchListMock.mockRejectedValue(new Error('bad request'));

      await expect(listLiveStreams('broken-channel')).rejects.toThrow('bad request');
    });
  });

  describe('checkConcurrentStreams', () => {
    it('counts active streams and validates limit', async () => {
      searchListMock.mockResolvedValue({
        data: { items: Array.from({ length: 3 }, (_, index) => ({ id: { videoId: `stream-${index}` } })) },
      });

      const result = await checkConcurrentStreams('chan');

      expect(result).toEqual({ count: 3, withinLimit: true });
    });

    it('flags when more than 12 streams are active', async () => {
      searchListMock.mockResolvedValue({
        data: { items: Array.from({ length: 15 }, (_, index) => ({ id: { videoId: `stream-${index}` } })) },
      });

      const result = await checkConcurrentStreams('busy');

      expect(result).toEqual({ count: 15, withinLimit: false });
    });
  });
});
