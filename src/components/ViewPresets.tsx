'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface ViewPresetsProps {
  onNavigate: (lat: number, lng: number, zoom: number) => void;
  gdeltData?: Array<{ lat: number; lng: number }>;
}

// HOT_THRESHOLD: minimum GDELT events inside a bbox to flag a region as hot
const HOT_THRESHOLD = 3;

const PRESETS = [
  { label: 'GLOBAL',    lat: 20,  lng: 0,   zoom: 2.5, icon: '🌍', bbox: null },
  { label: 'EUROPE',    lat: 48,  lng: 10,  zoom: 4,   icon: '🇪🇺', bbox: [-25, 35, 45, 72]    },
  { label: 'MIDDLE EAST', lat: 30, lng: 45, zoom: 4.5, icon: '🔥', bbox: [25, 12, 65, 42]     },
  { label: 'EAST ASIA', lat: 35,  lng: 120, zoom: 4,   icon: '🌏', bbox: [95, 10, 150, 55]    },
  { label: 'AMERICAS',  lat: 25,  lng: -90, zoom: 3,   icon: '🌎', bbox: [-170, -60, -30, 75] },
  { label: 'UKRAINE',   lat: 49,  lng: 32,  zoom: 6,   icon: '⚔️', bbox: [22, 44, 40, 53]     },
  { label: 'AFRICA',    lat: 5,   lng: 20,  zoom: 3.5, icon: '🌍', bbox: [-20, -35, 55, 38]   },
  { label: 'S.E. ASIA', lat: 10,  lng: 110, zoom: 4.5, icon: '🌏', bbox: [90, -10, 145, 30]   },
  { label: 'ARCTIC',    lat: 75,  lng: 0,   zoom: 3.5, icon: '❄️', bbox: [-180, 65, 180, 90]  },
  { label: 'INDIA',     lat: 22,  lng: 78,  zoom: 4.5, icon: '🇮🇳', bbox: [65, 5, 100, 38]     },
  { label: 'AUSTRALIA', lat: -25, lng: 134, zoom: 4,   icon: '🇦🇺', bbox: [110, -50, 160, -10] },
  { label: 'SUDAN',     lat: 15,  lng: 30,  zoom: 5.5, icon: '⚠️', bbox: [22, 8, 40, 24]      },
];

function countEventsInBbox(
  events: Array<{ lat: number; lng: number }>,
  bbox: [number, number, number, number]
): number {
  const [minLng, minLat, maxLng, maxLat] = bbox;
  return events.filter(e => e.lng >= minLng && e.lng <= maxLng && e.lat >= minLat && e.lat <= maxLat).length;
}

export default function ViewPresets({ onNavigate, gdeltData }: ViewPresetsProps) {
  // Compute per-region GDELT density when data is available
  const hotCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (!gdeltData || gdeltData.length === 0) return counts;
    for (const p of PRESETS) {
      if (!p.bbox) continue;
      counts[p.label] = countEventsInBbox(gdeltData, p.bbox as [number, number, number, number]);
    }
    return counts;
  }, [gdeltData]);

  const isHot = (label: string) =>
    gdeltData && gdeltData.length > 0
      ? (hotCounts[label] ?? 0) >= HOT_THRESHOLD
      : false;

  const hotCount = PRESETS.filter(p => isHot(p.label)).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="glass-panel p-2.5 pointer-events-auto"
    >
      <div className="flex items-center gap-2 mb-2">
        <Globe className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
        <span className="hud-text text-[12px] text-[var(--text-primary)] tracking-widest">REGION PRESETS</span>
        {hotCount > 0 && (
          <span className="gotham-tag gotham-tag--critical" style={{ fontSize: '7px', padding: '1px 4px', marginLeft: 'auto' }}>
            {hotCount} HOT
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {PRESETS.map(p => {
          const hot = isHot(p.label);
          const eventCount = p.bbox ? (hotCounts[p.label] ?? 0) : 0;
          return (
            <button
              key={p.label}
              onClick={() => onNavigate(p.lat, p.lng, p.zoom)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] font-mono tracking-wider border border-transparent hover:border-[var(--border-primary)] hover:text-[var(--gold-primary)] transition-all hover:scale-[1.02] active:scale-[0.98] ${hot ? 'text-[var(--alert-red)] hover:border-[var(--alert-red)]/30 hover:bg-[var(--alert-red)]/5' : 'text-[var(--text-muted)] hover:bg-[var(--hover-accent)]'}`}
            >
              <span className="text-[11px] flex-shrink-0">{p.icon}</span>
              <span>{p.label}</span>
              {hot && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--alert-red)] animate-osiris-pulse ml-auto flex-shrink-0" />
                  {eventCount > 0 && (
                    <span className="text-[7px] font-mono text-[var(--alert-red)] opacity-70 flex-shrink-0">{eventCount}</span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
