import React, { useState } from 'react';
import { AdminIcon } from './AdminIcons';
import { CatalogData, DiffRow } from './admin-types';
import { safeAssetUrl, uploadMediaFile } from './admin-utils';

interface MediaViewProps {
  draft: CatalogData;
  revision: number;
  isDirty: boolean;
  differences: DiffRow[];
  csrfToken: string;
  onBrochureUpdate: (key: 'brochure' | 'paperBrochure', path: string) => void;
  onSaveDraft: () => void;
}

export default function MediaView({
  draft,
  revision,
  isDirty,
  differences,
  csrfToken,
  onBrochureUpdate,
  onSaveDraft
}: MediaViewProps): JSX.Element {
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const brochures = [
    {
      key: 'paperBrochure' as const,
      title: 'Paper packaging',
      division: 'PAPER BAG MANUFACTURING',
      variant: 'paper',
      currentPath: draft.paperBrochure
    },
    {
      key: 'brochure' as const,
      title: 'Industrial automation',
      division: 'AUTOMATION & ELECTRICALS',
      variant: 'industrial',
      currentPath: draft.brochure
    }
  ];

  const handleFileSelect = async (key: 'brochure' | 'paperBrochure', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);
    setErrorMessage('');
    try {
      const res = await uploadMediaFile(file, true, csrfToken);
      onBrochureUpdate(key, res.path);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Brochure upload failed.');
    } finally {
      setUploadingKey(null);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase block">
            Brand Resources
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-ink mt-1">Media & brochures.</h1>
          <p className="text-sm text-muted mt-1">
            Manage official technical specification and catalog PDFs for both divisions.
          </p>
        </div>
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={!isDirty}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-emerald-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors self-start sm:self-auto"
        >
          <AdminIcon name="save" className="w-4 h-4" />
          <span>Save draft</span>
        </button>
      </div>

      {/* Staged Draft Banner */}
      <div className="border border-[#d5ddbb] bg-[#edf0dc] rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <AdminIcon name={isDirty ? 'edit' : 'checkcircle'} className="w-5 h-5 text-ink flex-shrink-0" />
          <div>
            <strong className="text-ink font-semibold">{isDirty ? 'Brochure changes unstaged' : 'Brochures staged'}</strong>
            <span className="text-muted block sm:inline sm:ml-2">
              {isDirty ? 'Save draft to preserve your uploaded brochure.' : `Revision ${revision} · Draft synced`}
            </span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
          {errorMessage}
        </div>
      )}

      {/* Brochure Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brochures.map((b) => {
          const isCurrentUploading = uploadingKey === b.key;
          const pdfUrl = safeAssetUrl(b.currentPath);

          return (
            <section key={b.key} className="bg-white border border-line rounded-card shadow-panel overflow-hidden flex flex-col">
              {/* Document Banner Graphic */}
              <div
                className={`h-36 flex items-center justify-center p-4 relative ${
                  b.variant === 'paper' ? 'bg-[#e9eddf]' : 'bg-[#e2e8df]'
                }`}
              >
                <div
                  className={`w-24 h-32 rounded shadow-md border p-3 flex flex-col justify-between transform ${
                    b.variant === 'paper'
                      ? 'bg-white border-white text-ink -rotate-3'
                      : 'bg-ink border-ink text-lime rotate-3'
                  }`}
                >
                  <span className="text-[8px] font-bold tracking-widest">VSPIAS</span>
                  <b className="text-[11px] font-bold leading-tight">
                    {b.variant === 'paper' ? 'Packaging' : 'Automation'}
                    <br />
                    Brochure
                  </b>
                  <div className="w-8 h-1.5 border-y border-current opacity-40" />
                </div>
              </div>

              {/* Details & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[9px] font-bold tracking-[0.14em] text-muted uppercase block">
                    {b.division}
                  </span>
                  <h2 className="text-lg font-bold text-ink mt-1">{b.title} catalogue</h2>
                  <div className="flex items-center gap-2 text-xs text-muted mt-2">
                    <AdminIcon name={b.currentPath ? 'checkcircle' : 'document'} className="w-4 h-4 text-green-700" />
                    <span className="truncate">{b.currentPath ? b.currentPath : 'No brochure attached yet'}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-emerald-950 cursor-pointer transition-colors">
                      <AdminIcon name="publish" className="w-3.5 h-3.5" />
                      <span>{isCurrentUploading ? 'Uploading…' : b.currentPath ? 'Replace PDF' : 'Upload PDF'}</span>
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={(e) => handleFileSelect(b.key, e)}
                        disabled={isCurrentUploading}
                        className="hidden"
                      />
                    </label>

                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-line bg-white text-xs font-semibold text-ink hover:bg-soft transition-colors"
                      >
                        <AdminIcon name="eye" className="w-3.5 h-3.5" />
                        <span>Open PDF ↗</span>
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-muted">
                    PDF only · Up to 18 MB · Stored securely on server
                  </p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Information Box */}
      <div className="bg-[#f0f0e6] border border-line rounded-card p-5 flex items-start gap-4 text-xs">
        <AdminIcon name="image" className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-ink text-sm">Product photographs are stored with products</h3>
          <p className="text-muted text-xs mt-1 leading-relaxed">
            Product hero images, thumbnails and illustrative diagrams are managed directly inside the product editor
            drawer on the Catalogue Range page.
          </p>
        </div>
      </div>
    </div>
  );
}
