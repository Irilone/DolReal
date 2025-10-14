# YouTube Plan – Live Events & Compliance

## Objectives
- Operate four scheduled YouTube Live events (Nodväst, Nodsyd, Nodöst, Nodmidd) on Nov 6 2025, with Nodväst only on Nov 7.  
- Maintain concurrency within platform limits, secure stream keys, and document operator tasks.

## Channel & Access
- All events hosted under `youtube.com/@DagarOmLagar`.  
- Grant “Manager” role to production leads via **YouTube Studio → Settings → Permissions**.  
- Require 2FA-enabled Google Workspace accounts. Store recovery codes offline.

## Event Creation Workflow (T–10 d)
1. In **YouTube Studio → Create → Go Live** choose *Schedule stream*.
2. For each stream create template:
   - Title: `DoL 2025 – <Node> – Dag 1` (or `Dag 2` for Nodväst).  
   - Description includes agenda and multi-language call-to-action.  
   - Category: Education; Visibility: Unlisted until T–1 h, then Public.  
   - Monetisation: Off; Age restriction: No.  
   - DVR: On; Ultra-low latency.  
3. Upload thumbnail (1920×1080) per node.  
4. Assign `custom ingestion` keys (persistent). Note keys in encrypted vault (1Password shared vault `DoL-2025`).

## Stream Key Management
- Environment variables stored in `.env.production`:
  ```
  NODVAST_STREAM_KEY=...
  NODSYD_STREAM_KEY=...
  NODOST_STREAM_KEY=...
  NODMIDD_STREAM_KEY=...
  YOUTUBE_CHANNEL_ID=UCxxxxxx
  ```
- Provide sanitized copy (`.env.example`) with placeholders.
- Rotate keys after Day 1 via `Reset key` → update OBS Multi-RTMP config (Nodväst only).

## Concurrency & Policy
- Official limit: ≤12 simultaneous live events/channel (YouTube Help, accessed 2025‑10‑14).  
- Our usage: max 4 (Day 1), 1 (Day 2). Document in `risk register`.  
- Keep additional drafts but ensure only required events are “Go Live” to avoid accidental concurrency.

## Day 2 Logic
- `currentDay` environment flag consumed by frontend to disable nodes 2–4.  
- Event schedule:  
  | Day | Active Streams | Action |
  |-----|----------------|--------|
  | Nov 6 | All four | Publish to Public at 08:30 CET |
  | Nov 7 | Nodväst only | Unpublish Day 1 VODs; set others to Private |
- Expose API endpoint `/api/streams?day=2` returning `active: false` for non-Nodväst entries. Frontend displays “Ej aktiv idag”.

## Testing & Dry Runs
- T–7 d: Conduct private test on duplicate events; confirm ingest handshake within 10 s.  
- T–1 d: 10-minute unlisted rehearsal per stream; verify live chat, captions (auto).  
- Draft `streams-checklist.md` for operator sign-off.

## Compliance & Metadata
- Provide Swedish + English descriptions. Include hashtags `#DagarOmLagar` `#DoL2025`.  
- Insert chapter markers once schedule confirmed.  
- Enable closed captions auto-generated; plan manual upload of corrected captions within 48 h.

## Monitoring During Live
- Use **YouTube Live Control Room** per stream (open in separate browser profiles).  
- Checklist every 15 min: stream health, average latency, dropped frames.  
- Notify router ops if `Excellent` drops to `Good` for >2 intervals.  
- Maintain log sheet `docs/logs/yt-operations.csv`.

## Post-Event
- Trim VOD start/end, add final thumbnails, set to Public.  
- Download VOD for archival to S3 bucket `dol-2025-archive`.  
- Export analytics (views, watch time) T+7 d for reporting.
