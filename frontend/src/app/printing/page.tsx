import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flexographic Printing Solutions — VSPIAS',
  description:
    'Explore 2-colour flexographic printing solutions for paper bags and custom packaging applications by VSPIAS.'
};

export default function PrintingPage(): JSX.Element {
  return (
    <main id="main-content">
      <div className="wrap page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> &nbsp; / &nbsp; Machines & printing
        </nav>

        <div className="detail-grid">
          <div className="media-empty">
            <span>Media position / machine gallery</span>
            <div className="media-symbol">02</div>
            <h3>Flexographic printing.</h3>
            <p>
              Approved machine photographs will appear here, with full view, print unit and control detail.
            </p>
            <span>Awaiting model-specific media</span>
          </div>

          <div className="machine-copy">
            <div className="eyebrow">Paper bag & packaging applications</div>
            <h1>
              Two colours.<br />A new<br />impression.
            </h1>
            <p>
              Explore flexographic printing solutions for paper bags and custom printing applications. Start with the paper, artwork and output you have in mind.
            </p>

            <div className="application-tags">
              <span>2-colour printing</span>
              <span>Paper bag applications</span>
            </div>

            <div className="actions">
              <Link
                href="/contact?interest=Machinery%20%26%20printing"
                className="button"
                id="request-machine-details-btn"
              >
                Request Machine Details <span className="arrow">↗</span>
              </Link>
            </div>

            <p className="note">
              Model selection and all technical specifications are confirmed against your requirements.
            </p>
          </div>
        </div>

        <div className="detail-under">
          <div>
            <h3>The details that matter.</h3>
            <table className="spec-table">
              <tbody>
                <tr>
                  <td>Number of colours</td>
                  <td>2-colour option</td>
                </tr>
                <tr>
                  <td>Printing width</td>
                  <td>Awaiting verified model data</td>
                </tr>
                <tr>
                  <td>Printing speed</td>
                  <td>Awaiting verified model data</td>
                </tr>
                <tr>
                  <td>Substrate compatibility</td>
                  <td>Confirm by application & model</td>
                </tr>
                <tr>
                  <td>Power, dimensions & utilities</td>
                  <td>Confirm by machine configuration</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3>Define your printing requirement.</h3>
            <p>
              Share bag dimensions, paper type and GSM, print width, colour count, target output and whether you need a standalone printer or a complete paper bag setup.
            </p>
            <p>
              Machine speed and finished output are different values. The quotation should state the operating conditions behind each specification.
            </p>
            <Link
              href="/contact?interest=Machinery%20%26%20printing"
              className="text-link"
              style={{ marginTop: '28px' }}
              id="plan-production-line-link"
            >
              Plan a Complete Production Line <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="resource-grid">
          <article className="resource">
            <h3>Machine catalogue</h3>
            <p>A model-specific datasheet with dimensions, output and configuration.</p>
            <span className="pending">Awaiting approved file</span>
          </article>

          <article className="resource">
            <h3>Machine video</h3>
            <p>Show material feeding, printing, operation and finished output.</p>
            <span className="pending">Awaiting approved video</span>
          </article>

          <article className="resource">
            <h3>Print applications</h3>
            <p>Real printed bags and close-up artwork samples for each application.</p>
            <span className="pending">Awaiting approved photographs</span>
          </article>
        </div>

        <div style={{ height: '60px' }} />
      </div>
    </main>
  );
}
