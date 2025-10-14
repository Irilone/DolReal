# Site Specification – DoL 2025 Next.js Application

## Overview
- Framework: Next.js **15** (App Router, React Server Components).  
- Runtime: Bun during dev/build, Node 20+ in production.  
- Styling: Tailwind CSS v4 with custom theme tokens.  
- Internationalisation: i18next + Next.js locale segments (`/[locale]/`).  
- Target devices: desktop, tablet, mobile; focus on 1080p streaming dashboards.

## Routing & Layout
```
src/
 └─ app/
     ├─ [locale]/
     │   ├─ layout.tsx  (locale-specific metadata, direction)
     │   ├─ page.tsx    (landing dashboard)
     │   └─ streams/[id]/page.tsx (optional detail view)
     ├─ api/
     │   ├─ streams/route.ts  (GET)
     │   └─ graph/route.ts    (GET)
     ├─ layout.tsx (root – theme, i18n provider)
     └─ globals.css
```
- Locales: `se`, `en`, `ar`, `fa`, `zh`, `es`.  
- Default locale `se`; fallback in Accept-Language negotiation.  
- `metadata` configuration for SEO and social sharing.

## Component Architecture
| Component | Responsibility | Notes |
|-----------|----------------|-------|
| `Header` | Logo, navigation, language switcher, dark-mode toggle | Stick to top; use skip-to-content link |
| `StreamCarousel` | Displays stream cards, manages active YouTube player | Consumes `useStreamPlayer` store |
| `YouTubePlayer` | Encapsulates IFrame API control, ensures single playback | Provide controls for play/pause, captions toggle |
| `GraphNavModal` | Shows InfraNodus embed with focus trap | Lazy loaded |
| `ProgramSection` | Agenda timeline with multi-day support | Content from `content/program.<locale>.json` |
| `Footer` | Contact info, disclaimers | Include social links |
| `LayoutShell` | Combines theming and responsive grid | Houses toast notifications |

## State Management & Data Flow
- **Client state**: Zustand store for active stream ID, playback state, dark mode preference (persist with `localStorage`).  
- **Server data**: Next.js `fetch` to `/api/streams` and `/api/graph`.  
- Use SWR or React Query for caching on client side.  
- Day selection derived from server (based on `dates` in bundle) or query parameter.

## Styling & Theming
- Tailwind design tokens:  
  - Colors: `brand-vast`, `brand-syd`, `brand-ost`, `brand-midd`, `surface`, `accent`.  
  - Typography: Inter for Latin scripts, IBM Plex Sans Arabic for ar/fa, Noto Sans SC for zh.  
  - Dark mode default (class strategy).  
- Use CSS custom properties for dynamic stream colors.  
- Ensure min contrast ratio 4.5:1 for text on backgrounds.

## Accessibility (WCAG 2.2 AA)
- Provide `Skip to main content` link.  
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`).  
- Ensure keyboard focus visible and trapped in modal.  
- Provide screen reader labels for stream buttons (`aria-label="Visa Nodväst"`).  
- All video frames must set `title` + `aria-describedby` linking to captions info.  
- Ensure text alternatives for icon-only buttons (language, theme).

## Performance Budget
- LCP < 2.5 s on cable 3G profile.  
- CLS < 0.1 (avoid layout shifts by fixing iframe aspect ratios).  
- JS bundle < 250 KB (split vendor libs, lazy load IFrame API).  
- Use Next.js image optimisation for logos; load fonts via `next/font` with `display: swap`.  
- Implement custom `scripts/defer-youtube.ts` to load IFrame script when first play triggered.

## Content Management
- Store translations in `src/i18n/locales/<locale>.json`.  
- Provide `program.se.json`, `program.en.json`, etc.  
- Stream metadata (IDs, titles) from `research_bundle.json` and environment overrides.

## Testing Strategy
- Unit tests: component-level using React Testing Library.  
- Integration: Playwright flows (language switch, open modal, play/pause video).  
- Accessibility: `@axe-core/react` in dev, `pa11y` in CI.  
- Performance: `next build` + `next stats` into Lighthouse CI.

## Deployment
- Target platform: Vercel (primary) with fallback container deploy (Docker).  
- Environment variables managed through Vercel dashboard.  
- Build command: `bun run build`; Output: `.next` static artifacts.  
- Post-deploy smoke tests via GitHub Actions to hit `/api/streams`.

## Observability
- Log to `stdout` with structured JSON (`pino`) for API routes.  
- Frontend metrics via Vercel Analytics + Sentry for error tracking.  
- Real-time stream health WebSocket aggregator displayed in admin view (Phase 2).
