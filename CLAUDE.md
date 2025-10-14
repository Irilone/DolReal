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
bun run test:watch        # Run tests in watch mode
bun run test:coverage     # Generate coverage report (target: >80%)
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

### API Routes (Backend)

All API routes follow Next.js 15 App Router conventions (route.ts files):

```
src/app/api/
├── streams/route.ts       # GET /api/streams?day=1|2
│                          # Returns YouTube stream metadata (title, ID, thumbnail)
├── graph/route.ts         # GET /api/graph?nodeId=string
│                          # InfraNodus knowledge graph integration
└── health/route.ts        # GET /api/health
                           # System health check (API status, connectivity)
```

**Testing API routes**: `bun test src/app/api/streams/route.test.ts`

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

- `/october/` contains deprecated prototypes (dol.tsx, alt-dol.tsx, dol-2.tsx) and browser-based Gemini API integration
- **DO NOT MODIFY** `/october/` - work in `/src/` instead
- Retained only for reference until full migration complete
- `/october/README.md` and `/october/INTEGRATION_README.md` contain useful orchestration documentation

### Schema Validation

All artifacts **must** conform to `schemas/agent-handoff-schema.json`. Validate with:

```bash
make validate-schema
```

This schema defines the communication protocol between agents. Each artifact must include:

- `metadata`: Agent ID, timestamp, execution time, status
- `research`/`architecture`/`components`/etc.: Agent-specific payload
- `dependencies`: Inter-agent dependencies

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

- **Full orchestration details**: `october/README.md`
- **Agent guidelines**: `AGENTS.md` (if exists)
- **Router configuration**: `ASUSWRT-MERLIN-DOCS.md` (if exists)
- **Quick start**: `QUICKSTART.md` (if exists)
- **Implementation summary**: `IMPLEMENTATION_SUMMARY.md` (if exists)
