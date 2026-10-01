// Centralized API configuration and endpoints
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.shopncart.in';
export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

/**
 * Helper to build full URL from a relative path
 * @param {string} path e.g. '/api/products' or 'api/products'
 * @returns {string} full API URL
 */
export const getApiUrl = (path = '') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,

  // Settings
  SETTINGS: `${API_BASE_URL}/api/settings`,
  SETTINGS_UPLOAD: `${API_BASE_URL}/api/settings/upload`,

  // Menu
  MENU: `${API_BASE_URL}/api/menu`,
  MENU_ALL: `${API_BASE_URL}/api/menu/all`,
  MENU_CLEAR: `${API_BASE_URL}/api/menu/clear`,
  MENU_ITEM: (id) => `${API_BASE_URL}/api/menu/${id}`,
  MENU_TOGGLE: (id) => `${API_BASE_URL}/api/menu/${id}/toggle`,

  // Banners
  BANNERS: `${API_BASE_URL}/api/banners`,
  BANNERS_UPLOAD: `${API_BASE_URL}/api/banners/upload`,
  BANNERS_REORDER: `${API_BASE_URL}/api/banners/reorder`,
  BANNER_ITEM: (id) => `${API_BASE_URL}/api/banners/${id}`,

  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCTS_UPLOAD: `${API_BASE_URL}/api/products/upload`,
  PRODUCTS_RESET: `${API_BASE_URL}/api/products/reset`,
  PRODUCT_ITEM: (id) => `${API_BASE_URL}/api/products/${id}`,
};

export default API_BASE_URL;
