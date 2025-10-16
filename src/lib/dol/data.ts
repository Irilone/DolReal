// DoL 2025 Conference Data
// Dagar om Lagar 2025 - November 6-7, 2025

export interface DolNode {
  id: string;
  name: string;
  location: string;
  description: string;
  graphId: string;
  activeOnDay2: boolean;
}

export interface DolStream {
  id: string;
  nodeId: string;
  youtubeId: string;
  title: string;
  isLive: boolean;
  scheduledStart: string;
  scheduledEnd: string;
  day: 1 | 2;
}

export interface ProgramSession {
  id: string;
  nodeId: string;
  title: string;
  speaker: string;
  startTime: string;
  endTime: string;
  description: string;
  day: 1 | 2;
  topics: string[];
}

export interface KnowledgeGraphConnection {
  from: string;
  to: string;
  type: 'related' | 'prerequisite' | 'alternative';
  weight: number;
}

// Four conference nodes
export const dolNodes: DolNode[] = [
  {
    id: 'nodvast',
    name: 'Nodväst',
    location: 'Northwest Conference Hall',
    description: 'Constitutional law and human rights',
    graphId: 'dol-nodvast-2025',
    activeOnDay2: true, // Only Nodväst is active on day 2
  },
  {
    id: 'nodsyd',
    name: 'Nodsyd',
    location: 'South Conference Hall',
    description: 'Criminal law and justice reform',
    graphId: 'dol-nodsyd-2025',
    activeOnDay2: false,
  },
  {
    id: 'nodost',
    name: 'Nodöst',
    location: 'East Conference Hall',
    description: 'Commercial and contract law',
    graphId: 'dol-nodost-2025',
    activeOnDay2: false,
  },
  {
    id: 'nodmidd',
    name: 'Nodmidd',
    location: 'Central Conference Hall',
    description: 'Environmental and technology law',
    graphId: 'dol-nodmidd-2025',
    activeOnDay2: false,
  },
];

// YouTube streams for each node
export const dolStreams: DolStream[] = [
  {
    id: 'stream-nodvast-day1',
    nodeId: 'nodvast',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Nodväst - Day 1',
    isLive: true,
    scheduledStart: '2025-11-06T09:00:00Z',
    scheduledEnd: '2025-11-06T17:00:00Z',
    day: 1,
  },
  {
    id: 'stream-nodvast-day2',
    nodeId: 'nodvast',
    youtubeId: 'kJQP7kiw5Fk',
    title: 'Nodväst - Day 2',
    isLive: true,
    scheduledStart: '2025-11-07T09:00:00Z',
    scheduledEnd: '2025-11-07T17:00:00Z',
    day: 2,
  },
  {
    id: 'stream-nodsyd-day1',
    nodeId: 'nodsyd',
    youtubeId: 'ACTUAL_NODSYD_STREAM_ID_DAY1',
    title: 'Nodsyd - Day 1',
    isLive: true,
    scheduledStart: '2025-11-06T09:00:00Z',
    scheduledEnd: '2025-11-06T17:00:00Z',
    day: 1,
  },
  {
    id: 'stream-nodost-day1',
    nodeId: 'nodost',
    youtubeId: '3JZ_D3ELwOQ',
    title: 'Nodöst - Day 1',
    isLive: true,
    scheduledStart: '2025-11-06T09:00:00Z',
    scheduledEnd: '2025-11-06T17:00:00Z',
    day: 1,
  },
  {
    id: 'stream-nodmidd-day1',
    nodeId: 'nodmidd',
    youtubeId: 'jNQXAC9IVRw',
    title: 'Nodmidd - Day 1',
    isLive: true,
    scheduledStart: '2025-11-06T09:00:00Z',
    scheduledEnd: '2025-11-06T17:00:00Z',
    day: 1,
  },
];

// Program schedule for both days
export const programSchedule: ProgramSession[] = [
  // Day 1 - Nodväst
  {
    id: 'session-nv-1',
    nodeId: 'nodvast',
    title: 'Opening Keynote: Constitutional Rights in the Digital Age',
    speaker: 'Prof. Anna Lindström',
    startTime: '2025-11-06T09:00:00Z',
    endTime: '2025-11-06T10:30:00Z',
    description: 'Exploring how constitutional frameworks adapt to digital challenges',
    day: 1,
    topics: ['constitutional-law', 'digital-rights', 'privacy'],
  },
  {
    id: 'session-nv-2',
    nodeId: 'nodvast',
    title: 'Human Rights and Migration Law',
    speaker: 'Dr. Hassan Al-Rashid',
    startTime: '2025-11-06T11:00:00Z',
    endTime: '2025-11-06T12:30:00Z',
    description: 'Legal frameworks for refugee protection and asylum',
    day: 1,
    topics: ['human-rights', 'migration', 'international-law'],
  },
  // Day 1 - Nodsyd
  {
    id: 'session-ns-1',
    nodeId: 'nodsyd',
    title: 'Criminal Justice Reform: Restorative Practices',
    speaker: 'Judge Maria Bergqvist',
    startTime: '2025-11-06T09:00:00Z',
    endTime: '2025-11-06T10:30:00Z',
    description: 'Innovative approaches to criminal justice and rehabilitation',
    day: 1,
    topics: ['criminal-law', 'justice-reform', 'rehabilitation'],
  },
  {
    id: 'session-ns-2',
    nodeId: 'nodsyd',
    title: 'Cybercrime and Digital Evidence',
    speaker: 'Det. Erik Johansson',
    startTime: '2025-11-06T11:00:00Z',
    endTime: '2025-11-06T12:30:00Z',
    description: 'Legal challenges in prosecuting digital crimes',
    day: 1,
    topics: ['cybercrime', 'digital-evidence', 'prosecution'],
  },
  // Day 1 - Nodöst
  {
    id: 'session-no-1',
    nodeId: 'nodost',
    title: 'Contract Law in the Sharing Economy',
    speaker: 'Adv. Lisa Chen',
    startTime: '2025-11-06T09:00:00Z',
    endTime: '2025-11-06T10:30:00Z',
    description: 'Legal frameworks for platform-based commerce',
    day: 1,
    topics: ['contract-law', 'sharing-economy', 'platform-regulation'],
  },
  {
    id: 'session-no-2',
    nodeId: 'nodost',
    title: 'Intellectual Property in AI Development',
    speaker: 'Dr. Raj Patel',
    startTime: '2025-11-06T11:00:00Z',
    endTime: '2025-11-06T12:30:00Z',
    description: 'Copyright and patent issues in artificial intelligence',
    day: 1,
    topics: ['intellectual-property', 'ai', 'copyright'],
  },
  // Day 1 - Nodmidd
  {
    id: 'session-nm-1',
    nodeId: 'nodmidd',
    title: 'Climate Change Litigation',
    speaker: 'Prof. Emma Nilsson',
    startTime: '2025-11-06T09:00:00Z',
    endTime: '2025-11-06T10:30:00Z',
    description: 'Legal strategies for environmental protection',
    day: 1,
    topics: ['environmental-law', 'climate-change', 'litigation'],
  },
  {
    id: 'session-nm-2',
    nodeId: 'nodmidd',
    title: 'Regulating Emerging Technologies',
    speaker: 'Dr. Sofia Andersson',
    startTime: '2025-11-06T11:00:00Z',
    endTime: '2025-11-06T12:30:00Z',
    description: 'Legal frameworks for AI, blockchain, and quantum computing',
    day: 1,
    topics: ['technology-law', 'regulation', 'emerging-tech'],
  },
  // Day 2 - Only Nodväst is active
  {
    id: 'session-nv-3',
    nodeId: 'nodvast',
    title: 'Closing Panel: The Future of Legal Systems',
    speaker: 'Panel Discussion',
    startTime: '2025-11-07T09:00:00Z',
    endTime: '2025-11-07T12:00:00Z',
    description: 'Cross-cutting themes and future directions',
    day: 2,
    topics: ['legal-systems', 'future', 'interdisciplinary'],
  },
];

// Knowledge graph connections between topics
export const knowledgeGraphConnections: KnowledgeGraphConnection[] = [
  {
    from: 'constitutional-law',
    to: 'digital-rights',
    type: 'related',
    weight: 0.9,
  },
  {
    from: 'digital-rights',
    to: 'privacy',
    type: 'prerequisite',
    weight: 0.85,
  },
  {
    from: 'cybercrime',
    to: 'digital-evidence',
    type: 'related',
    weight: 0.95,
  },
  {
    from: 'contract-law',
    to: 'platform-regulation',
    type: 'related',
    weight: 0.8,
  },
  {
    from: 'intellectual-property',
    to: 'ai',
    type: 'related',
    weight: 0.9,
  },
  {
    from: 'environmental-law',
    to: 'climate-change',
    type: 'prerequisite',
    weight: 0.95,
  },
  {
    from: 'technology-law',
    to: 'ai',
    type: 'related',
    weight: 0.85,
  },
  {
    from: 'human-rights',
    to: 'migration',
    type: 'prerequisite',
    weight: 0.9,
  },
  {
    from: 'criminal-law',
    to: 'justice-reform',
    type: 'related',
    weight: 0.85,
  },
  {
    from: 'digital-rights',
    to: 'cybercrime',
    type: 'related',
    weight: 0.7,
  },
];

// Utility function to get streams for a specific day
export function getStreamsByDay(day: 1 | 2): DolStream[] {
  return dolStreams.filter(stream => stream.day === day);
}

// Utility function to get active nodes for a specific day
export function getActiveNodesByDay(day: 1 | 2): DolNode[] {
  if (day === 2) {
    return dolNodes.filter(node => node.activeOnDay2);
  }
  return dolNodes;
}

// Utility function to get program for a specific node and day
export function getProgramByNodeAndDay(nodeId: string, day: 1 | 2): ProgramSession[] {
  return programSchedule.filter(
    session => session.nodeId === nodeId && session.day === day
  );
}
/**
 * Centralized data model for DoL 2025 streaming hub
 * Provides node metadata, YouTube IDs, day-based activation, program schedules, and graph topology
 */

import type { StreamNode, EventDay } from "@/types/stream";

// Re-export types for consumers
export type { StreamNode, EventDay };

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
