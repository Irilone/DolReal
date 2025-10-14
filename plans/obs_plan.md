# OBS Studio Multi-RTMP Configuration Plan

## Objective
Configure OBS Studio to simultaneously stream to 4 separate YouTube Live channels using multi-RTMP plugin.

## Software Requirements
- **OBS Studio**: v30.0 or later
- **Plugin**: Multiple RTMP Outputs Plugin by SoraYuki
- **OS**: macOS (Apple Silicon M2 optimized)
- **Encoding**: Hardware (VideoToolbox for Apple Silicon)

## Plugin Installation

### Method 1: Manual Installation
```bash
# Download latest release
curl -L https://github.com/sorayuki/obs-multi-rtmp/releases/latest/download/obs-multi-rtmp-macos-arm64.pkg -o obs-multi-rtmp.pkg

# Install plugin
sudo installer -pkg obs-multi-rtmp.pkg -target /
```

### Method 2: OBS Plugin Manager
1. Open OBS Studio
2. Navigate to **Tools → Plugin Manager**
3. Search for "Multiple RTMP Outputs"
4. Click Install
5. Restart OBS

## Configuration Steps

### 1. Setup Primary Scene
```
OBS Studio → Scenes → Add New Scene: "DoL_2025_Main"
```

Add sources:
- **Video Capture Device**: Main camera
- **Audio Input Capture**: Microphone
- **Text (FreeType 2)**: Event title overlay
- **Browser Source**: Lower-third graphics

### 2. Configure Primary Output (Stream 1 - Nodväst)
```
Settings → Stream
```
- **Service**: YouTube / YouTube - RTMPS
- **Server**: Primary YouTube ingest server
- **Stream Key**: [From YouTube Studio - Nodväst channel]

### 3. Enable Multiple RTMP Outputs Plugin
```
Tools → Multi-RTMP Output
```

### 4. Add Secondary Streams (Nodsyd, Nodöst, Nodmidd)
Click "Add Target" for each stream:

**Stream 2 - Nodsyd**:
- **Name**: Nodsyd
- **RTMP URL**: `rtmps://a.rtmps.youtube.com/live2`
- **Stream Key**: [From YouTube Studio - Nodsyd channel]
- **Enable**: ✓

**Stream 3 - Nodöst**:
- **Name**: Nodöst  
- **RTMP URL**: `rtmps://a.rtmps.youtube.com/live2`
- **Stream Key**: [From YouTube Studio - Nodöst channel]
- **Enable**: ✓

**Stream 4 - Nodmidd**:
- **Name**: Nodmidd
- **RTMP URL**: `rtmps://a.rtmps.youtube.com/live2`
- **Stream Key**: [From YouTube Studio - Nodmidd channel]
- **Enable**: ✓

### 5. Encoding Settings (Apple Silicon Optimized)
```
Settings → Output → Streaming
```
- **Encoder**: Apple VT H264 Hardware Encoder
- **Rate Control**: CBR (Constant Bitrate)
- **Bitrate**: 24000 Kbps (24Mbps per stream)
- **Keyframe Interval**: 2 seconds
- **Profile**: high
- **Level**: auto

**Video Settings**:
```
Settings → Video
```
- **Base Resolution**: 3840x2160 (4K)
- **Output Resolution**: 3840x2160
- **FPS**: 30 (or 60 for high motion)

**Audio Settings**:
```
Settings → Audio
```
- **Sample Rate**: 48 kHz
- **Channels**: Stereo
- **Bitrate**: 160 Kbps (AAC)

### 6. Advanced Settings
```
Settings → Advanced → Video
```
- **Color Format**: NV12
- **Color Space**: 709
- **Color Range**: Partial

```
Settings → Advanced → Network
```
- **Bind to IP**: Automatic
- **Enable Network Optimizations**: ✓
- **Low Latency Mode**: ✓ (if available)

## Testing Procedure

### Pre-Stream Checklist
- [ ] Test each stream independently (enable one at a time)
- [ ] Verify audio sync on all 4 channels
- [ ] Check encoder performance (CPU/GPU usage <70%)
- [ ] Confirm stream keys are correct
- [ ] Test failover to backup ingest server

### Performance Monitoring
Monitor these stats during test:
```
OBS → Stats Panel
```
- **FPS**: Should stay at 30/60 consistently
- **Skipped Frames**: <0.1%
- **Dropped Frames**: <0.5%
- **CPU Usage**: <60%
- **Output Bitrate**: ~96Mbps total (24Mbps × 4)

### Troubleshooting Commands
```bash
# Monitor network traffic
nettop -m tcp -t external

# Check OBS logs
tail -f ~/Library/Application\ Support/obs-studio/logs/obs-studio.log

# Monitor encoding performance
sudo powermetrics --samplers cpu_power,gpu_power -i 1000
```

## Backup Strategy

### Auto-Recording
```
Settings → Output → Recording
```
- **Recording Path**: `/Volumes/External/DoL_2025_Recordings`
- **Recording Format**: Fragmented MP4 (safe for crashes)
- **Recording Quality**: Same as stream
- **Encoder**: Apple VT H264 (separate from streaming)

### Failover Configuration
In Multi-RTMP plugin, add backup servers:
- Primary: `rtmps://a.rtmps.youtube.com/live2`
- Backup: `rtmps://b.rtmps.youtube.com/live2?backup=1`

## Known Issues & Solutions

### Issue: High CPU Usage on M2
**Solution**: 
- Use VideoToolbox hardware encoder (not x264)
- Reduce preview resolution: Settings → Video → Output → Downscale Filter: Bilinear
- Disable preview when not needed

### Issue: Stream Disconnects Randomly
**Causes**:
1. Network congestion → Enable QoS on router
2. Incorrect stream key → Verify in YouTube Studio
3. Keyframe interval mismatch → Set to 2 seconds exactly

### Issue: Audio Desync Across Streams
**Solution**:
- Set fixed audio offset: Advanced Audio Properties → Sync Offset → -50ms
- Use single audio source for all streams
- Ensure sample rate is 48kHz across all devices

### Issue: Multi-RTMP Plugin Not Appearing
**Check**:
```bash
# Verify plugin installation
ls -la ~/Library/Application\ Support/obs-studio/plugins/obs-multi-rtmp/

# Check OBS logs for plugin errors
grep -i "multi-rtmp" ~/Library/Application\ Support/obs-studio/logs/obs-studio.log
```

## Performance Optimization

### For Apple Silicon M2:
```bash
# Set OBS to high-performance mode
defaults write com.obsproject.obs-studio NSSupportsAutomaticGraphicsSwitching -bool NO

# Increase OBS process priority
sudo renice -n -10 -p $(pgrep obs)
```

### Scene Optimization:
- Minimize browser sources (high CPU usage)
- Use image files instead of videos for static graphics
- Group sources and disable when not visible
- Limit filters (color correction, chroma key, etc.)

## Stream URLs Reference
```
YouTube Primary Ingest: rtmps://a.rtmps.youtube.com/live2
YouTube Backup Ingest: rtmps://b.rtmps.youtube.com/live2?backup=1
YouTube Backup Ingest 2: rtmps://c.rtmps.youtube.com/live2?backup=1
```

## Success Criteria
- [ ] All 4 streams start simultaneously within 5 seconds
- [ ] Zero dropped frames in first 10 minutes
- [ ] Audio/video sync within 50ms across all streams
- [ ] CPU usage <60%, GPU usage <70%
- [ ] Automatic local recording backup enabled
- [ ] Stream health "Excellent" in YouTube Studio for all 4 channels
