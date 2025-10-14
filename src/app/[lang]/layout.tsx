import type { Locale } from "@/types/i18n";
import { notFound } from "next/navigation";
import { getLocaleDirection, isValidLocale } from "@/lib/utils/locale";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { Header } from "@/components/features/Header";
import { Footer } from "@/components/features/Footer";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const direction = getLocaleDirection(lang);

  return (
    <ThemeProvider>
      <I18nProvider locale={lang}>
        <div className="flex min-h-screen flex-col">
          <Header locale={lang} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
