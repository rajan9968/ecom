import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu.jsx';
import './Header.css';

export function Header({ onOpenSearch, onOpenMobileNav, onOpenAdmin }) {
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnterItem = (item) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Only open if this menu actually has submenus with value!
    if (item && Array.isArray(item.submenus) && item.submenus.length > 0) {
      setActiveItem(item);
    } else {
      setActiveItem(null);
    }
  };

  const handleMouseLeaveItem = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 200);
  };

  const handleMouseEnterMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 200);
  };

  // Dynamic navigation items fetched directly from MySQL database API (no hardcoded default menus)
  const [navItems, setNavItems] = useState([]);
  const [logoUrl, setLogoUrl] = useState('https://www.theirnibs.com/cdn/shop/files/TheirNibs_Logo_Navy_Wide.png');

  // Fetch dynamic website menu tree and site settings from MySQL backend API
  useEffect(() => {
    fetch('http://localhost:5001/api/menu')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          const dynamicItems = json.data.map(item => {
            const hasSubmenus = Array.isArray(item.submenus) && item.submenus.length > 0;
            return {
              id: item.id,
              label: item.title,
              href: item.url || '/',
              hasMega: hasSubmenus, // only true if item actually has submenus
              badge: item.badge,
              submenus: item.submenus || []
            };
          });
          setNavItems(dynamicItems);
        }
      })
      .catch(err => {
        console.warn('Could not load navigation from API:', err.message);
      });

    fetch('http://localhost:5001/api/settings')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.logo_url) {
          setLogoUrl(json.data.logo_url);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container d-flex align-items-center justify-content-between">
        {/* Left: Mobile hamburger & Logo */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          <button 
            onClick={onOpenMobileNav}
            aria-label="Open menu"
            className="mobile-hamburger-btn d-flex d-xl-none"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img 
              src={logoUrl} 
              alt="Store Logo"
              className="header-logo-img"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="desktop-nav d-none d-xl-flex align-items-center gap-3 gap-xxl-4 h-100">
          {navItems.map((item, idx) => {
            const isActive = activeItem?.id === item.id;

            return (
              <div
                key={item.id || idx}
                onMouseEnter={() => handleMouseEnterItem(item)}
                onMouseLeave={handleMouseLeaveItem}
                className="desktop-nav-item"
              >
                <Link 
                  to={item.href}
                  className={`nav-item-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-link-text">
                    {item.label}
                    {item.badge && (
                      <span className="header-nav-badge">{item.badge}</span>
                    )}
                    <span className="nav-link-underline" />
                  </span>

                  {item.hasMega && (
                    <ChevronDown 
                      size={13} 
                      strokeWidth={2}
                      className={`nav-chevron-icon ${isActive ? 'rotated' : ''}`}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          <button 
            onClick={onOpenSearch}
            aria-label="Search"
            className="header-action-btn"
          >
            <Search size={20} />
          </button>

          <a 
            href="#featured-products"
            aria-label="Wishlist"
            className="header-action-btn"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="badge-wishlist-count">
                {wishlistCount}
              </span>
            )}
          </a>

          <button 
            onClick={onOpenAdmin || (() => alert('Welcome to Their Nibs Portal.'))}
            aria-label="Account / Admin"
            title="Open Admin Portal"
            className="header-action-btn desktop-account-btn d-none d-xl-flex"
          >
            <User size={20} />
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
            className="header-action-btn"
          >
            <ShoppingBag size={20} />
            <span className="badge-cart-count">
              {totalCount}
            </span>
          </button>
        </div>
      </div>

      {/* Compact Mega Menu: ONLY rendered for items with actual database submenus */}
      <div className="d-none d-xl-block">
        <MegaMenu
          activeItem={activeItem}
          isOpen={Boolean(activeItem && activeItem.submenus && activeItem.submenus.length > 0)}
          onClose={() => setActiveItem(null)}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        />
      </div>
    </header>
  );
}


