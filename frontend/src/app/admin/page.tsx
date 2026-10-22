'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import OverviewView from '@/components/admin/OverviewView';
import CatalogueView from '@/components/admin/CatalogueView';
import EnquiriesView from '@/components/admin/EnquiriesView';
import MediaView from '@/components/admin/MediaView';
import PublishingView from '@/components/admin/PublishingView';
import ProductEditorDialog from '@/components/admin/ProductEditorDialog';
import EnquiryDetailDialog from '@/components/admin/EnquiryDetailDialog';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoginModal from '@/components/admin/LoginModal';
import { AdminView, CatalogData, CatalogState, EnquiryRecord, FilterState, ProductItem } from '@/components/admin/admin-types';
import { computeDifferences } from '@/components/admin/admin-utils';

export default function AdminPage(): JSX.Element {
  // Session & Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminConfigured, setAdminConfigured] = useState<boolean>(true);
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Core Data
  const [catalogState, setCatalogState] = useState<CatalogState | null>(null);
  const [workingDraft, setWorkingDraft] = useState<CatalogData | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [sessionActivity, setSessionActivity] = useState<Array<{ message: string; at: string }>>([]);

  // Navigation & View
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    catalogue: '',
    division: 'all',
    visibility: 'all',
    enquiries: '',
    enquiryDivision: 'all',
    enquiryPeriod: 'all',
    chartDays: 7
  });

  // Modal Dialogs
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [isEnquiryDetailOpen, setIsEnquiryDetailOpen] = useState<boolean>(false);

  // Confirm Modal
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    danger?: boolean;
    typedConfirmation?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const showToast = useCallback((text: string, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  const recordActivity = useCallback((message: string) => {
    setSessionActivity((prev) => [{ message, at: new Date().toISOString() }, ...prev]);
  }, []);

  // Compute Staged Differences
  const differences = useMemo(() => {
    if (!catalogState || !workingDraft) return [];
    return computeDifferences(catalogState.published, workingDraft);
  }, [catalogState, workingDraft]);

  // Dirty State (Working copy differs from server draft)
  const isDirty = useMemo(() => {
    if (!catalogState || !workingDraft) return false;
    return JSON.stringify(workingDraft) !== JSON.stringify(catalogState.draft);
  }, [catalogState, workingDraft]);

  // Load Catalogue & Enquiries from backend
  const loadData = useCallback(async (token: string) => {
    try {
      const [catRes, enqRes] = await Promise.all([
        fetch('/api/admin/catalog', {
          headers: { 'X-CSRF-Token': token },
          cache: 'no-store'
        }),
        fetch('/api/admin/enquiries', {
          headers: { 'X-CSRF-Token': token },
          cache: 'no-store'
        })
      ]);

      if (catRes.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      if (catRes.ok) {
        const catData = await catRes.json();
        const state: CatalogState = {
          revision: catData.revision,
          publishedAt: catData.publishedAt,
          published: catData.published,
          draft: catData.draft
        };
        setCatalogState(state);
        setWorkingDraft(JSON.parse(JSON.stringify(catData.draft)));
        if (catData.csrf) {
          setCsrfToken(catData.csrf);
        }
      }

      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }
    } catch {
      showToast('Error loading workspace data.', true);
    }
  }, [showToast]);

  // Session check on boot
  useEffect(() => {
    async function checkSession() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/session', { cache: 'no-store' });
        const data = await res.json();
        setAdminConfigured(Boolean(data.adminConfigured));

        if (data.authenticated) {
          setIsAuthenticated(true);
          const token = data.csrf || '';
          setCsrfToken(token);
          await loadData(token);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, [loadData]);

  // Keyboard Shortcuts (Cmd + K, Cmd + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (isEditorOpen) {
          showToast('Apply product edits first, then save your draft.');
        } else if (isDirty) {
          handleSaveDraft();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditorOpen, isDirty]);

  // Unsaved Edits Guard
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Login Handler
  const handleLogin = async (password: string) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed.');
    }

    setIsAuthenticated(true);
    setCsrfToken(data.csrf);
    await loadData(data.csrf);
    showToast('Signed in successfully.');
  };

  // Sign Out Handler
  const handleSignOut = async () => {
    if (isDirty && !confirm('You have unsaved changes. Sign out without saving?')) {
      return;
    }
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({})
      });
    } catch {
      // Ignore network errors on signout
    }
    setIsAuthenticated(false);
    setCsrfToken('');
    setCatalogState(null);
    setWorkingDraft(null);
    showToast('Signed out.');
  };

  // Save Draft (POST /api/admin/save)
  const handleSaveDraft = async () => {
    if (!catalogState || !workingDraft) return;
    if (!isDirty) {
      showToast('Working draft is already saved.');
      return;
    }

    try {
      showToast('Saving draft…');
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          revision: catalogState.revision,
          catalog: workingDraft
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        showToast('Draft changed in another session. Please reload to resolve.', true);
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save draft.');
      }

      setCatalogState((prev) =>
        prev
          ? {
              ...prev,
              draft: JSON.parse(JSON.stringify(workingDraft)),
              revision: data.revision
            }
          : null
      );
      recordActivity(`Saved draft · revision ${data.revision}`);
      showToast(`Draft saved · revision ${data.revision}`);
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message, true);
    }
  };

  // Publish Draft (POST /api/admin/publish)
  const handlePublishDraft = () => {
    if (!catalogState || !workingDraft) return;
    if (isDirty) {
      showToast('Please save your draft before publishing.', true);
      return;
    }
    if (!differences.length) {
      showToast('No unpublished changes to publish.');
      return;
    }

    setConfirmConfig({
      isOpen: true,
      title: 'Publish catalogue to live website?',
      message: `This will push ${differences.length} staged change${differences.length === 1 ? '' : 's'} to all live website visitors immediately.`,
      confirmLabel: 'Publish to live site',
      onConfirm: async () => {
        try {
          showToast('Publishing catalogue…');
          const res = await fetch('/api/admin/publish', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ revision: catalogState.revision })
          });

          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(data.error || 'Publishing failed.');
          }

          setCatalogState((prev) =>
            prev
              ? {
                  ...prev,
                  published: JSON.parse(JSON.stringify(prev.draft)),
                  publishedAt: data.publishedAt,
                  revision: data.revision
                }
              : null
          );
          recordActivity(`Published catalogue · revision ${data.revision}`);
          showToast('Catalogue published live! Website updated.');
        } catch (err: unknown) {
          const error = err as Error;
          showToast(error.message, true);
        } finally {
          setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // Discard Draft (POST /api/admin/discard)
  const handleDiscardDraft = () => {
    if (!catalogState) return;

    setConfirmConfig({
      isOpen: true,
      title: 'Discard draft changes?',
      message: 'All staged modifications will be reverted to the last published snapshot. This cannot be undone.',
      confirmLabel: 'Discard draft',
      danger: true,
      onConfirm: async () => {
        try {
          showToast('Discarding draft…');
          const res = await fetch('/api/admin/discard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken
            },
            body: JSON.stringify({ revision: catalogState.revision })
          });

          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(data.error || 'Failed to discard draft.');
          }

          setCatalogState((prev) =>
            prev
              ? {
                  ...prev,
                  draft: JSON.parse(JSON.stringify(prev.published)),
                  revision: data.revision
                }
              : null
          );
          setWorkingDraft(JSON.parse(JSON.stringify(catalogState.published)));
          recordActivity('Discarded draft modifications');
          showToast('Draft restored to published state.');
        } catch (err: unknown) {
          const error = err as Error;
          showToast(error.message, true);
        } finally {
          setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // Product CRUD in working draft
  const handleSaveProduct = (updated: ProductItem) => {
    setWorkingDraft((prev) => {
      if (!prev) return null;
      const copy = { ...prev };
      const index = copy.products.findIndex((p) => p.id === updated.id);
      if (index === -1) {
        copy.products.push(updated);
        recordActivity(`Added product "${updated.name}"`);
      } else {
        copy.products[index] = updated;
        recordActivity(`Updated product "${updated.name}"`);
      }
      return copy;
    });
    showToast('Product updated in working draft. Save draft to stage.');
  };

  const handleDeleteProduct = (id: string, name: string) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Remove product from catalogue?',
      message: `Are you sure you want to remove "${name}"? Save and publish to push removal live.`,
      confirmLabel: 'Remove product',
      danger: true,
      onConfirm: () => {
        setWorkingDraft((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            products: prev.products.filter((p) => p.id !== id)
          };
        });
        setIsEditorOpen(false);
        recordActivity(`Removed product "${name}"`);
        showToast('Product removed from working draft.');
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Delete Customer Enquiry
  const handleDeleteEnquiry = (id: string, name: string) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Delete customer enquiry?',
      message: `Permanently delete enquiry from ${name}? This action cannot be undone.`,
      confirmLabel: 'Delete enquiry',
      danger: true,
      typedConfirmation: 'DELETE',
      onConfirm: async () => {
        try {
          showToast('Deleting enquiry…');
          const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: { 'X-CSRF-Token': csrfToken }
          });
          if (!res.ok) {
            throw new Error('Failed to delete enquiry.');
          }

          setEnquiries((prev) => prev.filter((e) => e.id !== id));
          setIsEnquiryDetailOpen(false);
          recordActivity(`Deleted enquiry from ${name}`);
          showToast('Enquiry permanently deleted.');
        } catch (err: unknown) {
          const error = err as Error;
          showToast(error.message, true);
        } finally {
          setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  // Brochure PDF update in working draft
  const handleBrochureUpdate = (key: 'brochure' | 'paperBrochure', path: string) => {
    setWorkingDraft((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [key]: path
      };
    });
    recordActivity(`Updated ${key === 'brochure' ? 'automation' : 'paper'} brochure PDF`);
    showToast('Brochure updated in working draft. Click "Save draft" to stage.');
  };

  // Filtered catalogue products
  const filteredProducts = useMemo(() => {
    if (!workingDraft) return [];
    return workingDraft.products
      .filter((p) => {
        const matchDiv = filters.division === 'all' || p.division === filters.division;
        const matchVis =
          filters.visibility === 'all' || (filters.visibility === 'visible' ? p.visible : !p.visible);
        const query = filters.catalogue.toLowerCase();
        const matchQuery = `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(query);
        return matchDiv && matchVis && matchQuery;
      })
      .sort((a, b) => a.division.localeCompare(b.division) || a.order - b.order);
  }, [workingDraft, filters.division, filters.visibility, filters.catalogue]);

  if (isLoading) {
    return (
      <div className="adm-login-page">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', zIndex: 10 }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--ink)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--muted)', textTransform: 'uppercase' }}>Loading Workspace…</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginModal adminConfigured={adminConfigured} onLogin={handleLogin} />;
  }

  if (!catalogState || !workingDraft) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4 text-xs text-muted">
        Failed to load catalogue data.
      </div>
    );
  }

  return (
    <>
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentView={currentView}
        onNavigate={(v) => {
          setCurrentView(v);
          setMobileMenuOpen(false);
        }}
        enquiryCount={enquiries.length}
        hasUnpublished={differences.length > 0}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* Main Shell Container */}
      <div className="adm-shell">
        <AdminTopbar
          currentView={currentView}
          searchQuery={filters.catalogue}
          onSearchChange={(q) => {
            setFilters((prev) => ({ ...prev, catalogue: q }));
            if (currentView !== 'catalogue') setCurrentView('catalogue');
          }}
          revision={catalogState.revision}
          isDirty={isDirty}
          onOpenMobile={() => setMobileMenuOpen(true)}
        />

        {/* View Content */}
        <main className="adm-main" id="main" tabIndex={-1}>
          {currentView === 'overview' && (
            <OverviewView
              products={workingDraft.products}
              enquiries={enquiries}
              differences={differences}
              isDirty={isDirty}
              chartDays={filters.chartDays}
              onChartDaysChange={(days) => setFilters((prev) => ({ ...prev, chartDays: days }))}
              onNavigate={setCurrentView}
              onOpenAddProduct={() => {
                setEditingProduct({
                  id: 'product-' + crypto.randomUUID().slice(0, 8),
                  name: '',
                  brand: 'VSPIAS',
                  category: 'General',
                  division: 'paper',
                  image: '',
                  alt: '',
                  description: '',
                  source: 'Admin supplied',
                  sourcePage: null,
                  illustrative: false,
                  visible: true,
                  order: Math.max(0, ...workingDraft.products.map((p) => p.order || 0)) + 1
                });
                setIsEditorOpen(true);
              }}
              onOpenEnquiryDetail={(e) => {
                setSelectedEnquiry(e);
                setIsEnquiryDetailOpen(true);
              }}
            />
          )}

          {currentView === 'catalogue' && (
            <CatalogueView
              products={filteredProducts}
              totalProductCount={workingDraft.products.length}
              revision={catalogState.revision}
              isDirty={isDirty}
              differences={differences}
              searchQuery={filters.catalogue}
              onSearchChange={(q) => setFilters((prev) => ({ ...prev, catalogue: q }))}
              selectedDivision={filters.division}
              onDivisionChange={(d) => setFilters((prev) => ({ ...prev, division: d }))}
              selectedVisibility={filters.visibility}
              onVisibilityChange={(v) => setFilters((prev) => ({ ...prev, visibility: v }))}
              onOpenAddProduct={() => {
                setEditingProduct({
                  id: 'product-' + crypto.randomUUID().slice(0, 8),
                  name: '',
                  brand: 'VSPIAS',
                  category: 'General',
                  division: filters.division === 'automation' ? 'automation' : 'paper',
                  image: '',
                  alt: '',
                  description: '',
                  source: 'Admin supplied',
                  sourcePage: null,
                  illustrative: false,
                  visible: true,
                  order: Math.max(0, ...workingDraft.products.map((p) => p.order || 0)) + 1
                });
                setIsEditorOpen(true);
              }}
              onEditProduct={(p) => {
                setEditingProduct(p);
                setIsEditorOpen(true);
              }}
              onSaveDraft={handleSaveDraft}
              onClearFilters={() =>
                setFilters((prev) => ({
                  ...prev,
                  catalogue: '',
                  division: 'all',
                  visibility: 'all'
                }))
              }
            />
          )}

          {currentView === 'enquiries' && (
            <EnquiriesView
              enquiries={enquiries}
              searchQuery={filters.enquiries}
              onSearchChange={(q) => setFilters((prev) => ({ ...prev, enquiries: q }))}
              selectedDivision={filters.enquiryDivision}
              onDivisionChange={(d) => setFilters((prev) => ({ ...prev, enquiryDivision: d }))}
              selectedPeriod={filters.enquiryPeriod}
              onPeriodChange={(p) => setFilters((prev) => ({ ...prev, enquiryPeriod: p }))}
              onRefresh={() => loadData(csrfToken)}
              onOpenDetail={(e) => {
                setSelectedEnquiry(e);
                setIsEnquiryDetailOpen(true);
              }}
              onClearFilters={() =>
                setFilters((prev) => ({
                  ...prev,
                  enquiries: '',
                  enquiryDivision: 'all',
                  enquiryPeriod: 'all'
                }))
              }
            />
          )}

          {currentView === 'media' && (
            <MediaView
              draft={workingDraft}
              revision={catalogState.revision}
              isDirty={isDirty}
              differences={differences}
              csrfToken={csrfToken}
              onBrochureUpdate={handleBrochureUpdate}
              onSaveDraft={handleSaveDraft}
            />
          )}

          {currentView === 'publishing' && (
            <PublishingView
              draft={workingDraft}
              published={catalogState.published}
              revision={catalogState.revision}
              publishedAt={catalogState.publishedAt}
              isDirty={isDirty}
              differences={differences}
              sessionActivity={sessionActivity}
              onPublish={handlePublishDraft}
              onDiscard={handleDiscardDraft}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="adm-footer">
          <span>VSPIAS / Admin workspace</span>
          <span>
            {catalogState.publishedAt
              ? `Last published: ${new Date(catalogState.publishedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)`
              : 'Using initial seed catalogue'}
          </span>
        </footer>
      </div>

      {/* Product Editor Slide-out Drawer */}
      <ProductEditorDialog
        product={editingProduct}
        isOpen={isEditorOpen}
        csrfToken={csrfToken}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Customer Enquiry Details Dialog */}
      <EnquiryDetailDialog
        enquiry={selectedEnquiry}
        isOpen={isEnquiryDetailOpen}
        onClose={() => setIsEnquiryDetailOpen(false)}
        onDelete={handleDeleteEnquiry}
      />

      {/* Reusable Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmLabel={confirmConfig.confirmLabel}
        danger={confirmConfig.danger}
        typedConfirmation={confirmConfig.typedConfirmation}
        onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="adm-toast"
          style={toastMessage.isError ? { background: '#742e27', borderColor: '#a04040' } : undefined}
        >
          {toastMessage.text}
        </div>
      )}
    </>
  );
}
