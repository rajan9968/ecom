import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { Search, X, ShoppingBag } from 'lucide-react';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter(p => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return p.title.toLowerCase().includes(q) || 
           p.category.toLowerCase().includes(q) ||
           p.description.toLowerCase().includes(q);
  });

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 250 }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* Modal Card */}
      <div style={{
        position: 'relative',
        maxWidth: '720px',
        margin: '60px auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dropdown)',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease',
        zIndex: 260
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Search size={22} color="var(--color-accent-terracotta)" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pyjamas by print, cut, or collection (e.g. peacock, stripe, mushroom)..."
            autoFocus
            style={{
              flex: 1,
              fontSize: '1rem',
              color: 'var(--color-text)',
              backgroundColor: 'transparent'
            }}
          />
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 24px' }}>
          {!query.trim() ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Popular searches:</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {['Ticking Stripe', 'Peacock', 'Mushroom', 'Sophie Ellis-Bextor', 'Nightdress', 'Cotton Gauze'].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(tag)}
                    style={{
                      fontSize: '0.78rem',
                      padding: '4px 12px',
                      backgroundColor: 'var(--color-bg-alt)',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
              No pyjamas found matching "{query}".
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.slice(0, 6).map(p => (
                <div 
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background 0.2s',
                    backgroundColor: 'var(--color-surface)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-alt)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                    />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-text)' }}>
                        {p.title}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-accent-terracotta)', fontWeight: '600' }}>
                        {formatPrice(p.priceGBP)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(p);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.76rem',
                      fontWeight: '600',
                      padding: '6px 12px',
                      backgroundColor: 'var(--color-accent-dark)',
                      color: '#fff',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    <ShoppingBag size={14} />
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
