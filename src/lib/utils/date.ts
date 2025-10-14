import type { EventDay } from '@/types/stream';

export const EVENT_DATES = {
  day1: new Date('2025-11-06T00:00:00+01:00'),
  day2: new Date('2025-11-07T00:00:00+01:00'),
};

export function getCurrentEventDay(): EventDay {
  const now = new Date();
  const eventStart = EVENT_DATES.day1;
  const eventEnd = new Date('2025-11-07T23:59:59+01:00');

  if (now < eventStart || now > eventEnd) {
    return 1; // Default to Day 1 if outside event period
  }

  if (now >= EVENT_DATES.day2) {
    return 2;
  }

  return 1;
}

export function isEventActive(): boolean {
  const now = new Date();
  const eventStart = EVENT_DATES.day1;
  const eventEnd = new Date('2025-11-07T23:59:59+01:00');

  return now >= eventStart && now <= eventEnd;
}

export function formatEventDate(date: Date, locale: string = 'se'): string {
  const localeMap: Record<string, string> = {
    se: 'sv-SE',
    en: 'en-US',
    ar: 'ar-SA',
    fa: 'fa-IR',
    zh: 'zh-CN',
    es: 'es-ES',
  };

  return date.toLocaleDateString(localeMap[locale] || 'sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
