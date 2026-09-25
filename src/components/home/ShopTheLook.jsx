import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { ShoppingBag, X } from 'lucide-react';

export function ShopTheLook() {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activePin, setActivePin] = useState(null);

  const hotspots = [
    {
      id: 1,
      x: 38,
      y: 42,
      product: PRODUCTS[1] // Navy Ticking Stripe Gauze
    },
    {
      id: 2,
      x: 68,
      y: 65,
      product: PRODUCTS[4] // Sophie Ellis-Bextor Cosmetic Bag
    }
  ];

  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <span className="section-tag">LOOKBOOK SPOTLIGHT</span>
          <h2 className="section-title">Shop The Look</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Click the interactive pins below to shop the hand-illustrated prints directly from our editorial campaign.
          </p>
        </div>

        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          maxHeight: '680px'
        }}>
          <img 
            src="https://cdn.shopify.com/s/files/1/1023/3699/files/29.WomensOversizePyjamasNavyTickingStripeShot0066.jpg?v=1773678306" 
            alt="Their Nibs Campaign Lookbook"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Interactive Hotspot Pins */}
          {hotspots.map(spot => (
            <div 
              key={spot.id}
              style={{
                position: 'absolute',
                top: `${spot.y}%`,
                left: `${spot.x}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}
            >
              <button
                onClick={() => setActivePin(activePin === spot.id ? null : spot.id)}
                aria-label={`View ${spot.product.title}`}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-accent-terracotta)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  animation: 'pulseGlow 2.5s infinite'
                }}
              >
                +
              </button>

              {/* Popover Product Card */}
              {activePin === spot.id && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 12px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '240px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 20,
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text)', lineHeight: '1.3' }}>
                      {spot.product.title}
                    </h4>
                    <button onClick={() => setActivePin(null)} style={{ padding: '2px', color: 'var(--color-text-muted)' }}>
                      <X size={14} />
                    </button>
                  </div>
                  <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-accent-terracotta)', marginBottom: '12px' }}>
                    {formatPrice(spot.product.priceGBP)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(spot.product);
                      setActivePin(null);
                    }}
                    className="btn-primary"
                    style={{ width: '100%', padding: '8px 12px', fontSize: '0.74rem' }}
                  >
                    <ShoppingBag size={14} /> Add to Bag
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
