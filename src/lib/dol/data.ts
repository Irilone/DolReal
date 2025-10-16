import type { EventDay, StreamNode } from "@/types/index";

export type DolNodeKey = StreamNode;

export type SessionFormat =
  | "keynote"
  | "panel"
  | "workshop"
  | "break"
  | "dialog"
  | "fireside";

export interface DolProgramItem {
  time: string;
  title: string;
  description: string;
  speakers: string[];
  format: SessionFormat;
  focus?: string;
}

export interface DolNodeStreamConfig {
  youtubeId: string;
  active: boolean;
  message?: string;
}

export interface DolNodeData {
  key: DolNodeKey;
  name: string;
  location: string;
  description: string;
  theme: string;
  graphId: string;
  streams: Record<EventDay, DolNodeStreamConfig>;
  program: Record<EventDay, DolProgramItem[]>;
}

const inactiveMessageDay2 =
  "Denna nod sänder inte live den 7 november. Följ huvudströmmens sändning från Nodväst.";

export const DOL_NODES: Record<DolNodeKey, DolNodeData> = {
  nodvast: {
    key: "nodvast",
    name: "Nodväst",
    location: "Stockholm – Huvudnav",
    description:
      "Huvudscenen samlar nationella perspektiv på juridik, digitalisering och samhällsutveckling.",
    theme: "Digital transformation och rättspolitik",
    graphId: "dol-nodvast",
    streams: {
      1: { youtubeId: process.env.NEXT_PUBLIC_NODVAST_YOUTUBE_ID_D1 || "u1T05ChwPcg", active: true },
      2: { youtubeId: process.env.NEXT_PUBLIC_NODVAST_YOUTUBE_ID_D2 || "u1T05ChwPcg", active: true },
    },
    program: {
      1: [
        {
          time: "09:00 – 09:30",
          title: "Öppningsceremoni & lägesbild",
          description:
            "Moderatorerna öppnar konferensen och presenterar de strategiska målen för DoL 2025.",
          speakers: ["Lena Karlsson", "Moderatorsteamet"],
          format: "keynote",
          focus: "Nationell introduktion",
        },
        {
          time: "09:30 – 10:45",
          title: "AI i offentlig rättstillämpning",
          description:
            "Fallstudier från regioner som redan använder AI-stöd i socialtjänst, domstolar och polis.",
          speakers: ["Justitieråd Sofia Berg", "AI-samordnare Malik Diop"],
          format: "panel",
          focus: "Strategiska beslut och tillsyn",
        },
        {
          time: "11:15 – 12:15",
          title: "Fireside: Digital resiliens för kommuner",
          description:
            "Kommunledningar diskuterar hur man planerar för incidenter, cybersäkerhet och samhällsviktiga tjänster.",
          speakers: ["Anna Forsgren", "Håkan Vretlund"],
          format: "fireside",
          focus: "Kontinuitet och riskhantering",
        },
        {
          time: "13:30 – 15:00",
          title: "Framtidens lagstiftning för datadelning",
          description:
            "Hur påverkar EU:s dataakt, AI-förordningen och svenska öppna data-initiativ den juridiska vardagen?",
          speakers: ["Utredare Sara Linde", "Professor Amir Haddad"],
          format: "workshop",
          focus: "Samverkan mellan myndigheter",
        },
      ],
      2: [
        {
          time: "09:00 – 09:20",
          title: "Morgonbrief & sammanfattning av dag 1",
          description:
            "Moderatorerna summerar gårdagen och presenterar publikanalysen från InfraNodus MCP.",
          speakers: ["Lena Karlsson"],
          format: "dialog",
          focus: "Reflektion",
        },
        {
          time: "09:20 – 10:40",
          title: "Policy-lab: Reglering av autonoma system",
          description:
            "Interaktiv session där deltagarna arbetar i breakout-grupper kring framtida rättsfall och regleringsscenarier.",
          speakers: ["Dr. Ingrid Holm", "Juridiska rådet"],
          format: "workshop",
          focus: "Scenarioplanering",
        },
        {
          time: "11:15 – 12:30",
          title: "Nationell samordning för digital rättvisa",
          description:
            "Panel om hur olika noder kan dela resurser, kompetens och digital infrastruktur efter DoL 2025.",
          speakers: [
            "Generaldirektör Mats Ångström",
            "Kommunjurist Ayse Demir",
          ],
          format: "panel",
          focus: "Samverkansmodeller",
        },
        {
          time: "13:00 – 13:45",
          title: "Avslutande keynote: Ett sammanhållet rättsväsende",
          description:
            "Visionsföredrag om vägen mot ett resilient och inkluderande rättssystem med stöd av digitala tvillingar.",
          speakers: ["Justitieminister Karin Eklund"],
          format: "keynote",
          focus: "Vision & policy",
        },
      ],
    },
  },
  nodsyd: {
    key: "nodsyd",
    name: "Nodsyd",
    location: "Malmö – Civilsamhällets hub",
    description:
      "Fokus på inkludering, rättigheter och samverkan med civilsamhälle, skolor och sociala innovationer.",
    theme: "Social hållbarhet och medborgarnära juridik",
    graphId: "dol-nodsyd",
    streams: {
      1: { youtubeId: "G6HQeSGrE2o", active: true },
      2: {
        youtubeId: "G6HQeSGrE2o",
        active: false,
        message: inactiveMessageDay2,
      },
    },
    program: {
      1: [
        {
          time: "09:45 – 10:30",
          title: "Community law labs i praktiken",
          description:
            "Organisationer från Skåne visar hur lokala rättighetscenter ger snabb hjälp vid diskriminering och arbetsrättsliga tvister.",
          speakers: [
            "Samverkansledare Noor Al-Salem",
            "Jurist Elias Lindström",
          ],
          format: "panel",
          focus: "Medborgarfokus",
        },
        {
          time: "11:00 – 12:00",
          title: "Juridik för unga röster",
          description:
            "Gymnasieelever, fritidsledare och jurister utvecklar ett gemensamt kodex för digital trygghet.",
          speakers: [
            "Elevrepresentant Mina Hao",
            "Fritidsledare Jamal Hussein",
          ],
          format: "workshop",
          focus: "Barnrätt",
        },
        {
          time: "13:30 – 14:30",
          title: "Partnerskap för inkluderande rättshjälp",
          description:
            "Case från Malmö, Lund och Helsingborg om hur man finansierar och driftar jourer för nyanlända och våldsutsatta.",
          speakers: ["Regionjurist Camilla Väisänen", "Advokat Selim Kaba"],
          format: "panel",
          focus: "Regional samverkan",
        },
      ],
      2: [],
    },
  },
  nodost: {
    key: "nodost",
    name: "Nodöst",
    location: "Umeå – Akademiskt laboratorium",
    description:
      "Universitet, forskare och innovationspartners visar rättsteknik och datadrivna beslutsstöd.",
    theme: "Forskningsfronten för juridisk innovation",
    graphId: "dol-nodost",
    streams: {
      1: { youtubeId: "Aq2I9J8Yd0o", active: true },
      2: {
        youtubeId: "Aq2I9J8Yd0o",
        active: false,
        message: inactiveMessageDay2,
      },
    },
    program: {
      1: [
        {
          time: "09:30 – 10:15",
          title: "Datadriven bevisvärdering",
          description:
            "Forskare demonstrerar verktyg för att validera digitala bevis och bygga argumentationsgrafer i realtid.",
          speakers: ["Docent Freja Bäckström", "Forskningsingenjör Otto Kero"],
          format: "keynote",
          focus: "Metodik",
        },
        {
          time: "10:45 – 11:30",
          title: "Rättsteknik inkubator – pitch-session",
          description:
            "Startups från norra Sverige presenterar lösningar för smart kontrakt, tolkar AI och digital arkivering.",
          speakers: [
            "Startup-team från LegalShift",
            "Arctic Ledger",
            "Aurora LawLab",
          ],
          format: "panel",
          focus: "Innovation",
        },
        {
          time: "13:00 – 14:15",
          title: "Känn din data: ELSA-verkstad",
          description:
            "Etik, lagstiftning, säkerhet och ansvar i samma workshop med hands-on scenarier.",
          speakers: [
            "Professor Stina Enmark",
            "Datasäkerhetsexpert Leo Nyström",
          ],
          format: "workshop",
          focus: "ELSA-ramverk",
        },
      ],
      2: [],
    },
  },
  nodmidd: {
    key: "nodmidd",
    name: "Nodmidd",
    location: "Örebro – Offentlig verksamhet & domstol",
    description:
      "Tjänstepersoner, domare och myndigheter delar best practice för digital handläggning och service.",
    theme: "Operativ excellens och rättssäker handläggning",
    graphId: "dol-nodmidd",
    streams: {
      1: { youtubeId: "l7o9NwFdw0I", active: true },
      2: {
        youtubeId: "l7o9NwFdw0I",
        active: false,
        message: inactiveMessageDay2,
      },
    },
    program: {
      1: [
        {
          time: "09:40 – 10:20",
          title: "Digital förhandling – lärdomar från 2024",
          description:
            "Domstolsverket presenterar statistik och rekommendationer för hybridförhandlingar och fjärrvittnen.",
          speakers: ["Lagman Cecilia Rapp", "Domstolsjurist Emil Tran"],
          format: "panel",
          focus: "Domstolsprocesser",
        },
        {
          time: "11:00 – 12:00",
          title: "Automatiserad ärendehantering i praktiken",
          description:
            "Kommuner visar hur RPA-flöden och juridisk kvalitetssäkring fungerar i socialtjänst och bygglov.",
          speakers: [
            "Digitaliseringschef Pia Unosson",
            "RPA-arkitekt Johan Greitz",
          ],
          format: "workshop",
          focus: "Processdesign",
        },
        {
          time: "13:15 – 14:00",
          title: "Resiliensövningar för rättsväsendet",
          description:
            "Krisövningar, redundans och samarbete mellan polis, domstolar och kommuner inför cyberhot.",
          speakers: [
            "Säkerhetsstrateg Maja Hult",
            "Polisinspektör Roger Mejdal",
          ],
          format: "dialog",
          focus: "Resiliens",
        },
      ],
      2: [],
    },
  },
};

export const GRAPH_NODES = [
  {
    id: "core",
    label: "Dagar om Lagar",
    type: "topic" as const,
    connections: ["nodvast", "nodsyd", "nodost", "nodmidd", "policy"],
  },
  {
    id: "policy",
    label: "Policy & Samverkan",
    type: "keyword" as const,
    connections: ["core", "nodvast", "nodmidd"],
  },
  {
    id: "nodvast",
    label: "Nodväst",
    type: "stream" as const,
    connections: ["core", "resiliens", "data"],
  },
  {
    id: "nodsyd",
    label: "Nodsyd",
    type: "stream" as const,
    connections: ["core", "inkludering"],
  },
  {
    id: "nodost",
    label: "Nodöst",
    type: "stream" as const,
    connections: ["core", "innovation"],
  },
  {
    id: "nodmidd",
    label: "Nodmidd",
    type: "stream" as const,
    connections: ["core", "resiliens"],
  },
  {
    id: "resiliens",
    label: "Resiliens",
    type: "keyword" as const,
    connections: ["nodvast", "nodmidd"],
  },
  {
    id: "inkludering",
    label: "Inkludering",
    type: "keyword" as const,
    connections: ["nodsyd", "policy"],
  },
  {
    id: "innovation",
    label: "Innovation",
    type: "keyword" as const,
    connections: ["nodost", "data"],
  },
  {
    id: "data",
    label: "Data & AI",
    type: "keyword" as const,
    connections: ["nodvast", "nodost"],
  },
];

export const GRAPH_LINKS = GRAPH_NODES.flatMap((node) =>
  (node.connections || []).map((target) => ({
    source: node.id,
    target,
    strength: 0.4,
  })),
);

/**
 * Selects the first DoL node that has an active stream for the given event day.
 *
 * @param day - The event day to search for an active stream
 * @returns The key of the first node whose stream is active on `day`, or `"nodvast"` if none are active
 */
export function getFirstActiveNodeForDay(day: EventDay): DolNodeKey {
  const entry = (Object.keys(DOL_NODES) as DolNodeKey[]).find(
    (key) => DOL_NODES[key].streams[day]?.active,
  );
  return entry ?? "nodvast";
}

/**
 * Constructs the URL for a YouTube video's high-quality default thumbnail.
 *
 * @param youtubeId - The YouTube video identifier
 * @returns The URL of the video's high-quality default thumbnail image
 */
export function buildThumbnailUrl(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}
import { EventDay } from '@/types/index';
import { StreamNode } from '@/types/stream';

// Add environment variables for YouTube IDs
const NODS_YD_ID = process.env.NODS_YD_ID;
const NODS_T_ID = process.env.NODS_T_ID;
const NODS_MIDD_ID = process.env.NODS_MIDD_ID;

// Existing code...
