import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Gift } from 'lucide-react';

export function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotalGBP, 
    remainingForFreeShipping, 
    freeShippingProgress,
    totalCount 
  } = useCart();
  const { formatPrice } = useCurrency();

  if (!isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.25s ease'
        }}
      />

      {/* Drawer */}
      <aside style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        boxShadow: 'var(--shadow-drawer)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 210
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-bg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--color-accent-terracotta)" />
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--color-text)'
            }}>
              Your Shopping Bag ({totalCount})
            </h3>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            style={{ padding: '4px', color: 'var(--color-text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div style={{
          padding: '16px 24px',
          backgroundColor: 'var(--color-bg-alt)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', marginBottom: '8px' }}>
            <Truck size={16} color="var(--color-accent-forest)" />
            <span>
              {remainingForFreeShipping > 0 ? (
                <>Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for <strong>FREE UK Delivery</strong>!</>
              ) : (
                <strong style={{ color: 'var(--color-accent-forest)' }}>🎉 You have unlocked FREE UK Tracked Delivery!</strong>
              )}
            </span>
          </div>
          <div style={{
            height: '6px',
            backgroundColor: '#E5D7D0',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${freeShippingProgress}%`,
              backgroundColor: 'var(--color-accent-forest)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--color-text-muted)'
            }}>
              <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-text)' }}>
                Your bag is empty
              </p>
              <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
                Discover our bestselling prints & cozy feather-soft pyjamas.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={`${item.product.id}-${item.size}-${idx}`}
                style={{
                  display: 'flex',
                  gap: '14px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--color-border-light)'
                }}
              >
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.title}
                  style={{
                    width: '74px',
                    height: '92px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#f5f5f5'
                  }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{
                      fontSize: '0.86rem',
                      fontWeight: '600',
                      lineHeight: '1.3',
                      marginBottom: '4px',
                      color: 'var(--color-text)'
                    }}>
                      {item.product.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Size: {item.size}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    {/* Quantity controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-full)',
                      padding: '2px 8px'
                    }}>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, -1)}
                        aria-label="Decrease quantity"
                        style={{ padding: '2px 4px', color: 'var(--color-text-secondary)' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '0.8rem', fontWeight: '600' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, 1)}
                        aria-label="Increase quantity"
                        style={{ padding: '2px 4px', color: 'var(--color-text-secondary)' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)' }}>
                        {formatPrice(item.product.priceGBP * item.quantity)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        aria-label="Remove item"
                        style={{ color: 'var(--color-text-muted)', padding: '2px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Subtotal</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text)' }}>
                {formatPrice(subtotalGBP)}
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Taxes calculated at checkout. Free shipping applies above £60.
            </p>
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '0.85rem' }}
              onClick={() => alert(`Proceeding to checkout for ${formatPrice(subtotalGBP)}. Thank you for shopping with Their Nibs!`)}
            >
              Checkout &bull; {formatPrice(subtotalGBP)}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
