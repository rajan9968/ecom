import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

export function FeaturedCarousel({ onQuickView }) {
  const [activeTab, setActiveTab] = useState('bestsellers');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const displayedProducts = activeTab === 'bestsellers' 
    ? PRODUCTS.filter(p => p.isBestseller).slice(0, 8)
    : PRODUCTS.filter(p => p.isNew).slice(0, 8);

  return (
    <section id="featured-products" style={{
      padding: 'clamp(60px, 8vw, 100px) 0',
      backgroundColor: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="container">
        {/* Header with Switcher Tabs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <span className="section-tag">FEEL-GOOD FAVOURITES</span>
          <h2 className="section-title">Iconic Hand-Drawn Prints</h2>

          <div style={{
            display: 'flex',
            gap: '8px',
            backgroundColor: 'var(--color-bg)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            marginTop: '8px'
          }}>
            <button
              onClick={() => setActiveTab('bestsellers')}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: '600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: activeTab === 'bestsellers' ? 'var(--color-accent-dark)' : 'transparent',
                color: activeTab === 'bestsellers' ? '#FFFFFF' : 'var(--color-text-secondary)',
                transition: 'var(--transition-normal)'
              }}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: '600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: activeTab === 'new' ? 'var(--color-accent-dark)' : 'transparent',
                color: activeTab === 'new' ? '#FFFFFF' : 'var(--color-text-secondary)',
                transition: 'var(--transition-normal)'
              }}
            >
              New In
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '28px'
        }}>
          {displayedProducts.map(product => {
            const isFav = isInWishlist(product.id);

            return (
              <article 
                key={product.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
                className="product-card"
              >
                {/* Media Container with Image Flip on Hover */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-bg)',
                  marginBottom: '16px'
                }} className="product-media-container">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'opacity 0.4s ease'
                    }}
                    className="primary-img"
                  />
                  <img 
                    src={product.images[1]} 
                    alt={`${product.title} alternate view`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }}
                    className="secondary-img"
                  />

                  {/* Badge */}
                  {product.tag && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: product.tag === 'BESTSELLER' ? 'var(--color-accent-dark)' : 'var(--color-accent-forest)',
                      color: '#FFFFFF',
                      fontSize: '0.62rem',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      zIndex: 2
                    }}>
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '8px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      boxShadow: 'var(--shadow-subtle)',
                      zIndex: 2,
                      color: isFav ? 'var(--color-accent-terracotta)' : 'var(--color-text)'
                    }}
                  >
                    <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                  </button>

                  {/* Quick Add Overlay on hover */}
                  <div className="quick-actions-bar" style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 3
                  }}>
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '10px 14px', fontSize: '0.72rem' }}
                    >
                      <ShoppingBag size={14} /> Quick Add
                    </button>
                  </div>
                </div>

                {/* Product Metadata */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', color: 'var(--color-accent-gold)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginLeft: '4px' }}>
                      ({product.reviewCount})
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '0.94rem',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    color: 'var(--color-text)',
                    marginBottom: '6px'
                  }}>
                    {product.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'var(--color-text)'
                    }}>
                      {formatPrice(product.priceGBP)}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      Free UK Delivery &gt; £60
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .product-card .quick-actions-bar {
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.25s ease;
        }
        .product-card:hover .quick-actions-bar {
          opacity: 1;
          transform: translateY(0);
        }
        .product-card:hover .primary-img {
          opacity: 0;
        }
        .product-card:hover .secondary-img {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
