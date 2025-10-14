# Documentation & Manuals Outline

## Overview
Comprehensive documentation index for "Dagar om Lagar 2025" project, covering all technical integrations, configurations, and operational procedures.

---

## 1. Hardware & Network Documentation

### 1.1 ASUS RT-AX86U Pro Router
**Source**: Official ASUS Documentation
**Location**: `docs/hardware/asus-rt-ax86u-pro-manual.pdf`

**Key Sections**:
- **2.1**: Initial Setup Wizard
- **3.4**: Wireless Configuration (WiFi 6 settings)
- **4.5**: QoS (Quality of Service) - **CRITICAL FOR STREAMING**
- **4.6**: Traffic Monitor
- **5.2**: Port Forwarding (if needed for RTMP)
- **6.1**: Firmware Update (Asuswrt-Merlin compatibility)
- **7.3**: USB Application Settings
- **Appendix B**: Network Troubleshooting

**Online Resources**:
- Official Manual: https://www.asus.com/support/download-center/
- Asuswrt-Merlin Wiki: https://github.com/RMerl/asuswrt-merlin.ng/wiki

### 1.2 Asuswrt-Merlin Firmware
**Source**: GitHub Wiki
**Location**: `docs/firmware/asuswrt-merlin-guide.md`

**Key Wiki Pages**:
- **QoS Guide**: https://github.com/RMerl/asuswrt-merlin.ng/wiki/QOS
  - Traditional QoS vs Adaptive QoS
  - Bandwidth allocation for streaming
  - Custom rule creation for RTMP traffic
- **Traffic Analyzer**: https://github.com/RMerl/asuswrt-merlin.ng/wiki/Traffic-Analyzer
- **Firmware Upgrade**: https://github.com/RMerl/asuswrt-merlin.ng/wiki/Upgrading
- **Troubleshooting**: https://github.com/RMerl/asuswrt-merlin.ng/wiki/Troubleshooting

**Compiled Reference**: Custom guide in `docs/firmware/merlin-qos-config.md`

---

## 2. Streaming Software Documentation

### 2.1 OBS Studio
**Source**: Official OBS Documentation
**Location**: `docs/obs/obs-studio-guide.md`

**Key Sections**:
- **Getting Started**: https://obsproject.com/wiki/
- **OBS Studio Overview**: https://obsproject.com/wiki/OBS-Studio-Overview
- **Encoding**: https://obsproject.com/wiki/Understanding-The-Encoding-Settings
  - Hardware encoding (Apple VideoToolbox for M2)
  - Bitrate recommendations for 4K streaming
- **Sources Guide**: https://obsproject.com/wiki/Sources-Guide
- **Filters Guide**: https://obsproject.com/wiki/Filters-Guide

### 2.2 Multiple RTMP Outputs Plugin
**Source**: GitHub Repository by SoraYuki
**Location**: `docs/obs/multi-rtmp-plugin.md`

**Repository**: https://github.com/sorayuki/obs-multi-rtmp
**Documentation Sections**:
- Installation instructions (macOS ARM64)
- Configuration guide
- Adding multiple targets
- Troubleshooting connection issues
- Performance optimization

**Compiled Setup**: `docs/obs/multi-rtmp-setup-guide.md`

### 2.3 OBS Performance Guide
**Source**: Community Best Practices
**Location**: `docs/obs/performance-optimization.md`

**Topics**:
- Apple Silicon M2 optimization
- 4K streaming settings
- CPU vs GPU encoding trade-offs
- Network optimization for multi-stream
- Frame drop troubleshooting

---

## 3. YouTube Live Streaming Documentation

### 3.1 YouTube Live Streaming API
**Source**: Google Developers Documentation
**Location**: `docs/youtube/youtube-api-guide.md`

**Key Resources**:
- **API Overview**: https://developers.google.com/youtube/v3/live/getting-started
- **Live Streams**: https://developers.google.com/youtube/v3/live/docs/liveStreams
- **Live Broadcasts**: https://developers.google.com/youtube/v3/live/docs/liveBroadcasts
- **Live Chat**: https://developers.google.com/youtube/v3/live/docs/liveChatMessages
- **Quota Management**: https://developers.google.com/youtube/v3/getting-started#quota

**Compiled Reference**: `docs/youtube/api-integration.md`

### 3.2 YouTube Live Streaming Features
**Source**: YouTube Help Center
**Location**: `docs/youtube/live-features.md`

**Key Articles**:
- Stream settings and requirements: https://support.google.com/youtube/answer/2853702
- Encoder settings: https://support.google.com/youtube/answer/2853702#encoder
- Concurrent streaming limits: **1 stream per channel** (requires 4 channels)
- Live streaming latency options
- DVR and rewind features
- Closed captions and subtitles

### 3.3 YouTube RTMP Configuration
**Source**: Official YouTube Documentation
**Location**: `docs/youtube/rtmp-setup.md`

**Topics**:
- RTMP URLs and stream keys
- Backup ingest servers
- Stream health monitoring
- Recommended bitrates for 4K (24-36 Mbps)
- Keyframe interval (2 seconds)

---

## 4. InfraNodus Documentation

### 4.1 InfraNodus API
**Source**: InfraNodus Official Documentation
**Location**: `docs/infranodus/api-reference.md`

**Key Resources**:
- API Documentation: https://infranodus.com/api/docs
- Network Analysis Concepts: https://infranodus.com/docs/network-analysis
- Text-to-Network: https://infranodus.com/docs/text-to-network
- API Authentication
- Rate limits and quotas

**Compiled Guide**: `docs/infranodus/integration-guide.md`

### 4.2 Network Science Fundamentals
**Source**: InfraNodus Educational Resources
**Location**: `docs/infranodus/network-science-basics.md`

**Topics**:
- Graph theory basics
- Betweenness centrality
- Network metrics
- Discourse analysis
- Concept extraction

---

## 5. Next.js & React Documentation

### 5.1 Next.js 15 Documentation
**Source**: Official Next.js Docs
**Location**: Referenced online, key sections in `docs/nextjs/nextjs-15-guide.md`

**Critical Sections**:
- App Router: https://nextjs.org/docs/app
- API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Server Components vs Client Components
- Internationalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- Performance Optimization
- Image Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images

### 5.2 React 18.3 Documentation
**Source**: Official React Docs
**Location**: Referenced online, key sections in `docs/react/react-18-guide.md`

**Key Topics**:
- Hooks: https://react.dev/reference/react
- Concurrent Features
- Suspense and Streaming SSR
- Server Components

### 5.3 Tailwind CSS v4
**Source**: Official Tailwind Documentation
**Location**: `docs/styling/tailwind-v4-guide.md`

**Resources**:
- Configuration: https://tailwindcss.com/docs/configuration
- Dark Mode: https://tailwindcss.com/docs/dark-mode
- RTL Support: https://tailwindcss.com/docs/responsive-design#rtl-support
- Custom Animations
- Performance Optimization

---

## 6. Internationalization (i18n)

### 6.1 react-i18next
**Source**: Official Documentation
**Location**: `docs/i18n/react-i18next-guide.md`

**Key Resources**:
- Getting Started: https://react.i18next.com/
- Next.js Integration: https://react.i18next.com/latest/using-with-ssr
- Translation Management
- Language Detection

### 6.2 Language-Specific Guidelines
**Location**: `docs/i18n/language-guides/`

**Files**:
- `swedish-localization.md` - Swedish (primary language)
- `english-localization.md` - English
- `arabic-localization.md` - Arabic (RTL support)
- `farsi-localization.md` - Farsi/Persian (RTL support)
- `chinese-localization.md` - Simplified Chinese
- `spanish-localization.md` - Spanish

**Topics per Language**:
- Date/time formatting
- Number formatting
- Currency (if applicable)
- Cultural considerations
- Text direction (LTR vs RTL)

---

## 7. State Management & Data Fetching

### 7.1 Zustand
**Source**: Official Zustand Documentation
**Location**: `docs/state-management/zustand-guide.md`

**Resources**:
- Getting Started: https://docs.pmnd.rs/zustand/getting-started/introduction
- TypeScript Usage: https://docs.pmnd.rs/zustand/guides/typescript
- Persist Middleware
- DevTools Integration

### 7.2 YouTube Data API Client
**Location**: `docs/youtube/data-fetching.md`

**Topics**:
- API client setup
- Rate limiting strategies
- Caching with Next.js
- Error handling
- Retry logic

---

## 8. Accessibility (WCAG 2.2)

### 8.1 WCAG 2.2 AA Guidelines
**Source**: W3C Official Specification
**Location**: `docs/accessibility/wcag-2.2-checklist.md`

**Key Resources**:
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
- Level AA Requirements
- Color Contrast Guidelines
- Keyboard Navigation
- Screen Reader Compatibility

### 8.2 Implementation Guide
**Location**: `docs/accessibility/implementation-guide.md`

**Topics**:
- ARIA labels and roles
- Focus management
- Alt text best practices
- Semantic HTML
- Testing with assistive technologies

---

## 9. Testing & Quality Assurance

### 9.1 Jest Testing Framework
**Source**: Official Jest Documentation
**Location**: `docs/testing/jest-guide.md`

**Resources**:
- Getting Started: https://jestjs.io/docs/getting-started
- Testing React Components: https://jestjs.io/docs/tutorial-react
- Mocking: https://jestjs.io/docs/mock-functions
- Coverage Reports

### 9.2 Testing Library
**Source**: Official Testing Library Docs
**Location**: `docs/testing/testing-library-guide.md`

**Resources**:
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- User Event: https://testing-library.com/docs/user-event/intro
- Best Practices

### 9.3 E2E Testing (Playwright)
**Source**: Official Playwright Documentation
**Location**: `docs/testing/playwright-guide.md`

**Resources**:
- Getting Started: https://playwright.dev/docs/intro
- Next.js Integration: https://playwright.dev/docs/test-runners
- Visual Testing
- Cross-browser Testing

---

## 10. Deployment & DevOps

### 10.1 Vercel Deployment
**Source**: Official Vercel Documentation
**Location**: `docs/deployment/vercel-guide.md`

**Resources**:
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Environment Variables: https://vercel.com/docs/projects/environment-variables
- Custom Domains: https://vercel.com/docs/projects/domains
- Analytics: https://vercel.com/docs/analytics

### 10.2 Bun Runtime
**Source**: Official Bun Documentation
**Location**: `docs/runtime/bun-guide.md`

**Resources**:
- Installation: https://bun.sh/docs/installation
- Package Management: https://bun.sh/docs/cli/install
- Runtime API: https://bun.sh/docs/runtime/index
- Performance Optimization

---

## 11. Security & Privacy

### 11.1 API Key Management
**Location**: `docs/security/api-key-management.md`

**Topics**:
- Environment variable storage
- Key rotation procedures
- Access control
- Monitoring and auditing

### 11.2 GDPR Compliance
**Location**: `docs/security/gdpr-compliance.md`

**Topics**:
- Data collection policies
- User consent
- Data retention
- Right to deletion
- Privacy policy

---

## 12. Operational Procedures

### 12.1 Pre-Event Checklist
**Location**: `docs/operations/pre-event-checklist.md`

**Contents**:
- [ ] Router QoS configured and tested
- [ ] OBS multi-RTMP plugin installed and configured
- [ ] All 4 YouTube channels created and verified
- [ ] Stream keys stored in `.env.production`
- [ ] Test streams completed successfully
- [ ] Website deployed and accessible
- [ ] Backup recordings enabled
- [ ] InfraNodus contexts created
- [ ] Team roles assigned
- [ ] Emergency contacts documented

### 12.2 Event Day Procedures
**Location**: `docs/operations/event-day-procedures.md`

**Timeline**:
- T-2 hours: System checks
- T-1 hour: Start test streams
- T-30 min: Go live on all channels
- T-0: Event begins
- During event: Monitor stream health
- Post-event: Archive and backup

### 12.3 Troubleshooting Guide
**Location**: `docs/operations/troubleshooting.md`

**Common Issues**:
- Stream won't start
- Audio desync
- Network congestion
- OBS performance issues
- YouTube stream health warnings
- API rate limit exceeded

### 12.4 Post-Event Report
**Location**: `docs/operations/post-event-template.md`

**Sections**:
- Event summary
- Viewership statistics
- Technical performance metrics
- Issues encountered
- Lessons learned
- Archive links

---

## 13. Development Guides

### 13.1 Local Development Setup
**Location**: `docs/development/local-setup.md`

**Steps**:
1. Clone repository
2. Install Bun
3. Install dependencies: `bun install`
4. Copy `.env.example` to `.env.local`
5. Configure API keys
6. Run dev server: `bun dev`

### 13.2 Contributing Guidelines
**Location**: `CONTRIBUTING.md`

**Topics**:
- Code style guide
- Commit message conventions
- PR review process
- Testing requirements

### 13.3 Architecture Decision Records (ADRs)
**Location**: `docs/architecture/adr/`

**Records**:
- `001-nextjs-15-app-router.md` - Why App Router over Pages Router
- `002-zustand-state-management.md` - Why Zustand over Redux
- `003-tailwind-css-v4.md` - Why Tailwind over styled-components
- `004-bun-package-manager.md` - Why Bun over npm/yarn
- `005-multiple-youtube-channels.md` - Why 4 channels instead of multi-stream solution

---

## 14. API Reference Summaries

### 14.1 YouTube Data API v3
**Location**: `docs/api/youtube-api-summary.md`

**Endpoints**:
- `liveStreams.list` - Get stream health
- `videos.list` - Get viewer count
- `liveBroadcasts.list` - Get broadcast status
- `liveChatMessages.list` - Get chat messages

### 14.2 InfraNodus API
**Location**: `docs/api/infranodus-api-summary.md`

**Endpoints**:
- `POST /api/context` - Create graph context
- `POST /api/statement` - Add text for analysis
- `GET /api/context/{id}/graph` - Get graph data
- `GET /api/context/{id}/concepts` - Get key concepts

---

## 15. Glossary

### 15.1 Technical Terms
**Location**: `docs/glossary.md`

**Terms**:
- **RTMP**: Real-Time Messaging Protocol for video streaming
- **QoS**: Quality of Service (network traffic prioritization)
- **LCP**: Largest Contentful Paint (performance metric)
- **CLS**: Cumulative Layout Shift (performance metric)
- **FID**: First Input Delay (performance metric)
- **DVR**: Digital Video Recorder (rewind feature)
- **VOD**: Video on Demand (archived streams)
- **Betweenness Centrality**: Graph metric measuring node importance
- **i18n**: Internationalization (multi-language support)
- **RTL**: Right-to-Left text direction (Arabic, Farsi)

---

## Documentation Maintenance

### Update Schedule
- **Weekly**: Review and update troubleshooting guides
- **Monthly**: Update API documentation for any changes
- **Post-Event**: Update operational procedures based on lessons learned
- **Quarterly**: Review all external documentation links for accuracy

### Version Control
All documentation follows semantic versioning in sync with codebase releases.

---

## Success Criteria
- [ ] All external documentation links verified and accessible
- [ ] Custom guides created for critical integrations (router, OBS, YouTube)
- [ ] Troubleshooting guides cover common issues
- [ ] API reference summaries complete and accurate
- [ ] Operational checklists tested in dry runs
- [ ] Team members trained on all documented procedures
