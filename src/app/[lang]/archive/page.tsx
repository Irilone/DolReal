"use client";

export const dynamic = "force-dynamic";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArchivePage() {
  const { t } = useTranslation();

  const archives = [
    {
      year: 2024,
      title: "Dagar om Lagar 2024",
      description: "Fokus på digitalisering och rättssäkerhet",
      videos: 24,
      views: 15420,
    },
    {
      year: 2023,
      title: "Dagar om Lagar 2023",
      description: "Klimatlagstiftning i centrum",
      videos: 20,
      views: 12350,
    },
    {
      year: 2022,
      title: "Dagar om Lagar 2022",
      description: "Pandemilagstiftning och demokrati",
      videos: 18,
      views: 10200,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-slate-900 dark:text-slate-100">
          {t("nav.archive")}
        </h1>

        <div className="mb-8 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Utforska inspelningar från tidigare års evenemang
          </p>
        </div>

        <div className="space-y-6">
          {archives.map((archive) => (
            <Card key={archive.year} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl">{archive.title}</span>
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    {archive.year}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  {archive.description}
                </p>
                <div className="mb-6 flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{archive.videos} videor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>
                      {archive.views.toLocaleString("sv-SE")} visningar
                    </span>
                  </div>
                </div>
                <Button className="w-full sm:w-auto">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Visa alla videor
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
            Letar du efter äldre material?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Kontakta oss på{" "}
            <a
              href="mailto:info@dagaromlagar.se"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              info@dagaromlagar.se
            </a>{" "}
            för att få tillgång till äldre inspelningar.
          </p>
        </div>
      </div>
    </div>
  );
}
