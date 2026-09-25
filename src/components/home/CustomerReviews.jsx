import React from 'react';
import { REVIEWS } from '../../data/reviews.js';
import { Star, CheckCircle2 } from 'lucide-react';

export function CustomerReviews() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="container">
        {/* Rating Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-surface)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', color: 'var(--color-accent-gold)' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text)' }}>
              4.9 / 5 Rating on Feefo
            </span>
          </div>
          <h2 className="section-title">Loved by Thousands of Sleepers</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Hear why our customers return year after year for our hand-drawn prints and signature softness.
          </p>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {REVIEWS.map(r => (
            <div 
              key={r.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                boxShadow: 'var(--shadow-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', color: 'var(--color-accent-gold)', marginBottom: '12px' }}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: '600', marginBottom: '8px', color: 'var(--color-text)' }}>
                  "{r.title}"
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {r.comment}
                </p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      {r.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block' }}>
                      {r.location}
                    </span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--color-accent-forest)', fontWeight: '600' }}>
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
