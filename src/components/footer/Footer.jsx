import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const [settings, setSettings] = useState({
    site_name: 'Their Nibs London',
    email: 'support@theirnibs.com',
    phone: '+44 (0) 20 8123 4567',
    address: 'Studio 14, The Light Box, 111 Power Road, London, W4 5PY, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    facebook: 'https://facebook.com/theirnibs',
    instagram: 'https://instagram.com/theirnibs',
    twitter: 'https://twitter.com/theirnibs',
    copyright_text: '© 2026 Their Nibs London. All Rights Reserved.'
  });

  useEffect(() => {
    fetch('http://localhost:5001/api/settings')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setSettings(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer style={{
      backgroundColor: '#F3BCA8',
      color: '#1F1F1F',
      padding: 'clamp(40px, 6vw, 70px) 0 28px'
    }}>
      <div className="container">
        {/* Top Columns */}
        <div className="row g-4 mb-4 justify-content-between">
          {/* Col 1: About Us */}
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
              <li><a href={`mailto:${settings.email}`} style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none' }}>Wholesale</a></li>
            </ul>
          </div>

          {/* Col 2: Customer Care */}
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

          {/* Col 3: Get In Touch (Dynamic settings from MySQL) */}
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

            {settings.address && (
              <p style={{ fontSize: '0.84rem', lineHeight: '1.45', marginBottom: '10px', color: '#1F1F1F', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{settings.address}</span>
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
              {settings.email && (
                <a 
                  href={`mailto:${settings.email}`} 
                  style={{ fontSize: '0.86rem', fontWeight: '600', color: '#1F1F1F', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Mail size={15} />
                  <span>{settings.email}</span>
                </a>
              )}
              {settings.phone && (
                <a 
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} 
                  style={{ fontSize: '0.84rem', color: '#1F1F1F', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Phone size={15} />
                  <span>{settings.phone}</span>
                </a>
              )}
            </div>

            {/* Dynamic Social Media Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" style={{ color: '#1F1F1F' }} title="Follow us on Instagram">
                  <Instagram size={20} />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" style={{ color: '#1F1F1F' }} title="Follow us on Facebook">
                  <Facebook size={20} />
                </a>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noreferrer" style={{ color: '#1F1F1F' }} title="Follow us on Twitter / X">
                  <Twitter size={20} />
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} style={{ color: '#1F1F1F' }} title="Email us directly">
                  <Mail size={20} />
                </a>
              )}
            </div>

            <img 
              src="https://www.theirnibs.com/cdn/shop/files/feefo_logo_4_1.png" 
              alt="Feefo Platinum Trusted Service Award"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Bottom Bar with Dynamic Copyright */}
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
            <span>{settings.copyright_text || `© ${new Date().getFullYear()} ${settings.site_name}. All Rights Reserved.`}</span>
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
