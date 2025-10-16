"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import StreamCarousel from "@/components/features/StreamCarousel";
import ProgramSchedule from "@/components/features/ProgramSchedule";
import GraphNavigation from "@/components/features/GraphNavigation";
import type { Locale } from "@/types/i18n";

type LocalizedHomeProps = {
  lang: string;
};

export function LocalizedHome({ lang }: LocalizedHomeProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      void i18n.changeLanguage(lang as Locale);
    }
  }, [lang, i18n]);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-glass p-8 text-center md:p-12 glass-strong">
            <div className="mb-6 flex justify-center">
              <div className="glass-purple rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wider text-white">
                {t("event.dates", "6–7 november 2025")}
              </div>
            </div>
            <h1 className="animate-float mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              {t("event.title", "Dagar om Lagar 2025")}
            </h1>
            <p className="mb-8 mx-auto max-w-2xl text-lg text-white/80 md:text-xl">
              {t(
                "event.description",
                "Ett juridiskt symposium som utforskar lagar och samhälle",
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`/${lang}/program`}
                className="rounded-glass border border-white/40 px-8 py-3 font-semibold uppercase tracking-wide text-white transition hover:bg-white/10 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {t("nav.schedule", "Schema")}
                </span>
              </a>
              <a
                href="#streams"
                className="rounded-glass bg-gradient-to-r from-primary to-secondary px-8 py-3 font-semibold uppercase tracking-wide text-white transition hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                  </span>
                  {t("streams.live", "Live")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="streams" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t("streams.live", "Live")} {t("streams.title", "Strömmar")}
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              {t(
                "streams.subtitle",
                "Fyra samtidiga strömmar från konferensens geografiska noder",
              )}
            </p>
          </div>
          <StreamCarousel />
        </div>
      </section>

      <section className="bg-black/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t("program.title", "Program")}
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              {t(
                "program.subtitle",
                "Utforska vårt tvådagarsprogram med keynotes, paneler och workshops",
              )}
            </p>
          </div>
          <ProgramSchedule />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t("graph.title", "Kunskapsgraf")}
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              {t(
                "graph.subtitle",
                "Navigera mellan konferensens noder genom det interaktiva grafgränssnittet",
              )}
            </p>
          </div>
          <GraphNavigation />
        </div>
      </section>
    </div>
  );
}
