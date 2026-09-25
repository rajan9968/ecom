import React, { useRef, useEffect } from 'react';
import { gsap } from '../../utils/animations.jsx';
import './FamilyBanners.css';

export function FamilyBanners() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.family-banner-card'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="mens-section" className="family-banners-section">
      <div className="container">
        <div className="row g-4">
          {/* Left Banner: Mens */}
          <div className="col-12 col-lg-6">
            <div className="family-banner-card">
              <img 
                src="https://www.theirnibs.com/cdn/shop/files/Shop_Mens.jpg" 
                alt="Mens Nightwear"
                className="family-banner-img"
              />
              <div className="family-banner-overlay" />
              <div className="family-banner-content">
                <h3 className="family-banner-title">
                  Mens Nightwear
                </h3>
                <p className="family-banner-desc">
                  Comfortable cuts crafted from our softest cottons
                </p>
                <a href="#featured-products" className="family-banner-btn">
                  SHOP MENS
                </a>
              </div>
            </div>
          </div>

          {/* Right Banner: Kids */}
          <div className="col-12 col-lg-6" id="kids-section">
            <div className="family-banner-card">
              <img 
                src="https://www.theirnibs.com/cdn/shop/files/Screenshot_2026-07-06_at_19.33.00.png" 
                alt="Kids Pyjamas"
                className="family-banner-img"
              />
              <div className="family-banner-overlay" />
              <div className="family-banner-content">
                <h3 className="family-banner-title">
                  Kids & Tweens
                </h3>
                <p className="family-banner-desc">
                  20% of every children's pyjama pledged directly to charity
                </p>
                <a href="#featured-products" className="family-banner-btn">
                  SHOP KIDS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
