import React, { useState, useEffect } from 'react';
import { AdminIcon } from './AdminIcons';
import { ProductItem } from './admin-types';
import { safeAssetUrl, uploadMediaFile } from './admin-utils';

interface ProductEditorDialogProps {
  product: ProductItem | null;
  isOpen: boolean;
  csrfToken: string;
  onClose: () => void;
  onSave: (product: ProductItem) => void;
  onDelete?: (id: string, name: string) => void;
}

export default function ProductEditorDialog({
  product,
  isOpen,
  csrfToken,
  onClose,
  onSave,
  onDelete
}: ProductEditorDialogProps): JSX.Element | null {
  const [formData, setFormData] = useState<ProductItem | null>(null);
  const [initialJson, setInitialJson] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (product) {
      const copy = JSON.parse(JSON.stringify(product));
      setFormData(copy);
      setInitialJson(JSON.stringify(copy));
      setErrorMessage('');
    }
  }, [product, isOpen]);

  if (!isOpen || !formData) return null;

  const isNew = !product?.name;
  const isDirty = JSON.stringify(formData) !== initialJson;

  const handleClose = () => {
    if (isDirty) {
      if (confirm('You have unsaved changes in this product editor. Discard them?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage('');
    try {
      const res = await uploadMediaFile(file, false, csrfToken);
      setFormData((prev) => (prev ? { ...prev, image: res.path } : null));
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Image upload failed.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.brand.trim() || !formData.category.trim() || !formData.description.trim()) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    if (formData.image && !formData.alt.trim()) {
      setErrorMessage('Please provide an image description (alt text).');
      return;
    }

    onSave(formData);
    onClose();
  };

  const imgSrc = safeAssetUrl(formData.image);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#102a246b] backdrop-blur-sm transition-opacity" onClick={handleClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 border-l border-line overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-line flex items-center justify-between sticky top-0 bg-white z-10">
            <div>
              <span className="text-[10px] font-bold tracking-[0.14em] text-muted uppercase block">Catalogue Item</span>
              <h2 className="text-xl font-bold text-ink mt-0.5">{isNew ? 'Add New Product' : 'Edit Product'}</h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-soft text-ink transition-colors"
              aria-label="Close editor"
            >
              <AdminIcon name="close" className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-5 flex-1">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
                {errorMessage}
              </div>
            )}

            {/* Name & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                <span>Product Name *</span>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                  placeholder="e.g. Luxury Boutique Kraft Bag"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                <span>Brand *</span>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                  placeholder="e.g. VSPIAS EcoPackaging"
                />
              </label>
            </div>

            {/* Division & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                <span>Division *</span>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value as 'paper' | 'automation' })}
                  className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none bg-white"
                >
                  <option value="paper">Paper Bag Manufacturing</option>
                  <option value="automation">Industrial Automation & Electricals</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                <span>Category *</span>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                  placeholder="e.g. Shopping Bags, VFD & Drives"
                />
              </label>
            </div>

            {/* Description */}
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
              <span>Description *</span>
              <textarea
                required
                maxLength={1500}
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border border-line rounded-lg p-3 text-xs font-normal text-ink focus:border-ink outline-none resize-y"
                placeholder="Detailed specifications, features and application details..."
              />
            </label>

            {/* Photography & Media */}
            <div className="border-t border-line pt-4 space-y-3">
              <span className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase block">
                Product Photography
              </span>

              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg border border-line bg-paper flex items-center justify-center overflow-hidden flex-shrink-0">
                  {imgSrc ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={imgSrc} alt={formData.alt || formData.name} className="w-full h-full object-cover" />
                  ) : (
                    <AdminIcon name="image" className="w-8 h-8 text-muted" />
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-line bg-white text-xs font-semibold text-ink hover:bg-soft cursor-pointer">
                    <AdminIcon name="publish" className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading…' : formData.image ? 'Replace image' : 'Upload image'}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                      onChange={handleImageFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-muted">
                    PNG, JPEG or WebP up to 10 MB. Image validates on backend.
                  </p>
                </div>
              </div>

              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                <span>Image description (alt text) *</span>
                <input
                  type="text"
                  maxLength={240}
                  required={Boolean(formData.image)}
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                  placeholder="Describe the image for accessibility"
                />
              </label>
            </div>

            {/* Display & Sourcing */}
            <div className="border-t border-line pt-4 space-y-3">
              <span className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase block">
                Display & Citation
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                  <span>Display order *</span>
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    step={1}
                    required
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) || 0 })}
                    className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                  <span>Brochure citation page</span>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    step={1}
                    value={formData.sourcePage ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sourcePage: e.target.value ? Number(e.target.value) : null
                      })
                    }
                    className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                    placeholder="Optional page number"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                <span>Information / source citation</span>
                <input
                  type="text"
                  maxLength={240}
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                  placeholder="e.g. Official Catalog 2026"
                />
              </label>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2.5 text-xs font-medium text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="rounded text-ink focus:ring-ink w-4 h-4"
                />
                <span>Visible on live website</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.illustrative}
                  onChange={(e) => setFormData({ ...formData, illustrative: e.target.checked })}
                  className="rounded text-ink focus:ring-ink w-4 h-4"
                />
                <span>Illustrative imagery disclaimer</span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-line bg-white flex items-center justify-between gap-3 sticky bottom-0 z-10">
            {!isNew && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(formData.id, formData.name)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete product"
                aria-label="Delete product"
              >
                <AdminIcon name="trash" className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-line rounded-lg text-xs font-semibold text-ink hover:bg-soft transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-ink text-white rounded-lg text-xs font-semibold hover:bg-emerald-950 transition-colors inline-flex items-center gap-1.5"
              >
                <AdminIcon name="check" className="w-3.5 h-3.5" />
                <span>{isNew ? 'Add to draft' : 'Apply changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
