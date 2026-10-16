'use client';

import React from 'react';

export default function PremiumPhotoViewer() {
  return (
    <>
      <dialog
        className="photo-viewer"
        id="photoViewer"
        aria-labelledby="viewerTitle"
        aria-describedby="viewerDescription"
      >
        <div className="photo-viewer-top">
          <div>
            <p>A closer look · VSPIAS</p>
            <h2 id="viewerTitle">The tactile details.</h2>
          </div>
          <button
            className="photo-viewer-close"
            type="button"
            id="closePhotoViewer"
            aria-label="Close image view"
          >
            <svg className="icon" aria-hidden="true"><use href="#i-close" /></svg>
          </button>
        </div>

        <div className="photo-viewer-image-wrap">
          <img id="viewerImage" alt="Paper bag design detail" src="" />
        </div>

        <div className="photo-viewer-foot">
          <span id="viewerDescription">
            Illustrative product styling. Final details are confirmed with your quote.
          </span>
          <button type="button" id="viewerDone">
            Back to the page
          </button>
        </div>
      </dialog>

      <div className="toast" id="toast" role="status" aria-live="polite" />
    </>
  );
}
