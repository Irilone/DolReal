# Node Operator Quickstart Guide

## Quick Setup for Event Day

This guide is for node operators who need to quickly set up their streaming station for Dagar om Lagar 2025.

## Prerequisites

- Computer with OBS Studio 30+ installed
- Stable internet connection (minimum 10 Mbps upload per stream)
- YouTube channel with Live Streaming enabled
- Stream key provided by DoL coordinator

## 5-Minute Setup

### Step 1: Configure OBS Settings

1. Open OBS Studio
2. Go to **Settings → Output**
   - Output Mode: Advanced
   - Encoder: VideoToolbox (Mac) or NVENC (Windows/Linux)
   - Rate Control: CBR
   - Bitrate: 3000 Kbps
   - Keyframe Interval: 2
   - Preset: Quality

3. Go to **Settings → Video**
   - Base Resolution: 1920x1080
   - Output Resolution: 1280x720
   - FPS: 30

4. Go to **Settings → Audio**
   - Sample Rate: 48kHz
   - Channels: Stereo

### Step 2: Add Stream Output

1. Go to **Settings → Stream**
2. Service: YouTube - RTMPS
3. Server: Primary YouTube ingest server
4. Stream Key: [Paste your stream key]

### Step 3: Set Up Scene

1. Click **+ in Scenes panel**
2. Name it "Main Stream"
3. Add Sources:
   - Video Capture Device (camera)
   - Audio Input Capture (microphone)
   - Text (optional: node name overlay)

### Step 4: Test Connection

1. Click **Settings → Output → Recording**
2. Enable local recording as backup
3. Click **Start Streaming**
4. Check YouTube Live Dashboard

## Node Assignments

- **Nodväst**: Active on Day 1 and Day 2
- **Nodsyd**: Active on Day 1 only
- **Nodöst**: Active on Day 1 only
- **Nodmidd**: Active on Day 1 only

## Event Day Protocol

### 30 Minutes Before

1. Launch OBS Studio
2. Test camera and microphone
3. Start local recording
4. Click "Start Streaming"
5. Verify stream is live on YouTube

### During Event

1. Monitor stream health indicator
2. Keep OBS window visible
3. Watch for dropped frames counter
4. DO NOT close OBS or change settings

### After Event

1. Click "Stop Streaming"
2. Stop local recording
3. Upload recording to backup storage
4. Report any technical issues to coordinator

## Troubleshooting

### Stream Won't Connect

- Check internet connection
- Verify stream key is correct
- Try backup RTMP server: `rtmp://b.rtmp.youtube.com/live2/`

### High CPU Usage

- Switch encoder to hardware (VideoToolbox/NVENC)
- Reduce output resolution to 480p
- Lower FPS to 24

### Audio Issues

- Check microphone is not muted in OBS
- Verify audio input device is correct
- Test audio levels before streaming

### Dropped Frames

- Reduce bitrate to 2000 Kbps
- Check for bandwidth-heavy applications
- Contact coordinator for QoS adjustment

## Support Contacts

- Technical Coordinator: [contact info]
- DoL Website: [URL]
- Emergency Hotline: [phone number]

## Quick Reference

| Setting | Value |
|---------|-------|
| Resolution | 1280x720 |
| FPS | 30 |
| Bitrate | 3000 Kbps |
| Encoder | Hardware |
| Keyframe | 2s |
| Audio | 48kHz Stereo |
