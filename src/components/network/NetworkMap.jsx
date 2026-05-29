import { useState } from 'react';

const NODES = [
  { id: 'RT-SALT-01', label: 'RT-SALT-01 (Core)',     x: 310, y: 310, status: 'online' },
  { id: 'RT-RAM-02',  label: 'RT-RAM-02 (Congested)', x: 490, y: 240, status: 'warning' },
  { id: 'RT-MTY-04',  label: 'RT-MTY-04 (Edge)',      x: 900, y: 230, status: 'online' },
  { id: 'RT-GDL-01',  label: 'RT-GDL-01 (Access)',    x: 650, y: 440, status: 'online' },
];

const LINKS = [
  { from: 'RT-SALT-01', to: 'RT-RAM-02' },
  { from: 'RT-RAM-02',  to: 'RT-MTY-04' },
  { from: 'RT-SALT-01', to: 'RT-GDL-01' },
  { from: 'RT-GDL-01',  to: 'RT-MTY-04' },
];

const STATUS_COLORS = {
  online:  '#62df78',
  warning: '#FFB800',
  critical: '#FF3B30',
};

function nodeById(id) { return NODES.find((n) => n.id === id); }

const VIEWS = ['VISTA SATÉLITE', 'TOPOLOGÍA'];

export default function NetworkMap() {
  const [view, setView] = useState('TOPOLOGÍA');
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState(null);

  const vb = `0 0 1200 560`;

  return (
    <div className="bg-surface-card border border-outline-variant overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[22px]">map</span>
          <h3 className="font-headline-sm text-headline-sm">Mapa de Red y Puntos de Presencia</h3>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex border border-outline-variant">
            {VIEWS.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 font-label-md text-label-md transition-colors
                  ${view === v
                    ? 'border border-primary text-primary bg-primary/5'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            ESTADO DE RED LOCAL:
            <span className="flex items-center gap-1.5 text-status-online font-bold">
              <span className="w-2 h-2 rounded-full bg-status-online inline-block" />
              ÓPTIMO
            </span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative bg-[#0a0c0a] overflow-hidden" style={{ height: '420px' }}>
        {/* Grid dots background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#3e4a3d" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Network SVG */}
        <svg
          className="absolute inset-0"
          viewBox={vb}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s' }}
        >
          {/* Ring topology dashed circles */}
          <ellipse cx="590" cy="340" rx="340" ry="160" fill="none" stroke="#3e4a3d" strokeWidth="1.5" strokeDasharray="8 6" />
          <ellipse cx="650" cy="280" rx="220" ry="100" fill="none" stroke="#3e4a3d" strokeWidth="1" strokeDasharray="6 5" />

          {/* Links */}
          {LINKS.map((link) => {
            const a = nodeById(link.from);
            const b = nodeById(link.to);
            if (!a || !b) return null;
            const isWarning = a.status === 'warning' || b.status === 'warning';
            return (
              <line
                key={`${link.from}-${link.to}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={isWarning ? '#FFB800' : '#3e4a3d'}
                strokeWidth={isWarning ? 1.5 : 1}
                strokeDasharray="6 4"
                opacity="0.7"
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const color = STATUS_COLORS[node.status];
            const isHovered = hovered === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                {/* Glow ring on hover */}
                {isHovered && (
                  <circle cx="0" cy="0" r="18" fill={color} opacity="0.15" />
                )}
                {/* Pin shape */}
                <path
                  d="M0,-22 C-9,-22 -15,-16 -15,-8 C-15,4 0,22 0,22 C0,22 15,4 15,-8 C15,-16 9,-22 0,-22 Z"
                  fill={color}
                  opacity={isHovered ? 1 : 0.9}
                />
                <circle cx="0" cy="-8" r="5" fill="#0a0c0a" opacity="0.6" />

                {/* Label box */}
                <g transform="translate(10, 28)">
                  <rect
                    x="-4" y="-13"
                    width={node.label.length * 7.2 + 8}
                    height="20"
                    fill="#1D1E20"
                    stroke={color}
                    strokeWidth="0.8"
                    opacity="0.95"
                    rx="1"
                  />
                  <text
                    x={node.label.length * 3.6}
                    y="2"
                    textAnchor="middle"
                    fill="#e3e2e4"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="500"
                  >
                    {node.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-surface-card/90 border border-outline-variant p-4 backdrop-blur-sm">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-3">Leyenda de Red</p>
          {[
            { label: 'Operativo',        color: 'bg-primary' },
            { label: 'Alerta / Saturado', color: 'bg-status-warning' },
            { label: 'Caído',            color: 'bg-status-critical' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 mb-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="font-label-md text-label-md text-on-surface">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Zoom + controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-1">
          {[
            { icon: 'add', action: () => setZoom((z) => Math.min(z + 0.2, 2.5)) },
            { icon: 'remove', action: () => setZoom((z) => Math.max(z - 0.2, 0.5)) },
          ].map((btn) => (
            <button
              key={btn.icon}
              onClick={btn.action}
              className="w-9 h-9 bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">{btn.icon}</span>
            </button>
          ))}
          <div className="h-px bg-outline-variant my-1" />
          {['layers', 'my_location'].map((icon) => (
            <button
              key={icon}
              className="w-9 h-9 bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
