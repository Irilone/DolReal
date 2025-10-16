/**
 * DoL 2025 Streaming Hub Page
 * Multi-node video streaming with knowledge graph navigation, day-aware scheduling, and full i18n
 * Features: 4 concurrent streams (Day 1), 1 main stream (Day 2), InfraNodus integration, accessibility
 */

"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  dolNodes,
  dolProgram,
  dolGraphEdges,
  eventInfo,
  isNodeActiveOnDay,
  getProgramForDay,
  getActiveNodesForDay,
  getInactiveMessage,
  type DolNode,
  type EventDay,
} from "@/lib/dol/data";
import type { StreamNode } from "@/types/stream";

export const dynamic = "force-dynamic";

export default function DagarOmLagar2025() {
  const { t, i18n } = useTranslation();
  const [currentDay, setCurrentDay] = useState<EventDay>(1);
  const [activeStreamIndex, setActiveStreamIndex] = useState<number>(0);
  const [activeGraphNode, setActiveGraphNode] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [graphEmbed, setGraphEmbed] = useState<string>("");

  // Get active nodes for current day
  const activeNodes = useMemo(
    () => getActiveNodesForDay(currentDay),
    [currentDay]
  );

  // Get program for current day
  const dayProgram = useMemo(
    () => getProgramForDay(currentDay),
    [currentDay]
  );

  // Current active stream node
  const currentStreamNode = useMemo(
    () => activeNodes[activeStreamIndex] || dolNodes[0],
    [activeNodes, activeStreamIndex]
  );

  // Toggle functions
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Open graph modal for a node
  const openGraphNode = (node: DolNode) => {
    setActiveGraphNode(node.name);
    setGraphEmbed(`https://infranodus.com/embed/${node.graphId}`);
  };

  // Close graph modal
  const closeGraphModal = () => {
    setActiveGraphNode(null);
    setGraphEmbed("");
  };

  // Switch to a specific stream
  const switchToStream = (nodeId: StreamNode) => {
    const index = activeNodes.findIndex((n) => n.id === nodeId);
    if (index !== -1) {
      setActiveStreamIndex(index);
    }
  };

  // Switch to main stream (for day 2 CTA)
  const switchToMainStream = () => {
    setActiveStreamIndex(0); // Nodväst is always first
  };

  // Get thumbnail URL for YouTube video
  const getThumbnail = (youtubeId: string) =>
    `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  // Day selector component
  const DaySelector = () => (
    <div className="flex gap-2 justify-center mb-6">
      <Button
        variant={currentDay === 1 ? "default" : "outline"}
        onClick={() => setCurrentDay(1)}
        aria-pressed={currentDay === 1}
      >
        {t("program.day1", { defaultValue: "Day 1" })}
      </Button>
      <Button
        variant={currentDay === 2 ? "default" : "outline"}
        onClick={() => setCurrentDay(2)}
        aria-pressed={currentDay === 2}
      >
        {t("program.day2", { defaultValue: "Day 2" })}
      </Button>
    </div>
  );

  return (
    <div
      className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen transition-colors`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wide">
            {t("header.title", { defaultValue: eventInfo.name })}
          </h1>
          <nav className="flex gap-4" aria-label={t("nav.label", { defaultValue: "Main Navigation" })}>
            <a href="#graph" className="hover:underline focus:underline">
              {t("nav.graph", { defaultValue: "Graph" })}
            </a>
            <a href="#streams" className="hover:underline focus:underline">
              {t("nav.streams", { defaultValue: "Streams" })}
            </a>
            <a href="#program" className="hover:underline focus:underline">
              {t("nav.schedule", { defaultValue: "Program" })}
            </a>
          </nav>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={toggleDarkMode} aria-label={darkMode ? t("common.lightMode", { defaultValue: "Light mode" }) : t("common.darkMode", { defaultValue: "Dark mode" })}>
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 text-center bg-gradient-to-b from-black/60 to-transparent">
        <h2 className="text-4xl font-bold mb-4">
          {t("hero.welcome", { defaultValue: `Welcome to ${eventInfo.name}` })}
        </h2>
        <p className="text-xl opacity-80 mb-2">
          {t("event.dates", { defaultValue: eventInfo.dates })}
        </p>
        <p className="text-lg opacity-70">
          {t("event.description", { defaultValue: eventInfo.description })}
        </p>
      </section>

      {/* Knowledge Graph Navigation */}
      <section
        id="graph"
        className="py-12 px-4"
        aria-labelledby="graph-title"
      >
        <h2 id="graph-title" className="text-3xl font-semibold mb-6 text-center">
          {t("graph.title", { defaultValue: "Knowledge Graph Navigator" })}
        </h2>
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {dolNodes.map((node) => {
            const isActive = isNodeActiveOnDay(node.id, currentDay);
            return (
              <Card
                key={node.id}
                className={`backdrop-blur-sm border transition-all ${
                  isActive
                    ? "bg-white/10 border-white/20 hover:border-white/40"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}
                role="group"
                aria-label={`${t(node.nameKey, { defaultValue: node.name })} node`}
              >
                <CardContent className="p-4">
                  <div
                    className="w-3 h-3 rounded-full mb-2 mx-auto"
                    style={{ backgroundColor: node.color }}
                    aria-hidden="true"
                  />
                  <h3 className="font-bold text-lg mb-2">
                    {t(node.nameKey, { defaultValue: node.name })}
                  </h3>
                  {isActive && (
                    <span className="inline-block px-2 py-1 text-xs bg-red-600 text-white rounded mb-2">
                      {t("streams.live", { defaultValue: "LIVE" })}
                    </span>
                  )}
                  <div className="flex justify-center gap-2 mt-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openGraphNode(node)}
                      aria-label={`${t("graph.view", { defaultValue: "View" })} ${node.name} graph`}
                    >
                      {t("graph.view", { defaultValue: "View" })}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Graph Modal */}
      {activeGraphNode && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="graph-modal-title"
        >
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg max-w-3xl w-full">
            <h3 id="graph-modal-title" className="text-xl font-semibold mb-4">
              {activeGraphNode}
            </h3>
            <iframe
              src={graphEmbed}
              title={`${activeGraphNode} Knowledge Graph`}
              className="w-full h-96 border border-gray-300 dark:border-gray-700 rounded-md mb-4"
              aria-label={`${activeGraphNode} knowledge graph visualization`}
            />
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => {
                  const node = dolNodes.find((n) => n.name === activeGraphNode);
                  if (node && isNodeActiveOnDay(node.id, currentDay)) {
                    switchToStream(node.id);
                    closeGraphModal();
                  }
                }}
              >
                {t("graph.openStream", { defaultValue: "Open Stream" })}
              </Button>
              <Button variant="outline" onClick={closeGraphModal}>
                {t("graph.close", { defaultValue: "Close" })}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Day Selector */}
      <div className="py-6">
        <DaySelector />
      </div>

      {/* Live Streams Section */}
      <section
        id="streams"
        className="py-12 px-4 bg-black/40"
        aria-labelledby="streams-title"
      >
        <h2
          id="streams-title"
          className="text-3xl font-semibold mb-8 text-center"
        >
          {t("streams.liveStreams", { defaultValue: "Live Streams" })}
        </h2>

        {/* Main Stream Player */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2">
              {t(currentStreamNode.nameKey, {
                defaultValue: currentStreamNode.name,
              })}
            </h3>
            {isNodeActiveOnDay(currentStreamNode.id, currentDay) ? (
              <span className="inline-block px-3 py-1 text-sm bg-red-600 text-white rounded">
                {t("streams.live", { defaultValue: "LIVE" })}
              </span>
            ) : (
              <span className="inline-block px-3 py-1 text-sm bg-gray-600 text-white rounded">
                {t("streams.inactive", { defaultValue: "Not active today" })}
              </span>
            )}
          </div>
          <div className="aspect-video rounded-xl overflow-hidden border border-white/20">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentStreamNode.youtubeId}`}
              title={`${currentStreamNode.name} Stream`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              aria-label={`Main video player for ${currentStreamNode.name}`}
            />
          </div>
        </div>

        {/* Stream Carousel/Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {t("carousel.label", { defaultValue: "Stream Carousel" })}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dolNodes.map((node, index) => {
              const isActive = isNodeActiveOnDay(node.id, currentDay);
              const isCurrentStream = currentStreamNode.id === node.id;
              const inactiveKey = getInactiveMessage(node.id, currentDay);

              return (
                <div key={node.id} className="relative">
                  <button
                    onClick={() => isActive && switchToStream(node.id)}
                    disabled={!isActive}
                    className={`w-full aspect-video rounded-lg overflow-hidden border transition-all ${
                      isCurrentStream
                        ? "ring-4 ring-blue-500"
                        : isActive
                          ? "border-white/40 hover:border-white/60"
                          : "border-white/10 opacity-50 cursor-not-allowed"
                    }`}
                    aria-label={`${isActive ? "Switch to" : "Inactive"} ${node.name} stream`}
                  >
                    <img
                      src={getThumbnail(node.youtubeId)}
                      alt={`${node.name} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2">
                      <h4 className="font-bold text-sm mb-1">
                        {t(node.nameKey, { defaultValue: node.name })}
                      </h4>
                      {isActive ? (
                        <span className="text-xs bg-red-600 px-2 py-1 rounded">
                          {t("streams.live", { defaultValue: "LIVE" })}
                        </span>
                      ) : (
                        <span className="text-xs text-center">
                          {t(`streams.${inactiveKey}`, {
                            defaultValue: t("streams.inactive", {
                              defaultValue: "Not active today",
                            }),
                          })}
                        </span>
                      )}
                    </div>
                  </button>
                  {/* Day 2 CTA for inactive nodes */}
                  {!isActive && currentDay === 2 && node.id !== "nodvast" && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={switchToMainStream}
                      >
                        {t("streams.switchToMain", {
                          defaultValue: "Switch to Main Stream",
                        })}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Schedule Section */}
      <section
        id="program"
        className="py-12 px-4"
        aria-labelledby="program-title"
      >
        <h2
          id="program-title"
          className="text-3xl font-semibold mb-8 text-center"
        >
          {t("program.schedule", { defaultValue: "Program Schedule" })}
        </h2>

        <div className="max-w-5xl mx-auto">
          <DaySelector />

          {/* Group program by node */}
          {activeNodes.map((node) => {
            const nodeProgram = dayProgram.filter((p) => p.node === node.id);
            if (nodeProgram.length === 0) return null;

            return (
              <div key={node.id} className="mb-8">
                <h3
                  className="text-2xl font-bold mb-4 flex items-center gap-2"
                  style={{ color: node.color }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: node.color }}
                    aria-hidden="true"
                  />
                  {t(node.nameKey, { defaultValue: node.name })}
                </h3>
                <div className="space-y-3">
                  {nodeProgram.map((item) => (
                    <Card
                      key={item.id}
                      className="bg-white/5 border border-white/10"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm opacity-70">
                                {item.time}
                              </span>
                              <span className="text-xs opacity-60">
                                ({item.duration} min)
                              </span>
                            </div>
                            <h4 className="font-bold text-lg">
                              {t(item.titleKey, { defaultValue: item.title })}
                            </h4>
                            {item.speaker && (
                              <p className="text-sm opacity-80 mt-1">
                                {item.speakerKey
                                  ? t(item.speakerKey, {
                                      defaultValue: item.speaker,
                                    })
                                  : item.speaker}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-sm opacity-70 mt-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center border-t border-white/10"
        aria-label="Footer"
      >
        <p className="opacity-70">
          {t("footer.copyright", {
            defaultValue: "© 2025 Dagar om Lagar – All Rights Reserved",
          })}
        </p>
        <p className="opacity-60 text-sm mt-2">
          {t("footer.contact", { defaultValue: "Contact" })}: info@dagaromlagar.se
        </p>
      </footer>
    </div>
  );
}
