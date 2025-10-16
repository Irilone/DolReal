// src/lib/youtube/useYouTubePlayer.ts
import { useEffect, useRef, useState } from 'react';

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  loadVideoById: (videoId: string) => void;
}

interface YTPlayerOptions {
  height: string;
  width: string;
  videoId: string;
  events: {
    onReady: (event: YTEvent) => void;
  };
}

interface YTEvent {
  target: YTPlayer;
}

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useYouTubePlayer(videoId: string) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    };

    const createPlayer = () => {
      playerRef.current = new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
          'onReady': onPlayerReady,
        }
      });
    };

    const onPlayerReady = (_event: YTEvent) => {
      setIsReady(true);
    };

    if (!window.YT) {
      loadYouTubeAPI();
    } else {
      createPlayer();
    }

  }, [videoId]);

  return { player: playerRef.current, isReady };
}
