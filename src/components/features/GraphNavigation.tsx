'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface GraphNode {
  id: string;
  label: string;
  type: 'topic' | 'stream' | 'speaker' | 'keyword';
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  connections?: string[];
}

interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

interface GraphNavigationProps {
  nodes?: GraphNode[];
  links?: GraphLink[];
  className?: string;
  onNodeClick?: (node: GraphNode) => void;
}

const defaultNodes: GraphNode[] = [
  { id: '1', label: 'Juridik', type: 'topic', connections: ['2', '3', '4'] },
  { id: '2', label: 'Nordväst', type: 'stream', connections: ['1', '5'] },
  { id: '3', label: 'Nordsyd', type: 'stream', connections: ['1', '6'] },
  { id: '4', label: 'Nordöst', type: 'stream', connections: ['1', '7'] },
  { id: '5', label: 'AI & Rätt', type: 'keyword', connections: ['2'] },
  { id: '6', label: 'Arbetsrätt', type: 'keyword', connections: ['3'] },
  { id: '7', label: 'Dataskydd', type: 'keyword', connections: ['4'] },
];

export default function GraphNavigation({
  nodes = defaultNodes,
  links = [],
  className = '',
  onNodeClick,
}: GraphNavigationProps) {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(
    new Map()
  );

  const nodeColors = {
    topic: '#8b5cf6', // purple
    stream: '#06b6d4', // cyan
    speaker: '#f59e0b', // amber
    keyword: '#a78bfa', // light purple
  };

  // Initialize node positions
  useEffect(() => {
    const positions = new Map<string, { x: number; y: number }>();
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) / 3;

    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      positions.set(node.id, {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    });

    setNodePositions(positions);
  }, [nodes, dimensions]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.5, Math.min(3, prev * delta)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      setSelectedNode(node.id);
      onNodeClick?.(node);
    },
    [onNodeClick]
  );

  const handleZoomIn = () => setZoom((prev) => Math.min(3, prev * 1.2));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev / 1.2));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
  };

  return (
    <div className={`relative glass-strong rounded-glass overflow-hidden ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="glass-strong p-2 rounded-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="glass-strong p-2 rounded-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="glass-strong p-2 rounded-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Reset view"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 glass-strong p-3 rounded-lg">
        <h3 className="text-sm font-semibold text-white mb-2">Legend</h3>
        <div className="space-y-1 text-xs">
          {Object.entries(nodeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-white/80 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Graph SVG */}
      <svg
        ref={svgRef}
        className="w-full h-full min-h-[600px] cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="img"
        aria-label="Knowledge graph navigation"
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Links */}
          <g className="links">
            {nodes.flatMap((node) =>
              (node.connections || []).map((targetId) => {
                const sourcePos = nodePositions.get(node.id);
                const targetPos = nodePositions.get(targetId);
                if (!sourcePos || !targetPos) return null;

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetPos.x}
                    y2={targetPos.y}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={selectedNode === node.id || selectedNode === targetId ? 2 : 1}
                    className="transition-all duration-300"
                  />
                );
              })
            )}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map((node) => {
              const pos = nodePositions.get(node.id);
              if (!pos) return null;

              const isSelected = selectedNode === node.id;
              const radius = isSelected ? 25 : 20;

              return (
                <g key={node.id} className="node-group">
                  {/* Node glow */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={radius + 10}
                      fill={nodeColors[node.type]}
                      opacity={0.2}
                      className="animate-pulse-glow"
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius}
                    fill={nodeColors[node.type]}
                    stroke="rgba(255, 255, 255, 0.5)"
                    strokeWidth={isSelected ? 3 : 2}
                    className="cursor-pointer hover:opacity-80 transition-all duration-300"
                    onClick={() => handleNodeClick(node)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.type}: ${node.label}`}
                  />

                  {/* Node label */}
                  <text
                    x={pos.x}
                    y={pos.y + radius + 20}
                    textAnchor="middle"
                    fill="white"
                    fontSize={isSelected ? 14 : 12}
                    fontWeight={isSelected ? 600 : 400}
                    className="pointer-events-none select-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-strong p-4 rounded-lg max-w-md">
          {(() => {
            const node = nodes.find((n) => n.id === selectedNode);
            if (!node) return null;
            return (
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{node.label}</h3>
                <p className="text-sm text-white/70 capitalize mb-2">{node.type}</p>
                <p className="text-xs text-white/60">
                  {node.connections?.length || 0} connections
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
