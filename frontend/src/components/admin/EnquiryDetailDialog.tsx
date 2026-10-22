import React from 'react';
import { AdminIcon } from './AdminIcons';
import { EnquiryRecord } from './admin-types';
import { formatDateIST } from './admin-utils';

interface EnquiryDetailDialogProps {
  enquiry: EnquiryRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string, name: string) => void;
}

export default function EnquiryDetailDialog({
  enquiry,
  isOpen,
  onClose,
  onDelete
}: EnquiryDetailDialogProps): JSX.Element | null {
  if (!isOpen || !enquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#102a246b] backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-card shadow-2xl border border-line z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-line flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-ink">{enquiry.company || enquiry.name}</h2>
            <p className="text-xs text-muted mt-1">
              Received on {formatDateIST(enquiry.createdAt, true)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-soft text-ink transition-colors"
            aria-label="Close dialog"
          >
            <AdminIcon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Division Badge */}
          <div>
            <span
              className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${
                (enquiry.division || '').toLowerCase().includes('paper')
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {(enquiry.division || '').toLowerCase().includes('paper')
                ? 'Paper packaging division'
                : 'Industrial automation division'}
            </span>
          </div>

          {/* Details Meta Grid */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Contact Person</dt>
              <dd className="text-ink font-medium mt-0.5">{enquiry.name}</dd>
            </div>
            <div>
              <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Email Address</dt>
              <dd className="text-ink font-medium mt-0.5">
                <a href={`mailto:${enquiry.email}`} className="text-ink underline hover:text-emerald-800">
                  {enquiry.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Phone Number</dt>
              <dd className="text-ink font-medium mt-0.5">
                {enquiry.phone ? (
                  <a href={`tel:${enquiry.phone}`} className="text-ink underline hover:text-emerald-800">
                    {enquiry.phone}
                  </a>
                ) : (
                  <span className="text-muted">Not supplied</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Company</dt>
              <dd className="text-ink font-medium mt-0.5">{enquiry.company || 'Not supplied'}</dd>
            </div>
            <div>
              <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Requested Quantity / Spec</dt>
              <dd className="text-ink font-medium mt-0.5">{enquiry.quantity || 'Not specified'}</dd>
            </div>
            <div>
              <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Industry Sector</dt>
              <dd className="text-ink font-medium mt-0.5">{enquiry.industrySector || 'Not supplied'}</dd>
            </div>
            {enquiry.bagFinish && (
              <div>
                <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Bag Finish</dt>
                <dd className="text-ink font-medium mt-0.5">{enquiry.bagFinish}</dd>
              </div>
            )}
            {enquiry.brandName && (
              <div>
                <dt className="text-muted font-semibold uppercase text-[10px] tracking-wider">Custom Brand Name</dt>
                <dd className="text-ink font-medium mt-0.5">{enquiry.brandName}</dd>
              </div>
            )}
          </dl>

          {/* Full Message Box */}
          <div className="border border-line rounded-lg p-4 bg-paper text-xs leading-relaxed">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
              Customer Requirements & Message
            </span>
            <div className="whitespace-pre-wrap text-ink font-normal">{enquiry.message}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-line bg-white flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onDelete(enquiry.id, enquiry.company || enquiry.name);
            }}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors inline-flex items-center gap-1.5"
          >
            <AdminIcon name="trash" className="w-4 h-4" />
            <span>Delete enquiry</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-emerald-950 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
