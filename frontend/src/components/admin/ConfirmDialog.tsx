import React, { useState, useEffect } from 'react';
import { AdminIcon } from './AdminIcons';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  typedConfirmation?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  danger = false,
  typedConfirmation = '',
  onConfirm,
  onCancel
}: ConfirmDialogProps): JSX.Element | null {
  const [typedInput, setTypedInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTypedInput('');
    setError('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (typedConfirmation && typedInput.trim() !== typedConfirmation) {
      setError(`Please type "${typedConfirmation}" exactly to confirm.`);
      return;
    }
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#102a246b] backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-card shadow-2xl border border-line z-10 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-line flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded hover:bg-soft text-ink transition-colors"
            aria-label="Cancel"
          >
            <AdminIcon name="close" className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-muted leading-relaxed">{message}</p>

          {typedConfirmation && (
            <label className="flex flex-col gap-1.5 font-semibold text-ink">
              <span>
                Type <strong className="font-mono text-red-600">{typedConfirmation}</strong> to proceed:
              </span>
              <input
                type="text"
                value={typedInput}
                onChange={(e) => {
                  setTypedInput(e.target.value);
                  setError('');
                }}
                className="border border-line rounded-lg px-3 py-2 text-xs font-normal text-ink focus:border-ink outline-none"
                placeholder={typedConfirmation}
              />
            </label>
          )}

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        </div>

        <div className="p-4 border-t border-line bg-soft/20 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg border border-line bg-white text-xs font-semibold text-ink hover:bg-soft transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors ${
              danger ? 'bg-red-600 hover:bg-red-700' : 'bg-ink hover:bg-emerald-950'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
