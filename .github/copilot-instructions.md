# GitHub Copilot Instructions for DolReal

This file provides instructions to GitHub Copilot when working with code in this repository.

## Project Overview

**DolReal** - "Dagar om Lagar 2025" streaming event platform. A multi-agent orchestration suite that builds a production-ready Next.js 15 application through coordinated AI agents with file-based async communication.

### Event Details
- **Name**: Dagar om Lagar 2025
- **Dates**: November 6-7, 2025
- **Streams**: 4 simultaneous (Nodväst, Nodsyd, Nodöst, Nodmidd)
- **Day 2 Policy**: Only Nodväst active; UI remains unchanged

### Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + dark mode
- **i18n**: react-i18next (6 languages: se, en, ar, fa, zh, es)
- **Package Manager**: Bun (preferred), npm (fallback)
- **Testing**: Jest + React Testing Library
- **Linting**: Trunk Check (Prettier, ESLint)

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

## Project Structure

```
DolReal/
├── .github/                  # GitHub workflows and configurations
│   ├── workflows/           # CI/CD pipelines
│   └── copilot-instructions.md  # This file
├── artifacts/               # Generated artifacts from agents
├── docs/                    # Documentation
├── october/                 # Legacy browser-based Gemini integration
│   ├── modules/            # ES6+ modules (gemini-api-module.js, etc.)
│   ├── index.html          # Main UI
│   └── README.md           # Orchestration suite documentation
├── plans/                   # Planning documents (router, OBS, YouTube, etc.)
├── prompts/                 # Agent prompts (1_gemini_ultra_research.md, etc.)
├── schemas/                 # JSON schemas (agent-handoff-schema.json)
├── scripts/                 # TypeScript orchestration scripts
│   ├── gem.ts              # Gemini wrapper
│   ├── anthropic.ts        # Anthropic wrapper
│   ├── orchestrate.ts      # Main orchestrator
│   ├── run-agent.ts        # Individual agent runner
│   └── check-env.ts        # Environment checker
├── src/                     # Next.js application source
├── tests/                   # Test files
├── .env.example            # Environment template
├── Makefile                # Build commands
├── package.json            # Dependencies
├── AGENTS.md               # General repository guidelines
└── README.md               # Main documentation
```

### Important Directory Notes
- **Keep orchestration assets at repo root**: `.github/workflows/`, `prompts/`, `artifacts/`, `scripts/`, `Makefile`
- **Legacy UI in `october/`**: Contains prototypes (`dol.tsx`, `alt-dol.tsx`, `dol-2.tsx`) - retain until new Next.js app fully replaces them
- **Generated artifacts**: Place in `artifacts/` directory, never in `october/`
- **Plans**: Store in `plans/` directory (router_plan.md, obs_plan.md, yt_plan.md, etc.)

## Build, Test, and Development Commands

### Setup
```bash
# Install dependencies (Bun preferred)
bun install
# OR
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Verify environment
make check-env
# OR
bun run scripts/check-env.ts
```

### Development
```bash
# Run full orchestration (50-70 minutes)
make all
# OR
bun run orchestrate

# Run individual agents
make gemini-ultra      # Agent 1: Research (10-15 min)
make gpt5-codex        # Agent 2: Architecture (5-10 min)
make claude-frontend   # Agent 3a: Frontend (15-20 min)
make claude-backend    # Agent 3b: Backend (15-20 min)
make claude-parallel   # Both Claudes in parallel (15-20 min)
make gemini-cli        # Agent 4: Integration (5-10 min)

# Check agent status
make status

# Clean artifacts
make clean
```

### Linting and Testing
```bash
# Run Trunk linter (Markdown, JSON, TypeScript)
trunk check

# Run tests (when available)
npm test
# OR
bun test

# Run tests in watch mode
npm run test:watch
```

### Core Scripts
- `npm run gem:research` - Produces research_bundle.json and plan docs with Gemini 2.5 Pro Ultra
- `npm run gem:flash` - Scaffolds Next.js skeleton
- `npm run gem:pro` - Integrates and hardens outputs
- `npm run orchestrate` - Chains entire A→B→C flow

**Important**: Before running, export `GEMINI_API_KEY` and ensure prompts reference the current bundle. Use `trunk check` for linting and inspect outputs in `artifacts/` before committing.

## Coding Style & Naming Conventions

### TypeScript/JavaScript
- **Language**: TypeScript is default for both CLI scripts (ES modules) and React code
- **Indentation**: 2 spaces (Prettier enforced via Trunk)
- **Components**: PascalCase (e.g., `LiveStreamPlayer`, `KnowledgeGraphModal`)
- **Functions**: camelCase (e.g., `fetchStreamData`, `validateApiKey`)
- **Files**: kebab-case for bundles and prompts (e.g., `research_bundle.json`, `site_spec.md`)
- **Scripts**: Mirror README examples when declaring scripts (e.g., `scripts/gem.ts`)

### React/Next.js Conventions
- **Client Components**: Use `'use client';` directive when needed
- **Tailwind Classes**: Group by layout → spacing → color for readability
- **Hooks**: Follow React hooks rules and best practices
- **Props**: Use TypeScript interfaces for component props
- **Accessibility**: Include ARIA attributes and semantic HTML

### File Headers
- Prompt files should have self-identifying version headers
- Include JSDoc comments for complex functions
- TypeScript files should use explicit type annotations

### Swedish UI Requirements
- All user-facing text must be in Swedish
- Use i18next for internationalization
- Support 6 languages: se, en, ar, fa, zh, es
- Include RTL (right-to-left) support for ar and fa

## Testing Guidelines

### Current State
No comprehensive automated test suite exists yet. Prioritize smoke coverage around the CLI.

### Testing Strategy
1. **CLI Tests**: Add `node --test` or Vitest specs under `scripts/__tests__/`
   - Mock the Gemini API
   - Assert request payloads, file writes, and error handling
   
2. **Component Tests**: When Next.js scaffolding lands, co-locate React Testing Library specs beside components
   - Cover YouTube player state
   - Test modal focus traps
   - Verify day-two deactivation logic
   
3. **Before PR**: Run `trunk check` and any new `npm test` job in CI

### Test Coverage Goals
- Aim for >80% code coverage
- Prioritize critical paths (API calls, state management, user interactions)
- Test accessibility features (keyboard navigation, screen readers)

## Commit & Pull Request Guidelines

### Commit Messages
- Use short, imperative subjects (e.g., "Add orchestrator Makefile", "Fix YouTube API integration")
- Match existing history style
- Separate generated artifacts from source changes in the description
- Note which prompts or bundles were regenerated

### Pull Requests
- Link planning tickets in PR description
- Include command outputs (`npm run orchestrate`, `trunk check`)
- Attach screenshots for UI changes
- Highlight follow-up work such as manual guide updates
- Ensure all checks pass before requesting review

### What NOT to Commit
- ❌ Never commit `GEMINI_API_KEY` or other secrets
- ❌ Never commit `.env` files (use `.env.example` instead)
- ❌ Never commit `node_modules/` or build artifacts
- ❌ Use GitHub secrets for workflows

## Security & Configuration

### API Key Management
- Store Gemini keys in `.env.local` or shell profiles ignored by Git
- Reference via CI secrets (`GEMINI_API_KEY`)
- Never hardcode keys in source code
- Use type="password" for API key inputs in UI

### Environment Variables
```bash
# Required for orchestration
GEMINI_API_KEY=your-gemini-key      # Agent 1 & 4
OPENAI_API_KEY=your-openai-key      # Agent 2
ANTHROPIC_API_KEY=your-anthropic-key # Agent 3a & 3b

# Optional for production
NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-key
INFRANODUS_API_KEY=your-infranodus-key
```

### Security Best Practices
- Cap outbound concurrency as described in README's policy table
- Document any deviations inside the corresponding plan markdown
- Treat generated manuals as reviewable artifacts
- Verify policy citations and redact sensitive router or streaming details before publishing
- Use HTTPS for production deployments
- Implement rate limiting for API calls

## Multi-Agent Orchestration Architecture

### Agent Pipeline (v2.0)
This project uses file-based async communication between 4 specialized AI agents:

1. **Gemini 2.5 Pro Ultra** - Research & Planning (10-15 min)
   - Outputs: `research_bundle.json` + 6 plan files
   - Prompts: `prompts/1_gemini_ultra_research.md`

2. **GPT-5 Codex** - System Architecture (5-10 min)
   - Outputs: `architecture.json` + scaffolding
   - Prompts: `prompts/2_gpt5_codex_architecture.md`

3. **Claude Sonnet 4.5** - Frontend & Backend (15-20 min parallel)
   - 3a: Frontend components, Tailwind, i18n, accessibility
   - 3b: API routes, YouTube client, InfraNodus integration, 3 manuals
   - Prompts: `prompts/3a_claude_frontend.md`, `prompts/3b_claude_backend.md`

4. **Gemini 2.5 Pro CLI** - Final Integration (5-10 min)
   - Merges frontend + backend
   - Runs build + tests
   - Performance & accessibility audits
   - Prompts: `prompts/4_gemini_cli_final.md`

### Communication Protocol
- All agents write to `artifacts/` directory
- JSON artifacts follow `schemas/agent-handoff-schema.json`
- Plan files written to `plans/` directory
- Validate all JSON before committing

## Additional Documentation

For more detailed information, refer to:
- **Repository Guidelines**: `AGENTS.md` (comprehensive guidelines for all agents)
- **Main Documentation**: `README.md` (quick start and project overview)
- **Orchestration Suite**: `october/README.md` (detailed orchestration documentation)
- **Browser Integration**: `october/INTEGRATION_README.md` (browser-based Gemini API)
- **Setup Guide**: `SETUP_GUIDE.md` (complete setup instructions)
- **Claude Instructions**: `CLAUDE.md` (instructions for Claude Code)
- **Gemini Instructions**: `GEMINI.md` (instructions for Gemini)
- **Architecture**: `ARCHITECTURE.md` (system architecture details)
- **Router Docs**: `ASUSWRT-MERLIN-DOCS.md` (networking setup)

## Key Principles

1. **Minimal Changes**: Make the smallest possible changes to achieve the goal
2. **Preserve Working Code**: Never delete/remove working files unless absolutely necessary
3. **Follow Patterns**: Mirror existing code patterns and conventions
4. **Documentation**: Keep documentation in sync with code changes
5. **Testing**: Add tests for new functionality
6. **Security**: Never commit secrets or API keys
7. **Accessibility**: Maintain WCAG 2.2 AA compliance
8. **Performance**: Meet performance budgets (LCP <2.5s, CLS <0.1, JS <250KB)
9. **Internationalization**: Support all 6 languages with proper RTL handling
10. **Agent Boundaries**: Respect the multi-agent architecture and communication protocols

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-14  
**Status**: Active Development
