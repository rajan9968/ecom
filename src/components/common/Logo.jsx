import React from 'react';

export function Logo({ height = 36 }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
      {/* 5-point royal coronet emblem */}
      <svg 
        width="22" 
        height="14" 
        viewBox="0 0 24 16" 
        fill="currentColor" 
        style={{ color: 'var(--color-accent-terracotta)', marginBottom: '1px' }}
      >
        <path d="M2 13H22V15H2V13ZM3 11L6 4L9.5 8L12 2L14.5 8L18 4L21 11H3Z" />
      </svg>
      {/* Brand Wordmark */}
      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.65rem',
        fontWeight: '600',
        letterSpacing: '0.04em',
        color: 'var(--color-text)',
        lineHeight: 1,
        fontStyle: 'normal'
      }}>
        THEIR NIBS
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.52rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginTop: '2px'
      }}>
        LONDON &bull; EST. 2003
      </span>
    </div>
  );
}
