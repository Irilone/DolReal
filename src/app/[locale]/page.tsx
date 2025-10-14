import { Locale } from '@/types'
import Header from '@/components/features/Header'
import StreamCarousel from '@/components/features/StreamCarousel'

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  
  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          Dagar om Lagar 2025
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Event starts November 6-7, 2025
        </p>
        <StreamCarousel />
      </div>
    </main>
  )
}
