# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DolReal** - Multi-agent orchestration system that builds a Next.js 15 streaming platform for "Dagar om Lagar 2025" (Nov 6-7, 2025). Uses file-based async communication between 4 specialized AI agents (Gemini Ultra, GPT-5 Codex, 2x Claude Sonnet 4.5) to generate production-ready code in 50-70 minutes.

**Tech Stack**: Next.js 15 (App Router), TypeScript (strict mode), Tailwind CSS v4, react-i18next (6 languages), YouTube IFrame API, InfraNodus MCP, Zustand (state management), Jest (testing), Bun (runtime)

**Key Features**: 4 concurrent YouTube streams, knowledge graph integration, WCAG 2.2 AA accessibility, RTL support (Arabic/Farsi), dark mode

**Important**: The `october/` directory contains deprecated browser-based prototypes and legacy documentation. All active development happens in `src/`. Do not modify `october/` unless explicitly instructed.

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

<<<<<<< Updated upstream
# Or run Claudes separately
make claude-frontend      # Agent 3a: UI components
make claude-backend       # Agent 3b: API routes + docs

# Monitoring
make status               # Check agent completion status
make logs                 # View agent logs
make clean                # Remove all artifacts
=======
# Clean artifacts
make clean

# Validate environment variables
make check-env
>>>>>>> Stashed changes
```

**Interactive Mode** (recommended for development):

```bash
./scripts/interactive-orchestrate.sh    # Step-by-step execution with approval gates
```

### Next.js Development (After Orchestration)

```bash
# Start dev server
bun dev
# Opens http://localhost:3000

# Production build
bun run build

# Start production server
bun start

# Type checking
bun run typecheck
# or
tsc --noEmit
```

### Package Management (Bun)

```bash
<<<<<<< Updated upstream
bun install               # Install dependencies (7-100x faster than npm)
bun add <package>         # Add dependency
bun remove <package>      # Remove dependency
=======
# Install dependencies
bun install

# Add package
bun add <package>
bun add -d <package>  # Dev dependency

# Remove package
bun remove <package>

# Update packages
bun update

# Run scripts
bun run <script>
```

### Testing

```bash
# Run all tests
bun test
# or
bun run test

# Watch mode
bun run test:watch

# Coverage report
bun run test:coverage

# Run specific test file
bun test src/app/api/streams/route.test.ts

# Run tests matching pattern
bun test --testPathPattern=components
>>>>>>> Stashed changes
```

### Next.js Development

```bash
<<<<<<< Updated upstream
bun dev                   # Start dev server (http://localhost:3000)
bun run build             # Production build
bun start                 # Start production server
bun run lint              # Run Next.js linting
=======
# Run Trunk linter (markdownlint, prettier, trufflehog, git-diff-check)
trunk check
trunk check --all

# Auto-fix issues
trunk fmt

# Next.js ESLint
bun run lint

# Format check
bun run format:check

# Auto-format
bun run format
>>>>>>> Stashed changes
```

### Testing

```bash
<<<<<<< Updated upstream
bun test                  # Run all tests (Jest)
bun test <file>           # Run specific test file
bun run test:watch        # Run tests in watch mode
bun run test:coverage     # Generate coverage report (target: >80%)
=======
# Required for orchestration
export GEMINI_API_KEY="your-gemini-key"
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"

# Required for Next.js build
export NEXT_PUBLIC_YOUTUBE_API_KEY="your-youtube-key"
export INFRANODUS_API_KEY="your-infranodus-key"

# YouTube stream IDs
export NODVAST_YOUTUBE_ID="stream-id-1"
export NODSYD_YOUTUBE_ID="stream-id-2"
export NODOST_YOUTUBE_ID="stream-id-3"
export NODMIDD_YOUTUBE_ID="stream-id-4"

# Optional: Site URL
export NEXT_PUBLIC_SITE_URL="https://dolreal.se"
```

### View Agent Logs

```bash
# View all logs (last 20 lines each)
make logs

# View specific log
cat logs/1_gemini_ultra.log
cat logs/3a_claude_frontend.log
tail -f logs/4_gemini_cli.log
>>>>>>> Stashed changes
```

### Linting & Formatting

```bash
bun run lint              # Run ESLint on all files
bun run format            # Format code with Prettier
bun run format:check      # Check formatting without changes
trunk check               # Run all linters (markdownlint, prettier, trufflehog)
trunk check --all         # Check all files
trunk fmt                 # Auto-fix formatting issues
```

### TypeScript

```bash
bun run typecheck         # Check TypeScript errors (tsc --noEmit)
```

### Orchestration Scripts

```bash
bun run scripts/gem.ts --model gemini-2.5-pro-ultra --input <prompt> --output <artifact>
bun run scripts/anthropic.ts --model claude-sonnet-4-5 --input <prompt> --output <artifact>
bun run scripts/openai.ts --model gpt-5-codex --input <prompt> --output <artifact>
bun run scripts/orchestrate.ts run     # Full orchestration
bun run scripts/orchestrate.ts status  # Check status
bun run scripts/orchestrate.ts clean   # Clean artifacts
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

| Agent               | Outputs                          | Purpose                                                              |
| ------------------- | -------------------------------- | -------------------------------------------------------------------- |
| **Gemini Ultra**    | Research bundle + 6 plan files   | Deep research, policy verification (WCAG, YouTube), manual gathering |
| **GPT-5 Codex**     | Architecture + scaffolding       | System design, component tree, API contracts, core config files      |
| **Claude Frontend** | Components + i18n + styles       | React/Next.js UI, Tailwind, accessibility, YouTube integration       |
| **Claude Backend**  | API routes + integrations + docs | Next.js API routes, YouTube client, InfraNodus MCP, 3 manuals        |
| **Gemini CLI**      | Final build + release            | Merge outputs, run build/tests, performance audits, create release   |

### Project Structure

```
/
<<<<<<< Updated upstream
├── artifacts/              # Agent JSON handoff artifacts (gitignored)
├── plans/                  # Research plans (router, OBS, YouTube, site spec)
├── prompts/                # Agent prompt files (detailed instructions for each agent)
├── schemas/                # JSON schema for agent communication
│   └── agent-handoff-schema.json  # Contract between agents
├── scripts/                # Orchestration scripts (TypeScript/Bun)
│   ├── gem.ts             # Gemini API wrapper
│   ├── anthropic.ts       # Claude API wrapper
│   ├── openai.ts          # OpenAI API wrapper
│   ├── orchestrate.ts     # Main orchestrator (coordinates all agents)
│   └── check-env.ts       # Environment validation
├── src/                    # Next.js 15 application source
│   ├── app/               # App Router (pages + API routes + layouts)
│   │   ├── [lang]/        # Localized routes (se, en, ar, fa, zh, es)
│   │   │   ├── layout.tsx # Lang-specific layout with RTL support
│   │   │   ├── page.tsx   # Home page
│   │   │   ├── about/     # About page
│   │   │   ├── archive/   # Archive page
│   │   │   └── schedule/  # Schedule page
│   │   ├── api/           # API routes
│   │   │   ├── streams/route.ts   # GET /api/streams?day=1|2
│   │   │   ├── graph/route.ts     # GET /api/graph?nodeId=string
│   │   │   └── health/route.ts    # GET /api/health
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── features/      # Feature-specific components
│   │   │   ├── Header.tsx           # Site header with nav/lang/dark mode
│   │   │   ├── StreamCarousel.tsx   # 4 YouTube players
│   │   │   ├── GraphNavModal.tsx    # InfraNodus integration
│   │   │   ├── ProgramSection.tsx   # Event schedule
│   │   │   └── LanguageSwitcher.tsx # 6-language dropdown
│   │   ├── ui/            # Base UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── modal.tsx
│   │   ├── shared/        # Reusable components
│   │   │   ├── SEO.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── providers/     # Context providers
│   │       ├── ThemeProvider.tsx
│   │       └── I18nProvider.tsx
│   ├── lib/               # Utilities and integrations
│   │   ├── youtube/       # YouTube API client
│   │   ├── infranodus/    # InfraNodus MCP client
│   │   ├── mcp/           # MCP client base
│   │   └── utils/         # Utility functions (cn, date, locale)
│   ├── hooks/             # Custom React hooks
│   │   ├── useStreamPlayer.ts
│   │   ├── useStreamHealth.ts
│   │   ├── useViewerCount.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   ├── stores/            # Zustand state stores
│   │   ├── streamStore.ts
│   │   └── uiStore.ts
│   ├── types/             # TypeScript type definitions
│   │   ├── stream.ts
│   │   ├── i18n.ts
│   │   ├── api.ts
│   │   └── index.ts
│   └── i18n/              # Internationalization
│       ├── config.ts      # i18next configuration
│       └── locales/       # Translation files (se, en, ar, fa, zh, es)
├── docs/manuals/          # Generated documentation (3 comprehensive guides)
├── october/               # LEGACY: deprecated prototypes - DO NOT MODIFY
│   ├── README.md          # Orchestration documentation
│   └── INTEGRATION_README.md  # Browser integration docs
├── logs/                  # Agent execution logs (gitignored)
├── releases/              # Release artifacts (gitignored)
├── Makefile               # Orchestration commands
├── package.json           # Dependencies + npm scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── jest.config.ts         # Jest testing configuration
└── eslint.config.mjs      # ESLint configuration
=======
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
├── scripts/                # Orchestration scripts (TypeScript)
│   ├── gem.ts             # Gemini API wrapper
│   ├── anthropic.ts       # Claude API wrapper
│   └── openai.ts          # GPT-5 Codex wrapper
├── src/                    # Next.js application source
│   ├── app/               # App Router pages + API routes
│   │   ├── [locale]/      # i18n routing
│   │   └── api/           # Backend API endpoints
│   ├── components/        # React components
│   │   ├── features/      # Feature-specific components
│   │   ├── ui/            # shadcn/ui base components
│   │   └── shared/        # Reusable components
│   ├── lib/               # Utilities
│   │   ├── youtube/       # YouTube API client
│   │   ├── infranodus/    # InfraNodus client
│   │   └── mcp/           # MCP client
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── i18n/              # Internationalization
│       ├── config.ts      # i18next config
│       └── locales/       # Translation files (se, en, ar, fa, zh, es)
├── docs/                   # Documentation
│   └── manuals/           # 3 comprehensive manuals (generated)
├── public/                 # Static assets (images, fonts)
├── tests/                  # Test files
│   ├── api/               # API route tests
│   └── integration/       # Integration tests
├── october/                # Legacy prototypes (deprecated, retain for reference)
├── .trunk/                 # Trunk linter config
├── .github/                # GitHub workflows
│   └── workflows/         # CI/CD pipelines
├── Makefile                # Orchestration commands
├── package.json            # Dependencies + scripts
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind CSS config
├── jest.config.ts          # Jest test config
├── jest.setup.ts           # Jest setup file
├── .env.example            # Environment template
├── CLAUDE.md               # This file
├── AGENTS.md               # Repository guidelines
├── ARCHITECTURE.md         # System architecture details
├── ASUSWRT-MERLIN-DOCS.md  # Router documentation
└── README.md               # Project overview
>>>>>>> Stashed changes
```

### Key Files

- **Makefile:42**: `make all` pipeline definition (full orchestration)
- **package.json:7-24**: npm scripts including orchestration commands
- **schemas/agent-handoff-schema.json**: Contract for agent communication
- **prompts/\*.md**: Detailed instructions for each agent (critical for understanding agent behavior)
- **scripts/orchestrate.ts**: Main orchestrator coordinating all 4 agents with parallel execution support
- **src/app/[lang]/layout.tsx**: Localized layout with RTL support (dir attribute)
- **src/i18n/config.ts**: i18next initialization with 6 language resources
- **tsconfig.json**: TypeScript strict mode, path aliases (@/_ -> src/_)

<<<<<<< Updated upstream
### API Routes (Backend)

All API routes follow Next.js 15 App Router conventions (route.ts files):

=======
### TypeScript Path Aliases

```typescript
// Configured in tsconfig.json
import { Button } from '@/components/ui/button';
import { useYouTube } from '@/hooks/useYouTube';
import { YouTubeClient } from '@/lib/youtube/client';
import { StreamData } from '@/types/streams';
import { useTranslation } from '@/i18n/config';
```

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
│   ├── button.tsx
│   ├── modal.tsx
│   └── dropdown.tsx
└── shared/                   // Reusable components
    ├── ThemeToggle.tsx
    └── LoadingSpinner.tsx
>>>>>>> Stashed changes
```
src/app/api/
<<<<<<< Updated upstream
├── streams/route.ts       # GET /api/streams?day=1|2
│                          # Returns YouTube stream metadata (title, ID, thumbnail)
├── graph/route.ts         # GET /api/graph?nodeId=string
│                          # InfraNodus knowledge graph integration
└── health/route.ts        # GET /api/health
                           # System health check (API status, connectivity)
=======
├── streams/
│   └── route.ts             // GET /api/streams?day=1|2
│                            // Returns active stream IDs for given day
├── graph/
│   └── route.ts             // GET /api/graph?nodeId=string
│                            // Fetches InfraNodus graph data
└── health/
    └── route.ts             // GET /api/health
                             // Health check endpoint
>>>>>>> Stashed changes
```

**Testing API routes**: `bun test src/app/api/streams/route.test.ts`

<<<<<<< Updated upstream
### State Management

Uses **Zustand** for lightweight, performant state:

- **streamStore.ts**: Active stream selection, day selection, player states
- **uiStore.ts**: Theme (light/dark), language preference, modal visibility

### Internationalization Architecture

**Routing**: `/[lang]/*` pattern (e.g., `/se/about`, `/en/schedule`)

**Languages**: Swedish (se - default), English (en), Arabic (ar), Farsi (fa), Chinese (zh), Spanish (es)

**RTL Support**: Arabic/Farsi automatically get `dir="rtl"` via `getLocaleDirection()` in `src/lib/utils/locale.ts`

**Translation Files**: `src/i18n/locales/{lang}.json` - structured by feature (nav, streams, footer, etc.)

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
=======
```typescript
// Backend (Agent 3b responsibility)
src/lib/
├── youtube/
│   └── client.ts            // YouTube Data API v3 client
│                            // - List streams
│                            // - Get stream details
│                            // - Verify stream status
├── infranodus/
│   └── client.ts            // InfraNodus MCP + fallback
│                            // - MCP connection (primary)
│                            // - iframe embed (fallback)
└── mcp/
    └── client.ts            // Generic MCP client
                             // - Protocol implementation
                             // - Error handling
```

---

## Key Features

### Internationalization (i18n)

- **6 languages**: Swedish (se), English (en), Arabic (ar), Farsi (fa), Chinese (zh), Spanish (es)
- **Default locale**: Swedish (se)
- **RTL support**: Automatic for Arabic/Farsi via `dir="rtl"`
- **Implementation**: react-i18next with JSON translation files
- **Routing**: `/[locale]/` pattern in Next.js App Router
- **Translation files**: `src/i18n/locales/{locale}/common.json`
- **Locale detection**: Browser language detection enabled

### Accessibility (WCAG 2.2 AA)

- ARIA labels on all interactive elements (`aria-label`, `aria-describedby`)
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Focus management with visible focus indicators (`:focus-visible`)
- Color contrast ratios ≥4.5:1 (text), ≥3:1 (UI components)
- Screen reader support via semantic HTML and ARIA
- Semantic HTML landmarks (`<main>`, `<nav>`, `<aside>`)
- Skip-to-content link for keyboard users

### YouTube Integration

- **IFrame API**: Full player control via `window.YT`
- **Policy**: Only one active player at a time (others paused)
- **No autoplay**: User gesture required (WCAG + policy compliance)
- **Day 2 logic**: Disable Nodsyd, Nodöst, Nodmidd; show "Ej aktiv idag"
- **Keyboard controls**:
  - Space: play/pause active stream
  - Arrow keys: switch between streams
  - Escape: close fullscreen

### InfraNodus Integration

- **Primary**: MCP server connection (if available)
- **Fallback**: iframe embed (`https://infranodus.com/...`)
- **Modal display**: Focus trap on open, Escape to close
- **4 graph nodes**: Nodväst, Nodsyd, Nodöst, Nodmidd
- **Error handling**: Graceful degradation if MCP unavailable

### Router Configuration (ASUS RT-AX86U Pro)

- **Firmware**: Asuswrt-Merlin
- **QoS**: Prioritize RTMP (port 1935) traffic
- **Bandwidth**: Reserve 80 Mbps upload for streaming
- **Failover**: Automatic WAN failover if configured
- **Docs**: See `ASUSWRT-MERLIN-DOCS.md`

---
>>>>>>> Stashed changes

## Development Workflow

### First-Time Setup

```bash
<<<<<<< Updated upstream
# 1. Install Bun
=======
# Clone repository
git clone <repo-url>
cd DolReal

# Install Bun (if not installed)
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
### Day-to-Day Development

```bash
# Start dev server
bun dev

# Make changes to src/
=======
### 2. Run Orchestration (First Time)

```bash
# Full pipeline (50-70 minutes)
make all

# Monitor progress
make status

# View logs
make logs
```

### 3. Development (After Orchestration)

```bash
# Start dev server
bun dev

# Open http://localhost:3000
# App will hot-reload on changes
```
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
### 1. Gemini Ultra Research (`prompts/1_gemini_ultra_research.md`)
- Deep research with cited sources
- Policy verification (WCAG 2.2 AA, YouTube API, streaming limits)
- Manual gathering (6 required manuals: ASUS, OBS, YouTube, InfraNodus, Next.js, Tailwind)
- Generate research bundle + 6 plan files
- Output: `artifacts/1_gemini_ultra_research.json`

### 2. GPT-5 Codex Architecture (`prompts/2_gpt5_codex_architecture.md`)
- System architecture design (data flow, component hierarchy)
- Component tree with task allocation to Claude agents
- API contracts between frontend/backend
- Core scaffolding (package.json, tsconfig, next.config, etc.)
- Output: `artifacts/2_gpt5_codex_architecture.json`

### 3a. Claude Frontend (`prompts/3a_claude_frontend.md`)
- React/Next.js components (App Router pattern)
- Tailwind CSS styling + dark mode (CSS variables)
- i18n integration (6 languages + RTL for ar/fa)
- YouTube IFrame API integration (single-player policy)
- WCAG 2.2 AA accessibility (keyboard nav, ARIA, contrast)
- Output: `artifacts/3a_claude_frontend_output.json`

### 3b. Claude Backend (`prompts/3b_claude_backend.md`)
- Next.js API routes (App Router `/api/` pattern)
- YouTube Data API v3 client
- InfraNodus + MCP integration (fallback to iframe)
- Testing setup (Jest, React Testing Library)
- 3 comprehensive manuals (Integrated System, Node Operator, Webapp Guide)
- Output: `artifacts/3b_claude_backend_output.json`

### 4. Gemini CLI Final (`prompts/4_gemini_cli_final.md`)
- Merge frontend + backend outputs
- Resolve conflicts (imports, types, duplicates)
- Run build + tests (`bun run build`, `bun test`)
- Performance audits (bundle size, LCP, CLS)
- Accessibility audits (axe-core, WCAG compliance)
- Generate release artifacts (ZIP with all files)
- Output: `artifacts/4_gemini_cli_final.json` + `releases/*.zip`
>>>>>>> Stashed changes

- **Languages**: Swedish (default), English, Arabic, Farsi, Chinese, Spanish
- **Routing**: `/[locale]/` pattern in App Router
- **RTL**: Automatic for ar/fa via CSS

## Troubleshooting

### Agent Execution Fails

```bash
# Check logs
cat logs/gemini-ultra.log
tail -n 50 logs/3a_claude_frontend.log

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

<<<<<<< Updated upstream
# Check .env.local exists
ls -la .env.local
```

## Important Notes

### Legacy Code

- `/october/` contains deprecated prototypes (dol.tsx, alt-dol.tsx, dol-2.tsx) and browser-based Gemini API integration
- **DO NOT MODIFY** `/october/` - work in `/src/` instead
- Retained only for reference until full migration complete
- `/october/README.md` and `/october/INTEGRATION_README.md` contain useful orchestration documentation

### Schema Validation
=======
# Expected output:
# ✓ GEMINI_API_KEY configured
# ✓ OPENAI_API_KEY configured
# ✓ ANTHROPIC_API_KEY configured
```

### Build Failures

```bash
# Check TypeScript errors
bun run typecheck
# or
tsc --noEmit

# Check for missing dependencies
bun install

# Clean node_modules and reinstall
rm -rf node_modules bun.lockb .next
bun install
```

### Test Failures

```bash
# Run tests with verbose output
bun test --verbose

# Run specific failing test
bun test src/app/api/streams/route.test.ts --verbose

# Check test setup
cat jest.setup.ts
```

### Performance Issues

```bash
# Analyze bundle size
bun run build

# Check Lighthouse score
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Optimize images
npm install -g sharp-cli
sharp -i public/images/*.jpg -o public/images/optimized/ --webp
```

### i18n Not Working

```bash
# Verify translation files exist
ls -la src/i18n/locales/*/common.json

# Check Next.js i18n config
grep -A 5 "i18n:" next.config.js

# Test locale routing
curl http://localhost:3000/se/
curl http://localhost:3000/en/
```

---

## Documentation

After orchestration completes, find comprehensive guides in `docs/manuals/`:

1. **Integrated System Guide** - Router + OBS + YouTube setup
2. **Node Operator Quick Start** - Event day operations (Nov 6-7, 2025)
3. **DoL 2025 Webapp Guide (SE)** - User guide in Swedish

---

## Why This Architecture?

### Multi-Agent Benefits
- **Specialization**: Each agent optimized for specific task (research, architecture, frontend, backend, integration)
- **Parallelization**: Claude agents work simultaneously (saves 15-20 min)
- **File-based**: No complex message queues, just JSON handoffs
- **Traceable**: Every artifact has metadata (timestamp, execution time, status)
- **Re-runnable**: Agents can be executed independently (`make claude-frontend`)
- **Debuggable**: Human review possible between stages

### Model Selection Rationale
- **Gemini 2.5 Pro Ultra**: Best for deep research + manual gathering (cites sources)
- **GPT-5 Codex**: Strongest code architecture + system design reasoning
- **Claude Sonnet 4.5**: Excellent balance of speed + code quality (2x instances)
- **Gemini CLI**: Fast final integration + build orchestration

### Async Communication Benefits
- ✅ Clear handoff contracts (JSON schema validation)
- ✅ No network latency between agents
- ✅ Independent testing of each stage
- ✅ Artifact inspection for debugging
- ✅ Human intervention possible at any stage

---

## Important Notes

### Legacy Code
- `/october/` contains deprecated prototypes (`dol.tsx`, `alt-dol.tsx`, `dol-2.tsx`)
- Retained for reference until new Next.js app fully replaces them
- Do NOT modify `/october/` - work in `/src/` instead
- `/october/INTEGRATION_README.md` documents browser-based Gemini integration

### Policies & Compliance
- **WCAG 2.2 AA**: Mandatory for all UI components (keyboard nav, ARIA, contrast)
- **YouTube Concurrency**: ≤12 events per channel (DoL uses 4)
- **Autoplay**: User-gesture-only (WCAG + UX requirement)
- **Performance**: LCP <2.5s, CLS <0.1, JS <250KB
- **Test Coverage**: >80% required for production

### Security
- **Never commit API keys** - use `.env.local` (gitignored)
- **CI secrets**: Store in GitHub Secrets for workflows
- **Router credentials**: Redact from documentation before publishing
- **Stream keys**: Rotate after event (Nov 7, 2025)
>>>>>>> Stashed changes

All artifacts **must** conform to `schemas/agent-handoff-schema.json`. Validate with:

```bash
make validate-schema
```

This schema defines the communication protocol between agents. Each artifact must include:

<<<<<<< Updated upstream
- `metadata`: Agent ID, timestamp, execution time, status
- `research`/`architecture`/`components`/etc.: Agent-specific payload
- `dependencies`: Inter-agent dependencies
=======
1. **Read documentation first**: README.md, CLAUDE.md (this file), AGENTS.md, ARCHITECTURE.md
2. **Follow agent boundaries**: Don't mix frontend/backend responsibilities (see project structure)
3. **Validate JSON schemas**: All artifacts must match `schemas/agent-handoff-schema.json`
4. **Run linters**: `trunk check` before committing
5. **Test thoroughly**: Coverage >80% required (`bun test --coverage`)
6. **Document changes**: Update relevant sections in CLAUDE.md, AGENTS.md
7. **Use TypeScript path aliases**: Import via `@/` prefix (see tsconfig.json)
>>>>>>> Stashed changes

### Agent Boundaries

- **Gemini Ultra (Agent 1)**: Research, policy verification, manuals (WCAG, YouTube ToS, streaming best practices)
- **GPT-5 Codex (Agent 2)**: System architecture, component tree, API contracts, scaffolding
- **Claude Frontend (Agent 3a)**: React components, Tailwind styles, i18n, accessibility (ARIA, keyboard nav)
- **Claude Backend (Agent 3b)**: API routes, YouTube/InfraNodus clients, tests, documentation
- **Gemini CLI (Agent 4)**: Merge outputs, build/test execution, performance audits, release creation
- **Do not mix** frontend and backend responsibilities in single agent

### Interactive Orchestration Script

`./scripts/interactive-orchestrate.sh` (if available) provides step-by-step execution with:

- Approval gates between agents
- Artifact inspection
- Human intervention points
- Rollback capability

Recommended for development over `make all`.

### Path Aliases

TypeScript is configured with `@/*` alias mapping to `src/*`:

```typescript
import { cn } from "@/lib/utils/cn"; // → src/lib/utils/cn.ts
import { Header } from "@/components/features/Header"; // → src/components/features/Header.tsx
import type { Locale } from "@/types/i18n"; // → src/types/i18n.ts
```

### YouTube Player Notes

- **Single active player constraint**: Only one stream can play at a time (enforced in `useStreamPlayer.ts`)
- **Day 2 logic**: On November 7, 2025, only Nodväst stream is active (others disabled but UI unchanged)
- **No autoplay**: User must click play (WCAG compliance + YouTube policy)
- Uses **YouTube IFrame API** loaded via script tag in layout

## Common Development Patterns

### Adding a New Component

1. Create component in appropriate directory:
   - Feature components → `src/components/features/`
   - Base UI components → `src/components/ui/`
   - Reusable/shared → `src/components/shared/`

2. Follow naming conventions:
   - PascalCase for component files: `StreamCard.tsx`
   - Export component as named export or default

3. Add ARIA labels and keyboard navigation for accessibility

4. Add translations to all 6 language files in `src/i18n/locales/`

### Adding a New API Route

1. Create `route.ts` in `src/app/api/{endpoint}/`

2. Export named functions: `GET`, `POST`, `PUT`, `DELETE`

3. Use `NextRequest` and `NextResponse` types

4. Add corresponding test file: `route.test.ts`

### Adding a New Page

1. Create page in `src/app/[lang]/{page}/page.tsx`

2. Component receives `params: { lang: Locale }` prop

3. Use `initI18n(lang)` to initialize translations

4. Add route to navigation in `src/components/features/Header.tsx`

### Working with Translations

```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  return <h1>{t('nav.home')}</h1>  // → "Hem" (Swedish)
}
```

### Testing Guidelines

- **Unit tests**: For utilities, hooks, and isolated components
- **Integration tests**: For API routes and component interactions
- **Test files**: Co-located with source (e.g., `route.test.ts` next to `route.ts`)
- **Coverage target**: >80% (enforced in CI)

## Additional Resources

<<<<<<< Updated upstream
- **Full orchestration details**: `october/README.md`
- **Agent guidelines**: `AGENTS.md` (if exists)
- **Router configuration**: `ASUSWRT-MERLIN-DOCS.md` (if exists)
- **Quick start**: `QUICKSTART.md` (if exists)
- **Implementation summary**: `IMPLEMENTATION_SUMMARY.md` (if exists)
=======
- **Main README**: `README.md` (project overview, quick start)
- **Orchestration Details**: `october/README.md` (full orchestration suite details)
- **Agent Guidelines**: `AGENTS.md` (repository conventions, commit style)
- **Architecture**: `ARCHITECTURE.md` (system design, data flow, scalability)
- **Router Docs**: `ASUSWRT-MERLIN-DOCS.md` (networking setup, QoS config)
- **Prompts**: `prompts/` directory (agent instructions)
- **Schema**: `schemas/agent-handoff-schema.json` (communication protocol)
>>>>>>> Stashed changes
