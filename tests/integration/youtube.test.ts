const searchListMock = jest.fn();

jest.mock("googleapis", () => ({
  google: {
    youtube: jest.fn().mockReturnValue({
      videos: {
        list: jest.fn().mockResolvedValue({ data: { items: [] } }),
      },
      search: {
        list: searchListMock,
      },
    }),
  },
}));

describe("YouTube Integration", () => {
  let youtubeClient: typeof import("@/lib/youtube/client");

  beforeAll(async () => {
    youtubeClient = await import("@/lib/youtube/client");
  });

  beforeEach(() => {
    searchListMock.mockReset();
  });

  it("verifies concurrent stream limit compliance", async () => {
    searchListMock.mockResolvedValue({
      data: { items: [{ id: { videoId: "stream-1" } }] },
    });

    const result = await youtubeClient.checkConcurrentStreams("channel-123");

    expect(searchListMock).toHaveBeenCalledWith({
      channelId: "channel-123",
      eventType: "live",
      part: ["snippet"],
      type: ["video"],
    });
    expect(result.count).toBe(1);
    expect(result.withinLimit).toBe(true);
  });

  it("flags when concurrent stream limit is exceeded", async () => {
    searchListMock.mockResolvedValue({
      data: {
        items: Array.from({ length: 14 }, (_, index) => ({
          id: { videoId: `stream-${index}` },
        })),
      },
    });

    const result = await youtubeClient.checkConcurrentStreams(
      "channel-oversubscribed",
    );

    expect(result.count).toBe(14);
    expect(result.withinLimit).toBe(false);
  });
});
