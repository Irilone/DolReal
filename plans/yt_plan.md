# YouTube Live Streaming Setup Plan

## Objective
Create and configure 4 separate YouTube channels for simultaneous streaming of "Dagar om Lagar 2025" event.

## YouTube Channel Requirements

### Critical Limitation
⚠️ **YouTube only allows 1 concurrent live stream per channel**

**Solution**: Create 4 separate YouTube channels:
1. **Nodväst** (Northwest Node)
2. **Nodsyd** (South Node)
3. **Nodöst** (East Node)
4. **Nodmidd** (Central Node)

## Channel Creation Process

### Step 1: Create Brand Accounts (if needed)
```
YouTube → Settings → Create a new channel
```
For each channel:
- Channel Name: "DoL 2025 - Nodväst", "DoL 2025 - Nodsyd", etc.
- Category: Education / Events
- Description: Event-specific description with dates (Nov 6-7, 2025)

### Step 2: Enable Live Streaming
For **each of the 4 channels**:
1. Navigate to YouTube Studio
2. Go to **Create → Go Live**
3. Complete live streaming verification (may take 24 hours)
4. Accept YouTube Partner Program terms

### Step 3: Configure Stream Settings

#### Nodväst Channel
```yaml
Title: "Dagar om Lagar 2025 - Nodväst Stream"
Description: |
  Live from the Northwest Node of Dagar om Lagar 2025
  Event dates: November 6-7, 2025
  
  #DoL2025 #DagarOmLagar #Nodväst
Category: Education
Visibility: Public (or Unlisted for testing)
Age Restriction: No
Monetization: Disabled (for event streams)
```

Streaming Settings:
- **Stream Latency**: Normal latency (default)
- **DVR**: Enabled (allow viewers to rewind)
- **Auto-start**: Disabled (manual start)
- **Auto-stop**: Disabled (manual stop)

#### Repeat for Nodsyd, Nodöst, Nodmidd
Use identical settings but change:
- Title: "...Nodsyd Stream", "...Nodöst Stream", "...Nodmidd Stream"
- Description: Update node name
- Hashtags: Add node-specific tags

## Stream Key Management

### Retrieve Stream Keys
For **each channel**:
```
YouTube Studio → Create → Go Live → Stream Settings → Stream Key
```

Store in `.env`:
```bash
NODVAST_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
NODSYD_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
NODOST_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
NODMIDD_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
```

**Security**: 
- Never commit stream keys to git
- Use environment variables only
- Rotate keys after event completion

### Stream URLs
Primary ingestion:
```
rtmps://a.rtmps.youtube.com/live2/{stream_key}
```

Backup ingestion:
```
rtmps://b.rtmps.youtube.com/live2/{stream_key}?backup=1
rtmps://c.rtmps.youtube.com/live2/{stream_key}?backup=1
```

## YouTube Live Streaming API Integration

### Step 1: Enable YouTube Data API v3
```
Google Cloud Console → APIs & Services → Library
Search: "YouTube Data API v3" → Enable
```

### Step 2: Create API Credentials
```
APIs & Services → Credentials → Create Credentials → API Key
```

Restrict API key:
- **Application restrictions**: HTTP referrers
- **API restrictions**: YouTube Data API v3
- **Allowed referrers**: `https://yourdomain.com/*`, `http://localhost:3000/*`

Store in `.env`:
```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSy...your-api-key
```

### Step 3: API Usage Planning

#### Stream Health Monitoring
```typescript
// Fetch live stream health
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/liveStreams?part=status,healthStatus&id=${streamId}&key=${apiKey}`
);
```

Response includes:
- Stream status: active, inactive, error
- Health status: good, ok, bad, noData
- Ingestion info: bitrate, resolution, fps

#### Chat Integration (Optional)
```typescript
// Fetch live chat messages
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${chatId}&part=snippet,authorDetails&key=${apiKey}`
);
```

#### Analytics
```typescript
// Get concurrent viewers
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${apiKey}`
);
// Returns: concurrentViewers, activeLiveChatId
```

## Testing Strategy

### Phase 1: Single Channel Test (Day 1)
1. Test Nodväst channel only
2. Stream 30-minute test content
3. Monitor:
   - Stream health in YouTube Studio
   - Latency (target: <5 seconds)
   - Video quality (should be 4K/2160p)
   - Audio sync

### Phase 2: Dual Channel Test (Day 2)
1. Stream to Nodväst + Nodsyd simultaneously
2. Verify no interference between streams
3. Monitor bandwidth usage (should be ~48Mbps)

### Phase 3: Full Test (Day 3)
1. All 4 channels streaming simultaneously
2. 1-hour stress test
3. Monitor:
   - OBS performance (CPU <60%)
   - Router bandwidth (target: 96-100Mbps upload)
   - YouTube stream health (all "Excellent")
   - Frame drops (<0.1%)

### Phase 4: Load Test (Day 4)
1. Simulate viewer load with test accounts
2. Test chat moderation (if enabled)
3. Test failover to backup ingest servers
4. Verify DVR functionality

## Embedding Streams in Next.js Site

### Component Structure
```typescript
// src/components/StreamGrid.tsx
import { YouTubeEmbed } from '@/components/YouTubeEmbed';

const streams = [
  { id: process.env.NEXT_PUBLIC_NODVAST_VIDEO_ID, title: 'Nodväst' },
  { id: process.env.NEXT_PUBLIC_NODSYD_VIDEO_ID, title: 'Nodsyd' },
  { id: process.env.NEXT_PUBLIC_NODOST_VIDEO_ID, title: 'Nodöst' },
  { id: process.env.NEXT_PUBLIC_NODMIDD_VIDEO_ID, title: 'Nodmidd' },
];

export function StreamGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {streams.map(stream => (
        <YouTubeEmbed key={stream.id} videoId={stream.id} title={stream.title} />
      ))}
    </div>
  );
}
```

### Iframe Embed Parameters
```html
<iframe
  src="https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

## Accessibility Considerations

### Closed Captions
- Enable auto-captions for Swedish (primary language)
- Manually add captions for other languages post-event
- Use YouTube's caption editor

### Audio Description
- Provide text-based summaries alongside streams
- Use descriptive titles and metadata

## Post-Event Archiving

### Automatic Recording
- YouTube automatically saves live streams as VODs (Video on Demand)
- Processing time: ~1 hour after stream ends

### Download Archive
```bash
# Use yt-dlp to download all 4 streams
yt-dlp https://youtube.com/watch?v=${NODVAST_VIDEO_ID}
yt-dlp https://youtube.com/watch?v=${NODSYD_VIDEO_ID}
yt-dlp https://youtube.com/watch?v=${NODOST_VIDEO_ID}
yt-dlp https://youtube.com/watch?v=${NODMIDD_VIDEO_ID}
```

### Metadata
Create JSON manifest:
```json
{
  "event": "Dagar om Lagar 2025",
  "dates": ["2025-11-06", "2025-11-07"],
  "streams": [
    {
      "node": "Nodväst",
      "videoId": "...",
      "startTime": "2025-11-06T09:00:00Z",
      "duration": "PT8H"
    }
  ]
}
```

## Monitoring Dashboard

### Key Metrics to Display
- Stream status (live/offline) per channel
- Concurrent viewers per stream
- Total viewers across all streams
- Stream health indicators
- Bandwidth utilization

### Implementation
```typescript
// src/lib/youtube-monitor.ts
export async function getStreamHealth(streamId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/liveStreams?part=status,healthStatus&id=${streamId}&key=${apiKey}`
  );
  const data = await response.json();
  return data.items[0].healthStatus;
}
```

## Troubleshooting

### Issue: Stream Won't Go Live
**Checks**:
1. Channel has live streaming enabled (24h verification period)
2. Stream key is correct and not expired
3. OBS is sending correct bitrate (not too high/low)
4. Firewall allows RTMPS traffic (port 443)

### Issue: Poor Stream Quality
**Solutions**:
1. Reduce bitrate in OBS (try 18Mbps instead of 24Mbps)
2. Change YouTube ingest server
3. Enable "Low Latency Mode" in YouTube Studio
4. Check router QoS settings

### Issue: Audio Desync
**Causes**:
- Keyframe interval mismatch (must be 2 seconds)
- Variable bitrate encoding (use CBR)
- Audio sample rate mismatch

**Fix**: Restart stream with correct OBS settings

## Success Criteria
- [ ] All 4 channels verified and live-streaming enabled
- [ ] Stream keys stored securely in environment variables
- [ ] YouTube Data API enabled and tested
- [ ] Test streams completed successfully on all channels
- [ ] Embed components working on Next.js site
- [ ] Monitoring dashboard functional
- [ ] Failover to backup ingest servers tested
- [ ] Post-event VODs available within 2 hours
