import React from 'react';
import { AdminIcon } from './AdminIcons';
import { EnquiryRecord } from './admin-types';
import { formatDateIST } from './admin-utils';

interface EnquiriesViewProps {
  enquiries: EnquiryRecord[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDivision: 'all' | 'paper' | 'automation';
  onDivisionChange: (d: 'all' | 'paper' | 'automation') => void;
  selectedPeriod: 'all' | '7' | '30';
  onPeriodChange: (p: 'all' | '7' | '30') => void;
  onRefresh: () => void;
  onOpenDetail: (enquiry: EnquiryRecord) => void;
  onClearFilters: () => void;
}

export default function EnquiriesView({
  enquiries,
  searchQuery,
  onSearchChange,
  selectedDivision,
  onDivisionChange,
  selectedPeriod,
  onPeriodChange,
  onRefresh,
  onOpenDetail,
  onClearFilters
}: EnquiriesViewProps): JSX.Element {
  const paperCount = enquiries.filter((e) => (e.division || '').toLowerCase().includes('paper')).length;
  const autoCount = enquiries.length - paperCount;

  const filtered = enquiries.filter((e) => {
    const matchDiv =
      selectedDivision === 'all' ||
      (e.division || '').toLowerCase().includes(selectedDivision.toLowerCase());
    const query = searchQuery.toLowerCase();
    const matchText = `${e.name || ''} ${e.company || ''} ${e.email || ''} ${e.message || ''}`
      .toLowerCase()
      .includes(query);
    const matchDate =
      selectedPeriod === 'all' ||
      (e.createdAt && new Date(e.createdAt) >= new Date(Date.now() - Number(selectedPeriod) * 86400000));
    return matchDiv && matchText && matchDate;
  });

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase block">
            Customer Inquiries
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-ink mt-1">Customer enquiries.</h1>
          <p className="text-sm text-muted mt-1">
            Review customer quote requests and inquiries submitted through website forms.
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-line bg-white text-xs font-semibold text-ink hover:bg-soft transition-colors self-start sm:self-auto"
        >
          <AdminIcon name="reset" className="w-3.5 h-3.5" />
          <span>Refresh inbox</span>
        </button>
      </div>

      {/* Summary Inline Strip */}
      <div className="flex items-center gap-6 text-xs border-b border-line pb-4 flex-wrap">
        <div>
          <strong className="text-xl font-bold text-ink mr-1.5">{enquiries.length}</strong>
          <span className="text-muted">Total enquiries</span>
        </div>
        <div className="h-6 w-px bg-line" />
        <div>
          <strong className="text-xl font-bold text-ink mr-1.5">{paperCount}</strong>
          <span className="text-muted">Paper packaging</span>
        </div>
        <div className="h-6 w-px bg-line" />
        <div>
          <strong className="text-xl font-bold text-ink mr-1.5">{autoCount}</strong>
          <span className="text-muted">Industrial automation</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <label className="flex items-center gap-2 flex-1 min-w-[220px] bg-white border border-line rounded-lg px-3 py-2 text-xs">
          <AdminIcon name="search" className="w-4 h-4 text-muted flex-shrink-0" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, company, email or requirements…"
            className="w-full bg-transparent border-0 p-0 text-ink text-xs focus:outline-none"
            aria-label="Search enquiries"
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

        {/* Date Period Selector */}
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value as 'all' | '7' | '30')}
          className="bg-white border border-line rounded-lg px-3 py-2 text-xs text-ink focus:outline-none"
          aria-label="Filter by date"
        >
          <option value="all">All dates</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>

      {/* Enquiries Table Panel */}
      <section className="bg-white border border-line rounded-card shadow-panel overflow-hidden">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line bg-soft/40 text-muted uppercase text-[9px] tracking-wider">
                  <th className="py-2.5 px-5">Customer</th>
                  <th className="py-2.5 px-5">Division</th>
                  <th className="py-2.5 px-5">Requirements / Message</th>
                  <th className="py-2.5 px-5">Received (IST)</th>
                  <th className="py-2.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filtered.map((e, idx) => (
                  <tr key={e.id} className="hover:bg-soft/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg border border-line bg-paper flex items-center justify-center font-bold text-ink text-[11px] flex-shrink-0">
                          {(e.division || '').toLowerCase().includes('paper') ? 'P' : 'A'}
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="min-w-0">
                          <strong className="block font-semibold text-ink truncate max-w-[180px]">
                            {e.company || e.name}
                          </strong>
                          <small className="text-muted block text-[11px] truncate max-w-[180px]">{e.name}</small>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          (e.division || '').toLowerCase().includes('paper')
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {(e.division || '').toLowerCase().includes('paper') ? 'Paper packaging' : 'Industrial automation'}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="max-w-md truncate text-ink font-normal">{e.message}</div>
                      <small className="text-muted block text-[11px]">
                        {e.quantity ? `Quantity: ${e.quantity}` : 'Standard enquiry'}
                      </small>
                    </td>
                    <td className="py-3 px-5 text-muted whitespace-nowrap">{formatDateIST(e.createdAt, true)}</td>
                    <td className="py-3 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => onOpenDetail(e)}
                        className="p-1.5 rounded hover:bg-soft text-ink inline-flex"
                        title="View details"
                        aria-label={`View enquiry from ${e.company || e.name}`}
                      >
                        <AdminIcon name="arrow" className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-muted space-y-3">
            <AdminIcon name="inbox" className="w-8 h-8 text-muted mx-auto" />
            <p>No customer enquiries found matching your filter criteria.</p>
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center px-3 py-1.5 rounded-md border border-line bg-white font-semibold text-ink hover:bg-soft"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="p-3.5 border-t border-line text-xs text-muted flex justify-between">
          <span>Showing {filtered.length} of {enquiries.length} enquiries</span>
          <span>Verified customer submissions</span>
        </div>
      </section>
    </div>
  );
}
