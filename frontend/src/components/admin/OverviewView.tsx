import React from 'react';
import { AdminIcon } from './AdminIcons';
import { AdminView, CatalogData, DiffRow, EnquiryRecord, ProductItem } from './admin-types';
import { dayKey, formatDateIST, formatFullDateIST } from './admin-utils';

interface OverviewViewProps {
  products: ProductItem[];
  enquiries: EnquiryRecord[];
  differences: DiffRow[];
  isDirty: boolean;
  chartDays: 7 | 14;
  onChartDaysChange: (days: 7 | 14) => void;
  onNavigate: (view: AdminView) => void;
  onOpenAddProduct: () => void;
  onOpenEnquiryDetail: (enquiry: EnquiryRecord) => void;
}

export default function OverviewView({
  products,
  enquiries,
  differences,
  isDirty,
  chartDays,
  onChartDaysChange,
  onNavigate,
  onOpenAddProduct,
  onOpenEnquiryDetail
}: OverviewViewProps): JSX.Element {
  const visibleCount = products.filter((p) => p.visible).length;
  const hiddenCount = products.length - visibleCount;
  const paperCount = products.filter((p) => p.division === 'paper').length;
  const autoCount = products.length - paperCount;
  const percentVisible = products.length ? Math.round((visibleCount / products.length) * 100) : 0;

  // Chart computation using real enquiries bucketed in IST
  const buckets: Array<{ date: Date; paper: number; automation: number }> = [];
  for (let i = chartDays - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const k = dayKey(d);
    const rows = enquiries.filter((e) => e.createdAt && dayKey(e.createdAt) === k);
    buckets.push({
      date: d,
      paper: rows.filter((e) => (e.division || '').toLowerCase().includes('paper')).length,
      automation: rows.filter((e) => !(e.division || '').toLowerCase().includes('paper')).length
    });
  }
  const totalChartEnquiries = buckets.reduce((s, b) => s + b.paper + b.automation, 0);
  const maxBarValue = Math.max(2, ...buckets.map((b) => Math.max(b.paper, b.automation)));

  const recentEnquiries = enquiries.slice(0, 4);

  // SVG donut ring
  const r = 46, cx = 58, cy = 58, circumference = 2 * Math.PI * r;
  const inStroke = (percentVisible / 100) * circumference;
  const outStroke = circumference - inStroke;

  return (
    <>
      {/* Page Heading */}
      <div className="adm-page-heading">
        <div>
          <span className="adm-eyebrow">{formatFullDateIST()}</span>
          <h1>Your workspace, at a glance.</h1>
          <p>Keep your catalogue current and review incoming customer inquiries.</p>
        </div>
        <div className="adm-heading-actions">
          <a
            href="/?preview=draft"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-btn adm-btn-sm"
          >
            <AdminIcon name="eye" />
            <span>Storefront preview ↗</span>
          </a>
          <button
            type="button"
            onClick={onOpenAddProduct}
            className="adm-btn adm-btn-sm adm-btn-primary"
          >
            <AdminIcon name="plus" />
            <span>Add product</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <section className="adm-metrics" aria-label="Summary metrics">
        {/* Total products */}
        <div className="adm-metric">
          <div className="adm-metric-top">
            <span>Total products</span>
            <div className="adm-metric-icon">
              <AdminIcon name="box" />
            </div>
          </div>
          <div className="adm-metric-value">{products.length}</div>
          <div className="adm-metric-foot">
            <span className="adm-mini-pill">2 divisions</span>
            <span>In working catalogue</span>
          </div>
        </div>

        {/* Visible products */}
        <div className="adm-metric">
          <div className="adm-metric-top">
            <span>Visible products</span>
            <div className="adm-metric-icon">
              <AdminIcon name="eye" />
            </div>
          </div>
          <div className="adm-metric-value">{visibleCount}</div>
          <div className="adm-metric-foot">
            <AdminIcon name="checkcircle" />
            <span>{hiddenCount} hidden from website</span>
          </div>
        </div>

        {/* Customer enquiries */}
        <div className="adm-metric">
          <div className="adm-metric-top">
            <span>Customer enquiries</span>
            <div className="adm-metric-icon">
              <AdminIcon name="inbox" />
            </div>
          </div>
          <div className="adm-metric-value">{enquiries.length}</div>
          <div className="adm-metric-foot">
            <span className="adm-badge-dot" style={{ background: 'var(--lime)', width: 7, height: 7, borderRadius: '50%', display: 'inline-block' }} />
            <span>In customer inbox</span>
          </div>
        </div>

        {/* Unpublished changes (accent card) */}
        <div className="adm-metric adm-metric-accent">
          <div className="adm-metric-top">
            <span>Unpublished changes</span>
            <div className="adm-metric-icon">
              <AdminIcon name="edit" />
            </div>
          </div>
          <div className="adm-metric-value">{differences.length}</div>
          <div className="adm-metric-foot">
            <span className="adm-mini-pill">Staged</span>
            <span>{isDirty ? 'Unsaved edits also present' : 'Ready to publish'}</span>
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <div className="adm-dashboard-grid">
        {/* Left column */}
        <div className="adm-stack">
          {/* Enquiry Activity Chart Panel */}
          <section className="adm-panel" aria-labelledby="chart-heading">
            <div className="adm-panel-head">
              <div>
                <h2 id="chart-heading">Enquiry activity</h2>
                <p>Incoming interest across both corporate divisions.</p>
              </div>
              <select
                value={chartDays}
                onChange={(e) => onChartDaysChange(Number(e.target.value) as 7 | 14)}
                className="adm-chart-select"
                aria-label="Enquiry chart range"
              >
                <option value={7}>Last 7 days</option>
                <option value={14}>Last 14 days</option>
              </select>
            </div>

            <div className="adm-chart-summary">
              <strong>{totalChartEnquiries}</strong>
              <span>enquiries received</span>
              <div className="adm-chart-legend">
                <span className="adm-legend-label">
                  <i className="adm-legend-swatch" />
                  Industrial
                </span>
                <span className="adm-legend-label">
                  <i className="adm-legend-swatch adm-legend-swatch-lime" />
                  Paper
                </span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="adm-bar-chart">
              <div className="adm-chart-y" aria-hidden="true">
                <span>{maxBarValue}</span>
                <span>{Math.round(maxBarValue / 2)}</span>
                <span>0</span>
              </div>
              {buckets.map((b, i) => {
                const autoH = maxBarValue ? (b.automation / maxBarValue) * 100 : 0;
                const paperH = maxBarValue ? (b.paper / maxBarValue) * 100 : 0;
                const label =
                  chartDays === 7
                    ? new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: 'Asia/Kolkata' }).format(b.date)
                    : i % 2 === 0
                    ? new Intl.DateTimeFormat('en', { day: 'numeric', timeZone: 'Asia/Kolkata' }).format(b.date)
                    : '';
                return (
                  <div key={i} className="adm-bar-column" title={`${formatDateIST(b.date.toISOString())} · ${b.automation + b.paper} leads`}>
                    <div className="adm-bar" style={{ height: `${autoH}%` }} />
                    <div className="adm-bar adm-bar-paper" style={{ height: `${paperH}%` }} />
                    {label && <span className="adm-bar-label">{label}</span>}
                  </div>
                );
              })}
            </div>

            <div className="adm-chart-foot">
              <span>
                <AdminIcon name="clock" />
                All timestamps in IST (Asia/Kolkata)
              </span>
              <span>Real verified enquiries · {chartDays} days</span>
            </div>
          </section>

          {/* Recent Enquiries Table */}
          <section className="adm-panel" aria-labelledby="recent-heading">
            <div className="adm-panel-head">
              <div>
                <h2 id="recent-heading">Recent enquiries</h2>
                <p>Direct leads submitted through contact and quotation forms.</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('enquiries')}
                className="adm-text-btn"
              >
                <span>View all</span>
                <AdminIcon name="arrow" />
              </button>
            </div>

            {recentEnquiries.length ? (
              <div className="adm-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Division</th>
                      <th>Received (IST)</th>
                      <th style={{ textAlign: 'right' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnquiries.map((e) => (
                      <tr key={e.id}>
                        <td>
                          <div className="adm-table-name">
                            <div className="adm-initial">{(e.company || e.name || '?')[0].toUpperCase()}</div>
                            <div>
                              <strong>{e.company || e.name}</strong>
                              <small>{e.name}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={(e.division || '').toLowerCase().includes('paper') ? 'adm-badge adm-badge-paper' : 'adm-badge adm-badge-industrial'}>
                            <span className="adm-badge-dot" />
                            {(e.division || '').toLowerCase().includes('paper') ? 'Paper packaging' : 'Industrial'}
                          </span>
                        </td>
                        <td style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>{formatDateIST(e.createdAt)}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => onOpenEnquiryDetail(e)}
                            className="adm-icon-button"
                            title="View details"
                            style={{ width: 30, height: 30 }}
                          >
                            <AdminIcon name="arrow" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="adm-data-state">
                <AdminIcon name="inbox" />
                <h3>No enquiries yet</h3>
                <p>Customer enquiries submitted through the website will appear here.</p>
              </div>
            )}

            <div className="adm-panel-footer">
              <span>Showing {recentEnquiries.length} of {enquiries.length} leads</span>
              <span>Direct inbox</span>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="adm-stack">
          {/* Catalogue overview panel */}
          <section className="adm-panel" aria-labelledby="catalogue-heading">
            <div className="adm-panel-head" style={{ paddingBottom: 0 }}>
              <div>
                <h2 id="catalogue-heading">Catalogue overview</h2>
                <p>Product distribution and visibility ratio.</p>
              </div>
              <AdminIcon name="box" style={{ color: 'var(--muted)', width: 18, height: 18 }} />
            </div>

            {/* Donut ring */}
            <div className="adm-health-chart">
              <div style={{ position: 'relative', width: 116, height: 116, flexShrink: 0 }}>
                <svg width="116" height="116" viewBox="0 0 116 116" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                  <circle cx="58" cy="58" r={r} fill="none" stroke="var(--lime)" strokeWidth="12" />
                  <circle
                    cx="58" cy="58" r={r}
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="12"
                    strokeDasharray={`${inStroke} ${outStroke}`}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.05em' }}>{percentVisible}%</strong>
                  <span style={{ fontSize: 9, color: 'var(--muted)' }}>Visible</span>
                </div>
              </div>
              <div className="adm-health-legend">
                <div>
                  <span className="adm-legend-label">
                    <i className="adm-legend-swatch" />
                    Live products
                  </span>
                  <strong>{visibleCount}</strong>
                </div>
                <div>
                  <span className="adm-legend-label">
                    <i className="adm-legend-swatch adm-legend-swatch-lime" />
                    Hidden / Draft
                  </span>
                  <strong style={{ color: 'var(--muted)' }}>{hiddenCount}</strong>
                </div>
              </div>
            </div>

            {/* Division breakdown */}
            <div className="adm-division-list">
              <div className="adm-division-row">
                <div className="adm-division-icon">
                  <AdminIcon name="bag" />
                </div>
                <div>
                  <strong>Paper packaging</strong>
                  <small>Paper bag manufacturing</small>
                </div>
                <span>{paperCount}</span>
              </div>
              <div className="adm-division-row">
                <div className="adm-division-icon">
                  <AdminIcon name="circuit" />
                </div>
                <div>
                  <strong>Industrial automation</strong>
                  <small>Electricals &amp; drives</small>
                </div>
                <span>{autoCount}</span>
              </div>
            </div>

            <div className="adm-health-bottom">
              <span>Working catalogue</span>
              <button
                type="button"
                onClick={() => onNavigate('catalogue')}
                className="adm-text-btn"
              >
                <span>Manage range</span>
                <AdminIcon name="arrow" />
              </button>
            </div>
          </section>

          {/* Publishing callout card */}
          <section className="adm-publish-card" aria-labelledby="publish-heading">
            <span className="adm-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#647149', fontSize: 8 }}>
              <AdminIcon name="publish" style={{ width: 13, height: 13 }} />
              Publishing workspace
            </span>
            <h2 id="publish-heading">
              {differences.length ? 'A little review. Then, ready.' : 'Catalogue in sync.'}
            </h2>
            <p>
              {differences.length
                ? `You have ${differences.length} staged change${differences.length === 1 ? '' : 's'} waiting to be pushed to the live website.`
                : 'Your saved draft matches the active website catalogue.'}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('publishing')}
              className="adm-btn adm-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}
            >
              <span>Review staged changes</span>
              <AdminIcon name="arrow" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('media')}
              className="adm-btn"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <AdminIcon name="document" />
              <span>Manage brochures</span>
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
