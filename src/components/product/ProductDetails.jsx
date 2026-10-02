import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';
import { API_ENDPOINTS } from '../../api/api.js';
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

export function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, getProductById, isLoading: isProductsLoading } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const [productData, setProductData] = useState(null);
  const [isFetchingItem, setIsFetchingItem] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    // Check if already in products context
    const local = getProductById(id);
    if (local) {
      setProductData(local);
      setFetchError(false);
      return;
    }

    // Otherwise fetch directly from API
    setIsFetchingItem(true);
    setFetchError(false);
    fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(json => {
        if (isMounted) {
          if (json.success && json.data) {
            setProductData(json.data);
          } else {
            setFetchError(true);
          }
        }
      })
      .catch(() => {
        if (isMounted) setFetchError(true);
      })
      .finally(() => {
        if (isMounted) setIsFetchingItem(false);
      });

    return () => { isMounted = false; };
  }, [id, getProductById]);

  const activeProduct = productData ? {
    id: productData.id,
    title: productData.title,
    brand: 'Their Nibs London',
    category: productData.category || 'Women',
    priceGBP: Number(productData.priceGBP ?? productData.price_gbp) || 45.0,
    rating: parseFloat(productData.rating) || 4.9,
    reviewsCount: productData.reviewCount || 42,
    stockAlert: (productData.stock !== undefined && productData.stock <= 5)
      ? `Low in stock - only ${productData.stock} left`
      : `${productData.stock || 25} in stock - ready for fast dispatch`,
    images: Array.isArray(productData.images) && productData.images.length > 0 
      ? productData.images 
      : [productData.image || 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg'],
    sizes: Array.isArray(productData.sizes) && productData.sizes.length > 0 
      ? productData.sizes 
      : ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: productData.description || 'Our signature hand-illustrated British nightwear cut from ultra-soft, breathable fabrics for blissful sleep and lounging.',
    details: Array.isArray(productData.details) && productData.details.length > 0 
      ? productData.details 
      : [
          'Signature hand-drawn British print',
          'Crafted with super-soft, breathable fabric',
          'Contrast piping detailing and durable seams',
          'Machine washable at 30°C for lasting softness'
        ]
  } : null;

  // Dynamic companion cross-sell items from live products API
  const companionItems = useMemo(() => {
    if (!products || !activeProduct) return [];
    return products
      .filter(p => p.id !== activeProduct.id && (p.category === 'Accessories' || p.priceGBP < 30))
      .slice(0, 2)
      .map(p => ({
        id: p.id,
        name: p.title,
        priceGBP: Number(p.priceGBP ?? p.price_gbp) || 20,
        image: Array.isArray(p.images) ? p.images[0] : (p.image || '')
      }));
  }, [products, activeProduct]);

  // Dynamic recommended items from live products API
  const recommendedItems = useMemo(() => {
    if (!products || !activeProduct) return [];
    const sameCat = products.filter(p => p.id !== activeProduct.id && p.category === activeProduct.category);
    const pool = sameCat.length >= 4 ? sameCat : products.filter(p => p.id !== activeProduct.id);
    return pool.slice(0, 4).map(p => ({
      id: p.id,
      title: p.title,
      priceGBP: Number(p.priceGBP ?? p.price_gbp) || 45,
      image: Array.isArray(p.images) ? p.images[0] : (p.image || '')
    }));
  }, [products, activeProduct]);

  const [selectedSize, setSelectedSize] = useState('M (UK 12)');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState({});

  useEffect(() => {
    if (activeProduct && activeProduct.sizes && activeProduct.sizes.length > 0) {
      setSelectedSize(activeProduct.sizes[0]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, activeProduct?.id]);

  const isFavorited = activeProduct ? isInWishlist(activeProduct.id) : false;

  // Add primary product to bag
  const handleAddToBag = () => {
    if (!activeProduct) return;
    addToCart({
      id: activeProduct.id,
      title: activeProduct.title,
      priceGBP: activeProduct.priceGBP,
      image: activeProduct.images[0],
      size: selectedSize
    }, quantity);
    setIsCartOpen(true);
  };

  // Add companion products to bag
  const handleAddSelectedAddons = () => {
    companionItems.forEach((item) => {
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

  const toggleAddon = (itemId) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Loading state
  if (isFetchingItem || (isProductsLoading && !activeProduct)) {
    return (
      <div className="pdp-page-wrapper" style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', backgroundColor: '#FAF6F3', borderRadius: '12px' }}>
            <div className="spinner-border text-danger mb-3" role="status" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1F1F1F' }}>Loading Product Details...</h3>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!activeProduct) {
    return (
      <div className="pdp-page-wrapper" style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '540px', margin: '40px auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px', color: '#1F1F1F' }}>Product Not Found</h2>
          <p style={{ color: '#6B7280', marginBottom: '24px', lineHeight: 1.6 }}>
            The requested product could not be loaded from the store catalogue. It may be out of stock or retired.
          </p>
          <Link 
            to="/collections" 
            style={{ 
              backgroundColor: '#901010', 
              color: '#FFFFFF', 
              padding: '12px 28px', 
              borderRadius: '999px', 
              textDecoration: 'none', 
              fontWeight: 600,
              display: 'inline-block' 
            }}
          >
            Explore All Collections
          </Link>
        </div>
      </div>
    );
  }

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
              <Link to={`/collections/${(activeProduct.category || 'all').toLowerCase()}`}>{activeProduct.category}</Link>
            </li>
            <li className="pdp-breadcrumb-sep">/</li>
            <li className="pdp-breadcrumb-item active">
              {activeProduct.title}
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
                {activeProduct.images.map((imgSrc, idx) => (
                  <div key={idx} className="pdp-gallery-item">
                    <img 
                      src={imgSrc} 
                      alt={`${activeProduct.title} - View ${idx + 1}`} 
                      className="pdp-gallery-img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      onError={(e) => {
                        e.target.src = 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
                      }}
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
                        {activeProduct.description || 'A playful dose of bedtime glamour from our luxury collection. Crafted with soft, breathable fabrics and signature British prints.'}
                      </p>
                      {activeProduct.details && activeProduct.details.length > 0 && (
                        <ul>
                          {activeProduct.details.map((detail, di) => (
                            <li key={di}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div>
                      <p><strong>Fabric Composition:</strong> 100% Super-soft breathable fabric (cotton or liquid-silk satin).</p>
                      <p><strong>Washing Instructions:</strong> Machine wash gentle at 30°C. Wash inside out with similar colours. Cool iron on reverse. Do not tumble dry.</p>
                      <p><strong>Fit Guide:</strong> Generous lounge comfort fit. If you prefer a closer fit, please order one size down.</p>
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
                <span className="pdp-brand-tag">{activeProduct.brand}</span>

                {/* Title */}
                <h1 className="pdp-title">{activeProduct.title}</h1>

                {/* Rating & Reviews */}
                <div className="pdp-rating-row">
                  <div className="pdp-stars-group">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontWeight: '700', color: '#111827' }}>{activeProduct.rating}</span>
                  <span className="pdp-reviews-count">({activeProduct.reviewsCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="pdp-price-row">
                  <span className="pdp-current-price">{formatPrice(activeProduct.priceGBP)}</span>
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
                    {activeProduct.sizes.map((sz) => (
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
                  <span>{activeProduct.stockAlert}</span>
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
                    Pay in 3 interest-free installments of <strong>{formatPrice(activeProduct.priceGBP / 3)}</strong> with Klarna.
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
                    onClick={() => toggleWishlist(activeProduct)}
                    aria-label="Save to Wishlist"
                  >
                    <Heart size={20} fill={isFavorited ? '#901010' : 'none'} color={isFavorited ? '#901010' : '#4B5563'} />
                  </button>
                </div>

                {/* Often Bought Together (Complete the Look) */}
                {companionItems && companionItems.length > 0 && (
                  <div className="pdp-cross-sell-card">
                    <div className="pdp-cross-sell-title">Complete the Look</div>
                    {companionItems.map((addon) => (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recommended For You Carousel/Grid */}
      {recommendedItems && recommendedItems.length > 0 && (
        <section className="pdp-recommended-section">
          <div className="container">
            <div className="pdp-section-header">
              <h2 className="pdp-section-title">Recommended For You</h2>
            </div>

            <div className="row g-3 g-md-4">
              {recommendedItems.map((item) => (
                <div key={item.id} className="col-6 col-md-3">
                  <div 
                    className="pdp-rec-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
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
      )}

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
