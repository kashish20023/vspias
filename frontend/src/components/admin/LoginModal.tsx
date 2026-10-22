import React, { useState } from 'react';
import { AdminIcon } from './AdminIcons';

interface LoginModalProps {
  adminConfigured: boolean;
  onLogin: (password: string) => Promise<void>;
}

export default function LoginModal({ adminConfigured, onLogin }: LoginModalProps): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setErrorMessage('');
    try {
      await onLogin(password);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Incorrect administrative password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="adm-login-page">
      <div className="adm-login-card">
        {/* Brand Header */}
        <div className="adm-login-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/reference/vspias-logo.png"
            alt="VSPIAS Ecoautomation Pvt Ltd"
            className="adm-login-logo"
            width={165}
            height={38}
          />
          <div className="adm-login-tag" aria-label="Status: Workspace Protected">
            <span className="adm-login-tag-dot" />
            <span>Workspace</span>
          </div>
        </div>

        {/* Heading & Intro */}
        <div className="adm-login-intro">
          <h1 className="adm-login-title">Sign in to workspace</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="adm-login-form">
          <div className="adm-login-field">
            <label className="adm-login-label" htmlFor="admin-password-input">
              <span>Password</span>
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--muted)' }}>Protected</span>
            </label>

            <div className="adm-login-input-wrap">
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter workspace password"
                className="adm-login-input"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="adm-login-eye-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="adm-login-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Config Notice Alert */}
          {!adminConfigured && (
            <div className="adm-login-notice" role="status">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <strong>Configuration Notice:</strong> <code>ADMIN_PASSWORD</code> is not configured. Add it to <code>.env.local</code> to activate security.
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !password}
            className="adm-login-submit-btn"
          >
            {isLoading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span>Verifying credentials…</span>
              </>
            ) : (
              <>
                <span>Sign in to workspace</span>
                <AdminIcon name="arrow" style={{ width: '16px', height: '16px' }} />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation & Security Note */}
        <div className="adm-login-footer">
          <div className="adm-login-security-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Encrypted Session • VSPIAS Ecoautomation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
