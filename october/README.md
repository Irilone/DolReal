# DolReal - Multi-Agent Orchestration Suite v2.0

**4-Agent Coordinated Build System for Dagar om Lagar 2025**

This project uses **file-based async communication** between 4 specialized AI agents to build a production-ready Next.js streaming platform in 50-70 minutes.

---

## 🤖 Agent Architecture

| Agent | Model | Role | Inputs | Outputs | Runtime |
|-------|-------|------|--------|---------|---------|
| **1. Gemini Ultra** | Gemini 2.5 Pro Ultra | Deep Research + Planning | Project requirements | `research_bundle.json` + 6 plan files | ~10-15 min |
| **2. GPT-5 Codex** | GPT-5 Codex (High Reasoning) | System Architecture | Research bundle | `architecture.json` + scaffolding | ~5-10 min |
| **3a. Claude Frontend** | Claude Sonnet 4.5 | UI Components | Architecture + research | Frontend code, i18n, styles | ~15-20 min |
| **3b. Claude Backend** | Claude Sonnet 4.5 | Services + Docs | Architecture + research | API routes, integrations, docs | ~15-20 min |
| **4. Gemini CLI** | Gemini 2.5 Pro CLI | Final Integration | Both Claude outputs | Production build + release | ~5-10 min |

**Total: 50-70 minutes** (Claudes run in parallel, saving 15-20 min)

---

## 📦 Shared Handoff Bundle Schema

All agents communicate via JSON artifacts in `artifacts/`:

```json
{
  "bundle_version": "2.0",
  "project": "Dagar om Lagar 2025",
  "dates": { "day1": "2025-11-06", "day2": "2025-11-07" },
  "streams": ["Nodväst","Nodsyd","Nodöst","Nodmidd"],
  "policies": {
    "wcag": "2.2 AA",
    "autoplay": "user-gesture-only",
    "youtube_concurrency": "≤12 events per channel"
  },
  "tech_stack": {
    "framework": "Next.js 15",
    "language": "TypeScript",
    "styling": "Tailwind CSS v4",
    "i18n": "i18next"
  },
  "performance": { "LCP":"<2.5 s", "CLS":"<0.1", "JS_budget_kb":250 },
  "locales": ["se","en","ar","fa","zh","es"]
}
```

**Full schema**: [`schemas/agent-handoff-schema.json`](../schemas/agent-handoff-schema.json)

---

## 🚀 Quick Start

### Prerequisites

```bash
# Install Bun (7-100x faster than npm)
curl -fsSL https://bun.sh/install | bash

# Set environment variables
export GEMINI_API_KEY="your-key"
export OPENAI_API_KEY="your-key"
export ANTHROPIC_API_KEY="your-key"
```

### One-Command Execution

```bash
# Clone repo
git clone <repo-url>
cd DolReal

# Install dependencies
bun install

# Run full orchestration (all 4 agents sequentially + parallel Claudes)
make all
```

Or use npm scripts:
```bash
bun run orchestrate
```

---

## 📋 Manual Agent Execution

### Step 1: Research (Gemini Ultra)
```bash
make gemini-ultra
# Output: artifacts/1_gemini_ultra_research.json + plans/*.md
```

### Step 2: Architecture (GPT-5 Codex)
```bash
make gpt5-codex
# Output: artifacts/2_gpt5_codex_architecture.json
```

### Step 3: Parallel Implementation (Both Claudes)
```bash
make claude-parallel
# Output:
#   artifacts/3a_claude_frontend_output.json
#   artifacts/3b_claude_backend_output.json
```

Or run individually:
```bash
make claude-frontend  # Claude #1
make claude-backend   # Claude #2
```

### Step 4: Integration (Gemini CLI)
```bash
make gemini-cli
# Output: artifacts/4_gemini_cli_final.json + releases/*.zip
```

---

## 📂 File-Based Communication Flow

```
1. Gemini Ultra (Research)
   ↓ writes
   artifacts/1_gemini_ultra_research.json
   plans/*.md
   ↓ reads
2. GPT-5 Codex (Architecture)
   ↓ writes
   artifacts/2_gpt5_codex_architecture.json
   ↓ reads (both in parallel)
   ├─→ 3a. Claude Frontend    ───→ artifacts/3a_claude_frontend_output.json
   └─→ 3b. Claude Backend     ───→ artifacts/3b_claude_backend_output.json
                                ↓ reads (both)
                             4. Gemini CLI (Integration)
                                ↓ writes
                             artifacts/4_gemini_cli_final.json
                             releases/dol-2025-v2.0.0.zip
```

---

## 🔍 Status & Monitoring

### Check Completion Status
```bash
make status
```

Output:
```
gemini-ultra: ✓ Complete (artifacts/1_gemini_ultra_research.json)
gpt5-codex: ✓ Complete (artifacts/2_gpt5_codex_architecture.json)
claude-frontend: ✓ Complete (artifacts/3a_claude_frontend_output.json)
claude-backend: ✓ Complete (artifacts/3b_claude_backend_output.json)
gemini-cli: ✗ Pending (artifacts/4_gemini_cli_final.json)
```

### Clean Artifacts
```bash
make clean
```

---

## 🧩 Agent Prompts

Each agent has a detailed prompt file in `prompts/`:

1. [`prompts/1_gemini_ultra_research.md`](../prompts/1_gemini_ultra_research.md)
   - Deep research + policy verification
   - Manual gathering + citations
   - Generates research bundle + 6 plan files

2. [`prompts/2_gpt5_codex_architecture.md`](../prompts/2_gpt5_codex_architecture.md)
   - System architecture design
   - Component tree + API contracts
   - Core scaffolding (package.json, tsconfig, etc.)

3. [`prompts/3a_claude_frontend.md`](../prompts/3a_claude_frontend.md)
   - React/Next.js components
   - Tailwind styling + dark mode
   - i18n (6 languages) + RTL support
   - YouTube IFrame API integration
   - WCAG 2.2 AA accessibility

4. [`prompts/3b_claude_backend.md`](../prompts/3b_claude_backend.md)
   - Next.js API routes
   - YouTube API client
   - InfraNodus + MCP integration
   - Testing setup (Jest)
   - 3 comprehensive manuals

5. [`prompts/4_gemini_cli_final.md`](../prompts/4_gemini_cli_final.md)
   - Merge frontend + backend
   - Run build + tests
   - Performance + accessibility audits
   - Generate release artifacts

---

## 🛠️ Development Commands

```bash
# Orchestration
make all              # Run full pipeline
make status           # Check agent completion
make clean            # Remove artifacts

# Individual Agents
make gemini-ultra     # Agent 1
make gpt5-codex       # Agent 2
make claude-frontend  # Agent 3a
make claude-backend   # Agent 3b
make claude-parallel  # Both Claudes in parallel
make gemini-cli       # Agent 4

# Build & Dev (after orchestration completes)
bun dev               # Start dev server
bun run build         # Production build
bun test              # Run tests
bun run lint          # Lint code
```

---

## 📊 Expected Outputs

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
    ├── .next/                        # Next.js build
    ├── src/                          # Source code
    ├── docs/                         # 3 manuals
    ├── package.json
    ├── README.md
    └── DEPLOYMENT.md
```

### Performance Targets
- **LCP (Largest Contentful Paint)**: <2.5s ✅
- **CLS (Cumulative Layout Shift)**: <0.1 ✅
- **JS Bundle Size**: <250KB ✅
- **Test Coverage**: >80% ✅
- **WCAG Compliance**: 2.2 AA ✅

---

## 🔒 Environment Variables

Create `.env` file (never commit):

```bash
# Gemini API (Ultra + CLI)
GEMINI_API_KEY=your-gemini-key

# OpenAI API (GPT-5 Codex)
OPENAI_API_KEY=your-openai-key

# Anthropic API (2x Claude Sonnet 4.5)
ANTHROPIC_API_KEY=your-anthropic-key

# Application (for final build)
NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-key
INFRANODUS_API_KEY=your-infranodus-key
NODVAST_YOUTUBE_ID=stream-id-1
NODSYD_YOUTUBE_ID=stream-id-2
NODOST_YOUTUBE_ID=stream-id-3
NODMIDD_YOUTUBE_ID=stream-id-4
```

---

## 🎯 Project Requirements

### Event Details
- **Name**: Dagar om Lagar 2025
- **Dates**: November 6-7, 2025
- **Streams**: 4 simultaneous (Nodväst, Nodsyd, Nodöst, Nodmidd)
- **Day 2 Logic**: Only Nodväst active

### Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + dark mode
- **i18n**: react-i18next (se, en, ar, fa, zh, es)
- **Streaming**: YouTube Live (4 concurrent channels)
- **Knowledge Graph**: InfraNodus (modal embed)

### Integrations
- YouTube IFrame API (one active player)
- InfraNodus (MCP + fallback iframe)
- ASUS RT-AX86U Pro (QoS via Asuswrt-Merlin)
- OBS Studio (multi-RTMP plugin)

### Accessibility
- WCAG 2.2 AA compliant
- Keyboard navigation
- Screen reader support
- RTL support (Arabic/Farsi)
- Focus management

---

## 📚 Documentation

After orchestration completes, find these in `docs/manuals/`:

1. **Integrated System Guide** - Router + OBS + YouTube setup
2. **Node Operator Quick Start** - Event day operations
3. **DoL 2025 Webapp Guide (SE)** - User guide in Swedish

---

## 🔧 Troubleshooting

### Agent Fails
```bash
# Check logs
cat logs/gemini-ultra.log

# Re-run specific agent
make gemini-ultra
```

### Missing Environment Variables
```bash
# Verify all keys set
make check-env
```

### Build Failures
```bash
# Clean and restart
make clean
make all
```

---

## 🏗️ Architecture Highlights

### Why 4 Agents?
- **Specialization**: Each agent optimized for specific task
- **Parallelization**: Claudes work simultaneously (saves 15-20 min)
- **File-based**: No complex message queues, just JSON handoffs
- **Traceable**: Every artifact has metadata (timestamp, execution time)

### Why These Models?
- **Gemini 2.5 Pro Ultra**: Best for deep research + manual gathering
- **GPT-5 Codex**: Strongest code architecture + system design
- **Claude Sonnet 4.5**: Excellent balance of speed + code quality
- **Gemini CLI**: Fast final integration + build orchestration

### Async Communication Benefits
- ✅ Agents can be re-run independently
- ✅ Clear handoff contracts (JSON schema)
- ✅ Human review possible between stages
- ✅ Debugging via artifact inspection
- ✅ No network latency between agents

---

## 🚧 CI/CD Integration

### GitHub Actions
```yaml
# .github/workflows/orchestrate.yml
on: [workflow_dispatch, push]
jobs:
  orchestrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: make all
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      - uses: actions/upload-artifact@v4
        with:
          name: dol-2025-release
          path: releases/*.zip
```

---

## 📄 License

MIT

---

## 🙏 Credits

**Multi-Agent Orchestration Suite v2.0**
- Designed for Dagar om Lagar 2025 event
- File-based async communication
- 4 specialized AI agents working in coordinated pipeline
- Built with Bun, TypeScript, Next.js 15

**Agent Contributions**:
1. Gemini 2.5 Pro Ultra: Research & Planning
2. GPT-5 Codex: System Architecture
3. Claude Sonnet 4.5 #1: Frontend Implementation
4. Claude Sonnet 4.5 #2: Backend & Documentation
5. Gemini 2.5 Pro CLI: Final Integration

---

**Ready to build?**
```bash
make all
```
