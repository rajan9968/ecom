import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CurrencyProvider } from './context/CurrencyContext.jsx';

import { AnnouncementBar } from './components/common/AnnouncementBar.jsx';
import { Header } from './components/common/Header.jsx';
import { CartDrawer } from './components/common/CartDrawer.jsx';
import { SearchModal } from './components/common/SearchModal.jsx';
import { MobileNav } from './components/common/MobileNav.jsx';

import { HeroBanner } from './components/home/HeroBanner.jsx';
import { ProductRow } from './components/home/ProductRow.jsx';
import { CollectionTiles } from './components/home/CollectionTiles.jsx';
import { SplitBanners } from './components/home/SplitBanners.jsx';
import { BrandStatement } from './components/home/BrandStatement.jsx';
import { EditorialFeature } from './components/home/EditorialFeature.jsx';
import { FamilyBanners } from './components/home/FamilyBanners.jsx';
import { FoundersStory } from './components/home/FoundersStory.jsx';
import { JoinCommunity } from './components/home/JoinCommunity.jsx';
import { ValuePropsBar } from './components/home/ValuePropsBar.jsx';
import { Footer } from './components/footer/Footer.jsx';

// Dedicated Product Details & Listing Pages
import { ProductDetails } from './components/product/ProductDetails.jsx';
import { ProductListing } from './components/listing/ProductListing.jsx';

// Dedicated Separate Admin Routes (Login & Dashboard)
import { AdminRoutes } from './admin/AdminRoutes.jsx';
import { ShieldCheck } from 'lucide-react';

function ToastBanner() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 400,
      backgroundColor: '#1F1F1F',
      color: '#FFFFFF',
      padding: '14px 22px',
      borderRadius: '999px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      fontSize: '0.85rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      animation: 'fadeIn 0.25s ease'
    }}>
      {toastMessage}
    </div>
  );
}

// Backward Compatibility Handler for #admin hash
function HashAdminRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.location.hash === '#admin') {
      window.location.hash = '';
      navigate('/admin');
    }
  }, [location, navigate]);

  return null;
}

// Common Storefront Layout (Header, Drawers, Modals, Footer)
function StoreLayout({ children }) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleOpenAdmin = () => {
    navigate('/admin');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Header (Same across Home & Product Details) */}
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* 3. Peach Footer (Same across Home & Product Details) */}
      <Footer />

      {/* Slide-out Drawers & Modals */}
      <CartDrawer />
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MobileNav 
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
      <ToastBanner />

      {/* Floating Button to Access Admin Panel */}
      <button
        onClick={handleOpenAdmin}
        title="Open Admin Dashboard"
        style={{
          position: 'fixed',
          bottom: '22px',
          left: '22px',
          zIndex: 350,
          backgroundColor: '#BA6C5A',
          color: '#FFFFFF',
          border: 'none',
          padding: '10px 18px',
          borderRadius: '999px',
          boxShadow: '0 8px 24px rgba(186, 108, 90, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <ShieldCheck size={16} />
        <span>Admin Portal</span>
      </button>
    </div>
  );
}

// Homepage Content
function HomePage() {
  return (
    <>
      {/* 3. Hero Banner (Woman with Blue Mug in Kitchen) */}
      <HeroBanner />

      {/* 4. New In / Sophie Ellis-Bextor Product Row (4 Cards) */}
      <ProductRow />

      {/* 5. Shop Collections 4 Tiles with Peach Label Bars */}
      <CollectionTiles />

      {/* 6. 2-Column Split Banners (New In & Dressing Gowns) */}
      <SplitBanners />

      {/* 7. Big Serif Brand Statement */}
      <BrandStatement />

      {/* 8. Green Check Gingham Asymmetric Feature */}
      <EditorialFeature />

      {/* 9. 2-Column Split Banners (Mens & Kids Pyjamas) */}
      <FamilyBanners />

      {/* 10. Women-Led Design Duo Founders Feature */}
      <FoundersStory />

      {/* 11. Join Our Community Newsletter */}
      <JoinCommunity />

      {/* 12. 4-Pillar Value Proposition Trust Bar */}
      <ValuePropsBar />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <HashAdminRedirect />
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              {/* Storefront Home Route */}
              <Route path="/" element={<StoreLayout><HomePage /></StoreLayout>} />

              {/* Product Listing Routes (with Pagination & Filters) */}
              <Route path="/collections" element={<StoreLayout><ProductListing /></StoreLayout>} />
              <Route path="/collections/:category" element={<StoreLayout><ProductListing /></StoreLayout>} />
              <Route path="/products" element={<StoreLayout><ProductListing /></StoreLayout>} />

              {/* Product Details Route */}
              <Route path="/product" element={<StoreLayout><ProductDetails /></StoreLayout>} />
              <Route path="/product/:id" element={<StoreLayout><ProductDetails /></StoreLayout>} />

              {/* Admin Routes (/admin, /admin/login, /admin/dashboard) */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Fallback to Storefront */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}
