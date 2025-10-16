# DoL 2025 Streaming Hub Setup Guide

## Overview

This document provides comprehensive setup instructions for the **Dagar om Lagar 2025** multi-node streaming platform, covering all aspects from OBS configuration to YouTube streaming and InfraNodus knowledge graph integration.

## Event Details

- **Event Name**: Dagar om Lagar 2025 (Days about Laws 2025)
- **Dates**: November 6-7, 2025
- **Streaming Nodes**: 4 simultaneous streams
  - Nodväst (Northwest) - Constitutional law and human rights
  - Nodsyd (South) - Criminal law and justice reform
  - Nodöst (East) - Commercial and contract law
  - Nodmidd (Central) - Environmental and technology law
- **Day 2 Special**: Only Nodväst remains active on Day 2

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     DoL 2025 Platform                        │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Nodväst  │  │  Nodsyd  │  │  Nodöst  │  │ Nodmidd  │   │
│  │   OBS    │  │   OBS    │  │   OBS    │  │   OBS    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                     │                                        │
│            ┌────────▼────────┐                              │
│            │  YouTube Live   │                              │
│            │  (4 Streams)    │                              │
│            └────────┬────────┘                              │
│                     │                                        │
│            ┌────────▼────────┐                              │
│            │   Next.js App   │                              │
│            │  (Stream Hub)   │                              │
│            └────────┬────────┘                              │
│                     │                                        │
│         ┌───────────┼───────────┐                           │
│         │           │           │                           │
│    ┌────▼────┐ ┌───▼────┐ ┌───▼────────┐                  │
│    │Carousel │ │Schedule│ │InfraNodus  │                  │
│    │  View   │ │  View  │ │   Graph    │                  │
│    └─────────┘ └────────┘ └────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

### Hardware Requirements
- **CPU**: Intel i7 or AMD Ryzen 7 (or better) for each streaming node
- **RAM**: Minimum 16GB per node
- **GPU**: NVIDIA GTX 1060 or better (for hardware encoding)
- **Storage**: 500GB SSD for recordings and buffer
- **Network**: 1 Gbps connection with QoS support

### Software Requirements
- **Operating System**: Windows 10/11, macOS 12+, or Ubuntu 20.04+
- **OBS Studio**: Version 30.0 or later
- **OBS Multi-RTMP Plugin**: For simultaneous streaming
- **Node.js**: Version 20.0 or later
- **Bun**: Version 1.0 or later (optional, but recommended)

### Network Equipment
- **Router**: ASUS RT-AX86U Pro with Asuswrt-Merlin firmware
- **QoS Configuration**: Prioritize streaming traffic
- **Bandwidth**: Minimum 50 Mbps upload per stream (200 Mbps total)

## Part 1: OBS Studio Configuration

### 1.1 Install OBS Studio

Download and install OBS Studio from [obsproject.com](https://obsproject.com/)

```bash
# Ubuntu/Debian
sudo add-apt-repository ppa:obsproject/obs-studio
sudo apt update
sudo apt install obs-studio

# macOS (using Homebrew)
brew install --cask obs

# Windows
# Download installer from obsproject.com
```

### 1.2 Install Multi-RTMP Plugin

The Multi-RTMP plugin allows streaming to multiple YouTube channels simultaneously.

1. Download from: https://github.com/sorayuki/obs-multi-rtmp
2. Install according to OS-specific instructions
3. Restart OBS Studio

### 1.3 Configure Each Streaming Node

For each of the 4 nodes (Nodväst, Nodsyd, Nodöst, Nodmidd):

#### Video Settings
- **Base Resolution**: 1920x1080
- **Output Resolution**: 1920x1080
- **Frame Rate**: 30 FPS (or 60 FPS for high-motion content)

#### Audio Settings
- **Sample Rate**: 48 kHz
- **Channels**: Stereo
- **Desktop Audio**: Capture system audio
- **Microphone**: Capture presenter audio

#### Encoding Settings
- **Encoder**: NVIDIA NVENC H.264 (or x264 if no GPU)
- **Rate Control**: CBR (Constant Bitrate)
- **Bitrate**: 6000 Kbps for video, 160 Kbps for audio
- **Keyframe Interval**: 2 seconds
- **Preset**: Quality (for NVENC) or Medium (for x264)

#### Scene Configuration

Create the following scenes for each node:

1. **Opening Scene**
   - Conference logo
   - Countdown timer
   - Background music

2. **Speaker Scene**
   - Camera feed (main)
   - Presentation slides (picture-in-picture)
   - Lower third graphics (name, title)

3. **Panel Discussion Scene**
   - Multi-camera layout
   - Moderator camera
   - Panelist cameras

4. **Intermission Scene**
   - Schedule display
   - Break countdown
   - Promotional content

### 1.4 Configure Multi-RTMP Output

1. Open OBS Studio
2. Go to **Tools** → **Multi-RTMP Output**
3. Click **Add Target**
4. Configure YouTube stream:
   - **Server**: rtmp://a.rtmp.youtube.com/live2
   - **Key**: [Your YouTube Stream Key]
   - **Name**: Nodväst Day 1 (or appropriate node name)

Repeat for all 4 nodes (or 5 if Nodväst has separate Day 1 and Day 2 streams).

### 1.5 Test Stream Configuration

Before going live:
1. Start a **Private** YouTube stream
2. Test audio levels, video quality, and scene transitions
3. Verify network bandwidth is sufficient
4. Check for dropped frames or encoding issues

**See**: `perplexity_manuals/obs-mcp-user-manual.md` for detailed OBS configuration and MCP integration.

## Part 2: YouTube Live Setup

### 2.1 Create YouTube Live Streams

For each streaming node, create a YouTube Live event:

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click **Create** → **Go Live**
3. Select **Stream** (for custom streaming software)
4. Configure stream settings:
   - **Title**: "DoL 2025 - [Node Name] - Day [1/2]"
   - **Description**: Event description with schedule
   - **Category**: Education
   - **Visibility**: Public (or Unlisted for testing)
   - **Enable DVR**: Yes
   - **Enable Chat**: Yes (moderated)
   - **Enable Live Automatic Captions**: Yes

5. Copy the **Stream Key** for OBS configuration

### 2.2 Configure Stream Settings

For optimal streaming:
- **Latency**: Low latency (for live interaction)
- **DVR**: Enabled (allows viewers to rewind)
- **Auto-start**: Disabled (manual start control)
- **Auto-stop**: Disabled (manual stop control)

### 2.3 YouTube API Integration

The Next.js app uses YouTube API to fetch stream metadata and viewer counts.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "DoL 2025 Streaming"
3. Enable **YouTube Data API v3**
4. Create API credentials:
   - **API Key** (for read-only access)
   - Restrict to YouTube Data API v3
   - Restrict to your domain (for production)

5. Add API key to `.env`:
   ```bash
   NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-api-key
   ```

### 2.4 YouTube Video IDs

Update the video IDs in `src/lib/dol/data.ts` with your actual stream IDs:

```typescript
export const dolStreams: DolStream[] = [
  {
    id: 'stream-nodvast-day1',
    nodeId: 'nodvast',
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID', // Replace with actual ID
    // ...
  },
  // ...
];
```

**See**: `plans/yt_plan.md` for detailed YouTube streaming configuration.

## Part 3: Network and QoS Configuration

### 3.1 ASUS RT-AX86U Pro Setup

The router handles QoS (Quality of Service) to prioritize streaming traffic.

#### Initial Setup
1. Flash Asuswrt-Merlin firmware (if not already installed)
2. Access router admin: http://192.168.1.1
3. Login with admin credentials

#### QoS Configuration

1. Navigate to **QoS** → **QoS Settings**
2. Enable **Adaptive QoS**: Yes
3. Set **QoS Type**: Traditional QoS
4. Configure bandwidth limits:
   - **Upload**: Set to 80% of your ISP's upload speed
   - **Download**: Set to 90% of your ISP's download speed

5. Create QoS rules:
   ```
   Priority    | Service        | Source IP         | Destination
   ------------|----------------|-------------------|-------------
   Highest     | RTMP (1935)    | Streaming Nodes   | YouTube
   Highest     | HTTPS (443)    | Streaming Nodes   | YouTube
   High        | HTTP (80)      | All devices       | Any
   ```

6. Add specific IPs for each streaming node to **High Priority** list

#### Port Forwarding (Optional)
If using external streaming sources:
- **Port 1935**: RTMP streaming
- **Port 443**: HTTPS (for control)

**See**: `docs/ASUSWRT-MERLIN-DOCS.md` for comprehensive router configuration.

### 3.2 Bandwidth Allocation

Recommended bandwidth per stream:
- **Video**: 6 Mbps
- **Audio**: 160 Kbps
- **Overhead**: 1 Mbps
- **Total per stream**: ~7 Mbps

For 4 simultaneous streams: **~30 Mbps** (with headroom, aim for 50 Mbps)

### 3.3 Network Monitoring

Monitor network performance during streaming:
1. Use router's **Traffic Analyzer** to monitor bandwidth usage
2. Check for packet loss, latency spikes
3. Monitor OBS's **Stats** panel for dropped frames

## Part 4: InfraNodus Knowledge Graph Integration

### 4.1 InfraNodus Account Setup

1. Create account at [infranodus.com](https://infranodus.com/)
2. Generate API key from account settings
3. Add to `.env`:
   ```bash
   INFRANODUS_API_KEY=your-infranodus-api-key
   ```

### 4.2 Create Knowledge Graphs

For each streaming node, create a knowledge graph:

1. Log in to InfraNodus
2. Create new graph: "DoL 2025 - [Node Name]"
3. Import topics from program schedule
4. Add connections between related topics
5. Generate visualizations

6. Copy the **Graph ID** for each node

### 4.3 Update Graph IDs in Data

Update `src/lib/dol/data.ts` with your actual graph IDs:

```typescript
export const dolNodes: DolNode[] = [
  {
    id: 'nodvast',
    name: 'Nodväst',
    // ...
    graphId: 'your-infranodus-graph-id', // Replace with actual ID
  },
  // ...
];
```

### 4.4 MCP Integration

The app uses Model Context Protocol (MCP) to integrate InfraNodus:

1. Install MCP dependencies (already in package.json)
2. Configure MCP client in `src/lib/mcp/client.ts`
3. Fallback to iframe embed if MCP unavailable

**See**: `perplexity_manuals/infranodus-mcp-manual.md` for detailed InfraNodus integration.

## Part 5: Next.js Application Deployment

### 5.1 Local Development

```bash
# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev
# or
bun dev

# Open browser
open http://localhost:3000
```

### 5.2 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Or export static site (if no dynamic routes)
npm run build && npm run export
```

### 5.3 Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

#### Option 2: Docker
```bash
# Build Docker image
docker build -t dol-2025-streaming .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_YOUTUBE_API_KEY=your-key \
  -e INFRANODUS_API_KEY=your-key \
  dol-2025-streaming
```

#### Option 3: Traditional Server
```bash
# Build application
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "dol-2025" -- start
```

### 5.4 Environment Variables

Create `.env.production` for production deployment:

```bash
# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=your-production-youtube-key

# InfraNodus API
INFRANODUS_API_KEY=your-production-infranodus-key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Domain
NEXT_PUBLIC_DOMAIN=https://dagaromlagar.se
```

## Part 6: Day-Aware Content Configuration

### 6.1 Day Selection Logic

The application automatically detects the current day and shows appropriate content:

```typescript
// src/lib/utils/date.ts
export function getCurrentDay(): 1 | 2 | null {
  const now = new Date();
  const day1 = new Date('2025-11-06');
  const day2 = new Date('2025-11-07');
  
  if (now.toDateString() === day1.toDateString()) return 1;
  if (now.toDateString() === day2.toDateString()) return 2;
  return null; // Not during event
}
```

### 6.2 Day 2 Inactive Node Messaging

On Day 2, only Nodväst is active. The UI displays appropriate messaging:

```typescript
// Inactive node message
{!node.activeOnDay2 && currentDay === 2 && (
  <div className="text-center p-4 bg-yellow-500/10 rounded">
    <p className="text-yellow-600 dark:text-yellow-400">
      {t('streams.inactive')} {/* "Not active today" */}
    </p>
  </div>
)}
```

### 6.3 Testing Day-Aware Features

To test day-aware features during development:

```typescript
// Override date for testing
const testDay = 2; // Test Day 2 behavior
const activeNodes = getActiveNodesByDay(testDay);
```

## Part 7: Localization Setup

### 7.1 Supported Languages

The platform supports 7 languages:
1. Swedish (se) - Primary
2. English (en)
3. Arabic (ar) - RTL
4. Farsi (fa) - RTL
5. Chinese (zh)
6. Spanish (es)
7. Italian (it) - **NEW**

### 7.2 Adding Translations

Translations are stored in `src/i18n/locales/[lang].json`:

1. Copy an existing locale file (e.g., `en.json`)
2. Translate all strings to the target language
3. Update `src/i18n/config.ts` to import the new locale
4. Add locale to `src/types/i18n.ts` type definitions

### 7.3 RTL Support

For Arabic and Farsi, the app automatically switches to RTL layout:

```typescript
// src/app/[lang]/layout.tsx
const direction = locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr';

<html lang={locale} dir={direction}>
```

## Part 8: Testing and Quality Assurance

### 8.1 Pre-Event Checklist

- [ ] All OBS scenes configured and tested
- [ ] YouTube streams created and stream keys configured
- [ ] Network QoS rules active and tested
- [ ] InfraNodus graphs created and linked
- [ ] Next.js app deployed and accessible
- [ ] All 7 language translations complete
- [ ] Day 1 and Day 2 content verified
- [ ] Mobile responsiveness tested
- [ ] Accessibility (WCAG 2.2 AA) validated
- [ ] Performance metrics within budget (LCP <2.5s, CLS <0.1)

### 8.2 Streaming Test Protocol

1 week before event:
1. Run full end-to-end test stream
2. Test all 4 nodes simultaneously
3. Verify network bandwidth is sufficient
4. Test failover scenarios (node failure, network issues)
5. Validate recording functionality

1 day before event:
1. Final technical rehearsal
2. Test speaker audio and video
3. Verify scene transitions
4. Test chat moderation
5. Brief technical team

### 8.3 Monitoring During Event

Real-time monitoring:
- **OBS Stats**: Monitor dropped frames, CPU/GPU usage
- **YouTube Analytics**: Monitor viewer count, playback issues
- **Network Monitor**: Monitor bandwidth, latency
- **Application Logs**: Monitor errors, API failures

## Part 9: Troubleshooting

### 9.1 Common OBS Issues

**Dropped Frames**
- Reduce output resolution or bitrate
- Enable hardware encoding (NVENC)
- Close unnecessary applications
- Check network bandwidth

**Audio Sync Issues**
- Adjust audio delay in OBS settings
- Check audio sample rate (should be 48 kHz)
- Disable audio enhancements in OS

**Scene Transition Lag**
- Simplify complex scenes
- Pre-load scenes before transitioning
- Increase GPU memory allocation

### 9.2 Common YouTube Issues

**Stream Not Going Live**
- Verify stream key is correct
- Check YouTube account is verified for live streaming
- Ensure no copyright claims on content
- Wait 30 seconds after starting stream

**Buffering for Viewers**
- Check upload bandwidth
- Reduce bitrate if necessary
- Enable YouTube's adaptive bitrate
- Use low-latency mode

### 9.3 Common Network Issues

**High Latency**
- Check for other devices consuming bandwidth
- Enable QoS on router
- Use wired Ethernet instead of WiFi
- Contact ISP if issue persists

**Packet Loss**
- Check cable connections
- Update router firmware
- Reduce number of simultaneous streams
- Consider backup internet connection

### 9.4 Application Issues

**Streams Not Loading**
- Verify YouTube API key is valid and has not exceeded quota
- Check YouTube video IDs are correct
- Verify CORS settings if deploying to custom domain

**Translations Missing**
- Ensure all locale files are complete
- Check i18n configuration includes all languages
- Verify translation keys match in all locale files

## Part 10: Post-Event Procedures

### 10.1 Archive Streams

After the event:
1. Download recordings from YouTube
2. Upload to permanent archive storage
3. Generate transcripts (YouTube auto-captions)
4. Create highlight reels for promotion

### 10.2 Generate Reports

Create post-event reports:
- Total viewer count per stream
- Peak concurrent viewers
- Geographic distribution of viewers
- Average watch time
- Technical issues log

### 10.3 Update Archive Page

Update `src/app/archive/page.tsx` with VOD links:
```typescript
export const archivedStreams = [
  {
    id: 'nodvast-day1-archive',
    youtubeId: 'ARCHIVED_VIDEO_ID',
    title: 'Nodväst - Day 1 (Archived)',
    // ...
  },
  // ...
];
```

## Support and Resources

### Documentation
- **OBS Manual**: `perplexity_manuals/obs-mcp-user-manual.md`
- **InfraNodus Manual**: `perplexity_manuals/infranodus-mcp-manual.md`
- **Infrastructure Manual**: `perplexity_manuals/conference-infrastructure-manual.md`
- **Router Docs**: `docs/ASUSWRT-MERLIN-DOCS.md`

### External Resources
- [OBS Documentation](https://obsproject.com/wiki/)
- [YouTube Live Streaming](https://support.google.com/youtube/topic/9257891)
- [Next.js Documentation](https://nextjs.org/docs)
- [InfraNodus Docs](https://infranodus.com/docs)

### Contact
- **Technical Support**: tech@dagaromlagar.se
- **Emergency Hotline**: +46-XX-XXX-XXXX (during event)

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-16  
**Status**: Production Ready
