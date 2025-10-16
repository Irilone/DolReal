'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Session {
  id: string;
  time: string;
  title: string;
  description: string;
  speakers: string[];
  streams: ('nodvast' | 'nodsyd' | 'nodost' | 'nodmidd')[];
  type: 'keynote' | 'panel' | 'workshop' | 'break';
}

interface DaySchedule {
  date: string;
  sessions: Session[];
}

interface ProgramScheduleProps {
  className?: string;
}

const scheduleData: Record<number, DaySchedule> = {
  1: {
    date: '2025-11-06',
    sessions: [
      {
        id: 'd1-1',
        time: '09:00 - 09:30',
        title: 'Öppningsceremoni',
        description: 'Välkommen till Dagar om Lagar 2025',
        speakers: ['Moderator'],
        streams: ['nodvast', 'nodsyd', 'nodost', 'nodmidd'],
        type: 'keynote',
      },
      {
        id: 'd1-2',
        time: '09:30 - 11:00',
        title: 'AI och Juridik - Framtidens Utmaningar',
        description: 'En djupdykning i AI:s påverkan på rättssystemet',
        speakers: ['Prof. Anna Svensson', 'Dr. Erik Andersson'],
        streams: ['nodvast', 'nodsyd'],
        type: 'panel',
      },
      {
        id: 'd1-3',
        time: '09:30 - 11:00',
        title: 'Arbetsrätt i Digital Tid',
        description: 'Nya utmaningar för arbetsmarknaden',
        speakers: ['Advokat Maria Nilsson'],
        streams: ['nodost', 'nodmidd'],
        type: 'panel',
      },
      {
        id: 'd1-4',
        time: '11:00 - 11:30',
        title: 'Kaffepaus',
        description: 'Networking och förfriskningar',
        speakers: [],
        streams: [],
        type: 'break',
      },
      {
        id: 'd1-5',
        time: '11:30 - 13:00',
        title: 'GDPR och Dataskydd',
        description: 'Praktiska tillämpningar och fallstudier',
        speakers: ['DPO Sara Johansson', 'Jurist Karl Berg'],
        streams: ['nodvast'],
        type: 'workshop',
      },
      {
        id: 'd1-6',
        time: '11:30 - 13:00',
        title: 'Miljörätt och Hållbarhet',
        description: 'Klimatkrisen ur ett juridiskt perspektiv',
        speakers: ['Prof. Lisa Holm'],
        streams: ['nodsyd', 'nodost'],
        type: 'panel',
      },
      {
        id: 'd1-7',
        time: '13:00 - 14:00',
        title: 'Lunch',
        description: 'Gemensam lunch och networking',
        speakers: [],
        streams: [],
        type: 'break',
      },
    ],
  },
  2: {
    date: '2025-11-07',
    sessions: [
      {
        id: 'd2-1',
        time: '09:00 - 09:30',
        title: 'Dag 2 - Välkommen Tillbaka',
        description: 'Sammanfattning av dag 1 och förberedelser',
        speakers: ['Moderator'],
        streams: ['nodvast'],
        type: 'keynote',
      },
      {
        id: 'd2-2',
        time: '09:30 - 11:00',
        title: 'Digitala Bevis och E-discovery',
        description: 'Tekniska utmaningar i modern rättsskipning',
        speakers: ['IT-forensiker Per Olsson', 'Domare Anna Lindgren'],
        streams: ['nodvast'],
        type: 'workshop',
      },
      {
        id: 'd2-3',
        time: '11:00 - 11:30',
        title: 'Kaffepaus',
        description: 'Sista chansen för networking',
        speakers: [],
        streams: [],
        type: 'break',
      },
      {
        id: 'd2-4',
        time: '11:30 - 13:00',
        title: 'Avslutande Panel: Framtiden för Juridiken',
        description: 'Sammanfattning och framtidsperspektiv',
        speakers: ['Alla talare'],
        streams: ['nodvast'],
        type: 'keynote',
      },
    ],
  },
};

export default function ProgramSchedule({ className = '' }: ProgramScheduleProps) {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(1);

  const currentSchedule = scheduleData[selectedDay];

  const sessionTypeColors = {
    keynote: 'from-purple-600/30 to-purple-800/30 border-purple-500/50',
    panel: 'from-blue-600/30 to-blue-800/30 border-blue-500/50',
    workshop: 'from-cyan-600/30 to-cyan-800/30 border-cyan-500/50',
    break: 'from-slate-600/30 to-slate-800/30 border-slate-500/50',
  };

  const streamBadgeColors = {
    nodvast: 'bg-purple-600/80',
    nodsyd: 'bg-blue-600/80',
    nodost: 'bg-cyan-600/80',
    nodmidd: 'bg-indigo-600/80',
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Day Switcher */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setSelectedDay(1)}
          className={`px-8 py-3 rounded-glass font-semibold transition-all duration-300
                     ${
                       selectedDay === 1
                         ? 'glass-strong scale-105 shadow-glow'
                         : 'glass hover:scale-105'
                     }`}
          aria-pressed={selectedDay === 1}
        >
          <div className="text-white">
            <div className="text-lg">Dag 1</div>
            <div className="text-sm text-white/60">6 November 2025</div>
          </div>
        </button>
        <button
          onClick={() => setSelectedDay(2)}
          className={`px-8 py-3 rounded-glass font-semibold transition-all duration-300
                     ${
                       selectedDay === 2
                         ? 'glass-strong scale-105 shadow-glow'
                         : 'glass hover:scale-105'
                     }`}
          aria-pressed={selectedDay === 2}
        >
          <div className="text-white">
            <div className="text-lg">Dag 2</div>
            <div className="text-sm text-white/60">7 November 2025</div>
          </div>
        </button>
      </div>

      {/* Schedule Timeline */}
      <div className="space-y-4">
        {currentSchedule.sessions.map((session, index) => (
          <div
            key={session.id}
            className={`glass rounded-glass p-6 border-l-4 bg-gradient-to-r
                       hover:scale-[1.02] transition-all duration-300
                       ${sessionTypeColors[session.type]}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Left: Time and Title */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="glass-strong px-3 py-1 rounded-full text-sm font-mono text-white">
                    {session.time}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                      session.type === 'break'
                        ? 'bg-slate-600/50 text-white/70'
                        : 'bg-primary/50 text-white'
                    }`}
                  >
                    {session.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
                <p className="text-white/70 text-sm mb-3">{session.description}</p>

                {/* Speakers */}
                {session.speakers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {session.speakers.map((speaker, idx) => (
                      <span
                        key={idx}
                        className="glass-strong px-3 py-1 rounded-full text-xs text-white flex items-center gap-2"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {speaker}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Stream Badges */}
              {session.streams.length > 0 && (
                <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                  <span className="text-xs text-white/60 mb-1">Strömmar:</span>
                  {session.streams.map((stream) => (
                    <span
                      key={stream}
                      className={`${streamBadgeColors[stream]} px-3 py-1 rounded-full text-xs font-semibold text-white`}
                    >
                      {stream.charAt(0).toUpperCase() + stream.slice(1)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
