/**
 * Centralized data model for DoL 2025 streaming hub
 * Provides node metadata, YouTube IDs, day-based activation, program schedules, and graph topology
 */

import type { StreamNode, EventDay } from "@/types/stream";

export interface DolNode {
  id: StreamNode;
  name: string;
  nameKey: string; // i18n key
  youtubeId: string;
  graphId: string;
  activeDays: EventDay[];
  color: string;
  description: string;
}

export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  titleKey: string; // i18n key
  speaker?: string;
  speakerKey?: string; // i18n key
  node: StreamNode;
  day: EventDay;
  duration: number; // minutes
  description?: string;
}

export interface GraphEdge {
  from: StreamNode;
  to: StreamNode;
  label: string;
}

// Four streaming nodes with metadata
export const dolNodes: DolNode[] = [
  {
    id: "nodvast",
    name: "Nordväst",
    nameKey: "streams.nodvast",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    graphId: "nodvast-graph",
    activeDays: [1, 2], // Active both days
    color: "#3B82F6", // Blue
    description: "Main conference stream - Northwest Node",
  },
  {
    id: "nodsyd",
    name: "Nordsyd",
    nameKey: "streams.nodsyd",
    youtubeId: "kJQP7kiw5Fk", // Replace with actual YouTube video ID
    graphId: "nodsyd-graph",
    activeDays: [1], // Active only day 1
    color: "#10B981", // Green
    description: "South Node workshop stream",
  },
  {
    id: "nodost",
    name: "Nordöst",
    nameKey: "streams.nodost",
    youtubeId: "5NV6Rdv1a3I", // Replace with actual YouTube video ID
    graphId: "nodost-graph",
    activeDays: [1], // Active only day 1
    color: "#F59E0B", // Amber
    description: "East Node panel discussions",
  },
  {
    id: "nodmidd",
    name: "Nordmidd",
    nameKey: "streams.nodmidd",
    youtubeId: "3JZ_D3ELwOQ", // Replace with actual YouTube video ID
    graphId: "nodmidd-graph",
    activeDays: [1], // Active only day 1
    color: "#8B5CF6", // Purple
    description: "Central Node keynotes",
  },
];

// Program schedule for both days
export const dolProgram: ProgramItem[] = [
  // Day 1 - November 6, 2025 - All nodes active
  {
    id: "day1-nodvast-1",
    time: "09:00",
    title: "Opening Ceremony",
    titleKey: "program.day1.opening",
    speaker: "Dr. Anna Svensson",
    speakerKey: "program.speakers.svensson",
    node: "nodvast",
    day: 1,
    duration: 60,
    description: "Welcome address and conference overview",
  },
  {
    id: "day1-nodvast-2",
    time: "10:00",
    title: "Keynote: Digital Rights in 2025",
    titleKey: "program.day1.keynote1",
    speaker: "Prof. Erik Johansson",
    speakerKey: "program.speakers.johansson",
    node: "nodvast",
    day: 1,
    duration: 90,
  },
  {
    id: "day1-nodsyd-1",
    time: "10:00",
    title: "Workshop: Privacy Law Fundamentals",
    titleKey: "program.day1.workshop1",
    speaker: "Maria Bergström",
    speakerKey: "program.speakers.bergstrom",
    node: "nodsyd",
    day: 1,
    duration: 120,
  },
  {
    id: "day1-nodost-1",
    time: "10:00",
    title: "Panel: AI and Legal Ethics",
    titleKey: "program.day1.panel1",
    node: "nodost",
    day: 1,
    duration: 90,
  },
  {
    id: "day1-nodmidd-1",
    time: "10:00",
    title: "Keynote: International Law Perspectives",
    titleKey: "program.day1.keynote2",
    speaker: "Dr. Lars Andersson",
    speakerKey: "program.speakers.andersson",
    node: "nodmidd",
    day: 1,
    duration: 90,
  },
  {
    id: "day1-nodvast-3",
    time: "13:00",
    title: "Afternoon Session: Case Studies",
    titleKey: "program.day1.afternoon1",
    node: "nodvast",
    day: 1,
    duration: 120,
  },
  {
    id: "day1-nodsyd-2",
    time: "13:00",
    title: "Workshop: Contract Law Updates",
    titleKey: "program.day1.workshop2",
    node: "nodsyd",
    day: 1,
    duration: 120,
  },
  {
    id: "day1-nodost-2",
    time: "13:00",
    title: "Panel: Environmental Law",
    titleKey: "program.day1.panel2",
    node: "nodost",
    day: 1,
    duration: 120,
  },
  {
    id: "day1-nodmidd-2",
    time: "13:00",
    title: "Keynote: Human Rights in Focus",
    titleKey: "program.day1.keynote3",
    node: "nodmidd",
    day: 1,
    duration: 120,
  },
  {
    id: "day1-nodvast-4",
    time: "16:00",
    title: "Day 1 Closing Remarks",
    titleKey: "program.day1.closing",
    node: "nodvast",
    day: 1,
    duration: 30,
  },

  // Day 2 - November 7, 2025 - Only Nodväst active
  {
    id: "day2-nodvast-1",
    time: "09:00",
    title: "Day 2 Opening",
    titleKey: "program.day2.opening",
    speaker: "Dr. Anna Svensson",
    speakerKey: "program.speakers.svensson",
    node: "nodvast",
    day: 2,
    duration: 30,
  },
  {
    id: "day2-nodvast-2",
    time: "09:30",
    title: "Keynote: Future of Legal Tech",
    titleKey: "program.day2.keynote1",
    speaker: "Tech Leader",
    speakerKey: "program.speakers.techleader",
    node: "nodvast",
    day: 2,
    duration: 90,
  },
  {
    id: "day2-nodvast-3",
    time: "11:00",
    title: "Panel: Legislative Changes 2025",
    titleKey: "program.day2.panel1",
    node: "nodvast",
    day: 2,
    duration: 90,
  },
  {
    id: "day2-nodvast-4",
    time: "13:00",
    title: "Afternoon Keynote: Global Perspectives",
    titleKey: "program.day2.keynote2",
    node: "nodvast",
    day: 2,
    duration: 120,
  },
  {
    id: "day2-nodvast-5",
    time: "15:00",
    title: "Closing Ceremony",
    titleKey: "program.day2.closing",
    node: "nodvast",
    day: 2,
    duration: 60,
  },
];

// Knowledge graph topology - connections between nodes
export const dolGraphEdges: GraphEdge[] = [
  { from: "nodvast", to: "nodsyd", label: "Legal Frameworks" },
  { from: "nodvast", to: "nodost", label: "Ethics & Technology" },
  { from: "nodvast", to: "nodmidd", label: "International Law" },
  { from: "nodsyd", to: "nodost", label: "Privacy & AI" },
  { from: "nodost", to: "nodmidd", label: "Human Rights" },
  { from: "nodsyd", to: "nodmidd", label: "Contract Law" },
];

// Helper functions
export function getNodeById(nodeId: StreamNode): DolNode | undefined {
  return dolNodes.find((node) => node.id === nodeId);
}

export function isNodeActiveOnDay(nodeId: StreamNode, day: EventDay): boolean {
  const node = getNodeById(nodeId);
  return node ? node.activeDays.includes(day) : false;
}

export function getProgramForDay(day: EventDay): ProgramItem[] {
  return dolProgram.filter((item) => item.day === day);
}

export function getProgramForNode(
  nodeId: StreamNode,
  day?: EventDay,
): ProgramItem[] {
  return dolProgram.filter(
    (item) => item.node === nodeId && (day === undefined || item.day === day),
  );
}

export function getActiveNodesForDay(day: EventDay): DolNode[] {
  return dolNodes.filter((node) => node.activeDays.includes(day));
}

export function getInactiveMessage(nodeId: StreamNode, day: EventDay): string {
  if (day === 2 && nodeId !== "nodvast") {
    return "inactive_day2";
  }
  return "inactive_general";
}

// Event metadata
export const eventInfo = {
  name: "Dagar om Lagar 2025",
  nameKey: "event.title",
  dates: "6-7 november 2025",
  datesKey: "event.dates",
  day1: "2025-11-06",
  day2: "2025-11-07",
  venue: "Online",
  description: "A legal symposium exploring laws and society",
  descriptionKey: "event.description",
};