import React, { useRef, useEffect } from 'react';
import { gsap } from '../../utils/animations.jsx';

export function FoundersStory() {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (copyRef.current && sectionRef.current) {
      gsap.fromTo(
        copyRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (imgRef.current && sectionRef.current) {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.05, opacity: 0.85 },
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
  }, []);

  return (
    <section ref={sectionRef} id="brand-story" style={{ backgroundColor: '#F8EDE7', overflow: 'hidden' }}>
      <div className="container-fluid p-0">
        <div className="row g-0 align-items-center">
          {/* Copy Column */}
          <div className="col-12 col-md-6 order-2 order-md-1">
            <div 
              ref={copyRef}
              style={{
                padding: 'clamp(32px, 6vw, 80px) clamp(20px, 5vw, 60px)',
                maxWidth: '540px',
                margin: '0 auto'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1F1F1F',
                display: 'block',
                marginBottom: '12px'
              }}>
                ABOUT US
              </span>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)',
                fontWeight: '500',
                color: '#1F1F1F',
                lineHeight: '1.2',
                marginBottom: '10px'
              }}>
                Women-Led Design Duo
              </h2>

              <p style={{
                fontSize: '0.92rem',
                color: '#5E5B58',
                marginBottom: '22px',
                lineHeight: '1.6'
              }}>
                Hand-drawn prints created in London with a mission to bring comfort, color and everyday joy to bedtime.
              </p>

              <a 
                href="#featured-products"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#1F1F1F',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '12px 28px',
                  borderRadius: '999px',
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
                READ OUR STORY
              </a>
            </div>
          </div>

          {/* Photo Column */}
          <div className="col-12 col-md-6 order-1 order-md-2">
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              minHeight: 'clamp(240px, 45vw, 440px)',
              overflow: 'hidden'
            }}>
              <img 
                ref={imgRef}
                src="https://www.theirnibs.com/cdn/shop/files/Screenshot_2026-09-15_at_13.52.03.png" 
                alt="Their Nibs Female Founders"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
