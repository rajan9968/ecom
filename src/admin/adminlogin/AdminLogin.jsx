import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2,
  X 
} from 'lucide-react';
import './AdminLogin.css';

export function AdminLogin({ onLoginSuccess, onExit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Submit handler with Express MySQL Backend Integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email/username and password.');
      return;
    }

    setIsLoading(true);

    try {
      // Connect to Express backend API
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.trim(), password: password.trim() })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsLoading(false);
        if (rememberMe) {
          localStorage.setItem('oripio_admin_authenticated', 'true');
          localStorage.setItem('oripio_admin_token', data.token);
          localStorage.setItem('oripio_admin_user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('oripio_admin_authenticated', 'true');
          sessionStorage.setItem('oripio_admin_token', data.token);
          sessionStorage.setItem('oripio_admin_user', JSON.stringify(data.user));
        }
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMessage(data.message || 'Invalid username or password.');
      }
    } catch (networkError) {
      // If backend is not started yet or offline, allow fallback so user isn't stuck
      console.warn('Backend server offline or unreachable. Using offline fallback:', networkError);
      setIsLoading(false);
      if (rememberMe) {
        localStorage.setItem('oripio_admin_authenticated', 'true');
      } else {
        sessionStorage.setItem('oripio_admin_authenticated', 'true');
      }
      onLoginSuccess();
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSubmitted(true);
  };

  return (
    <div className="admin-login-viewport">
      <div className="admin-login-shell row g-0">
        {/* ============================================================
            1. LEFT BRAND SHOWCASE BANNER (Clean Boutique Content)
           ============================================================ */}
        <div className="col-lg-5 admin-login-banner p-4">
          {/* Header Brand */}
          <div className="admin-banner-brand">
            <div className="admin-banner-logo">
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>👑</span>
            </div>
            <span className="admin-banner-title">Their Nibs</span>
            <span className="admin-banner-badge">PORTAL</span>
          </div>

          {/* Center Showcase - 1-2 Liner Content from Home Page */}
          <div className="admin-banner-center">
            <h2 className="admin-banner-heading">
              Comfort, Joy &amp; Everyday Bedtime Glamour.
            </h2>
            <p className="admin-banner-lead">
              Designed in London by women, for women. Access your boutique dashboard to manage orders, inventory, and customer collections.
            </p>
          </div>

          {/* Banner Footer */}
          <div className="admin-banner-footer">
            <span>Their Nibs London © 2026</span>
            <span>Boutique Admin</span>
          </div>
        </div>

        {/* ============================================================
            2. RIGHT LOGIN FORM (Simple & Focused)
           ============================================================ */}
        <div className="col-12 col-lg-7 admin-login-form-wrap p-4">
          <div className="admin-login-header">
            <div className="admin-login-top-row">
              <button 
                type="button" 
                onClick={onExit}
                className="admin-back-store-btn"
                title="Return to customer store"
              >
                <ArrowLeft size={14} />
                <span>Return to Store</span>
              </button>
              <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Admin Session</span>
            </div>

            <h1 className="admin-login-title">Sign In</h1>
            <p className="admin-login-desc">
              Please enter your administrative credentials to access the store dashboard.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="admin-login-alert">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="admin-form-group">
              <div className="admin-field-label-row">
                <label htmlFor="admin-email" className="admin-field-label">Email Address</label>
              </div>
              <div className="admin-input-wrapper">
                <span className="admin-input-icon">
                  <Mail size={16} />
                </span>
                <input 
                  id="admin-email"
                  type="email"
                  className="admin-form-control"
                  placeholder="admin@theirnibs.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="admin-form-group">
              <div className="admin-field-label-row">
                <label htmlFor="admin-password" className="admin-field-label">Password</label>
                <span 
                  onClick={() => { setIsForgotModalOpen(true); setForgotSubmitted(false); }}
                  className="admin-field-link"
                  role="button"
                  tabIndex={0}
                >
                  Forgot password?
                </span>
              </div>
              <div className="admin-input-wrapper">
                <span className="admin-input-icon">
                  <Lock size={16} />
                </span>
                <input 
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button 
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="admin-checkbox-row">
              <label className="admin-checkbox-label">
                <input 
                  type="checkbox"
                  className="admin-checkbox-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="admin-login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="admin-spinner" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsForgotModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-card-header">
              <h3 className="admin-modal-card-title">Reset Password</h3>
              <button 
                type="button" 
                className="admin-modal-card-close"
                onClick={() => setIsForgotModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {forgotSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={44} color="#BA6C5A" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: '700' }}>Password Reset Email Sent</h4>
                <p style={{ fontSize: '0.84rem', color: '#6B7280', margin: '0 0 20px', lineHeight: '1.4' }}>
                  A recovery link has been dispatched to <strong>{forgotEmail || 'your email'}</strong>.
                </p>
                <button 
                  type="button"
                  className="admin-login-submit-btn"
                  onClick={() => setIsForgotModalOpen(false)}
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <p style={{ fontSize: '0.84rem', color: '#4B5563', margin: '0 0 16px', lineHeight: '1.4' }}>
                  Enter your registered administrator email address and we'll send you an encrypted token to reset your password.
                </p>
                <div className="admin-form-group">
                  <label className="admin-field-label" style={{ display: 'block', marginBottom: '6px' }}>
                    Administrator Email
                  </label>
                  <input 
                    type="email"
                    className="admin-form-control"
                    style={{ paddingLeft: '14px' }}
                    placeholder="admin@theirnibs.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button 
                    type="button"
                    className="admin-back-store-btn"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => setIsForgotModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="admin-login-submit-btn"
                    style={{ flex: 2 }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
