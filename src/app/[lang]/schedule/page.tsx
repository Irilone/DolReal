"use client";

export const dynamic = "force-dynamic";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SchedulePage() {
  const { t } = useTranslation();

  const schedule = {
    day1: [
      { time: "09:00", title: "Öppningsceremoni", node: "Alla noder" },
      { time: "10:00", title: "Miljörätt i förändring", node: "Nodväst" },
      { time: "10:00", title: "Migration och asylrätt", node: "Nodsyd" },
      { time: "13:00", title: "Lunch", node: "Alla noder" },
      { time: "14:00", title: "AI och juridiken", node: "Nodöst" },
      { time: "14:00", title: "Demokrati och rättssäkerhet", node: "Nodmidd" },
      { time: "16:00", title: "Paneldiskussion", node: "Alla noder" },
    ],
    day2: [
      { time: "09:00", title: "Morgonsamling", node: "Alla noder" },
      { time: "10:00", title: "Klimatlagar och framtiden", node: "Nodväst" },
      { time: "10:00", title: "Arbetskraftsinvandring", node: "Nodsyd" },
      { time: "13:00", title: "Lunch", node: "Alla noder" },
      { time: "14:00", title: "Dataskydd och GDPR", node: "Nodöst" },
      { time: "14:00", title: "Konstitutionella reformer", node: "Nodmidd" },
      { time: "16:00", title: "Avslutning", node: "Alla noder" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-slate-900 dark:text-slate-100">
          {t("nav.schedule")}
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Dag 1 - 6 November 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.day1.map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="min-w-[4rem] font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {session.time}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {session.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {session.node}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Dag 2 - 7 November 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.day2.map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 border-l-4 border-green-500 pl-4 py-2"
                >
                  <div className="min-w-[4rem] font-mono text-sm font-semibold text-green-600 dark:text-green-400">
                    {session.time}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {session.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {session.node}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Observera:</strong> Alla tider är i svensk tid (CET/CEST).
            Schemat kan komma att ändras.
          </p>
        </div>
      </div>
    </div>
  );
}
