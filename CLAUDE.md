# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DolReal** - Multi-agent orchestration system that builds a Next.js 15 streaming platform for "Dagar om Lagar 2025" (Nov 6-7, 2025). Uses file-based async communication between 4 specialized AI agents (Gemini Ultra, GPT-5 Codex, 2x Claude Sonnet 4.5) to generate production-ready code in 50-70 minutes.

**Tech Stack**: Next.js 15, TypeScript (strict), Tailwind CSS v4, react-i18next (6 languages), YouTube IFrame API, InfraNodus MCP

**Key Features**: 4 concurrent YouTube streams, knowledge graph integration, WCAG 2.2 AA accessibility, RTL support (Arabic/Farsi), dark mode

## Build & Development Commands

### Orchestration Pipeline (Multi-Agent)

```bash
# Full pipeline - all 4 agents sequentially (50-70 min)
make all                  # or: bun run orchestrate

# Individual agents
make gemini-ultra         # Agent 1: Research & Planning (10-15 min)
make gpt5-codex           # Agent 2: System Architecture (5-10 min)
make claude-parallel      # Agents 3a & 3b in parallel (15-20 min)
make gemini-cli           # Agent 4: Final Integration (5-10 min)

# Or run Claudes separately
make claude-frontend      # Agent 3a: UI components
make claude-backend       # Agent 3b: API routes + docs

# Monitoring
make status               # Check agent completion status
make logs                 # View agent logs
make clean                # Remove all artifacts
```

**Interactive Mode** (recommended for development):
```bash
./scripts/interactive-orchestrate.sh    # Step-by-step execution with approval gates
```

### Package Management (Bun)

```bash
bun install               # Install dependencies (7-100x faster than npm)
bun add <package>         # Add dependency
bun remove <package>      # Remove dependency
```

### Next.js Development

```bash
bun dev                   # Start dev server (http://localhost:3000)
bun run build             # Production build
bun start                 # Start production server
bun run lint              # Run Next.js linting
```

### Testing

```bash
bun test                  # Run all tests (Jest)
bun test <file>           # Run specific test file
bun run test:coverage     # Generate coverage report (target: >80%)
```

### Linting & Formatting

```bash
trunk check               # Run all linters (markdownlint, prettier, trufflehog)
trunk check --all         # Check all files
trunk fmt                 # Auto-fix formatting issues
```

### TypeScript

```bash
bun run typecheck         # Check TypeScript errors (tsc --noEmit)
```

## Architecture

### Multi-Agent Communication Flow

```
1. Gemini Ultra → artifacts/1_gemini_ultra_research.json + plans/*.md
2. GPT-5 Codex → artifacts/2_gpt5_codex_architecture.json
3a. Claude Frontend → artifacts/3a_claude_frontend_output.json
3b. Claude Backend → artifacts/3b_claude_backend_output.json (parallel with 3a)
4. Gemini CLI → artifacts/4_gemini_cli_final.json + releases/*.zip
```

All artifacts conform to `schemas/agent-handoff-schema.json` - this defines the communication protocol between agents.

### Agent Responsibilities

| Agent | Outputs | Purpose |
|-------|---------|---------|
| **Gemini Ultra** | Research bundle + 6 plan files | Deep research, policy verification (WCAG, YouTube), manual gathering |
| **GPT-5 Codex** | Architecture + scaffolding | System design, component tree, API contracts, core config files |
| **Claude Frontend** | Components + i18n + styles | React/Next.js UI, Tailwind, accessibility, YouTube integration |
| **Claude Backend** | API routes + integrations + docs | Next.js API routes, YouTube client, InfraNodus MCP, 3 manuals |
| **Gemini CLI** | Final build + release | Merge outputs, run build/tests, performance audits, create release |

### Project Structure

```
/
├── artifacts/              # Agent JSON handoff artifacts (gitignored)
├── plans/                  # Research plans (router, OBS, YouTube, site spec)
├── prompts/                # Agent prompt files (detailed instructions)
├── schemas/                # JSON schema for agent communication
├── scripts/                # Orchestration scripts (gem.ts, anthropic.ts, openai.ts)
├── src/                    # Next.js application
│   ├── app/               # App Router (pages + API routes)
│   ├── components/        # React components (features/, ui/, shared/)
│   ├── lib/               # Utilities (YouTube, InfraNodus, MCP clients)
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   └── i18n/              # i18next config + locales/ (se, en, ar, fa, zh, es)
├── docs/manuals/          # Generated documentation (3 comprehensive guides)
├── october/               # LEGACY: deprecated prototypes - DO NOT MODIFY
├── Makefile               # Orchestration commands
└── package.json           # Dependencies + npm scripts
```

### Key Files

- **Makefile:55**: `make all` pipeline definition
- **package.json:7-24**: npm scripts including orchestration commands
- **schemas/agent-handoff-schema.json**: Contract for agent communication
- **prompts/*.md**: Detailed instructions for each agent (critical for understanding agent behavior)

### API Routes (Backend)

```
src/app/api/
├── streams/route.ts       # GET /api/streams?day=1|2 (YouTube stream info)
├── graph/route.ts         # GET /api/graph?nodeId=string (InfraNodus)
└── health/route.ts        # GET /api/health (system status)
```

### Component Architecture (Frontend)

```
src/components/
├── features/              # Main UI components
│   ├── Header.tsx           # Logo, nav, language switcher, dark mode
│   ├── StreamCarousel.tsx   # 4 YouTube players (day 2 logic: only Nodväst active)
│   ├── GraphNavModal.tsx    # InfraNodus modal embed
│   ├── ProgramSection.tsx   # Event schedule
│   └── LanguageSwitcher.tsx # 6-language dropdown
├── ui/                    # Base UI components (shadcn/ui)
└── shared/                # Reusable components
```

## Environment Variables

Create `.env.local` (gitignored):

```bash
# Agent API keys (required for orchestration)
GEMINI_API_KEY=...
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# Application keys (required for final build)
NEXT_PUBLIC_YOUTUBE_API_KEY=...
INFRANODUS_API_KEY=...
NODVAST_YOUTUBE_ID=...      # Stream 1
NODSYD_YOUTUBE_ID=...       # Stream 2
NODOST_YOUTUBE_ID=...       # Stream 3
NODMIDD_YOUTUBE_ID=...      # Stream 4
```

Verify keys: `make check-env`

## Development Workflow

### First-Time Setup

```bash
# 1. Install Bun
curl -fsSL https://bun.sh/install | bash

# 2. Clone & install dependencies
git clone <repo>
cd DolReal
bun install

# 3. Set environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Run orchestration (generates full app)
make all     # or ./scripts/interactive-orchestrate.sh for step-by-step

# 5. Start dev server
bun dev
```

### Day-to-Day Development

```bash
# Start dev server
bun dev

# Make changes to src/

# Run tests
bun test

# Lint & format
trunk check

# Type check
bun run typecheck

# Build
bun run build
```

### Re-running Orchestration

If you need to regenerate specific parts:

```bash
# Clean artifacts
make clean

# Re-run specific agent
make claude-frontend     # Only regenerate frontend
make claude-backend      # Only regenerate backend

# Or re-run full pipeline
make all
```

## Policies & Requirements

### Accessibility (WCAG 2.2 AA - Mandatory)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Focus indicators (visible outlines)
- Color contrast: ≥4.5:1 (text), ≥3:1 (UI)
- RTL support for Arabic/Farsi
- Screen reader compatibility

### Performance Targets
- **LCP** (Largest Contentful Paint): <2.5s
- **CLS** (Cumulative Layout Shift): <0.1
- **JS Bundle**: <250KB
- **Test Coverage**: >80%

### YouTube Integration Policy
- **No autoplay**: User gesture required (WCAG + policy compliance)
- **Single active player**: Only one stream plays at a time
- **Concurrency limit**: ≤12 events per channel (DoL uses 4)
- **Day 2 behavior**: Only Nodväst active, others disabled (UI unchanged)

### Internationalization
- **Languages**: Swedish (default), English, Arabic, Farsi, Chinese, Spanish
- **Routing**: `/[locale]/` pattern in App Router
- **RTL**: Automatic for ar/fa via CSS

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

### Build Errors

```bash
# Type check for errors
bun run typecheck

# Clean node_modules and reinstall
rm -rf node_modules bun.lock
bun install

# Clean Next.js cache
rm -rf .next
bun run build
```

### Missing Environment Variables

```bash
# Verify all keys set
make check-env

# Check .env.local exists
ls -la .env.local
```

## Important Notes

### Legacy Code
- `/october/` contains deprecated prototypes (dol.tsx, alt-dol.tsx, dol-2.tsx)
- **DO NOT MODIFY** `/october/` - work in `/src/` instead
- Retained only for reference until full migration complete

### Schema Validation
All artifacts **must** conform to `schemas/agent-handoff-schema.json`. Validate with:
```bash
make validate-schema
```

### Agent Boundaries
- **Frontend (Claude #1)**: Components, styles, i18n, accessibility
- **Backend (Claude #2)**: API routes, integrations, tests, documentation
- **Do not mix** frontend and backend responsibilities in single agent

### Interactive Orchestration Script
`./scripts/interactive-orchestrate.sh` provides step-by-step execution with:
- Approval gates between agents
- Artifact inspection
- Human intervention points
- Rollback capability

Recommended for development over `make all`.

## Additional Resources

- **Full orchestration details**: `october/README.md`
- **Agent guidelines**: `AGENTS.md`
- **Router configuration**: `ASUSWRT-MERLIN-DOCS.md`
- **Quick start**: `QUICKSTART.md`
- **Implementation summary**: `IMPLEMENTATION_SUMMARY.md`
