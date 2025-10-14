// src/components/features/ProgramSection.tsx
'use client';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';

export function ProgramSection() {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t('program.title')}</h2>
      <div>
        <h3>{t('program.day1')}</h3>
        {/* Add program details for day 1 here */}
      </div>
      <div>
        <h3>{t('program.day2')}</h3>
        {/* Add program details for day 2 here */}
      </div>
    </section>
  );
}
