// === FILE: DagarOmLagar2025_SplitView.tsx ===
// Alternate layout: split-screen graph + stream, for immersive experience

'use client';
import React, { useState } from 'react';

export default function DagarOmLagar2025_SplitView() {
  const [graphUrl, setGraphUrl] = useState<string>('https://infranodus.com/embed/sample');
  const [streamUrl, setStreamUrl] = useState<string>('https://www.youtube.com/embed/dQw4w9WgXcQ');

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 h-1/2 md:h-full border-r border-white/10">
        <iframe src={graphUrl} title="Graph" className="w-full h-full border-none" />
      </div>
      <div className="md:w-1/2 h-1/2 md:h-full border-l border-white/10">
        <iframe src={streamUrl} title="Stream" className="w-full h-full border-none" allowFullScreen />
      </div>
    </div>
  );
}
