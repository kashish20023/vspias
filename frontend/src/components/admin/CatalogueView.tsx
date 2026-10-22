import React from 'react';
import { AdminIcon } from './AdminIcons';
import { DiffRow, ProductItem } from './admin-types';
import { safeAssetUrl } from './admin-utils';

interface CatalogueViewProps {
  products: ProductItem[];
  totalProductCount: number;
  revision: number;
  isDirty: boolean;
  differences: DiffRow[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDivision: 'all' | 'paper' | 'automation';
  onDivisionChange: (d: 'all' | 'paper' | 'automation') => void;
  selectedVisibility: 'all' | 'visible' | 'hidden';
  onVisibilityChange: (v: 'all' | 'visible' | 'hidden') => void;
  onOpenAddProduct: () => void;
  onEditProduct: (product: ProductItem) => void;
  onSaveDraft: () => void;
  onClearFilters: () => void;
}

export default function CatalogueView({
  products,
  totalProductCount,
  revision,
  isDirty,
  differences,
  searchQuery,
  onSearchChange,
  selectedDivision,
  onDivisionChange,
  selectedVisibility,
  onVisibilityChange,
  onOpenAddProduct,
  onEditProduct,
  onSaveDraft,
  onClearFilters
}: CatalogueViewProps): JSX.Element {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase block">
            Product Management
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-ink mt-1">Catalogue range.</h1>
          <p className="text-sm text-muted mt-1">
            Manage product items, specifications, photographs, and visibility for both divisions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/?preview=draft"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-line bg-white text-xs font-semibold text-ink hover:bg-soft transition-colors"
          >
            <AdminIcon name="eye" className="w-4 h-4" />
            <span>Storefront preview ↗</span>
          </a>
          <button
            type="button"
            onClick={onOpenAddProduct}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-emerald-950 transition-colors"
          >
            <AdminIcon name="plus" className="w-4 h-4" />
            <span>Add product</span>
          </button>
        </div>
      </div>

      {/* Staged Draft Banner */}
      <div className="border border-[#d5ddbb] bg-[#edf0dc] rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <AdminIcon name={isDirty ? 'edit' : 'checkcircle'} className="w-5 h-5 text-ink flex-shrink-0" />
          <div>
            <strong className="text-ink font-semibold">{isDirty ? 'You have unsaved working changes' : 'Draft staged on server'}</strong>
            <span className="text-muted block sm:inline sm:ml-2">
              {isDirty
                ? 'Save your draft before previewing on live site.'
                : `Revision ${revision} · ${differences.length} staged modification${differences.length === 1 ? '' : 's'}`}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={!isDirty}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-ink text-white font-semibold hover:bg-emerald-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors self-start sm:self-auto"
        >
          <AdminIcon name="save" className="w-3.5 h-3.5" />
          <span>Save draft</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <label className="flex items-center gap-2 flex-1 min-w-[200px] bg-white border border-line rounded-lg px-3 py-2 text-xs">
          <AdminIcon name="search" className="w-4 h-4 text-muted flex-shrink-0" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products, brands or categories…"
            className="w-full bg-transparent border-0 p-0 text-ink text-xs focus:outline-none"
            aria-label="Search products"
          />
        </label>

        {/* Division Selector */}
        <select
          value={selectedDivision}
          onChange={(e) => onDivisionChange(e.target.value as 'all' | 'paper' | 'automation')}
          className="bg-white border border-line rounded-lg px-3 py-2 text-xs text-ink focus:outline-none"
          aria-label="Filter by division"
        >
          <option value="all">All divisions</option>
          <option value="paper">Paper packaging</option>
          <option value="automation">Industrial automation</option>
        </select>

        {/* Visibility Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#e9ecdf] p-1 border border-line rounded-lg text-xs" role="group" aria-label="Filter visibility">
          {(['all', 'visible', 'hidden'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onVisibilityChange(tab)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedVisibility === tab ? 'bg-white font-semibold text-ink shadow-sm' : 'text-muted hover:text-ink'
              }`}
            >
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Table + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table Panel */}
        <div className="lg:col-span-3 bg-white border border-line rounded-card shadow-panel overflow-hidden">
          <div className="p-4 border-b border-line flex items-center justify-between text-xs text-muted">
            <span className="font-semibold text-ink">
              Products <span className="ml-1 px-1.5 py-0.5 rounded bg-soft text-[10px]">{products.length}</span>
            </span>
            <span>Sorted by display position</span>
          </div>

          {products.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-line bg-soft/40 text-muted uppercase text-[9px] tracking-wider">
                    <th className="py-2.5 px-4">Product</th>
                    <th className="py-2.5 px-4">Division</th>
                    <th className="py-2.5 px-4">Visibility</th>
                    <th className="py-2.5 px-4">Order</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {products.map((p) => {
                    const imgSrc = safeAssetUrl(p.image);
                    return (
                      <tr key={p.id} className="hover:bg-soft/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded border border-line bg-paper flex items-center justify-center overflow-hidden flex-shrink-0">
                              {imgSrc ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={imgSrc} alt={p.alt || p.name} className="w-full h-full object-cover" />
                              ) : (
                                <AdminIcon name={p.division === 'paper' ? 'bag' : 'circuit'} className="w-5 h-5 text-muted" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <button
                                type="button"
                                onClick={() => onEditProduct(p)}
                                className="font-semibold text-ink hover:underline text-left block truncate max-w-xs"
                              >
                                {p.name}
                              </button>
                              <small className="text-muted block text-[11px] truncate">
                                {p.brand} · {p.category}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                              p.division === 'paper' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {p.division === 'paper' ? 'Paper packaging' : 'Industrial automation'}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold ${
                              p.visible ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${p.visible ? 'bg-emerald-600' : 'bg-gray-400'}`} />
                            {p.visible ? 'Live on site' : 'Hidden'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted font-mono">{String(p.order).padStart(2, '0')}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => onEditProduct(p)}
                            className="p-1.5 rounded hover:bg-soft text-ink inline-flex"
                            title="Edit product"
                            aria-label={`Edit ${p.name}`}
                          >
                            <AdminIcon name="edit" className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-muted space-y-3">
              <AdminIcon name="search" className="w-8 h-8 text-muted mx-auto" />
              <p>No products match your current search or filters.</p>
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center px-3 py-1.5 rounded-md border border-line bg-white font-semibold text-ink hover:bg-soft"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className="p-3.5 border-t border-line text-xs text-muted flex justify-between">
            <span>Showing {products.length} of {totalProductCount} products</span>
            <span>Working draft snapshot</span>
          </div>
        </div>

        {/* Aside Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-line rounded-card p-5 shadow-panel text-xs space-y-3">
            <h3 className="font-semibold text-ink text-sm">Editorial Process</h3>
            <p className="text-muted leading-relaxed">
              Modifications made here update your working draft. Publish them to update the production catalogue.
            </p>
            <div className="space-y-2 border-t border-line pt-3">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-lime text-ink font-bold text-[10px] flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <strong className="block text-ink">Edit & save draft</strong>
                  <span className="text-muted text-[11px]">Updates staged revision safely.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-soft text-ink font-bold text-[10px] flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <strong className="block text-ink">Preview live site</strong>
                  <span className="text-muted text-[11px]">Inspect draft rendering.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-soft text-ink font-bold text-[10px] flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <strong className="block text-ink">Publish live</strong>
                  <span className="text-muted text-[11px]">Deploy to all website visitors.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f0e6] border border-line rounded-card p-4 text-xs flex gap-3">
            <AdminIcon name="info" className="w-5 h-5 text-muted flex-shrink-0" />
            <div>
              <strong className="block text-ink font-semibold">Image validation</strong>
              <p className="text-muted text-[11px] mt-1 leading-normal">
                Photographs upload directly to the server with binary signature validation. PNG, JPEG and WebP up to 10 MB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
