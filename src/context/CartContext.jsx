import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Pre-populate with one item for authentic feel or from localStorage
    try {
      const saved = localStorage.getItem('theirnibs_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        product: PRODUCTS[0],
        size: 'M (UK 12)',
        quantity: 1
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('theirnibs_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addToCart = (product, size = 'M (UK 12)', quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`Added to bag: ${product.title} (${size})`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, size, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalGBP = cart.reduce((sum, item) => sum + (item.product.priceGBP * item.quantity), 0);

  // Free shipping threshold £60
  const freeShippingThreshold = 60;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalGBP);
  const freeShippingProgress = Math.min(100, Math.round((subtotalGBP / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalCount,
        subtotalGBP,
        remainingForFreeShipping,
        freeShippingProgress,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
