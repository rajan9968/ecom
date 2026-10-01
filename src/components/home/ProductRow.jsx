import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';
import { Heart, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import './ProductRow.css';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const CATALOG_DATA = {
  'new-in': [
    {
      id: 'seb-robe',
      title: 'Their Nibs x Sophie Ellis-Bextor Pink Read My Lips Satin Dressing Gown',
      priceGBP: 60.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_x_Sophie_Ellis-bextor_Dressing_Gown.jpg',
      tag: 'NEW',
      isSophie: true
    },
    {
      id: 'seb-shortie',
      title: 'Their Nibs x Sophie Ellis-Bextor Pink Read My Lips Satin Short Pyjama Set',
      priceGBP: 58.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversized_short_pyjama_set.jpg',
      tag: 'NEW',
      isSophie: true
    },
    {
      id: 'seb-forest-boxy',
      title: 'Their Nibs x Sophie Ellis-Bextor Murder On The Forest Floor Cotton Boxy Pyjama Set',
      priceGBP: 60.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_x_Sophie_Ellis-Bextor_Boxy_pyjamas_Set.jpg',
      tag: 'NEW',
      isSophie: true
    },
    {
      id: 'seb-long',
      title: 'Their Nibs x Sophie Ellis-Bextor Pink Read My Lips Satin Oversize Pyjama Set',
      priceGBP: 62.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg',
      tag: 'NEW',
      isSophie: true
    },
    {
      id: 'seb-nightdress',
      title: 'Their Nibs x Sophie Ellis-Bextor Murder On The Forest Floor Cotton Square Neck Nightdress',
      priceGBP: 56.0,
      image: 'https://cdn.shopify.com/s/files/1/1023/3699/files/Thier_Nibs_x_Sophie_Ellis-Bextor_Nightdress.jpg',
      tag: 'NEW',
      isSophie: true
    },
    {
      id: 'seb-house-coat',
      title: 'Their Nibs x Sophie Ellis-Bextor Murder On The Forest Floor Cotton Quilted House Coat',
      priceGBP: 85.0,
      image: 'https://cdn.shopify.com/s/files/1/1023/3699/files/Their_Nibs_x_Sophie_Ellis_Bextor_HouseCoat.jpg',
      tag: 'NEW',
      isSophie: true
    }
  ],
  'best-sellers': [
    {
      id: 'gauze-oversize-set',
      title: 'Womens Navy Ticking Stripe Gauze Oversize Pyjama Set',
      priceGBP: 46.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/29.WomensOversizePyjamasNavyTickingStripeShot0036.jpg',
      tag: 'BESTSELLER',
      isSophie: false
    },
    {
      id: 'charcoal-mushroom',
      title: 'Mens Cotton Traditional Pyjamas Charcoal Mushroom',
      priceGBP: 46.0,
      image: 'https://cdn.shopify.com/s/files/1/1023/3699/files/mens_grey_mushroom_traditional_pyjamas_detail.jpg',
      tag: 'BESTSELLER',
      isSophie: false
    },
    {
      id: 'peacock-blossom',
      title: 'Traditional Cotton Pyjama Set Blue Blossom Peacock',
      priceGBP: 44.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Screenshot_2026-07-14_at_15.14.40.png',
      tag: 'BESTSELLER',
      isSophie: false
    },
    {
      id: 'wisteria-sage-robe',
      title: 'Womens Wisteria Robe Dressing Gown Sage Green',
      priceGBP: 48.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Wisteria_Robe_Hero_banner.jpg',
      tag: 'BESTSELLER',
      isSophie: false
    }
  ],
  'linen-blend': [
    {
      id: 'natural-floral-nightdress',
      title: 'Womens Cotton Square Neck Frill Nightdress White Neo Classical',
      priceGBP: 42.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/62_White_Neo_Classical_Square_Neck_With_Frill_Nightdress_011.jpg',
      tag: 'COTTON',
      isSophie: false
    },
    {
      id: 'pink-stripe-oversize',
      title: 'Womens Pink Cotton Stripe Oversize Pyjama Set',
      priceGBP: 46.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/23_Pink_Cotton_Stripe_Oversize_003_5_UNCROPPED.jpg',
      tag: 'BESTSELLER',
      isSophie: false
    },
    {
      id: 'yellow-ticking-set',
      title: 'Womens Yellow Ticking Stripe Gauze Oversize Pyjama Set',
      priceGBP: 46.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/28.WomensGauzeOversizePyjamasYellowTickingStripe-BabyBlueTrimShot0106.jpg',
      tag: 'NEW',
      isSophie: false
    },
    {
      id: 'green-gingham-dress',
      title: 'Womens Green Check Cotton Gauze Drop Shoulder Mini Dress',
      priceGBP: 42.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/7_Womens_Seersucker_Drop_Shoulder_Mini_Night_Dress_Green_watercolour_Gingham_009_5_UNCROPPED.jpg',
      tag: 'NEW',
      isSophie: false
    }
  ]
};

export function ProductRow() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new-in');
  const sliderRef = useRef(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { products: dynamicProducts } = useProducts();

  // Dynamic calculation of slides count so mobile ALWAYS receives 2 items
  const getSlidesCount = () => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    if (w < 600) return 2;
    if (w < 900) return 2;
    if (w < 1200) return 3;
    return 4;
  };

  const [slidesCount, setSlidesCount] = useState(getSlidesCount);

  useEffect(() => {
    const handleResize = () => {
      setSlidesCount(getSlidesCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'new-in', label: 'New In' },
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'linen-blend', label: 'Linen Blend Pyjamas & Nightdresses' }
  ];

  // Dynamically filter products from MySQL database
  const activeProducts = (dynamicProducts && dynamicProducts.length > 0)
    ? dynamicProducts.filter(p => p.status !== 'inactive')
    : [];

  let currentProducts = [];
  if (activeProducts.length > 0) {
    if (activeTab === 'new-in') {
      const newItems = activeProducts.filter(p => 
        p.isNew || 
        p.is_new || 
        (p.tag && p.tag.toUpperCase().includes('NEW')) || 
        p.isSophie
      );
      currentProducts = newItems.length >= 2 ? newItems : activeProducts.slice(0, 10);
    } else if (activeTab === 'best-sellers') {
      const bestItems = activeProducts.filter(p => 
        p.isBestseller || 
        p.is_bestseller || 
        (p.tag && p.tag.toUpperCase().includes('BEST'))
      );
      currentProducts = bestItems.length >= 2 ? bestItems : activeProducts.filter(p => (p.rating >= 4.8 || p.stock > 10)).slice(0, 10);
    } else {
      // Category or linen-blend
      const linenItems = activeProducts.filter(p => 
        (p.category && p.category.toLowerCase().includes('linen')) || 
        (p.title && p.title.toLowerCase().includes('linen')) || 
        (p.title && p.title.toLowerCase().includes('cotton'))
      );
      currentProducts = linenItems.length >= 2 ? linenItems : activeProducts.slice(0, 10);
    }
  }

  // Fallback to CATALOG_DATA if no products match or still loading
  if (!currentProducts || currentProducts.length === 0) {
    currentProducts = CATALOG_DATA[activeTab] || CATALOG_DATA['new-in'];
  }

  const sliderSettings = {
    dots: false,
    infinite: currentProducts.length > slidesCount,
    speed: 500,
    slidesToShow: slidesCount,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3800,
    pauseOnHover: true,
    arrows: false,
    swipeToSlide: true
  };

  return (
    <section id="featured-products" className="featured-products-section">
      <div className="container">
        {/* Navigation Tabs and Arrow Controls Header */}
        <div className="product-row-header">
          {/* Scrollable Category Tabs */}
          <div className="product-tabs-scroll">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (sliderRef.current) {
                      sliderRef.current.slickGoTo(0);
                    }
                  }}
                  className={`product-tab-btn ${isActive ? 'active' : ''}`}
                >
                  {tab.label}
                  {isActive && <div className="product-tab-underline" />}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Directional Arrows (Hidden on Mobile) */}
          <div className="d-none d-md-flex align-items-center gap-3 pb-2">
            <button 
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous Slide"
              className="slider-arrow-btn"
            >
              <ArrowLeft size={22} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next Slide"
              className="slider-arrow-btn"
            >
              <ArrowRight size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Product Cards Slider */}
        <Slider 
          ref={sliderRef} 
          {...sliderSettings} 
          key={`${activeTab}-${slidesCount}`}
        >
          {currentProducts.map((item) => {
            const wishlisted = isInWishlist(item.id);
            const itemImg = item.image || (item.images && item.images[0]) || 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
            const itemPrice = item.priceGBP !== undefined ? item.priceGBP : (typeof item.price === 'number' ? item.price : 45.0);
            const itemTag = item.tag || (item.isBestseller || item.is_bestseller ? 'BESTSELLER' : item.isNew || item.is_new ? 'NEW' : null);
            const isSophieCollab = item.isSophie || (item.title && item.title.toLowerCase().includes('sophie'));
            const cardSizes = item.sizes && item.sizes.length > 0 ? (Array.isArray(item.sizes) ? item.sizes : SIZES) : SIZES;

            return (
              <div key={item.id}>
                <div 
                  className="product-card-interactive"
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Image Container with Hover Size Bar */}
                  <div className="card-media-wrap">
                    <img 
                      src={itemImg} 
                      alt={item.title}
                      className="card-product-img"
                      onError={(e) => {
                        e.target.src = 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
                      }}
                    />

                    {/* Top Left Tag */}
                    {itemTag && (
                      <span className="card-product-tag">
                        {itemTag}
                      </span>
                    )}

                    {/* Top Right Collaboration Stamp */}
                    {isSophieCollab && (
                      <div className="card-sophie-stamp">
                        <span style={{
                          fontFamily: 'var(--font-serif)',
                          fontStyle: 'italic',
                          fontSize: '0.62rem',
                          fontWeight: '600',
                          lineHeight: '1',
                          color: '#901010'
                        }}>
                          Sophie x
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.52rem',
                          fontWeight: '700',
                          color: '#1F1F1F',
                          lineHeight: '1'
                        }}>
                          Their Nibs
                        </span>
                      </div>
                    )}

                    {/* Bottom Left Sizes Chips: Shows on Card Hover on Desktop */}
                    <div className="card-sizes-bar">
                      {cardSizes.slice(0, 6).map((size) => (
                        <button
                          key={size}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item, size);
                          }}
                          className="size-chip-btn"
                          title={`Add size ${size} to bag`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Bottom Right Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                      aria-label="Save to wishlist"
                      className="card-heart-btn"
                    >
                      <Heart
                        size={19}
                        color="#1F1F1F"
                        fill={wishlisted ? "#1F1F1F" : "none"}
                        strokeWidth={1.35}
                      />
                    </button>
                  </div>

                  {/* Title & Price Below Media */}
                  <h3 className="card-product-title">
                    {item.title}
                  </h3>

                  <span className="card-product-price">
                    {formatPrice(itemPrice)}
                  </span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
