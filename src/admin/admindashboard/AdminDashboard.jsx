import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Search,
  Bell,
  HelpCircle,
  Mail,
  Share2,
  ChevronDown,
  RotateCcw,
  Plus,
  ArrowRight,
  MoreHorizontal,
  Filter,
  Check,
  ExternalLink,
  LayoutGrid,
  BarChart2,
  ShoppingBag,
  Package,
  Users,
  Percent,
  Settings,
  LifeBuoy,
  LogOut,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Tag,
  Truck,
  Eye,
  CheckCircle2,
  Printer,
  Download,
  Compass,
  FolderPlus,
  Pencil,
  Trash2,
  Link2,
  CornerDownRight,
  RefreshCw,
  Layers,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Sliders,
  DollarSign,
  Globe,
  Phone,
  MapPin,
  Upload,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon
} from 'lucide-react';
import './AdminDashboard.css';
import { API_ENDPOINTS } from '../../api/api.js';

export function AdminDashboard({ activeTab = 'dashboard', onExit, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current active nav from prop or current pathname
  const getCurrentTab = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/admin/products') || path.includes('/admin/catalog')) return 'catalog';
    if (path.includes('/admin/menus') || path.includes('/admin/navigation')) return 'menu';
    if (path.includes('/admin/banners')) return 'banners';
    if (path.includes('/admin/settings')) return 'settings';
    return activeTab || 'dashboard';
  };

  const [activeNav, setActiveNav] = useState(getCurrentTab);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync activeNav with URL route changes
  useEffect(() => {
    setActiveNav(getCurrentTab());
  }, [location.pathname, activeTab]);

  // Navigate helper to change route
  const handleNavClick = (tabKey, routePath) => {
    setActiveNav(tabKey);
    setIsMobileSidebarOpen(false);
    navigate(routePath);
  };

  // Live Dynamic Products state (managed via MySQL /api/products)
  const [productsList, setProductsList] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productStockFilter, setProductStockFilter] = useState('All');
  const [productHomeFilter, setProductHomeFilter] = useState('All');
  const [productViewMode, setProductViewMode] = useState('grid');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProductConfirm, setDeleteProductConfirm] = useState(null);
  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Womens',
    price: '46.00',
    compare_at_price: '',
    stock: 25,
    tag: 'NEW',
    is_bestseller: false,
    is_new: true,
    image_url: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg',
    description: '',
    sizes: ['XS (UK 8)', 'S (UK 10)', 'M (UK 12)', 'L (UK 14)', 'XL (UK 16)'],
    details: [
      '100% Super-soft breathable fabric',
      'Hand-illustrated British boutique print',
      'Pocket piping and tonal mother-of-pearl buttons',
      'Machine wash gentle at 30°C'
    ],
    status: 'active'
  });

  // Dynamic Navigation Menus & Submenus State
  const [menuTree, setMenuTree] = useState([]);
  const [menuParents, setMenuParents] = useState([]);
  const [isLoadingMenus, setIsLoadingMenus] = useState(false);
  const [expandedMenuIds, setExpandedMenuIds] = useState(new Set());
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    title: '',
    url: '/',
    parent_id: '',
    order_index: 1,
    status: 'active',
    badge: ''
  });

  // Interactive Modals & Toast
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Trigger toast alert
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Dynamic Site Settings state (managed via MySQL /api/settings)
  const [siteSettings, setSiteSettings] = useState({
    site_name: 'Their Nibs London',
    site_tagline: 'Luxury Pyjamas, Nightwear & Loungewear',
    logo_url: 'https://www.theirnibs.com/cdn/shop/files/TheirNibs_Logo_Navy_Wide.png',
    favicon_url: 'https://www.theirnibs.com/cdn/shop/files/TheirNibs_Logo_Navy_Wide.png',
    email: 'support@theirnibs.com',
    phone: '+44 (0) 20 8123 4567',
    whatsapp: '+44 7123 456789',
    address: 'Studio 14, The Light Box, 111 Power Road, London, W4 5PY, United Kingdom',
    city: 'London',
    postal_code: 'W4 5PY',
    country: 'United Kingdom',
    facebook: 'https://facebook.com/theirnibs',
    instagram: 'https://instagram.com/theirnibs',
    twitter: 'https://twitter.com/theirnibs',
    pinterest: 'https://pinterest.com/theirnibs',
    tiktok: 'https://tiktok.com/@theirnibs',
    youtube: 'https://youtube.com/@theirnibs',
    copyright_text: '© 2026 Their Nibs London. All Rights Reserved.'
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Dynamic Hero Banners State (managed via MySQL /api/banners)
  const [banners, setBanners] = useState([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [isUploadingBannerImg, setIsUploadingBannerImg] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    cta_text: 'SHOP NOW',
    cta_link: '/collections',
    badge: '',
    order_index: 1,
    status: 'active'
  });

  // Fetch site settings from MySQL
  const fetchSiteSettings = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.SETTINGS);
      const json = await res.json();
      if (json.success && json.data) {
        setSiteSettings(json.data);
      }
    } catch (err) {
      console.warn('Backend settings fetch error:', err.message);
    }
  };

  // Save site settings to MySQL
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch(API_ENDPOINTS.SETTINGS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      });
      const json = await res.json();
      if (json.success) {
        setSiteSettings(json.data);
        showToast('Website settings saved to MySQL successfully!');
      } else {
        showToast(json.message || 'Failed to update settings');
      }
    } catch (err) {
      showToast('Error saving settings: ' + err.message);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // File Upload states & handler for Logo and Favicon
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);


  const handleFileUpload = async (file, type) => {
    if (!file) return;
    const isLogo = type === 'logo';
    if (isLogo) setIsUploadingLogo(true);
    else setIsUploadingFavicon(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch(API_ENDPOINTS.SETTINGS_UPLOAD, {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (json.success && json.url) {
        setSiteSettings(prev => ({
          ...prev,
          [isLogo ? 'logo_url' : 'favicon_url']: json.url
        }));
        showToast(`${isLogo ? 'Logo' : 'Favicon'} uploaded & saved to MySQL!`);
      } else {
        showToast(json.message || 'Upload failed');
      }
    } catch (err) {
      showToast('Upload error: ' + err.message);
    } finally {
      if (isLogo) setIsUploadingLogo(false);
      else setIsUploadingFavicon(false);
    }
  };

  // Dynamically update browser tab favicon when loaded
  useEffect(() => {
    if (siteSettings.favicon_url) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = siteSettings.favicon_url;
    }
  }, [siteSettings.favicon_url]);


  // Fetch Website Menus from Backend API (MySQL)
  const fetchMenuData = async () => {
    setIsLoadingMenus(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.MENU}?all=true`);
      const json = await res.json();
      if (json.success && json.data) {
        setMenuTree(json.data);
        const pIds = new Set(json.data.map(m => m.id));
        setExpandedMenuIds(pIds);
      }

      const resAll = await fetch(API_ENDPOINTS.MENU_ALL);
      const jsonAll = await resAll.json();
      if (jsonAll.success && jsonAll.parents) {
        setMenuParents(jsonAll.parents);
      }
    } catch (err) {
      console.warn('Backend menu fetch error, using local fallback:', err);
    } finally {
      setIsLoadingMenus(false);
    }
  };

  // Fetch Hero Banners from Backend API (MySQL)
  const fetchBanners = async () => {
    setIsLoadingBanners(true);
    try {
      const res = await fetch(API_ENDPOINTS.BANNERS);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBanners(json.data);
      }
    } catch (err) {
      console.warn('Backend banners fetch error:', err.message);
    } finally {
      setIsLoadingBanners(false);
    }
  };

  // Fetch Products from Backend API (MySQL)
  const fetchProductsList = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.PRODUCTS}?status=all`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProductsList(json.data);
      }
    } catch (err) {
      console.warn('Backend products fetch error:', err.message);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
    fetchSiteSettings();
    fetchBanners();
    fetchProductsList();
  }, []);

  // Derive category options dynamically from live website navigation menus
  const navigationCategories = React.useMemo(() => {
    if (!Array.isArray(menuTree) || menuTree.length === 0) {
      return [
        { value: 'Men', label: 'Men', isParent: true },
        { value: 'Women', label: 'Women', isParent: true },
        { value: 'Kids', label: 'Kids', isParent: true },
        { value: 'Home', label: 'Home', isParent: true },
        { value: 'Beauty', label: 'Beauty', isParent: true },
        { value: 'Genz', label: 'Genz', isParent: true },
        { value: 'Studio', label: 'Studio', isParent: true }
      ];
    }

    const items = [];
    menuTree.forEach((menu) => {
      if (menu.title) {
        items.push({
          value: menu.title,
          label: menu.title,
          isParent: true,
          parentTitle: null
        });

        if (Array.isArray(menu.submenus) && menu.submenus.length > 0) {
          menu.submenus.forEach((sub) => {
            if (sub.title) {
              items.push({
                value: sub.title,
                label: `${menu.title} › ${sub.title}`,
                isParent: false,
                parentTitle: menu.title
              });
            }
          });
        }
      }
    });

    return items;
  }, [menuTree]);

  // Open modal to create a new product
  const openCreateProductModal = () => {
    setEditingProduct(null);
    const defaultCat = navigationCategories.length > 0 ? navigationCategories[0].value : 'Women';
    setProductForm({
      title: '',
      category: defaultCat,
      price: '46.00',
      compare_at_price: '',
      stock: 25,
      tag: 'NEW',
      is_bestseller: false,
      is_new: true,
      image_url: 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg',
      description: '',
      sizes: ['XS (UK 8)', 'S (UK 10)', 'M (UK 12)', 'L (UK 14)', 'XL (UK 16)'],
      details: [
        '100% Super-soft breathable fabric',
        'Hand-illustrated British boutique print',
        'Pocket piping and tonal mother-of-pearl buttons',
        'Machine wash gentle at 30°C'
      ],
      status: 'active'
    });
    setIsProductModalOpen(true);
  };

  // Open modal to edit existing product
  const openEditProductModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title || '',
      category: prod.category || 'Womens',
      price: String(prod.priceGBP !== undefined ? prod.priceGBP : prod.price?.replace('£', '') || '46.00'),
      compare_at_price: prod.compareAtPriceGBP ? String(prod.compareAtPriceGBP) : '',
      stock: prod.stock !== undefined ? prod.stock : 25,
      tag: prod.tag || '',
      is_bestseller: Boolean(prod.isBestseller || prod.is_bestseller),
      is_new: Boolean(prod.isNew || prod.is_new),
      image_url: prod.image || (prod.images && prod.images[0]) || '',
      description: prod.description || '',
      sizes: Array.isArray(prod.sizes) && prod.sizes.length > 0 ? prod.sizes : ['XS (UK 8)', 'S (UK 10)', 'M (UK 12)', 'L (UK 14)', 'XL (UK 16)'],
      details: Array.isArray(prod.details) && prod.details.length > 0 ? prod.details : [
        '100% Super-soft breathable fabric',
        'Hand-illustrated British boutique print',
        'Pocket piping and tonal mother-of-pearl buttons',
        'Machine wash gentle at 30°C'
      ],
      status: prod.status || 'active'
    });
    setIsProductModalOpen(true);
  };

  // Save (Create or Update) Product to MySQL
  const handleSaveProduct = async (e) => {
    if (e) e.preventDefault();
    if (!productForm.title.trim()) {
      showToast('Please provide a product title');
      return;
    }

    const priceNum = parseFloat(productForm.price) || 45.0;
    const stockNum = parseInt(productForm.stock, 10) >= 0 ? parseInt(productForm.stock, 10) : 25;
    const isEdit = Boolean(editingProduct);
    const endpoint = isEdit
      ? API_ENDPOINTS.PRODUCT_ITEM(editingProduct.id)
      : API_ENDPOINTS.PRODUCTS;
    const method = isEdit ? 'PUT' : 'POST';

    const payload = {
      title: productForm.title.trim(),
      category: productForm.category,
      priceGBP: priceNum,
      compareAtPriceGBP: productForm.compare_at_price ? parseFloat(productForm.compare_at_price) : null,
      stock: stockNum,
      tag: productForm.tag ? productForm.tag.trim() : null,
      isBestseller: productForm.is_bestseller,
      isNew: productForm.is_new,
      images: [productForm.image_url],
      image: productForm.image_url,
      description: productForm.description,
      sizes: productForm.sizes,
      details: productForm.details,
      status: productForm.status
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(isEdit ? `Updated "${payload.title}" in MySQL!` : `Added "${payload.title}" to catalog!`);
        setIsProductModalOpen(false);
        fetchProductsList();
      } else {
        showToast(json.message || 'Failed to save product');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving product to backend API');
    }
  };

  // Delete product from MySQL
  const handleDeleteProduct = async () => {
    if (!deleteProductConfirm) return;
    try {
      const res = await fetch(API_ENDPOINTS.PRODUCT_ITEM(deleteProductConfirm.id), {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Product "${deleteProductConfirm.title}" removed from catalog.`);
        setDeleteProductConfirm(null);
        fetchProductsList();
      } else {
        showToast(json.message || 'Failed to delete product');
      }
    } catch (err) {
      showToast('Error deleting product');
    }
  };

  // Upload Product Photo
  const handleUploadProductPhoto = async (file) => {
    if (!file) return;
    setIsUploadingProductImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(API_ENDPOINTS.PRODUCTS_UPLOAD, {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (json.success && json.url) {
        setProductForm(prev => ({ ...prev, image_url: json.url }));
        showToast('Product photo uploaded successfully!');
      } else {
        showToast(json.message || 'Image upload failed');
      }
    } catch (err) {
      showToast('Error uploading photo');
    } finally {
      setIsUploadingProductImg(false);
    }
  };

  // Quick Stock Step (+1 or -1)
  const handleQuickStock = async (prod, delta) => {
    const currentStock = prod.stock !== undefined ? prod.stock : 25;
    const nextStock = Math.max(0, currentStock + delta);
    try {
      const res = await fetch(API_ENDPOINTS.PRODUCT_ITEM(prod.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: nextStock })
      });
      const json = await res.json();
      if (json.success) {
        setProductsList(prev => prev.map(p => p.id === prod.id ? { ...p, stock: nextStock, stockCount: nextStock, stockStatus: nextStock <= 5 ? (nextStock === 0 ? 'Out of Stock' : 'Low Stock') : 'In Stock' } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Product Status (active / inactive)
  const handleToggleProductStatus = async (prod) => {
    const newStatus = prod.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(API_ENDPOINTS.PRODUCT_ITEM(prod.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Product set to ${newStatus}`);
        fetchProductsList();
      }
    } catch (err) {
      showToast('Error updating product status');
    }
  };

  // Quick Toggle Bestseller for Homepage
  const handleToggleBestseller = async (prod) => {
    const currentVal = Boolean(prod.isBestseller || prod.is_bestseller);
    const nextVal = !currentVal;
    try {
      const res = await fetch(API_ENDPOINTS.PRODUCT_ITEM(prod.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBestseller: nextVal, is_bestseller: nextVal ? 1 : 0 })
      });
      const json = await res.json();
      if (json.success) {
        showToast(nextVal ? `⭐ Added "${prod.title.slice(0, 24)}..." to Homepage Best Sellers!` : `Removed from Homepage Best Sellers`);
        setProductsList(prev => prev.map(p => p.id === prod.id ? { ...p, isBestseller: nextVal, is_bestseller: nextVal ? 1 : 0 } : p));
      }
    } catch (err) {
      showToast('Error updating bestseller placement');
    }
  };

  // Quick Toggle New In for Homepage
  const handleToggleNew = async (prod) => {
    const currentVal = Boolean(prod.isNew || prod.is_new);
    const nextVal = !currentVal;
    try {
      const res = await fetch(API_ENDPOINTS.PRODUCT_ITEM(prod.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isNew: nextVal, is_new: nextVal ? 1 : 0 })
      });
      const json = await res.json();
      if (json.success) {
        showToast(nextVal ? `✨ Added "${prod.title.slice(0, 24)}..." to Homepage New In!` : `Removed from Homepage New In`);
        setProductsList(prev => prev.map(p => p.id === prod.id ? { ...p, isNew: nextVal, is_new: nextVal ? 1 : 0 } : p));
      }
    } catch (err) {
      showToast('Error updating new in placement');
    }
  };

  // Reset catalog to default 50 products
  const handleResetCatalog = async () => {
    if (!window.confirm('Are you sure you want to reset all products back to the original 50 boutique items in MySQL?')) {
      return;
    }
    try {
      const res = await fetch(API_ENDPOINTS.PRODUCTS_RESET, { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        showToast('Boutique catalog reset to default 50 items!');
        fetchProductsList();
      } else {
        showToast(json.message || 'Failed to reset catalog');
      }
    } catch (err) {
      showToast('Error resetting catalog');
    }
  };

  // Open modal to create a new banner
  const openCreateBannerModal = () => {
    setEditingBanner(null);
    setBannerForm({
      title: '',
      subtitle: '',
      image_url: '',
      cta_text: 'SHOP NOW',
      cta_link: '/collections',
      badge: '',
      order_index: (banners.length + 1),
      status: 'active'
    });
    setIsBannerModalOpen(true);
  };

  // Open modal to edit an existing banner
  const openEditBannerModal = (banner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      image_url: banner.image_url || '',
      cta_text: banner.cta_text || 'SHOP NOW',
      cta_link: banner.cta_link || '/collections',
      badge: banner.badge || '',
      order_index: banner.order_index || 1,
      status: banner.status || 'active'
    });
    setIsBannerModalOpen(true);
  };

  // Save (Create or Update) Hero Banner
  const handleSaveBanner = async (e) => {
    if (e) e.preventDefault();
    if (!bannerForm.title.trim() || !bannerForm.image_url.trim()) {
      showToast('Please provide both a Title and Banner Image URL');
      return;
    }

    const isEdit = Boolean(editingBanner);
    const endpoint = isEdit
      ? API_ENDPOINTS.BANNER_ITEM(editingBanner.id)
      : API_ENDPOINTS.BANNERS;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerForm)
      });
      const json = await res.json();
      if (json.success) {
        showToast(isEdit ? 'Hero banner updated successfully!' : 'Hero banner created successfully!');
        setIsBannerModalOpen(false);
        fetchBanners();
      } else {
        showToast(json.message || 'Failed to save banner');
      }
    } catch (err) {
      console.error(err);
      showToast('Error connecting to backend API');
    }
  };

  // Delete Hero Banner
  const handleDeleteBanner = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the hero banner "${title}" from MySQL?`)) {
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.BANNER_ITEM(id), { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast(`Banner "${title}" deleted.`);
        fetchBanners();
      } else {
        showToast(json.message || 'Failed to delete banner');
      }
    } catch (err) {
      showToast('Error connecting to backend API');
    }
  };

  // Toggle Banner Status (Active / Inactive)
  const handleToggleBannerStatus = async (banner) => {
    const newStatus = banner.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(API_ENDPOINTS.BANNER_ITEM(banner.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Banner marked as ${newStatus}`);
        fetchBanners();
      }
    } catch (err) {
      showToast('Error updating banner status');
    }
  };

  // Upload Hero Banner Image File
  const handleUploadBannerImageFile = async (file) => {
    if (!file) return;
    setIsUploadingBannerImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(API_ENDPOINTS.BANNERS_UPLOAD, {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (json.success && json.url) {
        setBannerForm(prev => ({ ...prev, image_url: json.url }));
        showToast('Hero banner image uploaded successfully!');
      } else {
        showToast(json.message || 'Image upload failed');
      }
    } catch (err) {
      console.error(err);
      showToast('Error uploading image to backend');
    } finally {
      setIsUploadingBannerImg(false);
    }
  };

  // Reorder Banner (Up / Down)
  const handleMoveBanner = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    const newBanners = [...banners];
    const [moved] = newBanners.splice(index, 1);
    newBanners.splice(targetIndex, 0, moved);

    const items = newBanners.map((b, idx) => ({ id: b.id, order_index: idx + 1 }));
    setBanners(newBanners);

    try {
      await fetch(API_ENDPOINTS.BANNERS_REORDER, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      showToast('Banner display order updated!');
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };


  // Toggle parent menu item expand/collapse
  const toggleExpandMenu = (id) => {
    setExpandedMenuIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Open modal to create a new menu or submenu
  const openCreateMenuModal = (parentId = '') => {
    setEditingMenuItem(null);
    setMenuForm({
      title: '',
      url: parentId ? '/collections' : '/',
      parent_id: parentId ? String(parentId) : '',
      order_index: (menuTree.length + 1),
      status: 'active',
      badge: ''
    });
    setIsMenuModalOpen(true);
  };

  // Open modal to edit an existing menu or submenu
  const openEditMenuModal = (item) => {
    setEditingMenuItem(item);
    setMenuForm({
      title: item.title,
      url: item.url,
      parent_id: item.parent_id ? String(item.parent_id) : '',
      order_index: item.order_index || 0,
      status: item.status || 'active',
      badge: item.badge || ''
    });
    setIsMenuModalOpen(true);
  };

  // Save (Create or Update) Menu Item
  const handleSaveMenu = async (e) => {
    e.preventDefault();
    if (!menuForm.title.trim()) {
      showToast('Please enter a menu title');
      return;
    }

    const isEdit = Boolean(editingMenuItem);
    const endpoint = isEdit
      ? API_ENDPOINTS.MENU_ITEM(editingMenuItem.id)
      : API_ENDPOINTS.MENU;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuForm)
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || (isEdit ? 'Menu updated successfully!' : 'Menu created successfully!'));
        setIsMenuModalOpen(false);
        fetchMenuData();
      } else {
        showToast(json.message || 'Failed to save menu');
      }
    } catch (err) {
      console.error(err);
      showToast('Backend offline: updated in demo state');
      setIsMenuModalOpen(false);
    }
  };

  // Delete Menu Item
  const handleDeleteMenu = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? Any submenus under it will also be deleted from MySQL.`)) {
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.MENU_ITEM(id), { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast(`Deleted "${title}" and child submenus.`);
        fetchMenuData();
      } else {
        showToast(json.message || 'Failed to delete menu');
      }
    } catch (err) {
      showToast('Error connecting to backend API');
    }
  };

  // Remove All Menus (Clear default menus)
  const handleClearAllMenus = async () => {
    if (!window.confirm('Are you sure you want to remove ALL default menus and submenus from the database? You can then create your own custom menus.')) {
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.MENU_CLEAR, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('All default menus removed! You can now add your own menus.');
        fetchMenuData();
      } else {
        showToast(json.message || 'Failed to remove menus');
      }
    } catch (err) {
      showToast('Error connecting to backend API');
    }
  };

  // Toggle Menu Status (Active / Inactive)
  const handleToggleMenuStatus = async (id) => {
    try {
      const res = await fetch(API_ENDPOINTS.MENU_TOGGLE(id), { method: 'PATCH' });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || 'Status toggled successfully');
        fetchMenuData();
      }
    } catch (err) {
      showToast('Error toggling menu status');
    }
  };



  // Reload live data from database
  const handleResetData = () => {
    fetchProductsList();
    fetchMenuData();
    fetchBanners();
    fetchSiteSettings();
    showToast('Live store data reloaded from database');
  };

  // Calculate totals
  const totalTopMenus = menuTree.length;
  const totalSubmenus = menuTree.reduce((acc, m) => acc + (m.submenus ? m.submenus.length : 0), 0);
  const totalActiveItems = menuTree.reduce((acc, m) => {
    const mainActive = m.status === 'active' ? 1 : 0;
    const subActive = m.submenus ? m.submenus.filter(s => s.status === 'active').length : 0;
    return acc + mainActive + subActive;
  }, 0);

  // Friendly title for breadcrumb
  const getTabTitle = () => {
    switch (activeNav) {
      case 'catalog': return 'Products & Catalog';
      case 'menu': return 'Website Navigation Menus';
      case 'banners': return 'Hero Banners & Sliders';
      case 'settings': return 'Store Settings';
      default: return 'Store Overview';
    }
  };

  return (
    <div className="oripio-viewport">
      {/* Mobile Drawer Overlay */}
      <div
        className={`sidebar-overlay ${isMobileSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      <div className="oripio-shell">
        {/* ============================================================
            1. BOUTIQUE E-COMMERCE SIDEBAR (WITH ROUTE NAVIGATION)
           ============================================================ */}
        <aside className={`oripio-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
          {/* Brand Logo & Name */}
          <div className="oripio-brand-wrap" onClick={() => handleNavClick('dashboard', '/admin/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="oripio-brand-logo">
              <ShoppingBag size={19} color="#FFFFFF" />
            </div>
            <div>
              <h1 className="oripio-brand-text">Their Nibs</h1>
              <div className="ecom-admin-badge">STORE ADMIN</div>
            </div>
          </div>

          {/* Quick Search Box */}
          <div className="sidebar-search-box">
            <div className="sidebar-link-content">
              <Search size={15} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search catalog..."
                className="sidebar-search-input"
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  if (activeNav !== 'catalog') {
                    handleNavClick('catalog', '/admin/products');
                  }
                }}
                aria-label="Search Catalog"
              />
            </div>
            <kbd className="sidebar-search-kbd">⌘ K</kbd>
          </div>

          {/* Navigation Group 1: Store Dashboard */}
          <div className="sidebar-menu-group">
            <div className="sidebar-group-title">STORE DASHBOARD</div>
            <ul className="sidebar-nav-list">
              {/* Route: /admin/dashboard */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('dashboard', '/admin/dashboard')}
                  className={`sidebar-nav-link ${activeNav === 'dashboard' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <LayoutGrid size={18} />
                    <span>Overview</span>
                  </div>
                </button>
              </li>

              {/* Route: /admin/products */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('catalog', '/admin/products')}
                  className={`sidebar-nav-link ${activeNav === 'catalog' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <Tag size={18} />
                    <span>Products & Catalog</span>
                  </div>
                  <span className="sidebar-nav-count highlight">{productsList.length}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Group 2: Store Config & Website */}
          <div className="sidebar-menu-group">
            <div className="sidebar-group-title">WEBSITE & CONFIG</div>
            <ul className="sidebar-nav-list">
              {/* Route: /admin/menus */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('menu', '/admin/menus')}
                  className={`sidebar-nav-link ${activeNav === 'menu' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <Compass size={18} />
                    <span>Website Menus</span>
                  </div>
                  <span className="sidebar-nav-count highlight">{totalTopMenus}</span>
                </button>
              </li>

              {/* Route: /admin/banners */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('banners', '/admin/banners')}
                  className={`sidebar-nav-link ${activeNav === 'banners' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <ImageIcon size={18} />
                    <span>Hero Banners</span>
                  </div>
                  <span className="sidebar-nav-count highlight">{banners.length}</span>
                </button>
              </li>

              {/* Route: /admin/settings */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('settings', '/admin/settings')}
                  className={`sidebar-nav-link ${activeNav === 'settings' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <Settings size={18} />
                    <span>Store Settings</span>
                  </div>
                </button>
              </li>

              {/* Switch to Live Storefront */}
              <li className="sidebar-nav-item">
                <button
                  onClick={onExit || (() => navigate('/'))}
                  className="sidebar-nav-link live-storefront-link"
                  title="Switch to customer storefront"
                >
                  <div className="sidebar-link-content">
                    <ExternalLink size={18} />
                    <span>Live Storefront</span>
                  </div>
                  <span className="live-pulse-dot" />
                </button>
              </li>

              <li className="sidebar-nav-item">
                <button
                  onClick={() => setIsHelpModalOpen(true)}
                  className="sidebar-nav-link"
                >
                  <div className="sidebar-link-content">
                    <LifeBuoy size={18} />
                    <span>Merchant Support</span>
                  </div>
                </button>
              </li>

              <li className="sidebar-nav-item">
                <button
                  onClick={onLogout || onExit}
                  className="sidebar-nav-link logout-link"
                  title="Sign out of administrative session"
                >
                  <div className="sidebar-link-content">
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Live Status Card */}
          <div className="sidebar-upgrade-card ecom-status-box">
            <div className="upgrade-card-title">
              <span className="status-live-indicator" /> Online Store Live
            </div>
            <p className="upgrade-card-desc">Connected to live API & MySQL database</p>
            <div className="upgrade-btn-row">
              <button
                onClick={onExit || (() => navigate('/'))}
                className="upgrade-pill-btn store-view-btn"
              >
                <Eye size={13} /> View Store
              </button>
            </div>
          </div>
        </aside>

        {/* ============================================================
            2. MAIN CANVAS & TOPBAR
           ============================================================ */}
        <main className="oripio-main-canvas">
          {/* Top Bar */}
          <header className="oripio-topbar">
            {/* Left Breadcrumbs with Clickable History */}
            <div className="breadcrumbs-box">
              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileSidebarOpen(true)}
                aria-label="Toggle navigation menu"
              >
                <Menu size={18} />
              </button>

              <button
                className="arrow-history-btn"
                onClick={() => navigate(-1)}
                title="Go back"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="arrow-history-btn"
                onClick={() => navigate(1)}
                title="Go forward"
              >
                <ChevronRight size={16} />
              </button>
              <span className="breadcrumb-path">
                Their Nibs London &gt; Store Admin &gt; {getTabTitle()}
              </span>
            </div>

            {/* Right Action Icons & Profile */}
            <div className="topbar-right-group">
              {/* Quick Tab Action Button */}
              {activeNav !== 'dashboard' && (
                <button
                  className="topbar-storefront-pill"
                  onClick={() => handleNavClick('dashboard', '/admin/dashboard')}
                  title="Return to Sales Dashboard"
                >
                  <LayoutGrid size={14} />
                  <span>Overview</span>
                </button>
              )}

              {/* Live Storefront Quick Link */}
              <button
                className="topbar-storefront-pill"
                onClick={onExit || (() => navigate('/'))}
                title="Open live customer storefront"
              >
                <ExternalLink size={14} />
                <span>Live Store</span>
              </button>

              <button
                className="topbar-icon-btn"
                onClick={() => setIsHelpModalOpen(true)}
                title="Merchant Help Desk"
                aria-label="Help"
              >
                <HelpCircle size={18} />
              </button>

              <button
                className="topbar-icon-btn"
                onClick={() => showToast('Low stock alert: 4 units left of Sophie Pink Satin Pyjamas')}
                title="Order & Stock Alerts"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="topbar-badge-dot" />
              </button>

              {/* User Avatar + Dropdown */}
              <div className="oripio-dropdown-wrapper">
                <button
                  className="topbar-profile-btn"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  aria-label="User Profile"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    alt="Store Admin"
                    className="topbar-avatar-img"
                  />
                  <ChevronDown size={14} color="#6B7280" />
                </button>

                {isProfileMenuOpen && (
                  <div className="oripio-dropdown-menu">
                    <div className="dropdown-user-header">
                      <strong>Store Manager</strong>
                      <span className="dropdown-user-email">admin@theirnibs.com</span>
                    </div>
                    <div className="dropdown-divider" />
                    <button
                      className="oripio-dropdown-item"
                      onClick={() => { setIsProfileMenuOpen(false); handleNavClick('menu', '/admin/menus'); }}
                    >
                      <Compass size={14} />
                      <span>Website Menus</span>
                    </button>
                    <button
                      className="oripio-dropdown-item"
                      onClick={() => { setIsProfileMenuOpen(false); handleNavClick('banners', '/admin/banners'); }}
                    >
                      <ImageIcon size={14} />
                      <span>Hero Banners</span>
                    </button>
                    <button
                      className="oripio-dropdown-item"
                      onClick={() => { setIsProfileMenuOpen(false); handleNavClick('catalog', '/admin/products'); }}
                    >
                      <Tag size={14} />
                      <span>Product Catalog</span>
                    </button>
                    <button
                      className="oripio-dropdown-item"
                      onClick={() => { setIsProfileMenuOpen(false); handleNavClick('settings', '/admin/settings'); }}
                    >
                      <Settings size={14} />
                      <span>Store Settings</span>
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      className="oripio-dropdown-item danger"
                      onClick={onLogout || onExit}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Contextual Action Button */}
              {activeNav === 'menu' ? (
                <button
                  className="topbar-share-btn add-prod-header-btn"
                  onClick={() => openCreateMenuModal('')}
                >
                  <Plus size={15} />
                  <span>Add Top Menu</span>
                </button>
              ) : (
                <button
                  className="topbar-share-btn add-prod-header-btn"
                  onClick={openCreateProductModal}
                >
                  <Plus size={15} />
                  <span>Add Product</span>
                </button>
              )}
            </div>
          </header>

          {/* ============================================================
              3. CONTENT AREA FOR EACH DEDICATED ROUTE / TAB
             ============================================================ */}
          <div className="oripio-content-padding">

            {/* ----------------------------------------------------------
               TAB 1: /admin/dashboard (OVERVIEW)
               ---------------------------------------------------------- */}
            {activeNav === 'dashboard' && (
              <div>
                <div className="overview-header-row">
                  <div>
                    <h2 className="overview-title">E-Commerce Overview</h2>
                    <p className="overview-subtitle">Real-time status of your live catalog, menus, banners, and store configuration</p>
                  </div>

                  <div className="overview-actions-row">
                    <button
                      className="dropdown-pill-btn"
                      onClick={() => handleNavClick('catalog', '/admin/products')}
                      title="Manage Product Catalog"
                    >
                      <Tag size={14} color="#901010" />
                      <span>Products ({productsList.length})</span>
                    </button>

                    <button
                      className="dropdown-pill-btn"
                      onClick={() => handleNavClick('menu', '/admin/menus')}
                      title="Manage Website Menus"
                    >
                      <Compass size={14} color="#901010" />
                      <span>Menus ({totalTopMenus})</span>
                    </button>

                    <button
                      className="dropdown-pill-btn"
                      onClick={() => handleNavClick('banners', '/admin/banners')}
                      title="Manage Hero Banners"
                    >
                      <ImageIcon size={14} color="#901010" />
                      <span>Banners ({banners.length})</span>
                    </button>

                    <button
                      className="reset-data-btn"
                      onClick={handleResetData}
                      title="Reload data from database"
                    >
                      <RotateCcw size={14} />
                      <span>Reload</span>
                    </button>
                  </div>
                </div>

                {/* 4 Live Metric Cards */}
                <div className="row g-3 g-xl-4 mb-4">
                  {/* Card 1: Total Products */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="summary-card gold">
                      <div className="summary-card-top">
                        <div className="summary-icon-title-group">
                          <div className="summary-icon-box">
                            <Tag size={20} />
                          </div>
                          <div>
                            <h3 className="summary-title-text">Catalog Products</h3>
                            <p className="summary-subtitle-text">Total in database</p>
                          </div>
                        </div>
                      </div>
                      <div className="summary-amount-row">
                        <span className="summary-amount-val">{productsList.length}</span>
                        <span className="summary-pill-change">
                          {productsList.filter(p => p.status === 'active').length} Active
                        </span>
                      </div>
                      <div
                        className="summary-card-bottom"
                        onClick={() => handleNavClick('catalog', '/admin/products')}
                        role="button"
                        tabIndex={0}
                      >
                        <span>Manage Products</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Website Menus */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="summary-card purple">
                      <div className="summary-card-top">
                        <div className="summary-icon-title-group">
                          <div className="summary-icon-box purple">
                            <Compass size={20} />
                          </div>
                          <div>
                            <h3 className="summary-title-text">Website Menus</h3>
                            <p className="summary-subtitle-text">Header navigation</p>
                          </div>
                        </div>
                      </div>
                      <div className="summary-amount-row">
                        <span className="summary-amount-val">{totalTopMenus}</span>
                        <span className="summary-pill-change">
                          {totalSubmenus} Sub-items
                        </span>
                      </div>
                      <div
                        className="summary-card-bottom"
                        onClick={() => handleNavClick('menu', '/admin/menus')}
                        role="button"
                        tabIndex={0}
                      >
                        <span>Configure Menus</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Hero Banners */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="summary-card blue">
                      <div className="summary-card-top">
                        <div className="summary-icon-title-group">
                          <div className="summary-icon-box blue">
                            <ImageIcon size={20} />
                          </div>
                          <div>
                            <h3 className="summary-title-text">Hero Banners</h3>
                            <p className="summary-subtitle-text">Homepage slider</p>
                          </div>
                        </div>
                      </div>
                      <div className="summary-amount-row">
                        <span className="summary-amount-val">{banners.length}</span>
                        <span className="summary-pill-change">
                          {banners.filter(b => b.status === 'active').length} Active
                        </span>
                      </div>
                      <div
                        className="summary-card-bottom"
                        onClick={() => handleNavClick('banners', '/admin/banners')}
                        role="button"
                        tabIndex={0}
                      >
                        <span>Manage Banners</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Store Info & Status */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="summary-card green">
                      <div className="summary-card-top">
                        <div className="summary-icon-title-group">
                          <div className="summary-icon-box green">
                            <Settings size={20} />
                          </div>
                          <div>
                            <h3 className="summary-title-text">Store Settings</h3>
                            <p className="summary-subtitle-text">Live boutique config</p>
                          </div>
                        </div>
                      </div>
                      <div className="summary-amount-row">
                        <span className="summary-amount-val" style={{ fontSize: '1.25rem' }}>
                          {siteSettings.site_name ? 'Connected' : 'Active'}
                        </span>
                        <span className="summary-pill-change">Online</span>
                      </div>
                      <div
                        className="summary-card-bottom"
                        onClick={() => handleNavClick('settings', '/admin/settings')}
                        role="button"
                        tabIndex={0}
                      >
                        <span>Edit Settings</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Products Highlights & Quick Management Panel */}
                <div className="row g-3 g-xl-4 mb-4">
                  {/* Left: Recent Products from Database */}
                  <div className="col-12 col-lg-7">
                    <div className="oripio-panel-card">
                      <div className="panel-header-row">
                        <div>
                          <h3 className="panel-title">Catalog Highlights</h3>
                          <p className="panel-subtitle">Live products currently stored in your MySQL database</p>
                        </div>
                        <button
                          className="add-wallet-btn"
                          onClick={() => handleNavClick('catalog', '/admin/products')}
                        >
                          <span>View All ({productsList.length})</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>

                      <div className="top-products-list">
                        {productsList.slice(0, 5).map((prod) => (
                          <div key={prod.id} className="top-product-item">
                            <img
                              src={prod.image_url || prod.image}
                              alt={prod.title}
                              className="top-product-thumbnail"
                              onError={(e) => {
                                e.target.src = 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
                              }}
                            />
                            <div className="top-product-details">
                              <h4 className="top-product-title" title={prod.title}>{prod.title}</h4>
                              <span className="top-product-category">
                                {prod.category || 'Nightwear'} • £{parseFloat(prod.price || 0).toFixed(2)}
                              </span>
                            </div>
                            <div className="top-product-meta">
                              <span className="top-product-revenue">
                                Stock: {prod.stock || 0}
                              </span>
                              <span className={`product-stock-tag ${prod.status === 'active' ? 'ok' : 'low'}`}>
                                {prod.status === 'active' ? 'Active' : 'Draft'}
                              </span>
                            </div>
                          </div>
                        ))}
                        {productsList.length === 0 && (
                          <div style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>
                            {isLoadingProducts ? 'Loading products from database...' : 'No products found in database.'}
                          </div>
                        )}
                      </div>

                      <div className="panel-bottom-action">
                        <button
                          className="text-link-btn"
                          onClick={() => handleNavClick('catalog', '/admin/products')}
                        >
                          <span>Go to Product Catalog (/admin/products)</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Store Management & Quick Shortcuts */}
                  <div className="col-12 col-lg-5">
                    <div className="oripio-panel-card">
                      <div className="panel-header-row">
                        <div>
                          <h3 className="panel-title">Store Management</h3>
                          <p className="panel-subtitle">Direct shortcuts to live API modules</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                        <div
                          style={{
                            padding: '14px',
                            background: '#F9FAFB',
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                          }}
                          onClick={() => openCreateProductModal()}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FDF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#901010' }}>
                              <Plus size={18} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>Add New Product</div>
                              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Create product with image upload, sizes & stock</div>
                            </div>
                          </div>
                          <ArrowRight size={16} color="#9CA3AF" />
                        </div>

                        <div
                          style={{
                            padding: '14px',
                            background: '#F9FAFB',
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                          }}
                          onClick={() => openCreateMenuModal('')}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E40AF' }}>
                              <Compass size={18} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>Add Navigation Menu</div>
                              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Add header link or dropdown category</div>
                            </div>
                          </div>
                          <ArrowRight size={16} color="#9CA3AF" />
                        </div>

                        <div
                          style={{
                            padding: '14px',
                            background: '#F9FAFB',
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                          }}
                          onClick={() => openCreateBannerModal()}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6D28D9' }}>
                              <ImageIcon size={18} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>Upload Hero Banner</div>
                              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Upload slides, cta links & badges</div>
                            </div>
                          </div>
                          <ArrowRight size={16} color="#9CA3AF" />
                        </div>

                        <div
                          style={{
                            padding: '14px',
                            background: '#F9FAFB',
                            borderRadius: '10px',
                            border: '1px solid #E5E7EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleNavClick('settings', '/admin/settings')}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#047857' }}>
                              <Settings size={18} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>Store Configuration</div>
                              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Edit logo, address, email, phone & socials</div>
                            </div>
                          </div>
                          <ArrowRight size={16} color="#9CA3AF" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------
               TAB 2: /admin/products (DYNAMIC PRODUCTS CATALOG)
               ---------------------------------------------------------- */}
            {activeNav === 'catalog' && (() => {
              const activeSource = productsList;
              const filteredList = activeSource.filter((prod) => {
                if (productCategoryFilter !== 'All') {
                  const catLower = productCategoryFilter.toLowerCase();
                  const pCat = (prod.category || '').toLowerCase();
                  const pTitle = (prod.title || '').toLowerCase();
                  if (!pCat.includes(catLower) && !pTitle.includes(catLower)) return false;
                }
                if (productStockFilter === 'In Stock') {
                  if ((prod.stock !== undefined ? prod.stock : 25) <= 5) return false;
                } else if (productStockFilter === 'Low Stock') {
                  const s = prod.stock !== undefined ? prod.stock : 25;
                  if (s > 5 || s === 0) return false;
                } else if (productStockFilter === 'Out of Stock') {
                  const s = prod.stock !== undefined ? prod.stock : 25;
                  if (s > 0) return false;
                }
                if (productHomeFilter === 'Bestsellers') {
                  if (!prod.isBestseller && !prod.is_bestseller) return false;
                } else if (productHomeFilter === 'NewIn') {
                  if (!prod.isNew && !prod.is_new) return false;
                } else if (productHomeFilter === 'HomepageOnly') {
                  if (!prod.isBestseller && !prod.is_bestseller && !prod.isNew && !prod.is_new) return false;
                }
                if (productSearch.trim()) {
                  const q = productSearch.toLowerCase();
                  const matches =
                    (prod.title && prod.title.toLowerCase().includes(q)) ||
                    (prod.category && prod.category.toLowerCase().includes(q)) ||
                    (prod.handle && prod.handle.toLowerCase().includes(q)) ||
                    (prod.tag && prod.tag.toLowerCase().includes(q)) ||
                    String(prod.id).includes(q);
                  if (!matches) return false;
                }
                return true;
              });

              const totalCount = activeSource.length;
              const inStockCount = activeSource.filter(p => (p.stock !== undefined ? p.stock : 25) > 5).length;
              const lowStockCount = activeSource.filter(p => {
                const s = p.stock !== undefined ? p.stock : 25;
                return s <= 5 && s > 0;
              }).length;
              const totalInventoryVal = activeSource.reduce((acc, p) => acc + ((p.priceGBP || 45) * (p.stock !== undefined ? p.stock : 25)), 0);

              return (
                <div className="menu-manager-container">
                  {/* Top Title & Action Bar */}
                  <div className="overview-header-row mb-3">
                    <div>
                      <h2 className="overview-title">Products & Store Catalog</h2>
                      <p className="overview-subtitle">
                        Live MySQL database management for boutique pyjama sets, stock levels, and store pricing.
                      </p>
                    </div>

                    <div className="overview-actions-row">
                      <button
                        className="menu-action-btn primary"
                        onClick={openCreateProductModal}
                      >
                        <Plus size={15} />
                        <span>Add New Product</span>
                      </button>
                      <button
                        className="menu-action-btn secondary"
                        onClick={fetchProductsList}
                        title="Reload from MySQL"
                      >
                        <RefreshCw size={14} className={isLoadingProducts ? 'spin' : ''} />
                        <span>Sync</span>
                      </button>
                      <button
                        className="reset-data-btn"
                        onClick={handleResetCatalog}
                        title="Reset back to 50 boutique items"
                      >
                        <RotateCcw size={14} />
                        <span>Reset Catalog</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="row g-3 mb-4">
                    <div className="col-6 col-md-3">
                      <div className="summary-card white" style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: '600' }}>TOTAL PRODUCTS</span>
                          <Package size={16} color="#901010" />
                        </div>
                        <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#111827', marginTop: '4px' }}>
                          {totalCount}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>Live in database</span>
                      </div>
                    </div>

                    <div className="col-6 col-md-3">
                      <div className="summary-card white" style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: '600' }}>HEALTHY STOCK</span>
                          <CheckCircle2 size={16} color="#059669" />
                        </div>
                        <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#059669', marginTop: '4px' }}>
                          {inStockCount}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>&gt; 5 items in inventory</span>
                      </div>
                    </div>

                    <div className="col-6 col-md-3">
                      <div className="summary-card white" style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: '600' }}>LOW STOCK ALERT</span>
                          <Tag size={16} color="#D97706" />
                        </div>
                        <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#D97706', marginTop: '4px' }}>
                          {lowStockCount}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#D97706', fontWeight: '600' }}>Needs replenishment</span>
                      </div>
                    </div>

                    <div className="col-6 col-md-3">
                      <div className="summary-card white" style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: '600' }}>CATALOG INVENTORY VALUE</span>
                          <ShoppingBag size={16} color="#901010" />
                        </div>
                        <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#901010', marginTop: '4px' }}>
                          £{totalInventoryVal.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Estimated retail value</span>
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Toolbar */}
                  <div className="catalog-toolbar-row">
                    <div className="catalog-search-input-wrap">
                      <Search size={15} />
                      <input
                        type="text"
                        className="catalog-search-input"
                        placeholder="Search products by title, category, tag or SKU..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                      />
                      {productSearch && (
                        <button
                          type="button"
                          onClick={() => setProductSearch('')}
                          style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: 0 }}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div className="catalog-filter-group">
                      {/* Category Filter (Dynamic from Website Navigation) */}
                      <select
                        className="catalog-select"
                        value={productCategoryFilter}
                        onChange={(e) => setProductCategoryFilter(e.target.value)}
                      >
                        <option value="All">All Navigation Categories ({navigationCategories.length})</option>
                        {navigationCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>

                      {/* Homepage Placement Filter */}
                      <select
                        className="catalog-select"
                        value={productHomeFilter}
                        onChange={(e) => setProductHomeFilter(e.target.value)}
                        style={{ fontWeight: productHomeFilter !== 'All' ? 700 : 500 }}
                      >
                        <option value="All">All Homepage Placements</option>
                        <option value="HomepageOnly">🏠 Any Homepage Featured</option>
                        <option value="Bestsellers">⭐ Best Sellers Tab</option>
                        <option value="NewIn">✨ New In Tab</option>
                      </select>

                      {/* Stock Filter */}
                      <select
                        className="catalog-select"
                        value={productStockFilter}
                        onChange={(e) => setProductStockFilter(e.target.value)}
                      >
                        <option value="All">All Stock Levels</option>
                        <option value="In Stock">In Stock (&gt; 5)</option>
                        <option value="Low Stock">Low Stock (≤ 5)</option>
                        <option value="Out of Stock">Out of Stock (0)</option>
                      </select>

                      {/* View Mode Toggle */}
                      <div className="view-mode-toggle">
                        <button
                          type="button"
                          className={`view-mode-btn ${productViewMode === 'grid' ? 'active' : ''}`}
                          onClick={() => setProductViewMode('grid')}
                          title="Grid View"
                        >
                          <LayoutGrid size={14} />
                          <span>Grid</span>
                        </button>
                        <button
                          type="button"
                          className={`view-mode-btn ${productViewMode === 'table' ? 'active' : ''}`}
                          onClick={() => setProductViewMode('table')}
                          title="Table View"
                        >
                          <Menu size={14} />
                          <span>Table</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Empty state if no filtered items */}
                  {filteredList.length === 0 && (
                    <div className="summary-card white text-center py-5" style={{ borderRadius: '12px' }}>
                      <Package size={44} color="#D1D5DB" className="mx-auto mb-2" />
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#374151', margin: '0 0 6px' }}>No products match your search or filters</h4>
                      <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0 0 16px' }}>Try clearing filters or adding a new boutique item.</p>
                      <button
                        className="menu-action-btn secondary"
                        onClick={() => { setProductSearch(''); setProductCategoryFilter('All'); setProductStockFilter('All'); }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}

                  {/* GRID VIEW */}
                  {productViewMode === 'grid' && filteredList.length > 0 && (
                    <div className="row g-3 mb-4">
                      {filteredList.map((prod) => {
                        const stockVal = prod.stock !== undefined ? prod.stock : 25;
                        const stockClass = stockVal === 0 ? 'out' : stockVal <= 5 ? 'low' : 'ok';
                        const stockLabel = stockVal === 0 ? 'Out of Stock' : stockVal <= 5 ? `Low Stock (${stockVal})` : `${stockVal} in stock`;
                        const prodImg = prod.image || (prod.images && prod.images[0]) || 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';

                        return (
                          <div key={prod.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <div className="admin-prod-card">
                              <div className="admin-prod-img-wrap">
                                <img
                                  src={prodImg}
                                  alt={prod.title}
                                  className="admin-prod-img"
                                  onError={(e) => {
                                    e.target.src = 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
                                  }}
                                />
                                {prod.tag && (
                                  <span className="admin-prod-badge-tag">{prod.tag}</span>
                                )}
                                <span
                                  className={`admin-prod-status-dot ${prod.status === 'active' ? 'active' : 'inactive'}`}
                                  onClick={() => handleToggleProductStatus(prod)}
                                  title="Click to toggle Active / Inactive"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: prod.status === 'active' ? '#10B981' : '#9CA3AF' }} />
                                  {prod.status === 'active' ? 'Active' : 'Draft'}
                                </span>
                              </div>

                              <div className="admin-prod-body">
                                <span className="admin-prod-cat">{prod.category}</span>
                                <h4 className="admin-prod-title" title={prod.title}>
                                  {prod.title}
                                </h4>

                                <div className="admin-prod-meta-row">
                                  <div>
                                    <span className="admin-prod-price">
                                      {prod.price || `£${(prod.priceGBP || 45).toFixed(2)}`}
                                    </span>
                                    {prod.compareAtPriceGBP && (
                                      <span className="admin-prod-compare-price">
                                        £{prod.compareAtPriceGBP.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  <span className={`admin-prod-stock-pill ${stockClass}`}>
                                    {stockLabel}
                                  </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                  <span style={{ fontSize: '0.74rem', color: '#6B7280' }}>Quick stock adj:</span>
                                  <div className="admin-prod-stepper">
                                    <button
                                      type="button"
                                      className="admin-prod-step-btn"
                                      onClick={() => handleQuickStock(prod, -1)}
                                      title="Decrease stock by 1"
                                    >
                                      -
                                    </button>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                                      {stockVal}
                                    </span>
                                    <button
                                      type="button"
                                      className="admin-prod-step-btn"
                                      onClick={() => handleQuickStock(prod, 1)}
                                      title="Increase stock by 1"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                {/* Homepage placement quick toggles */}
                                <div style={{ display: 'flex', gap: '6px', margin: '8px 0 10px', flexWrap: 'wrap' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleBestseller(prod)}
                                    style={{
                                      fontSize: '0.68rem',
                                      fontWeight: 700,
                                      padding: '3px 8px',
                                      borderRadius: '6px',
                                      border: (prod.isBestseller || prod.is_bestseller) ? '1px solid #FCD34D' : '1px dashed #D1D5DB',
                                      backgroundColor: (prod.isBestseller || prod.is_bestseller) ? '#FEF3C7' : '#FFFFFF',
                                      color: (prod.isBestseller || prod.is_bestseller) ? '#B45309' : '#6B7280',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px'
                                    }}
                                    title="Click to toggle Homepage Best Sellers"
                                  >
                                    <span>{(prod.isBestseller || prod.is_bestseller) ? '★' : '☆'}</span>
                                    <span>Best Seller</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleNew(prod)}
                                    style={{
                                      fontSize: '0.68rem',
                                      fontWeight: 700,
                                      padding: '3px 8px',
                                      borderRadius: '6px',
                                      border: (prod.isNew || prod.is_new) ? '1px solid #A7F3D0' : '1px dashed #D1D5DB',
                                      backgroundColor: (prod.isNew || prod.is_new) ? '#ECFDF5' : '#FFFFFF',
                                      color: (prod.isNew || prod.is_new) ? '#047857' : '#6B7280',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px'
                                    }}
                                    title="Click to toggle Homepage New In"
                                  >
                                    <span>{(prod.isNew || prod.is_new) ? '✦' : '✧'}</span>
                                    <span>New In</span>
                                  </button>
                                </div>

                                <div className="admin-prod-footer">
                                  <a
                                    href={`/product/${prod.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="menu-row-btn"
                                    title="View product in storefront"
                                  >
                                    <ExternalLink size={13} />
                                    <span>Store</span>
                                  </a>

                                  <div className="admin-prod-actions">
                                    <button
                                      type="button"
                                      className="menu-row-btn"
                                      onClick={() => openEditProductModal(prod)}
                                      title="Edit product details"
                                    >
                                      <Pencil size={13} color="#2563EB" />
                                      <span>Edit</span>
                                    </button>
                                    <button
                                      type="button"
                                      className="menu-row-btn delete"
                                      onClick={() => setDeleteProductConfirm(prod)}
                                      title="Delete product from database"
                                    >
                                      <Trash2 size={13} color="#DC2626" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* TABLE VIEW */}
                  {productViewMode === 'table' && filteredList.length > 0 && (
                    <div className="summary-card white p-0 mb-4" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                      <div className="table-responsive">
                        <table className="menu-manager-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #ECEEF1' }}>
                              <th style={{ padding: '12px 16px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'left' }}>PRODUCT</th>
                              <th style={{ padding: '12px 14px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'left' }}>CATEGORY</th>
                              <th style={{ padding: '12px 14px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'left' }}>PRICE</th>
                              <th style={{ padding: '12px 14px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'left' }}>STOCK</th>
                              <th style={{ padding: '12px 14px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'left' }}>HOMEPAGE FEATURE</th>
                              <th style={{ padding: '12px 14px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'left' }}>TAG</th>
                              <th style={{ padding: '12px 14px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'left' }}>STATUS</th>
                              <th style={{ padding: '12px 16px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredList.map((prod) => {
                              const stockVal = prod.stock !== undefined ? prod.stock : 25;
                              const stockClass = stockVal === 0 ? 'out' : stockVal <= 5 ? 'low' : 'ok';
                              const prodImg = prod.image || (prod.images && prod.images[0]) || 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';

                              return (
                                <tr key={prod.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                  <td style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <img
                                        src={prodImg}
                                        alt={prod.title}
                                        style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '8px' }}
                                        onError={(e) => {
                                          e.target.src = 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
                                        }}
                                      />
                                      <div>
                                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111827', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                          {prod.title}
                                        </div>
                                        <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>ID: {prod.id}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#4B5563', fontWeight: 600 }}>
                                    {prod.category}
                                  </td>
                                  <td style={{ padding: '12px 14px', fontSize: '0.85rem', fontWeight: 800, color: '#901010' }}>
                                    {prod.price || `£${(prod.priceGBP || 45).toFixed(2)}`}
                                  </td>
                                  <td style={{ padding: '12px 14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span className={`admin-prod-stock-pill ${stockClass}`}>
                                        {stockVal} units
                                      </span>
                                      <div className="admin-prod-stepper">
                                        <button
                                          type="button"
                                          className="admin-prod-step-btn"
                                          onClick={() => handleQuickStock(prod, -1)}
                                        >
                                          -
                                        </button>
                                        <button
                                          type="button"
                                          className="admin-prod-step-btn"
                                          onClick={() => handleQuickStock(prod, 1)}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{ padding: '12px 14px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                      <button
                                        type="button"
                                        onClick={() => handleToggleBestseller(prod)}
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          fontSize: '0.68rem',
                                          fontWeight: 700,
                                          padding: '2px 8px',
                                          borderRadius: '6px',
                                          border: (prod.isBestseller || prod.is_bestseller) ? '1px solid #FCD34D' : '1px dashed #D1D5DB',
                                          backgroundColor: (prod.isBestseller || prod.is_bestseller) ? '#FEF3C7' : '#FFFFFF',
                                          color: (prod.isBestseller || prod.is_bestseller) ? '#B45309' : '#9CA3AF',
                                          cursor: 'pointer'
                                        }}
                                        title="Click to toggle Homepage Best Sellers"
                                      >
                                        <span>{(prod.isBestseller || prod.is_bestseller) ? '★' : '☆'}</span>
                                        <span>Best Seller</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleToggleNew(prod)}
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          fontSize: '0.68rem',
                                          fontWeight: 700,
                                          padding: '2px 8px',
                                          borderRadius: '6px',
                                          border: (prod.isNew || prod.is_new) ? '1px solid #A7F3D0' : '1px dashed #D1D5DB',
                                          backgroundColor: (prod.isNew || prod.is_new) ? '#ECFDF5' : '#FFFFFF',
                                          color: (prod.isNew || prod.is_new) ? '#047857' : '#9CA3AF',
                                          cursor: 'pointer'
                                        }}
                                        title="Click to toggle Homepage New In"
                                      >
                                        <span>{(prod.isNew || prod.is_new) ? '✦' : '✧'}</span>
                                        <span>New In</span>
                                      </button>
                                    </div>
                                  </td>
                                  <td style={{ padding: '12px 14px' }}>
                                    {prod.tag ? (
                                      <span style={{ fontSize: '0.68rem', fontWeight: 700, backgroundColor: '#FDF2F2', color: '#901010', padding: '3px 8px', borderRadius: '999px' }}>
                                        {prod.tag}
                                      </span>
                                    ) : (
                                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>—</span>
                                    )}
                                  </td>
                                  <td style={{ padding: '12px 14px' }}>
                                    <button
                                      type="button"
                                      className={`status-toggle-pill ${prod.status === 'active' ? 'active' : 'inactive'}`}
                                      onClick={() => handleToggleProductStatus(prod)}
                                      title="Toggle status"
                                    >
                                      <span className="status-dot" />
                                      <span>{prod.status === 'active' ? 'Active' : 'Draft'}</span>
                                    </button>
                                  </td>
                                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                                      <a
                                        href={`/product/${prod.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="menu-row-btn"
                                        title="View on store"
                                      >
                                        <ExternalLink size={13} />
                                      </a>
                                      <button
                                        type="button"
                                        className="menu-row-btn"
                                        onClick={() => openEditProductModal(prod)}
                                        title="Edit product"
                                      >
                                        <Pencil size={13} color="#2563EB" />
                                      </button>
                                      <button
                                        type="button"
                                        className="menu-row-btn delete"
                                        onClick={() => setDeleteProductConfirm(prod)}
                                        title="Delete product"
                                      >
                                        <Trash2 size={13} color="#DC2626" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ----------------------------------------------------------
               TAB 4: /admin/menus (DYNAMIC WEBSITE NAVIGATION)
               ---------------------------------------------------------- */}
            {activeNav === 'menu' && (
              <div className="menu-manager-container">
                <div className="overview-header-row mb-4">
                  <div>
                    <h2 className="overview-title">Website Navigation & Submenus</h2>
                    <p className="overview-subtitle">
                      Live MySQL database management for header menus, dropdown submenus, and promotional badges.
                    </p>
                  </div>

                  <div className="overview-actions-row">
                    <button
                      className="menu-action-btn primary"
                      onClick={() => openCreateMenuModal('')}
                    >
                      <Plus size={15} />
                      <span>Add Top Menu</span>
                    </button>

                    <button
                      className="menu-action-btn secondary"
                      onClick={() => openCreateMenuModal(menuTree[0]?.id || '')}
                    >
                      <FolderPlus size={15} />
                      <span>Add Submenu</span>
                    </button>

                    <button
                      className="menu-action-btn delete-all-btn"
                      onClick={handleClearAllMenus}
                      title="Remove all default menus from database"
                    >
                      <Trash2 size={14} />
                      <span>Clear All Menus</span>
                    </button>

                    <button
                      className="reset-data-btn"
                      onClick={fetchMenuData}
                      title="Sync from MySQL"
                    >
                      <RefreshCw size={14} className={isLoadingMenus ? 'rotating-icon' : ''} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-6 col-md-4">
                    <div className="menu-stat-card">
                      <span className="menu-stat-label">MAIN MENUS</span>
                      <div className="menu-stat-value">{totalTopMenus} Categories</div>
                      <span className="menu-stat-sub">Header bar items</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="menu-stat-card">
                      <span className="menu-stat-label">SUBMENUS</span>
                      <div className="menu-stat-value">{totalSubmenus} Links</div>
                      <span className="menu-stat-sub">Dropdown children</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="menu-stat-card">
                      <span className="menu-stat-label">ACTIVE STATUS</span>
                      <div className="menu-stat-value" style={{ color: '#16A34A' }}>
                        {totalActiveItems} Published
                      </div>
                      <span className="menu-stat-sub">Visible to customers</span>
                    </div>
                  </div>
                  {/* <div className="col-6 col-md-3">
                    <div className="menu-stat-card">
                      <span className="menu-stat-label">MYSQL DATABASE</span>
                      <div className="menu-stat-value" style={{ color: '#901010' }}>
                        ecomdb.website_menus
                      </div>
                      <span className="menu-stat-sub">Connected on Port 3306</span>
                    </div>
                  </div> */}
                </div>

                <div className="activities-table-card">
                  <div className="activities-header-row">
                    <div>
                      <h3 className="panel-title">Menu Structure Hierarchy</h3>
                      <p className="panel-subtitle">
                        Click the arrow to expand/collapse dropdown submenus. Reorder or toggle visibility instantly.
                      </p>
                    </div>

                    <div className="activities-table-tools">
                      <button
                        className="filter-pill-btn"
                        onClick={() => {
                          if (expandedMenuIds.size === menuTree.length) {
                            setExpandedMenuIds(new Set());
                          } else {
                            setExpandedMenuIds(new Set(menuTree.map(m => m.id)));
                          }
                        }}
                      >
                        <Layers size={13} />
                        <span>{expandedMenuIds.size === menuTree.length ? 'Collapse All' : 'Expand All'}</span>
                      </button>
                    </div>
                  </div>

                  {isLoadingMenus && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                      <RefreshCw size={24} className="rotating-icon" />
                      <p style={{ marginTop: '10px' }}>Loading website menus from MySQL database...</p>
                    </div>
                  )}

                  {!isLoadingMenus && menuTree.length > 0 && (
                    <div className="table-responsive-box">
                      <table className="oripio-table menu-hierarchy-table">
                        <thead>
                          <tr>
                            <th style={{ width: '45px' }}></th>
                            <th>Menu / Submenu Title</th>
                            <th>Destination URL</th>
                            <th>Badge</th>
                            <th>Status</th>
                            <th>Order</th>
                            <th>Submenus</th>
                            <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {menuTree.map((menu) => {
                            const isExpanded = expandedMenuIds.has(menu.id);
                            const hasSubmenus = menu.submenus && menu.submenus.length > 0;

                            return (
                              <React.Fragment key={menu.id}>
                                <tr className="top-menu-row">
                                  <td>
                                    {hasSubmenus ? (
                                      <button
                                        className="tree-chevron-btn"
                                        onClick={() => toggleExpandMenu(menu.id)}
                                        title={isExpanded ? 'Collapse submenus' : 'Expand submenus'}
                                      >
                                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                      </button>
                                    ) : (
                                      <span className="tree-leaf-dot" />
                                    )}
                                  </td>
                                  <td>
                                    <div className="menu-title-cell">
                                      <span className="menu-id-badge">#{menu.id}</span>
                                      <strong className="menu-title-name">{menu.title}</strong>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="menu-url-cell">
                                      <Link2 size={13} color="#9CA3AF" />
                                      <code>{menu.url}</code>
                                    </div>
                                  </td>
                                  <td>
                                    {menu.badge ? (
                                      <span className="menu-badge-tag">{menu.badge}</span>
                                    ) : (
                                      <span className="empty-dash">—</span>
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      className={`status-toggle-pill ${menu.status === 'active' ? 'active' : 'inactive'}`}
                                      onClick={() => handleToggleMenuStatus(menu.id)}
                                      title="Click to toggle visibility"
                                    >
                                      <span className="status-dot" />
                                      <span>{menu.status === 'active' ? 'Active' : 'Inactive'}</span>
                                    </button>
                                  </td>
                                  <td>
                                    <span className="order-index-badge">{menu.order_index}</span>
                                  </td>
                                  <td>
                                    <span className={`submenus-count-pill ${hasSubmenus ? 'has-items' : 'empty'}`}>
                                      {hasSubmenus ? `${menu.submenus.length} Submenus` : 'No Submenus'}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    <div className="menu-actions-group">
                                      <button
                                        className="menu-row-btn add-sub"
                                        onClick={() => openCreateMenuModal(menu.id)}
                                        title={`Add submenu under "${menu.title}"`}
                                      >
                                        <Plus size={13} />
                                        <span>Submenu</span>
                                      </button>
                                      <button
                                        className="menu-row-btn edit"
                                        onClick={() => openEditMenuModal(menu)}
                                        title="Edit this menu"
                                      >
                                        <Pencil size={13} />
                                      </button>
                                      <button
                                        className="menu-row-btn delete"
                                        onClick={() => handleDeleteMenu(menu.id, menu.title)}
                                        title="Delete this menu"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                {isExpanded && hasSubmenus && menu.submenus.map((sub) => (
                                  <tr key={sub.id} className="submenu-row">
                                    <td></td>
                                    <td>
                                      <div className="submenu-title-cell">
                                        <CornerDownRight size={14} className="submenu-connector-icon" />
                                        <span className="submenu-id-badge">#{sub.id}</span>
                                        <span className="submenu-title-name">{sub.title}</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="menu-url-cell submenu-url">
                                        <Link2 size={12} color="#9CA3AF" />
                                        <code>{sub.url}</code>
                                      </div>
                                    </td>
                                    <td>
                                      {sub.badge ? (
                                        <span className="menu-badge-tag sub">{sub.badge}</span>
                                      ) : (
                                        <span className="empty-dash">—</span>
                                      )}
                                    </td>
                                    <td>
                                      <button
                                        className={`status-toggle-pill ${sub.status === 'active' ? 'active' : 'inactive'}`}
                                        onClick={() => handleToggleMenuStatus(sub.id)}
                                        title="Click to toggle visibility"
                                      >
                                        <span className="status-dot" />
                                        <span>{sub.status === 'active' ? 'Active' : 'Inactive'}</span>
                                      </button>
                                    </td>
                                    <td>
                                      <span className="order-index-badge">{sub.order_index}</span>
                                    </td>
                                    <td>
                                      <span className="submenu-parent-tag">↳ {menu.title}</span>
                                    </td>
                                    <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                                      <div className="menu-actions-group">
                                        <button
                                          className="menu-row-btn edit"
                                          onClick={() => openEditMenuModal(sub)}
                                          title="Edit this submenu"
                                        >
                                          <Pencil size={13} />
                                        </button>
                                        <button
                                          className="menu-row-btn delete"
                                          onClick={() => handleDeleteMenu(sub.id, sub.title)}
                                          title="Delete this submenu"
                                        >
                                          <Trash2 size={13} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------
               TAB 4: /admin/settings (STORE SETTINGS)
               ---------------------------------------------------------- */}
            {activeNav === 'settings' && (
              <div className="menu-manager-container">
                <form onSubmit={handleSaveSettings}>
                  <div className="overview-header-row mb-4">
                    <div>
                      <h2 className="overview-title">Website Settings & Store Configuration</h2>
                      <p className="overview-subtitle">
                        Manage your live boutique address, logo, email, phone number, and social media handles stored dynamically in MySQL.
                      </p>
                    </div>
                    <div className="overview-actions-row">
                      <button
                        type="button"
                        className="reset-data-btn"
                        onClick={fetchSiteSettings}
                        title="Reload from MySQL"
                      >
                        <RefreshCw size={13} />
                        <span>Sync</span>
                      </button>
                      <button
                        type="submit"
                        className="menu-action-btn primary"
                        disabled={isSavingSettings}
                      >
                        <Check size={14} />
                        <span>{isSavingSettings ? 'Saving...' : 'Save Settings'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="row g-4">
                    {/* SECTION 1: Brand & Logo */}
                    <div className="col-12 col-lg-6">
                      <div className="summary-card white p-4 h-100">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Globe size={18} color="#901010" />
                          <h4 style={{ fontSize: '0.98rem', fontWeight: '700', margin: 0 }}>Brand & Logo Identity</h4>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#6B7280', marginBottom: '16px' }}>
                          Control the branding, title, and logo that appear across your customer storefront.
                        </p>

                        <div className="oripio-form-group">
                          <label className="oripio-form-label">Store Brand Name <span style={{ color: '#E11D48' }}>*</span></label>
                          <input
                            type="text"
                            className="oripio-form-input"
                            value={siteSettings.site_name || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, site_name: e.target.value })}
                            placeholder="e.g. Their Nibs London"
                            required
                          />
                        </div>

                        <div className="oripio-form-group">
                          <label className="oripio-form-label">Brand Tagline</label>
                          <input
                            type="text"
                            className="oripio-form-input"
                            value={siteSettings.site_tagline || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, site_tagline: e.target.value })}
                            placeholder="e.g. Luxury Pyjamas, Nightwear & Loungewear"
                          />
                        </div>

                        {/* Website Logo with Upload Option */}
                        <div className="oripio-form-group">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <label className="oripio-form-label mb-0">Website Logo</label>
                            <label
                              className="btn btn-sm"
                              style={{
                                backgroundColor: '#FDF2F2',
                                color: '#901010',
                                border: '1px solid rgba(186, 108, 90, 0.3)',
                                borderRadius: '6px',
                                padding: '3px 10px',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                margin: 0
                              }}
                            >
                              <Upload size={13} />
                              <span>{isUploadingLogo ? 'Uploading...' : 'Upload Logo'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleFileUpload(e.target.files[0], 'logo');
                                  }
                                }}
                                disabled={isUploadingLogo}
                              />
                            </label>
                          </div>
                          <input
                            type="url"
                            className="oripio-form-input"
                            value={siteSettings.logo_url || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, logo_url: e.target.value })}
                            placeholder="https://... or click 'Upload Logo'"
                          />
                        </div>

                        {/* Live Logo Preview Box */}
                        {siteSettings.logo_url && (
                          <div className="mb-3 p-3" style={{ background: '#FAF7F5', borderRadius: '8px', border: '1px dashed #E0D6CE' }}>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#901010', textTransform: 'uppercase' }}>
                                Logo Preview:
                              </span>
                              <span style={{ fontSize: '0.7rem', color: '#888' }}>
                                Live storefront preview
                              </span>
                            </div>
                            <div style={{ background: '#FFFFFF', padding: '12px 18px', borderRadius: '6px', display: 'inline-block', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                              <img
                                src={siteSettings.logo_url}
                                alt="Store Logo Preview"
                                style={{ maxHeight: '36px', width: 'auto', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Favicon with Upload Option */}
                        <div className="oripio-form-group">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <label className="oripio-form-label mb-0">Website Favicon</label>
                            <label
                              className="btn btn-sm"
                              style={{
                                backgroundColor: '#FDF2F2',
                                color: '#901010',
                                border: '1px solid rgba(186, 108, 90, 0.3)',
                                borderRadius: '6px',
                                padding: '3px 10px',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                margin: 0
                              }}
                            >
                              <Upload size={13} />
                              <span>{isUploadingFavicon ? 'Uploading...' : 'Upload Favicon'}</span>
                              <input
                                type="file"
                                accept="image/*,.ico"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleFileUpload(e.target.files[0], 'favicon');
                                  }
                                }}
                                disabled={isUploadingFavicon}
                              />
                            </label>
                          </div>
                          <input
                            type="url"
                            className="oripio-form-input"
                            value={siteSettings.favicon_url || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, favicon_url: e.target.value })}
                            placeholder="https://... or click 'Upload Favicon'"
                          />
                        </div>

                        {/* Live Favicon Preview */}
                        {siteSettings.favicon_url && (
                          <div className="mb-3 p-3" style={{ background: '#FAF7F5', borderRadius: '8px', border: '1px dashed #E0D6CE' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#901010', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                              Browser Tab Preview:
                            </span>
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#FFFFFF',
                              padding: '6px 14px',
                              borderRadius: '6px 6px 0 0',
                              border: '1px solid #E5E7EB',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                              fontSize: '0.78rem',
                              fontWeight: 500,
                              color: '#374151'
                            }}>
                              <img
                                src={siteSettings.favicon_url}
                                alt="Favicon Preview"
                                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <span>{siteSettings.site_name || 'Their Nibs London'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>


                    {/* SECTION 2: Contact Details */}
                    <div className="col-12 col-lg-6">
                      <div className="summary-card white p-4 h-100">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Phone size={18} color="#901010" />
                          <h4 style={{ fontSize: '0.98rem', fontWeight: '700', margin: 0 }}>Contact & Customer Care</h4>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#6B7280', marginBottom: '16px' }}>
                          Official contact details displayed to customers on the footer and help pages.
                        </p>

                        <div className="oripio-form-group">
                          <label className="oripio-form-label">Customer Support Email <span style={{ color: '#E11D48' }}>*</span></label>
                          <input
                            type="email"
                            className="oripio-form-input"
                            value={siteSettings.email || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                            placeholder="support@theirnibs.com"
                            required
                          />
                        </div>

                        <div className="oripio-form-group">
                          <label className="oripio-form-label">Customer Service Phone</label>
                          <input
                            type="text"
                            className="oripio-form-input"
                            value={siteSettings.phone || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                            placeholder="+44 (0) 20 8123 4567"
                          />
                        </div>

                        <div className="oripio-form-group">
                          <label className="oripio-form-label">WhatsApp Helpline (Optional)</label>
                          <input
                            type="text"
                            className="oripio-form-input"
                            value={siteSettings.whatsapp || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                            placeholder="+44 7123 456789"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Physical Address */}
                    <div className="col-12 col-lg-6">
                      <div className="summary-card white p-4 h-100">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <MapPin size={18} color="#901010" />
                          <h4 style={{ fontSize: '0.98rem', fontWeight: '700', margin: 0 }}>Store & Business Address</h4>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#6B7280', marginBottom: '16px' }}>
                          Physical corporate or boutique headquarters location.
                        </p>

                        <div className="oripio-form-group">
                          <label className="oripio-form-label">Full Street Address</label>
                          <textarea
                            rows={3}
                            className="oripio-form-input"
                            value={siteSettings.address || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                            placeholder="e.g. Studio 14, The Light Box, 111 Power Road, London"
                            style={{ resize: 'vertical' }}
                          />
                        </div>

                        <div className="row g-2">
                          <div className="col-4">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">City</label>
                              <input
                                type="text"
                                className="oripio-form-input"
                                value={siteSettings.city || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, city: e.target.value })}
                                placeholder="London"
                              />
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">Postal / Zip</label>
                              <input
                                type="text"
                                className="oripio-form-input"
                                value={siteSettings.postal_code || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, postal_code: e.target.value })}
                                placeholder="W4 5PY"
                              />
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">Country</label>
                              <input
                                type="text"
                                className="oripio-form-input"
                                value={siteSettings.country || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, country: e.target.value })}
                                placeholder="United Kingdom"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: Social Media Handles */}
                    <div className="col-12 col-lg-6">
                      <div className="summary-card white p-4 h-100">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Share2 size={18} color="#901010" />
                          <h4 style={{ fontSize: '0.98rem', fontWeight: '700', margin: 0 }}>Social Media Handles</h4>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#6B7280', marginBottom: '16px' }}>
                          Connect your storefront social icons directly to your official social profiles.
                        </p>

                        <div className="row g-2">
                          <div className="col-12 col-sm-6">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">Instagram Profile URL</label>
                              <input
                                type="url"
                                className="oripio-form-input"
                                value={siteSettings.instagram || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, instagram: e.target.value })}
                                placeholder="https://instagram.com/theirnibs"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">Facebook Page URL</label>
                              <input
                                type="url"
                                className="oripio-form-input"
                                value={siteSettings.facebook || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, facebook: e.target.value })}
                                placeholder="https://facebook.com/theirnibs"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">Twitter / X URL</label>
                              <input
                                type="url"
                                className="oripio-form-input"
                                value={siteSettings.twitter || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, twitter: e.target.value })}
                                placeholder="https://twitter.com/theirnibs"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">Pinterest URL</label>
                              <input
                                type="url"
                                className="oripio-form-input"
                                value={siteSettings.pinterest || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, pinterest: e.target.value })}
                                placeholder="https://pinterest.com/theirnibs"
                              />
                            </div>
                          </div>

                          {/* <div className="col-12 col-sm-6">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">TikTok URL</label>
                              <input
                                type="url"
                                className="oripio-form-input"
                                value={siteSettings.tiktok || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, tiktok: e.target.value })}
                                placeholder="https://tiktok.com/@theirnibs"
                              />
                            </div>
                          </div> */}

                          <div className="col-12 col-sm-6">
                            <div className="oripio-form-group">
                              <label className="oripio-form-label">YouTube URL</label>
                              <input
                                type="url"
                                className="oripio-form-input"
                                value={siteSettings.youtube || ''}
                                onChange={(e) => setSiteSettings({ ...siteSettings, youtube: e.target.value })}
                                placeholder="https://youtube.com/@theirnibs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: Copyright & Footer */}
                    <div className="col-12">
                      <div className="summary-card white p-4">
                        <h4 style={{ fontSize: '0.98rem', fontWeight: '700', marginBottom: '14px' }}>Footer Notice & Legal</h4>
                        <div className="oripio-form-group">
                          <label className="oripio-form-label">Copyright Text</label>
                          <input
                            type="text"
                            className="oripio-form-input"
                            value={siteSettings.copyright_text || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, copyright_text: e.target.value })}
                            placeholder="© 2026 Their Nibs London. All Rights Reserved."
                          />
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                          <button
                            type="submit"
                            className="menu-action-btn primary"
                            disabled={isSavingSettings}
                            style={{ padding: '10px 24px', fontSize: '0.92rem' }}
                          >
                            <Check size={16} />
                            <span>{isSavingSettings ? 'Saving Settings...' : 'Save All Settings'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* ============================================================
                TAB 10: HERO BANNERS & SLIDERS MANAGEMENT (MYSQL)
               ============================================================ */}
            {activeNav === 'banners' && (
              <div className="admin-fade-in">
                {/* Header Row */}
                <div className="overview-header-row mb-4">
                  <div>
                    <h2 className="overview-title">Hero Banners & Sliders</h2>
                    <p className="overview-subtitle">
                      Control high-impact homepage sliders, imagery, headings, call-to-action buttons, badges, and ordering.
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                      onClick={fetchBanners}
                      disabled={isLoadingBanners}
                      style={{ borderRadius: '8px', padding: '8px 14px', fontSize: '0.84rem' }}
                    >
                      <RefreshCw size={14} className={isLoadingBanners ? 'spin-animation' : ''} />
                      <span>{isLoadingBanners ? 'Refreshing...' : 'Refresh'}</span>
                    </button>
                    <button
                      type="button"
                      className="menu-action-btn primary"
                      onClick={openCreateBannerModal}
                      style={{ padding: '8px 16px', fontSize: '0.86rem' }}
                    >
                      <Plus size={16} />
                      <span>Add New Hero Banner</span>
                    </button>
                  </div>
                </div>

                {/* Banner Stats Cards */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-sm-4">
                    <div className="summary-card white p-3 d-flex align-items-center justify-content-between">
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Total Banners</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1F2937' }}>{banners.length}</div>
                      </div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FDF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={20} color="#901010" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="summary-card white p-3 d-flex align-items-center justify-content-between">
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Active On Storefront</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#059669' }}>
                          {banners.filter(b => b.status === 'active').length}
                        </div>
                      </div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={20} color="#059669" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="summary-card white p-3 d-flex align-items-center justify-content-between">
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Storefront Preview</div>
                        <a href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.84rem', fontWeight: 600, color: '#901010', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span>View Live Slides</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Eye size={20} color="#4B5563" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banners List / Grid */}
                {banners.length === 0 ? (
                  <div className="summary-card white p-5 text-center">
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FDF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <ImageIcon size={32} color="#901010" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', marginBottom: '8px' }}>No Hero Banners Found</h3>
                    <p style={{ fontSize: '0.88rem', color: '#6B7280', maxWidth: '420px', margin: '0 auto 20px' }}>
                      Add your first hero banner slide to showcase seasonal collections, sales campaigns, or collaborations on your homepage.
                    </p>
                    <button
                      type="button"
                      className="menu-action-btn primary"
                      onClick={openCreateBannerModal}
                      style={{ padding: '9px 20px' }}
                    >
                      <Plus size={16} />
                      <span>Create First Hero Banner</span>
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {banners.map((banner, index) => (
                      <div
                        key={banner.id}
                        className="summary-card white p-3 p-md-4"
                        style={{
                          transition: 'all 0.2s ease',
                          border: banner.status === 'active' ? '1px solid #E5E7EB' : '1px dashed #D1D5DB',
                          opacity: banner.status === 'active' ? 1 : 0.75
                        }}
                      >
                        <div className="row g-3 align-items-center">
                          {/* Order Index & Reorder Controls */}
                          <div className="col-auto d-flex flex-column align-items-center justify-content-center">
                            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#9CA3AF', marginBottom: '4px' }}>
                              #{banner.order_index || (index + 1)}
                            </span>
                            <div className="d-flex flex-column gap-1">
                              <button
                                type="button"
                                className="btn btn-sm btn-light p-1"
                                onClick={() => handleMoveBanner(index, 'up')}
                                disabled={index === 0}
                                title="Move Up in Slider"
                                style={{ borderRadius: '4px', lineHeight: 1 }}
                              >
                                <ArrowUp size={13} color="#4B5563" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-light p-1"
                                onClick={() => handleMoveBanner(index, 'down')}
                                disabled={index === banners.length - 1}
                                title="Move Down in Slider"
                                style={{ borderRadius: '4px', lineHeight: 1 }}
                              >
                                <ArrowDown size={13} color="#4B5563" />
                              </button>
                            </div>
                          </div>

                          {/* Banner Thumbnail Preview */}
                          <div className="col-12 col-md-3">
                            <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB' }}>
                              <img
                                src={banner.image_url}
                                alt={banner.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80';
                                }}
                              />
                              {banner.badge && (
                                <span style={{
                                  position: 'absolute',
                                  top: '8px',
                                  left: '8px',
                                  backgroundColor: 'rgba(255,255,255,0.92)',
                                  color: '#1F2937',
                                  fontSize: '0.66rem',
                                  fontWeight: 700,
                                  letterSpacing: '0.08em',
                                  padding: '2px 8px',
                                  borderRadius: '999px',
                                  textTransform: 'uppercase',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                                }}>
                                  {banner.badge}
                                </span>
                              )}
                              <span style={{
                                position: 'absolute',
                                bottom: '6px',
                                right: '6px',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: '#FFFFFF',
                                fontSize: '0.65rem',
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                Slide {index + 1}
                              </span>
                            </div>
                          </div>

                          {/* Banner Details */}
                          <div className="col-12 col-md-5">
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#1F2937' }}>
                                {banner.title}
                              </h4>
                              <span className={`badge ${banner.status === 'active' ? 'bg-success' : 'bg-secondary'}`} style={{ fontSize: '0.68rem', fontWeight: 600 }}>
                                {banner.status === 'active' ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                              {banner.subtitle || 'No subtitle provided'}
                            </p>
                            <div className="d-flex align-items-center gap-3" style={{ fontSize: '0.78rem' }}>
                              <span style={{ color: '#4B5563', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontWeight: 600 }}>CTA:</span>
                                <span style={{ backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, color: '#901010' }}>
                                  {banner.cta_text || 'SHOP NOW'}
                                </span>
                              </span>
                              <span style={{ color: '#9CA3AF' }}>•</span>
                              <span style={{ color: '#6B7280', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                                Link: <code>{banner.cta_link || '/collections'}</code>
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="col-12 col-md-3 ms-auto text-md-end d-flex align-items-center justify-content-md-end gap-2">
                            <button
                              type="button"
                              className={`btn btn-sm ${banner.status === 'active' ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                              onClick={() => handleToggleBannerStatus(banner)}
                              style={{ fontSize: '0.78rem', borderRadius: '6px' }}
                            >
                              {banner.status === 'active' ? 'Set Inactive' : 'Activate'}
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openEditBannerModal(banner)}
                              style={{ fontSize: '0.78rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Pencil size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteBanner(banner.id, banner.title)}
                              style={{ fontSize: '0.78rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

      {/* ============================================================
          4. MODALS
         ============================================================ */}

      {/* A. ADD / EDIT MENU & SUBMENU MODAL */}
      {isMenuModalOpen && (
        <div className="oripio-modal-backdrop" onClick={() => setIsMenuModalOpen(false)}>
          <div className="oripio-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <div>
                <h3 className="oripio-modal-title">
                  {editingMenuItem ? 'Edit Menu Item' : (menuForm.parent_id ? 'Add New Submenu' : 'Add Top-Level Menu')}
                </h3>
                <span className="order-modal-date">Stored directly in MySQL `website_menus` table</span>
              </div>
              <button className="oripio-modal-close" onClick={() => setIsMenuModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMenu}>
              <div className="oripio-modal-body">
                <div className="oripio-form-group">
                  <label className="oripio-form-label">
                    Menu Title <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="oripio-form-input"
                    placeholder="e.g. Womens, Long Pyjama Sets, Autumn Prints"
                    value={menuForm.title}
                    onChange={(e) => setMenuForm({ ...menuForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="oripio-form-group">
                  <label className="oripio-form-label">Parent Menu</label>
                  <select
                    className="oripio-form-input"
                    value={menuForm.parent_id}
                    onChange={(e) => setMenuForm({ ...menuForm, parent_id: e.target.value })}
                  >
                    <option value="">-- None (Top-Level Main Menu) --</option>
                    {menuParents.map((p) => {
                      if (editingMenuItem && editingMenuItem.id === p.id) return null;
                      return (
                        <option key={p.id} value={p.id}>
                          Submenu under: {p.title} (#{p.id})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="oripio-form-group">
                  <label className="oripio-form-label">Destination URL</label>
                  <input
                    type="text"
                    className="oripio-form-input"
                    placeholder="e.g. /collections/womens, /collections/new-in?cat=sets"
                    value={menuForm.url}
                    onChange={(e) => setMenuForm({ ...menuForm, url: e.target.value })}
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Promo Badge (Optional)</label>
                      <input
                        type="text"
                        className="oripio-form-input"
                        placeholder="e.g. NEW, SALE, HOT"
                        value={menuForm.badge}
                        onChange={(e) => setMenuForm({ ...menuForm, badge: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Display Order</label>
                      <input
                        type="number"
                        className="oripio-form-input"
                        placeholder="1"
                        value={menuForm.order_index}
                        onChange={(e) => setMenuForm({ ...menuForm, order_index: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="oripio-form-group">
                  <label className="oripio-form-label">Visibility Status</label>
                  <select
                    className="oripio-form-input"
                    value={menuForm.status}
                    onChange={(e) => setMenuForm({ ...menuForm, status: e.target.value })}
                  >
                    <option value="active">Active (Visible on website)</option>
                    <option value="inactive">Inactive (Hidden draft)</option>
                  </select>
                </div>
              </div>

              <div className="oripio-modal-footer">
                <button type="button" className="oripio-btn-secondary" onClick={() => setIsMenuModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="oripio-btn-primary">
                  {editingMenuItem ? 'Update Menu Item' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}




      {/* E. MERCHANT SUPPORT MODAL */}
      {isHelpModalOpen && (
        <div className="oripio-modal-backdrop" onClick={() => setIsHelpModalOpen(false)}>
          <div className="oripio-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <h3 className="oripio-modal-title">Merchant Support & Help Desk</h3>
              <button className="oripio-modal-close" onClick={() => setIsHelpModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="oripio-modal-body">
              <p style={{ fontSize: '0.84rem', color: '#4B5563', lineHeight: '1.5' }}>
                Need assistance with inventory synchronization, Royal Mail tracking integrations, or discount code management? Our technical e-commerce team is here to assist.
              </p>
              <div className="merchant-support-box">
                <p className="merchant-support-title">Their Nibs Merchant Ops:</p>
                <p className="merchant-support-item">📧 Email: merchant-support@theirnibs.com</p>
                <p className="merchant-support-item">☎ Store Ops Desk: +44 (0) 20 7946 0991</p>
                <p className="merchant-support-item">🕒 Hours: Mon-Fri, 9:00 AM - 6:00 PM GMT</p>
              </div>
            </div>
            <div className="oripio-modal-footer">
              <button className="oripio-btn-primary" onClick={() => setIsHelpModalOpen(false)}>
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO BANNER ADD / EDIT MODAL */}
      {isBannerModalOpen && (
        <div className="oripio-modal-backdrop" onClick={() => setIsBannerModalOpen(false)}>
          <div className="oripio-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <div>
                <h3 className="oripio-modal-title">
                  {editingBanner ? 'Edit Hero Banner' : 'Create New Hero Banner'}
                </h3>
                <p className="oripio-modal-desc">
                  Set slider banner content, high-resolution imagery, button actions, and promotional badge.
                </p>
              </div>
              <button className="oripio-modal-close" onClick={() => setIsBannerModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveBanner}>
              <div className="oripio-modal-body">
                {/* Banner Title */}
                <div className="oripio-form-group">
                  <label className="oripio-form-label">
                    Banner Main Title <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="oripio-form-input"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    placeholder="e.g. Women's Pyjama Sets"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div className="oripio-form-group">
                  <label className="oripio-form-label">Subtitle / Description</label>
                  <textarea
                    rows={2}
                    className="oripio-form-input"
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    placeholder="e.g. Effortless lightweight cotton & elegant hand-painted floral prints"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Banner Image with Upload & Preview */}
                <div className="oripio-form-group">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <label className="oripio-form-label mb-0">
                      Banner Image URL <span style={{ color: '#E11D48' }}>*</span>
                    </label>
                    <label
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#FDF2F2',
                        color: '#901010',
                        border: '1px solid rgba(186, 108, 90, 0.3)',
                        borderRadius: '6px',
                        padding: '3px 10px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        margin: 0
                      }}
                    >
                      <Upload size={13} />
                      <span>{isUploadingBannerImg ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleUploadBannerImageFile(e.target.files[0]);
                          }
                        }}
                        disabled={isUploadingBannerImg}
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    className="oripio-form-input"
                    value={bannerForm.image_url}
                    onChange={(e) => setBannerForm({ ...bannerForm, image_url: e.target.value })}
                    placeholder="https://... or click 'Upload Image'"
                    required
                  />
                </div>

                {/* Live Banner Preview in Modal */}
                {bannerForm.image_url && (
                  <div className="mb-3" style={{ position: 'relative', height: '140px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#1E2328' }}>
                    <img
                      src={bannerForm.image_url}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 20px', color: '#FFFFFF' }}>
                      {bannerForm.badge && (
                        <span style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.95)', color: '#1F2937', fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase', width: 'fit-content', marginBottom: '6px' }}>
                          {bannerForm.badge}
                        </span>
                      )}
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px', color: '#FFFFFF' }}>
                        {bannerForm.title || 'Banner Title Preview'}
                      </h4>
                      <p style={{ fontSize: '0.75rem', opacity: 0.88, margin: '0 0 10px', maxWidth: '380px' }}>
                        {bannerForm.subtitle || 'Banner subtitle preview text'}
                      </p>
                      <div>
                        <span style={{ display: 'inline-block', backgroundColor: '#FFFFFF', color: '#1E2328', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', letterSpacing: '0.06em' }}>
                          {bannerForm.cta_text || 'SHOP NOW'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button Text & Link */}
                <div className="row g-2">
                  <div className="col-12 col-sm-6">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">CTA Button Text</label>
                      <input
                        type="text"
                        className="oripio-form-input"
                        value={bannerForm.cta_text}
                        onChange={(e) => setBannerForm({ ...bannerForm, cta_text: e.target.value })}
                        placeholder="e.g. SHOP NOW"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">CTA Link URL</label>
                      <input
                        type="text"
                        className="oripio-form-input"
                        value={bannerForm.cta_link}
                        onChange={(e) => setBannerForm({ ...bannerForm, cta_link: e.target.value })}
                        placeholder="e.g. /collections or #featured-products"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge, Order Index, Status */}
                <div className="row g-2">
                  <div className="col-12 col-sm-4">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Badge (Optional)</label>
                      <input
                        type="text"
                        className="oripio-form-input"
                        value={bannerForm.badge}
                        onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                        placeholder="e.g. NEW IN"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-sm-4">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Display Order</label>
                      <input
                        type="number"
                        min="1"
                        className="oripio-form-input"
                        value={bannerForm.order_index}
                        onChange={(e) => setBannerForm({ ...bannerForm, order_index: parseInt(e.target.value, 10) || 1 })}
                      />
                    </div>
                  </div>
                  <div className="col-6 col-sm-4">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Status</label>
                      <select
                        className="oripio-form-input"
                        value={bannerForm.status}
                        onChange={(e) => setBannerForm({ ...bannerForm, status: e.target.value })}
                      >
                        <option value="active">Active (Visible)</option>
                        <option value="inactive">Inactive (Hidden)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="oripio-modal-footer">
                <button
                  type="button"
                  className="oripio-btn-secondary"
                  onClick={() => setIsBannerModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="menu-action-btn primary"
                  style={{ padding: '8px 20px' }}
                >
                  <Check size={16} />
                  <span>{editingBanner ? 'Update Banner' : 'Create Banner'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DYNAMIC PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="oripio-modal-backdrop" onClick={() => setIsProductModalOpen(false)}>
          <div className="oripio-modal-box" style={{ maxWidth: '680px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <div>
                <h3 className="oripio-modal-title">
                  {editingProduct ? 'Edit Boutique Product' : 'Add New Product to Catalog'}
                </h3>
                <p className="oripio-modal-desc">
                  Live MySQL synchronization for prices, inventory levels, photography, and store visibility.
                </p>
              </div>
              <button className="oripio-modal-close" onClick={() => setIsProductModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div className="oripio-modal-body" style={{ overflowY: 'auto', flex: 1, padding: '20px 24px' }}>
                {/* Title */}
                <div className="oripio-form-group">
                  <label className="oripio-form-label">
                    Product Title <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="oripio-form-input"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    placeholder="e.g. Womens Silky Satin Long Pyjama Set In Blush Peach"
                    required
                  />
                </div>

                {/* Category & Tag */}
                <div className="row g-2">
                  <div className="col-12 col-sm-6">
                    <div className="oripio-form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label className="oripio-form-label" style={{ margin: 0 }}>
                          Category <span style={{ color: '#E11D48' }}>*</span>
                        </label>
                        <span style={{ fontSize: '0.68rem', color: '#901010', fontWeight: 600 }}>
                          Navigation Menus
                        </span>
                      </div>
                      <select
                        className="oripio-form-input"
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        required
                      >
                        {navigationCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.isParent ? `📁 ${cat.label}` : `    ↳ ${cat.label}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Promotional Tag (Badge)</label>
                      <input
                        type="text"
                        className="oripio-form-input"
                        value={productForm.tag}
                        onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                        placeholder="e.g. BESTSELLER, NEW IN, EXCLUSIVE"
                      />
                    </div>
                  </div>
                </div>

                {/* Price, Compare Price, Stock */}
                <div className="row g-2">
                  <div className="col-12 col-sm-4">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">
                        Retail Price (£ GBP) <span style={{ color: '#E11D48' }}>*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="oripio-form-input"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        placeholder="48.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-6 col-sm-4">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Compare Price (£)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="oripio-form-input"
                        value={productForm.compare_at_price}
                        onChange={(e) => setProductForm({ ...productForm, compare_at_price: e.target.value })}
                        placeholder="e.g. 58.00"
                      />
                    </div>
                  </div>

                  <div className="col-6 col-sm-4">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Inventory Stock Units</label>
                      <input
                        type="number"
                        min="0"
                        className="oripio-form-input"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value, 10) || 0 })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Product Image Section */}
                <div className="oripio-form-group">
                  <label className="oripio-form-label">
                    Product Image <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="url"
                      className="oripio-form-input"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                      placeholder="Paste image URL (https://...)"
                      required
                    />
                    
                    <label
                      className="menu-action-btn secondary"
                      style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      title="Upload photo from computer"
                    >
                      <Upload size={14} />
                      <span>{isUploadingProductImg ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleUploadProductPhoto(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Image Preview Box */}
                  {productForm.image_url && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #ECEEF1' }}>
                      <img
                        src={productForm.image_url}
                        alt="Preview"
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#374151', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                          {productForm.image_url}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600 }}>Ready for store display</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Available Sizes */}
                <div className="oripio-form-group">
                  <label className="oripio-form-label">Available Sizes</label>
                  <p style={{ fontSize: '0.72rem', color: '#6B7280', margin: '0 0 6px' }}>Click to select/unselect sizes for this product:</p>
                  <div className="size-chips-wrap">
                    {['XS (UK 8)', 'S (UK 10)', 'M (UK 12)', 'L (UK 14)', 'XL (UK 16)', 'XXL (UK 18)', '3XL', 'One Size'].map((sz) => {
                      const isSelected = productForm.sizes && productForm.sizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          className={`size-chip-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            const cur = productForm.sizes || [];
                            const next = isSelected ? cur.filter(s => s !== sz) : [...cur, sz];
                            setProductForm({ ...productForm, sizes: next });
                          }}
                        >
                          {isSelected && <Check size={12} style={{ display: 'inline', marginRight: 4 }} />}
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="oripio-form-group">
                  <label className="oripio-form-label">Product Description</label>
                  <textarea
                    rows={3}
                    className="oripio-form-input"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Whimsical and wonderfully nostalgic print inspired by British botanical art..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Homepage Showcase & Visibility */}
                <div style={{ backgroundColor: '#F9FAFB', padding: '14px 16px', borderRadius: '10px', border: '1px solid #E5E7EB', marginBottom: '8px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🏠 Homepage Placement & Visibility</span>
                  </div>
                  <div className="row g-2 align-items-center">
                    <div className="col-12 col-sm-4">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
                        <input
                          type="checkbox"
                          checked={productForm.is_bestseller}
                          onChange={(e) => setProductForm({ ...productForm, is_bestseller: e.target.checked })}
                        />
                        <span>⭐ Show in "Best Sellers"</span>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
                        <input
                          type="checkbox"
                          checked={productForm.is_new}
                          onChange={(e) => setProductForm({ ...productForm, is_new: e.target.checked })}
                        />
                        <span>✨ Show in "New In"</span>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <select
                        className="oripio-form-input"
                        style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                        value={productForm.status}
                        onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                      >
                        <option value="active">Active (Visible)</option>
                        <option value="inactive">Inactive (Draft / Hidden)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="oripio-modal-footer">
                <button
                  type="button"
                  className="oripio-btn-secondary"
                  onClick={() => setIsProductModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="menu-action-btn primary"
                  style={{ padding: '8px 22px' }}
                >
                  <Check size={16} />
                  <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE PRODUCT CONFIRMATION MODAL */}
      {deleteProductConfirm && (
        <div className="oripio-modal-backdrop" onClick={() => setDeleteProductConfirm(null)}>
          <div className="oripio-modal-box" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <h3 className="oripio-modal-title" style={{ color: '#DC2626' }}>
                Delete Product?
              </h3>
              <button className="oripio-modal-close" onClick={() => setDeleteProductConfirm(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="oripio-modal-body">
              <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: '1.5', margin: '0 0 12px' }}>
                Are you sure you want to permanently delete <strong>"{deleteProductConfirm.title}"</strong> (ID: {deleteProductConfirm.id}) from the MySQL database?
              </p>
              <p style={{ fontSize: '0.76rem', color: '#6B7280', margin: 0 }}>
                This action cannot be undone and will remove the item from all collections and storefront listings.
              </p>
            </div>
            <div className="oripio-modal-footer">
              <button
                type="button"
                className="oripio-btn-secondary"
                onClick={() => setDeleteProductConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="menu-action-btn delete"
                style={{ backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                onClick={handleDeleteProduct}
              >
                <Trash2 size={15} />
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div className="oripio-toast">
          <CheckCircle2 size={18} color="#4ADE80" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
