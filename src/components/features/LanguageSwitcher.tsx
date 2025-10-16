'use client'

import { Locale } from '@/types'
import { usePathname } from 'next/navigation'

const languages: Record<Locale, string> = {
  se: 'Svenska',
  en: 'English',
  ar: 'العربية',
  fa: 'فارسی',
  zh: '中文',
  es: 'Español',
}

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()

  return (
    <select
      value={currentLocale}
      onChange={(e) => {
        const newLocale = e.target.value as Locale
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
        window.location.href = newPath
      }}
      className="px-3 py-2 rounded-md border bg-background"
      aria-label="Välj språk"
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  )
}
