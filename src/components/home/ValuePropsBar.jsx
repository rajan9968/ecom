import React from 'react';
import { Truck, Package, ShieldCheck, HeartHandshake } from 'lucide-react';

export function ValuePropsBar() {
  const pillars = [
    {
      icon: <Truck size={24} color="#1F1F1F" />,
      title: 'Fast Delivery',
      desc: 'Tracked Royal Mail from £3.99'
    },
    {
      icon: <Package size={24} color="#1F1F1F" />,
      title: 'Sustainable Packaging',
      desc: '100% recyclable, biodegradable bags'
    },
    {
      icon: <ShieldCheck size={24} color="#1F1F1F" />,
      title: 'Conscious Quality',
      desc: 'Made in ethical factories with durable fabrics'
    },
    {
      icon: <HeartHandshake size={24} color="#1F1F1F" />,
      title: 'Buy Women Built',
      desc: 'Proudly female-founded brand championing women'
    }
  ];

  return (
    <section style={{
      backgroundColor: '#FAF6F3',
      borderTop: '1px solid #E8E2DD',
      padding: '36px 0'
    }}>
      <div className="container">
        {/* 2-columns on mobile, 4-columns on desktop */}
        <div className="row row-cols-2 row-cols-md-4 g-3 g-md-4 text-center justify-content-center">
          {pillars.map((p, idx) => (
            <div key={idx} className="col d-flex flex-column align-items-center">
              <div style={{ marginBottom: '10px' }}>
                {p.icon}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#1F1F1F',
                marginBottom: '4px'
              }}>
                {p.title}
              </h4>
              <p style={{ fontSize: '0.76rem', color: '#5E5B58', maxWidth: '190px', margin: 0, lineHeight: '1.4' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
