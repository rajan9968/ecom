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

      {/* 3. Products / Catalog Route (MySQL API) */}
      <Route path="products" element={renderProtectedTab('catalog')} />
      <Route path="catalog" element={<Navigate to="/admin/products" replace />} />

      {/* 4. Website Menus & Submenus Route (MySQL API) */}
      <Route path="menus" element={renderProtectedTab('menu')} />
      <Route path="navigation" element={<Navigate to="/admin/menus" replace />} />

      {/* 5. Hero Banners Route (MySQL API) */}
      <Route path="banners" element={renderProtectedTab('banners')} />

      {/* 6. Store Settings Route (MySQL API) */}
      <Route path="settings" element={renderProtectedTab('settings')} />

      {/* Redirect obsolete dummy routes to dashboard */}
      <Route path="orders" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="customers" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="analytics" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="discounts" element={<Navigate to="/admin/dashboard" replace />} />

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
