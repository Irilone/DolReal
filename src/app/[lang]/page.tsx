'use client';

import { useTranslation } from 'react-i18next';
import type { Locale } from '@/types/i18n';
import StreamCarousel from '@/components/features/StreamCarousel';
import ProgramSchedule from '@/components/features/ProgramSchedule';
import GraphNavigation from '@/components/features/GraphNavigation';

interface HomePageProps {
  lang: Locale;
}

export default function HomePage({ lang }: HomePageProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Glassmorphism */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="glass-strong rounded-glass p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="glass-purple px-6 py-2 rounded-full text-sm font-semibold text-white uppercase tracking-wider">
                {t('event.dates', '6-7 November 2025')}
              </div>
            </div>
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-float">
              {t('event.title', 'Dagar om Lagar 2025')}
            </h1>
            <p className="mb-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {t('event.description', 'Ett juridiskt symposium som utforskar lagar och samhälle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <a
                href={`/${lang}/schedule`}
                className="glass-strong px-8 py-3 rounded-glass font-semibold text-white
                           hover:scale-105 hover:shadow-glow transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {t('nav.schedule', 'Schema')}
                </span>
              </a>
              <a
                href={`/${lang}/streams`}
                className="bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-glass
                           font-semibold text-white hover:scale-105 hover:shadow-glow-lg
                           transition-all duration-300 focus:outline-none focus:ring-2
                           focus:ring-primary/50"
              >
                <span className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  {t('streams.live', 'LIVE')} Strömmar
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Live Streams Carousel */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
              {t('streams.live', 'LIVE')} Strömmar
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Fyra samtidiga strömmar från olika noder runt om i Sverige
            </p>
          </div>
          <StreamCarousel />
        </div>
      </section>

      {/* Program Schedule */}
      <section className="py-16 md:py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
              {t('program.title', 'Program')}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Utforska vårt tvådagars program med keynotes, paneldiskussioner och workshops
            </p>
          </div>
          <ProgramSchedule />
        </div>
      </section>

      {/* Knowledge Graph */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
              Kunskapsgraf
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Utforska samband mellan ämnen, talare och strömmar
            </p>
          </div>
          <GraphNavigation className="min-h-[600px]" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="glass-strong rounded-glass p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white">
              Missa inte detta unika evenemang
            </h2>
            <p className="mb-8 text-white/70">
              Anmäl dig idag och ta del av två dagar av djupgående diskussioner om juridik,
              samhälle och framtiden.
            </p>
            <a
              href={`/${lang}/about`}
              className="inline-block glass-strong px-8 py-3 rounded-glass font-semibold
                         text-white hover:scale-105 hover:shadow-glow transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Läs mer om evenemanget
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-strong border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Dagar om Lagar</h3>
              <p className="text-white/60 text-sm">
                Ett juridiskt symposium som utforskar lagar och samhälle
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Snabblänkar</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`/${lang}`} className="text-white/60 hover:text-white transition-colors">
                    Hem
                  </a>
                </li>
                <li>
                  <a
                    href={`/${lang}/schedule`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Schema
                  </a>
                </li>
                <li>
                  <a
                    href={`/${lang}/streams`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Strömmar
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
              <p className="text-white/60 text-sm">info@dagaromlagar.se</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2025 Dagar om Lagar. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
