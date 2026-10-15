import type { ReactNode } from "react";

// Depth/ribbon treatment informed by 0xnihilism, Uiverse (MIT).
// This wraps the EXISTING form. It does not submit or store anything.
export function EnquirySurface({
  children,
  label = "Enquiry form",
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <section
      aria-label={label}
      className={`vsp-enquiry-surface ${className}`.trim()}
    >
      <div className="vsp-enquiry-surface__body">
        <div className="vsp-enquiry-ribbon" aria-hidden="true">
          <span>Enquiry</span>
          <span>Let’s talk</span>
        </div>
        {children}
      </div>
    </section>
  );
}
