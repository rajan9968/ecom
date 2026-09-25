import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { gsap } from '../../utils/animations.jsx';
import './HeroBanner.css';

const SLIDES = [
  {
    id: 'pyjama-sets',
    title: "Women's Pyjama Sets",
    subtitle: "Shop New In Nightwear",
    ctaText: "SHOP NOW",
    ctaLink: "#featured-products",
    image: "https://www.theirnibs.com/cdn/shop/files/Screenshot_2026-07-14_at_15.14.40.png",
    alt: "Women's Pyjama Sets"
  },
  {
    id: 'wisteria-robes',
    title: "Dressing Gowns & Robes",
    subtitle: "Effortless lightweight cotton & elegant hand-painted floral prints",
    ctaText: "SHOP ROBES",
    ctaLink: "#featured-products",
    image: "https://www.theirnibs.com/cdn/shop/files/Wisteria_Robe_Hero_banner.jpg",
    alt: "Dressing Gowns & Robes"
  },
  {
    id: 'sophie-collab',
    title: "Their Nibs x Sophie Ellis-Bextor",
    subtitle: "Exclusive Disco Glamour & Playful Hand-Drawn Vintage Prints",
    ctaText: "DISCOVER THE COLLAB",
    ctaLink: "#featured-products",
    image: "https://www.theirnibs.com/cdn/shop/files/Transitional_new_In.jpg",
    alt: "Their Nibs x Sophie Ellis-Bextor Collaboration"
  }
];

export function HeroBanner() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // Trigger smooth GSAP reveal for the current active slide
  const animateSlide = () => {
    if (!containerRef.current) return;
    const activeSlide = containerRef.current.querySelector('.slick-current');
    if (!activeSlide) return;

    const words = activeSlide.querySelectorAll('.hero-word');
    const fadeItems = activeSlide.querySelectorAll('.hero-fade-item');

    gsap.killTweensOf(words);
    gsap.killTweensOf(fadeItems);

    if (words.length > 0) {
      gsap.fromTo(
        words,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out'
        }
      );
    }

    if (fadeItems.length > 0) {
      gsap.fromTo(
        fadeItems,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.25,
          ease: 'power2.out'
        }
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      animateSlide();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    fade: true,
    arrows: true,
    beforeChange: () => {
      if (containerRef.current) {
        const words = containerRef.current.querySelectorAll('.slick-current .hero-word');
        const fadeItems = containerRef.current.querySelectorAll('.slick-current .hero-fade-item');
        gsap.to([...words, ...fadeItems], { opacity: 0, duration: 0.2 });
      }
    },
    afterChange: () => {
      animateSlide();
    }
  };

  return (
    <section ref={containerRef} className="hero-slider-section w-100">
      <Slider ref={sliderRef} {...settings} className="hero-slick-slider">
        {SLIDES.map((slide) => (
          <div key={slide.id} className="hero-slide-wrapper">
            <div className="hero-slide-item">
              {/* Background Full-Bleed Image */}
              <img 
                src={slide.image} 
                alt={slide.alt}
                className="hero-bg-image"
              />

              {/* Dark subtle overlay for high contrast readability */}
              <div className="hero-overlay" />

              {/* Centered Typography & CTA */}
              <div className="hero-content">
                {/* Hero Title */}
                <h1 className="hero-title">
                  {slide.title.split(' ').map((word, wIdx) => (
                    <span key={wIdx} className="hero-word">
                      {word}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle hero-fade-item">
                  {slide.subtitle}
                </p>

                {/* Call to Action Button */}
                <div className="hero-fade-item">
                  <a href={slide.ctaLink} className="hero-cta-btn">
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
