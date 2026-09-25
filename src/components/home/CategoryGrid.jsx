import React from 'react';
import { CATEGORIES } from '../../data/categories.js';
import { ArrowUpRight } from 'lucide-react';

export function CategoryGrid() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <span className="section-tag">EXPLORE BY CATEGORY</span>
          <h2 className="section-title">Designed to Make the Cosy Feel Special</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Handcrafted with super-soft breathable fabrics, tailored piping, and joy-infused British prints.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {CATEGORIES.map(cat => (
            <a
              key={cat.id}
              href={cat.link}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                aspectRatio: '3/4',
                backgroundColor: 'var(--color-surface)',
                boxShadow: 'var(--shadow-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '28px',
                group: 'pointer'
              }}
              className="cat-card"
            >
              <img 
                src={cat.image} 
                alt={cat.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="cat-card-img"
              />

              {/* Gradient Scrim */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20, 20, 20, 0.85) 0%, rgba(20, 20, 20, 0.2) 50%, transparent 100%)',
                zIndex: 2
              }} />

              {/* Content Card Overlay */}
              <div style={{ position: 'relative', zIndex: 3, color: '#FFFFFF' }}>
                <span style={{
                  fontSize: '0.74rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-peach)',
                  fontWeight: '600',
                  marginBottom: '6px',
                  display: 'block'
                }}>
                  {cat.subtitle}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    fontWeight: '600',
                    lineHeight: '1.2'
                  }}>
                    {cat.title}
                  </h3>
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '8px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ArrowUpRight size={18} color="#fff" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .cat-card:hover .cat-card-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
