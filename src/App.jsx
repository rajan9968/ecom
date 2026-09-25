import React, { useState } from 'react';
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

function MainLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Header */}
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
      />

      <main style={{ flex: 1 }}>
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
      </main>

      {/* 13. Peach Footer */}
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
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <WishlistProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </WishlistProvider>
    </CurrencyProvider>
  );
}
