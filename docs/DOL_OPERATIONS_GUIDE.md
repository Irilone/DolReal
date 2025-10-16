# DoL 2025 Streaming Hub - Operations Guide

**Version:** 1.0.0  
**Last Updated:** 2025-10-16  
**Event Dates:** November 6-7, 2025  
**Venue:** Online Multi-Node Streaming

## Table of Contents

1. [Overview](#overview)
2. [Pre-Event Setup](#pre-event-setup)
3. [YouTube Multi-Stream Configuration](#youtube-multi-stream-configuration)
4. [OBS Multi-RTMP Setup](#obs-multi-rtmp-setup)
5. [InfraNodus MCP Workflow](#infranodus-mcp-workflow)
6. [Event Day Operations](#event-day-operations)
7. [Troubleshooting](#troubleshooting)
8. [Post-Event Procedures](#post-event-procedures)

---

## Overview

### Event Structure

**Dagar om Lagar 2025** is a two-day online legal symposium featuring:
- **Day 1 (Nov 6)**: 4 concurrent streaming nodes
- **Day 2 (Nov 7)**: 1 main streaming node (Nodväst only)

### Streaming Nodes

| Node ID | Name | Color | Day 1 | Day 2 | Description |
|---------|------|-------|-------|-------|-------------|
| `nodvast` | Nordväst | Blue (#3B82F6) | ✅ Active | ✅ Active | Main conference stream |
| `nodsyd` | Nordsyd | Green (#10B981) | ✅ Active | ❌ Inactive | South node workshops |
| `nodost` | Nordöst | Amber (#F59E0B) | ✅ Active | ❌ Inactive | East node panels |
| `nodmidd` | Nordmidd | Purple (#8B5CF6) | ✅ Active | ❌ Inactive | Central node keynotes |

### Technical Stack

- **Streaming Software**: OBS Studio v30.0+ with Multi-RTMP plugin
- **Platforms**: 4 separate YouTube Live channels
- **Web Application**: Next.js 15 + React + i18next
- **Knowledge Graph**: InfraNodus integration
- **Network QoS**: ASUS RT-AX86U Pro router

---

## Pre-Event Setup

### Timeline: 4 Weeks Before Event

#### Week 1: YouTube Channel Setup

1. **Create 4 YouTube Channels**
   - Option A: Create brand accounts under main organization
   - Option B: Use existing organizational channels
   - Channel naming: "DoL 2025 - [Node Name]"

2. **Enable Live Streaming** (requires 24h verification)
   ```
   For each channel:
   YouTube Studio → Create → Go Live → Enable Live Streaming
   ```

3. **Configure Channel Settings**
   ```yaml
   For each channel:
     Category: Education/Events
     Description: "Live from [Node Name] of Dagar om Lagar 2025"
     Privacy: Public or Unlisted (for testing)
     DVR: Enabled
     Auto-start/stop: Disabled (manual control)
   ```

4. **Retrieve Stream Keys**
   ```
   YouTube Studio → Create → Go Live → Stream Settings
   Copy each stream key to secure password manager
   ```

5. **Store Keys Securely**
   ```bash
   # Add to .env.local (NEVER commit to git)
   NEXT_PUBLIC_NODVAST_YOUTUBE_ID=your_video_id_here
   NEXT_PUBLIC_NODSYD_YOUTUBE_ID=your_video_id_here
   NEXT_PUBLIC_NODOST_YOUTUBE_ID=your_video_id_here
   NEXT_PUBLIC_NODMIDD_YOUTUBE_ID=your_video_id_here
   
   # OBS stream keys (keep private)
   NODVAST_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
   NODSYD_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
   NODOST_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
   NODMIDD_YOUTUBE_KEY=xxxx-xxxx-xxxx-xxxx
   ```

#### Week 2: OBS Studio Configuration

1. **Install OBS Studio**
   ```bash
   # macOS (Homebrew)
   brew install --cask obs
   
   # Windows (Chocolatey)
   choco install obs-studio
   
   # Linux (Ubuntu/Debian)
   sudo add-apt-repository ppa:obsproject/obs-studio
   sudo apt update && sudo apt install obs-studio
   ```

2. **Install Multi-RTMP Plugin**
   ```bash
   # macOS (Apple Silicon)
   curl -L https://github.com/sorayuki/obs-multi-rtmp/releases/latest/download/obs-multi-rtmp-macos-arm64.pkg -o obs-multi-rtmp.pkg
   sudo installer -pkg obs-multi-rtmp.pkg -target /
   
   # Windows
   Download from: https://github.com/sorayuki/obs-multi-rtmp/releases
   Run installer and restart OBS
   
   # Linux
   # Follow manual installation instructions from plugin repository
   ```

3. **Configure OBS Scenes**
   ```
   Create scenes for each session type:
   - Opening_Ceremony
   - Keynote_Single_Speaker
   - Panel_Discussion
   - Workshop_Screen_Share
   - Closing_Remarks
   ```

4. **Add Sources to Scenes**
   ```
   Common sources:
   - Video Capture Device (camera)
   - Audio Input Capture (microphone)
   - Display Capture (screen sharing)
   - Text (FreeType 2) - for titles/lower thirds
   - Browser Source - for web overlays
   - Image - for logos/backgrounds
   ```

#### Week 3: InfraNodus Integration

1. **Sign Up for InfraNodus**
   - Visit: https://infranodus.com
   - Choose plan: Pro recommended (1000 API calls/hour)

2. **Generate API Key**
   ```
   InfraNodus → Settings → API Access → Generate Key
   ```

3. **Configure in Application**
   ```bash
   # Add to .env.local
   INFRANODUS_API_KEY=your-api-key-here
   INFRANODUS_API_URL=https://infranodus.com/api
   ```

4. **Test API Connection**
   ```bash
   curl -X GET "https://infranodus.com/api/user" \
     -H "Authorization: Bearer ${INFRANODUS_API_KEY}"
   ```

5. **Create Knowledge Graphs for Each Node**
   - Create 4 separate contexts in InfraNodus
   - Note context IDs for use in web app
   - Pre-populate with event keywords and topics

#### Week 4: Testing & Rehearsal

1. **Test Streams (Unlisted)**
   - Start all 4 OBS outputs simultaneously
   - Verify video/audio quality on all channels
   - Test stream switching in web application
   - Check mobile responsiveness

2. **Network QoS Configuration**
   - Configure ASUS router traffic prioritization
   - Reserve bandwidth for streaming (upload priority)
   - Test failover scenarios

3. **Full Rehearsal**
   - Simulate event schedule
   - Practice scene switching
   - Test presenter transitions
   - Verify all speaker setups

---

## YouTube Multi-Stream Configuration

### Critical Information

⚠️ **YouTube Limitation**: Only 1 concurrent live stream per channel  
✅ **Solution**: 4 separate YouTube channels (one per node)

### Creating Scheduled Live Events

**For Day 1 (All 4 Nodes Active)**

```yaml
# Nodväst Event
Title: "DoL 2025 - Nordväst Stream - Day 1"
Schedule: November 6, 2025, 09:00 CET
Duration: 8 hours
Description: |
  Main conference track featuring opening ceremony and keynote speakers.
  Part of Dagar om Lagar 2025.
  
  📅 Day 1 - November 6, 2025
  🕒 09:00 - 17:00 CET
  
  #DoL2025 #LegalTech #Nordväst

Category: Education
Privacy: Public
Stream Latency: Normal
DVR: Enabled
Monetization: Disabled
```

Repeat for other nodes with appropriate titles and descriptions.

**For Day 2 (Nodväst Only)**

```yaml
# Nodväst Event (Day 2)
Title: "DoL 2025 - Main Stream - Day 2"
Schedule: November 7, 2025, 09:00 CET
Duration: 8 hours
Description: |
  Day 2 main conference stream with closing sessions.
  All content consolidated on main stream today.
  
  📅 Day 2 - November 7, 2025
  🕒 09:00 - 17:00 CET
  
  #DoL2025 #LegalTech #MainStream
```

### Stream Health Monitoring

Monitor these metrics during event:

- **Bitrate Stability**: Should stay within ±10% of target
- **Frame Drop Rate**: Should be <0.1%
- **Network Stats**: Upload speed should be 2x bitrate minimum
- **Viewer Count**: Available in YouTube Studio live dashboard
- **Chat Activity**: Moderate as needed

---

## OBS Multi-RTMP Setup

### Encoding Settings (Optimized for 4 Concurrent Streams)

**Hardware Requirements**:
- **CPU**: 8+ cores recommended
- **GPU**: Hardware encoding capable (NVIDIA NVENC / AMD VCE / Apple VideoToolbox)
- **RAM**: 16GB minimum, 32GB recommended
- **Upload Speed**: 50 Mbps minimum (12.5 Mbps per stream)

**OBS Settings**:

```yaml
Settings → Output → Streaming:
  Output Mode: Advanced
  
  Encoder: 
    macOS: VideoToolbox H.264
    Windows: NVIDIA NVENC H.264 (if available)
    Linux: x264 (CPU) or VAAPI (GPU)
  
  Rate Control: CBR (Constant Bitrate)
  Bitrate: 6000 Kbps (per stream)
  Keyframe Interval: 2 seconds
  Preset: Quality
  Profile: high
  
Settings → Video:
  Base Resolution: 1920x1080
  Output Resolution: 1920x1080
  Downscale Filter: Lanczos
  FPS: 30 (or 60 for high-motion content)
  
Settings → Audio:
  Sample Rate: 48 kHz
  Channels: Stereo
  Audio Bitrate: 160 kbps
```

### Multi-RTMP Plugin Configuration

1. **Open Multi-RTMP Settings**
   ```
   OBS Studio → Tools → Multi-RTMP Output
   ```

2. **Add Primary Stream (Nodväst)**
   ```yaml
   Name: Nodväst_Primary
   RTMP URL: rtmps://a.rtmps.youtube.com/live2
   Stream Key: [From YouTube Studio - Nodväst]
   Enable: ✓
   ```

3. **Add Secondary Streams**
   
   **Nodsyd**:
   ```yaml
   Name: Nodsyd_Secondary
   RTMP URL: rtmps://a.rtmps.youtube.com/live2
   Stream Key: [From YouTube Studio - Nodsyd]
   Enable: ✓ (Day 1 only)
   ```
   
   **Nodöst**:
   ```yaml
   Name: Nodost_Secondary
   RTMP URL: rtmps://a.rtmps.youtube.com/live2
   Stream Key: [From YouTube Studio - Nodöst]
   Enable: ✓ (Day 1 only)
   ```
   
   **Nodmidd**:
   ```yaml
   Name: Nodmidd_Secondary
   RTMP URL: rtmps://a.rtmps.youtube.com/live2
   Stream Key: [From YouTube Studio - Nodmidd]
   Enable: ✓ (Day 1 only)
   ```

4. **Day 2 Configuration**
   - Before Day 2 starts, disable Nodsyd, Nodöst, Nodmidd targets
   - Keep only Nodväst enabled
   - This conserves bandwidth and processing power

### Stream Monitoring in OBS

Create monitoring scenes with:
- **Stats Dock**: CPU/GPU usage, frame drops, network stats
- **Preview Dock**: Preview of current scene
- **Multiview**: View all scenes simultaneously

---

## InfraNodus MCP Workflow

### MCP (Model Context Protocol) Integration

While InfraNodus doesn't have a dedicated MCP server, we can create a workflow using REST API with MCP-like patterns.

### Setting Up Knowledge Graphs

**Pre-Event**:

1. **Create Contexts for Each Node**
   ```bash
   # Using InfraNodus API
   curl -X POST "https://infranodus.com/api/context" \
     -H "Authorization: Bearer ${INFRANODUS_API_KEY}" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "DoL2025_Nodvast",
       "description": "Knowledge graph for Northwest Node"
     }'
   ```

2. **Populate with Event Topics**
   ```json
   {
     "topics": [
       "digital rights",
       "AI ethics",
       "privacy law",
       "legal technology",
       "data protection",
       "contract law",
       "environmental law",
       "human rights"
     ]
   }
   ```

3. **Configure Graph Settings**
   - Visualization style: Force-directed
   - Node size: By degree centrality
   - Edge weight: By co-occurrence frequency
   - Color scheme: By community detection

**During Event**:

1. **Real-Time Updates** (via API)
   ```typescript
   // Add statements from live chat or transcript
   const addStatement = async (text: string, nodeId: string) => {
     const response = await fetch('/api/infranodus/analyze', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         text,
         contextId: `DoL2025_${nodeId}`,
       }),
     });
     return response.json();
   };
   ```

2. **Graph Embedding in Web App**
   ```html
   <iframe 
     src="https://infranodus.com/embed/DoL2025_Nodvast"
     width="800" 
     height="600"
     title="Nodväst Knowledge Graph"
   />
   ```

### Fallback Strategy

If InfraNodus API is unavailable:
1. Use cached/pre-generated graphs (embedded as images)
2. Display static relationship diagrams
3. Provide downloadable graph data (JSON/GraphML)

---

## Event Day Operations

### Pre-Event Checklist (2 Hours Before)

- [ ] **Network**: Verify internet speed (≥50 Mbps upload)
- [ ] **OBS**: Open and test all scenes
- [ ] **Streams**: Start test streams on all channels (unlisted)
- [ ] **Audio**: Test all microphones and audio sources
- [ ] **Video**: Test all cameras and screen captures
- [ ] **Overlays**: Verify text overlays and lower thirds
- [ ] **YouTube**: Switch streams from unlisted to public
- [ ] **Website**: Verify DoL page loads correctly with all streams
- [ ] **InfraNodus**: Test API connection and graph embeds
- [ ] **Backup**: Have backup internet connection ready (mobile hotspot)
- [ ] **Team**: All operators on standby in communication channel

### Day 1 Operations (4 Concurrent Streams)

**09:00 - Opening**
1. Start OBS streaming (all 4 outputs)
2. Verify all YouTube streams are live
3. Check web application displays all 4 streams
4. Monitor chat on all channels

**During Sessions**
- Switch OBS scenes as needed
- Monitor stream health in OBS stats
- Watch for frame drops or network issues
- Respond to technical issues immediately

**16:00 - Closing**
1. Gracefully end all streams
2. Stop OBS recording
3. Export and backup recordings
4. Verify VODs are processing on YouTube

### Day 2 Operations (1 Main Stream)

**Before Starting**
1. **Disable secondary streams in OBS Multi-RTMP**
   - Uncheck Nodsyd, Nodöst, Nodmidd
   - Keep only Nodväst enabled

2. **Update Web Application**
   - Day selector should default to Day 2
   - Verify inactive nodes show CTA to main stream

**During Day 2**
- Single stream is easier to manage
- More bandwidth available for higher quality
- Focus on main stream quality and chat moderation

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Stream Dropping Frames

**Symptoms**: Choppy video, OBS shows >1% dropped frames

**Solutions**:
1. Reduce bitrate (6000 → 4500 Kbps)
2. Lower resolution (1080p → 720p)
3. Check for background applications consuming bandwidth
4. Switch to wired connection if using WiFi
5. Contact ISP if persistent

#### Issue: Audio Out of Sync

**Symptoms**: Audio delay vs video

**Solutions**:
1. Add audio delay in OBS (Settings → Audio → Sync Offset)
2. Restart stream to reset sync
3. Check audio interface drivers

#### Issue: YouTube Stream Not Starting

**Symptoms**: Stream key accepted but stream not live

**Solutions**:
1. Wait 30 seconds - YouTube has ingestion delay
2. Check stream health in YouTube Studio
3. Verify stream key is correct
4. Ensure scheduled event start time has passed
5. Try backup stream key

#### Issue: InfraNodus Graph Not Loading

**Symptoms**: Graph iframe shows error or blank

**Solutions**:
1. Check API key is valid
2. Verify context ID is correct
3. Check rate limit status
4. Fall back to static graph image
5. Contact InfraNodus support

#### Issue: Multi-RTMP Plugin Not Working

**Symptoms**: Only primary stream works, secondaries fail

**Solutions**:
1. Verify plugin is installed correctly
2. Check all stream keys are correct
3. Ensure internet bandwidth is sufficient
4. Try disabling/re-enabling secondary targets
5. Restart OBS

### Emergency Contacts

```yaml
Technical Support:
  OBS: https://obsproject.com/discord
  YouTube Live: https://support.google.com/youtube/answer/2853856
  InfraNodus: support@infranodus.com

Team Contacts:
  Stream Operator: [Your Contact]
  Technical Director: [Your Contact]
  Event Coordinator: [Your Contact]
  Backup Operator: [Your Contact]
```

---

## Post-Event Procedures

### Immediate (Within 1 Hour)

1. **Stop All Streams**
   - End streams gracefully in OBS
   - Verify all YouTube streams have ended
   - Close Multi-RTMP plugin

2. **Backup Recordings**
   ```bash
   # Create backup directory
   mkdir -p ~/DoL2025_Backups/$(date +%Y%m%d)
   
   # Copy OBS recordings
   cp ~/Videos/DoL2025/*.mp4 ~/DoL2025_Backups/$(date +%Y%m%d)/
   ```

3. **Export Knowledge Graphs**
   - Download final graph data from InfraNodus
   - Save as JSON and GraphML formats
   - Archive visualization screenshots

### Within 24 Hours

1. **VOD Processing**
   - Verify all VODs are available on YouTube
   - Add timestamps to video descriptions
   - Create playlist for each day

2. **Analytics Collection**
   - Export viewer statistics from YouTube Analytics
   - Note peak concurrent viewers
   - Document any technical issues

3. **Archive Data**
   - Upload backups to cloud storage
   - Update event documentation
   - Save all stream keys and settings

### Within 1 Week

1. **Post-Event Report**
   - Compile analytics and metrics
   - Document lessons learned
   - Create recommendations for next event

2. **Content Distribution**
   - Share VOD links with participants
   - Export transcripts if available
   - Publish knowledge graphs

3. **Cleanup**
   - Archive or delete unlisted test streams
   - Revoke temporary API keys
   - Update documentation for next year

---

## Additional Resources

### Documentation
- [OBS Studio Documentation](https://obsproject.com/wiki/)
- [YouTube Live Streaming Guide](https://support.google.com/youtube/topic/9257891)
- [InfraNodus API Documentation](https://infranodus.com/api-docs)
- [Multi-RTMP Plugin GitHub](https://github.com/sorayuki/obs-multi-rtmp)

### Training Materials
- [OBS Tutorial Videos](https://www.youtube.com/c/obsproject)
- [YouTube Creator Academy](https://creatoracademy.youtube.com/)
- [InfraNodus Tutorials](https://infranodus.com/tutorials)

### Community Support
- [OBS Discord](https://obsproject.com/discord)
- [r/obs on Reddit](https://reddit.com/r/obs)
- [YouTube Creator Community](https://support.google.com/youtube/community)

---

**Document Version History**

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-16 | Initial comprehensive guide | DoL Tech Team |

**License**: This document is provided as-is for the Dagar om Lagar 2025 event.

---

**End of Operations Guide**
