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
    youtubeId: '5NV6Rdv1a3I',
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