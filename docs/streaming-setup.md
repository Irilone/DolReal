# Streaming & MCP Deployment Guide

This runbook covers how to broadcast the Dagar om Lagar 2025 conference, operate the four-node stream setup, and connect InfraNodus + OBS MCP tooling to the new site.

## YouTube multi-stream workflow
1. **Enable Live Control Room** – verify the SFMI channel has live streaming unlocked, a 24h activation may be required for new accounts.
2. **Create four persistent stream keys** – in Live Control Room → Manage → Schedule stream → Create new. Name them `Nodväst – DoL 2025`, `Nodsyd – DoL 2025`, `Nodöst – DoL 2025`, `Nodmitt – DoL 2025`, mark each as *Reusable stream key*, and keep them Unlisted until final QC.
3. **Distribute keys securely** – hand stream URLs/keys to each node lead using an encrypted channel; never paste keys into chat or config repos.
4. **Day 1 operations** – start each encoder 10 minutes early, watch the health dashboard, and capture 1440p/1080p recordings for archival.
5. **Day 2 operations** – stop the three satellite events (`End stream` in Control Room) immediately after Day 1. Leave only `Nodväst – DoL 2025` scheduled; the site will automatically dim the other nodes while keeping their thumbnails.

## OBS node configuration
- **Profiles & scenes** – create one OBS *Profile* and *Scene Collection* per node so keys, overlays, and ingest points stay isolated.
- **Encoder baseline** – 1080p/30fps, 6000 kbps CBR video, 160 kbps AAC audio. Enable hardware encoding (NVENC/AME/VT) where available.
- **obs-websocket** – ensure OBS 29+ web-socket server is enabled (Tools → WebSocket Server Settings). Use a long random password and TLS if remote access is required.
- **Automation hooks (MCP)** – expose obs-websocket via a lightweight Node MCP server. Each tool should wrap start/stop streaming, scene changes, and health checks so Claude/Cursor agents can control the show. Deploy locally at the node or on a secured VPS.

## InfraNodus MCP setup
InfraNodus documents its MCP server at <https://infranodus.com/mcp>.

1. **Managed option (Smithery)** – visit <https://smithery.ai/server/@infranodus/mcp-server-infranodus>, authenticate, and add it to Claude Desktop/Web or Cursor. Provide your InfraNodus API key in the connector settings to avoid rate limits.
2. **Self-hosted option** – `git clone https://github.com/infranodus/mcp-server-infranodus`, run `npm install && npm run build`, create a `.env` with `INFRANODUS_API_KEY=...`, then start via `npm run inspect`. Point Claude’s `claude_desktop_config.json` at the generated `dist/index.js`.
3. **Available tools** – `generate_knowledge_graph`, `analyze_existing_graph_by_name`, `generate_content_gaps`, `generate_topical_clusters`, and `generate_research_questions_from_graph` cover transcript → insight workflows.
4. **Operational flow** – feed clean transcripts from each node (OBS recordings or ASR output) into `generate_knowledge_graph`; share derived clusters with programme editors, and publish highlights through the site once reviewed.

## Embedding streams in the site
1. Populate `.env.local` with:
   ```env
   NODVAST_YOUTUBE_ID=xxxx
   NODSYD_YOUTUBE_ID=xxxx
   NODOST_YOUTUBE_ID=xxxx
   NODMIDD_YOUTUBE_ID=xxxx
   ```
2. The `/api/streams` route reads these IDs, enforces the Day 2 “main node only” rule, and drives the carousel plus offline badges.
3. Update translations in `src/i18n/locales/*.json` if copy changes, and adjust schedule data inside `src/components/features/ProgramSchedule.tsx`.
4. Run `npm run dev` locally to validate, then `npm run build` for a production smoke test before deployment.

## Day-of checklist
- Confirm redundancy paths (LTE failover, recording to disk) at each node.
- Keep one operator in Live Control Room to monitor dropouts and reinstate streams fast.
- Archive VODs immediately after each session for later publishing.
- Trigger InfraNodus analysis jobs overnight using the MCP connector to produce day-two briefing decks.

Keep this guide in sync with evolving tooling or streaming policies so every node can execute consistently.
