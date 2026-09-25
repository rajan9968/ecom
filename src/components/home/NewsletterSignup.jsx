import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    showToast('🎉 You have unlocked 15% off! Use code WELCOME15 at checkout.');
  };

  return (
    <section id="newsletter-section" style={{
      padding: 'clamp(60px, 8vw, 90px) 0',
      backgroundColor: 'var(--color-bg-alt)',
      borderTop: '1px solid var(--color-border)'
    }}>
      <div className="container">
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          padding: 'clamp(36px, 6vw, 60px)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-dropdown)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'var(--color-accent-terracotta)'
          }}>
            <Mail size={24} />
          </div>

          <span className="section-tag" style={{ color: 'var(--color-accent-terracotta)' }}>
            EXCLUSIVE 15% WELCOME OFFER
          </span>

          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', marginBottom: '12px' }}>
            Brighten Your Inbox & Get 15% Off
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '28px' }}>
            Subscribe to receive exclusive early access to print launches, behind-the-scenes London studio stories, and seasonal sales.
          </p>

          {subscribed ? (
            <div style={{
              backgroundColor: 'var(--color-bg-alt)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-accent-forest)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <Check size={18} /> Thank you for subscribing! Use code: <strong>WELCOME15</strong>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  flex: '1 1 260px',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text)'
                }}
              />
              <button 
                type="submit" 
                className="btn-primary"
                style={{ padding: '14px 28px' }}
              >
                Claim 15% Off
              </button>
            </form>
          )}

          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '14px' }}>
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
