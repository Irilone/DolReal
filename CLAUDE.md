# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DolReal** - "Dagar om Lagar 2025" event website. A production-ready Next.js 15 streaming platform built using a **4-agent coordinated orchestration system** with file-based async communication.

### Event Details
- **Name**: Dagar om Lagar 2025
- **Dates**: November 6-7, 2025
- **Streams**: 4 simultaneous (Nodväst, Nodsyd, Nodöst, Nodmidd)
- **Day 2 Policy**: Only Nodväst active; UI unchanged

### Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + dark mode
- **i18n**: react-i18next (se, en, ar, fa, zh, es - 6 languages)
- **Package Manager**: Bun (7-100x faster than npm)

### Key Integrations
- **YouTube Live**: 4 concurrent streams via IFrame API
- **InfraNodus**: Knowledge graph (MCP + fallback iframe)
- **ASUS RT-AX86U Pro**: QoS via Asuswrt-Merlin
- **OBS Studio**: Multi-RTMP plugin for streaming

### Performance Targets
- **LCP** (Largest Contentful Paint): <2.5s
- **CLS** (Cumulative Layout Shift): <0.1
- **JS Bundle Size**: <250KB
- **Test Coverage**: >80%
- **WCAG Compliance**: 2.2 AA

---

## Multi-Agent Orchestration Architecture (v2.0)

This project uses **file-based async communication** between 4 specialized AI agents to build the complete platform in 50-70 minutes.

### Agent Pipeline

```
1. Gemini 2.5 Pro Ultra (Research & Planning)
   ↓ writes: research_bundle.json + 6 plan files
   ↓ runtime: ~10-15 minutes

2. GPT-5 Codex (System Architecture)
   ↓ writes: architecture.json + scaffolding
   ↓ runtime: ~5-10 minutes
   ↓ splits work for parallel execution
   ├─→ 3a. Claude Sonnet 4.5 #1 (Frontend)
   │   ↓ writes: frontend_output.json
   │   ↓ runtime: ~15-20 minutes
   │
   └─→ 3b. Claude Sonnet 4.5 #2 (Backend)
       ↓ writes: backend_output.json
       ↓ runtime: ~15-20 minutes (parallel with 3a)
       ↓
       ↓ both complete
       ↓
4. Gemini 2.5 Pro CLI (Final Integration)
   ↓ writes: final_build.json + release zip
   ↓ runtime: ~5-10 minutes

Total: 50-70 minutes (Claudes save 15-20 min via parallelization)
```

### Agent Responsibilities

| Agent | Model | Role | Inputs | Outputs |
|-------|-------|------|--------|---------|
| **1. Gemini Ultra** | Gemini 2.5 Pro Ultra | Deep Research + Planning | Requirements | `1_gemini_ultra_research.json` + 6 `.md` plans |
| **2. GPT-5 Codex** | GPT-5 Codex (High Reasoning) | System Architecture | Research bundle | `2_gpt5_codex_architecture.json` + scaffolding |
| **3a. Claude Frontend** | Claude Sonnet 4.5 | UI Components | Architecture + research | `3a_claude_frontend_output.json` (components, i18n, styles) |
| **3b. Claude Backend** | Claude Sonnet 4.5 | Services + Docs | Architecture + research | `3b_claude_backend_output.json` (APIs, integrations, docs) |
| **4. Gemini CLI** | Gemini 2.5 Pro CLI | Final Integration | Both Claude outputs | `4_gemini_cli_final.json` + `releases/*.zip` |

### File-Based Communication

All agents communicate via JSON artifacts in `artifacts/`:

```json
{
  "metadata": {
    "agent_id": "gemini-ultra",
    "timestamp": "2025-10-14T...",
    "execution_time_ms": 12450,
    "status": "completed",
    "next_agent": "gpt5-codex"
  },
  "bundle_version": "2.0",
  "project": "Dagar om Lagar 2025",
  // ... agent-specific outputs
}
```

**Schema**: `schemas/agent-handoff-schema.json` defines all interfaces.

### Artifacts Generated

```
artifacts/
├── 1_gemini_ultra_research.json      # Research bundle
├── 2_gpt5_codex_architecture.json    # System architecture
├── 3a_claude_frontend_output.json    # Frontend code
├── 3b_claude_backend_output.json     # Backend code + docs
└── 4_gemini_cli_final.json           # Final build report

plans/
├── router_plan.md                    # ASUS router QoS config
├── obs_plan.md                       # OBS multi-RTMP setup
├── yt_plan.md                        # YouTube event management
├── infranodus_plan.md                # Knowledge graph integration
├── site_spec.md                      # Web app specification
└── manuals_outline.md                # Documentation outline

releases/
└── dol-2025-v2.0.0.zip              # Production-ready build
```

---

## Development Commands

### Orchestration Pipeline

```bash
# Run full pipeline (all 4 agents sequentially + parallel Claudes)
make all
# or
bun run orchestrate

# Check agent completion status
make status

# Clean artifacts
make clean
```

### Individual Agent Execution

```bash
make gemini-ultra     # Agent 1: Research (10-15 min)
make gpt5-codex       # Agent 2: Architecture (5-10 min)
make claude-frontend  # Agent 3a: Frontend (15-20 min)
make claude-backend   # Agent 3b: Backend (15-20 min)
make claude-parallel  # Both Claudes in parallel (15-20 min)
make gemini-cli       # Agent 4: Integration (5-10 min)
```

### Package Management (Bun)

```bash
# Install dependencies
bun install

# Add package
bun add <package>

# Remove package
bun remove <package>

# Run scripts
bun run <script>
bun dev               # Start dev server
bun run build         # Production build
bun test              # Run tests
bun run lint          # Lint code
```

### Linting and Formatting

```bash
# Run Trunk linter
trunk check
trunk check --all

# Auto-fix issues
trunk fmt

# Enabled linters: markdownlint, prettier, trufflehog, git-diff-check
```

### Environment Setup

```bash
# Required API keys
export GEMINI_API_KEY="your-gemini-key"
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"

# Application keys (for final build)
export NEXT_PUBLIC_YOUTUBE_API_KEY="your-youtube-key"
export INFRANODUS_API_KEY="your-infranodus-key"
export NODVAST_YOUTUBE_ID="stream-id-1"
export NODSYD_YOUTUBE_ID="stream-id-2"
export NODOST_YOUTUBE_ID="stream-id-3"
export NODMIDD_YOUTUBE_ID="stream-id-4"
```

---

## Project Structure

```
/
├── artifacts/              # Agent communication artifacts (JSON)
├── plans/                  # Research plans (Markdown)
├── releases/               # Production builds (ZIP)
├── prompts/                # Agent prompt files
│   ├── 1_gemini_ultra_research.md
│   ├── 2_gpt5_codex_architecture.md
│   ├── 3a_claude_frontend.md
│   ├── 3b_claude_backend.md
│   └── 4_gemini_cli_final.md
├── schemas/                # JSON schemas
│   └── agent-handoff-schema.json
├── scripts/                # Orchestration scripts
│   ├── gem.ts             # Gemini API wrapper
│   ├── anthropic.ts       # Claude API wrapper
│   └── openai.ts          # GPT-5 Codex wrapper
├── src/                    # Next.js application source
│   ├── app/               # App Router pages + API routes
│   ├── components/        # React components
│   ├── lib/               # Utilities (YouTube, InfraNodus, MCP)
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   └── i18n/              # Internationalization
│       └── locales/       # se, en, ar, fa, zh, es
├── docs/                   # Documentation
│   └── manuals/           # 3 comprehensive manuals
├── public/                 # Static assets
├── october/                # Legacy prototypes (deprecated)
├── .trunk/                 # Trunk linter config
├── Makefile                # Orchestration commands
├── package.json            # Dependencies + scripts
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind CSS config
├── CLAUDE.md               # This file
├── AGENTS.md               # Repository guidelines
├── ASUSWRT-MERLIN-DOCS.md  # Router documentation
└── README.md               # See october/README.md for v2.0 details
```

---

## Core Architecture

### Component Hierarchy

```typescript
// Frontend (Agent 3a responsibility)
src/components/
├── features/
│   ├── Header.tsx           // Logo, nav, language switcher, dark mode
│   ├── StreamCarousel.tsx   // 4 YouTube streams, day 2 logic
│   ├── GraphNavModal.tsx    // InfraNodus embed modal
│   ├── ProgramSection.tsx   // Event schedule
│   └── LanguageSwitcher.tsx // 6-language dropdown
├── ui/                       // shadcn/ui base components
└── shared/                   // Reusable components
```

### API Routes

```typescript
// Backend (Agent 3b responsibility)
src/app/api/
├── streams/
│   └── route.ts             // GET /api/streams?day=1|2
├── graph/
│   └── route.ts             // GET /api/graph?nodeId=string
└── health/
    └── route.ts             // GET /api/health
```

### Third-Party Integrations

```typescript
// Backend (Agent 3b responsibility)
src/lib/
├── youtube/
│   └── client.ts            // YouTube Data API v3 client
├── infranodus/
│   └── client.ts            // InfraNodus MCP + fallback
└── mcp/
    └── client.ts            // Generic MCP client
```

---

## Key Features

### Internationalization (i18n)

- **6 languages**: Swedish, English, Arabic, Farsi, Chinese, Spanish
- **RTL support**: Automatic for Arabic/Farsi
- **Implementation**: react-i18next with JSON translation files
- **Routing**: `/[locale]/` pattern in Next.js App Router

### Accessibility (WCAG 2.2 AA)

- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Focus management (visible focus indicators)
- Color contrast ratios ≥4.5:1 (text), ≥3:1 (UI)
- Screen reader support
- Semantic HTML landmarks

### YouTube Integration

- **IFrame API**: Full player control
- **Policy**: Only one active player at a time
- **No autoplay**: User gesture required (WCAG + policy compliance)
- **Day 2 logic**: Disable 3 streams, show "Ej aktiv idag"
- **Keyboard controls**: Space (play/pause), Arrows (switch streams)

### InfraNodus Integration

- **Primary**: MCP server (if available)
- **Fallback**: iframe embed
- **Modal display**: Focus trap, Escape to close
- **4 graph nodes**: Nodväst, Nodsyd, Nodöst, Nodmidd

### Router Configuration (ASUS RT-AX86U Pro)

- **Firmware**: Asuswrt-Merlin
- **QoS**: Prioritize RTMP (port 1935) traffic
- **Bandwidth**: Reserve 80 Mbps upload for streaming
- **Failover**: Automatic WAN failover if configured
- **Docs**: See `ASUSWRT-MERLIN-DOCS.md`

---

## Development Workflow

### 1. Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd DolReal

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Set environment variables
cp .env.example .env
# Edit .env with your API keys
```

### 2. Run Orchestration

```bash
# Full pipeline (50-70 minutes)
make all

# Monitor progress
make status
```

### 3. Development

```bash
# Start dev server (after orchestration completes)
bun dev

# Open http://localhost:3000
```

### 4. Testing

```bash
# Run all tests
bun test

# Run specific test
bun test src/app/api/streams/route.test.ts

# Coverage report
bun test --coverage
```

### 5. Build

```bash
# Production build
bun run build

# Start production server
bun start
```

---

## Agent Prompts

Each agent has a detailed prompt file in `prompts/`:

### 1. Gemini Ultra Research (`prompts/1_gemini_ultra_research.md`)
- Deep research with cited sources
- Policy verification (WCAG, YouTube, etc.)
- Manual gathering (6 required manuals)
- Generate research bundle + 6 plan files
- Output: `artifacts/1_gemini_ultra_research.json`

### 2. GPT-5 Codex Architecture (`prompts/2_gpt5_codex_architecture.md`)
- System architecture design
- Component tree with task allocation
- API contracts between frontend/backend
- Core scaffolding (package.json, tsconfig, etc.)
- Output: `artifacts/2_gpt5_codex_architecture.json`

### 3a. Claude Frontend (`prompts/3a_claude_frontend.md`)
- React/Next.js components
- Tailwind CSS styling + dark mode
- i18n integration (6 languages + RTL)
- YouTube IFrame API integration
- WCAG 2.2 AA accessibility
- Output: `artifacts/3a_claude_frontend_output.json`

### 3b. Claude Backend (`prompts/3b_claude_backend.md`)
- Next.js API routes
- YouTube API client
- InfraNodus + MCP integration
- Testing setup (Jest)
- 3 comprehensive manuals
- Output: `artifacts/3b_claude_backend_output.json`

### 4. Gemini CLI Final (`prompts/4_gemini_cli_final.md`)
- Merge frontend + backend outputs
- Resolve conflicts
- Run build + tests
- Performance + accessibility audits
- Generate release artifacts
- Output: `artifacts/4_gemini_cli_final.json` + `releases/*.zip`

---

## Troubleshooting

### Agent Execution Fails

```bash
# Check logs
cat logs/gemini-ultra.log

# Re-run specific agent
make gemini-ultra

# Clean and restart
make clean
make all
```

### Missing Environment Variables

```bash
# Verify all keys set
make check-env
```

### Build Failures

```bash
# Check TypeScript errors
tsc --noEmit

# Check for missing dependencies
bun install

# Clean node_modules and reinstall
rm -rf node_modules bun.lockb
bun install
```

### Performance Issues

```bash
# Analyze bundle size
bun run build --analyze

# Check Lighthouse score
npx lighthouse http://localhost:3000
```

---

## Documentation

After orchestration completes, find comprehensive guides in `docs/manuals/`:

1. **Integrated System Guide** - Router + OBS + YouTube setup
2. **Node Operator Quick Start** - Event day operations
3. **DoL 2025 Webapp Guide (SE)** - User guide in Swedish

---

## Why This Architecture?

### Multi-Agent Benefits
- **Specialization**: Each agent optimized for specific task
- **Parallelization**: Claude agents work simultaneously (saves 15-20 min)
- **File-based**: No complex message queues, just JSON handoffs
- **Traceable**: Every artifact has metadata (timestamp, execution time)
- **Re-runnable**: Agents can be executed independently
- **Debuggable**: Human review possible between stages

### Model Selection Rationale
- **Gemini 2.5 Pro Ultra**: Best for deep research + manual gathering
- **GPT-5 Codex**: Strongest code architecture + system design
- **Claude Sonnet 4.5**: Excellent balance of speed + code quality (2x instances)
- **Gemini CLI**: Fast final integration + build orchestration

### Async Communication Benefits
- ✅ Clear handoff contracts (JSON schema)
- ✅ No network latency between agents
- ✅ Independent testing of each stage
- ✅ Artifact inspection for debugging
- ✅ Human intervention possible at any stage

---

## Important Notes

### Legacy Code
- `/october/` contains deprecated prototypes (dol.tsx, alt-dol.tsx, dol-2.tsx)
- Retained for reference until new Next.js app fully replaces them
- Do NOT modify `/october/` - work in `/src/` instead

### Policies & Compliance
- **WCAG 2.2 AA**: Mandatory for all UI components
- **YouTube Concurrency**: ≤12 events per channel (DoL uses 4)
- **Autoplay**: User-gesture-only (WCAG + UX requirement)
- **Performance**: LCP <2.5s, CLS <0.1, JS <250KB

### Security
- **Never commit API keys** - use `.env.local` (gitignored)
- **CI secrets**: Store in GitHub Secrets
- **Router credentials**: Redact from documentation before publishing
- **Stream keys**: Rotate after event

---

## Contributing

When working on this codebase:

1. **Read documentation first**: README.md, CLAUDE.md (this file), AGENTS.md
2. **Follow agent boundaries**: Don't mix frontend/backend responsibilities
3. **Validate JSON schemas**: All artifacts must match `schemas/agent-handoff-schema.json`
4. **Run linters**: `trunk check` before committing
5. **Test thoroughly**: Coverage >80% required
6. **Document changes**: Update relevant CLAUDE.md sections

---

## License

MIT

---

## Additional Resources

- **Main README**: `october/README.md` (full orchestration suite details)
- **Agent Guidelines**: `AGENTS.md` (repository conventions)
- **Router Docs**: `ASUSWRT-MERLIN-DOCS.md` (networking setup)
- **Prompts**: `prompts/` directory (agent instructions)
- **Schema**: `schemas/agent-handoff-schema.json` (communication protocol)
