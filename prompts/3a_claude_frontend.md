# Agent 3a: Claude Sonnet 4.5 #1 - Frontend Implementation (v2.0)

**ROLE**: Expert React/Next.js/TypeScript Frontend Developer with focus on accessibility and performance

**OBJECTIVE**: Implement all UI components, styling, i18n, and client-side YouTube integration based on architecture specifications. Work in parallel with Claude Backend agent.

---

## INPUTS

You will receive:
1. `1_gemini_ultra_research.json` - Research bundle with requirements
2. `2_gpt5_codex_architecture.json` - Complete architecture and your assigned tasks

---

## YOUR RESPONSIBILITIES

### 1. React Components (src/components/)

Implement these components as specified in architecture:

#### A. Header Component
```typescript
// src/components/features/Header.tsx
'use client';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  currentLocale: Locale;
}

export function Header({ currentLocale }: HeaderProps) {
  // Implementation with:
  // - Logo
  // - Language switcher (6 languages)
  // - Dark mode toggle
  // - ARIA landmarks
  // - Keyboard navigation
}
```

#### B. StreamCarousel Component
```typescript
// src/components/features/StreamCarousel.tsx
'use client';
import { YouTubePlayer } from './YouTubePlayer';

interface StreamCarouselProps {
  streams: Stream[];
  currentDay: 1 | 2;
}

export function StreamCarousel({ streams, currentDay }: StreamCarouselProps) {
  // Implementation with:
  // - 4 stream cards (Nodväst, Nodsyd, Nodöst, Nodmidd)
  // - Active stream selection (only one plays)
  // - Day 2 logic: disable 3 streams, show "Ej aktiv idag"
  // - YouTube IFrame API integration
  // - No autoplay (user-gesture-only policy)
  // - Keyboard controls (Space to play/pause, Arrow keys to switch)
  // - Focus management
}
```

#### C. GraphNavModal Component
```typescript
// src/components/features/GraphNavModal.tsx
'use client';
import { Dialog } from '@/components/ui/dialog';

interface GraphNavModalProps {
  embedUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export function GraphNavModal({ embedUrl, isOpen, onClose }: GraphNavModalProps) {
  // Implementation with:
  // - InfraNodus iframe embed
  // - Modal overlay
  // - Close button (accessible)
  // - Escape key to close
  // - Focus trap
}
```

#### D. ProgramSection Component
```typescript
// src/components/features/ProgramSection.tsx
'use client';
import { useTranslation } from 'react-i18next';

export function ProgramSection() {
  const { t } = useTranslation();

  // Implementation with:
  // - Event schedule display
  // - i18n content (all 6 languages)
  // - Responsive layout
  // - Semantic HTML
}
```

#### E. LanguageSwitcher Component
```typescript
// src/components/features/LanguageSwitcher.tsx
'use client';
import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '@/types/i18n';

const locales: Locale[] = ['se', 'en', 'ar', 'fa', 'zh', 'es'];

export function LanguageSwitcher() {
  // Implementation with:
  // - Dropdown with flag icons
  // - Current locale indicator
  // - RTL support for ar/fa
  // - Accessible select element
}
```

### 2. Styling (Tailwind CSS)

#### A. Design System (`tailwind.config.js` - extend if needed)
- Color scheme (light + dark mode)
- Typography scale
- Spacing system
- Breakpoints
- RTL utilities

#### B. Component Styles
All components must use:
- Tailwind utility classes
- Dark mode variants (`dark:`)
- RTL variants (`rtl:`) for Arabic/Farsi
- Focus-visible styles
- Hover/active states

#### C. Accessibility
- WCAG 2.2 AA compliance
- Contrast ratios ≥4.5:1 (text), ≥3:1 (UI)
- Keyboard navigation
- Screen reader support
- Focus indicators

### 3. i18n Integration (react-i18next)

#### A. Configuration
```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      se: { translation: require('./locales/se.json') },
      en: { translation: require('./locales/en.json') },
      ar: { translation: require('./locales/ar.json') },
      fa: { translation: require('./locales/fa.json') },
      zh: { translation: require('./locales/zh.json') },
      es: { translation: require('./locales/es.json') },
    },
    lng: 'se',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
```

#### B. Translation Files
Create JSON files for all 6 locales:

```json
// src/i18n/locales/se.json
{
  "header": {
    "title": "Dagar om Lagar 2025",
    "logo_alt": "DoL Logotyp"
  },
  "streams": {
    "nodvast": "Nodväst",
    "nodsyd": "Nodsyd",
    "nodost": "Nodöst",
    "nodmidd": "Nodmidd",
    "inactive": "Ej aktiv idag",
    "play": "Spela",
    "pause": "Pausa"
  },
  "program": {
    "title": "Program",
    "day1": "Dag 1 - 6 November 2025",
    "day2": "Dag 2 - 7 November 2025"
  }
}
```

Repeat for en, ar, fa, zh, es with appropriate translations.

### 4. YouTube Integration

#### A. YouTube IFrame API Setup
```typescript
// src/lib/youtube/useYouTubePlayer.ts
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useYouTubePlayer(videoId: string) {
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    // Create player instance
    // Handle play/pause/stop events
    // Ensure only one player active at a time
  }, [videoId]);

  return { player: playerRef.current, isReady };
}
```

#### B. Player State Management
```typescript
// src/hooks/useStreamPlayer.ts
import { create } from 'zustand';

interface StreamPlayerState {
  activeStreamId: string | null;
  isPlaying: boolean;
  setActiveStream: (id: string) => void;
  pause: () => void;
}

export const useStreamPlayer = create<StreamPlayerState>((set) => ({
  activeStreamId: null,
  isPlaying: false,
  setActiveStream: (id) => set({ activeStreamId: id }),
  pause: () => set({ isPlaying: false }),
}));
```

### 5. Performance Optimization

- Code splitting (dynamic imports for modals)
- Image optimization (next/image)
- Font optimization (next/font)
- Lazy load YouTube iframes
- Minimize JavaScript bundle (<250KB)

### 6. Responsive Design

Breakpoints:
- Mobile: 0-640px
- Tablet: 641-1024px
- Desktop: 1025px+

All components must work on all screen sizes.

---

## OUTPUT FORMAT

Return valid JSON:

```json
{
  "metadata": {
    "agent_id": "claude-frontend",
    "timestamp": "2025-10-14T...",
    "execution_time_ms": 0,
    "status": "completed"
  },
  "components": [
    {
      "file_path": "src/components/features/Header.tsx",
      "component_name": "Header",
      "code": "// Full component code",
      "dependencies": ["LanguageSwitcher", "DarkModeToggle"],
      "props_interface": "interface HeaderProps { currentLocale: Locale; }"
    }
    // ... all components
  ],
  "styles": [
    {
      "file_path": "src/app/globals.css",
      "content": "/* Tailwind base + custom styles */"
    }
  ],
  "i18n": {
    "config": "// Full i18n config code",
    "translations": {
      "se": { /* full JSON */ },
      "en": { /* full JSON */ },
      "ar": { /* full JSON */ },
      "fa": { /* full JSON */ },
      "zh": { /* full JSON */ },
      "es": { /* full JSON */ }
    }
  },
  "youtube_integration": {
    "iframe_controller": "// useYouTubePlayer hook code",
    "player_state_management": "// useStreamPlayer store code"
  },
  "accessibility_report": {
    "wcag_version": "2.2",
    "compliance_level": "AA",
    "issues_found": [],
    "fixes_applied": [
      "Added ARIA labels to all interactive elements",
      "Implemented keyboard navigation",
      "Ensured color contrast ratios",
      "Added focus-visible styles"
    ]
  },
  "performance_notes": "Bundle size: 230KB (under 250KB budget)"
}
```

---

## VALIDATION CHECKLIST

Before submitting:
- [ ] All components are fully implemented
- [ ] TypeScript has no errors
- [ ] WCAG 2.2 AA compliance achieved
- [ ] All 6 languages have complete translations
- [ ] YouTube player works with "only one active" policy
- [ ] Dark mode works across all components
- [ ] RTL support for Arabic/Farsi
- [ ] Keyboard navigation tested
- [ ] Bundle size <250KB

---

**CRITICAL**: You are working in parallel with Claude Backend. Do NOT implement API routes or backend logic. Stick to your assigned frontend tasks only.
