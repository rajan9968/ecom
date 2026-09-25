import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { X, ChevronDown } from 'lucide-react';
import './MobileNav.css';

export function MobileNav({ isOpen, onClose }) {
  const { currency, setCurrency, allCurrencies } = useCurrency();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/menu')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          const dynamicItems = json.data.map(item => ({
            id: item.id,
            label: item.title,
            href: item.url || '/',
            submenus: item.submenus || []
          }));
          setNavItems(dynamicItems);
        }
      })
      .catch(() => {});
  }, []);

  if (!isOpen) return null;

  const toggleExpand = (menuId) => {
    setExpandedMenu(prev => (prev === menuId ? null : menuId));
  };

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

        {/* Navigation Items with Expandable Submenus (Only for items that actually have submenus) */}
        <nav className="flex-grow-1 overflow-y-auto d-flex flex-column">
          {navItems.map((item, idx) => {
            const dynamicSubs = item.submenus || [];
            const hasChildren = dynamicSubs.length > 0;
            const isExpanded = expandedMenu === item.id;

            return (
              <div key={item.id || idx} className="mobile-nav-item">
                <div className="mobile-nav-row">
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="mobile-nav-link"
                  >
                    {item.label}
                  </a>

                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(item.id)}
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

                {/* Submenu Accordion - ONLY rendered if hasChildren */}
                {hasChildren && isExpanded && (
                  <div className="mobile-nav-accordion">
                    <div className="d-flex flex-column gap-1">
                      {dynamicSubs.map((sub) => (
                        <div key={sub.id} className="d-flex flex-column">
                          <a
                            href={sub.url || '/collections'}
                            onClick={onClose}
                            className="mobile-nav-sublink d-flex align-items-center justify-content-between"
                          >
                            <span>{sub.title}</span>
                            {sub.badge && (
                              <span className="badge rounded-pill bg-light text-dark px-2 py-1" style={{ fontSize: '0.62rem' }}>
                                {sub.badge}
                              </span>
                            )}
                          </a>

                          {/* 3rd level submenus if present */}
                          {sub.submenus && sub.submenus.length > 0 && (
                            <div className="ps-3 d-flex flex-column gap-1">
                              {sub.submenus.map((nested) => (
                                <a
                                  key={nested.id}
                                  href={nested.url || '/collections'}
                                  onClick={onClose}
                                  className="mobile-nav-sublink text-muted"
                                  style={{ fontSize: '0.8rem' }}
                                >
                                  {nested.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
