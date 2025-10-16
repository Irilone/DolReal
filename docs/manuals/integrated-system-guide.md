# Integrated System Guide: Dagar om Lagar 2025

## Overview

This guide covers the complete setup and operation of the DoL 2025 streaming platform, including OBS Studio configuration, YouTube Live integration, router QoS settings, and the Next.js web application.

## System Architecture

### Components

1. **OBS Studio** - Video capture and streaming software
2. **YouTube Live** - 4 separate channels for simultaneous streams
3. **ASUS RT-AX86U Pro Router** - Network QoS and bandwidth management
4. **Next.js 15 Web Application** - Live stream viewer with 6-language support
5. **InfraNodus API** - Knowledge graph visualization

### Data Flow

```
OBS Studio (4 instances) 
  → Multiple RTMP Outputs Plugin 
  → YouTube Live (4 channels)
  → YouTube Data API v3
  → Next.js API Routes
  → React Frontend
```

## Network Setup

### Router Configuration (ASUS RT-AX86U Pro)

1. **Access Router Admin**
   - Navigate to `http://router.asus.com`
   - Login with admin credentials

2. **Enable QoS**
   - Go to QoS → QoS Settings
   - Enable Traditional QoS
   - Set Upload/Download bandwidth to 90% of measured speeds

3. **Configure Priority Rules**
   - Add High Priority: UDP ports 1935 (RTMP)
   - Add High Priority: Streaming applications
   - Set OBS computer MAC address to highest priority

4. **Monitor Bandwidth**
   - Use Traffic Analyzer to monitor real-time usage
   - Adjust QoS rules based on performance

## OBS Studio Configuration

### Installation

1. Download OBS Studio 30+ from obsproject.com
2. Install Multiple RTMP Outputs Plugin by SoraYuki
3. Restart OBS Studio

### Streaming Settings

**Video Settings:**
- Base Resolution: 1920x1080
- Output Resolution: 1280x720
- FPS: 30
- Encoder: VideoToolbox (hardware encoding on macOS)
- Bitrate: 2500-4000 Kbps per stream

**Audio Settings:**
- Sample Rate: 48kHz
- Channels: Stereo
- Bitrate: 128 Kbps

### YouTube Integration

1. Create 4 YouTube channels (one per node)
2. Enable YouTube Live on each channel
3. Copy Stream Key for each channel
4. Configure RTMP outputs in OBS:
   - Nodväst: rtmp://a.rtmp.youtube.com/live2/{stream_key_1}
   - Nodsyd: rtmp://a.rtmp.youtube.com/live2/{stream_key_2}
   - Nodöst: rtmp://a.rtmp.youtube.com/live2/{stream_key_3}
   - Nodmidd: rtmp://a.rtmp.youtube.com/live2/{stream_key_4}

## Web Application Deployment

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-api-key
INFRANODUS_API_KEY=your-infranodus-api-key
NODVAST_YOUTUBE_ID=stream-id-1
NODSYD_YOUTUBE_ID=stream-id-2
NODOST_YOUTUBE_ID=stream-id-3
NODMIDD_YOUTUBE_ID=stream-id-4
```

### Deployment Steps

```bash
# Install dependencies
bun install

# Build production bundle
bun run build

# Start production server
bun run start
```

## Monitoring and Troubleshooting

### Stream Health Monitoring

- Check YouTube Live Dashboard for bitrate/connection issues
- Monitor API `/api/stream-health/{streamId}` for automated checks
- View aggregate viewer count at `/api/viewer-count`

### Common Issues

1. **High Latency**: Reduce bitrate or check router QoS
2. **Connection Drops**: Enable backup RTMP servers in OBS
3. **Audio Desync**: Check audio buffering settings
4. **Low Quality**: Increase bitrate or resolution

## Event Day Checklist

### Pre-Event (1 hour before)

- [ ] Test all 4 OBS instances
- [ ] Verify YouTube Live streams are online
- [ ] Check router bandwidth availability
- [ ] Test web application in all 6 languages
- [ ] Enable local OBS recording as backup

### During Event

- [ ] Monitor stream health dashboard
- [ ] Check viewer count metrics
- [ ] Watch for connection issues
- [ ] Record locally as backup

### Post-Event

- [ ] Stop all streams
- [ ] Download local recordings
- [ ] Export viewer analytics
- [ ] Archive stream metadata
