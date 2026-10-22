import React from 'react';
import { AdminIcon } from './AdminIcons';
import { AdminView } from './admin-types';

interface AdminSidebarProps {
  currentView: AdminView;
  onNavigate: (view: AdminView) => void;
  enquiryCount: number;
  hasUnpublished: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onSignOut: () => void;
}

export default function AdminSidebar({
  currentView,
  onNavigate,
  enquiryCount,
  hasUnpublished,
  mobileOpen,
  onCloseMobile,
  onSignOut
}: AdminSidebarProps): JSX.Element {
  const navItems: Array<{ id: AdminView; label: string; icon: keyof typeof import('./AdminIcons').ICONS }> = [
    { id: 'overview', label: 'Overview', icon: 'overview' },
    { id: 'catalogue', label: 'Catalogue range', icon: 'box' },
    { id: 'enquiries', label: 'Customer enquiries', icon: 'inbox' },
    { id: 'media', label: 'Media & brochures', icon: 'image' },
    { id: 'publishing', label: 'Publishing', icon: 'publish' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          onClick={onCloseMobile}
          style={{ position: 'fixed', inset: 0, background: '#102a246b', zIndex: 35 }}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={'adm-sidebar' + (mobileOpen ? ' adm-open' : '')}
        aria-label="Main navigation"
        id="sidebar"
      >
        {/* Brand block */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('overview');
          }}
          className="adm-brand"
          aria-label="VSPIAS Admin Overview"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/reference/vspias-logo-white.png"
            alt="VSPIAS Ecoautomation Pvt Ltd"
            className="adm-brand-logo-img"
            width={166}
            height={38}
          />
          <span className="adm-brand-caption">ADMIN WORKSPACE</span>
        </a>

        {/* Workspace card */}
        <div className="adm-workspace-card">
          <span className="adm-workspace-symbol">
            <AdminIcon name="layers" />
          </span>
          <span>
            <strong style={{ display: 'block', fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>Main workspace</strong>
            <small>Catalogue &amp; enquiries</small>
          </span>
        </div>

        {/* WORKSPACE nav section label */}
        <div className="adm-nav-label">Workspace</div>

        {/* Navigation items */}
        <nav className="adm-nav" id="navigation">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={'adm-nav-item' + (isActive ? ' active' : '')}
                aria-current={isActive ? 'page' : undefined}
              >
                <AdminIcon name={item.icon} />
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                {item.id === 'enquiries' && (
                  <span className="adm-nav-count">{enquiryCount}</span>
                )}
                {item.id === 'publishing' && hasUnpublished && (
                  <span className="adm-nav-dot" aria-label="Unpublished changes ready" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar bottom */}
        <div className="adm-sidebar-bottom">
          {/* Built for better card */}
          <div className="adm-sidebar-note">
            <span className="adm-eyebrow" style={{ color: '#baca9f', fontSize: 8 }}>Built for better</span>
            <p>Two divisions.<br />One workspace.</p>
            <div className="adm-division-marks">
              <AdminIcon name="bag" />
              <div className="adm-thin-line" />
              <AdminIcon name="circuit" />
            </div>
          </div>

          {/* Storefront preview link */}
          <a
            href="/?preview=draft"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-nav-utility"
          >
            <AdminIcon name="eye" />
            <span>Storefront preview</span>
            <AdminIcon name="diagonal" style={{ marginLeft: 'auto', opacity: 0.7 }} />
          </a>

          {/* Profile bar */}
          <div className="adm-profile">
            <div className="adm-avatar">A</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <strong>Administrator</strong>
              <small>Active session</small>
            </div>
            <span className="adm-profile-dot" aria-hidden="true" />
            <button
              type="button"
              onClick={onSignOut}
              style={{ marginLeft: 8, color: '#b7c5ba', lineHeight: 0, padding: 4, borderRadius: 6 }}
              title="Sign out"
              aria-label="Sign out"
            >
              <AdminIcon name="close" style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
