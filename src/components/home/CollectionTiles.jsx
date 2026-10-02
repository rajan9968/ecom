import React, { useRef, useEffect, useMemo } from 'react';
import { useProducts } from '../../context/ProductContext.jsx';
import { renderSplitWords, animateSplitText, gsap } from '../../utils/animations.jsx';
import './CollectionTiles.css';

export function CollectionTiles() {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const tilesRef = useRef(null);
  const { products } = useProducts();

  // Dynamically derive collections from live products API
  const collections = useMemo(() => {
    if (!products || products.length === 0) return [];
    const catMap = new Map();
    for (const p of products) {
      const cat = p.category;
      if (cat && !catMap.has(cat)) {
        const img = (Array.isArray(p.images) && p.images[0]) || p.image;
        if (img) {
          catMap.set(cat, {
            title: `${cat.toUpperCase()} NIGHTWEAR`,
            image: img,
            link: `/collections/${encodeURIComponent(cat.toLowerCase())}`
          });
        }
      }
    }
    return Array.from(catMap.values()).slice(0, 4);
  }, [products]);

  useEffect(() => {
    animateSplitText(headingRef, sectionRef);

    if (tilesRef.current) {
      gsap.fromTo(
        tilesRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tilesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  if (collections.length === 0) return null;

  return (
    <section ref={sectionRef} className="collection-tiles-section">
      <div className="container">
        <h2 ref={headingRef} className="collection-heading">
          {renderSplitWords("SHOP COLLECTIONS")}
        </h2>

        {/* 2-column on mobile, 4-column on desktop */}
        <div ref={tilesRef} className="row row-cols-2 row-cols-md-4 g-2 g-md-3">
          {collections.map((item, idx) => (
            <div key={idx} className="col">
              <a href={item.link} className="coll-tile h-100">
                <div className="coll-tile-img-wrap">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="coll-img"
                  />
                </div>

                {/* Peach Label Bar underneath */}
                <div className="coll-label-bar">
                  <span className="coll-label-text">
                    {item.title}
                  </span>
                  <span className="coll-arrow">&rarr;</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
