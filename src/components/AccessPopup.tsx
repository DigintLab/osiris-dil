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

  const close = () => setVisible(false);

  return (
    <>
      <style>{`
        .access-popup-backdrop {
          display: none;
        }
        .access-popup {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 480px;
          max-width: calc(100vw - 40px);
          padding: 20px 22px 18px;
        }
        .access-popup-close { padding: 2px; }
        .access-popup-close svg { width: 14px; height: 14px; }
        .access-popup-iframe { height: 420px; }
        @media (max-width: 639px) {
          .access-popup-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 299;
            background: rgba(0,0,0,0.55);
            touch-action: none;
          }
          .access-popup {
            left: 50%;
            top: 50%;
            bottom: auto;
            right: auto;
            translate: -50% -50%;
            width: calc(100vw - 32px);
            max-height: calc(100dvh - 32px);
            overflow-y: auto;
            padding: 16px 16px 14px;
            touch-action: pan-y;
          }
          .access-popup-close { padding: 8px; }
          .access-popup-close svg { width: 20px; height: 20px; }
          .access-popup-iframe { height: 320px; }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <>
            {/* backdrop — mobile only via CSS, captures taps outside */}
            <motion.div
              className="access-popup-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="access-popup glass-panel pointer-events-auto"
              style={{
                zIndex: 300,
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
                  onClick={close}
                  aria-label="Close"
                  className="access-popup-close"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--de-fg-3)',
                    marginLeft: 12,
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  <X />
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
                  className="access-popup-iframe"
                  style={{ display: 'block', border: 0 }}
                  title="Get in touch — DIL Observatory"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
