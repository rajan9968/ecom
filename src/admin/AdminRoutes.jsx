import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AdminLogin } from './adminlogin/AdminLogin.jsx';
import { AdminDashboard } from './admindashboard/AdminDashboard.jsx';

export function AdminRoutes() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      localStorage.getItem('oripio_admin_authenticated') === 'true' ||
      sessionStorage.getItem('oripio_admin_authenticated') === 'true'
    );
  });

  // Sync auth state if storage changes
  useEffect(() => {
    const checkAuth = () => {
      const auth = (
        localStorage.getItem('oripio_admin_authenticated') === 'true' ||
        sessionStorage.getItem('oripio_admin_authenticated') === 'true'
      );
      setIsAuthenticated(auth);
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('oripio_admin_authenticated');
    sessionStorage.removeItem('oripio_admin_authenticated');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  const handleExitToStore = () => {
    navigate('/');
  };

  // Helper wrapper for protected admin tabs
  const renderProtectedTab = (tabName) => {
    if (!isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
    }
    return (
      <AdminDashboard 
        activeTab={tabName}
        onLogout={handleLogout} 
        onExit={handleExitToStore} 
      />
    );
  };

  return (
    <Routes>
      {/* 1. Login Route */}
      <Route 
        path="login" 
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <AdminLogin 
              onLoginSuccess={handleLoginSuccess} 
              onExit={handleExitToStore} 
            />
          )
        } 
      />

      {/* 2. Overview / Main Dashboard Route */}
      <Route path="dashboard" element={renderProtectedTab('dashboard')} />
      <Route path="overview" element={<Navigate to="/admin/dashboard" replace />} />

      {/* 3. Orders Route */}
      <Route path="orders" element={renderProtectedTab('orders')} />

      {/* 4. Products / Catalog Route */}
      <Route path="products" element={renderProtectedTab('catalog')} />
      <Route path="catalog" element={<Navigate to="/admin/products" replace />} />

      {/* 5. Website Menus & Submenus Route */}
      <Route path="menus" element={renderProtectedTab('menu')} />
      <Route path="navigation" element={<Navigate to="/admin/menus" replace />} />

      {/* 6. Customers Route */}
      <Route path="customers" element={renderProtectedTab('customers')} />

      {/* 7. Sales Analytics Route */}
      <Route path="analytics" element={renderProtectedTab('analytics')} />

      {/* 8. Discounts & Promos Route */}
      <Route path="discounts" element={renderProtectedTab('discounts')} />

      {/* 9. Store Settings Route */}
      <Route path="settings" element={renderProtectedTab('settings')} />

      {/* 10. Hero Banners Route */}
      <Route path="banners" element={renderProtectedTab('banners')} />

      {/* Root /admin route */}
      <Route 
        index 
        element={
          <Navigate to={isAuthenticated ? "/admin/dashboard" : "/admin/login"} replace />
        } 
      />

      {/* Fallback route */}
      <Route 
        path="*" 
        element={
          <Navigate to={isAuthenticated ? "/admin/dashboard" : "/admin/login"} replace />
        } 
      />
    </Routes>
  );
}
