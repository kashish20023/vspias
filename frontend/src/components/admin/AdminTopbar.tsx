import React from 'react';
import { AdminIcon } from './AdminIcons';
import { AdminView } from './admin-types';

interface AdminTopbarProps {
  currentView: AdminView;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  revision: number;
  isDirty: boolean;
  onOpenMobile: () => void;
}

export default function AdminTopbar({
  currentView,
  searchQuery,
  onSearchChange,
  revision,
  isDirty,
  onOpenMobile
}: AdminTopbarProps): JSX.Element {
  const titles: Record<AdminView, string> = {
    overview: 'Overview',
    catalogue: 'Catalogue range',
    enquiries: 'Customer enquiries',
    media: 'Media & brochures',
    publishing: 'Publishing'
  };

  return (
    <header className="adm-topbar">
      {/* Mobile menu + breadcrumb */}
      <div className="adm-breadcrumb">
        <button
          type="button"
          onClick={onOpenMobile}
          className="adm-icon-button"
          aria-label="Open navigation"
          aria-expanded={false}
          aria-controls="sidebar"
          style={{ display: 'none' } /* shown via media query in admin-base.css */ }
          id="menu-button"
        >
          <AdminIcon name="menu" />
        </button>
        <span className="adm-breadcrumb-root">Workspace</span>
        <span className="adm-breadcrumb-slash">/</span>
        <strong id="breadcrumb-page">{titles[currentView] || 'Overview'}</strong>
      </div>

      {/* Tools */}
      <div className="adm-topbar-tools">
        {/* Search */}
        <label className="adm-global-search">
          <AdminIcon name="search" />
          <input
            id="global-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search catalogue…"
            aria-label="Search catalogue"
          />
          <kbd>⌘ K</kbd>
        </label>

        {/* Save state pill */}
        <span className="adm-preview-badge">
          <span
            className="adm-preview-badge-dot"
            style={{ background: isDirty ? '#d97706' : '#7c946e' }}
          />
          {isDirty ? 'Unsaved edits' : `Saved · Rev ${revision}`}
        </span>

        {/* Preview link — desktop only */}
        <a
          href="/?preview=draft"
          target="_blank"
          rel="noopener noreferrer"
          className="adm-icon-button"
          title="Open storefront draft preview"
          aria-label="Preview storefront draft"
          style={{ textDecoration: 'none' }}
        >
          <AdminIcon name="eye" />
        </a>
      </div>
    </header>
  );
}
