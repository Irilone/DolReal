import { Locale } from '@/types'

export async function generateStaticParams() {
  return [
    { locale: 'se' },
    { locale: 'en' },
    { locale: 'ar' },
    { locale: 'fa' },
    { locale: 'zh' },
    { locale: 'es' },
  ]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dir = locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr'
  
  return (
    <div dir={dir} lang={locale}>
      {children}
    </div>
  )
}
