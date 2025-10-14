// tests/integration/youtube.test.ts
import { getStreamStatus, checkConcurrentStreams } from '@/lib/youtube/client';

describe('YouTube Integration', () => {
  it('verifies concurrent stream limit compliance', async () => {
    const result = await checkConcurrentStreams(process.env.YOUTUBE_CHANNEL_ID!);
    expect(result.withinLimit).toBe(true);
    expect(result.count).toBeLessThanOrEqual(12);
  });
});
