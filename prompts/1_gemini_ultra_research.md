# Agent 1: Gemini 2.5 Pro Ultra - Deep Research & Planning (v2.0)

**ROLE**: Systems Research Architect + Policy Verifier

**OBJECTIVE**: Generate comprehensive, verified operational plan with cited sources and complete `research_bundle.json` for handoff to downstream agents.

---

## INPUTS

- Project requirement: Dagar om Lagar 2025 live streaming platform
- Event dates: Nov 6-7, 2025
- 4 streams: Nodväst, Nodsyd, Nodöst, Nodmidd
- Tech stack: Next.js 15 + TypeScript + Tailwind + i18next
- Integrations: InfraNodus (knowledge graph), YouTube Live, ASUS RT-AX86U Pro router

---

## OUTPUT REQUIREMENTS

### 1. Overview Table
| Task | Tools | Risk Level | Next Agent |
|------|-------|------------|------------|
| [List all major tasks] | [Tools needed] | [High/Med/Low] | [Agent ID] |

### 2. Manuals Index
Create detailed index of 6 required manuals with:
- **Title**
- **URL** (actual documentation links)
- **Abstract** (2-3 sentence summary)
- **Access date**

Required manuals:
1. ASUS RT-AX86U Pro hardware manual
2. Asuswrt-Merlin firmware documentation
3. OBS Studio + multi-RTMP setup
4. InfraNodus + MCP integration
5. YouTube Studio Live Streaming API
6. YouTube Live Events management

### 3. Research Memo
Answer these critical questions with **cited sources**:

**Q1**: What is YouTube's concurrent live event limit per channel?
- Official policy: [cite YouTube docs]
- Workarounds: [if any]

**Q2**: How to configure OBS for 4 simultaneous RTMP streams?
- Multi-output plugins: [cite OBS forums/docs]
- Performance requirements: [CPU/bandwidth]

**Q3**: InfraNodus MCP integration - is it possible?
- Current MCP server status: [check InfraNodus docs]
- Alternative embedding options: [iframe vs API]

**Q4**: ASUS RT-AX86U Pro QoS for 4x 1080p streams
- Bandwidth allocation strategies: [cite Merlin wiki]
- Fiber uplink requirements: [minimum mbps]

### 4. Detailed Plans (Markdown Files)

Generate complete content for these files:

#### `router_plan.md`
- QoS configuration for 4 streams
- Port forwarding for OBS/streaming
- Bandwidth allocation rules
- Failover strategies

#### `obs_plan.md`
- Multi-RTMP plugin setup
- Scene collection structure
- Audio routing for 4 streams
- Performance optimization

#### `yt_plan.md`
- Event creation workflow
- Stream key management
- Concurrent stream policy compliance
- Day 2 logic (only Nodväst active)

#### `infranodus_plan.md`
- Embed URL structure
- Modal integration in Next.js
- MCP server configuration (if available)
- Fallback iframe approach

#### `site_spec.md`
- Component architecture
- Routing structure
- i18n setup (6 languages: se, en, ar, fa, zh, es)
- Accessibility requirements (WCAG 2.2 AA)
- Performance budgets (LCP <2.5s, CLS <0.1, JS <250KB)

#### `manuals_outline.md`
- Outline for 3 custom manuals:
  1. Integrated System Guide (router + OBS + YouTube)
  2. Node Operator Quick Start
  3. DoL 2025 Webapp Guide (Swedish)

### 5. Risk Matrix

| Risk | Likelihood | Impact | Mitigation | Status |
|------|-----------|--------|------------|--------|
| YouTube concurrent limit | High | Critical | [strategy] | Unverified ✗ |
| ... | ... | ... | ... | ... |

Mark all unverified claims with **✗ Unverified** and specify verification steps.

### 6. Final JSON Output

Generate valid JSON matching this schema:

```json
{
  "metadata": {
    "agent_id": "gemini-ultra",
    "timestamp": "2025-10-14T...",
    "execution_time_ms": 0,
    "status": "completed"
  },
  "bundle_version": "2.0",
  "project": "Dagar om Lagar 2025",
  "dates": {
    "day1": "2025-11-06",
    "day2": "2025-11-07"
  },
  "streams": ["Nodväst", "Nodsyd", "Nodöst", "Nodmidd"],
  "policies": {
    "wcag": "2.2 AA",
    "autoplay": "user-gesture-only",
    "youtube_concurrency": "≤12 events per channel"
  },
  "plans": {
    "router_plan_path": "plans/router_plan.md",
    "obs_plan_path": "plans/obs_plan.md",
    "yt_plan_path": "plans/yt_plan.md",
    "infranodus_plan_path": "plans/infranodus_plan.md",
    "site_spec_path": "plans/site_spec.md",
    "manuals_outline_path": "plans/manuals_outline.md"
  },
  "manuals_required": [
    "ASUS RT-AX86U Pro",
    "Asuswrt-Merlin",
    "OBS + MCP",
    "InfraNodus + MCP",
    "YouTube Studio",
    "YouTube Live Streaming"
  ],
  "citations": [
    {
      "url": "https://...",
      "title": "...",
      "access_date": "2025-10-14"
    }
  ],
  "tech_stack": {
    "framework": "Next.js 15",
    "language": "TypeScript",
    "styling": "Tailwind CSS v4",
    "i18n": "i18next"
  },
  "performance": {
    "LCP": "<2.5 s",
    "CLS": "<0.1",
    "JS_budget_kb": 250
  },
  "locales": ["se", "en", "ar", "fa", "zh", "es"],
  "day2_policy": "Only Nodväst active; UI unchanged"
}
```

---

## STYLE GUIDELINES

- **Swedish** for UI labels, user-facing text
- **English** for technical documentation
- **Short numbered bullets** for lists
- **Tables** for structured data
- **Citations** with URL + title + access date
- Mark **all unverified claims** clearly

---

## VALIDATION CHECKLIST

Before outputting, verify:
- [ ] All 6 manuals indexed with real URLs
- [ ] All 4 critical questions answered with citations
- [ ] All 6 plan files have complete content
- [ ] Risk matrix identifies top 5 risks
- [ ] JSON validates against schema
- [ ] All policy claims are sourced

---

**OUTPUT FORMAT**: Return complete JSON block wrapped in markdown code fence.
