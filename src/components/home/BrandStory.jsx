import React from 'react';
import { Sparkles, HeartHandshake, Feather } from 'lucide-react';

export function BrandStory() {
  return (
    <section id="brand-story" style={{
      padding: 'clamp(70px, 9vw, 120px) 0',
      backgroundColor: 'var(--color-bg-alt)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center'
      }}>
        {/* Left Mosaic Imagery */}
        <div style={{ position: 'relative' }}>
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '4/5',
            boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
          }}>
            <img 
              src="https://cdn.shopify.com/s/files/1/1023/3699/files/28.WomensGauzeOversizePyjamasYellowTickingStripe-BabyBlueTrimShot0087.jpg?v=1773686339" 
              alt="Their Nibs London Studio Craft" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Floating Stamp */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            backgroundColor: 'var(--color-accent-forest)',
            color: '#FFFFFF',
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            maxWidth: '220px'
          }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8, display: 'block', marginBottom: '4px' }}>
              BUY WOMEN BUILT
            </span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: '1.3' }}>
              Proudly Female Founded & Print-Led Since 2003
            </p>
          </div>
        </div>

        {/* Right Story Copy */}
        <div>
          <span className="section-tag">BEHIND THE PRINTS</span>
          <h2 className="section-title">
            Artisanal Pyjamas to Brighten the Everyday
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
            Born from a small London market stall in Notting Hill, Their Nibs is dedicated to transforming sleepwear into something joyful, comfortable, and artful.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: '32px' }}>
            Every single print begins as a hand-drawn illustration in our London studio. We obsess over feather-soft draping, durable contrast piping, and thoughtful cuts that make lazy Sunday mornings feel like a boutique hotel retreat.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Sparkles size={24} color="var(--color-accent-terracotta)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>Hand-Drawn Prints</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Original illustrations you will not find anywhere else.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <HeartHandshake size={24} color="var(--color-accent-forest)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>Giving Back</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>20% of kids nightwear profits donated to children’s charities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
