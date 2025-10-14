# Next.js Site Implementation Specification

## Project Overview
"Dagar om Lagar 2025" - Multi-language event streaming platform for November 6-7, 2025 legal symposium.

## Technology Stack
- **Framework**: Next.js 15.0 (App Router)
- **Runtime**: Bun 1.2.23
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand 4.5
- **Internationalization**: react-i18next 14.0
- **Package Manager**: Bun (7-100x faster than npm)

## Performance Budget
- **Largest Contentful Paint (LCP)**: <2.5 seconds
- **Cumulative Layout Shift (CLS)**: <0.1
- **First Input Delay (FID)**: <100ms
- **JavaScript Bundle**: <250KB gzipped
- **Page Load Time**: <3 seconds on 3G

## Supported Languages
1. Swedish (se) - Primary
2. English (en)
3. Arabic (ar) - RTL support
4. Farsi/Persian (fa) - RTL support
5. Chinese (zh) - Simplified
6. Spanish (es)

## Page Structure

### 1. Home Page (`/`)
**Purpose**: Event overview and stream grid

**Components**:
- Hero section with event dates (Nov 6-7, 2025)
- 4-stream grid (Nodväst, Nodsyd, Nodöst, Nodmidd)
- Language selector (6 languages)
- Event schedule sidebar
- Real-time viewer count

**Layout**:
```
+-----------------------------------+
|          Hero + Nav + LangSwitch  |
+-----------------------------------+
|  [Stream 1]  |  [Stream 2]        |
|   Nodväst    |   Nodsyd           |
+-----------------------------------+
|  [Stream 3]  |  [Stream 4]        |
|   Nodöst     |   Nodmidd          |
+-----------------------------------+
|  Schedule Sidebar | Analytics      |
+-----------------------------------+
```

**File**: `src/app/page.tsx`

### 2. Individual Stream Pages (`/stream/[node]`)
**Purpose**: Full-screen single stream with chat

**Components**:
- Full-width YouTube embed
- Live chat integration (optional)
- Stream health indicator
- Related concept graph (InfraNodus)

**Routes**:
- `/stream/nodvast`
- `/stream/nodsyd`
- `/stream/nodost`
- `/stream/nodmidd`

**File**: `src/app/stream/[node]/page.tsx`

### 3. Schedule Page (`/schedule`)
**Purpose**: Full event agenda

**Components**:
- Day 1 / Day 2 tabs
- Timeline view with speakers
- Filter by node/topic
- Add to calendar button (iCal export)

**File**: `src/app/schedule/page.tsx`

### 4. Archive Page (`/archive`)
**Purpose**: Post-event VOD access

**Components**:
- Grid of completed streams
- Search and filter by date/node
- Transcript viewer
- InfraNodus concept analysis

**File**: `src/app/archive/page.tsx`

### 5. About Page (`/about`)
**Purpose**: Event background and organizers

**Components**:
- Event description
- Organizer information
- Sponsor logos (if applicable)
- Contact information

**File**: `src/app/about/page.tsx`

## Component Architecture

### Core Components

#### StreamGrid
```typescript
// src/components/StreamGrid.tsx
interface Stream {
  id: string;
  node: 'nodvast' | 'nodsyd' | 'nodost' | 'nodmidd';
  title: string;
  isLive: boolean;
  viewerCount: number;
}

export function StreamGrid({ streams }: { streams: Stream[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      {streams.map(stream => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
}
```

#### YouTubeEmbed
```typescript
// src/components/YouTubeEmbed.tsx
interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
}

export function YouTubeEmbed({ 
  videoId, 
  title, 
  autoplay = false, 
  muted = false 
}: YouTubeEmbedProps) {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full rounded-lg"
      />
    </div>
  );
}
```

#### LanguageSelector
```typescript
// src/components/LanguageSelector.tsx
'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  
  const languages = [
    { code: 'se', name: 'Svenska', flag: '🇸🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(`/${lang}${pathname.replace(/^\/[a-z]{2}/, '')}`);
  };
  
  return (
    <select 
      value={i18n.language} 
      onChange={(e) => changeLanguage(e.target.value)}
      className="rounded-md border px-2 py-1"
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}
```

#### StreamHealthIndicator
```typescript
// src/components/StreamHealthIndicator.tsx
'use client';

import { useEffect, useState } from 'react';

interface HealthStatus {
  status: 'good' | 'ok' | 'bad' | 'offline';
  message: string;
}

export function StreamHealthIndicator({ streamId }: { streamId: string }) {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  
  useEffect(() => {
    const checkHealth = async () => {
      const response = await fetch(`/api/stream-health/${streamId}`);
      const data = await response.json();
      setHealth(data);
    };
    
    checkHealth();
    const interval = setInterval(checkHealth, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, [streamId]);
  
  if (!health) return null;
  
  const colors = {
    good: 'bg-green-500',
    ok: 'bg-yellow-500',
    bad: 'bg-red-500',
    offline: 'bg-gray-500',
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${colors[health.status]}`} />
      <span className="text-sm">{health.message}</span>
    </div>
  );
}
```

### Layout Components

#### RootLayout
```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Dagar om Lagar 2025',
  description: 'Multi-stream legal symposium - November 6-7, 2025',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="se" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## State Management

### Zustand Stores

#### Stream Store
```typescript
// src/stores/streamStore.ts
import { create } from 'zustand';

interface StreamState {
  streams: Stream[];
  selectedNode: string | null;
  setStreams: (streams: Stream[]) => void;
  selectNode: (node: string) => void;
  updateStreamStatus: (id: string, isLive: boolean) => void;
}

export const useStreamStore = create<StreamState>((set) => ({
  streams: [],
  selectedNode: null,
  setStreams: (streams) => set({ streams }),
  selectNode: (node) => set({ selectedNode: node }),
  updateStreamStatus: (id, isLive) => set((state) => ({
    streams: state.streams.map(s => 
      s.id === id ? { ...s, isLive } : s
    ),
  })),
}));
```

#### UI Store
```typescript
// src/stores/uiStore.ts
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}));
```

## API Routes

### Stream Health API
```typescript
// src/app/api/stream-health/[streamId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { streamId: string } }
) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/liveStreams?` +
    `part=status,healthStatus&id=${params.streamId}` +
    `&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  
  const data = await response.json();
  const healthStatus = data.items?.[0]?.healthStatus;
  
  return NextResponse.json({
    status: healthStatus?.status || 'offline',
    message: healthStatus?.message || 'Stream is offline',
  });
}
```

### Viewer Count API
```typescript
// src/app/api/viewer-count/route.ts
export async function GET(request: NextRequest) {
  const videoIds = [
    process.env.NODVAST_VIDEO_ID,
    process.env.NODSYD_VIDEO_ID,
    process.env.NODOST_VIDEO_ID,
    process.env.NODMIDD_VIDEO_ID,
  ].join(',');
  
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?` +
    `part=liveStreamingDetails&id=${videoIds}` +
    `&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  
  const data = await response.json();
  
  const counts = data.items.map((item: any) => ({
    videoId: item.id,
    concurrentViewers: item.liveStreamingDetails?.concurrentViewers || 0,
  }));
  
  return NextResponse.json({ counts, total: counts.reduce((sum, c) => sum + c.concurrentViewers, 0) });
}
```

## Internationalization (i18n)

### Configuration
```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import se from './locales/se.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import fa from './locales/fa.json';
import zh from './locales/zh.json';
import es from './locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    se: { translation: se },
    en: { translation: en },
    ar: { translation: ar },
    fa: { translation: fa },
    zh: { translation: zh },
    es: { translation: es },
  },
  lng: 'se',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

### Translation Files
```json
// src/i18n/locales/se.json
{
  "nav": {
    "home": "Hem",
    "schedule": "Schema",
    "archive": "Arkiv",
    "about": "Om"
  },
  "streams": {
    "nodvast": "Nordväst",
    "nodsyd": "Syd",
    "nodost": "Öst",
    "nodmidd": "Mitten",
    "live": "Live",
    "viewers": "tittare"
  },
  "event": {
    "title": "Dagar om Lagar 2025",
    "dates": "6-7 november 2025",
    "description": "Ett juridiskt symposium som utforskar lagar och samhälle"
  }
}
```

### RTL Support
```typescript
// src/app/[lang]/layout.tsx
export default function LangLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRTL = ['ar', 'fa'].includes(params.lang);
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} lang={params.lang}>
      {children}
    </div>
  );
}
```

## Accessibility (WCAG 2.2 AA)

### Requirements
- Color contrast ratio ≥4.5:1 for text
- All interactive elements keyboard-accessible
- ARIA labels for all controls
- Skip navigation links
- Focus indicators visible
- Responsive font sizes (rem units)

### Implementation
```typescript
// src/components/StreamCard.tsx
export function StreamCard({ stream }: { stream: Stream }) {
  return (
    <article
      className="rounded-lg border p-4"
      role="region"
      aria-labelledby={`stream-${stream.id}-title`}
    >
      <h3 id={`stream-${stream.id}-title`} className="text-lg font-semibold">
        {stream.title}
      </h3>
      <button
        onClick={() => navigate(`/stream/${stream.node}`)}
        aria-label={`Watch ${stream.title} stream`}
        className="focus:ring-2 focus:ring-primary-500 focus:outline-none"
      >
        Watch Stream
      </button>
    </article>
  );
}
```

## Testing Strategy

### Unit Tests (Jest)
```typescript
// src/components/StreamGrid.test.tsx
import { render, screen } from '@testing-library/react';
import { StreamGrid } from './StreamGrid';

describe('StreamGrid', () => {
  it('renders all 4 streams', () => {
    const mockStreams = [
      { id: '1', node: 'nodvast', title: 'Nodväst', isLive: true, viewerCount: 100 },
      // ... more streams
    ];
    
    render(<StreamGrid streams={mockStreams} />);
    expect(screen.getByText('Nodväst')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)
```typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('home page loads and shows streams', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Dagar om Lagar 2025');
  await expect(page.locator('[data-testid="stream-grid"]')).toBeVisible();
  await expect(page.locator('.stream-card')).toHaveCount(4);
});
```

## Deployment

### Environment Variables (.env.production)
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://dol2025.example.com
NEXT_PUBLIC_YOUTUBE_API_KEY=...
INFRANODUS_API_KEY=...
NODVAST_VIDEO_ID=...
NODSYD_VIDEO_ID=...
NODOST_VIDEO_ID=...
NODMIDD_VIDEO_ID=...
```

### Build Commands
```bash
# Production build
bun run build

# Start production server
bun run start

# Static export (if needed)
bun run build && bun run export
```

### Vercel Deployment
```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel --prod
```

## Monitoring & Analytics

### Performance Monitoring
```typescript
// src/lib/analytics.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true') {
    console.log(metric);
    // Send to analytics service
  }
}
```

### Error Tracking
```typescript
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to service
    console.error('Global error:', error);
  }, [error]);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-primary-500 text-white rounded">
        Try again
      </button>
    </div>
  );
}
```

## Success Criteria
- [ ] All pages render without errors
- [ ] 6-language i18n working with RTL support
- [ ] All 4 streams embed correctly
- [ ] Performance budget met (LCP <2.5s, CLS <0.1, JS <250KB)
- [ ] WCAG 2.2 AA compliant
- [ ] Unit test coverage >80%
- [ ] E2E tests pass for critical paths
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Stream health monitoring functional
- [ ] InfraNodus integration operational
