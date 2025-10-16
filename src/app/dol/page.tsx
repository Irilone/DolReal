"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import GraphNavigation from "@/components/features/GraphNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  DOL_NODES,
  type DolNodeKey,
  buildThumbnailUrl,
  GRAPH_NODES,
  GRAPH_LINKS,
} from "@/lib/dol/data";
import type { EventDay } from "@/types/stream";
import { LOCALE_CONFIGS, type Locale } from "@/types/i18n";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { key: "home", href: "https://dagaromlagar.se/" },
  { key: "program2024", href: "https://dagaromlagar.se/program-2024-2/" },
  {
    key: "register",
    href: "https://forms.office.com/pages/responsepage.aspx?id=jik-STzq_EK9kLkIW0Mcq5FkJEr0LJRFkTJvw9BMssBUN0tZSEVGM1VHTUQwNkIwVThEVDdNWDBITi4u&route=shorturl",
  },
  { key: "speakers", href: "https://dagaromlagar.se/forelasare-2/" },
  { key: "recordings", href: "https://dagaromlagar.se/inspelningar-2024/" },
  { key: "speakers2024", href: "https://dagaromlagar.se/forelasare-2024/" },
  { key: "contact", href: "https://dagaromlagar.se/kontakta-oss/" },
] as const;

const DAY_OPTIONS: { id: EventDay; labelKey: string }[] = [
  { id: 1, labelKey: "dol.days.day1" },
  { id: 2, labelKey: "dol.days.day2" },
];

const nodeOrder = Object.keys(DOL_NODES) as DolNodeKey[];

/**
 * Renders the Dagar om Lagar — Digitalt nav page with a knowledge graph, live stream viewer, node stream grid, and program schedule.
 *
 * The component is language-aware (uses i18n) and synchronizes document language and direction. It lets users switch the active conference day and select a node via the graph or stream grid; the UI updates the displayed livestream (YouTube embed when available), node metadata, and the program list for the selected node and day.
 *
 * @returns The page content as a React element
 */
export default function DagarOmLagarDolPage() {
  const { t, i18n } = useTranslation();
  const [activeNode, setActiveNode] = useState<DolNodeKey>("nodvast");
  const [activeDay, setActiveDay] = useState<EventDay>(1);

  useEffect(() => {
    document.documentElement.lang = i18n.language || "se";
    document.documentElement.dir = i18n.dir();
  }, [i18n.language]);

  const graphNodes = useMemo(
    () =>
      GRAPH_NODES.map((node) => {
        if (
          node.id === "nodvast" ||
          node.id === "nodsyd" ||
          node.id === "nodost" ||
          node.id === "nodmidd"
        ) {
          const key = node.id as DolNodeKey;
          return { ...node, label: t(`streams.${key}`, DOL_NODES[key].name) };
        }
        return { ...node, label: t(`dol.graphLabels.${node.id}`, node.label) };
      }),
    [t],
  );

  const activeNodeData = DOL_NODES[activeNode];
  const activeStream = activeNodeData.streams[activeDay];
  const programItems = activeNodeData.program[activeDay] ?? [];

  const handleLanguageChange = (nextLocale: Locale) => {
    if (i18n.language !== nextLocale) {
      i18n.changeLanguage(nextLocale);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <header className="glass-strong sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[15vh] w-full max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              {t("dol.header.tagline", "Dagar om Lagar 2025")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("dol.header.title", "Dagar om Lagar 2025 – Digitalt nav")}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <nav
              className="flex flex-wrap items-center gap-3"
              aria-label={t("dol.nav.aria", "Huvudnavigation")}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:scale-105 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {t(`dol.nav.${link.key}`, link.key)}
                </a>
              ))}
            </nav>
            <label
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80"
              htmlFor="language-picker"
            >
              <span aria-hidden="true">🌐</span>
              <span className="sr-only md:not-sr-only">
                {t("dol.language.label", "Språk")}
              </span>
              <select
                id="language-picker"
                value={i18n.language as Locale}
                onChange={(event) =>
                  handleLanguageChange(event.target.value as Locale)
                }
                className="bg-transparent text-white outline-none"
              >
                {Object.values(LOCALE_CONFIGS).map((config) => (
                  <option
                    key={config.code}
                    value={config.code}
                    className="bg-slate-900 text-white"
                  >
                    {config.flag} {config.nativeName}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-16">
        <section className="py-12">
          <div className="glass-strong rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4 md:max-w-2xl">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                  {t(
                    "dol.hero.tagline",
                    "Digital konferensplattform • 6–7 november 2025",
                  )}
                </span>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                  {t(
                    "dol.hero.title",
                    "Fyra noder – ett sammanhållet rättssystem",
                  )}
                </h2>
                <p className="text-base text-white/70 md:text-lg">
                  {t(
                    "dol.hero.description",
                    "Växla mellan noderna Nodväst, Nodsyd, Nodöst och Nodmidd. Utforska programmet för varje dag och lås upp djupare insikter via kunskapsgrafen.",
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveNode("nodvast");
                      setActiveDay(1);
                    }}
                    className="rounded-full bg-gradient-to-r from-primary/70 to-secondary/70 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {t("dol.hero.primaryCta", "Starta huvudströmmen")}
                  </button>
                  <a
                    href="#program"
                    className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/80 transition hover:scale-105 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {t("dol.hero.secondaryCta", "Utforska programmet")}
                  </a>
                </div>
              </div>
              <div className="grid gap-4 text-sm text-white/70 md:w-80">
                <div className="glass rounded-2xl border border-white/10 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
                    {t("dol.streams.meta.location", "Plats")}
                  </h3>
                  <p className="text-base text-white">
                    {activeNodeData.location}
                  </p>
                </div>
                <div className="glass rounded-2xl border border-white/10 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
                    {t("dol.streams.meta.theme", "Tema")}
                  </h3>
                  <p className="text-base text-white">{activeNodeData.theme}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="graph" className="py-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {t("dol.graph.title", "Kunskapsgraf – navigera noderna")}
              </h2>
              <p className="text-white/70">
                {t(
                  "dol.graph.subtitle",
                  "Klicka på en nod för att öppna motsvarande ström och program.",
                )}
              </p>
            </div>
            <div
              className="flex flex-wrap gap-3"
              role="group"
              aria-label={t("dol.days.label", "Välj konferensdag")}
            >
              {DAY_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveDay(option.id)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                    activeDay === option.id
                      ? "border-primary/80 bg-primary/20 text-white shadow-lg shadow-primary/20"
                      : "border-white/30 text-white/70 hover:scale-105 hover:text-white",
                  )}
                  aria-pressed={activeDay === option.id}
                >
                  {t(option.labelKey)}
                </button>
              ))}
            </div>
          </div>
          <GraphNavigation
            nodes={graphNodes}
            links={GRAPH_LINKS}
            className="max-h-[600px] min-h-[420px]"
            onNodeClick={(node) => {
              if (
                node.id === "nodvast" ||
                node.id === "nodsyd" ||
                node.id === "nodost" ||
                node.id === "nodmidd"
              ) {
                setActiveNode(node.id as DolNodeKey);
              }
            }}
          />
        </section>

        <section id="streams" className="py-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("dol.streams.title", "Liveströmmar")}
            </h2>
            <p className="text-white/70">
              {t(
                "dol.streams.subtitle",
                "Karusellen nedan låter dig byta nod. Endast en ström spelas åt gången.",
              )}
            </p>
          </div>

          <Card className="glass-strong rounded-3xl border border-white/10">
            <CardContent className="space-y-8 p-6 md:p-10">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
                {activeStream?.active ? (
                  <iframe
                    key={`${activeNode}-${activeDay}`}
                    className="aspect-video w-full"
                    src={`https://www.youtube.com/embed/${activeStream.youtubeId}?rel=0`}
                    title={`${activeNodeData.name} livestream`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-black/40 px-8 text-center text-white/80">
                    <p className="text-lg font-semibold">
                      {t(
                        "dol.streams.inactiveDay",
                        "Denna nod sänder inte live dag {{day}}.",
                        { day: activeDay },
                      )}
                    </p>
                    <p className="text-sm text-white/60">
                      {activeStream?.message}
                    </p>
                    <button
                      onClick={() => setActiveNode("nodvast")}
                      className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      {t(
                        "dol.streams.switchToMain",
                        "Byt till huvudströmmens Nodväst",
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {nodeOrder.map((nodeKey) => {
                  const node = DOL_NODES[nodeKey];
                  const stream = node.streams[activeDay];
                  const isActive = nodeKey === activeNode;
                  return (
                    <button
                      key={node.key}
                      onClick={() => setActiveNode(node.key)}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl border border-white/10 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                        isActive
                          ? "border-primary/70 shadow-lg shadow-primary/30"
                          : "hover:-translate-y-1 hover:border-primary/40",
                      )}
                      aria-pressed={isActive}
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={buildThumbnailUrl(stream.youtubeId)}
                          alt={t(
                            "dol.streams.thumbnailLabel",
                            "{{node}} – växla ström",
                            { node: node.name },
                          )}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className={cn(
                            "object-cover transition",
                            isActive
                              ? "opacity-100"
                              : "opacity-90 group-hover:opacity-100",
                          )}
                          loading="lazy"
                        />
                        {!stream.active && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-center text-xs font-semibold uppercase tracking-wide text-white">
                            {t(
                              "dol.streams.inactiveDay",
                              "Denna nod sänder inte live dag {{day}}.",
                              { day: activeDay },
                            )}
                          </div>
                        )}
                        {isActive && (
                          <div
                            className="absolute inset-0 border-4 border-primary/70 mix-blend-screen"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="space-y-1 bg-black/40 px-4 py-4">
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                          {t(`streams.${node.key}`, node.name)}
                        </p>
                        <p className="text-lg font-semibold text-white">
                          {node.name}
                        </p>
                        <p className="text-xs text-white/60">{node.location}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="program" className="py-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("dol.program.title", "Program för {{node}}", {
                node: t(`streams.${activeNode}`, activeNodeData.name),
              })}
            </h2>
            <p className="text-white/70">{activeNodeData.description}</p>
          </div>
          <div className="space-y-4">
            {programItems.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center text-white/70">
                {t(
                  "dol.program.empty",
                  "Ingen session planerad för denna dag.",
                )}{" "}
                {activeStream?.message}
              </p>
            ) : (
              programItems.map((item, index) => (
                <article
                  key={`${item.time}-${item.title}-${index}`}
                  className="glass rounded-2xl border border-white/10 p-6 transition hover:border-primary/40 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        <span className="font-mono">{item.time}</span>
                        <span
                          className="h-2 w-2 rounded-full bg-primary/70"
                          aria-hidden="true"
                        />
                        <span>
                          {t(`dol.program.format.${item.format}`, item.format)}
                        </span>
                      </span>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                      <p className="max-w-3xl text-white/70">
                        {item.description}
                      </p>
                    </div>
                    <div className="space-y-3 text-sm text-white/70 md:text-right">
                      {item.speakers.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/50">
                            {t("dol.program.speakers", "Medverkande")}
                          </h4>
                          <ul className="mt-1 space-y-1 text-sm text-white/80">
                            {item.speakers.map((speaker) => (
                              <li key={speaker}>{speaker}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.focus && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/50">
                            {t("dol.program.focus", "Fokus")}
                          </h4>
                          <p className="text-sm text-white/80">{item.focus}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="glass-strong border-t border-white/10 py-10 text-center text-sm text-white/60">
        <p>
          {t(
            "dol.footer.info",
            "Officiell digital plattform för Dagar om Lagar 2025.",
          )}
        </p>
        <p className="mt-2">
          {t(
            "dol.footer.rights",
            "© 2025 Dagar om Lagar. Alla rättigheter förbehållna.",
          )}
        </p>
      </footer>
    </div>
  );
}