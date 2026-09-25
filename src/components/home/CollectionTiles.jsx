import React, { useRef, useEffect } from 'react';
import { renderSplitWords, animateSplitText, gsap } from '../../utils/animations.jsx';
import './CollectionTiles.css';

export function CollectionTiles() {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const tilesRef = useRef(null);

  const collections = [
    {
      title: 'TRADITIONAL PYJAMAS',
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg',
      link: '#featured-products'
    },
    {
      title: 'NIGHTDRESSES',
      image: 'https://www.theirnibs.com/cdn/shop/files/62_White_Neo_Classical_Square_Neck_With_Frill_Nightdress_011.jpg',
      link: '#featured-products'
    },
    {
      title: 'SHORTIE PYJAMAS',
      image: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversized_short_pyjama_set.jpg',
      link: '#featured-products'
    },
    {
      title: 'COTTON PYJAMAS',
      image: 'https://www.theirnibs.com/cdn/shop/files/23_Pink_Cotton_Stripe_Oversize_003_5_UNCROPPED.jpg',
      link: '#featured-products'
    }
  ];

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
