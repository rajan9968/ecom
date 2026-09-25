import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Check, 
  ChevronRight, 
  X, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { FoundersStory } from '../home/FoundersStory.jsx';
import { ValuePropsBar } from '../home/ValuePropsBar.jsx';
import './ProductDetails.css';

const PRODUCT_DATA = {
  id: 'seb-long',
  title: 'Their Nibs x Sophie Ellis-Bextor Pink Read My Lips Satin Oversize Pyjama Set',
  brand: 'Their Nibs',
  category: 'Women',
  priceGBP: 62.0,
  rating: 4.9,
  reviewsCount: 124,
  stockAlert: 'Low in stock - only 4 left in this size',
  images: [
    'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg',
    'https://cdn.shopify.com/s/files/1/1023/3699/files/SEB_Satin_Oversized_Pyjama_Red_My_Lips_013_5_UNCROPPED.jpg?v=1786981589',
    'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversized_short_pyjama_set.jpg',
    'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_x_Sophie_Ellis-bextor_Dressing_Gown.jpg'
  ],
  sizes: [
    '8-10 (S)',
    '10-12 (M)',
    '12-14 (L)',
    '14-16 (XL)',
    '16-18 (2XL)',
    '18-20 (3XL)'
  ],
  companionItems: [
    {
      id: 'seb-eye-mask',
      name: 'Their Nibs x Sophie Ellis-Bextor Pink Satin Eye Mask',
      priceGBP: 14.0,
      image: 'https://cdn.shopify.com/s/files/1/1023/3699/files/Their_Nibs_X_Sophie_Ellis-Bextor_Eyemask.jpg?v=1789325836'
    },
    {
      id: 'seb-robe',
      name: 'Their Nibs x Sophie Ellis-Bextor Pink Satin Dressing Gown',
      priceGBP: 60.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_x_Sophie_Ellis-bextor_Dressing_Gown.jpg'
    }
  ],
  recommended: [
    {
      id: 'seb-robe',
      title: 'Sophie Ellis-Bextor Pink Satin Dressing Gown',
      priceGBP: 60.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_x_Sophie_Ellis-bextor_Dressing_Gown.jpg'
    },
    {
      id: 'seb-forest-boxy',
      title: 'Sophie Ellis-Bextor Murder On The Forest Floor Boxy Pyjama Set',
      priceGBP: 60.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_x_Sophie_Ellis-Bextor_Boxy_pyjamas_Set.jpg'
    },
    {
      id: 'seb-shortie',
      title: 'Sophie Ellis-Bextor Read My Lips Satin Short Pyjama Set',
      priceGBP: 58.0,
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversized_short_pyjama_set.jpg'
    },
    {
      id: 'seb-nightdress',
      title: 'Sophie Ellis-Bextor Square Neck Cotton Nightdress',
      priceGBP: 56.0,
      image: 'https://cdn.shopify.com/s/files/1/1023/3699/files/Thier_Nibs_x_Sophie_Ellis-Bextor_Nightdress.jpg'
    }
  ]
};

export function ProductDetails() {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const [selectedSize, setSelectedSize] = useState('10-12 (M)');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState({
    'seb-eye-mask': true,
    'seb-robe': true
  });

  const isFavorited = isInWishlist(PRODUCT_DATA.id);

  // Add primary product to bag
  const handleAddToBag = () => {
    addToCart({
      id: PRODUCT_DATA.id,
      title: PRODUCT_DATA.title,
      priceGBP: PRODUCT_DATA.priceGBP,
      image: PRODUCT_DATA.images[0],
      size: selectedSize
    }, quantity);
    setIsCartOpen(true);
  };

  // Add companion products to bag
  const handleAddSelectedAddons = () => {
    PRODUCT_DATA.companionItems.forEach((item) => {
      if (selectedAddons[item.id]) {
        addToCart({
          id: item.id,
          title: item.name,
          priceGBP: item.priceGBP,
          image: item.image,
          size: 'One Size'
        }, 1);
      }
    });
    setIsCartOpen(true);
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="pdp-page-wrapper">
      {/* 1. Breadcrumbs */}
      <div className="pdp-breadcrumbs-container">
        <div className="container">
          <ul className="pdp-breadcrumbs">
            <li className="pdp-breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="pdp-breadcrumb-sep">/</li>
            <li className="pdp-breadcrumb-item">
              <Link to="/">{PRODUCT_DATA.category}</Link>
            </li>
            <li className="pdp-breadcrumb-sep">/</li>
            <li className="pdp-breadcrumb-item active">
              {PRODUCT_DATA.title}
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Main Product Two-Column Section */}
      <section className="pdp-main-section">
        <div className="container">
          <div className="row g-4 g-lg-5">
            {/* Left Column: Vertical Stacked Product Gallery */}
            <div className="col-12 col-lg-7">
              <div className="pdp-gallery-stack">
                {PRODUCT_DATA.images.map((imgSrc, idx) => (
                  <div key={idx} className="pdp-gallery-item">
                    <img 
                      src={imgSrc} 
                      alt={`${PRODUCT_DATA.title} - View ${idx + 1}`} 
                      className="pdp-gallery-img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>

              {/* Product Information Tabs */}
              <div className="pdp-tabs-container d-none d-lg-block">
                <div className="pdp-tabs-nav">
                  <button 
                    className={`pdp-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    className={`pdp-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details &amp; Care
                  </button>
                  <button 
                    className={`pdp-tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delivery')}
                  >
                    Delivery &amp; Returns
                  </button>
                </div>

                <div className="pdp-tab-content">
                  {activeTab === 'description' && (
                    <div>
                      <p>
                        A playful dose of bedtime glamour from our limited-edition collaboration with Sophie Ellis-Bextor. 
                        This silky satin pyjama set showcases our Read My Lips print—a nod to Sophie’s iconic disco glamour and love of quirky vintage design.
                      </p>
                      <p>
                        Tailored with an oversized, relaxed silhouette, revere collar, fluid wide-leg trousers, and contrast piping, 
                        these pyjamas bring everyday joy and uplifting energy to lazy mornings and cozy bedtimes.
                      </p>
                      <ul>
                        <li>Limited-edition collaboration with Sophie Ellis-Bextor</li>
                        <li>Hand-drawn British boutique print on liquid-silk recycled satin</li>
                        <li>Button-front shirt with chest pocket and contrast piped revere collar</li>
                        <li>Relaxed wide-leg trousers with elasticated waistband and drawstring tie</li>
                        <li>Designed in London by women, for women</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div>
                      <p><strong>Fabric Composition:</strong> 100% Recycled Silky Satin (breathable, anti-static, featherlight).</p>
                      <p><strong>Washing Instructions:</strong> Machine wash cold at 30°C on a gentle cycle. Wash inside out with similar colours. Cool iron on reverse. Do not tumble dry.</p>
                      <p><strong>Fit Guide:</strong> Oversized, easy fit designed for generous lounge comfort. If you prefer a closer fit, please order one size down.</p>
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div>
                      <p><strong>UK Standard Delivery:</strong> Free on orders over £50 (2-3 working days). £3.95 on smaller orders.</p>
                      <p><strong>UK Next Day Delivery:</strong> Order before 2pm Monday to Thursday for next-day dispatch (£5.95).</p>
                      <p><strong>Returns:</strong> 30-day hassle-free return policy. Return labels provided with every order.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Product Purchase Box */}
            <div className="col-12 col-lg-5">
              <div className="pdp-info-sticky">
                {/* Brand Tag */}
                <span className="pdp-brand-tag">{PRODUCT_DATA.brand}</span>

                {/* Title */}
                <h1 className="pdp-title">{PRODUCT_DATA.title}</h1>

                {/* Rating & Reviews */}
                <div className="pdp-rating-row">
                  <div className="pdp-stars-group">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontWeight: '700', color: '#111827' }}>{PRODUCT_DATA.rating}</span>
                  <span className="pdp-reviews-count">({PRODUCT_DATA.reviewsCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="pdp-price-row">
                  <span className="pdp-current-price">{formatPrice(PRODUCT_DATA.priceGBP)}</span>
                  <span className="pdp-vat-note">Includes all taxes</span>
                </div>

                {/* Size Selector */}
                <div className="pdp-size-section">
                  <div className="pdp-size-header">
                    <span className="pdp-size-label">Size: <strong>{selectedSize}</strong></span>
                    <button 
                      className="pdp-size-guide-btn"
                      onClick={() => setIsSizeGuideOpen(true)}
                    >
                      Size Guide
                    </button>
                  </div>

                  <div className="pdp-size-grid">
                    {PRODUCT_DATA.sizes.map((sz) => (
                      <button
                        key={sz}
                        className={`pdp-size-pill ${selectedSize === sz ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Alert */}
                <div className="pdp-stock-alert">
                  <span className="pdp-stock-dot" />
                  <span>{PRODUCT_DATA.stockAlert}</span>
                </div>

                {/* Fit Indicator */}
                <div className="pdp-fit-box">
                  <div className="pdp-fit-labels">
                    <span>Runs Small</span>
                    <span>True to Size</span>
                    <span>Runs Large</span>
                  </div>
                  <div className="pdp-fit-track">
                    <div className="pdp-fit-fill" />
                  </div>
                </div>

                {/* Klarna / Clearpay installment */}
                <div className="pdp-klarna-box">
                  <Sparkles size={16} color="#9333EA" />
                  <span>
                    Pay in 3 interest-free installments of <strong>{formatPrice(PRODUCT_DATA.priceGBP / 3)}</strong> with Klarna.
                  </span>
                </div>

                {/* Actions Row: Qty + Add to Bag + Wishlist */}
                <div className="pdp-actions-row">
                  <div className="pdp-qty-control">
                    <button 
                      className="pdp-qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="pdp-qty-val">{quantity}</span>
                    <button 
                      className="pdp-qty-btn"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Primary Add to Bag Button in Theme rgb(234, 175, 160) */}
                  <button 
                    className="pdp-add-bag-btn"
                    onClick={handleAddToBag}
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Bag</span>
                  </button>

                  {/* Wishlist Button */}
                  <button 
                    className={`pdp-wishlist-toggle-btn ${isFavorited ? 'active' : ''}`}
                    onClick={() => toggleWishlist(PRODUCT_DATA)}
                    aria-label="Save to Wishlist"
                  >
                    <Heart size={20} fill={isFavorited ? '#BA6C5A' : 'none'} color={isFavorited ? '#BA6C5A' : '#4B5563'} />
                  </button>
                </div>

                {/* Often Bought Together (Complete the Look) */}
                <div className="pdp-cross-sell-card">
                  <div className="pdp-cross-sell-title">Complete the Look</div>
                  {PRODUCT_DATA.companionItems.map((addon) => (
                    <div key={addon.id} className="pdp-cross-sell-item">
                      <input 
                        type="checkbox"
                        className="pdp-cross-checkbox"
                        checked={Boolean(selectedAddons[addon.id])}
                        onChange={() => toggleAddon(addon.id)}
                        aria-label={`Select ${addon.name}`}
                      />
                      <img src={addon.image} alt={addon.name} className="pdp-cross-img" />
                      <div className="pdp-cross-info">
                        <div className="pdp-cross-name">{addon.name}</div>
                        <div className="pdp-cross-price">{formatPrice(addon.priceGBP)}</div>
                      </div>
                    </div>
                  ))}

                  <button 
                    className="pdp-cross-add-btn"
                    onClick={handleAddSelectedAddons}
                  >
                    Add Selected to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recommended For You Carousel/Grid */}
      <section className="pdp-recommended-section">
        <div className="container">
          <div className="pdp-section-header">
            <h2 className="pdp-section-title">Recommended For You</h2>
          </div>

          <div className="row g-3 g-md-4">
            {PRODUCT_DATA.recommended.map((item) => (
              <div key={item.id} className="col-6 col-md-3">
                <div 
                  className="pdp-rec-card"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="pdp-rec-img-wrap">
                    <img src={item.image} alt={item.title} className="pdp-rec-img" loading="lazy" />
                  </div>
                  <div className="pdp-rec-body">
                    <h3 className="pdp-rec-title">{item.title}</h3>
                    <div className="pdp-rec-price">{formatPrice(item.priceGBP)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Editorial Sophie Ellis-Bextor Quote Banner */}
      <section className="pdp-quote-banner">
        <div className="container">
          <p className="pdp-quote-text">
            “To put on a gorgeous pair of pyjamas at the end of a long day, ones that make you feel special, that are made with uplifting fabrics and colours.”
          </p>
          <span className="pdp-quote-author">Sophie Ellis-Bextor</span>
        </div>
      </section>

      {/* 5. Founders Feature ("And Proud To Be") */}
      <FoundersStory />

      {/* 6. Value Proposition Trust Bar */}
      <ValuePropsBar />

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="pdp-modal-overlay" onClick={() => setIsSizeGuideOpen(false)}>
          <div className="pdp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pdp-modal-header">
              <h3 className="pdp-modal-title">Size Guide &amp; Measurements</h3>
              <button className="pdp-modal-close" onClick={() => setIsSizeGuideOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <table className="pdp-size-table">
              <thead>
                <tr>
                  <th>UK Size</th>
                  <th>Bust (in)</th>
                  <th>Waist (in)</th>
                  <th>Hips (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>8-10 (S)</td><td>33 - 35</td><td>26 - 28</td><td>36 - 38</td></tr>
                <tr><td>10-12 (M)</td><td>35 - 37</td><td>28 - 30</td><td>38 - 40</td></tr>
                <tr><td>12-14 (L)</td><td>37 - 40</td><td>30 - 33</td><td>40 - 43</td></tr>
                <tr><td>14-16 (XL)</td><td>40 - 43</td><td>33 - 36</td><td>43 - 46</td></tr>
                <tr><td>16-18 (2XL)</td><td>43 - 46</td><td>36 - 39</td><td>46 - 49</td></tr>
                <tr><td>18-20 (3XL)</td><td>46 - 49</td><td>39 - 42</td><td>49 - 52</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
