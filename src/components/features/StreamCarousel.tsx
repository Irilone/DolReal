"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Stream {
  id: string;
  title: string;
  youtubeId: string;
  node: "nodvast" | "nodsyd" | "nodost" | "nodmidd";
  thumbnail?: string;
  isLive?: boolean;
  active?: boolean;
  day?: number;
}

interface StreamCarouselProps {
  streams?: Stream[];
  className?: string;
}

const defaultStreams: Stream[] = [
  {
    id: "1",
    node: "nodvast",
    title: "Nordväst",
    youtubeId: process.env.NEXT_PUBLIC_NODVAST_YOUTUBE_ID || "",
    active: true,
    day: 1,
    isLive: true,
  },
  {
    id: "2",
    node: "nodsyd",
    title: "Nordsyd",
    youtubeId: process.env.NEXT_PUBLIC_NODSYD_YOUTUBE_ID || "",
    active: true,
    day: 1,
    isLive: true,
  },
  {
    id: "3",
    node: "nodost",
    title: "Nordöst",
    youtubeId: process.env.NEXT_PUBLIC_NODOST_YOUTUBE_ID || "",
    active: true,
    day: 1,
    isLive: true,
  },
  {
    id: "4",
    node: "nodmidd",
    title: "Nordmidd",
    youtubeId: process.env.NEXT_PUBLIC_NODMIDD_YOUTUBE_ID || "",
    active: true,
    day: 1,
    isLive: true,
  },
];

export default function StreamCarousel({
  streams = defaultStreams,
  className = "",
}: StreamCarouselProps) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nodeColors = {
    nodvast: "from-purple-600/20 to-purple-800/20",
    nodsyd: "from-blue-600/20 to-blue-800/20",
    nodost: "from-cyan-600/20 to-cyan-800/20",
    nodmidd: "from-indigo-600/20 to-indigo-800/20",
  };

  const nodeLabels = {
    nodvast: "Nordväst",
    nodsyd: "Nordsyd",
    nodost: "Nordöst",
    nodmidd: "Nordmidd",
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : streams.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < streams.length - 1 ? prev + 1 : 0));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!carouselRef.current || streams.length === 0) return;
    const cardWidth = carouselRef.current.offsetWidth * 0.3;
    const scrollAmount = currentIndex * cardWidth;
    carouselRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, [currentIndex, streams.length]);

  return (
    <div className={`relative group ${className}`}>
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 glass-strong rounded-full p-3
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:scale-110 hover:shadow-glow focus:outline-none focus:ring-2
                   focus:ring-primary/50`}
        aria-label="Previous stream"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 glass-strong rounded-full p-3
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:scale-110 hover:shadow-glow focus:outline-none focus:ring-2
                   focus:ring-primary/50`}
        aria-label="Next stream"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing px-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-label="Stream carousel"
      >
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="flex-none w-[80%] sm:w-[45%] lg:w-[30%] xl:w-[22%]"
          >
            <div
              className={`glass-strong rounded-glass overflow-hidden group/card
                          hover:scale-105 hover:shadow-glow-lg transition-all duration-300
                          bg-gradient-to-br ${nodeColors[stream.node]}`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-black/20">
                {stream.thumbnail ? (
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white/30"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Live Badge */}
                {stream.isLive && (
                  <div className="absolute top-3 left-3 flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-white uppercase">
                      LIVE
                    </span>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center
                             opacity-0 group-hover/card:opacity-100 transition-opacity
                             bg-black/30`}
                >
                  <div className="glass-strong rounded-full p-4 hover:scale-110 transition-transform">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                  {stream.title}
                </h3>
                <p className="text-sm text-white/70">
                  {nodeLabels[stream.node]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {streams.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50
                       ${
                         index === currentIndex
                           ? "w-8 bg-primary shadow-glow"
                           : "w-2 bg-white/30 hover:bg-white/50"
                       }`}
            aria-label={`Go to stream ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
