import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const PROMO_IMAGES = {
  men: {
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80',
    tagline: "Men's Essentials"
  },
  women: {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    tagline: "Women's Collection"
  },
  kids: {
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop&q=80',
    tagline: "Kids & Baby Collection"
  }
};

export function MegaMenu({ activeItem, isOpen, onClose, onMouseEnter, onMouseLeave }) {
  if (!isOpen || !activeItem) return null;

  const dynamicSubmenus = activeItem.submenus || [];
  // Only render if there are submenus with value
  if (dynamicSubmenus.length === 0) return null;

  const key = (activeItem.label || '').toLowerCase();
  const promoInfo = PROMO_IMAGES[key] || {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
    tagline: `${activeItem.label} Collection`
  };

  return (
    <>
      {/* Click-away backdrop overlay */}
      <div 
        onClick={onClose}
        className={`mega-menu-backdrop ${isOpen ? 'show' : ''}`}
        aria-hidden="true"
      />

      {/* Compact Mega Menu Dropdown Container */}
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`mega-menu-dropdown ${isOpen ? 'show' : ''}`}
        role="region"
        aria-label={`${activeItem.label} navigation menu`}
      >
        <div className="p-3 p-md-4">
          <div className="row g-3 align-items-stretch">
            {/* Left Column: ONLY Database Submenus (No default columns) */}
            <div className="col-12 col-md-7 d-flex flex-column justify-content-between">
              <div>
                <h4 className="mega-menu-heading">
                  {activeItem.label}
                </h4>
                <ul className="mega-dynamic-list">
                  {dynamicSubmenus.map((sub) => (
                    <li key={sub.id} className="mega-dynamic-item">
                      <Link
                        to={sub.url || '/collections'}
                        onClick={onClose}
                        className="mega-menu-link"
                      >
                        <span>{sub.title}</span>
                        {sub.badge && (
                          <span className="mega-sub-badge">{sub.badge}</span>
                        )}
                      </Link>

                      {/* 3rd level submenus if present */}
                      {sub.submenus && sub.submenus.length > 0 && (
                        <ul className="mega-sub-nested-list">
                          {sub.submenus.map((nested) => (
                            <li key={nested.id}>
                              <Link
                                to={nested.url || '/collections'}
                                onClick={onClose}
                                className="mega-nested-link"
                              >
                                {nested.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  to={activeItem.href || '/collections'}
                  onClick={onClose}
                  className="mega-view-all-link"
                >
                  View All {activeItem.label} &rarr;
                </Link>
              </div>
            </div>

            {/* Right Column: Collection Banner */}
            <div className="col-12 col-md-5 d-flex flex-column">
              <Link
                to={activeItem.href || '/collections'}
                onClick={onClose}
                className="mega-menu-promo-card"
              >
                <img
                  src={promoInfo.image}
                  alt={activeItem.label}
                  className="mega-menu-promo-img"
                />
                <div className="mega-menu-promo-overlay" />
                <div className="mega-menu-promo-content">
                  <span className="mega-promo-tag">{promoInfo.tagline}</span>
                  <span className="mega-menu-promo-btn">
                    EXPLORE {activeItem.label.toUpperCase()}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
