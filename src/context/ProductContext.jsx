import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_ENDPOINTS } from '../api/api.js';

const ProductContext = createContext();

const API_BASE = API_ENDPOINTS.PRODUCTS;

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from MySQL backend API
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}?status=all`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProducts(json.data);
        setError(null);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn('[ProductContext] Backend products fetch error:', err.message);
      setError(err.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Find product by id or handle
  const getProductById = useCallback((idOrHandle) => {
    if (!idOrHandle) return null;
    const str = String(idOrHandle).toLowerCase();
    return products.find(
      (p) =>
        String(p.id).toLowerCase() === str ||
        String(p.handle || '').toLowerCase() === str
    ) || null;
  }, [products]);

  // Create new product in MySQL
  const createProduct = async (productData) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to create product');
      }
      // Re-fetch to synchronize state
      await fetchProducts();
      return json.data;
    } catch (err) {
      console.error('createProduct error:', err);
      throw err;
    }
  };

  // Update existing product in MySQL
  const updateProduct = async (id, updateData) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to update product');
      }
      await fetchProducts();
      return json.data;
    } catch (err) {
      console.error('updateProduct error:', err);
      throw err;
    }
  };

  // Delete product from MySQL
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to delete product');
      }
      await fetchProducts();
      return json;
    } catch (err) {
      console.error('deleteProduct error:', err);
      throw err;
    }
  };

  // Upload product image file
  const uploadProductImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Failed to upload image');
    }
    return json.url;
  };

  // Reset catalog to initial boutique seed
  const resetProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/reset`, {
        method: 'POST'
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to reset catalog');
      }
      await fetchProducts();
      return json;
    } catch (err) {
      console.error('resetProducts error:', err);
      throw err;
    }
  };

  const value = {
    products,
    isLoading,
    error,
    refreshProducts: fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    resetProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
