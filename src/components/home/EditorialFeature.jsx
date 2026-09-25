import React, { useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { ShoppingBag } from 'lucide-react';
import { gsap } from '../../utils/animations.jsx';

export function EditorialFeature() {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const sectionRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightCardRef = useRef(null);

  const product = {
    id: 'green-check-nightshirt',
    title: 'Womens Green Check Cotton Gauze Nightshirt',
    priceGBP: 42.00,
    images: [
      'https://www.theirnibs.com/cdn/shop/files/7_Womens_Seersucker_Drop_Shoulder_Mini_Night_Dress_Green_watercolour_Gingham_009_5_UNCROPPED.jpg'
    ]
  };

  useEffect(() => {
    if (leftImgRef.current && sectionRef.current) {
      gsap.fromTo(
        leftImgRef.current,
        { scale: 1.06, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (rightCardRef.current && sectionRef.current) {
      gsap.fromTo(
        rightCardRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '30px 0 60px', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <div className="container">
        <div className="row g-4 align-items-center justify-content-center">
          {/* Large Editorial Photo */}
          <div className="col-12 col-md-6 col-lg-7">
            <div style={{
              position: 'relative',
              aspectRatio: '4/5',
              maxHeight: '580px',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#F5F5F5'
            }}>
              <img 
                ref={leftImgRef}
                src="https://www.theirnibs.com/cdn/shop/files/7_Womens_Seersucker_Drop_Shoulder_Mini_Night_Dress_Green_watercolour_Gingham_009_5_UNCROPPED.jpg" 
                alt="Editorial Green Check Cotton Gauze"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Product Purchase Card */}
          <div className="col-12 col-md-6 col-lg-5">
            <div 
              ref={rightCardRef}
              className="d-flex flex-column align-items-center text-center p-3 p-md-4"
            >
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1F1F1F',
                marginBottom: '16px'
              }}>
                EDITORIAL HIGHLIGHT
              </span>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: '500',
                color: '#1F1F1F',
                marginBottom: '10px',
                lineHeight: '1.25'
              }}>
                {product.title}
              </h3>

              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                maxWidth: '360px',
                marginBottom: '14px',
                lineHeight: '1.5'
              }}>
                Hand-painted watercolour gingham woven in featherlight breathable seersucker cotton gauze.
              </p>

              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1F1F1F',
                marginBottom: '20px'
              }}>
                {formatPrice(product.priceGBP)}
              </span>

              <button
                onClick={() => addToCart(product)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1F1F1F',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.76rem',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '12px 32px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EAAFA0';
                  e.currentTarget.style.color = '#1F1F1F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1F1F1F';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <ShoppingBag size={15} /> ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
