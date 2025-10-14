# OBS Plan – Multi-RTMP Production Workflow

## Objectives
- Drive four simultaneous YouTube Live outputs (Nodväst, Nodsyd, Nodöst, Nodmidd) with a single operator.
- Maintain 1080p30 quality, redundant audio, and instant failover.
- Provide automation hooks for InfraNodus-triggered scene cues.

## Platform & Versions
- OBS Studio **30.2.x** (64‑bit).  
- Multi-RTMP Plugin **0.4.0** (obs-multi-rtmp).  
- OBS WebSocket **5.3+** (bundled).  
- OS: Windows 11 Pro (primary) with NVIDIA RTX 4070; macOS Sonoma backup rig.

## Scene Collection Structure
```
DoL-2025
 ├─ Intro (countdown + lower thirds)
 ├─ Live-Talk (PPT + camera)
 ├─ Panel (quad view)
 ├─ Break (looped ambience)
 ├─ Emergency-Slate (technical difficulties)
 └─ InfraNodus-Embed (browser source)
```
- Each scene includes `StreamStatus` text source bound to OBS WebSocket script to display destination status.

## Input Configuration
- Cameras: SDI via capture cards; set buffering off, color range full.  
- Slides: NDI capture; enable frame rate match.  
- Audio:  
  - Primary: XLR mixer → USB interface (48 kHz).  
  - Backup: ambient mic with -6 dB safety track.  
  - Apply limiter at -1 dB; add 100 ms sync offset for camera ingest.

## Multi-RTMP Outputs
1. Install plugin; confirm new dock **Multiple Output**.  
2. Configure four targets:  
   | Target | Server | Stream Key Env | Notes |
   |--------|--------|----------------|-------|
   | Nodväst | `rtmps://a.rtmp.youtube.com/live2` | `${NODVAST_STREAM_KEY}` | Active both days |
   | Nodsyd  | same | `${NODSYD_STREAM_KEY}` | Day 1 only |
   | Nodöst  | same | `${NODOST_STREAM_KEY}` | Day 1 only |
   | Nodmidd | same | `${NODMIDD_STREAM_KEY}` | Day 1 only |
3. Output settings per target:  
   - Encoder: NVENC H.264 (preset `p5: Quality`).  
   - Bitrate: **5.5 Mbps**, Keyframe 2 s, B-frames 2.  
   - Audio: 160 kbps AAC.  
   - Enable `Restart connection on reconnect`.  
   - Latenz mode: Low-latency.  
4. `Auto Start` unchecked to satisfy user-gesture autoplay policy; operator triggers manually.

## Day 2 Disable Logic
- Create Scene Collection profile `Day2`.  
- For targets Nodsyd/Nodöst/Nodmidd set `Status = Disabled` (plugin option).  
- Add slate scene with text “Ej aktiv idag” driven by `currentDay` env flag.  
- Provide macro in **Advanced Scene Switcher**: reads `DAY=2` from `env.yaml`, automatically fades to slate for disabled outputs.

## Automation Scripts
- `obs-scripts/stream_guard.py`: uses WebSocket to ensure only one active encoder attempts to start; stops secondary outputs if primary fails handshake.  
- `obs-scripts/infranodus_cue.py`: listens to MCP events (port 4455) to trigger `InfraNodus-Embed` browser source refresh.

## Recording & Backups
- Local recording: MKV, 1080p30, 25 Mbps. Auto-remux to MP4 post-session.  
- Backup: OBS on macOS logs into same scene collection via cloud-synced profile (use `obs-export`). Keep plugin config in `~/Library/Application Support/obs-studio/basic/profiles/DoL-2025`.

## Monitoring
- Dock layout to include `Stats`, `Multiple Output`, `Scene Stats`, `WebSocket`.  
- Install `obs-websocket-logger` for external Grafana dashboard (logs connection states).  
- Operator checklist: verify green indicator for all four outputs before go-live, watch dropped frames (<0.5% threshold).

## Performance Optimisation
- Set Power mode to `Prefer maximum performance` (NVIDIA Control Panel).  
- Disable preview scaling; use Studio Mode.  
- Run `OBS Studio → Settings → Advanced → Process Priority = Above Normal`.  
- For CPU fallback (x264), use preset `veryfast`, bitrate 4.5 Mbps.

## Testing Matrix
- T–14 d: Full rehearsal with remote endpoints; record 30 min soak test.  
- T–2 d: Verify stream keys unchanged; update `.env`.  
- Daily: 5-minute black frame test stream on unlisted events to confirm ingest health.

## Incident Response
- On RTMP disconnect: plugin auto-retries; operator triggers `Retry` if >10 s offline.  
- On CPU >85%: disable local recording, reduce bitrate to 4 Mbps via Quick Actions.  
- On audio desync: call macro `Resync` (script resets audio offset).  
- Document incidents in shared log (`docs/logs/obs-incidents.md`).
