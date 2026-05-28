'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AccessPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60_000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 20 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="glass-panel pointer-events-auto"
          style={{
            position: 'absolute',
            bottom: 90,
            right: 20,
            zIndex: 300,
            width: 480,
            maxWidth: 'calc(100vw - 40px)',
            padding: '20px 22px 18px',
            borderColor: 'var(--border-active)',
            boxShadow: '0 0 32px rgba(179,0,27,0.18), 0 8px 32px rgba(0,0,0,0.55)',
          }}
        >
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.2em', color: 'var(--de-fg-3)', textTransform: 'uppercase', marginBottom: 4 }}>
                DIL Observatory
              </p>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '0.04em', margin: 0 }}>
                Need full access to the data?
              </h2>
            </div>
            <button
              onClick={() => setVisible(false)}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--de-fg-3)',
                padding: 2,
                marginLeft: 12,
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              <X size={14} />
            </button>
          </div>

          <p style={{ fontSize: 11, color: 'var(--de-fg-2)', lineHeight: 1.6, marginBottom: 14 }}>
            The community dashboard gives you a live view of the digital landscape.
            Get in touch to unlock the full platform to support your decision making with deeper data, extended history, custom feeds, virtual analysts, and more.
          </p>

          {/* Monday.com embed */}
          <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-secondary)' }}>
            <iframe
              src="https://forms.monday.com/forms/embed/f9c87cb5a389470de7ca005d42dd0f83?r=euc1"
              width="100%"
              height="420"
              style={{ display: 'block', border: 0 }}
              title="Get in touch — DIL Observatory"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
