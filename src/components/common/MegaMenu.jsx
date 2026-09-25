import React from 'react';
import './MegaMenu.css';

export function MegaMenu({ menuData, isOpen, onClose, onMouseEnter, onMouseLeave }) {
  if (!menuData) return null;

  return (
    <>
      {/* Click-away backdrop overlay */}
      <div 
        onClick={onClose}
        className={`mega-menu-backdrop ${isOpen ? 'show' : ''}`}
        aria-hidden="true"
      />

      {/* Mega Menu Dropdown Container */}
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`mega-menu-dropdown ${isOpen ? 'show' : ''}`}
        role="region"
        aria-label={`${menuData.label} navigation menu`}
      >
        <div className="container py-4 px-3 px-lg-4">
          <div className="row g-4 align-items-stretch">
            {/* Columns 1, 2, 3 */}
            {menuData.columns.map((column, colIdx) => (
              <div 
                key={colIdx} 
                className={`col-12 col-sm-6 col-lg-3 mega-menu-column ${colIdx > 0 ? 'with-divider' : ''}`}
              >
                <div className="d-flex flex-column gap-4">
                  {column.sections.map((section, secIdx) => (
                    <div key={secIdx}>
                      <h4 className="mega-menu-heading">
                        {section.title}
                      </h4>
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a
                              href={item.href}
                              onClick={onClose}
                              className="mega-menu-link"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Column 4: Promotional Image Banner */}
            {menuData.promo && (
              <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column">
                <a
                  href={menuData.promo.ctaLink}
                  onClick={onClose}
                  className="mega-menu-promo-card"
                >
                  <img
                    src={menuData.promo.image}
                    alt={menuData.promo.alt}
                    className="mega-menu-promo-img"
                  />
                  <div className="mega-menu-promo-overlay" />
                  <span className="mega-menu-promo-btn">
                    {menuData.promo.ctaText}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
