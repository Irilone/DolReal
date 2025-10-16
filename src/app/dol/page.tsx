// === FILE: DoL.tsx ===
// Dynamic site with InfraNodus integration, enhanced accessibility, ARIA compliance
// TypeScript React (Next.js 15 + Tailwind + i18next)

"use client";
import React, { useState } from "react";

export const dynamic = "force-dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function DagarOmLagar2025() {
  const { t, i18n } = useTranslation();
  const [activeStream, setActiveStream] = useState<number>(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [graphEmbed, setGraphEmbed] = useState<string>("");

  const streams = ["dQw4w9WgXcQ", "kJQP7kiw5Fk", "5NV6Rdv1a3I", "3JZ_D3ELwOQ"];

  const nodes = [
    { name: "Nodväst", graphId: "graph1" },
    { name: "Nodsyd", graphId: "graph2" },
    { name: "Nodöst", graphId: "graph3" },
    { name: "Nodmidd", graphId: "graph4" },
  ];

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "se" ? "en" : "se");
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const openNode = (node: string, graphId: string) => {
    setActiveNode(node);
    setGraphEmbed(`https://infranodus.com/embed/${graphId}`);
  };

  return (
    <div
      className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen transition-colors`}
    >
      <header className="glass sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-white/20">
        <h1 className="text-2xl font-bold tracking-wide">
          {t("title", { defaultValue: "Dagar om Lagar 2025" })}
        </h1>
        <nav className="flex gap-4" aria-label="Main Navigation">
          <a href="#streams" className="hover:underline focus:underline">
            Streams
          </a>
          <a href="#program" className="hover:underline focus:underline">
            Program
          </a>
          <a href="#kontakt" className="hover:underline focus:underline">
            Kontakt
          </a>
        </nav>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleLanguage}>
            {i18n.language?.toUpperCase() || "SE"}
          </Button>
          <Button variant="secondary" size="sm" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </Button>
        </div>
      </header>

      <section
        id="graph"
        className="py-12 px-4 text-center"
        aria-labelledby="graph-title"
      >
        <h2 id="graph-title" className="text-xl font-semibold mb-4">
          Knowledge Graph Navigator
        </h2>
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {nodes.map((node) => (
            <Card
              key={node.name}
              className="bg-white/5 backdrop-blur-sm border border-white/10"
              role="group"
              aria-label={`Node ${node.name}`}
            >
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{node.name}</h3>
                <div className="flex justify-center gap-2 mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openNode(node.name, node.graphId)}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {activeNode && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full relative">
            <h3 className="text-xl font-semibold mb-2">{activeNode}</h3>
            <iframe
              src={graphEmbed}
              title="InfraNodus Graph"
              className="w-full h-80 border border-gray-200 rounded-md mb-4"
              aria-label="InfraNodus knowledge graph embed"
            />
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() =>
                  setActiveStream(
                    nodes.findIndex((n) => n.name === activeNode) || 0,
                  )
                }
              >
                Open Stream
              </Button>
              <Button variant="outline" onClick={() => setActiveNode(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <section
        id="streams"
        className="py-12 bg-black/40"
        aria-labelledby="streams-title"
      >
        <h2
          id="streams-title"
          className="text-center text-xl font-semibold mb-6"
        >
          Live Streams
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video mb-6 border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${streams[activeStream]}`}
              title={`Active Stream ${activeStream + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {streams.map((id, i) => (
              <button
                key={i}
                onClick={() => setActiveStream(i)}
                className={`aspect-video border border-white/20 rounded-lg overflow-hidden ${activeStream === i ? "ring-2 ring-blue-400" : ""}`}
                aria-label={`Switch to stream ${i + 1}`}
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Stream ${i + 1}`}
                  allowFullScreen
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        id="program"
        className="py-12 px-4"
        aria-labelledby="program-title"
      >
        <h2
          id="program-title"
          className="text-center text-xl font-semibold mb-6"
        >
          Program Schedule
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3].map((s) => (
            <Card key={s} className="bg-white/5 border border-white/10">
              <CardContent className="p-4">
                <h3 className="font-bold">Session {s}</h3>
                <p className="text-sm opacity-80">
                  Speaker {s} – Topic details pending.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer
        id="kontakt"
        className="py-8 text-center border-t border-white/10"
        aria-label="Footer"
      >
        <p className="opacity-70">
          © 2025 Dagar om Lagar – All Rights Reserved.
        </p>
        <p className="opacity-60 text-sm mt-2">Contact: info@dagaromlagar.se</p>
      </footer>
    </div>
  );
}
