# Dagar om Lagar 2025 – Streaming & MCP Infrastructure Guide

## 1. YouTube Multi-Stream Strategy

### Can we run four simultaneous live streams on one YouTube channel?

Yes. YouTube Live Control Room allows multiple concurrent events under a single channel as long as each event uses a unique stream key. Practical limits are set by your encoder bandwidth and YouTube's standard streaming policies (12 hour maximum per event, policy compliance, no reuse of the same stream key in parallel).

### Pre-flight checklist

1. **Verify channel status** – The YouTube channel must be verified and Live Streaming enabled (https://studio.youtube.com > Settings > Channel > Feature eligibility).
2. **Enable 1080p streaming** – In Live Control Room, confirm "Allow 60 fps" and "Enable DVR" according to production requirements.
3. **Create four events** – One per node (Nodväst, Nodsyd, Nodöst, Nodmidd). Configure:
   - Title: `Nodväst – DoL 2025`, etc.
   - Privacy: Unlisted during testing, switch to Public for the event day.
   - Schedule: Day 1 for all nodes, Day 2 only for Nodväst (leave the others unpublished on day 2).
4. **Generate dedicated stream keys** – In the "Stream Settings" tab choose _Create new stream key_ for each node. Name them `DoL25_Nodvast`, `DoL25_Nodsyd`, etc. Download the backup RTMP URLs and keys for redundancy.
5. **Assign thumbnails & metadata** – Upload node-specific artwork, set language to Swedish, add location tags, and include accessibility information (captions, Swedish description + English translation).

### Launch day workflow

1. Open YouTube Live Control Room in four browser tabs, one per event.
2. Confirm ingest health stays green (2.5–4 Mbps per 720p/1080p stream).
3. Monitor the "Stream preview" before clicking **Go live**. Nodväst remains live on day 2; end the other events after day 1.
4. Capture the `Video ID` for each stream – this becomes the value for `NEXT_PUBLIC_NODVAST_YOUTUBE_ID`, etc., and the embed URL.

## 2. OBS Studio & Multi-RTMP Configuration

### Base encoder profile

| Setting           | Value                             |
| ----------------- | --------------------------------- |
| Output Mode       | Advanced                          |
| Encoder           | Hardware (NVENC/VideoToolbox)     |
| Resolution        | 1920×1080 canvas → 1280×720 out   |
| Framerate         | 30 fps (or 25 fps PAL)            |
| Bitrate           | 3,500 kbps video / 128 kbps audio |
| Keyframe interval | 2 seconds                         |
| Audio sample rate | 48 kHz, Stereo                    |

### Multi-output routing

1. Install **Multiple RTMP Outputs** plugin (https://github.com/sorayuki/obs-multi-rtmp/releases) and restart OBS.
2. Configure four outputs: `Nodvast`, `Nodsyd`, `Nodost`, `Nodmidd`.
3. For each output set:
   - Server: `rtmp://a.rtmp.youtube.com/live2`
   - Stream Key: the per-node key created in Live Control Room.
   - Quality: inherit from main output (or override bitrate per node if uplink is constrained).
4. Enable **Start with OBS** to reduce manual clicks on the event day.
5. Use scene collections per node if you need localized lower-thirds. Otherwise, route one scene to all outputs.

### OBS MCP server integration

1. Install the OBS MCP server (https://github.com/obsproject/obs-mcp) or use a hosted instance.
2. Add the server to your MCP-compatible assistant (Claude Desktop, Cursor, etc.) with:
   ```json
   {
     "command": "npx",
     "args": ["-y", "@smithery/cli@1.2.3", "run", "@obsproject/mcp-obs"]
   }
   ```
3. Grant the server WebSocket access to OBS (`Tools > WebSocket Server Settings`). Use TLS + strong password.
4. Script automations to:
   - Start/stop individual node streams.
   - Trigger scene transitions when the website swaps the active node.
   - Report CPU/network telemetry back to the monitoring dashboard.

## 3. InfraNodus MCP Setup

### Remote (Smithery) deployment

1. Visit https://server.smithery.ai/@infranodus/mcp-server-infranodus.
2. Select the client (Claude, Cursor, etc.) and authorize the installation.
3. Provide the InfraNodus API key when prompted. You obtain it at https://infranodus.com > Account > API.
4. After installation, the `infranodus` toolchain exposes:
   - `create_graph_from_text`
   - `get_graph_insights`
   - `compare_graphs`
   - `summarize_components`

### Local deployment

```bash
# Clone and install
git clone https://github.com/infranodus/mcp-server-infranodus.git
cd mcp-server-infranodus
npm install

# Configure credentials
cp .env.example .env
nano .env  # add INFRANODUS_API_KEY

# Build & test
npm run build
npm run inspect
```

Add the compiled server to your MCP client configuration:

```json
"mcpServers": {
  "infranodus": {
    "command": "node",
    "args": ["/path/to/mcp-server-infranodus/dist/index.js"],
    "env": { "INFRANODUS_API_KEY": "***" }
  }
}
```

### Conference workflow

1. Pipe OBS session transcripts (via Whisper or Teams captions) into InfraNodus using the MCP tool.
2. Generate graphs per session and per node; export graph IDs for embedding (`https://infranodus.com/embed/{graphId}`) used in the web UI modal.
3. Tag each graph with node + day metadata for easy retrieval on day 2 summaries.

## 4. Website Integration & Embedding

### Stream ingestion

- Use the API route `/api/streams?day=1` (already provided in the Next.js app) to pull the active YouTube IDs. Day 2 returns Nodväst as active and flags the other nodes as inactive.
- In the carousel, render the active video with `https://www.youtube.com/embed/{videoId}?rel=0&enablejsapi=1` and show thumbnail placeholders (`https://img.youtube.com/vi/{videoId}/hqdefault.jpg`) for inactive streams to avoid multi-playback.

### Accessibility & localization

- Provide `title` and `aria-label` attributes on every iframe/button.
- Use the i18n resources (`se`, `en`, `ar`, `fa`, `zh`, `es`, `it`) to localize headings, CTA buttons, and node descriptions.
- Respect prefers-reduced-motion (already implemented for starfield animations).

### Day-two deactivation logic

- Keep the carousel UI unchanged; rely on the API response and program metadata to mark streams as inactive (`active === false`).
- Display the helper message "Denna nod sänder inte live dag 2" and route viewers toward Nodväst.

## 5. MCP Orchestration for Streaming Operations

| MCP Server          | Purpose                                           | Key Tasks                                                          |
| ------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| `obs`               | Control OBS scenes/outputs                        | Start/stop per-node RTMP outputs, monitor bitrate, trigger backups |
| `infranodus`        | Generate/serve knowledge graphs                   | Build graphs from transcripts, surface insights on website         |
| `youtube` (planned) | Interact with YouTube Data API v3 via MCP scripts | Update stream titles/thumbnails, fetch concurrent viewers          |

Recommended automation:

1. **Pre-event** – Run an MCP macro to fetch YouTube stream statuses, confirm OBS outputs, and rebuild InfraNodus graphs for teaser content.
2. **During event** – Schedule 15-minute polling loops to log viewer counts and stream health metrics into the monitoring dashboard.
3. **Post-event** – Trigger InfraNodus comparisons between day 1 and day 2 transcripts; export summaries for the archive page.

## 6. Operational Timeline

| T-minus            | Action                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| 14 days            | Finalize YouTube channel branding, upload standby slates, rehearse OBS multi-output.                                                  |
| 7 days             | Dry run with all four nodes streaming to private events; verify website carousel switching, knowledge graph modals, and localization. |
| 1 day              | Freeze environment variables, pre-warm InfraNodus graphs, and validate MCP connections.                                               |
| Event day (06 Nov) | Go live with all four nodes. Monitor OBS/YouTube dashboards, capture transcripts for InfraNodus.                                      |
| Event day (07 Nov) | Disable secondary node outputs in OBS, keep Nodväst streaming, surface "inactive" messaging on site.                                  |
| +1 day             | End streams, download recordings, export graphs and analytics to archive.                                                             |

---

**Support contacts**: Document the OBS controller on-call engineer, the InfraNodus account owner, and the web operations lead so that MCP automations have clear escalation paths.
