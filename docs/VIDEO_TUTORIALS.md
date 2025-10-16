# Video Tutorials - DolReal

Complete video tutorial series for getting started with DolReal, from installation to deployment.

## 📹 Tutorial Series

All tutorials are available on our [YouTube Channel](https://youtube.com/@dolreal2025) and [Vimeo](https://vimeo.com/dolreal2025).

---

## Beginner Series

### 1. Introduction to DolReal (10 min)

**What you'll learn:**
- Overview of the DolReal platform
- Event structure and streaming architecture
- Technology stack explained
- Multi-agent orchestration introduction

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=intro-dolreal)

**Resources:**
- [Slides (PDF)](https://dolreal.example.com/tutorials/intro-slides.pdf)
- [Demo Repository](https://github.com/Irilone/DolReal)

---

### 2. Quick Start: Setup in 5 Minutes (5 min)

**What you'll learn:**
- Clone the repository
- Install dependencies
- Configure environment variables
- Start the development server

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=quickstart-5min)

**Commands covered:**
```bash
git clone https://github.com/Irilone/DolReal.git
cd DolReal
npm install
cp .env.example .env
npm run dev
```

**Prerequisites:**
- Node.js 20+ installed
- Git installed
- Text editor (VS Code recommended)

---

### 3. Installing Node.js and Prerequisites (8 min)

**What you'll learn:**
- Installing Node.js on macOS, Linux, and Windows
- Installing Git
- Installing a code editor
- Verifying installations

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=install-nodejs)

**Platforms covered:**
- macOS (using Homebrew)
- Windows (using installer)
- Linux (Ubuntu/Debian)

**Timestamps:**
- 0:00 - Introduction
- 0:30 - macOS Installation
- 2:00 - Windows Installation
- 4:00 - Linux Installation
- 6:00 - Verification
- 7:00 - Next Steps

---

### 4. Understanding the Project Structure (12 min)

**What you'll learn:**
- Directory organization
- Key files and their purposes
- Component architecture
- Configuration files

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=project-structure)

**Sections covered:**
- `/src` directory structure
- `/docs` documentation
- Configuration files (next.config.js, tailwind.config.cjs)
- Scripts and orchestration
- Testing setup

---

## Intermediate Series

### 5. Development Workflow (15 min)

**What you'll learn:**
- Starting the development server
- Hot module replacement
- Making changes to components
- Running linters and type checks
- Debugging tips

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=dev-workflow)

**Commands covered:**
```bash
npm run dev          # Start dev server
npm run typecheck    # Type checking
npm run lint         # Linting
npm run test         # Run tests
```

**Tools demonstrated:**
- VS Code extensions
- Browser DevTools
- React DevTools

---

### 6. Using Claude Code CLI (20 min)

**What you'll learn:**
- Installing Claude Code CLI
- Configuring API keys
- Generating components
- Code review and suggestions
- Debugging with Claude
- Refactoring code
- Best practices

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=claude-cli)

**Sections:**
1. Installation (2 min)
2. Configuration (3 min)
3. Component Generation (5 min)
4. Code Review (4 min)
5. Debugging (3 min)
6. Best Practices (3 min)

**Prerequisites:**
- Anthropic API key
- Claude CLI installed

---

### 7. Working with Internationalization (18 min)

**What you'll learn:**
- i18next setup
- Adding new translations
- Switching languages
- RTL support for Arabic and Farsi
- Best practices for translatable content

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=i18n-setup)

**Languages covered:**
- Swedish (se) - Default
- English (en)
- Arabic (ar) - RTL
- Farsi (fa) - RTL
- Chinese (zh)
- Spanish (es)

**Files to edit:**
- `/src/i18n/locales/*.json`
- `/src/i18n/config.ts`

---

### 8. Building Custom Components (25 min)

**What you'll learn:**
- Creating new React components
- TypeScript types and interfaces
- Styling with Tailwind CSS
- Component testing
- Accessibility considerations

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=custom-components)

**Example Projects:**
1. StreamCard component
2. SessionSchedule component
3. KnowledgeGraphViewer component

**Code examples:**
```typescript
interface StreamCardProps {
  title: string;
  isLive: boolean;
  viewerCount: number;
}

export default function StreamCard({ 
  title, 
  isLive, 
  viewerCount 
}: StreamCardProps) {
  // Component implementation
}
```

---

### 9. Testing Your Code (22 min)

**What you'll learn:**
- Writing unit tests with Jest
- Component testing with React Testing Library
- Running tests and coverage
- Testing best practices
- Accessibility testing

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=testing-code)

**Test types covered:**
1. Unit tests
2. Component tests
3. Integration tests
4. Accessibility tests

**Commands:**
```bash
npm test                  # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

---

## Advanced Series

### 10. Multi-Agent Orchestration Deep Dive (35 min)

**What you'll learn:**
- Understanding the 4-agent pipeline
- Gemini 2.5 Pro Ultra (Research)
- GPT-5 Codex (Architecture)
- Claude Sonnet 4.5 (Frontend & Backend)
- Gemini CLI (Integration)
- File-based async communication
- Running the full orchestration

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=multi-agent)

**Sections:**
1. Overview (5 min)
2. Agent 1: Research (8 min)
3. Agent 2: Architecture (7 min)
4. Agent 3: Implementation (10 min)
5. Agent 4: Integration (5 min)

**Commands:**
```bash
make all                 # Full pipeline
make gemini-ultra        # Agent 1
make gpt5-codex          # Agent 2
make claude-parallel     # Agent 3
make gemini-cli          # Agent 4
```

---

### 11. YouTube Live API Integration (28 min)

**What you'll learn:**
- YouTube API setup
- Getting API credentials
- Fetching live stream data
- Implementing the IFrame player
- Handling player events
- Error handling and retry logic

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=youtube-api)

**API endpoints covered:**
- Videos API
- Live Streaming API
- Player API

**Code walkthrough:**
- `/src/lib/youtube-client.ts`
- `/src/components/features/VideoPlayer.tsx`

---

### 12. InfraNodus Knowledge Graph Integration (24 min)

**What you'll learn:**
- InfraNodus API setup
- MCP (Model Context Protocol)
- Fetching graph data
- Visualizing knowledge graphs
- Iframe fallback implementation
- Real-time updates

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=infranodus)

**Technologies:**
- InfraNodus API
- D3.js for visualization
- WebSocket for real-time updates

---

### 13. State Management with Zustand (20 min)

**What you'll learn:**
- Zustand basics
- Creating stores
- Using stores in components
- Persistence
- DevTools integration
- Best practices

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=zustand-state)

**Example stores:**
```typescript
// Stream store
const useStreamStore = create((set) => ({
  streams: [],
  activeStream: null,
  setActiveStream: (stream) => set({ activeStream: stream }),
}));
```

---

### 14. Performance Optimization (30 min)

**What you'll learn:**
- Bundle size optimization
- Code splitting
- Image optimization
- Lazy loading
- Caching strategies
- Lighthouse audits

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=performance)

**Targets:**
- LCP < 2.5s
- CLS < 0.1
- Bundle < 250KB

**Tools demonstrated:**
- Next.js Image component
- Dynamic imports
- Webpack Bundle Analyzer

---

## Deployment Series

### 15. Deploying to Vercel (15 min)

**What you'll learn:**
- Creating a Vercel account
- Connecting GitHub repository
- Environment variables setup
- Custom domain configuration
- Deployment settings
- Monitoring and analytics

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=deploy-vercel)

**Steps:**
1. Sign up for Vercel
2. Import project
3. Configure build settings
4. Set environment variables
5. Deploy
6. Custom domain (optional)

---

### 16. Docker Deployment (25 min)

**What you'll learn:**
- Creating a Dockerfile
- Docker Compose setup
- Building images
- Running containers
- Environment variables
- Production best practices

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=deploy-docker)

**Files created:**
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

**Commands:**
```bash
docker build -t dolreal .
docker run -p 3000:3000 dolreal
docker-compose up -d
```

---

### 17. Manual Server Deployment (30 min)

**What you'll learn:**
- Server requirements
- Building for production
- nginx configuration
- PM2 process management
- SSL/TLS setup
- Monitoring and logs

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=deploy-manual)

**Platforms covered:**
- Ubuntu 22.04 LTS
- nginx reverse proxy
- PM2 for process management
- Let's Encrypt for SSL

---

## Specialized Tutorials

### 18. Contributing to DolReal (18 min)

**What you'll learn:**
- Forking the repository
- Creating feature branches
- Making changes
- Writing commit messages
- Creating pull requests
- Code review process

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=contributing)

**Workflow:**
1. Fork repository
2. Clone your fork
3. Create branch
4. Make changes
5. Commit and push
6. Create PR

---

### 19. Accessibility Best Practices (22 min)

**What you'll learn:**
- WCAG 2.2 AA compliance
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader testing
- Color contrast
- Focus management

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=accessibility)

**Tools demonstrated:**
- axe DevTools
- NVDA screen reader
- Lighthouse accessibility audit

---

### 20. Troubleshooting Common Issues (20 min)

**What you'll learn:**
- Port already in use
- Module not found errors
- Build failures
- API key issues
- TypeScript errors
- Common pitfalls

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=troubleshooting)

**Issues covered:**
1. Port conflicts
2. Dependency issues
3. Environment variables
4. Build errors
5. TypeScript problems

---

## Workshop Recordings

### Full-Day Workshop: Building with DolReal (6 hours)

**What you'll learn:**
- Complete walkthrough of the platform
- Building a custom feature from scratch
- Best practices and patterns
- Q&A sessions

**Video Link**: [Watch on YouTube](https://youtube.com/watch?v=workshop-fullday)

**Sections:**
1. Morning Session (3 hours)
   - Introduction and setup
   - Core concepts
   - First feature
2. Afternoon Session (3 hours)
   - Advanced topics
   - Custom feature development
   - Deployment and monitoring

---

## Live Coding Sessions

### Weekly Live Coding

Join us every Friday for live coding sessions where we:
- Build new features
- Answer community questions
- Review pull requests
- Share tips and tricks

**Schedule**: Every Friday, 14:00 UTC  
**Live Stream**: [YouTube Live](https://youtube.com/@dolreal2025/live)

**Past recordings:**
- [Session 1: Building the Archive Page](https://youtube.com/watch?v=livecode-01)
- [Session 2: Optimizing Performance](https://youtube.com/watch?v=livecode-02)
- [Session 3: Accessibility Improvements](https://youtube.com/watch?v=livecode-03)

---

## Quick Tips (5-minute videos)

### Shorts and Quick Tips

**Playlist**: [DolReal Quick Tips](https://youtube.com/playlist?list=quick-tips)

1. **Setting up VS Code** (3 min)
2. **Git aliases for productivity** (2 min)
3. **Debugging Next.js apps** (4 min)
4. **Tailwind CSS shortcuts** (3 min)
5. **TypeScript type tricks** (5 min)
6. **Jest testing patterns** (4 min)
7. **React hooks best practices** (5 min)
8. **Environment variable management** (3 min)

---

## Resources

### Download Materials

All tutorial materials are available:
- [Slides (ZIP)](https://dolreal.example.com/tutorials/slides.zip)
- [Code Examples](https://github.com/Irilone/DolReal-Tutorials)
- [Cheat Sheets (PDF)](https://dolreal.example.com/tutorials/cheatsheets.pdf)

### Community

Join our community:
- **Discord**: [DolReal Community](https://discord.gg/dolreal)
- **GitHub Discussions**: [Ask Questions](https://github.com/Irilone/DolReal/discussions)
- **Twitter**: [@dolreal2025](https://twitter.com/dolreal2025)

### Support

Need help?
- **Documentation**: [Full Docs](https://github.com/Irilone/DolReal)
- **Issues**: [Report Problems](https://github.com/Irilone/DolReal/issues)
- **Email**: support@dolreal.example.com

---

## Creating Your Own Tutorials

Want to create tutorials for DolReal?

**Guidelines:**
1. Follow our [Content Creation Guide](./CONTENT_CREATION.md)
2. Use our [Video Template](https://dolreal.example.com/templates/video)
3. Submit via [GitHub Discussions](https://github.com/Irilone/DolReal/discussions)

**Requirements:**
- Clear audio
- 1080p minimum resolution
- English or Swedish language
- Include code examples
- Provide timestamps

---

## Playlist Organization

### YouTube Playlists

**Beginner Path**: Tutorials 1-4  
[Watch Playlist](https://youtube.com/playlist?list=beginner-path)

**Intermediate Path**: Tutorials 5-9  
[Watch Playlist](https://youtube.com/playlist?list=intermediate-path)

**Advanced Path**: Tutorials 10-14  
[Watch Playlist](https://youtube.com/playlist?list=advanced-path)

**Deployment Path**: Tutorials 15-17  
[Watch Playlist](https://youtube.com/playlist?list=deployment-path)

**Complete Series**: All tutorials  
[Watch Playlist](https://youtube.com/playlist?list=complete-series)

---

## Subtitles and Translations

All videos include:
- ✅ English subtitles
- ✅ Swedish subtitles
- 🔄 Arabic subtitles (in progress)
- 🔄 Spanish subtitles (in progress)

**Contribute translations**: [Translation Project](https://github.com/Irilone/DolReal/wiki/Translations)

---

## Video Learning Paths

### Path 1: Quick Start (30 min total)
1. Introduction (10 min)
2. Quick Start (5 min)
3. Installing Prerequisites (8 min)
4. Project Structure (12 min)

### Path 2: Developer Path (2 hours)
1. Development Workflow (15 min)
2. Building Components (25 min)
3. Testing (22 min)
4. Deployment to Vercel (15 min)

### Path 3: Advanced Developer (4 hours)
1. Multi-Agent Orchestration (35 min)
2. YouTube API (28 min)
3. InfraNodus Integration (24 min)
4. State Management (20 min)
5. Performance (30 min)

---

**Last Updated**: 2025-10-16  
**Total Videos**: 20+ tutorials  
**Total Duration**: 8+ hours of content

For the latest videos, subscribe to our [YouTube Channel](https://youtube.com/@dolreal2025).
