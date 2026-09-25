import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCurrency } from '../../context/CurrencyContext.jsx';
import { 
  Heart, 
  ChevronDown, 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutGrid, 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Check, 
  X 
} from 'lucide-react';
import { ValuePropsBar } from '../home/ValuePropsBar.jsx';
import './ProductListing.css';

const ITEMS_PER_PAGE = 16;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function ProductListing() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [gridColumns, setGridColumns] = useState(4); // 4 or 3
  const [currentPage, setCurrentPage] = useState(1);

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState(null);

  // Sync category if URL param changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      setCurrentPage(1);
    }
  }, [category]);

  // Filtered & Sorted products
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'All') {
      const catLower = selectedCategory.toLowerCase();
      result = result.filter((p) => {
        if (catLower === 'sophie' || catLower === 'sophie-collab') {
          return p.title.toLowerCase().includes('sophie');
        }
        return p.category?.toLowerCase() === catLower || 
               p.title.toLowerCase().includes(catLower);
      });
    }

    // Filter by Size
    if (selectedSize && selectedSize !== 'All') {
      result = result.filter((p) => {
        if (!p.sizes) return true;
        return p.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase()));
      });
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.priceGBP - b.priceGBP);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.priceGBP - a.priceGBP);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedSize, sortBy]);

  // Pagination calculation
  const totalItems = processedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handlers
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleQuickAdd = (product, size, e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      priceGBP: product.priceGBP,
      image: product.images ? product.images[0] : product.image,
      size: size
    }, 1);
    setIsCartOpen(true);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedSize !== 'All';

  return (
    <div className="plp-page-wrapper">
      {/* 1. Header Banner & Breadcrumbs */}
      <div className="plp-header-banner">
        <div className="container">
          <ul className="plp-breadcrumbs">
            <li className="plp-breadcrumb-item">
              <Link to="/" className="plp-breadcrumb-link">Home</Link>
            </li>
            <li className="plp-breadcrumb-sep">/</li>
            <li className="plp-breadcrumb-item">
              <span style={{ color: '#111827', fontWeight: '600' }}>
                {selectedCategory === 'All' ? 'Ladies Pyjamas & Nightwear' : selectedCategory}
              </span>
            </li>
          </ul>

          <div className="plp-title-row">
            <h1 className="plp-page-title">
              {selectedCategory === 'All' ? 'Ladies Pyjamas & Loungewear' : `${selectedCategory} Collection`}
            </h1>
            <span className="plp-product-count-badge">
              {totalItems} {totalItems === 1 ? 'product' : 'products'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Toolbar: Filters & Sort */}
      <div className="plp-toolbar-container">
        <div className="container">
          <div className="plp-toolbar-row">
            {/* Filter Dropdown Buttons */}
            <div className="plp-filters-group">
              {/* Category Dropdown */}
              <div style={{ position: 'relative' }}>
                <button 
                  className={`plp-filter-pill-btn ${selectedCategory !== 'All' ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === 'cat' ? null : 'cat')}
                >
                  <span>Category: {selectedCategory}</span>
                  <ChevronDown size={14} />
                </button>

                {openDropdown === 'cat' && (
                  <div className="plp-filter-popover">
                    {['All', 'Womens', 'Mens', 'Kids', 'Sophie Collab'].map((cat) => (
                      <label key={cat} className="plp-popover-item">
                        <input 
                          type="radio" 
                          name="category"
                          className="plp-popover-checkbox"
                          checked={selectedCategory === cat}
                          onChange={() => {
                            setSelectedCategory(cat);
                            setCurrentPage(1);
                            setOpenDropdown(null);
                          }}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Dropdown */}
              <div style={{ position: 'relative' }}>
                <button 
                  className={`plp-filter-pill-btn ${selectedSize !== 'All' ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === 'size' ? null : 'size')}
                >
                  <span>Size: {selectedSize}</span>
                  <ChevronDown size={14} />
                </button>

                {openDropdown === 'size' && (
                  <div className="plp-filter-popover">
                    {['All', ...SIZES].map((sz) => (
                      <label key={sz} className="plp-popover-item">
                        <input 
                          type="radio" 
                          name="size"
                          className="plp-popover-checkbox"
                          checked={selectedSize === sz}
                          onChange={() => {
                            setSelectedSize(sz);
                            setCurrentPage(1);
                            setOpenDropdown(null);
                          }}
                        />
                        <span>{sz}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sort & Grid Switcher */}
            <div className="plp-sort-view-group">
              <div className="plp-sort-select-wrapper">
                <span>Sort by:</span>
                <select 
                  className="plp-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New In</option>
                </select>
              </div>

              {/* Grid Column Toggles */}
              <div className="plp-grid-switcher d-none d-md-flex">
                <button 
                  className={`plp-grid-toggle-btn ${gridColumns === 4 ? 'active' : ''}`}
                  onClick={() => setGridColumns(4)}
                  title="4 Columns"
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  className={`plp-grid-toggle-btn ${gridColumns === 3 ? 'active' : ''}`}
                  onClick={() => setGridColumns(3)}
                  title="3 Columns"
                >
                  <Grid3X3 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="plp-active-filters-row">
              {selectedCategory !== 'All' && (
                <span className="plp-active-tag">
                  Category: {selectedCategory}
                  <button className="plp-tag-remove-btn" onClick={() => setSelectedCategory('All')}>
                    <X size={13} />
                  </button>
                </span>
              )}
              {selectedSize !== 'All' && (
                <span className="plp-active-tag">
                  Size: {selectedSize}
                  <button className="plp-tag-remove-btn" onClick={() => setSelectedSize('All')}>
                    <X size={13} />
                  </button>
                </span>
              )}
              <button className="plp-clear-all-btn" onClick={clearAllFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Product Cards Grid */}
      <section className="plp-grid-section">
        <div className="container">
          {paginatedProducts.length === 0 ? (
            <div className="plp-empty-state">
              <h2 className="plp-empty-title">No products match your filters</h2>
              <p>Try resetting your size or category selection to see more pyjama styles.</p>
              <button className="plp-filter-pill-btn active" onClick={clearAllFilters} style={{ marginTop: '12px' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-3 g-md-4">
              {paginatedProducts.map((item) => {
                const wishlisted = isInWishlist(item.id);
                const isSophie = item.title?.toLowerCase().includes('sophie') || item.isSophie;
                const colClass = gridColumns === 3 
                  ? 'col-6 col-md-4' 
                  : 'col-6 col-md-4 col-lg-3';
                const mainImage = item.images ? item.images[0] : item.image;

                return (
                  <div key={item.id} className={colClass}>
                    <div className="plp-product-card">
                      {/* Media Container */}
                      <div 
                        className="plp-card-media-wrap"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <img 
                          src={mainImage} 
                          alt={item.title} 
                          className="plp-card-img"
                          loading="lazy"
                        />

                        {/* Badges */}
                        {item.tag === 'NEW' && (
                          <span className="plp-badge-new">NEW</span>
                        )}
                        {item.tag === 'BESTSELLER' && (
                          <span className="plp-badge-bestseller">BESTSELLER</span>
                        )}

                        {/* Sophie x Their Nibs Stamp */}
                        {isSophie && (
                          <div className="plp-sophie-stamp">
                            <span className="plp-sophie-stamp-brand">Sophie x</span>
                            <span className="plp-sophie-stamp-label">Their Nibs</span>
                          </div>
                        )}

                        {/* Wishlist Heart Button */}
                        <button 
                          className="plp-heart-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(item);
                          }}
                          aria-label="Save to Wishlist"
                        >
                          <Heart 
                            size={18} 
                            color={wishlisted ? '#BA6C5A' : '#1F1F1F'}
                            fill={wishlisted ? '#BA6C5A' : 'none'}
                          />
                        </button>

                        {/* Desktop Hover Quick Size Selection Bar */}
                        <div className="plp-hover-sizes-bar">
                          {SIZES.map((sz) => (
                            <button
                              key={sz}
                              className="plp-size-quick-btn"
                              onClick={(e) => handleQuickAdd(item, sz, e)}
                              title={`Add size ${sz} to bag`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Product Details Info */}
                      <div className="plp-card-info">
                        <h3 
                          className="plp-card-title"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.title}
                        </h3>

                        {item.rating && (
                          <div className="plp-card-rating">
                            <Star size={12} fill="#F59E0B" color="#F59E0B" />
                            <span>{item.rating}</span>
                            {item.reviewCount && <span>({item.reviewCount})</span>}
                          </div>
                        )}

                        <div className="plp-card-price-row">
                          <span className="plp-card-price">{formatPrice(item.priceGBP)}</span>
                          <button 
                            className="plp-card-quick-add-link"
                            onClick={(e) => handleQuickAdd(item, 'M', e)}
                          >
                            + Quick Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. Pagination Controls (Explicitly requested by User) */}
          {totalPages > 1 && (
            <div className="plp-pagination-section">
              {/* Summary Counter */}
              <div className="plp-pagination-summary">
                Showing <strong>{startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}</strong> of <strong>{totalItems}</strong> products
              </div>

              {/* Progress Bar */}
              <div className="plp-pagination-progress-track">
                <div 
                  className="plp-pagination-progress-fill"
                  style={{ width: `${(Math.min(startIndex + ITEMS_PER_PAGE, totalItems) / totalItems) * 100}%` }}
                />
              </div>

              {/* Pagination Numbers Navigation */}
              <div className="plp-pagination-nav">
                {/* Previous Button */}
                <button 
                  className="plp-page-nav-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Go to previous page"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>

                {/* Page Number Buttons */}
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show current, first, last, and near current
                  if (
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button 
                        key={pageNum}
                        className={`plp-page-number-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                        aria-label={`Page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 || 
                    pageNum === currentPage + 2
                  ) {
                    return <span key={pageNum} className="plp-page-ellipsis">...</span>;
                  }
                  return null;
                })}

                {/* Next Button */}
                <button 
                  className="plp-page-nav-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Go to next page"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Value Proposition Trust Bar */}
      <ValuePropsBar />
    </div>
  );
}
