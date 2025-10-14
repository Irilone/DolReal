// src/hooks/useStreamPlayer.ts
import { create } from 'zustand';

interface StreamPlayerState {
  activeStreamId: string | null;
  isPlaying: boolean;
  setActiveStream: (id: string) => void;
  pause: () => void;
}

export const useStreamPlayer = create<StreamPlayerState>((set) => ({
  activeStreamId: null,
  isPlaying: false,
  setActiveStream: (id) => set({ activeStreamId: id, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
}));
