import React from 'react';
import { Instagram } from 'lucide-react';

export function InstagramFeed() {
  const posts = [
    'https://cdn.shopify.com/s/files/1/1023/3699/files/29.WomensOversizePyjamasNavyTickingStripeShot0036.jpg?v=1773678306',
    'https://cdn.shopify.com/s/files/1/1023/3699/files/9_Natural_Wallpaper_Floral_Square_Neck_Frill_cotton_Nightdress_026.jpg?v=1786457000',
    'https://cdn.shopify.com/s/files/1/1023/3699/files/mens_grey_mushroom_traditional_pyjamas.jpg?v=1760452960',
    'https://cdn.shopify.com/s/files/1/1023/3699/files/MurderontheForwestfloorcosmeticbag2.png?v=1789475820'
  ];

  return (
    <section style={{ paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent-terracotta)', marginBottom: '8px' }}>
            <Instagram size={18} />
            <span style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              @THEIRNIBS
            </span>
          </div>
          <h2 className="section-title">Join Our Pyjama Party</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Tag #TheirNibs in your cozy Sunday mornings to be featured in our community gallery.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {posts.map((img, i) => (
            <div 
              key={i}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-bg-alt)'
              }}
              className="insta-tile"
            >
              <img 
                src={img} 
                alt={`Their Nibs community moment ${i + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="insta-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(42, 75, 60, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} className="insta-overlay">
                <Instagram size={28} color="#fff" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .insta-tile:hover .insta-img { transform: scale(1.08); }
        .insta-tile:hover .insta-overlay { opacity: 1; }
      `}</style>
    </section>
  );
}
