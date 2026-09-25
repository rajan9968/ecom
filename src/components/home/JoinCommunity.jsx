import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';

export function JoinCommunity() {
  const [email, setEmail] = useState('');
  const { showToast } = useCart();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    showToast('🎉 Thank you for joining! Use code WELCOME15 for 15% off.');
    setEmail('');
  };

  return (
    <section id="community-section" style={{
      padding: 'clamp(60px, 8vw, 90px) 0',
      backgroundColor: '#FFFFFF',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          fontWeight: '500',
          color: '#1F1F1F',
          marginBottom: '10px'
        }}>
          Join Our Community
        </h2>

        <p style={{
          fontSize: '0.96rem',
          color: '#5E5B58',
          marginBottom: '28px',
          lineHeight: '1.5'
        }}>
          Sign up for 15% off your first order, secret sales and feel-good stories.
        </p>

        <form onSubmit={handleSignup} style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              flex: '1 1 260px',
              maxWidth: '360px',
              padding: '14px 20px',
              border: '1px solid #E8E2DD',
              borderRadius: '999px',
              backgroundColor: '#FAF6F3',
              fontSize: '0.9rem',
              color: '#1F1F1F'
            }}
          />
          <button 
            type="submit"
            style={{
              backgroundColor: '#F3BCA8',
              color: '#1F1F1F',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: '999px',
              transition: 'background-color 0.25s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EAAFA0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F3BCA8'}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
}
