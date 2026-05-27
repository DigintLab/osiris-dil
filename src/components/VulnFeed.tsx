'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, RefreshCw, ExternalLink } from 'lucide-react';

interface Vuln {
  id: string;
  name: string;
  vendor: string;
  product: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
  cvss: number | null;
  date: string | null;
  due: string | null;
  source: 'CISA KEV' | 'NVD';
  description: string | null;
  ransomware: boolean;
}

interface Stats {
  active_cves: number;
  critical: number;
  high: number;
  threat_level: string;
  cisa_total?: number;
  nvd_recent?: number;
}

const SEV_CLASS: Record<string, string> = {
  CRITICAL: 'de-badge de-badge-crit',
  HIGH:     'de-badge de-badge-high',
  MEDIUM:   'de-badge de-badge-med',
  LOW:      'de-badge de-badge-low',
  UNKNOWN:  'de-badge de-badge-info',
};

const SEV_DOT: Record<string, string> = {
  CRITICAL: 'de-dot',
  HIGH:     'de-dot',
  MEDIUM:   'de-dot',
  LOW:      'de-dot',
  UNKNOWN:  'de-dot',
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function VulnFeed() {
  const [vulns, setVulns]   = useState<Vuln[]>([]);
  const [stats, setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cyber-threats');
      if (res.ok) {
        const data = await res.json();
        setVulns(data.threats || []);
        setStats(data.stats || null);
      }
    } catch { /* silent */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-panel flex flex-col pointer-events-auto overflow-hidden"
      style={{ maxHeight: 420 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--de-accent-bright)' }} />
          <span className="hud-text text-[11px]" style={{ color: 'var(--text-primary)' }}>
            Vulnerability Intelligence
          </span>
          {stats && (
            <span className="de-badge de-badge-crit text-[9px] px-1.5 py-0 gap-1">
              <span className="de-dot" />
              {stats.critical} critical
            </span>
          )}
        </div>
        <button
          onClick={load}
          className="p-1 rounded hover:bg-white/5 transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} style={{ color: 'var(--text-muted)' }} />
        </button>
      </div>

      {/* Source pills */}
      {stats && (
        <div className="flex items-center gap-2 px-3 py-1.5 border-b" style={{ borderColor: 'var(--border-secondary)' }}>
          <span className="text-[9px] font-mono" style={{ color: 'var(--text-muted)' }}>
            CISA KEV · NVD
          </span>
          <span className="ml-auto text-[9px] font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
            {stats.active_cves} entries
          </span>
        </div>
      )}

      {/* Feed */}
      <div className="overflow-y-auto styled-scrollbar flex-1">
        {loading && vulns.length === 0 ? (
          <div className="flex flex-col gap-2 p-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-shimmer rounded h-10" />
            ))}
          </div>
        ) : vulns.length === 0 ? (
          <div className="p-4 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
            No vulnerabilities loaded
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {vulns.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
                className="border-b cursor-pointer"
                style={{ borderColor: 'var(--border-secondary)' }}
                onClick={() => setExpanded(expanded === v.id ? null : v.id)}
              >
                {/* Row */}
                <div className="flex items-start gap-2 px-3 py-2 hover:bg-white/[0.03] transition-colors">
                  {/* Severity badge */}
                  <span className={`${SEV_CLASS[v.severity]} mt-0.5 flex-shrink-0 text-[9px]`}>
                    <span className={SEV_DOT[v.severity]} />
                    {v.severity === 'CRITICAL' ? 'CRIT' : v.severity}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* CVE ID + CVSS */}
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className="text-[10px] font-bold font-mono tracking-wide flex-shrink-0"
                        style={{ color: 'var(--de-accent-bright)' }}
                      >
                        {v.id}
                      </span>
                      {v.cvss !== null && (
                        <span
                          className="text-[9px] font-mono font-bold"
                          style={{ color: v.cvss >= 9 ? 'var(--alert-red)' : v.cvss >= 7 ? 'var(--alert-orange)' : 'var(--text-muted)' }}
                        >
                          {v.cvss.toFixed(1)}
                        </span>
                      )}
                      {v.ransomware && (
                        <span className="text-[8px] font-mono px-1 rounded" style={{ background: 'rgba(231,4,15,0.15)', color: '#ff6b6b', border: '1px solid rgba(231,4,15,0.3)' }}>
                          ransomware
                        </span>
                      )}
                      <span className="ml-auto text-[9px] font-mono flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                        {timeAgo(v.date)}
                      </span>
                    </div>

                    {/* Vendor / product */}
                    <p className="text-[10px] truncate" style={{ color: 'var(--text-secondary)' }}>
                      {v.vendor}{v.product && v.product !== v.id ? ` · ${v.product}` : ''}
                    </p>
                  </div>
                </div>

                {/* Expanded description */}
                <AnimatePresence>
                  {expanded === v.id && v.description && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-2.5 pt-0">
                        <p className="text-[10px] leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
                          {v.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(128,0,0,0.15)', color: 'var(--de-fg-3)', border: '1px solid var(--border-primary)' }}
                          >
                            {v.source}
                          </span>
                          <a
                            href={`https://nvd.nist.gov/vuln/detail/${v.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[9px] font-mono hover:underline"
                            style={{ color: 'var(--de-fg-3)' }}
                            onClick={e => e.stopPropagation()}
                          >
                            NVD <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
