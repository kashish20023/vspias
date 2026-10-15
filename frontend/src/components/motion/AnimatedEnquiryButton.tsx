"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

// Folder/pencil motif adapted from Nawsome, Uiverse (MIT).
// Retain THIRD-PARTY-NOTICES.md when integrating this component and its CSS.
type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  busy?: boolean;
  busyLabel?: string;
};

export function AnimatedEnquiryButton({
  children,
  busy = false,
  busyLabel = "Preparing…",
  disabled = false,
  type = "submit",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      className={`vsp-enquiry-button ${className}`.trim()}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
    >
      <span className="vsp-enquiry-icon" aria-hidden="true">
        <span className="pencil" />
        <span className="folder">
          <span className="top">
            <svg viewBox="0 0 24 27" focusable="false">
              <path d="M1 0H23A1 1 0 0 1 24 1V8.17A2 2 0 0 1 23.41 9.59L20.59 12.41A2 2 0 0 0 20 13.83V26A1 1 0 0 1 19 27H1A1 1 0 0 1 0 26V1A1 1 0 0 1 1 0Z" />
            </svg>
          </span>
          <span className="paper" />
        </span>
      </span>
      <span className="vsp-enquiry-label">{busy ? busyLabel : children}</span>
    </button>
  );
}
