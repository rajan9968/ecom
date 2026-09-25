import React, { useState, useEffect } from 'react';
import { AdminLogin } from './adminlogin/AdminLogin.jsx';
import { AdminDashboard } from './admindashboard/AdminDashboard.jsx';

export function AdminPortal({ onExit }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      localStorage.getItem('oripio_admin_authenticated') === 'true' ||
      sessionStorage.getItem('oripio_admin_authenticated') === 'true'
    );
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('oripio_admin_authenticated');
    sessionStorage.removeItem('oripio_admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess} 
        onExit={onExit} 
      />
    );
  }

  return (
    <AdminDashboard 
      onLogout={handleLogout} 
      onExit={onExit} 
    />
  );
}
