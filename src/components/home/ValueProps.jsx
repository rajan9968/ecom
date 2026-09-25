import React from 'react';
import { Truck, RotateCcw, Feather, HeartHandshake } from 'lucide-react';

export function ValueProps() {
  const items = [
    {
      icon: <Truck size={28} color="var(--color-accent-forest)" />,
      title: 'Free UK Tracked Delivery',
      desc: 'Complimentary delivery on all orders over £60 via Royal Mail'
    },
    {
      icon: <RotateCcw size={28} color="var(--color-accent-terracotta)" />,
      title: '30-Day Easy Returns',
      desc: 'Hassle-free exchanges and instant refunds for UK shoppers'
    },
    {
      icon: <Feather size={28} color="var(--color-accent-forest)" />,
      title: 'Feather-Soft Fabrics',
      desc: 'Breathable, sustainable modal cotton blends crafted to last'
    },
    {
      icon: <HeartHandshake size={28} color="var(--color-accent-terracotta)" />,
      title: 'Buy Women Built',
      desc: 'Proudly female-founded with 20% kids profits given to charity'
    }
  ];

  return (
    <section style={{
      padding: '48px 0',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px'
        }}>
          {items.map((it, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {it.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: '600', marginBottom: '4px', color: 'var(--color-text)' }}>
                  {it.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
