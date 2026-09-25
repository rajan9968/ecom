import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { X, ChevronDown } from 'lucide-react';
import { MEGA_MENU_DATA } from '../../data/megaMenuData.js';
import './MobileNav.css';

export function MobileNav({ isOpen, onClose }) {
  const { currency, setCurrency, allCurrencies } = useCurrency();
  const [expandedMenu, setExpandedMenu] = useState(null);

  if (!isOpen) return null;

  const toggleExpand = (menuId) => {
    setExpandedMenu(prev => (prev === menuId ? null : menuId));
  };

  const navItems = [
    { label: 'Sophie Ellis-Bextor Collaboration', href: '#featured-products' },
    { label: 'Halloween', href: '#featured-products' },
    { label: 'New In', href: '#featured-products', menuId: 'new-in' },
    { label: 'Womens', href: '#featured-products', menuId: 'womens' },
    { label: 'Mens', href: '#mens-section', menuId: 'mens' },
    { label: 'Kids', href: '#kids-section', menuId: 'kids' },
    { label: 'Accessories', href: '#featured-products', menuId: 'accessories' },
    { label: 'Gifting', href: '#featured-products', menuId: 'gifting' }
  ];

  return (
    <div className="position-fixed inset-0" style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 300 }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="mobile-nav-backdrop"
      />

      {/* Drawer */}
      <aside className="mobile-nav-drawer">
        {/* Drawer Header */}
        <div className="mobile-nav-header">
          <img 
            src="https://www.theirnibs.com/cdn/shop/files/TheirNibs_Logo_Navy_Wide.png" 
            alt="Their Nibs London"
            className="mobile-nav-logo"
          />
          <button 
            onClick={onClose} 
            aria-label="Close menu" 
            className="mobile-nav-close-btn"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Items with Expandable Submenus */}
        <nav className="flex-grow-1 overflow-y-auto d-flex flex-column">
          {navItems.map((item, idx) => {
            const mega = item.menuId ? MEGA_MENU_DATA[item.menuId] : null;
            const isExpanded = expandedMenu === item.menuId;

            return (
              <div key={idx} className="mobile-nav-item">
                <div className="mobile-nav-row">
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="mobile-nav-link"
                  >
                    {item.label}
                  </a>

                  {mega && (
                    <button
                      onClick={() => toggleExpand(item.menuId)}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="mobile-nav-toggle-btn"
                    >
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </button>
                  )}
                </div>

                {/* Submenu Accordion */}
                {mega && isExpanded && (
                  <div className="mobile-nav-accordion">
                    {mega.columns.map((col, cIdx) => (
                      <div key={cIdx} className="d-flex flex-column gap-2">
                        {col.sections.map((sec, sIdx) => (
                          <div key={sIdx}>
                            <p className="mobile-nav-section-title">
                              {sec.title}
                            </p>
                            <div className="d-flex flex-column gap-1">
                              {sec.items.map((sub, subIdx) => (
                                <a
                                  key={subIdx}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="mobile-nav-sublink"
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Currency Switcher in Mobile Drawer */}
        <div className="mobile-nav-footer">
          <p className="mobile-nav-footer-label">
            Region & Currency:
          </p>
          <div className="d-flex gap-2">
            {Object.values(allCurrencies).map(c => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`currency-btn ${currency === c.code ? 'active' : ''}`}
              >
                {c.code} ({c.symbol})
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
