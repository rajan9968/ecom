import React, { useRef, useEffect } from 'react';
import { renderSplitWords, animateSplitText, gsap } from '../../utils/animations.jsx';

export function BrandStatement() {
  const quoteRef = useRef(null);
  const sectionRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    // Animate tag
    if (tagRef.current) {
      gsap.fromTo(
        tagRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%'
          }
        }
      );
    }

    // Split text reveal on the quote
    animateSplitText(quoteRef, sectionRef);
  }, []);

  const quoteText = "Their Nibs has proudly evolved into a women-focused fashion brand, specialising in gorgeous matching prints that celebrate the natural world, in warm colours we feel good in.";

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: 'clamp(44px, 7vw, 90px) 16px',
        backgroundColor: '#FAF6F3',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '920px' }}>
        <span 
          ref={tagRef}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#1F1F1F',
            display: 'block',
            marginBottom: '18px'
          }}
        >
          ABOUT US
        </span>

        <p 
          ref={quoteRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.3rem, 3.8vw, 2.4rem)',
            fontWeight: '500',
            lineHeight: '1.4',
            color: '#1F1F1F',
            margin: '0 auto'
          }}
        >
          {renderSplitWords(quoteText)}
        </p>
      </div>
    </section>
  );
}
