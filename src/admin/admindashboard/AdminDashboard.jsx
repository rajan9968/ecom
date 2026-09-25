import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ECOM_OVERVIEW_CARDS,
  TOP_SELLING_PRODUCTS,
  REVENUE_CHART_DATA,
  INITIAL_ORDERS,
  DATE_FILTER_OPTIONS,
  CATEGORY_BREAKDOWN,
  INITIAL_CUSTOMERS,
  INITIAL_DISCOUNTS
} from './adminData.js';
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

export function AdminDashboard({ activeTab = 'dashboard', onExit, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current active nav from prop or current pathname
  const getCurrentTab = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/admin/orders')) return 'orders';
    if (path.includes('/admin/products') || path.includes('/admin/catalog')) return 'catalog';
    if (path.includes('/admin/menus') || path.includes('/admin/navigation')) return 'menu';
    if (path.includes('/admin/banners')) return 'banners';
    if (path.includes('/admin/customers')) return 'customers';
    if (path.includes('/admin/analytics')) return 'analytics';
    if (path.includes('/admin/discounts')) return 'discounts';
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

  // Date range dropdown
  const [selectedDateRange, setSelectedDateRange] = useState(DATE_FILTER_OPTIONS[0]);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Sales Revenue Chart toggle: monthly or weekly
  const [chartMode, setChartMode] = useState('monthly');
  const [activeBarIndex, setActiveBarIndex] = useState(6); // July (peak month) highlighted by default

  // Products state & Add Product modal
  const [products, setProducts] = useState(TOP_SELLING_PRODUCTS);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Womens Pyjamas');
  const [newProdPrice, setNewProdPrice] = useState('48.00');
  const [newProdStock, setNewProdStock] = useState('25');
  const [newProdImage, setNewProdImage] = useState('https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg');

  // Customer Orders state & filters
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState(new Set());

  // Customers & Discounts state
  const [customersList, setCustomersList] = useState(INITIAL_CUSTOMERS);
  const [discountsList, setDiscountsList] = useState(INITIAL_DISCOUNTS);

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
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
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
      const res = await fetch('http://localhost:5001/api/settings');
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
      const res = await fetch('http://localhost:5001/api/settings', {
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

      const res = await fetch('http://localhost:5001/api/settings/upload', {
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
      const res = await fetch('http://localhost:5001/api/menu?all=true');
      const json = await res.json();
      if (json.success && json.data) {
        setMenuTree(json.data);
        const pIds = new Set(json.data.map(m => m.id));
        setExpandedMenuIds(pIds);
      }

      const resAll = await fetch('http://localhost:5001/api/menu/all');
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
      const res = await fetch('http://localhost:5001/api/banners');
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

  useEffect(() => {
    fetchMenuData();
    fetchSiteSettings();
    fetchBanners();
  }, []);

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
      ? `http://localhost:5001/api/banners/${editingBanner.id}`
      : 'http://localhost:5001/api/banners';
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
      const res = await fetch(`http://localhost:5001/api/banners/${id}`, { method: 'DELETE' });
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
      const res = await fetch(`http://localhost:5001/api/banners/${banner.id}`, {
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

      const res = await fetch('http://localhost:5001/api/banners/upload', {
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
      await fetch('http://localhost:5001/api/banners/reorder', {
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
      ? `http://localhost:5001/api/menu/${editingMenuItem.id}`
      : 'http://localhost:5001/api/menu';
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
      const res = await fetch(`http://localhost:5001/api/menu/${id}`, { method: 'DELETE' });
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
      const res = await fetch('http://localhost:5001/api/menu/clear', { method: 'DELETE' });
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
      const res = await fetch(`http://localhost:5001/api/menu/${id}/toggle`, { method: 'PATCH' });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || 'Status toggled successfully');
        fetchMenuData();
      }
    } catch (err) {
      showToast('Error toggling menu status');
    }
  };

  // Handle adding new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdTitle.trim()) {
      showToast('Please enter a product title');
      return;
    }

    const priceNum = parseFloat(newProdPrice) || 45.0;
    const stockNum = parseInt(newProdStock, 10) || 10;

    const newProd = {
      id: `prod-${Date.now()}`,
      title: newProdTitle,
      category: newProdCategory,
      price: `£${priceNum.toFixed(2)}`,
      unitsSold: 0,
      revenue: '£0.00',
      stockStatus: stockNum <= 5 ? 'Low Stock' : 'In Stock',
      stockCount: stockNum,
      image: newProdImage || 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg'
    };

    setProducts([newProd, ...products]);
    setIsAddProductOpen(false);
    setNewProdTitle('');
    showToast(`Added "${newProdTitle}" to store catalog!`);
  };

  // Handle Order Status Update
  const handleUpdateOrderStatus = (orderId, newFulfillment) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, fulfillmentStatus: newFulfillment } : ord
      )
    );
    if (selectedOrderModal && selectedOrderModal.id === orderId) {
      setSelectedOrderModal((prev) => ({ ...prev, fulfillmentStatus: newFulfillment }));
    }
    showToast(`Order ${orderId} marked as ${newFulfillment}!`);
  };

  // Handle Reset Data
  const handleResetData = () => {
    setProducts(TOP_SELLING_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setSelectedOrderIds(new Set());
    setChartMode('monthly');
    setActiveBarIndex(6);
    setSelectedDateRange(DATE_FILTER_OPTIONS[0]);
    setOrderSearch('');
    setStatusFilter('All');
    fetchMenuData();
    showToast('Dashboard numbers refreshed');
  };

  // Filter orders
  const filteredOrders = orders.filter((ord) => {
    const matchesFilter =
      statusFilter === 'All'
        ? true
        : ord.paymentStatus === statusFilter || ord.fulfillmentStatus === statusFilter;

    const searchLower = orderSearch.toLowerCase();
    const matchesSearch =
      ord.id.toLowerCase().includes(searchLower) ||
      ord.customer.toLowerCase().includes(searchLower) ||
      ord.email.toLowerCase().includes(searchLower) ||
      ord.itemSummary.toLowerCase().includes(searchLower) ||
      ord.location.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  // Table row checkboxes
  const handleSelectAllRows = (e) => {
    if (e.target.checked) {
      setSelectedOrderIds(new Set(filteredOrders.map((o) => o.id)));
    } else {
      setSelectedOrderIds(new Set());
    }
  };

  const handleToggleRow = (id) => {
    const next = new Set(selectedOrderIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedOrderIds(next);
  };

  const isAllSelected = filteredOrders.length > 0 && selectedOrderIds.size === filteredOrders.length;

  // Active chart dataset
  const currentBars = REVENUE_CHART_DATA[chartMode];

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
      case 'orders': return 'Customer Orders';
      case 'catalog': return 'Products & Catalog';
      case 'menu': return 'Website Navigation Menus';
      case 'customers': return 'Customers';
      case 'analytics': return 'Sales Analytics';
      case 'discounts': return 'Discounts & Promo Codes';
      case 'settings': return 'Store Settings';
      case 'banners': return 'Hero Banners & Sliders';
      default: return 'Sales Overview';
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
                placeholder="Search..."
                className="sidebar-search-input"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                aria-label="Global Admin Search"
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

              {/* Route: /admin/orders */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('orders', '/admin/orders')}
                  className={`sidebar-nav-link ${activeNav === 'orders' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <Package size={18} />
                    <span>Orders</span>
                  </div>
                  <span className="sidebar-nav-count">1.4k</span>
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
                </button>
              </li>

              {/* Route: /admin/customers */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('customers', '/admin/customers')}
                  className={`sidebar-nav-link ${activeNav === 'customers' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <Users size={18} />
                    <span>Customers</span>
                  </div>
                </button>
              </li>

              {/* Route: /admin/analytics */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('analytics', '/admin/analytics')}
                  className={`sidebar-nav-link ${activeNav === 'analytics' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <BarChart2 size={18} />
                    <span>Sales Analytics</span>
                  </div>
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

              {/* Route: /admin/discounts */}
              <li className="sidebar-nav-item">
                <button
                  onClick={() => handleNavClick('discounts', '/admin/discounts')}
                  className={`sidebar-nav-link ${activeNav === 'discounts' ? 'active' : ''}`}
                >
                  <div className="sidebar-link-content">
                    <Percent size={18} />
                    <span>Discounts & Promos</span>
                  </div>
                  <span className="sidebar-nav-count">3</span>
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
            <p className="upgrade-card-desc">28 customers are currently browsing pyjama collections</p>
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
                      onClick={() => { setIsProfileMenuOpen(false); handleNavClick('orders', '/admin/orders'); }}
                    >
                      <Package size={14} />
                      <span>Manage Orders</span>
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
                  onClick={() => setIsAddProductOpen(true)}
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
                    <p className="overview-subtitle">Real-time sales, order volume, and fulfillment metrics</p>
                  </div>

                  <div className="overview-actions-row">
                    <button
                      className="dropdown-pill-btn"
                      onClick={() => handleNavClick('menu', '/admin/menus')}
                      title="Manage Website Menus"
                    >
                      <Compass size={14} color="#BA6C5A" />
                      <span>Website Menus</span>
                    </button>

                    <div className="oripio-dropdown-wrapper">
                      <button
                        className="dropdown-pill-btn"
                        onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                        aria-label="Select Date Range"
                      >
                        <span>{selectedDateRange}</span>
                        <ChevronDown size={14} color="#6B7280" />
                      </button>

                      {isDateDropdownOpen && (
                        <div className="oripio-dropdown-menu">
                          {DATE_FILTER_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              className={`oripio-dropdown-item ${selectedDateRange === opt ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedDateRange(opt);
                                setIsDateDropdownOpen(false);
                                showToast(`Filtered report for: ${opt}`);
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      className="reset-data-btn"
                      onClick={handleResetData}
                      title="Refresh store metrics"
                    >
                      <RotateCcw size={14} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="row g-3 g-xl-4 mb-4">
                  {ECOM_OVERVIEW_CARDS.map((card) => (
                    <div key={card.id} className="col-12 col-md-6 col-lg-4">
                      <div className={`summary-card ${card.theme}`}>
                        <div className="summary-card-top">
                          <div className="summary-icon-title-group">
                            <div className={`summary-icon-box ${card.id === 'orders' ? 'purple' : card.id === 'aov' ? 'blue' : ''}`}>
                              {card.id === 'revenue' && <ShoppingBag size={20} />}
                              {card.id === 'orders' && <Package size={20} />}
                              {card.id === 'aov' && <TrendingUp size={20} />}
                            </div>
                            <div>
                              <h3 className="summary-title-text">{card.title}</h3>
                              <p className="summary-subtitle-text">{card.subtitle}</p>
                            </div>
                          </div>

                          <button
                            className="summary-more-btn"
                            onClick={() => handleNavClick(card.id === 'orders' ? 'orders' : 'analytics', card.id === 'orders' ? '/admin/orders' : '/admin/analytics')}
                            aria-label={`Options for ${card.title}`}
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>

                        <div className="summary-amount-row">
                          <span className="summary-amount-val">{card.amount}</span>
                          <span className="summary-pill-change">{card.change}</span>
                        </div>

                        <div
                          className="summary-card-bottom"
                          onClick={() => handleNavClick(card.id === 'orders' ? 'orders' : 'analytics', card.id === 'orders' ? '/admin/orders' : '/admin/analytics')}
                          role="button"
                          tabIndex={0}
                        >
                          <span>{card.actionText}</span>
                          <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top Products & Sales Chart */}
                <div className="row g-3 g-xl-4 mb-4">
                  <div className="col-12 col-lg-5">
                    <div className="oripio-panel-card">
                      <div className="panel-header-row">
                        <div>
                          <h3 className="panel-title">Top Selling Products</h3>
                          <p className="panel-subtitle">Best performing pyjamas by revenue</p>
                        </div>
                        <button
                          className="add-wallet-btn"
                          onClick={() => handleNavClick('catalog', '/admin/products')}
                        >
                          <span>View All</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>

                      <div className="top-products-list">
                        {products.slice(0, 4).map((prod) => (
                          <div key={prod.id} className="top-product-item">
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="top-product-thumbnail"
                              onError={(e) => {
                                e.target.src = 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
                              }}
                            />
                            <div className="top-product-details">
                              <h4 className="top-product-title" title={prod.title}>{prod.title}</h4>
                              <span className="top-product-category">{prod.category} • {prod.price}</span>
                            </div>
                            <div className="top-product-meta">
                              <span className="top-product-revenue">{prod.revenue}</span>
                              <span className={`product-stock-tag ${prod.stockStatus === 'Low Stock' ? 'low' : 'ok'}`}>
                                {prod.stockStatus === 'Low Stock' ? `Only ${prod.stockCount} left` : `${prod.unitsSold} sold`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="panel-bottom-action">
                        <button
                          className="text-link-btn"
                          onClick={() => handleNavClick('catalog', '/admin/products')}
                        >
                          <span>Go to Product Catalog Route (/admin/products)</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-7">
                    <div className="oripio-panel-card">
                      <div className="panel-header-row">
                        <div>
                          <h3 className="panel-title">Store Sales & Revenue</h3>
                          <p className="panel-subtitle">Gross merchandise volume across channels</p>
                        </div>

                        <div className="cashflow-toggle-group">
                          <button
                            className={`cf-toggle-btn ${chartMode === 'monthly' ? 'active' : ''}`}
                            onClick={() => { setChartMode('monthly'); setActiveBarIndex(6); }}
                          >
                            Monthly
                          </button>
                          <button
                            className={`cf-toggle-btn ${chartMode === 'weekly' ? 'active' : ''}`}
                            onClick={() => { setChartMode('weekly'); setActiveBarIndex(3); }}
                          >
                            Weekly
                          </button>
                        </div>
                      </div>

                      <div className="cashflow-val-row">
                        <div>
                          <div className="cashflow-big-val">
                            {chartMode === 'monthly' ? '£48,620.50' : '£11,870.50'}
                          </div>
                          <div className="ecom-orders-count-label">
                            <CheckCircle2 size={13} color="#16A34A" />
                            <span>{chartMode === 'monthly' ? '1,428 orders fulfilled' : '384 orders fulfilled'}</span>
                          </div>
                        </div>
                        <button
                          className="category-breakdown-btn"
                          onClick={() => handleNavClick('analytics', '/admin/analytics')}
                        >
                          <BarChart2 size={14} />
                          <span>Detailed Analytics</span>
                        </button>
                      </div>

                      <div className="cf-chart-canvas">
                        <div className="cf-y-labels">
                          <span>£50k</span>
                          <span>£40k</span>
                          <span>£30k</span>
                          <span>£20k</span>
                          <span>£10k</span>
                          <span>£0</span>
                        </div>

                        <div className="cf-bars-track">
                          {currentBars.map((item, idx) => {
                            const isHighlighted = idx === activeBarIndex;
                            const barHeightPercentage = `${(item.value / 55) * 100}%`;

                            return (
                              <div
                                key={item.label}
                                className="cf-bar-col"
                                onClick={() => setActiveBarIndex(idx)}
                              >
                                {isHighlighted && (
                                  <div className="cf-tooltip-black">
                                    <div className="cf-tooltip-date">{item.date || 'Current Period'}</div>
                                    <div className="cf-tooltip-row">
                                      <span>Sales</span>
                                      <strong>{item.amount}</strong>
                                    </div>
                                    <div className="cf-tooltip-row">
                                      <span>Volume</span>
                                      <span className="cf-tooltip-inflow">{item.inflow}</span>
                                    </div>
                                  </div>
                                )}

                                <div
                                  className={`cf-bar-shape ${isHighlighted ? 'highlight' : ''}`}
                                  style={{ height: barHeightPercentage }}
                                >
                                  {isHighlighted && <div className="cf-highlight-dot" />}
                                </div>

                                <span className="cf-bar-name">{item.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------
               TAB 2: /admin/orders (ORDERS MANAGEMENT)
               ---------------------------------------------------------- */}
            {(activeNav === 'orders' || activeNav === 'dashboard') && (
              <div className="row mb-4" id="recent-orders-section">
                <div className="col-12">
                  <div className="activities-table-card">
                    <div className="activities-header-row">
                      <div>
                        <h3 className="panel-title">
                          {activeNav === 'orders' ? 'Customer Orders Management' : 'Recent Customer Orders'}
                        </h3>
                        <p className="panel-subtitle">Live orders received from UK and international shoppers</p>
                      </div>

                      <div className="activities-table-tools">
                        <div className="activities-search-box">
                          <Search size={14} color="#9CA3AF" />
                          <input
                            type="text"
                            placeholder="Search customer, order #..."
                            className="activities-search-input"
                            value={orderSearch}
                            onChange={(e) => setOrderSearch(e.target.value)}
                          />
                        </div>

                        <div className="oripio-dropdown-wrapper">
                          <button
                            className="filter-pill-btn"
                            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                          >
                            <Filter size={13} />
                            <span>Status: {statusFilter}</span>
                          </button>

                          {isFilterDropdownOpen && (
                            <div className="oripio-dropdown-menu">
                              {['All', 'Paid', 'Pending', 'Shipped', 'Processing', 'Delivered'].map((st) => (
                                <button
                                  key={st}
                                  className={`oripio-dropdown-item ${statusFilter === st ? 'active' : ''}`}
                                  onClick={() => {
                                    setStatusFilter(st);
                                    setIsFilterDropdownOpen(false);
                                  }}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive-box">
                      <table className="oripio-table">
                        <thead>
                          <tr>
                            <th style={{ width: '40px' }}>
                              <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAllRows}
                                aria-label="Select all orders"
                              />
                            </th>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Purchased Items</th>
                            <th>Date & Time</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Fulfillment</th>
                            <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: '#9CA3AF' }}>
                                No orders found matching your search or status filter.
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map((ord) => {
                              const isChecked = selectedOrderIds.has(ord.id);
                              return (
                                <tr key={ord.id} className={isChecked ? 'row-selected' : ''}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleRow(ord.id)}
                                      aria-label={`Select order ${ord.id}`}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="order-id-link"
                                      onClick={() => setSelectedOrderModal(ord)}
                                    >
                                      #{ord.id}
                                    </button>
                                  </td>
                                  <td>
                                    <div className="order-customer-cell">
                                      <div
                                        className="customer-avatar-initials"
                                        style={{ backgroundColor: ord.avatarBg }}
                                      >
                                        {ord.customer.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="customer-name">{ord.customer}</div>
                                        <div className="customer-meta">{ord.location}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="order-items-summary" title={ord.itemSummary}>
                                      {ord.itemSummary}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="order-date-text">{ord.date}</div>
                                    <div className="order-time-text">{ord.time}</div>
                                  </td>
                                  <td>
                                    <span className="order-amount-text">{ord.amount}</span>
                                  </td>
                                  <td>
                                    <span className={`payment-pill ${ord.paymentStatus.toLowerCase()}`}>
                                      {ord.paymentStatus}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={`fulfillment-pill ${ord.fulfillmentStatus.toLowerCase()}`}>
                                      {ord.fulfillmentStatus}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                    <button
                                      className="order-view-btn"
                                      onClick={() => setSelectedOrderModal(ord)}
                                      title="View Order Details & Invoice"
                                    >
                                      <Eye size={15} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------
               TAB 3: /admin/products (PRODUCTS CATALOG)
               ---------------------------------------------------------- */}
            {activeNav === 'catalog' && (
              <div className="menu-manager-container">
                <div className="overview-header-row mb-4">
                  <div>
                    <h2 className="overview-title">Products & Store Catalog</h2>
                    <p className="overview-subtitle">Manage boutique pyjama sets, stock levels, and inventory</p>
                  </div>

                  <div className="overview-actions-row">
                    <button
                      className="menu-action-btn primary"
                      onClick={() => setIsAddProductOpen(true)}
                    >
                      <Plus size={15} />
                      <span>Add New Product</span>
                    </button>
                    <button
                      className="reset-data-btn"
                      onClick={() => setProducts(TOP_SELLING_PRODUCTS)}
                    >
                      <RotateCcw size={14} />
                      <span>Reset Catalog</span>
                    </button>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  {products.map((prod) => (
                    <div key={prod.id} className="col-12 col-md-6 col-lg-3">
                      <div className="summary-card white" style={{ height: '100%', padding: '16px' }}>
                        <img
                          src={prod.image}
                          alt={prod.title}
                          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '12px' }}
                          onError={(e) => {
                            e.target.src = 'https://www.theirnibs.com/cdn/shop/files/Their_Nibs_X_Sophie_Ellis-Bextor_Oversize_Long_Pyjama_Set.jpg';
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '600' }}>{prod.category}</span>
                          <span className={`product-stock-tag ${prod.stockStatus === 'Low Stock' ? 'low' : 'ok'}`}>
                            {prod.stockStatus === 'Low Stock' ? `Only ${prod.stockCount} Left` : `${prod.stockCount} In Stock`}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#111827', margin: '0 0 8px', lineHeight: '1.3' }}>
                          {prod.title}
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #F3F4F6' }}>
                          <strong style={{ fontSize: '1.1rem', color: '#BA6C5A' }}>{prod.price}</strong>
                          <span style={{ fontSize: '0.76rem', color: '#4B5563' }}>{prod.unitsSold} units sold</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                      <div className="menu-stat-value" style={{ color: '#BA6C5A' }}>
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
               TAB 5: /admin/customers (CUSTOMERS DIRECTORY)
               ---------------------------------------------------------- */}
            {activeNav === 'customers' && (
              <div className="menu-manager-container">
                <div className="overview-header-row mb-4">
                  <div>
                    <h2 className="overview-title">Registered Customers & Shoppers</h2>
                    <p className="overview-subtitle">Manage customer profiles, order history, and VIP status</p>
                  </div>
                  <button
                    className="menu-action-btn primary"
                    onClick={() => showToast('Customer export prepared')}
                  >
                    <Download size={14} />
                    <span>Export Shoppers</span>
                  </button>
                </div>

                <div className="activities-table-card">
                  <div className="table-responsive-box">
                    <table className="oripio-table">
                      <thead>
                        <tr>
                          <th>Customer ID</th>
                          <th>Shopper Name</th>
                          <th>Location</th>
                          <th>Joined</th>
                          <th>Orders Placed</th>
                          <th>Lifetime Value</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customersList.map((cust) => (
                          <tr key={cust.id}>
                            <td><code>#{cust.id}</code></td>
                            <td>
                              <div className="order-customer-cell">
                                <div className="customer-avatar-initials" style={{ backgroundColor: cust.avatarBg }}>
                                  {cust.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="customer-name">{cust.name}</div>
                                  <div className="customer-meta">{cust.email}</div>
                                </div>
                              </div>
                            </td>
                            <td>{cust.location}</td>
                            <td>{cust.joinedDate}</td>
                            <td><strong>{cust.ordersCount} Orders</strong></td>
                            <td><strong style={{ color: '#BA6C5A' }}>{cust.totalSpent}</strong></td>
                            <td>
                              <span className="product-stock-tag ok">{cust.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------
               TAB 6: /admin/analytics (SALES ANALYTICS)
               ---------------------------------------------------------- */}
            {activeNav === 'analytics' && (
              <div className="menu-manager-container">
                <div className="overview-header-row mb-4">
                  <div>
                    <h2 className="overview-title">Sales Analytics & Category Reports</h2>
                    <p className="overview-subtitle">Merchandise sales volume, revenue breakdown, and growth factors</p>
                  </div>
                  <button
                    className="menu-action-btn primary"
                    onClick={() => setIsCategoryModalOpen(true)}
                  >
                    <Download size={14} />
                    <span>Download Full Report</span>
                  </button>
                </div>

                <div className="row g-3 g-xl-4 mb-4">
                  <div className="col-12 col-lg-7">
                    <div className="oripio-panel-card">
                      <h3 className="panel-title">Revenue Trajectory</h3>
                      <p className="panel-subtitle">Monthly breakdown comparison</p>

                      <div className="cf-chart-canvas mt-3">
                        <div className="cf-bars-track">
                          {currentBars.map((item, idx) => (
                            <div key={item.label} className="cf-bar-col" onClick={() => setActiveBarIndex(idx)}>
                              <div
                                className={`cf-bar-shape ${idx === activeBarIndex ? 'highlight' : ''}`}
                                style={{ height: `${(item.value / 55) * 100}%` }}
                              />
                              <span className="cf-bar-name">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-5">
                    <div className="oripio-panel-card">
                      <h3 className="panel-title">Category Revenue Distribution</h3>
                      <p className="panel-subtitle">Performance by pyjama departments</p>

                      <div className="category-breakdown-list mt-3">
                        {CATEGORY_BREAKDOWN.map((cat) => (
                          <div key={cat.name} className="category-stat-row">
                            <div className="category-stat-header">
                              <span className="category-stat-name">{cat.name}</span>
                              <span className="category-stat-amount">{cat.revenue} ({cat.percentage}%)</span>
                            </div>
                            <div className="category-progress-track">
                              <div className="category-progress-fill" style={{ width: `${cat.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------
               TAB 7: /admin/discounts (PROMOTIONS & VOUCHERS)
               ---------------------------------------------------------- */}
            {activeNav === 'discounts' && (
              <div className="menu-manager-container">
                <div className="overview-header-row mb-4">
                  <div>
                    <h2 className="overview-title">Discounts & Promo Codes</h2>
                    <p className="overview-subtitle">Manage coupon codes, percentage discounts, and marketing campaigns</p>
                  </div>
                  <button
                    className="menu-action-btn primary"
                    onClick={() => showToast('Created promo code: AUTUMN25')}
                  >
                    <Plus size={14} />
                    <span>Create Discount Code</span>
                  </button>
                </div>

                <div className="activities-table-card">
                  <div className="table-responsive-box">
                    <table className="oripio-table">
                      <thead>
                        <tr>
                          <th>Promo Code</th>
                          <th>Discount Value</th>
                          <th>Type</th>
                          <th>Applies To</th>
                          <th>Total Redemptions</th>
                          <th>Expiry Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discountsList.map((disc) => (
                          <tr key={disc.id}>
                            <td>
                              <strong style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#BA6C5A', backgroundColor: '#FDF5F3', padding: '3px 8px', borderRadius: '6px' }}>
                                {disc.code}
                              </strong>
                            </td>
                            <td><strong>{disc.discount}</strong></td>
                            <td>{disc.type}</td>
                            <td>{disc.appliesTo}</td>
                            <td>{disc.redemptions} Uses</td>
                            <td>{disc.expiry}</td>
                            <td><span className="payment-pill paid">{disc.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------
               TAB 8: /admin/settings (STORE SETTINGS)
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
                          <Globe size={18} color="#BA6C5A" />
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
                                backgroundColor: '#FDF5F3',
                                color: '#BA6C5A',
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
                              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#BA6C5A', textTransform: 'uppercase' }}>
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
                                backgroundColor: '#FDF5F3',
                                color: '#BA6C5A',
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
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#BA6C5A', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
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
                          <Phone size={18} color="#BA6C5A" />
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
                          <MapPin size={18} color="#BA6C5A" />
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
                          <Share2 size={18} color="#BA6C5A" />
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
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FDF5F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={20} color="#BA6C5A" />
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
                        <a href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.84rem', fontWeight: 600, color: '#BA6C5A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
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
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FDF5F3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <ImageIcon size={32} color="#BA6C5A" />
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
                                <span style={{ backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, color: '#BA6C5A' }}>
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

      {/* B. ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="oripio-modal-backdrop" onClick={() => setIsAddProductOpen(false)}>
          <div className="oripio-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <h3 className="oripio-modal-title">Add New Product to Boutique</h3>
              <button className="oripio-modal-close" onClick={() => setIsAddProductOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="oripio-modal-body">
                <div className="oripio-form-group">
                  <label className="oripio-form-label">Product Name</label>
                  <input
                    type="text"
                    className="oripio-form-input"
                    placeholder="e.g. Vintage Floral Silk Satin Pyjama Set"
                    value={newProdTitle}
                    onChange={(e) => setNewProdTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Category</label>
                      <select
                        className="oripio-form-input"
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                      >
                        <option value="Womens Pyjamas">Womens Pyjamas</option>
                        <option value="Sophie Collab">Sophie Collab</option>
                        <option value="Mens Nightwear">Mens Nightwear</option>
                        <option value="Robes & Gowns">Robes & Gowns</option>
                        <option value="Short Sets">Short Sets</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="oripio-form-group">
                      <label className="oripio-form-label">Price (£ GBP)</label>
                      <input
                        type="number"
                        step="0.50"
                        className="oripio-form-input"
                        placeholder="52.00"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="oripio-form-group">
                  <label className="oripio-form-label">Stock Quantity</label>
                  <input
                    type="number"
                    className="oripio-form-input"
                    placeholder="25"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                  />
                </div>
                <div className="oripio-form-group">
                  <label className="oripio-form-label">Product Image URL</label>
                  <input
                    type="url"
                    className="oripio-form-input"
                    placeholder="https://www.theirnibs.com/cdn/shop/files/..."
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                  />
                </div>
              </div>
              <div className="oripio-modal-footer">
                <button type="button" className="oripio-btn-secondary" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="oripio-btn-primary">
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* C. ORDER DETAILS / INVOICE MODAL */}
      {selectedOrderModal && (
        <div className="oripio-modal-backdrop" onClick={() => setSelectedOrderModal(null)}>
          <div className="oripio-modal-box invoice-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <div>
                <h3 className="oripio-modal-title">Order #{selectedOrderModal.id}</h3>
                <span className="order-modal-date">{selectedOrderModal.date} at {selectedOrderModal.time}</span>
              </div>
              <button className="oripio-modal-close" onClick={() => setSelectedOrderModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="oripio-modal-body">
              <div className="order-modal-grid">
                <div className="order-summary-card">
                  <span className="order-summary-label">CUSTOMER</span>
                  <div className="order-summary-val">{selectedOrderModal.customer}</div>
                  <div className="order-summary-sub">{selectedOrderModal.email}</div>
                  <div className="order-summary-sub">{selectedOrderModal.location}</div>
                </div>

                <div className="order-summary-card">
                  <span className="order-summary-label">PAYMENT STATUS</span>
                  <div>
                    <span className={`payment-pill ${selectedOrderModal.paymentStatus.toLowerCase()}`}>
                      {selectedOrderModal.paymentStatus}
                    </span>
                  </div>
                  <div className="order-summary-sub mt-2">Method: Credit Card (Stripe)</div>
                </div>

                <div className="order-summary-card">
                  <span className="order-summary-label">FULFILLMENT</span>
                  <div>
                    <span className={`fulfillment-pill ${selectedOrderModal.fulfillmentStatus.toLowerCase()}`}>
                      {selectedOrderModal.fulfillmentStatus}
                    </span>
                  </div>
                  <div className="order-summary-sub mt-2">Royal Mail Tracked 24</div>
                </div>
              </div>

              <div className="invoice-items-card">
                <h4 className="invoice-section-title">Items Ordered</h4>
                <div className="invoice-item-row">
                  <div>
                    <strong>{selectedOrderModal.itemSummary}</strong>
                    <div className="invoice-item-sku">SKU: TN-PYJ-2026 • 100% Recycled Satin</div>
                  </div>
                  <div className="invoice-item-price">
                    {selectedOrderModal.amount}
                  </div>
                </div>
              </div>

              <div className="invoice-totals-box">
                <div className="invoice-totals-row">
                  <span>Subtotal</span>
                  <span>{selectedOrderModal.amount}</span>
                </div>
                <div className="invoice-totals-row">
                  <span>Standard UK Shipping</span>
                  <span style={{ color: '#16A34A' }}>Free (Orders over £40)</span>
                </div>
                <div className="invoice-totals-row">
                  <span>VAT Included (20%)</span>
                  <span>Included</span>
                </div>
                <div className="invoice-totals-row total">
                  <strong>Total Paid</strong>
                  <strong className="invoice-final-amount">{selectedOrderModal.amount}</strong>
                </div>
              </div>
            </div>

            <div className="oripio-modal-footer order-modal-footer">
              <div className="fulfillment-actions-group">
                {selectedOrderModal.fulfillmentStatus !== 'Delivered' && (
                  <button
                    className="oripio-btn-secondary"
                    onClick={() => handleUpdateOrderStatus(selectedOrderModal.id, 'Shipped')}
                  >
                    <Truck size={14} />
                    <span>Mark as Shipped</span>
                  </button>
                )}
                {selectedOrderModal.fulfillmentStatus !== 'Delivered' && (
                  <button
                    className="oripio-btn-primary"
                    onClick={() => handleUpdateOrderStatus(selectedOrderModal.id, 'Delivered')}
                  >
                    <CheckCircle2 size={14} />
                    <span>Mark as Delivered</span>
                  </button>
                )}
              </div>
              <button
                className="oripio-btn-secondary"
                onClick={() => {
                  showToast(`Printed packaging slip for #${selectedOrderModal.id}`);
                }}
              >
                <Printer size={14} />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* D. CATEGORY SALES BREAKDOWN MODAL */}
      {isCategoryModalOpen && (
        <div className="oripio-modal-backdrop" onClick={() => setIsCategoryModalOpen(false)}>
          <div className="oripio-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="oripio-modal-header">
              <h3 className="oripio-modal-title">Sales by Category Breakdown</h3>
              <button className="oripio-modal-close" onClick={() => setIsCategoryModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="oripio-modal-body">
              <div className="category-modal-summary">
                <div className="category-total-rev">£48,620.50</div>
                <div className="category-total-label">Total Store Revenue ({selectedDateRange})</div>
              </div>

              <div className="category-breakdown-list">
                {CATEGORY_BREAKDOWN.map((cat) => (
                  <div key={cat.name} className="category-stat-row">
                    <div className="category-stat-header">
                      <span className="category-stat-name">{cat.name}</span>
                      <span className="category-stat-amount">{cat.revenue} ({cat.percentage}%)</span>
                    </div>
                    <div className="category-progress-track">
                      <div
                        className="category-progress-fill"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="oripio-modal-footer">
              <button className="oripio-btn-secondary" onClick={() => setIsCategoryModalOpen(false)}>
                Close
              </button>
              <button
                className="oripio-btn-primary"
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  showToast('Exported Category Sales Report as CSV');
                }}
              >
                <Download size={14} />
                <span>Export Report</span>
              </button>
            </div>
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
                        backgroundColor: '#FDF5F3',
                        color: '#BA6C5A',
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
