import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu.jsx';
import { MEGA_MENU_DATA } from '../../data/megaMenuData.js';
import './Header.css';

export function Header({ onOpenSearch, onOpenMobileNav }) {
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
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
        setActiveMenuId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnterItem = (menuId) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (menuId && MEGA_MENU_DATA[menuId]) {
      setActiveMenuId(menuId);
    } else {
      setActiveMenuId(null);
    }
  };

  const handleMouseLeaveItem = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 180);
  };

  const handleMouseEnterMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 180);
  };

  const navItems = [
    { label: 'Sophie Ellis-Bextor Collaboration', href: '#featured-products', hasMega: false },
    { label: 'Halloween', href: '#featured-products', hasMega: false },
    { label: 'New In', href: '#featured-products', hasMega: true, menuId: 'new-in' },
    { label: 'Womens', href: '#featured-products', hasMega: true, menuId: 'womens' },
    { label: 'Mens', href: '#mens-section', hasMega: true, menuId: 'mens' },
    { label: 'Kids', href: '#kids-section', hasMega: true, menuId: 'kids' },
    { label: 'Accessories', href: '#featured-products', hasMega: true, menuId: 'accessories' },
    { label: 'Gifting', href: '#featured-products', hasMega: true, menuId: 'gifting' }
  ];

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

          <a href="#" className="d-flex align-items-center text-decoration-none">
            <img 
              src="https://www.theirnibs.com/cdn/shop/files/TheirNibs_Logo_Navy_Wide.png" 
              alt="Their Nibs London"
              className="header-logo-img"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation - Hidden on mobile/tablet (d-none), visible on xl+ (d-xl-flex) */}
        <nav className="desktop-nav d-none d-xl-flex align-items-center gap-3 gap-xxl-4 h-100">
          {navItems.map((item, idx) => {
            const isActive = activeMenuId === item.menuId;

            return (
              <div
                key={idx}
                onMouseEnter={() => handleMouseEnterItem(item.menuId)}
                onMouseLeave={handleMouseLeaveItem}
                className="desktop-nav-item"
              >
                <a 
                  href={item.href}
                  className={`nav-item-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-link-text">
                    {item.label}
                    <span className="nav-link-underline" />
                  </span>

                  {item.hasMega && (
                    <ChevronDown 
                      size={13} 
                      strokeWidth={2}
                      className={`nav-chevron-icon ${isActive ? 'rotated' : ''}`}
                    />
                  )}
                </a>
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
            onClick={() => alert('Welcome to Their Nibs Client Portal. Please login or register to view your order history.')}
            aria-label="Account"
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

      {/* Render the Mega Menu component (Desktop Only) */}
      <div className="d-none d-xl-block">
        <MegaMenu
          menuData={activeMenuId ? MEGA_MENU_DATA[activeMenuId] : null}
          isOpen={Boolean(activeMenuId && MEGA_MENU_DATA[activeMenuId])}
          onClose={() => setActiveMenuId(null)}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        />
      </div>
    </header>
  );
}
