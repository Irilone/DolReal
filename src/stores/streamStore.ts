import { create } from 'zustand';
import type { Stream } from '@/types/stream';

interface StreamState {
  streams: Stream[];
  selectedNode: string | null;
  setStreams: (streams: Stream[]) => void;
  selectNode: (node: string) => void;
  updateStreamStatus: (id: string, isLive: boolean) => void;
}

export const useStreamStore = create<StreamState>((set) => ({
  streams: [],
  selectedNode: null,
  setStreams: (streams) => set({ streams }),
  selectNode: (node) => set({ selectedNode: node }),
  updateStreamStatus: (id, isLive) => set((state) => ({
    streams: state.streams.map(s => 
      s.id === id ? { ...s, active: isLive } : s
    ),
  })),
}));
