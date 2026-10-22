import React from 'react';
import { AdminIcon } from './AdminIcons';
import { CatalogData, DiffRow } from './admin-types';
import { formatDateIST } from './admin-utils';

interface PublishingViewProps {
  draft: CatalogData;
  published: CatalogData;
  revision: number;
  publishedAt: string | null;
  isDirty: boolean;
  differences: DiffRow[];
  sessionActivity: Array<{ message: string; at: string }>;
  onPublish: () => void;
  onDiscard: () => void;
}

export default function PublishingView({
  draft,
  published,
  revision,
  publishedAt,
  isDirty,
  differences,
  sessionActivity,
  onPublish,
  onDiscard
}: PublishingViewProps): JSX.Element {
  const missingImages = draft.products.filter((p) => p.visible && !p.image).length;

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase block">
            Deployment & Verification
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-ink mt-1">Review. Preview. Publish.</h1>
          <p className="text-sm text-muted mt-1">
            Compare staged draft modifications and push revisions live to all website visitors.
          </p>
        </div>
        <a
          href="/?preview=draft"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-line bg-white text-xs font-semibold text-ink hover:bg-soft transition-colors self-start sm:self-auto"
        >
          <AdminIcon name="eye" className="w-4 h-4" />
          <span>Storefront preview ↗</span>
        </a>
      </div>

      {/* Main Publishing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Staged Diff & Session Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Differences Panel */}
          <section className="bg-white border border-line rounded-card shadow-panel overflow-hidden">
            <div className="p-5 border-b border-line flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-lime flex items-center justify-center text-ink flex-shrink-0">
                <AdminIcon name={differences.length ? 'layers' : 'checkcircle'} className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-ink">
                  {differences.length
                    ? `${differences.length} staged change${differences.length === 1 ? '' : 's'} ready for review`
                    : 'Saved draft is in sync with live website'}
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Saved revision {revision} · Compared against currently published catalogue
                </p>
              </div>
            </div>

            {/* List of Differences */}
            {differences.length ? (
              <div className="divide-y divide-line/60">
                {differences.map((diff, idx) => (
                  <div key={idx} className="p-4 flex items-center gap-3 hover:bg-soft/20 transition-colors">
                    <div className="text-muted flex-shrink-0">
                      <AdminIcon
                        name={diff.type === 'Added' ? 'plus' : diff.type === 'Removed' ? 'trash' : 'edit'}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <strong className="block text-xs font-semibold text-ink truncate">{diff.name}</strong>
                      <span className="text-[11px] text-muted block truncate">{diff.description}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 ${
                        diff.type === 'Added'
                          ? 'bg-emerald-100 text-emerald-900'
                          : diff.type === 'Removed'
                          ? 'bg-red-100 text-red-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {diff.type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center text-xs text-muted space-y-2">
                <AdminIcon name="checkcircle" className="w-8 h-8 text-green-600 mx-auto" />
                <p>Everything is in sync. No staged changes are waiting to be published.</p>
              </div>
            )}

            {/* Publish & Discard Actions */}
            <div className="p-4 border-t border-line bg-soft/20 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onDiscard}
                disabled={!differences.length && !isDirty}
                className="px-3.5 py-2 border border-line rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Discard staged draft
              </button>

              <button
                type="button"
                onClick={onPublish}
                disabled={!differences.length || isDirty}
                className="px-5 py-2 bg-ink text-white rounded-lg text-xs font-semibold hover:bg-emerald-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
              >
                <AdminIcon name="publish" className="w-4 h-4" />
                <span>Publish draft to live website</span>
              </button>
            </div>
          </section>

          {/* Session Activity Log */}
          <section className="bg-white border border-line rounded-card shadow-panel p-5">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <h2 className="text-base font-semibold text-ink">Session activity log</h2>
                <p className="text-xs text-muted mt-0.5">Actions performed during this browser session.</p>
              </div>
              <AdminIcon name="clock" className="w-5 h-5 text-muted" />
            </div>

            <div className="mt-3 space-y-2 text-xs">
              {sessionActivity.length ? (
                sessionActivity.slice(0, 8).map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 py-1.5 border-b border-line/40 last:border-0">
                    <AdminIcon name="checkcircle" className="w-4 h-4 text-green-700 flex-shrink-0" />
                    <span className="text-ink font-medium flex-1 truncate">{act.message}</span>
                    <small className="text-muted text-[10px] whitespace-nowrap">{formatDateIST(act.at, true)}</small>
                  </div>
                ))
              ) : (
                <p className="text-muted text-xs py-3">No actions recorded yet this session.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Pre-publish Checklist & Info */}
        <div className="space-y-6">
          {/* Pre-publish Checklist */}
          <section className="bg-white border border-line rounded-card p-5 shadow-panel text-xs space-y-4">
            <h3 className="font-semibold text-ink text-sm">Pre-publish checklist</h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <AdminIcon
                  name={isDirty ? 'alert' : 'checkcircle'}
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDirty ? 'text-amber-600' : 'text-green-700'}`}
                />
                <div>
                  <strong className="block text-ink">{isDirty ? 'Unsaved working edits' : 'Draft changes saved'}</strong>
                  <span className="text-muted text-[11px]">
                    {isDirty ? 'Save draft changes before publishing.' : 'Staged revision is ready.'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <AdminIcon
                  name={missingImages ? 'alert' : 'checkcircle'}
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${missingImages ? 'text-amber-600' : 'text-green-700'}`}
                />
                <div>
                  <strong className="block text-ink">
                    {missingImages ? `${missingImages} products missing images` : 'All visible products have images'}
                  </strong>
                  <span className="text-muted text-[11px]">Ensure imagery is verified.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <AdminIcon name="eye" className="w-4 h-4 text-ink flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-ink">Storefront verification</strong>
                  <a
                    href="/?preview=draft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline hover:text-emerald-800 text-[11px]"
                  >
                    Open live storefront draft preview ↗
                  </a>
                </div>
              </li>
            </ul>
          </section>

          {/* Last Published Metadata */}
          <section className="bg-white border border-line rounded-card p-5 shadow-panel text-xs">
            <span className="text-[10px] font-bold tracking-[0.14em] text-muted uppercase block">
              Last Live Deployment
            </span>
            <strong className="text-base font-bold text-ink block mt-1">
              {formatDateIST(publishedAt, true)}
            </strong>
            <p className="text-muted text-[11px] mt-2 leading-relaxed">
              When published, all product rails and search indexes across the website update immediately.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
