"use client";

export const dynamic = "force-dynamic";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-slate-900 dark:text-slate-100">
          {t("nav.about")}
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Om Evenemanget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              Dagar om Lagar 2025 är ett juridiskt symposium som utforskar
              samspelet mellan lagstiftning och samhälle. Under två intensiva
              dagar samlas jurister, akademiker, politiker och medborgare för
              att diskutera aktuella rättsliga frågor.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Evenemanget sänds live från fyra olika platser i Sverige -
              Nodväst, Nodsyd, Nodöst och Nodmidd - vilket möjliggör ett unikt
              geografiskt perspektiv på svenska rättssystemet.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Våra Noder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  Nodväst
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Fokuserar på miljörätt och kustnära lagstiftning
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  Nodsyd
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Specialiserad på internationell rätt och migration
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  Nodöst
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Arbetar med digitaliseringens påverkan på juridiken
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
                  Nodmidd
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Centrerar kring konstitutionell rätt och demokrati
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontakt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              För frågor om evenemanget, kontakta oss på:
            </p>
            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <p>
                <strong>E-post:</strong> info@dagaromlagar.se
              </p>
              <p>
                <strong>Telefon:</strong> +46 8 123 456 78
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
