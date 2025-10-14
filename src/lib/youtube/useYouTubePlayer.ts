// src/lib/youtube/useYouTubePlayer.ts
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useYouTubePlayer(videoId: string) {
  const playerRef = useRef<any>(null);
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

    const onPlayerReady = (event: any) => {
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
