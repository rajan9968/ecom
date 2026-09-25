import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Split text into animatable span words or characters
 */
export function renderSplitWords(text, className = 'split-word') {
  if (!text) return null;
  return text.split(' ').map((word, i) => (
    <span 
      key={i} 
      className={className} 
      style={{ 
        display: 'inline-block', 
        overflow: 'hidden', 
        verticalAlign: 'top', 
        marginRight: '0.28em' 
      }}
    >
      <span 
        className="split-inner" 
        style={{ display: 'inline-block' }}
      >
        {word}
      </span>
    </span>
  ));
}

/**
 * Animate split words within a container using GSAP & ScrollTrigger
 */
export function animateSplitText(containerRef, triggerRef = null) {
  if (!containerRef?.current) return;
  const inners = containerRef.current.querySelectorAll('.split-inner');
  if (!inners.length) return;

  gsap.fromTo(
    inners,
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerRef?.current || containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
}
