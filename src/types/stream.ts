export type StreamNode = 'nodvast' | 'nodsyd' | 'nodost' | 'nodmidd';

export type EventDay = 1 | 2;

export interface Stream {
  id: StreamNode;
  name: string;
  youtubeId: string;
  embedUrl: string;
  active: boolean;
  day: EventDay;
}

export interface StreamHealth {
  status: 'good' | 'ok' | 'bad' | 'offline';
  message: string;
  details?: {
    bitrate: number;
    resolution: string;
    fps: number;
  };
}

export interface ViewerCount {
  videoId: string;
  concurrentViewers: number;
}
