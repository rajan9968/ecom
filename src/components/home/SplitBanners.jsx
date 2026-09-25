import React from 'react';
import './SplitBanners.css';

export function SplitBanners() {
  return (
    <section className="split-banners-section">
      <div className="container">
        <div className="row g-4">
          {/* Banner 1: New In */}
          <div className="col-12 col-lg-6">
            <div className="split-banner-card">
              <img 
                src="https://www.theirnibs.com/cdn/shop/files/Transitional_new_In.jpg" 
                alt="New In"
                className="split-banner-img"
              />
              <div className="split-banner-overlay" />
              <div className="split-banner-content">
                <h3 className="split-banner-title">
                  New In
                </h3>
                <a href="#featured-products" className="split-banner-btn">
                  SHOP NEW
                </a>
              </div>
            </div>
          </div>

          {/* Banner 2: Dressing Gowns & Robes */}
          <div className="col-12 col-lg-6">
            <div className="split-banner-card">
              <img 
                src="https://www.theirnibs.com/cdn/shop/files/Wisteria_Robe_Hero_banner.jpg" 
                alt="Dressing Gowns & Robes"
                className="split-banner-img"
              />
              <div className="split-banner-overlay" />
              <div className="split-banner-content">
                <h3 className="split-banner-title">
                  Dressing Gowns & Robes
                </h3>
                <a href="#featured-products" className="split-banner-btn">
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
