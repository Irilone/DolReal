import type { Locale } from '@/types/i18n';

interface HomePageProps {
  params: { locale: Locale };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Dagar om Lagar 2025
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Event starts November 6-7, 2025
        </p>
      </div>
    </main>
  );
}
