import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#F3BCA8',
      color: '#1F1F1F',
      padding: 'clamp(40px, 6vw, 70px) 0 28px'
    }}>
      <div className="container">
        {/* Top Columns */}
        <div className="row g-4 mb-4 justify-content-between">
          {/* Col 1: About Us (Half width on mobile) */}
          <div className="col-6 col-md-3">
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              color: '#1F1F1F'
            }}>
              ABOUT US
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#brand-story" style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Our Story</a></li>
              <li><a href="#brand-story" style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Journal</a></li>
              <li><a href="#brand-story" style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>As Seen On</a></li>
              <li><a href="#featured-products" style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Collaborations</a></li>
              <li><a href="#brand-story" style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Careers</a></li>
              <li><a href="mailto:wholesale@theirnibs.com" style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Wholesale</a></li>
            </ul>
          </div>

          {/* Col 2: Customer Care (Half width on mobile) */}
          <div className="col-6 col-md-3">
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              color: '#1F1F1F'
            }}>
              CUSTOMER CARE
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Tracked delivery via Royal Mail.'); }} style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Track Order</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Free UK standard delivery over £60.'); }} style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Delivery Info</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('30-Day Easy UK Returns guarantee.'); }} style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Returns Portal</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Sizes: XS (UK 8), S (UK 10), M (UK 12), L (UK 14), XL (UK 16), XXL (UK 18)'); }} style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Size Guide</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Wash at 30°C on gentle cycle.'); }} style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>FAQs</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Pay in 3 interest-free payments with Klarna.'); }} style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Klarna FAQ</a></li>
            </ul>
          </div>

          {/* Col 3: Get In Touch */}
          <div className="col-12 col-md-5 mt-2 mt-md-0">
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              color: '#1F1F1F'
            }}>
              GET IN TOUCH
            </h4>
            <p style={{ fontSize: '0.84rem', lineHeight: '1.5', marginBottom: '10px', color: '#1F1F1F' }}>
              Need help? Our customer care team is here for you Monday &ndash; Friday 9am&ndash;5pm.
            </p>
            <p style={{ fontSize: '0.86rem', fontWeight: '600', marginBottom: '16px' }}>
              <a href="mailto:help@theirnibs.com" style={{ textDecoration: 'underline', color: '#1F1F1F' }}>help@theirnibs.com</a>
            </p>

            {/* Social Icons & Feefo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <a href="https://instagram.com/theirnibs" target="_blank" rel="noreferrer" style={{ color: '#1F1F1F' }}>
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/theirnibs" target="_blank" rel="noreferrer" style={{ color: '#1F1F1F' }}>
                <Facebook size={20} />
              </a>
              <a href="mailto:help@theirnibs.com" style={{ color: '#1F1F1F' }}>
                <Mail size={20} />
              </a>
            </div>

            <img 
              src="https://www.theirnibs.com/cdn/shop/files/feefo_logo_4_1.png" 
              alt="Feefo Platinum Trusted Service Award"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid rgba(31, 31, 31, 0.15)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.74rem'
        }}>
          <div>
            <span>&copy; {new Date().getFullYear()}, Their Nibs London</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontWeight: '600' }}>
            <span style={{ padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '3px' }}>VISA</span>
            <span style={{ padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '3px' }}>MASTERCARD</span>
            <span style={{ padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '3px' }}>AMEX</span>
            <span style={{ padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '3px' }}>APPLE PAY</span>
            <span style={{ padding: '2px 6px', backgroundColor: '#FFB3C7', color: '#000', borderRadius: '3px' }}>Klarna.</span>
            <span style={{ padding: '2px 6px', backgroundColor: '#BAE6FD', color: '#000', borderRadius: '3px' }}>clearpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
