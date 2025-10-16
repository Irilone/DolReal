# DolReal - Dagar om Lagar 2025

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)

[English](#english) | [Svenska](#svenska)

---

## English

### 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup with Claude Code CLI](#setup-with-claude-code-cli)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)
- [Multi-Agent Orchestration](#multi-agent-orchestration)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

### Overview

**DolReal** is a production-ready streaming event platform for "Dagar om Lagar 2025" (Days about Laws 2025). It's built as a multi-agent orchestration suite that uses coordinated AI agents to build and maintain a Next.js 15 application through file-based async communication.

**Event Details:**
- **Name**: Dagar om Lagar 2025
- **Dates**: November 6-7, 2025
- **Streams**: 4 simultaneous live streams (Nodväst, Nodsyd, Nodöst, Nodmidd)
- **Platform**: YouTube Live with integrated knowledge graph via InfraNodus

### Features

✅ **Multi-Stream Live Video**
- 4 concurrent YouTube live streams
- Seamless day-two transition (only Nodväst active on day 2)
- YouTube IFrame API integration

✅ **Internationalization**
- Support for 6 languages: Swedish (se), English (en), Arabic (ar), Farsi (fa), Chinese (zh), Spanish (es)
- RTL (right-to-left) support for Arabic and Farsi
- react-i18next integration

✅ **Knowledge Graph Integration**
- InfraNodus integration for real-time knowledge visualization
- MCP (Model Context Protocol) with iframe fallback

✅ **Accessibility & Performance**
- WCAG 2.2 AA compliant
- Performance targets: LCP <2.5s, CLS <0.1
- Dark mode support
- Optimized bundle size <250KB

✅ **Multi-Agent Architecture**
- 4-stage AI agent pipeline
- File-based async communication
- Automated build and deployment

### Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Next.js (App Router) | 15.0.0 |
| **Language** | TypeScript (strict mode) | 5.3 |
| **UI Library** | React | 18.3 |
| **Styling** | Tailwind CSS | 3.4 |
| **i18n** | react-i18next | 14.0.0 |
| **State Management** | Zustand | 4.5.0 |
| **Package Manager** | Bun (preferred) / npm | 1.0+ / 20+ |
| **Testing** | Jest + React Testing Library | 29.7 |
| **Linting** | ESLint + Prettier (via Trunk) | 8.56 |
| **Build Tools** | Vite | 7.1.10 |

**Key Integrations:**
- YouTube Live API
- InfraNodus API
- Google APIs (googleapis)

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.0.0 or higher
  ```bash
  node --version  # Should be v20.0.0+
  ```

- **Bun** (recommended) or **npm**: Version 1.0.0 or higher
  ```bash
  bun --version   # Should be 1.0.0+
  # OR
  npm --version   # Should be 10.0.0+
  ```

- **Git**: For version control
  ```bash
  git --version
  ```

- **API Keys**: You'll need API keys for:
  - Gemini API (for AI agents)
  - OpenAI API (for GPT-5 Codex)
  - Anthropic API (for Claude Sonnet)
  - YouTube API (optional, for production)
  - InfraNodus API (optional, for knowledge graph)

### Installation

#### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Irilone/DolReal.git

# Navigate to the project directory
cd DolReal
```

#### Step 2: Install Dependencies

Choose either Bun (recommended for faster installation) or npm:

**Option A: Using Bun (Recommended)**
```bash
# Install Bun if not already installed
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install
```

**Option B: Using npm**
```bash
# Install dependencies
npm install
```

#### Step 3: Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your API keys
nano .env  # or use your preferred editor
```

**Required environment variables:**
```env
# AI Agent API Keys (for orchestration)
GEMINI_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Optional Production Keys
NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-api-key
INFRANODUS_API_KEY=your-infranodus-api-key
```

#### Step 4: Verify Environment Setup

```bash
# Check that all required environment variables are set
make check-env

# OR using Bun
bun run scripts/check-env.ts

# OR using npm
npm run check-env
```

### Setup with Claude Code CLI

**Claude Code CLI** is a powerful tool for AI-assisted development. Here's how to set it up and use it with this project:

#### Installing Claude Code CLI

```bash
# Install Claude Code CLI globally
npm install -g @anthropic-ai/claude-code-cli

# OR using Bun
bun install -g @anthropic-ai/claude-code-cli

# Verify installation
claude --version
```

#### Configuring Claude Code CLI

1. **Set up your Anthropic API key:**
```bash
# Add to your shell profile (~/.bashrc, ~/.zshrc, etc.)
export ANTHROPIC_API_KEY="your-anthropic-api-key"

# Reload your shell
source ~/.bashrc  # or ~/.zshrc
```

2. **Initialize Claude Code in the project:**
```bash
cd DolReal
claude init
```

#### Using Claude Code CLI for Development

**1. Code Review and Suggestions:**
```bash
# Get AI suggestions for a specific file
claude review src/app/page.tsx

# Get suggestions for the entire project
claude review .
```

**2. Generate Components:**
```bash
# Generate a new React component
claude generate component StreamCard --props "title:string, isLive:boolean"

# Generate a new page
claude generate page archive --route "/[lang]/archive"
```

**3. Debugging Assistance:**
```bash
# Get help debugging an error
claude debug "TypeError: Cannot read property 'map' of undefined"

# Analyze build errors
npm run build 2>&1 | claude debug
```

**4. Code Refactoring:**
```bash
# Refactor a component
claude refactor src/components/StreamCard.tsx --goal "improve performance"

# Optimize bundle size
claude optimize --target "reduce bundle size"
```

**5. AI-Assisted Development Workflow:**
```bash
# Start an interactive session
claude chat

# In the chat, you can:
# - Ask questions about the codebase
# - Request code changes
# - Get explanations of complex code
# - Generate tests
```

**6. Building with Claude Code:**
```bash
# Let Claude help with the build process
claude build

# This will:
# - Analyze the build configuration
# - Suggest optimizations
# - Help fix build errors
# - Verify the output
```

**7. Testing with Claude Code:**
```bash
# Generate tests for a component
claude test generate src/components/StreamCard.tsx

# Fix failing tests
npm test 2>&1 | claude test fix

# Improve test coverage
claude test coverage --target 80
```

#### Claude Code CLI Best Practices

1. **Use Descriptive Prompts:**
   ```bash
   # Good
   claude generate "A responsive StreamCard component with loading state and error handling"
   
   # Less effective
   claude generate "component"
   ```

2. **Leverage Context:**
   ```bash
   # Provide context for better results
   claude review src/app/[lang]/page.tsx --context "This is a Next.js 15 internationalized page"
   ```

3. **Iterate with Feedback:**
   ```bash
   # Start with generation
   claude generate component VideoPlayer
   
   # Then refine
   claude refactor src/components/VideoPlayer.tsx --feedback "add keyboard controls"
   ```

4. **Use for Documentation:**
   ```bash
   # Generate documentation
   claude doc src/lib/youtube-client.ts

   # Create API documentation
   claude doc api --output docs/api.md
   ```

### Development

#### Running the Development Server

**Using Next.js (Recommended):**
```bash
# Start the Next.js development server
npm run dev

# OR using Bun
bun run dev
```

The application will be available at `http://localhost:3000`

**Using Vite (Alternative):**
```bash
# Start the Vite development server
npm run dev:vite

# OR using Bun
bun run dev:vite
```

**Using Deno (Alternative):**
```bash
# Start with Deno
npm run start:deno
```

#### Live Development Features

- **Hot Module Replacement (HMR)**: Changes are reflected instantly
- **Fast Refresh**: React components update without losing state
- **TypeScript Checking**: Real-time type checking in your editor
- **Auto Port Selection**: If port 3000 is busy, Next.js will use the next available port

#### Development Workflow

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Make changes to the code** in your editor

3. **View changes instantly** in your browser at `http://localhost:3000`

4. **Check for TypeScript errors:**
   ```bash
   npm run typecheck
   ```

5. **Run linter:**
   ```bash
   npm run lint
   
   # OR use Trunk for comprehensive checking
   trunk check
   ```

6. **Format code:**
   ```bash
   npm run format
   ```

### Building

#### Production Build

```bash
# Create an optimized production build
npm run build

# OR using Bun
bun run build
```

This will:
- Compile TypeScript to JavaScript
- Bundle and minify all assets
- Optimize images
- Generate static pages where possible
- Create the `.next` directory with build output

#### Build Output

After building, you'll see:
- `.next/` - Next.js build output
- `out/` - Static export (if configured)
- Build statistics and bundle analysis

#### Analyzing Build Size

```bash
# Build and analyze bundle size
npm run build && npx @next/bundle-analyzer
```

#### Production Build with Vite

```bash
# Alternative build using Vite
npm run build:vite
```

### Testing

#### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

#### Test Coverage Goals

- **Target Coverage**: >80%
- **Critical Paths**: API calls, state management, user interactions
- **Accessibility**: Keyboard navigation, screen reader support

#### Testing Strategy

1. **Unit Tests**: Test individual components and functions
   ```bash
   # Test a specific component
   npm test -- StreamCard.test.tsx
   ```

2. **Integration Tests**: Test component interactions
   ```bash
   # Test a feature
   npm test -- features/
   ```

3. **Accessibility Tests**: Ensure WCAG compliance
   ```bash
   # Run accessibility tests
   npm test -- --testNamePattern="accessibility"
   ```

#### Writing Tests

Tests are located in the `tests/` directory and co-located with components:

```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import StreamCard from '@/components/features/StreamCard';

describe('StreamCard', () => {
  it('renders stream title', () => {
    render(<StreamCard title="Nodväst" isLive={true} />);
    expect(screen.getByText('Nodväst')).toBeInTheDocument();
  });
});
```

### Multi-Agent Orchestration

This project uses a unique 4-stage AI agent pipeline for development:

#### Agent Pipeline Overview

```
Agent 1 (Gemini 2.5 Pro Ultra)
    ↓ research_bundle.json
Agent 2 (GPT-5 Codex)
    ↓ architecture.json
Agent 3a (Claude Sonnet 4.5) ──┐
Agent 3b (Claude Sonnet 4.5) ──┤ (parallel)
    ↓ frontend.json + backend.json
Agent 4 (Gemini 2.5 Pro CLI)
    ↓ final build + tests
```

#### Running the Full Orchestration

**Complete Pipeline (50-70 minutes):**
```bash
# Run all agents sequentially
make all

# OR
npm run orchestrate
```

#### Running Individual Agents

**Agent 1: Research & Planning (10-15 min)**
```bash
make gemini-ultra

# OR
npm run gem:research
```
- Outputs: `research_bundle.json` + 6 plan files
- Uses: Gemini 2.5 Pro Ultra

**Agent 2: System Architecture (5-10 min)**
```bash
make gpt5-codex

# OR
npm run gpt:arch
```
- Outputs: `architecture.json` + scaffolding
- Uses: GPT-5 Codex

**Agent 3: Frontend & Backend (15-20 min parallel)**
```bash
# Run both in parallel
make claude-parallel

# OR run individually
make claude-frontend  # Agent 3a
make claude-backend   # Agent 3b

# Using npm
npm run claude:frontend
npm run claude:backend
```
- Agent 3a: Frontend components, Tailwind, i18n, accessibility
- Agent 3b: API routes, YouTube client, InfraNodus integration
- Uses: Claude Sonnet 4.5

**Agent 4: Final Integration (5-10 min)**
```bash
make gemini-cli

# OR
npm run gem:integrate
```
- Merges frontend + backend
- Runs build + tests
- Performance & accessibility audits
- Uses: Gemini 2.5 Pro CLI

#### Checking Agent Status

```bash
# Check which agents have completed
make status

# View agent logs
make logs

# Clean all artifacts
make clean
```

#### Agent Communication Protocol

All agents communicate via JSON artifacts following the schema in `schemas/agent-handoff-schema.json`:

```json
{
  "agent": "agent-name",
  "timestamp": "ISO-8601",
  "status": "success|error",
  "outputs": [],
  "nextAgent": "next-agent-name"
}
```

### Project Structure

```
DolReal/
├── .github/                      # GitHub workflows and configurations
│   ├── workflows/               # CI/CD pipelines
│   └── copilot-instructions.md  # AI assistant instructions
├── artifacts/                   # Generated artifacts from AI agents
├── docs/                        # Documentation
├── logs/                        # Agent execution logs
├── plans/                       # Planning documents
│   ├── router_plan.md
│   ├── obs_plan.md
│   ├── yt_plan.md
│   └── ...
├── prompts/                     # Agent prompts
│   ├── 1_gemini_ultra_research.md
│   ├── 2_gpt5_codex_architecture.md
│   ├── 3a_claude_frontend.md
│   ├── 3b_claude_backend.md
│   └── 4_gemini_cli_final.md
├── schemas/                     # JSON schemas
│   └── agent-handoff-schema.json
├── scripts/                     # TypeScript orchestration scripts
│   ├── gem.ts                  # Gemini wrapper
│   ├── anthropic.ts            # Anthropic wrapper
│   ├── openai.ts               # OpenAI wrapper
│   ├── orchestrate.ts          # Main orchestrator
│   ├── run-agent.ts            # Individual agent runner
│   └── check-env.ts            # Environment checker
├── src/                         # Next.js application source
│   ├── app/                    # Next.js 15 App Router
│   │   └── [lang]/            # Internationalized routes
│   │       ├── page.tsx       # Home page
│   │       ├── archive/       # Archive page
│   │       └── layout.tsx     # Root layout
│   ├── components/             # React components
│   │   ├── features/          # Feature-specific components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── i18n/                   # Internationalization
│   │   ├── config.ts
│   │   └── locales/           # Translation files
│   ├── lib/                    # Utility functions
│   ├── stores/                 # Zustand state stores
│   ├── types/                  # TypeScript type definitions
│   └── main.tsx               # Entry point
├── tests/                       # Test files
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── Makefile                    # Build automation
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.cjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── jest.config.ts              # Jest configuration
├── AGENTS.md                   # Repository guidelines
├── CLAUDE.md                   # Claude-specific instructions
├── GEMINI.md                   # Gemini-specific instructions
├── LICENSE                     # MIT License
└── README.md                   # This file
```

### Configuration

#### Environment Variables

Create a `.env` file in the root directory:

```env
# AI Agent API Keys
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Production API Keys (Optional)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
INFRANODUS_API_KEY=your_infranodus_api_key

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

#### Next.js Configuration

Edit `next.config.js` to customize Next.js behavior:

```javascript
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['se', 'en', 'ar', 'fa', 'zh', 'es'],
    defaultLocale: 'se',
  },
  // ... more configuration
};
```

#### Tailwind Configuration

Customize styling in `tailwind.config.cjs`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      // Custom colors, fonts, etc.
    },
  },
  // ... more configuration
};
```

### Deployment

#### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Production Deployment:**
   ```bash
   vercel --prod
   ```

#### Docker

1. **Build Docker Image:**
   ```bash
   docker build -t dolreal .
   ```

2. **Run Container:**
   ```bash
   docker run -p 3000:3000 --env-file .env dolreal
   ```

#### Manual Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

3. **Configure your web server** (nginx, Apache, etc.) to proxy to the Next.js server

### Troubleshooting

#### Common Issues

**1. Port Already in Use**
```bash
# Error: Port 3000 is already in use

# Solution: Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

**2. Module Not Found Errors**
```bash
# Error: Cannot find module 'X'

# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**3. API Key Not Working**
```bash
# Error: Invalid API key

# Solution: Verify your .env file
cat .env | grep API_KEY

# Ensure no spaces around the = sign
# Correct:   GEMINI_API_KEY=abc123
# Incorrect: GEMINI_API_KEY = abc123
```

**4. Build Failures**
```bash
# Error: Build failed

# Solution: Check TypeScript errors
npm run typecheck

# Fix errors and rebuild
npm run build
```

**5. Orchestration Failures**
```bash
# Error: Agent X failed

# Solution: Check agent logs
cat logs/X_agent.log

# Verify API keys
make check-env

# Re-run specific agent
make agent-name
```

#### Getting Help

- **Documentation**: Check `docs/` directory for detailed guides
- **Issues**: [GitHub Issues](https://github.com/Irilone/DolReal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Irilone/DolReal/discussions)
- **Email**: Contact the DoL 2025 Team

### Contributing

We welcome contributions! Here's how to get started:

#### Development Process

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/DolReal.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding style guidelines
   - Write tests for new features
   - Update documentation as needed

4. **Run tests and linting**
   ```bash
   npm run typecheck
   npm run lint
   npm test
   trunk check
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template

#### Code Style Guidelines

- **TypeScript**: Use strict mode, explicit types
- **React**: Functional components with hooks
- **Naming**: 
  - Components: PascalCase (`StreamCard`)
  - Functions: camelCase (`fetchStreamData`)
  - Files: kebab-case (`stream-card.tsx`)
- **Formatting**: 2 spaces, enforced by Prettier
- **Comments**: JSDoc for functions, brief inline comments
- **Imports**: Group by: React → Next.js → External → Internal

#### Testing Requirements

- All new features must include tests
- Maintain >80% code coverage
- Test critical paths and edge cases
- Include accessibility tests

#### Documentation Requirements

- Update README.md if adding new features
- Add inline comments for complex logic
- Update API documentation
- Include Swedish translations

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Svenska

### 📖 Innehållsförteckning
- [Översikt](#översikt)
- [Funktioner](#funktioner)
- [Teknisk stack](#teknisk-stack)
- [Förutsättningar](#förutsättningar)
- [Installation](#installation-sv)
- [Konfiguration med Claude Code CLI](#konfiguration-med-claude-code-cli)
- [Utveckling](#utveckling-sv)
- [Bygga](#bygga-sv)
- [Testning](#testning-sv)
- [Multi-Agent Orkestrering](#multi-agent-orkestrering-sv)
- [Projektstruktur](#projektstruktur-sv)
- [Konfiguration](#konfiguration-sv)
- [Driftsättning](#driftsättning)
- [Felsökning](#felsökning-sv)
- [Bidra](#bidra-sv)
- [Licens](#licens-sv)

### Översikt

**DolReal** är en produktionsklar streamingplattform för evenemanget "Dagar om Lagar 2025". Den är byggd som en multi-agent orkestreringssvit som använder koordinerade AI-agenter för att bygga och underhålla en Next.js 15-applikation genom filbaserad asynkron kommunikation.

**Evenemangsdetaljer:**
- **Namn**: Dagar om Lagar 2025
- **Datum**: 6-7 november 2025
- **Strömmar**: 4 samtidiga liveströmmar (Nodväst, Nodsyd, Nodöst, Nodmidd)
- **Plattform**: YouTube Live med integrerad kunskapsgraf via InfraNodus

### Funktioner

✅ **Multi-Stream Live Video**
- 4 samtidiga YouTube-liveströmmar
- Sömlös övergång dag två (endast Nodväst aktiv dag 2)
- YouTube IFrame API-integration

✅ **Internationalisering**
- Stöd för 6 språk: Svenska (se), Engelska (en), Arabiska (ar), Farsi (fa), Kinesiska (zh), Spanska (es)
- RTL (höger-till-vänster) stöd för arabiska och farsi
- react-i18next integration

✅ **Kunskapsgraf-integration**
- InfraNodus-integration för realtidsvisualisering av kunskap
- MCP (Model Context Protocol) med iframe-fallback

✅ **Tillgänglighet & Prestanda**
- WCAG 2.2 AA-kompatibel
- Prestandamål: LCP <2.5s, CLS <0.1
- Stöd för mörkt läge
- Optimerad paketstorlek <250KB

✅ **Multi-Agent Arkitektur**
- 4-stegs AI-agentpipeline
- Filbaserad asynkron kommunikation
- Automatiserad byggning och driftsättning

### Teknisk Stack

| Komponent | Teknologi | Version |
|-----------|-----------|---------|
| **Ramverk** | Next.js (App Router) | 15.0.0 |
| **Språk** | TypeScript (strikt läge) | 5.3 |
| **UI-bibliotek** | React | 18.3 |
| **Styling** | Tailwind CSS | 3.4 |
| **i18n** | react-i18next | 14.0.0 |
| **State Management** | Zustand | 4.5.0 |
| **Pakethanterare** | Bun (föredragen) / npm | 1.0+ / 20+ |
| **Testning** | Jest + React Testing Library | 29.7 |
| **Linting** | ESLint + Prettier (via Trunk) | 8.56 |
| **Byggverktyg** | Vite | 7.1.10 |

**Nyckelintegrationer:**
- YouTube Live API
- InfraNodus API
- Google APIs (googleapis)

### Förutsättningar

Innan du börjar, se till att du har följande installerat:

- **Node.js**: Version 20.0.0 eller högre
  ```bash
  node --version  # Ska vara v20.0.0+
  ```

- **Bun** (rekommenderas) eller **npm**: Version 1.0.0 eller högre
  ```bash
  bun --version   # Ska vara 1.0.0+
  # ELLER
  npm --version   # Ska vara 10.0.0+
  ```

- **Git**: För versionskontroll
  ```bash
  git --version
  ```

- **API-nycklar**: Du behöver API-nycklar för:
  - Gemini API (för AI-agenter)
  - OpenAI API (för GPT-5 Codex)
  - Anthropic API (för Claude Sonnet)
  - YouTube API (valfritt, för produktion)
  - InfraNodus API (valfritt, för kunskapsgraf)

### Installation (SV)

#### Steg 1: Klona Repositoriet

```bash
# Klona repositoriet
git clone https://github.com/Irilone/DolReal.git

# Navigera till projektkatalogen
cd DolReal
```

#### Steg 2: Installera Beroenden

Välj antingen Bun (rekommenderas för snabbare installation) eller npm:

**Alternativ A: Använda Bun (Rekommenderas)**
```bash
# Installera Bun om det inte redan är installerat
curl -fsSL https://bun.sh/install | bash

# Installera beroenden
bun install
```

**Alternativ B: Använda npm**
```bash
# Installera beroenden
npm install
```

#### Steg 3: Konfigurera Miljövariabler

```bash
# Kopiera exempel-miljöfilen
cp .env.example .env

# Redigera .env-filen med dina API-nycklar
nano .env  # eller använd din föredragna editor
```

**Obligatoriska miljövariabler:**
```env
# AI-Agent API-nycklar (för orkestrering)
GEMINI_API_KEY=din-gemini-api-nyckel-här
OPENAI_API_KEY=din-openai-api-nyckel-här
ANTHROPIC_API_KEY=din-anthropic-api-nyckel-här

# Valfria Produktionsnycklar
NEXT_PUBLIC_YOUTUBE_API_KEY=din-youtube-api-nyckel
INFRANODUS_API_KEY=din-infranodus-api-nyckel
```

#### Steg 4: Verifiera Miljökonfiguration

```bash
# Kontrollera att alla nödvändiga miljövariabler är konfigurerade
make check-env

# ELLER med Bun
bun run scripts/check-env.ts

# ELLER med npm
npm run check-env
```

### Konfiguration med Claude Code CLI

**Claude Code CLI** är ett kraftfullt verktyg för AI-assisterad utveckling. Här är hur du konfigurerar och använder det med detta projekt:

#### Installera Claude Code CLI

```bash
# Installera Claude Code CLI globalt
npm install -g @anthropic-ai/claude-code-cli

# ELLER med Bun
bun install -g @anthropic-ai/claude-code-cli

# Verifiera installation
claude --version
```

#### Konfigurera Claude Code CLI

1. **Konfigurera din Anthropic API-nyckel:**
```bash
# Lägg till i din shell-profil (~/.bashrc, ~/.zshrc, etc.)
export ANTHROPIC_API_KEY="din-anthropic-api-nyckel"

# Ladda om din shell
source ~/.bashrc  # eller ~/.zshrc
```

2. **Initiera Claude Code i projektet:**
```bash
cd DolReal
claude init
```

#### Använda Claude Code CLI för Utveckling

**1. Kodgranskning och Förslag:**
```bash
# Få AI-förslag för en specifik fil
claude review src/app/page.tsx

# Få förslag för hela projektet
claude review .
```

**2. Generera Komponenter:**
```bash
# Generera en ny React-komponent
claude generate component StreamCard --props "title:string, isLive:boolean"

# Generera en ny sida
claude generate page archive --route "/[lang]/archive"
```

**3. Felsökningshjälp:**
```bash
# Få hjälp med att felsöka ett fel
claude debug "TypeError: Cannot read property 'map' of undefined"

# Analysera byggfel
npm run build 2>&1 | claude debug
```

**4. Kodomstrukturering:**
```bash
# Omstrukturera en komponent
claude refactor src/components/StreamCard.tsx --goal "förbättra prestanda"

# Optimera paketstorlek
claude optimize --target "minska paketstorlek"
```

**5. AI-assisterad Utvecklingsworkflow:**
```bash
# Starta en interaktiv session
claude chat

# I chatten kan du:
# - Ställa frågor om kodbasen
# - Begära kodändringar
# - Få förklaringar av komplex kod
# - Generera tester
```

**6. Bygga med Claude Code:**
```bash
# Låt Claude hjälpa till med byggprocessen
claude build

# Detta kommer att:
# - Analysera byggkonfigurationen
# - Föreslå optimeringar
# - Hjälpa till att fixa byggfel
# - Verifiera utdata
```

**7. Testning med Claude Code:**
```bash
# Generera tester för en komponent
claude test generate src/components/StreamCard.tsx

# Fixa misslyckade tester
npm test 2>&1 | claude test fix

# Förbättra testtäckning
claude test coverage --target 80
```

#### Bästa Praxis för Claude Code CLI

1. **Använd Beskrivande Prompter:**
   ```bash
   # Bra
   claude generate "En responsiv StreamCard-komponent med laddningstillstånd och felhantering"
   
   # Mindre effektivt
   claude generate "komponent"
   ```

2. **Utnyttja Kontext:**
   ```bash
   # Ge kontext för bättre resultat
   claude review src/app/[lang]/page.tsx --context "Detta är en Next.js 15 internationaliserad sida"
   ```

3. **Iterera med Feedback:**
   ```bash
   # Börja med generering
   claude generate component VideoPlayer
   
   # Förfina sedan
   claude refactor src/components/VideoPlayer.tsx --feedback "lägg till tangentbordskontroller"
   ```

4. **Använd för Dokumentation:**
   ```bash
   # Generera dokumentation
   claude doc src/lib/youtube-client.ts

   # Skapa API-dokumentation
   claude doc api --output docs/api.md
   ```

### Utveckling (SV)

#### Köra Utvecklingsservern

**Använda Next.js (Rekommenderas):**
```bash
# Starta Next.js utvecklingsservern
npm run dev

# ELLER med Bun
bun run dev
```

Applikationen kommer att vara tillgänglig på `http://localhost:3000`

**Använda Vite (Alternativ):**
```bash
# Starta Vite utvecklingsservern
npm run dev:vite

# ELLER med Bun
bun run dev:vite
```

**Använda Deno (Alternativ):**
```bash
# Starta med Deno
npm run start:deno
```

#### Live Utvecklingsfunktioner

- **Hot Module Replacement (HMR)**: Ändringar reflekteras omedelbart
- **Fast Refresh**: React-komponenter uppdateras utan att förlora tillstånd
- **TypeScript-kontroll**: Realtids typkontroll i din editor
- **Automatiskt Portval**: Om port 3000 är upptagen kommer Next.js att använda nästa tillgängliga port

#### Utvecklingsworkflow

1. **Starta utvecklingsservern:**
   ```bash
   npm run dev
   ```

2. **Gör ändringar i koden** i din editor

3. **Se ändringar omedelbart** i din webbläsare på `http://localhost:3000`

4. **Kontrollera TypeScript-fel:**
   ```bash
   npm run typecheck
   ```

5. **Kör linter:**
   ```bash
   npm run lint
   
   # ELLER använd Trunk för omfattande kontroll
   trunk check
   ```

6. **Formatera kod:**
   ```bash
   npm run format
   ```

### Bygga (SV)

#### Produktionsbygge

```bash
# Skapa en optimerad produktionsbygge
npm run build

# ELLER med Bun
bun run build
```

Detta kommer att:
- Kompilera TypeScript till JavaScript
- Paketera och minifiera alla tillgångar
- Optimera bilder
- Generera statiska sidor där det är möjligt
- Skapa `.next`-katalogen med byggutdata

#### Byggutdata

Efter byggning kommer du att se:
- `.next/` - Next.js byggutdata
- `out/` - Statisk export (om konfigurerad)
- Byggstatistik och paketanalys

#### Analysera Byggstorlek

```bash
# Bygg och analysera paketstorlek
npm run build && npx @next/bundle-analyzer
```

#### Produktionsbygge med Vite

```bash
# Alternativ byggning med Vite
npm run build:vite
```

### Testning (SV)

#### Köra Tester

```bash
# Kör alla tester en gång
npm test

# Kör tester i watch-läge
npm run test:watch

# Kör tester med täckning
npm run test:coverage
```

#### Testtäckningsmål

- **Måltäckning**: >80%
- **Kritiska Vägar**: API-anrop, tillståndshantering, användarinteraktioner
- **Tillgänglighet**: Tangentbordsnavigering, skärmläsarstöd

#### Testningsstrategi

1. **Enhetstester**: Testa enskilda komponenter och funktioner
   ```bash
   # Testa en specifik komponent
   npm test -- StreamCard.test.tsx
   ```

2. **Integrationstester**: Testa komponentinteraktioner
   ```bash
   # Testa en funktion
   npm test -- features/
   ```

3. **Tillgänglighetstester**: Säkerställ WCAG-efterlevnad
   ```bash
   # Kör tillgänglighetstester
   npm test -- --testNamePattern="accessibility"
   ```

#### Skriva Tester

Tester finns i `tests/`-katalogen och är samlokaliserade med komponenter:

```typescript
// Exempel på teststruktur
import { render, screen } from '@testing-library/react';
import StreamCard from '@/components/features/StreamCard';

describe('StreamCard', () => {
  it('renderar strömtitel', () => {
    render(<StreamCard title="Nodväst" isLive={true} />);
    expect(screen.getByText('Nodväst')).toBeInTheDocument();
  });
});
```

### Multi-Agent Orkestrering (SV)

Detta projekt använder en unik 4-stegs AI-agentpipeline för utveckling:

#### Översikt över Agentpipeline

```
Agent 1 (Gemini 2.5 Pro Ultra)
    ↓ research_bundle.json
Agent 2 (GPT-5 Codex)
    ↓ architecture.json
Agent 3a (Claude Sonnet 4.5) ──┐
Agent 3b (Claude Sonnet 4.5) ──┤ (parallellt)
    ↓ frontend.json + backend.json
Agent 4 (Gemini 2.5 Pro CLI)
    ↓ slutlig byggning + tester
```

#### Köra Fullständig Orkestrering

**Komplett Pipeline (50-70 minuter):**
```bash
# Kör alla agenter sekventiellt
make all

# ELLER
npm run orchestrate
```

#### Köra Enskilda Agenter

**Agent 1: Forskning & Planering (10-15 min)**
```bash
make gemini-ultra

# ELLER
npm run gem:research
```
- Utdata: `research_bundle.json` + 6 planfiler
- Använder: Gemini 2.5 Pro Ultra

**Agent 2: Systemarkitektur (5-10 min)**
```bash
make gpt5-codex

# ELLER
npm run gpt:arch
```
- Utdata: `architecture.json` + grundstruktur
- Använder: GPT-5 Codex

**Agent 3: Frontend & Backend (15-20 min parallellt)**
```bash
# Kör båda parallellt
make claude-parallel

# ELLER kör individuellt
make claude-frontend  # Agent 3a
make claude-backend   # Agent 3b

# Med npm
npm run claude:frontend
npm run claude:backend
```
- Agent 3a: Frontend-komponenter, Tailwind, i18n, tillgänglighet
- Agent 3b: API-rutter, YouTube-klient, InfraNodus-integration
- Använder: Claude Sonnet 4.5

**Agent 4: Slutlig Integration (5-10 min)**
```bash
make gemini-cli

# ELLER
npm run gem:integrate
```
- Sammanför frontend + backend
- Kör byggning + tester
- Prestanda- & tillgänglighetsgranskning
- Använder: Gemini 2.5 Pro CLI

#### Kontrollera Agentstatus

```bash
# Kontrollera vilka agenter som har slutförts
make status

# Visa agentloggar
make logs

# Rensa alla artefakter
make clean
```

#### Kommunikationsprotokoll för Agenter

Alla agenter kommunicerar via JSON-artefakter som följer schemat i `schemas/agent-handoff-schema.json`:

```json
{
  "agent": "agent-namn",
  "timestamp": "ISO-8601",
  "status": "success|error",
  "outputs": [],
  "nextAgent": "nästa-agent-namn"
}
```

### Projektstruktur (SV)

```
DolReal/
├── .github/                      # GitHub workflows och konfigurationer
│   ├── workflows/               # CI/CD pipelines
│   └── copilot-instructions.md  # AI-assistentinstruktioner
├── artifacts/                   # Genererade artefakter från AI-agenter
├── docs/                        # Dokumentation
├── logs/                        # Agentexekveringsloggar
├── plans/                       # Planeringsdokument
│   ├── router_plan.md
│   ├── obs_plan.md
│   ├── yt_plan.md
│   └── ...
├── prompts/                     # Agentprompter
│   ├── 1_gemini_ultra_research.md
│   ├── 2_gpt5_codex_architecture.md
│   ├── 3a_claude_frontend.md
│   ├── 3b_claude_backend.md
│   └── 4_gemini_cli_final.md
├── schemas/                     # JSON-scheman
│   └── agent-handoff-schema.json
├── scripts/                     # TypeScript-orkestreringsscript
│   ├── gem.ts                  # Gemini wrapper
│   ├── anthropic.ts            # Anthropic wrapper
│   ├── openai.ts               # OpenAI wrapper
│   ├── orchestrate.ts          # Huvudorkestrerare
│   ├── run-agent.ts            # Individuell agentkörare
│   └── check-env.ts            # Miljökontrollerare
├── src/                         # Next.js applikationskälla
│   ├── app/                    # Next.js 15 App Router
│   │   └── [lang]/            # Internationaliserade rutter
│   │       ├── page.tsx       # Startsida
│   │       ├── archive/       # Arkivsida
│   │       └── layout.tsx     # Rotlayout
│   ├── components/             # React-komponenter
│   │   ├── features/          # Funktionsspecifika komponenter
│   │   ├── layout/            # Layoutkomponenter
│   │   └── ui/                # Återanvändbara UI-komponenter
│   ├── hooks/                  # Anpassade React-hooks
│   ├── i18n/                   # Internationalisering
│   │   ├── config.ts
│   │   └── locales/           # Översättningsfiler
│   ├── lib/                    # Verktygsfunktioner
│   ├── stores/                 # Zustand state stores
│   ├── types/                  # TypeScript-typdefinitioner
│   └── main.tsx               # Ingångspunkt
├── tests/                       # Testfiler
├── .env.example                # Mall för miljövariabler
├── .gitignore                  # Git ignoreringsregler
├── Makefile                    # Byggautomation
├── next.config.js              # Next.js-konfiguration
├── package.json                # Beroenden och script
├── tailwind.config.cjs         # Tailwind CSS-konfiguration
├── tsconfig.json               # TypeScript-konfiguration
├── vite.config.ts              # Vite-konfiguration
├── jest.config.ts              # Jest-konfiguration
├── AGENTS.md                   # Repositoryriktlinjer
├── CLAUDE.md                   # Claude-specifika instruktioner
├── GEMINI.md                   # Gemini-specifika instruktioner
├── LICENSE                     # MIT-licens
└── README.md                   # Denna fil
```

### Konfiguration (SV)

#### Miljövariabler

Skapa en `.env`-fil i rotkatalogen:

```env
# AI-Agent API-nycklar
GEMINI_API_KEY=din_gemini_api_nyckel
OPENAI_API_KEY=din_openai_api_nyckel
ANTHROPIC_API_KEY=din_anthropic_api_nyckel

# Produktions-API-nycklar (Valfritt)
NEXT_PUBLIC_YOUTUBE_API_KEY=din_youtube_api_nyckel
INFRANODUS_API_KEY=din_infranodus_api_nyckel

# Applikationsinställningar
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

#### Next.js-konfiguration

Redigera `next.config.js` för att anpassa Next.js-beteende:

```javascript
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['se', 'en', 'ar', 'fa', 'zh', 'es'],
    defaultLocale: 'se',
  },
  // ... mer konfiguration
};
```

#### Tailwind-konfiguration

Anpassa styling i `tailwind.config.cjs`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      // Anpassade färger, typsnitt, etc.
    },
  },
  // ... mer konfiguration
};
```

### Driftsättning

#### Vercel (Rekommenderas)

1. **Installera Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Logga in på Vercel:**
   ```bash
   vercel login
   ```

3. **Driftsätt:**
   ```bash
   vercel
   ```

4. **Produktionsdriftsättning:**
   ```bash
   vercel --prod
   ```

#### Docker

1. **Bygg Docker-image:**
   ```bash
   docker build -t dolreal .
   ```

2. **Kör container:**
   ```bash
   docker run -p 3000:3000 --env-file .env dolreal
   ```

#### Manuell Driftsättning

1. **Bygg applikationen:**
   ```bash
   npm run build
   ```

2. **Starta produktionsservern:**
   ```bash
   npm start
   ```

3. **Konfigurera din webbserver** (nginx, Apache, etc.) att proxy till Next.js-servern

### Felsökning (SV)

#### Vanliga Problem

**1. Port Redan i Bruk**
```bash
# Fel: Port 3000 är redan i bruk

# Lösning: Döda processen
lsof -ti:3000 | xargs kill -9

# Eller använd en annan port
PORT=3001 npm run dev
```

**2. Modul Ej Hittad-fel**
```bash
# Fel: Kan inte hitta modul 'X'

# Lösning: Ominstallera beroenden
rm -rf node_modules package-lock.json
npm install
```

**3. API-nyckel Fungerar Inte**
```bash
# Fel: Ogiltig API-nyckel

# Lösning: Verifiera din .env-fil
cat .env | grep API_KEY

# Se till att det inte finns mellanslag runt =-tecknet
# Korrekt:   GEMINI_API_KEY=abc123
# Felaktigt: GEMINI_API_KEY = abc123
```

**4. Byggfel**
```bash
# Fel: Byggning misslyckades

# Lösning: Kontrollera TypeScript-fel
npm run typecheck

# Fixa fel och bygg om
npm run build
```

**5. Orkestreringsfel**
```bash
# Fel: Agent X misslyckades

# Lösning: Kontrollera agentloggar
cat logs/X_agent.log

# Verifiera API-nycklar
make check-env

# Kör om specifik agent
make agent-namn
```

#### Få Hjälp

- **Dokumentation**: Kontrollera `docs/`-katalogen för detaljerade guider
- **Problem**: [GitHub Issues](https://github.com/Irilone/DolReal/issues)
- **Diskussioner**: [GitHub Discussions](https://github.com/Irilone/DolReal/discussions)
- **E-post**: Kontakta DoL 2025-teamet

### Bidra (SV)

Vi välkomnar bidrag! Här är hur du kommer igång:

#### Utvecklingsprocess

1. **Forka repositoriet**
   ```bash
   # Klicka på "Fork" på GitHub, klona sedan din fork
   git clone https://github.com/DITT_ANVÄNDARNAMN/DolReal.git
   ```

2. **Skapa en funktionsgren**
   ```bash
   git checkout -b feature/ditt-funktionsnamn
   ```

3. **Gör dina ändringar**
   - Följ kodstilsriktlinjerna
   - Skriv tester för nya funktioner
   - Uppdatera dokumentation vid behov

4. **Kör tester och linting**
   ```bash
   npm run typecheck
   npm run lint
   npm test
   trunk check
   ```

5. **Commit dina ändringar**
   ```bash
   git add .
   git commit -m "feat: lägg till din funktionsbeskrivning"
   ```
   
   Följ [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - Ny funktion
   - `fix:` - Buggfix
   - `docs:` - Dokumentationsändringar
   - `style:` - Kodstilsändringar (formatering)
   - `refactor:` - Kodomstrukturering
   - `test:` - Lägga till eller uppdatera tester
   - `chore:` - Underhållsuppgifter

6. **Pusha till din fork**
   ```bash
   git push origin feature/ditt-funktionsnamn
   ```

7. **Skapa en Pull Request**
   - Gå till det ursprungliga repositoriet
   - Klicka på "New Pull Request"
   - Välj din fork och gren
   - Fyll i PR-mallen

#### Kodstilsriktlinjer

- **TypeScript**: Använd strikt läge, explicita typer
- **React**: Funktionella komponenter med hooks
- **Namngivning**: 
  - Komponenter: PascalCase (`StreamCard`)
  - Funktioner: camelCase (`fetchStreamData`)
  - Filer: kebab-case (`stream-card.tsx`)
- **Formatering**: 2 mellanslag, upprätthålls av Prettier
- **Kommentarer**: JSDoc för funktioner, kortfattade inline-kommentarer
- **Importer**: Gruppera efter: React → Next.js → Externa → Interna

#### Testkrav

- Alla nya funktioner måste inkludera tester
- Upprätthåll >80% kodtäckning
- Testa kritiska vägar och kantfall
- Inkludera tillgänglighetstester

#### Dokumentationskrav

- Uppdatera README.md om du lägger till nya funktioner
- Lägg till inline-kommentarer för komplex logik
- Uppdatera API-dokumentation
- Inkludera svenska översättningar

### Licens (SV)

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE)-filen för detaljer.

---

## Support & Community

### Getting Help / Få Hjälp

- **Documentation / Dokumentation**: [docs/](docs/)
- **Issues / Problem**: [GitHub Issues](https://github.com/Irilone/DolReal/issues)
- **Discussions / Diskussioner**: [GitHub Discussions](https://github.com/Irilone/DolReal/discussions)

### Acknowledgments / Erkännanden

- Built with [Next.js](https://nextjs.org/)
- Powered by [Vercel](https://vercel.com/)
- AI orchestration by Gemini, GPT-5, and Claude
- Special thanks to all contributors

---

**Made with ❤️ for Dagar om Lagar 2025**
